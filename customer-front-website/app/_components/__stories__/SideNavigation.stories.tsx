import type { Meta, StoryObj } from "@storybook/react";
import SideNavigation from "../SideNavigation";

const meta: Meta<typeof SideNavigation> = {
  title: "Components/Navigation/SideNavigation",
  component: SideNavigation,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/account", // Default - simulate being on the home page
      }
    }
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: "400px", width: "250px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SideNavigation>;

export const Default: Story = {};

export const DarkTheme: Story = {
  decorators: [
    (Story) => (
      <div style={{ height: "400px", width: "250px" }} className="bg-primary-950">
        <Story />
      </div>
    ),
  ],
};

export const BluishTheme: Story = {
  decorators: [
    (Story) => (
      <div style={{ height: "400px", width: "250px" }} className="bg-blue-950">
        <Story />
      </div>
    ),
  ],
};

export const GreenishTheme: Story = {
  decorators: [
    (Story) => (
      <div style={{ height: "400px", width: "250px" }} className="bg-emerald-900">
        <Story />
      </div>
    ),
  ],
};

export const WarmTheme: Story = {
  decorators: [
    (Story) => (
      <div style={{ height: "400px", width: "250px" }} className="bg-amber-900">
        <Story />
      </div>
    ),
  ],
};

export const HighlightedReservations: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/account/reservations", // Simulate being on the reservations page
      }
    }
  },
};

export const HighlightedProfile: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/account/profile", // Simulate being on the profile page
      }
    }
  },
};

export const WithCustomWidth: Story = {
  decorators: [
    (Story) => (
      <div style={{ height: "400px", width: "300px" }} className="bg-primary-900">
        <Story />
      </div>
    ),
  ],
};

export const Mobile: Story = {
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", width: "100%" }} className="max-w-xs mx-auto bg-primary-950">
        <div className="p-4 border-b border-primary-800">
          <h3 className="text-primary-100 font-medium">Mobile Menu</h3>
        </div>
        <Story />
      </div>
    ),
  ],
};