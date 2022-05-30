const Inbox = artifacts.require('Inbox')

contract('Inbox', async () => {
    it('getMessage', async () => {
        const instance = await Inbox.deployed();
        const message = await  instance.getMessage.call();
        assert.equal(message, 'Hi')
    })
})
