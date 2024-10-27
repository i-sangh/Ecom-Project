"use client"
import { useState, useEffect } from 'react'
import { faker } from '@faker-js/faker'

// Generate 100 fake book titles
const generateBooks = () => {
  return Array.from({ length: 100 }, () => ({
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    selected: false
  }))
}

export default function InterestsPage() {
  const [books, setBooks] = useState<Array<{ id: string; title: string; selected: boolean }>>([])
  const [currentPage, setCurrentPage] = useState(1)
  const booksPerPage = 6
  const totalPages = Math.ceil(100 / booksPerPage)

  useEffect(() => {
    setBooks(generateBooks())
  }, [])

  const indexOfLastBook = currentPage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook)

  const handleCheckboxChange = (bookId: string) => {
    setBooks(books.map(book => 
      book.id === bookId ? { ...book, selected: !book.selected } : book
    ))
  }

  const generatePageNumbers = () => {
    const pages = []
    const maxVisiblePages = 7
    let startPage = Math.max(1, currentPage - 3)
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <div className="rounded-lg border p-8">
        <h1 className="mb-4 text-center text-2xl font-semibold">
          Please mark your interests!
        </h1>
        <p className="mb-8 text-center text-gray-600">
          We will keep you notified.
        </p>

        <div className="mb-6">
          <h2 className="mb-4 text-lg font-medium">My saved interests!</h2>
          <div className="space-y-4">
            {currentBooks.map((book) => (
              <div key={book.id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={book.id}
                  checked={book.selected}
                  onChange={() => handleCheckboxChange(book.id)}
                  className="h-5 w-5 rounded border-gray-300"
                />
                <label htmlFor={book.id} className="cursor-pointer">
                  {book.title}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-1 text-gray-600 hover:text-black disabled:text-gray-300"
          >
            {'<<'}
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-1 text-gray-600 hover:text-black disabled:text-gray-300"
          >
            {'<'}
          </button>
          
          {generatePageNumbers().map(number => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-2 ${
                currentPage === number
                  ? 'text-black font-semibold'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              {number}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-1 text-gray-600 hover:text-black disabled:text-gray-300"
          >
            {'>'}
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-1 text-gray-600 hover:text-black disabled:text-gray-300"
          >
            {'>>'}
          </button>
        </div>
      </div>
    </div>
  )
}