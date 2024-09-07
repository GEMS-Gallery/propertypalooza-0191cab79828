export const idlFactory = ({ IDL }) => {
  const Result_1 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const User = IDL.Record({
    'name' : IDL.Text,
    'handle' : IDL.Text,
    'avatar' : IDL.Text,
  });
  const Time = IDL.Int;
  const Tweet = IDL.Record({
    'id' : IDL.Nat,
    'retweets' : IDL.Nat,
    'text' : IDL.Text,
    'user' : User,
    'likes' : IDL.Nat,
    'timestamp' : Time,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  return IDL.Service({
    'createTweet' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [Result_1],
        [],
      ),
    'getTweets' : IDL.Func([], [IDL.Vec(Tweet)], ['query']),
    'likeTweet' : IDL.Func([IDL.Nat], [Result], []),
    'retweetTweet' : IDL.Func([IDL.Nat], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
