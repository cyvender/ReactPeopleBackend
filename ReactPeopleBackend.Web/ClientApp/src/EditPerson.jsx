import React from "react";

export default function EditPerson({ firstName, lastName, age, onTextChange, onUpdateClick, onCancelClick }) {
    return <div className="row p-5 rounded" style={{ backgroundColor: '#E9ECEF' }}>
        <div className="col-md-3">
            <input type="text" className="form-control" placeholder="First Name"
                value={firstName} name="firstName" onChange={onTextChange} />
        </div>
        <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Last Name"
                value={lastName} name="lastName" onChange={onTextChange} />
        </div>
        <div className="col-md-3">
            <input className="form-control" placeholder="Age"
                value={age} name="age" onChange={onTextChange} />
        </div>
        <div className="col-md-3">
            <button onClick={onUpdateClick} className="btn btn-warning w-100">Update</button>
            <button onClick={onCancelClick} className="btn btn-dark w-100 mt-2">Cancel</button>
        </div>
    </div>
}