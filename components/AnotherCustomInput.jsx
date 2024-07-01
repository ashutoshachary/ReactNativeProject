import React, { useState } from 'react';
import { View, TextInput, Text,StyleSheet } from 'react-native';

const InputText = ({
  label='Email',
  name= 'Email',
  placeholder = "Enter to tap...",
  type = "email",
  fullWidth = true,
  disabled = false,
  showLabel = false,
  bordered = false,
  startContent,
  endContent,
  variant = 'rounded',
  min,
  max,
  pattern,
  required = false,
  
}) => {
  const [inputText, setInputText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const getValidationResult = (input) => {
    const validationObjs = [
        {isValid: min ? (min > 0 && input.length > min) : true, msg: `min length of the input should be ${min}`},
        {isValid: max ? (max > 0 && input.length > max) : true, msg: `min length of the input should be ${max}`},
        {isValid: required ? (input.length === ''): true, msg: `${name} is required`},
        {isValid: pattern ? !pattern.test(input) : true, msg: `Invalid Input: ${input}`},
    ]
    const isValid = validationObjs.every(obj => obj?.isValid);
    return {isValid, msg: !isValid ? (validationObjs.find(obj => !obj?.isValid))?.msg : ''}
  }

  
    const inputStyle = {
      ...((variant && variant === 'rounded') ? { borderRadius: 50, paddingHorizontal: 20 } : null),
      ...(startContent ? { paddingLeft: 50 } : null),
      ...(bordered ? { borderColor: "#000", borderWidth: 1 } : disabled ? { elevation: 3 } : null),
      ...(isFocused && !disabled ? { borderColor: '#0A79DF', borderWidth: 2 } : null),
      ...(endContent ? { paddingRight: 50 } : null),
      ...(disabled ? {backgroundColor: '#e0e0e0', elevation: 0, borderWidth: 0} : {backgroundColor: 'transparent'}),

    };

   

  const onChangeText = (inputText) => {
    const validationResult = getValidationResult(inputText);
    setInputText(inputText);
    validationResult && validationResult.msg && setErrorMsg(validationResult.msg);
    setIsValid(validationResult.isValid);
  };



  return (
    <View style={[styles.inputTextMainContainer, fullWidth ? {width: '100%'} : null]}>
      <View style={styles.inputTextContainer}>
        {showLabel ? <View style={styles.lableContainer}>
          <Text style={styles.label}>{label}</Text>
        </View> : null}

        <View style={styles.inputContainer}>
          {startContent ? <View style={styles.inputStartContent}> {startContent} </View> : null}
          <TextInput
            editable={!disabled}
            onFocus={()=>{
              setIsFocused(true)
            }}
            onBlur={()=>{
              setIsFocused(false)
            }}
            style={[styles.input, inputStyle]}
            placeholder={placeholder}
            value={inputText}
            secureTextEntry={type && type === 'password'}
            onChangeText={onChangeText}

            />
            {endContent? <View style={styles.inputEndContent}> {endContent} </View> : null}


        </View>
        <View style={styles.errorTextContainer}>
          {!isValid && (<Text style={styles.errorText}>{errorMsg}</Text>)}
        </View>

      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  inputTextMainContainer: {
    minHeight: 80,
    zIndex:2,
  },
  inputTextContainer: {
    marginTop:1,
  },
  input:{
    height: 54,
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius:5,
  },
  inputStartContent: {
    position: 'absolute',
    height: '100%',
    zIndex:5,
    justifyContent: 'center',
    marginLeft:20,
  },
  inputEndContent: {
    position: 'absolute',
    height: '100%',
    zIndex:5,
    justifyContent: 'center',
    right:0,
    marginRight:20,
  },
  lableContainer: {
    marginHorizontal: 10,
  },
  inputContainer: {
    marginHorizontal: 10,
  },
  label: {
    marginBottom: 3,
    fontSize: 15,
    fontWeight: '500',
  },
  invalidInput: {
    borderColor:'red',
    
  },
  errorTextContainer: {
    paddingVertical: 1,
    paddingHorizontal: 15,
  },
  errorText:{
    color:'red',

    fontWeight: '300',
  }
});

export default InputText;