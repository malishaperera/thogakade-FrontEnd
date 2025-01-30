import { NavLink } from "react-router";

export function Sidebar() {
    return (
        <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
            <h2 className="text-xl font-bold p-4">Thoga-Kade</h2>
            <nav className="flex-grow">
                <ul className="space-y-4 p-4">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `block py-2 px-4 rounded ${
                                    isActive ? "bg-gray-600" : "hover:bg-gray-700"
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/customer"
                            className={({ isActive }) =>
                                `block py-2 px-4 rounded ${
                                    isActive ? "bg-gray-600" : "hover:bg-gray-700"
                                }`
                            }
                        >
                            Customer
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/item"
                            className={({ isActive }) =>
                                `block py-2 px-4 rounded ${
                                    isActive ? "bg-gray-600" : "hover:bg-gray-700"
                                }`
                            }
                        >
                            Item
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/order"
                            className={({ isActive }) =>
                                `block py-2 px-4 rounded ${
                                    isActive ? "bg-gray-600" : "hover:bg-gray-700"
                                }`
                            }
                        >
                            Order
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
