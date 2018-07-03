import chalk from 'chalk';
import { createStore } from 'redux';
import { formatPosition } from './position';

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
		const health = getHealth(state);
		const score = getScore(state);
		const position = getPosition(state);
		stdout.write(`Health: ${chalk.bold(String(health))}. Score: ${chalk.bold(String(score))}.\n`);
		stdout.write(`Position: ${chalk.bold(formatPosition(position))}.\n`);
		stdout.write('\nWhich direction would you like to go? (N/E/S/W) ');

		break;
	}

	const score = getScore(state);

	stdout.write('\n\n' + chalk.bold.red('You died') + '\n');
	stdout.write(`Final score: ${chalk.bold(String(score))}\n`);
};

export default game;
