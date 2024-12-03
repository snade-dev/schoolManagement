import Annoucement from "@/components/Annoucement";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import EventCalandar from "@/components/EventCalandar";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

const Adminpage = () => {
  return (
    <div className=" p-4 flex gap-4 flex-col md:flex-row">
      {/* Left side */}
      <div className=" w-full lg:w-2/3 flex flex-col gap-8">
        {/* User card */}
        <div className=" flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
          <UserCard type="staff" />
        </div>
        {/* MIDDLE CHART */}
        <div className=" flex gap-4 flex-col lg:flex-row">
          {/* COUNY CHART */}
          <div className=" w-full lg:w-1/3 h-[400px]">
            <CountChart />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[400px]">
            <AttendanceChart />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className=" w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/* Right side */}
      <div className=" w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalandar />
        <Annoucement />
      </div>
    </div>
  );
};
export default Adminpage;
