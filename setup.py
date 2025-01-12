"""
tiledb-plot-widget setup
"""
import json
import sys

# import os
from pathlib import Path

# from os.path import join as pjoin

import setuptools

HERE = Path(__file__).parent.resolve()

# The name of the project
name = "tiledb-plot-widget"

lab_path = HERE.resolve() / "tiledb" / "plot" / "widget" / "labextension"

# Representative files that should exist after a successful build
ensured_targets = [str(lab_path / "package.json"), str(lab_path / "static/style.js")]

labext_name = "@tiledb-inc/tiledb-plot-widget"

data_files_spec = [
    (
        "share/jupyter/labextensions/%s" % labext_name,
        str(lab_path.relative_to(HERE)),
        "**",
    ),
    ("share/jupyter/labextensions/%s" % labext_name, str("."), "install.json"),
]

long_description = (HERE / "README.md").read_text()

# Get the package info from package.json
pkg_json = json.loads((HERE / "package.json").read_bytes())

packages = ["tiledb.plot.widget"] + [
    "tiledb.plot.widget." + x for x in setuptools.find_packages("./tiledb/plot/widget")
]

setup_args = dict(
    name=name,
    url=pkg_json["homepage"],
    author=pkg_json["author"]["name"],
    author_email=pkg_json["author"]["email"],
    description=pkg_json["description"],
    license=pkg_json["license"],
    license_file="LICENSE",
    long_description=long_description,
    long_description_content_type="text/markdown",
    packages=packages,
    install_requires=[
        "ipywidgets>=7.0.0",
    ],
    setup_requires=[
        "setuptools-scm>=1.5.4",
        "setuptools-scm-git-archive",
    ],
    use_scm_version={
        "version_scheme": "guess-next-dev",
        "local_scheme": "dirty-tag",
        "write_to": "tiledb/plot/widget/version.py",
    },
    zip_safe=False,
    include_package_data=True,
    python_requires=">=3.6",
    platforms="Linux, Mac OS X, Windows",
    keywords=["Jupyter", "JupyterLab", "JupyterLab3"],
    classifiers=[
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Framework :: Jupyter",
        "Framework :: Jupyter :: JupyterLab",
        "Framework :: Jupyter :: JupyterLab :: 3",
        "Framework :: Jupyter :: JupyterLab :: Extensions",
        "Framework :: Jupyter :: JupyterLab :: Extensions :: Prebuilt",
    ],
)

try:
    from jupyter_packaging import wrap_installers, npm_builder, get_data_files

    post_develop = npm_builder(
        build_cmd="install:extension", source_dir="src", build_dir=lab_path
    )
    setup_args["cmdclass"] = wrap_installers(
        post_develop=post_develop, ensured_targets=ensured_targets
    )
    setup_args["data_files"] = get_data_files(data_files_spec)
except ImportError as e:
    import logging

    logging.basicConfig(format="%(levelname)s: %(message)s")
    logging.warning(
        "Build tool `jupyter-packaging` is missing. Install it with pip or conda."
    )
    if not ("--name" in sys.argv or "--version" in sys.argv):
        raise e

if __name__ == "__main__":
    setuptools.setup(**setup_args)
