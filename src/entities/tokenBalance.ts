import { Address, Bytes, BigInt, BigDecimal } from "@graphprotocol/graph-ts";
import { TokenBalance } from "../../generated/schema";
import { Goc as GocContract } from "../../generated/Goc/Goc";
import { convertBigIntToDecimal, emptyBytes, GOC_ADDRESS } from "../helpers";

export function loadTokenBalance(tokenId: BigInt, user: Address): TokenBalance {
	const id = user.toHex() + "-" + tokenId.toHex();
	var tokenBalance = TokenBalance.load(id);
	if (!tokenBalance) {
		tokenBalance = new TokenBalance(id);
		tokenBalance.tokenId = tokenId;
		tokenBalance.user = user.toHex();
	}
	return tokenBalance;
}

/**
 * Update functions
 */
export function updateTokenBalance(
	tokenId: BigInt,
	user: Address,
	moveValue: BigInt
): void {
	const tokenBalance = loadTokenBalance(tokenId, user);
	const balance = GocContract.bind(Address.fromString(GOC_ADDRESS)).balanceOf(
		user,
		tokenId
	);
	tokenBalance.balance = convertBigIntToDecimal(balance);
	tokenBalance.market = moveValue.toHex();
	tokenBalance.save();
}
