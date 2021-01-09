const app = Vue.createApp({
    data() {
        return {
            tracks: [
                {
                    index: 0,
                    isActive: true,
                    isMute: false,
                    instrument: 'drum',
                    beatNumber: 4
                },
                {
                    index: 1,
                    isActive: true,
                    isMute: false,
                    instrument: 'drum',
                    beatNumber: 3
                },
                {
                    index: 2,
                    isActive: false,
                    isMute: false,
                    instrument: 'drum',
                    beatNumber: 3
                },
                {
                    index: 3,
                    isActive: false,
                    isMute: false,
                    instrument: 'drum',
                    beatNumber: 4
                },
                {
                    index: 4,
                    isActive: false,
                    isMute: false,
                    instrument: 'drum',
                    beatNumber: 4
                }
            ],
            circles: null,
            firstTimeInitialization: true,
            currentBeatIndex: 0,
            createPolyrhythmTrigger: 0,
            stop: false,
            audiopath: 'samples/'
        }
    },
    computed: {
        activeTracks() {
            return this.tracks.filter(track => track.isActive)
        },
        lcm() {
            return lcm_array(this.activeTracks.map(t => t.beatNumber))
        },
    },
    methods: {
        makeAudio(x) {
            return new Audio(audiopath + audioFiles[x]);
        },
        switchActive(index) {
            this.tracks[index].isActive = !this.tracks[index].isActive
        },
        switchMute(index) {
            this.tracks[index].isMute = !this.tracks[index].isMute
        },
        setBeatNumber(index, number) {
            this.tracks[index].beatNumber = number
        },
        setInstrument(index, name, file) {
            this.tracks[index].instrument = name
            alert(file)
        },
        rotateCCW(trackIndex){
            const firstIsOn = this.circles[trackIndex][0].isOn
            for (i = 0; i < this.lcm - 1; i++) {
                this.circles[trackIndex][i].isOn = this.circles[trackIndex][i + 1].isOn
            }
            this.circles[trackIndex][this.lcm - 1].isOn = firstIsOn
        },
        rotateCW(trackIndex) {
            const lastIsOn = this.circles[trackIndex][this.lcm - 1].isOn;
            for (i = this.lcm - 1; i > 0; i--) {
                this.circles[trackIndex][i].isOn = this.circles[trackIndex][i - 1].isOn
            }
            this.circles[trackIndex][0].isOn = lastIsOn
        },
        toggleBeat(trackIndex, beatIndex) {
            const isOn = this.circles[trackIndex][beatIndex].isOn
            this.circles[trackIndex][beatIndex].isOn = !isOn
        },
        reset() {
            Tone.Transport.stop();
            this.currentBeatIndex = 0
            this.circles = []
        },
        create() {
            this.reset()
            radius = 100
            const centerX = 500
            const centerY = 500

            this.activeTracks.forEach((t) => {
                var circle = []
                for (i = 0; i < this.lcm; i++) {
                    const isOn = i % t.beatNumber == 0
                    circle.push({
                        index: i,
                        trackIndex: t.index,
                        isOn: isOn,
                        cx: centerX + radius * Math.sin(2 * i / this.lcm * Math.PI),
                        cy: centerY - radius * Math.cos(2 * i / this.lcm * Math.PI),
                        isCurrent: i == 0
                    })
                }
                radius *= 2
                this.circles.push(circle)

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
                
                this.circles.forEach((c) => {
                    if (c[this.currentBeatIndex].isOn)
                        {
                            kick.trigger(time)

                        }
                })
            }, "8n");
            
        },
        createPolyrhythm() {
//            this.reset();
//            createPolyrhythm(this.activeTracks, this.lcm);
//            this.stop = true;
//            this.currentIntervalId = setTimeout(this.start(this.lcm), 0.4);
        },
        clearRhythm(trackIndex) {
            for (i = 0; i < this.lcm; i++)
            this.circles[trackIndex][i].isOn = false
        },
        update() {
            
            console.log(this.lcm)

            
            
//            this.currentBeatIndex = (this.currentBeatIndex + 1) % this.lcm
            
            const nextBeat = (this.currentBeatIndex + 1) % this.lcm
            this.circles.forEach((c) => {
                c[this.currentBeatIndex].isCurrent = false
                c[nextBeat].isCurrent = true
            })
            this.currentBeatIndex = nextBeat
            
            
        },
        loop(low) {
            update(low);
            if (!loop.play) {
                return;
            } else {
                currentRhythmInterval = setTimeout(function () {
                    loop(low)
                }, interval);
            }
        },
        start(low) {
            loop.play = true;
            loop(low);
        },
        stopPolyrhythm() {
            alert('su')
            clearInterval(this.currentIntervalId)
        },
        resumePolyrhythm() {
            alert('su')
            clearInterval(this.currentIntervalId)
        }



    }
})