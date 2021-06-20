import React, {useState, useEffect} from "react";
import axios from 'axios';

const ModifyMartialArt = (props) => {
    const [name, setName] = useState("");

    const handleApply = (event) => {
        console.log(`Dane do wysłania!!! ${name}`);

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

    const handleUpdate = (props) => {
        axios.put('/api/martialArts', {
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
        axios.delete('/api/martialArts/', {
            name: name,
        })
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