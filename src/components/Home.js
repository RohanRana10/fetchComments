import React, { useEffect, useState } from 'react'
import styles from '../css/home.module.css'

const Home = () => {

    const [comments, setComments] = useState([]);
    const [postOnRight, setPostOnRight] = useState("");
    const [commentsToDisplay, setCommentsToDisplay] = useState([]);
    const [search, setSearch] = useState("");
    const [rightSideComments, setRightSideComments] = useState([]);

    const getComments = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/comments");
        const comments = await response.json();
        setComments(comments);

        let allFirstComments = [];
        let num = 1;
        comments.forEach((comment) => {
            if (num === comment.postId && num <= 100) {
                allFirstComments.push(comment);
                num++;
            }
        })
        setCommentsToDisplay(allFirstComments);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateLeftSideComments(search);
    }

    const onchange = (e) => {
        setSearch(e.target.value);
    }

    const updateLeftSideComments = (search) => {
        if (search === "") {
            getComments();
        }
        else {
            console.log(search);
            const newComments = comments.filter((comment) => {
                return comment.postId === parseInt(search);
            });
            setCommentsToDisplay(newComments);
            console.log(newComments);
        }

    }

    const getRightSection = (postId) => {
        console.log(postId);
        setPostOnRight(postId);
        const newComments = comments.filter((comment) => {
            return comment.postId === postId;
        });
        setRightSideComments(newComments);
    }


    useEffect(() => {
        getComments();
        // eslint-disable-next-line
    }, [])


    return (
        <div className='d-flex flex-column align-items-center'>
            <h1 className='my-3'>Comments</h1>
            <div className={`d-flex align-items-center justify-content-center ${styles.container}`}>
                <div className={` overflow-scroll d-flex flex-column align-items-center ${styles.leftSection}`}>

                    <div className={styles.formContainer}>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder='Type Here..' onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">Filter posts by Post No.</div>
                            </div>
                            <button type="submit" className="btn btn-success">Filter</button>
                        </form>
                    </div>

                    {
                        commentsToDisplay.map((comment) => {
                            return <div onClick={()=>{getRightSection(comment.postId)}} className={styles.commentBox} key={comment.id}>
                                <div className={styles.postId}>{comment.postId}</div>
                                <p className='m-3'><span className={styles.boldText}>Name:</span> {comment.name}</p>
                                <p className='m-3'><span className={styles.boldText}>Email:</span> {comment.email}</p>
                                <p className={styles.commentBody}>{comment.body}</p>
                            </div>
                        })
                    }
                </div>
                <div className={` overflow-scroll d-flex flex-column align-items-center ${styles.rightSection}`}>
                    {rightSideComments.length === 0 ? (<h3 className={styles.heading}>
                        Click on a post to view all its comments Here!
                    </h3>) : (
                        <>
                        <h3 className={styles.heading}>Comments on Post {postOnRight}</h3>
                        {
                            rightSideComments.map((comment) => {
                                return <div onClick={()=>{getRightSection(comment.postId)}} className={styles.commentBox} key={comment.id}>
                                    <div className={styles.postId}>{comment.id}</div>
                                    <p className='m-3'><span className={styles.boldText}>Name:</span> {comment.name}</p>
                                    <p className='m-3'><span className={styles.boldText}>Email:</span> {comment.email}</p>
                                    <p className={styles.commentBody}>{comment.body}</p>
                                </div>
                            })
                        }
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
