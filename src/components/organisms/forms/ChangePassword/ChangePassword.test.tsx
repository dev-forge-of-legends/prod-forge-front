import { render, screen, fireEvent } from "@testing-library/react";
import ChangePassword from "./ChangePassword";

describe("ChangePassword Component", () => {
  test("renders all inputs and button", () => {
    render(<ChangePassword />);
    expect(screen.getByLabelText(/Current Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Update Password/i })).toBeInTheDocument();
  });

  test("shows validation errors when submitting empty form", () => {
    render(<ChangePassword />);
    fireEvent.click(screen.getByRole("button", { name: /Update Password/i }));

    expect(screen.getByText(/Current password is required/i)).toBeInTheDocument();
    expect(screen.getByText(/New password is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirm password is required/i)).toBeInTheDocument();
  });

  test("shows error if new password is too short", () => {
    render(<ChangePassword />);
    
    fireEvent.change(screen.getByPlaceholderText(/Enter Current Password/i), { target: { value: "current123" } });
    fireEvent.change(screen.getByPlaceholderText(/Enter New Password/i), { target: { value: "123" } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: "123" } });
    
    fireEvent.click(screen.getByRole("button", { name: /Update Password/i }));
    
    expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
  });

  test("shows error if confirm password does not match", () => {
    render(<ChangePassword />);
    
    fireEvent.change(screen.getByPlaceholderText(/Enter Current Password/i), { target: { value: "current123" } });
    fireEvent.change(screen.getByPlaceholderText(/Enter New Password/i), { target: { value: "newpass123" } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: "differentpass" } });

    fireEvent.click(screen.getByRole("button", { name: /Update Password/i }));

    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  test("submits form if all fields are valid", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    render(<ChangePassword />);

    fireEvent.change(screen.getByPlaceholderText(/Enter Current Password/i), { target: { value: "oldpass123" } });
    fireEvent.change(screen.getByPlaceholderText(/Enter New Password/i), { target: { value: "newpass123" } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: "newpass123" } });

    fireEvent.click(screen.getByRole("button", { name: /Update Password/i }));

    expect(logSpy).toHaveBeenCalledWith("Submitting:", {
      current: "oldpass123",
      new: "newpass123",
      confirm: "newpass123",
    });

    logSpy.mockRestore();
  });
});
