import { ethers } from "ethers";

export function wei2eth(x) {
  if (!x) {
    x = 0;
  }
  let ref = x.toString();
  return ethers.utils.formatUnits(ref, 18);
}

export function gwei2eth(x) {
  if (!x) {
    x = 0;
  }
  let ref = x.toString();
  return ethers.utils.formatUnits(ref, 9);
}