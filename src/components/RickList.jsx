import React from 'react';
import axios from 'axios'
import { useEffect, useState } from "react";
import RickItem from './RickItem';
import Pagination from './Pagination';
import Bg from '../assets/bg.svg';

const RickList = () => {
    const [text, setText] = useState('')
    const [world, setWorld] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [searchResults, setSearchResults] = useState([]);
    const [postPerPage] = useState(6)
    const totalPost = world.residents?.length
    const indexOfLastPost = currentPage * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPosts = world.residents?.slice(indexOfFirstPost, indexOfLastPost)
    const [showSearchResults, setShowSearchResults] = useState(false); 
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber + 1)        
    } 

    const handleInputChange = (e) => {
        const value = e.target.value;
    
        if (value.trim() !== '') {
          axios.get(`https://rickandmortyapi.com/api/location/?name=${value}`)
            .then(res => {
                if (res.data.results.length > 0) {
                    setSearchResults(res.data.results);
                    setShowSearchResults(true);
        }})
            .catch(error => {
                console.error(error);
              });
        } else {
          setSearchResults([]);
          setShowSearchResults(false)
        }
      };

      const handleSearchResultClick = (resultId) => {
        setText(resultId);
        if(text === resultId){
            setShowSearchResults(false);
            newText();
        }
      };


    useEffect(() => {
        const randomId = Math.floor(Math.random() * 126 + 1)
        axios.get(`https://rickandmortyapi.com/api/location/${randomId}/`)
            .then(res => setWorld(res.data))
            .catch(error => {
                console.error(error);
            });
    }, [])

    const newText = () => {
        axios.get(`https://rickandmortyapi.com/api/location/${text}/`)
            .then(res => {
                setWorld(res.data)
                setCurrentPage(1)
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className="App">
            <div className="front-page">
                <h1>Rick and Morty Wiki</h1>
                <div className='search'>
                    <input type="text"  required onChange={e => handleInputChange (e)} />
                    <button onClick={() => {
                        newText();
                        }}>
                        <span class="material-symbols-outlined">search</span>
                    </button>
                    {showSearchResults && (
                    <ul className='similar-searches'>
                    {searchResults.map(result => (
                        <li key={result.id} onMouseDown={() => handleSearchResultClick(result.id)}
                        >{result.name}</li>
                    ))}
                    </ul>
      )}
                </div>
            </div>
            <div className='container-info_planet'>
                <img className='bg' src={Bg} alt="" srcset="" />
                <div className='container-info'>
                    <div className='info-world'>
                        <p className='planet-type' > {`(${world.type?.toUpperCase()})`}</p>
                        <div className="planet-title_info">
                            <h2 className='planet-title'>{world.name}</h2>
                        </div>
                        <h3 className='planet-dimension'>{world.dimension?.toUpperCase()}</h3>
                    </div>
                </div>
                <h2 className='residents'>{`Residents : ${world.residents?.length}`}</h2>
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
                <Pagination totalPost={totalPost} currentPage={currentPage} postPerPage={postPerPage} paginate={paginate} />
            </div>
        </div>
    );
};

export default RickList;