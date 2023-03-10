import { ComponentInternalInstance, getCurrentInstance } from 'vue';

export const getTitle = function (): String {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const proxy = appContext.config.globalProperties;
  const $title = proxy.$title as string;
  return $title;
};

export const getUnitDisplay = function (): String {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const proxy = appContext.config.globalProperties;
  const $unitDisplay = proxy.$unitDisplay as string;
  return $unitDisplay;
};

export const getNodeUrl = function (): string {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const proxy = appContext.config.globalProperties;
  const $nodeUrl = proxy.$nodeUrl as string;
  return $nodeUrl;
};

export const getChainID = function (): number {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const proxy = appContext.config.globalProperties;
  const $chainID = proxy.$chainID as number;
  return $chainID;
};

export const getDecimals = function (): number {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance;
  const proxy = appContext.config.globalProperties;
  const $decimal = proxy.$decimal as number;
  return $decimal;
};
