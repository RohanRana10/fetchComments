import React from 'react'
import styles from '../css/home.module.css'

const LeftSection = ({ updateLeftSideComments, search, setSearch, commentsToDisplay, getRightSection }) => {


    const handleSubmit = (e) => {
        e.preventDefault();
        updateLeftSideComments(search);
    }

    const onchange = (e) => {
        setSearch(e.target.value);
    }


    return (
        <div className={` overflow-scroll d-flex flex-column align-items-center ${styles.leftSection}`}>

            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="number" max={100} min={1}    className="form-control" placeholder='Type Here..' onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">Filter posts by Post No.</div>
                    </div>
                    <button type="submit" className="btn btn-danger">Filter</button>
                </form>
            </div>

            {
                commentsToDisplay.map((comment) => {
                    return <div onClick={() => { getRightSection(comment.postId) }} className={styles.commentBox} key={comment.id}>
                        <div className={styles.postId}>{comment.postId}</div>
                        <p className='m-3'><span className={styles.boldText}>Name:</span> {comment.name}</p>
                        <p className='m-3'><span className={styles.boldText}>Email:</span> {comment.email}</p>
                        <p className={styles.commentBody}>{comment.body}</p>
                    </div>
                })
            }
        </div>
    )
}

export default LeftSection
