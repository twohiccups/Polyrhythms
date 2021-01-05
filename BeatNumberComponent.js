// TODO: add support for volume control
app.component('beat-number-component', {
    props: ['beatNumber'],
    template: 
    /*html*/
    `
 <div class="row">
        <div class="col">
            <input id="time1" class="form-control" @change="setBeatNumber" type="number" min="1" max="100" step="1" :value="beatNumber">
        </div>
</div>
    `,
    data() {
    },
    computed: {
    },
    methods: {
        setBeatNumber(event) {
            const value = parseInt(event.target.value)
            this.$parent.$emit('changed-beat-number', this.$parent.index, value)
        }
    }
})
