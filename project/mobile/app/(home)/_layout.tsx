import { Link, Tabs,Redirect } from 'expo-router';

import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';
import { useAppSelector } from '~/rtk/state/store';

export default function TabLayout() {
  const tokenExists = useAppSelector((state) => !!state.auth.token);

  if (!tokenExists) {
    console.log('no token, redirecting to sign in');
    return <Redirect href="sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarShowLabel: false,
        headerShown: false,
        
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />   
      <Tabs.Screen
        name="favorite-sessions"
        options={{
          title: 'My Favorite Sessions',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />              
      <Tabs.Screen
        name="sessions"
        options={{
          title: 'Session',
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="speakers"
        options={{
          title: 'Speakers',
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />
    </Tabs>
  );
}
