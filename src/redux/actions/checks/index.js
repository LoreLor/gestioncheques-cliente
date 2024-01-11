/* eslint-disable no-unused-vars */
import axiosInstance from "../../../server/axiosConfig";
import { URL_AUTH } from "../../../server";
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
    LOGIN_SUCCESS,
} from "./actionsType";



export const allChecks = () => async (dispatch) => {
    dispatch({
        type: ALL_CHECKS_REQUEST,
    });
    try {
        const response = await axiosInstance.get("/listaractivos");
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
        const response = await axiosInstance.get(`/listar/${id}`);
        dispatch({
            type: CHECK_DETAIL_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: CHECK_DETAIL_ERROR,
            payload: error,
        });
    }
};

export const deleteCheck = (id) => async (dispatch) => {
    dispatch({
        type: DELETE_CHECK_REQUEST,
        payload: id,
    });
    try {
        // eslint-disable-next-line no-unused-vars
        const response = await axiosInstance.delete(`/eliminar/${id}`);
        dispatch({
            type: DELETE_CHECK_SUCCESS,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: DELETE_CHECK_ERROR,
            payload: error,
        });
    }
};

export const addCheck = (check) => async (dispatch) => {
    dispatch({
        type: ADD_CHECK_REQUEST,
        payload: check
    });
    try {
        // eslint-disable-next-line no-unused-vars
        const response = await axiosInstance.post("/agregar", check);
        dispatch({
            type: ADD_CHECK_SUCCESS,
            payload: response.data
            
        });
        dispatch(allChecks());
    } catch (error) {
        dispatch({
            type: ADD_CHECK_ERROR,
            payload: error,
        });
    }
};

export const updateCheck = (id, check) => async (dispatch) => {
    dispatch({
        type: UPDATE_CHECK_REQUEST,
        payload: id,
    });
    try {
        const response = await axiosInstance.put(`/modificar/${id}`, check);
        dispatch({
            type: UPDATE_CHECK_SUCCESS,
            payload: response.data,
        });
        return response;
    } catch (error) {
        dispatch({
            type: UPDATE_CHECK_ERROR,
            payload: error,
        });
    }
};

export const cleanDetail = () => (dispatch) => {
    dispatch({
        type: CLEAN_DETAIL,
    });
};

export const login = (body) => async (dispatch) => {
    try {
        const response = await axiosInstance.post(`${URL_AUTH}/login`, body);

        const token = response.data.token;

        if (token) {
            localStorage.setItem("token", token);
            console.log("Login exitoso. Token guardado:", token);
        } else {
            console.error("Token no encontrado en la respuesta");
        }
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: token,
        });

    } catch (error) {
        console.log(error);
    }
};
