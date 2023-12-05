import { mount, createLocalVue } from '@vue/test-utils'
import DashCampusInfo from './DashCampusInfo.vue'

// Crie uma instância local do Vue para testes
const localVue = createLocalVue()

describe('DashCampusInfo', () => {
  // Defina um objeto mock para currentCampus para testes
  const mockCurrentCampus = {
    id: 1,
    name: 'Test Campus'
  }

  // Defina um objeto mock para selectedTransductor para testes
  const mockSelectedTransductor = {
    id: 1,
    name: 'Test Transductor'
  }

  // Defina um valor mock para transductorCycleProgress para testes
  const mockTransductorCycleProgress = 50

  it('renderiza o componente', () => {
    const wrapper = mount(DashCampusInfo, {
      localVue,
      propsData: {
        currentCampus: mockCurrentCampus,
        selectedTransductor: mockSelectedTransductor,
        transductorCycleProgress: mockTransductorCycleProgress
      }
    })

    // Verifica se o componente está renderizado
    expect(wrapper.exists()).toBe(true)
  })

  it('chama o método getApiInfo ao montar', () => {
    // Mock do método getApiInfo
    const getApiInfoMock = jest.fn()

    const wrapper = mount(DashCampusInfo, {
      localVue,
      propsData: {
        currentCampus: mockCurrentCampus,
        selectedTransductor: mockSelectedTransductor,
        transductorCycleProgress: mockTransductorCycleProgress
      },
      methods: {
        getApiInfo: getApiInfoMock
      }
    })

    // Verifica se o método getApiInfo é chamado ao montar
    expect(getApiInfoMock).toHaveBeenCalled()
  })
})
