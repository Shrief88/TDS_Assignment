import CustomerView from "@/components/home/views/CustomerView";
import OwnerView from "@/components/home/views/OwnerView";
import AdminView from "@/components/home/views/AdminView";
import VisitorView from "@/components/home/views/visitorView";
import { useTypedSelector } from "@/store";

const Home = () => {
  const user = useTypedSelector((state) => state.authState.user);

  // const renderView = () => {
  //   switch (user?.type) {
  //     case "STUDIO_OWNER":
  //       <OwnerView />;
  //       break;
  //     case "ADMIN":
  //       <AdminView />;
  //       break;
  //     case "CUSTOMER":
  //       <CustomerView />;
  //       break;
  //     default:
  //       <VisitorView />;
  //       break;
  //   }
  // };

  return (
    <>
      {!user ? (
        <VisitorView />
      ) : user.type === "ADMIN" ? (
        <AdminView />
      ) : user.type === "CUSTOMER" ? (
        <CustomerView />
      ) : (
        <OwnerView />
      )}
    </>
  );
};

export default Home;
