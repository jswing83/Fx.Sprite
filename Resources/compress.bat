@echo off

if exist "../Source/Fx.Sprite-yc.js" del /Q /F "../Source/Fx.Sprite-yc.js"

for /f "eol=~ delims=" %%l in (../Source/Fx.Sprite.js) do (
  echo %%l>>"../Source/Fx.Sprite-yc.js"
  if %%l == */ goto :compress
)
:compress
java -jar yuicompressor-2.4.7.jar ../Source/Fx.Sprite.js >> ../Source/Fx.Sprite-yc.js