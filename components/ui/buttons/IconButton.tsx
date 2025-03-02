import {TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { IconButtonProps } from '@/types';

const IconButton = ({ 
  color, 
  icon, 
  iconSize = 24, 
  disabled,
  style,
  ...rest
}:IconButtonProps) => {
    return (
      <TouchableOpacity disabled={disabled} style = {[{opacity: disabled? 0.5 : 1}, style]} {...rest}>
        <Ionicons name={icon} size={iconSize} color={color} />
      </TouchableOpacity>
    );
  };


  export default IconButton;