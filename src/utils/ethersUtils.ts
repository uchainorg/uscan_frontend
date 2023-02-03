import { ethers, BigNumberish } from 'ethers';
import { useCustomizationParametersStore } from '@/store/customizationParameters';

const parametersStore = useCustomizationParametersStore();

export const ethersFormatUnits = (value: BigNumberish): string => {
  return ethers.utils.formatUnits(value, parametersStore.decimal) + ' ' + parametersStore.unitDisplay;
};
