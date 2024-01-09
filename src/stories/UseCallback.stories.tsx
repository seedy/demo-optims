import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import { useCallback, useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: "Optims/useCallback",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Stateful: Story = {
  render: ({ onClick, ...args }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [counter, setCounter] = useState(0);

    const increment = () => {
      onClick?.();
      setCounter((prev) => prev + 1);
    };

    return (
      <div>
        <div>Counter : {counter}</div>
        <Button onClick={increment} {...args}></Button>
      </div>
    );
  },
  args: {
    primary: true,
    label: "Button",
  },
};

export const StatefulCallback: Story = {
  render: ({ onClick, ...args }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [counter, setCounter] = useState(0);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const incrementCallback = useCallback(() => {
      onClick?.();
      setCounter((prev) => prev + 1);
    }, [onClick]);
    return (
      <div>
        <div>Counter : {counter}</div>
        <Button onClick={incrementCallback} {...args}></Button>
      </div>
    );
  },
  args: {
    primary: true,
    label: "Button",
  },
};

export const Stateless: Story = {
  render: ({ onClick, ...args }) => {
    const log = () => {
      onClick?.();
      console.count("click");
    };

    return <Button onClick={log} {...args}></Button>;
  },
  args: {
    primary: true,
    label: "Button",
  },
};

export const StatelessCallback: Story = {
  render: ({ onClick, ...args }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const logCallback = useCallback(() => {
      onClick?.();
      console.count("click");
    }, [onClick]);

    return <Button onClick={logCallback} {...args}></Button>;
  },
  args: {
    primary: true,
    label: "Button",
  },
};
