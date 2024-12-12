import { router } from 'expo-router';
import { useEffect, useReducer, useState } from 'react';
import { Image, Text, View, TextInput } from 'react-native';
import { Button } from '~/components/Button';
import { useSignUpMutation } from '~/rtk/service/generated';
import { setCredentials } from '~/rtk/slices/authSlice';
import { useAppDispatch } from '~/rtk/state/store';

type State = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

type Action =
  | { type: 'setEmail'; payload: string }
  | { type: 'setName'; payload: string }
  | { type: 'setRepeatPassword'; payload: string }
  | { type: 'setPassword'; payload: string };

const initialState: State = {
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setEmail':
      return { ...state, email: action.payload };
    case 'setName':
      return { ...state, name: action.payload };
    case 'setRepeatPassword':
      return { ...state, repeatPassword: action.payload };
    case 'setPassword':
      return { ...state, password: action.payload };
    default:
      return state;
  }
}

export function useForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setEmail = (email: string) => dispatch({ type: 'setEmail', payload: email });
  const setName = (name: string) => dispatch({ type: 'setName', payload: name });
  const setPassword = (password: string) => dispatch({ type: 'setPassword', payload: password });
  const setRepeatPassword = (repeatPassword: string) =>
    dispatch({ type: 'setRepeatPassword', payload: repeatPassword });

  return { state, setEmail, setPassword, setName, setRepeatPassword };
}

export default function SignUp() {
  const { state, setEmail, setPassword, setName, setRepeatPassword } = useForm();

  const dispatch = useAppDispatch();

  const [signUp] = useSignUpMutation();
  const [signUpObj,setSignUpObj]  = useState<any>(null)

  useEffect(() => {

  },[signUpObj])
  

  return (
    <View className="flex-1 justify-center items-center p-3 gap-2 bg-neutral-900">
      <Image
        className="h-52"
        resizeMode="contain"
        source={require('~/assets/globomantics-logo-bug-darkblue.png')}
      />
      <View className="w-full gap-2">
        <Text className="text-2xl font-bold text-center text-white">Sign Up</Text>
      </View>
      <View className="w-full gap-2">
        <TextInput
          className="p-3 border-2 border-gray-600 bg-neutral-800 text-gray-300 w-full"
          placeholder="Name"
          placeholderTextColor="gray"
          value={state.name}
          inputMode="text"
          onChangeText={setName}
        />
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
        <TextInput
          className="p-3 border-2 border-gray-600 bg-neutral-800 text-gray-300 w-full"
          placeholder="Repeat Password"
          placeholderTextColor="gray"
          value={state.repeatPassword}
          inputMode="text"
          secureTextEntry
          onChangeText={setRepeatPassword}
        />
        <Button
          onPress={async () => {
            const results = await signUp({
              credentials: {
                name: state.name,
                email: state.email,
                password: state.password,
              },
            }).unwrap();
            
            // store results
            try {
              dispatch(
                setCredentials(results.signUp)
              );
            } catch (error) {
              console.log(error);
            }

            console.log(results);

            router.replace('(home)/sessions');
          }}>
          <Text className="text-white">Sign Up</Text>
        </Button>
      </View>
    </View>

  );
}
