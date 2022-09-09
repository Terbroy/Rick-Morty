import React from 'react';
import axios from 'axios'
import { useEffect, useState } from "react";
import RickItem from './RickItem';
import Pagination from './Pagination';

const RickList = () => {
    const [text, setText] = useState('')
    const [world, setWorld] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(6)
    const totalPost = world.residents?.length
    const indexOfLastPost = currentPage * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPosts = world.residents?.slice(indexOfFirstPost, indexOfLastPost)
    const paginate = (pageNumber) => setCurrentPage(pageNumber + 1)


    useEffect(() => {
        const randomId = Math.floor(Math.random() * 126 + 1)
        axios.get(`https://rickandmortyapi.com/api/location/${randomId}/`)
            .then(res => setWorld(res.data))
    }, [])

    const newText = () => {
        axios.get(`https://rickandmortyapi.com/api/location/${text}/`)
            .then(res => setWorld(res.data))
    }
    return (
        <div className="App">
            <h1>Rick and Morty Wiki</h1>
            <div className='search'>
                <form class="form">
                    <input type="text" required onChange={e => setText(e.target.value)} />
                    <label class="lbl-nombre">
                        <span class="text-nomb">Id</span>
                    </label>
                </form>
                <button onClick={newText}>🔍</button>
            </div>
            <h2>{world.name}</h2>
            <div className='info-world'>
                <h3>Type:</h3>
                <h3> Dimension:</h3>
                <h3> Population:</h3>
                <p> {world.type}</p>
                <p> {world.dimension}</p>
                <p> {world.residents?.length}</p>
            </div>
            <h2 className='residents'>Residents</h2>
            <ul className='rick-container'>
                {
                    currentPosts?.map(resident => {
                        return (
                            <>
                                <RickItem resident={resident} text={newText} />
                            </>
                        )
                    })
                }
            </ul>
            <Pagination totalPost={totalPost} postPerPage={postPerPage} paginate={paginate} />
        </div>
    );
};

export default RickList;