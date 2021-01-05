// TODO: add support for volume control
app.component('rotate-rhythm-component', {
    template: 
    /*html*/
    `
<div class="row">
    <div class="col">
        <i class="fas fa-undo-alt fa-3x rotatecc" @click="rotatecc"></i>
        <i class="fas fa-redo-alt fa-3x rotate"  @click="rotate"></i>
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
        rotate() {
            alert('ro')
        },
        rotatecc() {
            alert('roCC')
        }
    }
})
