import {Goal} from '../../abstraction';

export const stringifyGoal = (goal: Goal) => {
    const {verb, noun} = goal.achievement;
    const {description, location} = goal;
    const descriptionString = description ? `${description} ` : '';
    const locationString = location ? ` in ${location}` : '';
    return `I want to ${verb} ${descriptionString}${noun}${locationString}.`;
}
