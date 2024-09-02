import { StoryObj, Meta } from "@storybook/react";
import Button from "./Button"; // Adjust the import path as needed

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    variation: {
      control: { type: "select" },
      options: ["primary", "secondary", "danger"],
    },
    children: {
      control: "text",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

// Default Button
export const Default: Story = {
  args: {
    children: "Default Button",
  },
};

// Size Variations
export const SmallButton: Story = {
  args: {
    size: "small",
    children: "Small Button",
  },
};

export const MediumButton: Story = {
  args: {
    size: "medium",
    children: "Medium Button",
  },
};

export const LargeButton: Story = {
  args: {
    size: "large",
    children: "Large Button",
  },
};

// Color Variations
export const PrimaryButton: Story = {
  args: {
    variation: "primary",
    children: "Primary Button",
  },
};

export const SecondaryButton: Story = {
  args: {
    variation: "secondary",
    children: "Secondary Button",
  },
};

export const DangerButton: Story = {
  args: {
    variation: "danger",
    children: "Danger Button",
  },
};

// Combinations
export const SmallPrimaryButton: Story = {
  args: {
    size: "small",
    variation: "primary",
    children: "Small Primary",
  },
};

export const LargeSecondaryButton: Story = {
  args: {
    size: "large",
    variation: "secondary",
    children: "Large Secondary",
  },
};

// Button with long text
export const LongTextButton: Story = {
  args: {
    children: "This is a button with a very long text to see how it handles overflow",
  },
};

// All Buttons
export const AllButtons: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}
    >
      <Button size="small" variation="primary">
        Small Primary
      </Button>
      <Button size="small" variation="secondary">
        Small Secondary
      </Button>
      <Button size="small" variation="danger">
        Small Danger
      </Button>
      <Button size="medium" variation="primary">
        Medium Primary
      </Button>
      <Button size="medium" variation="secondary">
        Medium Secondary
      </Button>
      <Button size="medium" variation="danger">
        Medium Danger
      </Button>
      <Button size="large" variation="primary">
        Large Primary
      </Button>
      <Button size="large" variation="secondary">
        Large Secondary
      </Button>
      <Button size="large" variation="danger">
        Large Danger
      </Button>
    </div>
  ),
};
