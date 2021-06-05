import Gallery from "react-photo-gallery";
import React, {useEffect} from "react";
import axios from 'axios';

const PhotoGallery = ({category}) => {

    var IMAGES = ([])

    const handleImages = (images) => {
        for (const image of images) {
            if (image["url"].toLowerCase().includes(category.toLowerCase())) {
                const img = {
                    src: image["url"],
                    width: 4,
                    height: 3
                }
                IMAGES.push(img)   
            }
        }
    }

    useEffect(() => {
        axios.get('/img/images')
        .then(response => handleImages(response.data))
        .catch(error =>console.log(error))
    }, [handleImages])
  
    return (
        <Gallery photos={IMAGES}/>
    )
  }
  export default PhotoGallery;