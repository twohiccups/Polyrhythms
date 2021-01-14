app.component('instruments-component', {
    props: ['instruments'],
    template:
        /*html*/
        `
<div class="row">
    <div class="col">
        <div class="form-group">
            <select id="exampleFormControlSelect2" class="form-control-sm fullWidth instruments" @change="setInstrument">
                <option v-for="(value, key) in instruments">{{key}}</option>
            </select>
        </div>
    </div>
</div>
    `,
    data() {
        return {
        }
    },
    methods: {
        makeInstrument() {

                
},
        setInstrument(event) {
            const instrument = event.target.value
            this.$parent.$emit('changed-instrument', this.$parent.index, instrument)
        }
    }
})