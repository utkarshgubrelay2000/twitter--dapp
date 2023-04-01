// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
contract Transaction {
    using Counters for  Counters.Counter;
    Counters.Counter private _requestIds;
    Counters.Counter private _tokenIds;
 
   mapping(address => uint) public balances;
    
    struct Trans {
        uint256 id;
        address from;
        address to;
        uint256 amount;
        uint date;
    }
      struct Request {
        uint256 id;
        address from;
        address to;
        uint amount;
        uint date;
  
    }
    Trans[] track;
    Request[] requests;

    function addFunds() public payable {
        balances[msg.sender] += msg.value;
    }

    event TrasactionDone(address to, address from, uint amount);

    function sendAmount(address to, uint amount,uint timestamps) public payable {
        uint balce = balances[msg.sender];
        if (balce > amount) {
            payable(to).transfer(amount);
            _tokenIds.increment();
       uint256 newTokenId = _tokenIds.current();
            Trans memory addTrac= Trans({id:newTokenId,from:msg.sender,to:to,amount:amount,date:timestamps});
            track.push(addTrac);
        }
    }
    function RequestAmount(address to, uint amount,uint timestamps) public  {

            uint date=timestamps;
                  _requestIds.increment();
        uint256 newTokenId = _requestIds.current();
       
            Request memory addTrac= Request({id:newTokenId,from:msg.sender,to:to,amount:amount,date:date});
            requests.push(addTrac);
        
    }

    function myBalance()public view returns(uint){
      uint balance=balances[msg.sender];
      return balance;
    }
    function MyTransactions() public view returns(Trans[] memory){
     Trans[] memory transactions=new Trans[](track.length);
     uint counter=0;
     for (uint256 index = 0; index < track.length; index++) {
        if(track[index].from==msg.sender){
            transactions[counter]=track[index];
            counter++;
        }
        
     }
     return transactions;
    }

     function MyRequest() public view returns(Request[] memory){
     Request[] memory myrequests=new Request[](requests.length);
     uint256 counter=0;
     console.log("Hello 1");

        Request memory frosm=requests[0];
        console.log(frosm.from,msg.sender);
     for (uint256 index = 0; index < requests.length; index++) {
        if(requests[index].from==msg.sender){
            myrequests[counter]=requests[index];
            counter++;
        }
        
    }
     console.log("Hello");
     return myrequests;
    }
     function ForRequest() public view returns(Request[] memory){
     Request[] memory myrequests;
     uint counter=0;
     for (uint256 index = 0; index < requests.length; index++) {
        if(track[index].to==msg.sender){
            myrequests[counter]=requests[index];
            counter++;
        }
        
     }
     return myrequests;
    }
}
///