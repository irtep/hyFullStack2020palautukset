import React from 'react'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const {resetvalue: contentReset, ...content} = useField('text')
  const {resetvalue: authorReset, ...author} = useField('text')
  const {resetvalue: infoReset, ...info} = useField('text')

  const resetFields = () => {
    contentReset()
    authorReset()
    infoReset()
  }

  const handleSubmit = (e) => {
    e.preventDefault()



    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <input type= "button" onClick = {resetFields} value= "reset" />
      </form>
    </div>
  )

}

export default CreateNew
