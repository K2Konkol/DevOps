import React, {useState, useEffect} from "react";
import axios from 'axios';

const ImagesForm = (props) => {

    // let img1 = yourFile1
    // let img2 = yourFile2
    const formData = new FormData();
    // It is of paramount importance for these to have the same name (the first paramater - here 'images')else multer will give you a very cryptic error
    formData.append("images", "image1");
    formData.append("images", "image2");
    // you can of course append anything else you'd like
    // answerFormData.append("joke", "this is a poor mama joke");

    axios({
        method: "POST",
        url: "/api/images",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
        .then(response => {
                if (response.status === 200) {
                    console.log("Success, firm added")
                } else {
                    console.log("Error occurred")
                }
            }
        ).catch(e => {
        console.log(e)
    })
    return (
        <>
            {/* <input type='text' value={title} onChange={event => setTitle(event.target.value)}/><br/>
            <input type='text' value={body} onChange={event => setBody(event.target.value)}/><br/> */}

            <input type='submit' value='OK' />
        </>
    );

};


// const ImagesForm = (props) => {
//     const [title, setTitle] = useState("");
//     const [body, setBody] = useState("");

//     const handleSubmit = (event) => {
//         console.log(`Dane do wysłania ${title} ${body}`);

//         axios.post('https://jsonplaceholder.typicode.com/posts', {
//             title: title,
//             body: body,
//             userId: 1
//         })
//         .then(function (response) {
//             console.log(response);
//           })
//         .catch(function (error) {
//             console.log(error);
//           });
//     };

//     return (
//         <>
//             <input type='text' value={title} onChange={event => setTitle(event.target.value)}/><br/>
//             <input type='text' value={body} onChange={event => setBody(event.target.value)}/><br/>

//             <input type='submit' value='OK' onClick={handleSubmit}/>
//         </>
//     );

// };

export default ImagesForm;