import { useState } from "react";
import "./gym.css";
import { useEffect } from "react";

let Gym = () => {
  const url = "https://exercisedb.p.rapidapi.com/exercises";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "672444eaf8msh8b507bd5de45338p1fdda4jsn1ef9821237db",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  const [exercises, setExercise] = useState([]);
  const [constdata , setConstData] = useState([]);
  const [count , setCount] = useState(19);
  

  async function fetchData() {
    let data = await fetch(url, options);
    let parsedData = await data.json();
    setExercise([...exercises, ...parsedData]);
    setConstData([...constdata , ...parsedData])
  }

  useEffect(() => {
    fetchData();
  }, []);
  

  let searchFunctionality = (value) => {
    let arr = [...constdata]
    let filtered = arr.filter((Element , index) => {
        let name =  Element.name.toLowerCase();
        let target = Element.target.toLowerCase();
        let bodyPart = Element.bodyPart.toLowerCase()
        let searchs = value.toLowerCase();
        if( index <= count && name.includes(searchs) || target.includes(searchs) || bodyPart.includes(searchs)){
            return true;
        }
        
    });
    setExercise([...filtered]);
  }

  
 

  return (
    <div className="main-cont">
      <div className="header">
        <h2>Where Fitness Meets Fun and Results Are Achieved</h2>
        <p>
          Include an inspiring image or video that showcases your gym's
          energetic atmosphere, trainers, or members working out.
        </p>
      </div>

      <div className="gallery">
        <div className="images">
          <img
            src="https://www.pixelstalk.net/wp-content/uploads/images6/Fitness-Desktop-Wallpaper.jpg"
            alt="#"
            className="image"
          />
          <img
            src="https://cutewallpaper.org/thumb/281/disks-4k-dumbbells-gym-weight-sebouk.jpg"
            alt="#"
            className="image"
          />
          <img
            src="https://wallpaperaccess.com/full/1087621.jpg"
            alt="#"
            className="image"
          />
          <img
            src="https://i.ytimg.com/vi/gey73xiS8F4/maxresdefault.jpg"
            alt="#"
            className="image"
          />
          <img
            src="https://wallpapercave.com/wp/wp6331008.jpg"
            alt="#"
            className="image"
          />
          <img
            src="https://img.freepik.com/premium-photo/woman-training-gym_946657-755.jpg"
            alt="#"
            className="image"
          />
        </div>
      </div>

      <div className="search_exercise">
        <h1>Exercise List</h1>
        <input
          type="text"
          placeholder="Search by target, body part, or exercise"
          onChange={(e) => searchFunctionality(e.target.value)} />
        <div className="exercises">

          {exercises.map((Element, index) =>  {
            
            console.log(count);
            if(index <= count){
             return <div className="exercise" key={index}>
                        <div className="gif">
                <img
                  src= {Element.gifUrl}
                  alt="#"
                />
                        </div>
                        <h2>{Element.name}</h2>
                        <p>{Element.target}</p>
                        <p>{Element.bodyPart}</p>
                    </div>
            }
          })}

        </div>
        <button onClick={() => setCount((prev) => prev + 20)}>Load More</button>
      </div>
    </div>
  );
};

export default Gym;
