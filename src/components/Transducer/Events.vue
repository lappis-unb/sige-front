<template>
    <div class="windows-height">
        <div class="text-h5 q-py-sm">Occorrências</div>

        <q-tabs v-model="tab" dense inline-label no-caps active-color="primary" indicator-color="primary">
            <q-tab label="Em andamento" name="opened" icon="alarm" />

            <q-tab label="Histórico" name="closed" icon="history" />
        </q-tabs>

        <q-separator />

        <TransducerOpenedEvents v-if="tab === 'opened'" :openedOccurrences="openedOccurrences" />
        <TransducerClosedEvents v-else-if="tab === 'closed'" :closedOccurrences="closedOccurrences" />
    </div>
</template>

<script>
import MASTER from 'src/services/masterApi/http-common'
import { getOccurenceName, getInfo, timePassedDays, isOccurrenceSerious } from 'src/utils/transductorStatus'
import TransducerOpenedEvents from 'src/components/Transducer/OpenedEvents'
import TransducerClosedEvents from 'src/components/Transducer/ClosedEvents'

export default {
    name: 'Occurrences',
    components: {
        TransducerOpenedEvents,
        TransducerClosedEvents
    },
    props: [
        'id'
    ],
    data() {
        return {
            openedOccurrences: [],
            closedOccurrences: [],
            tab: 'opened'
        }
    },
    created() {
        MASTER.get('/occurences/?type=period&id=' + this.id)
            .then(async res => {
                const mergedOccurrences = this.mergeOccurrences(res.data);
                this.openedOccurrences = this.getOpenedOccurrences(mergedOccurrences);
                this.closedOccurrences = this.getClosedOccurrences(mergedOccurrences);
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
    }
}
</script >
