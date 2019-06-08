//var bitcoinjs = require('bitcoinjs-lib');
var bitgotx = require('bitgo-utxo-lib');
var bip32utils = require('bip32-utils');
//var hushjs = require('hushjs');
//var bs58check = require('bs58check');

// Hierarchical Deterministic wallet
function phraseToHDWallet(phraseStr) {
  // Seed key, make it fucking strong
  // phraseStr: string
  const seedHex = Buffer.from(phraseStr).toString('hex')

  //Set Network
  var network = this.props.settings.useTestNet ? bitgotx.networks.komodo : bitgotx.networks.komodo; // komodo has bitcoin prefixes for testnet. Needs network specification in network.
 
  // chains
  const hdNode = bitgotx.HDNode.fromSeedHex(seedHex, network)
  var chain = new bip32utils.Chain(hdNode)

  // Creates 43 address from the same chain
  for (var k = 0; k < 42; k++){
    chain.next()
  }

  // Get private keys from them
  var privateKeys = chain.getAll().map((x) => chain.derive(x).keyPair.toWIF())
  
  return privateKeys
}

export default {
  phraseToHDWallet: phraseToHDWallet  
}