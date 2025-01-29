import React from 'react';
import { View, StyleSheet } from 'react-native';
import { themes, sizes } from '@/constants/layout';
import { FooterButtonsProps } from '@/types';
import { ColumnButton, GradientColumnButton } from './ColumnButton';


interface GradientFooterButtonsProps extends Omit<FooterButtonsProps, 'buttonsColor'> {
  buttonGradient: string[];
}

export const FooterButtons = ({ buttonsConfig, buttonsColor, backgroundColor = themes.dark.card }: FooterButtonsProps) => {
  return (
    <View style={[styles.footer, {backgroundColor}]}>
      <View style={[styles.buttonsContainer]}>
        {buttonsConfig.map(
          (buttonConfig, index) =>
            buttonConfig.condition && (
              <ColumnButton 
                key={index}
                onPress={buttonConfig.onPress}
                styles = {{width: buttonConfig.width || 50, backgroundColor: buttonsColor}}
                icon={buttonConfig.icon}
                color={buttonConfig.iconColor}
                text={buttonConfig.text}
                fontSize={10}
              />
            )
        )}
      </View>
    </View>
  );
};

export const GradientFooterButtons = ({ buttonsConfig, buttonGradient, backgroundColor = themes.dark.card }: GradientFooterButtonsProps) => {
  return (
    <View style={[styles.footer, {backgroundColor}]}>
      <View style={[styles.buttonsContainer]}>
        {buttonsConfig.map(
          (buttonConfig, index) =>
            (buttonConfig.condition) && (
              <GradientColumnButton 
                key={index}
                onPress={buttonConfig.onPress}
                styles = {{width: buttonConfig.width || 50}}
                icon={buttonConfig.icon}
                gradientColor={buttonGradient}
                color={buttonConfig.iconColor}
                text={buttonConfig.text}
                fontSize={10}
                loading = {buttonConfig.loading}
              />
            )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    height:90,
    bottom: -10,
    left: sizes.layout.small,
    right: sizes.layout.small,
    justifyContent: 'center',
    borderRadius:sizes.layout.large,
    padding: sizes.layout.small,
    elevation: 5,
      shadowColor: themes.light.text,
      shadowOffset: {
        width: 5,
        height: 10,
      },
      shadowOpacity: 1,
      shadowRadius: sizes.layout.small,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
});

