import { mount, createLocalVue } from '@vue/test-utils'
import DashConsumptionStatusChart from './DashConsumptionStatusChart.vue'

// Crie uma instância local do Vue para testes
const localVue = createLocalVue()

describe('DashConsumptionStatusChart', () => {
  it('renderiza o componente', () => {
    const wrapper = mount(DashConsumptionStatusChart, {
      localVue
    })

    // Verifica se o componente está renderizado
    expect(wrapper.exists()).toBe(true)
  })

  it('verifica se o gráfico é renderizado corretamente', () => {
    const wrapper = mount(DashConsumptionStatusChart, {
      localVue
    })

    // Verifica se o elemento do gráfico está presente
    expect(wrapper.find('#chart1').exists()).toBe(true)
    expect(wrapper.find('#chart2').exists()).toBe(true)
    expect(wrapper.find('#chart3').exists()).toBe(true)
  })

  it('verifica se as opções do gráfico estão corretas', () => {
    const wrapper = mount(DashConsumptionStatusChart, {
      localVue
    })

    const chartOptions = wrapper.vm.chartOptions

    // Verifica se as opções do gráfico estão corretas
    expect(chartOptions.chart.type).toBe('area')
    expect(chartOptions.chart.height).toBe(96)
    expect(chartOptions.chart.width).toBe(174)
    expect(chartOptions.chart.background).toBe('#00101F')
    expect(chartOptions.chart.toolbar.show).toBe(false)
    expect(chartOptions.dataLabels.enabled).toBe(false)
    expect(chartOptions.fill.opacity).toBe(1)
    expect(chartOptions.fill.colors).toEqual(['#339CFF'])
    expect(chartOptions.fill.gradient.type).toBe('horizontal')
    expect(chartOptions.grid.show).toBe(true)
    expect(chartOptions.grid.borderColor).toBe('#00101F')
    expect(chartOptions.legend.show).toBe(false)
    expect(chartOptions.series[0].data).toEqual([0, 500])
    expect(chartOptions.stroke.curve).toBe('straight')
    expect(chartOptions.stroke.show).toBe(false)
    expect(chartOptions.theme.mode).toBe('dark')
    expect(chartOptions.xaxis.labels.show).toBe(false)
    expect(chartOptions.xaxis.axisBorder.show).toBe(false)
    expect(chartOptions.yaxis.show).toBe(false)
    expect(chartOptions.yaxis.tickAmount).toBe(2)
    expect(chartOptions.yaxis.axisBorder.show).toBe(false)
  })
})
