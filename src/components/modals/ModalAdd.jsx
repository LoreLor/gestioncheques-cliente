/* eslint-disable no-unused-vars */

import validations from "../../utils/validations";
import { useForm } from "../../hooks/useForm";


const ModalAdd = () => {
    const initialForm = {
        fechaRecepcion: "",
        fechaCobro: "",
        entregadoPor: "",
        numeroCheque: 0,
        banco: "",
        monto: 0,
        titularCheque: "",
        cuit: "",
        estado: "",
        nombreDestino: "",
        codigoDestino: "",
    };

    const {
        formData,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(initialForm, validations);


    return (
        <div
            className="modal fade modal-lg"
            id="addModal"
            tabIndex="-1"
            aria-labelledby="addModalLabel"
            aria-hidden="false"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title fs-3">Agrega tu Cheque</h2>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body">
                        <form className="row g-3 needs-validations">
                            <div className="input-group mb-2">
                                {/* Fecha de Recepcion */}
                                <div className="col-6 pe-3">
                                    <label
                                        htmlFor="fechaRecepcion"
                                        className="col-form-label"
                                    >
                                        Fecha de Recepción:
                                    </label>
                                    <input
                                        type="date"
                                        id="fechaRecepcion"
                                        name="fechaRecepcion"
                                        value={formData.fechaRecepcion}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                    <div className="col pe-3 pt-1">
                                        <span className="form-text">
                                            {errors.fechaRecepcion && (
                                                <p className="text-danger">
                                                    {errors.fechaRecepcion}
                                                </p>
                                            )}
                                        </span>
                                    </div>
                                </div>

                                {/* Fecha de Cobro */}
                                <div className="col-6 pe-3">
                                    <label
                                        htmlFor="fechaCobro"
                                        className="col-form-label"
                                    >
                                        Fecha de Cobro:
                                    </label>
                                    <input
                                        type="date"
                                        id="fechaCobro"
                                        name="fechaCobro"
                                        value={formData.fechaCobro}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                    <div className="col pe-3 pt-1">
                                        <span className="form-text">
                                            {errors.fechaCobro && (
                                                <p className="text-danger">
                                                    {errors.fechaCobro}
                                                </p>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-1">
                                {/* Entregado Por */}
                                <div className="col-6 pe-3">
                                    <label
                                        htmlFor="entregadoPor"
                                        className="col-form-label"
                                    >
                                        Entregado Por:
                                    </label>
                                    <input
                                        type="text"
                                        id="entregadoPor"
                                        name="entregadoPor"
                                        value={formData.entregadoPor}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                    <div className="col pe-3 pt-1">
                                        <span className="form-text">
                                            {errors.entregadoPor && (
                                                <p className="text-danger">
                                                    {errors.entregadoPor}
                                                </p>
                                            )}
                                        </span>
                                    </div>
                                </div>

                                {/* Numero de Cheque */}
                                <div className="col-6">
                                    <label
                                        htmlFor="numeroCheque"
                                        className="col-form-label"
                                    >
                                        Número de Cheque:
                                    </label>
                                    <input
                                        type="text"
                                        id="numeroCheque"
                                        name="numeroCheque"
                                        value={formData.numeroCheque}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                    <div className="col pe-3 pt-1">
                                        <span className="form-text">
                                            {errors.numeroCheque && (
                                                <p className="text-danger">
                                                    {errors.numeroCheque}
                                                </p>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-1">
                                {/* Banco */}
                                <div className="col-6">
                                    <label
                                        htmlFor="banco"
                                        className="col-form-label"
                                    >
                                        Banco:
                                    </label>
                                    <input
                                        type="text"
                                        id="banco"
                                        name="banco"
                                        value={formData.banco}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                    <div className="col pe-3 pt-1">
                                        <span className="form-text">
                                            {errors.banco && (
                                                <p className="text-danger">
                                                    {errors.banco}
                                                </p>
                                            )}
                                        </span>
                                    </div>
                                </div>

                                {/* Monto */}
                                <div className="col-6">
                                    <div className="col-auto pe-3">
                                        <label
                                            htmlFor="monto"
                                            className="col-form-label"
                                        >
                                            Monto:
                                        </label>
                                    </div>
                                    <div className="col-auto pe-3">
                                        <input
                                            type="number"
                                            id="monto"
                                            name="monto"
                                            min={0}
                                            value={formData.monto}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-auto pe-3 pt-1">
                                        <span className="form-text">
                                            {errors.monto && (
                                                <p className="text-danger">
                                                    {errors.monto}
                                                </p>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-1">
                                {/* Titular del Cheque */}
                                <div className="col-6">
                                    <div className="col-auto pe-3">
                                        <label
                                            htmlFor="titularCheque"
                                            className="col-form-label"
                                        >
                                            Titular del cheque:
                                        </label>
                                    </div>
                                    <div className="col-auto pe-3">
                                        <input
                                            type="text"
                                            id="titularCheque"
                                            name="titularCheque"
                                            value={formData.titularCheque}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-auto pe-3 pt-1">
                                        <span className="form-text">
                                            {errors.titularCheque && (
                                                <p className="text-danger">
                                                    {errors.titularCheque}
                                                </p>
                                            )}
                                        </span>
                                    </div>
                                </div>

                                {/* CUIT */}
                                <div className="col-6">
                                    <div className="col-auto pe-3">
                                        <label
                                            htmlFor="cuit"
                                            className="col-form-label"
                                        >
                                            CUIT:
                                        </label>
                                    </div>
                                    <div className="col-auto pe-3">
                                        <input
                                            type="text"
                                            id="cuit"
                                            name="cuit"
                                            value={formData.cuit}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col-auto pe-3 pt-1">
                                        <span className="form-text">
                                            {errors.cuit && (
                                                <p className="text-danger">
                                                    {errors.cuit}
                                                </p>
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-1">
                                {/* Nombre de Destino */}
                                <div className="col-6">
                                    <div className="col-auto pe-3">
                                        <label
                                            htmlFor="nombreDestino"
                                            className="col-form-label"
                                        >
                                            Nombre de Destino:
                                        </label>
                                    </div>
                                    <div className="col-auto pe-3">
                                        <input
                                            type="text"
                                            id="nombreDestino"
                                            name="nombreDestino"
                                            value={formData.nombreDestino}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                {/* Código de Destino */}
                                <div className="col-6">
                                    <div className="col-auto pe-3">
                                        <label
                                            htmlFor="codigoDestino"
                                            className="col-form-label"
                                        >
                                            Código de Destino:
                                        </label>
                                    </div>
                                    <div className="col-auto pe-3">
                                        <input
                                            type="text"
                                            id="codigoDestino"
                                            name="codigoDestino"
                                            value={formData.codigoDestino}
                                            onChange={handleChange}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Estado */}
                            <div className="form-check form-check-inline">
                                {/* Pendiente de Cobro */}
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="estado"
                                        id="pendiente"
                                        value="pendiente"
                                        onChange={handleChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="pendiente"
                                    >
                                        Pendiente
                                    </label>
                                </div>
                                {/* Cobrado */}
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="estado"
                                        id="cobrado"
                                        value="cobrado"
                                        onChange={handleChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="cobrado"
                                    >
                                        Cobrado
                                    </label>
                                </div>
                                {/* Rechazado */}
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="estado"
                                        id="rechazado"
                                        value="rechazado"
                                        onChange={handleChange}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="rechazado"
                                    >
                                        Rechazado
                                    </label>
                                </div>
                            </div>
                            <div className="col-auto pe-3 pt-1">
                                <span className="form-text">
                                    {errors.estado && (
                                        <p className="text-danger">
                                            {errors.estado}
                                        </p>
                                    )}
                                </span>
                            </div>
                            <div className="d-flex justify-content-end align-items-center mb-5">
                                <button
                                    type="button"
                                    className="btn btn-primary m-2"
                                    onClick={handleSubmit}
                                >
                                    Guardar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary m-2"
                                    data-bs-dismiss="modal"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalAdd;
