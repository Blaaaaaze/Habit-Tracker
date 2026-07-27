import type { RootState } from "../../store";

export const getHabits = (state: RootState) => state.tasks.habits;