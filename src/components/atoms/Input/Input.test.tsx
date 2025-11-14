import { fireEvent, render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input Component', () => {
  it('renders with label and placeholder', () => {
    render(
      <Input
        id="email"
        label="Email"
        value=""
        onChange={() => { }}
        placeholder="Enter your email"
      />
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const handleChange = jest.fn();
    render(
      <Input
        id="username"
        label="Username"
        value=""
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText(/Username/i);
    fireEvent.change(input, { target: { value: 'testuser' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('shows error message when error is passed', () => {
    render(
      <Input
        id="email"
        label="Email"
        value=""
        onChange={() => { }}
        error="Invalid email"
      />
    );

    expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
  });
});
