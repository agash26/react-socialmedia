import { useContext } from "react";
import { Link, useParams } from "react-router-dom"
import DataContext from "./context/DataContext";

const PostPage = () => {
  const { posts, handleDelete } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find(post => (post.id.toString() === id));
  return (
    <main className="PostPage">
      <article className='post'>
        {post &&
          <><h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{(post.body).length <= 25 ? post.body : `${(post.body).slice(0, 25)}...`
            }
            </p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit</button>
            </Link>
            <button className="deleteButton" onClick={() => handleDelete(post.id)}>Delete</button>
          </>
        }
        {!post &&
          <>
            <h2>Post Not Found</h2>
            <p><Link to="/">Goto Home</Link></p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage