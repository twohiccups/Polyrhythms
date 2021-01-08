const minimumRad = 260;
const radIncr = 65;

const beatFill = 'black'
const beatStroke = 'indigo'
const beatStrokeWidth = 4;
const miniOn = 13;
const miniOff = 8;

var rhythms = [];
var currentRhythmInterval = 0;




function Rhythm(radius, time, low, audio, muted) {
    console.log(radius, time, low, audio, muted)
    this.radius = radius;
    this.audio = makeAudio(audio);
    this.muted = muted;
    this.time = time;
    this.rep = new RhythmRep(radius, low, time);
}



function adjustSizes(low) {

    if (rhythms.length > 3) {}
    if (low > 50) {

    }
    const minimumRad = 260;
    const radIncr = 65;
    const miniOn = 13;
    const miniOff = 8;
}



var count = 0;



var interval = 100;





$('#tempo').change(function () {
    interval = $(this).val();
});

$('#tempo').on('input', function () {
    $(this).trigger('change');
});

$('#stop').click(function () {
    stop();
});




$(".mute").on("click", function () {

    var index = $('.mute').index(this);
    $(".mute").eq(index).toggleClass("fa-volume-mute fa-drum");

    if ($(".mute").eq(index).hasClass("fa-drum")) {
        rhythms[index].muted = false;
    } else {
        rhythms[index].muted = true;
    }
})



$(".instruments").on('change', function () {
    var index = $(".instruments").index(this);

    rhythms[index].audio = makeAudio(
        $(".instruments").eq(index).val()
    );
});
