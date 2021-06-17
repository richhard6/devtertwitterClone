function Header({ title }) {
  return (
    <>
      <header>
        <h2>{title}</h2>
      </header>

      <style jsx>{`
        header {
          align-items: center;
          background: #fffffaaa;
          backdrop-filter: blur(5px);
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
          padding-left: 15px;
        }
      `}</style>
    </>
  )
}

export default Header
