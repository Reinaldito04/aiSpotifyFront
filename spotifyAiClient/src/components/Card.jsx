import PropTypes from 'prop-types';
import './styles/Card.css';
function Card({ song }) {
  return (
    <div className="card"
    onClick={
      () => {
        window.open(song.song_url, '_blank');
      }
    }
    >
      <img src={song.image_url} alt={`${song.name} cover`} className="card-image" />
      <div className="card-body">
        <h5 className="card-title">Titulo : {song.name}</h5>
        <p className="card-artist">Artista : {song.artist}</p>
        <p className="card-album">  Album :{song.album}</p>

       
       
        <p className='text-muted'> Duración : {song.duration}</p>
      
        <p className='text-muted'>

         {song.genres.join(', ')}
      </p>
      </div>
    </div>
  );
}

Card.propTypes = {
  song: PropTypes.shape({
    name: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    song_url : PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    duration :PropTypes.string.isRequired,
    album: PropTypes.string.isRequired,

    genres: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
};

export default Card;
