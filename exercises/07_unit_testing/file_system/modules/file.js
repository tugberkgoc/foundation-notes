'use strict'

module.exports = class File {
    constructor() {   }

    async savePicture(filename, imageData) {
        if (filename === undefined || filename === '') throw new Error(`filename can't be empty`)
        if (imageData === undefined || imageData === '') throw new Error(`imageData can't be empty`)
        
        const fs = require('fs')
        try{
            fs.writeFile(filename, imageData, 'binary')   
        } catch(err)
        {
            throw err
        }
    }

    readPicture(filename) {
        if (filename === undefined || filename === '') throw new Error(`filename can't be empty`)
        const fs = require('fs')
        try {
            fs.readFileSync(filename, 'binary')
        } catch(err) {
            throw err
        }
    }
}
