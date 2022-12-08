"""Public API for rules related to test bundling."""

load("@npm//@angular/build-tooling/bazel/spec-bundling:spec-entrypoint.bzl", _spec_entrypoint = "spec_entrypoint")
load("@npm//@angular/build-tooling/bazel/spec-bundling:spec-bundle.bzl", _spec_bundle = "spec_bundle")

spec_bundle = _spec_bundle
spec_entrypoint = _spec_entrypoint
