const app = Vue.createApp({
    data() {
        return {
            tracks: [
                {
                    index: 0,
                    isActive: true,
                    isMute: false,
                    instrument: 'drum',
                    beatNumber: 4
                },
                {
                    index: 1,
                    isActive: true,
                    isMute: false,
                    instrument: 'drum',
                    beatNumber: 3

                },
                {
                    index: 2,
                    isActive: false,
                    isMute: false,
                    instrument: 'drum',
                    beatNumber: 3

                },
                {
                    index: 3,
                    isActive: false,
                    isMute: false,
                    instrument: 'drum',
                    beatNumber: 4
                },
                {
                    index: 4,
                    isActive: false,
                    isMute: false,
                    instrument: 'drum',
                    beatNumber: 4
                }
            ],
        }
    },
    computed: {
        activeSectionComponent() {
            return 'section-' + this.getActiveSectionObject(this.activeSectionId).name;
        },
        activeSectionBackgroundImage() {
            return this.getActiveSectionObject(this.activeSectionId).image
        }
    },
    methods: {
        getActiveSectionObject() {
            return this.sections.find(
                item => item.id ===  this.activeSectionId)
        },
        switchActive(index) {
            this.tracks[index].isActive = !this.tracks[index].isActive   
        },
        switchMute(index) {
            this.tracks[index].isMute = !this.tracks[index].isMute   
        },
        setBeatNumber(index, number) {
            this.tracks[index].beatNumber = number   
        },
        setInstrument()

    }
})