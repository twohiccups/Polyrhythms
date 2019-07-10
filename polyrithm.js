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


function makeAudio(x) {
    console.log(x)
    console.log(audiopath + audioFiles[x])
    return new Audio(audiopath + audioFiles[x]);
}

function Beat(radius, isOn, position) {
    this.selected = false;
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
            this.setAttribute('r',  miniOff );
        }
        else {
            this.setAttribute('r', miniOn);
        }
        this.isOn = !this.isOn;
    });       
}
// audio


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
            fill:'rgb(234,255,255)'
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
    this.rotate = function() {}
    this.rotatecc = function() {}
        
}

function makeSVG(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) 
        el.setAttribute(k, attrs[k]);
    return el;
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
    const minimumRad = 260;
    const radIncr = 65;
    const miniOn = 13;
    const miniOff = 8; 
    
    
}

function gcd(x, y) {
    var temp;
    while (y) {
        temp = y;
        y = x % y;
        x = temp;
    }
    return x;
}

function lcm(x, y) {
    return x * y / gcd(x, y);
}





var count;
function update() {
    for (i = 0; i < rhythms.length; i++) {
        rhythms[i].rep.segs[count].miniCircle.setAttribute('fill', 'red');
        rhythms[i].rep.segs[(count - 1 + low) % low].miniCircle.setAttribute('fill', 'black');
        if(!rhythms[i].muted &&
           rhythms[i].rep.segs[count].miniCircle.isOn) {
            rhythms[i].audio.currentTime = 0;
            rhythms[i].audio.play();
        }
    }
    count++; 
    count = count % low;
}

var interval;


 $('#tempo').change(function () {
        clearInterval(interval);
        interval = setInterval(update, $(this).val());
    });

    $('#tempo').on('input', function () {
        $(this).trigger('change');
    });

    $('#stop').click(function () {
        clearInterval(interval);
    });


function loop() {
    count = 0;
    interval = setInterval(update, 250);
}


function setTempo() {
    ////
}

function reset() {
    clearInterval(interval);
    $("#canvas").empty();
    rhythms = [];
    count = 0;
}



function start(values) {
    reset();
    createPolyrhythm(values);
    loop();  
} 


$("#create").on("click", function(){
    var values = [];
    $(".form-control").each(function() {
        if (!$(this).val() == '') {
            values.push($(this).val());
        }
    } )
    start(values);
    
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
    $(".mute").eq(index).toggleClass("fa-volume-mute fa-drum");

    if ($(".mute").eq(index).hasClass("fa-drum")) {
        // rotate()
    }
    else {
       // rotate()
    }
})

$(".rotatecc").on("click", function() {
    
    var index = $('.mute').index(this);
    $(".mute").eq(index).toggleClass("fa-volume-mute fa-drum");

    if ($(".mute").eq(index).hasClass("fa-drum")) {
        // rotatecc()
    
    }
    else {
       // rotatecc()
    }
})


function add(x) {
    alert(x)
}


$(".instruments").on('change', function () {
    var index = $(".instruments").index(this);
    
    rhythms[index].audio = makeAudio(
        'drum'
    );
});

