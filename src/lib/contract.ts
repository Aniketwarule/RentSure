export const contract = {
	address: "0x9b02E2e7674d784Eb1F140b1F378F298d99Ec376",
	abi: [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "agreementId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "terminationDate",
				"type": "uint256"
			}
		],
		"name": "AgreementTerminated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_propertyId",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "_tenantAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_agreementDocHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_startDate",
				"type": "uint256"
			}
		],
		"name": "createRentalAgreement",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "agreementId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "initiator",
				"type": "address"
			}
		],
		"name": "DisputeRaised",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "agreementId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "newDocHash",
				"type": "string"
			}
		],
		"name": "DocumentUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "agreementId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum RentalAgreement.InspectionStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "evidenceHash",
				"type": "string"
			}
		],
		"name": "InspectionPerformed",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_propertyHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_rentAmountInFiat",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_rentAmountInCrypto",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_securityDeposit",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_rentDueDay",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_leaseDuration",
				"type": "uint256"
			},
			{
				"internalType": "enum RentalAgreement.PaymentMethod",
				"name": "_paymentMethod",
				"type": "uint8"
			}
		],
		"name": "listProperty",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_agreementId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_month",
				"type": "uint256"
			}
		],
		"name": "payRentCrypto",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_agreementId",
				"type": "uint256"
			}
		],
		"name": "paySecurityDepositCrypto",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "propertyId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "landlord",
				"type": "address"
			}
		],
		"name": "PropertyListed",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_agreementId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_evidenceHash",
				"type": "string"
			}
		],
		"name": "raiseDispute",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_agreementId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_isMovingIn",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_passed",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "_evidenceHash",
				"type": "string"
			}
		],
		"name": "recordInspection",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_agreementId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_month",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_externalPaymentId",
				"type": "string"
			}
		],
		"name": "recordRentFiat",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_agreementId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_externalPaymentId",
				"type": "string"
			}
		],
		"name": "recordSecurityDepositFiat",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "agreementId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "paymentDate",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum RentalAgreement.PaymentMethod",
				"name": "method",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "externalPaymentId",
				"type": "string"
			}
		],
		"name": "RentPaid",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "agreementId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "propertyId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "tenant",
				"type": "address"
			}
		],
		"name": "RentalAgreementCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_agreementId",
				"type": "uint256"
			}
		],
		"name": "returnSecurityDeposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "agreementId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "enum RentalAgreement.PaymentMethod",
				"name": "method",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "externalPaymentId",
				"type": "string"
			}
		],
		"name": "SecurityDepositPaid",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "agreementId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "SecurityDepositReturned",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_agreementId",
				"type": "uint256"
			}
		],
		"name": "terminateAgreement",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_agreementId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_newDocHash",
				"type": "string"
			}
		],
		"name": "updateAgreementDocument",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_agreementId",
				"type": "uint256"
			}
		],
		"name": "getAgreementDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "propertyId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "agreementStartDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "agreementEndDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lastPaymentDate",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "agreementDocHash",
				"type": "string"
			},
			{
				"internalType": "enum RentalAgreement.AgreementStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "enum RentalAgreement.InspectionStatus",
				"name": "moveInInspection",
				"type": "uint8"
			},
			{
				"internalType": "enum RentalAgreement.InspectionStatus",
				"name": "moveOutInspection",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "securityDepositPaid",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "securityDepositReturned",
				"type": "bool"
			},
			{
				"internalType": "enum RentalAgreement.PaymentMethod",
				"name": "securityDepositMethod",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_propertyId",
				"type": "uint256"
			}
		],
		"name": "getCurrentTenant",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_agreementId",
				"type": "uint256"
			}
		],
		"name": "getEvidenceHashes",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_agreementId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_month",
				"type": "uint256"
			}
		],
		"name": "getPaymentDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "enum RentalAgreement.PaymentMethod",
				"name": "method",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "externalPaymentId",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "paid",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_propertyId",
				"type": "uint256"
			}
		],
		"name": "getPropertyDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "propertyHash",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "landlord",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "rentAmountInFiat",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rentAmountInCrypto",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "securityDeposit",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rentDueDay",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "leaseDuration",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_agreementId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_month",
				"type": "uint256"
			}
		],
		"name": "isRentPaid",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "properties",
		"outputs": [
			{
				"internalType": "string",
				"name": "propertyHash",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "landlord",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "rentAmountInCrypto",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rentAmountInFiat",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "securityDeposit",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rentDueDay",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "leaseDuration",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "propertyCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "propertyTenants",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rentalAgreementCounter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "rentalRecords",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "propertyId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "agreementStartDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "agreementEndDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lastPaymentDate",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "agreementDocHash",
				"type": "string"
			},
			{
				"internalType": "enum RentalAgreement.AgreementStatus",
				"name": "status",
				"type": "uint8"
			},
			{
				"internalType": "enum RentalAgreement.InspectionStatus",
				"name": "moveInInspection",
				"type": "uint8"
			},
			{
				"internalType": "enum RentalAgreement.InspectionStatus",
				"name": "moveOutInspection",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "securityDepositPaid",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "securityDepositReturned",
				"type": "bool"
			},
			{
				"internalType": "enum RentalAgreement.PaymentMethod",
				"name": "securityDepositMethod",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "tenants",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "tenantAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "moveInDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lastPaymentDate",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "hasActiveRental",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
}