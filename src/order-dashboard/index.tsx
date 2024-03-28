import Box from "@mui/joy/Box";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import OrderTable from "./components/OrderTable";
import OrderList from "./components/OrderList";
import Header from "./components/Header";
import { Order, OrderFilters } from "../order";
import { useMemo } from "react";
import { getCustomerName } from "./utils";

interface OrderDashboardProps {
  orders: Order[];
  onFiltersChange?: (filters: OrderFilters) => void;
  filters?: OrderFilters;

  editOrder: (order: Order) => void;

  children?: React.ReactNode;
}

export default function OrderDashboard({
  orders: rows,
  onFiltersChange,
  filters,
  editOrder,
  children,
}: OrderDashboardProps) {
  const customerNames = useMemo(
    () => rows.map((order) => getCustomerName(order.customer)),
    [rows]
  );

  // Client side filtering for id and customer
  const orders = useMemo(() => {
    let orders = rows;
    const { id, customer } = filters ?? {};

    if (id) {
      orders = orders.filter((order) =>
        order.id.includes((id ?? "").toLowerCase() ?? "")
      );
    }
    if (customer) {
      orders = orders.filter(
        (order) => getCustomerName(order.customer) === customer
      );
    }

    return orders;
  }, [filters, rows]);

  const commonProps = {
    orders,
    filters,
    onFiltersChange,
    editOrder,
    customerNames,
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <Header />
      {/* <Sidebar /> */}
      <Box
        component="main"
        className="MainContent"
        sx={{
          px: { xs: 2, md: 6 },
          pt: {
            xs: "calc(12px + var(--Header-height))",
            sm: "calc(12px + var(--Header-height))",
            md: 3,
          },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          height: "100dvh",
          gap: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon fontSize="small" />}
            sx={{ pl: 0 }}
          >
            <Link
              underline="none"
              color="neutral"
              href="#some-link"
              aria-label="Home"
            >
              <HomeRoundedIcon />
            </Link>
            <Link
              underline="hover"
              color="neutral"
              href="#some-link"
              fontSize={12}
              fontWeight={500}
            >
              Dashboard
            </Link>
            <Typography color="primary" fontWeight={500} fontSize={12}>
              Orders
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box
          sx={{
            display: "flex",
            mb: 1,
            gap: 1,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "start", sm: "center" },
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Typography level="h2" component="h1">
            Orders
          </Typography>
        </Box>
        <OrderTable {...commonProps} />
        <OrderList {...commonProps} />
      </Box>
      {children}
    </Box>
  );
}
