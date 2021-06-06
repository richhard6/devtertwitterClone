import Head from 'next/head'
import { useState, useEffect } from 'react'

import AppLayout from 'components/AppLayout'
import { colors } from 'styles/theme'
import Button from 'components/Button'
import GitHub from 'components/Icons/GitHub'
import Avatar from 'components/Avatar'
import Logo from 'components/Icons/Logo'

import { loginWithGitHub, onAuthStateChanged } from '../firebase/client'

export default function Home() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  const handleClick = () => {
    loginWithGitHub()
      .then((user) => {
        setUser(user)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  console.log(user)
  return (
    <>
      <Head>
        <title>Devter</title>
        <meta name="description" content="Devter app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <section>
          <Logo width="100" />
          <h1>Devter</h1>
          <h2>Talk about development with developers</h2>
          <div>
            {user === null ? (
              <Button onClick={handleClick}>
                <GitHub fill="#fff" width={24} height={24} />
                Login with GitHub
              </Button>
            ) : (
              user &&
              user.avatar && (
                <div>
                  <Avatar
                    src={user.avatar}
                    alt={user.username}
                    text={user.username}
                  />
                </div>
              )
            )}
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        img {
          width: 120px;
        }

        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }

        h1 {
          color: ${colors.primary};
          font-weight: 800;
          font-size: 32px;
          margin-bottom: 16px;
        }

        h2 {
          color: ${colors.secondary};
          font-size: 18px;
          margin: 0;
        }

        div {
          margin-top: 16px;
        }
      `}</style>
    </>
  )
}
