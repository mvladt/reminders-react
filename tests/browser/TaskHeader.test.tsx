import { describe, it, expect } from "vitest";
import { render } from "vitest-browser-react";

import TaskHeader from "../../src/components/TaskHeader";

describe("TaskHeader", () => {
  it("Отображается с заголовком и числом завершенных задач.", async () => {
    // Arrange
    const mockToggle = () => {};
    const mockClear = () => {};

    // Act
    const { getByText, getByRole } = await render(
      <TaskHeader
        title="Мои задачи"
        isShow={true}
        numberOfCompleted={5}
        onToggle={mockToggle}
        onClear={mockClear}
      />
    );

    // Assert
    await expect.element(getByText("Мои задачи")).toBeInTheDocument();
    await expect.element(getByText("5 завершены")).toBeInTheDocument();
    await expect
      .element(getByRole("button", { name: "Скрыть" }))
      .toBeInTheDocument();
    await expect
      .element(getByRole("button", { name: "Очистить" }))
      .toBeInTheDocument();
  });
});
