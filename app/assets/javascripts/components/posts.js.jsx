class Posts extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      posts: props.posts,
      editorMode: false,
      showForm: false,
      goodNewsMode: false
    }
  }
  componentDidMount(){
    setInterval(this.fetchPosts.bind(this), 20000)
  }
  fetchPosts(){
    $.ajax({
      url: '/posts',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        this.setState({posts: data.posts});
      }
    })
  }
  addPost(post){
    const { name, text, userId, id, likes_count } = post
    const { posts } = this.state
    this.setState({
      posts: [post].concat(posts)
    })
  }

  likePost(post){
    const { name, text, userId, id } = post
    let { likes_count } = post
    const { posts } = this.state
    const postIndex = posts.indexOf(posts.find(p => p.id === post.id))
    likes_count += 1
    this.setState({
      posts: posts.slice(0, postIndex)
                  .concat([post])
                  .concat(posts.slice(postIndex + 1))
    })
  }

  dislikePost(post){
    const { name, text, userId, id } = post
    const { posts } = this.state
    const postIndex = posts.indexOf(posts.find(p => p.id === post.id))
    let { dislikes_count } = post
    dislikes_count -= 1
    this.setState({
      posts: posts.slice(0, postIndex)
                  .concat([post])
                  .concat(posts.slice(postIndex + 1))
    })
  }

  changeReadingMode(){
    this.setState({ editorMode: !this.state.editorMode })
  }

  changeNewsMode(){
    this.setState({ goodNewsMode: !this.state.goodNewsMode })
  }

  render(){
    const { posts, editorMode, goodNewsMode } = this.state
    let postsRows = []
    posts.forEach( (post) => {
      let { likes_count, dislikes_count } = post
      let postIsGood = true
      if (likes_count + dislikes_count !== 0) {
        postIsGood = parseFloat(likes_count) / (likes_count + dislikes_count) >= 0.8
      }
      if (goodNewsMode) {
        if (postIsGood) {
          postsRows.push(<Post data={post} key={post.id} likePost={this.likePost.bind(this)} dislikePost={this.dislikePost.bind(this)}/>)
        }
      } else {
        postsRows.push(<Post data={post} key={post.id} likePost={this.likePost.bind(this)} dislikePost={this.dislikePost.bind(this)}/>)
      }
    })
    return(
      <div className='container'>
        <div className='posts-actions'>
        {
          goodNewsMode
          ? <div className='news-actions'>
              <button className='btn btn-info' onClick={this.changeNewsMode.bind(this)}>
                All News Mode
              </button>
            </div>
          : <div className='news-actions'>
              <button className='btn btn-info' onClick={this.changeNewsMode.bind(this)}>
                Good News Mode
              </button>
            </div>
        }
        {
          editorMode
          ? <div className='reader-actions'>
              <button className='btn btn-info' onClick={this.changeReadingMode.bind(this)}>
                Reader Mode
              </button>

            </div>
          : <div className='reader-actions'>
              <button className='btn btn-info' onClick={this.changeReadingMode.bind(this)}>
                Editor Mode
              </button>
            </div>
        }
        {
          editorMode
          ? <Form handleAddPost={this.addPost.bind(this)}/>
          : null
        }
        </div>
        <div className='posts-container'>
          {postsRows}
        </div>
      </div>
    )
  }
}
