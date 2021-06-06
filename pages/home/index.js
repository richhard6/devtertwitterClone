import AppLayout from 'components/AppLayout'
import Devit from 'components/Devit'

import { useEffect, useState } from 'react'

function HomePage() {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/status/home_timeline')
      .then((res) => res.json())
      .then(setTimeline)
  }, [])
  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map((devit) => {
            return (
              <Devit
                key={devit.id}
                username={devit.username}
                avatar={devit.avatar}
                message={devit.message}
                id={devit.id}
              />
            )
          })}
        </section>

        <nav></nav>
      </AppLayout>

      <style jsx>{`
        header {
          align-items: center;
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
        }

        section {
          padding-top: 49px;
        }

        nav {
          bottom: 0;
          border-top: 1px solid #ccc;
          height: 49px;
          position: sticky;
          width: 100%;
        }
      `}</style>
    </>
  )
}

export default HomePage
