import Web3 from "web3";

var address = "0x5E9FBA6c8d4EAFD7e83e1FE88cfA6a53f8957370";
var abi = [
    {
        inputs: [
            {
                internalType: "string",
                name: "voterId",
                type: "string",
            },
            {
                internalType: "string",
                name: "votedTo",
                type: "string",
            },
        ],
        name: "giveVote",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "candidate",
                type: "string",
            },
        ],
        name: "getVotes",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];

var web3 = new Web3(window.ethereum);
var contract = new web3.eth.Contract(abi, address);

export const getVotes = (candidate) => {
    return contract.methods.getVotes(candidate).call();
};

export const giveVote = async (voterId, voteTo) => {
    const accounts = await web3.eth.getAccounts();
    return contract.methods
        .giveVote(voterId, voteTo)
        .send({ from: accounts[0] });
};

export const isVoted = (voterId, voteTo) => {
    return contract.methods.giveVote(voterId, voteTo).call();
};
