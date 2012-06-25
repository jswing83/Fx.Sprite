#!/bin/bash

rm -f ../Source/Fx.Sprite-yc.js

IFS=\n

while read line
do
	if [ "$line" > 0 ]; then
		echo "$line" >> ../Source/Fx.Sprite-yc.js;
	fi
	if [ "$line" == "*/" ]; then
		break;
	fi
done <../Source/Fx.Sprite.js

java -jar yuicompressor-2.4.7.jar ../Source/Fx.Sprite.js >> ../Source/Fx.Sprite-yc.js