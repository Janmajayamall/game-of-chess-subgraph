import { Market } from "./../../generated/schema";
import { Goc as GocContract } from "./../../generated/Goc/Goc";
import { GocRouter as GocRouterContract } from "./../../generated/Goc/GocRouter";
import {
	convertBigIntToDecimal,
	GOC_ADDRESS,
	GOC_ROUTER_ADDRESS,
	ONE_BI,
	OutcomeTokenIds,
} from "./../helpers";
import { Address, BigInt } from "@graphprotocol/graph-ts";

export function getGameId(moveValue: BigInt): i32 {
	return loadMarket(moveValue).gameId;
}

export function getOutcomeTokenIds(moveValue: BigInt): OutcomeTokenIds {
	const market = loadMarket(moveValue);
	const tokenIds = new OutcomeTokenIds(market.oToken0Id, market.oToken0Id);
	return tokenIds;
}

export function getTradesCount(moveValue: BigInt): BigInt {
	return loadMarket(moveValue).tradesCount;
}

export function loadMarket(moveValue: BigInt): Market {
	var market = Market.load(moveValue.toHex());
	if (!market) {
		market = new Market(moveValue.toHex());
	}
	return market;
}

export function updateMarketDetails(moveValue: BigInt): void {
	var market = loadMarket(moveValue);

	const gocContract = GocContract.bind(Address.fromString(GOC_ADDRESS));
	const gocRouterContract = GocRouterContract.bind(
		Address.fromString(GOC_ROUTER_ADDRESS)
	);

	const marketMetadata = gocRouterContract.getMoveMetadataFromMoveValue(
		moveValue
	);
	market.moveValue = moveValue;
	market.game = BigInt.fromI32(marketMetadata.gameId).toHex();
	market.gameId = marketMetadata.gameId;
	market.moveCount = marketMetadata.moveCount;
	market.sourceSq = marketMetadata.sourceSq;
	market.targetSq = marketMetadata.targetSq;
	market.moveBySq = marketMetadata.moveBySq;
	market.sourcePiece = BigInt.fromI32(marketMetadata.sourcePiece);
	market.targetPiece = BigInt.fromI32(marketMetadata.targetPiece);
	market.promotedToPiece = BigInt.fromI32(marketMetadata.promotedToPiece);
	market.moveFlag = BigInt.fromI32(marketMetadata.moveFlag);

	const tokenIds = gocContract.getOutcomeReservesTokenIds(moveValue);
	market.oToken0Id = tokenIds.value0;
	market.oToken1Id = tokenIds.value1;

	market.save();
}

export function increaseMarketTradeVolume(moveValue: BigInt, by: BigInt): void {
	var market = loadMarket(moveValue);
	market.tradeVolume = market.tradeVolume.plus(convertBigIntToDecimal(by));
	market.save();
}

export function increaseTradeCountBy1(moveValue: BigInt): void {
	var market = loadMarket(moveValue);
	market.tradesCount = market.tradesCount.plus(ONE_BI);
	market.save();
}

export function updateMarketChosenTo(moveValue: BigInt, value: boolean): void {
	var market = loadMarket(moveValue);
	market.chosenMove = value;
	market.save();
}
