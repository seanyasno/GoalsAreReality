import React, {useCallback, useContext, useLayoutEffect, useMemo, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Switch, Text, TextInput, View} from 'react-native';
import {iOSUIKit, iOSColors, systemWeights} from 'react-native-typography';
import {useNavigation, useTheme} from '@react-navigation/native';
import {GoalsContext} from '../../contexts';

export const CreateGoalScreen: React.FC = () => {
    const theme = useTheme();
    const [useLocation, setUseLocation] = useState(false);
    const [useDescription, setUseDescription] = useState(false);
    const navigation = useNavigation();
    const {addGoal} = useContext(GoalsContext);

    const [verb, setVerb] = useState<string>();
    const [noun, setNoun] = useState<string>();
    const [achievableDate, setAchievableDate] = useState<string>();
    const [location, setLocation] = useState<string>();
    const [description, setDescription] = useState<string>();

    const validatedForm = useMemo(() => verb && noun, [verb, noun]);

    const onDone = useCallback(() => {
        addGoal({
            achievement: {
                verb,
                noun,
            },
            location,
            description,
        });
        navigation.goBack();
    }, [navigation, verb, noun, location, description]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Button
                title="done"
                disabled={!validatedForm}
                onPress={onDone}/>,
        });
    }, [navigation, validatedForm]);

    return (
        <SafeAreaView style={{backgroundColor: theme.colors.background}}>
            <View style={{marginVertical: 15, marginHorizontal: 20}}>
                <View style={{
                    backgroundColor: iOSColors.white,
                    borderRadius: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                }}>
                    <Text style={[iOSUIKit.subhead, systemWeights.light, {marginBottom: 4}]}>Preview</Text>
                    <Text style={iOSUIKit.body}>
                        <Text>I want to </Text>
                        <Text>{verb} </Text>
                        {
                            verb && noun && useDescription && description &&
                            <Text>{description} </Text>
                        }
                        <Text>{noun}</Text>
                        {
                            verb && noun && useLocation && location &&
                            <Text> in {location}</Text>
                        }
                        {
                            verb && noun &&
                            <Text>.</Text>
                        }
                    </Text>
                </View>

                <View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <TextInput
                            placeholder="verb"
                            autoCapitalize="none"
                            onChangeText={setVerb}
                            clearButtonMode="while-editing"
                            style={{...styles.input, height: 30, marginRight: 0}}/>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <TextInput
                            placeholder="noun"
                            autoCapitalize="none"
                            onChangeText={setNoun}
                            clearButtonMode="while-editing"
                            style={{...styles.input, height: 30, marginRight: 0}}/>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <TextInput
                            placeholder="location"
                            onChangeText={setLocation}
                            clearButtonMode="while-editing"
                            style={styles.input}/>
                        <Switch value={useLocation} onValueChange={setUseLocation}/>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        <TextInput
                            placeholder="description"
                            autoCapitalize="none"
                            onChangeText={setDescription}
                            clearButtonMode="while-editing"
                            style={styles.input}/>
                        <Switch value={useDescription} onValueChange={setUseDescription}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: iOSColors.lightGray,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginRight: 10,
        flex: 1,
    },
});
