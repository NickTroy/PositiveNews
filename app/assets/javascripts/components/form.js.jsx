class Form extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      kind: "simple",
      nameIsEmpty: true,
      textIsEmpty: true,
      urlIsEmpty: true
    }
  }

  onFieldChange(fieldName, e) {
    if (e.target.value.trim().length > 0) {
      this.setState({[fieldName]:false})
    } else {
      this.setState({[fieldName]:true})
    }
  }

  kindChange(e){
    const kind = e.target.getAttribute('data-kind')
    const oldKind = this.state.kind
    this.refs[oldKind].disabled = false
    e.target.disabled = true
    this.setState({ kind })
  }

  handleSubmit(){
    const { kind } = this.state
    if (kind == "simple") {
      const name = this.refs.name.value
      const text = this.refs.text.value
      const image = this.refs.image.value
      alert(name)
    }
  }

  render(){
    const { kind, nameIsEmpty, textIsEmpty, urlIsEmpty } = this.state
    return(
      <div className='post-form-container'>
        <div className='kind-choice'>
          <button className="secondary" data-kind="simple" onClick={this.kindChange.bind(this)} ref="simple">Simple</button>
          <button className="secondary" data-kind="url" onClick={this.kindChange.bind(this)} ref="url">Url</button>
        </div>
        {
          kind == "simple"
          ? <div className='simple-form'>
              <div className='form-group'>
                <label>Title:</label>
                <input type='text' className='form-control' ref="name" defaultValue="" onChange={this.onFieldChange.bind(this, 'nameIsEmpty')} />
              </div>

              <div className='form-group'>
                <label>Text:</label>
                <textarea className='form-control' ref="text" defaultValue="" onChange={this.onFieldChange.bind(this, 'textIsEmpty')}/>
              </div>

              <div className='form-group'>
                <label>Image:</label>
                <input type='file' ref="image" />
              </div>
            </div>
          : <div className='url-form'>
              enter url
            </div>
        }
        <button className="btn btn-success" onClick={this.handleSubmit.bind(this)} disabled={ kind == 'simple' ? nameIsEmpty || textIsEmpty : urlIsEmpty}>
          Submit Post
        </button>
      </div>
    )
  }
}
