const minimumRad = 260;
const radIncr = 65;

const beatFill = 'black'
const beatStroke = 'indigo'
const beatStrokeWidth = 4;
const miniOn = 13;
const miniOff = 8;

var rhythms = [];
var currentRhythmInterval = 0;


function Beat(radius, isOn, position) {
    var attrs = {
        cx: centerX - radius * Math.sin(2 * position * Math.PI),
        cy: centerY - radius * Math.cos(2 * position * Math.PI),
        r: (isOn ? miniOn : miniOff),
        'stroke-width': beatStrokeWidth,
        'stroke': beatStroke,
        fill: beatFill
    }

    this.miniCircle = makeSVG("circle", attrs);
    this.miniCircle.isOn = isOn;
    $("#canvas").append(this.miniCircle);

    this.miniCircle.addEventListener("click", function () {
        if (this.isOn) {
            this.setAttribute('r', miniOff);
        } else {
            this.setAttribute('r', miniOn);
        }
        this.isOn = !this.isOn;
    });
}

Beat.prototype.setOn = function () {
    this.miniCircle.isOn = true;
    this.miniCircle.setAttribute('r', miniOn);
}

Beat.prototype.setOff = function () {
    this.miniCircle.isOn = false;
    this.miniCircle.setAttribute('r', miniOff);
}

function makeSVG(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}


function RhythmRep(radius, low, time) {
    this.segs = [];
    this.circle;
    this.radius = radius;

    var attrs = {
        cx: centerX,
        cy: centerY,
        r: radius,
        'stroke-width': 7,
        'stroke': 'black',
        fill: 'rgb(255,255,234)'
    };

    //here
    var circle = makeSVG('circle', attrs);
    $("#canvas").append(circle);
    this.circle = circle;

    var isOn;
    for (var i = 0; i < low; i++) {
        if (i % time == 0) {
            isOn = true;
        } else isOn = false;
        this.segs.push(
            new Beat(this.radius, isOn, i / low)
        );
    }
}

function createPolyrhythm(tracks, low) {
    for (i = tracks.length - 1; i >= 0; i--) {
        rhythms.push(
            new Rhythm(
                minimumRad + radIncr * i,
                tracks[i].beatNumber,
                low,
                tracks[i].instrument,
                tracks[i].isMute
            )
        );
    }
}


function Rhythm(radius, time, low, audio, muted) {
    console.log(radius, time, low, audio, muted)
    this.radius = radius;
    this.audio = makeAudio(audio);
    this.muted = muted;
    this.time = time;
    this.rep = new RhythmRep(radius, low, time);
}


Rhythm.prototype.rotate = function () {
    var first = this.rep.segs[0].miniCircle.isOn;

    for (i = 0; i < this.rep.segs.length - 1; i++) {
        if (this.rep.segs[i + 1].miniCircle.isOn) {
            this.rep.segs[i].setOn();
        } else this.rep.segs[i].setOff();
    }
    if (first) {
        this.rep.segs[this.rep.segs.length - 1].setOn();
    } else this.rep.segs[this.rep.segs.length - 1].setOff();

}


Rhythm.prototype.rotatecc = function () {
    var last = this.rep.segs[this.rep.segs.length - 1].miniCircle.isOn;
    for (i = this.rep.segs.length - 1; i > 0; i--) {
        if (this.rep.segs[i - 1].miniCircle.isOn) {
            this.rep.segs[i].setOn();
        } else this.rep.segs[i].setOff();
    }
    if (last) {
        this.rep.segs[0].setOn();
    } else this.rep.segs[0].setOff();
}

Rhythm.prototype.clear = function () {
    this.rep.segs.forEach(function (s) {
        s.setOff();
    })
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


$(".rotate").on("click", function () {

    var index = $('.rotate').index(this);
    rhythms[index].rotate();
})


$(".rotatecc").on("click", function () {

    var index = $('.rotatecc').index(this);
    rhythms[index].rotatecc();
})


$(".instruments").on('change', function () {
    var index = $(".instruments").index(this);

    rhythms[index].audio = makeAudio(
        $(".instruments").eq(index).val()
    );
});
