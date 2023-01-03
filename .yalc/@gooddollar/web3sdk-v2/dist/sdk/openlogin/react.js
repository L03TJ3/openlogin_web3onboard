"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEthersRPC = exports.useOpenLogin = exports.OpenLoginProvider = exports.OpenLoginContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const native_base_1 = require("native-base");
const react_1 = require("react");
const lodash_1 = require("lodash");
const sdk_1 = __importDefault(require("./sdk"));
exports.OpenLoginContext = (0, react_1.createContext)({
    userInfo: null,
    sdk: undefined,
});
const OpenLoginProvider = ({ 
// login opts
clientId, googleClientId, verifier, network = "testnet", 
// app opts
appName, appLogo, locale = "en", 
// generic react props
children }) => {
    const { colorMode } = (0, native_base_1.useColorMode)();
    const primaryColor = (0, native_base_1.useColorModeValue)("primary.50", "primary.800");
    const [userInfo, setUserInfo] = (0, react_1.useState)(null);
    const [sdk, setSDK] = (0, react_1.useState)();
    // TODO: usePropsRefs
    const optionsRef = (0, react_1.useRef)({
        clientId,
        network,
        googleClientId,
        verifier,
        appName,
        appLogo,
        locale,
        primaryColor,
        darkMode: colorMode === "dark",
    });
    (0, react_1.useEffect)(() => {
        const sdk = new sdk_1.default();
        const onLoginStateChanged = async (isLoggedIn) => {
            let userInfo = null;
            if (isLoggedIn) {
                userInfo = await sdk.getUserInfo();
            }
            setUserInfo(userInfo);
        };
        const initializeSDK = async () => {
            const options = { ...optionsRef.current, onLoginStateChanged };
            await sdk.initialize(options);
            setSDK(sdk);
        };
        initializeSDK().catch(lodash_1.noop);
    }, [setUserInfo, setSDK]);
    if (!sdk) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(exports.OpenLoginContext.Provider, { value: { userInfo, sdk }, children: children }));
};
exports.OpenLoginProvider = OpenLoginProvider;
const useOpenLogin = () => {
    const { sdk, userInfo } = (0, react_1.useContext)(exports.OpenLoginContext);
    const logout = (0, react_1.useCallback)(async () => sdk === null || sdk === void 0 ? void 0 : sdk.logout(), [sdk]);
    const login = (0, react_1.useCallback)(async () => sdk === null || sdk === void 0 ? void 0 : sdk.login(), [sdk]);
    const { isLoggedIn } = sdk !== null && sdk !== void 0 ? sdk : {};
    return { isLoggedIn, userInfo, login, logout };
};
exports.useOpenLogin = useOpenLogin;
const useEthersRPC = () => {
    const { sdk } = (0, react_1.useContext)(exports.OpenLoginContext);
    const getChainId = (0, react_1.useCallback)(async () => sdk === null || sdk === void 0 ? void 0 : sdk.getChainId(), [sdk]);
    const getAccounts = (0, react_1.useCallback)(async () => sdk === null || sdk === void 0 ? void 0 : sdk.getAccounts(), [sdk]);
    const getBalance = (0, react_1.useCallback)(async () => sdk === null || sdk === void 0 ? void 0 : sdk.getBalance(), [sdk]);
    const getPrivateKey = (0, react_1.useCallback)(async () => sdk === null || sdk === void 0 ? void 0 : sdk.getPrivateKey(), [sdk]);
    const signMessage = (0, react_1.useCallback)(async (originalMessage) => {
        return sdk === null || sdk === void 0 ? void 0 : sdk.signMessage(originalMessage);
    }, [sdk]);
    const sendTransaction = (0, react_1.useCallback)(async (destination, amount) => {
        return sdk === null || sdk === void 0 ? void 0 : sdk.sendTransaction(destination, amount);
    }, [sdk]);
    return {
        getChainId,
        getAccounts,
        getBalance,
        getPrivateKey,
        signMessage,
        sendTransaction,
    };
};
exports.useEthersRPC = useEthersRPC;
//# sourceMappingURL=react.js.map