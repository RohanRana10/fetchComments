import React, { useEffect, useState } from 'react'
import styles from '../css/home.module.css'
import LeftSection from './LeftSection';
import RightSection from './RightSection';

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

    const updateLeftSideComments = (search) => {
        if (search === "") {
            getComments();
        }
        else {
            const newComments = comments.filter((comment) => {
                return comment.postId === parseInt(search);
            });
            setCommentsToDisplay(newComments);
        }

    }

    const getRightSection = (postId) => {
        setPostOnRight(postId);
        const newComments = comments.filter((comment) => {
            return comment.postId === postId;
        });
        setRightSideComments(newComments);
    }


    useEffect(() => {
        getComments();
    }, [])


    return (
        <div className='d-flex flex-column align-items-center'>
            <h1 className='my-3'>Comments</h1>
            <div className={`d-flex align-items-center justify-content-center ${styles.container}`}>

                <LeftSection updateLeftSideComments={updateLeftSideComments} search={search} setSearch={setSearch} commentsToDisplay={commentsToDisplay} getRightSection={getRightSection}/>
    
                <RightSection postOnRight={postOnRight} rightSideComments={rightSideComments} getRightSection={getRightSection}/>
            </div>
        </div>
    )
}

export default Home
