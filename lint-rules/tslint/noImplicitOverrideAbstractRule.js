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
const lib_1 = require("tslint/lib");
const rules_1 = require("tslint/lib/rules");
const typescript_1 = __importDefault(require("typescript"));
const FAILURE_MESSAGE = 'Missing override modifier. Members implemented as part of ' +
    'abstract classes must explicitly set the "override" modifier. ' +
    'More details: https://github.com/microsoft/TypeScript/issues/44457#issuecomment-856202843.';
/**
 * Rule which enforces that class members implementing abstract members
 * from base classes explicitly specify the `override` modifier.
 *
 * This ensures we follow the best-practice of applying `override` for abstract-implemented
 * members so that TypeScript creates diagnostics in both scenarios where either the abstract
 * class member is removed, or renamed.
 *
 * More details can be found here: https://github.com/microsoft/TypeScript/issues/44457.
 */
class Rule extends rules_1.TypedRule {
    applyWithProgram(sourceFile, program) {
        return this.applyWithFunction(sourceFile, (ctx) => visitNode(sourceFile, ctx, program));
    }
}
exports.Rule = Rule;
/**
 * For a TypeScript AST node and each of its child nodes, check whether the node is a class
 * element which implements an abstract member but does not have the `override` keyword.
 */
function visitNode(node, ctx, program) {
    // If a class element implements an abstract member but does not have the
    // `override` keyword, create a lint failure.
    if (typescript_1.default.isClassElement(node) &&
        !hasOverrideModifier(node) &&
        matchesParentAbstractElement(node, program)) {
        ctx.addFailureAtNode(node, FAILURE_MESSAGE, lib_1.Replacement.appendText(node.getStart(), `override `));
    }
    typescript_1.default.forEachChild(node, (n) => visitNode(n, ctx, program));
}
/**
 * Checks if the specified class element matches a parent abstract class element. i.e.
 * whether the specified member "implements" an abstract member from a base class.
 */
