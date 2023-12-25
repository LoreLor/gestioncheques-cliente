/* eslint-disable react-hooks/exhaustive-deps */
//import React from "react";
import { useState, useRef, useEffect } from "react";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faEye,
    faFileExcel,
    faFilePdf,
    faPrint,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { customStyles } from "./ChecksTableCss";
import "./ChecksTable.css";
import { DownloadExcel } from "react-excel-export";
import { useDispatch, useSelector } from "react-redux";
import { allChecks } from "../../redux/actions/checks";
import { dateFormat } from "../../utils/dateFormat";
import Loader from "../loader/Loader";
import ModalView from "../modals/ModalView";

const ChecksTable = () => {
    const dispatch = useDispatch();
    const checksList = useSelector((state) => state.checks);
    const { checks, loading } = checksList;
    const [inputData, setInputData] = useState(checks);

    const [showModal, setShowModal] = useState(false);
    const [selectedCheck, setSelectCheck] = useState(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(allChecks());
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        setInputData(checks);
    }, [checks]);

    // capturar el id del cheque
    const handleView = (id) => {
        setSelectCheck(id);
        setShowModal(true);
        console.log("id :>> ", id);
    };

    // const handleEdit = (id) => {};

    // const handleDelete = (id) => {};

     // Handle Modal
    const handleCloseModal = () => {
        setShowModal(false);
    }

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
                        href=""
                        className="me-3" /*onClick={() => handleEdit(row.id)}*/
                    >
                        <FontAwesomeIcon
                            icon={faEdit}
                            className="iconActions"
                        />
                    </a>
                    <a
                        href=""
                        className="me-2" /* onClick={() => handleDelete(row.id)}*/
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

    // manejo de etado search
    const handleFilter = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filterData = checks.filter((row) =>
            row.banco.toLowerCase().includes(searchText)
        );
        if (filterData) {
            setInputData(filterData);
        } else {
            setInputData(inputData);
        }
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

    // funcion para mandar a impresion
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
                    <div className="col-md-6 text-start">
                        <DownloadExcel
                            data={inputData}
                            buttonLabel={
                                <div className="btn btn-success">
                                    <FontAwesomeIcon
                                        icon={faFileExcel}
                                        className="px-1"
                                    />
                                </div>
                            }
                            fileName="Libro1"
                            className="export-button  border-0"
                        />

                        <button
                            className="btn btn-danger ms-2"
                            onClick={handleExportPDF}
                        >
                            <FontAwesomeIcon icon={faFilePdf} />
                        </button>
                        <button
                            className="btn btn-secondary ms-2"
                            onClick={handlePrint}
                        >
                            <FontAwesomeIcon icon={faPrint} />
                        </button>
                    </div>
                    {/* Input Search */}
                    <div className="col-md-6 text-end">
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
                        <DataTable
                            columns={columns}
                            data={inputData}
                            customStyles={customStyles}
                            // selectableRows
                            fixedHeader
                            pagination
                        ></DataTable>
                    </StyleSheetManager>
                )}

                {/* Modal Ver Detalle */}
                <ModalView
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    id={selectedCheck}
                />
            </div>
        </section>
    );
};

export default ChecksTable;
