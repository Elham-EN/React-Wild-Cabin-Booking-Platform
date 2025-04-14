import React from "react";

interface EmptyProps {
  resourceName: string;
}

function Empty({ resourceName }: EmptyProps): React.ReactElement {
  return <p>No {resourceName} could be found.</p>;
}

export default Empty;
