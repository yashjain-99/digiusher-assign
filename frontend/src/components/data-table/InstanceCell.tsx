import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { useSelectedInstancesContext } from "@/context/SelectedInstancesProvider";

// Ensure that Instance is properly defined or imported
type Instance = {
  id: string;
  instance_type: string;
  location: string;
  price_per_unit: number;
  unit: string;
};

type InstanceRow = {
  vcpu: number;
  memory: number;
  instances: Instance[];
};

const NUMBER_OF_INSTANCES = 3;

const InstanceCell = ({ row }: { row: Row<InstanceRow> }) => {
  const instances = row.getValue("instances") as Instance[];
  const vcpu = row.getValue("vcpu") as number;
  const memory = row.getValue("memory") as number;
  const [showAll, setShowAll] = useState(false);
  const { setSelectedInstances } = useSelectedInstancesContext();

  const handleCheckChange = (
    checkedState: string | boolean,
    instance: Instance
  ) => {
    setSelectedInstances((prev) => {
      if (checkedState) {
        return [...prev, { ...instance, vcpu, memory }];
      } else {
        return prev.filter((inst) => inst.id !== instance.id);
      }
    });
  };

  if (instances) {
    return (
      <div>
        {instances
          .slice(0, showAll ? instances.length : NUMBER_OF_INSTANCES)
          .map((instance) => (
            <div key={instance.id} className="space-y-1 my-2">
              <div className="flex items-center gap-2">
                <label className="font-medium" htmlFor={instance.id}>
                  {instance.instance_type} / {instance.location}
                </label>
                <Checkbox
                  onCheckedChange={(checkedState) =>
                    handleCheckChange(checkedState, instance)
                  }
                  id={instance.id}
                />
              </div>
              <div>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(instance.price_per_unit)}{" "}
                per {instance.unit.toLowerCase()}
              </div>
            </div>
          ))}
        {instances.length > NUMBER_OF_INSTANCES && (
          <Button
            variant="link"
            size="sm"
            onClick={() => setShowAll((prev) => !prev)}
            className="mt-2 p-0"
          >
            {showAll ? "Show Less" : "Show More"}
          </Button>
        )}
      </div>
    );
  }
  return null; // If no instances, return nothing
};

export default InstanceCell;
