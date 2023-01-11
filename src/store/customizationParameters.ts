import { defineStore } from 'pinia';
import { CustomParams } from '../model/customizationParameters';

export const useCustomizationParametersStore = defineStore('CustomizationParameters', {
  state: (): CustomParams => {
    return {
      appTitle: '',
      nodeUrl: '',
      unitDisplay: '',
      chainID: 0,
      decimal: 0,
    };
  },
});
