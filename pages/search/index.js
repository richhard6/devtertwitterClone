import Devit from 'components/Devit'
import { searchDevits } from 'firebase/client'
import { useState } from 'react'
import Button from 'components/Button'
import Nav from 'components/Nav'

function SearchPage() {
  const [devit, setDevits] = useState('')
  const [searchedDevits, setSearchedDevits] = useState([])

  const handleChange = (e) => {
    setDevits(e.target.value)
  }

  const handleSubmit = () => {
    searchDevits(devit).then(setSearchedDevits)
  }

  return (
    <>
      <section>
        <input onChange={handleChange} value={devit} />
        {searchDevits &&
          searchedDevits.map((devit) => {
            return <Devit key={devit.id} {...devit} />
          })}
        <Button onClick={handleSubmit}>Search</Button>
      </section>
      <Nav />

      <style jsx>
        {`
          input {
            width: 100%;
            padding: 14px;
            font-size: 1em;
            border: 0;
            font-weight: 600;
            outline: 0;
          }
        `}
      </style>
    </>
  )
}

export default SearchPage
