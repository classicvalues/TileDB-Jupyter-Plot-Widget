
# tiledb_plot_widget

[![Build Status](https://travis-ci.org/@tiledb/tiledb_plot_widget.svg?branch=master)](https://travis-ci.org/@tiledb/tiledb_plot_widget)
[![codecov](https://codecov.io/gh/@tiledb/tiledb_plot_widget/branch/master/graph/badge.svg)](https://codecov.io/gh/@tiledb/tiledb_plot_widget)


Custom Jupyterlab widget for TileDB

## Installation

You can install using `pip`:

```bash
pip install tiledb_plot_widget
```

Or if you use jupyterlab:

```bash
pip install tiledb_plot_widget
jupyter labextension install @jupyter-widgets/jupyterlab-manager
```

If you are using Jupyter Notebook 5.2 or earlier, you may also need to enable
the nbextension:
```bash
jupyter nbextension enable --py [--sys-prefix|--user|--system] tiledb_plot_widget
```
