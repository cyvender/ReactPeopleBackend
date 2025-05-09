import React from "react";
import axios from "axios";
import PersonRow from "./PersonRow";


class PeopleTable extends React.Component {

    state = {
        //person: {
        //    firstName: '',
        //    lastName: '',
        //    age: ''
        //},
        people: []

    }

    loadPeople = () => {
        axios.get('api/people/GetPeople').then(response => {
            this.setState({ people: response.data })
        })
    }

    generateTable = () => {
        const { people } = this.state;
        return people.map(p => {
            <PersonRow person={p} />
        })
    }
    render() {
        return (
            <>
                <div className='container mt-5'>
                    <div className='row'>
                        <table className='table table-hover table-striped table-bordered mt-3'>
                            <thead>
                                <tr>
                                    <td>First Name</td>
                                    <td>Last Name</td>
                                    <td>Age</td>
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