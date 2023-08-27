import React from "react";
import EnhancedTable from "./DashBoard";
import ResponsiveAppBar from "./NavBar";
import userContext from "../useUserDetails";

const Home = () => {
  return (
    <div>
      <userContext.Provider>
        <ResponsiveAppBar />
        <EnhancedTable />
      </userContext.Provider>
    </div>
  );
};

export default Home;
