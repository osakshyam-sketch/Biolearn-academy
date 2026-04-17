// ── Python Basics Curriculum Data ─────────────────────────────────────────────

export interface PythonLesson {
  id: string;
  anchorId: string;
  lessonNumber: number;
  heading: string;
  body: string;
  codeExample: string;
}

export const PYTHON_BASICS_SECTIONS: PythonLesson[] = [
  {
    id: "py-what-is-python",
    anchorId: "bi-python-what-is",
    lessonNumber: 1,
    heading: "What Is Python — and Why Do Biologists Love It?",
    body: `Here's a question worth starting with: what actually is a programming language? Think of it this way — a computer is fantastically powerful but remarkably literal. It can only do exactly what you tell it to do, and it needs those instructions in a very precise, unambiguous language. A programming language is that bridge between your ideas and the computer's understanding. Python is one of those languages, and it has become the go-to tool for biology and science more broadly.

What makes Python special for biology isn't that it's the fastest language (it isn't), or the oldest (it was invented in 1991). It's that Python reads almost like English. When you look at a well-written Python script, you can often guess what it does even if you've never programmed before. Compare this to older languages where you'd spend three lines just to print "Hello" to the screen. In Python, you just write: print("Hello"). That's it.

Here's something that will click once you start using it — bioinformatics is basically all about manipulating text and numbers. DNA sequences are just strings of letters (A, T, G, C). Protein sequences are strings of amino acid codes. Gene expression data is tables of numbers. Python was built to work with text and numbers elegantly, which is why it fits biology so naturally. When the human genome was being analysed in the early 2000s, Python scripts were everywhere in those labs.

One more thing before we dive in: you don't need to understand everything at once. Learning to code is exactly like learning a foreign language — you learn a few words, string them into sentences, and gradually the grammar becomes instinct. Every professional bioinformatician you'll ever meet went through the exact same beginner stage you're in right now. The only difference is they kept going.`,
    codeExample: `# Python reads almost like English — that's one reason scientists love it.
# A '#' symbol starts a comment — Python ignores everything after it.
# Comments are notes to yourself and future readers.

# Print something to the screen
print("Hello, Biology!")

# Python can do maths
print(2 + 2)          # 4
print(10 / 3)         # 3.3333...
print(10 // 3)        # 3  (integer division — no decimal)
print(2 ** 10)        # 1024  (2 to the power of 10)

# Let's see what version of Python you're running
import sys
print(f"Python version: {sys.version}")

# A tiny taste of what's ahead — analysing a DNA sequence
dna = "ATGCGATCGATCGATCG"
print(f"My DNA sequence: {dna}")
print(f"Length: {len(dna)} bases")
print(f"GC content: {(dna.count('G') + dna.count('C')) / len(dna) * 100:.1f}%")`,
  },
  {
    id: "py-variables",
    anchorId: "bi-python-variables",
    lessonNumber: 2,
    heading: "Variables and Data Types — The Labelled Boxes of Your Code",
    body: `Here's the thing about variables — think of them like labelled boxes. You want to store a DNA sequence somewhere so you can use it later? Put it in a box and slap a label on it: dna_sequence = "ATGCGATCG". From that point on, whenever you write dna_sequence in your code, Python knows exactly what you're talking about. The box is a variable, and the label is its name.

Python has several basic types of data that you'll use constantly. Integers (int) are whole numbers — like the number of genes in a genome, or the position of a mutation in a sequence. Floats are decimal numbers — like a GC content of 62.3%, or a p-value of 0.0001. Strings (str) are text — this is how we store DNA sequences, protein names, and everything else that's made of characters. Booleans (bool) are True or False — useful for answering yes/no questions like "is this gene expressed?" or "does this sequence contain a particular motif?"

The beautiful thing about Python is that you don't have to declare the type in advance. In many other languages, you'd have to say "I'm creating an integer box called gene_count." In Python, you just write gene_count = 0 and Python figures out that it's an integer on its own. This is called dynamic typing, and it makes coding much faster to get started with.

There's one thing beginners trip over: variable names are case-sensitive. GC_content and gc_content and gc_CONTENT are three completely different variables as far as Python is concerned. The convention in Python (and it's a good one to follow) is to use lowercase with underscores: gene_count, dna_sequence, protein_name. This is called "snake_case" and makes your code much more readable.`,
    codeExample: `# Variables — labelled boxes for storing values
gene_name = "BRCA1"          # string (str) — text
gene_length = 81189          # integer (int) — whole number
gc_content = 42.8            # float — decimal number
is_expressed = True          # boolean — True or False

# You can check the type of any variable
print(type(gene_name))       # <class 'str'>
print(type(gene_length))     # <class 'int'>
print(type(gc_content))      # <class 'float'>
print(type(is_expressed))    # <class 'bool'>

# Biology examples — storing sequence data
dna_sequence = "ATGCGATCGATCGATCG"
amino_acid_count = 20              # there are 20 standard amino acids
melting_temp = 58.5                # Tm of a PCR primer in °C
has_stop_codon = False             # does this fragment have a stop codon?

# Variables can be updated — the box can hold new values
gene_length = 82000          # BRCA1 annotation was updated!
print(f"Updated length: {gene_length}")

# f-strings — the easiest way to combine variables and text
print(f"Gene: {gene_name}, Length: {gene_length} bp, GC: {gc_content}%")`,
  },
  {
    id: "py-strings",
    anchorId: "bi-python-strings",
    lessonNumber: 3,
    heading: "Strings in Python — DNA Sequences Are Just Text",
    body: `Here's a perspective shift that makes bioinformatics click: a DNA sequence is, at its heart, just a string of characters. ATGCGATCGATCG is a Python string — no different to "Hello World" as far as Python is concerned. This means all of Python's string operations work directly on your biological sequences, and there are a lot of them.

The most important thing to understand about strings is indexing. Python numbers the positions in a string starting from 0. So in the sequence "ATGC", the A is at position 0, T is at position 1, G is at position 2, and C is at position 3. You access a character using square brackets: seq[0] gives you 'A'. This feels odd at first ("why start at 0?") but becomes completely natural within a few days. Slicing is an extension of this: seq[0:3] gives you the first three characters, which is the first codon. Think of it as "from position 0 up to (but not including) position 3."

Some of the most useful string methods for bioinformatics: upper() and lower() standardise case (important because the same sequence written as "atgc" and "ATGC" look different to Python even though they're biologically the same). replace() swaps characters — useful for converting DNA to RNA by replacing T with U. count() counts how many times a substring appears, which is how you'd quickly count the number of each nucleotide. The in operator tells you whether a smaller string appears inside a larger one: "ATG" in dna_sequence is True if the start codon is present.

A fun fact: the NCBI stores all of GenBank's 250 million sequences as strings behind the scenes. The same data type you're learning right now.`,
    codeExample: `# Strings for DNA sequences
dna = "ATGCGATCGATCGATCG"

# Indexing — positions start at 0
print(dna[0])          # 'A' — first base
print(dna[2])          # 'G' — third base
print(dna[-1])         # 'G' — last base (negative index counts from end)

# Slicing — dna[start:stop] (stop is excluded)
first_codon = dna[0:3]          # 'ATG' — the start codon (methionine)
print(f"First codon: {first_codon}")

# Useful string methods
print(len(dna))                  # 17 — length of the sequence
print(dna.upper())               # all uppercase
print(dna.lower())               # all lowercase

# Convert DNA to RNA — replace T with U
rna = dna.replace("T", "U")
print(f"RNA: {rna}")

# Count nucleotides
g_count = dna.count("G")
c_count = dna.count("C")
gc = (g_count + c_count) / len(dna) * 100
print(f"GC content: {gc:.1f}%")

# Check for motifs using 'in'
if "ATG" in dna:
    print("Start codon found!")

# Find where a motif starts
position = dna.find("CGT")      # returns -1 if not found
print(f"CGT starts at position: {position}")`,
  },
  {
    id: "py-lists-loops",
    anchorId: "bi-python-loops",
    lessonNumber: 4,
    heading: "Lists and Loops — Process Thousands of Sequences at Once",
    body: `Imagine you have 500 DNA sequences and you want to calculate the GC content of each one. You could write out 500 lines of code, one per sequence. Or — and this is where programming becomes genuinely powerful — you could write three lines and let a loop handle all 500 in the same time it takes to blink. Lists and loops are the combination that transforms bioinformatics from tedious to efficient.

A list is exactly what it sounds like: an ordered collection of things. gene_names = ["BRCA1", "TP53", "EGFR"] is a list of three gene names. sequences = ["ATGCG", "GCATCG", "TTAATG"] is a list of DNA sequences. Lists can hold anything — strings, numbers, other lists. You add new items with append(), access them by index (same zero-based indexing as strings), and iterate over them with a for loop.

A for loop says: "for each item in this collection, do the following thing." The syntax in Python is beautifully readable: for gene in gene_names: print(gene) literally reads as "for each gene in gene_names, print the gene." The indented block under the for statement is the code that runs once for each item. Indentation is critically important in Python — it defines what's inside the loop and what's outside.

Here's a real biology example: if you have a list of ten DNA sequences and you want to report which ones have high GC content (above 60%), you'd loop over the list, compute GC for each one, and check whether it's above the threshold. That's ten independent analyses, done automatically, in five lines of Python. This is why bioinformaticians can process entire genomes — because loops turn single computations into industrial-scale workflows.`,
    codeExample: `# Lists — ordered collections
gene_names = ["BRCA1", "TP53", "EGFR", "KRAS", "PTEN"]
lengths = [81189, 19149, 188307, 35000, 87000]  # gene lengths in bp

# Access by index (starts at 0)
print(gene_names[0])           # 'BRCA1'
print(gene_names[-1])          # 'PTEN' (last item)
print(len(gene_names))         # 5

# Add to a list
gene_names.append("MYC")
print(f"Now {len(gene_names)} genes")

# For loop — process every item
for gene in gene_names:
    print(f"Gene: {gene}")

# Biology example: GC content for a list of sequences
sequences = [
    "ATGCGATCGATCGATCG",    # ~59% GC
    "GCGCGCATGCGCGCATG",    # ~72% GC (GC-rich)
    "ATATATATAGCATATATA",    # ~22% GC (AT-rich)
]

print("\nGC content analysis:")
for seq in sequences:
    gc = (seq.count("G") + seq.count("C")) / len(seq) * 100
    label = "HIGH" if gc > 60 else "NORMAL" if gc > 40 else "LOW"
    print(f"  {seq[:10]}... GC={gc:.1f}% [{label}]")

# range() — loop a specific number of times
print("\nFirst 5 codons:")
for i in range(0, 15, 3):          # start=0, stop=15, step=3
    codon = sequences[0][i:i+3]
    print(f"  Position {i}: {codon}")`,
  },
  {
    id: "py-conditionals",
    anchorId: "bi-python-conditionals",
    lessonNumber: 5,
    heading: "Conditionals — Teaching Your Code to Make Decisions",
    body: `Every interesting biological analysis involves making decisions. Is this gene expressed above background? Does this sequence contain a restriction site? Is this GC content high enough to suggest the sequence comes from a thermophilic organism? In Python, you make decisions using if statements — and once you understand them, your code becomes genuinely intelligent rather than just mechanically repetitive.

The basic structure is: if something_is_true: do this. elif (short for "else if") something_else_is_true: do that instead. else: do this if nothing above was true. The conditions can be as simple or as complex as you need. A single equals sign (=) assigns a value to a variable. Two equals signs (==) check whether two values are the same. Other comparison operators: > (greater than), < (less than), >= (greater than or equal to), != (not equal to). And you can combine conditions with and and or.

Here's a concrete example from GC content analysis. Normal genomic regions in humans have around 40% GC. Regions above 60% are called "CpG islands" — they're often found near gene promoters and are biologically significant. Below 30% tends to suggest AT-rich repetitive elements. With a few if/elif/else statements, you can automatically classify any sequence into these categories, processing thousands of sequences in a loop. That classification logic in three lines can replace hours of manual work.

One thing to watch out for: indentation. Python uses indentation (the spaces before lines) to define what's inside an if block. If you mess up the indentation, Python will either throw an error or, worse, run code in the wrong order and give you subtly wrong results. The convention is 4 spaces per level of indentation — never mix tabs and spaces.`,
    codeExample: `# Basic if/elif/else
gc_content = 72.5   # percentage

if gc_content > 60:
    print("High GC — possible CpG island or thermophile gene")
elif gc_content > 40:
    print("Normal GC range")
else:
    print("Low GC — AT-rich region")

# Combining conditions with 'and' / 'or'
length = 200
has_stop_codon = True

if length > 100 and has_stop_codon:
    print("This looks like a complete ORF")

# Checking if a motif exists
dna = "ATGCGATCGATCGTAATGCGATCG"
if "TAA" in dna or "TAG" in dna or "TGA" in dna:
    print("Stop codon present")

# Real example: classify sequences in a loop
sequences = {
    "promoter_region": "GCGCGCGCATGCGCGCGCGCGCAT",
    "intergenic":      "ATATATATAGCATATATATATAT",
    "coding_exon":     "ATGCGATCGATCGATCGATCGATCG",
}

print("\nSequence classification:")
for name, seq in sequences.items():
    gc = (seq.count("G") + seq.count("C")) / len(seq) * 100
    if gc > 60:
        category = "CpG island candidate"
    elif gc < 35:
        category = "AT-rich / repetitive"
    else:
        category = "Standard coding"
    print(f"  {name}: GC={gc:.1f}% → {category}")`,
  },
  {
    id: "py-functions",
    anchorId: "bi-python-functions",
    lessonNumber: 6,
    heading: "Functions — Write Once, Use Everywhere",
    body: `Here's the thing about functions — they're the single most important concept for writing good code. A function is a named block of code that you can call any time you need it. Instead of writing the same GC content calculation five times in your script, you write it once as a function and call it five times. If there's ever a bug or you want to improve the calculation, you fix it in one place and everything that uses it gets better automatically.

You define a function with the def keyword, followed by the function's name, followed by its parameters (the inputs it expects) in parentheses. The body of the function is indented. A return statement sends the result back to wherever the function was called from. If a function doesn't have a return statement, it implicitly returns None — and that's fine for functions that do work (like printing) rather than calculations.

Here's a real bioinformatics example: a function to compute GC content. def gc_content(sequence): return (sequence.count('G') + sequence.count('C')) / len(sequence) * 100. Four lines. You can now call gc_content("ATGCGATCG") anywhere in your script and get the answer. Better yet, you can import it into other scripts. When you start using Biopython in the next section, you're essentially using a giant collection of functions that someone else wrote so you don't have to.

Another powerful pattern: a function to compute the reverse complement of a DNA sequence. This is something you'll need constantly in bioinformatics — when a gene is on the minus strand of DNA, you're working with the reverse complement. Writing a function for it means you never have to think about the steps again, you just call reverse_complement(sequence). This is how professional code gets built — small, tested, reusable pieces that you compose into larger analyses.`,
    codeExample: `# Define a function with 'def'
def gc_content(sequence):
    """Calculate GC content as a percentage."""
    g = sequence.upper().count("G")
    c = sequence.upper().count("C")
    return (g + c) / len(sequence) * 100

# Call the function
dna1 = "ATGCGATCGATCGATCG"
dna2 = "GCGCGCGCGCGCGCGCGC"
print(f"Sequence 1 GC: {gc_content(dna1):.1f}%")
print(f"Sequence 2 GC: {gc_content(dna2):.1f}%")

# Reverse complement — used when a gene is on the minus strand
COMPLEMENT = {"A": "T", "T": "A", "G": "C", "C": "G"}

def reverse_complement(sequence):
    """Return the reverse complement of a DNA sequence."""
    complemented = [COMPLEMENT[base] for base in sequence.upper()]
    return "".join(reversed(complemented))

print(reverse_complement("ATGCGATCG"))   # 'CGATCGCAT'

# Function with multiple parameters and a default value
def classify_gc(sequence, low_threshold=40, high_threshold=60):
    """Classify a sequence as AT-rich, normal, or GC-rich."""
    gc = gc_content(sequence)
    if gc < low_threshold:
        return "AT-rich"
    elif gc > high_threshold:
        return "GC-rich"
    else:
        return "Normal"

# Try it out
test_seqs = ["ATATATATATATAT", "ATGCGATCGATCG", "GCGCGCGCGCGCGCGC"]
for seq in test_seqs:
    print(f"  GC={gc_content(seq):.1f}% → {classify_gc(seq)}")`,
  },
  {
    id: "py-dictionaries",
    anchorId: "bi-python-dicts",
    lessonNumber: 7,
    heading: "Dictionaries — The Perfect Data Structure for Biology",
    body: `If there's one Python data structure that's tailor-made for biology, it's the dictionary. A dictionary stores key-value pairs — it's like a real dictionary where a word (the key) points to its definition (the value). In bioinformatics, you use dictionaries constantly: a codon table maps each three-letter codon (key) to the amino acid it encodes (value). A nucleotide counter maps each base letter (key) to how many times it appears in the sequence (value). A gene annotation might map gene names to their chromosomal positions.

Creating a dictionary is straightforward: codon_table = {"ATG": "Met", "TGG": "Trp", "TAA": "Stop"}. You access a value by its key: codon_table["ATG"] gives you "Met". You can add new entries or update existing ones: codon_table["GGG"] = "Gly". You can check whether a key exists: "ATG" in codon_table returns True. And you can loop over all key-value pairs with for codon, amino_acid in codon_table.items():.

Here's a really powerful pattern: nucleotide frequency counting. Instead of writing four separate count statements, you can use a dictionary to count every base in a single loop. This pattern generalises — it works for counting amino acids in proteins, counting codons, counting k-mers (short sub-sequences of length k), or anything else you might need to count in bioinformatics. Once you see this pattern, you'll use it everywhere.

A fun fact: the full genetic code with all 64 codons is just a Python dictionary with 64 entries. The entire translation machinery of the cell — billions of years of evolution — can be represented in about 70 lines of Python. That's one of the things that makes computational biology endlessly fascinating.`,
    codeExample: `# Dictionaries — key: value pairs
nucleotide_names = {
    "A": "Adenine",
    "T": "Thymine",
    "G": "Guanine",
    "C": "Cytosine"
}

# Access a value by key
print(nucleotide_names["A"])           # 'Adenine'
print(nucleotide_names.get("X", "Unknown"))  # safe access with default

# Count nucleotide frequencies in a sequence
def count_bases(sequence):
    """Count each nucleotide in a DNA sequence."""
    counts = {}
    for base in sequence.upper():
        if base in counts:
            counts[base] += 1        # increment existing count
        else:
            counts[base] = 1         # first occurrence
    return counts

dna = "ATGCGATCGATCGATCGATCGATCG"
freq = count_bases(dna)
print(f"\nNucleotide frequencies:")
for base, count in sorted(freq.items()):
    pct = count / len(dna) * 100
    print(f"  {base}: {count} ({pct:.1f}%)")

# Partial codon table (real table has 64 codons)
codon_table = {
    "ATG": "Met",  "TGG": "Trp",  "TAA": "Stop",
    "TAG": "Stop", "TGA": "Stop", "GGG": "Gly",
    "AAA": "Lys",  "CCC": "Pro",  "TTT": "Phe",
}

# Translate a sequence using the codon table
def simple_translate(dna_seq):
    protein = []
    for i in range(0, len(dna_seq) - 2, 3):    # step 3 bases at a time
        codon = dna_seq[i:i+3]
        aa = codon_table.get(codon, "?")         # '?' for unknown codons
        if aa == "Stop":
            break
        protein.append(aa)
    return "-".join(protein)

print(f"\nTranslation: {simple_translate('ATGAAAGGGCCC')}")`,
  },
  {
    id: "py-files",
    anchorId: "bi-python-files",
    lessonNumber: 8,
    heading: "File Input/Output — Reading and Writing Biological Data",
    body: `Real bioinformatics starts with files. Your sequencer produces FASTQ files. NCBI gives you FASTA files. Your analysis results need to be saved somewhere your collaborators can read them. File I/O (Input/Output) is how your Python script interacts with data on your hard drive, and once you understand it, processing hundreds of gigabytes of sequence data becomes a matter of a few dozen lines of code.

The standard Python way to open a file is with the with statement: with open("myfile.fasta", "r") as f:. The with statement is important because it automatically closes the file when you're done, even if something goes wrong in the middle — preventing a very common bug in older code. The "r" means reading mode; "w" means writing mode (creates a new file or overwrites existing); "a" means append mode (adds to the end of an existing file).

Let's talk about FASTA format because you'll see it everywhere in bioinformatics. A FASTA file contains one or more sequences, each starting with a header line that begins with the greater-than symbol (>), followed by an identifier and optional description. The sequence itself comes on the lines that follow. For example: >gene_001 Hypothetical protein on the first line, then ATGCGATCGATCG on the next line. FASTA is the lingua franca of bioinformatics — every single bioinformatics tool on the planet reads FASTA. When you process a FASTA file manually, you check: if a line starts with >, it's a header; otherwise, it's sequence data.

A practical tip: always use with open() patterns rather than manually opening and closing files. And when writing results, use tab-separated values (TSV) format — each column separated by a tab character (\t). TSV files open directly in Excel and are easy to parse with any programming language. This makes your results accessible to collaborators who don't code.`,
    codeExample: `# Writing a FASTA file
fasta_content = """>seq_001 Example gene A
ATGCGATCGATCGATCGATCGATCGTAA
>seq_002 Example gene B  
GCATCGATCGATCGATCGATCGATCGATCGAT"""

with open("my_sequences.fasta", "w") as f:
    f.write(fasta_content)
print("FASTA file written!")

# Reading and parsing a FASTA file manually
def parse_fasta(filename):
    """Read a FASTA file and return a list of (id, sequence) tuples."""
    sequences = []
    current_id = None
    current_seq = []
    with open(filename, "r") as f:
        for line in f:
            line = line.strip()          # remove trailing newline/spaces
            if line.startswith(">"):     # this is a header line
                if current_id:           # save the previous sequence
                    sequences.append((current_id, "".join(current_seq)))
                current_id = line[1:].split()[0]   # take the first word after >
                current_seq = []
            else:
                current_seq.append(line)  # accumulate sequence lines
    if current_id:                        # don't forget the last sequence
        sequences.append((current_id, "".join(current_seq)))
    return sequences

records = parse_fasta("my_sequences.fasta")
for seq_id, seq in records:
    gc = (seq.count("G") + seq.count("C")) / len(seq) * 100
    print(f"{seq_id}: {len(seq)} bp, GC={gc:.1f}%")

# Writing results to a TSV (tab-separated values) file
with open("results.tsv", "w") as out:
    out.write("ID\tLength\tGC%\n")       # header row
    for seq_id, seq in records:
        gc = (seq.count("G") + seq.count("C")) / len(seq) * 100
        out.write(f"{seq_id}\t{len(seq)}\t{gc:.1f}\n")
print("Results saved to results.tsv")`,
  },
  {
    id: "py-modules",
    anchorId: "bi-python-modules",
    lessonNumber: 9,
    heading: "Modules and Imports — Standing on the Shoulders of Giants",
    body: `One of the greatest things about Python is that you don't have to write everything from scratch. There's a vast ecosystem of modules (also called libraries or packages) that other people have written, tested, and made freely available. When you write import math or from Bio import SeqIO, you're accessing tools built by thousands of developers over decades. This is how bioinformatics really works — nobody writes their own BLAST algorithm; they import the code that already exists.

Python ships with a standard library — a set of modules that are always available without installing anything extra. math gives you mathematical functions like sqrt, log, and floor. os lets you interact with the operating system — list files in a directory, create directories, check if a file exists. sys gives you access to the Python interpreter itself — like the current Python version or command-line arguments. re gives you regular expressions — a powerful mini-language for finding patterns in strings that's incredibly useful for finding motifs in DNA sequences.

For scientific work, you'll install additional packages using pip — Python's package manager. pip install biopython, pip install numpy, pip install pandas, pip install matplotlib. These commands reach out to the Python Package Index (PyPI) and download exactly the package you need. Think of it like an app store for Python libraries. Once installed, you import them exactly like standard library modules.

The from X import Y syntax is worth understanding. import numpy imports the whole numpy library (accessed as numpy.array(), numpy.mean(), etc.). from numpy import array, mean imports just those two functions directly, so you can write array() and mean() without the numpy. prefix. Neither is better — it's a style choice. For large libraries like numpy, the convention is to import with a short alias: import numpy as np, import pandas as pd. This is so universal that you'll see np and pd in virtually every bioinformatics script you ever read.`,
    codeExample: `# Standard library modules — no installation needed
import math
import os
import re

# math — mathematical functions
print(math.sqrt(144))          # 12.0
print(math.log2(1024))         # 10.0
print(math.pi)                 # 3.14159...

# os — interact with the file system
current_dir = os.getcwd()       # current working directory
print(f"Working directory: {current_dir}")
files = os.listdir(".")         # list files in current directory
fasta_files = [f for f in files if f.endswith(".fasta")]
print(f"FASTA files: {fasta_files}")

# re — regular expressions for motif finding
import re
dna = "ATGCGATCGATCGTAAATGCGATCG"
# Find all ATG start codons and their positions
start_codons = [(m.start(), m.group()) for m in re.finditer("ATG", dna)]
print(f"Start codons at positions: {start_codons}")

# Find restriction site EcoRI (GAATTC)
eco_ri_sites = [m.start() for m in re.finditer("GAATTC", dna)]
print(f"EcoRI sites: {eco_ri_sites}")   # empty list if none found

# Installing and importing third-party packages:
# pip install biopython numpy pandas matplotlib
# Then import them:
# from Bio.Seq import Seq            <- Biopython
# import numpy as np                 <- numerical computing
# import pandas as pd                <- data tables
# import matplotlib.pyplot as plt    <- graphs and plots`,
  },
  {
    id: "py-errors",
    anchorId: "bi-python-errors",
    lessonNumber: 10,
    heading: "Error Handling and Debugging — Errors Are Normal, Not Failure",
    body: `Here's something that every beginner needs to hear: getting errors is not a sign that you're bad at coding. Every programmer, from the complete beginner to the person who wrote the original BLAST algorithm, encounters errors constantly. The difference between beginners and experienced coders isn't that experienced coders avoid errors — it's that they're faster at reading and fixing them.

Python's error messages are actually quite helpful once you know how to read them. The last line is always the most important: it tells you what type of error it was (NameError, IndexError, FileNotFoundError, TypeError) and what specifically went wrong. The lines above it show the traceback — the call stack that led to the error. Read from the bottom up. A NameError means you used a variable that doesn't exist (check your spelling — remember Python is case-sensitive). An IndexError means you tried to access a position in a list that doesn't exist (maybe your list has 5 items and you tried to access index 10). A FileNotFoundError means the file you're trying to open doesn't exist at the path you specified.

Try/except blocks are how you handle errors gracefully in your code. The structure is: try: (code that might fail) except SomeError: (what to do if it fails). This is really important for bioinformatics scripts that process hundreds of files — if one FASTA file is corrupted or one NCBI query fails, you don't want your entire pipeline to crash. You want it to log the error, skip that file, and continue with the rest.

One last piece of advice that will save you enormous amounts of time: add print statements. When something isn't working, print the variables at each step and check they have the values you expect. Professional developers use more sophisticated tools called debuggers, but print statements are completely valid and often faster for the kind of scripts you'll be writing in bioinformatics.`,
    codeExample: `# Python's common errors — and how to handle them

# NameError — using a variable that doesn't exist
try:
    print(undefined_variable)
except NameError as e:
    print(f"NameError: {e}")    # 'undefined_variable' is not defined

# IndexError — accessing a position that doesn't exist
dna_list = ["ATGCG", "GCATC", "TTATG"]
try:
    print(dna_list[10])         # only 3 items, index 10 doesn't exist
except IndexError as e:
    print(f"IndexError: {e}")   # list index out of range

# FileNotFoundError — file doesn't exist
try:
    with open("nonexistent_file.fasta", "r") as f:
        content = f.read()
except FileNotFoundError as e:
    print(f"File not found: {e}")

# TypeError — wrong type for an operation
try:
    result = "ATGCG" + 5       # can't add a string and a number
except TypeError as e:
    print(f"TypeError: {e}")

# Real-world pattern: process files, skip broken ones
import os

def safe_gc_content(filename):
    """Read a FASTA file and compute GC content. Returns None on error."""
    try:
        with open(filename, "r") as f:
            lines = [l.strip() for l in f if not l.startswith(">")]
        seq = "".join(lines).upper()
        if not seq:
            return None
        return (seq.count("G") + seq.count("C")) / len(seq) * 100
    except FileNotFoundError:
        print(f"Warning: {filename} not found — skipping")
        return None
    except ZeroDivisionError:
        print(f"Warning: {filename} is empty — skipping")
        return None

# Use it safely
gc = safe_gc_content("my_sequences.fasta")
if gc is not None:
    print(f"GC content: {gc:.1f}%")`,
  },
];
