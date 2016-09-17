//import Post from './post.js.jsx'

class Posts extends React.Component {
  render(){
    const { posts } = this.props
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
