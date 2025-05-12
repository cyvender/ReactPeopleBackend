import React from "react";
import axios from "axios";
import PersonRow from "./PersonRow";
import AddPerson from "./AddPerson";
import EditPerson from "./EditPerson";
import { produce } from 'immer';

class PeopleTable extends React.Component {

    state = {
        person: {
            firstName: '',
            lastName: '',
            age: '',
        },
        people: [],
        isEditing: false,
        deleteList: []
    }

    clearPerson = () => {
        this.setState({
            person: {
                firstName: '',
                lastName: '',
                age: ''
            }
        })
    }
    loadPeople = () => {
        axios.get('/api/people/GetPeople').then(response => {
            this.setState({ people: response.data })
        })
    }

    componentDidMount = () => {
        this.loadPeople();
    }

    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.person[e.target.name] = e.target.value;
        });

        this.setState(nextState);
    }

    onAddClick = () => {
        axios.post('/api/people/addperson', this.state.person).then(response => {
            this.loadPeople();
            this.clearPerson();
        }
        )
    }

    onEditClick = (p) => {
        if (!this.state.isEditing) {
            this.setState({
                isEditing: !this.state.isEditing
            })
        }
        this.setState({
            person: {
                id: p.id,
                firstName: p.firstName,
                lastName: p.lastName,
                age: p.age
            }
        })
    }

    onUpdateClick = () => {
        axios.post('/api/people/updateperson', this.state.person).then(response => {
            this.loadPeople();
            this.clearPerson();
            this.setState({
                isEditing: !this.state.isEditing
            })
        }
        )
    }

    onCancelClick = () => {
        this.setState({ isEditing: !this.state.isEditing })
        this.clearPerson();
    }

    onCheckAll = () => {
        const { people } = this.state;
        const nextState = produce(this.state, draftState => {
            draftState.deleteList = people;
        })
        this.setState(nextState);
    }

    onUnCheckAll = () => {
        const nextState = produce(this.state, draftState => {
            draftState.deleteList = [];
        })
        this.setState(nextState);
    }

    onCheckBoxClick = (p) => {
        const { deleteList } = this.state;
        if (!deleteList.includes(p)) {
            const nextState = produce(this.state, draftState => {
                draftState.deleteList.push(p);
            })
            this.setState(nextState);
        }
        else {
            this.setState({ deleteList: deleteList.filter(dlp => dlp.id !== p.id) })
        }
    }

    deletePeople = (deleteList) => {
        
        axios.post('/api/people/deletepeople', { deleteList: deleteList }).then(response => {
            this.loadPeople();
            this.setState({deleteList: this.state.deleteList.filter(dl => dl.id !== deleteList.id )})
        })
    }

    generateTable = () => {
        const { people, deleteList } = this.state;
        const { onEditClick, onCheckBoxClick, deletePeople } = this;

        console.log("check all", deleteList);

        return people.map(p =>
            <PersonRow
                key={p.id}
                person={p}
                deleteList={deleteList}
                onCheckBoxClick={() => onCheckBoxClick(p)}
                onEditClick={() => onEditClick(p)}
                onDeleteClick={() => deletePeople([p])}
            />
        )
    }

    render() {
        const { firstName, lastName, age } = this.state.person;
        const { isEditing, deleteList } = this.state;
        const { onAddClick, onTextChange, onUpdateClick, onCancelClick, onCheckAll, onUnCheckAll, deletePeople } = this;
        return (
            <>
                <div className='container mt-5'>
                    <div className='row'>
                        {!isEditing &&
                            <AddPerson
                                onAddClick={onAddClick}
                                onTextChange={onTextChange}
                                firstName={firstName}
                                lastName={lastName}
                                age={age}
                            />
                        }
                        {isEditing &&
                            <EditPerson
                                onUpdateClick={onUpdateClick}
                                onCancelClick={onCancelClick}
                                onTextChange={onTextChange}
                                firstName={firstName}
                                lastName={lastName}
                                age={age}
                            />
                        }


                        <table className='table table-hover table-striped table-bordered mt-3'>
                            <thead>
                                <tr>
                                    <th style={{ width: "15%" }}>
                                        <button onClick={() => deletePeople(deleteList)} className="btn btn-danger w-100">Delete Selected</button>
                                        <button onClick={onCheckAll} className="btn btn-outline-danger w-100 mt-2">Check All</button>
                                        <button onClick={onUnCheckAll} className="btn btn-outline-danger w-100 mt-2">Uncheck All</button>
                                    </th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Age</th>
                                    <th>Edit/Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.generateTable()}
                            </tbody>
                        </table>
                    </div>
                </div >
            </>
        )
    }
}

export default PeopleTable;