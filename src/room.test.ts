import fetch from 'jest-fetch-mock';
import { getContents } from './room';

describe('get room contents', () => {
	beforeEach(() => {
		fetch.resetMocks();
	});

	it('takes room position and returns async contents', async () => {
		fetch.mockResponseOnce('GOLD');
		fetch.mockResponseOnce('MONSTER');
		expect(getContents([0, 0])).resolves.toBe('GOLD');
		expect(getContents([6, -12])).resolves.toBe('MONSTER');
		expect(fetch.mock.calls.length).toEqual(2);
		expect(fetch.mock.calls[0][0]).toEqual('http://localhost:8080/room/0/0');
		expect(fetch.mock.calls[1][0]).toEqual('http://localhost:8080/room/6/-12');
	});
});
