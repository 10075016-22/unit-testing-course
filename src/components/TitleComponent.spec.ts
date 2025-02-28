import { shallowMount } from "@vue/test-utils"
import TitleComponent, { TitleComponentProps } from "./TitleComponent.vue"

const createWrapper = (props?: TitleComponentProps) => shallowMount(TitleComponent, {
    props
})

let wrapper = createWrapper()
describe('Titlecomponent test suite', () => {
    beforeEach(() => {
        wrapper = createWrapper()
    })
    it('should display the title value', () => {
        const wrapper = shallowMount(TitleComponent, {
            props: {
                value: 'My title'
            }
        })

        expect(wrapper.text()).toBe('My title')
    })

    it('should emit on-mounted when the component is mounted', () => {
        expect(wrapper.emitted('on-mounted')).toBeTruthy()
    })
})