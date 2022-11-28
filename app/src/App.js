import React from 'react'
import ChatWindow from './ChatWindow';
import { useState } from 'react';

export default function App() {
    const [page, setPage] = useState('ChatWindow')
    return (
        <>
            {page === 'ChatWindow' && <ChatWindow />}
        </>
    )
}
