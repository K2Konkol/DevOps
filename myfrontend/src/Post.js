import React, {useState, useEffect} from "react";
import axios from 'axios';

const Post = (props) => {

    const [posts, setPosts] = useState([]);
	const [number, setNumber] = useState([]);

	const handlePostClick = (event) => {
		console.log(event.target)
	}

	const handleNumberChange = (event) => {
		setNumber(event.target.value);
		props.changeParentHandler(event.target.value)
	}

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => setPosts(response.data))
        .catch(error =>console.log(error))
    }, [])

    return (
		<>
        <div>
            {posts
				// .filter(post => post.title.startsWith('a'))
				.slice(0, props.noPosts)
				.map(post => (<div key={post.id} onClick={handlePostClick}> {post.title} </div>))}
        </div>
		<div>Number {number} </div>
		<input onChange={handleNumberChange} />
		</>
    )
};

export default Post;