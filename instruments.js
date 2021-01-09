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



/* Crediting this code to Chris Lowis (Attribution 3.0 Unported) */
/* Thank you! */

function makeAudio(x) {
    return new Audio(audiopath + audioFiles[x]);
}




var context = new AudioContext


function Kick(context) {
	this.context = context;
}


Kick.prototype = {
    setup() {
        this.osc = this.context.createOscillator();
        this.gain = this.context.createGain();
        this.osc.connect(this.gain);
        this.gain.connect(this.context.destination)  
    },
    trigger(time) {
        this.setup();
        this.osc.frequency.setValueAtTime(150, time);
        this.gain.gain.setValueAtTime(1, time);
        this.osc.frequency.exponentialRampToValueAtTime(0.0001, time + 0.5);
        this.gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.5);
        this.osc.start(time);
        this.osc.stop(time + 0.5);
    }
}



function Snare(context) {
	this.context = context;
}

Snare.prototype = {
    noiseBuffer() {
        var bufferSize = this.context.sampleRate;
        var buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
        var output = buffer.getChannelData(0);

        for (var i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        return buffer;
    },
    setup() {
        this.noise = this.context.createBufferSource();
        this.noise.buffer = this.noiseBuffer();
        var noiseFilter = this.context.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 1000;
        this.noise.connect(noiseFilter);
        this.noiseEnvelope = this.context.createGain();
        noiseFilter.connect(this.noiseEnvelope);
        this.noiseEnvelope.connect(this.context.destination);
        this.osc = this.context.createOscillator();
        this.osc.type = 'triangle';

        this.oscEnvelope = this.context.createGain();
        this.osc.connect(this.oscEnvelope);
        this.oscEnvelope.connect(this.context.destination);
    },
    trigger(time) {
        this.setup();

        this.noiseEnvelope.gain.setValueAtTime(1, time);
        this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
        this.noise.start(time)

        this.osc.frequency.setValueAtTime(100, time);
        this.oscEnvelope.gain.setValueAtTime(0.7, time);
        this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
        this.osc.start(time)

        this.osc.stop(time + 0.2);
        this.noise.stop(time + 0.2);
    }
}


var kick = new Kick(context)


var now = context.currentTime
//kick.trigger(now)

//var snare = new Snare(context)
//var hiHat = new HiHat(context, snare.noiseBuffer)
//snare.trigger(now + 1)