function matchesParentAbstractElement(node, program) {
    const containingClass = node.parent;
    // If the property we check does not have a property name, we cannot look for similarly-named
    // members in parent classes and therefore return early.
    if (node.name === undefined) {
        return false;
    }
    const propertyName = getPropertyNameText(node.name);
    const typeChecker = program.getTypeChecker();
    // If the property we check does not have a statically-analyzable property name,
    // we cannot look for similarly-named members in parent classes and return early.
    if (propertyName === null) {
        return false;
    }
    return checkClassForInheritedMatchingAbstractMember(containingClass, typeChecker, propertyName);
}
/** Checks if the given class inherits an abstract member with the specified name. */
function checkClassForInheritedMatchingAbstractMember(clazz, typeChecker, searchMemberName) {
    const baseClass = getBaseClass(clazz, typeChecker);
    // If the class is not `abstract`, then all parent abstract methods would need to
    // be implemented, and there is never an abstract member within the class.
    if (baseClass === null || !hasAbstractModifier(baseClass)) {
        return false;
    }
    const matchingMember = baseClass.members.find((m) => m.name !== undefined && getPropertyNameText(m.name) === searchMemberName);
    if (matchingMember !== undefined) {
        return hasAbstractModifier(matchingMember);
    }
    return checkClassForInheritedMatchingAbstractMember(baseClass, typeChecker, searchMemberName);
}
/** Gets the base class for the given class declaration. */
function getBaseClass(node, typeChecker) {
    const baseTypes = getExtendsHeritageExpressions(node);
    if (baseTypes.length > 1) {
        throw Error('Class unexpectedly extends from multiple types.');
    }
    const baseClass = typeChecker.getTypeAtLocation(baseTypes[0]).getSymbol();
    const baseClassDecl = baseClass?.valueDeclaration ?? baseClass?.declarations?.[0];
    if (baseClassDecl !== undefined && typescript_1.default.isClassDeclaration(baseClassDecl)) {
        return baseClassDecl;
    }
    return null;
}
/** Gets the `extends` base type expressions of the specified class. */
function getExtendsHeritageExpressions(classDecl) {
    if (classDecl.heritageClauses === undefined) {
        return [];
    }
    const result = [];
    for (const clause of classDecl.heritageClauses) {
        if (clause.token === typescript_1.default.SyntaxKind.ExtendsKeyword) {
            result.push(...clause.types);
        }
    }
    return result;
}
/** Gets whether the specified node has the `abstract` modifier applied. */
function hasAbstractModifier(node) {
    if (!typescript_1.default.canHaveModifiers(node)) {
        return false;
    }
    return !!typescript_1.default
        .getModifiers(node)
        ?.some((s) => s.kind === typescript_1.default.SyntaxKind.AbstractKeyword);
}
/** Gets whether the specified node has the `override` modifier applied. */
function hasOverrideModifier(node) {
    return !!node.modifiers?.some((s) => s.kind === typescript_1.default.SyntaxKind.OverrideKeyword);
}
/** Gets the property name text of the specified property name. */
function getPropertyNameText(name) {
    if (typescript_1.default.isComputedPropertyName(name)) {
        return null;
    }
    return name.text;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9JbXBsaWNpdE92ZXJyaWRlQWJzdHJhY3RSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGludC1ydWxlcy90c2xpbnQvbm9JbXBsaWNpdE92ZXJyaWRlQWJzdHJhY3RSdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7Ozs7OztBQUVILG9DQUFpRTtBQUNqRSw0Q0FBMkM7QUFDM0MsNERBQTRCO0FBRTVCLE1BQU0sZUFBZSxHQUNuQiw0REFBNEQ7SUFDNUQsZ0VBQWdFO0lBQ2hFLDRGQUE0RixDQUFDO0FBRS9GOzs7Ozs7Ozs7R0FTRztBQUNILE1BQWEsSUFBSyxTQUFRLGlCQUFTO0lBQ3hCLGdCQUFnQixDQUFDLFVBQXlCLEVBQUUsT0FBbUI7UUFDdEUsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzFGLENBQUM7Q0FDRjtBQUpELG9CQUlDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyxTQUFTLENBQUMsSUFBYSxFQUFFLEdBQWdCLEVBQUUsT0FBbUI7SUFDckUseUVBQXlFO0lBQ3pFLDZDQUE2QztJQUM3QyxJQUNFLG9CQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztRQUN2QixDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQztRQUMxQiw0QkFBNEIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQzNDO1FBQ0EsR0FBRyxDQUFDLGdCQUFnQixDQUNsQixJQUFJLEVBQ0osZUFBZSxFQUNmLGlCQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FDckQsQ0FBQztLQUNIO0lBRUQsb0JBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUs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QUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlCO0tBQ0Y7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsMkVBQTJFO0FBQzNFLFNBQVMsbUJBQW1CLENBQUMsSUFBYTtJQUN4QyxJQUFJLENBQUMsb0JBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUM5QixPQUFPLEtBQUssQ0FBQztLQUNkO0lBQ0QsT0FBTyxDQUFDLENBQUMsb0JBQUU7U0FDUixZQUFZLENBQUMsSUFBSSxDQUFDO1FBQ25CLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLG9CQUFFLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3pFLENBQUM7QUFFRCwyRUFBMkU7QUFDM0UsU0FBUyxtQkFBbUIsQ0FBQyxJQUFhO0lBQ3hDLE9BQU8sQ0FBQyxDQUFFLElBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUNwQyxDQUFDLENBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxvQkFBRSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQzdELENBQUM7QUFDSixDQUFDO0FBRUQsa0VBQWtFO0FBQ2xFLFNBQVMsbUJBQW1CLENBQUMsSUFBcUI7SUFDaEQsSUFBSSxvQkFBRSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ25DLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1JlcGxhY2VtZW50LCBSdWxlRmFpbHVyZSwgV2Fsa0NvbnRleHR9IGZyb20gJ3RzbGludC9saWInO1xuaW1wb3J0IHtUeXBlZFJ1bGV9IGZyb20gJ3RzbGludC9saWIvcnVsZXMnO1xuaW1wb3J0IHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5jb25zdCBGQUlMVVJFX01FU1NBR0UgPVxuICAnTWlzc2luZyBvdmVycmlkZSBtb2RpZmllci4gTWVtYmVycyBpbXBsZW1lbnRlZCBhcyBwYXJ0IG9mICcgK1xuICAnYWJzdHJhY3QgY2xhc3NlcyBtdXN0IGV4cGxpY2l0bHkgc2V0IHRoZSBcIm92ZXJyaWRlXCIgbW9kaWZpZXIuICcgK1xuICAnTW9yZSBkZXRhaWxzOiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzQ0NDU3I2lzc3VlY29tbWVudC04NTYyMDI4NDMuJztcblxuLyoqXG4gKiBSdWxlIHdoaWNoIGVuZm9yY2VzIHRoYXQgY2xhc3MgbWVtYmVycyBpbXBsZW1lbnRpbmcgYWJzdHJhY3QgbWVtYmVyc1xuICogZnJvbSBiYXNlIGNsYXNzZXMgZXhwbGljaXRseSBzcGVjaWZ5IHRoZSBgb3ZlcnJpZGVgIG1vZGlmaWVyLlxuICpcbiAqIFRoaXMgZW5zdXJlcyB3ZSBmb2xsb3cgdGhlIGJlc3QtcHJhY3RpY2Ugb2YgYXBwbHlpbmcgYG92ZXJyaWRlYCBmb3IgYWJzdHJhY3QtaW1wbGVtZW50ZWRcbiAqIG1lbWJlcnMgc28gdGhhdCBUeXBlU2NyaXB0IGNyZWF0ZXMgZGlhZ25vc3RpY3MgaW4gYm90aCBzY2VuYXJpb3Mgd2hlcmUgZWl0aGVyIHRoZSBhYnN0cmFjdFxuICogY2xhc3MgbWVtYmVyIGlzIHJlbW92ZWQsIG9yIHJlbmFtZWQuXG4gKlxuICogTW9yZSBkZXRhaWxzIGNhbiBiZSBmb3VuZCBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzQ0NDU3LlxuICovXG5leHBvcnQgY2xhc3MgUnVsZSBleHRlbmRzIFR5cGVkUnVsZSB7XG4gIG92ZXJyaWRlIGFwcGx5V2l0aFByb2dyYW0oc291cmNlRmlsZTogdHMuU291cmNlRmlsZSwgcHJvZ3JhbTogdHMuUHJvZ3JhbSk6IFJ1bGVGYWlsdXJlW10ge1xuICAgIHJldHVybiB0aGlzLmFwcGx5V2l0aEZ1bmN0aW9uKHNvdXJjZUZpbGUsIChjdHgpID0+IHZpc2l0Tm9kZShzb3VyY2VGaWxlLCBjdHgsIHByb2dyYW0pKTtcbiAgfVxufVxuXG4vKipcbiAqIEZvciBhIFR5cGVTY3JpcHQgQVNUIG5vZGUgYW5kIGVhY2ggb2YgaXRzIGNoaWxkIG5vZGVzLCBjaGVjayB3aGV0aGVyIHRoZSBub2RlIGlzIGEgY2xhc3NcbiAqIGVsZW1lbnQgd2hpY2ggaW1wbGVtZW50cyBhbiBhYnN0cmFjdCBtZW1iZXIgYnV0IGRvZXMgbm90IGhhdmUgdGhlIGBvdmVycmlkZWAga2V5d29yZC5cbiAqL1xuZnVuY3Rpb24gdmlzaXROb2RlKG5vZGU6IHRzLk5vZGUsIGN0eDogV2Fsa0NvbnRleHQsIHByb2dyYW06IHRzLlByb2dyYW0pIHtcbiAgLy8gSWYgYSBjbGFzcyBlbGVtZW50IGltcGxlbWVudHMgYW4gYWJzdHJhY3QgbWVtYmVyIGJ1dCBkb2VzIG5vdCBoYXZlIHRoZVxuICAvLyBgb3ZlcnJpZGVgIGtleXdvcmQsIGNyZWF0ZSBhIGxpbnQgZmFpbHVyZS5cbiAgaWYgKFxuICAgIHRzLmlzQ2xhc3NFbGVtZW50KG5vZGUpICYmXG4gICAgIWhhc092ZXJyaWRlTW9kaWZpZXIobm9kZSkgJiZcbiAgICBtYXRjaGVzUGFyZW50QWJzdHJhY3RFbGVtZW50KG5vZGUsIHByb2dyYW0pXG4gICkge1xuICAgIGN0eC5hZGRGYWlsdXJlQXROb2RlKFxuICAgICAgbm9kZSxcbiAgICAgIEZBSUxVUkVfTUVTU0FHRSxcbiAgICAgIFJlcGxhY2VtZW50LmFwcGVuZFRleHQobm9kZS5nZXRTdGFydCgpLCBgb3ZlcnJpZGUgYCksXG4gICAgKTtcbiAgfVxuXG4gIHRzLmZvckVhY2hDaGlsZChub2RlLCAobikgPT4gdmlzaXROb2RlKG4sIGN0eCwgcHJvZ3JhbSkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgc3BlY2lmaWVkIGNsYXNzIGVsZW1lbnQgbWF0Y2hlcyBhIHBhcmVudCBhYnN0cmFjdCBjbGFzcyBlbGVtZW50LiBpLmUuXG4gKiB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgbWVtYmVyIFwiaW1wbGVtZW50c1wiIGFuIGFic3RyYWN0IG1lbWJlciBmcm9tIGEgYmFzZSBjbGFzcy5cbiAqL1xuZnVuY3Rpb24gbWF0Y2hlc1BhcmVudEFic3RyYWN0RWxlbWVudChub2RlOiB0cy5DbGFzc0VsZW1lbnQsIHByb2dyYW06IHRzLlByb2dyYW0pOiBib29sZWFuIHtcbiAgY29uc3QgY29udGFpbmluZ0NsYXNzID0gbm9kZS5wYXJlbnQgYXMgdHMuQ2xhc3NEZWNsYXJhdGlvbjtcblxuICAvLyBJZiB0aGUgcHJvcGVydHkgd2UgY2hlY2sgZG9lcyBub3QgaGF2ZSBhIHByb3BlcnR5IG5hbWUsIHdlIGNhbm5vdCBsb29rIGZvciBzaW1pbGFybHktbmFtZWRcbiAgLy8gbWVtYmVycyBpbiBwYXJlbnQgY2xhc3NlcyBhbmQgdGhlcmVmb3JlIHJldHVybiBlYXJseS5cbiAgaWYgKG5vZGUubmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgcHJvcGVydHlOYW1lID0gZ2V0UHJvcGVydHlOYW1lVGV4dChub2RlLm5hbWUpO1xuICBjb25zdCB0eXBlQ2hlY2tlciA9IHByb2dyYW0uZ2V0VHlwZUNoZWNrZXIoKTtcblxuICAvLyBJZiB0aGUgcHJvcGVydHkgd2UgY2hlY2sgZG9lcyBub3QgaGF2ZSBhIHN0YXRpY2FsbHktYW5hbHl6YWJsZSBwcm9wZXJ0eSBuYW1lLFxuICAvLyB3ZSBjYW5ub3QgbG9vayBmb3Igc2ltaWxhcmx5LW5hbWVkIG1lbWJlcnMgaW4gcGFyZW50IGNsYXNzZXMgYW5kIHJldHVybiBlYXJseS5cbiAgaWYgKHByb3BlcnR5TmFtZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBjaGVja0NsYXNzRm9ySW5oZXJpdGVkTWF0Y2hpbmdBYnN0cmFjdE1lbWJlcihjb250YWluaW5nQ2xhc3MsIHR5cGVDaGVja2VyLCBwcm9wZXJ0eU5hbWUpO1xufVxuXG4vKiogQ2hlY2tzIGlmIHRoZSBnaXZlbiBjbGFzcyBpbmhlcml0cyBhbiBhYnN0cmFjdCBtZW1iZXIgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUuICovXG5mdW5jdGlvbiBjaGVja0NsYXNzRm9ySW5oZXJpdGVkTWF0Y2hpbmdBYnN0cmFjdE1lbWJlcihcbiAgY2xheno6IHRzLkNsYXNzRGVjbGFyYXRpb24sXG4gIHR5cGVDaGVja2VyOiB0cy5UeXBlQ2hlY2tlcixcbiAgc2VhcmNoTWVtYmVyTmFtZTogc3RyaW5nLFxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IGJhc2VDbGFzcyA9IGdldEJhc2VDbGFzcyhjbGF6eiwgdHlwZUNoZWNrZXIpO1xuXG4gIC8vIElmIHRoZSBjbGFzcyBpcyBub3QgYGFic3RyYWN0YCwgdGhlbiBhbGwgcGFyZW50IGFic3RyYWN0IG1ldGhvZHMgd291bGQgbmVlZCB0b1xuICAvLyBiZSBpbXBsZW1lbnRlZCwgYW5kIHRoZXJlIGlzIG5ldmVyIGFuIGFic3RyYWN0IG1lbWJlciB3aXRoaW4gdGhlIGNsYXNzLlxuICBpZiAoYmFzZUNsYXNzID09PSBudWxsIHx8ICFoYXNBYnN0cmFjdE1vZGlmaWVyKGJhc2VDbGFzcykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBtYXRjaGluZ01lbWJlciA9IGJhc2VDbGFzcy5tZW1iZXJzLmZpbmQoXG4gICAgKG0pID0+IG0ubmFtZSAhPT0gdW5kZWZpbmVkICYmIGdldFByb3BlcnR5TmFtZVRleHQobS5uYW1lKSA9PT0gc2VhcmNoTWVtYmVyTmFtZSxcbiAgKTtcblxuICBpZiAobWF0Y2hpbmdNZW1iZXIgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBoYXNBYnN0cmFjdE1vZGlmaWVyKG1hdGNoaW5nTWVtYmVyKTtcbiAgfVxuXG4gIHJldHVybiBjaGVja0NsYXNzRm9ySW5oZXJpdGVkTWF0Y2hpbmdBYnN0cmFjdE1lbWJlcihiYXNlQ2xhc3MsIHR5cGVDaGVja2VyLCBzZWFyY2hNZW1iZXJOYW1lKTtcbn1cblxuLyoqIEdldHMgdGhlIGJhc2UgY2xhc3MgZm9yIHRoZSBnaXZlbiBjbGFzcyBkZWNsYXJhdGlvbi4gKi9cbmZ1bmN0aW9uIGdldEJhc2VDbGFzcyhcbiAgbm9kZTogdHMuQ2xhc3NEZWNsYXJhdGlvbixcbiAgdHlwZUNoZWNrZXI6IHRzLlR5cGVDaGVja2VyLFxuKTogdHMuQ2xhc3NEZWNsYXJhdGlvbiB8IG51bGwge1xuICBjb25zdCBiYXNlVHlwZXMgPSBnZXRFeHRlbmRzSGVyaXRhZ2VFeHByZXNzaW9ucyhub2RlKTtcblxuICBpZiAoYmFzZVR5cGVzLmxlbmd0aCA+IDEpIHtcbiAgICB0aHJvdyBFcnJvcignQ2xhc3MgdW5leHBlY3RlZGx5IGV4dGVuZHMgZnJvbSBtdWx0aXBsZSB0eXBlcy4nKTtcbiAgfVxuXG4gIGNvbnN0IGJhc2VDbGFzcyA9IHR5cGVDaGVja2VyLmdldFR5cGVBdExvY2F0aW9uKGJhc2VUeXBlc1swXSkuZ2V0U3ltYm9sKCk7XG4gIGNvbnN0IGJhc2VDbGFzc0RlY2wgPSBiYXNlQ2xhc3M/LnZhbHVlRGVjbGFyYXRpb24gPz8gYmFzZUNsYXNzPy5kZWNsYXJhdGlvbnM/LlswXTtcblxuICBpZiAoYmFzZUNsYXNzRGVjbCAhPT0gdW5kZWZpbmVkICYmIHRzLmlzQ2xhc3NEZWNsYXJhdGlvbihiYXNlQ2xhc3NEZWNsKSkge1xuICAgIHJldHVybiBiYXNlQ2xhc3NEZWNsO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKiBHZXRzIHRoZSBgZXh0ZW5kc2AgYmFzZSB0eXBlIGV4cHJlc3Npb25zIG9mIHRoZSBzcGVjaWZpZWQgY2xhc3MuICovXG5mdW5jdGlvbiBnZXRFeHRlbmRzSGVyaXRhZ2VFeHByZXNzaW9ucyhcbiAgY2xhc3NEZWNsOiB0cy5DbGFzc0RlY2xhcmF0aW9uLFxuKTogdHMuRXhwcmVzc2lvbldpdGhUeXBlQXJndW1lbnRzW10ge1xuICBpZiAoY2xhc3NEZWNsLmhlcml0YWdlQ2xhdXNlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIGNvbnN0IHJlc3VsdDogdHMuRXhwcmVzc2lvbldpdGhUeXBlQXJndW1lbnRzW10gPSBbXTtcbiAgZm9yIChjb25zdCBjbGF1c2Ugb2YgY2xhc3NEZWNsLmhlcml0YWdlQ2xhdXNlcykge1xuICAgIGlmIChjbGF1c2UudG9rZW4gPT09IHRzLlN5bnRheEtpbmQuRXh0ZW5kc0tleXdvcmQpIHtcbiAgICAgIHJlc3VsdC5wdXNoKC4uLmNsYXVzZS50eXBlcyk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKiBHZXRzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBub2RlIGhhcyB0aGUgYGFic3RyYWN0YCBtb2RpZmllciBhcHBsaWVkLiAqL1xuZnVuY3Rpb24gaGFzQWJzdHJhY3RNb2RpZmllcihub2RlOiB0cy5Ob2RlKTogYm9vbGVhbiB7XG4gIGlmICghdHMuY2FuSGF2ZU1vZGlmaWVycyhub2RlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gISF0c1xuICAgIC5nZXRNb2RpZmllcnMobm9kZSlcbiAgICA/LnNvbWUoKHM6IHRzLk1vZGlmaWVyKSA9PiBzLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQWJzdHJhY3RLZXl3b3JkKTtcbn1cblxuLyoqIEdldHMgd2hldGhlciB0aGUgc3BlY2lmaWVkIG5vZGUgaGFzIHRoZSBgb3ZlcnJpZGVgIG1vZGlmaWVyIGFwcGxpZWQuICovXG5mdW5jdGlvbiBoYXNPdmVycmlkZU1vZGlmaWVyKG5vZGU6IHRzLk5vZGUpOiBib29sZWFuIHtcbiAgcmV0dXJuICEhKG5vZGUgYXMgYW55KS5tb2RpZmllcnM/LnNvbWUoXG4gICAgKHM6IHRzLk1vZGlmaWVyKSA9PiBzLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuT3ZlcnJpZGVLZXl3b3JkLFxuICApO1xufVxuXG4vKiogR2V0cyB0aGUgcHJvcGVydHkgbmFtZSB0ZXh0IG9mIHRoZSBzcGVjaWZpZWQgcHJvcGVydHkgbmFtZS4gKi9cbmZ1bmN0aW9uIGdldFByb3BlcnR5TmFtZVRleHQobmFtZTogdHMuUHJvcGVydHlOYW1lKTogc3RyaW5nIHwgbnVsbCB7XG4gIGlmICh0cy5pc0NvbXB1dGVkUHJvcGVydHlOYW1lKG5hbWUpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIG5hbWUudGV4dDtcbn1cbiJdfQ==