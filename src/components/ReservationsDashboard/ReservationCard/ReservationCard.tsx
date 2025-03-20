import React from "react";
import { Reservation } from "../../../types/reservation";
import { formatDate } from "../../../utils/dateFormatters";
import "./ReservationCard.css";
import { Menu, MenuItem } from "@mui/material";
import useAnchorElement from "../../../hooks/use-anchor-element";

interface ReservationCardProps {
  reservation: Reservation;
  statusColor: string;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  statusColor,
}) => {
  const { anchorEl, onToggle } = useAnchorElement();

  return (
    <div className="reservation-card">
      <div
        className="card-status-indicator"
        style={{ backgroundColor: statusColor }}
      ></div>
      <div className="card-content">
        <div className="card-header">
          <h3 className="guest-name">{reservation.guestName}</h3>
          <div className="action-button-card">
            <button onClick={onToggle} className="btn-action-card">
              ⋮
            </button>
          </div>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            id="header-menu"
            open={!!anchorEl}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            onClick={onToggle}
            onClose={onToggle}
          >
            <MenuItem>Usuń rezerwację</MenuItem>
          </Menu>
        </div>

        <div className="stay-dates">
          <div className="date-range">
            <span className="date-label">Przyjazd:</span>
            <span className="date-value">
              {formatDate(reservation.checkInDate)}
            </span>
          </div>
          <div className="date-range">
            <span className="date-label">Wyjazd:</span>
            <span className="date-value">
              {formatDate(reservation.checkOutDate)}
            </span>
          </div>
        </div>

        {reservation.roomNumber && (
          <div className="room-number">
            <span className="room-label">Pokój:</span>
            <span className="room-value">{reservation.roomNumber}</span>
          </div>
        )}

        {reservation.notes && (
          <div className="notes">
            <p>{reservation.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;
