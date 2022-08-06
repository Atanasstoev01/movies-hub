import "./editUserDetailsModal.scss";

export default function EditUserDetailModal(props) {

    const setDetail = (e) => {
        props.updateDetail({
            ...props.updateForm,
            email: e.target.value,
            firstName: e.target.value,
            lastName: e.target.value,
            phone: e.target.value,
            
        })
    }

    if (!props.show) {
        return null;
    }

    return (
        <div className="detail-modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Update users details</h4>
                </div>
                <div className="modal-body">
                    Update your User Details here.
                    <input type="tel" name="" id={props.handle} onChange={setDetail}/>
                </div>
                <div className="modal-footer">
                    <button onClick={props.onUpdate} className="update">Update</button>
                    <button onClick={props.onClose} className="close">Close</button>
                </div>
            </div>
        </div>
    )
}