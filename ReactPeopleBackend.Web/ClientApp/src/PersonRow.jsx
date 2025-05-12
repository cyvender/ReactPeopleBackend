import React from 'react';

function PersonRow({ person, onDeleteClick, onEditClick, onCheckBoxClick, deleteList }) {
    const { firstName, lastName, age } = person;
    return (

        <tr>
            <td>
                <div className="d-flex justify-content-center align-items-center">
                    <input onChange={onCheckBoxClick} checked={deleteList.includes(person)} type="checkbox" className="form-check-input mt-2" style={{ transform: "scale(1.5)" }} />
                </div>
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button onClick={onEditClick} className="btn btn-warning">Edit</button>
                <button onClick={onDeleteClick} className="btn btn-danger" style={{ marginLeft: "10px" }}>Delete</button>
            </td>
        </tr>
    )
}

export default PersonRow;