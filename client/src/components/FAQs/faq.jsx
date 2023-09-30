import React from 'react'
import { useState } from 'react'
import './faq.css'

export default function Faq() {

const [active, setActive] = useState(null)

  const toggle = (i) => {
    if (active === i ) {
      return setActive(null)
    }
    setActive(i)
  }

  return (
    <div className='faq' id="faqs">
     <div className='heading'>Some Frequently Asked Questions</div>
      <div className="accordion">
     

      {question.map((item, i) => (
        <div className='faqItem' key={i}>
          <div className='title' onClick={()=> toggle(i)}>
            <h2>{item.question}</h2>
           <span className='plus'>{active === i ? '-' : '+' }</span>
          </div>
          <div className={active === i ? 'answer show' : 'answer' }>
            {item.answer}
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

const question = [

  {
    question: " How does EcoVoyage work?",
    answer: " EcoVoyage uses advanced algorithms and environmental data to suggest eco-friendly travel options. Simply input your destination and preferences, and we'll provide you with personalized itineraries that minimize your carbon footprint.",
  },
  {
    question: "What criteria do you use to determine the sustainability of travel options?",
    answer: "We consider several factors, including transportation emissions, accommodation practices, and activity choices. We prioritize options that use clean energy, reduce waste, and support local conservation efforts.",
  },

  {
    question: "How can I offset my carbon emissions through EcoVoyage?",
    answer: " EcoVoyage offers the option to calculate the carbon emissions from your trip and provides opportunities to offset these emissions through verified carbon offset projects.",
  },

  {
    question: "Do you offer real-time carbon footprint calculations for my trips?",
    answer: "Yes, we provide estimates of the carbon emissions associated with your travel plans based on the options you select. These estimates can help you make informed decisions about your environmental impact.",
  },

  {
    question: "Is EcoVoyage only for eco-conscious travelers?",
    answer: "While our primary focus is on sustainable travel, EcoVoyage is for all travelers who want to make responsible choices while exploring the world. We aim to educate and inspire travelers to reduce their environmental impact.",
  }

]
