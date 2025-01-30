
import {createBrowserRouter, RouterProvider} from "react-router";
import {Dashboard} from "./pages/Dashboard";
import {AddCustomer} from "./pages/AddCustomer";
import {UpdateCustomer} from "./pages/UpdateCustomer";
import {DeleteCustomer} from "./pages/DeleteCustomer";
import {RootLayout} from "./components/RootLayout";
import {store} from "./store/store";
import {Provider} from "react-redux";
import Customer from "./pages/Customer";
import Item from "./pages/Item";
import Order from "./pages/Order";
import {Toaster} from "react-hot-toast";
function App() {

    const routes = createBrowserRouter([
        {
            path: '',
            element : <RootLayout/>,
            children : [
                { path : '', element : <Dashboard/>},
                { path: "/customer", element: <Customer /> },
                { path: "/item", element: <Item /> },
                { path: "/order", element: <Order /> }

                // { path : '/add', element : <AddCustomer/>},
                // { path : '/delete', element : <DeleteCustomer/>},
                // { path : '/update', element : <UpdateCustomer/>}
            ]
        },
    ])

    return (
        <>
            <Provider store={store}>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        style: {
                            width: '200px',
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',

                        },
                        duration: 1000,
                        iconTheme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    }}


                />
                <RouterProvider router={routes} />
            </Provider>
        </>
    );
}

export default App
