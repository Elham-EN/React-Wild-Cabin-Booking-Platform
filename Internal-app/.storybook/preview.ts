import type { Preview } from "@storybook/react";
import GlobalStyles from "../src/styles/GlobalStyles";

import { withThemeFromJSXProvider } from "@storybook/addon-themes";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    withThemeFromJSXProvider({
      defaultTheme: "light",
      GlobalStyles,
    }),
  ],
};

export default preview;
