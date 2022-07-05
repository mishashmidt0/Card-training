import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0/',
  withCredentials: true,
});

export const cardsAPI = {
  getCards(cardsPackId?: string, pageCount?: number, newPage?: number) {
    return instance.get('cards/card', {
      params: {
        // eslint-disable-next-line no-magic-numbers
        pageCount: pageCount || 10,
        page: newPage || 1,
        cardsPack_id: cardsPackId || '5eb6a2f72f849402d46c6ac7',
      },
    });
  },
};
