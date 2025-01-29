import { View } from 'react-native'
import React from 'react'
import { sizes } from '@/constants/layout'

interface SpacerProps {
  marginBottom?: number;
}

const Spacer = ({marginBottom= sizes.layout.medium,}: SpacerProps) => {
  return <View style={{marginBottom}}></View>;

}

export default Spacer;

