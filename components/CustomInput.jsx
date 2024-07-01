import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as DocumentPicker from 'expo-document-picker';

// Basic Custom Text Input with Validation
export const BasicCustomTextInput = () => {
  const [text, setText] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateInput = (value) => {
    setText(value);
    setIsValid(value.trim().length > 0);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, !isValid && styles.invalidInput]}
        placeholder="Enter text"
        value={text}
        onChangeText={validateInput}
      />
      {!isValid && <Text style={styles.errorText}>This field cannot be empty</Text>}
    </View>
  );
};

// Password Input Field with Validation
export const PasswordInputField = () => {
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validatePassword = (value) => {
    setPassword(value);
    setIsValid(value.length >= 6);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, !isValid && styles.invalidInput]}
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={validatePassword}
      />
      {!isValid && <Text style={styles.errorText}>Password must be at least 6 characters long</Text>}
    </View>
  );
};

// Custom Input Field with Icon
export const InputFieldWithIcon = () => {
  const [text, setText] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateInput = (value) => {
    setText(value);
    setIsValid(value.trim().length > 0);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, !isValid && styles.invalidInput]}>
        <Icon name="user" size={20} color="#000" style={styles.icon} />
        <TextInput
          style={styles.inputWithIcon}
          placeholder="Username"
          value={text}
          onChangeText={validateInput}
        />
      </View>
      {!isValid && <Text style={styles.errorText}>This field cannot be empty</Text>}
    </View>
  );
};

// Custom Input Field with Label and Email Validation
export const InputFieldWithLabel = () => {
  const [text, setText] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (value) => {
    setText(value);
    setIsValid(/\S+@\S+\.\S+/.test(value));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, !isValid && styles.invalidInput]}
        placeholder="Enter your email"
        value={text}
        onChangeText={validateEmail}
      />
      {!isValid && <Text style={styles.errorText}>Enter a valid email address</Text>}
    </View>
  );
};

// Custom Input Field with Floating Label
export const FloatingLabelInputField = () => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (value) => {
    setText(value);
    setIsValid(/\S+@\S+\.\S+/.test(value));
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, !isValid && styles.invalidInput]}>
        <Text style={[styles.label, (isFocused || text) && styles.labelFocused]}>
          Email
        </Text>
        <TextInput
          style={styles.inputWithIcon}
          placeholder="Enter your email"
          value={text}
          onChangeText={validateEmail}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      {!isValid && <Text style={styles.errorText}>Enter a valid email address</Text>}
    </View>
  );
};

// Custom Input Field with Validation
export const InputFieldWithValidation = () => {
  const [text, setText] = useState('');
  const [isValid, setIsValid] = useState(true);

  const validateInput = (value) => {
    setText(value);
    setIsValid(value.length > 3);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, !isValid && styles.invalidInput]}
        placeholder="Enter your username"
        value={text}
        onChangeText={validateInput}
      />
      {!isValid && <Text style={styles.errorText}>Username must be at least 4 characters long</Text>}
    </View>
  );
};

// Custom File Picker
export const FilePicker = () => {
  const [file, setFile] = useState(null);

  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      setFile(result);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Choose File" onPress={pickFile} />
      {file && <Text style={styles.fileName}>{file.name}</Text>}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    width: '80%',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  inputWithIcon: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  icon: {
    marginRight: 10,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 5,
    fontSize: 16,
    color: '#000',
  },
  labelFocused: {
    position: 'absolute',
    top: -20,
    left: 10,
    fontSize: 12,
    color: '#000',
  },
  invalidInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  fileName: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default {
  BasicCustomTextInput,
  PasswordInputField,
  InputFieldWithIcon,
  InputFieldWithLabel,
  FloatingLabelInputField,
  InputFieldWithValidation,
  FilePicker,
};
