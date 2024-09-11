import { useState } from "react";
import DetailBoxes from "./DetailBox/DetailBoxes";
import PerformanceChart from "./ChartComponent/PerformanceChart";
import Grouped from "./ThreeComponents/Grouped";
import Tasks from "./TasksFolder/Tasks";
import ManagedTable from "./ManagementTableFolder/ManagedTable";
import SalesComponent from "./GlobalSalesSection/SalesComponent";

function DashboardComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dashboard">
      <div className="components-section">
        <PerformanceChart />
        <DetailBoxes />
        <Grouped />
        <div className="task-list-table-flex">
          <Tasks />
          <ManagedTable />
        </div>
        <SalesComponent />
      </div>
    </div>
  );
}

export default DashboardComponent;
