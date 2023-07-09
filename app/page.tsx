'use client'

import { WebBundlr } from '@bundlr-network/client';
import { ContentFocus, ProfileOwnedByMe, useActiveProfile, useCreatePost } from '@lens-protocol/react-web';
import Link from 'next/link'
import { useEffect } from 'react'
import { getWalletClient } from '@wagmi/core'
import Authentication from '~/components/Authentication'
import useEthersWalletClient from '~/hooks/useEthersWalletClient';

export default function Home() {

  const { data: wallet, loading } = useActiveProfile();

  return (
    <div className='p-20'>
      <h1 className='text-5xl'>Shortly</h1>
      <Authentication />
      {wallet && !loading && (
        <Active data={wallet} />
      )}
    </div>
  )
}


function Active({ data }: { data: ProfileOwnedByMe }) {

  async function uploadJson(data: unknown) {
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      const json = await response.json()
      return json.url
    } catch (err) {
      console.log({ err })
    }
  }

  const { execute: create, error, isPending } = useCreatePost({ publisher: data, upload: uploadJson });
  useEffect(() => {

    const share = async () => {
      const response = await create({
        content: 'https://github.com',
        contentFocus: ContentFocus.LINK,
        locale: 'en',
      });

      console.log(response)
    }

    if (!isPending) {
      share()
    }

  }, [])

  // useEffect(() => {
  //   async function upload() {
  //     // const walletClient = await getWalletClient()
  //     const bundlr = new WebBundlr("https://node2.bundlr.network", "matic", signer, {
  //       providerUrl: 'https://rpc.ankr.com/polygon_mumbai'
  //     })
  //     await bundlr.ready()
  //     const dataToUpload = {
  //        url
  // };
  //     const response = await bundlr.upload(dataToUpload,{
  //       tags: [{ name: "Content-Type", value: "application/json" }]
  //     });
  //     console.log(response)
  //   }

  //   if (!isLoading) {
  //     upload()
  //   }
  // }, [isLoading, signer])

  return <div>
    Active Profile
  </div>
}
