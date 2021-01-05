// TODO: add support for volume control
app.component('clear-rhythm-component', {
    template: 
    /*html*/
    `
<div class="row">
    <div class="col">
        <i class="fas fa-trash-alt fa-3x delete" @click="clearRhythm"></i>
    </div>
</div>
    `,
    data() {
        return {
            volumeOn: true
        }
    },
    methods: {
        clearRhythm() {
            alert('cleared')
        }
    }
})
