import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : bigint } |
  { 'err' : string };
export type Time = bigint;
export interface Tweet {
  'id' : bigint,
  'retweets' : bigint,
  'text' : string,
  'user' : User,
  'likes' : bigint,
  'timestamp' : Time,
}
export interface User { 'name' : string, 'handle' : string, 'avatar' : string }
export interface _SERVICE {
  'createTweet' : ActorMethod<[string, string, string, string], Result_1>,
  'getTweets' : ActorMethod<[], Array<Tweet>>,
  'likeTweet' : ActorMethod<[bigint], Result>,
  'retweetTweet' : ActorMethod<[bigint], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
