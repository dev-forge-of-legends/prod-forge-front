import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "../header/Header";

// Mock SignupModal to avoid rendering full modal content in unit test
jest.mock("../SignupModal", () => ({
  SignupModal: ({ isOpen }: { isOpen: boolean }) => {
    return isOpen ? (
      <div data-testid="signup-modal">Mock Signup Modal</div>
    ) : null;
  },
}));

describe("Header", () => {
  it("renders the left and center logos", () => {
    render(<Header />);

    expect(screen.getByAltText("logo")).toBeInTheDocument(); // Left logo

    expect(screen.getAllByAltText("logo")[1]).toBeInTheDocument(); // Center logo
  });

  it("renders the top and bottom arrow images", () => {
    render(<Header />);
    expect(screen.getAllByAltText(/arrow/i).length).toBe(2);
  });

  it("renders the Play Now button", () => {
    render(<Header />);
    expect(
      screen.getByRole("button", { name: /play now/i })
    ).toBeInTheDocument();
  });

  it("opens the signup modal on clicking Play Now", () => {
    render(<Header />);
    const button = screen.getByRole("button", { name: /play now/i });

    // Modal should not be present initially
    expect(screen.queryByTestId("signup-modal")).not.toBeInTheDocument();

    // Click to open modal
    fireEvent.click(button);
    expect(screen.getByTestId("signup-modal")).toBeInTheDocument();
  });
});
