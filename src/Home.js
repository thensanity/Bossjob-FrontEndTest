import React, { Component } from 'react';
import './App.scss';
import { Input } from "antd";
import Color from "./Color";

import { bindActionCreators } from "redux";
import { requestApiData } from "./actions"
// Redux
import { connect } from "react-redux";

// Components

import companyLogo from '../src/assets/images/companyLogo.jpg'
import  Pagination from "../src/shared/components/pagination"

// Styles
import ListStyled from "./style";

import Header from './shared/components/Header'

const baseURL = () => {
  return "https://search.bossjob.com/api/v1/search/job_filter?size=12&";
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item:[],
      pageOfItems: [],
      isLoaded: false,
      currentPage: 1,
      todosPerPage: 12,
      startPage: 0,
      endPage: 5,
      modalFilterVisible: false,
      startDate: null,
      endDate: null,
      focusedInput: null,
      status: "",
      filtered: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.filterList = this.filterList.bind(this)
  }

  
  componentDidMount() {
    fetch(`${baseURL()}${"page=" + this.state.currentPage}`)
       .then(res=> res.json())
       .then(json => {
           this.setState({
             isLoaded: true,
             item: json.data,
             todosPerPage: json.data.size,
            
           })
       })
      
    this.props.requestApiData();
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  nextPage = (pageNumber) => {
    fetch(`${baseURL()}${"page=" + pageNumber}`)
       .then(res=> res.json())
       .then(json => {
           this.setState({
             isLoaded: true,
             filtered: json.data.jobs,
             currentPage: pageNumber,
             startPage: pageNumber - 4,
             endPage: pageNumber + 5,
             todosPerPage: json.data.size
           })
       })
  }

  
  handleChange = e => {
    if(this.props.data !== undefined){
      this.setState({
        filtered: this.props.data.data.jobs
      })
    }
    console.log(this.state.filtered)
  }

  filterList = e => {
    const updatedList = this.props.data.data.jobs.filter(item => {
      return (
        item.job_title.toLowerCase().search(e.target.value.toLowerCase()) !== -1 || 
        item.company_name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      );
    });
    console.log(updatedList)
    this.setState({ filtered: updatedList });
  };


  render() {
   
    const {currentPage, startPage, endPage} = this.state; 
    const numberPages = this.state.item.total_pages;

      return (
        <ListStyled>
        <div className="App">
          <div className="App-Wrapper">
            <Header />
            <p className="title">
           <div style={{display: "flex"}}>
            <div className="search-button">
              <span className="icon" style={{backgroundColor: Color.congressBlue}}></span>
            </div>
               <Input
                  placeholder="Search for job title or company name"
                  icon="search"
                  onClick={this.handleChange}
                  onChange={this.filterList}
                  style={{ border: "none", height: "30px", width: "300px", textAlign: "center"}}
                />
            </div>
              </p>
                 <button className="button"  >Filter Result</button>
                     <div style={{padding: '10px 20px'}}>
                     {this.props.data !== undefined ? (
                        this.state.filtered.map((item,key) =>
                          <article className="article" key={key}>
                          <div style={{display: "flex", justifyContent : 'space-between',  marginBottom:"10px"}}>          
                             <h3 className="article__title" >{item.job_title}</h3>
                               <h2 className="article__category" style={{ color: Color.black}}>${item.salary_range_from}-${item.salary_range_to}</h2>
                                 </div>  
                                  <div style={{display: "flex", justifyContent : 'space-between', marginBottom:"10px"}}>
                                  <div>{item.company_location
                                  }</div>
                                   <div>{item.xp_lvl}
                                   </div>
                                  </div>
                                 <div style={{display: "flex", justifyContent : 'space-between', marginBottom:"15px"}}>
                                 <div>
                                 {item.degree}
                                 </div>
                                  <div>
                                  {item.job_type}
                                  </div>
                                  </div>
                               <div style={{display: "flex", justifyContent : 'space-between'}}> 
                                 <img src={companyLogo} className="companyLogo" alt=""/>
                                  <p className="article__excerpt">{item.company_name}</p>
                                    <p className="article__excerpt">{parseInt((new Date() - new Date(item.job_updated_at))/ (1000 * 60 * 60 * 24)) >= 1 ?
                                      parseInt((new Date() - new Date(item.job_updated_at))/ (1000 * 60 * 60 * 24)) :
                                      parseInt((new Date() - new Date(item.job_updated_at))/ (1000 * 60 * 60 ))}{""}
                                      {parseInt((new Date() - new Date(item.job_updated_at))/ (1000 * 60 * 60 * 24)) >= 1 ? "days ago" : "hours ago"}</p>
                                    </div>
                               </article>                      
                        )
                     ) : null}
                 <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={currentPage} startPage={startPage} endPage={endPage}/>
            </div>
          </div>
        </div>  
        </ListStyled>
      );
    }
}

const mapStateToProps = state => ({ data: state.data });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestApiData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
