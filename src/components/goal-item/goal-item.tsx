import {iOSColors} from 'react-native-typography';
import {StyleSheet, Text, View} from 'react-native';
import {stringifyGoal} from '../../utils';
import {Goal} from '../../abstraction';
import React from 'react';

type Props = {
    goal: Goal;
}

export const GoalItem: React.FC<Props> = (props) => {
    const {goal} = props;

    return (
        <View
            style={styles.goalContainer}>
            <Text>{stringifyGoal(goal)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    goalContainer: {
        backgroundColor: iOSColors.white,
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
});
