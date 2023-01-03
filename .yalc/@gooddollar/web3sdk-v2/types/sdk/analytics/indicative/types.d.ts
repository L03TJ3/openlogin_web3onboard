import { IAbstractConfig } from "../types";
export interface IIndicativeConfig extends IAbstractConfig {
    apiKey?: string;
    userProperty?: string;
}
export interface IIndicativeApi {
    initialize(apiKey: string): Promise<boolean>;
    addProperties(props: object): void;
    setUniqueID(id: string): void;
    buildEvent(eventName: string, props?: object): any;
}
export declare const defaultConfig: Partial<IIndicativeConfig>;
//# sourceMappingURL=types.d.ts.map