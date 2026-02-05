controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    tiles.setTileAt(realPlayerSprite.tilemapLocation(), assets.tile`flag`)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    tiles.setTileAt(realPlayerSprite.tilemapLocation(), assets.tile`Empty spot`)
})
let realPlayerSprite: Sprite = null
scene.setBackgroundImage(assets.image`background`)
tiles.setCurrentTilemap(tilemap`Main screen`)
let visiblePlayerSprite = sprites.create(assets.image`player`, SpriteKind.Player)
realPlayerSprite = sprites.create(assets.image`realplayer`, SpriteKind.Player)
tiles.placeOnTile(realPlayerSprite, tiles.getTileLocation(0, 0))
controller.moveSprite(realPlayerSprite)
forever(function () {
    tiles.placeOnTile(visiblePlayerSprite, realPlayerSprite.tilemapLocation())
})
