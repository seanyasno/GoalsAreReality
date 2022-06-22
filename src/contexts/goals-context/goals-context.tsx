import React, {createContext, PropsWithChildren, useCallback, useState} from 'react';
import {Goal} from '../../abstraction';

type ContextProps = {
    goals: Goal[];
    addGoal: (newGoal: Goal) => void;
}

export const GoalsContext = createContext<ContextProps>(undefined);

export const GoalsProvider: React.FC<PropsWithChildren> = (props) => {
    const [goals, setGoals] = useState<Goal[]>([
        {
            achievement: {
                verb: 'buy',
                noun: 'house'
            },
            location: 'Tel Aviv',
            description: '4 bedrooms'
        },
        {
            achievement: {
                verb: 'lose',
                noun: 'weight',
            },
        },
    ]);

    const addGoal = useCallback((newGoal: Goal) => {
        setGoals(currentGoals => currentGoals.concat(newGoal));
    }, []);

    return (
        <GoalsContext.Provider value={{
            goals,
            addGoal,
        }}>
            {props.children}
        </GoalsContext.Provider>
    );
};
