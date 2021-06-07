import AppLayout from 'components/AppLayout'
import Devit from 'components/Devit'
import { fetchLatestDevits } from 'firebase/client'
import useUser from 'hooks/useUser'
import { useEffect, useState } from 'react'

function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])
  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(
            ({ userId, id, username, avatar, content, createdAt }) => {
              return (
                <Devit
                  key={id}
                  username={username}
                  avatar={avatar}
                  content={content}
                  id={userId}
                  createdAt={createdAt}
                />
              )
            }
          )}
        </section>

        <nav></nav>
      </AppLayout>

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
          padding-top: 49px;
        }

        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  )
}

export default HomePage
