const Inbox = artifacts.require('Inbox')

contract('Inbox', accounts => {
    it('getMessage', async () => {
        const instance = await Inbox.deployed();
        const message = await  instance.getMessage.call();
        assert.equal(message, 'Hi')
    });

    it('setMessage', async () => {
        const instance = await Inbox.deployed();
        await instance.setMessage('Hi Rodrigo', {from: accounts[0]});
        const message = await instance.getMessage.call();
        assert.equal(message, 'Hi Rodrigo');
    });
})
