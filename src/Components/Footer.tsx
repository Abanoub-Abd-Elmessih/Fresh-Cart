import { Link } from 'react-router-dom';
import logo from '../assets/favicon.png'
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

export default function Footer() {
    return (
<footer className="bg-white">
  <div className="container px-6 py-8 mx-auto">
    <div className="flex flex-col items-center text-center">
      <Link to={'/'} className='flex items-center text-emerald-500 font-bold gap-2 text-2xl font-inter'>
        <img className="w-auto h-7" src={logo} alt="Logo Image" />
        <span>Fresh Cart</span>
      </Link>
    </div>
    <hr className="my-6 border-gray-200" />
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
      <p className="text-sm text-gray-500">© Copyright 2024. All Rights Reserved.</p>
      <p className="text-sm md:me-5 text-gray-500">Developed By <b>Abanoub Abd Elmessih</b></p>
      <div className="flex mx-2 text-xl">
        <a href="https://www.linkedin.com/in/abanoub-abd-elmessih/" target='_blank' className="mx-2 text-gray-600 transition-colors duration-300 hover:text-emerald-500">
        <FaLinkedin />
        </a>
        <a href="https://github.com/Abanoub-Abd-Elmessih" target='_blank' className="mx-2 text-gray-600 transition-colors duration-300 hover:text-emerald-500">
        <FaGithub />
        </a>
        <a href="mailto:abanoubabdelmessih110@gmail.com" target='_blank' className="mx-2 text-gray-600 transition-colors duration-300 hover:text-emerald-500">
        <SiGmail />
        </a>
      </div>
    </div>
  </div>
</footer>

    );
  }
  