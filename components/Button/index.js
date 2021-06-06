import { colors } from '../../styles/theme'

function Button({ children, onClick }) {
  return (
    <>
      <button onClick={onClick}>{children}</button>

      <style jsx>
        {`
          button {
            background: ${colors.black};
            border: 0;
            color: ${colors.white};
            border-radius: 9999px;
            display: flex;
            align-items: center;
            font-size: 16px;
            font-weight: 800;
            padding: 8px 24px;
            transition: opacity 0.3s ease;
          }

          button > :global(svg) {
            margin-right: 8px;
          }
          button:hover {
            opacity: 0.7;
          }
        `}
      </style>
    </>
  )
}

export default Button
