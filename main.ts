namespace SpriteKind {
    export const Mine = SpriteKind.create()
}
function Win_check () {
    winCheckBool = true
    for (let value of sprites.allOfKind(SpriteKind.Mine)) {
        if (!(tiles.tileAtLocationEquals(value.tilemapLocation(), assets.tile`flag`))) {
            winCheckBool = false
        }
    }
    if (!(winCheckBool)) {
        return
    }
    for (let index = 0; index <= 3; index++) {
        for (let index2 = 0; index2 <= 5; index2++) {
            if (tiles.tileAtLocationEquals(tiles.getTileLocation(index2 + 2, index + 2), assets.tile`Covered tile`)) {
                winCheckBool = false
            }
        }
    }
    if (!(winCheckBool)) {
        return
    }
    game.gameOver(true)
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
    if (!(allowedToPlay)) {
        return
    }
    if (!(tiles.tileAtLocationEquals(visiblePlayerSprite.tilemapLocation(), assets.tile`Covered tile`))) {
        return
    }
    if (!(minesSpawnedBool)) {
        place_mines()
        minesSpawnedBool = true
    }
    howManyMines = 0
    findMines = sprites.create(assets.image`nothing`, SpriteKind.Player)
    findMines.z = -99999
    tiles.placeOnTile(findMines, visiblePlayerSprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))
    for (let index = 0; index <= 8; index++) {
        if (index == 0) {
            tiles.placeOnTile(findMines, visiblePlayerSprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))
        } else if (index == 1) {
            tiles.placeOnTile(findMines, visiblePlayerSprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Top))
        } else if (index == 2) {
            tiles.placeOnTile(findMines, visiblePlayerSprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))
        } else if (index == 3) {
            tiles.placeOnTile(findMines, visiblePlayerSprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom))
        } else if (index == 4) {
            tiles.placeOnTile(findMines, visiblePlayerSprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))
        } else if (index == 5) {
            tiles.placeOnTile(findMines, visiblePlayerSprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Top))
            tiles.placeOnTile(findMines, findMines.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))
        } else if (index == 6) {
            tiles.placeOnTile(findMines, visiblePlayerSprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom))
            tiles.placeOnTile(findMines, findMines.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))
        } else if (index == 7) {
            tiles.placeOnTile(findMines, visiblePlayerSprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom))
            tiles.placeOnTile(findMines, findMines.tilemapLocation().getNeighboringLocation(CollisionDirection.Right))
        } else if (index == 8) {
            tiles.placeOnTile(findMines, visiblePlayerSprite.tilemapLocation().getNeighboringLocation(CollisionDirection.Top))
            tiles.placeOnTile(findMines, findMines.tilemapLocation().getNeighboringLocation(CollisionDirection.Left))
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
            allowedToPlay = false
            sprites.destroy(value)
            tiles.setTileAt(visiblePlayerSprite.tilemapLocation(), assets.tile`mine`)
            music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.UntilDone)
            for (let value of sprites.allOfKind(SpriteKind.Mine)) {
                pause(500)
                tiles.setTileAt(value.tilemapLocation(), assets.tile`mine`)
                sprites.destroy(value)
                music.play(downSound, music.PlaybackMode.InBackground)
            }
            pause(3500)
            game.gameOver(false)
        }
    }
    sprites.destroy(findMines)
    Win_check()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    B()
})
controller.combos.attachCombo("uuddlr", function () {
    game.splash("uuddlr")
    for (let value of sprites.allOfKind(SpriteKind.Mine)) {
        value.startEffect(effects.fire)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    A()
})
function place_mine () {
    currentMine = sprites.create(assets.image`nothing`, SpriteKind.Mine)
    tiles.placeOnRandomTile(currentMine, assets.tile`Covered tile`)
    currentMine.z = -99999
}
function B () {
    if (!(allowedToPlay)) {
        return
    }
    if (tiles.tileAtLocationEquals(visiblePlayerSprite.tilemapLocation(), assets.tile`flag`)) {
        tiles.setTileAt(visiblePlayerSprite.tilemapLocation(), assets.tile`Covered tile`)
    } else if (tiles.tileAtLocationEquals(visiblePlayerSprite.tilemapLocation(), assets.tile`Covered tile`)) {
        tiles.setTileAt(visiblePlayerSprite.tilemapLocation(), assets.tile`flag`)
        for (let value of sprites.allOfKind(SpriteKind.Mine)) {
            if (visiblePlayerSprite.overlapsWith(value)) {
                let mySprite: Sprite = null
                effects.clearParticles(mySprite)
            }
        }
    }
    Win_check()
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
let winCheckBool = false
let minesSpawnedBool = false
let downSound: music.SoundEffect = null
let realPlayerSprite: Sprite = null
let visiblePlayerSprite: Sprite = null
let allowedToPlay = false
allowedToPlay = false
scene.setBackgroundImage(assets.image`background`)
tiles.setCurrentTilemap(tilemap`Main screen`)
visiblePlayerSprite = sprites.create(assets.image`player`, SpriteKind.Player)
tiles.placeOnTile(visiblePlayerSprite, tiles.getTileLocation(2, 2))
realPlayerSprite = sprites.create(assets.image`realplayer`, SpriteKind.Player)
tiles.placeOnTile(realPlayerSprite, tiles.getTileLocation(2, 2))
controller.moveSprite(realPlayerSprite)
browserEvents.setCursorVisible(false)
game.setGameOverEffect(false, effects.dissolve)
game.setGameOverEffect(true, effects.none)
game.setGameOverScoringType(game.ScoringType.HighScore)
downSound = music.createSoundEffect(WaveShape.Noise, 3757, 1, 255, 0, 1000, SoundExpressionEffect.Vibrato, InterpolationCurve.Logarithmic)
let explodeSound = music.createSoundEffect(WaveShape.Noise, 3757, 3657, 255, 0, 1000, SoundExpressionEffect.Warble, InterpolationCurve.Logarithmic)
game.setGameOverPlayable(false, explodeSound, false)
minesSpawnedBool = false
allowedToPlay = true
forever(function () {
    if (is_in_game_area(realPlayerSprite.tilemapLocation())) {
        tiles.placeOnTile(visiblePlayerSprite, realPlayerSprite.tilemapLocation())
    }
})
