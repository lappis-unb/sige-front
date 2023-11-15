import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import LineChartConsumption from './LineChartConsumption.vue';

import VueApexCharts from 'vue-apexcharts';
jest.mock('vue-apexcharts');
VueApexCharts.install = (Vue) => Vue.component('VueApexCharts', VueApexCharts);


const localVue = createLocalVue();
localVue.use(Vuex);  // Certifique-se de usar o Vuex

describe('LineChartConsumption', () => {
    test('renders correctly with data', async () => {
        // Mock das getters e actions necessárias
        const getters = {
          getSerie: jest.fn(() => [/* seu conjunto de dados aqui */]),
          getGraphNotEmpty: jest.fn(() => true),
          getChartLoadingStatus: jest.fn(() => false),
        };
        
        const actions = {
          updateChartSerie: jest.fn(),
        };
    
        // Configuração do store
        const store = new Vuex.Store({
          getters,
          actions,
        });
    
        // Monta o componente
        const wrapper = mount(LineChartConsumption, {
          localVue,
          store,
          propsData: {
            unit: 'kWh',
            chartTitle: 'Consumption Chart',
            exportOptions: {
              location: 'Living Room',
              dimension: 'Voltage',
              startDate: '2023-01-01',
              endDate: '2023-01-31',
            },
          },
        });
    
        // Aguarde a resolução das promessas assíncronas, se houver alguma
        await wrapper.vm.$nextTick();

        // Certifique-se de que o componente está renderizando corretamente
        expect(wrapper.html()).toContain('Consumption Chart'); // Verifica se o título está presente no HTML
      
        // Verifique se o título do gráfico está presente
        const titleElement = wrapper.find('.apexcharts-title-text');
        expect(titleElement.exists()).toBe(true); // Verifica se o elemento existe
        expect(titleElement.text()).toBe('Consumption Chart');
      });

});
