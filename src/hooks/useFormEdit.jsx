import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailCheck, updateCheck } from "../redux/actions/checks";
import Swal from "sweetalert2";


export const useFormEdit = (initialForm, validations, id) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { detail } = useSelector(state => state.detailCheck);


    useEffect(() => {
        if (id) {
            dispatch(detailCheck(id));
        } else {
            setFormData(initialForm);
        }
    }, [id]);
    
    useEffect(() => {
        if (detail) {
            setFormData({
                fechaRecepcion: detail.fechaRecepcion ?? "",
                fechaCobro: detail.fechaCobro ?? "",
                entregadoPor: detail.entregadoPor ?? "",
                numeroCheque: detail.numeroCheque ?? 0,
                banco: detail.banco ?? "",
                monto: detail.monto ?? 0,
                titularCheque: detail.titularCheque ?? "",
                cuit: detail.cuit ?? "",
                estado: detail.estado ?? "",
                nombreDestino: detail.nombreDestino ?? "",
                codigoDestino: detail.codigoDestino ?? "",
            });
        }
    }, [detail]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors(validations({
            ...formData,
            [name] : value,
        }));

        setFormData({
            ...formData,
            [name] : value,
        });
    };

    const resetForm = () => {
        setFormData(initialForm);
        setErrors({});
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validations(formData));

        if(Object.keys(errors).length === 0) {
            setLoading(true);
            try {
                
                await dispatch(updateCheck(id, formData));
                Swal.fire({
                    icon: "success",
                    title: "¡Edición exitosa!",
                    showConfirmButton: false,
                    timer: 2000,
                });
                resetForm();
                setLoading(false);
            } catch (error) {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Ha fallado la edición del cheque",
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
        setFormData,
        handleChange,
        handleSubmit,
        resetForm
    };

};

