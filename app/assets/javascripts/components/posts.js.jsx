class Posts extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      posts: props.posts
    }
  }
  render(){
    const { posts } = this.state
    let postsRows = []
    posts.forEach( (post) => {
      postsRows.push(<Post data={post} key={post.id}/>)
    })
    return(
      <div>
        {postsRows}
      </div>
    )
  }
}
