import memoriePhoto from '../../../assets/memories-images/New-York.jpg'

function Memories () {

  return(
    <div className="memories-container">

      <div className="memorie-card">
        <img src={memoriePhoto} className="card-img-top" alt="All memories main photo" />
        <h5 className="card-title">Your memories</h5>
        <button className="see-all-memories-button">See all</button>
      </div>

      <div className="memorie-card">
        <img src={memoriePhoto} className="card-img-top" alt="Trip to New York main photo" />
        <h5 className="card-title">Trip to New York</h5>
        <button className="share-memorie-button">Share</button>
      </div>

      <div className="memorie-card">
        <img src={memoriePhoto} className="card-img-top" alt="Coffee photo" />
        <h5 className="card-title">Coffee</h5>
        <button className="share-memorie-button">Share</button>
      </div>

      <div className="memorie-card">
        <img src={memoriePhoto} className="card-img-top" alt="Meet up photo" />
        <h5 className="card-title">Meet up</h5>
        <button className="share-memorie-button">Share</button>
      </div>

    </div> 
  )

}

export default Memories