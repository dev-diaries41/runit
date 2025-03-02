import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import { sizes, themes } from '@/constants/layout';
import { Theme } from '@/types';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/colors';

interface DialogueAlertProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (inputText: string) => void;
  title?: string;
  description?: string;
  backgroundColor?: string;
  isSecure?: boolean;
  placeholder?: string;
  theme?: Theme;
}

const DialogueAlert = React.memo(({ 
  visible, 
  onClose, 
  onConfirm, 
  title = "Alert", 
  description, 
  backgroundColor = themes.dark.card, 
  isSecure = false, 
  placeholder = "Enter text",
  theme = 'dark'
}: DialogueAlertProps) => {
  const [inputText, setInputText] = useState('');
  const [isCancelled, setIsCancelled] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const color = useThemeColor({}, 'text');
  const borderColor = Colors.common.border;

  
  const closeModal = () => {
    onClose();
    setInputText('');
  };

  const handleConfirm = () => {
    onConfirm(inputText);
    setInputText('');
    onClose();

  };
  const handleInputChange = (text: string) => {
    setInputText(text);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: backgroundColor }]}>
          <View style={styles.headerContainer}>
            <Text style={[styles.modalTitle, {color}]}>{title}</Text>
          </View>
  
          <Text style={[styles.modalDescription, {color}]}>{description}</Text>
          <TextInput
            style={[styles.input, {color, borderColor}]}
            onChangeText={handleInputChange}
            value={inputText}
            placeholder={placeholder}
            placeholderTextColor={themes.placeholder}
            autoFocus={true}
            secureTextEntry = {isSecure}    
            autoCapitalize='none'     
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.isCancelledButton,
                { backgroundColor: isCancelled ? themes.placeholder : 'transparent', borderRightColor: borderColor, borderTopColor: borderColor },
              ]}
              onPress={closeModal}
              onPressIn={() => setIsCancelled(true)}
              onPressOut={() => setIsCancelled(false)}
              activeOpacity={0.7}
            >
            <Text style={[styles.buttonText, {color}]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.isConfirmedButton,
                { backgroundColor: isConfirmed ? themes.placeholder : 'transparent', borderRightColor: borderColor, borderTopColor: borderColor },
              ]}
              onPress={handleConfirm}
              onPressIn={() => setIsConfirmed(true)}
              onPressOut={() => setIsConfirmed(false)}
              activeOpacity={0.7}
            >
              <Text style={[styles.buttonText, {color}]}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 48,
    paddingTop: sizes.layout.medium,
  },
  modalContent: {
    borderRadius: sizes.layout.medium,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizes.layout.small,
  },
  modalTitle: {
    flex: 1,
    fontSize: 14,
fontWeight:'500',    marginLeft: 8,
    textAlign: 'center',
    paddingTop:12
  },
  modalDescription: {
    fontSize: 12,
    marginBottom: sizes.layout.medium,
    textAlign: 'center',
    paddingHorizontal: sizes.layout.xSmall,
    
  },
  input: {
    borderRadius: sizes.layout.small,
    paddingHorizontal: sizes.layout.small,
    paddingVertical: sizes.layout.small,
    marginBottom: sizes.layout.xLarge,
    marginHorizontal: sizes.layout.medium,
    borderWidth: 1,
    
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  isConfirmedButton: {
    flex: 1,
    paddingVertical: sizes.layout.medium,
    paddingHorizontal: sizes.layout.medium,
    borderBottomEndRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth:1,
  },
  isCancelledButton: {
    flex: 1,
    paddingVertical: sizes.layout.medium,
    paddingHorizontal: sizes.layout.medium,
    borderBottomStartRadius: sizes.layout.small,
    borderBottomEndRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth:1,
    borderRightWidth: 1,
  },
  buttonText: {
    fontSize: 10,
fontWeight:'500',    textAlign: 'center',
  },
});



export default DialogueAlert;
