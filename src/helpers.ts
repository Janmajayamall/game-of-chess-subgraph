import {
	BigInt,
	BigDecimal,
	Address,
	Bytes,
	log,
} from "@graphprotocol/graph-ts";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let TWO_BI = BigInt.fromI32(2);
export let FOUR_BI = BigInt.fromI32(4);
export let ZERO_BD = BigDecimal.fromString("0");
export let ONE_BD = BigDecimal.fromString("1");
export let BI_18 = BigInt.fromI32(18);
export let emptyBytes = Bytes.fromByteArray(Bytes.fromUTF8(""));

export function convertBigIntToDecimal(
	value: BigInt,
	base: BigDecimal = BigDecimal.fromString("1e18")
): BigDecimal {
	return value.divDecimal(base);
}

export const GOC_ADDRESS = "0x498Ab8220C4b409ba7299FfeC99484EC27d9101E";
export const GOC_ROUTER_ADDRESS = "0x8384B1F3F26420c1578D64398c45a205F3131C1B";

export class OutcomeTokenIds {
	oToken0Id: BigInt;
	oToken1Id: BigInt;

	constructor(_oToken0Id: BigInt = ONE_BI, _oToken1Id: BigInt = ONE_BI) {
		this.oToken0Id = _oToken0Id;
		this.oToken1Id = _oToken1Id;
	}
}
