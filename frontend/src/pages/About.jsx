import React from 'react'
import Tilte from '../components/Title'
import { assets } from '../assets/assets'
import Title from '../components/Title'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Tilte text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]'  src={assets.about_img} alt="about-img" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet minus unde tempora reiciendis eum ea, id alias sit incidunt, laudantium modi doloribus labore soluta consequuntur distinctio, aperiam facere quaerat omnis aliquid dolores! Ducimus, expedita sunt!</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat iusto praesentium necessitatibus facere illum voluptatibus, dolore cupiditate quisquam suscipit molestiae optio ea, dolorem nihil? Maxime esse quod corporis non quam animi, ducimus sit molestiae incidunt harum nobis repellat qui pariatur cumque unde exercitationem? Aut delectus quisquam cumque odit, inventore veniam omnis animi est sint eaque neque reiciendis accusantium deleniti quas?</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum tenetur eius nobis!</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
    </div>
  )
}

export default About
