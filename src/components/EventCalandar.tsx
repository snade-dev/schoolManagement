"use client";

import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPORARY
const events = [
  {
    id: 1,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const EventCalandar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  <div></div>;

  return (
    <div className=" bg-white rounded-md p-4">
      {isClient ? <Calendar onChange={onChange} value={value} /> : <p>Loading...</p>}
      <div className=" flex items-center justify-between">
        <h1 className=" font-semibold text-xl my-4">Evenements</h1>
        <Image src={"/moreDark.png"} alt="" width={20} height={20} />
      </div>
      <div className=" flex flex-col gap-4">
        {events.map((event) => (
          <div
            className=" p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
            key={event.id}
          >
            <div className=" flex items-center justify-between">
              <h1 className=" font-semibold text-gray-600">{event.title}</h1>
              <span className=" text-xs text-gray-300">{event.time}</span>
            </div>
            <p className=" mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default EventCalandar;
