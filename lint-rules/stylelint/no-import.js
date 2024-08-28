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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8taW1wb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGludC1ydWxlcy9zdHlsZWxpbnQvbm8taW1wb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQTBDO0FBQzFDLCtCQUE4QjtBQUU5QixNQUFNLEVBQUMsS0FBSyxFQUFFLFlBQVksRUFBQyxHQUFHLG1CQUFTLENBQUM7QUFFeEMsTUFBTSxRQUFRLEdBQUcsb0JBQW9CLENBQUM7QUFDdEMsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUU7SUFDNUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLDJDQUEyQztDQUM1RCxDQUFDLENBQUM7QUFFSCxnRUFBZ0U7QUFDaEUsTUFBTSxNQUFNLEdBQXFDLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFFO0lBQ3RFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDdEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2YsT0FBTztRQUNULENBQUM7UUFFRCxNQUFNLGNBQWMsR0FBRyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUU3RSxJQUFJLGNBQWMsRUFBRSxJQUFJLENBQUMsSUFBQSxlQUFRLEVBQUMsSUFBSSxDQUFDLE1BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzdELE9BQU87UUFDVCxDQUFDO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3hCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQztnQkFDM0IsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFDWCxNQUFNO29CQUNOLFFBQVE7b0JBQ1IsT0FBTyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7b0JBQzVCLElBQUksRUFBRSxJQUFJO2lCQUNYLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQzNCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBRTNCLGtCQUFlLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVsaW50LCB7UnVsZX0gZnJvbSAnc3R5bGVsaW50JztcbmltcG9ydCB7YmFzZW5hbWV9IGZyb20gJ3BhdGgnO1xuXG5jb25zdCB7dXRpbHMsIGNyZWF0ZVBsdWdpbn0gPSBzdHlsZWxpbnQ7XG5cbmNvbnN0IHJ1bGVOYW1lID0gJ0Bhbmd1bGFyL25vLWltcG9ydCc7XG5jb25zdCBtZXNzYWdlcyA9IHV0aWxzLnJ1bGVNZXNzYWdlcyhydWxlTmFtZSwge1xuICBleHBlY3RlZDogKCkgPT4gJ0BpbXBvcnQgaXMgbm90IGFsbG93ZWQuIFVzZSBAdXNlIGluc3RlYWQuJyxcbn0pO1xuXG4vKiogU3R5bGVsaW50IHBsdWdpbiB0aGF0IGRvZXNuJ3QgYWxsb3cgYEBpbXBvcnRgIHRvIGJlIHVzZWQuICovXG5jb25zdCBydWxlRm46IFJ1bGU8Ym9vbGVhbiwge2V4Y2x1ZGU6IHN0cmluZ30+ID0gKGlzRW5hYmxlZCwgb3B0aW9ucykgPT4ge1xuICByZXR1cm4gKHJvb3QsIHJlc3VsdCkgPT4ge1xuICAgIGlmICghaXNFbmFibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZXhjbHVkZVBhdHRlcm4gPSBvcHRpb25zPy5leGNsdWRlID8gbmV3IFJlZ0V4cChvcHRpb25zLmV4Y2x1ZGUpIDogbnVsbDtcblxuICAgIGlmIChleGNsdWRlUGF0dGVybj8udGVzdChiYXNlbmFtZShyb290LnNvdXJjZSEuaW5wdXQuZmlsZSEpKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJvb3Qud2Fsa0F0UnVsZXMoKHJ1bGUpID0+IHtcbiAgICAgIGlmIChydWxlLm5hbWUgPT09ICdpbXBvcnQnKSB7XG4gICAgICAgIHV0aWxzLnJlcG9ydCh7XG4gICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgIHJ1bGVOYW1lLFxuICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VzLmV4cGVjdGVkKCksXG4gICAgICAgICAgbm9kZTogcnVsZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59O1xuXG5ydWxlRm4ucnVsZU5hbWUgPSBydWxlTmFtZTtcbnJ1bGVGbi5tZXNzYWdlcyA9IG1lc3NhZ2VzO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVQbHVnaW4ocnVsZU5hbWUsIHJ1bGVGbik7XG4iXX0=