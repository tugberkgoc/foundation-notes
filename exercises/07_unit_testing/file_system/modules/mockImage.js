// example file that demonstrates the File class and mock-fs working simultaneously

'use strict'

const mock = require('mock-fs')
const File = require('./file')
const file = new File()

const fileName = 'nodelogo.png'

const mockImageReadWrite = async (fileName) => {
	const imageReadFromFs = await file.readPicture(fileName)
	mock({})
	file.savePicture(fileName, imageReadFromFs)
	const imageReadFromMock = await file.readPicture(fileName)
	mock.restore()
	file.savePicture(`mocked_${fileName}`, imageReadFromMock)
}

mockImageReadWrite(fileName)
