import { mount } from "@vue/test-utils";
import HelloWorld from "@infra/vue/components/HelloWorld.vue";

describe("HelloWorld", () => {
  it("should mount correctly", () => {
    const wrapper = mount(HelloWorld);
    expect(wrapper.text()).toContain("Test hello");
  });
});
