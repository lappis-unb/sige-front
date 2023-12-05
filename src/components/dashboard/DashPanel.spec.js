import { mount, createLocalVue } from '@vue/test-utils'
import DashPanel from './DashPanel.vue'
import DashMap from './DashMap'
import DashCampusInfo from './DashCampusInfo'
import MASTER from '../../services/masterApi/http-common'

// Mock para a chamada da API MASTER
jest.mock('../../services/masterApi/http-common')

// Crie uma instância local do Vue para testes
const localVue = createLocalVue()
localVue.component('DashMap', DashMap)
localVue.component('DashCampusInfo', DashCampusInfo)

describe('DashPanel', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(DashPanel, {
      localVue,
      propsData: {
        selectedCampus: {}
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renderiza o componente', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('inicializa os dados corretamente', async () => {
    const transductors = [
      { id: 1, name: 'Transductor 1' },
      { id: 2, name: 'Transductor 2' }
    ]

    const unifilarDiagram = [
      { id: 1, start_lat: 10, start_lng: 20, end_lat: 30, end_lng: 40 },
      { id: 2, start_lat: 15, start_lng: 25, end_lat: 35, end_lng: 45 }
    ]

    const occurences = [
      { transductor_connection_fail: [] },
      { precarious_tension: [], phase_drop: [], critical_tension: [] }
    ]

    MASTER.get.mockResolvedValueOnce({ data: transductors })
    MASTER.get.mockResolvedValueOnce({ data: unifilarDiagram })
    MASTER.get.mockResolvedValueOnce({ data: occurences })

    await wrapper.vm.getInfo()

    expect(wrapper.vm.transductors).toEqual(transductors)
    expect(wrapper.vm.unifilarDiagram).toEqual(unifilarDiagram)
    expect(wrapper.vm.occurences).toEqual([
      [],
      [occurences[0].transductor_connection_fail, occurences[1].precarious_tension, occurences[1].phase_drop, occurences[1].critical_tension]
    ])
    expect(wrapper.vm.selectedTransductor).toEqual(transductors[0])
  })

  it('seleciona transdutores corretamente', async () => {
    const transductors = [
      { id: 1, name: 'Transductor 1' },
      { id: 2, name: 'Transductor 2' }
    ]

    MASTER.get.mockResolvedValueOnce({ data: transductors })

    await wrapper.vm.getTransductors()

    // Verifica se o transdutor inicial foi selecionado corretamente
    expect(wrapper.vm.selectedTransductor).toEqual(transductors[0])

    // Chama o método selectTransductor para mudar a seleção
    wrapper.vm.selectTransductor()

    // Verifica se o próximo transdutor foi selecionado corretamente
    expect(wrapper.vm.selectedTransductor).toEqual(transductors[1])

    // Chama o método selectTransductor para voltar à primeira seleção
    wrapper.vm.selectTransductor()

    // Verifica se a seleção retorna ao primeiro transdutor
    expect(wrapper.vm.selectedTransductor).toEqual(transductors[0])
  })

  it('limpa o intervalo antes da destruição', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval')

    // Monta o componente novamente para acionar o lifecycle hook beforeDestroy
    wrapper.destroy()

    expect(clearIntervalSpy).toHaveBeenCalled()
  })
})
