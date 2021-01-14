// TODO: add support for volume control
app.component('circle-component', {
    props: ['activeTracks', 'lcm'],
    template: 
`
    <svg :height="height" :width="width">
        <template v-for="track in activeTracks">
            <circle v-for="beat in track.beats" 
                :cx="beat.cx"   
                :cy="beat.cy" 
                :r="getBeatRadius(beat.isOn)"
                :index="beat.index"
                :track-index="beat.trackIndex" 
                @click="toggleBeat(beat.index, beat.trackIndex)" 
                stroke="black" stroke-width="3"  
                :fill="beat.isCurrent ? 'red' : 'black'" />
        </template>

    </svg> 
`,
    data() { 
        return {
            trackRadius: 100,
            height: 1000,
            width: 1000,
            onRadius: 20,
            offRadius: 10
        }
    },
    methods: {
        toggleBeat(index, trackIndex) {
            this.$emit('toggle-beat', trackIndex, index)
        },
        getBeatRadius(isOn) {
            return isOn ? this.onRadius : this.offRadius
        },
        getPositionX(trackIndex, beatIndex) {
            centerX = 500
            
        
             return centerX + (trackIndex+1)*radius * Math.sin(2 * beatIndex / this.lcm * Math.PI)
//                        cy: centerY - radius * Math.cos(2 * i / this.lcm * Math.PI),

        }
    }
})
