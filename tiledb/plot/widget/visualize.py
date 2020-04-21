#!/usr/bin/env python
# coding: utf-8

# Copyright (c) kostas.
# Distributed under the terms of the Modified BSD License.

from ipywidgets import DOMWidget
from traitlets import Unicode
from ._frontend import module_name, module_version


class Visualize(DOMWidget):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.value = kwargs["data"]

    _value = ""
    _model_name = Unicode("DagVisualizeModel").tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode("DagVisualizeView").tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)
    value = Unicode(_value).tag(sync=True)

    def setData(self, data):
        self.value = data
        return self
