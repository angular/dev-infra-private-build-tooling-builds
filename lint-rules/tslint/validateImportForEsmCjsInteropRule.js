"use strict";
/**
 * @license
 * Copyright Google LLC
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rule = void 0;
const rules_1 = require("tslint/lib/rules");
const typescript_1 = __importDefault(require("typescript"));
const noNamedExportsError = 'Named import is not allowed. The module does not expose named exports when ' +
    'imported in an ES module. Use a default import instead.';
const noDefaultExportError = 'Default import is not allowed. The module does not expose a default export at ' +
    'runtime. Use a named import instead.';
/**
 * Rule that blocks named imports from being used for certain configured module
 * specifiers. This is helpful for enforcing an ESM-compatible interop with CommonJS
 * modules which do not expose named bindings at runtime.
 *
 * For example, consider the `typescript` module. It does not statically expose named
 * exports even though the type definition suggests it. An import like the following
 * will break at runtime when the `typescript` CommonJS module is imported inside an ESM.
 *
 * ```
 * import * as ts from 'typescript';
 * console.log(ts.SyntaxKind.CallExpression); // `SyntaxKind is undefined`.
 * ```
 *
 * More details here: https://nodejs.org/api/esm.html#esm_import_statements.
 */
class Rule extends rules_1.AbstractRule {
    apply(sourceFile) {
        const options = this.getOptions().ruleArguments[0];
        return this.applyWithFunction(sourceFile, (ctx) => visitNode(sourceFile, ctx, options));
    }
}
exports.Rule = Rule;
function visitNode(node, ctx, options) {
    if (options.incompatibleModules && typescript_1.default.isImportDeclaration(node)) {
        const specifier = node.moduleSpecifier;
        const failureMsg = options.incompatibleModules[specifier.text];
        if (failureMsg !== undefined) {
            ctx.addFailureAtNode(node, failureMsg);
            return;
        }
    }
    if (options.noNamedExports && isNamedImportToDisallowedModule(node, options.noNamedExports)) {
        ctx.addFailureAtNode(node, noNamedExportsError);
    }
    if (options.noDefaultExport && isDefaultImportToDisallowedModule(node, options.noDefaultExport)) {
        ctx.addFailureAtNode(node, noDefaultExportError);
    }
    typescript_1.default.forEachChild(node, (n) => visitNode(n, ctx, options));
}
function isNamedImportToDisallowedModule(node, disallowed) {
    if (!typescript_1.default.isImportDeclaration(node) || node.importClause === undefined) {
        return false;
    }
    const specifier = node.moduleSpecifier;
    return !!node.importClause.namedBindings && disallowed.includes(specifier.text);
}
function isDefaultImportToDisallowedModule(node, disallowed) {
    if (!typescript_1.default.isImportDeclaration(node) || node.importClause === undefined) {
        return false;
    }
    const specifier = node.moduleSpecifier;
    return node.importClause.name !== undefined && disallowed.includes(specifier.text);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVJbXBvcnRGb3JFc21DanNJbnRlcm9wUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpbnQtcnVsZXMvdHNsaW50L3ZhbGlkYXRlSW1wb3J0Rm9yRXNtQ2pzSW50ZXJvcFJ1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7Ozs7O0FBR0gsNENBQThDO0FBQzlDLDREQUE0QjtBQUU1QixNQUFNLG1CQUFtQixHQUN2Qiw2RUFBNkU7SUFDN0UseURBQXlELENBQUM7QUFFNUQsTUFBTSxvQkFBb0IsR0FDeEIsZ0ZBQWdGO0lBQ2hGLHNDQUFzQyxDQUFDO0FBc0J6Qzs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFhLElBQUssU0FBUSxvQkFBWTtJQUMzQixLQUFLLENBQUMsVUFBeUI7UUFDdEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDMUYsQ0FBQztDQUNGO0FBTEQsb0JBS0M7QUFFRCxTQUFTLFNBQVMsQ0FBQyxJQUFhLEVBQUUsR0FBZ0IsRUFBRSxPQUFvQjtJQUN0RSxJQUFJLE9BQU8sQ0FBQyxtQkFBbUIsSUFBSSxvQkFBRSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDaEUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQW1DLENBQUM7UUFDM0QsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvRCxJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUM3QixHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU87UUFDVCxDQUFDO0lBQ0gsQ0FBQztJQUVELElBQUksT0FBTyxDQUFDLGNBQWMsSUFBSSwrQkFBK0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7UUFDNUYsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxJQUFJLE9BQU8sQ0FBQyxlQUFlLElBQUksaUNBQWlDLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDO1FBQ2hHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsb0JBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFFRCxTQUFTLCtCQUErQixDQUFDLElBQWEsRUFBRSxVQUFvQjtJQUMxRSxJQUFJLENBQUMsb0JBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRSxDQUFDO1FBQ3JFLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFtQyxDQUFDO0lBQzNELE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xGLENBQUM7QUFFRCxTQUFTLGlDQUFpQyxDQUFDLElBQWEsRUFBRSxVQUFvQjtJQUM1RSxJQUFJLENBQUMsb0JBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRSxDQUFDO1FBQ3JFLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFtQyxDQUFDO0lBRTNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQ1xuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtSdWxlRmFpbHVyZSwgV2Fsa0NvbnRleHR9IGZyb20gJ3RzbGludC9saWInO1xuaW1wb3J0IHtBYnN0cmFjdFJ1bGV9IGZyb20gJ3RzbGludC9saWIvcnVsZXMnO1xuaW1wb3J0IHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5jb25zdCBub05hbWVkRXhwb3J0c0Vycm9yID1cbiAgJ05hbWVkIGltcG9ydCBpcyBub3QgYWxsb3dlZC4gVGhlIG1vZHVsZSBkb2VzIG5vdCBleHBvc2UgbmFtZWQgZXhwb3J0cyB3aGVuICcgK1xuICAnaW1wb3J0ZWQgaW4gYW4gRVMgbW9kdWxlLiBVc2UgYSBkZWZhdWx0IGltcG9ydCBpbnN0ZWFkLic7XG5cbmNvbnN0IG5vRGVmYXVsdEV4cG9ydEVycm9yID1cbiAgJ0RlZmF1bHQgaW1wb3J0IGlzIG5vdCBhbGxvd2VkLiBUaGUgbW9kdWxlIGRvZXMgbm90IGV4cG9zZSBhIGRlZmF1bHQgZXhwb3J0IGF0ICcgK1xuICAncnVudGltZS4gVXNlIGEgbmFtZWQgaW1wb3J0IGluc3RlYWQuJztcblxuaW50ZXJmYWNlIFJ1bGVPcHRpb25zIHtcbiAgLyoqXG4gICAqIExpc3Qgb2YgbW9kdWxlcyB3aXRob3V0IGFueSBuYW1lZCBleHBvcnRzIHRoYXQgTm9kZUpTIGNhbiBzdGF0aWNhbGx5IGRldGVjdCB3aGVuIHRoZVxuICAgKiBDb21tb25KUyBtb2R1bGUgaXMgaW1wb3J0ZWQgZnJvbSBFU00uIE5vZGUgb25seSBleHBvc2VzIG5hbWVkIGV4cG9ydHMgd2hpY2ggYXJlXG4gICAqIHN0YXRpY2FsbHkgZGlzY292ZXJhYmxlOiBodHRwczovL25vZGVqcy5vcmcvYXBpL2VzbS5odG1sI2VzbV9pbXBvcnRfc3RhdGVtZW50cy5cbiAgICovXG4gIG5vTmFtZWRFeHBvcnRzPzogc3RyaW5nW107XG4gIC8qKlxuICAgKiBMaXN0IG9mIG1vZHVsZXMgd2hpY2ggYXBwZWFyIHRvIGhhdmUgbmFtZWQgZXhwb3J0cyBpbiB0aGUgdHlwaW5ncyBidXQgZG9cbiAgICogbm90IGhhdmUgYW55IGF0IHJ1bnRpbWUgZHVlIHRvIE5vZGVKUyBub3QgYmVpbmcgYWJsZSB0byBkaXNjb3ZlciB0aGVzZVxuICAgKiB0aHJvdWdoIHN0YXRpYyBhbmFseXNpczogaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9lc20uaHRtbCNlc21faW1wb3J0X3N0YXRlbWVudHMuXG4gICAqICovXG4gIG5vRGVmYXVsdEV4cG9ydD86IHN0cmluZ1tdO1xuICAvKipcbiAgICogTGlzdCBvZiBtb2R1bGVzIHdoaWNoIGFyZSBhbHdheXMgaW5jb21wYXRpYmxlLiBUaGUgcnVsZSBhbGxvd3MgZm9yIGEgY3VzdG9tXG4gICAqIG1lc3NhZ2UgdG8gYmUgcHJvdmlkZWQgd2hlbiBpdCBkaXNjb3ZlcnMgYW4gaW1wb3J0IHRvIHN1Y2ggYSBtb2R1bGUuXG4gICAqL1xuICBpbmNvbXBhdGlibGVNb2R1bGVzPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbn1cblxuLyoqXG4gKiBSdWxlIHRoYXQgYmxvY2tzIG5hbWVkIGltcG9ydHMgZnJvbSBiZWluZyB1c2VkIGZvciBjZXJ0YWluIGNvbmZpZ3VyZWQgbW9kdWxlXG4gKiBzcGVjaWZpZXJzLiBUaGlzIGlzIGhlbHBmdWwgZm9yIGVuZm9yY2luZyBhbiBFU00tY29tcGF0aWJsZSBpbnRlcm9wIHdpdGggQ29tbW9uSlNcbiAqIG1vZHVsZXMgd2hpY2ggZG8gbm90IGV4cG9zZSBuYW1lZCBiaW5kaW5ncyBhdCBydW50aW1lLlxuICpcbiAqIEZvciBleGFtcGxlLCBjb25zaWRlciB0aGUgYHR5cGVzY3JpcHRgIG1vZHVsZS4gSXQgZG9lcyBub3Qgc3RhdGljYWxseSBleHBvc2UgbmFtZWRcbiAqIGV4cG9ydHMgZXZlbiB0aG91Z2ggdGhlIHR5cGUgZGVmaW5pdGlvbiBzdWdnZXN0cyBpdC4gQW4gaW1wb3J0IGxpa2UgdGhlIGZvbGxvd2luZ1xuICogd2lsbCBicmVhayBhdCBydW50aW1lIHdoZW4gdGhlIGB0eXBlc2NyaXB0YCBDb21tb25KUyBtb2R1bGUgaXMgaW1wb3J0ZWQgaW5zaWRlIGFuIEVTTS5cbiAqXG4gKiBgYGBcbiAqIGltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuICogY29uc29sZS5sb2codHMuU3ludGF4S2luZC5DYWxsRXhwcmVzc2lvbik7IC8vIGBTeW50YXhLaW5kIGlzIHVuZGVmaW5lZGAuXG4gKiBgYGBcbiAqXG4gKiBNb3JlIGRldGFpbHMgaGVyZTogaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9lc20uaHRtbCNlc21faW1wb3J0X3N0YXRlbWVudHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBSdWxlIGV4dGVuZHMgQWJzdHJhY3RSdWxlIHtcbiAgb3ZlcnJpZGUgYXBwbHkoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSk6IFJ1bGVGYWlsdXJlW10ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoKS5ydWxlQXJndW1lbnRzWzBdO1xuICAgIHJldHVybiB0aGlzLmFwcGx5V2l0aEZ1bmN0aW9uKHNvdXJjZUZpbGUsIChjdHgpID0+IHZpc2l0Tm9kZShzb3VyY2VGaWxlLCBjdHgsIG9wdGlvbnMpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB2aXNpdE5vZGUobm9kZTogdHMuTm9kZSwgY3R4OiBXYWxrQ29udGV4dCwgb3B0aW9uczogUnVsZU9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMuaW5jb21wYXRpYmxlTW9kdWxlcyAmJiB0cy5pc0ltcG9ydERlY2xhcmF0aW9uKG5vZGUpKSB7XG4gICAgY29uc3Qgc3BlY2lmaWVyID0gbm9kZS5tb2R1bGVTcGVjaWZpZXIgYXMgdHMuU3RyaW5nTGl0ZXJhbDtcbiAgICBjb25zdCBmYWlsdXJlTXNnID0gb3B0aW9ucy5pbmNvbXBhdGlibGVNb2R1bGVzW3NwZWNpZmllci50ZXh0XTtcblxuICAgIGlmIChmYWlsdXJlTXNnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGN0eC5hZGRGYWlsdXJlQXROb2RlKG5vZGUsIGZhaWx1cmVNc2cpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGlmIChvcHRpb25zLm5vTmFtZWRFeHBvcnRzICYmIGlzTmFtZWRJbXBvcnRUb0Rpc2FsbG93ZWRNb2R1bGUobm9kZSwgb3B0aW9ucy5ub05hbWVkRXhwb3J0cykpIHtcbiAgICBjdHguYWRkRmFpbHVyZUF0Tm9kZShub2RlLCBub05hbWVkRXhwb3J0c0Vycm9yKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLm5vRGVmYXVsdEV4cG9ydCAmJiBpc0RlZmF1bHRJbXBvcnRUb0Rpc2FsbG93ZWRNb2R1bGUobm9kZSwgb3B0aW9ucy5ub0RlZmF1bHRFeHBvcnQpKSB7XG4gICAgY3R4LmFkZEZhaWx1cmVBdE5vZGUobm9kZSwgbm9EZWZhdWx0RXhwb3J0RXJyb3IpO1xuICB9XG5cbiAgdHMuZm9yRWFjaENoaWxkKG5vZGUsIChuKSA9PiB2aXNpdE5vZGUobiwgY3R4LCBvcHRpb25zKSk7XG59XG5cbmZ1bmN0aW9uIGlzTmFtZWRJbXBvcnRUb0Rpc2FsbG93ZWRNb2R1bGUobm9kZTogdHMuTm9kZSwgZGlzYWxsb3dlZDogc3RyaW5nW10pOiBib29sZWFuIHtcbiAgaWYgKCF0cy5pc0ltcG9ydERlY2xhcmF0aW9uKG5vZGUpIHx8IG5vZGUuaW1wb3J0Q2xhdXNlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3Qgc3BlY2lmaWVyID0gbm9kZS5tb2R1bGVTcGVjaWZpZXIgYXMgdHMuU3RyaW5nTGl0ZXJhbDtcbiAgcmV0dXJuICEhbm9kZS5pbXBvcnRDbGF1c2UubmFtZWRCaW5kaW5ncyAmJiBkaXNhbGxvd2VkLmluY2x1ZGVzKHNwZWNpZmllci50ZXh0KTtcbn1cblxuZnVuY3Rpb24gaXNEZWZhdWx0SW1wb3J0VG9EaXNhbGxvd2VkTW9kdWxlKG5vZGU6IHRzLk5vZGUsIGRpc2FsbG93ZWQ6IHN0cmluZ1tdKSB7XG4gIGlmICghdHMuaXNJbXBvcnREZWNsYXJhdGlvbihub2RlKSB8fCBub2RlLmltcG9ydENsYXVzZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IHNwZWNpZmllciA9IG5vZGUubW9kdWxlU3BlY2lmaWVyIGFzIHRzLlN0cmluZ0xpdGVyYWw7XG5cbiAgcmV0dXJuIG5vZGUuaW1wb3J0Q2xhdXNlLm5hbWUgIT09IHVuZGVmaW5lZCAmJiBkaXNhbGxvd2VkLmluY2x1ZGVzKHNwZWNpZmllci50ZXh0KTtcbn1cbiJdfQ==