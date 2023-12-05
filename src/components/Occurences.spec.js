// Occurences.spec.js
import { mount } from '@vue/test-utils'
import Occurences from './Occurences.vue'  // Update the path based on your actual directory structure

jest.mock('@/services/masterApi/http-common', () => ({
  get: jest.fn(() => Promise.resolve({ data: {} }))
}))

describe('Occurences.vue', () => {
  it('renders occurrences correctly', async () => {
    const wrapper = mount(Occurences, {
      propsData: {
        id: 'your_id_here'  // Provide a sample ID
      }
    })

    // Wait for data to be loaded
    await wrapper.vm.$nextTick()

    // Check if the component renders correctly
    expect(wrapper.exists()).toBe(true)

    // Add more assertions based on your component's logic and expected behavior
    // For example, you can check if specific elements are rendered or if data is displayed correctly.
  })

  // Add more test cases as needed
})
