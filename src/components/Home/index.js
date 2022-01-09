import {Component} from 'react'

import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'

import {ImCross} from 'react-icons/im'

import Header from '../Header'
import ListItem from '../ListItem'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    selectedFile: null,
    uploadResponse: '',
    entriesList: [],
    newEntryId: '',
    newEntryUserId: '',
    newTitle: '',
    newBody: '',
  }

  getEntriesData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl =
      'https://financepeer-node-webapp.herokuapp.com/getEntriesData/'
    const options = {
      method: 'GET',
      headers: {
        authorization: `bearer ${jwtToken}`,
        'Content-Type': 'application / json',
      },
    }
    const entriesListResponse = await fetch(apiUrl, options)
    if (entriesListResponse.ok) {
      const entriesListJson = await entriesListResponse.json()
      this.setState({
        entriesList: JSON.parse(entriesListJson.entriesData),
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onSubmitAddNewEntryForm = event => {
    event.preventDefault()
    const {
      entriesList,
      newEntryId,
      newEntryUserId,
      newTitle,
      newBody,
    } = this.state
    const newEntry = {
      id: newEntryId,
      userId: newEntryUserId,
      title: newTitle,
      body: newBody,
    }
    const newEntriesList = [...entriesList, newEntry]
    this.setState({entriesList: newEntriesList})
    alert(`New Entry With The Name: ${newTitle} Is Added To The List`)
  }

  onChangeEntryId = event => {
    this.setState({newEntryId: event.target.value})
  }

  onChangeUserId = event => {
    this.setState({newEntryUserId: event.target.value})
  }

  onChangeBody = event => {
    this.setState({newBody: event.target.value})
  }

  onChangeTitle = event => {
    this.setState({newTitle: event.target.value})
  }

  selectFileToBeUploaded = event => {
    this.setState({selectedFile: event.target.files[0]})
  }

  uploadSelectedFile = async event => {
    const {selectedFile} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const uploadUrl = 'https://srikanthdisplaydata.herokuapp.com/uploadFile/'
    const options = {
      method: 'POST',
      headers: {
        authorization: `bearer ${jwtToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: selectedFile,
    }
    const uploadFileResponse = await fetch(uploadUrl, options)
    const uploadFileResponseData = await uploadFileResponse.json()
    this.setState({
      uploadResponse: uploadFileResponseData.msg,
    })
  }

  selectAndUploadFileToServer = () => (
    <div className="file-upload-container">
      <h2 className="select-file-heading">Upload File Here</h2>
      <input
        type="file"
        name="sampleFile"
        accept="application/json"
        className="file-input-style"
        onChange={this.selectFileToBeUploaded}
      />
      <button
        type="button"
        className="button-style"
        onClick={this.uploadSelectedFile}
      >
        upload
      </button>
    </div>
  )

  addNewEntryForm = () => (
    <>
      <form className="add-entry-form" onSubmit={this.onSubmitAddNewEntryForm}>
        <label className="add-entry-form-label" htmlFor="entryId">
          ENTRY ID
        </label>
        <input
          className="add-entry-form-input"
          id="addId"
          onChange={this.onChangeEntryId}
        />
        <label className="add-entry-form-label" htmlFor="userId">
          USER ID
        </label>
        <input
          className="add-entry-form-input"
          id="userId"
          onChange={this.onChangeUserId}
        />
        <label className="add-entry-form-label" htmlFor="addTitle">
          TITLE
        </label>
        <input
          className="add-entry-form-input"
          id="addTitle"
          onChange={this.onChangeTitle}
        />
        <label className="add-entry-form-label" htmlFor="addBody">
          BODY
        </label>
        <input
          className="add-entry-form-input"
          id="addBody"
          onChange={this.onChangeBody}
        />
        <button className="add-entry-form-submit-button" type="submit">
          Add Entry
        </button>
      </form>
    </>
  )

  updateEntriesList = newEntry => {
    const {entriesList} = this.state
    const updatedEntriesList = entriesList
    const currentEntry = entriesList.find(
      eachItem => eachItem.id === newEntry.id,
    )
    const indexOfEntry = entriesList.findIndex(
      eachItem => eachItem.id === newEntry.id,
    )
    updatedEntriesList.splice(indexOfEntry, 1, newEntry)
    this.setState({entriesList: updatedEntriesList})
    alert(
      `Entry With The Title: "${currentEntry.title}" Is Going To Be Updated`,
    )
  }

  renderEntriesList = () => {
    const {entriesList} = this.state
    return (
      <div className="home-list-container">
        <ul className="home-entries-list">
          {entriesList.map(eachItem => (
            <ListItem
              key={eachItem.id}
              eachEntry={eachItem}
              updateEntriesList={this.updateEntriesList}
            />
          ))}
        </ul>
      </div>
    )
  }

  addEntryPopup = () => (
    <Popup
      className="popup-content"
      trigger={
        <button className="button-style display-add-form-button">
          Add New Entry
        </button>
      }
      modal
    >
      {close => (
        <div className="popup-content-container">
          <button className="popup-close-button" type="button" onClick={close}>
            <ImCross color="#ffffff" size="30px" />
          </button>
          {this.addNewEntryForm()}
        </div>
      )}
    </Popup>
  )

  render() {
    const {uploadResponse} = this.state
    const uploadedSuccessfully =
      uploadResponse === 'data of the file is uploaded into database...'
    const failedToUpload = uploadResponse === 'invalid file'
    return (
      <div className="home-bg-container">
        <div className="home-header-container">
          <Header />
        </div>
        <div className="file-input-entry-button-container">
          <div className="file-input-container">
            {this.selectAndUploadFileToServer()}

            {failedToUpload ? (
              <p className="alert-message-para">{uploadResponse}</p>
            ) : null}
          </div>
          {uploadedSuccessfully ? (
            <button className="button-style" onClick={this.getEntriesData}>
              Records
            </button>
          ) : null}
        </div>
        <div className="home-scroll-list">{this.renderEntriesList()}</div>
      </div>
    )
  }
}

export default Home
