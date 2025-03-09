import { Clock } from "lucide-react";
import React from "react";

export const LastUpdated = ({ latestUpdate }) => (
  <div className="flex items-center justify-end mb-4 text-sm text-gray-600">
    <Clock className="mr-1 h-4 w-4" />
    Last updated: {latestUpdate}
  </div>
);
