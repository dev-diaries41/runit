import React from 'react';
import { StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { sizes, themes } from '@/constants/layout';

interface MarkedDownViewProps {
    content: string,
    fontSize?: number;
    color?: string;
    backgroundColor?: string;
}

const MarkedDownView = React.memo(({
    content,
    fontSize = sizes.font.large,
    color,
    backgroundColor,
}: MarkedDownViewProps) => {
  return (

        <Markdown
            style={{
            body: {flex:1, color: color, fontSize: fontSize},
            heading1: {color: color, fontSize: fontSize * 2, fontWeight: 'bold', marginBottom: 16},
            heading2: {color: color, fontSize: fontSize * 1.5, fontWeight: 'semibold', marginVertical: 4},
            heading3: {color: color, fontSize: fontSize * 1.25, fontWeight: 'semibold', marginVertical: 4},
            blockquote: {color, fontSize, backgroundColor: backgroundColor},
            code_block: {color, fontSize, backgroundColor: backgroundColor},
            table: {color, fontSize, borderColor: themes.light.icon, borderWidth: 2},
            tbody: {color, fontSize, borderColor: color, backgroundColor},
            }}
            >
            {content}
          </Markdown>
  );
});


const styles = StyleSheet.create({
  
  });
export default MarkedDownView;