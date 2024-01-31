import { createContext, useState, useEffect } from "react";
import { format } from "date-fns";
// import api from '../api/posts';
import useWindowSize from "../hooks/useWindow";
import { useNavigate } from "react-router-dom";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {

    const [posts, setPosts] = useState([{
        "id": "1",
        "title": "P-1",
        "datetime": "Jul 01, 2022 11:11AM",
        "body": "react js tuto"
      },
      {
        "id": "2",
        "title": "P-2",
        "datetime": "Jul 02, 2024 11:11AM",
        "body": "react js 2 tuto"
      },
      {
        "id": "3",
        "title": "P-3",
        "datetime": "Jul 03, 2022 11:11AM",
        "body": "react js 3 tuto"
      },
      {
        "id": "4",
        "title": "",
        "datetime": "January 31, 2024 7:50:42 AM",
        "body": ""
      },
      {
        "id": "5",
        "title": "edit test",
        "datetime": "January 31, 2024 8:08:44 AM",
        "body": "edit the test"
      },
      {
        "id": "51",
        "title": "from context",
        "datetime": "January 31, 2024 12:28:51 PM",
        "body": "data local lap"
      }]);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [postBody, setPostBody] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const navigate = useNavigate();
    const { width } = useWindowSize();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // const response = await api.get('/posts');
                // setPosts(response.data);
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data);
                } else {
                    console.log(`Error: ${err.message})`);
                }
            }
        }
        fetchPosts();
    }, []);

    useEffect(() => {
        const filterRes = posts.filter((post) =>
            ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase().includes(search.toLowerCase())));

        setSearchResult(filterRes.reverse());
    }, [posts, search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? Number(posts[posts.length - 1].id + 1) : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { id, title: postTitle, datetime, body: postBody };
        try {
            // const postRes = await api.post('/posts', newPost);
            const allPosts = [...posts, newPost];
            setPosts(allPosts);
            setPostTitle('');
            setPostBody('');
            navigate('/');
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
            } else {
                console.log(`Error: ${err.message})`);
            }
        }
    }

    const handleDelete = async (id) => {
        try {
            // await api.delete(`/posts/${id}`)
            const postList = posts.filter(post => post.id !== id);
            setPosts(postList);
            navigate('/');
        } catch (err) {
            console.log(`Error: ${err.message})`);
        }
    }

    const handleEdit = async (id) => {
        try {
            const datetime = format(new Date(), 'MMMM dd, yyyy pp');
            const editPost = { id, title: editTitle, datetime, body: editBody };
            // const response = await api.put(`/posts/${id}`, editPost);
            // setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
            const updPosts = [...posts, editPost];
            setPosts(updPosts);
            setEditTitle('');
            setEditBody('');
            navigate('/');
        } catch (err) {
            console.log(`Error: ${err.message})`);
        }
    }
    return (
        <DataContext.Provider value={{
            width, search, setSearch, searchResult, handleSubmit, postTitle, setPostTitle, postBody, setPostBody, handleDelete, posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody

        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;