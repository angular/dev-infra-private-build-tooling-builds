"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stylelint_1 = __importDefault(require("stylelint"));
const path_1 = require("path");
const { utils, createPlugin } = stylelint_1.default;
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
        const fileName = (0, path_1.basename)(importPath);
        return fileName === 'index' ? (0, path_1.basename)((0, path_1.join)(fileName, '..')) : fileName;
    }
    return null;
}
exports.default = createPlugin(ruleName, ruleFn);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tdW51c2VkLWltcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpbnQtcnVsZXMvc3R5bGVsaW50L25vLXVudXNlZC1pbXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwwREFBMEM7QUFDMUMsK0JBQW9DO0FBRXBDLE1BQU0sRUFBQyxLQUFLLEVBQUUsWUFBWSxFQUFDLEdBQUcsbUJBQVMsQ0FBQztBQUV4QyxNQUFNLFFBQVEsR0FBRywyQkFBMkIsQ0FBQztBQUM3QyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRTtJQUM1QyxRQUFRLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLGFBQWEsU0FBUyxxQkFBcUI7SUFDcEUsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FDaEIsb0NBQW9DLElBQUksdUJBQXVCO1FBQy9ELG9EQUFvRDtDQUN2RCxDQUFDLENBQUM7QUFFSCw0REFBNEQ7QUFDNUQsTUFBTSxNQUFNLEdBQTBCLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRTtJQUNyRSxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDZCxPQUFPO1NBQ1I7UUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3hCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7Z0JBQ3ZCLE1BQU0sU0FBUyxHQUFHLGdDQUFnQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFaEUsa0ZBQWtGO2dCQUNsRixJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNkLEtBQUssQ0FBQyxNQUFNLENBQUM7d0JBQ1gsTUFBTTt3QkFDTixRQUFR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Q0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWxpbnQsIHtSdWxlfSBmcm9tICdzdHlsZWxpbnQnO1xuaW1wb3J0IHtiYXNlbmFtZSwgam9pbn0gZnJvbSAncGF0aCc7XG5cbmNvbnN0IHt1dGlscywgY3JlYXRlUGx1Z2lufSA9IHN0eWxlbGludDtcblxuY29uc3QgcnVsZU5hbWUgPSAnQGFuZ3VsYXIvbm8tdW51c2VkLWltcG9ydCc7XG5jb25zdCBtZXNzYWdlcyA9IHV0aWxzLnJ1bGVNZXNzYWdlcyhydWxlTmFtZSwge1xuICBleHBlY3RlZDogKG5hbWVzcGFjZSkgPT4gYE5hbWVzcGFjZSAke25hbWVzcGFjZX0gaXMgbm90IGJlaW5nIHVzZWQuYCxcbiAgaW52YWxpZDogKHJ1bGUpID0+XG4gICAgYEZhaWxlZCB0byBleHRyYWN0IG5hbWVzcGFjZSBmcm9tICR7cnVsZX0uIEBhbmd1bGFyL25vLXVudXNlZC1gICtcbiAgICBgaW1wb3J0cyBTdHlsZWxpbnQgcnVsZSBsaWtlbHkgbmVlZHMgdG8gYmUgdXBkYXRlZC5gLFxufSk7XG5cbi8qKiBTdHlsZWxpbnQgcGx1Z2luIHRoYXQgZmxhZ3MgdW51c2VkIGBAdXNlYCBzdGF0ZW1lbnRzLiAqL1xuY29uc3QgcnVsZUZuOiBSdWxlPGJvb2xlYW4sIHN0cmluZz4gPSAoaXNFbmFibGVkLCBfb3B0aW9ucywgY29udGV4dCkgPT4ge1xuICByZXR1cm4gKHJvb3QsIHJlc3VsdCkgPT4ge1xuICAgIGlmICghaXNFbmFibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZmlsZUNvbnRlbnQgPSByb290LnRvU3RyaW5nKCk7XG5cbiAgICByb290LndhbGtBdFJ1bGVzKChydWxlKSA9PiB7XG4gICAgICBpZiAocnVsZS5uYW1lID09PSAndXNlJykge1xuICAgICAgICBjb25zdCBuYW1lc3BhY2UgPSBleHRyYWN0TmFtZXNwYWNlRnJvbVVzZVN0YXRlbWVudChydWxlLnBhcmFtcyk7XG5cbiAgICAgICAgLy8gRmxhZyBuYW1lc3BhY2VzIHdlIGRpZG4ndCBtYW5hZ2UgdG8gcGFyc2Ugc28gdGhhdCB3ZSBjYW4gZml4IHRoZSBwYXJzaW5nIGxvZ2ljLlxuICAgICAgICBpZiAoIW5hbWVzcGFjZSkge1xuICAgICAgICAgIHV0aWxzLnJlcG9ydCh7XG4gICAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgICBydWxlTmFtZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VzLmludmFsaWQocnVsZS5wYXJhbXMpLFxuICAgICAgICAgICAgbm9kZTogcnVsZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICghZmlsZUNvbnRlbnQuaW5jbHVkZXMobmFtZXNwYWNlICsgJy4nKSkge1xuICAgICAgICAgIGlmIChjb250ZXh0LmZpeCkge1xuICAgICAgICAgICAgcnVsZS5yZW1vdmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXRpbHMucmVwb3J0KHtcbiAgICAgICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgICAgICBydWxlTmFtZSxcbiAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZXMuZXhwZWN0ZWQobmFtZXNwYWNlKSxcbiAgICAgICAgICAgICAgbm9kZTogcnVsZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xufTtcblxucnVsZUZuLnJ1bGVOYW1lID0gcnVsZU5hbWU7XG5ydWxlRm4ubWVzc2FnZXMgPSBtZXNzYWdlcztcblxuLyoqIEV4dHJhY3RzIHRoZSBuYW1lc3BhY2Ugb2YgYW4gYEB1c2VgIHJ1bGUgZnJvbSBpdHMgcGFyYW1ldGVycy4gICovXG5mdW5jdGlvbiBleHRyYWN0TmFtZXNwYWNlRnJvbVVzZVN0YXRlbWVudChwYXJhbXM6IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICBjb25zdCBvcGVuUXVvdGVJbmRleCA9IE1hdGgubWF4KHBhcmFtcy5pbmRleE9mKGBcImApLCBwYXJhbXMuaW5kZXhPZihgJ2ApKTtcbiAgY29uc3QgY2xvc2VRdW90ZUluZGV4ID0gTWF0aC5tYXgoXG4gICAgcGFyYW1zLmluZGV4T2YoYFwiYCwgb3BlblF1b3RlSW5kZXggKyAxKSxcbiAgICBwYXJhbXMuaW5kZXhPZihgJ2AsIG9wZW5RdW90ZUluZGV4ICsgMSksXG4gICk7XG5cbiAgaWYgKGNsb3NlUXVvdGVJbmRleCA+IC0xKSB7XG4gICAgY29uc3QgYXNFeHByZXNzaW9uID0gJ2FzICc7XG4gICAgY29uc3QgYXNJbmRleCA9IHBhcmFtcy5pbmRleE9mKGFzRXhwcmVzc2lvbiwgY2xvc2VRdW90ZUluZGV4KTtcbiAgICBjb25zdCB3aXRoSW5kZXggPSBwYXJhbXMuaW5kZXhPZignIHdpdGgnLCBhc0luZGV4KTtcblxuICAgIC8vIElmIHdlIGZvdW5kIGFuIGAgYXMgYCBleHByZXNzaW9uLCB3ZSBjb25zaWRlciB0aGUgcmVzdCBvZiB0aGUgdGV4dCBhcyB0aGUgbmFtZXNwYWNlLlxuICAgIGlmIChhc0luZGV4ID4gLTEpIHtcbiAgICAgIHJldHVybiB3aXRoSW5kZXggPT0gLTFcbiAgICAgICAgPyBwYXJhbXMuc2xpY2UoYXNJbmRleCArIGFzRXhwcmVzc2lvbi5sZW5ndGgpLnRyaW0oKVxuICAgICAgICA6IHBhcmFtcy5zbGljZShhc0luZGV4ICsgYXNFeHByZXNzaW9uLmxlbmd0aCwgd2l0aEluZGV4KS50cmltKCk7XG4gICAgfVxuXG4gICAgY29uc3QgaW1wb3J0UGF0aCA9IHBhcmFtc1xuICAgICAgLnNsaWNlKG9wZW5RdW90ZUluZGV4ICsgMSwgY2xvc2VRdW90ZUluZGV4KVxuICAgICAgLy8gU2FzcyBhbGxvd3MgZm9yIGxlYWRpbmcgdW5kZXJzY29yZXMgdG8gYmUgb21pdHRlZCBhbmQgaXQgdGVjaG5pY2FsbHkgc3VwcG9ydHMgLnNjc3MuXG4gICAgICAucmVwbGFjZSgvXl98KFxcLmltcG9ydCk/XFwuc2NzcyR8XFwuaW1wb3J0JC9nLCAnJyk7XG5cbiAgICAvLyBCdWlsdC1pbiBTYXNzIGltcG9ydHMgbG9vayBsaWtlIGBzYXNzOm1hcGAuXG4gICAgaWYgKGltcG9ydFBhdGguc3RhcnRzV2l0aCgnc2FzczonKSkge1xuICAgICAgcmV0dXJuIGltcG9ydFBhdGguc3BsaXQoJ3Nhc3M6JylbMV07XG4gICAgfVxuXG4gICAgLy8gU2FzcyBpZ25vcmVzIGAvaW5kZXhgIGFuZCBpbmZlcnMgdGhlIG5hbWVzcGFjZSBhcyB0aGUgbmV4dCBzZWdtZW50IGluIHRoZSBwYXRoLlxuICAgIGNvbnN0IGZpbGVOYW1lID0gYmFzZW5hbWUoaW1wb3J0UGF0aCk7XG4gICAgcmV0dXJuIGZpbGVOYW1lID09PSAnaW5kZXgnID8gYmFzZW5hbWUoam9pbihmaWxlTmFtZSwgJy4uJykpIDogZmlsZU5hbWU7XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUGx1Z2luKHJ1bGVOYW1lLCBydWxlRm4pO1xuIl19