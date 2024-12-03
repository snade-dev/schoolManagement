import Annoucement from "@/components/Annoucement"
import BigCalendar from "@/components/BigCalendar"
import EventCalandar from "@/components/EventCalandar"

const Studentpage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
      <div className=" h-full bg-white p-4 rounded-md">
        <h1 className=" text-xl font-semibold">Programme (4A)</h1>
        <BigCalendar />
      </div>
      </div>
      {/* RIGHT */}
      <div className=" w-f$ xl:w-1/3 flex flex-col gap-8">
        <EventCalandar />
        <Annoucement />
      </div>
    </div>
  )
}
export default Studentpage