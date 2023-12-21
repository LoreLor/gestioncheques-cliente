//import React from "react";
import { useState, useRef } from "react";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faFilePdf, faPrint } from "@fortawesome/free-solid-svg-icons";
import { CSVLink } from "react-csv";
import { useReactToPrint } from 'react-to-print';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { customStyles } from './ChecksTable';



const ChecksTable = () => {
    
    const data = [
        {
            id:1,
            fechaRecepcion: "2024-02-25",
            entregadoPor: "Piruli",
            numeroCheque: "423423",
            banco: "Frances",
            monto: 50000,
            titularCheque: "Pirulo",
            cuit: "21-3454232432",
            fechaCobro: "2025-12-24",
            estado: "pendiente",
            nombreDestino: "Elo",
            codigoDestino: "E1",
            activo: true,
        },
        {
            id:2,
            fechaRecepcion: "2024-04-12",
            entregadoPor: "Piruli2",
            numeroCheque: "423423",
            banco: "Galicia",
            monto: 50000,
            titularCheque: "Pirulo2",
            cuit: "21-3454232432",
            fechaCobro: "2025-12-24",
            estado: "pendiente",
            nombreDestino: "Elo2",
            codigoDestino: "E2",
            activo: true,
        },
        {
            id:3,
            fechaRecepcion: "2024-07-12",
            entregadoPor: "Piruli3",
            numeroCheque: "423423",
            banco: "Patagonia",
            monto: 50000,
            titularCheque: "Pirulo3",
            cuit: "21-3454232432",
            fechaCobro: "2025-12-24",
            estado: "pendiente",
            nombreDestino: "Elo3",
            codigoDestino: "E3",
            activo: true,
        },
    ];
    const columns = [
        {
            name:"id",
            selector: row => row.id,
            grow:1,
            maxWidth:'1px',
        },
        {
            name:"Fecha de Recepcion",
            selector: row => row.fechaRecepcion,
            sortable: true,
            flexWrap: 'wrap'
        },
        {
            name:"Entregado Por",
            selector: row => row.entregadoPor,
            sortable: true,
        },
        {
            name:"Numero de Cheque",
            selector: row => row.numeroCheque,
        },
        {
            name:"Banco",
            selector: row => row.banco,
            sortable: true,
        },
        {
            name:"Monto",
            selector: row => row.monto,
            sortable: true,
        },
        {
            name:"Titular del Cheque",
            selector: row => row.titularCheque,
            sortable: true,
        },
        {
            name:"Cuit",
            selector: row => row.cuit,
        },
        {
            name: "Fecha de Cobro",
            selector: row => row.fechaCobro,
            sortable: true,
        },
        {
            name:"Estado",
            selector: row => row.estado,
            sortable: true,
        },
        {
            name:"Destino",
            selector: row => row.nombreDestino,
            sortable: true,
        },
        {
            name:"Codigo Destino",
            selector: row => row.codigoDestino,
            sortable: true,
        },
        // {
        //     name:"Está Activo?",
        //     selector: row => row.activo,
        //     sortable: true
        // }
    ];

    const [inputData, setInputData] = useState(data);
    
    // manejo de etado search
    const handleFilter = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filterData = data.filter(row => row.banco.toLowerCase().includes(searchText));
        if(filterData){
            setInputData(filterData);
        } else {
            setInputData(inputData);
        }
    }

    // Función para exportar a PDF
    const handleExportPDF = () => {
        const pdfColumns = columns.map(col => col.name);
        const pdfData = inputData.map(row => columns.map(col => row[col.selector]));

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
            <div className="container mt-5"  ref={print}>
                <div className="row py-3">
                    <div className="col-md-6 text-start">
                        <CSVLink data={data} className="btn btn-success ms-2">
                            <FontAwesomeIcon icon={faFileExcel} />
                        </CSVLink>
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
                    <div className="col-md-6 text-end">
                        <label>Buscar por Banco: {' '}
                            <input 
                                type="text" 
                                onChange={handleFilter}
                                name="search"
                            />
                        </label>
                    </div>
                </div>
                
                <StyleSheetManager shouldForwardProp={(prop) => prop !== 'sortActive'}>
                    <DataTable
                        columns={columns}
                        data={inputData}
                        customStyles={customStyles}
                        // selectableRows
                        fixedHeader
                        pagination
                    ></DataTable>
                </StyleSheetManager>
            </div>
        </section>
    );
};

export default ChecksTable;
