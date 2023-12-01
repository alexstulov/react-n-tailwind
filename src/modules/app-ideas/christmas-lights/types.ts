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
    SET_BULB_SIZE ="setBulbSize",
    SET_BULB_COLOR ="setBulbColor",
}

export type LightsAction =
    | { type: typeof LightsActionType.TOGGLE_BLINKING }
    | { type: typeof LightsActionType.SET_BLINKING_INTERVAL; value: State["blinkInterval"] }
    | { type: typeof LightsActionType.SET_ROWS_AMOUNT; value: State["rowsAmount"] }
    | { type: typeof LightsActionType.SET_BULB_SIZE; value: {bulbIndex: number, size: BulbSettings[0]} }
    | { type: typeof LightsActionType.SET_BULB_COLOR; value: {bulbIndex: number, color: BulbSettings[1]} }

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
  