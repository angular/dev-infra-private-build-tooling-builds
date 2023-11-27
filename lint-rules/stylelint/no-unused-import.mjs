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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tdW51c2VkLWltcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpbnQtcnVsZXMvc3R5bGVsaW50L25vLXVudXNlZC1pbXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFpQixNQUFNLFdBQVcsQ0FBQztBQUMxQyxPQUFPLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVwQyxNQUFNLEVBQUMsS0FBSyxFQUFFLFlBQVksRUFBQyxHQUFHLFNBQVMsQ0FBQztBQUV4QyxNQUFNLFFBQVEsR0FBRywyQkFBMkIsQ0FBQztBQUM3QyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRTtJQUM1QyxRQUFRLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLGFBQWEsU0FBUyxxQkFBcUI7SUFDcEUsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FDaEIsb0NBQW9DLElBQUksdUJBQXVCO1FBQy9ELG9EQUFvRDtDQUN2RCxDQUFDLENBQUM7QUFFSCw0REFBNEQ7QUFDNUQsTUFBTSxNQUFNLEdBQTBCLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRTtJQUNyRSxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNmLE9BQU87UUFDVCxDQUFDO1FBRUQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRXBDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN4QixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFLENBQUM7Z0JBQ3hCLE1BQU0sU0FBUyxHQUFHLGdDQUFnQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFaEUsa0ZBQWtGO2dCQUNsRixJ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LEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQzFFLENBQUM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxlQUFlLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVsaW50LCB7UnVsZX0gZnJvbSAnc3R5bGVsaW50JztcbmltcG9ydCB7YmFzZW5hbWUsIGpvaW59IGZyb20gJ3BhdGgnO1xuXG5jb25zdCB7dXRpbHMsIGNyZWF0ZVBsdWdpbn0gPSBzdHlsZWxpbnQ7XG5cbmNvbnN0IHJ1bGVOYW1lID0gJ0Bhbmd1bGFyL25vLXVudXNlZC1pbXBvcnQnO1xuY29uc3QgbWVzc2FnZXMgPSB1dGlscy5ydWxlTWVzc2FnZXMocnVsZU5hbWUsIHtcbiAgZXhwZWN0ZWQ6IChuYW1lc3BhY2UpID0+IGBOYW1lc3BhY2UgJHtuYW1lc3BhY2V9IGlzIG5vdCBiZWluZyB1c2VkLmAsXG4gIGludmFsaWQ6IChydWxlKSA9PlxuICAgIGBGYWlsZWQgdG8gZXh0cmFjdCBuYW1lc3BhY2UgZnJvbSAke3J1bGV9LiBAYW5ndWxhci9uby11bnVzZWQtYCArXG4gICAgYGltcG9ydHMgU3R5bGVsaW50IHJ1bGUgbGlrZWx5IG5lZWRzIHRvIGJlIHVwZGF0ZWQuYCxcbn0pO1xuXG4vKiogU3R5bGVsaW50IHBsdWdpbiB0aGF0IGZsYWdzIHVudXNlZCBgQHVzZWAgc3RhdGVtZW50cy4gKi9cbmNvbnN0IHJ1bGVGbjogUnVsZTxib29sZWFuLCBzdHJpbmc+ID0gKGlzRW5hYmxlZCwgX29wdGlvbnMsIGNvbnRleHQpID0+IHtcbiAgcmV0dXJuIChyb290LCByZXN1bHQpID0+IHtcbiAgICBpZiAoIWlzRW5hYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGZpbGVDb250ZW50ID0gcm9vdC50b1N0cmluZygpO1xuXG4gICAgcm9vdC53YWxrQXRSdWxlcygocnVsZSkgPT4ge1xuICAgICAgaWYgKHJ1bGUubmFtZSA9PT0gJ3VzZScpIHtcbiAgICAgICAgY29uc3QgbmFtZXNwYWNlID0gZXh0cmFjdE5hbWVzcGFjZUZyb21Vc2VTdGF0ZW1lbnQocnVsZS5wYXJhbXMpO1xuXG4gICAgICAgIC8vIEZsYWcgbmFtZXNwYWNlcyB3ZSBkaWRuJ3QgbWFuYWdlIHRvIHBhcnNlIHNvIHRoYXQgd2UgY2FuIGZpeCB0aGUgcGFyc2luZyBsb2dpYy5cbiAgICAgICAgaWYgKCFuYW1lc3BhY2UpIHtcbiAgICAgICAgICB1dGlscy5yZXBvcnQoe1xuICAgICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgICAgcnVsZU5hbWUsXG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlcy5pbnZhbGlkKHJ1bGUucGFyYW1zKSxcbiAgICAgICAgICAgIG5vZGU6IHJ1bGUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWZpbGVDb250ZW50LmluY2x1ZGVzKG5hbWVzcGFjZSArICcuJykpIHtcbiAgICAgICAgICBpZiAoY29udGV4dC5maXgpIHtcbiAgICAgICAgICAgIHJ1bGUucmVtb3ZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHV0aWxzLnJlcG9ydCh7XG4gICAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgICAgcnVsZU5hbWUsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VzLmV4cGVjdGVkKG5hbWVzcGFjZSksXG4gICAgICAgICAgICAgIG5vZGU6IHJ1bGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn07XG5cbnJ1bGVGbi5ydWxlTmFtZSA9IHJ1bGVOYW1lO1xucnVsZUZuLm1lc3NhZ2VzID0gbWVzc2FnZXM7XG5cbi8qKiBFeHRyYWN0cyB0aGUgbmFtZXNwYWNlIG9mIGFuIGBAdXNlYCBydWxlIGZyb20gaXRzIHBhcmFtZXRlcnMuICAqL1xuZnVuY3Rpb24gZXh0cmFjdE5hbWVzcGFjZUZyb21Vc2VTdGF0ZW1lbnQocGFyYW1zOiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgY29uc3Qgb3BlblF1b3RlSW5kZXggPSBNYXRoLm1heChwYXJhbXMuaW5kZXhPZihgXCJgKSwgcGFyYW1zLmluZGV4T2YoYCdgKSk7XG4gIGNvbnN0IGNsb3NlUXVvdGVJbmRleCA9IE1hdGgubWF4KFxuICAgIHBhcmFtcy5pbmRleE9mKGBcImAsIG9wZW5RdW90ZUluZGV4ICsgMSksXG4gICAgcGFyYW1zLmluZGV4T2YoYCdgLCBvcGVuUXVvdGVJbmRleCArIDEpLFxuICApO1xuXG4gIGlmIChjbG9zZVF1b3RlSW5kZXggPiAtMSkge1xuICAgIGNvbnN0IGFzRXhwcmVzc2lvbiA9ICdhcyAnO1xuICAgIGNvbnN0IGFzSW5kZXggPSBwYXJhbXMuaW5kZXhPZihhc0V4cHJlc3Npb24sIGNsb3NlUXVvdGVJbmRleCk7XG4gICAgY29uc3Qgd2l0aEluZGV4ID0gcGFyYW1zLmluZGV4T2YoJyB3aXRoJywgYXNJbmRleCk7XG5cbiAgICAvLyBJZiB3ZSBmb3VuZCBhbiBgIGFzIGAgZXhwcmVzc2lvbiwgd2UgY29uc2lkZXIgdGhlIHJlc3Qgb2YgdGhlIHRleHQgYXMgdGhlIG5hbWVzcGFjZS5cbiAgICBpZiAoYXNJbmRleCA+IC0xKSB7XG4gICAgICByZXR1cm4gd2l0aEluZGV4ID09IC0xXG4gICAgICAgID8gcGFyYW1zLnNsaWNlKGFzSW5kZXggKyBhc0V4cHJlc3Npb24ubGVuZ3RoKS50cmltKClcbiAgICAgICAgOiBwYXJhbXMuc2xpY2UoYXNJbmRleCArIGFzRXhwcmVzc2lvbi5sZW5ndGgsIHdpdGhJbmRleCkudHJpbSgpO1xuICAgIH1cblxuICAgIGNvbnN0IGltcG9ydFBhdGggPSBwYXJhbXNcbiAgICAgIC5zbGljZShvcGVuUXVvdGVJbmRleCArIDEsIGNsb3NlUXVvdGVJbmRleClcbiAgICAgIC8vIFNhc3MgYWxsb3dzIGZvciBsZWFkaW5nIHVuZGVyc2NvcmVzIHRvIGJlIG9taXR0ZWQgYW5kIGl0IHRlY2huaWNhbGx5IHN1cHBvcnRzIC5zY3NzLlxuICAgICAgLnJlcGxhY2UoL15ffChcXC5pbXBvcnQpP1xcLnNjc3MkfFxcLmltcG9ydCQvZywgJycpO1xuXG4gICAgLy8gQnVpbHQtaW4gU2FzcyBpbXBvcnRzIGxvb2sgbGlrZSBgc2FzczptYXBgLlxuICAgIGlmIChpbXBvcnRQYXRoLnN0YXJ0c1dpdGgoJ3Nhc3M6JykpIHtcbiAgICAgIHJldHVybiBpbXBvcnRQYXRoLnNwbGl0KCdzYXNzOicpWzFdO1xuICAgIH1cblxuICAgIC8vIFNhc3MgaWdub3JlcyBgL2luZGV4YCBhbmQgaW5mZXJzIHRoZSBuYW1lc3BhY2UgYXMgdGhlIG5leHQgc2VnbWVudCBpbiB0aGUgcGF0aC5cbiAgICBjb25zdCBmaWxlTmFtZSA9IGJhc2VuYW1lKGltcG9ydFBhdGgpO1xuICAgIHJldHVybiBmaWxlTmFtZSA9PT0gJ2luZGV4JyA/IGJhc2VuYW1lKGpvaW4oZmlsZU5hbWUsICcuLicpKSA6IGZpbGVOYW1lO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVBsdWdpbihydWxlTmFtZSwgcnVsZUZuKTtcbiJdfQ==