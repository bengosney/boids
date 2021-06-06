import Vector2D from "./Vector2D";

let bob = 1;

const deg = (r) => r * (180 / Math.PI);
const rad = (d) => d * (Math.PI / 180);

class boid {
  constructor(parent, x, y,  r, id) {
    this.id = id;
    this.parent = parent;
    this.pos = new Vector2D(x, y);
    this.direction = new Vector2D(1, 0);
    this.direction.rotate(r);
    this.velocity = 1;

    this.maxTurn = 0.05;

    this.vision = 150;
    this.visionArc = 3.14159;
    this.center = null;
    this.size = 15;
    this.minDist = this.size * 2.5;

    this.avoiding = [];

    this.turning = 0;
  }

  getDistanceTo(boid) {
    return this.pos.distance(boid.pos);
  }

  getVisible() {
    const { boids } = this.parent;

    return boids
      .map((b) => ({ ...b, distance: this.getDistanceTo(b) }))
      .filter((b) => b.distance < this.vision)
      .filter((b) => this.id != b.id)
      .filter(b => {
          const a = this.direction.radians() - this.pos.angleTo(b.pos);
          const r = this.visionArc / 2;
          return a > -r && a < r;
      })
      ;
  }

  turn(amt, frameTime) {
    let t = 0;
    if (amt > 0) {
      t = Math.min(amt, this.maxTurn);
    }
    if (amt < 0) {
      t = Math.max(amt, -this.maxTurn);
    }

    this.turning = t * frameTime;
    this.direction.rotate(t);
  }

  turnTo(direction, frameTime) {
    this.turn(this.direction.radians() - direction, frameTime);
  }

  turnFrom(direction, frameTime) {
    this.turn(-(this.direction.radians() - direction), frameTime);
  }

  doFrame(frameTime) {
    this.pos.add(Vector2D.multiply(this.direction, frameTime / 10));

    const visible = this.getVisible();
    const numVis = visible.length;
    this.center = null;
    if (numVis) {
      this.avoiding = visible
        .sort((a, b) => b.distance - a.distance)
        .filter((b) => b.distance < this.minDist)
      ;

      if (this.avoiding.length) {
        this.avoiding.forEach((b) => this.turnFrom(this.pos.angleTo(b.pos), frameTime));
      } else {
        const avgValues = visible.reduce(
          (acc, cur) => {
            acc.x += cur.pos.x;
            acc.y += cur.pos.y;

            return acc;
          },
          { x: 0, y: 0 }
        );

        const avgVect = new Vector2D(
          avgValues.x / numVis,
          avgValues.y / numVis
        );

        const avgAng = this.pos.angleTo(avgVect);

        this.turnTo(avgAng, frameTime);
        this.center = avgVect;
      }
    }

    const inBounds = (value, min, max) => {
      if (value > max) {
        return min;
      }

      if (value < min) {
        return max;
      }

      return value;
    };

    const { width, height } = this.parent.state;

    const x = inBounds(this.pos.x, 0, width);
    const y = inBounds(this.pos.y, 0, height);
    this.pos.set(x, y);
  }

  draw() {
    const { ctx, state } = this.parent;
    const { debug: _debug } = state;
    const debug = _debug == -1 || this.id == _debug;
    const { x, y } = this.pos;
    const { size: length } = this;
    const width = length / 3;

    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(this.direction.toAngles());

    ctx.beginPath();
    if (this.id == _debug) {
      ctx.strokeStyle = `#ff00ff`;
    } else {
      ctx.strokeStyle = `#ffffff`;
    }
    ctx.moveTo(0, -width);
    ctx.lineTo(length, 0);
    ctx.lineTo(0, width);
    ctx.lineTo(width, 0);
    ctx.closePath();
    ctx.stroke();

    if (debug) {
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, this.vision, -(this.visionArc / 2), this.visionArc / 2); // 2 * Math.PI);
      ctx.lineTo(0, 0);
      ctx.strokeStyle = `#ffffff33`;
      ctx.stroke();
    }

    ctx.restore();

    if (debug) {
      this.avoiding.forEach((a) => {
        ctx.beginPath();
        ctx.arc(a.pos.x, a.pos.y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = `#ffff00`;
        ctx.closePath();
        ctx.fill();
      });

      ctx.font = "10px Arial";
      ctx.fillText(`${this.id}`, x + 10, y);
    }

    if (debug && this.center !== null) {
      ctx.beginPath();
      ctx.arc(this.center.x, this.center.y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = `#ff0000`;
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(this.center.x, this.center.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = `#00FF00aa`;
      ctx.stroke();
    }
  }
}

export default boid;
