app.component('switch-component', {
    props: ['isActive'],
    template: 
    /*html*/
`
    <div class="row">
        <div class="col" >
            <i class="fas fa-3x tpicon" :class="rhythmIcon" @click="switchActive"></i>
        </div>
    </div>
`,
    computed: {
        rhythmIcon() {
            return this.isActive ? 'fa-plus-square' : 'fa-minus-square';
        }
    },
    methods: {
        switchActive() {
            this.$parent.$emit('switch-active', this.$parent.index);
        }
    }
})
