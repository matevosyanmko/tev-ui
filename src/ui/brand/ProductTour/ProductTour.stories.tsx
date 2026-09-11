import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductTour } from "./ProductTour";
import { TourScrim } from "./TourScrim";
import { TourSpotlight } from "./TourSpotlight";
import { TourStepCard } from "./TourStepCard";
import { TourStepNav } from "./TourStepNav";

const STEPS = [
  {
    title: "Your filter strip",
    description:
      "Every board reads from these filters. Set a channel and a date range once and the whole dashboard follows.",
  },
  {
    title: "Interaction search",
    description:
      "Find any conversation by agent, sentiment or transcript text — voice, webchat and email in one place.",
  },
  {
    title: "Alerts",
    description: "Anything that crosses a threshold shows up here and on the bell.",
  },
];

/** Measures a real element so the scrim, ring and card have something to point at. */
function useAnchorRect(ref: React.RefObject<HTMLElement | null>) {
  const [rect, setRect] = React.useState<DOMRect | null>(null);
  React.useLayoutEffect(() => {
    const measure = () => setRect(ref.current?.getBoundingClientRect() ?? null);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [ref]);
  return rect;
}

const meta = {
  title: "Brand/ProductTour",
  component: ProductTour,
  // Required props, supplied once here; every story below renders its own tree.
  args: {
    step: 0,
    total: STEPS.length,
    rect: null,
    title: STEPS[0].title,
    description: STEPS[0].description,
    onNext: () => {},
    onSkip: () => {},
  },
} satisfies Meta<typeof ProductTour>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The whole overlay, driven step by step over a real anchor element. */
export const Walkthrough: Story = {
  render: function WalkthroughStory() {
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const rect = useAnchorRect(anchorRef);
    const [step, setStep] = React.useState(0);
    const [done, setDone] = React.useState(false);

    return (
      <div className="h-[420px] w-[640px] rounded-2xl border p-6">
        <div
          ref={anchorRef}
          className="w-fit rounded-full bg-brand-green px-4 py-2 text-[11px] font-bold text-brand-green-foreground"
        >
          All channels
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          {done ? "Tour finished." : "The pill above is the highlighted anchor."}
        </p>
        {done ? (
          <button
            type="button"
            className="mt-2 text-sm underline"
            onClick={() => {
              setStep(0);
              setDone(false);
            }}
          >
            Restart
          </button>
        ) : (
          <ProductTour
            step={step}
            total={STEPS.length}
            rect={rect}
            title={STEPS[step].title}
            description={STEPS[step].description}
            onNext={() => (step === STEPS.length - 1 ? setDone(true) : setStep(step + 1))}
            onBack={() => setStep((current) => Math.max(0, current - 1))}
            onSkip={() => setDone(true)}
          />
        )}
      </div>
    );
  },
};

/**
 * The degraded case: a step whose anchor never mounted. The whole screen dims,
 * no ring is drawn, and the card centers — so the user can still finish.
 */
export const WithoutAnchor: Story = {
  render: () => (
    <div className="h-[420px] w-[640px] rounded-2xl border p-6">
      <ProductTour
        step={2}
        total={3}
        rect={null}
        title={STEPS[2].title}
        description={STEPS[2].description}
        onNext={() => {}}
        onBack={() => {}}
        onSkip={() => {}}
      />
    </div>
  ),
};

/** The last step swaps the primary action's label for "finish". */
export const LastStep: Story = {
  render: () => (
    <div className="h-[420px] w-[640px] rounded-2xl border p-6">
      <ProductTour
        step={2}
        total={3}
        rect={null}
        title={STEPS[2].title}
        description={STEPS[2].description}
        onNext={() => {}}
        onBack={() => {}}
        onSkip={() => {}}
        labels={{
          stepLabel: "Шаг",
          skip: "пропустить",
          back: "назад",
          next: "далее",
          finish: "готово",
        }}
      />
    </div>
  ),
};

/**
 * The card with the copy the app actually ships in Armenian — the longest of
 * the three locales, and the case the fixed card geometry has to survive: a
 * title that no longer fits one line and a description roughly twice the
 * English length.
 */
export const TranslatedArmenian: Story = {
  render: function TranslatedArmenianStory() {
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const rect = useAnchorRect(anchorRef);
    return (
      <div className="h-[420px] w-[640px] rounded-2xl border p-6">
        <div
          ref={anchorRef}
          className="w-fit rounded-full bg-brand-green px-4 py-2 text-[11px] font-bold text-brand-green-foreground"
        >
          Բոլոր ալիքները
        </div>
        <ProductTour
          step={1}
          total={5}
          rect={rect}
          title="Բացեք փոխազդեցության մանրամասները"
          description="Սեղմեք ցանկացած փոխազդեցության վրա՝ տեսնելու զանգի ամբողջական մանրամասները, ամփոփումը, տեքստագրումը, ձայնագրությունը, տրամադրությունը և հարակից պատկերացումները։"
          onNext={() => {}}
          onBack={() => {}}
          onSkip={() => {}}
          labels={{
            stepLabel: "Քայլ",
            skip: "բաց թողնել ուսուցումը",
            back: "Հետ",
            next: "Հաջորդը",
          }}
        />
      </div>
    );
  },
};

/** The same step in Russian, where the skip link is the widest of the three. */
export const TranslatedRussian: Story = {
  render: function TranslatedRussianStory() {
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const rect = useAnchorRect(anchorRef);
    return (
      <div className="h-[420px] w-[640px] rounded-2xl border p-6">
        <div
          ref={anchorRef}
          className="w-fit rounded-full bg-brand-green px-4 py-2 text-[11px] font-bold text-brand-green-foreground"
        >
          Все каналы
        </div>
        <ProductTour
          step={1}
          total={5}
          rect={rect}
          title="Отслеживайте эффективность звонков одним взглядом"
          description="Эти виджеты показывают ключевые показатели активности звонков, качества, тональности и результатов процессов."
          onNext={() => {}}
          onBack={() => {}}
          onSkip={() => {}}
          labels={{
            stepLabel: "Шаг",
            skip: "пропустить обучение",
            back: "Назад",
            next: "Далее",
          }}
        />
      </div>
    );
  },
};

/**
 * An anchor low on the page, carrying the long Armenian copy — the case the
 * card's placement has to measure rather than assume. A card sized for English
 * is ~210px and fits below an anchor this low; the Armenian one is ~325px and
 * has to be placed above it instead, with its footer still on screen.
 */
export const NearTheFold: Story = {
  render: function NearTheFoldStory() {
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const rect = useAnchorRect(anchorRef);
    return (
      <div className="flex h-[100dvh] w-full flex-col justify-end p-6">
        <div
          ref={anchorRef}
          className="w-fit rounded-full bg-brand-green px-4 py-2 text-[11px] font-bold text-brand-green-foreground"
        >
          Վերջին փոխազդեցությունը
        </div>
        <ProductTour
          step={4}
          total={5}
          rect={rect}
          title="Բացեք փոխազդեցության մանրամասները"
          description="Սեղմեք ցանկացած փոխազդեցության վրա՝ տեսնելու զանգի ամբողջական մանրամասները, ամփոփումը, տեքստագրումը, ձայնագրությունը, տրամադրությունը և հարակից պատկերացումները։"
          onNext={() => {}}
          onBack={() => {}}
          onSkip={() => {}}
          labels={{
            stepLabel: "Քայլ",
            skip: "բաց թողնել ուսուցումը",
            back: "Հետ",
            finish: "Ավարտել շրջայցը",
          }}
        />
      </div>
    );
  },
};

/** The card on its own, with no scrim behind it — the parts are exported separately. */
export const StepCardOnly: Story = {
  render: () => (
    <div className="relative h-[300px] w-[520px]">
      <TourStepCard
        step={1}
        total={3}
        rect={null}
        title={STEPS[1].title}
        description={STEPS[1].description}
      >
        <TourStepNav onSkip={() => {}} onBack={() => {}} onNext={() => {}} />
      </TourStepCard>
    </div>
  ),
};

/** Scrim and ring with no card, to see the hole the four panels leave. */
export const ScrimAndSpotlight: Story = {
  render: function ScrimAndSpotlightStory() {
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const rect = useAnchorRect(anchorRef);
    return (
      <div className="h-[420px] w-[640px] rounded-2xl border p-6">
        <div ref={anchorRef} className="w-fit rounded-xl bg-card p-4 text-sm shadow">
          The element being highlighted
        </div>
        <TourScrim rect={rect} />
        <TourSpotlight rect={rect} />
      </div>
    );
  },
};
