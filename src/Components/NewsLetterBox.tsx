import { FormEvent } from "react";

export default function NewsLetterBox() {
    const onSubmitHandler =(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
    }
  return (
    <div className='text-center font-inter my-10'>
    <p className='text-2xl font-medium text-gray-800 '>Subscribe now get 20% off</p>
    <p className='text-gray-400 mt-3'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, sequi.
    </p>
    <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input type="email" className='w-full sm:flex-1 outline-none' required placeholder='Enter Your Email' />
        <button type='submit' className='bg-gray-600 text-white text-md px-10 py-4'>SUBSCRIBE</button>
    </form>
    </div>
  )
}
