interface Categories {
  Name: string;
  Image: string;
}

export default function CategoryCard({ Image, Name }: Categories) {

  return (
    <div
      className="rounded-xl shadow-xl p-3 bg-slate-200 font-inter text-gray-800 mx-2"
    >
      <img
        src={Image}
        alt="Category Image"
        className="w-full h-56 rounded-xl object-cover object-top"
      />
      <p className="mt-3">{Name}</p>
    </div>
  );
}
