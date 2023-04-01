// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.8.1;
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";
contract Twitter {
    // twiit,mint,delete twit,update twit,likes,comments
    using Counters for Counters.Counter;
    Counters.Counter private twitId;

    struct Comments {
        address from;
        string comment;
        uint timestamps;
    }

    struct Post {
        address owner;
        uint256 id;
        string msg;
        uint timestamps;
        address[] likes;
    }
    mapping(uint256=>Post) public post;
    Post[] public posts;
   
    mapping(address=>uint256) comment;


    function getAllPosts() public view returns (Post[] memory) {
        Post[] memory postToSend = posts;
        return postToSend;
    }

    function createPost(uint timestamps, string memory message) public {
        uint256 newTwitId = twitId.current();
        twitId.increment();
       address[] memory likes;
        Post memory postToSend = Post({
            id: newTwitId,
            owner: msg.sender,
            timestamps: timestamps,
            likes: likes,
            msg: message
        });
        posts.push(postToSend);
  
        console.log("created");
    }

    function getMyPosts() public view returns (Post[] memory) {
        Post[] memory postToSend = new Post[](posts.length);
        uint counter = 0;
        for (uint256 index = 0; index < posts.length; index++) {
            if (posts[index].owner == msg.sender) {
                postToSend[counter] = posts[index];
            }
        }
        return postToSend;
    }

    function updatePost(uint256 id, Post memory object) public {
       Post memory as4;
       for (uint256 index = 0; index < posts.length; index++) {

            if (posts[index].id == id) {
                as4=posts[index];
                posts[index] = Post({
                    id: posts[index].id,
                    owner: msg.sender,
                    timestamps: object.timestamps,
                    likes:  posts[index].likes,
                    msg:object.msg
            });
        }
      
       
    }}
}