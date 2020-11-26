<template>
  <span
      class="bg-grey-1 text-grey-9"
      bordered
    >
    <div class="row q-mb-lg q-pr-md" id="partners">
      <div
        v-for="partner in partnersImg" :key="partner.id"
        class="col-6 col-md-3">
        <q-img
          contain
          :src="partner"
          style="height: 180px;"
        />
      </div>
    </div>
  </span>
</template>

<script>
export default {
  name: 'PartnersLogos',
  data () {
    return {
      partnersImg: [
        'https://www.infoescola.com/wp-content/uploads/2016/02/unb.png',
        'statics/ceb_partner.jpg',
        'statics/logo_PED_vertical_com_sigla.png',
        'statics/logo_finatec@3x.png'
      ]
    }
  }
}
</script>
