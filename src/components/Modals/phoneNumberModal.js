import "./phoneNumberModal.scss";

export default function PhoneModal(props) {

    const setPhone = (e) => {
        props.updatePhone({
            ...props.updateForm,
            phone: e.target.value
        })
    }

    if (!props.show) {
        return null;
    }

    return (
        <div className="phone-modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Update users phone number</h4>
                </div>
                <div className="modal-body">
                    This user does not have phone number, you need to update it.
                    <input type="tel" name="" id={props.handle} onChange={setPhone}/>
                </div>
                <div className="modal-footer">
                    <button onClick={props.onUpdate} className="update">Update</button>
                    <button onClick={props.onClose} className="close">Close</button>
                </div>
            </div>
        </div>
    )
}