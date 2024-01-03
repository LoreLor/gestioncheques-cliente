/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faEye,
    //faFileExcel,
    faFilePdf,
    faPrint,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useReactToPrint } from "react-to-print";
import { customStyles } from "./ChecksTableCss";
import { useDispatch, useSelector } from "react-redux";
import { allChecks, cleanDetail, deleteCheck } from "../../redux/actions/checks";
import { dateFormat } from "../../utils/dateFormat";
import Loader from "../loader/Loader";
import ModalView from "../modals/ModalView";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./ChecksTable.css";
import Swal from "sweetalert2";
import ModalAdd from "../modals/ModalAdd";
// import { DownloadTableExcel } from "react-export-table-to-excel";
// import { DownloadExcel } from "react-excel-export";


const ChecksTable = () => {
    const dispatch = useDispatch();

    const checksList = useSelector((state) => state.checks);
    const { checks, loading } = checksList;

    const [inputData, setInputData] = useState(checks);

    const [selectedCheck, setSelectCheck] = useState(null);

    const [checkDel, setCheckDel] = useState(null);


    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(allChecks());
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const chec = checks;
        setInputData(chec);
    }, [checks]);

    // captura el id del cheque
    const handleView = (id) => {
        setSelectCheck(id);
        console.log("id :>> ", id);
    };

    // Actualiza cheque
    const handleEditCheck = (id) => {
        setSelectCheck(id);
        console.log("id :>> ", id);
    };

    // Elimina cheque
    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Esta acción no se puede deshacer.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#b84b29",
                cancelButtonColor: "#797070",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
            });

            if (result.isConfirmed) {
                await dispatch(deleteCheck(id));
                setCheckDel(null);

                Swal.fire({
                    title: "Eliminado!",
                    text: "El cheque ha sido eliminado correctamente",
                    icon: "success",
                });
            }
        } catch (error) {
            Swal.fire("Error", "No se pudo eliminar el cheque", "error");
        }
    };

    // Cierra modal
    const handleCloseModal = async() => {
        dispatch(cleanDetail());  
        setSelectCheck(null);
    };
    


    useEffect(() => {
        if (checkDel) {
            setCheckDel(null);
            dispatch(allChecks());
            setInputData(checks);
        }
    }, [checkDel, checks]);

    const columns = [
        {
            name: "Acciones",
            grow: 2,
            // eslint-disable-next-line no-unused-vars
            cell: (row) => (
                <div>
                    <a
                        href="#"
                        className="me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#detailModal"
                        onClick={() => handleView(row.id)}
                    >
                        <FontAwesomeIcon icon={faEye} className="iconActions" />
                    </a>
                    <a
                        href="#"
                        className="me-3" 
                        data-bs-toggle="modal"
                        data-bs-target="#addModal"
                        onClick={() => handleEditCheck(row.id)}
                    >
                        <FontAwesomeIcon
                            icon={faEdit}
                            className="iconActions"
                        />
                    </a>
                    <a
                        href="#"
                        className="me-2"
                        onClick={() => handleDelete(row.id)}
                    >
                        <FontAwesomeIcon
                            icon={faTrash}
                            className="iconActions"
                        />
                    </a>
                </div>
            ),
        },
        {
            name: "Fecha Ingreso",
            selector: (row) => dateFormat(row.fechaRecepcion),
            sortable: true,
            grow: 2,
        },
        {
            name: "Fecha Cobro",
            selector: (row) => dateFormat(row.fechaCobro),
            sortable: true,
            grow: 2,
        },
        {
            name: "N° Cheque",
            selector: (row) => row.numeroCheque,
            grow: 2,
        },
        {
            name: "Banco",
            selector: (row) => row.banco,
            sortable: true,
            grow: 2,
        },
        {
            name: "Monto",
            selector: (row) => row.monto,
            sortable: true,
        },
        {
            name: "Destino",
            selector: (row) => row.nombreDestino,
            sortable: true,
        },
        {
            name: "Estado",
            selector: (row) => row.estado,
            cell: (row) => (
                <div>
                    {row.estado === "pendiente" && (
                        <span className="badge bg-warning text-dark p-2">
                            Pendiente
                        </span>
                    )}
                    {row.estado === "rechazado" && (
                        <span className="badge bg-danger p-2">Rechazado</span>
                    )}
                    {row.estado === "cobrado" && (
                        <span className="badge bg-success p-2">Cobrado</span>
                    )}
                </div>
            ),
        },
    ];

    // Manejo de estado search
    const handleFilter = (e) => {
        const searchText = e.target.value.toLowerCase();
        if (!checks) {
            return;
        }
        const filterData = checks.filter((row) =>
            row.banco.toLowerCase().includes(searchText)
        );
        setInputData(filterData);
    };

    // Función para exportar a PDF
    const handleExportPDF = () => {
        const pdfColumns = columns.map((col) => col.name);
        const pdfData = inputData.map((row) =>
            columns.map((col) => row[col.selector])
        );

        const doc = new jsPDF();
        doc.autoTable({
            head: [pdfColumns],
            body: pdfData,
        });
        doc.save("table.pdf");
    };

    // Funcion para mandar a impresion
    const print = useRef();
    const handlePrint = useReactToPrint({
        content: () => print.current,
    });
    

    return (
        <section id="tableCheck" className="pt-5">
            <h2 className="text-center">Listado de Cheques</h2>
            <div className="container mt-5" ref={print}>
                <div className="row py-3">
                    {/* Btns Actions */}
                    <div className="col-md-4 text-start">
                        {/* <DownloadTableExcel
                            filename="Listado de Cheques"
                            sheet="cheques"
                            currentTableRef={tableRef.current}
                        >
                            <div className="btn btn-success">
                                <FontAwesomeIcon
                                    icon={faFileExcel}
                                    className="px-1"
                                />
                            </div>
                        </DownloadTableExcel> */}

                        {/* <DownloadExcel
                            data={checks}
                            buttonLabel={<div className="btn btn-success">
                                <FontAwesomeIcon
                                    icon={faFileExcel}
                                    className="px-1"
                                />
                            </div>}
                            fileName="Libro1"
                            className="export-button  border-0"
                        /> */}

                        {/* Boton Excel */}
                        <button
                            className="btn btn-danger ms-2"
                            onClick={handleExportPDF}
                        >
                            <FontAwesomeIcon icon={faFilePdf} />
                        </button>
                        {/* Boton Imprimir */}
                        <button
                            className="btn btn-secondary ms-2"
                            onClick={handlePrint}
                        >
                            <FontAwesomeIcon icon={faPrint} />
                        </button>
                    </div>
                    {/* Boton agregar Cheque */}
                    <div className="col-md-4 text-center">
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#addModal"
                        >
                            Agregar Cheque
                        </button>
                    </div>
                    {/* Input Search */}
                    <div className="col-md-4 text-end">
                        <label>
                            Buscar por Banco:{" "}
                            <input
                                type="text"
                                onChange={handleFilter}
                                name="search"
                            />
                        </label>
                    </div>
                </div>

                {/* Tabla */}
                {loading ? (
                    <Loader />
                ) : (
                    <StyleSheetManager
                        shouldForwardProp={(prop) => prop !== "sortActive"}
                    >
                        {
                            Array.isArray(checks) && checks.length > 0 ?
                                <DataTable
                                    columns={columns}
                                    data={inputData}
                                    customStyles={customStyles}
                                    fixedHeader
                                    pagination
                                ></DataTable>
                                : <p>No existen cheques registrados</p>
                        }
                    </StyleSheetManager>
                )}

                {/* Modal Ver Detalle */}
                <ModalView
                    handleCloseModal={handleCloseModal}
                    id={selectedCheck}
                />
                <ModalAdd 
                    handleCloseModal={handleCloseModal}
                    id={selectedCheck}
                />
            </div>
        </section>
    );
};

export default ChecksTable;
