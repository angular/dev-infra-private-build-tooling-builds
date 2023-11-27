import stylelint from 'stylelint';
import { basename } from 'path';
const { utils, createPlugin } = stylelint;
const ruleName = '@angular/no-concrete-rules';
const messages = utils.ruleMessages(ruleName, {
    expectedWithPattern: (pattern) => `CSS rules must be placed inside a mixin for files matching '${pattern}'.`,
    expectedAllFiles: () => `CSS rules must be placed inside a mixin for all files.`,
});
/**
 * Stylelint plugin that will log a warning for all top-level CSS rules.
 * Can be used in theme files to ensure that everything is inside a mixin.
 */
const ruleFn = (isEnabled, options) => {
    return (root, result) => {
        if (!isEnabled) {
            return;
        }
        const filePattern = options.filePattern ? new RegExp(options.filePattern) : null;
        const fileName = basename(root.source.input.file);
        if ((filePattern !== null && !filePattern.test(fileName)) || !root.nodes) {
            return;
        }
        // Go through all the nodes and report a warning for every CSS rule or mixin inclusion.
        // We use a regular `forEach`, instead of the PostCSS walker utils, because we only care
        // about the top-level nodes.
        root.nodes.forEach((node) => {
            if (node.type === 'rule' || (node.type === 'atrule' && node.name === 'include')) {
                utils.report({
                    result,
                    ruleName,
                    node,
                    message: filePattern !== null
                        ? messages.expectedWithPattern(filePattern)
                        : messages.expectedAllFiles(),
                });
            }
        });
    };
};
ruleFn.ruleName = ruleName;
ruleFn.messages = messages;
export default createPlugin(ruleName, ruleFn);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tY29uY3JldGUtcnVsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saW50LXJ1bGVzL3N0eWxlbGludC9uby1jb25jcmV0ZS1ydWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQWlCLE1BQU0sV0FBVyxDQUFDO0FBQzFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFOUIsTUFBTSxFQUFDLEtBQUssRUFBRSxZQUFZLEVBQUMsR0FBRyxTQUFTLENBQUM7QUFFeEMsTUFBTSxRQUFRLEdBQUcsNEJBQTRCLENBQUM7QUFDOUMsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUU7SUFDNUMsbUJBQW1CLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUMvQiwrREFBK0QsT0FBTyxJQUFJO0lBQzVFLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxDQUFDLHdEQUF3RDtDQUNqRixDQUFDLENBQUM7QUFFSDs7O0dBR0c7QUFDSCxNQUFNLE1BQU0sR0FBMEIsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLEVBQUU7SUFDM0QsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN0QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDZixPQUFPO1FBQ1QsQ0FBQztRQUVELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2pGLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTyxDQUFDLEtBQUssQ0FBQyxJQUFLLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN6RSxPQUFPO1FBQ1QsQ0FBQztRQUVELHVGQUF1RjtRQUN2Rix3RkFBd0Y7UUFDeEYsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDMUIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLEVBQUUsQ0FBQztnQkFDaEYsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFDWCxNQUFNO29CQUNOLFFBQVE7b0JBQ1IsSUFBSTtvQkFDSixPQUFPLEVBQ0wsV0FBVyxLQUFLLElBQUk7d0JBQ2xCLENBQUMsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDO3dCQUMzQyxDQUFDLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFO2lCQUNsQyxDQUFDLENBQUM7WUFDTCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUMzQixNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUUzQixlQUFlLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVsaW50LCB7UnVsZX0gZnJvbSAnc3R5bGVsaW50JztcbmltcG9ydCB7YmFzZW5hbWV9IGZyb20gJ3BhdGgnO1xuXG5jb25zdCB7dXRpbHMsIGNyZWF0ZVBsdWdpbn0gPSBzdHlsZWxpbnQ7XG5cbmNvbnN0IHJ1bGVOYW1lID0gJ0Bhbmd1bGFyL25vLWNvbmNyZXRlLXJ1bGVzJztcbmNvbnN0IG1lc3NhZ2VzID0gdXRpbHMucnVsZU1lc3NhZ2VzKHJ1bGVOYW1lLCB7XG4gIGV4cGVjdGVkV2l0aFBhdHRlcm46IChwYXR0ZXJuKSA9PlxuICAgIGBDU1MgcnVsZXMgbXVzdCBiZSBwbGFjZWQgaW5zaWRlIGEgbWl4aW4gZm9yIGZpbGVzIG1hdGNoaW5nICcke3BhdHRlcm59Jy5gLFxuICBleHBlY3RlZEFsbEZpbGVzOiAoKSA9PiBgQ1NTIHJ1bGVzIG11c3QgYmUgcGxhY2VkIGluc2lkZSBhIG1peGluIGZvciBhbGwgZmlsZXMuYCxcbn0pO1xuXG4vKipcbiAqIFN0eWxlbGludCBwbHVnaW4gdGhhdCB3aWxsIGxvZyBhIHdhcm5pbmcgZm9yIGFsbCB0b3AtbGV2ZWwgQ1NTIHJ1bGVzLlxuICogQ2FuIGJlIHVzZWQgaW4gdGhlbWUgZmlsZXMgdG8gZW5zdXJlIHRoYXQgZXZlcnl0aGluZyBpcyBpbnNpZGUgYSBtaXhpbi5cbiAqL1xuY29uc3QgcnVsZUZuOiBSdWxlPGJvb2xlYW4sIHN0cmluZz4gPSAoaXNFbmFibGVkLCBvcHRpb25zKSA9PiB7XG4gIHJldHVybiAocm9vdCwgcmVzdWx0KSA9PiB7XG4gICAgaWYgKCFpc0VuYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBmaWxlUGF0dGVybiA9IG9wdGlvbnMuZmlsZVBhdHRlcm4gPyBuZXcgUmVnRXhwKG9wdGlvbnMuZmlsZVBhdHRlcm4pIDogbnVsbDtcbiAgICBjb25zdCBmaWxlTmFtZSA9IGJhc2VuYW1lKHJvb3Quc291cmNlIS5pbnB1dC5maWxlISk7XG5cbiAgICBpZiAoKGZpbGVQYXR0ZXJuICE9PSBudWxsICYmICFmaWxlUGF0dGVybi50ZXN0KGZpbGVOYW1lKSkgfHwgIXJvb3Qubm9kZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBHbyB0aHJvdWdoIGFsbCB0aGUgbm9kZXMgYW5kIHJlcG9ydCBhIHdhcm5pbmcgZm9yIGV2ZXJ5IENTUyBydWxlIG9yIG1peGluIGluY2x1c2lvbi5cbiAgICAvLyBXZSB1c2UgYSByZWd1bGFyIGBmb3JFYWNoYCwgaW5zdGVhZCBvZiB0aGUgUG9zdENTUyB3YWxrZXIgdXRpbHMsIGJlY2F1c2Ugd2Ugb25seSBjYXJlXG4gICAgLy8gYWJvdXQgdGhlIHRvcC1sZXZlbCBub2Rlcy5cbiAgICByb290Lm5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgIGlmIChub2RlLnR5cGUgPT09ICdydWxlJyB8fCAobm9kZS50eXBlID09PSAnYXRydWxlJyAmJiBub2RlLm5hbWUgPT09ICdpbmNsdWRlJykpIHtcbiAgICAgICAgdXRpbHMucmVwb3J0KHtcbiAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgcnVsZU5hbWUsXG4gICAgICAgICAgbm9kZSxcbiAgICAgICAgICBtZXNzYWdlOlxuICAgICAgICAgICAgZmlsZVBhdHRlcm4gIT09IG51bGxcbiAgICAgICAgICAgICAgPyBtZXNzYWdlcy5leHBlY3RlZFdpdGhQYXR0ZXJuKGZpbGVQYXR0ZXJuKVxuICAgICAgICAgICAgICA6IG1lc3NhZ2VzLmV4cGVjdGVkQWxsRmlsZXMoKSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59O1xuXG5ydWxlRm4ucnVsZU5hbWUgPSBydWxlTmFtZTtcbnJ1bGVGbi5tZXNzYWdlcyA9IG1lc3NhZ2VzO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVQbHVnaW4ocnVsZU5hbWUsIHJ1bGVGbik7XG4iXX0=