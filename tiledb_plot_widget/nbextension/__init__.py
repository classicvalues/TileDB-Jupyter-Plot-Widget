#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Konstantinos Sarantopoulos
# Distributed under the terms of the Modified BSD License.

def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'nbextension/static',
        'dest': 'tiledb_plot_widget',
        'require': 'tiledb_plot_widget/extension'
    }]
