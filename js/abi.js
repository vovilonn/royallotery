/* eslint quote-props: ["error", "consistent-as-needed"] */

export const CONTRACT_ABI =[
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint32",
                name: "ID",
                type: "uint32"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "time",
                type: "uint256"
            }
        ],
        name: "LotteryEndTime",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address"
            }
        ],
        name: "OwnershipTransferred",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "user",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint32",
                name: "amount",
                type: "uint32"
            },
            {
                indexed: false,
                internalType: "uint32",
                name: "ID",
                type: "uint32"
            }
        ],
        name: "buyTicket",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "user",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint32",
                name: "amount",
                type: "uint32"
            },
            {
                indexed: false,
                internalType: "uint32",
                name: "ID",
                type: "uint32"
            }
        ],
        name: "increaseChances",
        type: "event"
    },
    {
        inputs: [],
        name: "ID",
        outputs: [
            {
                internalType: "uint32",
                name: "",
                type: "uint32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint32",
                name: "",
                type: "uint32"
            }
        ],
        name: "LotteryId",
        outputs: [
            {
                internalType: "uint32",
                name: "entrances",
                type: "uint32"
            },
            {
                internalType: "uint256",
                name: "startTime",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "endTime",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "pot",
                type: "uint256"
            },
            {
                internalType: "bool",
                name: "ended",
                type: "bool"
            },
            {
                internalType: "bool",
                name: "jackPot",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        name: "UserInfo",
        outputs: [
            {
                internalType: "uint32",
                name: "LotterysAmount",
                type: "uint32"
            },
            {
                internalType: "uint32",
                name: "lastLotteryId",
                type: "uint32"
            },
            {
                internalType: "uint32",
                name: "increaseChanceTickets",
                type: "uint32"
            },
            {
                internalType: "uint256",
                name: "balance",
                type: "uint256"
            },
            {
                internalType: "bool",
                name: "registred",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "_hashedMessage",
                type: "bytes32"
            },
            {
                internalType: "uint8",
                name: "_v",
                type: "uint8"
            },
            {
                internalType: "bytes32",
                name: "_r",
                type: "bytes32"
            },
            {
                internalType: "bytes32",
                name: "_s",
                type: "bytes32"
            }
        ],
        name: "VerifyMessage",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "pure",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_inviter",
                type: "address"
            }
        ],
        name: "accountRegistration",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint32",
                name: "amount",
                type: "uint32"
            },
            {
                internalType: "uint32",
                name: "_ID",
                type: "uint32"
            }
        ],
        name: "buyTickets",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_endTime",
                type: "uint256"
            },
            {
                internalType: "uint32",
                name: "_ID",
                type: "uint32"
            }
        ],
        name: "changeEndTimeLottery",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_user",
                type: "address"
            }
        ],
        name: "changeInfluencer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_jackPot",
                type: "address"
            }
        ],
        name: "changeJackPotAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_team",
                type: "address"
            }
        ],
        name: "changeTeamAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256"
            }
        ],
        name: "changeTicketPrice",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "checkActiveLottery",
        outputs: [
            {
                internalType: "uint32[]",
                name: "Id",
                type: "uint32[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
                type: "address"
            }
        ],
        name: "checkIncreaseChances",
        outputs: [
            {
                internalType: "uint32",
                name: "IncreaseTickets",
                type: "uint32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "checkJackPotAddress",
        outputs: [
            {
                internalType: "address",
                name: "JackPot",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_user",
                type: "address"
            }
        ],
        name: "checkRefferalBalance",
        outputs: [
            {
                internalType: "uint256",
                name: "amountInWei",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_user",
                type: "address"
            }
        ],
        name: "checkRefferals",
        outputs: [
            {
                internalType: "address[]",
                name: "level1",
                type: "address[]"
            },
            {
                internalType: "address[]",
                name: "level2",
                type: "address[]"
            },
            {
                internalType: "address[]",
                name: "level3",
                type: "address[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_user",
                type: "address"
            }
        ],
        name: "checkRegistration",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
                type: "address"
            },
            {
                internalType: "uint32",
                name: "_ID",
                type: "uint32"
            }
        ],
        name: "checkTicketIDs",
        outputs: [
            {
                internalType: "uint32[]",
                name: "ticketID",
                type: "uint32[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint32",
                name: "_ID",
                type: "uint32"
            }
        ],
        name: "checkWinners",
        outputs: [
            {
                internalType: "address[]",
                name: "win1",
                type: "address[]"
            },
            {
                internalType: "address[]",
                name: "win10",
                type: "address[]"
            },
            {
                internalType: "address[]",
                name: "winTicketX2",
                type: "address[]"
            },
            {
                internalType: "address[]",
                name: "winTicket",
                type: "address[]"
            },
            {
                internalType: "address[]",
                name: "winHalfTicket",
                type: "address[]"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint32",
                name: "_ID",
                type: "uint32"
            }
        ],
        name: "endLottery",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint32",
                name: "amount",
                type: "uint32"
            },
            {
                internalType: "uint32",
                name: "_ID",
                type: "uint32"
            }
        ],
        name: "increaseChance",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "receiveWithdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "refferalSystemBalance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint32",
                name: "_ID",
                type: "uint32"
            }
        ],
        name: "setJackPot",
        outputs: [],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_startTime",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "_endTime",
                type: "uint256"
            }
        ],
        name: "setLottery",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            },
            {
                internalType: "uint32",
                name: "",
                type: "uint32"
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        name: "ticketIDs",
        outputs: [
            {
                internalType: "uint32",
                name: "",
                type: "uint32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "ticketPrice",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address"
            }
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        name: "userRefferals",
        outputs: [
            {
                internalType: "address",
                name: "inviter",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "balance",
                type: "uint256"
            },
            {
                internalType: "bool",
                name: "influencer",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "withdrawRefferalsIncome",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        stateMutability: "payable",
        type: "receive"
    }
]