import {
  AnimatedEntrance,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedEntrance";
import { QuizEngine } from "@/components/QuizEngine";
import { SectionHeader } from "@/components/SectionHeader";
import type { QuizQuestion } from "@/types/biology";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Accent color tokens ───────────────────────────────────────────────────────

const GREEN = "0.73 0.18 155";
const GREEN_DIM = "0.73 0.18 155 / 0.18";
const GREEN_BORDER = "0.73 0.18 155 / 0.35";

// ─── Category data ─────────────────────────────────────────────────────────────

interface AppExample {
  title: string;
  detail: string;
}

interface AppCategory {
  id: string;
  icon: string;
  name: string;
  tagline: string;
  imageUrl: string;
  imageAlt: string;
  accentOklch: string;
  examples: AppExample[];
}

const CATEGORIES: AppCategory[] = [
  {
    id: "medicine",
    icon: "💊",
    name: "Medicine",
    tagline: "Saving lives with engineered molecules",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Syringe_icon.svg/240px-Syringe_icon.svg.png",
    imageAlt:
      "Medical syringe representing biotechnology medicine applications",
    accentOklch: "0.70 0.20 350",
    examples: [
      {
        title: "Recombinant Insulin",
        detail:
          "The first recombinant protein approved for human use (1982). Human insulin gene was cloned into E. coli, enabling cheap, scalable production for millions of diabetics worldwide — replacing animal-derived insulin.",
      },
      {
        title: "Monoclonal Antibodies",
        detail:
          "Engineered antibodies (e.g., trastuzumab for HER2+ breast cancer, adalimumab for rheumatoid arthritis) that bind a single specific antigen with high affinity. Produced in CHO cell bioreactors.",
      },
      {
        title: "Recombinant Vaccines",
        detail:
          "Hepatitis B vaccine uses a recombinant yeast-produced antigen, eliminating safety risks of blood-derived vaccines. mRNA vaccines (COVID-19) use lipid nanoparticles to deliver mRNA encoding viral proteins.",
      },
      {
        title: "Gene Therapy",
        detail:
          "Delivering functional gene copies to correct genetic disorders. Approved therapies include Zolgensma (SMA) and Luxturna (inherited retinal dystrophy), using viral vectors to restore missing function.",
      },
    ],
  },
  {
    id: "agriculture",
    icon: "🌾",
    name: "Agriculture",
    tagline: "Engineering crops for a growing world",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/24701-nature-natural-beauty.jpg/320px-24701-nature-natural-beauty.jpg",
    imageAlt: "Green crop field representing agricultural biotechnology",
    accentOklch: "0.72 0.18 142",
    examples: [
      {
        title: "Bt Crops",
        detail:
          "Bacillus thuringiensis (Bt) toxin genes introduced into corn, cotton, and soy confer insect resistance, reducing pesticide use by up to 40% while increasing yield in pest-prone regions.",
      },
      {
        title: "Herbicide-Tolerant Crops",
        detail:
          "Crops engineered to withstand broad-spectrum herbicides (e.g., glyphosate-tolerant soy) allow more efficient weed control, enabling no-till farming that reduces soil erosion.",
      },
      {
        title: "Golden Rice",
        detail:
          "Engineered with β-carotene biosynthesis genes to address Vitamin A deficiency, which causes ~500,000 cases of childhood blindness per year in developing countries.",
      },
      {
        title: "Disease-Resistant Varieties",
        detail:
          "GM papayas (ringspot virus-resistant) saved Hawaii's papaya industry in the 1990s. CRISPR-edited wheat with reduced gluten sensitivity is under development.",
      },
    ],
  },
  {
    id: "industry",
    icon: "🏭",
    name: "Industry",
    tagline: "Cleaner production through biology",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Enzymes_lock_and_key.svg/320px-Enzymes_lock_and_key.svg.png",
    imageAlt:
      "Enzyme lock and key diagram representing industrial biotechnology",
    accentOklch: "0.70 0.18 210",
    examples: [
      {
        title: "Biofuels",
        detail:
          "Engineered microorganisms (yeast, algae, bacteria) ferment agricultural waste and biomass into bioethanol and biodiesel. Cellulosic ethanol uses fungal cellulases to break down plant cell walls.",
      },
      {
        title: "Industrial Enzymes",
        detail:
          "Recombinant enzymes in laundry detergents (proteases, lipases, amylases) work at low temperatures, saving energy. Over 500 industrial enzymes are produced via microbial fermentation.",
      },
      {
        title: "Bioplastics",
        detail:
          "Polyhydroxyalkanoates (PHAs) produced by engineered bacteria offer biodegradable alternatives to petroleum-based plastics, breaking down in soil within months vs. hundreds of years.",
      },
      {
        title: "Mining & Materials",
        detail:
          "Bioleaching uses Acidithiobacillus bacteria to extract copper, gold, and uranium from low-grade ores — an eco-friendlier alternative to smelting, now recovering ~15% of global copper.",
      },
    ],
  },
  {
    id: "environment",
    icon: "🌍",
    name: "Environment",
    tagline: "Harnessing biology to heal ecosystems",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/240px-The_Earth_seen_from_Apollo_17.jpg",
    imageAlt: "Earth from space representing environmental biotechnology",
    accentOklch: "0.72 0.18 172",
    examples: [
      {
        title: "Bioremediation",
        detail:
          "Microorganisms degrade pollutants in contaminated soil and water. Pseudomonas and Rhodococcus species break down petroleum hydrocarbons; Geobacter reduces uranium to insoluble forms, containing radioactive contamination.",
      },
      {
        title: "Wastewater Treatment",
        detail:
          "Activated sludge bioreactors use microbial communities to remove organic waste, nitrogen, and phosphorus from sewage. Engineered biofilms now achieve >99% removal of key pollutants.",
      },
      {
        title: "Biosensors for Monitoring",
        detail:
          "Genetically engineered whole-cell biosensors (bacteria expressing reporter genes) detect heavy metals, pesticides, and toxins in water and soil at nanomolar concentrations.",
      },
      {
        title: "Plastic-Degrading Enzymes",
        detail:
          "PETase enzyme (discovered in Ideonella sakaiensis) and engineered FAST-PETase variant break down PET plastics at room temperature, offering a biological recycling route for plastic waste.",
      },
    ],
  },
];

// ─── Application category card ─────────────────────────────────────────────────

interface AppCardProps {
  category: AppCategory;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

function AppCard({ category, isExpanded, onToggle, index }: AppCardProps) {
  const accent = category.accentOklch;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "oklch(0.17 0.03 262)",
        border: `1px solid oklch(${isExpanded ? accent : GREEN_BORDER})`,
        boxShadow: isExpanded
          ? `0 0 28px oklch(${accent} / 0.18)`
          : `0 0 12px oklch(${GREEN} / 0.06)`,
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Card header / trigger */}
      <button
        type="button"
        className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={
          {
            "--tw-ring-color": `oklch(${GREEN})`,
            "--tw-ring-offset-color": "oklch(0.13 0.06 262)",
          } as React.CSSProperties
        }
        aria-expanded={isExpanded}
        aria-controls={`category-details-${category.id}`}
        id={`category-btn-${category.id}`}
        onClick={onToggle}
        data-ocid={`category-card-${category.id}`}
      >
        <motion.div
          className="flex items-center gap-4 p-5"
          whileHover={{ scale: 1.015 }}
          whileFocus={{ scale: 1.015 }}
          transition={{ duration: 0.2 }}
        >
          {/* Image */}
          <div
            className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
            style={{
              background: `oklch(${accent} / 0.12)`,
              border: `1px solid oklch(${accent} / 0.3)`,
            }}
          >
            <img
              src={category.imageUrl}
              alt={category.imageAlt}
              className="w-full h-full object-contain p-1"
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/assets/images/placeholder.svg";
              }}
            />
          </div>

          {/* Text info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl" role="img" aria-hidden="true">
                {category.icon}
              </span>
              <h3
                className="font-display font-bold text-lg leading-tight"
                style={{ color: `oklch(${accent})` }}
              >
                {category.name}
              </h3>
              <span
                className="ml-auto rounded-full px-2.5 py-0.5 text-xs font-semibold hidden sm:inline-flex"
                style={{
                  background: `oklch(${accent} / 0.15)`,
                  color: `oklch(${accent})`,
                  border: `1px solid oklch(${accent} / 0.35)`,
                }}
              >
                {category.examples.length} examples
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-snug">
              {category.tagline}
            </p>
          </div>

          {/* Expand icon */}
          <div
            className="flex-shrink-0 ml-2"
            style={{ color: `oklch(${accent})` }}
            aria-hidden="true"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>
        </motion.div>
      </button>

      {/* Expanded details */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.section
            id={`category-details-${category.id}`}
            aria-labelledby={`category-btn-${category.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-5 pt-1"
              style={{
                borderTop: `1px solid oklch(${accent} / 0.2)`,
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {category.examples.map((ex, i) => (
                  <motion.div
                    key={ex.title}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="rounded-xl p-4"
                    style={{
                      background: `oklch(${accent} / 0.08)`,
                      border: `1px solid oklch(${accent} / 0.2)`,
                    }}
                  >
                    <h4
                      className="font-semibold text-sm mb-1.5"
                      style={{ color: `oklch(${accent})` }}
                    >
                      {ex.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {ex.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Quiz questions ─────────────────────────────────────────────────────────────

const BIOTECH_APP_QUIZ: QuizQuestion[] = [
  {
    id: "bta1",
    topic: "biotech-applications",
    question:
      "Recombinant human insulin, the first biotech drug approved for human use, was produced using which host organism?",
    options: [
      "Chinese Hamster Ovary (CHO) cells",
      "Saccharomyces cerevisiae yeast",
      "Escherichia coli bacteria",
      "Tobacco plant cells",
    ],
    correctIndex: 2,
    explanation:
      "The first recombinant insulin (Humulin, 1982) was produced in Escherichia coli by inserting the human insulin gene. This was a landmark in biotechnology, replacing animal-derived insulin and making production far more scalable.",
  },
  {
    id: "bta2",
    topic: "biotech-applications",
    question:
      "What is the primary purpose of a monoclonal antibody in medicine?",
    options: [
      "To replicate DNA in laboratory settings",
      "To bind specifically to a single antigen target with high precision",
      "To synthesize recombinant proteins in bacteria",
      "To deliver mRNA into human cells",
    ],
    correctIndex: 1,
    explanation:
      "Monoclonal antibodies are engineered to bind one specific antigen target. This precision enables their use as cancer therapies (e.g., trastuzumab targeting HER2), autoimmune treatments, and diagnostics.",
  },
  {
    id: "bta3",
    topic: "biotech-applications",
    question:
      "GM crops expressing Bt toxin genes primarily provide what benefit?",
    options: [
      "Increased vitamin content for human nutrition",
      "Resistance to herbicide chemicals",
      "Protection against insect pests, reducing pesticide use",
      "Enhanced drought tolerance",
    ],
    correctIndex: 2,
    explanation:
      "Bt (Bacillus thuringiensis) toxin genes confer insect resistance — crops like Bt corn and Bt cotton produce proteins that are toxic to specific insect pests, reducing the need for chemical pesticides by up to 40%.",
  },
  {
    id: "bta4",
    topic: "biotech-applications",
    question:
      "Golden Rice was engineered to address which specific nutritional deficiency in developing countries?",
    options: [
      "Vitamin C (ascorbic acid) deficiency",
      "Iron (Fe) deficiency anemia",
      "Vitamin A deficiency causing childhood blindness",
      "Calcium deficiency causing rickets",
    ],
    correctIndex: 2,
    explanation:
      "Golden Rice was engineered to produce β-carotene (a Vitamin A precursor) to address Vitamin A deficiency, which causes up to 500,000 cases of childhood blindness per year in regions that depend heavily on rice.",
  },
  {
    id: "bta5",
    topic: "biotech-applications",
    question: "Bioremediation refers to which environmental process?",
    options: [
      "Using radiation to sterilize contaminated soil",
      "Using microorganisms to degrade or detoxify environmental pollutants",
      "Filtering industrial wastewater through chemical membranes",
      "Burning contaminated biomass to reduce waste volume",
    ],
    correctIndex: 1,
    explanation:
      "Bioremediation uses naturally occurring or engineered microorganisms to break down or neutralize pollutants such as petroleum hydrocarbons, heavy metals, and industrial chemicals in contaminated soil and water.",
  },
  {
    id: "bta6",
    topic: "biotech-applications",
    question: "Gene therapy works by:",
    options: [
      "Removing defective genes with surgical procedures",
      "Delivering functional copies of genes to correct genetic disorders",
      "Editing genes using restriction enzymes only",
      "Stimulating the immune system with recombinant proteins",
    ],
    correctIndex: 1,
    explanation:
      "Gene therapy delivers functional gene copies (often via viral vectors) to cells with missing or defective genes. Approved therapies like Zolgensma (SMA) and Luxturna (retinal dystrophy) have shown dramatic therapeutic benefits.",
  },
  {
    id: "bta7",
    topic: "biotech-applications",
    question:
      "Which microorganism is most commonly used in cellulosic biofuel production?",
    options: [
      "Clostridium botulinum",
      "Fungi producing cellulase enzymes (e.g., Trichoderma reesei)",
      "Helicobacter pylori",
      "Mycobacterium tuberculosis",
    ],
    correctIndex: 1,
    explanation:
      "Cellulosic biofuel production requires cellulase enzymes to break down cellulose in plant biomass. Trichoderma reesei and related fungi are major producers of commercial cellulases used in second-generation biofuel processes.",
  },
  {
    id: "bta8",
    topic: "biotech-applications",
    question:
      "Polyhydroxyalkanoates (PHAs) are biotechnology products important for which application?",
    options: [
      "Cancer immunotherapy",
      "Biodegradable plastic alternatives",
      "Recombinant vaccine production",
      "Water purification membranes",
    ],
    correctIndex: 1,
    explanation:
      "PHAs are biodegradable polyesters produced by engineered bacteria. They serve as sustainable alternatives to petroleum-based plastics, decomposing in soil within months rather than centuries.",
  },
  {
    id: "bta9",
    topic: "biotech-applications",
    question:
      "Which technology uses biological agents to extract metals from low-grade ores?",
    options: [
      "Biomagnification",
      "Bioleaching",
      "Bioprecipitation",
      "Biosedimentation",
    ],
    correctIndex: 1,
    explanation:
      "Bioleaching uses acidophilic bacteria like Acidithiobacillus ferrooxidans to oxidize sulfide ores, releasing trapped metals (copper, gold, uranium). This eco-friendlier alternative to smelting now recovers ~15% of global copper.",
  },
  {
    id: "bta10",
    topic: "biotech-applications",
    question:
      "mRNA vaccines for COVID-19 work by introducing mRNA that encodes:",
    options: [
      "A live attenuated virus",
      "A complete viral DNA genome",
      "The viral spike protein, triggering an immune response",
      "An antibody that directly neutralizes the virus",
    ],
    correctIndex: 2,
    explanation:
      "COVID-19 mRNA vaccines (Pfizer-BioNTech, Moderna) deliver lipid nanoparticle-encapsulated mRNA encoding the viral spike protein. Host cells translate this mRNA, producing spike protein that trains the immune system to recognize and fight the virus.",
  },
];

// ─── Explanation paragraphs ────────────────────────────────────────────────────

const EXPLANATIONS = [
  {
    id: "overview",
    heading:
      "Biotechnology Applications: Transforming Every Sector of Human Life",
    body: `Biotechnology — the use of living systems, organisms, or their derivatives to develop products and processes — has evolved from a laboratory curiosity into one of the most impactful industries on Earth. From the first recombinant insulin produced in 1982 to mRNA vaccines deployed globally against COVID-19, biotechnology has repeatedly demonstrated its power to solve problems that conventional chemistry and engineering could not. Today, the global biotechnology market exceeds $1 trillion and spans medicine, agriculture, industry, and environmental management. Every sector benefits from biology's unique ability to work at the molecular level with extraordinary precision.

The breadth of biotechnology applications reflects biology's versatility. A single enzyme discovered in a deep-sea vent organism can revolutionize molecular diagnostics (Taq polymerase from Thermus aquaticus enabling PCR). A bacterial gene can save thousands of acres of crops from insect damage. A engineered microorganism can digest oil spills or extract metals from waste rock. Understanding these applications not only illuminates the power of biotechnology but also raises important questions about regulation, ethics, and equitable access — questions that every biotechnology student must grapple with.`,
  },
  {
    id: "medicine",
    heading: "Medical Biotechnology: Engineering Molecules to Fight Disease",
    body: `Medical biotechnology has produced some of the most transformative therapies in the history of medicine. Recombinant DNA technology, pioneered in the 1970s and 1980s, enabled researchers to insert human genes into microbial or mammalian cell factories, producing human proteins that were previously available only in tiny amounts from donor tissues. Recombinant human insulin (Humulin, 1982) was the first example — produced by engineering the human insulin gene into E. coli, it replaced animal-derived insulin for millions of diabetics and set the template for an industry.

Monoclonal antibodies represent perhaps the most powerful and versatile class of biotechnology drugs. Produced by immortalized hybridoma cells or, more recently, by Chinese Hamster Ovary (CHO) bioreactors, monoclonal antibodies can be engineered to bind any molecular target with exquisite specificity. Trastuzumab (Herceptin) targets the HER2 receptor overexpressed in ~20% of breast cancers. Adalimumab (Humira) blocks TNF-α signaling in rheumatoid arthritis and Crohn's disease. Over 100 monoclonal antibody therapies are now approved, representing the largest class of biopharmaceuticals by revenue. Beyond proteins, biotechnology has enabled entirely new modalities: gene therapy, which delivers functional genes to correct inherited disorders, and mRNA vaccines, which instruct cells to produce antigens and mount immune responses without any viral particles.`,
  },
  {
    id: "agriculture",
    heading: "Agricultural Biotechnology: Engineering Crops for a Hungry World",
    body: `Agricultural biotechnology uses genetic modification, tissue culture, molecular markers, and increasingly CRISPR-based editing to improve crop traits. The most widely adopted GM crops globally are insect-resistant Bt crops (expressing Bacillus thuringiensis toxin genes) and herbicide-tolerant crops (expressing genes that neutralize broad-spectrum herbicides). Bt corn and Bt cotton have reduced insecticide applications by hundreds of millions of kilograms annually and increased yields significantly in countries where insect pests previously caused catastrophic losses. Herbicide-tolerant crops enable no-till farming, which reduces soil erosion and fuel use.

Beyond these first-generation trait modifications, agricultural biotechnology is producing crops with enhanced nutritional profiles, improved stress tolerance, and reduced allergenicity. Golden Rice — engineered to produce β-carotene in the grain endosperm — targets Vitamin A deficiency, which the WHO estimates causes preventable blindness in up to half a million children annually. Drought-tolerant maize varieties (developed using both conventional breeding assisted by molecular markers and transgenic approaches) are being deployed across sub-Saharan Africa. Disease-resistant crops, including GM papaya varieties that saved Hawaii's papaya industry from the ringspot virus in the 1990s, demonstrate biotechnology's ability to solve problems that conventional breeding cannot. The ongoing debate around GM crops centers not on scientific consensus about safety but on governance, intellectual property, and socioeconomic equity.`,
  },
  {
    id: "industrial",
    heading:
      "Industrial Biotechnology: Bio-Based Manufacturing for a Sustainable Future",
    body: `Industrial biotechnology — sometimes called the "white biotechnology" sector — applies biological systems to manufacturing, replacing energy-intensive chemical processes with enzymatic reactions that work at ambient temperature and pressure with high specificity. Industrial enzymes are the workhorses of this sector: proteases, lipases, amylases, and cellulases produced in microbial fermenters are added to detergents, textiles, paper, food, and biofuel production processes. Modern laundry detergents contain engineered enzyme cocktails that remove protein, fat, and starch stains at cold-water temperatures, reducing household energy consumption by an estimated 60% compared to hot-water washing.

Biofuels represent one of industrial biotechnology's largest markets. First-generation bioethanol (from corn starch or sugarcane sucrose) and biodiesel (from vegetable oils or algae lipids) are now blended into transportation fuels globally. Second-generation cellulosic biofuels go further, using engineered cellulases and hemicellulases to unlock the energy stored in agricultural residues (corn stover, wheat straw) that would otherwise be burned or left in fields. Engineered microorganisms — bacteria, yeast, and algae — are being developed to produce jet fuel, plastics precursors, and specialty chemicals directly from CO₂ or agricultural waste. Bioplastics, particularly polyhydroxyalkanoates (PHAs) produced by bacterial fermentation, offer a biodegradable alternative to petroleum-derived plastics, a critical development as plastic pollution reaches every corner of the biosphere.`,
  },
  {
    id: "environment",
    heading:
      "Environmental Biotechnology: Biology as a Tool for Ecological Restoration",
    body: `Environmental biotechnology harnesses the metabolic capabilities of microorganisms to address pollution, waste treatment, and ecological monitoring. Bioremediation — using bacteria, fungi, or plants to break down or immobilize contaminants — has been applied successfully to petroleum-contaminated soil (Exxon Valdez spill response), chlorinated solvent plumes in groundwater (reductive dechlorination by Dehalococcoides species), and even radioactive metals (uranium immobilization by Geobacter sulfurreducens). The fundamental advantage of bioremediation over chemical treatments is that microorganisms can seek out contaminants, reproduce to match the substrate supply, and in many cases mineralize pollutants completely to CO₂ and water.

Modern wastewater treatment plants are sophisticated biological systems. Activated sludge bioreactors use diverse microbial communities to remove organic matter, nitrogen (via nitrification and denitrification), and phosphorus from municipal and industrial wastewater. Anaerobic digestion converts organic waste into biogas (methane and CO₂), providing both pollution control and renewable energy. Looking further into the future, synthetic biology is enabling designer organisms: bacteria with inducible reporter genes that glow in the presence of specific heavy metals, serving as biosensors for environmental monitoring; engineered algae that absorb excess phosphorus from agricultural runoff; and enzymes like PETase, discovered in Ideonella sakaiensis and now dramatically improved by directed evolution, that break down PET plastic into reusable monomers — offering a biological path to solving the global plastic crisis.`,
  },
  {
    id: "future",
    heading:
      "The Future of Biotechnology Applications: Challenges and Prospects",
    body: `The next decade of biotechnology applications will be shaped by the convergence of several enabling technologies: CRISPR-based gene editing (enabling precise, affordable modification of any genome), synthetic biology (engineering entire biological pathways and circuits from scratch), artificial intelligence (accelerating protein structure prediction, drug discovery, and process optimization), and advanced biomanufacturing (continuous fermentation, cell-free systems, and organoid models). These technologies are being combined in ways that were science fiction a decade ago: AI-designed proteins being synthesized by engineered microbes, personalized cancer vaccines produced using tumor genomics data, and organisms engineered to produce any target molecule with unprecedented efficiency.

Ethical, regulatory, and equity considerations are inseparable from the technical story of biotechnology. Who owns the intellectual property of engineered crop genomes? How should gene therapies that cost millions of dollars per dose be made accessible globally? What biosafety measures should govern the release of engineered organisms into the environment? These are not abstract philosophical questions — they determine whether biotechnology's benefits are distributed equitably or captured only by wealthy nations and corporations. Biotechnology students who understand both the science and these broader dimensions will be best equipped to contribute meaningfully to the field and to the governance structures that ensure its responsible development for all of humanity.`,
  },
];

