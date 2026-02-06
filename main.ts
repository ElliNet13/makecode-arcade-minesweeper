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
    if (!(minesSpawnedBool)) {
        place_mines()
        minesSpawnedBool = true
    }
    howManyMines = 0
    findMines = sprites.create(assets.image`nothing`, SpriteKind.Player)
    findMines.z = -99999
    tiles.placeOnTile(findMines, visiblePlayerSprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))
    for (let index = 0; index <= 4; index++) {
        if (index == 0) {
            tiles.placeOnTile(findMines, visiblePlayerSprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))
        } else if (index == 1) {
            tiles.placeOnTile(findMines, visiblePlayerSprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Top))
        } else if (index == 2) {
            tiles.placeOnTile(findMines, visiblePlayerSprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))
        } else if (index == 3) {
            tiles.placeOnTile(findMines, visiblePlayerSprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom))
        }
        for (let value of sprites.allOfKind(SpriteKind.Mine)) {
            if (findMines.overlapsWith(value)) {
                howManyMines += 1
            }
        }
    }
    if (howManyMines == 0) {
        tiles.setTileAt(visiblePlayerSprite.tilemapLocation(), assets.tile`Empty tile`)
    } else if (howManyMines == 1) {
        tiles.setTileAt(visiblePlayerSprite.tilemapLocation(), assets.tile`1`)
    } else if (howManyMines == 2) {
        tiles.setTileAt(visiblePlayerSprite.tilemapLocation(), assets.tile`2`)
    } else if (howManyMines == 3) {
        tiles.setTileAt(visiblePlayerSprite.tilemapLocation(), assets.tile`3`)
    } else if (howManyMines == 4) {
        tiles.setTileAt(visiblePlayerSprite.tilemapLocation(), assets.tile`4`)
    } else if (howManyMines == 5) {
        tiles.setTileAt(visiblePlayerSprite.tilemapLocation(), assets.tile`5`)
    } else if (howManyMines == 6) {
        tiles.setTileAt(visiblePlayerSprite.tilemapLocation(), assets.tile`6`)
    } else if (howManyMines == 7) {
        tiles.setTileAt(visiblePlayerSprite.tilemapLocation(), assets.tile`7`)
    } else if (howManyMines == 8) {
        tiles.setTileAt(visiblePlayerSprite.tilemapLocation(), assets.tile`8`)
    }
    tiles.placeOnTile(findMines, visiblePlayerSprite.tilemapLocation())
    for (let value of sprites.allOfKind(SpriteKind.Mine)) {
        if (findMines.overlapsWith(value)) {
            sprites.destroy(value)
            tiles.setTileAt(visiblePlayerSprite.tilemapLocation(), assets.tile`mine`)
        }
    }
    sprites.destroy(findMines)
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
    currentMine.z = -99999
    if (currentMine.overlapsWith(visiblePlayerSprite)) {
        sprites.destroy(currentMine)
        place_mine()
    }
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
let findMines: Sprite = null
let howManyMines = 0
let minesSpawnedBool = false
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
minesSpawnedBool = false
forever(function () {
    if (is_in_game_area(realPlayerSprite.tilemapLocation())) {
        tiles.placeOnTile(visiblePlayerSprite, realPlayerSprite.tilemapLocation())
    }
})
