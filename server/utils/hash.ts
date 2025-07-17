import { createHash } from 'crypto';

export function getHash(params: Record<string, any>, appSecret: string): string {
    if (!params || typeof params !== 'object') {
        throw new Error('Invalid params: must be an object');
    }
    if (!appSecret || typeof appSecret !== 'string') {
        throw new Error('Invalid appSecret: must be a non-empty string');
    }

    const sortedParams = Object.keys(params)
        .filter(key => params[key] !== undefined && params[key] !== null && key !== 'hash')
        .sort()
        .map(key => `${key}=${params[key]}`)
        .join('&');
    
    const stringSignTemp = sortedParams + appSecret;
    return createHash('md5').update(stringSignTemp).digest('hex');
}