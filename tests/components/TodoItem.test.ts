import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TodoItem from "@/src/components/TodoItem.vue";
import { nextTick } from "vue";

describe("TodoItem", () => {
  const mockTodo = {
    id: "1",
    title: "Test Todo",
    completed: false,
    createdAt: new Date(),
  };

  it("renders todo title correctly", () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: mockTodo,
      },
    });
    expect(wrapper.text()).toContain("Test Todo");
  });

  it("emits toggle event when checkbox is clicked", async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: mockTodo,
      },
    });

    await wrapper.find("span").trigger("click");
    expect(wrapper.emitted("toggle")).toBeTruthy();
  });

  it("enters edit mode on double click", async () => {
    const wrapper = mount(TodoItem, {
      props: { todo: mockTodo },
    });

    const titleSpan = wrapper.find("span:not(.flex)");
    await titleSpan.trigger("dblclick");
    await nextTick();

    expect(wrapper.find('input[class*="border rounded"]').exists()).toBe(true);
  });

  it("emits update event with new title", async () => {
    const wrapper = mount(TodoItem, {
      props: { todo: mockTodo },
    });

    const titleSpan = wrapper.find("span:not(.flex)");
    await titleSpan.trigger("dblclick");
    await nextTick();

    const input = wrapper.find('input[class*="border rounded"]');
    await input.setValue("Updated Todo");
    await input.trigger("keyup.enter");

    expect(wrapper.emitted("update")).toBeTruthy();
    expect(wrapper.emitted("update")?.[0]).toEqual(["Updated Todo"]);
  });

  it("emits delete event when delete button is clicked", async () => {
    const wrapper = mount(TodoItem, {
      props: {
        todo: mockTodo,
      },
    });

    await wrapper.find("button:last-child").trigger("click");
    expect(wrapper.emitted("delete")).toBeTruthy();
  });
});
