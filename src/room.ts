import { API_HOST } from './config';
import { Position } from './position';

export const getContents = async ([ x, y ]: Position): Promise<string> => {
	const endpoint = `room/${x}/${y}`;
	const url = API_HOST + endpoint;
	const res = await fetch(url);
	const contents = await res.text();
	return contents;
};
