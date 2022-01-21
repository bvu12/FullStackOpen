import React from "react";

const Languages = ({country}) => {
    let languages = [];
  
    for (const language in country.languages) {
      languages = languages.concat(country.languages[language])
    }
  
    return (
      <div>
        {languages.map(language => <li key={language}>{language}</li>)}
      </div>
    )
  }
  
  // Display a given country's information
  const Country = ({country}) => {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h2>Spoken language</h2>
        <Languages country={country} />
        <img src={country.flags.png} width="150px"/>
      </div>
    )
  }


export default Country