import {
  AnimatedEntrance,
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedEntrance";
import { QuizEngine } from "@/components/QuizEngine";
import { SceneErrorBoundary } from "@/components/SceneErrorBoundary";
import { SectionHeader } from "@/components/SectionHeader";
import { DNAScene } from "@/sections/DNAScene";
import { ReplicationFork } from "@/sections/ReplicationFork";
import type { QuizQuestion } from "@/types/biology";
import { Suspense } from "react";

const DNA_QUIZ: QuizQuestion[] = [
  {
    id: "dna-1",
    question:
      "What is the key structural difference between B-DNA, A-DNA, and Z-DNA conformations?",
    options: [
      "B-DNA is left-handed; A-DNA and Z-DNA are right-handed double helices",
      "B-DNA is the most common right-handed helix (10 bp/turn); A-DNA is a wider right-handed helix (11 bp/turn) found in dehydrated conditions or RNA:DNA hybrids; Z-DNA is left-handed (12 bp/turn) with a zigzag backbone",
      "All three are identical in structure but differ only in the base pair sequence they contain",
      "A-DNA is found in bacteria; B-DNA in plants; Z-DNA in animals",
    ],
    correctIndex: 1,
    explanation:
      "Great question! Most DNA in your cells exists as B-DNA — the classic Watson-Crick right-handed helix with ~10 base pairs per turn and a characteristic major/minor groove pattern. A-DNA forms when DNA is dehydrated or when one strand is RNA (as in RNA-DNA hybrids during transcription) — it's wider and shorter than B-DNA. Z-DNA is the odd one out: a left-handed helix with a zigzag phosphate backbone (the 'Z' refers to this zigzag). It forms in GC-rich sequences under torsional stress and may play roles in regulating transcription by serving as a recognition signal for certain proteins. The takeaway: DNA's structure isn't fixed — it can dynamically change conformation depending on local conditions.",
    topic: "dna",
  },
  {
    id: "dna-2",
    question:
      "During DNA replication, what problem does topoisomerase solve, and how?",
    options: [
      "Topoisomerase synthesizes the RNA primers needed by DNA polymerase to start replication",
      "Topoisomerase joins Okazaki fragments on the lagging strand by sealing nicks",
      "As helicase unwinds the helix at the fork, positive supercoiling builds up ahead of it — topoisomerase I and II relieve this torsional stress by transiently cutting and rejoining the DNA strands",
      "Topoisomerase removes the histone proteins from nucleosomes to expose DNA for replication",
    ],
    correctIndex: 2,
    explanation:
      "Picture unwinding a coiled telephone cord — the more you unwind at one end, the more tightly twisted it gets further along. That's exactly what happens ahead of a replication fork: helicase unwinds the double helix, but the rotational stress has to go somewhere, and it builds up as positive supercoils ahead. Topoisomerase I cuts one strand, allows controlled rotation to release the stress, and reseals the cut. Topoisomerase II cuts both strands, passes another duplex segment through the break, and reseals. This is also why many antibiotics and chemotherapy drugs target topoisomerases — bacterial DNA gyrase (a type II topoisomerase) is targeted by fluoroquinolone antibiotics; human topoisomerase II is targeted by chemotherapy drugs like doxorubicin.",
    topic: "dna",
  },
  {
    id: "dna-3",
    question:
      "What is the Meselson-Stahl experiment, and what did it prove about DNA replication?",
    options: [
      "It proved that DNA is double-stranded by using X-ray crystallography",
      "It proved semi-conservative replication by growing bacteria in heavy ¹⁵N medium then switching to ¹⁴N, showing each new DNA molecule has one old strand and one new strand via density-gradient centrifugation",
      "It proved that DNA polymerase synthesizes DNA in the 3' to 5' direction",
      "It disproved the RNA World hypothesis by showing DNA came before RNA",
    ],
    correctIndex: 1,
    explanation:
      "The Meselson-Stahl experiment (1958) is often called the most elegant experiment in molecular biology. They grew E. coli in ¹⁵N (heavy nitrogen) medium until all DNA was heavy, then switched to ¹⁴N (normal) medium. After one generation, all DNA was intermediate density — consistent with semi-conservative replication where each new double helix has one old heavy strand and one new light strand. After two generations, they saw both intermediate and light density DNA — exactly what semi-conservative replication predicts. This elegantly ruled out conservative replication (which would show only heavy and light) and dispersive replication (which would show all intermediate after two generations).",
    topic: "dna",
  },
  {
    id: "dna-4",
    question:
      "What is the difference between nucleosome, 30nm fiber, and chromosome — how does DNA go from 2 meters to fitting in a nucleus?",
    options: [
      "DNA is compressed by being chemically shortened — no structural proteins are needed",
      "DNA wraps around histone octamers to form nucleosomes (beads on a string), nucleosomes coil into 30nm fibers, fibers form loops anchored to protein scaffolds, and loops are further organized into chromosome territories within the nucleus",
      "DNA compression only occurs during cell division; the rest of the time it's fully uncoiled",
      "All compression is accomplished by topoisomerases that tie DNA into knots",
    ],
    correctIndex: 1,
    explanation:
      "This packaging hierarchy is one of the most impressive feats of cellular engineering. Level 1: ~147 bp of DNA wraps 1.67 times around a histone octamer (two copies each of H2A, H2B, H3, and H4) to form a nucleosome, like beads on a string — already achieving ~7-fold compaction. Level 2: H1 linker histones help nucleosome arrays fold into a ~30nm chromatin fiber (~50-fold compaction total). Level 3: loops of 30nm fiber anchor to a protein scaffold to form rosettes (~1,000-fold compaction). Level 4: further coiling and condensation during mitosis achieves ~10,000-fold compaction into visible chromosomes. Open, transcriptionally active regions are euchromatin; silenced, tightly packed regions are heterochromatin. The extent of packing directly controls gene accessibility.",
    topic: "dna",
  },
  {
    id: "dna-5",
    question:
      "What are the three main DNA repair pathways, and what types of damage does each correct?",
    options: [
      "Nucleotide excision repair (NER) fixes UV-induced pyrimidine dimers and bulky adducts; base excision repair (BER) corrects small base damage and oxidation; mismatch repair (MMR) corrects replication errors — wrong bases or small insertions/deletions",
      "All DNA damage is repaired by a single universal repair pathway regardless of damage type",
      "Only mitochondrial DNA has repair mechanisms; nuclear DNA relies entirely on proofreading by polymerase",
      "NER corrects insertions; BER corrects deletions; MMR corrects transversions only",
    ],
    correctIndex: 0,
    explanation:
      "DNA repair is one of the most critical — and clinically relevant — aspects of molecular biology. Nucleotide excision repair (NER) is like a molecular cut-and-paste: it recognizes bulky distortions (UV-induced thymine dimers, chemical adducts), cuts out a ~25-30 nucleotide patch around the damage, and synthesizes new DNA. Defective NER causes xeroderma pigmentosum — extreme UV sensitivity with very high skin cancer risk. Base excision repair (BER) handles smaller damage: oxidized bases (8-oxoguanine from reactive oxygen species), deaminated cytosine, or abasic sites — a glycosylase removes the damaged base, leaving an AP site for further processing. Mismatch repair (MMR) corrects replication errors that escaped polymerase proofreading, identifying the newly synthesized strand and fixing mismatches. Inherited MMR gene mutations (MLH1, MSH2, MSH6, PMS2) cause Lynch syndrome — significantly elevated risk of colorectal, endometrial, and other cancers.",
    topic: "dna",
  },
  {
    id: "dna-6",
    question:
      "What is epigenetic regulation via DNA methylation, and what is a CpG island?",
    options: [
      "DNA methylation physically breaks phosphodiester bonds to silence genes",
      "DNA methylation (addition of a methyl group to cytosine, typically at CpG dinucleotides) is a heritable gene silencing mark; CpG islands are CpG-rich promoter regions that, when methylated, silence gene expression — involved in X-inactivation, imprinting, and cancer",
      "DNA methylation is identical to histone acetylation and has the same effect on gene expression",
      "CpG islands only exist in mitochondrial DNA and have no role in nuclear gene regulation",
    ],
    correctIndex: 1,
    explanation:
      "Epigenetics is about heritable changes in gene expression that don't change the DNA sequence itself. DNA methyltransferases (DNMTs) add a methyl group to the 5' carbon of cytosine, specifically at CpG dinucleotides. Methylated CpGs in promoter regions are associated with gene silencing — methyl-CpG binding proteins recruit repressor complexes. CpG islands are regions with unusually high CpG frequency, often found at gene promoters; when unmethylated, they're usually associated with active genes. In cancer, tumor suppressor gene promoters often become hypermethylated (silenced), while overall genome hypomethylation promotes chromosomal instability. X-chromosome inactivation in females involves methylating one X chromosome's genes. Genomic imprinting (where only the maternal or paternal copy of a gene is expressed) is also controlled by differential methylation.",
    topic: "dna",
  },
  {
    id: "dna-7",
    question:
      "What is the difference between a transition and a transversion mutation?",
    options: [
      "Transitions change a purine to a pyrimidine or vice versa; transversions change one purine to another purine or one pyrimidine to another pyrimidine",
      "Transitions change one base for another of the same type (purine→purine or pyrimidine→pyrimidine); transversions swap a purine for a pyrimidine or vice versa",
      "Transitions occur only in coding regions; transversions occur only in introns",
      "Transitions are always silent mutations; transversions always change the amino acid",
    ],
    correctIndex: 1,
    explanation:
      "Point mutations come in two flavors. Transitions maintain the structural type: A↔G (both purines) or C↔T (both pyrimidines). They're more common because the base structures are more similar, making them easier for polymerases to accidentally introduce. Transversions swap structural types: A/G (purine) ↔ C/T (pyrimidine). There are 4 possible transitions but 8 possible transversions — yet transitions actually occur more frequently in genomes. Neither is automatically silent or missense; that depends on the codon position affected. The clinically famous transition is C→T at methylated CpG sites (deamination of 5-methylcytosine produces thymine), which is the most common single-nucleotide change in human genetic disease.",
    topic: "dna",
  },
  {
    id: "dna-8",
    question:
      "What role do telomeres and telomerase play in chromosome stability and cancer?",
    options: [
      "Telomeres are the centromeric regions; telomerase synthesizes them during S phase alongside normal replication",
      "Telomeres are repetitive sequences (TTAGGG in humans) protecting chromosome ends from degradation and fusion; they shorten with each replication cycle because DNA polymerase can't fully copy the ends — telomerase (a ribonucleoprotein) extends them in germ cells and stem cells but is silenced in most somatic cells",
      "Telomerase is identical to DNA ligase and simply seals the ends of chromosomes",
      "Telomeres have no role in cancer — they only affect aging in model organisms",
    ],
    correctIndex: 1,
    explanation:
      "Telomeres are fascinating molecular clocks. Human telomeres are thousands of repeats of TTAGGG forming T-loop structures capped by a protein complex called shelterin, preventing chromosome ends from being 'seen' as double-strand breaks. Every replication cycle, the lagging strand's final Okazaki fragment can't be primed all the way to the end, causing progressive shortening — the 'end replication problem.' In most somatic cells, when telomeres become critically short, p53 triggers senescence or apoptosis. Telomerase (a reverse transcriptase carrying its own RNA template) extends telomeres in germ cells, stem cells, and — crucially — ~90% of cancer cells. Cancer cells reactivate telomerase to achieve replicative immortality. This makes telomerase an attractive cancer drug target; conversely, short telomeres are linked to aging, premature aging syndromes (dyskeratosis congenita), and fibrosis.",
    topic: "dna",
  },
  {
    id: "dna-9",
    question:
      "During replication, what is the proofreading function of DNA polymerase and what error rate does it achieve?",
    options: [
      "DNA polymerase has no proofreading ability — all errors are corrected post-replication by mismatch repair",
      "DNA polymerase III has a 3'→5' exonuclease activity that excises incorrectly incorporated bases during synthesis, achieving ~1 error per 10⁷ nucleotides — and with post-replication mismatch repair, the final error rate is ~1 per 10⁹",
      "DNA polymerase proofreads by synthesizing RNA primers that flag incorrect bases",
      "Proofreading is performed by the sliding clamp, not by the polymerase itself",
    ],
    correctIndex: 1,
    explanation:
      "The accuracy of DNA replication is breathtaking. On its own, base pairing would give about 1 error in 10⁴ bases. DNA polymerase III adds a major improvement: its 3'→5' exonuclease domain acts as a built-in proofreader — if the wrong base is incorporated, the enzyme stalls, backs up, clips out the mismatch, and tries again, reducing errors to ~1 in 10⁷. Mismatch repair (MMR) sweeps up remaining errors afterward, achieving the final remarkable accuracy of ~1 error per 10⁹ base pairs. For context, copying the 3.2-billion-bp human genome means about 3 errors per genome per cell division — most of those in non-coding regions, and most corrected by repair. When MMR is defective, error rates skyrocket, leading to the 'microsatellite instability' signature seen in Lynch syndrome-related cancers.",
    topic: "dna",
  },
  {
    id: "dna-10",
    question:
      "What is the difference between double-strand break repair via homologous recombination (HR) and non-homologous end joining (NHEJ)?",
    options: [
      "HR and NHEJ are identical processes that differ only in the proteins used",
      "HR uses a homologous template (usually the sister chromatid) for accurate repair and is active mainly in S/G2 phase; NHEJ directly ligates the broken ends without a template and is active throughout the cell cycle but is error-prone, often causing small insertions or deletions",
      "NHEJ is always accurate; HR is always error-prone — NHEJ is the preferred repair pathway in rapidly dividing cells",
      "HR repairs single-strand breaks; NHEJ repairs double-strand breaks — they never handle the same type of damage",
    ],
    correctIndex: 1,
    explanation:
      "Double-strand breaks are the most dangerous DNA lesions — if left unrepaired, they cause chromosomal fragmentation. Cells have two main repair choices. Homologous recombination (HR) is like having a photocopy to work from: it uses the sister chromatid as a precise template, resecting the broken ends, finding homology, and synthesizing new DNA accurately. This is only possible in S and G2 phases when the sister chromatid is available. BRCA1/2 proteins are key HR players — which is why BRCA mutations dramatically increase cancer risk. Non-homologous end joining (NHEJ) is the emergency repair: it captures the broken ends, processes them (sometimes losing bases), and ligates them directly. It works throughout the cell cycle but frequently introduces small insertions or deletions at the junction. NHEJ is actually crucial for adaptive immunity — V(D)J recombination uses NHEJ-like mechanisms to generate antibody diversity by imprecisely joining gene segments.",
    topic: "dna",
  },
];

const EXPLANATION_PARAGRAPHS = [
  {
    anchorId: "dna-structure",
    title: "The Discovery That Changed Everything",
    content:
      "In 1953, Watson and Crick published a paper that began with stunning restraint: 'We wish to suggest a structure for the salt of deoxyribose nucleic acid.' Two pages long. Changed everything. Their double helix model didn't just describe a molecule — it revealed how genetic information could be stored, copied faithfully, and passed down through generations. The structure practically suggested its own replication mechanism. What made it possible was years of work by others, especially Rosalind Franklin, whose X-ray diffraction images (particularly 'Photo 51') provided critical geometric evidence for the helix. It was one of those rare moments where a single structure unlocked an entire era of science — and sparked the molecular biology revolution.",
  },
  {
    anchorId: "dna-nucleotides",
    title: "Building Blocks: What a Nucleotide Actually Is",
    content:
      "DNA is a polymer — a long chain of repeating units called nucleotides. Each nucleotide is a three-part package: a five-carbon deoxyribose sugar, a phosphate group, and one of four nitrogenous bases — adenine (A), thymine (T), guanine (G), or cytosine (C). The 'deoxy' in deoxyribose tells you that this sugar lacks an –OH group at the 2' carbon, which RNA's ribose has. That one difference makes DNA more chemically stable, which is why DNA evolved as the long-term genetic archive. Nucleotides chain together through phosphodiester bonds — the phosphate connecting one nucleotide's 3' carbon to the next's 5' carbon — forming the sugar-phosphate backbone. Bases are divided into purines (adenine and guanine — double-ring) and pyrimidines (cytosine and thymine — single-ring). This size difference is why base pairing is always purine-pyrimidine: the helix maintains a uniform width throughout.",
  },
  {
    anchorId: "dna-types",
    title: "Three DNA Conformations: B, A, and Z",
    content:
      "The double helix isn't locked into one rigid form. B-DNA is the most common conformation in aqueous cellular conditions — a right-handed helix with ~10 base pairs per turn, a helical rise of 3.4 Å per base pair, and the characteristic wide major groove and narrow minor groove. A-DNA forms when DNA is dehydrated or in RNA-DNA hybrids — it's also right-handed but shorter and wider, with ~11 bp per turn and more tilted base pairs. It also forms in the catalytic center of RNA polymerases during transcription.\n\nZ-DNA is the exotic outlier: a left-handed helix with a zigzag backbone (hence 'Z'), ~12 bp per turn, and a single deep groove instead of major/minor grooves. It forms preferentially in GC-rich sequences under torsional stress (like the negative supercoiling behind a moving RNA polymerase). Z-DNA binding proteins (like ADAR1) recognize and bind Z-DNA, suggesting it plays regulatory roles in transcription and may be involved in innate immune responses. The ability to switch between conformations gives DNA a repertoire of structural signals beyond its sequence.",
  },
  {
    anchorId: "dna-packaging",
    title: "DNA Packaging: From Nucleosomes to Chromosomes",
    content:
      "The human genome's 3.2 billion base pairs would stretch about 2 meters if laid end-to-end — yet it fits into a nucleus about 6–10 micrometers across. This requires a hierarchy of packaging so elegant it genuinely evokes admiration. At the first level, 147 bp of DNA wraps 1.67 times around a histone octamer (two copies each of H2A, H2B, H3, H4) to form a nucleosome — the 'bead' in the famous 'beads on a string' image. Linker histone H1 sits between nucleosomes, and linker DNA (~20–50 bp) connects adjacent beads. This alone achieves ~7-fold compaction.\n\nNucleosomes stack into a 30nm fiber (roughly 50-fold compaction), then form loops anchored to a protein scaffold, then further coil into the compact chromosomes visible during mitosis (~10,000-fold compaction total). But here's the key insight: chromatin structure regulates gene expression. Euchromatin (open, loosely packed) marks actively transcribed regions — accessible to RNA polymerase and transcription factors. Heterochromatin (tightly packed) marks silenced regions — constitutive heterochromatin (like centromeres and telomeres) is always compacted; facultative heterochromatin is silenced in a cell-type-specific way (like the inactivated X chromosome in females, called a Barr body). Histone modifications (acetylation, methylation, phosphorylation) and chromatin remodeling complexes constantly adjust this packaging.",
  },
  {
    anchorId: "dna-replication",
    title: "Replication: How DNA Copies Itself with Astonishing Accuracy",
    content:
      "Every cell division requires copying the entire genome — ~3.2 billion base pairs in humans — with an error rate of about 1 mistake per billion bases. Replication is semi-conservative (proven by Meselson and Stahl in 1958 using heavy nitrogen isotopes): each new double helix keeps one original strand and gets one new one. It begins at specific origins of replication (humans have ~30,000 of them, allowing simultaneous multi-point replication); prokaryotes have a single origin (oriC) and their circular chromosome is replicated bidirectionally.\n\nAt each replication fork, helicase unwinds the double helix while single-strand binding proteins (SSBs) stabilize the exposed strands and topoisomerases relieve the supercoiling stress ahead. Primase synthesizes a short RNA primer (DNA polymerase can't start from scratch — it can only extend an existing strand). DNA Polymerase III then reads the template 3'→5' and synthesizes new DNA 5'→3', incorporating dNTPs with a remarkable 10⁻⁷ error rate from its own proofreading activity (3'→5' exonuclease removes mismatched bases). The leading strand is copied continuously in the direction of fork movement; the lagging strand is copied in pieces (Okazaki fragments, ~100–200 nt in eukaryotes) each needing its own RNA primer. After synthesis, RNA primers are replaced by DNA (by DNA Pol I in bacteria, Pol δ/ε in eukaryotes), and DNA ligase seals the nicks.",
  },
  {
    anchorId: "dna-mutations",
    title:
      "DNA Mutations: From Single Base Changes to Chromosomal Rearrangements",
    content:
      "Mutations are changes in the DNA sequence, and they range from single nucleotide alterations to large-scale chromosomal rearrangements. Point mutations are changes at a single base pair. Transitions change a purine to another purine or a pyrimidine to another pyrimidine (more common); transversions swap a purine for a pyrimidine or vice versa (less common but happen). A point mutation's effect depends on where it lands: a silent mutation changes the codon but not the amino acid (thanks to genetic code degeneracy); a missense mutation changes one amino acid (sickle cell anemia is the classic example — a valine replaces glutamic acid in hemoglobin); a nonsense mutation introduces a premature stop codon, truncating the protein. Frameshift mutations (insertions or deletions not in multiples of three) completely alter the reading frame downstream, usually devastating.\n\nLarger-scale mutations include deletions, duplications, inversions, and translocations of chromosomal segments. Causes include spontaneous chemical changes (deamination, oxidation, tautomeric shifts), physical mutagens (UV light causing thymine dimers, ionizing radiation causing double-strand breaks), and chemical mutagens (alkylating agents, base analogs, intercalating agents). Most mutations are repaired; those that aren't are either neutral (in non-functional DNA), lethal (cell dies), or occasionally beneficial (the foundation of evolution).",
  },
  {
    anchorId: "dna-epigenetics",
    title: "Epigenetics: Regulating Genes Without Changing the Sequence",
    content:
      "Here's a profound concept: two cells in your body can have identical DNA sequences but completely different patterns of gene expression — because of epigenetics. Epigenetic mechanisms are heritable changes in gene activity that don't alter the nucleotide sequence itself. DNA methylation is the best-understood: DNA methyltransferases add a methyl group to cytosines at CpG dinucleotides. Methylated cytosines in promoter regions (especially in CpG islands) generally silence gene expression, recruiting methyl-CpG binding proteins that attract repressor complexes. Maintenance methyltransferases copy the methylation pattern to daughter strands after replication, making this a heritable epigenetic mark.\n\nHistone modifications are another layer: acetylation of lysines on H3 and H4 tails generally opens chromatin and activates transcription (acetyl groups neutralize the positive charge, reducing histone-DNA attraction); deacetylation closes chromatin. Histone methylation can activate or repress depending on which residue is modified. Chromatin remodeling complexes use ATP energy to physically slide or reorganize nucleosomes, changing DNA accessibility. Genomic imprinting is a compelling example of epigenetics in action: for some genes, only the maternal or paternal allele is expressed (the other is epigenetically silenced). Errors in imprinting cause syndromes like Prader-Willi and Angelman. And X-chromosome inactivation in female mammals — where one X is silenced in each cell through methylation and Xist RNA — ensures dosage compensation with males.",
  },
];

export default function DNASection() {
  return (
    <section className="px-4 py-16 md:px-8" style={{ background: "white" }}>
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          topicId="dna"
          title="DNA: The Blueprint of Life"
          subtitle="From the double helix's elegant geometry to its dynamic conformations, packaging, replication machinery, mutation types, repair pathways, and epigenetic regulation."
        />

        {/* Helix + First 2 paragraphs */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
            {/* Scene */}
            <div
              className="rounded-2xl overflow-hidden border"
              style={{
                borderColor: "oklch(0.55 0.12 280 / 0.25)",
                background: "oklch(0.96 0.02 280 / 0.2)",
              }}
            >
              <div className="px-4 pt-4 pb-2">
                <h3 className="font-display font-bold text-lg accent-dna">
                  Interactive Double Helix
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Click any base pair to identify it · Toggle highlighting to
                  compare pair types
                </p>
              </div>
              <SceneErrorBoundary
                sceneName="DNA Double Helix 3D Model"
                sceneColor="#9b59ff"
              >
                <Suspense
                  fallback={
                    <div
                      className="flex items-center justify-center"
                      style={{
                        height: 440,
                        background: "oklch(0.95 0.02 280 / 0.3)",
                        borderRadius: 12,
                      }}
                    >
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
                    </div>
                  }
                >
                  <DNAScene />
                </Suspense>
              </SceneErrorBoundary>
            </div>

            {/* First 2 paragraphs */}
            <div className="flex flex-col gap-5">
              {EXPLANATION_PARAGRAPHS.slice(0, 2).map((para) => (
                <AnimatedEntrance
                  key={para.title}
                  direction="right"
                  delay={0.15}
                >
                  <div
                    id={para.anchorId}
                    className="rounded-xl p-5 border"
                    style={{
                      borderColor: "oklch(0.55 0.12 280 / 0.18)",
                      background: "oklch(0.97 0.015 280 / 0.2)",
                    }}
                  >
                    <h3 className="font-display font-bold text-base mb-2 accent-dna">
                      {para.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "oklch(0.28 0.04 75)" }}
                    >
                      {para.content}
                    </p>
                  </div>
                </AnimatedEntrance>
              ))}
            </div>
          </div>
        </AnimatedEntrance>

        {/* Base pairing callout */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div
            className="mb-10 rounded-2xl p-6 border"
            style={{
              borderColor: "oklch(0.55 0.12 280 / 0.22)",
              background: "oklch(0.97 0.02 280 / 0.15)",
            }}
          >
            <h3 className="font-display font-bold text-lg accent-dna mb-4">
              Chargaff's Base Pairing Rules at a Glance
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  pair: "A — T",
                  desc: "Adenine binds Thymine",
                  bonds: "2 hydrogen bonds",
                  colorA: "#2563eb",
                  colorB: "#b45309",
                  bg: "oklch(0.95 0.04 240 / 0.4)",
                },
                {
                  pair: "G — C",
                  desc: "Guanine binds Cytosine",
                  bonds:
                    "3 hydrogen bonds — stronger! GC-rich regions have higher melting points",
                  colorA: "#166534",
                  colorB: "#991b1b",
                  bg: "oklch(0.95 0.04 145 / 0.4)",
                },
              ].map(({ pair, desc, bonds, colorA, colorB, bg }) => (
                <div
                  key={pair}
                  className="rounded-xl p-4 flex items-center gap-4"
                  style={{
                    background: bg,
                    border: "1px solid oklch(0.55 0.12 280 / 0.12)",
                  }}
                >
                  <div
                    className="text-2xl font-bold font-mono"
                    style={{ color: colorA }}
                  >
                    {pair.split(" — ")[0]}
                  </div>
                  <div className="text-xl font-bold text-muted-foreground">
                    —
                  </div>
                  <div
                    className="text-2xl font-bold font-mono"
                    style={{ color: colorB }}
                  >
                    {pair.split(" — ")[1]}
                  </div>
                  <div className="ml-2 flex flex-col">
                    <span
                      className="text-sm font-medium"
                      style={{ color: "oklch(0.28 0.04 75)" }}
                    >
                      {desc}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {bonds}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedEntrance>

        {/* DNA conformations highlight */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                name: "B-DNA",
                sub: "Most common form",
                detail:
                  "Right-handed · ~10 bp/turn · Physiological conditions · Major/minor grooves",
                color: "#3b82f6",
              },
              {
                name: "A-DNA",
                sub: "Dehydrated / RNA:DNA hybrids",
                detail:
                  "Right-handed · ~11 bp/turn · Wider & shorter · Forms during transcription",
                color: "#16a34a",
              },
              {
                name: "Z-DNA",
                sub: "GC-rich, torsional stress",
                detail:
                  "Left-handed · ~12 bp/turn · Zigzag backbone · May regulate transcription",
                color: "#9333ea",
              },
            ].map((conf) => (
              <div
                key={conf.name}
                className="rounded-xl p-4 border"
                style={{
                  borderColor: `${conf.color}33`,
                  background: `${conf.color}08`,
                }}
              >
                <div
                  className="font-display font-bold text-base mb-1"
                  style={{ color: conf.color }}
                >
                  {conf.name}
                </div>
                <div className="text-xs font-semibold mb-2 text-muted-foreground">
                  {conf.sub}
                </div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "oklch(0.35 0.03 75)" }}
                >
                  {conf.detail}
                </p>
              </div>
            ))}
          </div>
        </AnimatedEntrance>

        {/* Remaining paragraphs */}
        <StaggerContainer
          staggerDelay={0.08}
          className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          {EXPLANATION_PARAGRAPHS.slice(2).map((para) => (
            <StaggerItem key={para.title}>
              <div
                id={para.anchorId}
                className="h-full rounded-xl p-5 border"
                style={{
                  borderColor: "oklch(0.55 0.12 280 / 0.18)",
                  background: "oklch(0.98 0.01 75)",
                }}
              >
                <h3 className="font-display font-bold text-base mb-2 accent-dna">
                  {para.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.28 0.04 75)" }}
                >
                  {para.content}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Replication Fork Diagram */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div className="mb-12">
            <h3 className="font-display font-bold text-2xl accent-dna glow-dna mb-2">
              DNA Replication Fork
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Watch the leading strand copy continuously while the lagging
              strand forms Okazaki fragments — each needing its own RNA primer.
            </p>
            <ReplicationFork />
          </div>
        </AnimatedEntrance>

        {/* Key Facts Cards */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              {
                label: "Base Pairs",
                value: "3.2 billion",
                sub: "in human genome",
                emoji: "🧬",
              },
              {
                label: "DNA Length",
                value: "~2 meters",
                sub: "per human cell",
                emoji: "📏",
              },
              {
                label: "Replication Accuracy",
                value: "1 in 10⁹",
                sub: "errors after repair",
                emoji: "🎯",
              },
              {
                label: "Origins of Replication",
                value: "~30,000",
                sub: "in human genome",
                emoji: "🔬",
              },
            ].map(({ label, value, sub, emoji }) => (
              <div
                key={label}
                className="rounded-xl p-4 text-center border"
                style={{
                  borderColor: "oklch(0.55 0.12 280 / 0.2)",
                  background: "oklch(0.97 0.02 280 / 0.2)",
                }}
              >
                <div className="text-3xl mb-2">{emoji}</div>
                <div className="font-display font-bold text-lg accent-dna">
                  {value}
                </div>
                <div
                  className="text-xs font-semibold mt-0.5"
                  style={{ color: "oklch(0.3 0.04 75)" }}
                >
                  {label}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </AnimatedEntrance>

        {/* Repair pathways summary */}
        <AnimatedEntrance direction="up" delay={0.1}>
          <div
            className="mb-12 rounded-2xl p-6 border"
            style={{
              borderColor: "oklch(0.55 0.12 280 / 0.2)",
              background: "oklch(0.97 0.02 280 / 0.1)",
            }}
          >
            <h3 className="font-display font-bold text-xl accent-dna mb-4">
              DNA Repair Pathways — A Quick Reference
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  name: "Nucleotide Excision Repair (NER)",
                  damage: "UV-induced thymine dimers, bulky adducts",
                  disease: "Xeroderma pigmentosum when defective",
                  color: "#7c3aed",
                },
                {
                  name: "Base Excision Repair (BER)",
                  damage: "Oxidized/deaminated bases, abasic sites",
                  disease: "Contributes to aging and neurodegeneration",
                  color: "#0891b2",
                },
                {
                  name: "Mismatch Repair (MMR)",
                  damage: "Replication errors — mismatched bases, small indels",
                  disease: "Lynch syndrome (hereditary colorectal cancer)",
                  color: "#16a34a",
                },
                {
                  name: "Homologous Recombination (HR)",
                  damage: "Double-strand breaks (S/G2 phase)",
                  disease: "BRCA1/2 mutations → breast/ovarian cancer",
                  color: "#dc2626",
                },
                {
                  name: "Non-Homologous End Joining (NHEJ)",
                  damage: "Double-strand breaks (all phases)",
                  disease:
                    "Defects cause radiosensitivity and immunodeficiency",
                  color: "#d97706",
                },
                {
                  name: "Direct Reversal",
                  damage: "O⁶-methylguanine (MGMT enzyme)",
                  disease: "Relevant to temozolomide chemotherapy response",
                  color: "#be185d",
                },
              ].map((r) => (
                <div
                  key={r.name}
                  className="rounded-xl p-3"
                  style={{
                    background: `${r.color}0a`,
                    border: `1px solid ${r.color}25`,
                  }}
                >
                  <div
                    className="font-semibold text-xs mb-1"
                    style={{ color: r.color }}
                  >
                    {r.name}
                  </div>
                  <div className="text-xs text-muted-foreground mb-1">
                    Fixes: {r.damage}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "oklch(0.4 0.03 75)" }}
                  >
                    When defective: {r.disease}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedEntrance>

        {/* Quiz */}
        <AnimatedEntrance direction="up" delay={0.15}>
          <div
            data-ocid="dna-quiz-section"
            className="rounded-2xl p-7"
            style={{
              background: "oklch(0.97 0.02 280 / 0.15)",
              border: "1px solid oklch(0.55 0.12 280 / 0.2)",
            }}
          >
            <h3 className="font-display font-bold text-2xl accent-dna glow-dna mb-2">
              🧬 Test Your DNA Knowledge
            </h3>
            <p className="text-muted-foreground mb-6">
              10 questions spanning DNA conformations, packaging, replication
              machinery, mutation types, repair pathways, and epigenetics — with
              teacher-style explanations throughout.
            </p>
            <QuizEngine topicId="dna" questions={DNA_QUIZ} />
          </div>
        </AnimatedEntrance>
      </div>
    </section>
  );
}
