import React from 'react';
import { useEffect, useState } from "react";


const Pagination = ({totalPost,postPerPage,paginate,currentPage}) => {
    
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(totalPost/postPerPage); i++) {
      pageNumbers.push(i)        
    }
   

    return (
        <div>
            <ul className='pages'>
                {
                    pageNumbers?.map(num=> {
                        return(
                        <li className={`pagination ${currentPage-1 === num ? 'selected' : ''}`} key={num}>
                            <a className={`${currentPage-1 === num ? 'selected' : ''}`} onClick={() => paginate(num)} 
                                href="#rick">
                                {num+1}
                            </a>
                        </li>
                    )})
                }
            </ul>
        </div>
    );
};

export default Pagination;
