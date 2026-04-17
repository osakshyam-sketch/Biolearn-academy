import {
  AnimatedEntrance,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedEntrance";
import { QuizEngine } from "@/components/QuizEngine";
import { SectionHeader } from "@/components/SectionHeader";
import type { QuizQuestion } from "@/types/biology";
import { FlaskConical } from "lucide-react";

// ── Bioreactor SVG diagram ────────────────────────────────────────────────────

const BUBBLES = [
  { id: "b1", cx: 92, startY: 290, delay: 0 },
  { id: "b2", cx: 115, startY: 310, delay: 0.7 },
  { id: "b3", cx: 138, startY: 295, delay: 1.4 },
  { id: "b4", cx: 105, startY: 320, delay: 2.1 },
  { id: "b5", cx: 125, startY: 305, delay: 0.4 },
  { id: "b6", cx: 80, startY: 315, delay: 1.8 },
  { id: "b7", cx: 150, startY: 285, delay: 2.8 },
  { id: "b8", cx: 98, startY: 300, delay: 3.3 },
];

function BioreactorDiagram() {
  return (
    <div
      className="flex flex-col items-center gap-4"
      aria-label="Animated bioreactor diagram showing a stirred-tank vessel with rising bubbles, rotating stirrer, nutrient inlet, product outlet, and CO2 vent. Temperature and pH gauges are labeled on the vessel."
      role="img"
    >
      <style>{`
        @keyframes bubble-rise {
          0%   { transform: translateY(0px); opacity: 0.8; }
          80%  { opacity: 0.6; }
          100% { transform: translateY(-170px); opacity: 0; }
        }
        @keyframes stirrer-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes gauge-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.6; }
        }
        @keyframes foam-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-3px); }
        }
        .bubble-anim { animation: bubble-rise 3s ease-in infinite; }
        .stirrer-anim { transform-origin: 115px 300px; animation: stirrer-spin 4s linear infinite; }
        .gauge-anim { animation: gauge-pulse 2s ease-in-out infinite; }
        .foam-anim { animation: foam-float 2.5s ease-in-out infinite; }
      `}</style>

      <svg
        viewBox="0 0 340 460"
        width="340"
        height="460"
        aria-hidden="true"
        style={{ filter: "drop-shadow(0 0 14px oklch(0.52 0.15 175 / 0.30))" }}
      >
        <defs>
          <linearGradient id="vesselGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="oklch(0.65 0.06 210)" />
            <stop offset="40%" stopColor="oklch(0.75 0.05 210)" />
            <stop offset="70%" stopColor="oklch(0.70 0.05 215)" />
            <stop offset="100%" stopColor="oklch(0.60 0.05 220)" />
          </linearGradient>
          <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              stopColor="oklch(0.65 0.16 175)"
              stopOpacity="0.85"
            />
            <stop
              offset="100%"
              stopColor="oklch(0.50 0.14 175)"
              stopOpacity="0.90"
            />
          </linearGradient>
          <linearGradient id="foamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              stopColor="oklch(0.88 0.10 175)"
              stopOpacity="0.7"
            />
            <stop
              offset="100%"
              stopColor="oklch(0.72 0.13 175)"
              stopOpacity="0.5"
            />
          </linearGradient>
          <clipPath id="vesselClip">
            <path d="M58,90 Q58,80 68,78 L162,78 Q172,78 172,90 L172,380 Q172,400 115,400 Q58,400 58,380 Z" />
          </clipPath>
        </defs>

        <path
          d="M58,90 Q58,80 68,78 L162,78 Q172,78 172,90 L172,380 Q172,400 115,400 Q58,400 58,380 Z"
          fill="url(#vesselGrad)"
          stroke="oklch(0.72 0.05 210)"
          strokeWidth="2"
        />
        <path
          d="M60,145 L170,145 L170,378 Q170,397 115,397 Q60,397 60,378 Z"
          fill="url(#liquidGrad)"
          clipPath="url(#vesselClip)"
        />
        <ellipse
          className="foam-anim"
          cx="115"
          cy="148"
          rx="52"
          ry="8"
          fill="url(#foamGrad)"
        />

        <line
          x1="58"
          y1="120"
          x2="172"
          y2="120"
          stroke="oklch(0.70 0.05 210)"
          strokeWidth="1.5"
          strokeDasharray="4,4"
          opacity="0.5"
        />
        <line
          x1="58"
          y1="350"
          x2="172"
          y2="350"
          stroke="oklch(0.70 0.05 210)"
          strokeWidth="1.5"
          strokeDasharray="4,4"
          opacity="0.5"
        />

        {BUBBLES.map((b) => (
          <circle
            key={b.id}
            className="bubble-anim"
            cx={b.cx}
            cy={b.startY}
            r={3.5 + (Number(b.id.replace("b", "")) % 3)}
            fill="oklch(0.88 0.08 175)"
            opacity="0.75"
            style={{
              animationDelay: `${b.delay}s`,
              animationDuration: `${2.4 + (b.delay % 1.5)}s`,
            }}
          />
        ))}

        <rect
          x="112"
          y="78"
          width="6"
          height="230"
          fill="oklch(0.65 0.05 210)"
          rx="2"
        />
        <g className="stirrer-anim">
          <rect
            x="68"
            y="293"
            width="38"
            height="9"
            rx="3"
            fill="oklch(0.70 0.06 210)"
            stroke="oklch(0.78 0.05 210)"
            strokeWidth="1"
          />
          <rect
            x="122"
            y="293"
            width="38"
            height="9"
            rx="3"
            fill="oklch(0.70 0.06 210)"
            stroke="oklch(0.78 0.05 210)"
            strokeWidth="1"
          />
          <rect
            x="110"
            y="264"
            width="9"
            height="38"
            rx="3"
            fill="oklch(0.70 0.06 210)"
            stroke="oklch(0.78 0.05 210)"
            strokeWidth="1"
          />
          <rect
            x="110"
            y="303"
            width="9"
            height="38"
            rx="3"
            fill="oklch(0.70 0.06 210)"
            stroke="oklch(0.78 0.05 210)"
            strokeWidth="1"
          />
          <circle
            cx="115"
            cy="300"
            r="8"
            fill="oklch(0.65 0.05 210)"
            stroke="oklch(0.78 0.05 210)"
            strokeWidth="1.5"
          />
        </g>

        <ellipse
          cx="115"
          cy="370"
          rx="28"
          ry="5"
          fill="oklch(0.58 0.05 210)"
          stroke="oklch(0.70 0.05 210)"
          strokeWidth="1.5"
        />
        <rect
          x="111"
          y="370"
          width="8"
          height="16"
          fill="oklch(0.58 0.05 210)"
          rx="2"
        />
        <ellipse
          cx="115"
          cy="85"
          rx="57"
          ry="12"
          fill="oklch(0.62 0.05 215)"
          stroke="oklch(0.72 0.05 210)"
          strokeWidth="2"
        />

        <g className="gauge-anim" transform="translate(178, 190)">
          <rect
            x="0"
            y="0"
            width="44"
            height="60"
            rx="6"
            fill="oklch(0.92 0.02 75)"
            stroke="oklch(0.52 0.14 175)"
            strokeWidth="1.5"
          />
          <text
            x="22"
            y="14"
            textAnchor="middle"
            fontSize="7"
            fill="oklch(0.52 0.14 175)"
            fontFamily="monospace"
            fontWeight="bold"
          >
            TEMP
          </text>
          <rect
            x="6"
            y="20"
            width="32"
            height="10"
            rx="3"
            fill="oklch(0.88 0.02 75)"
          />
          <rect
            x="7"
            y="21"
            width="24"
            height="8"
            rx="2"
            fill="oklch(0.62 0.18 50)"
          />
          <text
            x="22"
            y="44"
            textAnchor="middle"
            fontSize="8"
            fill="oklch(0.28 0.03 75)"
            fontFamily="monospace"
          >
            37°C
          </text>
          <text
            x="22"
            y="56"
            textAnchor="middle"
            fontSize="6"
            fill="oklch(0.50 0.04 75)"
            fontFamily="monospace"
          >
            Optimal
          </text>
        </g>

        <g
          className="gauge-anim"
          transform="translate(178, 265)"
          style={{ animationDelay: "0.8s" }}
        >
          <rect
            x="0"
            y="0"
            width="44"
            height="60"
            rx="6"
            fill="oklch(0.92 0.02 75)"
            stroke="oklch(0.52 0.14 175)"
            strokeWidth="1.5"
          />
          <text
            x="22"
            y="14"
            textAnchor="middle"
            fontSize="7"
            fill="oklch(0.52 0.14 175)"
            fontFamily="monospace"
            fontWeight="bold"
          >
            pH
          </text>
          <rect
            x="6"
            y="20"
            width="32"
            height="10"
            rx="3"
            fill="oklch(0.88 0.02 75)"
          />
          <rect
            x="7"
            y="21"
            width="20"
            height="8"
            rx="2"
            fill="oklch(0.55 0.16 142)"
          />
          <text
            x="22"
            y="44"
            textAnchor="middle"
            fontSize="8"
            fill="oklch(0.28 0.03 75)"
            fontFamily="monospace"
          >
            7.0
          </text>
          <text
            x="22"
            y="56"
            textAnchor="middle"
            fontSize="6"
            fill="oklch(0.50 0.04 75)"
            fontFamily="monospace"
          >
            Neutral
          </text>
        </g>

        <line
          x1="178"
          y1="220"
          x2="172"
          y2="220"
          stroke="oklch(0.52 0.14 175)"
          strokeWidth="1"
          strokeDasharray="2,2"
          opacity="0.6"
        />
        <line
          x1="178"
          y1="295"
          x2="172"
          y2="295"
          stroke="oklch(0.52 0.14 175)"
          strokeWidth="1"
          strokeDasharray="2,2"
          opacity="0.6"
        />

        <path
          d="M155,78 L155,50 L230,50"
          fill="none"
          stroke="oklch(0.55 0.08 30)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <polygon points="226,44 238,50 226,56" fill="oklch(0.55 0.08 30)" />
        <text
          x="232"
          y="46"
          fontSize="9"
          fill="oklch(0.55 0.08 30)"
          fontWeight="bold"
        >
          CO₂ out
        </text>

        <path
          d="M75,78 L75,50 L10,50"
          fill="none"
          stroke="oklch(0.52 0.14 142)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <polygon points="14,44 2,50 14,56" fill="oklch(0.52 0.14 142)" />
        <text
          x="2"
          y="44"
          fontSize="9"
          fill="oklch(0.52 0.14 142)"
          fontWeight="bold"
        >
          Nutrients
        </text>
        <text
          x="2"
          y="56"
          fontSize="9"
          fill="oklch(0.52 0.14 142)"
          fontWeight="bold"
        >
          in
        </text>

        <path
          d="M172,370 L220,370 L220,430"
          fill="none"
          stroke="oklch(0.58 0.18 36)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <polygon points="214,426 220,438 226,426" fill="oklch(0.58 0.18 36)" />
        <text
          x="224"
          y="402"
          fontSize="9"
          fill="oklch(0.58 0.18 36)"
          fontWeight="bold"
        >
          Product
        </text>
        <text
          x="224"
          y="414"
          fontSize="9"
          fill="oklch(0.58 0.18 36)"
          fontWeight="bold"
        >
          out
        </text>

        <path
          d="M58,370 L10,370 L10,430"
          fill="none"
          stroke="oklch(0.52 0.14 262)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <polygon points="4,426 10,438 16,426" fill="oklch(0.52 0.14 262)" />
        <text
          x="1"
          y="400"
          fontSize="9"
          fill="oklch(0.52 0.14 262)"
          fontWeight="bold"
        >
          Air / O₂
        </text>
        <text
          x="1"
          y="412"
          fontSize="9"
          fill="oklch(0.52 0.14 262)"
          fontWeight="bold"
        >
          in
        </text>

        <text
          x="115"
          y="165"
          textAnchor="middle"
          fontSize="8.5"
          fill="oklch(0.96 0.01 75)"
          fontWeight="bold"
        >
          Broth
        </text>
        <text
          x="115"
          y="176"
          textAnchor="middle"
          fontSize="7"
          fill="oklch(0.90 0.06 175)"
        >
          microorganisms + medium
        </text>
        <text
          x="115"
          y="240"
          textAnchor="middle"
          fontSize="7.5"
          fill="oklch(0.85 0.10 175)"
        >
          Impeller
        </text>
        <text
          x="115"
          y="250"
          textAnchor="middle"
          fontSize="6.5"
          fill="oklch(0.72 0.08 175)"
        >
          (mixing)
        </text>
        <text
          x="115"
          y="390"
          textAnchor="middle"
          fontSize="7.5"
          fill="oklch(0.80 0.08 175)"
        >
          Sparger
        </text>
        <text
          x="115"
          y="448"
          textAnchor="middle"
          fontSize="11"
          fill="oklch(0.52 0.14 175)"
          fontWeight="bold"
        >
          Stirred-Tank Bioreactor
        </text>
      </svg>
    </div>
  );
}

// ── Quiz questions ─────────────────────────────────────────────────────────────

const quizQuestions: QuizQuestion[] = [
  {
    id: "ferm-q1",
    question:
      "What is the difference between fermentation and aerobic respiration?",
    options: [
      "Fermentation uses oxygen; aerobic respiration does not",
      "Fermentation works without oxygen and produces much less energy; aerobic respiration uses oxygen and extracts far more energy from the same glucose",
      "Aerobic respiration produces lactic acid; fermentation produces CO₂",
      "They are the same process — the terms are interchangeable",
    ],
    correctIndex: 1,
    explanation:
      "Here's the key difference: fermentation is what cells do when there's no oxygen available. Both processes start with glycolysis — breaking glucose into pyruvate and making 2 ATP molecules. But glycolysis also produces NADH, and NADH needs to offload its electrons somewhere, or the whole process grinds to a halt. With oxygen, the mitochondria handle this and extract another 28–30 ATP in the process — that's aerobic respiration. Without oxygen, fermentation steps in: it recycles NADH back to NAD⁺ by reducing pyruvate to lactate or ethanol. The payoff is only 2 ATP per glucose — a tiny fraction of aerobic respiration. This is why your muscles can sprint anaerobically, but only briefly before that burning feeling builds up. And this is why yeast can survive in a sealed bottle of grape juice — no oxygen needed, just sugar and fermentation.",
    topic: "fermentation",
  },
  {
    id: "ferm-q2",
    question:
      "Which enzyme converts pyruvate to lactate in lactic acid fermentation, and why does this matter?",
    options: [
      "Pyruvate decarboxylase",
      "Alcohol dehydrogenase",
      "Lactate dehydrogenase (LDH)",
      "Pyruvate kinase",
    ],
    correctIndex: 2,
    explanation:
      "Lactate dehydrogenase (LDH) is the key enzyme here — and it's doing two jobs at once. It converts pyruvate to lactate, AND it simultaneously converts NADH back to NAD⁺. That NAD⁺ recycling is the whole point — glycolysis can't keep going without a constant supply of NAD⁺ to pick up electrons. LDH elegantly keeps the whole system running. Your muscles use this when you sprint and oxygen can't be delivered fast enough — the resulting lactic acid is what creates that burning sensation. Meanwhile, Lactobacillus bacteria are doing the same chemistry in yogurt, cheese, kimchi, and sauerkraut — their lactic acid preserves the food and gives it that tangy flavor. Fun fact: the soreness you feel two days after a hard workout (called DOMS) is NOT from lactic acid — that's a common myth. The soreness comes from inflammation during muscle fibre repair. The burning during exercise is from acidity, but it clears within minutes of stopping.",
    topic: "fermentation",
  },
  {
    id: "ferm-q3",
    question:
      "Which organism is responsible for making both beer and bread, and how does it do both at once?",
    options: [
      "Escherichia coli",
      "Saccharomyces cerevisiae",
      "Penicillium notatum",
      "Clostridium acetobutylicum",
    ],
    correctIndex: 1,
    explanation:
      "Saccharomyces cerevisiae — brewer's and baker's yeast — is one of humanity's oldest and most valuable microbial partners. It's been used for at least 9,000 years! Here's how it works: the yeast converts glucose into pyruvate, then removes CO₂ to make acetaldehyde, then converts acetaldehyde to ethanol. Every glucose molecule going through this pathway releases two CO₂ molecules and two ethanol molecules. In beer brewing, the ethanol is the whole point — that's your alcohol. In bread baking, the CO₂ is the point — those gas bubbles get trapped in the sticky gluten network of the dough and make it rise and become light and airy. The baking process kills the yeast, drives off the remaining CO₂, and evaporates the small amount of alcohol. Same organism, same chemistry, two completely different products depending on what you do with it. Different Saccharomyces strains even produce different flavour compounds — breweries carefully guard their own proprietary yeast strains.",
    topic: "fermentation",
  },
  {
    id: "ferm-q4",
    question: "What does the impeller do inside a bioreactor?",
    options: [
      "It sterilises the growth medium by generating heat",
      "It controls pH by releasing acid or base",
      "It mixes the contents of the vessel to distribute oxygen, nutrients, and temperature evenly throughout",
      "It filters the product out of the fermentation broth continuously",
    ],
    correctIndex: 2,
    explanation:
      "The impeller is essentially a set of rotating blades — it's the mixing system inside the bioreactor vessel. Without mixing, oxygen bubbled in from the bottom would stay near the bottom, leaving cells in the upper part of the tank starved of oxygen. Nutrients added from above would sit at the surface. Temperature gradients would build up. The impeller fixes all of this by constantly circulating the broth, making sure every cell in the tank has roughly equal access to oxygen, nutrients, and a stable temperature. This sounds straightforward in a small lab vessel. In a 50,000-litre industrial bioreactor, it's a genuine engineering challenge — getting everything mixed uniformly in a tank the size of a house requires careful design of impeller placement, speed, and the baffles (vertical plates) on the vessel walls that prevent the liquid from just spinning in circles.",
    topic: "fermentation",
  },
  {
    id: "ferm-q5",
    question:
      "In fed-batch fermentation, what is added during the process and why does this work better than adding everything at the start?",
    options: [
      "Nothing is added — fed-batch is a closed system just like batch fermentation",
      "Product is continuously removed to prevent it from inhibiting the microorganism",
      "Fresh substrate (like glucose) is fed in gradually during fermentation, preventing the high concentrations that cause cells to make unwanted by-products",
      "Cells are removed at regular intervals to prevent overcrowding",
    ],
    correctIndex: 2,
    explanation:
      "Here's the problem with giving cells all their glucose upfront: when glucose concentration is very high, E. coli (for example) switches to overflow metabolism and starts making acetate instead of your product — a wasteful and inhibitory by-product. Yeast does something similar, making too much ethanol at high glucose. Fed-batch solves this by feeding glucose in gradually, keeping the concentration in a 'sweet spot' — enough to support active growth and production, but not so much that overflow metabolism kicks in. This dramatically increases the amount of useful product you get from the same amount of starting material. Most commercial production of antibiotics, recombinant proteins, and amino acids uses fed-batch. The feeding strategy can be sophisticated — many industrial processes use sensors measuring dissolved oxygen or CO₂ output to automatically adjust the feed rate based on how actively the cells are actually metabolizing. Smart biology, smart engineering working together.",
    topic: "fermentation",
  },
  {
    id: "ferm-q6",
    question:
      "Which antibiotic is produced by Penicillium mould through industrial fermentation?",
    options: ["Streptomycin", "Tetracycline", "Penicillin", "Vancomycin"],
    correctIndex: 2,
    explanation:
      "Penicillin — one of the most important medicines in history! Alexander Fleming noticed in 1928 that a Penicillium mould contaminating his bacterial culture was killing bacteria around it. He correctly identified a bactericidal substance and named it penicillin — but he couldn't purify it or make enough of it to be useful. For over a decade, it remained a curiosity. Then in the early 1940s, Howard Florey and Ernst Chain developed methods to purify and concentrate penicillin. The first patient treated with purified penicillin was a policeman dying of a blood infection — he began recovering dramatically, but supplies ran out after four days and he died. By 1944, industrial-scale fermentation was producing enough penicillin to treat thousands of Allied soldiers. Early production yielded just 1 unit per millilitre of fermentation broth. Through decades of strain improvement and process optimization, modern industrial fermentation achieves over 50,000 units per millilitre — a 50,000-fold improvement. Fleming, Florey, and Chain shared the 1945 Nobel Prize.",
    topic: "fermentation",
  },
  {
    id: "ferm-q7",
    question:
      "What is one of the biggest challenges when scaling up fermentation from a small lab flask to a large industrial vessel?",
    options: [
      "Microorganisms behave identically at all scales — scale-up is straightforward",
      "Industrial bioreactors cannot maintain sterile conditions at large scale",
      "Mixing time, oxygen transfer, and heat removal all change in complex ways with scale — what works perfectly in a small flask often doesn't work the same in a 10,000-litre vessel",
      "Large-scale fermentation always produces toxic by-products that small scale doesn't",
    ],
    correctIndex: 2,
    explanation:
      "There's a saying in bioprocess engineering: 'scale-up is where careers go to die' — and it's only half a joke. The core problem is that volume scales as a cube while surface area scales as a square. When you go from a 1-litre flask to a 10,000-litre vessel, the volume increases 10,000-fold but the surface area for heat removal doesn't keep up. Oxygen transfer, mixing time, and temperature gradients all behave differently. In a small flask, shaking provides excellent mixing in seconds. In a large bioreactor, mixing time after adding a pulse of acid for pH control might be 30–60 seconds. During those 60 seconds, cells near the acid injection point experience a brief pH crash that cells elsewhere never see. These micro-environments affect cell growth, product quality, and metabolism in ways you only discover at large scale. This is why pharmaceutical companies invest heavily in pilot-scale experiments (typically 200–2,000 litres) before committing to full production scale — learning at intermediate size is much less costly than discovering problems in a $100 million production facility.",
    topic: "fermentation",
  },
  {
    id: "ferm-q8",
    question: "How is recombinant human insulin produced today?",
    options: [
      "Extracted from the pancreases of pigs and chemically modified to the human sequence",
      "Synthesised chemically from amino acids",
      "Produced by genetically engineered E. coli or yeast that express the human insulin gene during fermentation",
      "Isolated from donated human blood",
    ],
    correctIndex: 2,
    explanation:
      "The human insulin gene is inserted into E. coli bacteria or baker's yeast (Saccharomyces cerevisiae). These microorganisms grow in large stainless steel fermentation tanks, producing human insulin protein. The insulin is then extracted from the fermentation broth, purified extensively, refolded correctly (insulin has two chains connected by disulfide bonds that must form properly), and formulated into the injectable solution used by people with diabetes. The entire process, from gene insertion to purified medicine, is a marvel of modern biotechnology. Before 1982, every person with diabetes in the world relied on insulin extracted from pig or cow pancreas glands. Today, every person with diabetes who uses insulin is directly benefiting from microbial fermentation. The scale of this is staggering: hundreds of millions of people rely on recombinant insulin every single day.",
    topic: "fermentation",
  },
  {
    id: "ferm-q9",
    question: "What is ABE fermentation and why is it historically important?",
    options: [
      "Acetic–Butanol–Ethanol fermentation by Saccharomyces cerevisiae — the first food fermentation process",
      "Acetone–Butanol–Ethanol fermentation by Clostridium acetobutylicum — the first large-scale industrial bioprocess in history",
      "Acetic–Butyric–Ethanol fermentation by Lactobacillus acidophilus",
      "Aldehyde–Butane–Ethylene fermentation by Aspergillus niger",
    ],
    correctIndex: 1,
    explanation:
      "ABE (Acetone–Butanol–Ethanol) fermentation holds a remarkable distinction: it's the first industrial bioprocess ever scaled up for mass production. Clostridium acetobutylicum ferments sugars to produce acetone, butanol, and ethanol simultaneously. During World War I, Britain desperately needed acetone to manufacture cordite explosive. Conventional supplies were completely inadequate. Chaim Weizmann, a Russian-born biochemist working in Manchester, developed the fermentation process and scaled it up to produce the acetone Britain needed. It is not an exaggeration to say this fermentation helped change the course of the war. Weizmann later became the first President of Israel — and his scientific contribution during the war is often cited as one reason Britain supported the creation of a Jewish homeland in Palestine. Butanol is now attracting renewed interest as a biofuel because it has a higher energy content than ethanol and can be blended with gasoline at higher concentrations.",
    topic: "fermentation",
  },
  {
    id: "ferm-q10",
    question:
      "In a chemostat (continuous fermentation), what controls the growth rate of the cells?",
    options: [
      "The initial cell density in the vessel",
      "The dilution rate — fresh medium is pumped in at a constant rate while culture flows out at the same rate, and cells must grow at exactly that rate to avoid being washed out",
      "The temperature setting of the vessel jacket",
      "The stirrer speed",
    ],
    correctIndex: 1,
    explanation:
      "A chemostat is elegant in its simplicity. Fresh medium flows in at a constant rate (the dilution rate, D), and culture flows out at the same rate, keeping the volume constant. At steady state, cells grow at exactly the rate needed to compensate for being diluted — otherwise they would either wash out (growing slower than D) or fill the vessel (growing faster than D). So the dilution rate directly controls how fast the cells grow: set D to a low value and you get slow-growing cells (good for studying secondary metabolite production); set it high and you get fast-growing cells. This precise control is why chemostats are invaluable for research — you can hold every growth condition constant and change just one variable at a time, which is the foundation of good experimental design. For industrial use, the main challenge with continuous fermentation is that over weeks and months, fast-growing mutants that have stopped making your product accumulate — genetic drift is a real problem when you're running the same culture indefinitely.",
    topic: "fermentation",
  },
];

// ── Explanation paragraphs ─────────────────────────────────────────────────────

const explanations = [
  {
    id: "history",
    anchorId: "fermentation-types",
    heading: "Fermentation: From Ancient Bread to Modern Medicine",
    color: "oklch(0.52 0.14 175)",
    body: `Humans have been using fermentation for thousands of years — bread, beer, wine, cheese, yogurt, vinegar — without having the faintest idea of the chemistry involved. For most of history, fermentation was magic: mix flour and water, leave it, and it rises. Grape juice turns into wine. Milk becomes cheese. Nobody knew why.

The understanding came much later. In 1857, Louis Pasteur showed for the first time that fermentation was caused by living microorganisms — tiny creatures invisible to the naked eye. He coined the phrase "la vie sans air" — life without air. Before Pasteur, many scientists believed fermentation was a purely chemical reaction. His experiments with sealed flasks proved it required living cells. This was a major turning point in the history of biology. Then in 1897, Eduard Buchner ground up yeast cells, squeezed out their juice, and discovered that the cell-free extract could still ferment sugar. The cells themselves weren't needed — just their enzymes. This "cell-free fermentation" proved enzymes were doing the work, earned Buchner a Nobel Prize in 1907, and launched biochemistry as a discipline. From that discovery to today's multi-billion dollar bioreactor industry is one continuous story of humanity learning to understand and redirect microbial chemistry.`,
  },
  {
    id: "biochemistry",
    anchorId: "fermentation-biochemistry",
    heading: "What's Actually Happening When Fermentation Occurs",
    color: "oklch(0.52 0.14 175)",
    body: `Let's trace what happens to a glucose molecule during fermentation — step by step. First, glycolysis breaks glucose (a 6-carbon sugar) into two pyruvate molecules (each 3 carbons), releasing a small amount of energy as 2 ATP. Glycolysis also produces 2 NADH molecules — think of NADH as a full electron carrier that needs to be emptied before it can work again. That emptying is the central problem fermentation solves.

In alcoholic fermentation (the kind yeast does), pyruvate first loses a CO₂ molecule to become acetaldehyde, then picks up electrons from NADH to become ethanol. The NADH becomes NAD⁺ again, ready to accept more electrons from glycolysis. Two CO₂ molecules and two ethanol molecules are produced per glucose. In lactic acid fermentation (what your muscles and Lactobacillus bacteria do), it's even simpler: pyruvate directly accepts electrons from NADH to become lactate, regenerating NAD⁺ in one step. These are the two most common types, but fermentation is a remarkably diverse process. Propionic acid fermentation (done by Propionibacterium in Swiss cheese) makes propionic acid and CO₂ — the CO₂ bubbles create those characteristic holes in the cheese! Acetic acid fermentation (Acetobacter) converts ethanol to acetic acid — that's how wine becomes vinegar. Each type of fermentation is just a different solution to the same problem: recycling NADH without oxygen.`,
  },
  {
    id: "types",
    anchorId: "fermentation-types-batch",
    heading: "Batch, Fed-Batch, and Continuous: Three Ways to Ferment",
    color: "oklch(0.58 0.18 36)",
    body: `Industrial fermentation isn't one thing — it's three different process modes, each with its own strengths. Batch fermentation is the simplest: fill the vessel with nutrients and microorganisms, close it, let fermentation run until nutrients are exhausted, then harvest everything. The culture goes through distinct phases — a lag phase (cells adapting to new conditions), an exponential phase (rapid doubling every 20–90 minutes), a stationary phase (nutrients limiting, often when secondary metabolites like antibiotics are produced), and a death phase (nutrients gone, cells dying). Batch is easy to validate, each run is a distinct lot, and if something goes wrong you lose one batch rather than your whole facility. That traceability makes it the preferred approach for pharmaceutical manufacturing.

Fed-batch is the dominant mode for high-value products. Instead of adding all the nutrient at the start, you feed it in gradually throughout the run — usually with a sophisticated strategy that responds to signals from the culture (oxygen levels, CO₂ production, pH changes) to figure out how hungry the cells are and how fast to feed them. This prevents the problem of overflow metabolism (cells making by-products when flooded with glucose) and allows the culture to reach much higher cell densities. Most commercial antibiotic, insulin, and monoclonal antibody production runs as fed-batch. Continuous fermentation (chemostat) is the third mode: fresh medium flows in constantly, spent broth flows out at the same rate, and the culture runs indefinitely at a steady state. Productivity per unit of vessel volume is high, but contamination risk accumulates over long runs and genetic drift (fast-growing mutant cells that have stopped making your product) becomes a problem. Continuous fermentation is used mainly for commodity products and in research.`,
  },
  {
    id: "bioreactor",
    anchorId: "fermentation-bioreactor",
    heading: "Inside a Bioreactor: Life Support for Billions of Microbes",
    color: "oklch(0.52 0.15 175)",
    body: `A bioreactor might look like a fancy metal tank, but it's actually a precisely controlled life-support system. The stirred-tank reactor (STR) is the most common design — a cylindrical stainless steel vessel with a rotating impeller for mixing, a sparger (a ring with tiny holes at the bottom) that disperses oxygen as tiny bubbles, baffles (vertical plates on the walls) that prevent the liquid from spinning in circles and improve turbulent mixing, and a cooling jacket with temperature-controlled water circulating through it. Sensors monitor pH, dissolved oxygen, temperature, and foam level in real time, feeding data to control systems that automatically add acid or base, adjust stirrer speed, and increase or decrease airflow.

But stirred-tank reactors aren't the only option. Airlift bioreactors circulate the culture using rising air bubbles rather than spinning blades — gentler on sensitive organisms like mammalian cells that can be damaged by the shear forces from impellers. Bubble column reactors are even simpler: just a column with a sparger at the bottom, no moving parts, easy to sterilize. Wave bioreactors (single-use plastic bags rocked on a platform) have become standard for small-scale clinical manufacturing — the disposable bag eliminates cross-contamination risk between batches and lets you set up quickly. Photobioreactors contain transparent chambers for growing light-dependent microalgae, with lighting systems and CO₂ supply built in. The wide variety of bioreactor designs directly reflects the enormous variety of biology being exploited — different organisms need different environments to thrive.`,
  },
  {
    id: "scale-up",
    anchorId: "fermentation-scale-up",
    heading: "Scale-Up: The Hardest Part of Bioprocess Engineering",
    color: "oklch(0.52 0.14 142)",
    body: `Here's a challenge that catches many people by surprise: making something work in a small lab flask and making the same thing work in a 50,000-litre production vessel are two completely different problems. What works perfectly at small scale often fails at large scale, not because the biology changed, but because the physics of large vessels is fundamentally different. The ratio of surface area to volume decreases as a vessel gets larger — this means heat removal becomes harder, oxygen bubbles have further to travel, and mixing takes much longer. In a 1-litre lab flask, you can mix uniformly in under a second. In a 20,000-litre bioreactor, mixing after a pH adjustment event might take 30–60 seconds. During those seconds, cells near the acid injection point experience a brief pH crash that cells on the other side of the vessel never see.

These local variations — called concentration and pH gradients — stress cells in ways that don't show up at small scale, affecting product quality, yield, and cell health. Understanding this requires combining fluid dynamics (how liquids move in large tanks) with microbial physiology (how cells respond to changing conditions) and process chemistry (how pH, oxygen, and nutrients interact). This is why pharmaceutical companies run processes at multiple intermediate scales (bench, pilot, manufacturing) rather than jumping straight from lab to production. Process Analytical Technology (PAT) — continuous in-line monitoring using sensors and mathematical models — has become the standard approach for catching problems early. Getting scale-up right is one of the hardest and most economically important challenges in modern biotechnology.`,
  },
  {
    id: "upstream",
    anchorId: "fermentation-upstream",
    heading: "Upstream Processing: Preparing the Perfect Microbial Team",
    color: "oklch(0.52 0.16 290)",
    body: `Before any product comes out of a bioreactor, there's significant work to do getting the right microorganism into the right conditions. Strain development is the foundation. The microorganism needs to produce your target molecule at high yield with good genetic stability, be tolerant to the process conditions (temperature, pH, oxygen levels), and ideally not make too many by-products that complicate purification. Traditional strain improvement used random mutagenesis — exposing cells to UV light or chemicals and screening tens of thousands of colonies for rare improved producers. This is how penicillin production improved 50,000-fold over decades. Modern metabolic engineering takes a rational approach: delete competing pathways, overexpress biosynthetic genes, improve cofactor availability. CRISPR has made this much faster and more precise.

Media design is equally important. The exact composition of the growth medium — carbon source (glucose, glycerol, sucrose), nitrogen source (ammonia, corn steep liquor), mineral salts, vitamins, and trace metals — profoundly affects cell behavior and product yield. Sometimes a tiny amount of an unexpected trace element makes a major difference. Then there's the seed train: you can't inoculate a 10,000-litre production bioreactor directly from a frozen vial — the cell density would be far too low. Instead, cells are grown progressively through increasingly larger vessels (shake flask → 10L → 200L → production vessel), each step 10–50 times larger than the last, building up cell density and health step by step until the production vessel is ready to receive a vigorous, productive inoculum.`,
  },
  {
    id: "downstream",
    anchorId: "fermentation-industrial",
    heading: "Downstream Processing: Purifying Your Product",
    color: "oklch(0.58 0.18 36)",
    body: `Making the product is only half the job. Getting it out of the fermentation broth in a pure, safe, stable form — downstream processing — is the other half, and it can cost more than the fermentation itself. For a biopharmaceutical like a monoclonal antibody, downstream processing represents 50–70% of total production costs. Every step adds cost and removes product, so minimizing the number of steps while achieving the required purity is the central challenge.

Here's what a typical monoclonal antibody purification looks like. First, cells are separated by centrifugation and filtration — the 'clarification' step. Then comes Protein A affinity chromatography: Protein A (a protein from Staphylococcus bacteria) specifically binds the constant region of antibodies. One pass through a Protein A column can reduce all other impurities by hundreds or thousands of fold. Then come 'polishing' steps — ion exchange chromatography, hydrophobic interaction chromatography — to remove remaining host cell proteins, DNA fragments, viruses, and aggregated antibody. Ultrafiltration concentrates the antibody and exchanges the buffer to the final formulation. Finally the purified antibody is mixed with stabilizers, filled into sterile vials, and tested exhaustively for purity, potency, safety, and sterility before any patient ever receives it. For a product that can cost $100,000 per patient per year, every step needs to work flawlessly, batch after batch.`,
  },
  {
    id: "applications",
    anchorId: "fermentation-economy",
    heading: "Fermentation Products: More Than You Realise",
    color: "oklch(0.52 0.14 142)",
    body: `Take a moment to count how many products in your daily life came from fermentation. Your bread (yeast producing CO₂). Beer and wine (yeast producing ethanol). Yogurt and cheese (bacteria producing lactic acid). Soy sauce, miso, kimchi, sauerkraut, vinegar — all fermentation products. These have been part of human culture for thousands of years. But the modern fermentation economy extends far beyond food in ways most people never think about.

Every person with diabetes who uses insulin is using a fermentation product made by bacteria. Every patient treated with penicillin or amoxicillin owes that treatment to mould fermentation. The vitamin C in your orange juice is almost certainly made by microbial fermentation. The citric acid in your soft drink and salad dressing is made by Aspergillus niger fungi in massive fermentation tanks — over 2 million tonnes per year globally. The glutamate in MSG (and the natural umami flavour in many foods) comes from Corynebacterium glutamicum fermentation. The laundry detergent enzyme that cleans your clothes at cold temperature, the rennet that makes your cheese set, the amylase that improves your bread texture — fermentation. Bioethanol blended into petrol in most countries. Bioplastics. Single-cell protein for animal feed. Omega-3 fatty acids from microalgae. Look at the world through a fermentation lens and you start seeing it everywhere — a remarkable testament to billions of years of microbial evolution, now harnessed to serve human needs at global scale.`,
  },
];

// ── Main section ───────────────────────────────────────────────────────────────

export default function FermentationSection() {
  return (
    <section
      className="px-6 py-16 max-w-5xl mx-auto"
      data-ocid="fermentation-section"
      aria-label="Fermentation and Bioreactors educational section"
      style={{ background: "oklch(0.97 0.012 75)" }}
    >
      <SectionHeader
        topicId="fermentation"
        title="Fermentation & Bioreactors"
        subtitle="From the burning in your muscles during a sprint to the beer in your fridge to the insulin in a diabetic's injection — fermentation is everywhere."
      />

      <AnimatedEntrance direction="up" delay={0.1}>
        <div className="mb-14">
          <h3
            className="font-display text-xl font-semibold mb-6 flex items-center gap-2"
            style={{ color: "oklch(0.52 0.14 175)" }}
          >
            <FlaskConical
              className="inline w-5 h-5"
              style={{ color: "oklch(0.52 0.14 175)" }}
              aria-hidden="true"
            />
            Interactive Bioreactor Diagram
          </h3>
          <div
            className="rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8"
            style={{
              background: "oklch(0.985 0.008 75)",
              border: "1px solid oklch(0.52 0.14 175 / 0.25)",
              boxShadow: "0 4px 24px oklch(0.52 0.14 175 / 0.08)",
            }}
          >
            <div className="flex-shrink-0">
              <BioreactorDiagram />
            </div>
            <div className="flex flex-col gap-3 min-w-0">
              <h4
                className="font-display text-base font-semibold mb-1"
                style={{ color: "oklch(0.28 0.03 75)" }}
              >
                Components
              </h4>
              {[
                {
                  color: "oklch(0.65 0.06 210)",
                  label: "Impeller",
                  desc: "Rotating blades for mixing — distributes O₂ and nutrients evenly",
                },
                {
                  color: "oklch(0.55 0.15 175)",
                  label: "Culture Broth",
                  desc: "Microorganism suspension in nutrient medium",
                },
                {
                  color: "oklch(0.82 0.10 175)",
                  label: "Foam / Bubbles",
                  desc: "Air dispersion from sparger — oxygen delivery",
                },
                {
                  color: "oklch(0.52 0.14 142)",
                  label: "Nutrient Inlet",
                  desc: "Carbon source, nitrogen source, minerals",
                },
                {
                  color: "oklch(0.58 0.18 36)",
                  label: "Product Outlet",
                  desc: "Harvested fermentation product",
                },
                {
                  color: "oklch(0.52 0.14 262)",
                  label: "Air / O₂ Inlet",
                  desc: "Sterile air or pure oxygen for aerobic organisms",
                },
                {
                  color: "oklch(0.55 0.08 30)",
                  label: "CO₂ Exhaust",
                  desc: "Metabolic gas removed via overhead vent",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span
                    className="mt-1 flex-shrink-0 w-3 h-3 rounded-full"
                    style={{ background: item.color }}
                    aria-hidden="true"
                  />
                  <div>
                    <span
                      className="font-semibold text-sm"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-sm ml-1"
                      style={{ color: "oklch(0.45 0.04 75)" }}
                    >
                      — {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedEntrance>

      {/* Interesting fact callout */}
      <AnimatedEntrance direction="up" delay={0.05}>
        <div
          className="rounded-2xl p-5 mb-10 flex items-start gap-4"
          style={{
            background: "oklch(0.96 0.025 175 / 0.35)",
            border: "1px solid oklch(0.52 0.14 175 / 0.3)",
          }}
        >
          <span className="text-2xl shrink-0" aria-hidden="true">
            🔬
          </span>
          <div>
            <p
              className="font-semibold text-sm mb-1"
              style={{ color: "oklch(0.42 0.12 175)" }}
            >
              Did you know?
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "oklch(0.35 0.05 75)" }}
            >
              The ABE (Acetone–Butanol–Ethanol) fermentation by{" "}
              <em>Clostridium acetobutylicum</em> was the{" "}
              <strong>first industrial bioprocess in history</strong> —
              developed during World War I to produce acetone for cordite
              explosive manufacturing. Chaim Weizmann, the scientist who
              developed it, later became the first President of Israel.
              Fermentation helped change the course of the war.
            </p>
          </div>
        </div>
      </AnimatedEntrance>

      <StaggerContainer className="mb-14 flex flex-col gap-8">
        {explanations.map((para) => (
          <StaggerItem key={para.id}>
            <article
              id={para.anchorId}
              aria-labelledby={`ferm-heading-${para.id}`}
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: "oklch(0.985 0.008 75)",
                border: "1px solid oklch(0.87 0.02 75)",
                borderLeft: `3px solid ${para.color}`,
              }}
            >
              <h3
                id={`ferm-heading-${para.id}`}
                className="font-display text-lg font-bold mb-4"
                style={{ color: para.color }}
              >
                {para.heading}
              </h3>
              {para.body.split("\n\n").map((paragraph, pi) => (
                <p
                  key={`${para.id}-p${pi}`}
                  className="text-base leading-relaxed mb-3 last:mb-0"
                  style={{ color: "oklch(0.30 0.03 75)" }}
                >
                  {paragraph}
                </p>
              ))}
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Key facts grid */}
      <AnimatedEntrance direction="up" delay={0.1}>
        <div
          className="rounded-2xl p-6 mb-12"
          style={{
            background: "oklch(0.985 0.008 75)",
            border: "1px solid oklch(0.52 0.14 175 / 0.20)",
          }}
        >
          <h3
            className="font-display text-lg font-bold mb-4"
            style={{ color: "oklch(0.52 0.14 175)" }}
          >
            🔑 Key Facts at a Glance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: "🧪",
                fact: "Pasteur, 1857",
                detail:
                  "Demonstrated fermentation is caused by living microorganisms — 'la vie sans air'",
              },
              {
                icon: "🏆",
                fact: "Buchner Nobel Prize 1907",
                detail:
                  "Cell-free fermentation proved enzymes — not intact cells — do the chemistry",
              },
              {
                icon: "💊",
                fact: "Penicillin, 1940s",
                detail:
                  "First large-scale pharmaceutical fermentation — from 1 U/mL to 50,000 U/mL through strain improvement",
              },
              {
                icon: "🩺",
                fact: "Recombinant Insulin, 1982",
                detail:
                  "First recombinant protein drug — E. coli fermentation replaced animal pancreas extraction",
              },
              {
                icon: "🔄",
                fact: "Fed-batch dominates",
                detail:
                  "Most high-value biopharmaceuticals use fed-batch; prevents substrate inhibition and maximises titre",
              },
              {
                icon: "📊",
                fact: "$200B+ Market",
                detail:
                  "Global fermentation-derived biopharmaceuticals market — antibiotics, insulin, mAbs, enzymes",
              },
            ].map(({ icon, fact, detail }) => (
              <div
                key={fact}
                className="flex gap-3 items-start rounded-xl p-3"
                style={{ background: "oklch(0.52 0.14 175 / 0.05)" }}
              >
                <span className="text-xl shrink-0" aria-hidden="true">
                  {icon}
                </span>
                <div>
                  <p
                    className="text-sm font-bold leading-tight"
                    style={{ color: "oklch(0.52 0.14 175)" }}
                  >
                    {fact}
                  </p>
                  <p
                    className="text-xs mt-0.5 leading-relaxed"
                    style={{ color: "oklch(0.45 0.04 75)" }}
                  >
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedEntrance>

      <AnimatedEntrance direction="up" delay={0.2}>
        <div data-ocid="fermentation-quiz">
          <QuizEngine topicId="fermentation" questions={quizQuestions} />
        </div>
      </AnimatedEntrance>
    </section>
  );
}
