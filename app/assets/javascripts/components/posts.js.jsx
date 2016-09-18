class Posts extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      posts: props.posts,
      editorMode: false,
      showForm: false
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

  changeMode(){
    this.setState({ editorMode: !this.state.editorMode })
  }

  render(){
    const { posts, editorMode } = this.state
    let postsRows = []
    posts.forEach( (post) => {
      postsRows.push(<Post data={post} key={post.id} likePost={this.likePost.bind(this)} dislikePost={this.dislikePost.bind(this)}/>)
    })
    return(
      <div className='container'>
          {
            editorMode
            ? <div className='posts-actions'>
                <button className='btn btn-info' onClick={this.changeMode.bind(this)}>
                  Reader Mode
                </button>
                <Form handleAddPost={this.addPost.bind(this)}/>
              </div>
            : <div className='posts-actions'>
                <button className='btn btn-info' onClick={this.changeMode.bind(this)}>
                  Editor Mode
                </button>
              </div>
          }
        <div className='posts-container'>
          {postsRows}
        </div>
      </div>
    )
  }
}
