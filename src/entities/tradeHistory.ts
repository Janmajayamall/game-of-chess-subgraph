import { Address, Bytes, BigInt, BigDecimal } from "@graphprotocol/graph-ts";
import { TokenBalance, TradeHistory } from "../../generated/schema";
import { Goc as GocContract } from "../../generated/Goc/Goc";
import { convertBigIntToDecimal, emptyBytes, GOC_ADDRESS } from "../helpers";

export function loadTradeHistory(
	user: Address,
	moveValue: BigInt
): TradeHistory {
	var id = user.toHex() + "-" + moveValue.toHex();
	var tradeHistory = TradeHistory.load(id);
	if (!tradeHistory) {
		tradeHistory = new TradeHistory(id);
		tradeHistory.user = user.toHex();
		tradeHistory.market = moveValue.toHex();
	}
	return tradeHistory;
}

/**
 * Update functions
 */
export function updateTradeHistory(
	user: Address,
	moveValue: BigInt,
	amountC: BigInt,
	amount0: BigInt,
	amount1: BigInt,
	buy: boolean,
	tradeIndex: BigInt,
	timestamp: BigInt
): void {
	var tradeHistory = loadTradeHistory(user, moveValue);
	tradeHistory.amountC = convertBigIntToDecimal(amountC);
	tradeHistory.amount0 = convertBigIntToDecimal(amount0);
	tradeHistory.amount1 = convertBigIntToDecimal(amount1);
	tradeHistory.buy = buy;
	tradeHistory.tradeIndex = tradeIndex;
	tradeHistory.timestamp = timestamp;
	tradeHistory.save();
}
