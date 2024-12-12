import { Link, Redirect } from 'expo-router';
import React from 'react';

import { Button } from '../components/Button';
import { Image, Text, View } from 'react-native';
import { useAppSelector } from '~/rtk/state/store';

export default function Index() {
  const token = useAppSelector((state) => state.auth.token);

  if (token) {
    console.log('redirecting to home');
    return <Redirect href="/(home)/sessions" />;
  }

  return (
    <View className="flex flex-1 justify-center items-center gap-3 px-4 bg-neutral-900">
      <Image
        className="h-20"
        resizeMode="contain"
        source={require('~/assets/globomantics-logo-darkblue.png')}
      />
      <Text className="text-2xl text-center text-white">Globomantics Developer Conference</Text>
      <Text className="text-lg text-center text-gray-300">
        Explore speakers and sessions. Create an account to submit a session of your own!
      </Text>
      <Link href="/sign-in" asChild>
        <Button>
          <Text className="text-white">Sign In to Get Started!</Text>
        </Button>
      </Link>

      <Text className="text-gray-300">
        Don't have an account?{' '}
        <Link href="/sign-up" className="font-bold text-white">
          Sign Up
        </Link>
      </Text>
    </View>
  );
}
