import Devit from 'components/Devit'
import { fetchLatestDevits } from 'firebase/client'
import useUser from 'hooks/useUser'
import { useEffect, useState } from 'react'
import Home from 'components/Icons/Home'
import Search from 'components/Icons/Search'

import Create from 'components/Icons/Create'
import Link from 'next/link'
import { colors } from 'styles/theme'
import Head from 'next/head'
function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestDevits().then(setTimeline)
  }, [user])

  console.log(timeline)
  return (
    <>
      <Head>
        <title>Inicio / Devter</title>
      </Head>
      <header>
        <h2>Inicio</h2>
      </header>
      <section>
        {timeline.map(({ id, img, username, avatar, content, createdAt }) => {
          return (
            <Devit
              key={id}
              username={username}
              avatar={avatar}
              img={img}
              content={content}
              id={id}
              createdAt={createdAt}
            />
          )
        })}
      </section>

      <nav>
        <Link href="/home">
          <a>
            <Home width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/search">
          <a>
            <Search width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/devit">
          <a>
            <Create width={32} height={32} stroke="#09f" />
          </a>
        </Link>
      </nav>

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

        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          height: 49px;
          position: sticky;
          width: 100%;
          display: flex;
        }

        nav a {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
        }

        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }

        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  )
}

export default HomePage
