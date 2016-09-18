class Post extends React.Component {

  timeAgo(miliseconds) {
    let seconds = Math.floor((new Date().getTime() - miliseconds) / 1000)
    let interval = Math.floor(seconds / 31536000)
    if (interval > 1) {
      return interval + " years"
    }
    interval = Math.floor(seconds / 2592000)
    if (interval > 1) {
    return interval + " months"
    }
    interval = Math.floor(seconds / 86400)
    if (interval > 1) {
      return interval + " days"
    }
    interval = Math.floor(seconds / 3600)
    if (interval > 1) {
      return interval + " hours"
    }
    interval = Math.floor(seconds / 60)
    if (interval > 1) {
      return interval + " minutes"
    }
    if (interval == 0) {
      return "some seconds"
    }
    return Math.floor(seconds) + " seconds"
  }


  render(){
    const { name, text, created_at } = this.props.data
    const userName = this.props.data.user.name
    const timeAgo = this.timeAgo(created_at)
    return(
      <div className='post-container'>
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
        </div>
      </div>
    )
  }
}
