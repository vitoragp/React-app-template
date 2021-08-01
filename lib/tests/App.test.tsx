import React from "react";

import { render, screen } from "@testing-library/react";

import { App } from "@app/Main";

import { act } from "react-dom/test-utils";

/**
 * Tests
 */

describe("Application", () => {
  it("Rendering", async () => {
    render(<App />);

    const buttonElement = await screen.findByText("Click me!");

    act(() => {
      buttonElement.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const textElement = await screen.findByText("helloWorld!");
    expect(textElement).toBeInTheDocument();
  });
});
