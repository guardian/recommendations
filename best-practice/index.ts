/**
 * This script generates the best-practices.md file from the definitions in the definitions.ts file.
 *
 * Add new best practices to the definitions.ts file.
 */
import { markdownTable } from "npm:markdown-table";
import { AllBestPractices } from "./definitions.ts";

const markdownFilepath =
  new URL(import.meta.resolve("../best-practices.md")).pathname;

const file = await Deno.readTextFile(markdownFilepath);

const startMark = "<!-- contentstart -->";
const endMark = "<!-- contentend -->";

if (!file.includes(startMark) || !file.includes(endMark)) {
  throw new Error(
    `Could not find start (${startMark}) and end markers (${endMark}) in ${markdownFilepath}`,
  );
}

const tableHeaderRow = [
  "ID", // This will be auto-generated
  "Name",
  "Owner",
  "Description",
  "How to check compliance",
  "How to exempt",
];

const markdownContent = Object.entries(AllBestPractices).flatMap(
  ([section, bestPractices]) => {
    const markdownH2 = `## ${section}`;

    const tableRows = bestPractices.map((row, index) => {
      const id = [
        section,
        (index + 1).toString().padStart(2, "0"),
      ].join("-").toUpperCase();

      return [id, ...Object.values(row)];
    });

    const table = markdownTable([tableHeaderRow, ...tableRows]);

    return [markdownH2, table];
  },
);

// Find text between markers and replace it with the start marker
const re = new RegExp(`${startMark}(.|\n)*${endMark}`, "m");
const resetFile = file.replace(re, startMark);

// replace the now singular start marker with the start marker, content, and end marker
const updatedFile = resetFile.replace(
  startMark,
  [startMark, ...markdownContent, endMark].join("\n"),
);

// save changes
await Deno.writeTextFile(markdownFilepath, updatedFile);
