namespace SpriteKind {
    export const Mine = SpriteKind.create()
}
function is_in_game_area (location: tiles.Location) {
    if (location.column > 1 && location.column < 8) {
        if (location.row > 1 && location.row < 6) {
            return true
        }
    }
    return false
}
function A () {
    tiles.setTileAt(visiblePlayerSprite.tilemapLocation(), assets.tile`Empty tile`)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    B()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    A()
})
function place_mine () {
    currentMine = sprites.create(assets.image`nothing`, SpriteKind.Mine)
    tiles.placeOnRandomTile(currentMine, assets.tile`Covered tile`)
    for (let value of sprites.allOfKind(SpriteKind.Mine)) {
        if (currentMine.overlapsWith(value)) {
            sprites.destroy(currentMine)
            place_mine()
        }
    }
}
function B () {
    tiles.setTileAt(visiblePlayerSprite.tilemapLocation(), assets.tile`flag`)
}
browserEvents.onMouseMove(function (x, y) {
    realPlayerSprite.setPosition(x, y)
})
function place_mines () {
    tiles.setCurrentTilemap(tilemap`Main screen`)
    for (let index = 0; index < 4; index++) {
        place_mine()
    }
}
browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x, y) {
    A()
})
browserEvents.MouseRight.onEvent(browserEvents.MouseButtonEvent.Pressed, function (x, y) {
    B()
})
let currentMine: Sprite = null
let realPlayerSprite: Sprite = null
let visiblePlayerSprite: Sprite = null
scene.setBackgroundImage(assets.image`background`)
tiles.setCurrentTilemap(tilemap`Main screen`)
visiblePlayerSprite = sprites.create(assets.image`player`, SpriteKind.Player)
tiles.placeOnTile(visiblePlayerSprite, tiles.getTileLocation(2, 2))
realPlayerSprite = sprites.create(assets.image`realplayer`, SpriteKind.Player)
tiles.placeOnTile(realPlayerSprite, tiles.getTileLocation(2, 2))
controller.moveSprite(realPlayerSprite)
browserEvents.setCursorVisible(false)
place_mines()
forever(function () {
    if (is_in_game_area(realPlayerSprite.tilemapLocation())) {
        tiles.placeOnTile(visiblePlayerSprite, realPlayerSprite.tilemapLocation())
    }
})
