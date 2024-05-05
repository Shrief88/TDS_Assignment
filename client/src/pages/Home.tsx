import CustomerView from "@/components/home/CustomerView";
import OwnerView from "@/components/home/OwnerView";
import AdminView from "@/components/home/AdminView";
import { useTypedSelector } from "@/store";

const Home = () => {
  const user = useTypedSelector((state) => state.authState.user);

  return (
    <>
      {user?.type === "STUDIO_OWNER" ? (
        <OwnerView />
      ) : user?.type === "ADMIN" ? (
        <AdminView />
      ) : (
        <CustomerView />
      )}
    </>
  );
};

export default Home;
