import React, { forwardRef } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { themes, sizes } from '@/constants/layout';
import { InputFieldProps } from '@/types';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ui/common/ThemedText';

const InputField = React.memo(
  forwardRef<TextInput, InputFieldProps>(({
    value,
    onChangeText,
    error,
    errorText,
    label,
    style,
    ...rest
  }, ref) => {
    const color = useThemeColor({}, 'text');

    return (
      <View style={{ flex: 1, width: "100%" }}>
        {error && errorText && <Text style={styles.errorText}>{errorText}</Text>}
        {label && <ThemedText style={styles.label}>{label}</ThemedText>}
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          style={[
            styles.input,
            error && styles.inputError,
            style,
            { color },
          ]}
          placeholderTextColor={themes.placeholder}
          textAlignVertical="top"
          {...rest}
        />
      </View>
    );
  })
);

// Styles
const styles = StyleSheet.create({
  input: {
    padding: sizes.layout.small,
    borderRadius: sizes.layout.small,
    marginBottom: sizes.layout.xSmall,
    color: themes.light.text,
    maxWidth: '100%',
    minHeight: 40,
    borderColor: Colors.common.border,
    borderWidth: 1,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: sizes.font.small,
    marginTop: sizes.layout.xSmall,
  },
  label: {
    fontSize: sizes.font.small,
    marginBottom: sizes.layout.xSmall,
  },
});

export default InputField;