// ─── Main section ──────────────────────────────────────────────────────────────

export default function BiotechApplicationsSection() {
  const [expandedId, setExpandedId] = useState<string | null>("medicine");

  function handleToggle(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <section
      className="px-6 py-16 max-w-5xl mx-auto"
      data-ocid="biotech-applications-section"
    >
      {/* Header */}
      <SectionHeader
        topicId="biotech-applications"
        title="Biotechnology Applications"
        subtitle="From engineered insulin to biofuels and biodegradable plastics — discover how biotechnology is solving humanity's greatest challenges across medicine, agriculture, industry, and the environment."
      />

      {/* Interactive application category cards */}
      <AnimatedEntrance direction="up" delay={0.1}>
        <div className="mb-14">
          <h3
            className="font-display text-xl font-semibold mb-2"
            style={{ color: `oklch(${GREEN})` }}
          >
            🔬 Application Categories
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Click a category to explore specific examples and real-world
            applications. Use{" "}
            <kbd
              className="rounded px-1.5 py-0.5 text-xs font-mono"
              style={{
                background: `oklch(${GREEN_DIM})`,
                color: `oklch(${GREEN})`,
                border: `1px solid oklch(${GREEN_BORDER})`,
              }}
            >
              Tab
            </kbd>{" "}
            to navigate,{" "}
            <kbd
              className="rounded px-1.5 py-0.5 text-xs font-mono"
              style={{
                background: `oklch(${GREEN_DIM})`,
                color: `oklch(${GREEN})`,
                border: `1px solid oklch(${GREEN_BORDER})`,
              }}
            >
              Enter
            </kbd>{" "}
            to expand.
          </p>

          <ul
            className="flex flex-col gap-4"
            aria-label="Biotechnology application categories"
          >
            {CATEGORIES.map((cat, i) => (
              <li key={cat.id}>
                <AppCard
                  category={cat}
                  isExpanded={expandedId === cat.id}
                  onToggle={() => handleToggle(cat.id)}
                  index={i}
                />
              </li>
            ))}
          </ul>
        </div>
      </AnimatedEntrance>

      {/* Deep explanations */}
      <StaggerContainer
        className="flex flex-col gap-8 mb-16"
        staggerDelay={0.09}
      >
        {EXPLANATIONS.map((section) => (
          <StaggerItem key={section.id}>
            <div
              className="rounded-2xl p-7"
              style={{
                background: "oklch(0.17 0.03 262)",
                border: `1px solid oklch(${GREEN_BORDER})`,
                boxShadow: `0 0 24px oklch(${GREEN} / 0.05)`,
              }}
              data-ocid={`explanation-${section.id}`}
            >
              <h3
                className="font-display text-xl font-bold mb-4"
                style={{ color: `oklch(${GREEN})` }}
              >
                {section.heading}
              </h3>
              {section.body.split("\n\n").map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-muted-foreground leading-relaxed mb-4 last:mb-0 text-[0.95rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Quiz */}
      <AnimatedEntrance direction="up" delay={0.1}>
        <div className="mb-4">
          <h3
            className="font-display text-2xl font-bold mb-2"
            style={{ color: `oklch(${GREEN})` }}
          >
            💉 Test Your Knowledge
          </h3>
          <p className="text-muted-foreground mb-6">
            10 questions covering recombinant proteins, GM crops,
            bioremediation, gene therapy, biofuels, and more.
          </p>
          <QuizEngine
            topicId="biotech-applications"
            questions={BIOTECH_APP_QUIZ}
          />
        </div>
      </AnimatedEntrance>
    </section>
  );
}
