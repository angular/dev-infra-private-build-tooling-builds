import stylelint from 'stylelint';
import { basename } from 'path';
const { utils, createPlugin } = stylelint;
const ruleName = '@angular/single-line-comment-only';
const messages = utils.ruleMessages(ruleName, {
    expected: () => 'Multi-line comments are not allowed (e.g. /* */). ' + 'Use single-line comments instead (//).',
});
/**
 * Stylelint plugin that doesn't allow multi-line comments to
 * be used, because they'll show up in the user's output.
 */
const ruleFn = (isEnabled, options) => {
    return (root, result) => {
        if (!isEnabled) {
            return;
        }
        const filePattern = options?.filePattern ? new RegExp(options.filePattern) : null;
        if (filePattern && !filePattern?.test(basename(root.source.input.file))) {
            return;
        }
        root.walkComments((comment) => {
            // Allow comments starting with `!` since they're used to tell minifiers to preserve the comment.
            if (!comment.raws.inline && !comment.text.startsWith('!')) {
                utils.report({
                    result,
                    ruleName,
                    message: messages.expected(),
                    node: comment,
                });
            }
        });
    };
};
ruleFn.ruleName = ruleName;
ruleFn.messages = messages;
export default createPlugin(ruleName, ruleFn);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlLWxpbmUtY29tbWVudC1vbmx5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGludC1ydWxlcy9zdHlsZWxpbnQvc2luZ2xlLWxpbmUtY29tbWVudC1vbmx5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBaUIsTUFBTSxXQUFXLENBQUM7QUFDMUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUU5QixNQUFNLEVBQUMsS0FBSyxFQUFFLFlBQVksRUFBQyxHQUFHLFNBQVMsQ0FBQztBQUV4QyxNQUFNLFFBQVEsR0FBRyxtQ0FBbUMsQ0FBQztBQUNyRCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRTtJQUM1QyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQ2Isb0RBQW9ELEdBQUcsd0NBQXdDO0NBQ2xHLENBQUMsQ0FBQztBQUVIOzs7R0FHRztBQUNILE1BQU0sTUFBTSxHQUEwQixDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsRUFBRTtJQUMzRCxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDZCxPQUFPO1NBQ1I7UUFFRCxNQUFNLFdBQVcsR0FBRyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUVsRixJQUFJLFdBQVcsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFPLENBQUMsS0FBSyxDQUFDLElBQUssQ0FBQyxDQUFDLEVBQUU7WUFDekUsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzVCLGlHQUFpRztZQUNqRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDekQsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFDWCxNQUFNO29CQUNOLFFBQVE7b0JBQ1IsT0FBTyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7b0JBQzVCLElBQUksRUFBRSxPQUFPO2lCQUNkLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUMzQixNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUUzQixlQUFlLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVsaW50LCB7UnVsZX0gZnJvbSAnc3R5bGVsaW50JztcbmltcG9ydCB7YmFzZW5hbWV9IGZyb20gJ3BhdGgnO1xuXG5jb25zdCB7dXRpbHMsIGNyZWF0ZVBsdWdpbn0gPSBzdHlsZWxpbnQ7XG5cbmNvbnN0IHJ1bGVOYW1lID0gJ0Bhbmd1bGFyL3NpbmdsZS1saW5lLWNvbW1lbnQtb25seSc7XG5jb25zdCBtZXNzYWdlcyA9IHV0aWxzLnJ1bGVNZXNzYWdlcyhydWxlTmFtZSwge1xuICBleHBlY3RlZDogKCkgPT5cbiAgICAnTXVsdGktbGluZSBjb21tZW50cyBhcmUgbm90IGFsbG93ZWQgKGUuZy4gLyogKi8pLiAnICsgJ1VzZSBzaW5nbGUtbGluZSBjb21tZW50cyBpbnN0ZWFkICgvLykuJyxcbn0pO1xuXG4vKipcbiAqIFN0eWxlbGludCBwbHVnaW4gdGhhdCBkb2Vzbid0IGFsbG93IG11bHRpLWxpbmUgY29tbWVudHMgdG9cbiAqIGJlIHVzZWQsIGJlY2F1c2UgdGhleSdsbCBzaG93IHVwIGluIHRoZSB1c2VyJ3Mgb3V0cHV0LlxuICovXG5jb25zdCBydWxlRm46IFJ1bGU8Ym9vbGVhbiwgc3RyaW5nPiA9IChpc0VuYWJsZWQsIG9wdGlvbnMpID0+IHtcbiAgcmV0dXJuIChyb290LCByZXN1bHQpID0+IHtcbiAgICBpZiAoIWlzRW5hYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGZpbGVQYXR0ZXJuID0gb3B0aW9ucz8uZmlsZVBhdHRlcm4gPyBuZXcgUmVnRXhwKG9wdGlvbnMuZmlsZVBhdHRlcm4pIDogbnVsbDtcblxuICAgIGlmIChmaWxlUGF0dGVybiAmJiAhZmlsZVBhdHRlcm4/LnRlc3QoYmFzZW5hbWUocm9vdC5zb3VyY2UhLmlucHV0LmZpbGUhKSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByb290LndhbGtDb21tZW50cygoY29tbWVudCkgPT4ge1xuICAgICAgLy8gQWxsb3cgY29tbWVudHMgc3RhcnRpbmcgd2l0aCBgIWAgc2luY2UgdGhleSdyZSB1c2VkIHRvIHRlbGwgbWluaWZpZXJzIHRvIHByZXNlcnZlIHRoZSBjb21tZW50LlxuICAgICAgaWYgKCFjb21tZW50LnJhd3MuaW5saW5lICYmICFjb21tZW50LnRleHQuc3RhcnRzV2l0aCgnIScpKSB7XG4gICAgICAgIHV0aWxzLnJlcG9ydCh7XG4gICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgIHJ1bGVOYW1lLFxuICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VzLmV4cGVjdGVkKCksXG4gICAgICAgICAgbm9kZTogY29tbWVudCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59O1xuXG5ydWxlRm4ucnVsZU5hbWUgPSBydWxlTmFtZTtcbnJ1bGVGbi5tZXNzYWdlcyA9IG1lc3NhZ2VzO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVQbHVnaW4ocnVsZU5hbWUsIHJ1bGVGbik7XG4iXX0=