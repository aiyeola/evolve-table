import { describe, expect, it } from "vitest";

import App from "../App";
import { render, screen } from "../utils/test-utils";

describe("Sample App vitest", () => {
  it("the title is visible", () => {
    render(<App />);
    expect(screen.getByText(/Sample table/i)).toBeInTheDocument();
  });
});
