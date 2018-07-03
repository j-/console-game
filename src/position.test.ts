import {
	Direction,
	getDirection,
	updatePosition,
	formatPosition,
} from './position';

describe('getDirection()', () => {
	it('can get North, East, South, West', () => {
		expect(getDirection('North')).toBe(Direction.NORTH);
		expect(getDirection('East')).toBe(Direction.EAST);
		expect(getDirection('South')).toBe(Direction.SOUTH);
		expect(getDirection('West')).toBe(Direction.WEST);
	});

	it('is case insensitive', () => {
		expect(getDirection('NORTH')).toBe(Direction.NORTH);
		expect(getDirection('east')).toBe(Direction.EAST);
		expect(getDirection('SoutH')).toBe(Direction.SOUTH);
		expect(getDirection('wEST')).toBe(Direction.WEST);
	});

	it('ignores whitespace', () => {
		expect(getDirection(' north')).toBe(Direction.NORTH);
		expect(getDirection('east  ')).toBe(Direction.EAST);
		expect(getDirection('\tsouth')).toBe(Direction.SOUTH);
		expect(getDirection('west\r\n')).toBe(Direction.WEST);
	});

	it('does not require the whole word', () => {
		expect(getDirection('Nort')).toBe(Direction.NORTH);
		expect(getDirection('Eas')).toBe(Direction.EAST);
		expect(getDirection('So')).toBe(Direction.SOUTH);
		expect(getDirection('W')).toBe(Direction.WEST);
	});

	it('throws if input was unexpected', () => {
		expect(() => {
			getDirection('foobar');
		}).toThrow('Expected direction, got "foobar"');
	});
});

describe('updatePosition()', () => {
	it('can go north', () => {
		expect(updatePosition([0, 0], Direction.NORTH)).toEqual([0, 1]);
		expect(updatePosition([10, 20], Direction.NORTH)).toEqual([10, 21]);
	});

	it('can go east', () => {
		expect(updatePosition([0, 0], Direction.EAST)).toEqual([1, 0]);
		expect(updatePosition([10, 20], Direction.EAST)).toEqual([11, 20]);
	});

	it('can go south', () => {
		expect(updatePosition([0, 0], Direction.SOUTH)).toEqual([0, -1]);
		expect(updatePosition([10, 20], Direction.SOUTH)).toEqual([10, 19]);
	});

	it('can go west', () => {
		expect(updatePosition([0, 0], Direction.WEST)).toEqual([-1, 0]);
		expect(updatePosition([10, 20], Direction.WEST)).toEqual([9, 20]);
	});
});

describe('formatPosition()', () => {
	it('prefers N and E', () => {
		expect(formatPosition([0, 0])).toBe('0N 0E');
		expect(formatPosition([9, 0])).toBe('0N 9E');
		expect(formatPosition([0, 15])).toBe('15N 0E');
	});

	it('formats S correctly', () => {
		expect(formatPosition([0, -10])).toBe('10S 0E');
	});

	it('formats W correctly', () => {
		expect(formatPosition([-10, 0])).toBe('0N 10W');
	});
});
