// TODO: add support for volume control
app.component('tempo-component', {
    props: ['tracks', 'stop', ''],
    template: 
    `
                <div class="col-1 text-center">
                     <i class="fas fa-3x fa-angle-right"></i>
                </div>
                <div class="col-10 text-center">
                    <input id="tempo" class="fullWidth slider" type="range" min="30" max="600" value="100">
                </div>
                <div class="col-1 text-center">
                    <i class="fas  fa-3x fa-angle-double-right"></i>
                </div>
    `,
    data() { 
        return {
        }
    },
    methods: {
        say() {
            alert('stay')
        }
    }
})
