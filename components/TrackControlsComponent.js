// TODO: add support for volume control
app.component('track-controls-component', {
    props: ['index', 'isActive', 'isMute', 'instruments', 'beatNumber'],
    template: 
    /*html*/
`
    <div class="col-2 track-column" :class="activeClass">

        <switch-component :is-active="isActive"></switch-component>

        <volume-component :is-mute="isMute"></volume-component>

        <instruments-component :instruments="instruments"></instruments-component>

        <rotate-rhythm-component></rotate-rhythm-component>

        <beat-number-component :beat-number="beatNumber"></beat-number-component>

        <clear-rhythm-component></clear-rhythm-component>

    </div>
`,
    computed: {
        activeClass() {
            return this.isActive ? 'active-track' : 'inactive-track' 
        }
    },
    methods: {
        switchRthythm() {
            this.volumeOn = !this.volumeOn
        }
    }
})
