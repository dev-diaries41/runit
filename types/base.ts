import { TextStyle, DimensionValue, Falsy, TextInputProps, StyleProp, ViewStyle, TouchableOpacityProps } from "react-native";
import {WritingOptions, ReadingOptions} from 'expo-file-system';
import { ReactNode } from "react";
import { PickerProps } from "@react-native-picker/picker";
import { reauthAction } from "@/constants/globals";
import { LinkProps } from "expo-router";

export interface MenuItem {
  name: string;
  onPress: () => void;
  icon: string;
}

export interface BaseLinkButtonProps extends LinkProps {
  icon?: any;
  iconSize?: number
  color?: string;
  loading?: boolean;
  disabled?: boolean;
}

export interface BaseButtonProps extends TouchableOpacityProps {
    icon?: any;
    iconSize?: number
    color?: string;
    loading?: boolean;
    disabled?: boolean;
}

export interface ButtonProps extends BaseButtonProps {
  text?: string;
  fontSize?: number;
  style?:  StyleProp<ViewStyle>
}

export interface LinkButtonProps extends BaseLinkButtonProps {
  text?: string;
  fontSize?: number;
}

export interface GradientButtonProps extends Omit<ButtonProps, 'backgroundColor'> {
  gradientColor: string[];
}

export interface CustomPickerProps extends PickerProps<string> { 
  options: string [];
  borderRadius?: number;
  borderColor?: string;
  label?: string;
  color?: string;
}


export interface BottomSheetProps { 
    visible: boolean; 
    onClose: () => void;
    description?: string; 
    title: string;
    children?: ReactNode;
    color? : string;
    loading?: boolean;
    style?: StyleProp<ViewStyle>
}

export interface ButtonConfig {
  condition?: boolean;
  onPress: () => void | Promise<void>;
  icon: string;
  iconColor: string;
  width?: DimensionValue;
  text:string;
  loading?: boolean;
}

export interface FooterButtonsProps { 
  buttonsConfig: ButtonConfig[]; 
  buttonsColor: string;
  backgroundColor?: string; 
 }

 export interface IconButtonProps {
  onPress: (() => Promise<void> | void)
  onLongPress?:(() => Promise<void> | void)
  color?: string;
  icon:any;
  iconSize?: number;
  opacity?: number,
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}

export interface InfoCardProps { 
  title: string;
  description?: string;
  metadata?: string;
  icon: any, 
  metadataIcon?: any, 
  color?: string;
  iconColor?: string;
  backgroundColor?: string;
  borderColor?: string;
}

export interface InputFieldProps extends TextInputProps { 
  error?: boolean | Falsy
  placeholder: string; 
  errorText?: string; 
  label?: string;
  style?: StyleProp<TextStyle>
}

interface BaseSettingsCardProps {
  settingDescription?: string; 
  settingTitle: string; 
  isSwitch?: boolean;
  value?: boolean;
  disabled?: boolean;
}

export interface LinkSettingsCardProps extends BaseSettingsCardProps {
}

export interface SettingsCardProps extends BaseSettingsCardProps {
  onPress: () => Promise<void> | void; 
}


export interface TextButtonProps extends BaseButtonProps{
  text: string;
  iconColor?: string 
  fontSize?: number;
  margin?: number; 
  textAlign?: TextStyle['textAlign']; 
  fontFamily?: string;
  justifyContent?: 'flex-start' | 'flex-end' | 'center';
  reverse?: boolean;
}

export type Theme = 'dark' | 'light'


export interface TimerProps {
    duration: number;
    onFinished: () => void;
    message?: string;
    // visible: boolean;
};


export interface SearchProps {
    query: string;
    onSearch: (query: string) => void;
    onCancel: () => void;
    placeholder?: string;
    color?: string;
    style?: StyleProp<ViewStyle>
  }

export interface NavBarProps {
  navigation: any;
  minimize?: boolean;
  loading?: boolean;
  onUpload?: () => Promise<void> | void; // Making onUpload optional
}

export interface File {
  uri:string, 
  filename:string, 
  mimetype:string, 
  readingOptions?: ReadingOptions, 
  writingOptions?: WritingOptions
}

export interface NewFile extends Omit<File, 'uri' | 'readingOptions'>{
  content: string;
}

export interface LoaderProps {
  showLoader?: boolean
  size?: number;
  loaderDescription: string;
  loaderTitle?: string
  color?: string
  onMinimize: () => void;
  theme?: Theme;
}

export type ReauthAction = typeof reauthAction[number]
