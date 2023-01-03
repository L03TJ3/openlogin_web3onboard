"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.G$ContractAddresses = exports.GOOD = exports.G$ = exports.Envs = exports.SupportedV2Networks = exports.SupportedChains = void 0;
const core_1 = require("@usedapp/core");
const deployment_json_1 = __importDefault(require("@gooddollar/goodprotocol/releases/deployment.json"));
/* List of supported chains for this sdk. */
var SupportedChains;
(function (SupportedChains) {
    SupportedChains[SupportedChains["MAINNET"] = 1] = "MAINNET";
    SupportedChains[SupportedChains["FUSE"] = 122] = "FUSE";
    SupportedChains[SupportedChains["CELO"] = 42220] = "CELO";
})(SupportedChains = exports.SupportedChains || (exports.SupportedChains = {}));
var SupportedV2Networks;
(function (SupportedV2Networks) {
    SupportedV2Networks[SupportedV2Networks["FUSE"] = 122] = "FUSE";
    SupportedV2Networks[SupportedV2Networks["CELO"] = 42220] = "CELO";
})(SupportedV2Networks = exports.SupportedV2Networks || (exports.SupportedV2Networks = {}));
// export const SUPPORTED_NETWORKS: Readonly<string[]> = ["CELO", "FUSE"]
exports.Envs = {
    production: {
        dappUrl: "https://wallet.gooddollar.org",
        identityUrl: "https://goodid.gooddollar.org",
        backend: "https://goodserver.gooddollar.org"
    },
    staging: {
        dappUrl: "https://goodqa.netlify.app",
        identityUrl: "https://goodid-qa.vercel.app",
        backend: "https://goodserver-qa.herokuapp.com"
    },
    development: {
        dappUrl: "https://gooddev.netlify.app",
        identityUrl: "https://goodid-dev.vercel.app",
        backend: "https://good-server.herokuapp.com"
    }
};
function G$(chainId, env) {
    const address = G$ContractAddresses("GoodDollar", env !== null && env !== void 0 ? env : "");
    return new core_1.Token("GoodDollar", "G$", chainId, address, 2);
}
exports.G$ = G$;
function GOOD(chainId, env) {
    const address = G$ContractAddresses("GReputation", env !== null && env !== void 0 ? env : "");
    return new core_1.Token("GDAO", "GOOD", chainId, address, 18);
}
exports.GOOD = GOOD;
function G$ContractAddresses(name, env) {
    if (!deployment_json_1.default[env]) {
        console.warn(`tokens: Unsupported chain ID ${env}`, env);
        env = env.includes("mainnet") ? env + "-mainnet" : env;
    }
    if (!deployment_json_1.default[env][name]) {
        throw new Error(`Inappropriate contract name ${name} in ${env}`);
    }
    return deployment_json_1.default[env][name];
}
exports.G$ContractAddresses = G$ContractAddresses;
//# sourceMappingURL=constants.js.map