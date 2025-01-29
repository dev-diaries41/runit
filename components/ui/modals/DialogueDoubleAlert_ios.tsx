import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import { sizes, themes } from '@/constants/layout';
import Spacer from '../utilities/Spacer';


interface DialogueDoubleAlertProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (inputText1: string, inputText2: string) => void;
  title?: string;
  description?: string;
  backgroundColor?: string;
  isSecure?: boolean;
  placeholder?: string;
  placeholder2?: string;
}

const DialogueDoubleAlert = ({
  visible,
  onClose,
  onConfirm,
  title = "Alert",
  backgroundColor = themes.dark.card,
  isSecure = false,
  placeholder =  'Enter Tag Name',
  placeholder2 = 'Enter Tag Id'
}: DialogueDoubleAlertProps) => {
  const [inputText1, setInputText1] = useState('');
  const [inputText2, setInputText2] = useState('');
  const [isCancel, setIsCancel] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const closeModal = () => {
    onClose();
    setInputText1('');
    setInputText2('');

  };

  const handleConfirm = () => {
    onConfirm(inputText1, inputText2);
    setInputText1('');
    setInputText2('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: backgroundColor }]}>
          <View style={styles.headerContainer}>
            {/* Logo */}
            <Text style={styles.modalTitle}>{title}</Text>
          </View>
          <Spacer/>
          <TextInput
            style={styles.input}
            onChangeText={setInputText1}
            value={inputText1}
            placeholder={placeholder}
            placeholderTextColor="gray"
            autoFocus={true}
            secureTextEntry = {isSecure}   
            autoCapitalize='none'     
      
            />
          <TextInput
            style={styles.input}
            onChangeText={setInputText2}
            value={inputText2}
            placeholder={placeholder2}
            placeholderTextColor="gray"
            secureTextEntry = {isSecure}     
            autoCapitalize='none'     
    
            />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.isCancelButton,
                styles.leftButton,
                { backgroundColor: isCancel ? themes.placeholder : 'transparent' },
              ]}
              onPress={closeModal}
              onPressIn={() => setIsCancel(true)}
              onPressOut={() => setIsCancel(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.isConfirmButton,
                { backgroundColor: isConfirm ? themes.placeholder : 'transparent' },
              ]}
              onPress={handleConfirm}
              onPressIn={() => setIsConfirm(true)}
              onPressOut={() => setIsConfirm(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding:32
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius:sizes.layout.medium
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight:'500',    
    marginLeft: 8,
    color: themes.dark.text,
    textAlign: 'center',
    paddingTop:sizes.layout.medSmall

  },
  input: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 24,
    backgroundColor:themes.dark.background,
    color:themes.dark.text,
    marginHorizontal:16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  isCancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth:1,
    borderTopColor: themes.dark.background,

  },
  isConfirmButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomStartRadius: 1,
    borderBottomEndRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth:1,
    borderTopColor: themes.dark.background,
  },
  leftButton: {
    borderRightWidth: 1,
    borderTopColor: themes.dark.background,
  },
  
  buttonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'silver',
    textAlign: 'center',
  },
});



export default DialogueDoubleAlert;
