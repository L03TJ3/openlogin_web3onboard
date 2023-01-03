import { EnvKey } from "./base/sdk";
import { Currency, CurrencyValue, Token } from "@usedapp/core";
export declare enum SupportedChains {
    MAINNET = 1,
    FUSE = 122,
    CELO = 42220
}
export type SUPPORTED_NETWORKS = "FUSE" | "CELO" | "MAINNET";
export declare enum SupportedV2Networks {
    FUSE = 122,
    CELO = 42220
}
type G$Tokens = {
    amount: CurrencyValue;
    token: Currency;
};
export interface G$Balances {
    G$: G$Tokens | undefined;
    GOOD: G$Tokens | undefined;
    GDX: G$Tokens | undefined;
}
export type SupportedV2Network = keyof typeof SupportedV2Networks;
export declare const Envs: {
    [key: EnvKey]: {
        [key: string]: string;
    };
};
type ObjectLike = {
    [key: string]: string | ObjectLike | Array<string[]> | string[] | number;
};
export declare function G$(chainId: number, env?: string): Token;
export declare function GOOD(chainId: number, env?: string): Token;
export declare function G$ContractAddresses<T = ObjectLike>(name: string, env: EnvKey): T;
export {};
//# sourceMappingURL=constants.d.ts.map