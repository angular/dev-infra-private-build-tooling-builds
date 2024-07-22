import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs';
import path from 'path';
import {CliCommand} from './cli-entities';
import {DocEntry} from './entities';
import {isCliEntry} from './entities/categorization';
import {configureMarkedGlobally} from './marked/configuration';
import {getRenderable} from './processing';
import {renderEntry} from './rendering';
import {initHighlighter} from './shiki/shiki';

/** The JSON data file format for extracted API reference info. */
interface EntryCollection {
  moduleName: string;
  entries: DocEntry[];
}

/** Parse all JSON data source files into an array of collections. */
function parseEntryData(srcs: string[]): EntryCollection[] {
  return srcs.flatMap((jsonDataFilePath) => {
    const fileContent = readFileSync(jsonDataFilePath, {encoding: 'utf8'});
    const fileContentJson = JSON.parse(fileContent) as unknown;
    if ((fileContentJson as EntryCollection).entries) {
      return fileContentJson as EntryCollection;
    }

    // CLI subcommands should generate a separate file for each subcommand.
    // We are artificially creating a collection for each subcommand here.
    if ((fileContentJson as CliCommand).subcommands) {
      const command = fileContentJson as CliCommand;
      return [
        {
          moduleName: 'unknown',
          entries: [fileContentJson as DocEntry],
        },
        ...command.subcommands!.map((subCommand) => {
          return {
            moduleName: 'unknown',
            entries: [{...subCommand, parentCommand: command} as any],
          };
        }),
      ];
    }

    return {
      moduleName: 'unknown',
      entries: [fileContentJson as DocEntry], // TODO: fix the typing cli entries aren't DocEntry
    };
  });
}

/** Gets a normalized filename for a doc entry. */
function getNormalizedFilename(moduleName: string, entry: DocEntry | CliCommand): string {
  if (isCliEntry(entry)) {
    return entry.parentCommand
      ? `${entry.parentCommand.name}/${entry.name}.html`
      : `${entry.name}.html`;
  }

  entry = entry as DocEntry;
  // Angular entry points all contain an "@" character, which we want to remove
  // from the filename. We also swap `/` with an underscore.
  const normalizedModuleName = moduleName.replace('@', '').replaceAll('/', '_');

  // Append entry type as suffix to prevent writing to file that only differs in casing or query string from already written file.
  // This will lead to a race-condition and corrupted files on case-insensitive file systems.
  return `${normalizedModuleName}_${entry.name}_${entry.entryType.toLowerCase()}.html`;
}

async function main() {
  configureMarkedGlobally();

  // Shiki highlighter needs to be setup in an async context
  await initHighlighter();

  const [paramFilePath] = process.argv.slice(2);
  const rawParamLines = readFileSync(paramFilePath, {encoding: 'utf8'}).split('\n');

  const [srcs, outputFilenameExecRootRelativePath] = rawParamLines;

  // TODO: Remove when we are using Bazel v6+
  // On RBE, the output directory is not created properly due to a bug.
  // https://github.com/bazelbuild/bazel/commit/4310aeb36c134e5fc61ed5cdfdf683f3e95f19b7.
  if (!existsSync(outputFilenameExecRootRelativePath)) {
    mkdirSync(outputFilenameExecRootRelativePath, {recursive: true});
  }

  // Docs rendering happens in three phases that occur here:
  // 1) Aggregate all the raw extracted doc info.
  // 2) Transform the raw data to a renderable state.
  // 3) Render to HTML.

  // Parse all the extracted data from the source JSON files.
  // Each file represents one "collection" of docs entries corresponding to
  // a particular JS module name.
  const entryCollections: EntryCollection[] = parseEntryData(srcs.split(','));

  for (const collection of entryCollections) {
    const extractedEntries = collection.entries;
    const renderableEntries = extractedEntries.map((entry) =>
      getRenderable(entry, collection.moduleName),
    );

    const htmlOutputs = renderableEntries.map(renderEntry);

    for (let i = 0; i < htmlOutputs.length; i++) {
      const filename = getNormalizedFilename(collection.moduleName, collection.entries[i]);
      const outputPath = path.join(outputFilenameExecRootRelativePath, filename);

      // in case the output path is nested, ensure the directory exists
      mkdirSync(path.parse(outputPath).dir, {recursive: true});

      writeFileSync(outputPath, htmlOutputs[i], {encoding: 'utf8'});
    }
  }
}

main();
