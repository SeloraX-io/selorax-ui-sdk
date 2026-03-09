'use strict';

/**
 * @selorax/ui — The selorax global object
 *
 * Manages postMessage communication with the host SeloraX dashboard.
 * Designed to run inside a sandboxed iframe. Zero dependencies.
 *
 * Protocol: Messages are flat objects { type: 'selorax:xxx', ...payload }.
 * Matches sandbox-protocol.js in the dashboard.
 */

var _requestId = 0;
var _pendingRequests = {};
var _contextListeners = [];
var _saveBarListeners = [];
var _titleBarListeners = [];
var _initialized = false;

function nextRequestId() {
  return '__slx_' + (++_requestId) + '_' + Date.now();
}

/**
 * Send a message to the host dashboard via postMessage.
 * Format: { type: 'selorax:xxx', key1: val1, key2: val2, ... }
 */
function postToHost(type, payload) {
  if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
    var msg = Object.assign({}, payload || {}, { type: type });
    window.parent.postMessage(msg, '*');
  }
}

/**
 * Send a message and return a Promise that resolves when the host responds.
 * The request_id ties the response back to this request.
 */
function createPromiseRequest(messageType, payload) {
  return new Promise(function (resolve, reject) {
    var id = nextRequestId();
    _pendingRequests[id] = { resolve: resolve, reject: reject };

    // Add timeout to prevent dangling promises
    var timer = setTimeout(function () {
      if (_pendingRequests[id]) {
        _pendingRequests[id].reject(new Error('Request timed out (' + messageType + ', id=' + id + ')'));
        delete _pendingRequests[id];
      }
    }, 30000);

    _pendingRequests[id].timer = timer;
    postToHost(messageType, Object.assign({}, payload, { request_id: id }));
  });
}

function cleanupRequest(id) {
  if (_pendingRequests[id]) {
    if (_pendingRequests[id].timer) clearTimeout(_pendingRequests[id].timer);
    delete _pendingRequests[id];
  }
}

// ---------------------------------------------------------------------------
// The selorax object
// ---------------------------------------------------------------------------

