import Head from 'next/head'
import { useEffect } from 'react'

import { colors } from 'styles/theme'
import Button from 'components/Button'
import GitHub from 'components/Icons/GitHub'
import Logo from 'components/Icons/Logo'
import { useRouter } from 'next/router'

import { loginWithGitHub } from '../firebase/client'
import useUser, { USER_STATES } from 'hooks/useUser'

export default function Home() {
  const user = useUser()

  const router = useRouter()

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
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

      <section>
        <Logo width="100" />
        <h1>Devter</h1>
        <h2>Talk about development with developers</h2>
        <div>
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>
              <GitHub fill="#fff" width={24} height={24} />
              Login with GitHub
            </Button>
          )}

          {user === USER_STATES.NOT_KNOWN && <div>loading...</div>}
        </div>
      </section>

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
