import 'bootstrap/dist/css/bootstrap.min.css';
import MartialArts from "./MartialArts";
import ModifyMartialArt from "./ModifyMartialArt";
import UploadImages from "./ImagesForm";

import {useState} from "react";
// import MyForm from './MyForm';

function App() {

  const [initialValue, setInitialValue] = useState(0);

  // const setInitialValue = (event) => {
  //   console.log(event.target.value)
  // };

  return (
    <div>
     {/* {initialValue} <br/>
     
    //  <input onChange={handleInitialValue}/> <br/> */}

     {/* <Post onPost={initialValue} changeParentHandler={setInitialValue}/> */}
     {<MartialArts current={initialValue} changeParentHandler={setInitialValue} />}
     <ModifyMartialArt /> <br />
     <UploadImages />
    </div>
    
  );
}

export default App;
