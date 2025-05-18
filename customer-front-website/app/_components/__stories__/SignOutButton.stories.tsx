import type { Meta, StoryObj } from "@storybook/react";
import SignOutButton from "../SignOutButton";

const meta: Meta<typeof SignOutButton> = {
  title: "Components/Navigation/SignOutButton",
  component: SignOutButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SignOutButton>;

export const Default: Story = {};

export const WithDarkBackground: Story = {
  decorators: [
    (Story) => (
      <div className="bg-primary-950 p-4 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export const InMobileNavigation: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-xs bg-primary-950 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-primary-800">
          <h3 className="text-primary-100 font-medium">Navigation</h3>
        </div>
        <div className="py-2">
          {/* Simulate other nav items before */}
          <div className="py-3 px-5 text-primary-200 border-l-2 border-transparent">
            Dashboard
          </div>
          <div className="py-3 px-5 text-primary-200 border-l-2 border-accent-400 bg-primary-900">
            Cabins
          </div>
          <div className="py-3 px-5 text-primary-200 border-l-2 border-transparent">
            Reservations
          </div>
          {/* The sign out button */}
          <div className="mt-8">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

// Showing how it might look with a loading state
// (even though the current component doesn't support this)
export const Disabled: Story = {
  decorators: [
    (Story) => (
      <div className="opacity-50 pointer-events-none">
        <Story />
      </div>
    ),
  ],
};
