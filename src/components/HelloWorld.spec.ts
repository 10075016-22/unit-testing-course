import { describe, expect, it, vi } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import HelloWorld from './HelloWorld.vue'
import axios from 'axios'

vi.mock('axios')

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
})