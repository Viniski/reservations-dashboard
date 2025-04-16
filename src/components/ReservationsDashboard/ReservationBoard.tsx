import React, { useMemo } from "react";
import { Reservation, ReservationStatus } from "../../types/reservation";
import "./ReservationBoard.css";
import ReservationStatusColumn from "./ReservationStatusColumn";

interface ReservationBoardProps {
  reservations: Reservation[] | undefined;
}

const ReservationBoard: React.FC<ReservationBoardProps> = ({
  reservations,
}) => {
  const groupedReservations = useMemo(() => {
    const groups: Record<ReservationStatus, Reservation[]> = {
      Reserved: [],
      "Due In": [],
      "In House": [],
      "Due Out": [],
      "Checked Out": [],
      Canceled: [],
      "No Show": [],
    };

    reservations?.forEach((reservation) => {
      groups[reservation.status].push(reservation);
    });

    return groups;
  }, [reservations]);

  return (
    <div className="reservation-board">
      {Object.entries(groupedReservations).map(([status, reservations]) => (
        <ReservationStatusColumn reservations={reservations} status={status} />
      ))}
    </div>
  );
};

export default ReservationBoard;
