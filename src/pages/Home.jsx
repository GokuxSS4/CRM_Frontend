import { Bar, Line, Pie } from "react-chartjs-2";
import { BsFillPencilFill } from "react-icons/bs";
import { MdCancel, MdOutlineDoneAll, MdPending } from "react-icons/md";
import { TbProgressBolt } from "react-icons/tb";

import Card from "../Components/Card";
import useCharts from "../Hooks/useCharts";
import useTickets from "../Hooks/useTickets";
import HomeLayout from "./../Layouts/HomeLayout";

export default function Home() {
  const ticketState = useTickets();

  const [pieChartData, lineChartData, barChartData] = useCharts();

  return (
    <HomeLayout>
      <div className="mt-10 flex flex-row justify-center items-center gap-5 flex-wrap">
        <Card
          titleText="Open"
          status={
            ticketState.ticketDistribution.open /
            ticketState.dowloadedTickets.length
          }
          quantity={ticketState.ticketDistribution.open}
          background="bg-yellow-300"
          borderColor="border-green-300"
          fontColor="text-black"
          dividerColor="bg-black"
        >
          <BsFillPencilFill className="inline mr-2" />
        </Card>
        <Card
          titleText="In Progress"
          status={
            ticketState.ticketDistribution.inProgress /
            ticketState.dowloadedTickets.length
          }
          quantity={ticketState.ticketDistribution.inProgress}
          background="bg-orange-300"
          borderColor="border-red-300"
          fontColor="text-black"
          dividerColor="bg-black"
        >
          <TbProgressBolt className="inline mr-2" />
        </Card>
        <Card
          titleText="Resolved"
          status={
            ticketState.ticketDistribution.resolved /
            ticketState.dowloadedTickets.length
          }
          quantity={ticketState.ticketDistribution.resolved}
          background="bg-purple-300"
          borderColor="border-blue-700"
          fontColor="text-black"
          dividerColor="bg-black"
        >
          <MdOutlineDoneAll className="inline mr-2" />
        </Card>
        <Card
          titleText="On Hold"
          status={
            ticketState.ticketDistribution.onHold /
            ticketState.dowloadedTickets.length
          }
          quantity={ticketState.ticketDistribution.onHold}
          background="bg-gray-300"
          borderColor="border-gray-800"
          fontColor="text-black"
          dividerColor="bg-black"
        >
          <MdPending className="inline mr-2" />
        </Card>
        <Card
          titleText="Cancelled"
          status={
            ticketState.ticketDistribution.cancelled /
            ticketState.dowloadedTickets.length
          }
          quantity={ticketState.ticketDistribution.cancelled}
          background="bg-blue-300"
          borderColor="border-violet-300"
          fontColor="text-black"
          dividerColor="bg-black"
        >
          <MdCancel className="inline mr-2" />
        </Card>
      </div>

      <div className="mt-10 flex justify-center items-center gap-10">
        <div className="w-80 h-80 ">
          <Pie data={pieChartData} />
        </div>
      </div>
      <div className="mt-10 mb-10 flex justify-center items-center gap-10">
        <div className="w-[50rem] bg-[wheat]">
          <Line data={lineChartData} />
        </div>
      </div>

      <div className="mt-10 mb-10 flex justify-center items-center gap-10">
        <div className="w-[50rem] bg-[wheat]">
          <Bar data={barChartData} />
        </div>
      </div>
    </HomeLayout>
  );
}
