import Nav from 'components/Nav'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { searchDevits } from 'firebase/client'
import useUser from 'hooks/useUser'

import Devit from 'components/Devit'
import Header from 'components/Header'

function UserPage() {
  const router = useRouter()
  const user = useUser()

  const [devits, setDevits] = useState([])
  const { id } = router.query
  const { username } = devits[0] || devits

  useEffect(() => {
    let unsubscribe
    if (user) {
      unsubscribe = searchDevits(id, setDevits)

      return () => unsubscribe && unsubscribe()
    }
  }, [user])

  console.log(devits)

  return (
    <>
      <section>
        <Header title={`${username}'s Timeline`} />

        {devits.map(
          ({
            id,
            img,
            username,
            avatar,
            content,
            createdAt,
            likesCount,
            likedBy,
          }) => {
            return (
              <Devit
                key={id}
                username={username}
                avatar={avatar}
                img={img}
                content={content}
                id={id}
                createdAt={createdAt}
                likesCount={likesCount}
                likedBy={likedBy}
                userId={user.uid}
              />
            )
          }
        )}
      </section>
      <Nav />
    </>
  )
}

export default UserPage