var selorax = {
  /** Read-only context from the host (store, user, page, etc.) */
  context: {},

  /** Merchant-configured settings for this extension */
  settings: {},

  /** Extension metadata (id, name, version, etc.) */
  extension: {},

  // -------------------------------------------------------------------------
  // Rendering
  // -------------------------------------------------------------------------

  /**
   * Send a UI tree to the host for rendering.
   * @param {object|object[]} ui — A UINode or array of UINodes
   */
  render: function render(ui) {
    postToHost('selorax:render', { ui: ui });
  },

  // -------------------------------------------------------------------------
  // Feedback
  // -------------------------------------------------------------------------

  /**
   * Show a toast notification in the host dashboard.
   * @param {string} message
   * @param {'success'|'error'|'warning'} [type='success']
   */
  toast: function toast(message, type) {
    postToHost('selorax:toast', { message: message, toast_type: type || 'success' });
  },

  // -------------------------------------------------------------------------
  // Modal
  // -------------------------------------------------------------------------

  modal: {
    /**
     * Open a modal in the host dashboard.
     * @param {{ title?: string, ui: object|object[] }} options
     */
    open: function open(options) {
      postToHost('selorax:modal_open', {
        title: options && options.title,
        ui: options && options.ui,
      });
    },

    /** Close the currently open modal. */
    close: function close() {
      postToHost('selorax:modal_close', {});
    },
  },

  // -------------------------------------------------------------------------
  // Navigation
  // -------------------------------------------------------------------------

  /**
   * Navigate within the dashboard (client-side route change).
   * @param {string} url — Dashboard-relative URL, e.g. '/orders'
   */
  navigate: function navigate(url) {
    postToHost('selorax:navigate', { url: url });
  },

  /**
   * Open an external link (new tab/window).
   * @param {string} url — Full URL
   */
  openLink: function openLink(url) {
    postToHost('selorax:open_link', { url: url });
  },

  // -------------------------------------------------------------------------
  // Resource Pickers
  // -------------------------------------------------------------------------

  picker: {
    /**
     * Open the product picker. Resolves with the selected product(s).
     * @param {{ multiple?: boolean }} [options]
     * @returns {Promise<object[]>}
     */
    product: function product(options) {
      return createPromiseRequest('selorax:picker_request', {
        resource_type: 'product',
        multiple: options && options.multiple,
      });
    },

    /**
     * Open the customer picker. Resolves with the selected customer(s).
     * @param {{ multiple?: boolean }} [options]
     * @returns {Promise<object[]>}
     */
    customer: function customer(options) {
      return createPromiseRequest('selorax:picker_request', {
        resource_type: 'customer',
        multiple: options && options.multiple,
      });
    },

    /**
     * Open the order picker. Resolves with the selected order(s).
     * @param {{ multiple?: boolean }} [options]
     * @returns {Promise<object[]>}
     */
    order: function order(options) {
      return createPromiseRequest('selorax:picker_request', {
        resource_type: 'order',
        multiple: options && options.multiple,
      });
    },
  },

  // -------------------------------------------------------------------------
  // API Access
  // -------------------------------------------------------------------------

  api: {
    /**
     * @param {string} url — API path (e.g. '/products')
     * @returns {Promise<any>}
     */
    get: function get(url) {
      return createPromiseRequest('selorax:api_request', { method: 'GET', url: url });
    },

    /**
     * @param {string} url
     * @param {any} [body]
     * @returns {Promise<any>}
     */
    post: function post(url, body) {
      return createPromiseRequest('selorax:api_request', { method: 'POST', url: url, body: body });
    },

    /**
     * @param {string} url
     * @param {any} [body]
     * @returns {Promise<any>}
     */
    put: function put(url, body) {
      return createPromiseRequest('selorax:api_request', { method: 'PUT', url: url, body: body });
    },

    /**
     * @param {string} url
     * @param {any} [body]
     * @returns {Promise<any>}
     */
    patch: function patch(url, body) {
      return createPromiseRequest('selorax:api_request', { method: 'PATCH', url: url, body: body });
    },

    /**
     * @param {string} url
     * @returns {Promise<any>}
     */
    delete: function del(url) {
      return createPromiseRequest('selorax:api_request', { method: 'DELETE', url: url });
    },
  },

  // -------------------------------------------------------------------------
  // App Bridge UI
  // -------------------------------------------------------------------------

  ui: {
    /**
     * Set the title bar for this extension.
     * @param {{ title: string, breadcrumbs?: Array<{label: string}>, primaryAction?: {label: string}, secondaryActions?: Array<{label: string}> }} config
     */
    titleBar: function titleBar(config) {
      postToHost('selorax:ui_titlebar', { config: config });
    },

    /**
     * Show the contextual save bar (unsaved changes indicator).
     * @param {{ message?: string, saveAction?: {label?: string, disabled?: boolean, loading?: boolean}, discardAction?: {label?: string} }} [config]
     */
    showSaveBar: function showSaveBar(config) {
      postToHost('selorax:ui_save_bar_show', { config: config || {} });
    },

    /** Hide the contextual save bar. */
    hideSaveBar: function hideSaveBar() {
      postToHost('selorax:ui_save_bar_hide', {});
    },

    /** Show the full-width loading bar. */
    startLoading: function startLoading() {
      postToHost('selorax:ui_loading_start', {});
    },

    /** Complete and hide the loading bar. */
    completeLoading: function completeLoading() {
      postToHost('selorax:ui_loading_complete', {});
    },
  },

  // -------------------------------------------------------------------------
  // i18n — Internationalization
  // -------------------------------------------------------------------------

  i18n: {
    /** Current locale from the host dashboard. */
    locale: 'en',

    /** Translation dictionary loaded from extension config. */
    _translations: {},

    /**
     * Set translations dictionary.
     * @param {object} translations — { locale: { key: 'translated value' } }
     */
    setTranslations: function setTranslations(translations) {
      selorax.i18n._translations = translations || {};
    },

    /**
     * Translate a key. Supports dot notation and interpolation.
     * @param {string} key — e.g. 'greeting' or 'order.status'
     * @param {object} [vars] — interpolation variables { name: 'World' }
     * @returns {string}
     */
    t: function t(key, vars) {
      var locale = selorax.i18n.locale || 'en';
      var dict = selorax.i18n._translations[locale] || selorax.i18n._translations['en'] || {};

      // Support dot notation
      var parts = key.split('.');
      var value = dict;
      for (var i = 0; i < parts.length; i++) {
        if (value && typeof value === 'object') {
          value = value[parts[i]];
        } else {
          value = undefined;
          break;
        }
      }

      if (typeof value !== 'string') return key;

      // Interpolation: replace {{varName}} with vars.varName
      if (vars && typeof vars === 'object') {
        return value.replace(/\{\{(\w+)\}\}/g, function (match, varName) {
          return vars[varName] !== undefined ? String(vars[varName]) : match;
        });
      }

      return value;
    },
  },

  // -------------------------------------------------------------------------
  // Metafields — Custom data on resources
  // -------------------------------------------------------------------------

  metafields: {
    /**
     * Get metafield values for a resource.
     * @param {string} resourceType — 'product', 'order', 'customer', 'store'
     * @param {string|number} resourceId
     * @returns {Promise<object[]>}
     */
    get: function get(resourceType, resourceId) {
      return createPromiseRequest('selorax:api_request', {
        method: 'GET',
        url: '/apps/v1/metafields/values?resource_type=' + resourceType + '&resource_id=' + resourceId,
      });
    },

    /**
     * Get a single metafield value.
     * @param {string} namespace
     * @param {string} key
     * @param {string} resourceType
     * @param {string|number} resourceId
     * @returns {Promise<object|null>}
     */
    getValue: function getValue(namespace, key, resourceType, resourceId) {
      return createPromiseRequest('selorax:api_request', {
        method: 'GET',
        url: '/apps/v1/metafields/values/' + namespace + '/' + key + '?resource_type=' + resourceType + '&resource_id=' + resourceId,
      });
    },

    /**
     * Set a metafield value.
     * @param {{ namespace: string, key: string, resource_type: string, resource_id: string|number, value: any }} data
     * @returns {Promise<object>}
     */
    set: function set(data) {
      return createPromiseRequest('selorax:api_request', {
        method: 'POST',
        url: '/apps/v1/metafields/values',
        body: data,
      });
    },

    /**
     * Set multiple metafield values at once.
     * @param {Array<{ namespace: string, key: string, resource_type: string, resource_id: string|number, value: any }>} metafields
     * @returns {Promise<object>}
     */
    setMany: function setMany(metafields) {
      return createPromiseRequest('selorax:api_request', {
        method: 'POST',
        url: '/apps/v1/metafields/values',
        body: { metafields: metafields },
      });
    },

    /**
     * Delete a metafield value.
     * @param {string} namespace
     * @param {string} key
     * @param {string} resourceType
     * @param {string|number} resourceId
     * @returns {Promise<void>}
     */
    remove: function remove(namespace, key, resourceType, resourceId) {
      return createPromiseRequest('selorax:api_request', {
        method: 'DELETE',
        url: '/apps/v1/metafields/values/' + namespace + '/' + key + '?resource_type=' + resourceType + '&resource_id=' + resourceId,
      });
    },
  },

  // -------------------------------------------------------------------------
  // Billing — App charges and subscriptions
  // -------------------------------------------------------------------------

  billing: {
    /**
     * Create a one-time charge.
     * @param {{ name: string, amount: number, currency?: string, return_url?: string }} data
     * @returns {Promise<object>}
     */
    createCharge: function createCharge(data) {
      return createPromiseRequest('selorax:api_request', {
        method: 'POST',
        url: '/apps/v1/billing/charges',
        body: data,
      });
    },

    /**
     * Create a recurring subscription.
     * @param {{ name: string, amount: number, interval?: string, trial_days?: number, return_url?: string }} data
     * @returns {Promise<object>}
     */
    createSubscription: function createSubscription(data) {
      return createPromiseRequest('selorax:api_request', {
        method: 'POST',
        url: '/apps/v1/billing/subscriptions',
        body: data,
      });
    },

    /**
     * Get active charges/subscriptions.
     * @returns {Promise<object[]>}
     */
    getActive: function getActive() {
      return createPromiseRequest('selorax:api_request', {
        method: 'GET',
        url: '/apps/v1/billing/active',
      });
    },

    /**
     * Get a charge by ID.
     * @param {string|number} chargeId
     * @returns {Promise<object>}
     */
    getCharge: function getCharge(chargeId) {
      return createPromiseRequest('selorax:api_request', {
        method: 'GET',
        url: '/apps/v1/billing/charges/' + chargeId,
      });
    },

    /**
     * Create a usage charge (metered billing).
     * @param {{ description: string, amount: number, subscription_charge_id?: number }} data
     * @returns {Promise<object>}
     */
    createUsageCharge: function createUsageCharge(data) {
      return createPromiseRequest('selorax:api_request', {
        method: 'POST',
        url: '/apps/v1/billing/usage-charges',
        body: data,
      });
    },

    /**
     * Get wallet balance.
     * @returns {Promise<object>}
     */
    getWalletBalance: function getWalletBalance() {
      return createPromiseRequest('selorax:api_request', {
        method: 'GET',
        url: '/apps/v1/billing/wallet',
      });
    },

    /**
     * Debit from wallet.
     * @param {{ amount: number, description: string, reference?: string }} data
     * @returns {Promise<object>}
     */
    debitWallet: function debitWallet(data) {
      return createPromiseRequest('selorax:api_request', {
        method: 'POST',
        url: '/apps/v1/billing/wallet/debit',
        body: data,
      });
    },
  },

  // -------------------------------------------------------------------------
  // Webhooks — Event subscriptions
  // -------------------------------------------------------------------------

  webhooks: {
    /**
     * List webhook subscriptions for this app.
     * @returns {Promise<object[]>}
     */
    list: function list() {
      return createPromiseRequest('selorax:api_request', {
        method: 'GET',
        url: '/apps/v1/webhooks/subscriptions',
      });
    },

    /**
     * Create a webhook subscription.
     * @param {{ topic: string, url: string, format?: string }} data
     * @returns {Promise<object>}
     */
    subscribe: function subscribe(data) {
      return createPromiseRequest('selorax:api_request', {
        method: 'POST',
        url: '/apps/v1/webhooks/subscriptions',
        body: data,
      });
    },

    /**
     * Delete a webhook subscription.
     * @param {string|number} subscriptionId
     * @returns {Promise<void>}
     */
    unsubscribe: function unsubscribe(subscriptionId) {
      return createPromiseRequest('selorax:api_request', {
        method: 'DELETE',
        url: '/apps/v1/webhooks/subscriptions/' + subscriptionId,
      });
    },
  },

  // -------------------------------------------------------------------------
  // Lifecycle
  // -------------------------------------------------------------------------

  /** Signal to the host that the extension is ready. */
  ready: function ready() {
    postToHost('selorax:ready', {});
  },

  /** Request the host to close/unmount this extension. */
  close: function close() {
    postToHost('selorax:close', {});
  },

  /**
   * Dispatch an action to the host dashboard.
   * @param {string} actionType — The action type (e.g. 'navigate', 'open_modal')
   * @param {object} [payload] — Additional action payload
   */
  dispatchAction: function dispatchAction(actionType, payload) {
    postToHost('selorax:action', Object.assign({ action: actionType }, payload || {}));
  },

  // -------------------------------------------------------------------------
  // Event Listeners
  // -------------------------------------------------------------------------

  /**
   * Register a callback for context updates from the host.
   * @param {function} callback — receives the updated context object
   * @returns {function} unsubscribe function
   */
  onContextUpdate: function onContextUpdate(callback) {
    if (typeof callback !== 'function') {
      throw new Error('selorax.onContextUpdate: callback must be a function');
    }
    _contextListeners.push(callback);
    return function unsubscribe() {
      var idx = _contextListeners.indexOf(callback);
      if (idx !== -1) {
        _contextListeners.splice(idx, 1);
      }
    };
  },

  /**
   * Register a callback for save bar actions (save/discard).
   * @param {function} callback — receives { action: 'save' | 'discard' }
   * @returns {function} unsubscribe function
   */
  onSaveBar: function onSaveBar(callback) {
    if (typeof callback !== 'function') {
      throw new Error('selorax.onSaveBar: callback must be a function');
    }
    _saveBarListeners.push(callback);
    return function unsubscribe() {
      var idx = _saveBarListeners.indexOf(callback);
      if (idx !== -1) _saveBarListeners.splice(idx, 1);
    };
  },

  /**
   * Register a callback for title bar action clicks.
   * @param {function} callback — receives { action_type: 'primary' | 'secondary', index?: number }
   * @returns {function} unsubscribe function
   */
  onTitleBarAction: function onTitleBarAction(callback) {
    if (typeof callback !== 'function') {
      throw new Error('selorax.onTitleBarAction: callback must be a function');
    }
    _titleBarListeners.push(callback);
    return function unsubscribe() {
      var idx = _titleBarListeners.indexOf(callback);
      if (idx !== -1) _titleBarListeners.splice(idx, 1);
    };
  },
};

