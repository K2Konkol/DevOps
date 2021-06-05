import React, {useEffect} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, Button } from 'react-bootstrap';


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
      <ButtonGroup aria-label="Basic example" >
        {martialArt
      .map(art => (
        
          <Button variant="secondary" key={art.id} onClick={ () => { 
          handleClick(art.id)
        } 
        }> {art.name}
        
        </Button>
        ))}
        </ButtonGroup>
      </div>
  </>
  )
}
export default MartialArts;