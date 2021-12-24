import { updateGameDetails } from "../entities/game";
import {
	getGameId,
	updateMarketChosenTo,
	updateMarketDetails,
} from "../entities/market";
import {
	BetRedeemed,
	GameCreated,
	MarketCreated,
	MoveMade,
	OutcomeBought,
	OutcomeSold,
	WinningRedeemed,
} from "./../../generated/Goc/Goc";

export function handleMarketCreated(event: MarketCreated) {
	updateMarketDetails(event.params.moveValue);
}

export function handleOutcomeBought(event: OutcomeBought) {
	// update trade volume
}

export function handleOutcomeSold(event: OutcomeSold) {
	// update trade volume
}

export function handleWinningRedeemed(event: WinningRedeemed) {
	// reset user's token balance
}

export function handleBetRedeemed(event: BetRedeemed) {
	// reset user's token balance
}

export function handleMoveMade(event: MoveMade) {
	// update chosen one to true & the rest to false
	updateMarketChosenTo(event.params.moveValue, true);
	updateGameDetails(getGameId(event.params.moveValue));
}

export function handleGameCreated(event: GameCreated) {
	updateGameDetails(event.params.gameId);
}
