import { UserInfo, SafeEventEmitterProvider } from "@web3auth/base";
import { OPENLOGIN_NETWORK_TYPE } from "@toruslabs/openlogin";
export interface IOpenLoginOptions {
    clientId: string;
    googleClientId: string;
    verifier: string;
    network?: OPENLOGIN_NETWORK_TYPE;
    appName?: string;
    appLogo?: string;
    locale?: "en" | "de" | "ja" | "ko" | "zh" | "es";
    primaryColor?: string;
    darkMode?: boolean;
    onLoginStateChanged?: (isLoggedIn: boolean) => void;
}
export interface IOpenLoginSDK {
    readonly initialized: boolean;
    readonly isLoggedIn: boolean;
    initialize(options: IOpenLoginOptions): Promise<void>;
    login(): Promise<SafeEventEmitterProvider | null | void>;
    getUserInfo(): Promise<Partial<UserInfo>>;
    logout(): Promise<void>;
    getChainId(): Promise<any>;
    getAccounts(): Promise<any>;
    getBalance(): Promise<string>;
    sendTransaction(destination: string, amount: number): Promise<any>;
    signMessage(originalMessage: string): Promise<any>;
    getPrivateKey(): Promise<any>;
}
export type IOpenLoginProviderProps = Omit<IOpenLoginOptions, "onLoginStateChanged" | "darkMode" | "primaryColor"> & {
    children?: any;
};
export interface IOpenLoginContext {
    userInfo: Partial<UserInfo> | null;
    sdk: IOpenLoginSDK | undefined;
}
export type IOpenLoginHook = Pick<IOpenLoginSDK, "isLoggedIn" | "login" | "logout"> & {
    userInfo: Partial<UserInfo> | null;
};
export type IEthersRPCHook = Pick<IOpenLoginSDK, "getAccounts" | "getBalance" | "getChainId" | "getPrivateKey" | "sendTransaction" | "signMessage">;
//# sourceMappingURL=types.d.ts.map