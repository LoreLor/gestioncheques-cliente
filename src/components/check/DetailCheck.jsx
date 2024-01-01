/* eslint-disable react/prop-types */
import { dateFormat } from "../../utils/dateFormat";

const DetailCheck = ({checks}) => {

    return (
        <>
            <p>ID: <span className="fs-5 text-black">{checks?.id}</span></p>
            <p>Fecha de Recepción: <span>{dateFormat(checks?.fechaRecepcion)}</span></p>
            <p>Entregado por: <span>{checks?.entregadoPor}</span></p>
            <p>Número de Cheque: <span>{checks?.numeroCheque}</span></p>
            <p>Banco: <span>{checks?.banco}</span></p>
            <p>Monto: <span>{checks?.monto}</span></p>
            <p>Titular del Cheque: <span>{checks?.titularCheque}</span></p>
            <p>CUIT: <span>{checks?.cuit}</span></p>
            <p>Fecha de Cobro: <span>{dateFormat(checks?.fechaCobro)}</span></p>
            <p>Estado del Cheque: <span>{checks?.estado}</span></p>
            <p>Destino del Cheque: <span>{checks?.nombreDestino}</span></p>
            <p>Codigo de Destino: <span>{checks?.codigoDestino}</span></p>
        </>
    );
};

export default DetailCheck;