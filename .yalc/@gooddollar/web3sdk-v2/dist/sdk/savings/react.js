"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStakerInfo = exports.useSavingsStats = exports.useSavingsFunctions = exports.useSavingsBalance = void 0;
const core_1 = require("@usedapp/core");
const ethers_1 = require("ethers");
const react_1 = require("react");
const useRefreshOrNever_1 = __importDefault(require("../../hooks/useRefreshOrNever"));
const react_2 = require("../base/react");
const constants_1 = require("../constants");
function useSavingsBalance(refresh = "never", requiredChainId) {
    const refreshOrNever = (0, useRefreshOrNever_1.default)(refresh);
    const { account } = (0, core_1.useEthers)();
    const gooddollar = (0, react_2.useGetContract)("GoodDollar", true, "savings");
    const gdStaking = (0, react_2.useGetContract)("GoodDollarStaking", true, "savings");
    const results = (0, core_1.useCalls)([
        {
            contract: gooddollar,
            method: "balanceOf",
            args: [account]
        },
        {
            contract: gdStaking,
            method: "getSavings",
            args: [account]
        }
    ], {
        refresh: refreshOrNever,
        chainId: requiredChainId
    });
    const [balance = { value: 0, error: undefined }, sBalance = { value: 0, error: undefined }] = results;
    return { g$Balance: balance, savingsBalance: sBalance };
}
exports.useSavingsBalance = useSavingsBalance;
const useSavingsFunctions = () => {
    const gooddollar = (0, react_2.useGetContract)("GoodDollar", false, "savings");
    const gdStaking = (0, react_2.useGetContract)("GoodDollarStaking", false, "savings");
    const { state: transferState, send: sendTransfer } = (0, core_1.useContractFunction)(gooddollar, "transferAndCall", {
        transactionName: "Transfer to savings"
    });
    const { state: withdrawState, send: sendWithdraw } = (0, core_1.useContractFunction)(gdStaking, "withdrawStake", {
        transactionName: "Withdraw from savings"
    });
    const { state: claimState, send: sendClaim } = (0, core_1.useContractFunction)(gdStaking, "withdrawRewards", {
        transactionName: "Withdraw rewards from savings"
    });
    const transfer = (0, react_1.useCallback)((amount) => {
        const callData = ethers_1.ethers.constants.HashZero;
        return sendTransfer(gdStaking.address, amount, callData);
    }, [sendTransfer, gdStaking]);
    const withdraw = (0, react_1.useCallback)(async (amount, address) => {
        const shares = address ? await gdStaking.sharesOf(address) : await gdStaking.amountToShares(amount); // sharesOf used to withdraw full amount
        return sendWithdraw(shares);
    }, [sendWithdraw]);
    const claim = (0, react_1.useCallback)(() => sendClaim(), [sendClaim]);
    return { transfer, withdraw, claim, transferState, withdrawState, claimState };
};
exports.useSavingsFunctions = useSavingsFunctions;
const useSavingsStats = (requiredChainId, refresh = "never") => {
    var _a, _b, _c, _d, _e;
    const refreshOrNever = (0, useRefreshOrNever_1.default)(refresh);
    const { chainId, defaultEnv } = (0, react_2.useGetEnvChainId)(requiredChainId);
    const gdStaking = (0, react_2.useGetContract)("GoodDollarStaking", true, "savings", chainId);
    const results = (0, core_1.useCalls)([
        {
            contract: gdStaking,
            method: "stats",
            args: []
        },
        {
            contract: gdStaking,
            method: "getRewardsPerBlock",
            args: []
        },
        {
            contract: gdStaking,
            method: "numberOfBlocksPerYear",
            args: []
        }
    ], { refresh: refreshOrNever, chainId: chainId });
    const globalStats = {
        totalStaked: undefined,
        totalRewardsPaid: undefined,
        apy: undefined
    };
    if ((_a = results[0]) === null || _a === void 0 ? void 0 : _a.error) {
        // one fails, all fails
        const errMessages = [];
        for (let i = 0; i < results.length; i++) {
            errMessages.push((_b = results[i]) === null || _b === void 0 ? void 0 : _b.error);
        }
        return {
            stats: undefined,
            error: errMessages
        };
    }
    if (results[0]) {
        const [, totalStaked, totalRewardsPaid] = (_c = results[0]) === null || _c === void 0 ? void 0 : _c.value; // eslint-disable-line no-unsafe-optional-chaining
        const staked = core_1.CurrencyValue.fromString((0, constants_1.G$)(chainId, defaultEnv), totalStaked.toString());
        const rewardsPaid = core_1.CurrencyValue.fromString((0, constants_1.G$)(chainId, defaultEnv), totalRewardsPaid.toString());
        globalStats.totalStaked = staked;
        globalStats.totalRewardsPaid = rewardsPaid;
    }
    if (results[1] && results[2]) { // eslint-disable-line no-unsafe-optional-chaining
        const { _gdInterestRatePerBlock: gdIrpb } = (_d = results[1]) === null || _d === void 0 ? void 0 : _d.value; // eslint-disable-line no-unsafe-optional-chaining
        const numberOfBlocksPerYear = (_e = results[2]) === null || _e === void 0 ? void 0 : _e.value;
        const apy = (Math.pow(gdIrpb / 1e18, numberOfBlocksPerYear) - 1) * 100;
        globalStats.apy = apy;
    }
    return {
        stats: globalStats,
        error: undefined
    };
};
exports.useSavingsStats = useSavingsStats;
const useStakerInfo = (requiredChainId, refresh = "never", account) => {
    var _a, _b, _c, _d;
    const refreshOrNever = (0, useRefreshOrNever_1.default)(refresh);
    const { chainId, defaultEnv } = (0, react_2.useGetEnvChainId)(requiredChainId);
    const contract = (0, react_2.useGetContract)("GoodDollarStaking", true, "savings", chainId);
    const results = (0, core_1.useCalls)([
        {
            contract: contract,
            method: "getUserPendingReward(address)",
            args: [account]
        },
        {
            contract: contract,
            method: "principle",
            args: [account]
        }
    ], { refresh: refreshOrNever, chainId: chainId });
    const stakerInfo = {
        claimable: undefined,
        principle: undefined
    };
    if ((_a = results[0]) === null || _a === void 0 ? void 0 : _a.error) {
        const errMessages = [];
        for (let i = 0; i < results.length; i++) {
            errMessages.push((_b = results[i]) === null || _b === void 0 ? void 0 : _b.error);
        }
        return {
            stats: undefined,
            error: errMessages
        };
    }
    if (results[0]) { // eslint-disable-line no-unsafe-optional-chaining
        const [goodReward, g$Reward] = (_c = results[0]) === null || _c === void 0 ? void 0 : _c.value; // eslint-disable-line no-unsafe-optional-chaining
        const claimableRewards = {
            g$Reward: core_1.CurrencyValue.fromString((0, constants_1.G$)(chainId, defaultEnv), g$Reward.toString()),
            goodReward: core_1.CurrencyValue.fromString((0, constants_1.GOOD)(chainId, defaultEnv), goodReward.toString())
        };
        stakerInfo.claimable = claimableRewards;
    }
    if (results[1]) {
        const [principle] = (_d = results[1]) === null || _d === void 0 ? void 0 : _d.value; // eslint-disable-line no-unsafe-optional-chaining
        const deposit = core_1.CurrencyValue.fromString((0, constants_1.G$)(chainId, defaultEnv), principle.toString());
        stakerInfo.principle = deposit;
    }
    return {
        stats: stakerInfo,
        error: undefined
    };
};
exports.useStakerInfo = useStakerInfo;
//# sourceMappingURL=react.js.map