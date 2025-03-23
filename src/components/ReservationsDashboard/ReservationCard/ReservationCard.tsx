import React, { useReducer } from "react";
import { Reservation } from "../../../types/reservation";
import { formatDate } from "../../../utils/dateFormatters";
import "./ReservationCard.css";
import { Menu, MenuItem } from "@mui/material";
import useAnchorElement from "../../../hooks/use-anchor-element";
import DashboardDeleteDialog from "./DashboardDeleteDialog";
import supabase from "../../../api/supabase-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import QueryKey from "../../../enums/query-key";
import { useSnackbar } from "notistack";

interface ReservationCardProps {
  reservation: Reservation;
  statusColor: string;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  reservation,
  statusColor,
}) => {
  const queryClient = useQueryClient();
  const { anchorEl, onToggle } = useAnchorElement();
  const { enqueueSnackbar } = useSnackbar();
  const [isDeleteDialogOpen, toggleIsDeleteDialogOpen] = useReducer(
    (value) => !value,
    false
  );

  const deleteReservationMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await supabase
      .from("reservations")
      .delete()
      .eq("id", id);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.RESERVATIONS] });
      enqueueSnackbar("Rezerwacja została usunięta!", { variant: "success" });
      toggleIsDeleteDialogOpen();
    },
    onError: () => {
      enqueueSnackbar("Usuawnie rezerwacji nie powiodło się.", { variant: "error" });
    }
  });

  return (
    <>
      <DashboardDeleteDialog
        open={isDeleteDialogOpen}
        onClose={toggleIsDeleteDialogOpen}
        onConfirm={() => deleteReservationMutation.mutate(reservation.id)}
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
