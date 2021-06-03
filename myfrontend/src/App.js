import 'bootstrap/dist/css/bootstrap.min.css';
import MartialArts from "./MartialArts";
import ModifyMartialArt from "./ModifyMartialArt";
import UploadImages from "./ImagesForm";

import {useState} from "react";

function App() {
  
  const [martialArt, setMartialArt] = useState([])
  const [current, setCurrent] = useState(0);

  const getCurrent = () => {
    let art = martialArt.find(art => art.id === current)
    return art ? art.name : ""
  }

  return (
    <div>
     {<MartialArts martialArt={martialArt} handleMartialArt={setMartialArt} handleCurrent={setCurrent} />}
     <h2>{getCurrent()}</h2>
     <ModifyMartialArt /> <br />
     <UploadImages current={getCurrent()}/>
    </div>
    
  );
}

export default App;
