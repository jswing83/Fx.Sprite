/*
---

name: Fx.Sprite

description: 
 Animate Image Sprites by Frame
 This is useful for animating image sprites. Fx.CSS can scroll through the sprites pixel by pixel but Fx.Sprite will move through the sprite frame by frame similarto a film strip.
 demo -- http://jsfiddle.net/jswing83/SSXmw/

license: MIT-style

authors:
 - Jason Swing
  
requires:
  core/1.3.2: 
  - Class.Extras
  - Element.Event
  - Element.Style
  - Fx.Transitions

provides: [Fx.Sprite]

...
*/

'use strict';

Fx.Sprite = new Class({

	Extends: Fx,

	Implements: [Options],

	options: {
		axis: 'x',					// background image frames are positioned along x or y axis
		curSFrame: 0,				// if you start on a frame other than the first, specify here. first frame = 0
		link: 'cancel',
		loop: false,				// is the first/last frame a continuation of the series/animation? regardless of whether you plan on using the loop method
		position: {					// position of first frame, allows for serveral sprited animations in one image
			x: 0,
			y: 0
		},
		sFrames: 10,				// total number of frames including first and last
		size: {						// size of each sFrame, not full image
			x: 18,
			y: 18
		},
		transition: Fx.Transitions.linear
	},

	initialize: function (element, options) {
		var ele = document.id(element),
			storage = ele.retrieve('Fx.Sprite');
		if (storage) { return storage; }
		this.element = ele;
		ele.store('Fx.Sprite', this);
		this.parent(options);
	},

	set: function (now) {
		if (now !== this.options.curSFrame) {
			var n = this.options.curSFrame = (this.calcOverShoot(now)),
				pos = this.calcBGPos(n);
			this.element.setStyle('background-position', pos.x + 'px ' + pos.y + 'px');
		}
		return this;
	},

	start: function (sFrame) {
		return this.parent(this.options.curSFrame, sFrame);
	},

	compute: function (from, to, delta) {
		return Fx.compute(from, to, delta).round();
	},

	calcBGPos: function (sFrame) {
		return (this.options.axis === 'x') ?
				{ x: this.options.size.x * sFrame * -1, y: this.options.position.y } :
				{ x: this.options.position.x, y: this.options.size.y * sFrame * -1 };
	},
	
	calcOverShoot: function (sFrame) {
		if (!this.options.loop) {
			return sFrame.limit(0, this.options.sFrames - 1);
		} else if (sFrame < 0) {
			return this.options.sFrames + sFrame;
		} else if (sFrame > this.options.sFrames - 1) {
			return sFrame - this.options.sFrames;
		} else {
			return sFrame;
		}
	},

	first: function () {
		this.movingForward = false;
		return this.start.apply(this, [0]);
	},

	last: function () {
		this.movingForward = true;
		return this.start.apply(this, [this.options.sFrames - (this.options.loop ? 0 : 1)]);
	},

	next: function () {
		return this.set.apply(this, [this.options.curSFrame + 1]);
	},

	prev: function () {
		return this.set.apply(this, [this.options.curSFrame - 1]);
	},

	go: function (sFrame) {
		this.movingForward = (sFrame > this.options.curSFrame);
		return this.start.apply(this, [sFrame]);
	},
	
	toggle: function () {
		var forward = (typeOf(this.movingForward) === 'boolean') ?
				!this.movingForward : (this.options.curSFrame <= this.options.sFrames / 2);
		return forward ? this.last.apply(this) : this.first.apply(this);
	},
	
	loopForward: function (times) {
		if (this.isRunning()) {
			this.pause();
		} else {
			this.resume();
			if (!this.isRunning()) {
				this.addEvent('complete', function () {
					return this.last.apply(this);
				});
				return this.last.apply(this);
			}
		}		
	},
	
	loopBackward: function (times) {
		console.log('coming soon');
	},
	
	loopReverse: function (times) {
		console.log('coming soon');
	}
	
});
