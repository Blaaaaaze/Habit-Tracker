export type HabbitStatus = 'progress' | 'completed' | 'canceled';

export type Habbit = {
    id: string
    title: string,
    goal: number,
    score: number,
    status: HabbitStatus,
    updated_at: string,
}

