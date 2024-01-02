import axios from "axios";
import URL_API from "../../../server";
import {
    ADD_CHECK_ERROR,
    ADD_CHECK_REQUEST,
    ADD_CHECK_SUCCESS,
    ALL_CHECKS_ERROR,
    ALL_CHECKS_REQUEST,
    ALL_CHECKS_SUCCESS,
    CHECK_DETAIL_ERROR,
    CHECK_DETAIL_REQUEST,
    CHECK_DETAIL_SUCCESS,
    CLEAN_DETAIL,
    DELETE_CHECK_ERROR,
    DELETE_CHECK_REQUEST,
    DELETE_CHECK_SUCCESS,
    UPDATE_CHECK_ERROR,
    UPDATE_CHECK_REQUEST,
    UPDATE_CHECK_SUCCESS,
} from "./actionsType";
import { dateFormat } from "../../../utils/dateFormat";

export const allChecks = () => async (dispatch) => {
    dispatch({
        type: ALL_CHECKS_REQUEST,
    });
    try {
        const response = await axios.get(`${URL_API}/listaractivos`);
        dispatch({
            type: ALL_CHECKS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: ALL_CHECKS_ERROR,
            payload: error,
        });
    }
};

export const detailCheck = (id) => async (dispatch) => {
    dispatch({
        type: CHECK_DETAIL_REQUEST,
        payload: id,
    });
    try {
        const response = await axios.get(`${URL_API}/listar/${id}`);
        const formattedData = {
            ...response.data,
            fechaRecepcion: response.data.fechaRecepcion
                ? dateFormat(response.data.fechaRecepcion)
                : null,
            fechaCobro: response.data.fechaCobro
                ? dateFormat(response.data.fechaCobro)
                : null,
        };
        dispatch({
            type: CHECK_DETAIL_SUCCESS,
            payload: formattedData,
        });
    } catch (error) {
        dispatch({
            type: CHECK_DETAIL_ERROR,
            payload: error,
        });
    }
};

export const deleteCheck = (id) => async(dispatch) =>{
    dispatch({
        type: DELETE_CHECK_REQUEST,
        payload: id
    });
    try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.delete(`${URL_API}/eliminar/${id}`);
        dispatch({
            type: DELETE_CHECK_SUCCESS,
            payload: id,
        });
        
    } catch (error) {
        dispatch({
            type: DELETE_CHECK_ERROR,
            payload: error
        });
    }

};

export const addCheck = (check) => async(dispatch) => {
    dispatch({
        type: ADD_CHECK_REQUEST,
    });
    try {
        const response = await axios.post(`${URL_API}/agregar`, check);
        dispatch({
            type: ADD_CHECK_SUCCESS,
            payload: response.data
        });
        dispatch(allChecks());

    } catch (error) {
        dispatch({
            type: ADD_CHECK_ERROR,
            payload: error
        });
    }
};

export const updateCheck = (id, check) => async(dispatch) => {
    dispatch({
        type: UPDATE_CHECK_REQUEST,
        payload: id
    });
    try {
        const response = await axios.put(`${URL_API}/modificar/${id}`, check);
        dispatch({
            type: UPDATE_CHECK_SUCCESS,
            payload: response.data
        });    
    } catch (error) {
        dispatch({
            type: UPDATE_CHECK_ERROR,
            payload: error,
        });
    }
};

export const cleanDetail = () => (dispatch) =>{
    dispatch({
        type: CLEAN_DETAIL
    });
};