import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';

const options = [
  { label: 'Canada', value: 'CA' },
  { label: 'USA', value: 'US' },
];

describe('Select Component', () => {
  it('renders with label and options', () => {
    render(
      <Select
        id="country"
        label="Country"
        value=""
        onChange={() => {}}
        options={options}
        placeholder="Select Country"
      />
    );

    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByText(/Select Country/i)).toBeInTheDocument();
    expect(screen.getByText(/Canada/i)).toBeInTheDocument();
    expect(screen.getByText(/USA/i)).toBeInTheDocument();
  });

  it('calls onChange when option is selected', () => {
    const handleChange = jest.fn();
    render(
      <Select
        id="country"
        label="Country"
        value=""
        onChange={handleChange}
        options={options}
      />
    );

    fireEvent.change(screen.getByLabelText(/Country/i), {
      target: { value: 'US' },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('shows error message if error is passed', () => {
    render(
      <Select
        id="country"
        label="Country"
        value=""
        onChange={() => {}}
        options={options}
        error="Country is required"
      />
    );

    expect(screen.getByText(/Country is required/i)).toBeInTheDocument();
  });
});
