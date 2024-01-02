/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addCheck, detailCheck, updateCheck } from "../redux/actions/checks";

export const useForm = (initialForm, validations, id) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const checkDetail = useSelector(state => state.detailCheck);
    const { detail } = checkDetail;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    await dispatch(detailCheck(id));
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [dispatch, id]);

    useEffect(() => {
        if (detail) {
            setFormData({
                fechaRecepcion: detail?.fechaRecepcion || "",
                fechaCobro: detail?.fechaCobro || "",
                entregadoPor: detail?.entregadoPor || "",
                numeroCheque: detail?.numeroCheque || 0,
                banco: detail?.banco || "",
                monto: detail?.monto || 0,
                titularCheque: detail?.titularCheque || "",
                cuit: detail?.cuit || "",
                estado: detail?.estado || null,
                nombreDestino: detail?.nombreDestino || "",
                codigoDestino: detail?.codigoDestino || "",
            });
        } else {
            setFormData(initialForm);
        }
    }, [detail]);
    

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validations(formData));

        if (Object.keys(errors).length === 0) {
            setLoading(true);

            try {
                if (detail) {
                    await dispatch(updateCheck(formData));
                    Swal.fire({
                        icon: "success",
                        title: "¡Edición exitosa!",
                        showConfirmButton: false,
                        timer: 2000,
                    });

                } else {
                    await dispatch(addCheck(formData));
                    Swal.fire({
                        icon: "success",
                        title: "¡Registro exitoso!",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }

                setFormData(initialForm);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: detail ? "¡Ha fallado la edición del Cheque!" : "Ha fallado el registro del cheque",
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
        setFormData,
        errors,
        loading,
        handleChange,
        handleSubmit,
    };
};
