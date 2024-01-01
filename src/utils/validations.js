export default function validations(formData) {
    const errors = {};

    if(!formData.fechaRecepcion || formData.fechaRecepcion === "") {
        errors.fechaRecepcion = "Debes ingresar la fecha de Recepción del Cheque";

    } else if (!formData.fechaCobro) {
        errors.fechaCobro = "Debes ingresar la fecha de Cobro del Cheque";

    } else if (new Date(formData.fechaCobro) <= new Date(formData.fechaRecepcion)) {
        errors.fechaCobro = "La fecha de cobro debe ser posterior a la fecha de recepción";

    } else if(!formData.entregadoPor.trim() || formData.entregadoPor === ""){
        errors.entregadoPor = "Debes ingresar por quien fue entregado";

    } else if(formData.entregadoPor.length < 3 || formData.entregadoPor.length > 50 ) {
        errors.entregadoPor = "Debes ingresar entre 3 y 50 caracteres";

    } else if (!formData.numeroCheque) {
        errors.numeroCheque = "Debes ingresar el número de cheque";

    } else if (!/^[0-9]+$/.test(formData.numeroCheque)){
        errors.numeroCheque = "Ingresa un número de cheque válido";

    } else if(!formData.banco.trim() || formData.banco === ""){
        errors.banco = "Debes ingresar el nombre del banco";

    } else if (formData.banco.length < 3 || formData.banco.length > 50) {
        errors.banco = "Debes ingresar el banco entre 3 y 50 caracteres";

    } else if(!formData.monto){
        errors.monto = "Debes ingresar el monto";

    } else if(formData.monto < 0) {
        errors.monto = "Debes ingresar un monto positivo";

    } else if(!formData.titularCheque.trim()){
        errors.titularCheque = "Debes ingresar el titular de cheque";

    } else if(formData.titularCheque.length < 3 || formData.titularCheque.length > 50) {
        errors.titularCheque = "Bedes ingresar un titular entre 3 y 50 caracteres";

    } else if(!formData.cuit.trim()){
        errors.cuit = "Debes ingresar el CUIT";

    } else if(formData.cuit.length !== 11){
        errors.cuit = "Ingresa un cuit válido de 11 numeros";

    } else if (!/^[0-9]+$/.test(formData.cuit)){
        errors.cuit = "Ingresa un cuit válido de 11 números";

    } else if(formData.estado === ""){
        errors.estado = "Debes seleccionar un estado";
    }

    return errors;
}