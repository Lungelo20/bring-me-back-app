import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup, Card } from 'react-bootstrap';
import {
    getParentCommentsByReportId,
    addParentComment,
    getRepliesByParentCommentId,
    addReplyComment,
} from '../../../api/api'; // Ensure these API methods are correctly implemented

const CommentSection = ({ reportId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newReply, setNewReply] = useState({});
    const [showReplyForm, setShowReplyForm] = useState({});

    useEffect(() => {
        const loadComments = async () => {
            try {
                const data = await getParentCommentsByReportId(reportId);
                const commentsWithReplies = await Promise.all(
                    data.map(async (comment) => {
                        const replies = await getRepliesByParentCommentId(comment.commentId);
                        return { ...comment, replies };
                    })
                );
                setComments(commentsWithReplies);
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
            const comment = await addParentComment(reportId, newComment);
            setComments([...comments, { ...comment, replies: [] }]);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleReplySubmit = async (parentCommentId, e) => {
        e.preventDefault();
    
        if (!newReply[parentCommentId]?.trim()) return;
    
        try {
            const reply = await addReplyComment(reportId, parentCommentId, newReply[parentCommentId]);
            setComments(comments.map(comment =>
                comment.commentId === parentCommentId
                    ? { ...comment, replies: [...comment.replies, reply] }
                    : comment
            ));
            setNewReply({ ...newReply, [parentCommentId]: '' });
            setShowReplyForm({ ...showReplyForm, [parentCommentId]: false });
        } catch (error) {
            console.error('Error adding reply:', error);
        }
    };

    return (
        <div className="comment-section mt-4">
            <h5>Comments</h5>
            <ListGroup>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <ListGroup.Item key={comment.commentId}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{comment.userName || 'Unknown Author'}</Card.Title>
                                    <Card.Text>{comment.content}</Card.Text>
                                    <Button
                                        variant="link"
                                        onClick={() =>
                                            setShowReplyForm({
                                                ...showReplyForm,
                                                [comment.commentId]: !showReplyForm[comment.commentId],
                                            })
                                        }
                                    >
                                        Reply
                                    </Button>
                                    {showReplyForm[comment.commentId] && (
                                        <Form onSubmit={(e) => handleReplySubmit(comment.commentId, e)} className="mt-3">
                                            <Form.Group controlId={`replyText-${comment.commentId}`}>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={2}
                                                    value={newReply[comment.commentId] || ''}
                                                    onChange={(e) =>
                                                        setNewReply({
                                                            ...newReply,
                                                            [comment.commentId]: e.target.value,
                                                        })
                                                    }
                                                    placeholder="Write your reply here..."
                                                />
                                            </Form.Group>
                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                        </Form>
                                    )}
                                    {comment.replies.length > 0 && (
                                        <ListGroup className="mt-3">
                                            {comment.replies.map((reply) => (
                                                <ListGroup.Item key={reply.commentId}>
                                                    <Card>
                                                        <Card.Body>
                                                            <Card.Title>{reply.userName || 'Unknown Author'}</Card.Title>
                                                            <Card.Text>{reply.content}</Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                                </Card.Body>
                            </Card>
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
