import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
import useUser from 'hooks/useUser'
import { useState } from 'react'
import { addDevit } from 'firebase/client'
import { useRouter } from 'next/router'
const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

function ComposeTweet() {
  const user = useUser()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const router = useRouter()

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
    })
      .then(() => {
        router.push('/home')
      })
      .catch((err) => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="what are you thinking...?"
            onChange={handleChange}
          ></textarea>
          <div>
            <Button disabled={isButtonDisabled}>Devit</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        textarea {
          width: 100%;
          border: none;
          padding: 15px;
          font-size: 21px;
          resize: none;
          outline: 0;
          min-height: 150px;
        }

        div {
          padding: 15px;
        }
      `}</style>
    </>
  )
}

export default ComposeTweet
