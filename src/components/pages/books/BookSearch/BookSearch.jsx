// import React, { useState } from 'react'
// import axios from 'axios'

// export default function BookSearch() {
//   console.log('booksearch')

//   const [description, setDescription] = useState('')
//   const [emotion, setEmotion] = useState('')
//   const [books, setBooks] = useState([])
//   const [error, setError] = useState('')

//   const handleSearch = async () => {
//     try {
//       setError('') // Очистити помилки
//       const response = await axios.post(
//         'http://localhost:9000/books/user_desc',
//         {
//           user_description: description,
//           top_n: 5,
//         }
//       )
//       setBooks(response.data)
//     } catch (err) {
//       setError('Something went wrong. Please try again.')
//     }
//   }

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Search Books</h1>

//       <div className="mb-4">
//         <textarea
//           className="form-control"
//           rows="3"
//           placeholder="Describe the book you're looking for..."
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//       </div>

//       <button className="btn btn-primary w-100 mb-4" onClick={handleSearch}>
//         Search
//       </button>

//       {error && <div className="alert alert-danger">{error}</div>}

//       <div>
//         <h3>Results:</h3>
//         {books.length > 0 ? (
//           <ul className="list-group">
//             {books.map((book, index) => (
//               <li key={index} className="list-group-item">
//                 <h5>{book.title}</h5>
//                 <p>Score: {book.score.toFixed(2)}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No books found.</p>
//         )}
//       </div>
//     </div>
//   )
// }

// import React, { useState } from 'react'
// import axios from 'axios'
// import Navbar from '../../../fragments/Navbar/Navbar'

// export default function BookSearch() {
//   const [activeTab, setActiveTab] = useState('description') // Контроль активного табу
//   const [description, setDescription] = useState('')
//   const [selectedEmotion, setSelectedEmotion] = useState('')
//   const [booksCount, setBooksCount] = useState(5) // Початкова кількість книг
//   const [books, setBooks] = useState([])
//   const [error, setError] = useState('')

//   const emotions = [
//     'admiration',
//     'amusement',
//     'anger',
//     'annoyance',
//     'approval',
//     'caring',
//     'confusion',
//     'curiosity',
//     'desire',
//     'disappointment',
//     'disapproval',
//     'disgust',
//     'embarrassment',
//     'excitement',
//     'fear',
//     'gratitude',
//     'grief',
//     'joy',
//     'love',
//     'nervousness',
//     'optimism',
//     'pride',
//     'realization',
//     'relief',
//     'remorse',
//     'sadness',
//     'surprise',
//     'neutral',
//   ]

//   const handleSearch = async () => {
//     const booksUrl = 'http://localhost:9000/books'
//     try {
//       setError('') // Очистити помилки
//       let endpoint = ''
//       let requestData = {}

//       // Визначаємо ендпоінт та дані в залежності від вибраного табу
//       if (activeTab === 'description') {
//         endpoint = booksUrl + '/user_desc'
//         requestData = { user_description: description, top_n: booksCount }
//       } else if (activeTab === 'emotion') {
//         endpoint = booksUrl + '/emotion'
//         requestData = { emotion: selectedEmotion, top_n: booksCount }
//       } else if (activeTab === 'emotion-description') {
//         endpoint = booksUrl + '/emotion/desc'
//         requestData = {
//           user_description: description,
//           emotion: selectedEmotion,
//           top_n: booksCount,
//         }
//       }

//       // Виконати запит
//       const response = await axios.post(endpoint, requestData)
//       console.log(response.data)
//       setBooks(response.data)
//     } catch (err) {
//       setError('Something went wrong. Please try again.')
//     }
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="container mt-5">
//         <h1 className="text-center mb-4">Search Books</h1>

//         <div className="mb-3">
//           <label htmlFor="booksCount" className="form-label">
//             How many books would you like to see?
//           </label>
//           <select
//             id="booksCount"
//             className="form-select"
//             value={booksCount}
//             onChange={(e) => setBooksCount(Number(e.target.value))}
//           >
//             {[5, 10, 15, 20].map((count) => (
//               <option key={count} value={count}>
//                 {count}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Таби для перемикання */}
//         <ul className="nav nav-tabs mb-4">
//           <li className="nav-item">
//             <button
//               className={`nav-link ${
//                 activeTab === 'description' ? 'active' : ''
//               }`}
//               onClick={() => setActiveTab('description')}
//             >
//               Search by Description
//             </button>
//           </li>
//           <li className="nav-item">
//             <button
//               className={`nav-link ${activeTab === 'emotion' ? 'active' : ''}`}
//               onClick={() => setActiveTab('emotion')}
//             >
//               Search by Emotion
//             </button>
//           </li>

