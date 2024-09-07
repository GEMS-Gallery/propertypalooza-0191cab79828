import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Listing {
  'id' : bigint,
  'title' : string,
  'description' : string,
  'image' : string,
  'price' : bigint,
}
export type Result = { 'ok' : bigint } |
  { 'err' : string };
export interface _SERVICE {
  'addListing' : ActorMethod<[string, bigint, string, string], Result>,
  'getListings' : ActorMethod<[], Array<Listing>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
