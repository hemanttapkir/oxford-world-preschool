import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";

actor {
  type Program = {
    #playgroup;
    #nursery;
    #juniorKg;
  };

  type Branch = {
    #wadgaonSheri;
    #lohegaon;
  };

  type Inquiry = {
    parentName : Text;
    childName : Text;
    childAge : Nat;
    phoneNumber : Text;
    email : Text;
    preferredProgram : Program;
    preferredBranch : Branch;
    message : Text;
  };

  let inquiries = Map.empty<Principal, Inquiry>();

  public shared ({ caller }) func submitInquiry(
    parentName : Text,
    childName : Text,
    childAge : Nat,
    phoneNumber : Text,
    email : Text,
    preferredProgram : Program,
    preferredBranch : Branch,
    message : Text,
  ) : async () {
    if (inquiries.containsKey(caller)) { Runtime.trap("Inquiry already submitted from this principal. ") };
    let inquiry : Inquiry = {
      parentName;
      childName;
      childAge;
      phoneNumber;
      email;
      preferredProgram;
      preferredBranch;
      message;
    };
    inquiries.add(caller, inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    inquiries.values().toArray();
  };
};
