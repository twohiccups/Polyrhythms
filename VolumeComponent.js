// TODO: add support for volume control
app.component('volume-component', {
    props: ['isMute'],
    template: 
    /*html*/
    `
<div class="row">
    <div class="col" >
        <i class="fas fa-3x tpicon" :class="volumeIcon" @click="switchMute"></i>
    </div>
</div>
    `,
    computed: {
        volumeIcon() {
            return this.isMute ? 'fa-volume-mute' : 'fa-drum';
        }
    },
    methods: {
        switchMute() {
            this.$parent.$emit('switch-mute', this.$parent.index)
        }
    }
})
