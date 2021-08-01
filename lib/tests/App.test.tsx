import React from "react";

import { render, screen } from "@testing-library/react";

import { App } from "@app/Main";

/**
 * Tests
 */

describe("Application", () => {
  it("Rendering", async () => {
    render(<App />);

    const textElement = await screen.findByText("Application");
    expect(textElement).toBeInTheDocument();
  });
});
