import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Counter from '../counter';

describe('Counter component', () => {
  it('should start with count 0 and increment on button press', () => {
    const { getByText, getByTestId } = render(<Counter />);

    expect(getByTestId('counter-text')).toHaveTextContent('Count: 0');

    fireEvent.press(getByText('Increment'));

    expect(getByTestId('counter-text')).toHaveTextContent('Count: 1');
  });
});
