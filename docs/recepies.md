
# Recipes

You can see and test the example queries and mutations below.
Click the "Run" button to run the query above it and see the response.
Click the "TypeScript", "Apollo Client", or "urql" buttons to see code examples.

- [Get an asset balance of an address](#get-an-asset-balance-of-an-address)
- [List all asset balances of an address](#list-all-asset-balances-of-an-address)
- [List all transactions from an address](#list-all-transactions-from-an-address)
- [List the latest transactions](#list-the-latest-transactions)
- [Get an asset balance of a contract](#get-an-asset-balance-of-a-contract)
- [List all asset balances of a contract](#list-all-asset-balances-of-a-contract)
- [List the latest blocks](#list-the-latest-blocks)
- [Get block information by height](#get-block-information-by-height)
- [List all messages owned by address](#list-all-messages-owned-by-address)
- [Dry run a transaction](#dry-run-a-transaction)
- [Submit a transaction](#submit-a-transaction)
- [More Examples](#more-examples)

## Get an asset balance of an address

```graphql
query Balance($address: Address, $assetId: AssetId) {
  balance(owner: $address, assetId: $assetId) {
    owner
    amount
    assetId
  }
}
```

## List all asset balances of an address

```graphql
query Balances($filter: BalanceFilterInput) {
  balances(filter: $filter, first: 5) {
    nodes {
      amount
      assetId
    }
  }
}
```

## List all transactions from an address

```graphql
query Transactions($address: Address) {
  transactionsByOwner(owner: $address, first: 5) {
    nodes {
      id
      inputs {
        __typename
        ... on InputCoin {
          owner
          utxoId
          amount
          assetId
        }
        ... on InputContract {
          utxoId
          contract {
            id
          }
        }
        ... on InputMessage {
          sender
          recipient
          amount
          data
        }
      }
      outputs {
        __typename
        ... on CoinOutput {
          to
          amount
          assetId
        }
        ... on ContractOutput {
          inputIndex
          balanceRoot
          stateRoot
        }
        ... on ChangeOutput {
          to
          amount
          assetId
        }
        ... on VariableOutput {
          to
          amount
          assetId
        }
        ... on ContractCreated {
          contract {
            id
          }
          stateRoot
        }
      }
      status {
        __typename
        ... on FailureStatus {
          reason
          programState {
            returnType
          }
        }
      }
    }
  }
}
```

## List the latest transactions

```graphql
query LatestTransactions {
  transactions(last: 5) {
    nodes {
      id
      inputs {
        __typename
        ... on InputCoin {
          owner
          utxoId
          amount
          assetId
        }
        ... on InputContract {
          utxoId
          contract {
            id
          }
        }
        ... on InputMessage {
          sender
          recipient
          amount
          data
        }
      }
      outputs {
        __typename
        ... on CoinOutput {
          to
          amount
          assetId
        }
        ... on ContractOutput {
          inputIndex
          balanceRoot
          stateRoot
        }
        ... on ChangeOutput {
          to
          amount
          assetId
        }
        ... on VariableOutput {
          to
          amount
          assetId
        }
        ... on ContractCreated {
          contract {
            id
          }
          stateRoot
        }
      }
      status {
        __typename
        ... on FailureStatus {
          reason
          programState {
            returnType
          }
        }
      }
    }
  }
}
```

## Get an asset balance of a contract

```graphql
query ContractBalance($contract: ContractId, $asset: AssetId) {
  contractBalance(contract: $contract, asset: $asset) {
    contract
    amount
    assetId
  }
}
```

## List all asset balances of a contract

```graphql
query ContractBalances($filter: ContractBalanceFilterInput!) {
  contractBalances(filter: $filter, first: 5) {
    nodes {
      amount
      assetId
    }
  }
}
```

## List the latest blocks

```graphql
query LatestBlocks {
  blocks(last: 5) {
    nodes {
      id
      transactions {
        id
        inputAssetIds
        inputs {
          __typename
          ... on InputCoin {
            owner
            utxoId
            amount
            assetId
          }
          ... on InputContract {
            utxoId
            contract {
              id
            }
          }
          ... on InputMessage {
            sender
            recipient
            amount
            data
          }
        }
        outputs {
          __typename
          ... on CoinOutput {
            to
            amount
            assetId
          }
          ... on ContractOutput {
            inputIndex
            balanceRoot
            stateRoot
          }
          ... on ChangeOutput {
            to
            amount
            assetId
          }
          ... on VariableOutput {
            to
            amount
            assetId
          }
          ... on ContractCreated {
            contract {
              id
            }
            stateRoot
          }
        }
        gasPrice
      }
    }
  }
}
```


## Get block information by height

```graphql
query Block($height: U64) {
  block(height: $height) {
    id
  }
}
```

## List all messages owned by address

```graphql
query MessageInfo($address: Address) {
  messages(owner: $address, first: 5) {
    nodes {
      amount
      sender
      recipient
      nonce
      data
      daHeight
    }
  }
}
```

## Dry run a transaction

```graphql
mutation DryRun($encodedTransaction: HexString!, $utxoValidation: Boolean) {
  dryRun(tx: $encodedTransaction, utxoValidation: $utxoValidation) {
    receiptType
    data
  }
}
```

## Submit a transaction

```graphql
mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
```

## More Examples

You can find more examples of how we use this API in our GitHub:

[Fuels Typescript SDK](https://github.com/FuelLabs/fuels-ts/)

[Fuels Rust SDK](https://github.com/FuelLabs/fuels-rs/)