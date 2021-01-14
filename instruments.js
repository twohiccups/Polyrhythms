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
files = Object.values(audioFiles)
files = files.map(f => audiopath + f )


var kick;





class Instrument {
    constructor(buffer) {
        this.buffer = buffer
    }
    
    trigger(time) {
        let source = context.createBufferSource();
        source.buffer = this.buffer;
        source.connect(context.destination);
        source.start(time);
    }
        
}

const context = new (window.AudioContext || window.webkitAudioContext)();

var dookie = 'suki'


function fetchBuffers() {
    var p = Promise.all(
        files.map(url => fetch(url)
            .then(r => r.arrayBuffer())
            .then(buf => context.decodeAudioData(buf))
            .then(audioBuf => new Instrument(audioBuf))
        )
    );
    return p
}

async function loadInstruments() {
    const instruments = await fetchBuffers();
    
    
    
   return instruments;
//        console.log(buffers)
//    var instruments = {}
//    Object.keys(audioFiles).forEach((key, i) => instruments[key] = instruments_temp[i]);
//    console.log(instruments)
//    instruments['drum'].trigger(context.currentTime)
//    return instruments
    
}



