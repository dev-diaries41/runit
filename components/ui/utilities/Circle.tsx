import { View, StyleSheet } from "react-native";
import { themes } from "@/constants/layout";

const Circle = ({ filled }: any) => {
    return <View style={[styles.circle, filled && styles.filledCircle]} />;
  };

const styles = StyleSheet.create({
    circle: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        borderWidth: 1,
        marginHorizontal: 10,
    },
    filledCircle: {
        backgroundColor: themes.dark.primary,
        borderColor: themes.dark.primary,
    },
});

export default Circle;