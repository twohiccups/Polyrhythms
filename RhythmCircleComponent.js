// TODO: add support for volume control
app.component('circle-component', {
    props: ['circles', ],
    template: 
    `

    <svg :height="height" :width="width">
        <template v-for="c in circles">
       
        <circle v-for="beat in c" :cx="beat.cx" :cy="beat.cy" :r="beat.r" :index="beat.index" @click="say(c.index)" stroke="black" stroke-width="3" fill="red" />
        </template>

    </svg> 
    `,
    data() { 
        return {
            height: 1000,
            width: 1000,
        }
    },
    computed() { 
    },
    methods: {
        say(index) {
            this.$emit('toggle-beat', 0, index)
            console.log(e.target)
        }
    }
})
