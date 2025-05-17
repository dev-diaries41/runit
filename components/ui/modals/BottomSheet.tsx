import React, {useRef, useLayoutEffect} from 'react';
import { View, Text, Modal, PanResponder, Animated, StyleSheet, Dimensions } from 'react-native';
import { themes, sizes } from '@/constants/layout';
import { BottomSheetProps } from '@/types';
import IconButton from '../buttons/IconButton';
import { useThemeColor } from '@/hooks/useThemeColor';

const {height} = Dimensions.get('screen')


const BottomSheet = ({ 
  visible, 
  onClose,
  title,
  children,
  color,
  style,
  ...otherProps
}: BottomSheetProps) => {
  const iconColor = useThemeColor({}, 'icon');
  const textColor = useThemeColor({}, 'text');
  const panY = useRef(new Animated.Value(0)).current; // Start the modal off-screen
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Check if the gesture is moving downward
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          onClose();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
            damping: 15,
            stiffness: 50, 
            velocity: 5,    
          }).start();
                  }
      },
    })
  ).current;

  useLayoutEffect(() => {
    if (visible) {
      // Animate the modal into place when it becomes visible
      Animated.spring(panY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 15,      
        stiffness: 100,   
        velocity: 5, 
      }).start();
          }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <Animated.View
        style={[styles.modalContainer, { transform: [{ translateY: panY }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.pullDownButton}>
          <View style={styles.pullDownNotch} />
        </View>

        <View style={[styles.modalContent, style]}>
          <View style={styles.header}>
            <Text style={[styles.title, {color: color || textColor}]} numberOfLines={2}>{title}</Text>
            <IconButton icon={"close-circle"} onPress={onClose} color={iconColor} opacity={0.5}/>
          </View>
          <View style={[styles.mainContent]}>
            {children}
          </View>
        </View>
        </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
      position: 'absolute',
      bottom:0,
      left:0,
      right:0,
      alignItems: 'center',
      maxHeight: height * 0.6,
      opacity:0.97,
      backdropFilter: 'blur(10px)', // blur the content behind the modal
      // backgroundColor: Colors.dark.primary,
      borderTopLeftRadius: sizes.layout.xLarge,
      borderTopRightRadius: sizes.layout.xLarge,
    },
    modalContent: {
      borderTopLeftRadius: sizes.layout.xLarge,
      borderTopRightRadius: sizes.layout.xLarge,
      padding: sizes.layout.medium,
      width: '100%',
      height:'100%',
      borderTopWidth: 1, 
      borderLeftWidth: 1, 
      borderRightWidth: 1, 
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 5,
    },
    mainContent:{
      borderRadius: sizes.layout.medium,
      marginBottom:sizes.layout.medium,
      paddingHorizontal:sizes.layout.small,
      gap: sizes.layout.small
    },
    title: {
      fontSize: sizes.font.large,
      color: themes.dark.text,
      textAlign: "left",
      fontWeight:'500',
    },
    header:{
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      marginBottom: sizes.layout.medium,
    },
    pullDownButton: {
      position: 'absolute',
      top: 0, 
      alignSelf: 'center',
      zIndex: 2, // Ensure it's above other elements
    },
    pullDownNotch: {
      width: 60,
      height: sizes.layout.small,
      backgroundColor: themes.placeholder,
      borderColor:themes.dark.background,
      borderWidth:2,
      borderBottomRightRadius: sizes.layout.small,
      borderBottomLeftRadius: sizes.layout.small,
    },  
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom:sizes.layout.small,
      borderRadius:sizes.layout.medium,
    },  
});

export default BottomSheet;
