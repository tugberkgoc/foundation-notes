
(async () => {
	const User = require('./modules/todo')
	const user = await new User()
	await user.addRecord('bread', 2)
	console.log(JSON.stringify(await user.getAll(), null, 2))
	return
})()
