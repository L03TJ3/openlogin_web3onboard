/// <reference types="react-scripts" />

interface RequestArguments {
    method: string
    params?: unknown[] | object
}

declare module 'content-hash' {
    declare function decode(x: string): string
    declare function getCodec(x: string): string
}

declare module 'multihashes' {
    declare function decode(buff: Uint8Array): { code: number; name: string; length: number; digest: Uint8Array }
    declare function toB58String(hash: Uint8Array): string
}

type ArrayType<T> = T extends ArrayLike<infer I> ? I : never
