<template>
    <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 700px">
          <q-tabs
            v-model="tab"
            inline-label
            outside-arrows
            mobile-arrows
            class="bg-primary text-white shadow-2"
          >
            <q-tab name="Occurrences" label="Ocorrências" />
            <q-tab name="OccurrencesTab" label="Histórico" />
          </q-tabs>
          <template>
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="Occurrences">
                <Occurences :occurrences="occurrences"/>
              </q-tab-panel>
    
              <q-tab-panel name="OccurrencesTab">
                <TransducerEventList :occs="occurrences" />
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </div>
    </div>
</template>
  
<script>
  

 import Occurences from './Occurences.vue'
 import TransducerEventList from './TransducerEventList.vue'

export default {
    name: 'OccurencesTab',
    components: {
      Occurences,
      TransducerEventList
    },
    
    data () {
      return {
        tab: 'Occurrences'
      }
    },

    props : {
      occurrences: {
        type: Array
      }
    }
}

</script>

<style lang="scss" scoped>

</style>
  