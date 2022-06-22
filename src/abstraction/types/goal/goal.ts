import {Achievement} from '../achievement/achievement';

export type Goal = {
    achievement: Achievement;
    achievableDate?: string;
    location?: string;
    description?: string;
    subGoals?: Goal[];
}
