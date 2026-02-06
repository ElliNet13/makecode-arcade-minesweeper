function A () {
    tiles.setTileAt(realPlayerSprite.tilemapLocation(), assets.tile`transparency16`)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    B()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    A()
})
function B () {
    tiles.setTileAt(realPlayerSprite.tilemapLocation(), assets.tile`flag`)
}
browserEvents.onMouseMove(function (x, y) {
    realPlayerSprite.setPosition(x, y)
})
browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x, y) {
    A()
})
browserEvents.MouseRight.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x, y) {
    B()
})
let realPlayerSprite: Sprite = null
scene.setBackgroundImage(assets.image`background`)
tiles.setCurrentTilemap(tilemap`Main screen`)
let visiblePlayerSprite = sprites.create(assets.image`player`, SpriteKind.Player)
realPlayerSprite = sprites.create(assets.image`realplayer`, SpriteKind.Player)
tiles.placeOnTile(realPlayerSprite, tiles.getTileLocation(0, 0))
controller.moveSprite(realPlayerSprite)
browserEvents.setCursorVisible(false)
forever(function () {
    if (realPlayerSprite.tilemapLocation().column > 1 && realPlayerSprite.tilemapLocation().column < 8) {
        if (realPlayerSprite.tilemapLocation().row > 1 && realPlayerSprite.tilemapLocation().row < 6) {
            tiles.placeOnTile(visiblePlayerSprite, realPlayerSprite.tilemapLocation())
        }
    }
})
