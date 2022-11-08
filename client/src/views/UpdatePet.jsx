import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import PetForm from '../components/PetForm'


const UpdatePet = () => {
    const { id } = useParams();
    const [errors, setErrors] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [pet, setPet] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/pets/${id}`)
            .then((res) => {setPet(res.data) // returns you an object in an array so use [0] to grab the data
                setLoaded(true)
            })
            .catch((error) => {console.log(error)
            });
        }, [id])

    const updatePet = (pet) => {
        axios
            .put(`http://127.0.0.1:8000/api/pets/${id}/edit`, pet)
            .then((res) => {
                navigate("/error");
            })
            .catch((error) => {
                console.log("hello")
                const errorResponse = error.response.data.error.errors;
                console.log(errorResponse)
                const errorArr = [];
                console.log(error)
                for (const key in errorResponse) {
                    errorArr.push(errorResponse[key].message);
                }
                setErrors(errorArr);
            });
    };
    return (
        <div>
            <Link to="/">Home</Link>
            <h1>Pet Shelter</h1>
            <h4>Edit {pet.name}</h4>
            {errors.map((error, index) => (<p key={index}>{error}</p>))}
            {loaded && (<PetForm onSubmitProp={updatePet} />)}
        </div>
    )
}

export default UpdatePet