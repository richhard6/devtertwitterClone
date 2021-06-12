import Avatar from 'components/Avatar'
import useTimeAgo from 'hooks/useTimeAgo'
import useDateTimeFormat from 'hooks/useDateTimeFormat'
import Link from 'next/link'

import { useRouter } from 'next/router'
function Devit({ avatar, username, content, id, createdAt, img }) {
  const timeago = useTimeAgo(createdAt)

  const createdAtFormated = useDateTimeFormat(createdAt)
  const router = useRouter()

  console.log(id)
  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <>
      <article key={id} onClick={handleArticleClick}>
        <div>
          <Avatar alt={username} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{username}</strong>
            <span>.</span>

            <Link href={`/status/${id}`}>
              <a>
                <time title={createdAtFormated}>{timeago}</time>
              </a>
            </Link>
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>

      <style jsx>
        {`
          article {
            display: flex;
            padding: 10px 15px;
            border-bottom: 1px solid #eee;
          }

          article:hover {
            background: #f5f8fa;
            cursor: pointer;
          }

          div {
            padding-right: 49px;
          }

          img {
            border-radius: 10px;
            height: auto;
            margin-top: 10px;
            width: 100%;
          }
          p {
            line-height: 1.325;
            margin: 0;
          }

          time {
            color: #555;
            font-size: 14px;
          }

          a {
            color: #555;
            font-size: 14px;
            text-decoration: none;
          }
        `}
      </style>
    </>
  )
}

export default Devit
