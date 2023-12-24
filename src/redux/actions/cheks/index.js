import axios from 'axios';
import URL_API from '../../../server';
import { ALL_CHECKS_ERROR, ALL_CHECKS_REQUEST, ALL_CHECKS_SUCCESS } from './actionsType';



export const allChecks = () => async(dispatch) => {
    dispatch({
        type:ALL_CHECKS_REQUEST
    })
    try {
        const response = await axios.get(`${URL_API}/listar`)
        dispatch({
            type: ALL_CHECKS_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: ALL_CHECKS_ERROR,
            payload: error
        })
    }
}