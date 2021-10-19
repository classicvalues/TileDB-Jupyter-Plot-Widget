import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';
export * from './version';
import * as widgetExports from './widget';
import { MODULE_NAME, MODULE_VERSION } from './version';

/**
 * Initialization data for the @tiledb-inc/tiledb-plot-widget extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: '@tiledb-inc/tiledb-plot-widget:plugin',
  requires: [IJupyterWidgetRegistry],
  autoStart: true,
  activate: (app: JupyterFrontEnd, registry: IJupyterWidgetRegistry) => {
    registry.registerWidget({
      name: MODULE_NAME,
      version: MODULE_VERSION,
      exports: widgetExports
    });
  }
};

export default plugin;
