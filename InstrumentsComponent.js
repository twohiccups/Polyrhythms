app.component('instruments-component', {
    template:
        /*html*/
        `
<div class="row">
    <div class="col">
        <div class="form-group">
            <select class="form-control-sm fullWidth instruments" id="exampleFormControlSelect2">
                <option v-for="instrument in instruments">{{instrument.name}}</option>

            </select>
        </div>
    </div>
</div>
    `,
    data() {
        return {
            activeInstrument: 'drum',
            instruments: [
                {
                    name: 'drum',
                    file: "1.wav"
                },
                {
                    name: 'kick',
                    file: "2.wav"
                },
                {
                    name: 'doom',
                    file: "doom.wav"
                },
                {
                    name: 'bass',
                    file: 'bass.wav'
                },
                {
                    name: 'bongo',
                    file: 'bongo.wav'
                },
                {
                    name: 'bop',
                    file: 'bop.wav'
                },
                {
                    name: 'clap',
                    file: 'clap.wav'
                },
                {
                    name: 'cowbell',
                    file: 'cowbell.wav'
                },
                {
                    name: 'doom',
                    file: 'doom.wav'
                },
                {
                    name: 'drum',
                    file: 'drum.mp3'
                },
                {
                    name: 'fart',
                    file: 'fart.wav'
                },
                {
                    name: 'knife',
                    file: 'knife.wav'
                },
                {
                    name: 'tick',
                    file: 'tick.mp3'
                }
            ]
        }
    },
    computed: {

    },
    methods: {
        setActiveInstrument() {
            this.volumeOn = !this.volumeOn
            this.$emit('vo')
        }
    }
})