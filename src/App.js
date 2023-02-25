import './styles/App.css';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import {FaWind} from "react-icons/fa";
import {GiWaterDrop} from "react-icons/gi";
import {CiTempHigh} from "react-icons/ci";

function App() {
  //Input
  const [location, setLocation] = useState("");
  //API
  const [trenutno, setTrenutno] = useState({});
  const [data, setData ] = useState({});
  //Trenutno
  const [cas,setCas] = useState("0");
  const [min, setMin] = useState("");
  const [day, setDay] = useState("");
  const [datum, setDatum] = useState("");
  const [mesec, setMesec] = useState("");
  const [godina, setGodina] = useState("");
  //Sutra
  const [oneCas,setOneCas] = useState("0");
  const [oneMin, setOneMin] = useState("");
  const [oneDay, setOneDay] = useState("");
  const [oneDatum, setOneDatum] = useState("");
  const [oneMesec, setOneMesec] = useState("");
  const [oneGodina, setOneGodina] = useState("");
  //Loop
  const [index, setIndex] = useState(1);
  let h = useRef(3);
  const zone = useRef("");
  //Ikonice
  const [iconOne, setIconOne] = useState("");
  const slikaJedan =  `http://openweathermap.org/img/w/${iconOne}.png`;
  const slikaDva = `http://openweathermap.org/img/w/${data?.list?.[index]?.weather?.[0]?.icon}.png`;
  //Arrays
  const meseci = ["Januar", "Februar", "Mart", "Aprli", "May", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];
  const dani = ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub"];
  
  const mesto = (e) => {
    setLocation(e.target.value);
  }

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=beograd&lang=hr&units=metric&appid=1159110a02c69766ba100f2d177eb66b`;
    axios.get(url).then((response) => {
      console.log(response.data);
      setTrenutno(response.data);
      setIconOne(response.data.weather[0].icon);
      zone.current = response.data.timezone /60/60;
      if (response.data.weather[0].main === "Clear" && response.data.weather[0].icon === "01d"  ) {
        document.getElementById("container").style.backgroundImage = "url(https://media.istockphoto.com/id/508544168/photo/clear-blue-sky-background.jpg?b=1&s=170667a&w=0&k=20&c=rzsADNkqiN0SxgvaUXXKjxF-FeBDqs1-gV0jCdUZ8o4=)";
      } else if (response.data.weather[0].main === "Clear" && response.data.weather[0].icon === "01n"  ) {
        document.getElementById("container").style.backgroundImage = "url(https://images.unsplash.com/photo-1531828051742-b644a99e319d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80)";
      } else if (response.data.weather[0].main === "Clouds" && response.data.weather[0].icon === "02d"  ) {
        document.getElementById("container").style.backgroundImage = "url(https://media.istockphoto.com/id/1040911866/photo/many-little-fluffy-clouds-in-blue-sky-in-sunny-day.jpg?s=612x612&w=0&k=20&c=6POksbDFbEkPRs1yE7-77VvBrGK3Za8kT37SZdmVKAY=)";
      } else if (response.data.weather[0].main === "Clouds" && response.data.weather[0].icon === "02n"  ) {
        document.getElementById("container").style.backgroundImage = "url(https://t4.ftcdn.net/jpg/02/98/13/93/360_F_298139354_B8MchbDhUhOuAfcewRxZ9AUOKV9vsWAt.jpg)";
      } else if (response.data.weather[0].main === "Clouds" && response.data.weather[0].description !== "few clouds" && response.data.weather[0].icon.endsWith("d") === true) {
        document.getElementById("container").style.backgroundImage = "url(https://images.unsplash.com/photo-1499956827185-0d63ee78a910?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8b3ZlcmNhc3QlMjBza3l8ZW58MHx8MHx8&w=1000&q=80)";
      } else if (response.data.weather[0].main === "Clouds" && response.data.weather[0].description !== "few clouds" && response.data.weather[0].icon.endsWith("n") === true) {
        document.getElementById("container").style.backgroundImage = "url(https://wallpaperaccess.com/full/1575262.jpg)";
      } else if (response.data.weather[0].main === "Snow") {
        document.getElementById("container").style.backgroundImage = "url(https://media.istockphoto.com/id/1066960598/photo/winter-holiday-background-with-snow-copy-space.jpg?b=1&s=170667a&w=0&k=20&c=sGN4kEagd4ebDtdasYxUGvFGvGGMA2X9uwhbqoYA_9o=)";
      } else if (response.data.weather[0].main === "Rain") {
        document.getElementById("container").style.backgroundImage = "url(https://wallpaper.dog/large/427768.jpg)";
      } else if (response.data.weather[0].main === "Drizzle") {
        document.getElementById("container").style.backgroundImage = "url(https://img.wallpapic.com/i2463-231-815/medium/drizzle-nature-rain-drop-wallpaper.jpg)";
      } else if (response.data.weather[0].main === "Thunderstorm") {
        document.getElementById("container").style.backgroundImage = "url(https://rare-gallery.com/uploads/posts/4544490-photography-night-urban-lights-airport-storm-lightning.jpg)";
      } else {
        document.getElementById("container").style.backgroundImage = "url(https://images.pexels.com/photos/2529973/pexels-photo-2529973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)";
      }

      const vreme = () => {
        const d = new Date();
        d.setUTCHours(d.getUTCHours() + zone.current);
        let m = d.getMinutes();
        let utc = d.getUTCHours();
        if (utc < 10 ){
          setCas("0" + utc);
          setDay(d.getDay());
          setDatum(d.getDate());
          setMesec(d.getMonth());
          setGodina(d.getFullYear());
        } else {
          setCas(utc);
          setDay(d.getDay());
          setDatum(d.getDate());
          setMesec(d.getMonth());
          setGodina(d.getFullYear());
        }

        if(m < 10) {
          setMin("0" + m);
        } else {
          setMin(m);
        }
      }

      const dan2 = () => {
        const d = new Date();
        const timezone = zone.current;
        d.setUTCHours(d.getUTCHours() + timezone + h.current);
        let m = d.getMinutes();
        let utc = d.getUTCHours();
        if (utc < 10 ){
          setOneCas("0" + utc);
          setOneDay(d.getDay());
          setOneDatum(d.getDate());
          setOneMesec(d.getMonth());
          setOneGodina(d.getFullYear());
        } else {
          setOneCas(utc);
          setOneDay(d.getDay());
          setOneDatum(d.getDate());
          setOneMesec(d.getMonth());
          setOneGodina(d.getFullYear());
        }

        if(m < 10) {
          setOneMin("0" + m);
        } else {
          setOneMin(m);
        }
      }
      vreme();
      dan2();
      
    })
    const pet = `https://api.openweathermap.org/data/2.5/forecast?q=beograd&lang=hr&units=metric&appid=1159110a02c69766ba100f2d177eb66b`;
    axios.get(pet).then((response) => {
      console.log(response.data)
      setData(response.data);
    })
    
  }, []);

  const search = (event) => {
    if ( event.key === "Enter") {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=hr&units=metric&appid=1159110a02c69766ba100f2d177eb66b`;
    axios.get(url).then((response) => {
      console.log(response.data);
      setTrenutno(response.data);
      setIconOne(response.data.weather[0].icon);
      zone.current = response.data.timezone /60/60;
      if (response.data.weather[0].description === "vedro" && response.data.weather[0].icon === "01d"  ) {
        document.getElementById("container").style.backgroundImage = "url(https://media.istockphoto.com/id/508544168/photo/clear-blue-sky-background.jpg?b=1&s=170667a&w=0&k=20&c=rzsADNkqiN0SxgvaUXXKjxF-FeBDqs1-gV0jCdUZ8o4=)";
      } else if (response.data.weather[0].description === "vedro" && response.data.weather[0].icon === "01n"  ) {
        document.getElementById("container").style.backgroundImage = "url(https://images.unsplash.com/photo-1531828051742-b644a99e319d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80)";
      } else if (response.data.weather[0].main === "Clouds" && response.data.weather[0].description === "few clouds" && response.data.weather[0].icon === "02d"  ) {
        document.getElementById("container").style.backgroundImage = "url(https://media.istockphoto.com/id/1040911866/photo/many-little-fluffy-clouds-in-blue-sky-in-sunny-day.jpg?s=612x612&w=0&k=20&c=6POksbDFbEkPRs1yE7-77VvBrGK3Za8kT37SZdmVKAY=)";
      } else if (response.data.weather[0].main === "Clouds" && response.data.weather[0].description === "few clouds" && response.data.weather[0].icon === "02n"  ) {
        document.getElementById("container").style.backgroundImage = "url(https://t4.ftcdn.net/jpg/02/98/13/93/360_F_298139354_B8MchbDhUhOuAfcewRxZ9AUOKV9vsWAt.jpg)";
      } else if (response.data.weather[0].main === "Clouds" && response.data.weather[0].description !== "few clouds" && response.data.weather[0].icon.endsWith("d") === true) {
        document.getElementById("container").style.backgroundImage = "url(https://images.unsplash.com/photo-1499956827185-0d63ee78a910?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8b3ZlcmNhc3QlMjBza3l8ZW58MHx8MHx8&w=1000&q=80)";
      } else if (response.data.weather[0].main === "Clouds" && response.data.weather[0].description !== "few clouds" && response.data.weather[0].icon.endsWith("n") === true) {
        document.getElementById("container").style.backgroundImage = "url(https://wallpaperaccess.com/full/1575262.jpg)";
      } else if (response.data.weather[0].main === "Snow") {
        document.getElementById("container").style.backgroundImage = "url(https://media.istockphoto.com/id/1066960598/photo/winter-holiday-background-with-snow-copy-space.jpg?b=1&s=170667a&w=0&k=20&c=sGN4kEagd4ebDtdasYxUGvFGvGGMA2X9uwhbqoYA_9o=)";
      } else if (response.data.weather[0].main === "Rain") {
        document.getElementById("container").style.backgroundImage = "url(https://wallpaper.dog/large/427768.jpg)";
      } else if (response.data.weather[0].main === "Drizzle") {
        document.getElementById("container").style.backgroundImage = "url(https://img.wallpapic.com/i2463-231-815/medium/drizzle-nature-rain-drop-wallpaper.jpg)";
      } else if (response.data.weather[0].main === "Thunderstorm") {
        document.getElementById("container").style.backgroundImage = "url(https://rare-gallery.com/uploads/posts/4544490-photography-night-urban-lights-airport-storm-lightning.jpg)";
      } else {
        document.getElementById("container").style.backgroundImage = "url(https://images.pexels.com/photos/2529973/pexels-photo-2529973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)";
      }

      const vreme = () => {
        const d = new Date();
        d.setUTCHours(d.getUTCHours() + zone.current);
        let m = d.getMinutes();
        let utc = d.getUTCHours();
        if (utc < 10 ){
          setCas("0" + utc);
          setDay(d.getDay());
          setDatum(d.getDate());
          setMesec(d.getMonth());
          setGodina(d.getFullYear());
        } else {
          setCas(utc);
          setDay(d.getDay());
          setDatum(d.getDate());
          setMesec(d.getMonth());
          setGodina(d.getFullYear());
        }
    
        if(m < 10) {
          setMin("0" + m);
        } else {
          setMin(m);
        }
      }

      const dan2 = () => {
        const d = new Date();
        d.setUTCHours(d.getUTCHours() + zone.current + h.current);
        let m = d.getMinutes();
        let utc = d.getUTCHours();
        if (utc < 10 ){
          setOneCas("0" + utc);
          setOneDay(d.getDay());
          setOneDatum(d.getDate());
          setOneMesec(d.getMonth());
          setOneGodina(d.getFullYear());
        } else {
          setOneCas(utc);
          setOneDay(d.getDay());
          setOneDatum(d.getDate());
          setOneMesec(d.getMonth());
          setOneGodina(d.getFullYear());
        }
    
        if(m < 10) {
          setOneMin("0" + m);
        } else {
          setOneMin(m);
        }
      }
      vreme();
      dan2();
    })
    const pet = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&lang=hr&units=metric&appid=1159110a02c69766ba100f2d177eb66b`;
    axios.get(pet).then((response) => {
      console.log(response.data)
      setData(response.data);
      setIndex(1);
  })
  setLocation("");
  h.current = 3;
}
}

  const dan2 = () => {
    const d = new Date();
    d.setUTCHours(d.getUTCHours() + zone.current + h.current);
    let m = d.getMinutes();
    let utc = d.getUTCHours();
    if (utc < 10 ){
      setOneCas("0" + utc);
      setOneDay(d.getDay());
      setOneDatum(d.getDate());
      setOneMesec(d.getMonth());
      setOneGodina(d.getFullYear());
    } else {
      setOneCas(utc);
      setOneDay(d.getDay());
      setOneDatum(d.getDate());
      setOneMesec(d.getMonth());
      setOneGodina(d.getFullYear());
    }

    if(m < 10) {
      setOneMin("0" + m);
    } else {
      setOneMin(m);
    }
  }

  const smanji = () => {
    if (index === 1) {
      setIndex(1);
      h.current = 3;
      dan2();
    } else {
      setIndex(index - 1);
      h.current = h.current - 3;
      dan2();
    }
  }

  const uvecaj = () => {
    if (index >= 1 && index < 39) {
      setIndex(index + 1);
      h.current = h.current + 3;
      dan2();
    } else {
      setIndex(index);
      dan2();
    }
  }

  return (
    <div className="App" >
      <div id="container">
        <div className='pozadina'>
        <input className='pretraga' onChange={mesto} onKeyDown={search} type="text" value={location} placeholder="Unesite lokaciju..."></input>
        <div className='trenutno'>
          <div className='prviRed'>
            <div className='lokacija' title="lokacija"> {trenutno.name}</div>
            <div className='kalendar'>
              <div className='datum'>{datum}-{meseci[mesec]}-{godina}</div>
              <div className='vreme'>{dani[day]} {cas}:{min}</div>
            </div>
          </div>
          <div className='drugiRed'>
            <div className='slika'><img src={slikaJedan} alt="trenutna slika vremena"/></div>
            <div className='temp' title='temperatura'> <CiTempHigh /> {Math.round(trenutno?.main?.temp)} °C</div>
            <div className='opisSlike'>{trenutno?.weather?.[0]?.description.charAt(0).toUpperCase() + trenutno?.weather?.[0]?.description.slice(1)}</div>
          </div>
          <div className='treciRed'>
            <div className='vetar' title="vetar"><FaWind className='' /> {Math.round(trenutno?.wind?.speed * 3.6)} km/h</div>
            <div className='vlaznost' title="vlažnost vazduha"><GiWaterDrop className='' /> {trenutno?.main?.humidity}%</div>
          </div>
        </div>
        <div className='naredno'>
          <div className='prviRed'>
            <div className='lokacija' title="lokacija"> {trenutno.name}</div>
            <div className='kalendar'>
              <div className='datum'>{oneDatum}-{meseci[oneMesec]}-{oneGodina} </div>
              <div className='vreme'>{dani[oneDay]} {oneCas}:{oneMin}</div>
            </div>
          </div>
          <div className='drugiRed'>
            <div className='slika'><img src={slikaDva} alt="vreme posle" /></div>
            <div className='temp' title="temperatura"><CiTempHigh /> {Math.round(data?.list?.[index]?.main?.temp_max)} °C</div>
            <div className='opisSlike'>{data?.list?.[index]?.weather?.[0]?.description.charAt(0).toUpperCase() + data?.list?.[index]?.weather?.[0]?.description.slice(1) }</div>
          </div>
          <div className='treciRed'>
            <button className='manje' onClick={smanji}>- 3h</button>
            <div className='vetar' title="vetar"><FaWind className='' /> {Math.round(data?.list?.[index]?.wind?.speed * 3.6)} km/h</div>
            <div className='vlaznost' title="vlažnost vazduha"><GiWaterDrop className='' />  {data?.list?.[index]?.main?.humidity}%</div>
            <button className='vece' onClick={uvecaj}>+ 3h</button>
          </div>
        </div>
        </div>
        </div>
    </div>
  );
}

export default App;
