import type { Meta, StoryObj } from "@storybook/react-vite";

import { ErrorBoundary } from "./ErrorBoundary";

function Boom({ message }: { message: string }): never {
  throw new Error(message);
}

const meta = {
  title: "Brand/ErrorBoundary",
  component: ErrorBoundary,
  parameters: {
    // The stories below throw on purpose; the boundary catching them is the point.
    docs: { description: { component: "Renders its fallback panel when a child throws during render." } },
  },
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Nothing threw, so the boundary is invisible and just renders its children. */
export const Passthrough: Story = {
  render: () => (
    <ErrorBoundary>
      <p className="text-sm">The dashboard rendered fine.</p>
    </ErrorBoundary>
  ),
};

export const Caught: Story = {
  render: () => (
    <ErrorBoundary>
      <Boom message="Cannot read properties of undefined (reading 'agentName')" />
    </ErrorBoundary>
  ),
};

/** A thrown Error with no message: the detail block is dropped rather than left blank. */
export const NoMessage: Story = {
  render: () => (
    <ErrorBoundary>
      <Boom message="" />
    </ErrorBoundary>
  ),
};

export const Translated: Story = {
  render: () => (
    <ErrorBoundary
      labels={{
        title: "Что-то пошло не так",
        description: "На этой странице произошла ошибка. Остальное приложение работает.",
        retry: "Повторить",
        reload: "Перезагрузить",
      }}
    >
      <Boom message="Request failed with status 500" />
    </ErrorBoundary>
  ),
};

/** `fallback` replaces the panel entirely, keeping only the catching behaviour. */
export const CustomFallback: Story = {
  render: () => (
    <ErrorBoundary
      fallback={(error, reset) => (
        <div className="rounded-xl border border-destructive/40 p-4 text-sm">
          <p className="font-medium text-destructive">This widget failed: {error.message}</p>
          <button type="button" onClick={reset} className="mt-2 underline">
            Try again
          </button>
        </div>
      )}
    >
      <Boom message="chart series was empty" />
    </ErrorBoundary>
  ),
};
