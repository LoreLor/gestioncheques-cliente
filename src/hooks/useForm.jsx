/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addCheck } from "../redux/actions/checks";

export const useForm = (initialForm, validations) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);


    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors(validations({
            ...formData,
            [name]: value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors(validations(formData));
        if (Object.keys(errors).length === 0) {
            setLoading(true);
            try {
                await dispatch(addCheck(formData));
                Swal.fire({
                    icon: "success",
                    title: "¡Registro exitoso!",
                    showConfirmButton: false,
                    timer: 2000,
                });
                setFormData(initialForm);
                setLoading(false);           
            } catch (error) {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "¡Ha fallado el registro del cheque!",
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

    return {
        formData,
        errors,
        loading,
        response,
        handleChange,
        handleSubmit
    };
};