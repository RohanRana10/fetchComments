import React from 'react'
import styles from '../css/home.module.css'

const RightSection = ({rightSideComments, postOnRight, getRightSection}) => {
    return (
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
    )
}

export default RightSection
