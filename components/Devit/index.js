import Avatar from 'components/Avatar'

function Devit({ avatar, username, message, id }) {
  return (
    <>
      <article key={id}>
        <Avatar alt={username} src={avatar} />
        <div>
          <strong>{username}</strong>
          <p>{message}</p>
        </div>
      </article>

      <style jsx>
        {`
          article {
            display: flex;
            padding: 10px 15px;
            border-bottom: 2px solid #eaf7ff;
          }

          div {
            padding-right: 49px;
          }

          p {
            line-height: 1.325;
            margin: 0;
          }
        `}
      </style>
    </>
  )
}

export default Devit
