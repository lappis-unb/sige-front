<template>
    <q-scroll-area class="full-height">
        <div class="q-py-sm" v-for="occurrence in occurrences" :key="occurrence.id">
            <TransducerAlert :serious="occurrence.serious" :type="occurrence.type" :info="occurrence.info"
                :written-start-time="occurrence.writtenStartTime" />
        </div>
    </q-scroll-area>
</template>

<script>
import TransducerAlert from 'src/components/TransducerAlert'

export default {
    name: "TransducerOccurrencesAlerts",
    components: {
        TransducerAlert
    },
    props: {
        occurrences: {
            type: Array,
            required: true
        }
    },
}
</script>
