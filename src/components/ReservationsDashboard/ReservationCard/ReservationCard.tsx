import React, { useReducer } from "react";
import { Reservation } from "../../../types/reservation";
import { formatDate } from "../../../utils/dateFormatters";
import { Menu, MenuItem } from "@mui/material";
import useAnchorElement from "../../../hooks/useAnchorElement";
import DashboardDeleteDialog from "./DashboardDeleteDialog";
import DashboardChangeStatusDialog from "./DashboardChangeStatusDialog";
import { useNavigate } from "react-router-dom";
import { useDeleteReservationMutation } from "../../../hooks/useDeleteReservationMutation";
import { useChangeStatusReservationMutation } from "../../../hooks/useChangeStatusReservationMutation";
import "./ReservationCard.css";

interface ReservationCardProps {
  reservation: Reservation;
  statusColor: string;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  statusColor,
}) => {
  const navigate = useNavigate();
  const { anchorEl, onToggle } = useAnchorElement();
  const [isDeleteDialogOpen, toggleIsDeleteDialogOpen] = useReducer(
    (value) => !value,
    false
  );
  const [isChangeStatusDialogOpen, toggleChangeStatusDialogOpen] = useReducer(
    (value) => !value,
    false
  );

  const deleteReservationMutation = useDeleteReservationMutation(
    reservation.id,
    toggleIsDeleteDialogOpen
  );
  const changeStatusReservationMutation = useChangeStatusReservationMutation(
    reservation.id,
    toggleChangeStatusDialogOpen
  );

  return (
    <>
      <DashboardChangeStatusDialog
        reservation={reservation}
        open={isChangeStatusDialogOpen}
        onClose={toggleChangeStatusDialogOpen}
        onConfirm={(status) => {
          changeStatusReservationMutation.mutate(status);
        }}
      />
      <DashboardDeleteDialog
        open={isDeleteDialogOpen}
        onClose={toggleIsDeleteDialogOpen}
        onConfirm={() => deleteReservationMutation.mutate()}
      />
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
              id="reservation-card-menu"
              open={!!anchorEl}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              onClick={onToggle}
              onClose={onToggle}
            >
              <MenuItem onClick={() => toggleIsDeleteDialogOpen()}>
                Usuń rezerwację
              </MenuItem>
              {reservation.status !== "Due Out" &&
                reservation.status !== "No Show" && (
                  <MenuItem onClick={() => toggleChangeStatusDialogOpen()}>
                    Zmień status
                  </MenuItem>
                )}
              {(reservation.status === "Due In" ||
                reservation.status === "Reserved") && (
                <MenuItem onClick={() => navigate(`/edit/${reservation.id}`)}>
                  Edytuj rezerwację
                </MenuItem>
              )}
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
    </>
  );
};

export default ReservationCard;
