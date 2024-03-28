import {
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  Modal,
  ModalClose,
  ModalDialog,
  Select,
} from "@mui/joy";
import { Order } from "../../order";
import Option from "@mui/joy/Option";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { removeUndefinedProperties } from "../utils";
import CircularProgress from "@mui/joy/CircularProgress";

interface EditOrderModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  order: Order;
  submit: (id: string, changes: Partial<Order>) => Promise<void>;

  loading?: boolean;
}

export default function EditOrderModal({
  open,
  setOpen,
  order,
  submit,
  loading,
}: EditOrderModalProps) {
  const [status, setStatus] = useState(order?.status);
  const [date, setDate] = useState(order?.date);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ModalDialog>
        <ModalClose />
        <DialogTitle id="filter-modal" level="h2">
          Edit Order
        </DialogTitle>
        <DialogContent>Edit order {order?.id}</DialogContent>

        <Divider sx={{ my: 1 }} />
        <FormControl size="sm">
          <FormLabel>Status</FormLabel>
          <Select
            size="sm"
            defaultValue={order?.status}
            slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
            onChange={(e, newValue) => {
              setStatus(newValue as Order["status"]);
            }}
          >
            <Option value="Paid">Paid</Option>
            <Option value="Pending">Pending</Option>
            <Option value="Refunded">Refunded</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>
        </FormControl>

        <FormControl size="sm">
          <FormLabel>Date</FormLabel>
          <DatePicker
            defaultValue={order?.date}
            onChange={(date) => {
              if (date) setDate(date);
            }}
          />
        </FormControl>

        <Button
          color="primary"
          onClick={() =>
            submit(
              order.firebaseId,
              removeUndefinedProperties({ status, date })
            ).then(() => setOpen(false))
          }
          disabled={loading}
        >
          {loading ? <CircularProgress /> : "Submit"}
        </Button>
      </ModalDialog>
    </Modal>
  );
}
