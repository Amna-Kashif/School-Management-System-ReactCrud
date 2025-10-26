import React from 'react'
import { Container } from 'react-bootstrap'
import './Home.css';

const Home = () => {
  return (
        <section id='home' className='home-section'>
            <div className="banner-wrapper">
                <img src="/banner.png" alt="Banner" className='banner-img' />
                <div className="overlay-content text-white">
                    <Container>
                        <h1 className='display-4 fw-bold'>BrightEdge International School</h1>
                        <p className='card-text lead'>Shaping future leaders through quality education, innovation, and integrity. At BrightEdge,
              we believe in nurturing curiosity, critical thinking, and lifelong learning from the very first step.</p>
                    </Container>
                </div>
            </div>
        </section>
  )
}

export default Home