<template>
  <div class="occ">
    <p class="occ-title" v-if="occurrences.length > 0">
      Ocorrência{{ occurrences.length > 1 ? 's' : '' }} em andamento
    </p>
    <div class="alert" v-for="occ in limitedOccurrences" :key="occ.id + occ.transductor + occ.start_time">
      <transducer-alert :occurrence="occ" :serious="seriousOccurrences.includes(occ.originalType)" />
    </div>

    <p class="history" v-if="totalOccurrences > 0">
      Ocorreram outras {{ totalOccurrences }} ocorrência{{ totalOccurrences > 1 ? 's' : '' }} nas <u>últimas 72h</u>
    </p>
    <p v-else class="no-occ">
      Não houve ocorrências
    </p>
  </div>
</template>

<script>
import MASTER from '../services/masterApi/http-common';
import { separateInDays } from '../utils/transductorStatus';
import transducerAlert from './TransducerAlert';

export default {
  name: 'Occurences',
  components: {
    transducerAlert,
  },
  props: ['id'],
  data() {
    return {
      today: [],
      yesterday: [],
      beforeYesterday: [],
      occurrences: [],
      seriousOccurrences: ['phase_drop', 'critical_tension']
    };
  },
  computed: {
    limitedOccurrences() {
      return this.occurrences.slice(0, 5);
    },
    totalOccurrences() {
      return this.today.length + this.yesterday.length + this.beforeYesterday.length;
    }
  },
  created() {
    MASTER.get('/occurences/?type=period&id=' + this.id)
      .then(async res => {
        await separateInDays({
          eventsArray: res.data.critical_tension,
          type: 'critical_tension',
          today: this.today,
          yesterday: this.yesterday,
          beforeYesterday: this.beforeYesterday,
          occurrences: this.occurrences
        });
        await separateInDays({
          eventsArray: res.data.precarious_tension,
          type: 'precarious_tension',
          today: this.today,
          yesterday: this.yesterday,
          beforeYesterday: this.beforeYesterday,
          occurrences: this.occurrences
        });
        await separateInDays({
          eventsArray: res.data.phase_drop,
          type: 'phase_drop',
          today: this.today,
          yesterday: this.yesterday,
          beforeYesterday: this.beforeYesterday,
          occurrences: this.occurrences
        });
        await separateInDays({
          eventsArray: res.data.transductor_connection_fail,
          type: 'connection_fail',
          today: this.today,
          yesterday: this.yesterday,
          beforeYesterday: this.beforeYesterday,
          occurrences: this.occurrences
        });
        await separateInDays({
          eventsArray: res.data.slave_connection_fail,
          type: 'connection_fail',
          today: this.today,
          yesterday: this.yesterday,
          beforeYesterday: this.beforeYesterday,
          occurrences: this.occurrences
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
.occ {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.14);
}

.occ-title {
  font-family: Roboto;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.15px;
  text-align: center;
  color: $primary;
}

.card-content {
  padding: 10px;
}

.map-button {
  color: $primary;
}

.history {
  color: $primary;
  font-family: Roboto;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.15px;
  text-align: center;
}

.no-occ {
  text-align: center;
}

.alert {
  margin-bottom: 50px;
}
</style>
