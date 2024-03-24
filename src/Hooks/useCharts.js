import { ArcElement, CategoryScale,Chart as ChartJS, Legend,LinearScale,LineElement,PointElement,Title,Tooltip } from "chart.js";
import {useEffect,useState} from 'react';

import useTickets from './useTickets';
ChartJS.register(ArcElement, Legend, Title, Tooltip, CategoryScale,LinearScale,PointElement,LineElement);

export default function useCharts(){
    const ticketState = useTickets();

    const [ticketsChartData, setTicketsChartData] = useState({
        openTickets: [],
        inProgressTickets: [],
        resolvedTickets: [],
    });
  
    const pieChartData = {
        labels: Object.keys(ticketState.ticketDistribution),
        fontColor: "white",
        datasets: [
            {
                label: "Tickets data",
                data: Object.values(ticketState.ticketDistribution),
                backgroundColor: ["yellow", "red", "green", "blue", "purple", ],
                borderColor: ["yellow", "red", "green", "blue", "purple",],
                borderWidth: 1,
            }
        ]
    };
  
  
    const lineChartData = {
        labels: Object.keys(ticketsChartData.openTickets),
        fontColor: "white",
        datasets: [
            {
                label: "Open Tickets data",
                data: Object.values(ticketsChartData.openTickets),
                borderColor: 'rgb(255, 99, 132)',
            },
            {
                label: "In Progress Tickets data",
                data: Object.values(ticketsChartData.inProgressTickets),
                borderColor: 'rgb(53, 162, 235)',
            },
            {
                label: "Resolved Tickets data",
                data: Object.values(ticketsChartData.resolvedTickets),
                borderColor: 'rgb(245, 205, 95)',
                borderWidth: 4
            }
        ]
    };
  
  
    function processTickets() {
        // Fetch the current Date
        const currentDate = new Date(); 
        // Calculate the 10th date from today
        const tenthDayFromToday = new Date(); 
        tenthDayFromToday.setDate(currentDate.getDate() - 10); 
  
        // Process all the tickets
        if(ticketState.ticketList.length > 0 ) {
            // Prepare two localobjects to act as frequency map
            let openTicketsData = {};
            let inProgressTicketsData = {};
            let resolvedTicketsData = {};
  
            // Initialise the frequency map with default value 0 for the last 10 days
            for(let i = 0; i < 10; i++) {
                // Get the ith day from today
                const dateObject = new Date();
                dateObject.setDate(currentDate.getDate() - i);
                /**
                 * dateObject.toLocaleDateString() -> gives us string in the format DD/MM/YYYY
                 * Convert this to YYYY-MM-DD
                 */
                openTicketsData[dateObject.toJSON().slice(0,10)] = 0;
                inProgressTicketsData[dateObject.toJSON().slice(0,10)] = 0;
                resolvedTicketsData[dateObject.toJSON().slice(0,10)] = 0;
            }
  
            // Process all the tickets one by one
            ticketState.ticketList.forEach(ticket => {
                // Get the date part from the tickets by removing everything post the character T
                const date = ticket.createdAt.split("T")[0];
                const ticketDate = new Date(ticket.createdAt);
                // If ticket is open and lies in the last 10 days add it

                if(ticket.status == "open" && ticketDate >= tenthDayFromToday) {
                    openTicketsData[date] =  openTicketsData[date] + 1;
                }
  
                // If ticket is inProgress and lies in the last 10 days add it
                if(ticket.status == "inProgress" && ticketDate >= tenthDayFromToday) {
                    inProgressTicketsData[date] = inProgressTicketsData[date] + 1;
                }
  
                // If ticket is resolved and lies in the last 10 days add it
                if(ticket.status == "resolved" && ticketDate >= tenthDayFromToday) {
                    resolvedTicketsData[date] = resolvedTicketsData[date] + 1;
                }
            });
            //  update the state

            setTicketsChartData({
                openTickets: openTicketsData,
                inProgressTickets: inProgressTicketsData,
                resolvedTickets: resolvedTicketsData
            });
        }
    }
  
    useEffect(() => {
        processTickets();
    }, [ticketState.ticketList]);

    return [pieChartData,lineChartData];
}