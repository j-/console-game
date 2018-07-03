import { Readable, Writable } from 'stream';
import { createInterface } from 'readline';

export const promptInput = async (question: string, input: Readable, output: Writable) => {
	const rl = createInterface({ input, output });
	return new Promise<string>((resolve) => {
		rl.question(question, (answer) => {
			resolve(answer);
			rl.close();
		});
	});
};
