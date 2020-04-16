#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.

from __future__ import print_function
from glob import glob
from os.path import join as pjoin


from setupbase import (
    create_cmdclass, install_npm, ensure_targets,
    combine_commands, ensure_python, find_packages,
    HERE
)

import setuptools
from setuptools import setup


# The name of the project
name = 'tiledb-plot-widget'

# Ensure a valid python version
ensure_python('>=3.4')

nb_path = pjoin(HERE, "tiledb/plot/widget", 'nbextension', 'static')
lab_path = pjoin(HERE, "tiledb/plot/widget", 'labextension')

# Representative files that should exist after a successful build
jstargets = [
    pjoin(nb_path, 'index.js'),
    pjoin(HERE, 'lib', 'plugin.js'),
]

package_data_spec = {
    name: [
        'nbextension/static/*.*js*',
        'labextension/*.tgz'
    ]
}

data_files_spec = [
    ('share/jupyter/nbextensions/tiledb-plot-widget',
        nb_path, '*.js*'),
    ('share/jupyter/lab/extensions', lab_path, '*.tgz'),
    ('etc/jupyter/nbconfig/notebook.d' , HERE, 'tiledb-plot-widget.json')
]


cmdclass = create_cmdclass('jsdeps', package_data_spec=package_data_spec,
    data_files_spec=data_files_spec)
cmdclass['jsdeps'] = combine_commands(
    install_npm(HERE, build_cmd='build:all'),
    ensure_targets(jstargets),
)

packages = ["tiledb.plot.widget"] + [
    "tiledb.plot.widget." + x for x in find_packages("./tiledb/plot/widget")
]

setup_args = dict(
    name            = name,
    description     = 'Custom Jupyterlab widget for TileDB',
    scripts         = glob(pjoin('scripts', '*')),
    cmdclass        = cmdclass,
    packages        = packages,
    author          = 'Konstantinos Sarantopoulos',
    author_email    = 'hello@tiledb.com',
    url             = 'https://github.com/TileDB-Inc/TileDB-Jupyter-Plot-Widget ',
    license         = 'BSD',
    platforms       = "Linux, Mac OS X, Windows",
    keywords        = ['Jupyter', 'Widgets', 'IPython'],
    classifiers     = [
        'Intended Audience :: Developers',
        'Intended Audience :: Science/Research',
        'License :: OSI Approved :: BSD License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Framework :: Jupyter',
    ],
    include_package_data = True,
    zip_safe=False,  # Force folder install; egg doesn't work for namespace
    use_scm_version={
        "version_scheme": "guess-next-dev",
        "local_scheme": "dirty-tag",
        "write_to": "tiledb/plot/widget/version.py",
    },
    install_requires = [
        'ipywidgets>=7.0.0',
        "setuptools>=18.0",
        "setuptools_scm>=1.5.4",
    ],
    extras_require = {
        'test': [
            'pytest>=3.6',
            'pytest-cov',
            'nbval',
        ],
        'examples': [
            # Any requirements for the examples to run
        ],
        'docs': [
            'sphinx>=1.5',
            'recommonmark',
            'sphinx_rtd_theme',
            'nbsphinx>=0.2.13,<0.4.0',
            'jupyter_sphinx',
            'nbsphinx-link',
            'pytest_check_links',
            'pypandoc',
        ],
    },
    entry_points = {
    },
)

if __name__ == '__main__':
    setup(**setup_args)
