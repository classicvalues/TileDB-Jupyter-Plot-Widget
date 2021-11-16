#!/usr/bin/env python
# coding: utf-8

# Copyright (c) TileDB.
# Distributed under the terms of the MIT License.
from pathlib import Path
from ipywidgets import DOMWidget
import json
from traitlets import Unicode

# from ._frontend import module_name, module_version


HERE = Path(__file__).parent.resolve()

with (HERE / "labextension" / "package.json").open() as fid:
    data = json.load(fid)


class Visualize(DOMWidget):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.value = kwargs["data"]

    _value = ""
    _model_name = Unicode("DagVisualizeModel").tag(sync=True)
    _model_module = Unicode(data["name"]).tag(sync=True)
    _model_module_version = Unicode(data["version"]).tag(sync=True)
    _view_name = Unicode("DagVisualizeView").tag(sync=True)
    _view_module = Unicode(data["name"]).tag(sync=True)
    _view_module_version = Unicode(data["version"]).tag(sync=True)
    value = Unicode(_value).tag(sync=True)

    def setData(self, data):
        self.value = data
        return self
