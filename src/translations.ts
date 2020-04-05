import { CRCardLocale, CRCardTranslation } from './models';

const translations: {
  [key in CRCardLocale]: CRCardTranslation;
} = {
  en: {
    name: (cardName, level) => `Level ${level} ${cardName}`,
    rarity: {
      label: 'Rarity:',
      common: 'Common',
      rare: 'Rare',
      epic: 'Epic',
      legendary: 'Legendary',
    },
    type: {
      label: 'Type:',
      troop: 'Troop',
      building: 'Building',
      spell: 'Spell',
    },
  },
  ja: {
    name: (cardName, level) => `レベル${level} ${cardName}`,
    rarity: {
      label: 'レア度：',
      common: 'ノーマル',
      rare: 'レア',
      epic: 'スーパーレア',
      legendary: 'ウルトラレア',
    },
    type: {
      label: 'タイプ：',
      troop: 'ユニット',
      building: '建物',
      spell: '呪文',
    },
  },
  fr: {
    name: (cardName, level) => `${cardName} de niveau ${level}`,
    rarity: {
      label: 'Rareté :',
      common: 'Commune',
      rare: 'Rare',
      epic: 'Épique',
      legendary: 'Légendaire',
    },
    type: {
      label: 'Type :',
      troop: 'Combattant',
      building: 'Bâtiment',
      spell: 'Sort',
    },
  },
  de: {
    name: (cardName, level) => `${cardName} Level ${level}`,
    rarity: {
      label: 'Seltenheit',
      common: 'Gewöhnlich',
      rare: 'Selten',
      epic: 'Episch',
      legendary: 'Legendär',
    },
    type: {
      label: 'Typ',
      troop: 'Einheit',
      building: 'Gebäude',
      spell: 'Zauber',
    },
  },
  es: {
    name: (cardName, level) => `${cardName} (nivel ${level})`,
    rarity: {
      label: 'Calidad:',
      common: 'Común',
      rare: 'Especial',
      epic: 'Épica',
      legendary: 'Legendaria',
    },
    type: {
      label: 'Tipo',
      troop: 'Tropa',
      building: 'Estructura',
      spell: 'Hechizo',
    },
  },
  it: {
    name: (cardName, level) => `${cardName} livello ${level}`,
    rarity: {
      label: 'Rarità:',
      common: 'Comune',
      rare: 'Rara',
      epic: 'Epica',
      legendary: 'Leggendaria',
    },
    type: {
      label: 'Tipo:',
      troop: 'Truppa',
      building: 'Edificio',
      spell: 'Incantesimo',
    },
  },
  nl: {
    name: (cardName, level) => `Level ${level} ${cardName}`,
    rarity: {
      label: 'Zeldzaamheid:',
      common: 'Gewoon',
      rare: 'Zeldzaam',
      epic: 'Episch',
      legendary: 'Legendarisch',
    },
    type: {
      label: 'Type:',
      troop: 'Eenheid',
      building: 'Gebouw',
      spell: 'Spreuk',
    },
  },
  no: {
    name: (cardName, level) => `${cardName} på nivå ${level}`,
    rarity: {
      label: 'Forekomst:',
      common: 'Vanlig',
      rare: 'Sjeldent',
      epic: 'Episk',
      legendary: 'Legendarisk',
    },
    type: {
      label: 'Type:',
      troop: 'Tropp',
      building: 'Bygning',
      spell: 'Formel',
    },
  },
  pt: {
    name: (cardName, level) => `${cardName} Nível ${level}`,
    rarity: {
      label: 'Raridade:',
      common: 'Comum',
      rare: 'Rara',
      epic: 'Épica',
      legendary: 'Lendária',
    },
    type: {
      label: 'Tipo:',
      troop: 'Tropa',
      building: 'Construção',
      spell: 'Feitiço',
    },
  },
  tr: {
    name: (cardName, level) => `${level}. Seviye ${cardName}`,
    rarity: {
      label: 'Enderlik:',
      common: 'Sıradan',
      rare: 'Ender',
      epic: 'Destansı',
      legendary: 'Efsanevi',
    },
    type: {
      label: 'Tür:',
      troop: 'Birlik',
      building: 'Bina',
      spell: 'Büyü',
    },
  },
  ru: {
    name: (cardName, level) => `${cardName} ${level}-го уровеня`,
    rarity: {
      label: 'Редкость:',
      common: 'Обычная',
      rare: 'Редкая',
      epic: 'Эпическая',
      legendary: 'Легендарная',
    },
    type: {
      label: 'Тип:',
      troop: 'Войско',
      building: 'Здание',
      spell: 'Заклинание',
    },
  },
};

export default translations;
