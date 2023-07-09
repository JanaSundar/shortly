import type { TypedDataDomain } from 'viem'
import { useWalletClient } from 'wagmi'

const useEthersWalletClient = (): {
    data: {
        signMessage: (message: string) => Promise<string>
    }
    isLoading: boolean
} => {
    const { data: signer, isLoading } = useWalletClient()
    const ethersWalletClient = {
        signMessage: async (message: string): Promise<string> => {
            const signature = await signer?.signMessage({ message })
            return signature ?? ''
        },
        getSigner: () => {
            return {
                ...signer,
                getAddress: () => signer?.account.address,
                _signTypedData: async (
                    domain: TypedDataDomain,
                    types: any,
                    message: any
                ) => {
                    message['Transaction hash'] =
                        '0x' + Buffer.from(message['Transaction hash']).toString('hex')
                    const r = await signer?.signTypedData({
                        domain,
                        message,
                        types,
                        primaryType: 'Bundlr'
                    })
                    return r
                }
            }
        },
    }

    const { signMessage, ...rest } = signer ?? {}

    const mergedWalletClient = {
        ...ethersWalletClient,
        ...rest
    }

    return { data: mergedWalletClient, isLoading }
}

export default useEthersWalletClient