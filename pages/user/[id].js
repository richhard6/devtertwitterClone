import Nav from 'components/Nav'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { searchDevits } from 'firebase/client'
import useUser from 'hooks/useUser'

import Devit from 'components/Devit'
import Header from 'components/Header'

function UserPage() {
  const router = useRouter()
  // que hacer el snapshot para que sea en tiempo real
  const user = useUser()

  const [devits, setDevits] = useState([])
  const { id } = router.query
  const { username } = devits[0] || devits

  useEffect(() => {
    searchDevits(id).then(setDevits)
    console.log(devits)
  }, [])

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
