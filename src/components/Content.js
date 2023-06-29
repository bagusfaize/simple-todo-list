import React from 'react'
import Header from './Header'

export default function ContentLayout({children}) {
  return (
    <>
        <Header title="TO DO LIST APP" />
        <div className="container py-4">
            {children}
        </div>
    </>
  )
}
