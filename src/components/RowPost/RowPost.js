import React,{useEffect,useState} from 'react'
import YouTube from 'react-youtube';
import axios from '../../axios'
import {imageUrl,API_KEY} from '../../constants/constants'
import "./RowPost.css";
function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [yturl,setYturl]=useState('')

  useEffect(()=>{
    axios.get(props.url).then((response)=>{
      console.log(response.data)
      setMovies(response.data.results)
    })
  },[])
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const movieClick=(id)=>{
    console.log(id)
    axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
      
      if(response.data.results.length!==0)
      setYturl(response.data.results[0])
      else
      console.log('not available')
    })
  }
  return (
    <div className="row">
        <h2>{props.title}</h2>
        <div className='posters'>
          {movies.map((obj)=>
          <img onClick={()=>{movieClick(obj.id)}} className={props.isSmall?'smallposter':'poster'} src={`${movies? imageUrl + obj.backdrop_path:''}`} alt="poster" />
           )}
        </div>
        {yturl ? <YouTube videoId={yturl.key} opts={opts}/>:''}
    </div>
  )
}

export default RowPost