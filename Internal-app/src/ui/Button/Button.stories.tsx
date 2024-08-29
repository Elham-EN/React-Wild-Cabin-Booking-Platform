import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import { FaSearch } from "react-icons/fa";

const ButtonWrapper: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { $color?: string }
> = ({ children, $color, ...props }) => {
  return (
    <Button $color={$color} {...props}>
      {children}
    </Button>
  );
};

// Defines a meta object that configures the component for Storybook.
const meta: Meta<typeof Button> = {
  component: ButtonWrapper,
  argTypes: {
    children: { control: "text" },
    $color: { control: "color" },
    onClick: { action: "clicked" },
  },
};

export default meta;

// It exports several stories:
type Story = StoryObj<typeof ButtonWrapper>;

// Each story uses the args property to set the props for the Button component in
// that particular story.
export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const CustomColor: Story = {
  args: {
    children: "Custom Color Button",
    $color: "#FF5733",
  },
};

/**
 * Different Sizes
 */
export const SmallButton: Story = {
  args: {
    children: "Small Button",
    style: {
      fontSize: "0.8em",
      padding: "15px 30px",
    },
  },
};

export const LargeButton: Story = {
  args: {
    children: "Large Button",
    style: { fontSize: "2em", padding: "15px 30px" },
  },
};

/**
 * Different States
 */

export const DisabledButton: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

export const LoadingButton: Story = {
  args: {
    children: "Loading...",
    disabled: true,
    style: { opacity: 0.7 },
  },
};

/**
 * With Icon:
 */

export const ButtonWithIcon: Story = {
  args: {
    children: (
      <>
        <FaSearch style={{ marginRight: "5px" }} /> Search
      </>
    ),
  },
};

/**
 * Different Variants:
 */

export const OutlineButton: Story = {
  args: {
    children: "Outline Button",
    style: {
      background: "transparent",
      borderColor: "var(--color-brand-500)",
      color: "var(--color-brand-500)",
    },
  },
};

export const TextButton: Story = {
  args: {
    children: "Text Button",
    style: {
      background: "none",
      border: "none",
      color: "var(--color-brand-500)",
      padding: "0",
    },
  },
};

export const FullWidthButton: Story = {
  args: {
    children: "Full Width Button",
    style: { width: "100%" },
  },
};

export const WithClickAction: Story = {
  args: {
    children: "Click for Alert",
    onClick: () => alert("Button clicked!"),
  },
};
