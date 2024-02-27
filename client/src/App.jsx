import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [words, setWords] = useState("");
  const [trip, setTrips] = useState([]);

  const getTrip = async () => {
    try {
      let result = await axios.get(
        `http://localhost:4001/trips?keywords=${words}`
      );
      setTrips(result.data.data);
      console.log(trip);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTrip();
  }, [words]);

  function getInformation(e) {
    setWords(e.target.value);
    console.log(words);
  }

  return (
    <section className="flex flex-col   max-h-full w-screen   bg-white items-center">
      <div>
        <h1 className=" text-[#2FA6EA] text-center text-[60px] py-2 px-4 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transform hover:scale-105">
          เที่ยวไหนดี
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-black  py-2 px-4 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transform hover:scale-105  ">
          ค้นหาที่เที่ยว{" "}
        </h1>

        <div className="w-[1200px] mx-auto ">
          <input
            type="text"
            className="block w-full px-4 py-2  border-b-2  focus:border-blue-500 text-center border rounded-lg py-2 px-4 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transform hover:scale-105 "
            placeholder="กรุณาพิมพ์ข้อความที่นี่"
            onChange={getInformation}
          />
        </div>
      </div>

      {trip === undefined ? (
        <p>loading..</p>
      ) : (
        trip.map((item, index) => (
          <div
            key={index}
            className=" flex   w-[1000px]   bg-white mt-12 rounded-lg shadow-lg transition-all duration-300 hover:scale-125  "
          >
            <a
              className=" h-[250px] w-[250px] mr-2   hover:text-[#2FA6EA]"
              href={item.url}
            >
              <img
                src={item.photos[0]}
                alt="รูปภาพ"
                className="h-[250px] w-[250px] rounded-md transform hover:scale-110 transition duration-300 ease-in-out"
              />
            </a>
            <div className="w-[600px] h-[250px]  flexcol   ">
              <a
                href={item.url}
                className="text-gray-700 font-semibold hover:text-[#2FA6EA] "
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{item.title}</span>
              </a>
              <p className="text-gray-600 mt-2 inline-block">
                {item.description.slice(0, 100)}
              </p>
              <a
                className="text-gray-700 mt-2 hover:text-[#2FA6EA] "
                href={item.url}
              >
                อ่านต่อ...
              </a>
              <p className="text-gray-600 mt-2">
                <span className="inline-block pr-3 gap-5">หมวด</span>
                {item.tags.map((item, index) => (
                  <span key={index} className=" ml-1  text-[#2FA6EA] ">
                    {item}
                  </span>
                ))}
              </p>
              <div class="flex justify-center">
                <a
                  className="   flex  gap-10 h-20 w-30 mt-2   "
                  href={item.url}
                >
                  <img
                    src={item.photos[1]}
                    alt="รูปภาพ"
                    className="h-20 w-30    rounded-lg transform hover:scale-110 transition duration-300 ease-in-out "
                  />
                  <img
                    src={item.photos[2]}
                    alt="รูปภาพ"
                    className="h-20  w-30  rounded-lg transform hover:scale-110 transition duration-300 ease-in-out"
                  />
                  <img
                    src={item.photos[3]}
                    alt="รูปภาพ"
                    className="h-20  w-30  rounded-lg transform hover:scale-110 transition duration-300 ease-in-out"
                  />
                </a>
              </div>
            </div>
          </div>
        ))
      )}
    </section>
  );
}
