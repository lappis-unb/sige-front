// NoDataPlaceholder.spec.js
import { mount } from '@vue/test-utils'
import NoDataPlaceholder from './NoDataPlaceHolder.vue'  // Update the path based on your actual directory structure

describe('NoDataPlaceholder.vue', () => {
  it('renders props.info when passed', () => {
    const info = 'Test information'
    const wrapper = mount(NoDataPlaceholder, {
      propsData: { info }
    })

    // Check if the component renders correctly
    expect(wrapper.exists()).toBe(true)

    // Check if the provided info is displayed
    expect(wrapper.text()).toContain(info)
  })

  it('matches snapshot', () => {
    const info = 'Snapshot test'
    const wrapper = mount(NoDataPlaceholder, {
      propsData: { info }
    })

    // Take a snapshot of the rendered component
    expect(wrapper.html()).toMatchSnapshot()
  })
})
