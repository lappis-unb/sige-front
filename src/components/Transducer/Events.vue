<template>
    <q-scroll-area class="q-pa-sm">
        <div class="text-h5">Ocorrências em andamento</div>

        <div class="q-pt-md" v-for="occurrence in openedOccurrences" :key="occurrence.id">
            <transducer-alert :occurrence="occurrence" :serious="occurrence.serious" />
        </div>

        <div class="text-h5 q-pt-md">Histórico de occorrências</div>

        <div class="q-pt-md" v-for="occurrence in closedOccurrences" :key="occurrence.id">
            <transducer-alert :occurrence="occurrence" :serious="occurrence.serious" />
        </div>

        <q-list class="q-pt-md" separator>
            <q-item v-for="occurrence in openedOccurrences" :key="occurrence.id" clickable v-ripple>
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
</template>

<script>
import moment from 'moment'
import MASTER from 'src/services/masterApi/http-common'
import { getOccurenceName, getInfo, timePassedDays, isOccurrenceSerious } from 'src/utils/transductorStatus'
import TransducerAlert from 'src/components/TransducerAlert'

export default {
    name: 'Occurences',
    components: {
        TransducerAlert,
    },
    props: [
        'id'
    ],
    data() {
        return {
            openedOccurrences: [],
            closedOccurrences: [],
        }
    },
    created() {
        MASTER.get('/occurences/?type=period&id=' + this.id)
            .then(async res => {
                const mergedOccurrences = this.mergeOccurrences(res.data);
                this.openedOccurrences = this.getOpenedOccurrences(mergedOccurrences);
                this.closedOccurrences = this.getClosedOccurrences(mergedOccurrences);

                console.log(this.openedOccurrences)
                console.log(this.closedOccurrences)
            })
            .catch(err => {
                console.log(err)
            })
    },
    methods: {
        mergeOccurrences(occurrencesPayload) {
            return [
                ...this.formatOccurrence(occurrencesPayload["critical_tension"], "critical_tension"),
                ...this.formatOccurrence(occurrencesPayload["precarious_tension"], "precarious_tension"),
                ...this.formatOccurrence(occurrencesPayload["phase_drop"], "phase_drop"),
                ...this.formatOccurrence(occurrencesPayload["transductor_connection_fail"], "transductor_connection_fail"),
                ...this.formatOccurrence(occurrencesPayload["slave_connection_fail"], "slave_connection_fail"),

            ]

        },
        formatOccurrence(occurrences, type) {
            const now = new Date()

            return occurrences.map(occurrence => {
                const startTime = new Date(occurrence.start_time)
                const endTime = occurrence.end_time === null ? new Date() : new Date(occurrence.end_time)

                return {
                    ...occurrence,
                    type: getOccurenceName(type),
                    info: getInfo(occurrence, type),
                    writtenStartTime: timePassedDays(startTime, endTime, true),
                    writtenEndTime: timePassedDays(endTime, now, false),
                    serious: isOccurrenceSerious(type),
                }
            })

        },
        getOpenedOccurrences(occurrences) {
            const openedOccurrences = occurrences.filter(({ end_time }) => !end_time)
            const sortedOpenedOccurrences = this.sortOccurrences(openedOccurrences)

            return sortedOpenedOccurrences

        },
        getClosedOccurrences(occurrences) {
            const closedOccurrences = occurrences.filter(({ end_time }) => end_time)
            const sortedClosedOccurrences = this.sortOccurrences(closedOccurrences)

            return sortedClosedOccurrences
        },
        sortOccurrences(occurrences) {
            return occurrences.sort((firstDate, secondDate) => -firstDate.start_time.localeCompare(secondDate.start_time))

        },
        formatDate(isoDate) {
            return moment(isoDate).format("DD/MM/yyyy")
        }
    }
}
</script >
