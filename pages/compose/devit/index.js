import Button from 'components/Button'
import Avatar from 'components/Avatar'
import Nav from 'components/Nav'
import useUser from 'hooks/useUser'
import { useEffect, useState } from 'react'
import { addDevit, uploadImage, deleteImage } from 'firebase/client'
import { useRouter } from 'next/router'
import Head from 'next/head'
const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOAD: 2,
  COMPLETE: 3,
}

function ComposeTweet() {
  const user = useUser()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const router = useRouter()

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        task.snapshot.ref.getDownloadURL().then(setImgURL)
      }
      task.on('state_changed', onProgress, onError, onComplete)
    }
  }, [task])

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      username: user.username,
      img: imgURL,
    })
      .then(() => {
        router.push('/home')
      })
      .catch((err) => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]

    const task = uploadImage(file)
    setTask(task)
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const deleteFromFirebase = () => {
    deleteImage(imgURL)
    setImgURL(null)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <Head>
        <title>Create devit / Devter</title>
      </Head>

      <section className="form-container">
        {user && (
          <section className="avatar-container">
            <Avatar src={user.avatar} />
          </section>
        )}

        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="what are you thinking...?"
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            value={message}
          ></textarea>

          {imgURL && (
            <section className="remove-img">
              <button onClick={deleteFromFirebase}>x</button>
              <img src={imgURL} />
            </section>
          )}

          <div>
            <Button disabled={isButtonDisabled}>Devit</Button>
          </div>
        </form>
      </section>
      <Nav />
      <style jsx>{`
        div {
          padding: 15px;
        }
        .avatar-container {
          padding-top: 20px;
          padding-left: 10px;
        }
        button {
          background: rgba(0, 0, 0, 0.3);
          border: 0;
          border-radius: 999px;
          color: #fff;
          font-size: 24px;
          width: 32px;
          height: 32px;
          top: 15px;
          position: absolute;
          right: 15px;
        }
        .form-container {
          align-items: flex-start;
          display: flex;
        }
        .remove-img {
          position: relative;
        }
        form {
          padding: 10px;
          flex: 1;
        }
        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
        }
        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? '3px dashed #09f'
            : '3px solid transparent'};
          border-radius: 10px;
          font-size: 21px;
          min-height: 200px;
          padding: 15px;
          outline: 0;
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  )
}

export default ComposeTweet
