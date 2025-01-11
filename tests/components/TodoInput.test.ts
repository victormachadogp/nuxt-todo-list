import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import TodoInput from "@/src/components/TodoInput.vue";

// Mock for vue-toastification
const mockToastError = vi.fn();
vi.mock("vue-toastification", () => ({
  useToast: () => ({
    error: mockToastError,
  }),
}));

describe("TodoInput", () => {
  beforeEach(() => {
    // Clear mock calls before each test
    mockToastError.mockClear();
  });

  const createWrapper = () => {
    return mount(TodoInput, {
      props: {
        placeholder: "Test placeholder",
      },
    });
  };

  it("renders correctly with placeholder", () => {
    const wrapper = createWrapper();
    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
    expect(input.attributes("placeholder")).toBe("Test placeholder");
  });

  it("emits submit event with valid input", async () => {
    const wrapper = createWrapper();
    const input = wrapper.find("input");
    const validText = "Valid todo item";

    await input.setValue(validText);
    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted("submit")).toBeTruthy();
    expect(wrapper.emitted("submit")?.[0]).toEqual([validText]);
    expect(input.element.value).toBe(""); // Input should be cleared after submit
  });

  it("shows error for empty input", async () => {
    const wrapper = createWrapper();

    await wrapper.find("input").setValue("   "); // Only spaces
    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted("submit")).toBeFalsy();
    expect(mockToastError).toHaveBeenCalledWith(
      "A tarefa não pode estar vazia!"
    );
  });

  it("shows error for too short input", async () => {
    const wrapper = createWrapper();
    const shortText = "ab";

    await wrapper.find("input").setValue(shortText);
    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted("submit")).toBeFalsy();
    expect(mockToastError).toHaveBeenCalledWith(
      "A tarefa deve ter no mínimo 3 caracteres!"
    );
  });

  it("shows error for too long input", async () => {
    const wrapper = createWrapper();
    const longText = "a".repeat(101);

    await wrapper.find("input").setValue(longText);
    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted("submit")).toBeFalsy();
    expect(mockToastError).toHaveBeenCalledWith(
      "A tarefa deve ter no máximo 100 caracteres!"
    );
  });

  it("trims input before submission", async () => {
    const wrapper = createWrapper();
    const textWithSpaces = "  Valid todo item  ";

    await wrapper.find("input").setValue(textWithSpaces);
    await wrapper.find("form").trigger("submit");

    expect(wrapper.emitted("submit")?.[0]).toEqual(["Valid todo item"]);
  });
});
