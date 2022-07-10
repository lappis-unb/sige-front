// YourComponent.stories.js

import ActiveBox from './ActiveBox.vue'
import Vuex from 'vuex'
import vue from 'vue'

vue.use(Vuex)

// 👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'ActiveBox',
  component: ActiveBox
}

// 👇 We create a “template” of how args map to rendering
const Template = (args, { argTypes }) => ({
  components: { ActiveBox },
  props: Object.keys(argTypes),
  template: '<ActiveBox  v-bind="$props" />',
  store: new Vuex.Store({
    modules: {
      namespaced: true
    }
  })
})

export const ActiveBoxStory = Template.bind({})
ActiveBoxStory.args = {
  // 👇 The args you need here will depend on your component
  id: 1,
}
