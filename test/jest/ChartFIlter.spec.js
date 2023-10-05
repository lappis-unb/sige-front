import { mount, createLocalVue } from '@vue/test-utils'
import ChartFilter from '../../src/components/ChartFilter.vue'

// instância local do vue
const localVue = createLocalVue()

describe('ChartFilter', () => {
  it('renderiza corretamente', () => {
    const wrapper = mount(ChartFilter, {
      localVue,
      propsData: {
        filterLabel: 'Test Label',
        filterList: ['Option 1', 'Option 2'],
        visionOptions: [{ value: 'option1', label: 'Option 1' }],
        transductorId: '123'
      }
    })

    // ver se componente tá funcionando
    expect(wrapper.exists()).toBe(true)

    // ver se label tá renderizando
    expect(wrapper.find('label').text()).toBe('Período: Início')

    // ver botão aplicar
    expect(wrapper.find('button.apply-button').exists()).toBe(true)
  })

  it('aplica filtro corretamente', async () => {
    const wrapper = mount(ChartFilter, {
      localVue,
      propsData: {
        filterLabel: 'Test Label',
        filterList: ['Option 1', 'Option 2'],
        visionOptions: [{ value: 'option1', label: 'Option 1' }],
        transductorId: '123'
      }
    })

    // definindo valores para os filtros
    await wrapper.setData({ option: 'Option 1', vision: 'option1' })

    // executando método
    await wrapper.vm.applyFilter()

    
    // verificando filtro
    expect(wrapper.emitted().updateFilter).toBeTruthy()
    expect(wrapper.emitted().updateChartPhase).toBeTruthy()
  })

})