import React from "react";
import ResultCard from "./components/results/ResultCard.component";
import { connect } from "react-redux";
import RESULTS from './components/results/resultsSample'

class ResultsList extends React.Component {
  render(){
    console.log(this.props)
    if (this.props.loading){
      return <h1>Loading</h1>
    } else{
        const routeInfo = this.props.results //RESULTS.RESULTS.data//this.props.results
        let results;
          if (!routeInfo){
            results = null
          } 
          else if(routeInfo.length === 0){
            results = <p>No results found</p>
          } else {
            results = <ResultCard link={routeInfo[0].deep_link} price={routeInfo[0].price} route={routeInfo[0].route} />
          }
        return(
          <div className="container">
              {results}       
          </div>
        )
    }
  }
}

const mapStateToProps = state => ({
  results: state.results,
  loading: state.loading
});

export default connect(mapStateToProps)(ResultsList);
