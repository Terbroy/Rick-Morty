import React from 'react';
import axios from 'axios'
import { useEffect, useState } from "react";


const RickItem = ({ resident, text }) => {
    const [residents, setResidents] = useState({})
   
    useEffect(() => {
        axios.get(resident)
            .then(res => setResidents(res.data));
    }, [text])
    
    const status = (status) => {
        switch (status) {
            case 'Alive':
                return 'green';
            case 'Dead':
                return 'red';
            default:
                return 'gray';
        }
    }

    return (
        <div  id='rick' className='rick-card' key={resident}>
            <img className='img-card' src={residents.image} alt="" />
            <div className='info-card'>
                <h3 className='name-resident'>{residents.name}</h3>
                <hr />
                <div className='status'>
                    <p><svg fill={status(residents.status)} className='circle' viewBox="0 0 120 120" version="1.1"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="60" cy="60" r="50" />
                    </svg>{residents.status} - {residents.species}</p>
                </div>
                <div className='info-section'>
                    <h5> Gender:</h5>
                    <p>{residents.gender}</p>
                </div>
                <div className='info-section'>
                    <h5>Episodes:</h5>
                    <p>{residents.episode?.length}</p>
                </div>
            </div>
        </div>
    )
};

export default RickItem;