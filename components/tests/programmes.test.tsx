import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import Programmes from '../Programmes';

describe('Programmes component', () => {
  it('should render text fields from the programmes array', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        programmes: [
          { name: 'Programme A', price: 10 },
          { name: 'Programme B', price: 15 },
          { name: 'Programme C', price: 20 }
        ]
      })
    );

    const { getAllByTestId } = render(<Programmes />);

    const items = await waitFor(() => getAllByTestId('programme-item'));
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent('Programme A');
    expect(items[1]).toHaveTextContent('Programme B');
    expect(items[2]).toHaveTextContent('Programme C');
  });
});
