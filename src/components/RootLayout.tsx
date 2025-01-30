import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export function RootLayout() {
    return (
        <div className="flex h-screen overflow-hidden">

            <Sidebar />

            <main className="flex-grow bg-gradient-to-b from-white via-green-400 to-green-300 p-6 h-screen">
                <div className="bg-gray-100 shadow-md rounded-lg h-full p-6 overflow-hidden">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
