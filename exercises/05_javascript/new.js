
'use strict'

function Person(name, startYear) {
	const currentYear = 2019
	this.name = name
	this.startYear = startYear || currentYear
	this.years = currentYear - this.startYear
}

Person.prototype.capitalise = function(name) {
	console.log(`name: ${this.name}`)
	this.name = name
	//return this.name[0].toUpperCase() + this.name.substring(1)
}

const colin = new Person('colin', 2012)
console.log(colin)
const nigel = new Person('nigel')
console.log(nigel)
nigel.capitalise()
console.log('name changed')
console.log(nigel)
// Person { name: 'colin', startYear: 2012, years: 7 }
// Person { name: 'nigel', startYear: 2019, years: 0 }

function Student(name, startYear, course) {
	Person.call(this, name, startYear)
	this.subject = course || 'not enrolled'
}

const emily = new Student('emily', 2017, 'architecture')
console.log(emily)
// Student { name: 'emily', startYear: 2017, years: 2, course: 'architecture' }

const anne = new Student('anne')
console.log(anne)
// Student { name: 'anne', startYear: 2019, years: 0, course: 'not enrolled' }

class ECMA6Person {
	constructor(name, startYear) {
		const currentYear = 2019
		this.name = name
		this.startYear = startYear || currentYear
		this.years = currentYear - this.startYear
	}
}

const david = new ECMA6Person('david', 2015)
console.log(david)

class ECMA6Student extends Person {
	constructor(name, startYear, course) {
		super(name, startYear)
		this.subject = course || 'not enrolled'
		if(ECMA6Student.count === undefined) ECMA6Student.count = 0
		ECMA6Student.count++
	}
	get course() {
		return this.subject
	}
	set course(newCourse) {
		this.subject = newCourse
	}
	static studentCount() {
		return ECMA6Student.count
	}
}

const ruth = new ECMA6Student('ruth')
console.log(ruth)
ruth.course = 'Computer Science'
console.log(ruth)
console.log(ECMA6Student.studentCount())
const matt = new ECMA6Student('matt')
console.log(matt)
console.log(ECMA6Student.studentCount())
console.log(ECMA6Student.count)
