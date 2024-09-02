import { Meta, StoryObj } from "@storybook/react";
import Heading from "./Heading";

const meta: Meta<typeof Heading> = {
  title: "Components/Heading",
  component: Heading,
  argTypes: {
    as: {
      control: { type: "select" },
      options: ["h1", "h2", "h3"],
    },
    color: { control: "color" },
  },
};

export default meta;

type Story = StoryObj<typeof Heading>;

/** Default: Shows the default heading (h1). */
export const Default: Story = {
  args: {
    children: "Default Heading",
  },
};

/** Demonstrate each heading leve  */
export const H1Heading: Story = {
  args: {
    as: "h1",
    children: "H1 Heading",
  },
};

export const H2Heading: Story = {
  args: {
    as: "h2",
    children: "H2 Heading",
  },
};

export const H3Heading: Story = {
  args: {
    as: "h3",
    children: "H3 Heading",
  },
};

/** Shows how to use a custom color */
export const CustomColorHeading: Story = {
  args: {
    as: "h2",
    color: "#007bff",
    children: "Custom Color Heading",
  },
};

/** Demonstrates how the component handles longer text */
export const LongTextHeading: Story = {
  args: {
    as: "h2",
    children:
      "This is a very long heading text to demonstrate how the component handles extended content",
  },
};

/** Shows all heading levels together for comparison */
export const AllHeadings: Story = {
  render: () => (
    <div>
      <Heading as="h1">H1 Heading</Heading>
      <Heading as="h2">H2 Heading</Heading>
      <Heading as="h3">H3 Heading</Heading>
    </div>
  ),
};
