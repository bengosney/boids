import React, { Component } from "react";
import { makeNoise3D } from "open-simplex-noise";
import "./App.css";
import boid from "./boid";


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            debug: 0,
            log: [],
        };

        this.drawing = false;
        this.ctx = null;
        this.data = [[]];

        this.boids = [];

        this.count = 50;

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

        
        this.frame = 0;
    }

    log(line) {
        const {log} = this.state;
        log.push(line);
        this.setState({log: log});
    }

    clearLog() {
        this.setState({log: []});
    }

    getValues(width, height, time) {
        const { pixelSize } = this.state;
        const { noise } = this;

        const rows = Math.ceil(height / pixelSize) + 1;
        const cols = Math.ceil(width / pixelSize) + 1;

        const mod = pixelSize / 100;

        const data = new Array(cols);
        for (let x = 0; x < cols; x++) {
            data[x] = new Array(rows);
            for (let y = 0; y < rows; y++) {
                data[x][y] = parseFloat(noise(x * mod, y * mod, time)).toFixed(4);
            }
        }

        return data;
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        window.addEventListener('load', () =>
            this.rAF = requestAnimationFrame(() => this.updateAnimationState())
        );
        const {width, height} = this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);

        for (let i = 1; i <= this.count; i++) {
            const x = Math.floor(Math.random() * width);
            const y = Math.floor(Math.random() * height);
            const r = Math.random() * (2*Math.PI);

            this.boids.push(new boid(this, x, y, r, i));
        }

        this.setState();
    }

    updateWindowDimensions() {
        const { innerWidth, innerHeight } = window;

        const size = { width: innerWidth, height: innerHeight }
        this.setState(size);

        return size;
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rAF);
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateAnimationState() {
        this.ts = this.getTS();
        this.clearFrame();

        this.drawScene();

        this.nextFrame();
    }

    nextFrame() {
        this.frame++;
        this.rAF = requestAnimationFrame(() => this.updateAnimationState());
    }

    clearFrame() {
        const { width, height } = this.state;
        const { ctx } = this;

        ctx.clearRect(0, 0, width, height);
    }

    getTS() {
        const date = new Date();

        return date.getTime();
    }

    convertRange(value, r1, r2) {
        return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
    }

    distance(x1, y1, x2, y2) {
        const x = x1 - x2;
        const y = y1 - y2;

        return Math.sqrt(x * x + y * y);
    }

    scale(value, r1, r2) {
        return ((value - r1[0]) * (r2[1] - r2[0])) / (r1[1] - r1[0]) + r2[0];
    }

    getFrameTime() {
        const current = this.getTS();
        const { prevTime = current } = this;
        const diff = current - prevTime;

        this.prevTime = current;

        this.setState({frameTime: current});
        
        return diff;
    }

    drawScene() {
        const { width, height, pixelSize, cutoff, color, speed } = this.state;
        const { ctx } = this;
        const frameTime = this.getFrameTime();
        
        this.clearFrame();
        this.boids.forEach(b => b.doFrame(frameTime));
        this.boids.forEach(b => b.draw());
    }

    render() {
        const { width, height, debug } = this.state;

        return (
            <div className={"grid"}>
                <div className="ui" style={{display: 'none'}}>
                    <p>
                        <label htmlFor={'debug'}>Debug</label>
                        <select id={'debug'} value={debug} onChange={(e) => this.setState({debug: e.target.value})}>
                            <option value={0}>Off</option>
                            <option value={-1}>On</option>
                            {Array.from(Array(this.count).keys()).filter(i => i).map(i => <option key={`debug${i}`} value={i}>{i}</option>)}
                        </select>
                    </p>
                </div>
                <div className={"dots"}>
                    <canvas ref="canvas"  width={width} height={height} />
                </div>
            </div>
        );
    }
}

export default App;
