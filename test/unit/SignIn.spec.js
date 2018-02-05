import { shallow } from '@vue/test-utils'
import SignIn from '@/views/auth/SignIn.vue'

describe('SignIn.vue', () => {
  it('has the correct title', () => {
    const msg = 'Welcome to DnDHub'
    const wrapper = shallow(SignIn, {
      propsData: { msg }
    })
    const titleElement = wrapper.find('.title')
    expect(titleElement.text()).toMatch(msg)
    // expect(wrapper.text()).toMatch(msg)
  })
})
