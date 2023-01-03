/// <reference types="react" />
import { IOpenLoginContext, IOpenLoginProviderProps, IOpenLoginHook, IEthersRPCHook } from "./types";
export declare const OpenLoginContext: import("react").Context<IOpenLoginContext>;
export declare const OpenLoginProvider: ({ clientId, googleClientId, verifier, network, appName, appLogo, locale, children }: IOpenLoginProviderProps) => JSX.Element | null;
export declare const useOpenLogin: () => IOpenLoginHook;
export declare const useEthersRPC: () => IEthersRPCHook;
//# sourceMappingURL=react.d.ts.map