import React, {useState} from "react";
import axios from 'axios';

const ModifyMartialArt = ({currentId}) => {
    const [name, setName] = useState("");

    const handleApply = (event) => {
        console.log(`Sending: ${name}`);

        axios.post('/api/martialArts', {
            name: name,
        })
        .then(function (response) {
            console.log(response);
          })
        .catch(function (error) {
            console.log(error);
          });
    };

    const handleUpdate = (event) => {
        console.log(`Sending: ${currentId}, ${name}`);

        axios.put(`/api/martialArts/${currentId}`, {
            name: name,
        })
        .then(function (response) {
            console.log(response);
          })
        .catch(function (error) {
            console.log(error);
          });
    }

    const handleDelete = (props) => {
        console.log(currentId)
        axios.delete(`/api/martialArts/${currentId}`)
        .then(function (response) {
            console.log(response);
          })
        .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <>
            <input type='text' value={name} onChange={event => setName(event.target.value)}/><br/>

            <input type='submit' value='Add' onClick={handleApply}/>
            <input type='submit' value='Update' onClick={handleUpdate}/>
            <input type='submit' value='Delete' onClick={handleDelete}/>
        </>
    );

};

export default ModifyMartialArt;