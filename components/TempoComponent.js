// TODO: add support for volume control
app.component('tempo-component', {
    props: ['tempo'],
    template: 
`
    <div class="col-1 text-center">
         <i class="fas fa-3x fa-angle-right"></i>
    </div>
    <div class="col-10 text-center">
        <input id="tempo" class="fullWidth slider" @change="updateTempo" type="range" min="30" max="400" value="100">
    </div>
    <div class="col-1 text-center">
        <i class="fas  fa-3x fa-angle-double-right"></i>
    </div>
`,
    methods: {
        updateTempo(e) {
            const value = parseInt(e.target.value)
            this.$emit('tempo-change', value)
        }
    }
})
