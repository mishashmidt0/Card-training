import axios from 'axios';

import { baseUrl } from '../p4-constants/constants';

export const instance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export const cardsAPI = {
  getCards(payload: ResCardsType) {
    return instance.get<any, ResponseCards>('cards/card', {
      params: { ...payload },
    });
  },
  createCard(payload: createCardType) {
    return instance.post('cards/card', { card: { ...payload } });
  },
  removeCard(cardId: string) {
    return instance.delete('cards/card', { params: { id: cardId } });
  },
  changeCard(cardId: string, questionValue: string, answerValue: string) {
    return instance.put('cards/card', {
      card: { _id: cardId, question: questionValue, answer: answerValue },
    });
  },
};

export type CardsType = {
  answer: string;
  question: string;
  cardsPack_id: string;
  grade: number;
  rating: number;
  shots: number;
  type: string;
  user_id: string;
  created: string;
  updated: string;
  __v: number;
  _id: string;
};
export type CardsDataType = {
  cards: Array<CardsType>;
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
};
type ResponseCards = {
  config: any;
  data: CardsDataType;
  headers: any;
  request: any;
  status: number;
  statusText: string;
};
export type ResCardsType = {
  cardAnswer?: string;
  cardQuestion?: string;
  cardsPack_id?: string;
  min?: number;
  max?: number;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};

export type createCardType = {
  cardsPack_id?: string;
  question?: string; // если не отправить будет таким
  answer?: string; // если не отправить будет таким
  grade?: number; // 0..5, не обязателен
  shots?: number; // не обязателен
  answerImg?: string; // не обязателен
  questionImg?: string; // не обязателен
  questionVideo?: string; // не обязателен
  answerVideo?: string;
};
