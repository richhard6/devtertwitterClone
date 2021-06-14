import React from 'react'
import Devit from 'components/Devit/index'
import { firestore } from 'firebase/admin'
import { useRouter } from 'next/router'
import Nav from 'components/Nav'
function DevitPage(props) {
  const router = useRouter()
  if (router.isFallback) return 'Loading...'

  return (
    <>
      <Devit {...props} />

      <Nav />
      <style jsx>{`
        div {
          background: red;
        }
      `}</style>
    </>
  )
}

export default DevitPage

// para crear paginas estaticas
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: 'AV28WkzcuG2VnGyVw3Mt' } }],
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
