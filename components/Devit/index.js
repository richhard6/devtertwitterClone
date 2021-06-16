import Avatar from 'components/Avatar'
import useTimeAgo from 'hooks/useTimeAgo'
import { useEffect, useState } from 'react'
import useDateTimeFormat from 'hooks/useDateTimeFormat'
import Link from 'next/link'
import { likeDevit } from 'firebase/client'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

import { useRouter } from 'next/router'
function Devit({
  avatar,
  username,
  content,
  id,
  createdAt,
  img,
  likedBy,
  likesCount,
  userId,
}) {
  const [liked, setLiked] = useState(false)
  const timeago = useTimeAgo(createdAt)
  const router = useRouter()
  const createdAtFormated = useDateTimeFormat(createdAt)

  const handleArticleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/status/${id}`)
  }

  useEffect(() => {
    if (likedBy) {
      const checkLike = likedBy.find((uid) => uid === userId)

      if (checkLike) {
        setLiked(true)
      } else {
        setLiked(false)
      }
    }
  }, [likedBy])

  const handleLike = (e) => {
    e.stopPropagation()
    likeDevit(id, userId)
  }

  const handleAvatarClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/user/${userId}`)
  }

  return (
    <>
      <article key={id} onClick={handleArticleClick}>
        <div className="avatar" onClick={handleAvatarClick}>
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
          <div className="favorite" onClick={handleLike}>
            {liked ? (
              <FavoriteIcon style={{ color: 'red' }} />
            ) : (
              <FavoriteBorderIcon />
            )}
            {likesCount && <small>{likesCount}</small>}
          </div>
        </section>
      </article>

      <style jsx>
        {`
          article {
            display: flex;
            padding: 10px 15px;
            border-bottom: 1px solid #eee;
          }

          .favorite {
            display: flex;
            align-items: center;
            width: 30px;
          }

          article:hover {
            background: #f5f8fa;
            cursor: pointer;
          }

          .avatar {
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
