import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { UserIcon } from "@heroicons/react/24/solid";

// Define our props type based on the actual component's props
interface MockCabinCardProps {
  cabin: {
    id: string;
    name: string;
    maxCapacity: number;
    regularPrice: number;
    discount: number;
    image: string;
    description: string;
  };
}

/**
 * Mock cabin data for the Storybook stories
 */
const mockCabins = {
  standard: {
    id: "1",
    name: "Serenity",
    maxCapacity: 2,
    regularPrice: 250,
    discount: 0,
    image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1976&auto=format&fit=crop",
    description: "A cozy cabin for two with stunning mountain views."
  },
  discounted: {
    id: "2",
    name: "Mountain View",
    maxCapacity: 4,
    regularPrice: 350,
    discount: 50,
    image: "https://images.unsplash.com/photo-1551927336-09d50efd69cd?q=80&w=2029&auto=format&fit=crop",
    description: "Spacious cabin perfect for small families or groups of friends."
  },
  luxury: {
    id: "3",
    name: "Alpine Lodge",
    maxCapacity: 6,
    regularPrice: 500,
    discount: 75,
    image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?q=80&w=2070&auto=format&fit=crop",
    description: "Our premium cabin with all amenities for a luxury mountain retreat."
  },
  budget: {
    id: "4",
    name: "Forest Hideaway",
    maxCapacity: 2,
    regularPrice: 150,
    discount: 25,
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop",
    description: "An affordable getaway surrounded by nature."
  }
};

/**
 * A mock version of the CabinCard component for Storybook
 * This avoids Next.js Image and Link compatibility issues in Storybook
 */
const MockCabinCard = ({ cabin }: MockCabinCardProps) => {
  return (
    <div className="flex flex-col sm:flex-row border border-primary-800 rounded-sm overflow-hidden shadow-md bg-white">
      {/* Image container - full width on mobile, left column on tablet/desktop */}
      <div className="relative w-full sm:w-2/5 h-56 sm:h-auto">
        <img
          src={cabin.image}
          alt={cabin.name}
          className="object-cover w-full h-full border-b sm:border-b-0 sm:border-r border-primary-800"
        />
      </div>
      
      {/* Content container - grows to fill remaining space */}
      <div className="flex flex-col justify-between w-full sm:w-3/5">
        {/* Top section with cabin info */}
        <div className="pt-4 sm:pt-5 pb-3 sm:pb-4 px-4 sm:px-7 bg-primary-950 text-white">
          <h3 className="text-accent-500 font-semibold text-xl sm:text-2xl mb-2 sm:mb-3">
            Cabin {cabin.name}
          </h3>
          
          <div className="flex gap-2 sm:gap-3 items-center mb-2">
            <UserIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
            <p className="text-base sm:text-lg text-primary-200">
              For up to <span className="font-bold">{cabin.maxCapacity}</span>{" "}
              guests
            </p>
          </div>
          
          {/* Price information - flex layout for alignment */}
          <p className="flex gap-2 sm:gap-3 justify-end items-baseline text-white">
            {cabin.discount > 0 ? (
              <>
                <span className="text-2xl sm:text-3xl font-[350] text-white">
                  ${cabin.regularPrice - cabin.discount}
                </span>
                <span className="line-through font-semibold text-primary-400 text-sm sm:text-base">
                  ${cabin.regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl sm:text-3xl font-[350] text-white">${cabin.regularPrice}</span>
            )}
            <span className="text-primary-200 text-sm sm:text-base">/ night</span>
          </p>
        </div>
        
        {/* Bottom section with button - full width on mobile */}
        <div className="bg-primary-950 border-t border-t-primary-800 text-right">
          <a
            href={`#/cabins/${cabin.id}`} // Using hash link for Storybook
            className="w-full sm:w-auto block sm:inline-block text-center sm:text-right py-3 sm:py-4 px-4 sm:px-6
              sm:border-l sm:border-primary-800 hover:bg-accent-600 transition-all hover:text-primary-900 text-white"
            aria-label={`View details and make reservation for Cabin ${cabin.name}`}
          >
            Details & reservation &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

/**
 * CabinCard component displays a cabin with its image, details, and pricing information
 * in a responsive card format. It adapts to different screen sizes, offering
 * a stacked layout on mobile and a side-by-side layout on larger screens.
 */
const meta: Meta<typeof MockCabinCard> = {
  title: "Components/Cabins/CabinCard",
  component: MockCabinCard,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#333333' },
      ],
    },
    viewport: {
      viewports: {
        mobile1: {
          name: 'Small mobile',
          styles: {
            width: '320px',
            height: '568px',
          },
        },
        mobile2: {
          name: 'Large mobile',
          styles: {
            width: '414px',
            height: '896px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '1024px',
          },
        },
      },
    },
    docs: {
      description: {
        component: `
          A responsive card component displaying a cabin with image, details, capacity, and pricing information.
          
          ## Features
          - Responsive layout that adapts from mobile to desktop
          - Image displayed prominently
          - Cabin name and capacity information
          - Price information with optional discount display
          - Call-to-action button for details and reservation
          
          ## Mobile Design
          On mobile screens (< 640px):
          - Stacked layout with image on top and content below
          - Full-width button for better touch targets
          - Compact spacing and smaller text sizes
          - Centered button text for better visual balance
          
          ## Desktop Design  
          On larger screens (≥ 640px):
          - Side-by-side layout with image on left and content on right
          - Larger text sizes and more spacious layout
          - Right-aligned button that only takes necessary width
          
          ## Usage
          The CabinCard component is typically used in cabin listing pages to display
          available cabins in a grid or list layout.
        `
      }
    },
  },
  tags: ["autodocs"],
  // Decorator to constrain the width and provide appropriate background
  decorators: [
    (Story) => (
      <div className="max-w-2xl mx-auto p-4 bg-gray-100">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MockCabinCard>;

/**
 * Standard cabin with no discount
 */
export const Standard: Story = {
  args: {
    cabin: mockCabins.standard,
  },
};

/**
 * Cabin with a discount applied
 */
export const WithDiscount: Story = {
  args: {
    cabin: mockCabins.discounted,
  },
};

/**
 * Mobile view (small phone) - 320px width
 */
export const MobileSmall: Story = {
  args: {
    cabin: mockCabins.standard,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full p-2 bg-gray-100">
        <Story />
      </div>
    ),
  ],
};

/**
 * Mobile view (large phone) - 414px width
 */
export const MobileLarge: Story = {
  args: {
    cabin: mockCabins.discounted,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full p-3 bg-gray-100">
        <Story />
      </div>
    ),
  ],
};

/**
 * Tablet view - 768px width
 */
export const Tablet: Story = {
  args: {
    cabin: mockCabins.luxury,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg mx-auto p-4 bg-gray-100">
        <Story />
      </div>
    ),
  ],
};

