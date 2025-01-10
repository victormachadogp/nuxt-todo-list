import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TodoList from "@/components/TodoList.vue";
import TodoItem from "@/components/TodoItem.vue"; // Verifique se está sendo importado corretamente

describe("TodoList", () => {
  const mockTodos = [
    {
      id: "1",
      title: "Test Todo 1",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Test Todo 2",
      completed: true,
      createdAt: new Date(),
    },
  ];

  it("renders loading state correctly", () => {
    const wrapper = mount(TodoList, {
      props: {
        items: [],
        loading: true,
        error: null,
      },
      global: {
        components: {
          TodoItem, // Registra o componente globalmente
        },
      },
    });
    expect(wrapper.text()).toContain("Carregando...");
  });

  it("renders error state correctly", () => {
    const errorMessage = "Error loading todos";
    const wrapper = mount(TodoList, {
      props: {
        items: [],
        loading: false,
        error: errorMessage,
      },
      global: {
        components: {
          TodoItem, // Registra o componente globalmente
        },
      },
    });
    expect(wrapper.text()).toContain(errorMessage);
  });

  it("renders todo items correctly", () => {
    const wrapper = mount(TodoList, {
      props: {
        items: mockTodos,
        loading: false,
        error: null,
      },
      global: {
        components: {
          TodoItem, // Registra o componente globalmente
        },
      },
    });

    const todoItems = wrapper.findAllComponents(TodoItem);
    expect(todoItems).toHaveLength(2);
    expect(todoItems[0].props("todo")).toEqual(mockTodos[0]);
    expect(todoItems[1].props("todo")).toEqual(mockTodos[1]);
  });

  it("emits toggle event with correct id", async () => {
    const wrapper = mount(TodoList, {
      props: {
        items: mockTodos,
        loading: false,
        error: null,
      },
      global: {
        components: {
          TodoItem, // Registra o componente globalmente
        },
      },
    });

    const firstTodoItem = wrapper.findComponent(TodoItem);
    await firstTodoItem.vm.$emit("toggle");

    const toggleEvents = wrapper.emitted("toggle");
    expect(toggleEvents).toBeTruthy();
    expect(toggleEvents?.[0]).toEqual(["1"]);
  });

  it("emits update event with correct id and title", async () => {
    const wrapper = mount(TodoList, {
      props: {
        items: mockTodos,
        loading: false,
        error: null,
      },
      global: {
        components: {
          TodoItem, // Registra o componente globalmente
        },
      },
    });

    const firstTodoItem = wrapper.findComponent(TodoItem);
    await firstTodoItem.vm.$emit("update", "Updated Todo");

    const updateEvents = wrapper.emitted("update");
    expect(updateEvents).toBeTruthy();
    expect(updateEvents?.[0]).toEqual(["1", "Updated Todo"]);
  });

  it("emits delete event with correct id", async () => {
    const wrapper = mount(TodoList, {
      props: {
        items: mockTodos,
        loading: false,
        error: null,
      },
      global: {
        components: {
          TodoItem, // Registra o componente globalmente
        },
      },
    });

    const firstTodoItem = wrapper.findComponent(TodoItem);
    await firstTodoItem.vm.$emit("delete");

    const deleteEvents = wrapper.emitted("delete");
    expect(deleteEvents).toBeTruthy();
    expect(deleteEvents && deleteEvents[0]).toEqual(["1"]);
  });
});
