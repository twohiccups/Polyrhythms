const minimumRad = 260;
const radIncr = 65;
const centerX = $("#canvas").attr("width")/2;
const centerY = $("#canvas").attr("height")/2;
const beatFill = 'black'
const beatStroke = 'indigo'
const beatStrokeWidth = 4;
const miniOn = 13;
const miniOff = 8; 

var rhythms = [];
var low;
var currentRhythmInterval = 0;


function Beat(radius, isOn, position) {
    var attrs = {
        cx: centerX - radius * Math.sin(2*position*Math.PI),
        cy: centerY - radius * Math.cos(2*position*Math.PI),
        r:(isOn ? miniOn : miniOff),
        'stroke-width':beatStrokeWidth,
        'stroke': beatStroke,
        fill: beatFill
    }
    
    this.miniCircle = makeSVG("circle", attrs);  
    this.miniCircle.isOn = isOn;
    $("#canvas").append(this.miniCircle);
    
    this.miniCircle.addEventListener("click", function() {
        if (this.isOn) {
            this.setAttribute('r',  miniOff);        
        }
        else {
            this.setAttribute('r', miniOn);
        }
        this.isOn = !this.isOn;
    });       
}

Beat.prototype.setOn = function() {
    this.miniCircle.isOn = true;
    this.miniCircle.setAttribute('r',  miniOn); 
}

Beat.prototype.setOff = function() {
    this.miniCircle.isOn = false;
    this.miniCircle.setAttribute('r',  miniOff);
}

function makeSVG(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) 
        el.setAttribute(k, attrs[k]);
    return el;
}


function RhythmRep (radius, low, time) {
    this.segs = [];
    this.circle;
    this.radius = radius;
    
    var attrs = {
            cx: centerX,
            cy: centerY,
            r:radius,
            'stroke-width':7,
            'stroke':'black',
            fill:'rgb(255,255,234)'
    };
    
    //here
    var circle = makeSVG('circle', attrs);
    $("#canvas").append(circle);
    this.circle = circle;

    var isOn;
    for (var i = 0; i < low; i++) {
        if (i % time == 0) {
            isOn = true;
        }
        else isOn = false;
        this.segs.push(
            new Beat(this.radius, isOn, i / low)
        );  
    }
}

function Rhythm (radius, time, low, audio, muted) {
    this.radius = radius;
    this.audio = makeAudio(audio);
    this.muted = muted;
    this.time = time;
    this.rep = new RhythmRep(radius, low, time);        
}

Rhythm.prototype.rotate = function() {
    var first = this.rep.segs[0].miniCircle.isOn;
    
    for (i = 0; i < this.rep.segs.length - 1; i++) {
        if (this.rep.segs[i+1].miniCircle.isOn) {
            this.rep.segs[i].setOn();
        }
        else this.rep.segs[i].setOff();
    }
    if (first) {
        this.rep.segs[this.rep.segs.length - 1].setOn();
    }
    else this.rep.segs[this.rep.segs.length - 1].setOff();
    
}

Rhythm.prototype.rotatecc = function() {
    var last = this.rep.segs[this.rep.segs.length - 1].miniCircle.isOn;
    for (i = this.rep.segs.length - 1; i > 0; i--) {
        if (this.rep.segs[i-1].miniCircle.isOn) {
            this.rep.segs[i].setOn();
        }
        else this.rep.segs[i].setOff();
    }
    if (last) {
        this.rep.segs[0].setOn();
    }
    else this.rep.segs[0].setOff();
}

Rhythm.prototype.clear = function() {
    this.rep.segs.forEach(function(s) {
        s.setOff();
    })
}



function createPolyrhythm(values) {
    low = values[0];
    for(i = 1; i < values.length; i++) {
        low = lcm(low, values[i]);
    }
    for(i = values.length - 1; i >= 0; i--) {
        rhythms.push(
            new Rhythm(
                minimumRad + radIncr * i,
                values[i],
                low,
                $('.instruments').eq(i).val(),
                !$(".mute").eq(i).hasClass("fa-drum")
            )
        );
    }
}


function adjustSizes(low) {
    
    if (rhythms.length > 3) {
    }
    if (low > 50) {
        
    }
    const minimumRad = 260;
    const radIncr = 65;
    const miniOn = 13;
    const miniOff = 8; 
}



var count = 0;
function update() {
    for (i = 0; i < rhythms.length; i++) {
        rhythms[i].rep.segs[count].miniCircle.setAttribute('fill', 'red');
        rhythms[i].rep.segs[(count - 1 + low) % low].miniCircle.setAttribute('fill', 'black');
        if(!rhythms[i].muted && rhythms[i].rep.segs[count].miniCircle.isOn) {
            rhythms[i].audio.currentTime = 0;
            rhythms[i].audio.play();
        }
    }
    count++; 
    count = count % low;
}



function reset() {
    clearTimeout(currentRhythmInterval);
    stop();
    $("#canvas").empty();
    rhythms = [];
    count = 0;
}



function initialize(values) {
    reset();
    createPolyrhythm(values);
    stop();
    currentRhythmInterval = setTimeout(start(), 0.2);
} 
rhythmLoop = function(){}

function start(val) {
    loop.play = true;
    loop();
}

function stop() {
    loop.play = false;
//    interval = 10000000000000000
}

var interval = 100;

//loop();
function loop() {
    update();
    
    if (!loop.play) return;
    else setTimeout(loop, interval);
}





$("#create").on("click", function(){
    var values = [];
    $(".form-control").each(function() {
        if (!$(this).val() == '') {
            values.push($(this).val());
        }
    } )
//    initialize(values, tempo)
    initialize(values);
    
});


$('#tempo').change(function () {
        interval = $(this).val();
    });

    $('#tempo').on('input', function () {
        $(this).trigger('change');
    });

    $('#stop').click(function () {
        stop();
      });


$(".tpicon").on("click", function() {
    
    var index = $('.tpicon').index(this);
    $(".tpicon").eq(index).toggleClass("fa-plus-square fa-minus-square");

    if ($(".tpicon").eq(index).hasClass("fa-plus-square")) {
        $(".form-control").eq(index).prop('disabled', false);
    
    }
    else {
        $(".form-control").eq(index).prop('disabled', true);
        $(".form-control").eq(index).val('')
    }
})



$(".mute").on("click", function() {
    
    var index = $('.mute').index(this);
    $(".mute").eq(index).toggleClass("fa-volume-mute fa-drum");

    if ($(".mute").eq(index).hasClass("fa-drum")) {
        rhythms[index].muted = false;    
    }
    else {
        rhythms[index].muted = true;
    }
})


$(".rotate").on("click", function() {
    
    var index = $('.rotate').index(this);
    rhythms[index].rotate();
})

$(".delete").on("click", function() {
    
    var index = $('.delete').index(this);
    rhythms[index].clear();
})

$(".rotatecc").on("click", function() {
    
    var index = $('.rotatecc').index(this);
    rhythms[index].rotatecc();
})


$(".instruments").on('change', function () {
    var index = $(".instruments").index(this);
    
    rhythms[index].audio = makeAudio(
        $(".instruments").eq(index).val()
    );
});


