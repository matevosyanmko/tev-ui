import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "react-hook-form";
import { Button } from "../Button/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./Form";
import { Input } from "../Input/Input";

type AgentValues = { displayName: string };

function AgentForm() {
  const form = useForm<AgentValues>({ defaultValues: { displayName: "" } });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => undefined)}
        className="w-80 space-y-6"
      >
        <FormField
          control={form.control}
          name="displayName"
          rules={{ required: "A display name is required." }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input placeholder="Front desk agent" {...field} />
              </FormControl>
              <FormDescription>
                Shown to teammates in the call log.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save agent</Button>
      </form>
    </Form>
  );
}

const meta: Meta<typeof Form> = {
  title: "Primitives/Form",
  component: Form,
  render: () => <AgentForm />,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
