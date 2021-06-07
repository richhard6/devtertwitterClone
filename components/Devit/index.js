import Avatar from 'components/Avatar'
import useTimeAgo from 'hooks/useTimeAgo'

function Devit({ avatar, username, content, id, createdAt }) {
  const timeago = useTimeAgo(createdAt)

  return (
    <>
      <article key={id}>
        <div>
          <Avatar alt={username} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{username}</strong>
            <span>.</span>
            <date>{timeago}</date>
          </header>
          <p>{content}</p>
        </section>
      </article>

      <style jsx>
        {`
          article {
            display: flex;
            padding: 10px 15px;
            border-bottom: 1px solid #eee;
          }

          div {
            padding-right: 49px;
          }

          p {
            line-height: 1.325;
            margin: 0;
          }

          date {
            color: #555;
            font-size: 14px;
          }
        `}
      </style>
    </>
  )
}

export default Devit
