import stylelint from 'stylelint';
import { basename, join } from 'path';
const { utils, createPlugin } = stylelint;
const ruleName = '@angular/no-unused-import';
const messages = utils.ruleMessages(ruleName, {
    expected: (namespace) => `Namespace ${namespace} is not being used.`,
    invalid: (rule) => `Failed to extract namespace from ${rule}. @angular/no-unused-` +
        `imports Stylelint rule likely needs to be updated.`,
});
/** Stylelint plugin that flags unused `@use` statements. */
const ruleFn = (isEnabled, _options, context) => {
    return (root, result) => {
        if (!isEnabled) {
            return;
        }
        const fileContent = root.toString();
        root.walkAtRules((rule) => {
            if (rule.name === 'use') {
                const namespace = extractNamespaceFromUseStatement(rule.params);
                // Flag namespaces we didn't manage to parse so that we can fix the parsing logic.
                if (!namespace) {
                    utils.report({
                        result,
                        ruleName,
                        message: messages.invalid(rule.params),
                        node: rule,
                    });
                }
                else if (!fileContent.includes(namespace + '.')) {
                    if (context.fix) {
                        rule.remove();
                    }
                    else {
                        utils.report({
                            result,
                            ruleName,
                            message: messages.expected(namespace),
                            node: rule,
                        });
                    }
                }
            }
        });
    };
};
ruleFn.ruleName = ruleName;
ruleFn.messages = messages;
/** Extracts the namespace of an `@use` rule from its parameters.  */
function extractNamespaceFromUseStatement(params) {
    const openQuoteIndex = Math.max(params.indexOf(`"`), params.indexOf(`'`));
    const closeQuoteIndex = Math.max(params.indexOf(`"`, openQuoteIndex + 1), params.indexOf(`'`, openQuoteIndex + 1));
    if (closeQuoteIndex > -1) {
        const asExpression = 'as ';
        const asIndex = params.indexOf(asExpression, closeQuoteIndex);
        const withIndex = params.indexOf(' with', asIndex);
        // If we found an ` as ` expression, we consider the rest of the text as the namespace.
        if (asIndex > -1) {
            return withIndex == -1
                ? params.slice(asIndex + asExpression.length).trim()
                : params.slice(asIndex + asExpression.length, withIndex).trim();
        }
        const importPath = params
            .slice(openQuoteIndex + 1, closeQuoteIndex)
            // Sass allows for leading underscores to be omitted and it technically supports .scss.
            .replace(/^_|(\.import)?\.scss$|\.import$/g, '');
        // Built-in Sass imports look like `sass:map`.
        if (importPath.startsWith('sass:')) {
            return importPath.split('sass:')[1];
        }
        // Sass ignores `/index` and infers the namespace as the next segment in the path.
        const fileName = basename(importPath);
        return fileName === 'index' ? basename(join(fileName, '..')) : fileName;
    }
    return null;
}
export default createPlugin(ruleName, ruleFn);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tdW51c2VkLWltcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpbnQtcnVsZXMvc3R5bGVsaW50L25vLXVudXNlZC1pbXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFpQixNQUFNLFdBQVcsQ0FBQztBQUMxQyxPQUFPLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVwQyxNQUFNLEVBQUMsS0FBSyxFQUFFLFlBQVksRUFBQyxHQUFHLFNBQVMsQ0FBQztBQUV4QyxNQUFNLFFBQVEsR0FBRywyQkFBMkIsQ0FBQztBQUM3QyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRTtJQUM1QyxRQUFRLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLGFBQWEsU0FBUyxxQkFBcUI7SUFDcEUsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FDaEIsb0NBQW9DLElBQUksdUJBQXVCO1FBQy9ELG9EQUFvRDtDQUN2RCxDQUFDLENBQUM7QUFFSCw0REFBNEQ7QUFDNUQsTUFBTSxNQUFNLEdBQTBCLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRTtJQUNyRSxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDZCxPQUFPO1NBQ1I7UUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3hCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7Z0JBQ3ZCLE1BQU0sU0FBUyxHQUFHLGdDQUFnQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFaEUsa0ZBQWtGO2dCQUNsRixJQUFJLENBQUMsU0FBUyxF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ZUFBZSxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlbGludCwge1J1bGV9IGZyb20gJ3N0eWxlbGludCc7XG5pbXBvcnQge2Jhc2VuYW1lLCBqb2lufSBmcm9tICdwYXRoJztcblxuY29uc3Qge3V0aWxzLCBjcmVhdGVQbHVnaW59ID0gc3R5bGVsaW50O1xuXG5jb25zdCBydWxlTmFtZSA9ICdAYW5ndWxhci9uby11bnVzZWQtaW1wb3J0JztcbmNvbnN0IG1lc3NhZ2VzID0gdXRpbHMucnVsZU1lc3NhZ2VzKHJ1bGVOYW1lLCB7XG4gIGV4cGVjdGVkOiAobmFtZXNwYWNlKSA9PiBgTmFtZXNwYWNlICR7bmFtZXNwYWNlfSBpcyBub3QgYmVpbmcgdXNlZC5gLFxuICBpbnZhbGlkOiAocnVsZSkgPT5cbiAgICBgRmFpbGVkIHRvIGV4dHJhY3QgbmFtZXNwYWNlIGZyb20gJHtydWxlfS4gQGFuZ3VsYXIvbm8tdW51c2VkLWAgK1xuICAgIGBpbXBvcnRzIFN0eWxlbGludCBydWxlIGxpa2VseSBuZWVkcyB0byBiZSB1cGRhdGVkLmAsXG59KTtcblxuLyoqIFN0eWxlbGludCBwbHVnaW4gdGhhdCBmbGFncyB1bnVzZWQgYEB1c2VgIHN0YXRlbWVudHMuICovXG5jb25zdCBydWxlRm46IFJ1bGU8Ym9vbGVhbiwgc3RyaW5nPiA9IChpc0VuYWJsZWQsIF9vcHRpb25zLCBjb250ZXh0KSA9PiB7XG4gIHJldHVybiAocm9vdCwgcmVzdWx0KSA9PiB7XG4gICAgaWYgKCFpc0VuYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBmaWxlQ29udGVudCA9IHJvb3QudG9TdHJpbmcoKTtcblxuICAgIHJvb3Qud2Fsa0F0UnVsZXMoKHJ1bGUpID0+IHtcbiAgICAgIGlmIChydWxlLm5hbWUgPT09ICd1c2UnKSB7XG4gICAgICAgIGNvbnN0IG5hbWVzcGFjZSA9IGV4dHJhY3ROYW1lc3BhY2VGcm9tVXNlU3RhdGVtZW50KHJ1bGUucGFyYW1zKTtcblxuICAgICAgICAvLyBGbGFnIG5hbWVzcGFjZXMgd2UgZGlkbid0IG1hbmFnZSB0byBwYXJzZSBzbyB0aGF0IHdlIGNhbiBmaXggdGhlIHBhcnNpbmcgbG9naWMuXG4gICAgICAgIGlmICghbmFtZXNwYWNlKSB7XG4gICAgICAgICAgdXRpbHMucmVwb3J0KHtcbiAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgIHJ1bGVOYW1lLFxuICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZXMuaW52YWxpZChydWxlLnBhcmFtcyksXG4gICAgICAgICAgICBub2RlOiBydWxlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKCFmaWxlQ29udGVudC5pbmNsdWRlcyhuYW1lc3BhY2UgKyAnLicpKSB7XG4gICAgICAgICAgaWYgKGNvbnRleHQuZml4KSB7XG4gICAgICAgICAgICBydWxlLnJlbW92ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1dGlscy5yZXBvcnQoe1xuICAgICAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgICAgIHJ1bGVOYW1lLFxuICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlcy5leHBlY3RlZChuYW1lc3BhY2UpLFxuICAgICAgICAgICAgICBub2RlOiBydWxlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59O1xuXG5ydWxlRm4ucnVsZU5hbWUgPSBydWxlTmFtZTtcbnJ1bGVGbi5tZXNzYWdlcyA9IG1lc3NhZ2VzO1xuXG4vKiogRXh0cmFjdHMgdGhlIG5hbWVzcGFjZSBvZiBhbiBgQHVzZWAgcnVsZSBmcm9tIGl0cyBwYXJhbWV0ZXJzLiAgKi9cbmZ1bmN0aW9uIGV4dHJhY3ROYW1lc3BhY2VGcm9tVXNlU3RhdGVtZW50KHBhcmFtczogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gIGNvbnN0IG9wZW5RdW90ZUluZGV4ID0gTWF0aC5tYXgocGFyYW1zLmluZGV4T2YoYFwiYCksIHBhcmFtcy5pbmRleE9mKGAnYCkpO1xuICBjb25zdCBjbG9zZVF1b3RlSW5kZXggPSBNYXRoLm1heChcbiAgICBwYXJhbXMuaW5kZXhPZihgXCJgLCBvcGVuUXVvdGVJbmRleCArIDEpLFxuICAgIHBhcmFtcy5pbmRleE9mKGAnYCwgb3BlblF1b3RlSW5kZXggKyAxKSxcbiAgKTtcblxuICBpZiAoY2xvc2VRdW90ZUluZGV4ID4gLTEpIHtcbiAgICBjb25zdCBhc0V4cHJlc3Npb24gPSAnYXMgJztcbiAgICBjb25zdCBhc0luZGV4ID0gcGFyYW1zLmluZGV4T2YoYXNFeHByZXNzaW9uLCBjbG9zZVF1b3RlSW5kZXgpO1xuICAgIGNvbnN0IHdpdGhJbmRleCA9IHBhcmFtcy5pbmRleE9mKCcgd2l0aCcsIGFzSW5kZXgpO1xuXG4gICAgLy8gSWYgd2UgZm91bmQgYW4gYCBhcyBgIGV4cHJlc3Npb24sIHdlIGNvbnNpZGVyIHRoZSByZXN0IG9mIHRoZSB0ZXh0IGFzIHRoZSBuYW1lc3BhY2UuXG4gICAgaWYgKGFzSW5kZXggPiAtMSkge1xuICAgICAgcmV0dXJuIHdpdGhJbmRleCA9PSAtMVxuICAgICAgICA/IHBhcmFtcy5zbGljZShhc0luZGV4ICsgYXNFeHByZXNzaW9uLmxlbmd0aCkudHJpbSgpXG4gICAgICAgIDogcGFyYW1zLnNsaWNlKGFzSW5kZXggKyBhc0V4cHJlc3Npb24ubGVuZ3RoLCB3aXRoSW5kZXgpLnRyaW0oKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbXBvcnRQYXRoID0gcGFyYW1zXG4gICAgICAuc2xpY2Uob3BlblF1b3RlSW5kZXggKyAxLCBjbG9zZVF1b3RlSW5kZXgpXG4gICAgICAvLyBTYXNzIGFsbG93cyBmb3IgbGVhZGluZyB1bmRlcnNjb3JlcyB0byBiZSBvbWl0dGVkIGFuZCBpdCB0ZWNobmljYWxseSBzdXBwb3J0cyAuc2Nzcy5cbiAgICAgIC5yZXBsYWNlKC9eX3woXFwuaW1wb3J0KT9cXC5zY3NzJHxcXC5pbXBvcnQkL2csICcnKTtcblxuICAgIC8vIEJ1aWx0LWluIFNhc3MgaW1wb3J0cyBsb29rIGxpa2UgYHNhc3M6bWFwYC5cbiAgICBpZiAoaW1wb3J0UGF0aC5zdGFydHNXaXRoKCdzYXNzOicpKSB7XG4gICAgICByZXR1cm4gaW1wb3J0UGF0aC5zcGxpdCgnc2FzczonKVsxXTtcbiAgICB9XG5cbiAgICAvLyBTYXNzIGlnbm9yZXMgYC9pbmRleGAgYW5kIGluZmVycyB0aGUgbmFtZXNwYWNlIGFzIHRoZSBuZXh0IHNlZ21lbnQgaW4gdGhlIHBhdGguXG4gICAgY29uc3QgZmlsZU5hbWUgPSBiYXNlbmFtZShpbXBvcnRQYXRoKTtcbiAgICByZXR1cm4gZmlsZU5hbWUgPT09ICdpbmRleCcgPyBiYXNlbmFtZShqb2luKGZpbGVOYW1lLCAnLi4nKSkgOiBmaWxlTmFtZTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVQbHVnaW4ocnVsZU5hbWUsIHJ1bGVGbik7XG4iXX0=