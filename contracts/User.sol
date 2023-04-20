// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.8.1;
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract User {
    // twiit,mint,delete twit,update twit,likes,comments
    // reply model
    using Counters for Counters.Counter;
    Counters.Counter private userId;
    uint256 users_index = 0;

    struct UserModal {
        address wallet;
        uint256 id;
        string user_name;
        string email;
        string image_url;
        bool isDeleted;
    }

    struct UserDTO {
        string user_name;
        string email;
        string image_url;
    }
    event UserSignup(address from, string name);
    UserModal[] all_users;
    mapping(address => uint256) public users;

    function signup(UserDTO memory object) public {
        uint256 tId = userId.current();

        for (uint256 index = 0; index < all_users.length; index++) {
            UserModal memory user = all_users[index];

            if (
                user.wallet == msg.sender &&
                keccak256(abi.encodePacked(user.email)) ==
                keccak256(abi.encodePacked(object.email))
            ) {
                revert("Email Found");
            }
        }
        UserModal memory newuser = UserModal({
            user_name: object.user_name,
            image_url: object.image_url,
            wallet: msg.sender,
            email: object.email,
            id: tId,
            isDeleted:false
        });
        emit UserSignup(msg.sender, object.user_name);
        userId.increment();
        users[msg.sender] = users_index;
        users_index++;
        all_users.push(newuser);
    }

    function signin(string memory email,address a) public view returns (UserModal memory b) {
        uint256 usersId = users[a];
console.log("heh",users[a]);
    if(usersId == 0){
    UserModal memory user = all_users[usersId];
    console.log(user.wallet != a,a,user.wallet);
    require(user.wallet == a, "Invalid user");
       require(   keccak256(abi.encodePacked(user.email)) ==
                keccak256(abi.encodePacked(email)), "Email Doesnt match");
    return user;
    }
else{

    UserModal memory user = all_users[usersId];
    require(user.wallet != address(0), "Invalid user");
    require(user.isDeleted != true, "User Deleted");
    require(   keccak256(abi.encodePacked(user.email)) ==
                keccak256(abi.encodePacked(email)), "Email Doesnt match");

    return user;
}
    }

 function getProfileDetails(address  a) public view returns (UserModal memory ) {
        uint256 usersId = users[a];

    require(usersId != 0, "User not found");

    UserModal memory user = all_users[usersId];
    require(user.wallet != address(0), "Invalid user");

    return user;
    }


    function update_profile(UserDTO memory object) public  returns(string memory)  {
        uint256 tId = users[msg.sender];
       
        if (tId != 0) {
           UserModal storage user = all_users[tId];

                user.user_name= object.user_name;
                user.email= object.email;
                user.image_url= object.image_url;
            return "don";
        } else if (tId == 0 && all_users.length == 1) {
           UserModal storage user = all_users[0];
    user.user_name = object.user_name;
    user.email = object.email;
    user.image_url = object.image_url;
            return "don";

        }
        else{
        return ("NOT FOUND");

        }
    }

    function get_all_users() public view returns (UserModal[] memory) {
        UserModal[] memory user = all_users;
        return user;
    }

    function delete_user() public  {
  uint256 usersId = users[msg.sender];

    require(usersId != 0, "User not found");

    UserModal storage user = all_users[usersId];
    user.isDeleted=true;
    }
}
