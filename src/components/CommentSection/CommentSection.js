import React, { useState } from 'react'
import AddComment from '../AddComment/AddComment'
import Comment from '../Comment/Comment'
import classes from './CommentSection.module.css'

const CommentSection = (props) => {
    let [comments, setComments] = useState([])

    const addComment = (owner_id, comment, name = '') => {
        const copyOfComments = [...comments]
        copyOfComments.push({
            owner_id,
            comment,
            name
        })
        setComments(copyOfComments)
    }

    const deleteComment = (id) => {
        const copyOfComments = [...comments]
        const newComments = copyOfComments.filter(comment => comment.owner_id !== id)
        setComments(newComments)
    }

    return (
        <div>
            <h2 className={classes.Heading + " text-center m-3"}>Comments</h2>
            {comments && comments.map(comment => {
                return <Comment languages={props.languages} key={comment.owner_id} delete={deleteComment} comment={comment} />
            })
            }
            <AddComment add={addComment} />
        </div>
    )
}

export default CommentSection
