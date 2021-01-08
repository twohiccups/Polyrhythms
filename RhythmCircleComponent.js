// TODO: add support for volume control
app.component('circle-component', {
    props: ['circles'],
    template: 
    `

    <svg :height="height" :width="width">
        <template v-for="c in circles">
       
        <circle v-for="beat in c" :cx="beat.cx" :cy="beat.cy" :r="beat.isOn ? onRadius : offRadius" :index="beat.index" :track-index="beat.trackIndex" 
            @click="toggleBeat(beat.index, beat.trackIndex)" stroke="black" stroke-width="3"  :fill="beat.isCurrent ? 'red' : 'black'" />
        </template>

    </svg> 
    `,
    data() { 
        return {
            height: 1000,
            width: 1000,
            onRadius: 40,
            offRadius: 20
        }
    },
    computed() { 
    },
    methods: {
        toggleBeat(index, trackIndex) {
            this.$emit('toggle-beat', trackIndex, index)
        }
    }
})
