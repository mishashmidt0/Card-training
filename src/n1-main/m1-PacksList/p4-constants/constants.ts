import { baseUrlAuth } from '../../../n2-auth/a5-constants/constants';

export const baseUrl = baseUrlAuth;
export const minRangeValue = 0;
export const maxRangeValue = 110;
export const initPageCount = 10;
export const timeout = 600;
export const maxLengthPackName = 50;
export const forGetRandomCard = 6;
export const resetPayload = {
  isShowCards: 'all',
  pageCount: initPageCount,
  min: minRangeValue,
  max: maxRangeValue,
  packName: '',
};
export const maxPageCount = 1000;
