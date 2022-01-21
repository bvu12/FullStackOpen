import React, {useState, useEffect} from "react";
import Country from "./components/Country";
import axios from 'axios'



// List all countries provided, add a "show" button that shows the information on click
const MultipleCountries = ({countries}) => {

  const [renderCountries, setRenderCountries] = useState(Array(countries.length).fill(false));

  const handleCountryclick = (index) => {
    // Copy a reference or else this will not re-render
    const copy = [...renderCountries];
    copy[index] = !copy[index]
    setRenderCountries(copy)
  }
  

  return (
    <div>
        {countries.map((country, i) => 
          <div> 
            {country.name.common}
            {/* Provide i as an index to change the state array */}
            <button onClick= {handleCountryclick.bind(this, i)}>show</button>
            {renderCountries[i] ?
              <Country country={country} /> :
              null}
            </div>)}
      </div>
  )
}

// Determine what output to display depending on what countries are provided
//  If nothing provided - indicate this
//  If over 10 results provided - indicate this
//  If a single result is provided - show this countries' information
//  Otherwise, allow the user too choose what information to show
const Countries = ({countries}) => {
  if (countries.length === 0) {
    return (
      <div>
        No results!
      </div>
    )
  } else if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length===1){
    return <Country country={countries[0]} />
  } else {
    return (
      <MultipleCountries countries = {countries}/>
    )
  }
}

const Filter = ({value, onChange}) => {
  return (
    <div>
      find countries 
      <input 
      value = {value}
      onChange = {onChange}/>
    </div>
  )
}

function getCountries(countries, filter) {
  let filteredCountries = [];

  for (let i = 0; i < countries.length; i++) {
    const countryName = countries[i].name.common

    if (countryName.toLowerCase().includes(filter.toLowerCase())) {
      filteredCountries = filteredCountries.concat(countries[i])
    }
    
  }
  return filteredCountries;
}

function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }

  const countriesToShow = getCountries(countries, filter)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(hook, [])

  return (
    <div className="App">
      <Filter value = {filter} onChange ={handleFilterChange}/>
      <Countries countries = {countriesToShow} />
    </div>
  );
}

export default App;
