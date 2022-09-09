import React from 'react';
import { useEffect, useState } from "react";


const Pagination = ({totalPost,postPerPage,paginate}) => {
    
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(totalPost/postPerPage); i++) {
      pageNumbers.push(i)        
    }
   
    console.log(pageNumbers, totalPost);

    return (
        <div>
            <ul className='pages'>
                {
                    pageNumbers?.map(num=> {
                        return(
                        <li className='pagination' key={num}>
                            <a onClick={() => paginate(num)} href="!#">
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
