import React from 'react'
import Destination from '../../components/destinationInput/destination'
import Discover from '../../components/discover/discover'
import Testimonial from '../../components/Testimonials/testimonial'
import Faq from '../../components/FAQs/faq'

export default function Home() {
  return (
    <div className='home' id="home">
        <Destination/>
        <Discover/>
        <Testimonial/>
        <Faq/>
    </div>
  )
}
