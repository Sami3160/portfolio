import { useState } from 'react'
import './App.css'

function App() {
  const birthDay = new Date('2004-05-28')
  const age = Math.floor((new Date() - birthDay) / (1000 * 60 * 60 * 24 * 365))
  const [showMore, setShowMore] = useState(false)
  return (
    <div className='gradient-background min-h-[100vh] w-fill flex flex-col items-center justify-center text-white'>
      <div className="content w-[90vw] md:w-[65vw] lg:w-[55vw] xl:w-[45vw] my-24">
        <div className="name">Sami Bhadgaonkar</div>
        <div className="name text-gray-200" style={{ fontFamily: 'Geist Thin' }}>Ready to work!</div>
        <div className="about flex flex-col mt-4 gap-3">
          <p className='text-gray-400'>About</p>
          <p className='text-gray-300' style={{ fontFamily: 'Geist Thin' }}>Hi, I'm Sami, I am
            <span className='text-white cursor-help' style={{ fontFamily: 'Geist Light' }}> {age} </span>
            years-old, focused on creative stuff and exploring new things and technologies. I'm also a
            <span className='text-white cursor-help' style={{ fontFamily: 'Geist Light' }}> full-stack developer </span>
            currently a student in DYP Collage Of Engineering and Technology, Bawda, Kolhapur of batch 2026.</p>
          <p className='text-gray-300' style={{ fontFamily: 'Geist Thin' }}>
            I enjoy building websites especially frontend part of website, and I have good interest in
            <span className='text-white cursor-help' style={{ fontFamily: 'Geist Light' }}> DevOps </span>

            and
            <span className='text-white cursor-help' style={{ fontFamily: 'Geist Light' }}> Cyber Security </span>
            (which doesnt mean im got at it btw...) also I'm interested in
            <span className='text-white cursor-help' style={{ fontFamily: 'Geist Light' }}> Linux System </span>(and my personal fav distro is Parrot OS).
          </p>

          <p className='text-gray-300' style={{ fontFamily: 'Geist Thin' }}>
            When im not coding or studying you can find me playing games, watching movies or series or anime or listening music or most probably sleeping.
          </p>
          <p className='text-gray-400 mt-5'>Current Positions</p>

          <p className='text-gray-300 flex flex-col' style={{ fontFamily: 'Geist Thin' }}>
            <span>
              {">>"}
              <span style={{ fontFamily: 'Geist Light', color: 'white' }}> Student At DYPCET, KOP</span>
            </span>
            <span>
              {">>"}
              <span style={{ fontFamily: 'Geist Light', color: 'white' }}> Tech Team Lead At Prarambh Club, DYP</span>
            </span>
            <span> {">>"}
              <span style={{ fontFamily: 'Geist Light', color: 'white' }}>  Tech Team Member at Microsoft Learn Student Ambassador Club, DYP</span> </span>
            <span>{">>"}
              <span style={{ fontFamily: 'Geist Light', color: 'white' }}>  Core Team Member at Open Code Crafter</span>
            </span>
          </p>

          <p className='text-gray-400 mt-5'>Currently learning more
            <span style={{ fontFamily: 'Geist Light', color: 'white' }}> Web Development </span>
            and
            <span style={{ fontFamily: 'Geist Light', color: 'white' }}> Web Pentesting  </span>

          </p>
          <div className="tech grid grid-cols-1 md:grid-cols-2 gap-y-3">

            <div className='text-gray-400 '>
              <div className="techDomain">Frontend</div>
              <div className="flex gap-1 flex-wrap">
                <div className='tech-item' >React</div>
                <div className='tech-item' >Tailwind</div>
                <div className='tech-item' >material/ui  <span style={{ fontSize: '0.7rem' }}>(Basic)</span></div>
                <div className='tech-item' >Framer-Motion</div>
                <div className='tech-item' >ThreeJs <span style={{ fontSize: '0.7rem' }}>(Learning)</span></div>
              </div>
            </div>
            <div className='text-gray-400 '>
              <div className="techDomain">Backend</div>
              <div className="flex gap-1 flex-wrap">
                <div className='tech-item' >Node.js</div>
                <div className='tech-item' >Django <span style={{ fontSize: '0.7rem' }}>(Basic)</span></div>
                <div className='tech-item' >Spring Boot <span style={{ fontSize: '0.7rem' }}>(New)</span></div>
                <div className='tech-item' >socket.io</div>
                <div className='tech-item' >Express.js</div>
                <div className='tech-item' >jsonwebtoken</div>
              </div>
            </div>
            {
              showMore && (
                <div className='text-gray-400 '>
                  <div className="techDomain">DevOps & Cloud</div>
                  <div className="flex gap-1 flex-wrap">
                    <div className='tech-item' >Docker <span style={{ fontSize: '0.7rem' }}>(Basics)</span></div>
                    <div className='tech-item' >Kubernetes <span style={{ fontSize: '0.7rem' }}>(Learning)</span></div>
                    <div className='tech-item' >docker-compose <span style={{ fontSize: '0.7rem' }}>(Learning)</span></div>
                  </div>
                </div>
              )
            }
            {
              showMore && (
                <div className='text-gray-400 '>
                  <div className="techDomain">DevOps & Cloud</div>
                  <div className="flex gap-1 flex-wrap">
                    <div className='tech-item' >Docker <span style={{ fontSize: '0.7rem' }}>(Basics)</span></div>
                    <div className='tech-item' >Kubernetes <span style={{ fontSize: '0.7rem' }}>(Learning)</span></div>
                    <div className='tech-item' >docker-compose <span style={{ fontSize: '0.7rem' }}>(Learning)</span></div>
                  </div>
                </div>
              )
            }
            {
              showMore && (
                <div className='text-gray-400 '>
                  <div className="techDomain">DevOps & Cloud</div>
                  <div className="flex gap-1 flex-wrap">
                    <div className='tech-item' >Linux, Parrot OS</div>
                    <div className='tech-item' >Nmap <span style={{ fontSize: '0.7rem' }}>(Learning)</span></div>
                    <div className='tech-item' >PortSwigger <span style={{ fontSize: '0.7rem' }}>(Learning)</span></div>
                  </div>
                </div>
              )
            }
            {
              showMore && (
                <div className='text-gray-400 '>
                  <div className="techDomain">Machine Learning</div>
                  <div className="flex gap-1 flex-wrap">
                    <div className='tech-item'>MediaPipe <span style={{ fontSize: '0.7rem' }}>(Using for pose estimation)</span></div>
                  </div>
                </div>
              )
            }
            {
              showMore && (
                <div className='text-gray-400 '>
                  <div className="techDomain">Languages</div>
                  <div className="flex gap-1 flex-wrap">
                    <div className='tech-item'>Javascript <span style={{ fontSize: '0.7rem' }}>(Typescript)</span></div>
                    <div className='tech-item'>Java</div>
                    <div className='tech-item'>Python</div>
                    <div className='tech-item'>SQL</div>
                  </div>
                </div>
              )
            }
            {
              showMore && (
                <div className='text-gray-400 '>
                  <div className="techDomain">Other Tools & Technologies</div>
                  <div className="flex gap-1 flex-wrap">
                    <div className='tech-item'>GitHub </div>
                    <div className='tech-item'>GIMP</div>
                    <div className='tech-item'>Linux</div>
                    <div className='tech-item'>OAuth 2.0</div>
                  </div>
                </div>
              )
            }










          </div>
          
          <div 
          className="loadMore px-4 py-1 bg-[#1b1f25] w-fit rounded-xl cursor-pointer"
          onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Show Less' : 'Show More'}
          </div>


        </div>
      </div>
    </div>
  )
}

export default App
