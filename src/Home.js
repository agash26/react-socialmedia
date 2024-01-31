import { useContext } from 'react'
import Feed from './Feed'
import DataContext from './context/DataContext'

const Home = () => {
  const {searchResult} = useContext(DataContext);
  return (
    <main className='Home'>
      {searchResult.length ? ( 
          <Feed posts={searchResult} />
      ) : (
          <p style={{marginTop: "2rem"}}>
            No Post.
          </p>
      )}
    </main>
  )
}

export default Home