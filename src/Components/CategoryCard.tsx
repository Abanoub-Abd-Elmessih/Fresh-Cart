interface Categories {
  Name: string;
  Image: string;
}

export default function CategoryCard({ Image, Name }: Categories) {

  return (
    <div
      className="rounded-xl shadow-xl p-3 bg-slate-200 font-inter text-gray-800 mx-2"
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-400 opacity-20 blur-[100px]" /></div>
      <img
        src={Image}
        alt="Category Image"
        className="w-full h-56 rounded-xl object-cover object-top"
      />
      <p className="mt-3">{Name}</p>
    </div>
  );
}
