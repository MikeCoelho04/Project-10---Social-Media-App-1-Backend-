
function SharePost () {

  return (
    <div className="share-post-container">
      <div className="new-post-card">
        <h5>Share something with your friends</h5>
        <hr />

        <div className="card-body">

          <form action="">
            <textarea id="new-post-input" placeholder="What are you thinking about?"></textarea>
          </form>

          <div className="share-post-container-controlers">
            <div>
              <button className="share-post-controler-button">📸 Upload</button>
              <button className="share-post-controler-button">👯‍♂️ Tag</button>
            </div>
            <div>
              <button className="share-post-uploader-button">Post</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )

}

export default SharePost