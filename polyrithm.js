const minimumRad = 260;
const radIncr = 65;
const centerX = 400;
const centerY = 400;



const audio = [
    new Audio('drum.mp3'),
    new Audio('drum2.mp3'),
    new Audio('drum2.mp3'),
    new Audio('drum2.mp3'),
    new Audio('drum2.mp3')
];

const beatFill = 'black'
const beatStroke = 'indigo'
const beatStrokeWidth = 4;
const miniOn = 13;
const miniOff = 8; 

var rhythms = [];
var low;



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
function Rhythm (radius, time, low, color) {
    this.radius = radius;
    this.circle;
    this.sound = true;
    this.time = time;
    this.segs = [];
    this.init = function() {
        var attrs = {
            cx: centerX,
            cy: centerY,
            r:radius,
            'stroke-width':7,
            'stroke':'black',
            fill:'rgb(234,255,255)'
        };
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
    };
    this.init();
}


function makeSVG(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) 
        el.setAttribute(k, attrs[k]);
    return el;
}


function createPolyrhythm(times) {
    console.log(times);
    low = times[0];
    for(i = 1; i < times.length; i++) {
        low = lcm(low, times[i]);
    }
    
    for(i = times.length-1; i >= 0; i--) {
        rhythms.push(
            new Rhythm(minimumRad + radIncr * i, times[i], low)
        );
    }
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
        rhythms[i].segs[count].miniCircle.setAttribute('fill', 'red');
        rhythms[i].segs[(count-1+low) % low].miniCircle.setAttribute('fill', 'black');
        if(rhythms[i].segs[count].miniCircle.isOn) {
            audio[i].currentTime = 0;
            audio[i].play();
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


function reset() {
    clearInterval(interval);
    $("#canvas").empty();
    rhythms = [];
    count = 0;
}



function start() {
    reset();
    createPolyrhythm([$("#time1").val(), $("#time2").val()]);
    loop();  
} 


$(".tpicon").on("click", function() {
    
    var index = $('.tpicon').index(this);
    $(".tpicon").eq(index).toggleClass("fa-plus-square fa-minus-square");

    if ($(".tpicon").eq(index).hasClass("fa-plus-square")) {
        $(".form-control").eq(index).prop('disabled', false);
    
    }
    else {
        $(".form-control").eq(index).prop('disabled', true);
        $(".form-control").val('')
    }
})

$(".mute").on("click", function() {
    
    var index = $('.mute').index(this);
    $(".mute").eq(index).toggleClass("fa-volume-mute fa-drum");

    if ($(".mute").eq(index).hasClass("fa-drum")) {
        // mute()
    
    }
    else {
       // unmute()
    }
})

$(".rotate").on("click", function() {
    
    var index = $('.rotate').index(this);
    $(".mute").eq(index).toggleClass("fa-volume-mute fa-drum");

    if ($(".mute").eq(index).hasClass("fa-drum")) {
        // mute()
    
    }
    else {
       // unmute()
    }
})

$(".rotatecc").on("click", function() {
    
    var index = $('.mute').index(this);
    $(".mute").eq(index).toggleClass("fa-volume-mute fa-drum");

    if ($(".mute").eq(index).hasClass("fa-drum")) {
        // mute()
    
    }
    else {
       // unmute()
    }
})


function add(x) {
    alert(x)
}
