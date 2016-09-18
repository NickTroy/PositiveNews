class Posts extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      posts: props.posts,
      editorMode: false
    }
  }

  changeMode(){
    this.setState({ editorMode: !this.state.editorMode })
  }

  render(){
    const { posts, editorMode } = this.state
    let postsRows = []
    posts.forEach( (post) => {
      postsRows.push(<Post data={post} key={post.id}/>)
    })
    return(
      <div className='container'>
          {
            editorMode
            ? <div className='posts-actions'>
                <button>
                  Add new post
                </button>
                <button className='btn btn-info' onClick={this.changeMode.bind(this)}>
                  Reader Mode
                </button>
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