//           <li className="nav-item">
//             <button
//               className={`nav-link ${
//                 activeTab === 'emotion-description' ? 'active' : ''
//               }`}
//               onClick={() => setActiveTab('emotion-description')}
//             >
//               Search by Description and Emotion
//             </button>
//           </li>
//         </ul>

//         {/* Контент для кожного табу
//         {activeTab === 'description' ? (
//           <div>
//             <textarea
//               className="form-control mb-3"
//               rows="3"
//               placeholder="Describe the book you're looking for..."
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//             <button
//               className="btn btn-primary w-100 mb-4"
//               onClick={handleSearch}
//             >
//               Search by Description
//             </button>
//           </div>
//         ) : (
//           <div>
//             <h5>Select an Emotion:</h5>
//             <div className="mb-3">
//               {emotions.map((emotion) => (
//                 <button
//                   key={emotion}
//                   className={`btn m-1 ${
//                     selectedEmotion === emotion
//                       ? 'btn-primary'
//                       : 'btn-outline-primary'
//                   }`}
//                   onClick={() => setSelectedEmotion(emotion)}
//                 >
//                   {emotion}
//                 </button>
//               ))}
//             </div>
//             <button
//               className="btn btn-primary w-100 mb-4"
//               onClick={handleSearch}
//               disabled={!selectedEmotion}
//             >
//               Search by Emotion
//             </button>
//           </div>
//         )} */}

//         {activeTab === 'description' && (
//           <div>
//             <textarea
//               className="form-control mb-3"
//               rows="3"
//               placeholder="Describe the book you're looking for..."
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//             <button
//               className="btn btn-primary w-100 mb-4"
//               onClick={handleSearch}
//               disabled={!description}
//             >
//               Search by Description
//             </button>
//           </div>
//         )}

//         {activeTab === 'emotion' && (
//           <div>
//             <h5>Select an Emotion:</h5>
//             <div className="mb-3">
//               {emotions.map((emotion) => (
//                 <button
//                   key={emotion}
//                   className={`btn m-1 ${
//                     selectedEmotion === emotion
//                       ? 'btn-primary'
//                       : 'btn-outline-primary'
//                   }`}
//                   onClick={() => setSelectedEmotion(emotion)}
//                 >
//                   {emotion}
//                 </button>
//               ))}
//             </div>
//             <button
//               className="btn btn-primary w-100 mb-4"
//               onClick={handleSearch}
//               disabled={!selectedEmotion}
//             >
//               Search by Emotion
//             </button>
//           </div>
//         )}

//         {activeTab === 'emotion-description' && (
//           <div>
//             <textarea
//               className="form-control mb-3"
//               rows="3"
//               placeholder="Describe the book you're looking for..."
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//             <h5>Select an Emotion:</h5>
//             <div className="mb-3">
//               {emotions.map((emotion) => (
//                 <button
//                   key={emotion}
//                   className={`btn m-1 ${
//                     selectedEmotion === emotion
//                       ? 'btn-primary'
//                       : 'btn-outline-primary'
//                   }`}
//                   onClick={() => setSelectedEmotion(emotion)}
//                 >
//                   {emotion}
//                 </button>
//               ))}
//             </div>
//             <button
//               className="btn btn-primary w-100 mb-4"
//               onClick={handleSearch}
//               disabled={!description || !selectedEmotion}
//             >
//               Search by Description and Emotion
//             </button>
//           </div>
//         )}

//         {/* Вивід результатів */}
//         {error && <div className="alert alert-danger">{error}</div>}

//         <div>
//           <h3>Results:</h3>
//           {books.length > 0 ? (
//             <ul className="list-group">
//               {books.map((book, index) => (
//                 <li key={index} className="list-group-item">
//                   <h5>
//                     <a href={`/books/${book.id}`}>{book.title}</a>
//                   </h5>
//                   <p>Score: {book.score.toFixed(4)}</p>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No books found.</p>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }
import React, { useState, useEffect } from 'react'
import Navbar from '../../../fragments/Navbar/Navbar'
import Footer from '../../../fragments/Footer/Footer'

