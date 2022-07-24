import axios from 'axios';

import { baseUrl } from '../p4-constants/constants';

export const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export const cardsPacksAPI = {
  getCardsPacks(payload: ResCardsPacksType) {
    return instance.get<any, ResponseGetCardPack>('cards/pack', {
      params: { ...payload },
    });
  },
  createCardsPack(payload: createCardsPackType) {
    return instance.post('cards/pack', { cardsPack: payload });
  },
  removeCardsPack(cardPackId: string) {
    return instance.delete('cards/pack', { params: { id: cardPackId } });
  },
  changeCardPackName(cardPackId: string, value: string) {
    return instance.put('cards/pack', { cardsPack: { _id: cardPackId, name: value } });
  },
  sendGrade(payloadGrade: payloadGrade) {
    return instance.put<any, resChangeCardGrade, payloadGrade>(
      'cards/grade',
      payloadGrade,
    );
  },
};

export type CardPackType = {
  cardsCount: number;
  created: string;
  deckCover: string;
  grade: number;
  more_id: string;
  name: string;
  path: string;
  private: boolean;
  rating: number;
  shots: number;
  type: string;
  updated: string;
  user_id: string;
  user_name: string;
  __v: number;
  _id: string;
};
export type CardPackDataType = {
  cardPacks: Array<CardPackType>;
  cardPacksTotalCount: number; // количество колод
  maxCardsCount: number;
  minCardsCount: number;
  page: number; // выбранная страница
  pageCount: number; // количество элементов на странице
};

type ResponseGetCardPack = {
  config: any;
  data: CardPackDataType;
  headers: any;
  request: any;
  status: number;
  statusText: string;
};

export type ResCardsPacksType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  user_id?: string;
};
export type createCardsPackType = {
  name: string;
  deckCover?: string;
  private?: boolean;
};
export type payloadGrade = {
  grade: number;
  card_id: string;
};
export type resChangeCardGrade = {
  updatedGrade: {
    _id: string;
    cardsPack_id: string;
    card_id: string;
    user_id: string;
    grade: number;
    shots: number;
  };
};
