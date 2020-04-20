#!/usr/bin/env python
# coding: utf-8

# Copyright (c) TileDB, Inc.
# Distributed under the terms of the MIT License.


def _jupyter_nbextension_paths():
    return [
        {
            "section": "notebook",
            "src": "nbextension/static",
            "dest": "tiledb-plot-widget",
            "require": "tiledb-plot-widget/extension",
        }
    ]
