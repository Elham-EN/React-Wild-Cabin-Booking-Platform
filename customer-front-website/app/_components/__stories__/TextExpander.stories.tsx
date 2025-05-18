import type { Meta, StoryObj } from "@storybook/react";
import TextExpander from "../TextExpander";

const meta: Meta<typeof TextExpander> = {
  title: "Components/UI/TextExpander",
  component: TextExpander,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text" }
  }
};

export default meta;
type Story = StoryObj<typeof TextExpander>;

const shortText = "This is a short text that doesn't need expansion.";

const longText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
`;

const realWorldExample = `
The Wild Oasis is a small boutique hotel nestled in the heart of the Italian Dolomites. Our resort features 8 luxurious wooden cabins, each offering panoramic mountain views and premium amenities including private hot tubs, fully-equipped kitchens, and high-speed Wi-Fi. Perfect for nature lovers, our property is surrounded by hiking trails, ski slopes, and pristine alpine lakes. Guests can enjoy farm-to-table dining at our on-site restaurant, relax in our wellness center with a sauna and massage services, or participate in guided outdoor adventures. Our cabins combine rustic charm with modern comfort, featuring sustainable materials, floor-to-ceiling windows, and smart home technology. Ranging from cozy one-bedroom retreats to spacious family units, all accommodations include daily housekeeping, complimentary breakfast baskets of local products, and 24-hour concierge service. The Wild Oasis offers an authentic mountain escape with the perfect balance of adventure and relaxation.
`;

export const Default: Story = {
  args: {
    children: longText,
  },
};

export const ShortText: Story = {
  args: {
    children: shortText,
  },
};

export const RealWorldExample: Story = {
  args: {
    children: realWorldExample,
  },
};

export const WithDarkBackground: Story = {
  args: {
    children: realWorldExample,
  },
  decorators: [
    (Story) => (
      <div className="bg-primary-950 p-6 rounded-lg max-w-2xl text-white">
        <Story />
      </div>
    ),
  ],
};

export const InContentCard: Story = {
  args: {
    children: realWorldExample,
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-primary-800 mb-3">Cabin Description</h2>
          <p className="text-primary-600 mb-4">
            <Story />
          </p>
          <div className="flex justify-end">
            <button className="bg-accent-400 text-white py-2 px-4 rounded-md hover:bg-accent-500 transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    ),
  ],
};
