import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { ItemModel } from "../models/ItemModel";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteItem, getAllItems, saveItem, updateItem } from "../reducers/itemReducer";


export default function Item() {
    const dispatch = useDispatch<AppDispatch>();
    // const items: ItemModel[] = useSelector((state: RootState) => state.item || []);
    const items: ItemModel[] = useSelector((state: RootState) => state.item);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    // const [qty, setQty] = useState(0);
    const [qty, setQty] = useState<number>(0);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        console.log("Current items in store:", items);
        dispatch(getAllItems());
    }, [dispatch]);

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!id || !name || price <= 0 || qty <= 0 || !description) {
            toast.error("All fields are required!");
            return;
        }

        const newItem: ItemModel = { id: Number(id), name, description, price, qty:qty };

        if (isEdit) {
            dispatch(updateItem(newItem));
            toast.success("Item updated successfully!");
            setIsEdit(false);
        } else {
            dispatch(saveItem(newItem));
            toast.success("Item added successfully!");
        }
        resetForm();
    };

    const resetForm = () => {
        setId("");
        setName("");
        setDescription("");
        setPrice(0);
        setQty(0);
    };

    const handleDeleteItem = (itemId: number) => {
        dispatch(deleteItem(itemId));
        toast.success("Item deleted successfully!");
    };

    const handleEditItem = (item: ItemModel) => {
        setId(item.id.toString());
        setName(item.name);
        setDescription(item.description);
        setPrice(item.price);
        setQty(item.qty);
        setIsEdit(true);
    };

    return (
        <>
            <h1 className="text-xl font-bold mb-4 text-center">{isEdit ? "Update Item" : "Add Item"}</h1>
            <form onSubmit={handleOnSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        type="text"
                        name="id"
                        placeholder="Item ID"
                        className="w-full p-2 border rounded-md"
                        disabled={isEdit}
                    />
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="name"
                        placeholder="Item Name"
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        type="number"
                        name="price"
                        placeholder="Price"
                        className="w-full p-2 border rounded-md"
                    />
                    <input
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        type="number"
                        name="qty"
                        placeholder="Quantity"
                        className="w-full p-2 border rounded-md"
                    />
                </div>


                <div className="grid grid-cols-2 gap-4">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        placeholder="Description"
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="w-[150px] bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                    >
                        {isEdit ? "Update Item" : "Add Item"}
                    </button>
                </div>
            </form>

            <div className="mt-6">
                <h2 className="text-lg font-bold mb-2">Item List</h2>
                <div className="overflow-x-auto max-h-80">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-green-500 text-white sticky top-0 z-10">
                        <tr>
                            <th className="border border-gray-300 p-2">ID</th>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Description</th>
                            <th className="border border-gray-300 p-2">Price</th>
                            <th className="border border-gray-300 p-2">Quantity</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item) => (
                            <tr className="hover:bg-gray-100" key={item.id}>
                                <td className="border border-gray-300 p-2 text-center">{item.id}</td>
                                <td className="border border-gray-300 p-2">{item.name}</td>
                                <td className="border border-gray-300 p-2">{item.description}</td>
                                <td className="border border-gray-300 p-2 text-center">{item.price}</td>
                                <td className="border border-gray-300 p-2 text-center">{item.qty}</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button
                                        onClick={() => handleDeleteItem(item.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleEditItem(item)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 ml-2"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}