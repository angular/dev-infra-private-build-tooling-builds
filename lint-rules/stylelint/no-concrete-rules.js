"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stylelint_1 = __importDefault(require("stylelint"));
const path_1 = require("path");
const { utils, createPlugin } = stylelint_1.default;
const ruleName = '@angular/no-concrete-rules';
const messages = utils.ruleMessages(ruleName, {
    expectedWithPattern: (pattern) => `CSS rules must be placed inside a mixin for files matching '${pattern}'.`,
    expectedAllFiles: () => `CSS rules must be placed inside a mixin for all files.`,
});
/**
 * Stylelint plugin that will log a warning for all top-level CSS rules.
 * Can be used in theme files to ensure that everything is inside a mixin.
 */
const ruleFn = (isEnabled, options) => {
    return (root, result) => {
        if (!isEnabled) {
            return;
        }
        const filePattern = options.filePattern ? new RegExp(options.filePattern) : null;
        const fileName = (0, path_1.basename)(root.source.input.file);
        if ((filePattern !== null && !filePattern.test(fileName)) || !root.nodes) {
            return;
        }
        // Go through all the nodes and report a warning for every CSS rule or mixin inclusion.
        // We use a regular `forEach`, instead of the PostCSS walker utils, because we only care
        // about the top-level nodes.
        root.nodes.forEach((node) => {
            if (node.type === 'rule' || (node.type === 'atrule' && node.name === 'include')) {
                utils.report({
                    result,
                    ruleName,
                    node,
                    message: filePattern !== null
                        ? messages.expectedWithPattern(filePattern)
                        : messages.expectedAllFiles(),
                });
            }
        });
    };
};
ruleFn.ruleName = ruleName;
ruleFn.messages = messages;
exports.default = createPlugin(ruleName, ruleFn);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm8tY29uY3JldGUtcnVsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saW50LXJ1bGVzL3N0eWxlbGludC9uby1jb25jcmV0ZS1ydWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDBEQUEwQztBQUMxQywrQkFBOEI7QUFFOUIsTUFBTSxFQUFDLEtBQUssRUFBRSxZQUFZLEVBQUMsR0FBRyxtQkFBUyxDQUFDO0FBRXhDLE1BQU0sUUFBUSxHQUFHLDRCQUE0QixDQUFDO0FBQzlDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFO0lBQzVDLG1CQUFtQixFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDL0IsK0RBQStELE9BQU8sSUFBSTtJQUM1RSxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyx3REFBd0Q7Q0FDakYsQ0FBQyxDQUFDO0FBRUg7OztHQUdHO0FBQ0gsTUFBTSxNQUFNLEdBQTBCLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxFQUFFO0lBQzNELE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDdEIsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLE9BQU87U0FDUjtRQUVELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2pGLE1BQU0sUUFBUSxHQUFHLElBQUEsZUFBUSxFQUFDLElBQUksQ0FBQyxNQUFPLENBQUMsS0FBSyxDQUFDLElBQUssQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxXQUFXLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN4RSxPQUFPO1NBQ1I7UUFFRCx1RkFBdUY7UUFDdkYsd0ZBQXdGO1FBQ3hGLDZCQUE2QjtRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzFCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxFQUFFO2dCQUMvRSxLQUFLLENBQUMsTUFBTSxDQUFDO29CQUNYLE1BQU07b0JBQ04sUUFBUTtvQkFDUixJQUFJO29CQUNKLE9BQU8sRUFDTCxXQUFXLEtBQUssSUFBSTt3QkFDbEIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUM7d0JBQzNDLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7aUJBQ2xDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUMzQixNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztBQUUzQixrQkFBZSxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlbGludCwge1J1bGV9IGZyb20gJ3N0eWxlbGludCc7XG5pbXBvcnQge2Jhc2VuYW1lfSBmcm9tICdwYXRoJztcblxuY29uc3Qge3V0aWxzLCBjcmVhdGVQbHVnaW59ID0gc3R5bGVsaW50O1xuXG5jb25zdCBydWxlTmFtZSA9ICdAYW5ndWxhci9uby1jb25jcmV0ZS1ydWxlcyc7XG5jb25zdCBtZXNzYWdlcyA9IHV0aWxzLnJ1bGVNZXNzYWdlcyhydWxlTmFtZSwge1xuICBleHBlY3RlZFdpdGhQYXR0ZXJuOiAocGF0dGVybikgPT5cbiAgICBgQ1NTIHJ1bGVzIG11c3QgYmUgcGxhY2VkIGluc2lkZSBhIG1peGluIGZvciBmaWxlcyBtYXRjaGluZyAnJHtwYXR0ZXJufScuYCxcbiAgZXhwZWN0ZWRBbGxGaWxlczogKCkgPT4gYENTUyBydWxlcyBtdXN0IGJlIHBsYWNlZCBpbnNpZGUgYSBtaXhpbiBmb3IgYWxsIGZpbGVzLmAsXG59KTtcblxuLyoqXG4gKiBTdHlsZWxpbnQgcGx1Z2luIHRoYXQgd2lsbCBsb2cgYSB3YXJuaW5nIGZvciBhbGwgdG9wLWxldmVsIENTUyBydWxlcy5cbiAqIENhbiBiZSB1c2VkIGluIHRoZW1lIGZpbGVzIHRvIGVuc3VyZSB0aGF0IGV2ZXJ5dGhpbmcgaXMgaW5zaWRlIGEgbWl4aW4uXG4gKi9cbmNvbnN0IHJ1bGVGbjogUnVsZTxib29sZWFuLCBzdHJpbmc+ID0gKGlzRW5hYmxlZCwgb3B0aW9ucykgPT4ge1xuICByZXR1cm4gKHJvb3QsIHJlc3VsdCkgPT4ge1xuICAgIGlmICghaXNFbmFibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZmlsZVBhdHRlcm4gPSBvcHRpb25zLmZpbGVQYXR0ZXJuID8gbmV3IFJlZ0V4cChvcHRpb25zLmZpbGVQYXR0ZXJuKSA6IG51bGw7XG4gICAgY29uc3QgZmlsZU5hbWUgPSBiYXNlbmFtZShyb290LnNvdXJjZSEuaW5wdXQuZmlsZSEpO1xuXG4gICAgaWYgKChmaWxlUGF0dGVybiAhPT0gbnVsbCAmJiAhZmlsZVBhdHRlcm4udGVzdChmaWxlTmFtZSkpIHx8ICFyb290Lm5vZGVzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gR28gdGhyb3VnaCBhbGwgdGhlIG5vZGVzIGFuZCByZXBvcnQgYSB3YXJuaW5nIGZvciBldmVyeSBDU1MgcnVsZSBvciBtaXhpbiBpbmNsdXNpb24uXG4gICAgLy8gV2UgdXNlIGEgcmVndWxhciBgZm9yRWFjaGAsIGluc3RlYWQgb2YgdGhlIFBvc3RDU1Mgd2Fsa2VyIHV0aWxzLCBiZWNhdXNlIHdlIG9ubHkgY2FyZVxuICAgIC8vIGFib3V0IHRoZSB0b3AtbGV2ZWwgbm9kZXMuXG4gICAgcm9vdC5ub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICBpZiAobm9kZS50eXBlID09PSAncnVsZScgfHwgKG5vZGUudHlwZSA9PT0gJ2F0cnVsZScgJiYgbm9kZS5uYW1lID09PSAnaW5jbHVkZScpKSB7XG4gICAgICAgIHV0aWxzLnJlcG9ydCh7XG4gICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgIHJ1bGVOYW1lLFxuICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICAgIGZpbGVQYXR0ZXJuICE9PSBudWxsXG4gICAgICAgICAgICAgID8gbWVzc2FnZXMuZXhwZWN0ZWRXaXRoUGF0dGVybihmaWxlUGF0dGVybilcbiAgICAgICAgICAgICAgOiBtZXNzYWdlcy5leHBlY3RlZEFsbEZpbGVzKCksXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xufTtcblxucnVsZUZuLnJ1bGVOYW1lID0gcnVsZU5hbWU7XG5ydWxlRm4ubWVzc2FnZXMgPSBtZXNzYWdlcztcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlUGx1Z2luKHJ1bGVOYW1lLCBydWxlRm4pO1xuIl19