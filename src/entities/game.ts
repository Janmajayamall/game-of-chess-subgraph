import { Game } from "./../../generated/schema";
import { GocRouter as GocRouterContract } from "./../../generated/Goc/GocRouter";
import { GOC_ROUTER_ADDRESS } from "./../helpers";
import { Address, BigInt } from "@graphprotocol/graph-ts";

export function loadGame(gameId: BigInt): Game {
	var game = Game.load(gameId.toString());
	if (!game) {
		game = new Game(game.toString());
	}
	return game;
}

export function updateGameDetails(gameId: BigInt) {
	var game = loadGame(gameId);

	const gocRouterContract = GocRouterContract.bind(
		Address.fromString(GOC_ROUTER_ADDRESS)
	);
	const gameState = gocRouterContract.getGameState(gameId);
	const boardMapString = gocRouterContract.getGameBoardString(gameId);

	game.boardMapString = boardMapString;
	game.state = gameState.state;
	game.side = gameState.side;
	game.winner = gameState.winner;
	game.enpassantSq = gameState.enpassantSq;
	game.moveCount = gameState.moveCount;
	game.bkC = gameState.bkC;
	game.bqC = gameState.bqC;
	game.wkC = gameState.wkC;
	game.wqC = gameState.wqC;
	game.save();
}
