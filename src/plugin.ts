// Copyright (c) Konstantinos Sarantopoulos
// Distributed under the terms of the Modified BSD License.
import {
  IJupyterWidgetRegistry
 } from '@jupyter-widgets/base';

import * as widgetExports from './widget';

import {
  MODULE_NAME, MODULE_VERSION
} from './version';

const EXTENSION_ID = 'tiledb-plot-widget:plugin';

/**
 * The example plugin.
 */
const examplePlugin = {
  id: EXTENSION_ID,
  requires: [IJupyterWidgetRegistry],
  activate: activateWidgetExtension,
  autoStart: true
};

export default examplePlugin;


/**
 * Activate the widget extension.
 */
function activateWidgetExtension(__: any, registry: IJupyterWidgetRegistry): void {
  registry.registerWidget({
    name: MODULE_NAME,
    version: MODULE_VERSION,
    exports: widgetExports,
  });
}
