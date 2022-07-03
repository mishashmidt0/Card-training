import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  withCredentials: true,
});

export const cardPackApi = {
  getAllCardPack() {
    return instance.get<any, ResponseGetCardPack>('cards/pack');
  },
};

export type GetCardPackParamsType = {
  packName?: string; // не обязательно
  min?: number; // не обязательно
  max?: number; // не обязательно
  sortPacks?: string; // не обязательно
  page?: number; // не обязательно
  pageCount?: number; // не обязательно
  user_id?: string; // чьи колоды не обязательно, или прийдут все
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
  token: string;
  tokenDeathTime: number;
};

type ResponseGetCardPack = {
  config: any;
  data: CardPackDataType;
  headers: any;
  request: any;
  status: number;
  statusText: string;
};
