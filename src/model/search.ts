export interface SearchRes {
  type: number;
}

export interface LinkItem {
  value: string;
  link: string;
}

export const typeMap = {
  1: { display: 'Null', route: '' },
  2: { display: 'Address', route: '/address/' },
  3: { display: 'Block', route: '/block/' },
  4: { display: 'Transaction', route: '/tx/' },
};
