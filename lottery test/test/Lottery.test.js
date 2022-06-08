const Lottery = artifacts.require("Lottery");

contract("lottery test", accounts => {

    let instance;

    beforeEach("Before each", async () => {
        instance = await Lottery.new();
    })

    it("allows one account to enter", async () => {
        await instance.enter({from: accounts[1], value: web3.utils.toWei("3", "ether")});
        const players = await instance.getPlayers.call();
        assert.equal(accounts[1], players[0]);
        assert.equal(1, players.length);
    })

    it("allows multiple account to enter", async ()=> {
        await instance.enter({from: accounts[0], value: web3.utils.toWei("3", "ether")});
        await instance.enter({from: accounts[1], value: web3.utils.toWei("4", "ether")});
        await instance.enter({from: accounts[2], value: web3.utils.toWei("5", "ether")});

        const players = instance.getPlayers.call();

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equals(players.length, 3);
    })
})
