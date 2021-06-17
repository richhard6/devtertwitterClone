import Devit from 'components/Devit'
import Header from 'components/Header'
import { listenLatestDevits } from 'firebase/client'
import useUser from 'hooks/useUser'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Nav from 'components/Nav'

function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    let unsubscribe
    if (user) {
      unsubscribe = listenLatestDevits(setTimeline) // la informacion que devuelve latestdevits es el que queremos mandar a setTimeline
      // listenLatestDevits(newDevits => setTimeline(newDevits)) es lo mismo
    }

    return () => unsubscribe && unsubscribe()
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio / Devter</title>
      </Head>
      <Header title={'Inicio'} />
      <section>
        {timeline.map(
          ({
            id,
            img,
            username,
            avatar,
            content,
            createdAt,
            likesCount,
            likedBy,
            userId,
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
                author={userId}
              />
            )
          }
        )}
      </section>

      <Nav />

      <style jsx>{`
        section {
          flex: 1;
        }
      `}</style>
    </>
  )
}

export default HomePage
