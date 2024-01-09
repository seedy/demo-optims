import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import { useEffect, useRef } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: "Optims/useEffect",
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

/**
 * I am a side effect, in real life I could be :
 * - a fetch call
 * - a browser API call
 * - anything heavy
 */
const sideEffect = (value: string) => {
  console.log("side effect with : ", value);
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const NeedsOptim: Story = {
  render: ({ label }) => {
    /**
     * side effect is triggered every time label changes
     */
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      sideEffect(label);
    }, [label]);

    return (
      <div>
        <div>Change label value will trigger side effect</div>
        {label}
      </div>
    );
  },
  args: {
    primary: true,
    label: "label",
  },
};

export const Optimized: Story = {
  render: ({ label }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const labelRef = useRef(label);

    /**
     * side effect is triggered only with first label value
     */
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      sideEffect(labelRef.current);
    }, [labelRef]);

    return (
      <div>
        <div>Change label value will not trigger side effect</div>
        {label}
      </div>
    );
  },
  args: {
    primary: true,
    label: "label",
  },
};
