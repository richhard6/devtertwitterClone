import Devit from 'components/Devit/index'
import { useEffect, useState } from 'react'
// import { firestore } from 'firebase/admin'
import { useRouter } from 'next/router'
import Nav from 'components/Nav'
import useUser from 'hooks/useUser'

import { getDevit } from 'firebase/client'
import Header from 'components/Header'

// hay que ahcer esta pagina sin server side .

function DevitPage(/* props */) {
  const router = useRouter()
  const { id } = router.query

  console.log(router)

  const [devit, setDevit] = useState({})
  const [uid, setUid] = useState({})
  const user = useUser()

  useEffect(() => {
    let unsubscribe
    if (user) {
      unsubscribe = getDevit(id, setDevit)

      setUid({ userId: user.uid })

      return () => unsubscribe && unsubscribe()
    }
  }, [user])

  console.log(devit)

  if (router.isFallback) return 'Loading...'

  return (
    <>
      <div>
        <Header title="Detail" />
        {devit.createdAt && (
          <Devit
            username={devit.username}
            avatar={devit.avatar}
            img={devit.img}
            content={devit.content}
            id={devit.id}
            createdAt={devit.createdAt}
            likesCount={devit.likesCount}
            likedBy={devit.likedBy}
            userId={uid.userId}
          />
        )}
      </div>

      <Nav />
      <style jsx>{``}</style>
    </>
  )
}

export default DevitPage

// para crear paginas estaticas
/* export async function getStaticPaths() {
  return {
    paths: [{ params: { id: 'Q9H0JTU0tJ7LqmFTzatU' } }],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params

  return firestore
    .collection('devits')
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}
 */
/* 
export async function getServerSideProps(context) {
  const { params, res } = context

  const { id } = params

  const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)
  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props: props }
  }

  if (res) {
    res.writeHead(301, { Location: '/home' }).end()
  }
}
 */
