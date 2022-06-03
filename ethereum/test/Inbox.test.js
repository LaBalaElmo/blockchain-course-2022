const Inbox = artifacts.require('Inbox')

contract('Inbox', accounts => {
    it('getMessage', async () => {
        const instance = await Inbox.deployed();
        const message = await  instance.getMessage.call();
        assert.equal(message, 'Hi')
    });

    it('setMessage should change the message', async () => {
        const instance = await Inbox.deployed();
        await instance.setMessage('Hi Rodrigo', {from: accounts[0]});
        const message = await instance.getMessage.call();
        assert.equal(message, 'Hi Rodrigo');
    });

    it('setMessage shouldnt chage the message', async () => {
        const instance = await Inbox.deployed();
        try {
            await instance.setMessage('Second change', {from: accounts[1]});
        }catch (e) {
            //console.log('error', e);
            assert.equal(e.reason, "Solo el owner puede modificar el mensaje")
        }
    });
})
