"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stylelint_1 = __importDefault(require("stylelint"));
const { utils, createPlugin } = stylelint_1.default;
const isStandardSyntaxRule = require('stylelint/lib/utils/isStandardSyntaxRule');
const isStandardSyntaxSelector = require('stylelint/lib/utils/isStandardSyntaxSelector');
const ruleName = '@angular/selector-no-deep';
const messages = utils.ruleMessages(ruleName, {
    expected: (selector) => `Usage of the /deep/ in "${selector}" is not allowed`,
});
/**
 * Stylelint plugin that prevents uses of /deep/ in selectors.
 */
const ruleFn = (isEnabled) => {
    return (root, result) => {
        if (!isEnabled) {
            return;
        }
        root.walkRules((rule) => {
            if (rule.parent?.type === 'rule' &&
                isStandardSyntaxRule(rule) &&
                isStandardSyntaxSelector(rule.selector) &&
                rule.selector.includes('/deep/')) {
                utils.report({
                    result,
                    ruleName,
                    message: messages.expected(rule.selector),
                    node: rule,
                });
            }
        });
    };
};
ruleFn.ruleName = ruleName;
ruleFn.messages = messages;
exports.default = createPlugin(ruleName, ruleFn);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3Itbm8tZGVlcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpbnQtcnVsZXMvc3R5bGVsaW50L3NlbGVjdG9yLW5vLWRlZXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwwREFBMEM7QUFFMUMsTUFBTSxFQUFDLEtBQUssRUFBRSxZQUFZLEVBQUMsR0FBRyxtQkFBUyxDQUFDO0FBRXhDLE1BQU0sb0JBQW9CLEdBQUcsT0FBTyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7QUFDakYsTUFBTSx3QkFBd0IsR0FBRyxPQUFPLENBQUMsOENBQThDLENBQUMsQ0FBQztBQUV6RixNQUFNLFFBQVEsR0FBRywyQkFBMkIsQ0FBQztBQUM3QyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRTtJQUM1QyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLDJCQUEyQixRQUFRLGtCQUFrQjtDQUM5RSxDQUFDLENBQUM7QUFFSDs7R0FFRztBQUNILE1BQU0sTUFBTSxHQUEyQixDQUFDLFNBQVMsRUFBRSxFQUFFO0lBQ25ELE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDdEIsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN0QixJQUNFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxLQUFLLE1BQU07Z0JBQzVCLG9CQUFvQixDQUFDLElBQUksQ0FBQztnQkFDMUIsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQ2hDO2dCQUNBLEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQ1gsTUFBTTtvQkFDTixRQUFRO29CQUNSLE9BQU8sRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ3pDLElBQUksRUFBRSxJQUFJO2lCQUNYLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUMzQixNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUUzQixrQkFBZSxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlbGludCwge1J1bGV9IGZyb20gJ3N0eWxlbGludCc7XG5cbmNvbnN0IHt1dGlscywgY3JlYXRlUGx1Z2lufSA9IHN0eWxlbGludDtcblxuY29uc3QgaXNTdGFuZGFyZFN5bnRheFJ1bGUgPSByZXF1aXJlKCdzdHlsZWxpbnQvbGliL3V0aWxzL2lzU3RhbmRhcmRTeW50YXhSdWxlJyk7XG5jb25zdCBpc1N0YW5kYXJkU3ludGF4U2VsZWN0b3IgPSByZXF1aXJlKCdzdHlsZWxpbnQvbGliL3V0aWxzL2lzU3RhbmRhcmRTeW50YXhTZWxlY3RvcicpO1xuXG5jb25zdCBydWxlTmFtZSA9ICdAYW5ndWxhci9zZWxlY3Rvci1uby1kZWVwJztcbmNvbnN0IG1lc3NhZ2VzID0gdXRpbHMucnVsZU1lc3NhZ2VzKHJ1bGVOYW1lLCB7XG4gIGV4cGVjdGVkOiAoc2VsZWN0b3IpID0+IGBVc2FnZSBvZiB0aGUgL2RlZXAvIGluIFwiJHtzZWxlY3Rvcn1cIiBpcyBub3QgYWxsb3dlZGAsXG59KTtcblxuLyoqXG4gKiBTdHlsZWxpbnQgcGx1Z2luIHRoYXQgcHJldmVudHMgdXNlcyBvZiAvZGVlcC8gaW4gc2VsZWN0b3JzLlxuICovXG5jb25zdCBydWxlRm46IFJ1bGU8Ym9vbGVhbiwgdW5rbm93bj4gPSAoaXNFbmFibGVkKSA9PiB7XG4gIHJldHVybiAocm9vdCwgcmVzdWx0KSA9PiB7XG4gICAgaWYgKCFpc0VuYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByb290LndhbGtSdWxlcygocnVsZSkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBydWxlLnBhcmVudD8udHlwZSA9PT0gJ3J1bGUnICYmXG4gICAgICAgIGlzU3RhbmRhcmRTeW50YXhSdWxlKHJ1bGUpICYmXG4gICAgICAgIGlzU3RhbmRhcmRTeW50YXhTZWxlY3RvcihydWxlLnNlbGVjdG9yKSAmJlxuICAgICAgICBydWxlLnNlbGVjdG9yLmluY2x1ZGVzKCcvZGVlcC8nKVxuICAgICAgKSB7XG4gICAgICAgIHV0aWxzLnJlcG9ydCh7XG4gICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgIHJ1bGVOYW1lLFxuICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VzLmV4cGVjdGVkKHJ1bGUuc2VsZWN0b3IpLFxuICAgICAgICAgIG5vZGU6IHJ1bGUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xufTtcblxucnVsZUZuLnJ1bGVOYW1lID0gcnVsZU5hbWU7XG5ydWxlRm4ubWVzc2FnZXMgPSBtZXNzYWdlcztcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUGx1Z2luKHJ1bGVOYW1lLCBydWxlRm4pO1xuIl19