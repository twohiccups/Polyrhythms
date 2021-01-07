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
            circles: [],
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
        toggleBeat(rthythmIndex, beatIndex) {
            rhythmIndex = 0
            this.circles[beatIndex].x = 666
        },
        create() {
            radius = 100
            const centerX = 500
            const centerY = 500
            this.circles = []

            this.activeTracks.forEach((t) => {
                console.log(this.activeTracks)
                var circle = []
                for (i = 0; i < this.lcm; i++) {

                    const isOn = i % t.beatNumber == 0
                    console.log(t)
                    console.log(t.beatNumber)
                    console.log(i)
                    circle.push({
                        index: i,
                        isOn: isOn,
                        cx: centerX - radius * Math.sin(2 * i / this.lcm * Math.PI),
                        cy: centerY - radius * Math.cos(2 * i / this.lcm * Math.PI),
                        r: isOn ? 20 : 10
                    })
                }
                radius *= 2
                this.circles.push(circle)

            })

        },
        createPolyrhythm() {
            this.reset();
            createPolyrhythm(this.activeTracks, this.lcm);
            this.stop = true;
            this.currentIntervalId = setTimeout(this.start(this.lcm), 0.4);
        },
        clearRhythm(index) {
            alert('cleared')
            var draw = SVG().addTo('#canvas');
            var rect = draw.rect(100, 100).fill('#f88')

        },

        update(low) {
            for (i = 0; i < rhythms.length; i++) {
                console.log(rhythms)
                rhythms[i].rep.segs[count].miniCircle.setAttribute('fill', 'red');
                rhythms[i].rep.segs[(count - 1 + low) % low].miniCircle.setAttribute('fill', 'black');
                if (!rhythms[i].muted && rhythms[i].rep.segs[count].miniCircle.isOn) {
                    rhythms[i].audio.currentTime = 0;
                    rhythms[i].audio.play();
                }
            }
            count++;
            count = count % low;
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
        reset() {
            clearTimeout(this.currentIntervalId);
            this.stop = true;
            $("#canvas").empty();
            rhythms = [];
            count = 0;
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