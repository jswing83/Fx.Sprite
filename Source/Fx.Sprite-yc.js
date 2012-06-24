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
"use strict";Fx.Sprite=new Class({Extends:Fx,Implements:[Options],options:{axis:"x",curSFrame:0,link:"cancel",loop:false,position:{x:0,y:0},sFrames:10,size:{x:18,y:18},transition:Fx.Transitions.linear},initialize:function(b,a){var c=document.id(b),d=c.retrieve("Fx.Sprite");if(d){return d}this.element=c;c.store("Fx.Sprite",this);this.parent(a)},set:function(a){if(a!==this.options.curSFrame){var c=this.options.curSFrame=(this.calcOverShoot(a)),b=this.calcBGPos(c);this.element.setStyle("background-position",b.x+"px "+b.y+"px")}return this},start:function(a){return this.parent(this.options.curSFrame,a)},compute:function(c,b,a){return Fx.compute(c,b,a).round()},calcBGPos:function(a){return(this.options.axis==="x")?{x:this.options.size.x*a*-1,y:this.options.position.y}:{x:this.options.position.x,y:this.options.size.y*a*-1}},calcOverShoot:function(a){if(!this.options.loop){return a.limit(0,this.options.sFrames-1)}else{if(a<0){return this.options.sFrames+a}else{if(a>this.options.sFrames-1){return a-this.options.sFrames}else{return a}}}},first:function(){this.movingForward=false;return this.start.apply(this,[0])},last:function(){this.movingForward=true;return this.start.apply(this,[this.options.sFrames-(this.options.loop?0:1)])},next:function(){return this.set.apply(this,[this.options.curSFrame+1])},prev:function(){return this.set.apply(this,[this.options.curSFrame-1])},go:function(a){this.movingForward=(a>this.options.curSFrame);return this.start.apply(this,[a])},toggle:function(){var a=(typeOf(this.movingForward)==="boolean")?!this.movingForward:(this.options.curSFrame<=this.options.sFrames/2);return a?this.last.apply(this):this.first.apply(this)},loopForward:function(a){if(this.isRunning()){this.pause()}else{this.resume();if(!this.isRunning()){this.addEvent("complete",function(){return this.last.apply(this)});return this.last.apply(this)}}},loopBackward:function(a){console.log("coming soon")},loopReverse:function(a){console.log("coming soon")}});