const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
module.exports = {
  networks: {
    inf_crypt_goerli: {
      network_id: 5,
      gasPrice: 10000,
      provider: new HDWalletProvider(fs.readFileSync('c:\\Users\\hp\\Desktop\\web design projects\\Crypt-transfer\\nmonics.env', 'utf-8'), "https://goerli.infura.io/v3/a755be90d89443bcac0f976a84dff606")
    },
    inf_venmo_goerli: {
      network_id: 5,
      gasPrice: 10000,
      provider: new HDWalletProvider(fs.readFileSync('c:\\Users\\hp\\Desktop\\web design projects\\Crypt-transfer\\nmonics.env', 'utf-8'), "https://goerli.infura.io/v3/4e753424356e42cca1827f4160bc05c5")
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.15"
    }
  }
};
