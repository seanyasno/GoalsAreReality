import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, FlatList, SafeAreaView, Text, View} from 'react-native';
import React, {useCallback, useContext, useLayoutEffect} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootParamStackList} from '../../abstraction';
import {iOSColors} from 'react-native-typography';
import {GoalsContext} from '../../contexts';

type Props = NativeStackNavigationProp<RootParamStackList>;

export const HomeScreen: React.FC = () => {
    const navigation = useNavigation<Props>();
    const {goals} = useContext(GoalsContext);
    const {colors} = useTheme();

    const onCreate = useCallback(() => {
        navigation.navigate('CreateGoal');
    }, [navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
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
            <FlatList data={goals} renderItem={({item: goal, index}) => (
                <View key={index}>
                    <Text>{goal.achievement.verb}</Text>
                </View>
            )}/>
        </SafeAreaView>
    );
};
