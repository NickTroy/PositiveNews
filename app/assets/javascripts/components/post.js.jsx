class Post extends React.Component {

  timeAgo(miliseconds) {
    let seconds = Math.floor((new Date().getTime() - miliseconds) / 1000)
    let interval = Math.floor(seconds / 31536000)
    if (interval >= 1) {
      return interval + " year(s)"
    }
    interval = Math.floor(seconds / 2592000)
    if (interval >= 1) {
    return interval + " month(es)"
    }
    interval = Math.floor(seconds / 86400)
    if (interval >= 1) {
      return interval + " day(s)"
    }
    interval = Math.floor(seconds / 3600)
    if (interval >= 1) {
      return interval + " hour(s)"
    }
    interval = Math.floor(seconds / 60)
    if (interval >= 1) {
      return interval + " minute(s)"
    }
    if (interval === 0) {
      return "some seconds"
    }
    return Math.floor(seconds) + " second(s)"
  }

  handleLike(){
    const { id } = this.props.data
    $.ajax({
      url: `/posts/${id}/like`,
      type: 'PUT',
      dataType: 'json',
      success: (response) => {
        this.props.likePost(response)
      }
    })
  }

  handleDislike(){
    const { id } = this.props.data
    $.ajax({
      url: `/posts/${id}/dislike`,
      type: 'PUT',
      dataType: 'json',
      success: (response) => {
        this.props.likePost(response)
      }
    })
  }

  render(){
    const { name, text, created_at, likes_count, dislikes_count, kind, url } = this.props.data
    const userName = this.props.data.user.name
    const timeAgo = this.timeAgo(created_at)
    let postTemplate;
    if (kind === "simple") {
      postTemplate = (
        <div className='simple-post-container'>
          <div className='post-header'>
            <div className='post-name text-center'>
              {name}
            </div>
            <div className='posted-by pull-right'>
              posted by
              <span className='post-author-name'> {userName} </span>
              <span className='post-data'>{timeAgo} ago</span>
            </div>
          </div>
          <div className='post-body'>
            <div className='post-image'>

            </div>
            <div className='post-text'>
              {text}
            </div>
            <div className='user-attitude'>
              <span className='likes'>
                <i className="fa fa-thumbs-o-up" aria-hidden="true" onClick={this.handleLike.bind(this)}></i>
                &nbsp;
                <span className='likes-count'>{likes_count}</span>
              </span>
              &nbsp;
              <span className='dislikes'>
                <i className="fa fa-thumbs-o-down" aria-hidden="true" onClick={this.handleDislike.bind(this)}></i>
                &nbsp;
                <span className='dislikes-count'>{dislikes_count}</span>
              </span>
            </div>
          </div>
        </div>
      )
    } else {
      postTemplate = (
        <iframe src={url} />
      )
    }
    return(
      <div className='post-container'>
        {postTemplate}
      </div>
    )
  }
}
