import {Component} from 'react'

import './index.css'

class ListItem extends Component {
  state = {
    titles: '',
    bodys: '',
  }

  onSubmitUpdateForm = event => {
    event.preventDefault()
    const {eachEntry, updateEntriesList} = this.props
    const {titles, bodys} = this.state
    const updatedEntry = {
      id: eachEntry.id,
      userId: eachEntry.userId,
      title: titles,
      body: bodys,
    }
    updateEntriesList(updatedEntry)
  }

  onChangeBody = event => {
    this.setState({bodys: event.target.value})
  }

  onChangeTitle = event => {
    this.setState({titles: event.target.value})
  }

  render() {
    const eachEntry = this.props
    return (
      <li>
        <div className="each-entry-top-container">
          <p>{eachEntry.eachEntry.id}</p>
        </div>

        <div className="each-entry-top-container">
          <h1 className="each-entry-title">{eachEntry.eachEntry.title}</h1>
        </div>
        <p className="each-entry-body">{eachEntry.eachEntry.body}</p>
        <hr className="each-entry-hr-line" />
      </li>
    )
  }
}

export default ListItem
