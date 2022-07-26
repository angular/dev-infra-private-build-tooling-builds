"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
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
    return !!node.modifiers?.some((s) => s.kind === typescript_1.default.SyntaxKind.AbstractKeyword);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9JbXBsaWNpdE92ZXJyaWRlQWJzdHJhY3RSdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdHNsaW50LXJ1bGVzL25vSW1wbGljaXRPdmVycmlkZUFic3RyYWN0UnVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7Ozs7QUFFSCxvQ0FBaUU7QUFDakUsNENBQTJDO0FBQzNDLDREQUE0QjtBQUU1QixNQUFNLGVBQWUsR0FDbkIsNERBQTREO0lBQzVELGdFQUFnRTtJQUNoRSw0RkFBNEYsQ0FBQztBQUUvRjs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFhLElBQUssU0FBUSxpQkFBUztJQUN4QixnQkFBZ0IsQ0FBQyxVQUF5QixFQUFFLE9BQW1CO1FBQ3RFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMxRixDQUFDO0NBQ0Y7QUFKRCxvQkFJQztBQUVEOzs7R0FHRztBQUNILFNBQVMsU0FBUyxDQUFDLElBQWEsRUFBRSxHQUFnQixFQUFFLE9BQW1CO0lBQ3JFLHlFQUF5RTtJQUN6RSw2Q0FBNkM7SUFDN0MsSUFDRSxvQkFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7UUFDdkIsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7UUFDMUIsNEJBQTRCLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUMzQztRQUNBLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FDbEIsSUFBSSxFQUNKLGVBQWUsRUFDZixpQkFBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQ3JELENBQUM7S0FDSDtJQUVELG9CQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsU0FB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LE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5QjtLQUNGO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELDJFQUEyRTtBQUMzRSxTQUFTLG1CQUFtQixDQUFDLElBQWE7SUFDeEMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssb0JBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDakYsQ0FBQztBQUVELDJFQUEyRTtBQUMzRSxTQUFTLG1CQUFtQixDQUFDLElBQWE7SUFDeEMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssb0JBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDakYsQ0FBQztBQUVELGtFQUFrRTtBQUNsRSxTQUFTLG1CQUFtQixDQUFDLElBQXFCO0lBQ2hELElBQUksb0JBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNuQyxPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtSZXBsYWNlbWVudCwgUnVsZUZhaWx1cmUsIFdhbGtDb250ZXh0fSBmcm9tICd0c2xpbnQvbGliJztcbmltcG9ydCB7VHlwZWRSdWxlfSBmcm9tICd0c2xpbnQvbGliL3J1bGVzJztcbmltcG9ydCB0cyBmcm9tICd0eXBlc2NyaXB0JztcblxuY29uc3QgRkFJTFVSRV9NRVNTQUdFID1cbiAgJ01pc3Npbmcgb3ZlcnJpZGUgbW9kaWZpZXIuIE1lbWJlcnMgaW1wbGVtZW50ZWQgYXMgcGFydCBvZiAnICtcbiAgJ2Fic3RyYWN0IGNsYXNzZXMgbXVzdCBleHBsaWNpdGx5IHNldCB0aGUgXCJvdmVycmlkZVwiIG1vZGlmaWVyLiAnICtcbiAgJ01vcmUgZGV0YWlsczogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy80NDQ1NyNpc3N1ZWNvbW1lbnQtODU2MjAyODQzLic7XG5cbi8qKlxuICogUnVsZSB3aGljaCBlbmZvcmNlcyB0aGF0IGNsYXNzIG1lbWJlcnMgaW1wbGVtZW50aW5nIGFic3RyYWN0IG1lbWJlcnNcbiAqIGZyb20gYmFzZSBjbGFzc2VzIGV4cGxpY2l0bHkgc3BlY2lmeSB0aGUgYG92ZXJyaWRlYCBtb2RpZmllci5cbiAqXG4gKiBUaGlzIGVuc3VyZXMgd2UgZm9sbG93IHRoZSBiZXN0LXByYWN0aWNlIG9mIGFwcGx5aW5nIGBvdmVycmlkZWAgZm9yIGFic3RyYWN0LWltcGxlbWVudGVkXG4gKiBtZW1iZXJzIHNvIHRoYXQgVHlwZVNjcmlwdCBjcmVhdGVzIGRpYWdub3N0aWNzIGluIGJvdGggc2NlbmFyaW9zIHdoZXJlIGVpdGhlciB0aGUgYWJzdHJhY3RcbiAqIGNsYXNzIG1lbWJlciBpcyByZW1vdmVkLCBvciByZW5hbWVkLlxuICpcbiAqIE1vcmUgZGV0YWlscyBjYW4gYmUgZm91bmQgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy80NDQ1Ny5cbiAqL1xuZXhwb3J0IGNsYXNzIFJ1bGUgZXh0ZW5kcyBUeXBlZFJ1bGUge1xuICBvdmVycmlkZSBhcHBseVdpdGhQcm9ncmFtKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsIHByb2dyYW06IHRzLlByb2dyYW0pOiBSdWxlRmFpbHVyZVtdIHtcbiAgICByZXR1cm4gdGhpcy5hcHBseVdpdGhGdW5jdGlvbihzb3VyY2VGaWxlLCAoY3R4KSA9PiB2aXNpdE5vZGUoc291cmNlRmlsZSwgY3R4LCBwcm9ncmFtKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBGb3IgYSBUeXBlU2NyaXB0IEFTVCBub2RlIGFuZCBlYWNoIG9mIGl0cyBjaGlsZCBub2RlcywgY2hlY2sgd2hldGhlciB0aGUgbm9kZSBpcyBhIGNsYXNzXG4gKiBlbGVtZW50IHdoaWNoIGltcGxlbWVudHMgYW4gYWJzdHJhY3QgbWVtYmVyIGJ1dCBkb2VzIG5vdCBoYXZlIHRoZSBgb3ZlcnJpZGVgIGtleXdvcmQuXG4gKi9cbmZ1bmN0aW9uIHZpc2l0Tm9kZShub2RlOiB0cy5Ob2RlLCBjdHg6IFdhbGtDb250ZXh0LCBwcm9ncmFtOiB0cy5Qcm9ncmFtKSB7XG4gIC8vIElmIGEgY2xhc3MgZWxlbWVudCBpbXBsZW1lbnRzIGFuIGFic3RyYWN0IG1lbWJlciBidXQgZG9lcyBub3QgaGF2ZSB0aGVcbiAgLy8gYG92ZXJyaWRlYCBrZXl3b3JkLCBjcmVhdGUgYSBsaW50IGZhaWx1cmUuXG4gIGlmIChcbiAgICB0cy5pc0NsYXNzRWxlbWVudChub2RlKSAmJlxuICAgICFoYXNPdmVycmlkZU1vZGlmaWVyKG5vZGUpICYmXG4gICAgbWF0Y2hlc1BhcmVudEFic3RyYWN0RWxlbWVudChub2RlLCBwcm9ncmFtKVxuICApIHtcbiAgICBjdHguYWRkRmFpbHVyZUF0Tm9kZShcbiAgICAgIG5vZGUsXG4gICAgICBGQUlMVVJFX01FU1NBR0UsXG4gICAgICBSZXBsYWNlbWVudC5hcHBlbmRUZXh0KG5vZGUuZ2V0U3RhcnQoKSwgYG92ZXJyaWRlIGApLFxuICAgICk7XG4gIH1cblxuICB0cy5mb3JFYWNoQ2hpbGQobm9kZSwgKG4pID0+IHZpc2l0Tm9kZShuLCBjdHgsIHByb2dyYW0pKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIHNwZWNpZmllZCBjbGFzcyBlbGVtZW50IG1hdGNoZXMgYSBwYXJlbnQgYWJzdHJhY3QgY2xhc3MgZWxlbWVudC4gaS5lLlxuICogd2hldGhlciB0aGUgc3BlY2lmaWVkIG1lbWJlciBcImltcGxlbWVudHNcIiBhbiBhYnN0cmFjdCBtZW1iZXIgZnJvbSBhIGJhc2UgY2xhc3MuXG4gKi9cbmZ1bmN0aW9uIG1hdGNoZXNQYXJlbnRBYnN0cmFjdEVsZW1lbnQobm9kZTogdHMuQ2xhc3NFbGVtZW50LCBwcm9ncmFtOiB0cy5Qcm9ncmFtKTogYm9vbGVhbiB7XG4gIGNvbnN0IGNvbnRhaW5pbmdDbGFzcyA9IG5vZGUucGFyZW50IGFzIHRzLkNsYXNzRGVjbGFyYXRpb247XG5cbiAgLy8gSWYgdGhlIHByb3BlcnR5IHdlIGNoZWNrIGRvZXMgbm90IGhhdmUgYSBwcm9wZXJ0eSBuYW1lLCB3ZSBjYW5ub3QgbG9vayBmb3Igc2ltaWxhcmx5LW5hbWVkXG4gIC8vIG1lbWJlcnMgaW4gcGFyZW50IGNsYXNzZXMgYW5kIHRoZXJlZm9yZSByZXR1cm4gZWFybHkuXG4gIGlmIChub2RlLm5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHByb3BlcnR5TmFtZSA9IGdldFByb3BlcnR5TmFtZVRleHQobm9kZS5uYW1lKTtcbiAgY29uc3QgdHlwZUNoZWNrZXIgPSBwcm9ncmFtLmdldFR5cGVDaGVja2VyKCk7XG5cbiAgLy8gSWYgdGhlIHByb3BlcnR5IHdlIGNoZWNrIGRvZXMgbm90IGhhdmUgYSBzdGF0aWNhbGx5LWFuYWx5emFibGUgcHJvcGVydHkgbmFtZSxcbiAgLy8gd2UgY2Fubm90IGxvb2sgZm9yIHNpbWlsYXJseS1uYW1lZCBtZW1iZXJzIGluIHBhcmVudCBjbGFzc2VzIGFuZCByZXR1cm4gZWFybHkuXG4gIGlmIChwcm9wZXJ0eU5hbWUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gY2hlY2tDbGFzc0ZvckluaGVyaXRlZE1hdGNoaW5nQWJzdHJhY3RNZW1iZXIoY29udGFpbmluZ0NsYXNzLCB0eXBlQ2hlY2tlciwgcHJvcGVydHlOYW1lKTtcbn1cblxuLyoqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gY2xhc3MgaW5oZXJpdHMgYW4gYWJzdHJhY3QgbWVtYmVyIHdpdGggdGhlIHNwZWNpZmllZCBuYW1lLiAqL1xuZnVuY3Rpb24gY2hlY2tDbGFzc0ZvckluaGVyaXRlZE1hdGNoaW5nQWJzdHJhY3RNZW1iZXIoXG4gIGNsYXp6OiB0cy5DbGFzc0RlY2xhcmF0aW9uLFxuICB0eXBlQ2hlY2tlcjogdHMuVHlwZUNoZWNrZXIsXG4gIHNlYXJjaE1lbWJlck5hbWU6IHN0cmluZyxcbik6IGJvb2xlYW4ge1xuICBjb25zdCBiYXNlQ2xhc3MgPSBnZXRCYXNlQ2xhc3MoY2xhenosIHR5cGVDaGVja2VyKTtcblxuICAvLyBJZiB0aGUgY2xhc3MgaXMgbm90IGBhYnN0cmFjdGAsIHRoZW4gYWxsIHBhcmVudCBhYnN0cmFjdCBtZXRob2RzIHdvdWxkIG5lZWQgdG9cbiAgLy8gYmUgaW1wbGVtZW50ZWQsIGFuZCB0aGVyZSBpcyBuZXZlciBhbiBhYnN0cmFjdCBtZW1iZXIgd2l0aGluIHRoZSBjbGFzcy5cbiAgaWYgKGJhc2VDbGFzcyA9PT0gbnVsbCB8fCAhaGFzQWJzdHJhY3RNb2RpZmllcihiYXNlQ2xhc3MpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgbWF0Y2hpbmdNZW1iZXIgPSBiYXNlQ2xhc3MubWVtYmVycy5maW5kKFxuICAgIChtKSA9PiBtLm5hbWUgIT09IHVuZGVmaW5lZCAmJiBnZXRQcm9wZXJ0eU5hbWVUZXh0KG0ubmFtZSkgPT09IHNlYXJjaE1lbWJlck5hbWUsXG4gICk7XG5cbiAgaWYgKG1hdGNoaW5nTWVtYmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gaGFzQWJzdHJhY3RNb2RpZmllcihtYXRjaGluZ01lbWJlcik7XG4gIH1cblxuICByZXR1cm4gY2hlY2tDbGFzc0ZvckluaGVyaXRlZE1hdGNoaW5nQWJzdHJhY3RNZW1iZXIoYmFzZUNsYXNzLCB0eXBlQ2hlY2tlciwgc2VhcmNoTWVtYmVyTmFtZSk7XG59XG5cbi8qKiBHZXRzIHRoZSBiYXNlIGNsYXNzIGZvciB0aGUgZ2l2ZW4gY2xhc3MgZGVjbGFyYXRpb24uICovXG5mdW5jdGlvbiBnZXRCYXNlQ2xhc3MoXG4gIG5vZGU6IHRzLkNsYXNzRGVjbGFyYXRpb24sXG4gIHR5cGVDaGVja2VyOiB0cy5UeXBlQ2hlY2tlcixcbik6IHRzLkNsYXNzRGVjbGFyYXRpb24gfCBudWxsIHtcbiAgY29uc3QgYmFzZVR5cGVzID0gZ2V0RXh0ZW5kc0hlcml0YWdlRXhwcmVzc2lvbnMobm9kZSk7XG5cbiAgaWYgKGJhc2VUeXBlcy5sZW5ndGggPiAxKSB7XG4gICAgdGhyb3cgRXJyb3IoJ0NsYXNzIHVuZXhwZWN0ZWRseSBleHRlbmRzIGZyb20gbXVsdGlwbGUgdHlwZXMuJyk7XG4gIH1cblxuICBjb25zdCBiYXNlQ2xhc3MgPSB0eXBlQ2hlY2tlci5nZXRUeXBlQXRMb2NhdGlvbihiYXNlVHlwZXNbMF0pLmdldFN5bWJvbCgpO1xuICBjb25zdCBiYXNlQ2xhc3NEZWNsID0gYmFzZUNsYXNzPy52YWx1ZURlY2xhcmF0aW9uID8/IGJhc2VDbGFzcz8uZGVjbGFyYXRpb25zPy5bMF07XG5cbiAgaWYgKGJhc2VDbGFzc0RlY2wgIT09IHVuZGVmaW5lZCAmJiB0cy5pc0NsYXNzRGVjbGFyYXRpb24oYmFzZUNsYXNzRGVjbCkpIHtcbiAgICByZXR1cm4gYmFzZUNsYXNzRGVjbDtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG4vKiogR2V0cyB0aGUgYGV4dGVuZHNgIGJhc2UgdHlwZSBleHByZXNzaW9ucyBvZiB0aGUgc3BlY2lmaWVkIGNsYXNzLiAqL1xuZnVuY3Rpb24gZ2V0RXh0ZW5kc0hlcml0YWdlRXhwcmVzc2lvbnMoXG4gIGNsYXNzRGVjbDogdHMuQ2xhc3NEZWNsYXJhdGlvbixcbik6IHRzLkV4cHJlc3Npb25XaXRoVHlwZUFyZ3VtZW50c1tdIHtcbiAgaWYgKGNsYXNzRGVjbC5oZXJpdGFnZUNsYXVzZXMgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBjb25zdCByZXN1bHQ6IHRzLkV4cHJlc3Npb25XaXRoVHlwZUFyZ3VtZW50c1tdID0gW107XG4gIGZvciAoY29uc3QgY2xhdXNlIG9mIGNsYXNzRGVjbC5oZXJpdGFnZUNsYXVzZXMpIHtcbiAgICBpZiAoY2xhdXNlLnRva2VuID09PSB0cy5TeW50YXhLaW5kLkV4dGVuZHNLZXl3b3JkKSB7XG4gICAgICByZXN1bHQucHVzaCguLi5jbGF1c2UudHlwZXMpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKiogR2V0cyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgbm9kZSBoYXMgdGhlIGBhYnN0cmFjdGAgbW9kaWZpZXIgYXBwbGllZC4gKi9cbmZ1bmN0aW9uIGhhc0Fic3RyYWN0TW9kaWZpZXIobm9kZTogdHMuTm9kZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gISFub2RlLm1vZGlmaWVycz8uc29tZSgocykgPT4gcy5raW5kID09PSB0cy5TeW50YXhLaW5kLkFic3RyYWN0S2V5d29yZCk7XG59XG5cbi8qKiBHZXRzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBub2RlIGhhcyB0aGUgYG92ZXJyaWRlYCBtb2RpZmllciBhcHBsaWVkLiAqL1xuZnVuY3Rpb24gaGFzT3ZlcnJpZGVNb2RpZmllcihub2RlOiB0cy5Ob2RlKTogYm9vbGVhbiB7XG4gIHJldHVybiAhIW5vZGUubW9kaWZpZXJzPy5zb21lKChzKSA9PiBzLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuT3ZlcnJpZGVLZXl3b3JkKTtcbn1cblxuLyoqIEdldHMgdGhlIHByb3BlcnR5IG5hbWUgdGV4dCBvZiB0aGUgc3BlY2lmaWVkIHByb3BlcnR5IG5hbWUuICovXG5mdW5jdGlvbiBnZXRQcm9wZXJ0eU5hbWVUZXh0KG5hbWU6IHRzLlByb3BlcnR5TmFtZSk6IHN0cmluZyB8IG51bGwge1xuICBpZiAodHMuaXNDb21wdXRlZFByb3BlcnR5TmFtZShuYW1lKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBuYW1lLnRleHQ7XG59XG4iXX0=