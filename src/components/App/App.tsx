import React, { Component } from 'react'
import { fetchDogData, fetchErrorImage } from '../../utilities/apiCalls'
import { Props } from '../../utilities/interfaces'
import FeaturedDogs from '../FeaturedDogs/FeaturedDogs'
import Matches from '../Matches/Matches'
// import Favorites from '../Favorites/Favorites'
import Error from '../Error/Error'
import { Route , Switch, Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import './App.css'
import logo from '../../assets/canine-cupid_logo.png';

type appState = {
  dogs: []
  filteredDogs: []
  favorites: number[]
  error: string
  errorStatus: number
  errorImageURL: string
}

class App extends Component<{}, appState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      dogs: [],
      filteredDogs: [],
      favorites: [],
      error: '',
      errorStatus: 0,
      errorImageURL: ''
    }
  }

componentDidMount(): void {
  fetchDogData()
  .then(data => this.setState({dogs: data}))
  .catch(error => this.getErrorCode(error.message))

  // fetchErrorImage(this.state.errorStatus)
  // .then(data => console.log(data))
}

getErrorCode = (error: string) => {
  const errorString = error.slice(0,3)
    const errorInteger = parseInt(errorString)
    this.setState({...this.state, error: error, errorStatus: errorInteger })
    fetchErrorImage(errorInteger)
    .then(data => this.setState({...this.state, errorImageURL: data}))
  }
  

  onFavorite = (id: number) => {
    this.setState({...this.state, favorites: [...this.state.favorites, id]})
  }

  //In progress once form is created to get filter keywords
  // filterDogsByTemperament = () => {
  //   this.setState({...this.state, filteredDogs: [...this.state.filteredDogs, name]})
  // }

  render() {
    return (
      <main className='App'>
        <nav>
          <img src = {logo} className= "logo" alt='canine cupid logo'/>
          <h1 className='app-title'>Canine Cupid - A Wag Worthy Match</h1>
          <NavLink to = '/'>Home</NavLink>
          <NavLink to = '/matches'>Matches</NavLink>
          {/* <NavLink to = '/favorites'>Favorites</NavLink> */}
        </nav>
          {/* {this.state.error && <h2 className='error-message'>{this.state.error}</h2>} */}
        <Switch>
          <Route path='/error' render={() => <Error message={this.state.error} url={this.state.errorImageURL} />}/>
          <Route exact path='/'>
            {this.state.error ? <Redirect to='/error' /> : <FeaturedDogs dogs={this.state.dogs} /> }
          </Route>
          <Route exact path='/matches' render={() => <Matches filteredDogs={this.state.filteredDogs} onFavorite={this.onFavorite}/>}/>
          <Route render={() => <Redirect to={{pathname: '/'}} /> } />
          {/* <Route exact path='/favorites' render={() => <Favorites favoriteDogs={this.state.favorites} />}/> */}
       </Switch>
      </main>
    )
  }
}

export default App;
