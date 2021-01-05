BITCH = {
    
}

BITCH.prototype.plantTrees = function () {
    for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
        app.game.send("plantPlant", {
                x: CLIENT.Game.player.x  + i*15,
                y: CLIENT.Game.player.y  + j*15,
                key: 'tree_plant'
            });
    }}
}


BITCH.prototype.plantTrees = function () {
    for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
        app.game.send("plantPlant", {
                x: CLIENT.Game.player.x  + i*15,
                y: CLIENT.Game.player.y  + j*15,
                key: 'corn'
            });
    }}
}