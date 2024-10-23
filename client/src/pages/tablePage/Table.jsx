import React, { useState } from 'react';
import { useGetAllWordsQuery } from '../../redux/api/wordsApi';
import { Table, Spinner, Pagination, Container } from 'react-bootstrap';
import './Table.css';

const WordsTable = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    const { data: wordsData, error, isLoading, isError } = useGetAllWordsQuery({ page: currentPage, limit });
    console.log(wordsData);

    if (isLoading) return <Spinner animation="border" />;
    if (isError) return <div>Error fetching words.</div>;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='page'>
            <h2 className='text-center mt-4  mb-4'>Words and Their Meanings</h2>
            <Container>
                <Table striped bordered hover className='wordsTable'>
                    <thead>
                        <tr>
                            <th>Word</th>
                            <th>Meanings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wordsData?.data?.words?.map(word => (
                            <tr key={word._id}>
                                <td>{word.word}</td>
                                <td>
                                    {word?.meanings?.map(meaningObj => meaningObj.meaning).join(', ') || "Not Added"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div className="d-flex justify-content-center align-items-center">
                    <Pagination>
                        {Array.from({ length: wordsData?.data?.totalPages }, (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </Container>
        </div>
    );
};

export default WordsTable;
