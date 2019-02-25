import React, { Component } from 'react';

import './autocomplete.css';
import './bootstrap.css';

class Autocomplete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      isLoaded: false,
      movies: [],
      updated: false,
      display: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.clearMovies = this.clearMovies.bind(this);
    this.handleSuggestion = this.handleSuggestion.bind(this);
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
        updated: true,
        display: true
      })
    )
    .catch(error => this.setState({ error, isLoading: false }));
}

 handleSuggestion(e, t) {
    this.setState({
        input: t.title,
        display: false
      })
  }




  render() {
  	let arr = this.state.movies.slice(0,8);
    return (

 <div className="container-fluid">
        <div className="row">
            <div className="col">
                <form className="search-form search" >
                    <div className="input-group">

                        <div className="input-group-prepend">
                            <span className="input-group-text" id="iconback">
                                 <img src="https://drive.google.com/uc?id=1KWAoeCX7h4Ul0EjgoftYYSo7QZRNQUeD" className="movielogo" />

                            </span>
                        </div>
                        <input className="form-control" 
                        type="text" 
                        placeholder="Enter movie name" 
                        autoComplete="off" 
                        id="inputback" 
                        spellCheck="false"
                        onChange={this.handleChange} 
                        value={this.state.input}
                        />
                               <ul className="results" style={{display: this.state.display ? 'block' : 'none' }}>

                               { 
                                  arr.map(user => {
                                    const { title, vote_average, release_date, id } = user;
                                    return (
                                      <li key={id}>
                                        <a href="#" 
                                        onClick={(e) => this.handleSuggestion(e,{title})}
                                        >
                                          <h6>
                                            <strong>
                                              {title}
                                            </strong>
                                          </h6>
                                          <span>
                                            {vote_average} Rating, {release_date.substring(0,4)}
                                          </span>
                                        </a>
                                      </li>
                                    );
                                  })
                            }
                               

                             </ul>
                            

                        
                            <button className="btn btn-light" type="button" id="searchbutton">
                                &nbsp;
                                <span id="searchicon">
                                       <img src="https://drive.google.com/uc?id=1NvMb6LY1-DY9HRMZD8RngPz4jN7KVvo8" className="searchlogo" />
                                </span>

                            </button>
                       


                    </div>
             
                </form>
            </div>
        </div>
    </div>


	  
    );
  }
}


export default Autocomplete;
