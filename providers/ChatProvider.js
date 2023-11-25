'use client'
import React, { useState, useEffect, createContext } from 'react'

export const ChatContext = createContext()

const ChatProvider = ({ children }) => {

 
  return (
    <ChatContext.Provider value={{}}>
      {children}
    </ChatContext.Provider>
  )
}

export default ChatProvider
