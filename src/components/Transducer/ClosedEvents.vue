<template>
    <div class="full-height">
        <q-scroll-area class="full-height" visible>
            <q-list separator>
                <q-item v-for="occurrence in closedOccurrences" :key="occurrence.id" clickable v-ripple>
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
import moment from 'moment'

export default {
    name: "TransducerClosedEvents",
    components: {
    },
    props: {
        closedOccurrences: {
            type: Array,
            required: true
        }
    },
    methods: {
        formatDate(isoDate) {
            return moment(isoDate).format("DD/MM/yyyy")
        }
    }
}
</script>
