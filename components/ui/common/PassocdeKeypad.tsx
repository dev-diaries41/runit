import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { themes } from '@/constants/layout';


const PasscodeKeypad = ({ onNumberPress, onSubmitPassword }: any) => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
      <View style={styles.keypad}>
        {numbers.map((number) => (
          
          <TouchableOpacity
            key={number}
            style={styles.keypadButton}
            onPress={() => onNumberPress(number)}
          >
            <View style = {styles.circleContainer}>
            <Text style={styles.keypadButtonText}>{number}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.keypadButton, {backgroundColor:themes.dark.primary}, {borderColor:"transparent"}]}
          onPress={() => onNumberPress('clear')}
        >
            <View style = {styles.circleContainer}>
            <Ionicons name="backspace" size={28} color={themes.dark.icon}/>
            </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.keypadButton}
          onPress={() => onNumberPress('0')}
        >
            <View style = {styles.circleContainer}>
            <Text style={styles.keypadButtonText}>0</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.keypadButton, {backgroundColor:themes.dark.primary}, {borderColor:"transparent"}]}
          onPress={onSubmitPassword}
        >
            <View style = {styles.circleContainer}>
            <Ionicons name="enter" size={28} color={themes.dark.icon}/>
            </View>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({

  keypad: {
    width: '70%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  keypadButton: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: themes.dark.text,
    backgroundColor: themes.dark.card,
    borderRadius: 50,
    marginBottom: 10,
    opacity:1
  },
  keypadButtonCenter: {
    alignSelf: 'flex-start', // Align the center button to the start (left) of its container
  },
  keypadButtonText: {
    fontSize: 28,
    color: themes.dark.text,
  },
  circleContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});

export default PasscodeKeypad;
