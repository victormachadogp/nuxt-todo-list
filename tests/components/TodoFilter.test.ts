import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TodoFilter from "@/src/components/TodoFilter.vue";
import type { Todo } from "@/src/types/todo";

describe("TodoFilter", () => {
  const mockTodos: Todo[] = [
    { id: "1", title: "Todo 1", completed: false, createdAt: new Date() },
    { id: "2", title: "Todo 2", completed: true, createdAt: new Date() },
    { id: "3", title: "Todo 3", completed: true, createdAt: new Date() },
  ];

  const createWrapper = (
    currentFilter: "all" | "active" | "completed" = "all"
  ) => {
    return mount(TodoFilter, {
      props: {
        currentFilter,
        todos: mockTodos,
      },
    });
  };

  it("renders all filter buttons", () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAll("button");

    expect(buttons).toHaveLength(3);
    expect(buttons[0].text()).toContain("Todas");
    expect(buttons[1].text()).toContain("Pendentes");
    expect(buttons[2].text()).toContain("Completas");
  });

  it("shows correct count for each filter", () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAll("button");

    expect(buttons[0].text()).toContain("(3)"); // All todos
    expect(buttons[1].text()).toContain("(1)"); // Active todos
    expect(buttons[2].text()).toContain("(2)"); // Completed todos
  });

  it("applies correct styles to selected filter", () => {
    const wrapper = createWrapper("completed");
    const buttons = wrapper.findAll("button");

    expect(buttons[2].classes()).toContain("bg-emerald-500");
    expect(buttons[0].classes()).toContain("bg-gray-100");
    expect(buttons[1].classes()).toContain("bg-gray-100");
  });

  it("emits update event when filter is clicked", async () => {
    const wrapper = createWrapper();
    const buttons = wrapper.findAll("button");

    await buttons[1].trigger("click");
    expect(wrapper.emitted("update")?.[0]).toEqual(["active"]);

    await buttons[2].trigger("click");
    expect(wrapper.emitted("update")?.[1]).toEqual(["completed"]);
  });

  it("updates filter counts when todos prop changes", async () => {
    const wrapper = createWrapper();

    // Update todos prop
    await wrapper.setProps({
      todos: [
        { id: "1", title: "Todo 1", completed: false, createdAt: new Date() },
        { id: "2", title: "Todo 2", completed: false, createdAt: new Date() },
      ],
    });

    const buttons = wrapper.findAll("button");
    expect(buttons[0].text()).toContain("(2)"); // All todos
    expect(buttons[1].text()).toContain("(2)"); // Active todos
    expect(buttons[2].text()).toContain("(0)"); // Completed todos
  });
});
