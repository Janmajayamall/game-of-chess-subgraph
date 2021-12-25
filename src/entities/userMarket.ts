import { Address, Bytes, BigInt } from "@graphprotocol/graph-ts";
import { UserMarket } from "./../../generated/schema";

/**
 * Update functions
 */
export function loadUserMarket(
	userAddress: Address,
	moveValue: BigInt
): UserMarket {
	const id = userAddress.toHex() + "-" + moveValue.toHex();
	var userMarket = UserMarket.load(id);
	if (!userMarket) {
		userMarket = new UserMarket(id);
		userMarket.user = userAddress.toHex();
		userMarket.market = moveValue.toHex();
	}
	return userMarket;
}

export function saveUserMarket(userAddress: Address, moveValue: BigInt): void {
	const userMarket = loadUserMarket(userAddress, moveValue);
	userMarket.save();
}
