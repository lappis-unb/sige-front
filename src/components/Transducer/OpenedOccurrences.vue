<template>
    <q-scroll-area class="full-height">
        <div class="q-py-sm" v-for="occurrence in openedOccurrences" :key="occurrence.id">
            <transducer-alert :occurrence="occurrence" :serious="occurrence.serious" />
        </div>
    </q-scroll-area>
</template>

<script>
import TransducerAlert from 'src/components/TransducerAlert'

export default {
    name: "TransducerOpenedOccurrences",
    components: {
        TransducerAlert
    },
    props: {
        openedOccurrences: {
            type: Array,
            required: true
        }
    },
}
</script>
