
const User = require('../modules/todo')

describe('simple test', () => {
	test('adding a new record', async done => {
		const user = await new User()
		const id = await user.addRecord('bread', 4)
		const data = await user.getAll()
		await user.close()
		expect(data[0]).toEqual([ { item: 'bread', qty: 4 } ])
		done()
	})
})

// if you get lots of handlebars warnings you need to install an older version:
//  npm install handlebars@4.5.3
