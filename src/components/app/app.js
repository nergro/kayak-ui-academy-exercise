import { hot } from 'react-hot-loader/root';

import React, { Component } from 'react';

import Autocomplete from '../autocomplete/autocomplete';

import styles from './app.css';



class App extends Component {
	state = {
		
	}



  render() {
    return (
    	<div className={styles.container}>
		    <Autocomplete />
		</div>
    );
  }
}

export default hot(App);
