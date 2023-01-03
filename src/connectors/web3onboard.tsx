import React from 'react'
import { useConnectWallet } from '@web3-onboard/react'
import { onboard } from './index'

/**
 * Just a button to trigger the onboard connect modal.
 * any state updates after succesfully connecting are handled by useOnboardConnect (src/hooks/useActiveOnboard)
 * @returns Connect Button or Empty
 */

export function OnboardConnectButton(): JSX.Element {
  const wallets = onboard.state.get().wallets
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
    // const { i18n } = useLingui()
    if (wallet) {
        return <></>
    }

    return <button onClick={() => connect()}>{`Connect to a wallet`}</button>
}
