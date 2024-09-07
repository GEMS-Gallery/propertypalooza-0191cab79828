export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Listing = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'description' : IDL.Text,
    'image' : IDL.Text,
    'price' : IDL.Nat,
  });
  return IDL.Service({
    'addListing' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Text, IDL.Text],
        [Result],
        [],
      ),
    'getListings' : IDL.Func([], [IDL.Vec(Listing)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
