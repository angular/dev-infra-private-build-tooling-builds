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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8taW1wb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGludC1ydWxlcy9zdHlsZWxpbnQvbm8taW1wb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBaUIsTUFBTSxXQUFXLENBQUM7QUFDMUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUU5QixNQUFNLEVBQUMsS0FBSyxFQUFFLFlBQVksRUFBQyxHQUFHLFNBQVMsQ0FBQztBQUV4QyxNQUFNLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQztBQUN0QyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRTtJQUM1QyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsMkNBQTJDO0NBQzVELENBQUMsQ0FBQztBQUVILGdFQUFnRTtBQUNoRSxNQUFNLE1BQU0sR0FBcUMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLEVBQUU7SUFDdEUsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN0QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDZixPQUFPO1FBQ1QsQ0FBQztRQUVELE1BQU0sY0FBYyxHQUFHLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRTdFLElBQUksY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzdELE9BQU87UUFDVCxDQUFDO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3hCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQztnQkFDM0IsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFDWCxNQUFNO29CQUNOLFFBQVE7b0JBQ1IsT0FBTyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7b0JBQzVCLElBQUksRUFBRSxJQUFJO2lCQUNYLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQzNCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBRTNCLGVBQWUsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWxpbnQsIHtSdWxlfSBmcm9tICdzdHlsZWxpbnQnO1xuaW1wb3J0IHtiYXNlbmFtZX0gZnJvbSAncGF0aCc7XG5cbmNvbnN0IHt1dGlscywgY3JlYXRlUGx1Z2lufSA9IHN0eWxlbGludDtcblxuY29uc3QgcnVsZU5hbWUgPSAnQGFuZ3VsYXIvbm8taW1wb3J0JztcbmNvbnN0IG1lc3NhZ2VzID0gdXRpbHMucnVsZU1lc3NhZ2VzKHJ1bGVOYW1lLCB7XG4gIGV4cGVjdGVkOiAoKSA9PiAnQGltcG9ydCBpcyBub3QgYWxsb3dlZC4gVXNlIEB1c2UgaW5zdGVhZC4nLFxufSk7XG5cbi8qKiBTdHlsZWxpbnQgcGx1Z2luIHRoYXQgZG9lc24ndCBhbGxvdyBgQGltcG9ydGAgdG8gYmUgdXNlZC4gKi9cbmNvbnN0IHJ1bGVGbjogUnVsZTxib29sZWFuLCB7ZXhjbHVkZTogc3RyaW5nfT4gPSAoaXNFbmFibGVkLCBvcHRpb25zKSA9PiB7XG4gIHJldHVybiAocm9vdCwgcmVzdWx0KSA9PiB7XG4gICAgaWYgKCFpc0VuYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBleGNsdWRlUGF0dGVybiA9IG9wdGlvbnM/LmV4Y2x1ZGUgPyBuZXcgUmVnRXhwKG9wdGlvbnMuZXhjbHVkZSkgOiBudWxsO1xuXG4gICAgaWYgKGV4Y2x1ZGVQYXR0ZXJuPy50ZXN0KGJhc2VuYW1lKHJvb3Quc291cmNlIS5pbnB1dC5maWxlISkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcm9vdC53YWxrQXRSdWxlcygocnVsZSkgPT4ge1xuICAgICAgaWYgKHJ1bGUubmFtZSA9PT0gJ2ltcG9ydCcpIHtcbiAgICAgICAgdXRpbHMucmVwb3J0KHtcbiAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgcnVsZU5hbWUsXG4gICAgICAgICAgbWVzc2FnZTogbWVzc2FnZXMuZXhwZWN0ZWQoKSxcbiAgICAgICAgICBub2RlOiBydWxlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn07XG5cbnJ1bGVGbi5ydWxlTmFtZSA9IHJ1bGVOYW1lO1xucnVsZUZuLm1lc3NhZ2VzID0gbWVzc2FnZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVBsdWdpbihydWxlTmFtZSwgcnVsZUZuKTtcbiJdfQ==