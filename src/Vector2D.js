class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        if (v instanceof Vector2D) {
			this.x += v.x;
			this.y += v.y;
		} else {
			this.x += v;
			this.y += v;
		}

		return this;
    }

	static add(a, b) {
		return a.clone().add(b);
	}

    subtract(v) {
		if (v instanceof Vector2D) {
			this.x -= v.x;
			this.y -= v.y;
		} else {
			this.x -= v;
			this.y -= v;
		}
		return this;
	}

	static subtract(a, b) {
		return a.clone().subtract(b);
	}

	multiply(v) {
		if (v instanceof Vector2D) {
			this.x *= v.x;
			this.y *= v.y;
		} else {
			this.x *= v;
			this.y *= v;
		}
		return this;
	}

	static multiply(a, b) {
		return a.clone().multiply(b);
	}

	divide(v) {
		if (v instanceof Vector2D) {
			if(v.x != 0) this.x /= v.x;
			if(v.y != 0) this.y /= v.y;
		} else {
			if(v != 0) {
				this.x /= v;
				this.y /= v;
			}
		}
		return this;
	}

	static divide(a, b) {
		return a.clone().divide(b);
	}

	rotate(rad) {
		const { x, y } = this;
	    //const rad = deg * (Math.PI/180);
	    const cos = Math.cos(rad);
	    const sin = Math.sin(rad);

		const dp = 10000;

	    this.x = Math.round(dp*(x * cos - y * sin))/dp;
		this.y = Math.round(dp*(x * sin + y * cos))/dp;
	};

	static rotate(a, deg) {
		return a.clone().rotate(deg);
	}

	distance(v) {
		return Math.hypot(this.x - v.x, this.y - v.y);
	}

	static distance(a, b) {
		return a.distance(b);
	}

    equals(v) {
		return this.x == v.x && this.y == v.y;
	}

	equal(v) {
		return this.equals(v);
	}

	dot(v) {
		return this.x * v.x + this.y * v.y;
	}
	
    cross(v) {
		return this.x * v.y - this.y * v.x
	}
	
    length() {
		return Math.sqrt(this.dot(this));
	}
	
    normalize() {
		return this.divide(this.length());
	}
	
    min() {
		return Math.min(this.x, this.y);
	}
	
    max() {
		return Math.max(this.x, this.y);
	}

	radians() {
		return -Math.atan2(this.y, this.x);
	}
	
    toAngles() {
		return -Math.atan2(-this.y, this.x);
	}
	
    angleTo(a) {
		return -Math.atan2(a.y - this.y, a.x - this.x);
	}
	
	clone() {
		return new Vector2D(this.x, this.y);
	}

	set(x, y) {
		this.x = x; this.y = y;
		return this;
	}
}

export default Vector2D;