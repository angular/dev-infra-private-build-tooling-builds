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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3Itbm8tZGVlcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpbnQtcnVsZXMvc3R5bGVsaW50L3NlbGVjdG9yLW5vLWRlZXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwwREFBMEM7QUFFMUMsTUFBTSxFQUFDLEtBQUssRUFBRSxZQUFZLEVBQUMsR0FBRyxtQkFBUyxDQUFDO0FBRXhDLE1BQU0sb0JBQW9CLEdBQUcsT0FBTyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7QUFDakYsTUFBTSx3QkFBd0IsR0FBRyxPQUFPLENBQUMsOENBQThDLENBQUMsQ0FBQztBQUV6RixNQUFNLFFBQVEsR0FBRywyQkFBMkIsQ0FBQztBQUM3QyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRTtJQUM1QyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLDJCQUEyQixRQUFRLGtCQUFrQjtDQUM5RSxDQUFDLENBQUM7QUFFSDs7R0FFRztBQUNILE1BQU0sTUFBTSxHQUEyQixDQUFDLFNBQVMsRUFBRSxFQUFFO0lBQ25ELE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDdEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2YsT0FBTztRQUNULENBQUM7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdEIsSUFDRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksS0FBSyxNQUFNO2dCQUM1QixvQkFBb0IsQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLHdCQUF3QixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUNoQyxDQUFDO2dCQUNELEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQ1gsTUFBTTtvQkFDTixRQUFRO29CQUNSLE9BQU8sRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ3pDLElBQUksRUFBRSxJQUFJO2lCQUNYLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBQzNCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0FBRTNCLGtCQUFlLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVsaW50LCB7UnVsZX0gZnJvbSAnc3R5bGVsaW50JztcblxuY29uc3Qge3V0aWxzLCBjcmVhdGVQbHVnaW59ID0gc3R5bGVsaW50O1xuXG5jb25zdCBpc1N0YW5kYXJkU3ludGF4UnVsZSA9IHJlcXVpcmUoJ3N0eWxlbGludC9saWIvdXRpbHMvaXNTdGFuZGFyZFN5bnRheFJ1bGUnKTtcbmNvbnN0IGlzU3RhbmRhcmRTeW50YXhTZWxlY3RvciA9IHJlcXVpcmUoJ3N0eWxlbGludC9saWIvdXRpbHMvaXNTdGFuZGFyZFN5bnRheFNlbGVjdG9yJyk7XG5cbmNvbnN0IHJ1bGVOYW1lID0gJ0Bhbmd1bGFyL3NlbGVjdG9yLW5vLWRlZXAnO1xuY29uc3QgbWVzc2FnZXMgPSB1dGlscy5ydWxlTWVzc2FnZXMocnVsZU5hbWUsIHtcbiAgZXhwZWN0ZWQ6IChzZWxlY3RvcikgPT4gYFVzYWdlIG9mIHRoZSAvZGVlcC8gaW4gXCIke3NlbGVjdG9yfVwiIGlzIG5vdCBhbGxvd2VkYCxcbn0pO1xuXG4vKipcbiAqIFN0eWxlbGludCBwbHVnaW4gdGhhdCBwcmV2ZW50cyB1c2VzIG9mIC9kZWVwLyBpbiBzZWxlY3RvcnMuXG4gKi9cbmNvbnN0IHJ1bGVGbjogUnVsZTxib29sZWFuLCB1bmtub3duPiA9IChpc0VuYWJsZWQpID0+IHtcbiAgcmV0dXJuIChyb290LCByZXN1bHQpID0+IHtcbiAgICBpZiAoIWlzRW5hYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJvb3Qud2Fsa1J1bGVzKChydWxlKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHJ1bGUucGFyZW50Py50eXBlID09PSAncnVsZScgJiZcbiAgICAgICAgaXNTdGFuZGFyZFN5bnRheFJ1bGUocnVsZSkgJiZcbiAgICAgICAgaXNTdGFuZGFyZFN5bnRheFNlbGVjdG9yKHJ1bGUuc2VsZWN0b3IpICYmXG4gICAgICAgIHJ1bGUuc2VsZWN0b3IuaW5jbHVkZXMoJy9kZWVwLycpXG4gICAgICApIHtcbiAgICAgICAgdXRpbHMucmVwb3J0KHtcbiAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgcnVsZU5hbWUsXG4gICAgICAgICAgbWVzc2FnZTogbWVzc2FnZXMuZXhwZWN0ZWQocnVsZS5zZWxlY3RvciksXG4gICAgICAgICAgbm9kZTogcnVsZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59O1xuXG5ydWxlRm4ucnVsZU5hbWUgPSBydWxlTmFtZTtcbnJ1bGVGbi5tZXNzYWdlcyA9IG1lc3NhZ2VzO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVQbHVnaW4ocnVsZU5hbWUsIHJ1bGVGbik7XG4iXX0=