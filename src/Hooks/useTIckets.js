
import {useEffect} from 'react';
import { useDispatch,useSelector} from 'react-redux';

import { getTickets } from '../Redux/Slices/TicketSlice';

export default function useTickets(){
    const authState = useSelector((state) => state.auth);
    const ticketState = useSelector((state) => state.tickets);
    const dispatch = useDispatch();
  
    useEffect(()=>{
     if (ticketState.ticketList.length==0)
     {
        dispatch(getTickets());
     }
    },[authState.token]);

    return ticketState;
}