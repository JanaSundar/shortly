import { WebBundlr } from "@bundlr-network/client";
import { NextRequest, NextResponse } from "next/server";
import { getBundlrProviderURL } from "~/utils/generic";

export async function POST(req: NextRequest) {
    const data = await req.json();

    try {
        const bundlr = new WebBundlr(process.env.NEXT_PUBLIC_BUNDLR_URL!, process.env.NEXT_PUBLIC_BUNDLR_CURRENCY!)
        await bundlr.ready()

        const response = await bundlr.upload(JSON.stringify(data), {
            tags: [{ name: "Content-Type", value: "application/json" }]
        });

        return NextResponse.json({
            url: `https://arweave.net/${response.id}`
        }, {
            status: 201
        })
    } catch (err) {
        return NextResponse.json({
            message: err ?? 'Error occured while saving the url'
        }, {
            status: 501
        })
    }
}