import { useState } from "react";
import "../../index.css";
import ChecksTable from "../checksTable/ChecksTable";
import logo from "../../assets/logo.png";
import control from "../../assets/control.png";

function Sidebar() {
    const [open, setOpen] = useState(true);
    const Menus = [
        { title: "Registrar Cheque", src: "Chart_fill", gap: true  },
        { title: "Buscar", src: "Search", gap: true },
        { title: "Calendario ", src: "Calendar", gap: true },
        { title: "Exportar ", src: "Folder", gap: true},
        { title: "Estadisticas", src: "Chart", gap: true },
        { title: "Cuenta", src: "User", gap: true },
        { title: "Configuración", src: "Setting", gap: true },
    ];

    return (
        <div className="flex">
            <div
                className={` ${open ? "w-90" : "w-20"} bg-dark-purple h-screen p-5   pt-8 relative duration-300 px-3`}
            >
                <img
                    src={control}
                    className={`absolute cursor-pointer -right-3 top-15 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)} />
                <div className="flex gap-x-4 items-center ">
                    <img
                        src={logo}
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} />
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}
                    >
            chekAR
                    </h1>
                </div>
                <ul className="pt-6 px-0 me-5 w-100" >
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-3" : "mt-1"} ${index === 0 && "bg-light-white" }`}
                        >
                            <img src={`./src/assets/${Menu.src}.png`} />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                {Menu.title}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="h-screen flex-1 p-7">
                <ChecksTable />
            </div>
        </div>
    );
}
export default Sidebar;