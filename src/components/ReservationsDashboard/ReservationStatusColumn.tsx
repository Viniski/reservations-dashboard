import React, { useMemo, useState } from "react";
import { Reservation, ReservationStatus } from "../../types/reservation";
import ReservationCard from "./ReservationCard/ReservationCard";
import "./ReservationBoard.css";
import { Button } from "@mui/material";

interface ReservationStatusColumnProps {
  reservations: Reservation[] | undefined;
  status: string;
}

const ReservationStatusColumn: React.FC<ReservationStatusColumnProps> = ({
  reservations,
  status,
}) => {
  const [sortOrder, setSortOrder] = useState<"desc" | "asc" | undefined>(
    undefined
  );

  if (!reservations) {
    return null;
  }

  const sortedReservations = useMemo(() => {
    if (sortOrder === "desc") {
      return reservations.sort(
        (reservationA, reservationB) =>
          new Date(reservationA.checkInDate).getTime() -
          new Date(reservationB.checkInDate).getTime()
      );
    }
    if (sortOrder === "asc") {
      return reservations.sort(
        (reservationA, reservationB) =>
          new Date(reservationB.checkInDate).getTime() -
          new Date(reservationA.checkInDate).getTime()
      );
    }
    return reservations;
  }, [sortOrder]);

  const statusColors: Record<ReservationStatus, string> = {
    Reserved: "#3498db",
    "Due In": "#2ecc71",
    "In House": "#9b59b6",
    "Due Out": "#f39c12",
    "Checked Out": "#7f8c8d",
    Canceled: "#e74c3c",
    "No Show": "#c0392b",
  };

  return (
    <div className="reservation-board">
      <div key={status} className="status-column">
        <div
          className="status-header"
          style={{
            backgroundColor: statusColors[status as ReservationStatus],
          }}
        >
          <h2>{status}</h2>
          <span className="reservation-count">{reservations.length}</span>
        </div>
        <Button
          onClick={() =>
            setSortOrder((prevState) => (prevState === "asc" ? "desc" : "asc"))
          }
        >
          {sortOrder === "asc" ? "Sortuj rosnąco" : "Sortuj malejąco"}
        </Button>
        <div className="reservation-list">
          {sortedReservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              statusColor={statusColors[reservation.status]}
            />
          ))}
          {reservations.length === 0 && (
            <div className="empty-status">Brak rezerwacji</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationStatusColumn;
