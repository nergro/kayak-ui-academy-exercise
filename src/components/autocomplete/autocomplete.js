import React, { Component } from 'react';

import styles from './autocomplete.css';


class Autocomplete extends Component {

	constructor(props) {
    super(props);
    this.state = {
    	input: 'hello',
    	isLoaded: false,
      	movies: [],
      	updated: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.clearMovies = this.clearMovies.bind(this);
  }

  handleChange(e) { 

  	this.setState({
      input: e.target.value
    }, () => {
      if (this.state.input && this.state.input.length >= 3) {
          this.fetchMovies()
        
      } else {
      	this.clearMovies();
      }
    })


  }

  clearMovies() {
  	this.setState({
  		movies: []
  	})
  }

  fetchMovies() {

  fetch('https://api.themoviedb.org/3/search/movie?api_key=cab2afe8b43cf5386e374c47aeef4fca&language=en-US&query='+ this.state.input +'&page=1&include_adult=false')
    .then(res => res.json())

    .then(data =>
      this.setState({
        isLoaded: true,
        movies: data.results,
        updated: true
      })
    )
    .catch(error => this.setState({ error, isLoading: false }));
}



  render() {
  	let arr = this.state.movies.slice(0,8);
    return (
      <div className={styles.container}>
		<input placeholder="Search."  onChange={this.handleChange}/>
		 { 
          arr.map(user => {
            const { title, vote_average, release_date, id } = user;
            return (
              <div key={id}>
                <p>{title}</p>
                <p>{vote_average} Rating, {release_date.substring(0,4)}</p>
                <hr />
              </div>
            );
          })
         }
	  </div>



	












	  
    );
  }
}


export default Autocomplete;
