import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  withCredentials: true,
});

export const cardsAPI = {
  getCards(payload: ResCardsType) {
    return instance.get('cards/card', {
      params: { ...payload },
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
// type ResponseCardsPack = {
//   config: any;
//   data: CardsDataType;
//   headers: any;
//   request: any;
//   status: number;
//   statusText: string;
// };
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