export default function BookSearch() {
  // const [description, setDescription] = useState('')
  const [description, setDescription] = useState(
    'I want a book about finding calm and balance in everyday life.'
  )

  const [books, setBooks] = useState([])

  // const [emotion, setEmotion] = useState(null)
  const [emotion, setEmotion] = useState('curiosity')

  const [showEmotions, setShowEmotions] = useState(false)

  const emotions = [
    'admiration',
    'amusement',
    'anger',
    'annoyance',
    'approval',
    'caring',
    'confusion',
    'curiosity',
    'desire',
    'disappointment',
    'disapproval',
    'disgust',
    'embarrassment',
    'excitement',
    'fear',
    'gratitude',
    'grief',
    'joy',
    'love',
    'nervousness',
    'optimism',
    'pride',
    'realization',
    'relief',
    'remorse',
    'sadness',
    'surprise',
    'neutral',
  ]
  const handleSearch = () => {
    const mockBooks = [
      {
        id: 1,
        title: 'The Power of Now',
        authors: 'Eckhart Tolle',
        description:
          'A guide to living in the present moment, promoting peace and mindfulness in daily life.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd-2pAOkmRdvWof-zrJaf5-soLTsO-cHQ_BQ&s',
        price: '₹299.00',
        rating: 4.5,
        genre: 'Self-Help',
      },
      {
        id: 2,
        title: 'Big Magic',
        authors: 'Elizabeth Gilbert',
        description:
          'A calming exploration of creativity and how to live a more inspired, balanced life.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM_Aiwdz1B_rbAqevRxbNZf2yvOAOJ7xWLZA&s',
        price: '₹279.00',
        rating: 4.4,
        genre: 'Self-Help',
      },
      {
        id: 3,
        title: 'The Little Book of Hygge',
        authors: 'Meik Wiking',
        description:
          'A cozy guide to finding comfort and calm through simple, everyday pleasures.',
        image: 'https://m.media-amazon.com/images/I/81yhIviKEnL._UF1000,1000_QL80_.jpg',
        price: '₹249.00',
        rating: 4.3,
        genre: 'Self-Help',
      },
    ]
    setBooks(mockBooks)
    // const mockBooks = [
    //   {
    //     id: 1,
    //     title: 'Shadows of Memory',
    //     authors: 'Clara Nguyen',
    //     description:
    //       'A deeply emotional exploration of love, grief, and redemption.',
    //     image:
    //       'https://images-na.ssl-images-amazon.com/images/I/81eB+7+CkUL.jpg',
    //     price: '₹249.00',
    //     rating: 4.4,
    //     genre: 'Drama',
    //   },
    //   {
    //     id: 2,
    //     title: 'Beyond the Horizon',
    //     authors: 'James Holt',
    //     description:
    //       'Adventure, fear, and courage collide in this gripping odyssey.',
    //     image:
    //       'https://images-na.ssl-images-amazon.com/images/I/71tbalAHYCL.jpg',
    //     price: '₹299.00',
    //     rating: 4.7,
    //     genre: 'Adventure',
    //   },
    // ]
    // setBooks(mockBooks)
  }

  const handleEmotionButton = () => {
    if (emotion) {
      setEmotion(null)
      setShowEmotions(false)
    } else {
      setShowEmotions((prev) => !prev)
    }
  }

  const handleSelectEmotion = (selected) => {
    setEmotion(selected)
    setShowEmotions(false)
  }

  return (
    <>
      <Navbar />
      <div
        className="container-fluid py-5"
        style={{
          backgroundColor: '#f6fbfc',
          minHeight: '100vh',
        }}
      >
        {/* Заголовок */}
        <h1
          className="text-center fw-bold mb-3"
          style={{ color: '#0a5c91', fontSize: '2.5rem' }}
        >
          Emotional Book Discovery
        </h1>
        <p
          className="text-center mb-5"
          style={{ color: '#5c6b74', fontSize: '1.1rem' }}
        >
          Describe what you want to feel — and we’ll find books that match your
          emotion
        </p>

        {/* Пошук */}
        <div
          className="d-flex flex-column align-items-center gap-3 mb-5"
          style={{ width: '100%' }}
        >
          <textarea
            className="shadow-sm"
            placeholder="Describe the book you’re looking for..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            style={{
              borderRadius: '15px',
              padding: '16px 24px',
              border: '1px solid #d0e7f3',
              width: '80%',
              maxWidth: '1200px',
              backgroundColor: '#ffffff',
              color: '#0a5c91',
              fontSize: '1rem',
              resize: 'none',
            }}
            onFocus={(e) =>
              (e.target.style.boxShadow = '0 0 12px rgba(0,150,255,0.25)')
            }
            onBlur={(e) => (e.target.style.boxShadow = 'none')}
          />

          <div className="d-flex gap-3 flex-wrap">
            {/* Emotion Dropdown Button */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={handleEmotionButton}
                className="btn shadow-sm"
                style={{
                  borderRadius: '10px',
                  padding: '10px 18px',
                  border: '1px solid #d0e7f3',
                  fontWeight: '500',
                  backgroundColor: emotion ? '#00a9b7' : '#ffffff',
                  color: emotion ? '#ffffff' : '#0a5c91',
                  transition: 'all 0.3s ease',
                }}
              >
                {emotion ? emotion : 'Select Emotion'}
              </button>

              {showEmotions && (
                <div
                  className="shadow-sm"
                  style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    backgroundColor: '#ffffff',
                    border: '1px solid #d0e7f3',
                    borderRadius: '10px',
                    zIndex: 10,
                    minWidth: '160px',
                    overflow: 'hidden',
                  }}
                >
                  {emotions.map((e) => (
                    <div
                      key={e}
                      onClick={() => handleSelectEmotion(e)}
                      style={{
                        padding: '10px 16px',
                        color: '#0a5c91',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseEnter={(el) =>
                        (el.currentTarget.style.backgroundColor = '#f0f8fb')
                      }
                      onMouseLeave={(el) =>
                        (el.currentTarget.style.backgroundColor = 'transparent')
                      }
                    >
                      {e}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            disabled={!description || !emotion}
            className="btn text-white rounded-pill px-5 py-2 shadow-sm"
            style={{
              backgroundColor: !description || !emotion ? '#a0c6d4' : '#00a9b7',
              fontWeight: '500',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (description && emotion)
                e.currentTarget.style.backgroundColor = '#008c9a'
            }}
            onMouseLeave={(e) => {
              if (description && emotion)
                e.currentTarget.style.backgroundColor = '#00a9b7'
            }}
          >
            Search Books
          </button>
        </div>

        {/* Результати */}
        <div className="container">
          {books.length > 0 ? (
            <div
              className="row justify-content-center"
              style={{ rowGap: '30px' }}
            >
              {books.map((book) => (
                <div
                  key={book.id}
                  className="col-sm-6 col-md-4 col-lg-3 d-flex"
                >
                  <div
                    className="card flex-fill border-0 shadow-sm rounded-4 overflow-hidden"
                    style={{
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer',
                      backgroundColor: '#ffffff',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px)'
                      e.currentTarget.style.boxShadow =
                        '0 10px 25px rgba(0,100,255,0.15)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow =
                        '0 5px 15px rgba(0,100,255,0.1)'
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: '#e8f3f8',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '230px',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={book.image}
                        alt={book.title}
                        className="img-fluid"
                        style={{
                          objectFit: 'contain',
                          maxHeight: '100%',
                          maxWidth: '100%',
                        }}
                      />
                    </div>

                    <div className="card-body d-flex flex-column">
                      <h5
                        className="fw-semibold mb-1"
                        style={{ color: '#003d73', fontSize: '1.05rem' }}
                      >
                        {book.title}
                      </h5>
                      <p
                        className="text-muted mb-1"
                        style={{ fontSize: '0.9rem' }}
                      >
                        by {book.authors}
                      </p>
                      <p
                        className="text-secondary mb-2"
                        style={{
                          fontSize: '0.9rem',
                          flexGrow: 1,
                        }}
                      >
                        {book.description}
                      </p>

                      {book.rating ? (
                        <p
                          style={{
                            color: '#ffb400',
                            fontWeight: '500',
                            fontSize: '0.9rem',
                          }}
                        >
                          ⭐ {book.rating.toFixed(1)}
                        </p>
                      ) : (
                        <p style={{ color: '#a0a0a0', fontSize: '0.9rem' }}>
                          (N/A)
                        </p>
                      )}

                      <div className="mt-auto d-flex justify-content-between align-items-center">
                        {/* <span
                          style={{
                            color: '#0047ab',
                            fontWeight: '600',
                            fontSize: '1rem',
                          }}
                        >
                          {book.price}
                        </span> */}
                        <a
                          href={`/books/${book.id}`}
                          className="btn btn-sm rounded-pill text-white"
                          style={{
                            backgroundColor: '#00a9b7',
                            padding: '6px 14px',
                            fontWeight: '500',
                            fontSize: '0.85rem',
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = '#008c9a')
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = '#00a9b7')
                          }
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">No books found.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}
