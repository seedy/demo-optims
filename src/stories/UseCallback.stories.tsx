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
    /**
     * Lorsque useCallback n'est pas utilisé,
     * La fonction increment est recalculée à chaque render et tout le return est recréé
     */

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
    /**
     * Lorsqu'on wrap la fonction avec un useCallBack,
     * La fonction n'est pas recalculée à chaque render, tant que les dépendances ne changent pas
     * Le bouton est rerendue forcément à chaque fois
     * Par défaut osef d'opti => Si on fait face a des rerender qui posent problème qu'on va optimiser
     * Le plus gros défi : D'arriver à définir correctement une action lourde à optimiser
     * Un cas ou le useEffect de mon composant call une fonction recu en props
     */
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
  /**
   * Comme pas de state, pas de re-render
   * On peut donc se permettre de ne pas utiliser useCallback
   * Fonction jamais re-render
   * Le composant Stateless n'est jamais rerender, donc fonction déclarée qu'une seule fois
   */
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
  /**
   *
   * Pas de difference entre stateless et statelessCallback
   */
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
