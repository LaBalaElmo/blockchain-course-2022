const Notes = artifacts.require("Notes");

contract("lottery test", accounts => {
    let instance;
    beforeEach("Before each", async ()=>{
        instance = await Notes.new();
    });

    it("Evaluar()", async () => {
        await instance.Evaluar("Rodrigo", 80);
        const nota = await instance.VerNotas("Rodrigo")
        assert.equal(nota, 80);
    });

    it("Only teacher can call Evaluar()", async() => {
        try {
            await instance.Evaluar("Rodrigo", 80, {from: accounts[1]});
            assert(false);
        }catch (e) {
            assert.equal(e.reason, "No tienes permisos para ejecutar esta funcion.")
        }
    })
    /*
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
        await instance.enter({from: accounts[1], value: web3.utils.toWei("3", "ether")});
        await instance.enter({from: accounts[2], value: web3.utils.toWei("3", "ether")});

        const players = await instance.getPlayers.call();

        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });

    it ("require a minimun amount of ether to enter", async ()=>{
        try {
            await instance.enter({from: accounts[0], value: web3.utils.toWei("1", "ether")});
            asser(false);
        }catch (e) {
            //console.log("ERROT", e.reason);
            assert.equal(e.reason, "Minimum 2.1 Ether");
        }
    });

    it("Only manager can call pickWinner", async () => {
        try {
            await instance.pickWinner({from: accounts[8]});
            assert(false);
        }catch (e) {
            assert.equal("you are not the manager", e.reason);
        }
    })

    it("sends money to the winner and resets the players array", async ()=>{

        await instance.enter({from: accounts[1], value: web3.utils.toWei("3", "ether")});

        const initialBalancePlayer = await web3.eth.getBalance(accounts[1]);
        const initialBalanceLottery = await web3.eth.getBalance(instance.address);

        await  instance.pickWinner({from: accounts[0]});

        const finalBalancePlayer = await web3.eth.getBalance(accounts[1]);

        const total = parseFloat(initialBalancePlayer) + parseFloat(initialBalanceLottery);

        const players = await instance.getPlayers.call();
        assert.equal(0, players.length);
        assert.equal(finalBalancePlayer, total);
    })
     */
})
