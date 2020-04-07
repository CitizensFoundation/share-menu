export enum CRCardRarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}

export enum CRCardType {
  TROOP = 'troop',
  BUILDING = 'building',
  SPELL = 'spell',
}

export type CRCardLevel = number;

export type CRCardCost = string | number;

export type CRCardObservedAttribute =
  | 'language'
  | 'name'
  | 'rarity'
  | 'level'
  | 'type'
  | 'cost'
  | 'description'
  | 'image'
  | 'stretch-image'
  | 'image-background-color'
  | 'assets-path';

export enum CRCardLocale {
  EN = 'en',
  JA = 'ja',
  FR = 'fr',
  DE = 'de',
  ES = 'es',
  IT = 'it',
  NL = 'nl',
  NO = 'no',
  PT = 'pt',
  TR = 'tr',
  RU = 'ru',
}

export interface CRCardTranslation {
  name: (cardName: string, level: number) => string;
  rarity: {
    label: string;
    common: string;
    rare: string;
    epic: string;
    legendary: string;
  };
  type: {
    label: string;
    troop: string;
    building: string;
    spell: string;
  };
}
