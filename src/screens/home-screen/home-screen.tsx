import {Button, FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useContext, useLayoutEffect, useMemo, useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootParamStackList} from '../../abstraction';
import {iOSColors} from 'react-native-typography';
import {CreateGoalInfo} from './components';
import {GoalsContext} from '../../contexts';
import {stringifyGoal} from '../../utils';
import {GoalItem} from '../../components';
import _, {lowerCase} from 'lodash';

type Props = NativeStackNavigationProp<RootParamStackList>;

export const HomeScreen: React.FC = () => {
    const navigation = useNavigation<Props>();
    const {goals} = useContext(GoalsContext);
    const {colors} = useTheme();
    const [search, setSearch] = useState(undefined);

    const filteredGoals = useMemo(() => goals.filter(goal => _.includes(lowerCase(stringifyGoal(goal)), lowerCase(search))), [search]);

    const onCreate = useCallback(() => {
        navigation.navigate('CreateGoal');
    }, [navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerSearchBarOptions: {
                onChangeText: (event) => {
                    setSearch(event.nativeEvent.text);
                },
                onClose: () => setSearch(undefined),
            },
            headerLargeTitle: true,
            headerLargeStyle: {
                backgroundColor: colors.background,
            },
            headerLargeTitleShadowVisible: false,
            headerLeft: () => <Button title={'Edit'}/>,
            headerRight: () => (
                <Icon
                    name="create-outline"
                    color={iOSColors.blue}
                    size={22}
                    onPress={onCreate}/>
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView>
            <FlatList
                data={search ? filteredGoals : goals}
                style={{
                    paddingHorizontal: 15,
                    height: goals.length === 0 ? '40%' : null,
                }}
                ItemSeparatorComponent={() => (
                    <View style={{
                        height: 10,
                    }}/>
                )}
                renderItem={({item: goal, index}) => <GoalItem key={index} goal={goal}/>}/>
            {
                goals.length === 0 &&
                <Text style={styles.createGoalInfo}>
                    <CreateGoalInfo/>
                </Text>
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 15,
        height: '40%',
    },
    createGoalInfo: {
        textAlign: 'center'
    },
});
