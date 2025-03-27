import { Link } from 'react-router'
import Button from '../../lib/buttons/ButtonFactory'

import './Home.css'
import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

function duplicateSlides(sliderId: string) {
    const sliderTrack = document.querySelector(`#${sliderId} .slider-track`)
    if (sliderTrack) {
        const slides = Array.from(sliderTrack.children)
        slides.forEach(slide => {
            const clone = slide.cloneNode(true)
            sliderTrack?.appendChild(clone)
        })
    }
}

export default function Home() {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    function launchConfetti() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        const colors = ['#e63946', '#a8dadc', '#1d3557']
        timeoutRef.current = setInterval(() => {
            confetti({
                particleCount: 3,
                angle: 90,
                spread: 50,
                startVelocity: 20,
                ticks: 1000,
                gravity: 0.3,
                origin: { x: Math.random(), y: 0 },
                colors,
            })
        }, 200)
    }

    useEffect(() => {
        duplicateSlides('slider1')
        duplicateSlides('slider2')
        duplicateSlides('slider3')
        launchConfetti()
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    return (
        <>
            <section>
                <div className='content'>
                    <h1 className='w-max text-[clamp(2rem,5vw,7rem)] tracking-wide mb-8 bg-gradient-to-r from-[#0075ba] via-green-500 to-[#fae282] bg-clip-text text-transparent'>
                        Movie Platform
                    </h1>
                    <p>Discover and explore an extensive collection of movies from all genres.</p>
                    <div className='mt-8'>
                        <Button.Primary>
                            <Link to={'/movies'}>Get Started</Link>
                        </Button.Primary>
                    </div>
                </div>
                <div className='sliders'>
                    <div className='slider-container' id='slider1'>
                        <div className='slider-track'>
                            <div className='slide'>
                                <img src='image-1.jpeg' />
                            </div>
                            <div className='slide'>
                                <img src='image-2.jpeg' />
                            </div>
                            <div className='slide'>
                                <img src='image-3.jpg' />
                            </div>
                            <div className='slide'>
                                <img src='image-4.jpg' />
                            </div>
                        </div>
                    </div>
                    <div className='slider-container' id='slider2'>
                        <div className='slider-track'>
                            <div className='slide'>
                                <img src='image-5.webp' />
                            </div>
                            <div className='slide'>
                                <img src='image-6.jpg' />
                            </div>
                            <div className='slide'>
                                <img src='image-7.jpg' />
                            </div>
                            <div className='slide'>
                                <img src='image-8.jpg' />
                            </div>
                        </div>
                    </div>
                    <div className='slider-container' id='slider3'>
                        <div className='slider-track'>
                            <div className='slide'>
                                <img src='image-9.jpg' />
                            </div>
                            <div className='slide'>
                                <img src='image-10.jpg' />
                            </div>
                            <div className='slide'>
                                <img src='image-11.jpg' />
                            </div>
                            <div className='slide'>
                                <img src='image-12.jpg' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
