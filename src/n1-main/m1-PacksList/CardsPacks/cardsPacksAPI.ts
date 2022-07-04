import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  withCredentials: true,
});

export const cardsPacksAPI = {
  getCardsPacks(pageCount?: number, newPage?: number) {
    return instance.get<any, ResponseGetCardPack>('cards/pack', {
      params: {
        // eslint-disable-next-line no-magic-numbers
        pageCount: pageCount || 10,
        page: newPage || 1,
      },
    });
  },
};

export type CardPackType = {
  cardsCount: number;
  created: string;
  deckCover: string | any;
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
