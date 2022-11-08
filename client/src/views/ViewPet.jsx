import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import DeleteButton from '../components/DeleteButton';

const ViewPet = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pets, setPets] = useState({});
    // const [likes, setLikes] = useState();

    useEffect( () => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then(res => setPets(res.data))
            .catch((err) => console.log(err)
    )}, [id])

    const handleCancel = () => {
        navigate('/')
    }

    const handleEditOne = () => {
        navigate(`/pets/${id}/edit`)
    }

    const handleChange = (e) => {
        const req = {_id: e.target.name, 
            likes: e.target.value
        }  
        axios.put(`http://localhost:8000/api/pets/${id}/edit`, req)
            .then(res => setPets(res.data))
            .catch((err) => console.log(err)
    )}

    return (
        <div className='container'>
            <div className='header'>
                <h1>Pet Shelter</h1>
                <Link to="/">back to home</Link>
            </div>
            <p>Details about {pets.name}</p>
            <DeleteButton petId={pets._id} successCallback={() => navigate('/')}/>
            <div className='card'>
                <h4>Pet Type: {pets.type}</h4>
                <h4>Description: {pets.description}</h4>
                <h4>Skills: <br />
                    {pets.skill1} <br />
                    {pets.skill2} <br />
                    {pets.skill3}
                </h4>
            </div>
            {/* <div>
                <p>Likes: {pets.likes}</p>
                <button 
                    className='btn btn-success'
                    id='button'
                    name={pets._id}
                    value={pets.likes}
                    onClick={() => {handleChange}}
                >Like This Item</button>
            </div> */}
        </div>
    )
}

export default ViewPet