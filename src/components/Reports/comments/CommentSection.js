import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { fetchComments, addComment } from '../../../api/api'; // Ensure these API methods are correctly implemented

const CommentSection = ({ reportId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        // Fetch comments for the report
        const loadComments = async () => {
            try {
                const data = await fetchComments(reportId);
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        loadComments();
    }, [reportId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!newComment.trim()) return;

        try {
            // Add the new comment
            const comment = await addComment(reportId, newComment);
            setComments([...comments, comment]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="comment-section mt-4">
            <h5>Comments</h5>
            <ListGroup>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <ListGroup.Item key={comment.commentId}>
                            <strong>{comment.userName || 'Unknown Author'}</strong>: {comment.content}
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item>No comments yet.</ListGroup.Item>
                )}
            </ListGroup>

            <Form onSubmit={handleCommentSubmit} className="mt-3">
                <Form.Group controlId="commentText">
                    <Form.Label>Add a Comment</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your comment here..."
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default CommentSection;
