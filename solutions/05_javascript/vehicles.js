#!/usr/bin/env node

'use strict'

function OldVehicle(make, model, price) {
	this.make = make
	this.model = model
	this.price = price
}

const OldVehicle1 = new OldVehicle('Jaguar', 'E-type', 5600)
console.log(OldVehicle1)
const OldVehicle2 = new OldVehicle('Volkswagen', 'Beetle', 3200)
console.log(OldVehicle2)

function OldPickup(make, model, price, payload, seats) {
	OldVehicle.call(this, make, model, price)
	this.payload = payload
	this.seats = seats
}

const OldPickup1 = new OldPickup('GMC', 'Sonoma', 14000, 1500, 2)
console.log(OldPickup1)
const OldPickup2 = new OldPickup('Jeep', 'Comanche', 15900, 1800, 2)
console.log(OldPickup2)

class NewVehicle {
	constructor(make, model, price) {
		this.make = make
		this.model = model
		this.price = price
	}
}

class NewPickup extends NewVehicle {
	static totalValue = 0
	constructor(make, model, price, payload, seats) {
		super(make, model, price)
		this.payload = payload
		this.seats = seats
		NewPickup.totalValue += price
	}
}

const NewPickup1 = new NewPickup('Ford', 'F-150', 46900, 3000, 5)
console.log(NewPickup1)
const NewPickup2 = new NewPickup('Chevrolet', 'Silverado', 44900, 2500, 5)
console.log(NewPickup2)
console.log(NewPickup.totalValue)