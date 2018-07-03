import { Action } from 'redux';
import { Direction } from './position';

export interface ActionMovePlayer extends Action {
	type: 'MovePlayer';
	data: {
		direction: Direction;
	};
}

export const isActionMovePlayer = (action: Action): action is ActionMovePlayer => (
	action.type === 'MovePlayer'
);

export const movePlayer = (direction: Direction): ActionMovePlayer => ({
	type: 'MovePlayer',
	data: {
		direction,
	},
});

export interface ActionEnterRoom extends Action {
	type: 'EnterRoom';
	data: {
		contains: string;
	};
}

export const isActionEnterRoom = (action: Action): action is ActionEnterRoom => (
	action.type === 'EnterRoom'
);

export const enterRoom = (contains: string): ActionEnterRoom => ({
	type: 'EnterRoom',
	data: {
		contains,
	},
});
