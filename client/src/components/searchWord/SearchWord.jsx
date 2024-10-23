import React, { useState, useEffect } from 'react';
import { useSearchWordsQuery, useAddWordMutation, useAddMeaningMutation, useGetWordByIdQuery, useDeleteMeaningMutation, useUpdateMeaningMutation } from '../../redux/api/wordsApi';
import Select from 'react-select';
import './SearchWord.css';
import { FaPen, FaEdit, FaTrash } from "react-icons/fa";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BsFillSave2Fill } from "react-icons/bs";
import toast from 'react-hot-toast';

const SearchWord = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [editingIndex, setEditingIndex] = useState(null); 
  const [editingMeaning, setEditingMeaning] = useState(''); 

  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: words = [], isLoading, isError } = useSearchWordsQuery(searchTerm, {
    skip: !searchTerm,
  });

  const [addWord] = useAddWordMutation();
  const [addMeaning] = useAddMeaningMutation();
  const [deleteMeaning] = useDeleteMeaningMutation();
  const [updateMeaning] = useUpdateMeaningMutation(); 

  const { data: selectedWord, refetch: refetchWord } = useGetWordByIdQuery(selectedOption?.value, {
    skip: !selectedOption,
  });

  const options = words?.data?.map(word => ({
    value: word._id,
    label: word.word,
  }));

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  const handleChange = (selected) => {
    setSelectedOption(selected);
    setMeaning('');
    setEditingIndex(null);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue) {
        setSearchTerm(inputValue);
      } else {
        setSearchTerm('');
      }
    }, 600); 

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  const handleAddWord = async () => {
    if (newWord === '') {
      toast.error('Word cannot be empty!');
      return;
    }
    try {
      await addWord({ word: newWord });
      setNewWord('');
      setShowModal(false);
      toast.success('Word added successfully!'); 
    } catch (error) {
      console.error("Failed to add word:", error);
      toast.error('Failed to add word. Please try again.'); 
    }
  };

  const handleAddMeaning = async (e) => {
    e.preventDefault();
    if (meaning === '' || !selectedOption) {
      toast.error('Meaning cannot be empty or no word selected!');
      return;
    }
    try {
      await addMeaning({ id: selectedOption.value, meaning });
      setMeaning('');
      refetchWord();
      toast.success('Meaning added successfully!'); 
    } catch (error) {
      console.error("Failed to add meaning:", error);
      toast.error('Failed to add meaning. Please try again.');
    }
  };

  const handleDeleteMeaning = async (meaningId) => {
    try {
      await deleteMeaning({ id: selectedOption.value, meaningId });
      refetchWord();
      toast.success('Meaning deleted successfully!'); 
    } catch (error) {
      console.error("Failed to delete meaning:", error);
      toast.error('Failed to delete meaning. Please try again.'); 
    }
  };

  const handleEditMeaning = (index, meaning) => {
    setEditingIndex(index);
    setEditingMeaning(meaning);
  };

  const handleSaveMeaning = async (meaningId) => {
    if (editingMeaning === '') {
      toast.error('Meaning cannot be empty!');
      return;
    }
    try {
      await updateMeaning({ id: selectedOption.value, meaningId, meaning: editingMeaning });
      setEditingIndex(null);
      setEditingMeaning('');
      refetchWord();
      toast.success('Meaning updated successfully!'); 
    } catch (error) {
      console.error("Failed to update meaning:", error);
      toast.error('Failed to update meaning. Please try again.'); 
    }
  };

  return (
    <div className='blackContainer'>
      <div className="searchAndData">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className='searchContainer'>
              <h2>Search For Word</h2>
              <Select options={options} onInputChange={handleInputChange} onChange={handleChange} isLoading={isLoading}placeholder="Search for a word..."/>
              {isLoading && <p>Loading...</p>}
              {isError && <p>Error fetching words.</p>}
            </div>
          </div>
          <div className="col-12 col-lg-6">
            {selectedOption && selectedWord && (
              <div className='searchContainer'>
                <h2>Meanings of {selectedWord.data.word}:</h2>
                {selectedWord.data.meanings?.length > 0 ? (
                  <div className='meaningsContainer'>
                    <ol>
                      {selectedWord.data.meanings.map((meaningObj, index) => (
                        <li key={meaningObj._id}>
                          {editingIndex === index ? (
                            <input type="text" value={editingMeaning} onChange={(e) => setEditingMeaning(e.target.value)} placeholder="Edit meaning"/>) : (meaningObj.meaning)}
                          <span className='meaningActions'>
                            {editingIndex === index ? (
                              <button className='saveButton' onClick={() => handleSaveMeaning(meaningObj._id)}><BsFillSave2Fill /></button>) : (<button className='editButton' onClick={() => handleEditMeaning(index, meaningObj.meaning)}><FaEdit /></button>)}
                            {editingIndex !== index && (
                              <button 
                                className='deleteButton' 
                                onClick={() => handleDeleteMeaning(meaningObj._id)}
                              >
                                <FaTrash />
                              </button>
                            )}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : (
                  <p className='notFoundText'>No meanings available for this word.</p>
                )}
                <form>
                  <div className='addMeaningBox'>
                    <label>Add Meaning</label>
                    <input
                      type="text"
                      placeholder="Enter the meaning"
                      value={meaning}
                      onChange={(e) => setMeaning(e.target.value)}
                    />
                  </div>
                  <button className='addButton' onClick={handleAddMeaning}>Add Meaning</button>
                </form>
              </div>
            )}
          </div>
        </div>
        <div className='quickAdd'>
          <OverlayTrigger placement="top"overlay={<Tooltip id="add-word-tooltip">Add Word</Tooltip>}>
            <Button onClick={() => setShowModal(true)}>
              <FaPen />
            </Button>
          </OverlayTrigger>
        </div>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Word</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formNewWord">
                <Form.Label>Word</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the new word"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className='addButton' onClick={handleAddWord}>
              Add Word
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default SearchWord;
