import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { sizes, themes } from '@/constants/layout';
import { useThemeColor } from './useThemeColor';

const useCustomAlert = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const color = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');


  const showAlert = (alertTitle: string, alertDescription: string) => {
    setTitle(alertTitle);
    setDescription(alertDescription);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setTitle('');
    setDescription('');
  };

  return {
    showAlert,
    CustomAlert: () => (
      <Modal visible={visible} animationType="none" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.wrapper}>
          <View style={[styles.modalContent, { backgroundColor }]}>
            <View style={styles.mainContent}>
            <View style={styles.headerContainer}>
              <Text style={[styles.modalTitle, {color}]}>{title}</Text>
            </View>
            <Text style={[styles.modalDescription, {color}]}>{description}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={[styles.closeButtonText, {color}]}>OK</Text>
            </TouchableOpacity>
            </View>
          </View>
          </View>
        </View>
      </Modal>
    ),
  };

};

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingHorizontal: sizes.layout.medium * 3,
    },
    wrapper:{
      borderRadius: sizes.layout.small,
      opacity:0.95,
      backgroundColor: themes.dark.primary,
      borderColor: 'rgba(0, 155, 119, 0.5)',
      shadowColor: '#009B77',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 5,
      borderWidth: 1, 

    },
    modalContent: {
      borderRadius: sizes.layout.small,
    },
    mainContent:{
      borderRadius: sizes.layout.small,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: sizes.layout.small,
    },
    modalTitle: {
      flex: 1,
      fontSize: sizes.font.medium,
      fontWeight: 'bold',
      marginLeft: sizes.layout.small,
      color: "black",
      textAlign: "center",
      paddingTop:sizes.layout.medSmall
    },
    modalDescription: {
      fontSize: sizes.font.small,
      marginBottom: sizes.layout.medium,
      color: "black",
      textAlign: "center",
      paddingHorizontal: sizes.layout.medium,
      paddingVertical:sizes.layout.medium
    },
    closeButton: {
      backgroundColor: 'transparent',
      paddingHorizontal: sizes.layout.medium,
      borderBottomStartRadius:sizes.layout.small,
      borderBottomEndRadius:sizes.layout.small,
      borderTopWidth:1,
      borderTopColor:"#222",
      alignSelf: 'center',
      width: '100%',
      marginTop: sizes.layout.medium,
      paddingVertical:sizes.layout.medium
  
    },
    closeButtonText: {
      fontSize: sizes.font.medium,
      color: '#000',
      textAlign: 'center'
    },
  });
  

export default useCustomAlert;
