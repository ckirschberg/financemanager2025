import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export const UserProfile = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://example.com/api/user')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      }).then((data) => {
        setUser(data);
        setLoading(false);
      }).catch(() => { setError(true); setLoading(false); });
  }, []);

  if (loading) return <ActivityIndicator testID="loading-indicator" />;
  if (error) return <Text testID="error-message">Failed to load user</Text>;

  return (
    <View>
      <Text testID="user-name">Welcome, {user?.name}!</Text>
    </View>
  );
};
