/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faEye,
    faFilePdf,
    faMagnifyingGlass,
    faPrint,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useReactToPrint } from "react-to-print";
import { customStyles } from "./ChecksTableCss";
import { useDispatch, useSelector } from "react-redux";
import {
    allChecks,
    cleanDetail,
    deleteCheck,
} from "../../redux/actions/checks";
import Loader from "../loader/Loader";
import ModalView from "../modals/ModalView";
import Swal from "sweetalert2";
import ModalAdd from "../modals/ModalAdd";
import ModalEdit from "../modals/ModalEdit";
import "./ChecksTable.css";
import { dateFormat } from "../../utils/dateFormat";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { DownloadExcel } from "react-excel-export";




const ChecksTable = () => {
    const dispatch = useDispatch();

    const checksList = useSelector((state) => state.checks);
    const { checks, loading } = checksList;

    const [inputData, setInputData] = useState(checks);
    const [selectedCheck, setSelectCheck] = useState("");
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
    };

    // Capturo id para editar
    const handleEditCheck = (id) => {
        setSelectCheck(id);
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
    const handleCloseModal = async () => {
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
            name: "Fecha Ingreso",
            selector: (row) => dateFormat(row.fechaRecepcion),
            sortable: true,
            grow: 2,
        },
        {
            name: "Fecha Cobro",
            selector: (row) => dateFormat(row.fechaCobro),
            grow: 2,
        },
        {
            name: "N° Cheque",
            selector: (row) => row.numeroCheque,
            grow: 2,
        },
        {
            name: "Titular",
            selector: (row) => row.titularCheque,
            sortable: true,
            grow: 2,
        },
        {
            name: "Monto",
            selector: (row) => row.monto,
            sortable: true,
            grow: 2,
        },
        {
            name: "Destino",
            selector: (row) => row.nombreDestino,
            grow: 2,
        },
        {
            name: "Estado",
            selector: (row) => row.estado,
            cell: (row) => (
                <div>
                    {row.estado === "pendiente" && (
                        <span className="badge bg-pendiente p-2">
                            A cobrar
                        </span>
                    )}
                    {row.estado === "rechazado" && (
                        <span className="badge bg-rechazado p-2">
                            Rechazado
                        </span>
                    )}
                    {row.estado === "cobrado" && (
                        <span className="badge bg-cobrado p-2">Cobrado</span>
                    )}
                </div>
            ),
            grow: 1,
        },
        {
            name: "Acciones",
            grow: 3,
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
                        data-bs-target="#editModal"
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
    ];

    // Manejo de estado search
    const handleFilter = (e) => {
        const searchText = e.target.value.toLowerCase();
        if (!checks) {
            return;
        }

        const filterData = checks.filter((row) => {
            const fieldsToSearch = ["estado", "monto", "titularCheque"];
            
            return fieldsToSearch.some((field) => {
                const fieldValue = row[field];

                if (typeof fieldValue === "string") {
                    return fieldValue.toLowerCase().startsWith(searchText);
                } else if (typeof fieldValue === "number") {
                    const fieldValueAsString = String(fieldValue).toLowerCase();
                    return fieldValueAsString.startsWith(searchText);
                }
                return false;
            });
        });

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
        <section id="tableCheck" className="">
            <div className="container" ref={print}>
                <div className="row py-1">
                    {/* Btns Actions */}
                    <div className="col-md-4 text-start">
                        {/* Btn Excel */}
                        <div className="btn btn-excel fs-6 px-3 ">
                            <DownloadExcel
                                data={inputData}
                                buttonLabel="X"
                                fileName="Libro1"
                            />
                        </div>
                        {/* Boton PDF */}
                        <button
                            className="btn btn-pdf ms-2"
                            onClick={handleExportPDF}
                        >
                            <FontAwesomeIcon icon={faFilePdf} />
                        </button>
                        {/* Boton Imprimir */}
                        <button
                            className="btn btn-print ms-2"
                            onClick={handlePrint}
                        >
                            <FontAwesomeIcon icon={faPrint} />
                        </button>
                        {/* Boton agregar Cheque */}
                        <button
                            type="button"
                            className="btn btn-agregar ms-2"
                            data-bs-toggle="modal"
                            data-bs-target="#addModal"
                        >
                            Agregar Cheque
                        </button>
                    </div>

                    {/* Input Search */}
                    <div className="col-md-8">
                        <div className="input-group mb-3  justify-content-end">
                            <span
                                className="input-group-text"
                                id="basic-addon1"
                            >
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search"/>
                            </span>
                            <input
                                type="text"
                                onChange={handleFilter}
                                name="search"
                                className="input-search ps-2"
                                placeholder="por monto, estado o titular..."
                                aria-label="Searcher..." 
                                aria-describedby="basic-addon1"
                            />
                        </div>
                    </div>
                </div>

                {/* Tabla */}
                {loading ? (
                    <Loader />
                ) : (
                    <div className="mb-5">
                        <StyleSheetManager
                            shouldForwardProp={(prop) => prop !== "sortActive"}
                        >
                            {Array.isArray(checks) && checks.length > 0 ? (
                                <DataTable
                                    columns={columns}
                                    data={inputData}
                                    customStyles={customStyles}
                                    fixedHeader
                                    pagination
                                    paginationComponentOptions={{
                                        rowsPerPageText: "Filas por página",
                                    }}
                                ></DataTable>
                            ) : (
                                <p>No existen cheques registrados</p>
                            )}
                        </StyleSheetManager>
                    </div>
                )}

                {/* Modal Ver Detalle */}
                <ModalView
                    handleCloseModal={handleCloseModal}
                    id={selectedCheck}
                />
                <ModalAdd />
                <ModalEdit 
                    id={selectedCheck}
                />
            </div>
        </section>
    );
};

export default ChecksTable;
