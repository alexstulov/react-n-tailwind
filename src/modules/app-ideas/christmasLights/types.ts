type BulbSettings = [
    size: string,
    color: string
];

export interface State {
    blinking: boolean;
    blinkInterval: number;
    rowsAmount: number;
    bulbsSettings: BulbSettings[];
}

export enum LightsActionType {
    TOGGLE_BLINKING ="toggleBlinking",
    SET_BLINKING_INTERVAL ="setBlinkingInterval",
    SET_ROWS_AMOUNT ="setRowsAmount",
    SET_BULBS_SETTINGS ="setBulbsSettings",
}

export type LightsAction =
    | { type: typeof LightsActionType.TOGGLE_BLINKING }
    | { type: typeof LightsActionType.SET_BLINKING_INTERVAL; value: State["blinkInterval"] }
    | { type: typeof LightsActionType.SET_ROWS_AMOUNT; value: State["rowsAmount"] }
    | { type: typeof LightsActionType.SET_BULBS_SETTINGS; value: State["bulbsSettings"] }

export enum Colors {
    RED="red",
    PINK="pink",
    BLUE="blue",
    TURQUOISE="turquoise",
    MINT="mint",
    GREEN="green",
    YELLOW="yellow"
}
export const colors = [
  Colors.RED,
  Colors.PINK,
  Colors.BLUE,
  Colors.TURQUOISE,
  Colors.MINT,
  Colors.GREEN,
  Colors.YELLOW
];

export const defaultSize = "20px";
  