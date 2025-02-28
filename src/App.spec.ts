import { mount, shallowMount } from "@vue/test-utils";
import { expect, it } from "vitest";

import App from './App.vue'

it("should render the content of hello world", () => {
    const instance = mount(App)

    expect(instance.html()).toContain("official Vue")
})

