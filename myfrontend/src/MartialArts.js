import React, {useState, useEffect} from "react";
import axios from 'axios';

const MartialArts = ({martialArt, handleMartialArt, handleCurrent}) => {

  useEffect(() => {
      axios.get('/api/martialArts')
      .then(response => handleMartialArt(response.data))
      .catch(error =>console.log(error))
  }, [])

  const handleClick = (clicked) => {
    handleCurrent(clicked)
  }

  return (
  <>
      <div><h1>Martial Arts:</h1>
          {martialArt
      // .filter(post => post.title.startsWith('a'))
      // .slice(0, props.noPosts)
      .map(art => (<div key={art.id} onClick={ () => { 
          handleClick(art.id)
        } 
        }> {art.name} </div>))}
      </div>
  </>
  )
}
export default MartialArts;