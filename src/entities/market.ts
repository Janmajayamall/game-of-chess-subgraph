import { Market } from "./../../generated/schema";
import { Goc as GocContract } from "./../../generated/Goc/Goc";
import { convertBigIntToDecimal, GOC_ADDRESS, ONE_BI } from "./../helpers";
import { Address, BigInt } from "@graphprotocol/graph-ts";

export function getGameId(moveValue: BigInt): BigInt {
	return BigInt.fromString(loadMarket(moveValue).game);
}

export function getOutcomeTokenIds(moveValue: BigInt): [BigInt, BigInt] {
	const market = loadMarket(moveValue);
	return [market.oToken0Id, market.oToken1Id];
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

	market.moveValue = moveValue;
	market.game = gocContract.decodeGameIdFromMoveValue(moveValue);
	market.moveCount = gocContract.decodeMoveCountFromMoveValue(moveValue);

	const bitboards = gocContract.getGameState(market.game).bitboards;
	const marketMetadata = gocContract.decodeMoveMetadataFromMoveValue(
		moveValue,
		bitboards
	);

	market.sourceSq = marketMetadata.sourceSq;
	market.targetSq = marketMetadata.targetSq;
	market.moveBySq = marketMetadata.moveBySq;
	market.sourcePiece = marketMetadata.sourcePiece;
	market.targetPiece = marketMetadata.targetPiece;
	market.promotedToPiece = marketMetadata.promotedToPiece;
	market.moveFlag = marketMetadata.moveFlag;

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
