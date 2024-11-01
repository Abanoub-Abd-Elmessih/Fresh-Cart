import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopBtn() {
  const [backToTopBtn, setBackToTopBtn] = useState(false);

    useEffect(()=>{
        window.addEventListener('scroll',()=>{
            if(window.scrollY > 100){
                setBackToTopBtn(true)
            }else{
                setBackToTopBtn(false)
            }
        })
    },[])

    const scrollToTop = ()=>{
        window.scroll({
            top:0,
            behavior:'smooth'
        })
    }

  return <>
  {
    backToTopBtn && <button className="aspect-square rounded-full p-3 fixed bottom-5 right-5 bg-gray-600 text-white text-xl animate-bounce z-50" onClick={scrollToTop}><FaArrowUp /></button>
  }
  </>
}
