const Amazon = artifacts.require("TestAmazon");

contract("Amazon test", accounts => {
    let instance;
    beforeEach("Before each", async () => {
        instance = await Amazon.new();
    });
    it("Test 1 Only owner, amount equal to zero", async () =>{
        try{
            //{id: 1, name: "Prueba", stock: 5, price: 0}
            await instance.addProduct([1, "prueba", 5, 1], {from: accounts[1]});
            assert(false);
        }catch (e) {
            assert.equal(e.reason, "You are not the owner.");
            await instance.addProduct([1, "prueba", 3, 5], {from: accounts[0]});
            const stock = await instance.listProducts.call(1);
            assert.equal(stock.stock, 0);
        }
    });

    it("Test 2 The name must have a lenght greater than 5 characteres", async () => {
        try {
            await instance.addProduct([1, "sole", 5, 1], {from: accounts[0]});
            assert(false);
        }catch (e) {
            assert.equal(e.reason, "The name of product should be more than 5.");
        }
    });

    it("TestOnly the owner can modify the stock", async () => {
        try {
            await instance.addProduct([1, "prueba", 5, 1], {from: accounts[0]});
            await instance.addQuantity(1, 5, {from: accounts[1]});
            assert(false);
        }catch (e) {
            assert.equal(e.reason, "You are not the owner.");
        }
    });

    it("Only the owner can open and close the store", async () => {
        try {
            await instance.closeOrOpenAmazon(false, {from: accounts[1]});
            assert(false);
        }catch (e) {
            assert.equal(e.reason, "You are not the owner.");
        }
    });

    it("Only the owner can withdraw the money", async () => {
        try {
            await instance.withdrawAllMoney({from: accounts[1]});
            assert(false);
        }catch (e) {
            assert.equal(e.reason, "You are not the owner.");
            await instance.addProduct([1, "prueba", 5, 1], {from: accounts[0]});
            await instance.addQuantity(1, 3, {from: accounts[0]});
            await instance.buyProduct(1, 2, {from: accounts[1], value: web3.utils.toWei("2", "ether")});
            const initialBalanceOwner = await web3.eth.getBalance(accounts[0]);
            await instance.withdrawAllMoney({from: accounts[0]});
            const finalBalanceOwner = await web3.eth.getBalance(accounts[0]);
            assert(parseFloat(initialBalanceOwner) < parseFloat(finalBalanceOwner));
            assert.equal(await web3.eth.getBalance(instance.address), 0);
        }
    });

    it("Test 6", async () => {
        await instance.addProduct([1, "Chocolate", 5, 2], {from: accounts[0]});
        await instance.addQuantity(1, 5, {from: accounts[0]});
        const initialBalanceCustomer = parseInt(parseFloat(await web3.eth.getBalance(accounts[1]))/1000000000000000000);
        await instance.buyProduct(1, 2, {from: accounts[1], value: web3.utils.toWei("4", "ether")});
        const finalBalanceCustomer = await web3.eth.getBalance(accounts[1]);
        const initialBalanceStore = await web3.utils.toWei("4", "ether");
        const total = parseInt(parseFloat(finalBalanceCustomer)/1000000000000000000) + parseInt(parseFloat(initialBalanceStore)/1000000000000000000);
        assert.equal(initialBalanceCustomer, total);

        const stock = await instance.listProducts.call(1);
        assert.equal(stock.stock, 3);

        const balanceStore = await web3.eth.getBalance(instance.address);
        assert.equal(balanceStore, await web3.utils.toWei("4", "ether"));
    });

    it("Test 7", async () => {
        await instance.addProduct([1, "Chocolate", 5, 2], {from: accounts[0]});
        await instance.addQuantity(1, 2, {from: accounts[0]});

        try {
            await instance.buyProduct(1, 3, {from: accounts[1], value: web3.utils.toWei("6", "ether")});
            assert(false);
        }catch (e) {
            assert.equal(e.reason, "There is not the stock in product.");
        }
    });

    it("Test 8", async () => {
        await instance.addProduct([1, "Chocolate", 5, 2], {from: accounts[0]});
        await instance.addQuantity(1, 11, {from: accounts[0]});

        await instance.buyProduct(1, 11, {from: accounts[2], value: web3.utils.toWei("22", "ether")});
        const balance = await web3.eth.getBalance(instance.address);
        assert.equal(balance, "21999999999999999998");
    });

})
