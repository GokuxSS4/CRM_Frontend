import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { updateTicket } from "../Redux/Slices/TicketSlice";

export default function TicketModal({ ticketDetail }) {
  const dispatch = useDispatch();
    const [ticket, setTicket] = useState(ticketDetail);

  function handleTicket(e) {
    const { name, value } = e.target;
    setTicket({
      ...ticket,
      [name]: value,
    });
  }

  async function handleUpdateTicket() {
    await dispatch(updateTicket(ticket));
    toast.success("Updated Ticket");
  }

  return (
    <dialog id="ticket_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{ticket.title}</h3>
        <textarea
          className="bg-white text-black my-2 rounded-lg resize-none p-2 w-full"
          name="description"
          cols="50"
          rows="7"
          value={ticket.description}
          onChange={handleTicket}
        ></textarea>

        <h1 className="text-lg text-white">
          Priority:
          <select
            name="ticketPriority"
            className="p-1 mx-2 bg-white text-black"
            onChange={handleTicket}
          >
            <option value="1" selected={ticket.ticketPriority == 1}>
              1
            </option>
            <option value="2" selected={ticket.ticketPriority == 2}>
              2
            </option>
            <option value="3" selected={ticket.ticketPriority == 3}>
              3
            </option>
            <option value="4" selected={ticket.ticketPriority >= 4}>
              4
            </option>
          </select>
        </h1>

        <h1 className="text-lg text-white my-4">
          Status:
          <select
            name="status"
            className="p-1 mx-2 bg-white text-black"
            onChange={handleTicket}
          >
            <option value="open" selected={ticket.status == "open"}>
              open
            </option>
            <option value="inProgress" selected={ticket.status == "inProgress"}>
              inProgress
            </option>
            <option value="resolved" selected={ticket.status == "resolved"}>
              resolved
            </option>
            <option value="onHold" selected={ticket.status == "onHold"}>
              onHold
            </option>
            <option value="cancelled" selected={ticket.status == "cancelled"}>
              cancelled
            </option>
          </select>
        </h1>

        <div className="modal-action">
          <button
            onClick={handleUpdateTicket}
            className="btn btn-success px-4 py-2 rounded-md hover:bg-green-400 transition-all ease-in-out duration-300 font-semibold text-lg"
          >
            Update ticket
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
