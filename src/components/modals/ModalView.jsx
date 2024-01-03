/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailCheck } from "../../redux/actions/checks";
import DetailCheck from "../check/DetailCheck";

const ModalView = ({id}) => {
    const dispatch = useDispatch();
    const checkDetail = useSelector((state) => state.detailCheck);
    const { detail } = checkDetail;


    useEffect(() => {
        if (id) {
            dispatch(detailCheck(id));
        }
    }, [dispatch, id]);

    return (
        <div
            className="modal fade"
            tabIndex="-1"
            id="detailModal"
            aria-labelledby="detailModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title fs-5" id="detailModalLabel">
                            Detalle del Cheque
                        </h2>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <DetailCheck checks={detail} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalView;
