/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AbstractRule } from 'tslint/lib/rules';
import ts from 'typescript';
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
export class Rule extends AbstractRule {
    apply(sourceFile) {
        const options = this.getOptions().ruleArguments[0];
        return this.applyWithFunction(sourceFile, (ctx) => visitNode(sourceFile, ctx, options));
    }
}
function visitNode(node, ctx, options) {
    if (options.incompatibleModules && ts.isImportDeclaration(node)) {
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
    ts.forEachChild(node, (n) => visitNode(n, ctx, options));
}
function isNamedImportToDisallowedModule(node, disallowed) {
    if (!ts.isImportDeclaration(node) || node.importClause === undefined) {
        return false;
    }
    const specifier = node.moduleSpecifier;
    return !!node.importClause.namedBindings && disallowed.includes(specifier.text);
}
function isDefaultImportToDisallowedModule(node, disallowed) {
    if (!ts.isImportDeclaration(node) || node.importClause === undefined) {
        return false;
    }
    const specifier = node.moduleSpecifier;
    return node.importClause.name !== undefined && disallowed.includes(specifier.text);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVJbXBvcnRGb3JFc21DanNJbnRlcm9wUnVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3RzbGludC1ydWxlcy92YWxpZGF0ZUltcG9ydEZvckVzbUNqc0ludGVyb3BSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFNUIsTUFBTSxtQkFBbUIsR0FDdkIsNkVBQTZFO0lBQzdFLHlEQUF5RCxDQUFDO0FBRTVELE1BQU0sb0JBQW9CLEdBQ3hCLGdGQUFnRjtJQUNoRixzQ0FBc0MsQ0FBQztBQXNCekM7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxPQUFPLElBQUssU0FBUSxZQUFZO0lBQzNCLEtBQUssQ0FBQyxVQUF5QjtRQUN0QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMxRixDQUFDO0NBQ0Y7QUFFRCxTQUFTLFNBQVMsQ0FBQyxJQUFhLEVBQUUsR0FBZ0IsRUFBRSxPQUFvQjtJQUN0RSxJQUFJLE9BQU8sQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDL0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQW1DLENBQUM7UUFDM0QsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvRCxJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7WUFDNUIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN2QyxPQUFPO1NBQ1I7S0FDRjtJQUVELElBQUksT0FBTyxDQUFDLGNBQWMsSUFBSSwrQkFBK0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQzNGLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztLQUNqRDtJQUVELElBQUksT0FBTyxDQUFDLGVBQWUsSUFBSSxpQ0FBaUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQy9GLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztLQUNsRDtJQUVELEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFFRCxTQUFTLCtCQUErQixDQUFDLElBQWEsRUFBRSxVQUFvQjtJQUMxRSxJQUFJLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO1FBQ3BFLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFDRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBbUMsQ0FBQztJQUMzRCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsRixDQUFDO0FBRUQsU0FBUyxpQ0FBaUMsQ0FBQyxJQUFhLEVBQUUsVUFBb0I7SUFDNUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRTtRQUNwRSxPQUFPLEtBQUssQ0FBQztLQUNkO0lBQ0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQW1DLENBQUM7SUFFM0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1J1bGVGYWlsdXJlLCBXYWxrQ29udGV4dH0gZnJvbSAndHNsaW50L2xpYic7XG5pbXBvcnQge0Fic3RyYWN0UnVsZX0gZnJvbSAndHNsaW50L2xpYi9ydWxlcyc7XG5pbXBvcnQgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbmNvbnN0IG5vTmFtZWRFeHBvcnRzRXJyb3IgPVxuICAnTmFtZWQgaW1wb3J0IGlzIG5vdCBhbGxvd2VkLiBUaGUgbW9kdWxlIGRvZXMgbm90IGV4cG9zZSBuYW1lZCBleHBvcnRzIHdoZW4gJyArXG4gICdpbXBvcnRlZCBpbiBhbiBFUyBtb2R1bGUuIFVzZSBhIGRlZmF1bHQgaW1wb3J0IGluc3RlYWQuJztcblxuY29uc3Qgbm9EZWZhdWx0RXhwb3J0RXJyb3IgPVxuICAnRGVmYXVsdCBpbXBvcnQgaXMgbm90IGFsbG93ZWQuIFRoZSBtb2R1bGUgZG9lcyBub3QgZXhwb3NlIGEgZGVmYXVsdCBleHBvcnQgYXQgJyArXG4gICdydW50aW1lLiBVc2UgYSBuYW1lZCBpbXBvcnQgaW5zdGVhZC4nO1xuXG5pbnRlcmZhY2UgUnVsZU9wdGlvbnMge1xuICAvKipcbiAgICogTGlzdCBvZiBtb2R1bGVzIHdpdGhvdXQgYW55IG5hbWVkIGV4cG9ydHMgdGhhdCBOb2RlSlMgY2FuIHN0YXRpY2FsbHkgZGV0ZWN0IHdoZW4gdGhlXG4gICAqIENvbW1vbkpTIG1vZHVsZSBpcyBpbXBvcnRlZCBmcm9tIEVTTS4gTm9kZSBvbmx5IGV4cG9zZXMgbmFtZWQgZXhwb3J0cyB3aGljaCBhcmVcbiAgICogc3RhdGljYWxseSBkaXNjb3ZlcmFibGU6IGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvZXNtLmh0bWwjZXNtX2ltcG9ydF9zdGF0ZW1lbnRzLlxuICAgKi9cbiAgbm9OYW1lZEV4cG9ydHM/OiBzdHJpbmdbXTtcbiAgLyoqXG4gICAqIExpc3Qgb2YgbW9kdWxlcyB3aGljaCBhcHBlYXIgdG8gaGF2ZSBuYW1lZCBleHBvcnRzIGluIHRoZSB0eXBpbmdzIGJ1dCBkb1xuICAgKiBub3QgaGF2ZSBhbnkgYXQgcnVudGltZSBkdWUgdG8gTm9kZUpTIG5vdCBiZWluZyBhYmxlIHRvIGRpc2NvdmVyIHRoZXNlXG4gICAqIHRocm91Z2ggc3RhdGljIGFuYWx5c2lzOiBodHRwczovL25vZGVqcy5vcmcvYXBpL2VzbS5odG1sI2VzbV9pbXBvcnRfc3RhdGVtZW50cy5cbiAgICogKi9cbiAgbm9EZWZhdWx0RXhwb3J0Pzogc3RyaW5nW107XG4gIC8qKlxuICAgKiBMaXN0IG9mIG1vZHVsZXMgd2hpY2ggYXJlIGFsd2F5cyBpbmNvbXBhdGlibGUuIFRoZSBydWxlIGFsbG93cyBmb3IgYSBjdXN0b21cbiAgICogbWVzc2FnZSB0byBiZSBwcm92aWRlZCB3aGVuIGl0IGRpc2NvdmVycyBhbiBpbXBvcnQgdG8gc3VjaCBhIG1vZHVsZS5cbiAgICovXG4gIGluY29tcGF0aWJsZU1vZHVsZXM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xufVxuXG4vKipcbiAqIFJ1bGUgdGhhdCBibG9ja3MgbmFtZWQgaW1wb3J0cyBmcm9tIGJlaW5nIHVzZWQgZm9yIGNlcnRhaW4gY29uZmlndXJlZCBtb2R1bGVcbiAqIHNwZWNpZmllcnMuIFRoaXMgaXMgaGVscGZ1bCBmb3IgZW5mb3JjaW5nIGFuIEVTTS1jb21wYXRpYmxlIGludGVyb3Agd2l0aCBDb21tb25KU1xuICogbW9kdWxlcyB3aGljaCBkbyBub3QgZXhwb3NlIG5hbWVkIGJpbmRpbmdzIGF0IHJ1bnRpbWUuXG4gKlxuICogRm9yIGV4YW1wbGUsIGNvbnNpZGVyIHRoZSBgdHlwZXNjcmlwdGAgbW9kdWxlLiBJdCBkb2VzIG5vdCBzdGF0aWNhbGx5IGV4cG9zZSBuYW1lZFxuICogZXhwb3J0cyBldmVuIHRob3VnaCB0aGUgdHlwZSBkZWZpbml0aW9uIHN1Z2dlc3RzIGl0LiBBbiBpbXBvcnQgbGlrZSB0aGUgZm9sbG93aW5nXG4gKiB3aWxsIGJyZWFrIGF0IHJ1bnRpbWUgd2hlbiB0aGUgYHR5cGVzY3JpcHRgIENvbW1vbkpTIG1vZHVsZSBpcyBpbXBvcnRlZCBpbnNpZGUgYW4gRVNNLlxuICpcbiAqIGBgYFxuICogaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG4gKiBjb25zb2xlLmxvZyh0cy5TeW50YXhLaW5kLkNhbGxFeHByZXNzaW9uKTsgLy8gYFN5bnRheEtpbmQgaXMgdW5kZWZpbmVkYC5cbiAqIGBgYFxuICpcbiAqIE1vcmUgZGV0YWlscyBoZXJlOiBodHRwczovL25vZGVqcy5vcmcvYXBpL2VzbS5odG1sI2VzbV9pbXBvcnRfc3RhdGVtZW50cy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJ1bGUgZXh0ZW5kcyBBYnN0cmFjdFJ1bGUge1xuICBvdmVycmlkZSBhcHBseShzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlKTogUnVsZUZhaWx1cmVbXSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygpLnJ1bGVBcmd1bWVudHNbMF07XG4gICAgcmV0dXJuIHRoaXMuYXBwbHlXaXRoRnVuY3Rpb24oc291cmNlRmlsZSwgKGN0eCkgPT4gdmlzaXROb2RlKHNvdXJjZUZpbGUsIGN0eCwgb3B0aW9ucykpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHZpc2l0Tm9kZShub2RlOiB0cy5Ob2RlLCBjdHg6IFdhbGtDb250ZXh0LCBvcHRpb25zOiBSdWxlT3B0aW9ucykge1xuICBpZiAob3B0aW9ucy5pbmNvbXBhdGlibGVNb2R1bGVzICYmIHRzLmlzSW1wb3J0RGVjbGFyYXRpb24obm9kZSkpIHtcbiAgICBjb25zdCBzcGVjaWZpZXIgPSBub2RlLm1vZHVsZVNwZWNpZmllciBhcyB0cy5TdHJpbmdMaXRlcmFsO1xuICAgIGNvbnN0IGZhaWx1cmVNc2cgPSBvcHRpb25zLmluY29tcGF0aWJsZU1vZHVsZXNbc3BlY2lmaWVyLnRleHRdO1xuXG4gICAgaWYgKGZhaWx1cmVNc2cgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY3R4LmFkZEZhaWx1cmVBdE5vZGUobm9kZSwgZmFpbHVyZU1zZyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgaWYgKG9wdGlvbnMubm9OYW1lZEV4cG9ydHMgJiYgaXNOYW1lZEltcG9ydFRvRGlzYWxsb3dlZE1vZHVsZShub2RlLCBvcHRpb25zLm5vTmFtZWRFeHBvcnRzKSkge1xuICAgIGN0eC5hZGRGYWlsdXJlQXROb2RlKG5vZGUsIG5vTmFtZWRFeHBvcnRzRXJyb3IpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMubm9EZWZhdWx0RXhwb3J0ICYmIGlzRGVmYXVsdEltcG9ydFRvRGlzYWxsb3dlZE1vZHVsZShub2RlLCBvcHRpb25zLm5vRGVmYXVsdEV4cG9ydCkpIHtcbiAgICBjdHguYWRkRmFpbHVyZUF0Tm9kZShub2RlLCBub0RlZmF1bHRFeHBvcnRFcnJvcik7XG4gIH1cblxuICB0cy5mb3JFYWNoQ2hpbGQobm9kZSwgKG4pID0+IHZpc2l0Tm9kZShuLCBjdHgsIG9wdGlvbnMpKTtcbn1cblxuZnVuY3Rpb24gaXNOYW1lZEltcG9ydFRvRGlzYWxsb3dlZE1vZHVsZShub2RlOiB0cy5Ob2RlLCBkaXNhbGxvd2VkOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuICBpZiAoIXRzLmlzSW1wb3J0RGVjbGFyYXRpb24obm9kZSkgfHwgbm9kZS5pbXBvcnRDbGF1c2UgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBzcGVjaWZpZXIgPSBub2RlLm1vZHVsZVNwZWNpZmllciBhcyB0cy5TdHJpbmdMaXRlcmFsO1xuICByZXR1cm4gISFub2RlLmltcG9ydENsYXVzZS5uYW1lZEJpbmRpbmdzICYmIGRpc2FsbG93ZWQuaW5jbHVkZXMoc3BlY2lmaWVyLnRleHQpO1xufVxuXG5mdW5jdGlvbiBpc0RlZmF1bHRJbXBvcnRUb0Rpc2FsbG93ZWRNb2R1bGUobm9kZTogdHMuTm9kZSwgZGlzYWxsb3dlZDogc3RyaW5nW10pIHtcbiAgaWYgKCF0cy5pc0ltcG9ydERlY2xhcmF0aW9uKG5vZGUpIHx8IG5vZGUuaW1wb3J0Q2xhdXNlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3Qgc3BlY2lmaWVyID0gbm9kZS5tb2R1bGVTcGVjaWZpZXIgYXMgdHMuU3RyaW5nTGl0ZXJhbDtcblxuICByZXR1cm4gbm9kZS5pbXBvcnRDbGF1c2UubmFtZSAhPT0gdW5kZWZpbmVkICYmIGRpc2FsbG93ZWQuaW5jbHVkZXMoc3BlY2lmaWVyLnRleHQpO1xufVxuIl19