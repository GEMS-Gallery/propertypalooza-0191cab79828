import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Time "mo:base/Time";

actor {
  type User = {
    name: Text;
    handle: Text;
    avatar: Text;
  };

  type Tweet = {
    id: Nat;
    text: Text;
    user: User;
    likes: Nat;
    retweets: Nat;
    timestamp: Time.Time;
  };

  stable var tweets : [Tweet] = [];
  stable var nextId : Nat = 0;

  public query func getTweets() : async [Tweet] {
    Array.reverse(tweets)
  };

  public func createTweet(text: Text, userName: Text, userHandle: Text, userAvatar: Text) : async Result.Result<Nat, Text> {
    let newTweet : Tweet = {
      id = nextId;
      text = text;
      user = {
        name = userName;
        handle = userHandle;
        avatar = userAvatar;
      };
      likes = 0;
      retweets = 0;
      timestamp = Time.now();
    };
    tweets := Array.append([newTweet], tweets);
    nextId += 1;
    #ok(newTweet.id)
  };

  public func likeTweet(id: Nat) : async Result.Result<(), Text> {
    let index = Array.indexOf<Tweet>({ id = id; text = ""; user = { name = ""; handle = ""; avatar = "" }; likes = 0; retweets = 0; timestamp = 0 }, tweets, func(a, b) { a.id == b.id });
    switch (index) {
      case (null) { #err("Tweet not found") };
      case (?i) {
        let updatedTweet = {
          id = tweets[i].id;
          text = tweets[i].text;
          user = tweets[i].user;
          likes = tweets[i].likes + 1;
          retweets = tweets[i].retweets;
          timestamp = tweets[i].timestamp;
        };
        tweets := Array.tabulate<Tweet>(tweets.size(), func (j) {
          if (j == i) { updatedTweet } else { tweets[j] }
        });
        #ok()
      };
    }
  };

  public func retweetTweet(id: Nat) : async Result.Result<(), Text> {
    let index = Array.indexOf<Tweet>({ id = id; text = ""; user = { name = ""; handle = ""; avatar = "" }; likes = 0; retweets = 0; timestamp = 0 }, tweets, func(a, b) { a.id == b.id });
    switch (index) {
      case (null) { #err("Tweet not found") };
      case (?i) {
        let updatedTweet = {
          id = tweets[i].id;
          text = tweets[i].text;
          user = tweets[i].user;
          likes = tweets[i].likes;
          retweets = tweets[i].retweets + 1;
          timestamp = tweets[i].timestamp;
        };
        tweets := Array.tabulate<Tweet>(tweets.size(), func (j) {
          if (j == i) { updatedTweet } else { tweets[j] }
        });
        #ok()
      };
    }
  };
}
