class Form extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      kind: "simple",
      nameIsEmpty: true,
      textIsEmpty: true,
      urlIsInvalid: true
    }
  }

  componentDidMount(){
    this.refs.simple.click()
  }

  validateUrl(){
    const url = this.refs.urlValue.value
    const valid = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)
    this.setState({urlIsInvalid: !(valid)})
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
      const data = {
        post: { name, text, kind }
      }
      $.ajax({
        url: '/posts',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: (response) => {
          this.props.handleAddPost(response)
          this.refs.name.value = ''
          this.refs.text.value = ''
        }
      })
    } else {
      const url = this.refs.urlValue.value
      const data = {
        post: { url, kind }
      }
      $.ajax({
        url: '/posts',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: (response) => {
          this.props.handleAddPost(response)
          this.refs.urlValue.value = ''
        }
      })
    }
  }

  render(){
    const { kind, nameIsEmpty, textIsEmpty, urlIsInvalid } = this.state
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
              <div className='form-group'>
                <label>URL:</label>
                <input type='text' className='form-control' ref="urlValue" onChange={this.validateUrl.bind(this)} />
              </div>
            </div>
        }
        <button className="btn btn-success" onClick={this.handleSubmit.bind(this)} disabled={ kind == 'simple' ? nameIsEmpty || textIsEmpty : urlIsInvalid}>
          Submit Post
        </button>
      </div>
    )
  }
}
