# TileDB Jupyterlab Plot Widget

Custom Jupyterlab widget for TileDB

## Installation

You can install using `pip`:

```bash
pip install tiledb-plot-widget
```

Or if you use jupyterlab:

```bash
pip install tiledb-plot-widget
jupyter nbextension install --py tiledb.plot.widget --user
jupyter nbextension enable tiledb.plot.widget --user --py
```

If you are using Jupyter Notebook 5.2 or earlier, you may also need to enable
the nbextension:
```bash
jupyter nbextension enable --py [--sys-prefix|--user|--system] tiledb-plot-widget
```
