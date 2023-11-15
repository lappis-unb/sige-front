import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import BarChart from './BarChart.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('BarChart', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      getters: {
        'transductorStore/chartOptions': (state) => ({

            max: state.transductorStore.chartOptions ? state.transductorStore.chartOptions.max : 0,
          }),
          

      },
    });

    wrapper = mount(BarChart, {
      localVue,
      store,
      propsData: {
        isCostPage: true, // ou false com base no seu cenário
        chartTitle: 'Seu Título do Gráfico',
        exportOptions: {
          // Mock exportOptions data here
        },
      },
    });
  });

  it('é renderizado corretamente com dados', async () => {
    // Aguarde por atualizações assíncronas
    await wrapper.vm.$nextTick();

    // Verifique se o componente está renderizado
    expect(wrapper.exists()).toBe(true);

    // Verifique se o título do gráfico está presente no HTML
    expect(wrapper.html()).toContain('Seu Título do Gráfico');
  });

  // Adicione mais testes conforme necessário

  afterEach(() => {
    wrapper.destroy();
  });
});