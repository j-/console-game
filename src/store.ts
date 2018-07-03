import { Reducer } from 'redux';
import { Position, updatePosition } from './position';
import { isActionMovePlayer, isActionEnterRoom } from './actions';

export interface ReducerState {
	position: Position;
	health: number;
	score: number;
}

export const DEFAULT_STATE: ReducerState = {
	position: [0, 0],
	health: 5,
	score: 0,
};

const reducer: Reducer<ReducerState> = (state = DEFAULT_STATE, action) => {
	if (isActionMovePlayer(action)) {
		const { position } = state;
		const { direction } = action.data;
		return {
			...state,
			position: updatePosition(position, direction),
		};
	}

	if (isActionEnterRoom(action)) {
		const { health, score } = state;
		const { contains } = action.data;
		if (contains === 'MONSTER') {
			return {
				...state,
				health: health - 1,
			};
		} else if (contains === 'GOLD') {
			return {
				...state,
				score: score + 1,
			};
		}
	}

	return state;
};

export default reducer;

export const getPosition = (state: ReducerState): Position => (
	state.position
);

export const getHealth = (state: ReducerState): number => (
	state.health
);

export const isAlive = (state: ReducerState): boolean => (
	state.health > 0
);

export const getScore = (state: ReducerState): number => (
	state.score
);
