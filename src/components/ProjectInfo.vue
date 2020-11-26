<template>
  <div class="col-md-4 col-lg-5 q-pa-sm">
    <q-img
      contain
      :src="unbenergia"
      style="max-height: 300px; max-width: 100%; min-width: 100px"
    />
    <div class="driver-text q-mb-sm">
      Projeto de Eficiência Energética CEB/FUB/FINATEC
    </div>
    <div class="primary-text q-mb-lg">
      Eficiência energética em prédios públicos da Universidade de Brasília
    </div>
    <div class="secondary-text">
      Sistema de monitoramento e gestão energética de edificações da Universidade de Brasília
      <br><br>
      Monitora, em tempo real, mais de 30 pontos da rede elétrica de UnB. Incluindo a produção de energia dos sistemas de geração fotovoltaica implantados na Universidade.
      <br><br>
      Fornece informações de consumo, nível de tensão, fator de potência, demanda, dentre outros.
    </div>
    <partners-logos/>
  </div>
</template>

<script>
import PartnersLogos from './PartnersLogos.vue'
export default {
  components: { PartnersLogos },
  name: 'ProjectInfo',
  data () {
    return {
      unbenergia: 'statics/proj_trans_l.png'
    }
  }
}
</script>

<style lang="scss" scoped>
  .secondary-text {
    font-family: Roboto;
    font-size: 17px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: 0.25px;
    color: rgba(0, 0, 0, 0.87);
  }
  .primary-text {
    font-family: Roboto;
    font-size: 25px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: 0.15px;
    text-align: center;
    color: rgba(0, 64, 126, 100%);
  }
  .driver-text {
    color: rgba(0, 64, 126, 100%);
    font-family: Roboto;
    font-size: 30px;
    font-weight: 300;
    font-stretch: normal;
    font-style: italic;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
  }
</style>
