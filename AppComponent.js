function suka() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(false)
        }, 2000) 
    });
}
const app = Vue.createApp({
    beforeCreate() {
        
    },
    created() {

        this.instruments = loadInstruments().then(value => {
            console.log(value)
            var instruments = {}
            Object.keys(audioFiles).forEach((key, i) => instruments[key] = value[i]);
            this.instruments = instruments
            this.tracks.forEach( 
                (track) => {track.instrument = this.instruments['drum']})
        });
        this.audioIsFetching = false;    
        
    },
    mounted() {
        

    },
    data() {
        return {
            instruments: null, 
            audioIsFetching: true,
            tracks: [
                {
                    index: 0,
                    isActive: true,
                    isMute: false,
                    instrument: null,
                    beatNumber: 4,
                    beats: []
                },
                {
                    index: 1,
                    isActive: true,
                    isMute: false,
                    instrument: null,
                    beatNumber: 3,
                    beats: []
                },
                {
                    index: 2,
                    isActive: false,
                    isMute: false,
                    instrument: null,
                    beatNumber: 3,
                    beats: []
                },
                {
                    index: 3,
                    isActive: false,
                    isMute: false,
                    instrument: null,
                    beatNumber: 4,
                    beats: []
                },
                {
                    index: 4,
                    isActive: false,
                    isMute: false,
                    instrument: null,
                    beatNumber: 4,
                    beats: []
                }
            ],
            circles: null,
            firstTimeInitialization: true,
            currentBeatIndex: 0,
            createPolyrhythmTrigger: 0,
            isPaused: false,
            tempo: 120,
            audiopath: 'samples/',
            activeTracks: [0,1]
        }
    },
    computed: {
        lcm() {
            return lcm_array(this.activeTracks.map(t => t.beatNumber))
        },
    },
    methods: {
        switchActive(index) {
            this.tracks[index].isActive = !this.tracks[index].isActive
        },
        switchMute(index) {
            this.tracks[index].isMute = !this.tracks[index].isMute
        },
        setBeatNumber(index, number) {
            this.tracks[index].beatNumber = number
        },
        setInstrument(index, instrument) {
            this.tracks[index].instrument = this.instruments[instrument]
        },
        rotateCCW(trackIndex){
            const firstIsOn = this.tracks[trackIndex].beats[0].isOn
            for (i = 0; i < this.lcm - 1; i++) {
                this.tracks[trackIndex].beats[i].isOn = this.tracks[trackIndex].beats[i + 1].isOn
            }
            this.tracks[trackIndex].beats[this.lcm - 1].isOn = firstIsOn
        },
        rotateCW(trackIndex) {
            const lastIsOn = this.tracks[trackIndex].beats[this.lcm - 1].isOn;
            for (i = this.lcm - 1; i > 0; i--) {
                this.tracks[trackIndex].beats[i].isOn = this.tracks[trackIndex].beats[i - 1].isOn
            }
            this.tracks[trackIndex].beats[0].isOn = lastIsOn
        },
        toggleBeat(trackIndex, beatIndex) {
            const isOn = this.tracks[trackIndex].beats[beatIndex].isOn
            this.tracks[trackIndex].beats[beatIndex].isOn = !isOn
        },
        reset() {
            Tone.Transport.stop();
            this.currentBeatIndex = 0
            this.isPaused = false
        },
        create() {
            this.activeTracks = this.tracks.filter(track => track.isActive)
            this.reset()
            radius = 100
            const centerX = 500
            const centerY = 500

            this.activeTracks.forEach((track) => {
                var circle = []
                
                for (i = 0; i < this.lcm; i++) {
                    const isOn = i % track.beatNumber == 0
                    circle.push({
                        index: i,
                        trackIndex: track.index,
                        isOn: isOn,
                        cx: centerX + radius * Math.sin(2 * i / this.lcm * Math.PI),
                        cy: centerY - radius * Math.cos(2 * i / this.lcm * Math.PI),
                        isCurrent: i == 0
                    })
                }
                radius *= 2
                track.beats = circle
 
            })
            if (this.firstTimeInitialization) {
                this.initializeTransport();
                this.firstTimeInitialization = false;
            }
    
            Tone.Transport.start();

        },
        initializeTransport() {
                Tone.Transport.scheduleRepeat((time) => {
                this.update()
                
                this.activeTracks.forEach((track) => {
                    
                    if (!track.isMute && track.beats[this.currentBeatIndex].isOn) {
                        track.instrument.trigger(time)
                    }
                })
            }, "8n");
            
        },
        clearRhythm(trackIndex) {
            this.activeTracks[trackIndex].beats.forEach((beat) => {
                beat.isOn = false
            })
            
            this.activeTracks[trackIndex].beats[i].isOn = false
        },
        update() {
                     
            const nextBeat = (this.currentBeatIndex + 1) % this.lcm
            
            this.activeTracks.forEach((track) => {
                track.beats[this.currentBeatIndex].isCurrent = false
                track.beats[nextBeat].isCurrent = true
            })
            
            this.currentBeatIndex = nextBeat
            
            
        },
        pausePolyrhythm() {
            if (this.isPaused) {
                Tone.Transport.start()
            } 
            else {
                Tone.Transport.pause()
            }
            this.isPaused = ! this.isPaused
        },


    }
})