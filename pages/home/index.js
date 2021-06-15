import Devit from 'components/Devit'
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
      <header>
        <h2>Inicio</h2>
      </header>
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

      <style jsx>{`
        header {
          align-items: center;
          background: #fffffaaa;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #ccc;
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
        }

        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }

        section {
          flex: 1;
        }
      `}</style>
    </>
  )
}

export default HomePage
