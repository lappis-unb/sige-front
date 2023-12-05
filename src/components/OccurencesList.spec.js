
import { mount } from '@vue/test-utils'
import SimpleList from './OccurencesList.vue' 
describe('SimpleList.vue', () => {
  it('renders title and items correctly', () => {
    const title = 'Test Title'
    const items = [
      { id: 1, type: 'Type 1', info: 'Info 1', writtenStartTime: 'Start Time 1', writtenEndTime: 'End Time 1' },
      { id: 2, type: 'Type 2', info: 'Info 2', writtenStartTime: 'Start Time 2', writtenEndTime: 'End Time 2' }
    ]

    const wrapper = mount(SimpleList, {
      propsData: {
        title,
        items
      }
    })


    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.ListTitle').text()).toBe(title)

    const itemElements = wrapper.findAll('.text')
    expect(itemElements.length).toBe(items.length)

    items.forEach((item, index) => {
      expect(itemElements.at(index).text()).toBe(item.type)
    })
  })


})
