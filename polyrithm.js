const minimumRad = 260;
const radIncr = 65;

const beatFill = 'black'
const beatStroke = 'indigo'
const beatStrokeWidth = 4;
const miniOn = 13;
const miniOff = 8;







function adjustSizes(low) {

    if (rhythms.length > 3) {}
    if (low > 50) {

    }
    const minimumRad = 260;
    const radIncr = 65;
    const miniOn = 13;
    const miniOff = 8;
}






$('#tempo').change(function () {
    interval = $(this).val();
});

$('#tempo').on('input', function () {
    $(this).trigger('change');
});




$(".instruments").on('change', function () {
    var index = $(".instruments").index(this);

    rhythms[index].audio = makeAudio(
        $(".instruments").eq(index).val()
    );
});
