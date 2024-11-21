import { Title } from "../../../components";
import { useState, useEffect } from "react";
import { OrganizationChart } from "primereact/organizationchart";
import JobPositionService from "../../../services/job-position.service";

const OrgChart = () => {
  const [orgData, setOrgData] = useState();

  const transformToHierarchy = (data) => {
    const mapFilteredNode = (item) => {
      const filteredNode = {
        id: item.id,
        label: item.name,
        children: [],
        expanded: true,
        className: "rounded bg-gd text-white border border-0"
      };

      return filteredNode;
    };

    const map = new Map();
    const roots = [];

    data.forEach((item) => {
      map.set(item.id, mapFilteredNode(item));
    });

    data.forEach((item) => {
      if (item.parent_id) {
        const parent = map.get(item.parent_id);
        if (parent) {
          parent.children.push(map.get(item.id));
        }
      } else {
        roots.push(map.get(item.id));
      }
    });

    return roots;
  };

  const nodeTemplate = (node) => {
    return (
      <div className="flex flex-col items-center">
        <div className="fw-bold text-md">{node.label}</div>
      </div>
    );
  };
  useEffect(() => {
    JobPositionService.getJobPositions().then((response) => {
      setOrgData(transformToHierarchy(response.data));
    });
  }, []);

  return (
    <>
      <Title title="Organigrama" withReturnButton />
      {orgData && (
        <div className="card overflow-x-auto">
          <OrganizationChart
            className="w-100"
            value={orgData}
            nodeTemplate={nodeTemplate}
          />
        </div>
      )}
    </>
  );
};

export default OrgChart;
