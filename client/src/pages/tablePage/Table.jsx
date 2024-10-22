import React, { useState } from 'react';
import { useGetAllWordsQuery, useDeleteWordMutation, useUpdateWordNameMutation } from '../../redux/api/wordsApi'
import './Table.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Table = () => {
    const { data: wordsData, error, isLoading , isError } = useGetAllWordsQuery({ page: 1, limit: 10 });
    const [deleteWord] = useDeleteWordMutation();
    const [updateWordName] = useUpdateWordNameMutation();
    console.log(wordsData);
    
    const [showModal, setShowModal] = useState(false);
    const [editWordId, setEditWordId] = useState(null);
    const [newWordName, setNewWordName] = useState('');
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching words.</div>;
    const handleEditClick = (word) => {
        setEditWordId(word._id);
        setNewWordName(word.word);
        setShowModal(true);
    };
    const handleDeleteClick = async (id) => {
        if (window.confirm("Are you sure you want to delete this word?")) {
            await deleteWord(id);
        }
    };

    const handleUpdateWordName = async () => {
        if (editWordId && newWordName) {
            await updateWordName({ id: editWordId, wordName: newWordName });
            setShowModal(false);
            setEditWordId(null);
            setNewWordName('');
        }
    };

    return (
        <div className='page'>
            <h2>Words and Their Meanings</h2>
            <table className='wordsTable'>
                <thead>
                    <tr>
                        <th>Word</th>
                        <th>Meanings</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {wordsData?.data?.words?.map(word => (
                        <tr key={word._id}>
                            <td>{word.word}</td>
                            <td>
                                <ul>
                                    {word.meanings.map((meaningObj, index) => (
                                        <li key={index}>{meaningObj.meaning}</li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <Button variant="warning" onClick={() => handleEditClick(word)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDeleteClick(word._id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Word</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNewWord">
                            <Form.Label>Word</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the new word"
                                value={newWordName}
                                onChange={(e) => setNewWordName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateWordName}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Table;
