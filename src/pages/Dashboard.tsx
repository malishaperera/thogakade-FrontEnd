// import {CustomerModel} from "../models/CustomerModel";
// import {useDispatch, useSelector} from "react-redux";
// import {AppDispatch, RootState} from "../store/store";
// import {useEffect} from "react";
// import {getCustomers} from "../reducers/CustomerReducer";
// import {getAllItems} from "../reducers/itemReducer";

export function Dashboard() {

    // const dispatch = useDispatch<AppDispatch>();
    //
    // const customers = useSelector((state:RootState)=>state.customer);
    // const items = useSelector((state: RootState) => state.item);

    // useEffect(() => {
    //     if (customers.length === 0) {
    //         dispatch(getCustomers());
    //     }
    // }, [dispatch, customers.length]);

    // useEffect(() => {
    //     if (customers.length === 0) {
    //         dispatch(getCustomers());
    //     }
    //     if (items.length === 0) {
    //         dispatch(getAllItems());
    //     }
    // }, [dispatch, customers.length, items.length]);

    return (
        <>
            {/*Dashboard
            {customers.map((customer: CustomerModel) => (<div key={customer.email}>{customer.name + ' '+ customer.email + ' '+ customer.phone }</div>))}
            <h2>Item Dashboard</h2>
            {items.map((item: ItemModel) => (
                <div key={item.id}>
                    {item.name} - {item.price}
                </div>
            ))}*/}
        </>
    );
}