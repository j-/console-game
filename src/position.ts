/** Cardinal direction.  */
export enum Direction {
	NORTH = 'North',
	EAST = 'East',
	SOUTH = 'South',
	WEST = 'West',
}

/** X/Y coordinates. */
export interface Position extends Array<number> {
	0: number;
	1: number;
	length: 2;
}

/**
 * Takes an input string and converts it into a member of the `Direction` enum.
 *
 * @param direction Input string representing a direction
 * @return Cardinal direction
 */
export const getDirection = (direction: string): Direction => {
	switch (direction.trim().charAt(0).toUpperCase()) {
		case 'N': return Direction.NORTH;
		case 'E': return Direction.EAST;
		case 'S': return Direction.SOUTH;
		case 'W': return Direction.WEST;
		default: throw new TypeError(`Expected direction, got "${direction}"`);
	}
};

/**
 * When given the current position and the direction to travel in, returns the
 * co-ordinates of the new position.
 *
 * @param position Current position co-ordinates
 * @param direction A cardinal direction to travel from this position
 * @return New position co-ordinates
 */
export const updatePosition = (position: Position, direction: Direction): Position => {
	switch (direction) {
		case Direction.NORTH: return [position[0], position[1] + 1];
		case Direction.EAST:  return [position[0] + 1, position[1]];
		case Direction.SOUTH: return [position[0], position[1] - 1];
		case Direction.WEST:  return [position[0] - 1, position[1]];
	}
};

/**
 * Formats X/Y co-ordinates in a friendly way. Uses N/S and E/W instead of
 * positive and negative values of N and E.
 *
 * @param position Position co-ordinates
 * @return Human readable position
 */
export const formatPosition = (position: Position) => {
	const [x, y] = position;
	const absX = Math.abs(x);
	const absY = Math.abs(y);
	const dirX = x < 0 ? 'W' : 'E';
	const dirY = y < 0 ? 'S' : 'N';
	return `${absY}${dirY} ${absX}${dirX}`;
};
