import stylelint from 'stylelint';
import { basename } from 'path';
const { utils, createPlugin } = stylelint;
const ruleName = '@angular/no-import';
const messages = utils.ruleMessages(ruleName, {
    expected: () => '@import is not allowed. Use @use instead.',
});
/** Stylelint plugin that doesn't allow `@import` to be used. */
const ruleFn = (isEnabled, options) => {
    return (root, result) => {
        if (!isEnabled) {
            return;
        }
        const excludePattern = options?.exclude ? new RegExp(options.exclude) : null;
        if (excludePattern?.test(basename(root.source.input.file))) {
            return;
        }
        root.walkAtRules((rule) => {
            if (rule.name === 'import') {
                utils.report({
                    result,
                    ruleName,
                    message: messages.expected(),
                    node: rule,
                });
            }
        });
    };
};
ruleFn.ruleName = ruleName;
ruleFn.messages = messages;
export default createPlugin(ruleName, ruleFn);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8taW1wb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGludC1ydWxlcy9zdHlsZWxpbnQvbm8taW1wb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBaUIsTUFBTSxXQUFXLENBQUM7QUFDMUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUU5QixNQUFNLEVBQUMsS0FBSyxFQUFFLFlBQVksRUFBQyxHQUFHLFNBQVMsQ0FBQztBQUV4QyxNQUFNLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQztBQUN0QyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRTtJQUM1QyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsMkNBQTJDO0NBQzVELENBQUMsQ0FBQztBQUVILGdFQUFnRTtBQUNoRSxNQUFNLE1BQU0sR0FBMEIsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLEVBQUU7SUFDM0QsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN0QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDZixPQUFPO1FBQ1QsQ0FBQztRQUVELE1BQU0sY0FBYyxHQUFHLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRTdFLElBQUksY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzdELE9BQU87UUFDVCxDQUFDO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3hCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQztnQkFDM0IsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFDWCxNQUFNO29CQUNOLFFBQVE7b0JBQ1IsT0FBTyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7b0JBQzVCLElBQUksRUFBRSxJQUFJO2lCQUNYLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQzNCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBRTNCLGVBQWUsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWxpbnQsIHtSdWxlfSBmcm9tICdzdHlsZWxpbnQnO1xuaW1wb3J0IHtiYXNlbmFtZX0gZnJvbSAncGF0aCc7XG5cbmNvbnN0IHt1dGlscywgY3JlYXRlUGx1Z2lufSA9IHN0eWxlbGludDtcblxuY29uc3QgcnVsZU5hbWUgPSAnQGFuZ3VsYXIvbm8taW1wb3J0JztcbmNvbnN0IG1lc3NhZ2VzID0gdXRpbHMucnVsZU1lc3NhZ2VzKHJ1bGVOYW1lLCB7XG4gIGV4cGVjdGVkOiAoKSA9PiAnQGltcG9ydCBpcyBub3QgYWxsb3dlZC4gVXNlIEB1c2UgaW5zdGVhZC4nLFxufSk7XG5cbi8qKiBTdHlsZWxpbnQgcGx1Z2luIHRoYXQgZG9lc24ndCBhbGxvdyBgQGltcG9ydGAgdG8gYmUgdXNlZC4gKi9cbmNvbnN0IHJ1bGVGbjogUnVsZTxib29sZWFuLCBzdHJpbmc+ID0gKGlzRW5hYmxlZCwgb3B0aW9ucykgPT4ge1xuICByZXR1cm4gKHJvb3QsIHJlc3VsdCkgPT4ge1xuICAgIGlmICghaXNFbmFibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZXhjbHVkZVBhdHRlcm4gPSBvcHRpb25zPy5leGNsdWRlID8gbmV3IFJlZ0V4cChvcHRpb25zLmV4Y2x1ZGUpIDogbnVsbDtcblxuICAgIGlmIChleGNsdWRlUGF0dGVybj8udGVzdChiYXNlbmFtZShyb290LnNvdXJjZSEuaW5wdXQuZmlsZSEpKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJvb3Qud2Fsa0F0UnVsZXMoKHJ1bGUpID0+IHtcbiAgICAgIGlmIChydWxlLm5hbWUgPT09ICdpbXBvcnQnKSB7XG4gICAgICAgIHV0aWxzLnJlcG9ydCh7XG4gICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgIHJ1bGVOYW1lLFxuICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VzLmV4cGVjdGVkKCksXG4gICAgICAgICAgbm9kZTogcnVsZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59O1xuXG5ydWxlRm4ucnVsZU5hbWUgPSBydWxlTmFtZTtcbnJ1bGVGbi5tZXNzYWdlcyA9IG1lc3NhZ2VzO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVQbHVnaW4ocnVsZU5hbWUsIHJ1bGVGbik7XG4iXX0=