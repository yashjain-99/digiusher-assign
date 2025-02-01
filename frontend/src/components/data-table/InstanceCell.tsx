import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";

type Instance = {
  id: string;
  unit: string;
  price_per_unit: number;
  instance_type: string;
  location: string;
};

type InstanceRow = {
  vcpu: number;
  memory: number;
  instances: Instance[];
};

const NUMBER_OF_INSTANCES = 3;

const InstanceCell = ({ row }: { row: Row<InstanceRow> }) => {
  const instances = row.getValue("instances") as Instance[];
  const [showAll, setShowAll] = useState(false);

  if (instances) {
    return (
      <div>
        {instances
          .slice(0, showAll ? instances.length : NUMBER_OF_INSTANCES)
          .map((instance) => (
            <div key={instance.id} className="space-y-1 my-2">
              <div className="font-medium">
                {instance.instance_type} / {instance.location}
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
