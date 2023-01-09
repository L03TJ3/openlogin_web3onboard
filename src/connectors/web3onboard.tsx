import React, { useCallback} from 'react'
import { useConnectWallet, useSetChain } from '@web3-onboard/react'

export function SwitchChain(): JSX.Element {
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
  console.log({connectedChain})
  const switchChain = useCallback(() => {
    void setChain({ chainId: chains[1].id })
  }, [setChain])

  return <button onClick={switchChain}>{`Switch chain`}</button>
}

export function OnboardConnectButton(): JSX.Element {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
    if (wallet) {
        return <SwitchChain />
    }

    return <button onClick={() => connect()}>{`Connect to a wallet`}</button>
}
