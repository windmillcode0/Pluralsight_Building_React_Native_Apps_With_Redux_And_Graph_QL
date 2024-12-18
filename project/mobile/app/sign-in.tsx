import { router } from 'expo-router';
import { useReducer } from 'react';
import { Image, Text, View, TextInput } from 'react-native';
import { Button } from '~/components/Button';
import { useSignInMutation } from '~/rtk/service/generated';
import { setCredentials } from '~/rtk/slices/authSlice';
import { useAppDispatch } from '~/rtk/state/store';

type State = {
  email: string;
  password: string;
};

type Action = { type: 'setEmail'; payload: string } | { type: 'setPassword'; payload: string };

const initialState: State = {
  email: '',
  password: '',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setEmail':
      return { ...state, email: action.payload };
    case 'setPassword':
      return { ...state, password: action.payload };
    default:
      return state;
  }
}

export function useForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setEmail = (email: string) => dispatch({ type: 'setEmail', payload: email });
  const setPassword = (password: string) => dispatch({ type: 'setPassword', payload: password });

  return { state, setEmail, setPassword };
}

export default function SignIn() {
  const { state, setEmail, setPassword } = useForm();

  const dispatch = useAppDispatch();

  const [signIn] = useSignInMutation();

  return (
    <View className="flex-1 justify-center items-center p-3 gap-2 bg-neutral-900">
      <Image
        className="h-52"
        resizeMode="contain"
        source={require('~/assets/globomantics-logo-bug-darkblue.png')}
      />
      <View className="w-full gap-2">
        <Text className="text-2xl font-bold text-center text-white">Sign In</Text>
      </View>
      <View className="w-full gap-2">
        <TextInput
          className="p-3 border-2 border-gray-600 bg-neutral-800 text-gray-300 w-full"
          placeholder="Email Address"
          placeholderTextColor="gray"
          value={state.email}
          inputMode="email"
          onChangeText={setEmail}
        />
        <TextInput
          className="p-3 border-2 border-gray-600 bg-neutral-800 text-gray-300 w-full"
          placeholder="Password"
          placeholderTextColor="gray"
          value={state.password}
          inputMode="text"
          secureTextEntry
          onChangeText={setPassword}
        />
        <Button
          onPress={async () => {
            const results = await signIn({
              credentials: {
                email: state.email,
                password: state.password,
              },
            }).unwrap();

            // store results
            dispatch(setCredentials(results.signIn));

            router.replace('(home)/sessions');
          }}>
          <Text className="text-white">Sign In</Text>
        </Button>
        <Button
          onPress={async () => {
            console.log('navigating to home');
            router.navigate('/home/');
          }}>
          <Text className="text-white">Navigate without Auth</Text>
        </Button>
      </View>
    </View>

  );
}
