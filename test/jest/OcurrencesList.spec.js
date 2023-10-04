import { mount, createLocalVue } from '@vue/test-utils'
import SimpleList from '../../src/components/OcurrencesList.vue'

const localVue = createLocalVue()

describe('Verificar se a lista é renderizada ', () => {
  it('renderiza corretamente', () => {
    // exemplo de item
    const items = [
      {
        id: 1,
        transductor: 'Transductor 1',
        start_time: '2023-10-04T10:00:00',
        type: 'Type 1',
        info: 'Info 1',
        writtenStartTime: '10:00 AM',
        writtenEndTime: '11:00 AM'
      },
      {
        id: 2,
        transductor: 'Transductor 2',
        start_time: '2023-10-04T11:00:00',
        type: 'Type 2',
        info: 'Info 2',
        writtenStartTime: '11:00 AM',
        writtenEndTime: '12:00 PM'
      }
    ]

    // Criando lista
    const wrapper = mount(SimpleList, {
      localVue,
      propsData: {
        title: 'Minha Lista',
        items: items,
        type: 'list'
      }
    })

    // Verificando se foi renderizado de forma correta
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.ListTitle').text()).toBe('Minha Lista')

    //Itens da lista
    const itemElements = wrapper.findAll('.q-item')
    expect(itemElements.length).toBe(2) 

    
    // Verificando se elemento da lista estão corretos
    expect(itemElements.at(0).find('.text').text()).toBe('Type 1')
    expect(itemElements.at(0).find('.caption').text()).toBe('Info 1')
    expect(itemElements.at(0).find('.caption-top').text()).toBe('10:00 AM - 11:00 AM')

    // Verifique o segundo item da lista
    expect(itemElements.at(1).find('.text').text()).toBe('Type 2')
    expect(itemElements.at(1).find('.caption').text()).toBe('Info 2')
    expect(itemElements.at(1).find('.caption-top').text()).toBe('11:00 AM - 12:00 PM')
  })

  // Adicione mais testes conforme necessário
})
