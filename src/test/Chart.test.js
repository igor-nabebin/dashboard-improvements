import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import Chart from "./../Chart";
import { peopleData } from "./../api/__mocks__/people";

const isCloseEnough = (num1, num2) => Math.abs((num2 - num1) / num1) <= 0.001;

let container;
describe("Chart.js", () => {
  afterEach(() => {
    // Cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("renders valid chart", async () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    render(
      <Chart data={peopleData} xValue="gender" width={1000} aspect={1.33} />,
      container
    );
    const bars = document.querySelectorAll(".recharts-rectangle");
    const barHeights = [...bars].map(el => el.getAttribute("height"));
    expect(bars).toHaveLength(2);
    // Comparing bar heights ratio and avg scores ratio
    expect(isCloseEnough(barHeights[0] / barHeights[1], 69 / 61)).toBe(true);
  });

  it("ignores people with null scores", () => {
    const emptyData = [
      {
        id: "0",
        first_name: "Name",
        last_name: "FamilyName",
        email: "email@email.mail",
        gender: "Male",
        city: "City",
        country: "DE",
        score: null,
        created_at: "1970-01-01T00:00:00Z",
      },
    ];
    container = document.createElement("div");
    document.body.appendChild(container);
    render(
      <Chart data={emptyData} xValue="gender" width={1000} aspect={1.33} />,
      container
    );
    const barContainers = document.querySelectorAll(".recharts-bar-rectangle");
    expect(barContainers).toHaveLength(0);
  });
});
