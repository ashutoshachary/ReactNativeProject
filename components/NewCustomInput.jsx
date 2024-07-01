import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomInput = ({
  type = 'default',
  icon,
  placeholder = 'Enter to tap...',
  inputType,
  onChangeText,
  ...props
}) => {
  const [error, setError] = useState('');
  const [value, setValue] = useState('');

  const getContainerStyle = () => {
    switch (type) {
      case 'rounded':
        return styles.roundedContainer;
      case 'square':
        return styles.squareContainer;
      case 'elevation':
        return styles.elevatedContainer;
      case 'border':
        return styles.borderedContainer;
      default:
        return styles.defaultContainer;
    }
  };

  const validate = (text) => {
    if (inputType === 'username') {
      if (text.length < 4) {
        return 'Username must be at least 4 characters long';
      }
    } else if (inputType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(text)) {
        return 'Please enter a valid email address';
      }
    }
    return '';
  };

  const handleChangeText = (text) => {
    setValue(text);
    const validationError = validate(text);
    setError(validationError);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <View>
      <View style={[styles.baseContainer, getContainerStyle(), error && styles.errorContainer]}>
        {icon && <Icon name={icon} size={24} color="#000" style={styles.icon} />}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          value={value}
          {...props}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  defaultContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  roundedContainer: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  squareContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  elevatedContainer: {
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  borderedContainer: {
    borderWidth: 2,
    borderColor: '#000',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  errorContainer: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default CustomInput;