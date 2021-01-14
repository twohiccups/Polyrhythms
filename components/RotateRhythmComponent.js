// TODO: add support for volume control
app.component('rotate-rhythm-component', {
    template: 
    /*html*/
    `
<div class="row">
    <div class="col">
        <i class="fas fa-undo-alt fa-3x rotatecc" @click="rotateCCW"></i>
        <i class="fas fa-redo-alt fa-3x rotate"  @click="rotateCW"></i>
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
        rotateCW() {
           this.$parent.$emit('rotate-cw', this.$parent.index)
        },
        rotateCCW() {
           this.$parent.$emit('rotate-ccw', this.$parent.index)
        }
    }
})
