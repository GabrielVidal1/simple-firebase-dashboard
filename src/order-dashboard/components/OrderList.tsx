import { ColorPaletteProp } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import { Order, OrderFilters } from "../../order";
import { format } from "date-fns";
import { EditMenu } from "./EditMenu";

interface OrderListProps {
  orders: Order[];
  filters?: OrderFilters;
  onFiltersChange?: (filters: OrderFilters) => void;
  editOrder: (order: Order) => void;
}

export default function OrderList({ orders, editOrder }: OrderListProps) {
  return (
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      {orders.map((listItem) => (
        <List
          key={listItem.id}
          size="sm"
          sx={{
            "--ListItem-paddingX": 0,
          }}
        >
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <ListItemContent
              sx={{ display: "flex", gap: 2, alignItems: "start" }}
            >
              <ListItemDecorator>
                <Avatar size="sm">{listItem.customer.initial}</Avatar>
              </ListItemDecorator>
              <div>
                <Typography fontWeight={600} gutterBottom>
                  {listItem.customer.name}
                </Typography>
                <Typography level="body-xs" gutterBottom>
                  {listItem.customer.email}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 0.5,
                    mb: 1,
                  }}
                >
                  <Typography level="body-xs">
                    {format(listItem.date, "d MMM Y")}
                  </Typography>
                  <Typography level="body-xs">&bull;</Typography>
                  <Typography level="body-xs">{listItem.id}</Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <EditMenu edit={() => editOrder(listItem)} />
                </Box>
              </div>
            </ListItemContent>
            <Chip
              variant="soft"
              size="sm"
              startDecorator={
                {
                  Paid: <CheckRoundedIcon />,
                  Refunded: <AutorenewRoundedIcon />,
                  Cancelled: <BlockIcon />,
                  Pending: <BlockIcon />,
                }[listItem.status]
              }
              color={
                {
                  Paid: "success",
                  Refunded: "neutral",
                  Cancelled: "danger",
                  Pending: "warning",
                }[listItem.status] as ColorPaletteProp
              }
            >
              {listItem.status}
            </Chip>
          </ListItem>
          <ListDivider />
        </List>
      ))}
    </Box>
  );
}
