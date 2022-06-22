import {DarkTheme, DefaultTheme, NavigationContainer, useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CreateGoalScreen, HomeScreen} from '../../screens';
import {useColorScheme} from 'react-native';
import React, {useMemo} from 'react';
import {GoalsProvider} from '../../contexts';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
    const colorScheme = useColorScheme();
    const theme = useMemo(() => colorScheme === 'light' ? DefaultTheme : DarkTheme, [colorScheme]);
    const colors = useTheme().colors;

    return (
        <NavigationContainer theme={theme}>
            <GoalsProvider>
                <Stack.Navigator initialRouteName="Home" screenOptions={{
                    headerShown: true,
                }}>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}/>
                    <Stack.Screen
                        name="CreateGoal"
                        component={CreateGoalScreen}
                        options={{
                            title: 'Create Goal',
                            headerStyle: {
                                backgroundColor: colors.background,
                            },
                            headerShadowVisible: false,
                        }}/>
                </Stack.Navigator>
            </GoalsProvider>
        </NavigationContainer>
    );
};

export default App;
