require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    goerly: {
      url: 'https://eth-goerli.alchemyapi.io/v2/D82OBa-S37NXflgnHRYRp5vTuhYZzWh8',
      accounts: ['']
    },
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/HzovK0JpWsJU0BSckw2kz9GHSeQEnTu7',
       accounts: ['']
    }
  },
  paths: {
    sources: './src/ethereum-hardhat/contracts',
    tests: './src/ethereum-hardhat/test',
    cache: './src/ethereum-hardhat/cache',
    artifacts: './src/ethereum-hardhat/artifacts'
  }
};
