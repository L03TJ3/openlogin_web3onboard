// ** blocknative update ** //
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import { init } from '@web3-onboard/react'
import coinbaseWalletModule from '@web3-onboard/coinbase'
import web3authModule from '@web3-onboard/web3auth'
import LogoSmall from '../logosmall.png'
import torusModule from '@web3-onboard/torus'
import web3auth from './modules'
// ** blockNative update **//

// ** blocknative update ** //
const injectedBN = injectedModule({
  filter: {
      ['Binance Smart Wallet']: false,
      ['MetaMask']: true,
      ['Coinbase Wallet']: true,
      ['detected']: true,
      ['trust']: false,
      ['opera']: false,
      ['status']: false,
      ['alphawallet']: false,
      ['atoken']: false,
      ['bitpie']: false,
      ['blockwallet']: false,
      ['Brave']: false,
      ['dcent']: false,
      ['frame']: false,
      ['huobiwallet']: false,
      ['hyperpay']: false,
      ['imtoken']: false,
      ['liquality']: false,
      ['meetone']: false,
      ['ownbit']: false,
      ['mykey']: false,
      ['tokenpocket']: false,
      ['tp']: false,
      ['xdefi']: false,
      ['oneInch']: false,
      ['tokenary']: false,
      ['tally']: false,
  },
})

const walletConnectBN = walletConnectModule({
  bridge: 'https://bridge.walletconnect.org',
  qrcodeModalOptions: {
      mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar'],
  },
  // connectFirstChainId: true,
})

const torus = torusModule()

const coinbaseWalletSdk = coinbaseWalletModule()

// const zenGoBN = zenGoModule({
//   bridge: 'https://bridge.walletconnect.org',
//   qrcodeModalOptions: {
//       desktopLinks: ['zengo', 'metamask'],
//       mobileLinks: ['metamask', 'zengo'], // TODO: has to be tested on IOS, android does not show list
//   },
// })

const web3authBN = web3auth({
  clientId: 'BBX9aGV3Skcmye75qbVDoJDYshOjJl9lZI76jLwcIEM54OBmxfo2sqM4Qlbhe0602E_lN8S4G_0YfQlvWyxWtzc',
  modalConfig: {
    // loginMethods: {
    //   // label: 'Web3Auth',
    // }
  }
})

