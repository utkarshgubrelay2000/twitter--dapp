// SPDX-License-Identifier: UNLICENSED
pragma solidity >0.8.1;
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract Twitter {
    // twiit,mint,delete twit,update twit,likes,comments
    // reply model 
    using Counters for Counters.Counter;
    Counters.Counter private twitId;
    Counters.Counter private commentId;
    uint256 current=0;
    uint256 currentComment=0;

    struct Comments {
        address from;
        string comment;
        uint timestamps;
        uint256 id;
        uint256 twidId;
        string image;
    }

    struct Post {
        address owner;
        uint256 id;
        string msg;
        string image;
        uint timestamps;
        address[] likes;
    }
    mapping(uint256 => uint256) public post;
 //   mapping(twid => uint256) public post;
    Comments[] public comments;
    Post[] public posts;

    mapping(uint256 => uint256) comment;

    function getAllPosts() public view returns (Post[] memory) {
        Post[] memory postToSend = posts;
        return postToSend;
    }

    function createPost(uint timestamps, string memory message,string memory img) public {
        uint256 newTwitId = twitId.current();
        twitId.increment();
        address[] memory likes;
        Post memory postToSend = Post({
            id: newTwitId,
            owner: msg.sender,
            timestamps: timestamps,
            likes: likes,
            msg: message,
            image:img
        });
        post[newTwitId]=current;
        current++;
        posts.push(postToSend);

        console.log("created");
    }

     function createComment(uint timestamps, string memory message,string memory img,uint id) public {
        uint256 newTwitId = commentId.current();
        twitId.increment();
        Comments memory postToSend = Comments({
        from:msg.sender,
        comment:message,
        timestamps:timestamps,
        id:newTwitId,
        twidId:id,image:img
        });
        comment[newTwitId]=currentComment;
        currentComment++;
        comments.push(postToSend);

        console.log("created comment");
    }

    function getPostComments(uint id) public view returns (Comments[] memory) {
        Comments[] memory postToSend = new Comments[](comments.length);
        uint counter = 0;
        for (uint256 index = 0; index < comments.length; index++) {
            if (comments[index].twidId == id) {
                postToSend[counter] = comments[index];
            }
        }
        return postToSend;
    }

   function getMyPosts() public view returns (Post[] memory) {
    uint count = 0;
    for (uint i = 0; i < posts.length; i++) {
        if (posts[i].owner == msg.sender) {
            count++;
        }
    }
    Post[] memory myPosts = new Post[](count);
    uint j = 0;
    for (uint i = 0; i < posts.length; i++) {
        if (posts[i].owner == msg.sender) {
            myPosts[j] = posts[i];
            j++;
        }
    }
    return myPosts;
}


    function updatePost(uint256 id, Post memory object) public {
        Post memory as4;
        for (uint256 index = 0; index < posts.length; index++) {
            if (posts[index].id == id) {
                as4 = posts[index];
                posts[index] = Post({
                    id: posts[index].id,
                    owner: msg.sender,
                    timestamps: object.timestamps,
                    likes: posts[index].likes,
                    msg: object.msg,
                    image:object.image
                });
            }
        }
    }

    function addLikes(uint256 id) public {
        Post storage as4;
        for (uint256 index = 0; index < posts.length; index++) {
            if (posts[index].id == id) {
                as4 = posts[index];
                as4.likes.push(msg.sender);
                // as4.likes[lenght+1]=object;
            }
        }
    }

     function getPostById(uint256 id) public view returns(Post memory a) {
       uint256 ab=post[id];
       Post memory b=posts[ab];
       return b;   
    }

    function unlike(uint256 id) public {
      
         uint256 ab=post[id];
       Post storage as4=posts[ab];
      address[] memory likes;
   uint128 cou=0;
                for (uint256 i = 0; i < as4.likes.length; i++) {
                    if (msg.sender != as4.likes[i]) {
                        likes[cou]=as4.likes[i];
                    }
                }
                as4.likes=likes;
          console.log('Hellooo');
    }
}
