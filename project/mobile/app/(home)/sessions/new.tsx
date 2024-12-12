import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Picker } from '@react-native-picker/picker';
import { Button } from '~/components/Button';
// import { useCreateSessionMutation } from '~/rtk/service/generated';
import { router } from 'expo-router';

const formatOptions = ['Lecture', 'Workshop', 'Keynote'] as const;
const levelOptions = ['Beginner', 'Intermediate', 'Advanced'] as const;

const schema = z.object({
  title: z.string().min(1, 'Session title is required.'),
  description: z.string().min(1, 'Session description is required.'),
  format: z.enum(formatOptions, {
    required_error: 'Session format is required.',
  }),
  level: z.enum(levelOptions, {
    required_error: 'Experience level is required.',
  }),
});

type FormInputs = z.infer<typeof schema>;


export default function CreateNewSession() {

  const { control, handleSubmit } = useForm<FormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      format: '' as FormInputs['format'],
      level: '' as FormInputs['level'],
    },
  }); 
  
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log('values', data);
  };

  const onError: SubmitErrorHandler<FormInputs> = (error) => {
    console.log('error', error);
  };  

  return (
    <View className="flex flex-1 flex-column p-2 bg-neutral-900 gap-3">
      <View>
        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => (
            <View className="gap-1">
              <Text className="text-neutral-100">Title</Text>
              <TextInput
                className="p-3 border-2 border-neutral-700 bg-neutral-800 text-neutral-200 w-full"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
              {invalid ? <Text className="text-red-500 py-2">{error?.message}</Text> : null}
            </View>
          )}
        />
      </View>
  
      <View>
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => (
            <View className="gap-1">
              <Text className="text-neutral-100">Description</Text>
              <TextInput
                multiline
                numberOfLines={5}
                className="p-3 border-2 border-neutral-700 bg-neutral-800 text-neutral-200 w-full h-32"
                placeholder="Description"
                placeholderTextColor="gray"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
              {invalid ? <Text className="text-red-500 py-2">{error?.message}</Text> : null}
            </View>
          )}
        />
      </View>
  
      <View>
        <Controller
          name="format"
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { invalid, error } }) => {
            return (
              <View className="gap-1">
                <Text className="text-neutral-100">Session Format</Text>
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)}
                  onBlur={onBlur}
                  style={{
                    backgroundColor: '#1f2937',
                    color: '#e5e7eb',
                    borderColor: '#374151',
                    borderWidth: 1,
                  }}
                >
                  {formatOptions.map((item) => (
                    <Picker.Item key={item} label={item} value={item} />
                  ))}
                </Picker>
                {invalid ? <Text className="text-red-500 py-2">{error?.message}</Text> : null}
              </View>
            );
          }}
        />
      </View>
  
      <View>
        <Controller
          name="level"
          control={control}
          render={({ field: { onChange, value }, fieldState: { invalid, error } }) => {
            return (
              <View className="gap-1">
                <Text className="text-neutral-100">Experience Level</Text>
                <View className="pl-2">
                  {levelOptions.map((item) => (
                    <View key={item} className="flex flex-row items-center">
                      <TouchableOpacity
                        className={`flex size-6 rounded-xl border-2 border-neutral-700 bg-neutral-800 items-center justify-center`}
                        onPress={() => {
                          onChange(item);
                        }}
                      >
                        <View
                          className={`size-4 rounded-lg ${
                            value === item ? 'bg-primary-400' : 'bg-neutral-700'
                          }`}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="p-3"
                        onPress={() => {
                          onChange(item);
                        }}
                      >
                        <Text className="text-neutral-200">{item}</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
  
                  {invalid ? <Text className="text-red-500 py-2">{error?.message}</Text> : null}
                </View>
              </View>
            );
          }}
        />
      </View>
  
      <Button
        className="bg-primary-600 text-neutral-100"
        onPress={handleSubmit(onSubmit, onError)}
      >
        Submit
      </Button>
    </View>
  );
  
}