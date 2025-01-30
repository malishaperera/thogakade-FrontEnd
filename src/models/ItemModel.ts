export class ItemModel {
    id: number;
    name: string;
    description: string;
    price: number;
    qty: number;

    constructor(id: number, name: string, description: string, price: number, qty: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.qty = qty;
    }
}