/**
 * Desktop view - 1200px width
 */
export const Desktop: Story = {
  args: {
    cabin: mockCabins.budget,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl mx-auto p-4 bg-gray-100">
        <Story />
      </div>
    ),
  ],
};

/**
 * Mobile layout with a narrow container - demonstrates the stacked layout
 * This is a controlled layout, not using viewport settings
 */
export const MobileLayout: Story = {
  args: {
    cabin: mockCabins.standard,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[320px] mx-auto p-2 bg-gray-100">
        <Story />
      </div>
    ),
  ],
};

/**
 * Tablet/Desktop layout with a wider container - demonstrates the side-by-side layout
 * This is a controlled layout, not using viewport settings
 */
export const DesktopLayout: Story = {
  args: {
    cabin: mockCabins.discounted,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[800px] mx-auto p-4 bg-gray-100">
        <Story />
      </div>
    ),
  ],
};

/**
 * Showing multiple cabin cards in a grid layout, responsive across viewports
 */
export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MockCabinCard cabin={mockCabins.standard} />
      <MockCabinCard cabin={mockCabins.discounted} />
      <MockCabinCard cabin={mockCabins.luxury} />
      <MockCabinCard cabin={mockCabins.budget} />
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="p-4 bg-gray-100">
        <Story />
      </div>
    ),
  ],
};

/**
 * Mobile grid layout - single column
 */
export const MobileGridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4">
      <MockCabinCard cabin={mockCabins.standard} />
      <MockCabinCard cabin={mockCabins.discounted} />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  decorators: [
    (Story) => (
      <div className="p-3 bg-gray-100">
        <Story />
      </div>
    ),
  ],
};

/**
 * Dark theme variation
 */
export const DarkTheme: Story = {
  args: {
    cabin: mockCabins.luxury,
  },
  decorators: [
    (Story) => (
      <div className="p-8 bg-gray-900">
        <Story />
      </div>
    ),
  ],
};
