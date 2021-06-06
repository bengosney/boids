(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(t,e,n){t.exports=n(19)},15:function(t,e,n){},18:function(t,e,n){},19:function(t,e,n){"use strict";n.r(e);var i=n(0),a=n.n(i),r=n(6),s=n.n(r),o=(n(15),n(1)),u=n(2),h=n(3),c=n(7),l=n(8),f=n(4),d=(n(16),n(18),n(9)),v=function(){function t(e,n){Object(o.a)(this,t),this.x=e,this.y=n}return Object(u.a)(t,[{key:"add",value:function(e){return e instanceof t?(this.x+=e.x,this.y+=e.y):(this.x+=e,this.y+=e),this}},{key:"subtract",value:function(e){return e instanceof t?(this.x-=e.x,this.y-=e.y):(this.x-=e,this.y-=e),this}},{key:"multiply",value:function(e){return e instanceof t?(this.x*=e.x,this.y*=e.y):(this.x*=e,this.y*=e),this}},{key:"divide",value:function(e){return e instanceof t?(0!=e.x&&(this.x/=e.x),0!=e.y&&(this.y/=e.y)):0!=e&&(this.x/=e,this.y/=e),this}},{key:"rotate",value:function(t){var e=this.x,n=this.y,i=Math.cos(t),a=Math.sin(t);this.x=Math.round(1e4*(e*i-n*a))/1e4,this.y=Math.round(1e4*(e*a+n*i))/1e4}},{key:"distance",value:function(t){return Math.hypot(this.x-t.x,this.y-t.y)}},{key:"equals",value:function(t){return this.x==t.x&&this.y==t.y}},{key:"equal",value:function(t){return this.equals(t)}},{key:"dot",value:function(t){return this.x*t.x+this.y*t.y}},{key:"cross",value:function(t){return this.x*t.y-this.y*t.x}},{key:"length",value:function(){return Math.sqrt(this.dot(this))}},{key:"normalize",value:function(){return this.divide(this.length())}},{key:"min",value:function(){return Math.min(this.x,this.y)}},{key:"max",value:function(){return Math.max(this.x,this.y)}},{key:"radians",value:function(){return-Math.atan2(this.y,this.x)}},{key:"toAngles",value:function(){return-Math.atan2(-this.y,this.x)}},{key:"angleTo",value:function(t){return-Math.atan2(t.y-this.y,t.x-this.x)}},{key:"clone",value:function(){return new t(this.x,this.y)}},{key:"set",value:function(t,e){return this.x=t,this.y=e,this}}],[{key:"add",value:function(t,e){return t.clone().add(e)}},{key:"subtract",value:function(t,e){return t.clone().subtract(e)}},{key:"multiply",value:function(t,e){return t.clone().multiply(e)}},{key:"divide",value:function(t,e){return t.clone().divide(e)}},{key:"rotate",value:function(t,e){return t.clone().rotate(e)}},{key:"distance",value:function(t,e){return t.distance(e)}}]),t}(),y=function(){function t(e,n,i,a,r){Object(o.a)(this,t),this.id=r,this.parent=e,this.pos=new v(n,i),this.direction=new v(1,0),this.direction.rotate(a),this.velocity=1,this.maxTurn=.05,this.vision=150,this.visionArc=3.14159,this.center=null,this.size=15,this.minDist=2.5*this.size,this.avoiding=[],this.turning=0}return Object(u.a)(t,[{key:"getDistanceTo",value:function(t){return this.pos.distance(t.pos)}},{key:"getVisible",value:function(){var t=this;return this.parent.boids.map(function(e){return Object(d.a)({},e,{distance:t.getDistanceTo(e)})}).filter(function(e){return e.distance<t.vision}).filter(function(e){return t.id!=e.id}).filter(function(e){var n=t.direction.radians()-t.pos.angleTo(e.pos),i=t.visionArc/2;return n>-i&&n<i})}},{key:"turn",value:function(t,e){var n=0;t>0&&(n=Math.min(t,this.maxTurn)),t<0&&(n=Math.max(t,-this.maxTurn)),this.turning=n*e,this.direction.rotate(n)}},{key:"turnTo",value:function(t,e){this.turn(this.direction.radians()-t,e)}},{key:"turnFrom",value:function(t,e){this.turn(-(this.direction.radians()-t),e)}},{key:"doFrame",value:function(t){var e=this;this.pos.add(v.multiply(this.direction,t/10));var n=this.getVisible(),i=n.length;if(this.center=null,i)if(this.avoiding=n.sort(function(t,e){return e.distance-t.distance}).filter(function(t){return t.distance<e.minDist}),this.avoiding.length)this.avoiding.forEach(function(n){return e.turnFrom(e.pos.angleTo(n.pos),t)});else{var a=n.reduce(function(t,e){return t.x+=e.pos.x,t.y+=e.pos.y,t},{x:0,y:0}),r=new v(a.x/i,a.y/i),s=this.pos.angleTo(r);this.turnTo(s,t),this.center=r}var o=function(t,e,n){return t>n?e:t<e?n:t},u=this.parent.state,h=u.width,c=u.height,l=o(this.pos.x,0,h),f=o(this.pos.y,0,c);this.pos.set(l,f)}},{key:"draw",value:function(){var t=this.parent,e=t.ctx,n=t.state.debug,i=-1==n||this.id==n,a=this.pos,r=a.x,s=a.y,o=this.size,u=o/3;e.save(),e.translate(r,s),e.rotate(this.direction.toAngles()),e.beginPath(),this.id==n?e.strokeStyle="#ff00ff":e.strokeStyle="#ffffff",e.moveTo(0,-u),e.lineTo(o,0),e.lineTo(0,u),e.lineTo(u,0),e.closePath(),e.stroke(),i&&(e.moveTo(0,0),e.arc(0,0,this.vision,-this.visionArc/2,this.visionArc/2),e.lineTo(0,0),e.strokeStyle="#ffffff33",e.stroke()),e.restore(),i&&(this.avoiding.forEach(function(t){e.beginPath(),e.arc(t.pos.x,t.pos.y,2,0,2*Math.PI),e.fillStyle="#ffff00",e.closePath(),e.fill()}),e.font="10px Arial",e.fillText("".concat(this.id),r+10,s)),i&&null!==this.center&&(e.beginPath(),e.arc(this.center.x,this.center.y,2,0,2*Math.PI),e.fillStyle="#ff0000",e.closePath(),e.fill(),e.beginPath(),e.moveTo(this.center.x,this.center.y),e.lineTo(r,s),e.strokeStyle="#00FF00aa",e.stroke())}}]),t}();function m(t){var e=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}();return function(){var n,i=Object(f.a)(t);if(e){var a=Object(f.a)(this).constructor;n=Reflect.construct(i,arguments,a)}else n=i.apply(this,arguments);return Object(l.a)(this,n)}}var g=function(t){Object(c.a)(n,t);var e=m(n);function n(t){var i;return Object(o.a)(this,n),(i=e.call(this,t)).state={debug:0,log:[]},i.drawing=!1,i.ctx=null,i.data=[[]],i.boids=[],i.count=50,i.updateWindowDimensions=i.updateWindowDimensions.bind(Object(h.a)(i)),i.frame=0,i}return Object(u.a)(n,[{key:"log",value:function(t){var e=this.state.log;e.push(t),this.setState({log:e})}},{key:"clearLog",value:function(){this.setState({log:[]})}},{key:"getValues",value:function(t,e,n){for(var i=this.state.pixelSize,a=this.noise,r=Math.ceil(e/i)+1,s=Math.ceil(t/i)+1,o=i/100,u=new Array(s),h=0;h<s;h++){u[h]=new Array(r);for(var c=0;c<r;c++)u[h][c]=parseFloat(a(h*o,c*o,n)).toFixed(4)}return u}},{key:"componentDidMount",value:function(){var t=this,e=this.refs.canvas;this.canvas=e,this.ctx=e.getContext("2d"),window.addEventListener("load",function(){return t.rAF=requestAnimationFrame(function(){return t.updateAnimationState()})});var n=this.updateWindowDimensions(),i=n.width,a=n.height;window.addEventListener("resize",this.updateWindowDimensions);for(var r=1;r<=this.count;r++){var s=Math.floor(Math.random()*i),o=Math.floor(Math.random()*a),u=Math.random()*(2*Math.PI);this.boids.push(new y(this,s,o,u,r))}this.setState()}},{key:"updateWindowDimensions",value:function(){var t=window,e={width:t.innerWidth,height:t.innerHeight};return this.setState(e),e}},{key:"componentWillUnmount",value:function(){cancelAnimationFrame(this.rAF),window.removeEventListener("resize",this.updateWindowDimensions)}},{key:"updateAnimationState",value:function(){this.ts=this.getTS(),this.clearFrame(),this.drawScene(),this.nextFrame()}},{key:"nextFrame",value:function(){var t=this;this.frame++,this.rAF=requestAnimationFrame(function(){return t.updateAnimationState()})}},{key:"clearFrame",value:function(){var t=this.state,e=t.width,n=t.height;this.ctx.clearRect(0,0,e,n)}},{key:"getTS",value:function(){return(new Date).getTime()}},{key:"convertRange",value:function(t,e,n){return(t-e[0])*(n[1]-n[0])/(e[1]-e[0])+n[0]}},{key:"distance",value:function(t,e,n,i){var a=t-n,r=e-i;return Math.sqrt(a*a+r*r)}},{key:"scale",value:function(t,e,n){return(t-e[0])*(n[1]-n[0])/(e[1]-e[0])+n[0]}},{key:"getFrameTime",value:function(){var t=this.getTS(),e=this.prevTime,n=t-(void 0===e?t:e);return this.prevTime=t,this.setState({frameTime:t}),n}},{key:"drawScene",value:function(){var t=this.state,e=(t.width,t.height,t.pixelSize,t.cutoff,t.color,t.speed,this.ctx,this.getFrameTime());this.clearFrame(),this.boids.forEach(function(t){return t.doFrame(e)}),this.boids.forEach(function(t){return t.draw()})}},{key:"render",value:function(){var t=this,e=this.state,n=e.width,i=e.height,r=e.debug;return a.a.createElement("div",{className:"grid"},a.a.createElement("div",{className:"ui"},a.a.createElement("p",null,a.a.createElement("label",{htmlFor:"debug"},"Debug"),a.a.createElement("select",{id:"debug",value:r,onChange:function(e){return t.setState({debug:e.target.value})}},a.a.createElement("option",{value:0},"Off"),a.a.createElement("option",{value:-1},"On"),Array.from(Array(this.count).keys()).filter(function(t){return t}).map(function(t){return a.a.createElement("option",{key:"debug".concat(t),value:t},t)})))),a.a.createElement("div",{className:"dots"},a.a.createElement("canvas",{ref:"canvas",width:n,height:i})))}}]),n}(i.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(a.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[10,1,2]]]);
//# sourceMappingURL=main.8c270076.chunk.js.map