import { UserInfo, SafeEventEmitterProvider } from "@web3auth/base";
import { IOpenLoginOptions, IOpenLoginSDK } from "./types";
declare class OpenLoginWebSDK implements IOpenLoginSDK {
    private auth;
    private eth;
    private listener;
    get initialized(): boolean;
    get isLoggedIn(): boolean;
    private get provider();
    initialize({ clientId, googleClientId, verifier, network, appName, appLogo, locale, primaryColor, darkMode, onLoginStateChanged }: IOpenLoginOptions): Promise<void>;
    login(): Promise<SafeEventEmitterProvider | null | void>;
    getUserInfo(): Promise<Partial<UserInfo>>;
    logout(): Promise<void>;
    getChainId(): Promise<any>;
    getAccounts(): Promise<any>;
    getBalance(): Promise<string>;
    sendTransaction(destination: string, amount: number): Promise<any>;
    signMessage(originalMessage: string): Promise<any>;
    getPrivateKey(): Promise<any>;
    private onLoginStateChanged;
    private assertInitialized;
    private assertLogin;
}
export default OpenLoginWebSDK;
//# sourceMappingURL=sdk.d.ts.map