export const onboard = init({
  wallets: [web3authBN, injectedBN, walletConnectBN, coinbaseWalletSdk, web3authBN, torus],
  chains: [
      {
          id: '0xa4ec',
          token: 'CELO',
          label: 'Celo',
          rpcUrl: process.env.REACT_APP_CELO_RPC ?? 'https://rpc.ankr.com/celo',
      },
      {
          id: '0x1',
          token: 'ETH',
          label: 'Ethereum Mainnet',
          rpcUrl:
              process.env.REACT_APP_MAINNET_RPC ??
              'https://eth-mainnet.alchemyapi.io/v2/2kSbx330Sc8S3QRwD9nutr9XST_DfeJh',
      },
      {
          id: '0x7a',
          token: 'FUSE',
          label: 'Fuse Network',
          rpcUrl: process.env.REACT_APP_FUSE_RPC ?? 'https://rpc.fuse.io',
      },
  ],
  appMetadata: {
      name: 'GoodSwap',
      icon: LogoSmall,
      description: 'GoodDollar Swap Interface',
      recommendedInjectedWallets: [{ name: 'MetaMask', url: 'https://metamask.io' }],
  },
  accountCenter: {
      desktop: {
          enabled: false,
      },
      mobile: {
          enabled: false,
      },
  },
  i18n: {
      en: {
          connect: {
              selectingWallet: {
                  header: 'Connect Wallet',
                  sidebar: {
                      heading: '',
                      subheading: 'Select your wallet',
                      paragraph:
                          'Connecting your wallet is like “logging in” to Web3. Select your wallet from the options available.',
                  },
                  recommendedWalletsPart1: '{app} only supports',
                  recommendedWalletsPart2:
                      'on this platform. Please use or install one of the supported wallets to continue',
                  installWallet:
                      'You do not have any wallets installed that {app} supports, please use a supported wallet',
                  agreement: {
                      agree: 'I agree to the',
                      terms: 'Terms & Conditions',
                      and: 'and',
                      privacy: 'Privacy Policy',
                  },
              },
              connectingWallet: {
                  header: 'Connect Wallet',
                  sidebar: {
                      subheading: 'Approve Connection',
                      paragraph: 'Please approve the connection in your wallet and authorize access to continue.',
                  },
                  mainText: 'Connecting...',
                  paragraph: 'Make sure to select all accounts that you want to grant access to.',
                  rejectedText: 'Connection Rejected!',
                  rejectedCTA: 'Click here to try again',
                  primaryButton: 'Back to wallets',
                  previousConnection:
                      '{wallet} already has a pending connection request, please open the {wallet} app to login and connect.',
              },
              connectedWallet: {
                  header: 'Connect Wallet',
                  sidebar: {
                      subheading: 'Connection Successful!',
                      paragraph: 'Your wallet is now connected to {app}',
                  },
                  mainText: 'Connected',
              },
          },
          modals: {
              actionRequired: {
                  heading: 'Action required in {wallet}',
                  paragraph: 'Please switch the active account in your wallet.',
                  linkText: 'Learn more.',
                  buttonText: 'Okay',
              },
              switchChain: {
                  heading: 'Switch Chain',
                  paragraph1:
                      '{app} requires that you switch your wallet to the {nextNetworkName} network to continue.',
                  paragraph2:
                      '*Some wallets may not support changing networks. If you can not change networks in your wallet you may consider switching to a different wallet.',
              },
              confirmDisconnectAll: {
                  heading: 'Disconnect all Wallets',
                  description: 'Are you sure that you would like to disconnect all your wallets?',
                  confirm: 'Confirm',
                  cancel: 'Cancel',
              },
          },
          accountCenter: {
              connectAnotherWallet: 'Connect another Wallet',
              disconnectAllWallets: 'Disconnect all Wallets',
              currentNetwork: 'Current Network',
              appInfo: 'App Info',
              learnMore: 'Learn More',
              gettingStartedGuide: 'Getting Started Guide',
              smartContracts: 'Smart Contract(s)',
              explore: 'Explore',
              backToApp: 'Back to App',
              poweredBy: 'powered by',
              addAccount: 'Add Account',
              setPrimaryAccount: 'Set Primary Account',
              disconnectWallet: 'Disconnect Wallet',
              copyAddress: 'Copy Wallet address',
          },
          notify: {
              transaction: {
                  txRequest: 'Your transaction is waiting for you to confirm',
                  nsfFail: 'You have insufficient funds for this transaction',
                  txUnderpriced: 'The gas price for your transaction is too low, try a higher gas price',
                  txRepeat: 'This could be a repeat transaction',
                  txAwaitingApproval: 'You have a previous transaction waiting for you to confirm',
                  txConfirmReminder: 'Please confirm your transaction to continue',
                  txSendFail: 'You rejected the transaction',
                  txSent: 'Your transaction has been sent to the network',
                  txStallPending: 'Your transaction has stalled before it was sent, please try again',
                  txStuck: 'Your transaction is stuck due to a nonce gap',
                  txPool: 'Your transaction has started',
                  txStallConfirmed: "Your transaction has stalled and hasn't been confirmed",
                  txSpeedUp: 'Your transaction has been sped up',
                  txCancel: 'Your transaction is being canceled',
                  txFailed: 'Your transaction has failed',
                  txConfirmed: 'Your transaction has succeeded',
                  txError: 'Oops something went wrong, please try again',
                  txReplaceError: 'There was an error replacing your transaction, please try again',
              },
              watched: {
                  txPool: 'Your account is {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}',
                  txSpeedUp:
                      'Transaction for {formattedValue} {asset} {preposition} {counterpartyShortened} has been sped up',
                  txCancel:
                      'Transaction for {formattedValue} {asset} {preposition} {counterpartyShortened} has been canceled',
                  txConfirmed:
                      'Your account successfully {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}',
                  txFailed:
                      'Your account failed to {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}',
                  txStuck: 'Your transaction is stuck due to a nonce gap',
              },
              time: {
                  minutes: 'min',
                  seconds: 'sec',
              },
          },
      },
  },
})