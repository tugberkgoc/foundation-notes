
/** 
 * Class representing a list of items.
 * */
class List {  

    /**
     * Create a list.
     */
    constructor(){
        this.items = [];
    }

    /**
     * Add an item to the list.
     * @param {String} item - The name of the eitem.
     * @param {Number} qty - The number of items to add.
     */
    add(item, qty) {
        var data = {item: item, qty: qty};
        this.items.push(data);
    }

    /**
     * Return the list of items.
     * @return {Array.<{item: String, qty: Number}>} An array containing the items.
     */
    getAll(){
        return this.items.map( (element, index) => ({key: index, item: element.item, qty: element.qty}));
    }

    delete(id){
        this.items.splice(id, 1);	
    }

    count(){
        return this.items.count;
    }

}

// exporting the class by name adds the name to the documentation 
module.exports = {
    List
}