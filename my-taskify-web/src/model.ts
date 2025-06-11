export interface Todo {
    id: number;
    todo: string;
    isDone: boolean;

    estimatedTime: number; // in seconds
    elapsedTime: number; 
    isRunning: boolean;

    flair: 'work' | 'school' | 'personal';

}

