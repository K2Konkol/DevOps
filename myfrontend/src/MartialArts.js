import React, {useState, useEffect} from "react";
import axios from 'axios';

const MartialArts = (props) => {

  const [martialArts, setMartialArts] = useState([]);

  useEffect(() => {
      axios.get('/api/martialArts')
      .then(response => setMartialArts(response.data))
      .catch(error =>console.log(error))
  }, [])

  return (
  <>
      <div><h1>Martial Arts:</h1>
          {martialArts
      // .filter(post => post.title.startsWith('a'))
      // .slice(0, props.noPosts)
      .map(martialArt => (<div key={martialArt.id} onClick={(props) => {
        props.current = martialArt.id
        console.log(props.current)
      }
        }> {martialArt.name} </div>))}
      </div>
  {/* <div>Number {number} </div>
  <input onChange={handleNumberChange} /> */}
  </>
  )
}
export default MartialArts;