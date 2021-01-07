const audioFiles = {
    'drum': "1.wav",
    'kick': "2.wav",
    'doom': "doom.wav",
    'bass': 'bass.wav',
    'bongo': 'bongo.wav',
    'bop' : 'bop.wav',
    'clap': 'clap.wav',
    'cowbell': 'cowbell.wav',
    'doom': 'doom.wav',
    'drum': 'drum.mp3',
    'fart': 'fart.wav',
    'knife': 'knife.wav',
    'tick': 'tick.mp3'
}

var audiopath = "samples/"

Object.keys(audioFiles).forEach(function(key) {
    $(".instruments").append("<option>"+ key + "</option>")
});

function makeAudio(x) {
    return new Audio(audiopath + audioFiles[x]);
}

