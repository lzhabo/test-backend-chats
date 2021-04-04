import axios from "axios";

describe("items", () => {
  it("create baskets", async () => {
    await Promise.all(
      Array.from(
        { length: 5 },
        async () =>
          axios.post("http://localhost:5000/api/v1/baskets", {
            color: "blue",
            size: "M",
            material: "ui",
            // basketId: 1,
          }),
        {}
      )
    );
  });
  it("create balls", async () => {
    await Promise.all(
      Array.from(
        { length: 5 },
        async () =>
          axios.post("http://localhost:5000/api/v1/balls", {
            color: "pink",
            size: "S",
            material: "glass",
          }),
        {}
      )
    );
  });
});
