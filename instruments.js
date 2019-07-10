const audioFiles = {
    'drum': "1.wav",
    'kick': "2.wav"
}

var audiopath = "samples/"

Object.keys(audioFiles).forEach(function(key) {
    $(".instruments").append("<option>"+ key + "</option>")
});
