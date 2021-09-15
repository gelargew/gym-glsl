import React from 'react'
import '../about.css'
import IconedButton from '../components/IconedButton'

const Icon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>

export default function About() {

    return (
        <main className='about-container'>
            <div className='about'>
                <p>
                    Wrote his first javascript code in 2019. Gelar path to the world of computer science started from a youtube channel called <a>the coding Train</a>,
                    by watching the videos, he tried to grasp the fundamental concepts of computer graphic by recreated some of the projects himself. 
                    He also loves python. using it, He attended a lot of coding competition at google kickstart and atCoder.jp. in 2020, 
                    He got 2 certificates from Harvard CS50 classes: Web Programming and Introduction to Artificial Intelligence. and now He is focusing on
                    creating his own portfolio by creating small projects that people can check on his github.
                </p>
                
                <IconedButton Icon={Icon} />
            </div>
            
        </main>
    )
}