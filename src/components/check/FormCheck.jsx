const FormCheck = () => {
    return (
        <div className="row g-3 needs-validation" noValidate>
            <div className="row g-3">
                <div className="input-group mb-1">
                    {/* Fecha de Recepcion */}
                    <div className="col-6">
                        <div className="col-auto pe-3">
                            <label
                                htmlFor="fechaRecepcion"
                                className="col-form-label"
                            >
                                Fecha de Recepción:
                            </label>
                        </div>
                        <div className="col-auto pe-3">
                            <input
                                type="date"
                                id="fechaRecepcion"
                                className="form-control"
                                aria-describedby="errorDate1"
                            />
                        </div>
                        <div className="col-auto pe-3 pt-1">
                            <span id="errorDate1" className="form-text">
                                error
                            </span>
                        </div>
                    </div>
                    {/* Fecha de Cobro */}
                    <div className="col-6">
                        <div className="col-auto pe-3">
                            <label
                                htmlFor="fechaCobro"
                                className="col-form-label"
                            >
                                Fecha de Cobro:
                            </label>
                        </div>
                        <div className="col-auto pe-3">
                            <input
                                type="date"
                                id="fechaCobro"
                                className="form-control"
                                aria-describedby="errorDate2"
                            />
                        </div>
                        <div className="col-auto pe-3 pt-1">
                            <span id="errorDate2" className="form-text">
                                error
                            </span>
                        </div>
                    </div>
                </div>

                <div className="input-group mb-1">
                    {/* Entregado Por */}
                    <div className="col-6">
                        <div className="col-auto pe-3">
                            <label
                                htmlFor="entregadoPor"
                                className="col-form-label"
                            >
                                Entregado Por:
                            </label>
                        </div>
                        <div className="col-auto pe-3">
                            <input
                                type="text"
                                id="entregadoPor"
                                className="form-control"
                                aria-describedby="errorEntregado"
                            />
                        </div>
                        <div className="col-auto pe-3 pt-1">
                            <span id="errorEntregado" className="form-text">
                                error
                            </span>
                        </div>
                    </div>

                    {/* Numero de Cheque */}
                    <div className="col-6">
                        <div className="col-auto pe-3">
                            <label
                                htmlFor="numeroCheque"
                                className="col-form-label"
                            >
                                Número de Cheque:
                            </label>
                        </div>
                        <div className="col-auto pe-3">
                            <input
                                type="text"
                                id="numeroCheque"
                                className="form-control"
                                aria-describedby="errorNumero"
                            />
                        </div>
                        <div className="col-auto pe-3 pt-1">
                            <span id="errorNumero" className="form-text">
                                error
                            </span>
                        </div>
                    </div>
                </div>

                <div className="input-group mb-1">
                    {/* Banco */}
                    <div className="col-6">
                        <div className="col-auto pe-3">
                            <label htmlFor="banco" className="col-form-label">
                                Banco:
                            </label>
                        </div>
                        <div className="col-auto pe-3">
                            <input
                                type="text"
                                id="banco"
                                className="form-control"
                                aria-describedby="errorBanco"
                            />
                        </div>
                        <div className="col-auto pe-3 pt-1">
                            <span id="errorBanco" className="form-text">
                                error
                            </span>
                        </div>
                    </div>

                    {/* Monto */}
                    <div className="col-6">
                        <div className="col-auto pe-3">
                            <label htmlFor="monto" className="col-form-label">
                                Monto:
                            </label>
                        </div>
                        <div className="col-auto pe-3">
                            <input
                                type="number"
                                id="monto"
                                className="form-control"
                                aria-describedby="errorMonto"
                            />
                        </div>
                        <div className="col-auto pe-3 pt-1">
                            <span id="errorMonto" className="form-text">
                                error
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
                                className="form-control"
                                aria-describedby="errorTitular"
                            />
                        </div>
                        <div className="col-auto pe-3 pt-1">
                            <span id="errorTitular" className="form-text">
                                error
                            </span>
                        </div>
                    </div>

                    {/* CUIT */}
                    <div className="col-6">
                        <div className="col-auto pe-3">
                            <label htmlFor="cuit" className="col-form-label">
                                CUIT:
                            </label>
                        </div>
                        <div className="col-auto pe-3">
                            <input
                                type="text"
                                id="cuit"
                                className="form-control"
                                aria-describedby="errorCuit"
                            />
                        </div>
                        <div className="col-auto pe-3 pt-1">
                            <span id="errorCuit" className="form-text">
                                error
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
                                className="form-control"
                                aria-describedby="errorDestino"
                            />
                        </div>
                        <div className="col-auto pe-3 pt-1">
                            <span id="errorDestino" className="form-text">
                                error
                            </span>
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
                                className="form-control"
                                aria-describedby="errorCodDestino"
                            />
                        </div>
                        <div className="col-auto pe-3 pt-1">
                            <span id="errorCodDestino" className="form-text">
                                error
                            </span>
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
                        />
                        <label
                            className="form-check-label"
                            htmlFor="pendiente"
                        >
                          Pendiente de Cobro
                        </label>
                    </div>
                    {/* Cobrado */}
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="estado"
                            id="cobrado"
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
                        />
                        <label
                            className="form-check-label"
                            htmlFor="rechazado"
                        >
                          Rechazado
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormCheck;
