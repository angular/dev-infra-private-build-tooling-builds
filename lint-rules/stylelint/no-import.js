"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stylelint_1 = __importDefault(require("stylelint"));
const path_1 = require("path");
const { utils, createPlugin } = stylelint_1.default;
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
        if (excludePattern?.test((0, path_1.basename)(root.source.input.file))) {
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
exports.default = createPlugin(ruleName, ruleFn);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8taW1wb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGludC1ydWxlcy9zdHlsZWxpbnQvbm8taW1wb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQTBDO0FBQzFDLCtCQUE4QjtBQUU5QixNQUFNLEVBQUMsS0FBSyxFQUFFLFlBQVksRUFBQyxHQUFHLG1CQUFTLENBQUM7QUFFeEMsTUFBTSxRQUFRLEdBQUcsb0JBQW9CLENBQUM7QUFDdEMsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUU7SUFDNUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLDJDQUEyQztDQUM1RCxDQUFDLENBQUM7QUFFSCxnRUFBZ0U7QUFDaEUsTUFBTSxNQUFNLEdBQTBCLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFFO0lBQzNELE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDdEIsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLE9BQU87U0FDUjtRQUVELE1BQU0sY0FBYyxHQUFHLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRTdFLElBQUksY0FBYyxFQUFFLElBQUksQ0FBQyxJQUFBLGVBQVEsRUFBQyxJQUFJLENBQUMsTUFBTyxDQUFDLEtBQUssQ0FBQyxJQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzVELE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN4QixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUMxQixLQUFLLENBQUMsTUFBTSxDQUFDO29CQUNYLE1BQU07b0JBQ04sUUFBUTtvQkFDUixPQUFPLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRTtvQkFDNUIsSUFBSSxFQUFFLElBQUk7aUJBQ1gsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQzNCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBRTNCLGtCQUFlLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVsaW50LCB7UnVsZX0gZnJvbSAnc3R5bGVsaW50JztcbmltcG9ydCB7YmFzZW5hbWV9IGZyb20gJ3BhdGgnO1xuXG5jb25zdCB7dXRpbHMsIGNyZWF0ZVBsdWdpbn0gPSBzdHlsZWxpbnQ7XG5cbmNvbnN0IHJ1bGVOYW1lID0gJ0Bhbmd1bGFyL25vLWltcG9ydCc7XG5jb25zdCBtZXNzYWdlcyA9IHV0aWxzLnJ1bGVNZXNzYWdlcyhydWxlTmFtZSwge1xuICBleHBlY3RlZDogKCkgPT4gJ0BpbXBvcnQgaXMgbm90IGFsbG93ZWQuIFVzZSBAdXNlIGluc3RlYWQuJyxcbn0pO1xuXG4vKiogU3R5bGVsaW50IHBsdWdpbiB0aGF0IGRvZXNuJ3QgYWxsb3cgYEBpbXBvcnRgIHRvIGJlIHVzZWQuICovXG5jb25zdCBydWxlRm46IFJ1bGU8Ym9vbGVhbiwgc3RyaW5nPiA9IChpc0VuYWJsZWQsIG9wdGlvbnMpID0+IHtcbiAgcmV0dXJuIChyb290LCByZXN1bHQpID0+IHtcbiAgICBpZiAoIWlzRW5hYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGV4Y2x1ZGVQYXR0ZXJuID0gb3B0aW9ucz8uZXhjbHVkZSA/IG5ldyBSZWdFeHAob3B0aW9ucy5leGNsdWRlKSA6IG51bGw7XG5cbiAgICBpZiAoZXhjbHVkZVBhdHRlcm4/LnRlc3QoYmFzZW5hbWUocm9vdC5zb3VyY2UhLmlucHV0LmZpbGUhKSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByb290LndhbGtBdFJ1bGVzKChydWxlKSA9PiB7XG4gICAgICBpZiAocnVsZS5uYW1lID09PSAnaW1wb3J0Jykge1xuICAgICAgICB1dGlscy5yZXBvcnQoe1xuICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICBydWxlTmFtZSxcbiAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlcy5leHBlY3RlZCgpLFxuICAgICAgICAgIG5vZGU6IHJ1bGUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xufTtcblxucnVsZUZuLnJ1bGVOYW1lID0gcnVsZU5hbWU7XG5ydWxlRm4ubWVzc2FnZXMgPSBtZXNzYWdlcztcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUGx1Z2luKHJ1bGVOYW1lLCBydWxlRm4pO1xuIl19