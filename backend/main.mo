import List "mo:base/List";

import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Result "mo:base/Result";

actor {
  type Listing = {
    id: Nat;
    title: Text;
    price: Nat;
    description: Text;
    image: Text;
  };

  stable var listings : [Listing] = [];
  stable var nextId : Nat = 0;

  public query func getListings() : async [Listing] {
    listings
  };

  public func addListing(title: Text, price: Nat, description: Text, image: Text) : async Result.Result<Nat, Text> {
    let newListing : Listing = {
      id = nextId;
      title = title;
      price = price;
      description = description;
      image = image;
    };
    listings := Array.append(listings, [newListing]);
    nextId += 1;
    #ok(newListing.id)
  };
}
