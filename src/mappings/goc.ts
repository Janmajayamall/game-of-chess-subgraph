import { Address,, BigInt } from "@graphprotocol/graph-ts";
import {
	getGameId,
	updateMarketChosenTo,
	updateMarketDetails,
	updateGameDetails,
	saveUser,
	saveUserMarket,
	updateTokenBalance,
	getOutcomeTokenIds,
} from "../entities/";
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
	saveUserMarketAndTokenBalances(event.params.by, event.params.moveValue)
	// update trade volume
}

export function handleOutcomeSold(event: OutcomeSold) {
	saveUserMarketAndTokenBalances(event.params.by, event.params.moveValue)
	// update trade volume
}

export function handleWinningRedeemed(event: WinningRedeemed) {
    saveUserMarketAndTokenBalances(event.params.by, event.params.moveValue)
}

export function handleBetRedeemed(event: BetRedeemed) {
    saveUserMarketAndTokenBalances(event.params.by, event.params.moveValue)
}

export function handleMoveMade(event: MoveMade) {
	// update chosen one to true & the rest to false
	updateMarketChosenTo(event.params.moveValue, true);
	updateGameDetails(getGameId(event.params.moveValue));
}

export function handleGameCreated(event: GameCreated) {
	updateGameDetails(event.params.gameId);
}

function saveUserMarketAndTokenBalances(user: Address, moveValue: BigInt) {
	saveUser(user);
	saveUserMarket(user, moveValue);

	// update token balance
	const oTokenIds = getOutcomeTokenIds(moveValue);
	updateTokenBalance(oTokenIds[0], user, moveValue);
	updateTokenBalance(oTokenIds[1], user, moveValue);
}
