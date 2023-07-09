export const isMainnet = () => process.env.ENVIRONMENT === 'mainnet';


export const getBundlrProviderURL = () => isMainnet() ? process.env.NEXT_PUBLIC_POLYGON_PROD_PROVIDER_URL : process.env.NEXT_PUBLIC_POLYGON_DEV_PROVIDER_URL;