import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { Simulate } from "react-dom/test-utils";
import ScoreTable from "./../ScoreTable";
import { peopleData } from "./../api/__mocks__/people";

let container;
describe("ScoreTable.js", () => {
  beforeEach(async () => {
    // Setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    render(<ScoreTable data={peopleData} />, container);
  });
  afterEach(() => {
    // Cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  describe("sorts peopleData", () => {
    it("by last_name (asc) by default", () => {
      expect(
        [...document.querySelectorAll(".person .last_name")].map(
          el => el.textContent
        )
      ).toEqual([
        "Burrows",
        "Casbourne",
        "Dunsmuir",
        "Ledstone",
        "Mattusevich",
      ]);
    });

    it("by last_name (desc) on column title click", () => {
      const lastNameTitle = document.querySelector("#head-last_name");
      Simulate.click(lastNameTitle);
      expect(
        [...document.querySelectorAll(".person .last_name")].map(
          el => el.textContent
        )
      ).toEqual([
        "Mattusevich",
        "Ledstone",
        "Dunsmuir",
        "Casbourne",
        "Burrows",
      ]);
    });

    it("by first_name", () => {
      const firstNameTitle = document.querySelector("#head-first_name");
      Simulate.click(firstNameTitle);
      expect(
        [...document.querySelectorAll(".person .first_name")].map(
          el => el.textContent
        )
      ).toEqual(["Hadria", "Jaclin", "Murdock", "Rainer", "Sunshine"]);
    });

    it("by gender", () => {
      const genderTitle = document.querySelector("#head-gender");
      Simulate.click(genderTitle);
      expect(
        [...document.querySelectorAll(".person .gender")].map(
          el => el.textContent
        )
      ).toEqual(["", "Female", "Female", "Male", "Male"]);
    });

    it("by city", () => {
      const cityTitle = document.querySelector("#head-city");
      Simulate.click(cityTitle);
      expect(
        [...document.querySelectorAll(".person .city")].map(
          el => el.textContent
        )
      ).toEqual(["", "Faratsiho", "Kunvald", "Meiyao", "Olofström"]);
    });

    it("by country", () => {
      const countryTitle = document.querySelector("#head-country");
      Simulate.click(countryTitle);
      expect(
        [...document.querySelectorAll(".person .country")].map(
          el => el.textContent
        )
      ).toEqual(["CN", "CZ", "ID", "MG", "SE"]);
    });

    it("by score", () => {
      const scoreTitle = document.querySelector("#head-score");
      Simulate.click(scoreTitle);
      expect(
        [...document.querySelectorAll(".person .score")].map(
          el => el.textContent
        )
      ).toEqual(["", "", "53", "69", "69"]);
    });
  });

  describe("filters peopleData", () => {
    it("by last_name", () => {
      const filterInput = document.querySelector("#filter-input");
      filterInput.value = "r";
      Simulate.change(filterInput);
      expect(
        [...document.querySelectorAll(".person .last_name")].map(
          el => el.textContent
        )
      ).toEqual(["Burrows", "Casbourne", "Dunsmuir"]);
      filterInput.value = "ur";
      Simulate.change(filterInput);
      expect(
        [...document.querySelectorAll(".person .last_name")].map(
          el => el.textContent
        )
      ).toEqual(["Burrows", "Casbourne"]);
    });

    it("by first_name", () => {
      const filterSelectorBtn = document.querySelector(
        "#filter-selector [role='button']"
      );
      Simulate.click(filterSelectorBtn);

      const firstNameFilterSelectBtn = document.querySelector(
        "#filter-selector-first_name"
      );
      Simulate.click(firstNameFilterSelectBtn);

      const filterInput = document.querySelector("#filter-input");
      filterInput.value = "n";
      Simulate.change(filterInput);
      expect(
        [...document.querySelectorAll(".person .first_name")].map(
          el => el.textContent
        )
      ).toEqual(["Rainer", "Jaclin", "Sunshine"]);
      filterInput.value = "ne";
      Simulate.change(filterInput);
      expect(
        [...document.querySelectorAll(".person .first_name")].map(
          el => el.textContent
        )
      ).toEqual(["Rainer", "Sunshine"]);
    });

    it("by gender", () => {
      const filterSelectorBtn = document.querySelector(
        "#filter-selector [role='button']"
      );
      Simulate.click(filterSelectorBtn);

      const genderFilterSelectBtn = document.querySelector(
        "#filter-selector-gender"
      );
      Simulate.click(genderFilterSelectBtn);

      ["Female", "Male", "none"].forEach(gender => {
        const filterSelectBtn = document.querySelector(
          "#filter-select [role='button']"
        );
        Simulate.click(filterSelectBtn);
        Simulate.click(document.querySelector(`#filter-select-${gender}`));
        expect(
          [...document.querySelectorAll(".person .gender")]
            .map(el => el.textContent)
            .every(param => (param || "none") === gender)
        ).toBe(true);
      });
    });

    it("by city", () => {
      const filterSelectorBtn = document.querySelector(
        "#filter-selector [role='button']"
      );
      Simulate.click(filterSelectorBtn);

      const cityFilterSelectBtn = document.querySelector(
        "#filter-selector-city"
      );
      Simulate.click(cityFilterSelectBtn);

      const filterInput = document.querySelector("#filter-input");
      filterInput.value = "o";
      Simulate.change(filterInput);
      expect(
        [...document.querySelectorAll(".person .city")].map(
          el => el.textContent
        )
      ).toEqual(["Faratsiho", "Olofström", "Meiyao"]);
      filterInput.value = "lo";
      Simulate.change(filterInput);
      expect(
        [...document.querySelectorAll(".person .city")].map(
          el => el.textContent
        )
      ).toEqual(["Olofström"]);
    });

    it("by country", () => {
      const filterSelectorBtn = document.querySelector(
        "#filter-selector [role='button']"
      );
      Simulate.click(filterSelectorBtn);

      const countryFilterSelectBtn = document.querySelector(
        "#filter-selector-country"
      );
      Simulate.click(countryFilterSelectBtn);

      ["CN", "CZ", "ID", "MG", "SE"].forEach(country => {
        const filterSelectBtn = document.querySelector(
          "#filter-select [role='button']"
        );
        Simulate.click(filterSelectBtn);
        Simulate.click(document.querySelector(`#filter-select-${country}`));
        expect(
          [...document.querySelectorAll(".person .country")]
            .map(el => el.textContent)
            .every(param => (param || "none") === country)
        ).toBe(true);
      });
    });
  });
});
