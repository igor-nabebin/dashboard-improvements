import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from "./../App";

jest.mock("./../api/people");

it("renders without crashing", async () => {
  const div = document.createElement("div");
  await act(async () => {
    render(<App />, div);
  });
  unmountComponentAtNode(div);
});
