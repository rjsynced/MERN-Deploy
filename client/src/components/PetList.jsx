import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const PetList = (props) => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/pets")
            .then((res) => setPets(res.data));
    }, []);

    return (
        <div className='container'>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Type</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pets.sort(function (a,b) {
                        if (a.type < b.type) {
                            return -1;
                        }
                        if (a.type > b.type) {
                            return 1;
                        }
                        return 0;
                    }).map((pets, index) => {
                        return (
                            <tr key={index}>
                                <td>{pets.name}</td>
                                <td>{pets.type}</td>
                                <td>
                                    <>
                                        <Link className='btn btn-success' to={`/pets/${pets._id}`} key={index}>Pet Details</Link><span>     </span>
                                    </>
                                        <Link className='btn btn-warning' to={`/pets/${pets._id}/edit`} key={index}>Edit</Link><span>     </span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default PetList