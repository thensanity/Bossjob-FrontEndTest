import React from 'react';
import '../../App.scss';

const Pagination = (props) => {
    

    const pageLinks =[]

    for(let i =1; i <=props.pages +1; i ++ ){
        let active = props.currentPage === i ? "active" : "";

        pageLinks.push(<li className={`waves-effect ${active}`} key={i} onClick={()=> props.nextPage(i)}><a href="#">{i}</a></li>)
    } 

    return(
        <div className="container">
            <div className="row">
                <ul>
                {props.currentPage > 1 ? <li className="--prev" onClick={()=> props.nextPage(props.currentPage - 5, props.startPage -4 )}><a href="#">Previous</a></li> : ""}
                    {pageLinks.slice(props.startPage, props.endPage).map((item,key) => {
                       return ( <li key={key} type="button"
                        className={`${item === props.pages ? "--active" : ""}`}>
                         {item}
                    </li>)
                    })}
                    {props.currentPage < props.pages + 1 ? <li className="--next" onClick={()=> props.nextPage(props.currentPage + 5, props.endPage -5 )}><a href="#">Next</a></li> : ""}
                </ul>
            </div>
        </div>     
    )
}

export default Pagination;