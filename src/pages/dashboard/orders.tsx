import AdminHeader from "@/components/molecules/AdminHeader";
import OrdersTable from "@/components/organisms/OrdersTable";
import AdminLayout from "@/components/templates/AdminLayout";
import useAppDispatch from "@/hooks/useAppDispatch";
import useAppSelector from "@/hooks/useAppSelector";
import useDebounce from "@/hooks/useDebounce";
import { getOrders } from "@/store/slices/order-slice";
import Head from "next/head";
import { ReactNode, useEffect } from "react";

const Orders = () => {
  const dispatch = useAppDispatch();

  const query = useAppSelector((state) => state.orders.query);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    dispatch(getOrders(debouncedQuery));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  return (
    <>
      <Head>
        <title> My Crafts Web | Orders</title>
      </Head>

      <AdminHeader title="Orders" sx={{ mb: 4 }} />

      <OrdersTable />
    </>
  );
};

Orders.getLayout = function getLayout(page: ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Orders;
