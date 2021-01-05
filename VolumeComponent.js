// TODO: add support for volume control
app.component('volume-component', {
    template: 
    /*html*/
    `
<div class="row">
    <div class="col" >
        <i class="fas fa-3x tpicon" :class="volumeIcon" @click="switchRthythm"></i>
    </div>
</div>
    `,
    data() {
        return {
            volumeOn: true
        }
    },
    computed: {
        volumeIcon() {
            return this.volumeOn ? 'fa-drum' :  'fa-volume-mute';
        }
    },
    methods: {
        switchRthythm() {
            this.volumeOn = !this.volumeOn
            this.$emit('vo')
        }
    }
})
