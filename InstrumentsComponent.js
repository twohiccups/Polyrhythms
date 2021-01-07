app.component('instruments-component', {
    props: ['instrument'],
    template:
        /*html*/
        `
<div class="row">
    <div class="col">
        <div class="form-group">
            <select id="exampleFormControlSelect2" class="form-control-sm fullWidth instruments" :value="instrument" @change="setInstrument" >
                <option v-for="(file, name) in instruments">{{name}}</option>
            </select>
        </div>
    </div>
</div>
    `,
    data() {
        return {
            instruments: {
                'drum': '1.wav',
                'kick': '2.wav',
                'doom': 'doom.wav',
                'bass': 'bass.wav',
                'bongo': 'bongo.wav',
                'bop': 'bop.wav',
                'clap': 'clap.wav',
                'cowbell': 'cowbell.wav',
                'doom': 'doom.wav',
                'drum 2': 'drum.mp3',
                'fart': 'fart.wav',
                'knife': 'knife.wav',
                'tick': 'tick.mp3'
            }
        }
    },
    methods: {
        setInstrument(event) {
            const name = event.target.value
            this.$parent.$emit('changed-instrument', this.$parent.index, name, this.instruments[name])
        }
    }
})