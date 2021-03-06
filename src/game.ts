import chalk from 'chalk';
import { createStore } from 'redux';
import { formatPosition, getDirection } from './position';
import { getContents as getRoomContents } from './room';
import { promptInput } from './prompt';
import { movePlayer, enterRoom } from './actions';

import rootReducer, {
	isAlive,
	getHealth,
	getScore,
	getPosition,
} from './store';

const description = `
Game Of Life is a text adventure game requiring you to move through an endless
grid fighting monsters and collecting gold.

Game Of Life places you in a grid of rooms. Each room has 4 doors and the grid
has no boundaries (you can move around to infinity and beyond). You can move
North, South, East or West by typing a command at the console.

Some rooms have monsters in them. Other rooms have gold in them. The aim of the
game is to achieve a high score (before dying).
`;

const game = async (stdin: NodeJS.ReadStream, stdout: NodeJS.WriteStream) => {
	const store = createStore(rootReducer);

	stdout.write(chalk.bold('Game Of Life') + '\n');
	stdout.write(description + '\n');

	let state = store.getState();

	while (isAlive(state)) {
		const position = getPosition(state);
		const health = getHealth(state);
		const score = getScore(state);
		stdout.write(`Health: ${chalk.bold(String(health))}. Score: ${chalk.bold(String(score))}.\n`);
		stdout.write(`Position: ${chalk.bold(formatPosition(position))}.\n`);

		try {
			const question = '\nWhich direction would you like to go? (N/E/S/W) ';
			const input = await promptInput(question, stdin, stdout);
			const direction = getDirection(input);
			stdout.write('\n');
			store.dispatch(movePlayer(direction));
			state = store.getState();
		} catch (err) {
			stdout.write('\n' + chalk.red('Could not go that way.') + '\n\n');
			continue;
		}

		try {
			const position = getPosition(state);
			const contents = await getRoomContents(position);
			store.dispatch(enterRoom(contents));
			state = store.getState();
		} catch (err) {
			stdout.write(chalk.red('Something went wrong.') + '\n');
			stdout.write('Goodbye.\n\n');
			process.exit(1);
		}
	}

	const score = getScore(state);

	stdout.write('\n\n' + chalk.bold.red('You died') + '\n');
	stdout.write(`Final score: ${chalk.bold(String(score))}\n`);
};

export default game;
