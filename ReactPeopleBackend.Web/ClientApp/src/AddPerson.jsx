import React from "react";

export default function AddPerson({ firstName, lastName, age, onTextChange, onAddClick }) {
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
            <button onClick={onAddClick} className='btn btn-primary w-100'>Add</button>
        </div>
    </div>
}