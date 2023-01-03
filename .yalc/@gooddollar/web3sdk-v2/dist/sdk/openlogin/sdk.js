"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const core_1 = require("@web3auth/core");
const openlogin_adapter_1 = require("@web3auth/openlogin-adapter");
const torus_wallet_connector_plugin_1 = require("@web3auth/torus-wallet-connector-plugin");
const base_1 = require("@web3auth/base");
class OpenLoginWebSDK {
    get initialized() {
        return !!this.auth;
    }
    get isLoggedIn() {
        return this.auth.status === base_1.ADAPTER_STATUS.CONNECTED && !!this.provider;
    }
    get provider() {
        return this.auth.provider;
    }
    async initialize({ 
    // login opts
    clientId, googleClientId, verifier, network = "testnet", 
    // app opts
    appName, appLogo, locale = "en", 
    // theme opts
    primaryColor, darkMode = false, 
    // feedback opts
    onLoginStateChanged }) {
        if (this.initialized) {
            return;
        }
        const auth = new core_1.Web3AuthCore({
            clientId,
            web3AuthNetwork: network,
            chainConfig: {
                chainNamespace: base_1.CHAIN_NAMESPACES.EIP155,
                chainId: "0xa4ec",
                rpcTarget: "https://rpc.ankr.com/celo" // This is the public RPC we have added, please pass on your own endpoint while creating an app
            }
        });
        const colors = {
            primary: primaryColor || "#00a8ff"
        };
        const logo = {
            logoDark: appLogo || "https://web3auth.io/images/w3a-L-Favicon-1.svg",
            logoLight: appLogo || "https://web3auth.io/images/w3a-D-Favicon-1.svg"
        };
        auth.configureAdapter(new openlogin_adapter_1.OpenloginAdapter({
            adapterSettings: {
                uxMode: "popup",
                loginConfig: {
                    jwt: {
                        verifier,
                        typeOfLogin: "jwt",
                        clientId: googleClientId
                    }
                },
                whiteLabel: {
                    name: appName,
                    dark: darkMode,
                    defaultLanguage: locale,
                    theme: colors,
                    ...logo
                }
            }
        }));
        await auth.addPlugin(new torus_wallet_connector_plugin_1.TorusWalletConnectorPlugin({
            torusWalletOpts: {},
            walletInitOptions: {
                whiteLabel: {
                    theme: { isDark: darkMode, colors },
                    ...logo
                }
            }
        }));
        await auth.init();
        this.auth = auth;
        if (onLoginStateChanged) {
            this.listener = onLoginStateChanged;
        }
        this.onLoginStateChanged();
    }
    async login() {
        this.assertInitialized();
        if (this.isLoggedIn) {
            return this.provider;
        }
        await this.auth.connectTo(base_1.WALLET_ADAPTERS.OPENLOGIN, {
            loginProvider: "google"
        });
        this.onLoginStateChanged();
        return this.provider;
    }
    async getUserInfo() {
        this.assertInitialized();
        return this.auth.getUserInfo();
    }
    async logout() {
        this.assertInitialized();
        if (!this.isLoggedIn) {
            return;
        }
        await this.auth.logout();
        this.onLoginStateChanged();
    }
    async getChainId() {
        var _a;
        this.assertLogin();
        // Get the connected Chain's ID
        const networkDetails = await ((_a = this.eth) === null || _a === void 0 ? void 0 : _a.getNetwork());
        return networkDetails === null || networkDetails === void 0 ? void 0 : networkDetails.chainId;
    }
    async getAccounts() {
        var _a;
        this.assertLogin();
        const signer = (_a = this.eth) === null || _a === void 0 ? void 0 : _a.getSigner();
        // Get user's Ethereum public address
        return signer === null || signer === void 0 ? void 0 : signer.getAddress();
    }
    async getBalance() {
        this.assertLogin();
        const { eth } = this;
        const signer = eth === null || eth === void 0 ? void 0 : eth.getSigner();
        // Get user's Ethereum public address
        const address = await (signer === null || signer === void 0 ? void 0 : signer.getAddress());
        // Balance is in wei
        const balance = await (eth === null || eth === void 0 ? void 0 : eth.getBalance(address));
        // Get user's balance in ether
        return ethers_1.ethers.utils.formatEther(balance);
    }
    async sendTransaction(destination, amount) {
        var _a;
        this.assertLogin();
        const signer = (_a = this.eth) === null || _a === void 0 ? void 0 : _a.getSigner();
        const parsedAmount = ethers_1.ethers.utils.parseEther(String(amount));
        // Submit transaction to the blockchain
        const tx = await (signer === null || signer === void 0 ? void 0 : signer.sendTransaction({
            to: destination,
            value: parsedAmount,
            maxPriorityFeePerGas: "5000000000",
            maxFeePerGas: "6000000000000" // Max fee per gas
        }));
        // Wait for transaction to be mined
        return tx === null || tx === void 0 ? void 0 : tx.wait();
    }
    async signMessage(originalMessage) {
        var _a;
        this.assertLogin();
        const signer = (_a = this.eth) === null || _a === void 0 ? void 0 : _a.getSigner();
        // Sign the message
        return signer === null || signer === void 0 ? void 0 : signer.signMessage(originalMessage);
    }
    async getPrivateKey() {
        var _a;
        this.assertLogin();
        return (_a = this.provider) === null || _a === void 0 ? void 0 : _a.request({
            method: "eth_private_key"
        });
    }
    onLoginStateChanged() {
        const { listener, isLoggedIn, provider } = this;
        let eth = null;
        if (provider) {
            eth = new ethers_1.ethers.providers.Web3Provider(provider);
        }
        this.eth = eth;
        if (listener) {
            listener(isLoggedIn);
        }
    }
    assertInitialized() {
        if (!this.auth) {
            throw new Error("Open login SDK not initialized");
        }
    }
    assertLogin() {
        if (!this.provider || !this.eth) {
            throw new Error("User signed out");
        }
    }
}
exports.default = OpenLoginWebSDK;
//# sourceMappingURL=sdk.js.map