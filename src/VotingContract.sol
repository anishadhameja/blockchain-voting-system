// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Vote {
    struct VoterDetail {
        string voterId;
        string votedTo;
        bool isVoted;
    }

    mapping(string => uint256) private votes;
    mapping(string => VoterDetail) private votingMachine;

    function giveVote(string memory voterId, string memory votedTo)
        public
        returns (string memory)
    {
        if (votingMachine[voterId].isVoted == true) return "Already voted";

        votingMachine[voterId] = VoterDetail(voterId, votedTo, true);
        votes[votedTo] += 1;

        return "Voted successfully";
    }

    function getVotes(string memory candidate) public view returns (uint256) {
        return votes[candidate];
    }
}
