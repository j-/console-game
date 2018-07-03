import { Direction } from './position';

import reducer, {
	DEFAULT_STATE,
	getHealth,
	getPosition,
	getScore,
	isAlive,
} from './store';

import {
	movePlayer,
	enterRoom,
} from './actions';

it('has a default position of (0,0)', () => {
	expect(getPosition(DEFAULT_STATE)).toEqual([0, 0]);
});

it('starts player with full health', () => {
	expect(getHealth(DEFAULT_STATE)).toBe(5);
});

it('starts player with a score of zero', () => {
	expect(getScore(DEFAULT_STATE)).toBe(0);
});

it('can move player', () => {
	const action = movePlayer(Direction.NORTH);
	const state = reducer(DEFAULT_STATE, action);
	expect(getPosition(state)).toEqual([0, 1]);
});

it('can enter gold room', () => {
	const action = enterRoom('GOLD');
	const state = reducer(DEFAULT_STATE, action);
	expect(getScore(state)).toBe(1);
});

it('can enter monster room', () => {
	const action = enterRoom('MONSTER');
	const state = reducer(DEFAULT_STATE, action);
	expect(getHealth(state)).toBe(4);
});

it('ignores other room types', () => {
	const action = enterRoom('x');
	const state = reducer(DEFAULT_STATE, action);
	expect(getScore(state)).toBe(0);
	expect(getHealth(state)).toBe(5);
});

it('keeps track of player\'s life', () => {
	const action = enterRoom('MONSTER');
	const health5 = DEFAULT_STATE;
	expect(isAlive(health5)).toBeTruthy();
	const health4 = reducer(health5, action);
	expect(isAlive(health4)).toBeTruthy();
	const health3 = reducer(health4, action);
	expect(isAlive(health3)).toBeTruthy();
	const health2 = reducer(health3, action);
	expect(isAlive(health2)).toBeTruthy();
	const health1 = reducer(health2, action);
	expect(isAlive(health1)).toBeTruthy();
	const health0 = reducer(health1, action);
	expect(isAlive(health0)).toBeFalsy();
});
