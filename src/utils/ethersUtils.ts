import { ethers, BigNumberish } from 'ethers';
import { useCustomizationParametersStore } from '@/store/customizationParameters';

const { unitDisplay, decimal } = useCustomizationParametersStore();

export const ethersFormatUnits = (value: BigNumberish): string => {
  return ethers.utils.formatUnits(value, decimal) + ' ' + unitDisplay;
};
