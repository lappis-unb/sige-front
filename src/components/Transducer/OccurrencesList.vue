<template>
    <div class="full-height">
        <q-scroll-area class="full-height" visible>
            <q-list separator>
                <q-item v-for="occurrence in occurrences" :key="occurrence.id" clickable v-ripple
                    @click="onOccurrenceClick(occurrence)">
                    <q-item-section>
                        <div class="row justify-between">
                            <div>
                                {{ occurrence.type }}

                                <template v-if="occurrence.info">
                                    ({{ occurrence.info.trim() }})
                                </template>
                            </div>

                            <div>
                                {{ formatDate(occurrence.start_time) }}
                            </div>
                        </div>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-scroll-area>
        test
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
import { getGraph } from 'src/utils/transductorGraphControl'

export default {
    name: "TransducerOccurrencesList",
    components: {
    },
    props: {
        occurrences: {
            type: Array,
            required: true
        }
    },
    methods: {
        ...mapActions('transductorStore', ['updateFilter', 'updateChartPhase']),
        formatDate(isoDate) {
            return moment(isoDate).format("DD/MM/yyyy")
        },
        async onOccurrenceClick(occurrence) {
            const startDate = this.formatDate(moment(occurrence.start_time).subtract("1", "days"))
            const endDate = this.formatDate(moment(occurrence.end_time ? occurrence.end_time : occurrence.start_time).add("1", "days"))

            const filter = {
                transductor: "12",
                dimension: "Tensão",
                startDate,
                endDate,
                vision: "hour"
            }


            const graphOptCallback = () => getGraph(filter)
            await this.updateFilter(filter)
            await this.updateChartPhase(graphOptCallback)
        }
    }
}
</script>
