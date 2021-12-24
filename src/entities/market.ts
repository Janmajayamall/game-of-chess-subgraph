import { Market } from "./../../generated/schema";
import { Goc as GocContract } from "./../../generated/Goc/Goc";
import { convertBigIntToDecimal, GOC_ADDRESS } from "./../helpers";
import { Address, BigInt } from "@graphprotocol/graph-ts";

export function loadMarket(moveValue: BigInt): Market {
	var market = Market.load(moveValue.toString());
	if (!market) {
		market = new Market(moveValue.toString());
	}
	return market;
}

export function updateMarketDetails(moveValue: BigInt) {
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
	market.save();
}

export function increaseMarketTradeVolume(moveValue: BigInt, by: BigInt) {
	var market = loadMarket(moveValue);
	market.tradeVolume = market.tradeVolume.plus(convertBigIntToDecimal(by));
	market.save();
}

export function updateMarketChosenTo(moveValue: BigInt, value: boolean) {
	var market = loadMarket(moveValue);
	market.chosenMove = value;
	market.save();
}
