import {iOSColors, iOSUIKit} from 'react-native-typography';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet, Text} from 'react-native';
import React from 'react';

export const CreateGoalInfo: React.FC = () => {
    return (
        <Text style={[iOSUIKit.body, styles.createText]}>Click on <Icon name="create-outline" size={16}/> to create new goal.</Text>
    );
}

const styles = StyleSheet.create({
    createText: {
        color: iOSColors.gray,
    },
});
