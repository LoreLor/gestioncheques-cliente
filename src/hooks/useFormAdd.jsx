/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCheck, allChecks } from "../redux/actions/checks";
import Swal from "sweetalert2";

export const useFormAdd = (initialForm, validations) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors(validations({
            ...formData,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormData(initialForm);
        setErrors({});
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validations(formData));

        if (Object.keys(errors).length === 0 
            && formData.fechaCobro !== ""
            && formData.entregadoPor !== ""
            && formData.numeroCheque !== 0
            && formData.banco !== ""
            && formData.monto !== 0
            && formData.titularCheque !== "" 
            && formData.cuit !== ""
            && formData.estado !== ""
        ) {
            setLoading(true);
            try {
                await dispatch(addCheck(formData));
                Swal.fire({
                    icon: "success",
                    title: "¡Registro exitoso!",
                    showConfirmButton: false,
                    timer: 2000,
                });
                
                resetForm();
                setLoading(false);

            } catch (error) {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Ha fallado el registro del cheque",
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "¡Debes completar todos los campos correctamente!",
                showConfirmButton: false,
                timer: 2000,
            });
            return;
        }
    };

    useEffect(() => {
        dispatch(allChecks());
    },[]);


    return {
        formData,
        setFormData,
        errors,
        loading,
        handleChange,
        handleSubmit,
    };
};
