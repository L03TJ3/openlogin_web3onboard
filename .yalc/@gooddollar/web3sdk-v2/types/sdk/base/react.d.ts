import { Signer } from "ethers";
import { BaseSDK } from "./sdk";
import { QueryParams, Token } from "@usedapp/core";
import { ClaimSDK } from "../claim/sdk";
import { SavingsSDK } from "../savings/sdk";
import { G$Balances } from "../constants";
export declare const NAME_TO_SDK: {
    [key: string]: typeof ClaimSDK | typeof SavingsSDK | typeof BaseSDK;
};
type RequestedSdk = {
    sdk: ClaimSDK | SavingsSDK | BaseSDK | undefined;
    readOnly: boolean;
};
export type SdkTypes = "claim" | "savings" | "base";
export declare const useReadOnlySDK: (type: SdkTypes, requiredChainId?: number) => RequestedSdk["sdk"];
export declare const useGetEnvChainId: (requiredChainId?: number) => {
    chainId: number;
    defaultEnv: string;
    baseEnv: string;
    connectedEnv: string;
    switchNetworkRequest: import("../../contexts").SwitchNetwork | undefined;
};
export declare const useGetContract: (contractName: string, readOnly?: boolean, type?: SdkTypes, requiredChainId?: number) => import("ethers").Contract | undefined;
export declare const getSigner: (signer: void | Signer, account: string) => Promise<Error | Signer>;
export declare const useSDK: (readOnly?: boolean, type?: SdkTypes, requiredChainId?: number | undefined) => RequestedSdk["sdk"];
export declare function useG$Tokens(): {
    g$: Token;
    good: Token;
    gdx: Token;
};
export declare function useG$Balance(refresh?: QueryParams["refresh"]): G$Balances;
export {};
//# sourceMappingURL=react.d.ts.map