// ---------------------------------------------------------------------------
// Message Listener — handles incoming messages from the host
// ---------------------------------------------------------------------------

function handleHostMessage(event) {
  var data = event.data;
  if (!data || typeof data.type !== 'string' || !data.type.startsWith('selorax:')) return;

  switch (data.type) {
    case 'selorax:init':
      selorax.context = data.context || {};
      selorax.settings = data.settings || {};
      selorax.extension = data.extension || {};
      if (data.context && data.context.locale) {
        selorax.i18n.locale = data.context.locale;
      }
      _initialized = true;
      break;

    case 'selorax:context_update':
      selorax.context = data.context || selorax.context;
      for (var i = 0; i < _contextListeners.length; i++) {
        try {
          _contextListeners[i](selorax.context);
        } catch (e) {
          if (typeof console !== 'undefined' && console.error) {
            console.error('[selorax] onContextUpdate listener error:', e);
          }
        }
      }
      break;

    case 'selorax:api_response': {
      var apiReqId = data.request_id;
      if (apiReqId && _pendingRequests[apiReqId]) {
        if (data.success === false) {
          _pendingRequests[apiReqId].reject(
            new Error(data.error || 'API request failed')
          );
        } else {
          _pendingRequests[apiReqId].resolve(data.data);
        }
        cleanupRequest(apiReqId);
      }
      break;
    }

    case 'selorax:picker_result': {
      var pickerReqId = data.request_id;
      if (pickerReqId && _pendingRequests[pickerReqId]) {
        var selection = data.selection;
        // Empty array means cancelled/closed without selection
        _pendingRequests[pickerReqId].resolve(
          Array.isArray(selection) && selection.length > 0 ? selection : null
        );
        cleanupRequest(pickerReqId);
      }
      break;
    }

    case 'selorax:ui_save_bar_action': {
      var action = data.action;
      for (var s = 0; s < _saveBarListeners.length; s++) {
        try { _saveBarListeners[s]({ action: action }); } catch (e) {}
      }
      break;
    }

    case 'selorax:ui_titlebar_action': {
      for (var t = 0; t < _titleBarListeners.length; t++) {
        try { _titleBarListeners[t]({ action_type: data.action_type, index: data.index }); } catch (e) {}
      }
      break;
    }
  }
}

// Auto-setup when loaded in a browser environment
if (typeof window !== 'undefined') {
  window.addEventListener('message', handleHostMessage);
  window.selorax = selorax;
}

module.exports = selorax;
