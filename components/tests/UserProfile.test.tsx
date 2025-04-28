import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { UserProfile } from '../UserProfile';

describe('UserProfile', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('renders loading indicator and then shows user name', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: 'Alice' }));

    const { getByTestId, queryByTestId } = render(<UserProfile />);

    // Shows loading indicator first
    expect(getByTestId('loading-indicator')).toBeTruthy();

    // Wait for the user name to appear and loading to disappear
    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
      expect(getByTestId('user-name')).toHaveTextContent('Welcome, Alice!');
    });
  });
  
  it('renders error message when fetch fails', async () => {
    fetchMock.mockRejectOnce(new Error('API is down'));

    const { getByTestId, queryByTestId } = render(<UserProfile />);
    expect(getByTestId('loading-indicator')).toBeTruthy();

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
      expect(getByTestId('error-message')).toHaveTextContent('Failed to load user');
    });
  });
});
