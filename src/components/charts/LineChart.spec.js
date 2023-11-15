import { mount } from '@vue/test-utils';
import LineChart from './LineChart.vue'; 

describe('LineChart', () => {
  test('Renderiza corretamente com loadingStatus verdadeiro', async () => {
    const wrapper = mount(LineChart, {
      propsData: {
        graphic_type: '1',
        show_legend: true,
        id: 'your-id', // Substitua por um valor adequado
        min: 0, // Substitua por um valor adequado
        max: 100, // Substitua por um valor adequado
        chartTitle: 'Seu Título', // Substitua por um valor adequado
        exportOptions: {
          location: 'sua-localizacao', // Substitua por um valor adequado
          dimension: 'sua-dimensao', // Substitua por um valor adequado
          startDate: '2023-01-01', // Substitua por um valor adequado
          endDate: '2023-12-31' // Substitua por um valor adequado
        }
      },
      computed: {
        chartOptions: () => ({
          status: true, // Substitua por um valor adequado
          phase_a: [/* Substitua por dados adequados */],
          phase_b: [/* Substitua por dados adequados */],
          phase_c: [/* Substitua por dados adequados */],
          unit: 'kWh', // Substitua por uma unidade adequada
          decimals: 2 // Substitua por um número de decimais adequado
        }),
        filterOptions: () => ({
          dimension: 'sua-dimensao' // Substitua por um valor adequado
        }),
        getPhaseChartLoadingStatus: () => true, // Substitua por um valor adequado
        getPage: () => 'sua-pagina' // Substitua por um valor adequado
      }
    });

    // Aguarde a próxima atualização do ciclo de vida do Vue para garantir que o componente tenha sido renderizado completamente
    await wrapper.vm.$nextTick();

    // Adicione mais verificações conforme necessário
    expect(wrapper.find('.apexcharts-title-text').exists()).toBe(true);
    expect(wrapper.find('.apexcharts-title-text').text()).toBe('Seu Título');
    expect(wrapper.vm.cssProps['--opacity']).toBe(1);
  });
});

