"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stylelint_1 = __importDefault(require("stylelint"));
const path_1 = require("path");
const { utils, createPlugin } = stylelint_1.default;
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
        if (filePattern && !filePattern?.test((0, path_1.basename)(root.source.input.file))) {
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
exports.default = createPlugin(ruleName, ruleFn);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlLWxpbmUtY29tbWVudC1vbmx5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGludC1ydWxlcy9zdHlsZWxpbnQvc2luZ2xlLWxpbmUtY29tbWVudC1vbmx5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQTBDO0FBQzFDLCtCQUE4QjtBQUU5QixNQUFNLEVBQUMsS0FBSyxFQUFFLFlBQVksRUFBQyxHQUFHLG1CQUFTLENBQUM7QUFFeEMsTUFBTSxRQUFRLEdBQUcsbUNBQW1DLENBQUM7QUFDckQsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUU7SUFDNUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUNiLG9EQUFvRCxHQUFHLHdDQUF3QztDQUNsRyxDQUFDLENBQUM7QUFFSDs7O0dBR0c7QUFDSCxNQUFNLE1BQU0sR0FBMEIsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLEVBQUU7SUFDM0QsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUN0QixJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2QsT0FBTztTQUNSO1FBRUQsTUFBTSxXQUFXLEdBQUcsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFbEYsSUFBSSxXQUFXLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUEsZUFBUSxFQUFDLElBQUksQ0FBQyxNQUFPLENBQUMsS0FBSyxDQUFDLElBQUssQ0FBQyxDQUFDLEVBQUU7WUFDekUsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzVCLGlHQUFpRztZQUNqRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDekQsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFDWCxNQUFNO29CQUNOLFFBQVE7b0JBQ1IsT0FBTyxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7b0JBQzVCLElBQUksRUFBRSxPQUFPO2lCQUNkLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUMzQixNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUUzQixrQkFBZSxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlbGludCwge1J1bGV9IGZyb20gJ3N0eWxlbGludCc7XG5pbXBvcnQge2Jhc2VuYW1lfSBmcm9tICdwYXRoJztcblxuY29uc3Qge3V0aWxzLCBjcmVhdGVQbHVnaW59ID0gc3R5bGVsaW50O1xuXG5jb25zdCBydWxlTmFtZSA9ICdAYW5ndWxhci9zaW5nbGUtbGluZS1jb21tZW50LW9ubHknO1xuY29uc3QgbWVzc2FnZXMgPSB1dGlscy5ydWxlTWVzc2FnZXMocnVsZU5hbWUsIHtcbiAgZXhwZWN0ZWQ6ICgpID0+XG4gICAgJ011bHRpLWxpbmUgY29tbWVudHMgYXJlIG5vdCBhbGxvd2VkIChlLmcuIC8qICovKS4gJyArICdVc2Ugc2luZ2xlLWxpbmUgY29tbWVudHMgaW5zdGVhZCAoLy8pLicsXG59KTtcblxuLyoqXG4gKiBTdHlsZWxpbnQgcGx1Z2luIHRoYXQgZG9lc24ndCBhbGxvdyBtdWx0aS1saW5lIGNvbW1lbnRzIHRvXG4gKiBiZSB1c2VkLCBiZWNhdXNlIHRoZXknbGwgc2hvdyB1cCBpbiB0aGUgdXNlcidzIG91dHB1dC5cbiAqL1xuY29uc3QgcnVsZUZuOiBSdWxlPGJvb2xlYW4sIHN0cmluZz4gPSAoaXNFbmFibGVkLCBvcHRpb25zKSA9PiB7XG4gIHJldHVybiAocm9vdCwgcmVzdWx0KSA9PiB7XG4gICAgaWYgKCFpc0VuYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBmaWxlUGF0dGVybiA9IG9wdGlvbnM/LmZpbGVQYXR0ZXJuID8gbmV3IFJlZ0V4cChvcHRpb25zLmZpbGVQYXR0ZXJuKSA6IG51bGw7XG5cbiAgICBpZiAoZmlsZVBhdHRlcm4gJiYgIWZpbGVQYXR0ZXJuPy50ZXN0KGJhc2VuYW1lKHJvb3Quc291cmNlIS5pbnB1dC5maWxlISkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcm9vdC53YWxrQ29tbWVudHMoKGNvbW1lbnQpID0+IHtcbiAgICAgIC8vIEFsbG93IGNvbW1lbnRzIHN0YXJ0aW5nIHdpdGggYCFgIHNpbmNlIHRoZXkncmUgdXNlZCB0byB0ZWxsIG1pbmlmaWVycyB0byBwcmVzZXJ2ZSB0aGUgY29tbWVudC5cbiAgICAgIGlmICghY29tbWVudC5yYXdzLmlubGluZSAmJiAhY29tbWVudC50ZXh0LnN0YXJ0c1dpdGgoJyEnKSkge1xuICAgICAgICB1dGlscy5yZXBvcnQoe1xuICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICBydWxlTmFtZSxcbiAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlcy5leHBlY3RlZCgpLFxuICAgICAgICAgIG5vZGU6IGNvbW1lbnQsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xufTtcblxucnVsZUZuLnJ1bGVOYW1lID0gcnVsZU5hbWU7XG5ydWxlRm4ubWVzc2FnZXMgPSBtZXNzYWdlcztcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUGx1Z2luKHJ1bGVOYW1lLCBydWxlRm4pO1xuIl19