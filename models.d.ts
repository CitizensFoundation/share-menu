export declare enum CRCardRarity {
    COMMON = "common",
    RARE = "rare",
    EPIC = "epic",
    LEGENDARY = "legendary"
}
export declare enum CRCardType {
    TROOP = "troop",
    BUILDING = "building",
    SPELL = "spell"
}
export declare type CRCardLevel = number;
export declare type CRCardCost = '?' | number;
export declare type CRCardObservedAttribute = 'language' | 'name' | 'rarity' | 'level' | 'type' | 'cost' | 'description' | 'image' | 'stretch';
export declare enum CRCardLocale {
    EN = "en",
    JA = "ja",
    FR = "fr",
    DE = "de",
    ES = "es",
    IT = "it",
    NL = "nl",
    NO = "no",
    PT = "pt",
    TR = "tr",
    RU = "ru"
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
