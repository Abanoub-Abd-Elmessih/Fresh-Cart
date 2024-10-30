type TitleProps = {
Title1:string;
Title2:string;
}
export default function Title({Title1 , Title2}:TitleProps) {
  return (
    <div className="text-4xl italic flex w-full justify-center items-center gap-2 my-6 font-serif">
      <p className='w-8 md:w-12 h-0.5 bg-gray-500'></p>
      <p className="text-gray-400">{Title1}</p>
      <p className="text-gray-600">{Title2}</p>
      <p className='w-8 md:w-12 h-0.5 bg-gray-500'></p>
    </div>
  )
}
