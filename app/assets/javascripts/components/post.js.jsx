class Post extends React.Component {
  render(){
    const { name, text } = this.props.data
    return(
      <div>
        <div>
          {name}
        </div>
        <div>
          {text}
        </div>
      </div>
    )
  }
}
