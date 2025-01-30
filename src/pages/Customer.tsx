import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { CustomerModel } from "../models/CustomerModel";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { deleteCustomer, getAllCustomers, saveCustomer, updateCustomer } from "../reducers/CustomerReducer";

export default function Customer() {

    const dispatch = useDispatch<AppDispatch>();
    const customers: CustomerModel[] = useSelector((state: RootState) => state.customer);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        dispatch(getAllCustomers());
    }, [dispatch]);

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!id || !name || !email || !phone) {
            toast.error("All fields are required!");
            return;
        }

        const newCustomer: CustomerModel = {  id: Number(id),  name, email, phone };

        if (isEdit) {
            dispatch(updateCustomer(newCustomer));
            toast.success("Customer updated successfully!");
            setIsEdit(false);
        } else {
            dispatch(saveCustomer(newCustomer));
            toast.success("Customer added successfully!");
        }
        resetForm();
    };

    const resetForm = () => {
        setId("");
        setName("");
        setEmail("");
        setPhone("");
    };

    const handleDeleteCustomer = (customerEmail: string) => {
        dispatch(deleteCustomer(customerEmail));
    };

    const handleEditCustomer = (customer: CustomerModel) => {
        setId(customer.id.toString())
        setName(customer.name);
        setEmail(customer.email);
        setPhone(customer.phone);
        setIsEdit(true);
    };

    return (
        <>
            <h1 className="text-xl font-bold mb-4 text-center">{isEdit ? "Update Customer" : "Add Customer"}</h1>
            <form onSubmit={handleOnSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        type="number"
                        name="id"
                        placeholder="ID"
                        className="w-full p-2 border rounded-md"
                        disabled={isEdit}
                    />
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded-md"
                    />
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="w-[150px] bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                    >
                        {isEdit ? "Update Customer" : "Add Customer"}
                    </button>
                </div>
            </form>

            <div className="mt-6">
                <h2 className="text-lg font-bold mb-2">Customer List</h2>
                <div className="overflow-x-auto max-h-80">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead className="bg-green-500 text-white sticky top-0 z-10 ">
                        <tr>
                            <th className="border border-gray-300 p-2">ID</th>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Email</th>
                            <th className="border border-gray-300 p-2">Phone</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {customers.map((customer) => (
                            <tr className="hover:bg-gray-100" key={customer.id}>
                                <td className="border border-gray-300 p-2 text-center">{customer.id}</td>
                                <td className="border border-gray-300 p-2">{customer.name}</td>
                                <td className="border border-gray-300 p-2">{customer.email}</td>
                                <td className="border border-gray-300 p-2 text-center">{customer.phone}</td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <button
                                        onClick={() => handleDeleteCustomer(customer.email)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleEditCustomer(customer)}
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