load("@npm//@angular/build-tooling/bazel/spec-bundling:spec-entrypoint.bzl", "spec_entrypoint")
load("@devinfra_npm@npm//@angular/build-tooling/bazel:esbuild/package_json.bzl", esbuild = "bin")

def spec_bundle(name, deps, bootstrap = [], testonly = True, **kwargs):
    spec_entrypoint(
        name = "%s_entrypoint" % name,
        deps = deps,
        bootstrap = bootstrap,
        testonly = testonly,
    )

    esbuild.esbuild(
        name = name,
        # Note: `deps` are added here to automatically collect transitive NPM
        # sources etc. and make them available for bundling.
        srcs = deps + [
            ":%s_entrypoint" % name,
        ],
        testonly = testonly,
        outs = [
            "%s_spec_bundle.spec.js" % name,
            "%s_spec_bundle.spec.js.map" % name,
        ],
        args = [
            "--format=iife",
            "--bundle",
            "--resolve-extensions=.mjs,.js",
            "--minify",
            "--sourcemap=external",
            "--platform=node",
            "--outfile=%s/%s_spec_bundle.spec.js " % (native.package_name(), name),
            "%s/%s_entrypoint.mjs" % (native.package_name(), name),
        ],
        progress_message = "Creating spec-bundle",
        silent_on_success = True,
        **kwargs
    )
