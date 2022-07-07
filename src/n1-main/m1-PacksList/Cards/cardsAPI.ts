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
  createCard(payload: createCardType) {
    return instance.post('cards/card', { card: { ...payload } });
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
