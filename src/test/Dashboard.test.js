import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Dashboard from "./../Dashboard";

jest.mock("./../api/people");

let container;
describe("Dashboard.js", () => {
  beforeEach(async () => {
    // Setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    await act(async () => {
      render(<Dashboard />, container);
    });
  });
  afterEach(() => {
    // Cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  it("fetches peopleData on component load", () => {
    expect(container.querySelector("#table-title").textContent).toBe(
      "Scores listing (5)"
    );
  });
});
