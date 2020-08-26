import React, { Component } from  'react';
import config from '../config';
import BookmarksContext from '../BookmarksContext';
import './EditBookmark.css';

class EditBookmark extends Component {

  static contextType = BookmarksContext;
  
  state = {
    error: null,
    id: '',
    title: '',
    url: '',
    description: '',
    rating: 1,
  };

  componentDidMount() {
    const bookmarkId = this.props.match.params.bookmarkId
    fetch(config.API_ENDPOINT + `${bookmarkId}`, {
      method: 'GET',
      headers: {
        'authorization': `bearer ${config.API_KEY}`
      }
    })
    .then(res => {
      if (!res.ok)
        return res.json().then(error => Promise.reject(error))

      return res.json()
    })
    .then(responseData => {
      this.setState({
        id: responseData.id,
        title: responseData.title,
        url: responseData.url,
        description: responseData.description,
        rating: responseData.rating,
      })
    })
      .catch(error => {
        console.error(error)
      })
  }

  handleChangeTitle = e => {
    this.setState({ title: e.target.value })
  };

  handleChangeUrl = e => {
    this.setState({ url: e.target.value })
  };

  handleChangeDescription = e => {
    this.setState({ description: e.target.value })
  };

  handleChangeRating = e => {
    this.setState({ rating: e.target.value })
  };

  resetFields = (newFields) => {
    this.setState({
      id: newFields.id || '',
      title: newFields.title || '',
      url: newFields.url || '',
      description: newFields.description || '',
      rating: newFields.rating || 1,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { bookmarkId } = this.props.match.params
    const { id, title, url, description, rating } = this.state
    const newBookmark = { id, title, url, description, rating: Number(rating) }
    fetch(config.API_ENDPOINT + `${bookmarkId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${config.API_KEY}`
      },
      body: JSON.stringify(newBookmark)
    })
    .then(res => {
      if (!res.ok)
        return res.json().then(error => Promise.reject(error))
    })
    .then(() => {
      this.resetFields(newBookmark)
      this.context.updateBookmark(newBookmark)
      this.props.history.push('/')
    })
    .catch(error => {
      console.error(error)
    })
  }

  handleClickCancel = () => {
    this.props.history.push('/')
  };

  
  render() {
    const { title, url, description, rating } = this.state
    return (
      <section className='EditBookmark'>
        <h2>Edit bookmark</h2>
        <form 
          className='EditBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div>
            <label htmlFor='title'>
              Title
              {' '}
            </label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Great website!'
              required
              value={title}
              onChange={this.handleChangeTitle}
            />
          </div>

          <div>
            <label htmlFor='url'>
              URL
              {' '}
            </label>
            <input
              type='url'
              name='url'
              id='url'
              placeholder='https://www.great-website.com/'
              required
              value={url}
              onChange={this.handleChangeUrl}
            />
          </div>

          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              value={description}
              onChange={this.handleChangeDescription}
            />
          </div>

          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              min='1'
              max='5'
              required
              value={rating}
              onChange={this.handleChangeRating}
            />
          </div>

          <div className='EditBookmark__buttons'>
            <button 
              type='button' 
              onClick={this.handleClickCancel}
            >
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>

        </form>
      </section>
    )
  }
}

export default EditBookmark;