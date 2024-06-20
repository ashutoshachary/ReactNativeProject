import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, btnKind, variant, size }) => {
    const btnStyles = [
        styles.button,
        btnKind === 'rounded' && styles.rounded,
        btnKind === 'outlined' && styles.outlined,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        size === 'sm' && styles.sm,
        size === 'md' && styles.md,
        size === 'lg' && styles.lg,
    ];

    const textStyles = [
        styles.text,
        variant === 'primary' && styles.textPrimary,
        variant === 'secondary' && styles.textSecondary,
        btnKind === 'outlined' && variant === 'primary' && styles.textOutlinedPrimary,
        btnKind === 'outlined' && variant === 'secondary' && styles.textOutlinedSecondary,
    ];

    return (
        <TouchableOpacity style={btnStyles} onPress={onPress}>
            <Text style={textStyles}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    rounded: {
        borderRadius: 25,
    },
    outlined: {
        borderWidth: 1,
    },
    primary: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
    },
    secondary: {
        backgroundColor: '#6c757d',
        borderColor: '#6c757d',
    },
    sm: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    md: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    lg: {
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    text: {
        fontSize: 16,
    },
    textPrimary: {
        color: '#000',
    },
    textSecondary: {
        color: '#000',
    },
    textOutlinedPrimary: {
        color: '#000',
    },
    textOutlinedSecondary: {
        color: '#000',
    },
});

export default CustomButton;
