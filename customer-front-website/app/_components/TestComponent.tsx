import React from "react";

interface TestComponentProps {
  title?: string;
  description?: string;
  isActive?: boolean;
}

/**
 * A test component that demonstrates a typical React component structure
 * with TypeScript props and conditional rendering
 */
function TestComponent({
  title = "Default Title",
  description = "This is a test component for demonstration purposes",
  isActive = true,
}: TestComponentProps) {
  return (
    <div className={`p-6 rounded-lg shadow-md ${isActive ? "bg-accent-100" : "bg-gray-100"}`}>
      <h2 className="text-2xl font-medium text-accent-400 mb-3">{title}</h2>
      <p className="text-primary-200">{description}</p>
      
      {isActive && (
        <div className="mt-4 p-3 bg-accent-50 rounded border border-accent-200">
          <p className="text-sm text-accent-600">
            This content is only visible when the component is active
          </p>
        </div>
      )}
      
      <button 
        className="mt-4 px-4 py-2 bg-accent-400 text-white rounded-md hover:bg-accent-500 transition-colors"
        onClick={() => console.log("TestComponent button clicked!")}
      >
        Test Action
      </button>
    </div>
  );
}

export default TestComponent;