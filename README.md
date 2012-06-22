Fx.Sprite
=========

![Screenshot](https://github.com/jswing83/Fx.Sprite/raw/master/Resources/logo.jpg)

Animate image sprites frame by frame.

definition -- image sprite: an image containing sub images (or frames)

This is useful for animating image sprites. Fx.CSS can scroll through the sprites pixel by pixel but Fx.Sprite will move through the sprite frame by frame similar to a film strip.  This can also be used to create spinners (waiting animations).

demo: http://jsfiddle.net/jswing83/SSXmw/

Notes for Understanding
-----------------------

To avoid conflict with the base Fx class, anytime the code refers to a `frame`, I use `sFrame` (sprite frame) instead.

How to use
----------

Using this image as a sample:

![Screenshot](https://github.com/jswing83/Fx.Sprite/raw/master/Demo/gfx/emo_smile_64.png)

Image information:

1. size: 704x64
2. frames: 11
3. frame size: 64x64

```
#HTML
<div id="mySprite"></div>
```
```
#CSS
#mySprite {
	background-image: url(../path_to_images/emo_smile_64.png) no-repeat 0 0;
	height: 64px;
	width: 64px;
}
```
This CSS sets the div to the size of a single frame. Only the first smiley face will be visible.
```
#JS
new Fx.Sprite('mySprite', {
	sFrames: 11,
	size: {
		x: 64,
		y: 64
	}
});
```
After creating the Fx.Sprite object, it can be accessed through a variable reference or through the element's storage.
```
#JS

// variable reference
var sp = new Fx.Sprite('mySprite', {...});
sp.toggle();

//element's storage
new Fx.Sprite('mySprite', {...});
$('mySprite').retrieve('Fx.Sprite').toggle();
```
	
Options
-------

Includes all options for Fx class plus:

1. axis - (string, optional, default: x) using the standard x/y grid system, are your frames arranged along the `x` or `y` axis?
2. curSFrame - (number, optional, default: 0) if you use CSS background-position to start on a frame other than the first, specify it here. first frame = 0, last frame = array.length - 1
3. loop - (boolean, optional, default: false) is the first/last frame a continuation of the series?
4. position - (object, optional, default: {x:0, y:0}) position of the first frame of your animation, allows for serveral sprited animations in one image
	* in the image below, you would set the position to `{x:84, y:0}` to animate the red arrow (each frame is 28x28)           
		![Screenshot](https://github.com/jswing83/Fx.Sprite/raw/master/Demo/gfx/sample.png)
5. sFrames - (number, optional, default: 10) total number of frames
6. size - (object, optional, default: {x:18, y:18}) size of each frame, not the full image, all frames must be the same size
	
Methods
-------

1. set(frame) - specify the frame to jump straight to
2. go(frame) - specify the frame to animate to
3. first - animate to the first frame from the current frame
4. last - animate to the last frame from the current frame
5. next - jump straight to next frame
6. prev - jump straight ot previous frame
7. toggle - sets the animation in motion, determines whether to go forward or backward based on its previous direction, on the first call to toggle the current frame number is compared to the total number of frames divided by two
8. loopForward(times) - loops the animation indefinitely when `times = 0` or `times = null`, loops the animation the number number of `times` specified
9. loopBackward(times) - same as loopForward but in reverse
10. loopReverse(times) - same as loopForward but animation direction reverses on each loop

Known Bugs
----------

1. Toggling the animation when option:loop = true
	* This also affects the looping methods
