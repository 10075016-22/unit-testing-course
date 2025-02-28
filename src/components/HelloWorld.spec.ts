import { vi } from 'vitest'
import { createWrapperError, mount, shallowMount } from '@vue/test-utils'
import HelloWorld, { HelloWorldProps } from './HelloWorld.vue'
import axios from 'axios'
import TitleComponent from './TitleComponent.vue'

vi.mock('axios')

const createWrapper = (props?: HelloWorldProps) => shallowMount(HelloWorld, {
    props
})

it("should render the msg property", () => {
    const instance = mount(HelloWorld, {
        props: {
            msg: 'My first test'
        }
    })

    expect(instance.find('h1').text()).toBe('My first test')
})

it("should increment count when the increment method is called", () => {
    const instance = mount(HelloWorld);

    instance.vm.increment()

    expect(instance.vm.count).toBe(1)
})

it("should increment the count display it", async () => {
    const instance = mount(HelloWorld);

    const button = instance.find('button')

    await button.trigger('click')

    expect(button.text()).toBe('count is 1')

})


describe("Hello world test suites", () => {
    globalThis.fetch = vi.fn();
    /** it('should make a fetch call using correct url depending on msg property', async () => {
        // Given the HelloWorld component is mounted
        const instance = shallowMount(HelloWorld)

        instance.setProps({
            msg: 'test'
        })
        await instance.vm.$nextTick()

        expect(fetch).toHaveBeenNthCalledWith(1, 'https://httpbin.org/get')
        // whern the msg property changes
        // Then we expect that the fetch function is called with good url        
    }) **/

    it('should call axios.get function width https://httpbin.org/get when msg property changes', async () => {
        const instance = shallowMount(HelloWorld)

        await instance.setProps({
            msg: 'test'
        })

        expect(axios.get).toHaveBeenNthCalledWith(1, 'https://httpbin.org/get')
    })

    it('should bind the msg property with a prefix (My title) to TitleComponent', async () => {
        const wrapper = shallowMount(HelloWorld, {
            props: {
                msg: 'First section'
            }
        })
        await wrapper.vm.$nextTick()
        const titleComponentWraper = wrapper.findComponent(TitleComponent)
        expect( titleComponentWraper.props('value') ).toBe('My title: First section')
    })

    // test.each([
    //     { msg: 'First section', titleComponentExists: true },
    //     { msg: undefined, titleComponentExists: false },
    //     { msg: '', titleComponentExists: false}
    // ])('msg: $msg -> titleComponentExists: $titleComponentExists', ({ msg, titleComponentExists}) => {
    //     const wrapper = shallowMount(HelloWorld, {
    //         props: {
    //             msg
    //         }
    //     })
    //     const titleComponentWraper = wrapper.findComponent(TitleComponent)

    //     expect(titleComponentWraper.exists()).toBe(titleComponentExists)
    // })

    // v-show directive
    test.each([
        { msg: 'First section', titleComponentStyle: undefined },
        { msg: undefined, titleComponentStyle: 'display: none;' },
        { msg: '', titleComponentStyle: 'display: none;'}
    ])('msg: $msg -> titleComponentStyle: $titleComponentStyle', ({ msg, titleComponentStyle}) => {
        const wrapper = shallowMount(HelloWorld, {
            props: {
                msg
            }
        })
        const titleComponentWraper = wrapper.findComponent(TitleComponent)

        expect(titleComponentWraper.element.attributes.getNamedItem('style')?.value).toBe(titleComponentStyle)
    })

    test.each([
        { msg: 'First section', successClassExists: false },
        { msg: undefined, successClassExists: true },
        { msg: '', successClassExists: true}
    ])('msg: $msg -> successClassExists: $successClassExists', ({ msg, successClassExists}) => {
        const wrapper = shallowMount(HelloWorld, {
            props: {
                msg
            }
        })
        const cardElementWraper = wrapper.find<HTMLDivElement>('.card-success')

        expect(cardElementWraper.exists()).toBe(successClassExists)
    })


    it('should emit card-clicked when the card is clicked', async () => {
        const wrapper = createWrapper()

        const card = wrapper.find('.card')

        await card.trigger('click')
        expect(wrapper.emitted('card-clicked')).toBeTruthy()
    })

    it('should emit up event when title component emit on-mounted event', async () => {
        const wrapper = createWrapper()

        const titleComponentWrapper = wrapper.findComponent(TitleComponent)
        
        titleComponentWrapper.vm.$emit('on-mounted')

        expect(wrapper.emitted('up')).toBeTruthy()
        expect(wrapper.emitted('up')).toHaveLength(1)
        expect(wrapper.emitted('up')?.[0][0]).toBe(0)

    })
})