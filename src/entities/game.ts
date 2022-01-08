import { Game } from "./../../generated/schema";
import { GocRouter as GocRouterContract } from "./../../generated/Goc/GocRouter";
import { GOC_ROUTER_ADDRESS } from "./../helpers";
import { Address, BigInt } from "@graphprotocol/graph-ts";

export function loadGame(gameId: i32): Game {
	var game = Game.load(BigInt.fromI32(gameId).toHex());
	if (!game) {
		game = new Game(BigInt.fromI32(gameId).toHex());
	}
	return game;
}

export function updateGameDetails(gameId: i32): void {
	var game = loadGame(gameId);

	const gocRouterContract = GocRouterContract.bind(
		Address.fromString(GOC_ROUTER_ADDRESS)
	);
	const gameState = gocRouterContract.getGameState(gameId);

	game.gameId = gameId;
	game.bitboards = gameState.bitboards;
	game.state = gameState.state;
	game.side = gameState.side;
	game.winner = gameState.winner;
	game.enpassantSq = gameState.enpassantSq;
	game.moveCount = gameState.moveCount;
	game.halfMoveCount = gameState.halfMoveCount;
	game.bkC = gameState.bkC;
	game.bqC = gameState.bqC;
	game.wkC = gameState.wkC;
	game.wqC = gameState.wqC;
	game.save();
}
