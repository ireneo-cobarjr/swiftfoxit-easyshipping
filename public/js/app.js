/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach([
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
    'socketPath'
  ], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/countries-list/dist/index.es5.min.js":
/*!***********************************************************!*\
  !*** ./node_modules/countries-list/dist/index.es5.min.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*! countries-list v2.4.3 by Annexare | MIT */
!function(n,a){ true?module.exports=a():undefined}(this,function(){return e={},n.m=a=[function(n,a){(function(a){n.exports=a}).call(this,{})},function(n,a,e){"use strict";var i=e(2),t=e(3),o=e(4),r=e(5),c=e(6).ucs2,m=127462-"A".charCodeAt(0),l=/^[A-Z]{2}$/;n.exports={continents:i,countries:t,languages:o,languagesAll:r,getEmojiFlag:function(n){return l.test(n)?c.encode(n.split("").map(function(n){return m+n.charCodeAt(0)})):""},getUnicode:function(n){return c.decode(n).map(function(n){return"U+"+Number(n).toString(16).toUpperCase()}).join(" ")}}},function(n){n.exports=JSON.parse('{"AF":"Africa","AN":"Antarctica","AS":"Asia","EU":"Europe","NA":"North America","OC":"Oceania","SA":"South America"}')},function(n){n.exports=JSON.parse('{"AD":{"name":"Andorra","native":"Andorra","phone":"376","continent":"EU","capital":"Andorra la Vella","currency":"EUR","languages":["ca"],"emoji":"🇦🇩","emojiU":"U+1F1E6 U+1F1E9"},"AE":{"name":"United Arab Emirates","native":"دولة الإمارات العربية المتحدة","phone":"971","continent":"AS","capital":"Abu Dhabi","currency":"AED","languages":["ar"],"emoji":"🇦🇪","emojiU":"U+1F1E6 U+1F1EA"},"AF":{"name":"Afghanistan","native":"افغانستان","phone":"93","continent":"AS","capital":"Kabul","currency":"AFN","languages":["ps","uz","tk"],"emoji":"🇦🇫","emojiU":"U+1F1E6 U+1F1EB"},"AG":{"name":"Antigua and Barbuda","native":"Antigua and Barbuda","phone":"1268","continent":"NA","capital":"Saint John\'s","currency":"XCD","languages":["en"],"emoji":"🇦🇬","emojiU":"U+1F1E6 U+1F1EC"},"AI":{"name":"Anguilla","native":"Anguilla","phone":"1264","continent":"NA","capital":"The Valley","currency":"XCD","languages":["en"],"emoji":"🇦🇮","emojiU":"U+1F1E6 U+1F1EE"},"AL":{"name":"Albania","native":"Shqipëria","phone":"355","continent":"EU","capital":"Tirana","currency":"ALL","languages":["sq"],"emoji":"🇦🇱","emojiU":"U+1F1E6 U+1F1F1"},"AM":{"name":"Armenia","native":"Հայաստան","phone":"374","continent":"AS","capital":"Yerevan","currency":"AMD","languages":["hy","ru"],"emoji":"🇦🇲","emojiU":"U+1F1E6 U+1F1F2"},"AO":{"name":"Angola","native":"Angola","phone":"244","continent":"AF","capital":"Luanda","currency":"AOA","languages":["pt"],"emoji":"🇦🇴","emojiU":"U+1F1E6 U+1F1F4"},"AQ":{"name":"Antarctica","native":"Antarctica","phone":"672","continent":"AN","capital":"","currency":"","languages":[],"emoji":"🇦🇶","emojiU":"U+1F1E6 U+1F1F6"},"AR":{"name":"Argentina","native":"Argentina","phone":"54","continent":"SA","capital":"Buenos Aires","currency":"ARS","languages":["es","gn"],"emoji":"🇦🇷","emojiU":"U+1F1E6 U+1F1F7"},"AS":{"name":"American Samoa","native":"American Samoa","phone":"1684","continent":"OC","capital":"Pago Pago","currency":"USD","languages":["en","sm"],"emoji":"🇦🇸","emojiU":"U+1F1E6 U+1F1F8"},"AT":{"name":"Austria","native":"Österreich","phone":"43","continent":"EU","capital":"Vienna","currency":"EUR","languages":["de"],"emoji":"🇦🇹","emojiU":"U+1F1E6 U+1F1F9"},"AU":{"name":"Australia","native":"Australia","phone":"61","continent":"OC","capital":"Canberra","currency":"AUD","languages":["en"],"emoji":"🇦🇺","emojiU":"U+1F1E6 U+1F1FA"},"AW":{"name":"Aruba","native":"Aruba","phone":"297","continent":"NA","capital":"Oranjestad","currency":"AWG","languages":["nl","pa"],"emoji":"🇦🇼","emojiU":"U+1F1E6 U+1F1FC"},"AX":{"name":"Åland","native":"Åland","phone":"358","continent":"EU","capital":"Mariehamn","currency":"EUR","languages":["sv"],"emoji":"🇦🇽","emojiU":"U+1F1E6 U+1F1FD"},"AZ":{"name":"Azerbaijan","native":"Azərbaycan","phone":"994","continent":"AS","capital":"Baku","currency":"AZN","languages":["az"],"emoji":"🇦🇿","emojiU":"U+1F1E6 U+1F1FF"},"BA":{"name":"Bosnia and Herzegovina","native":"Bosna i Hercegovina","phone":"387","continent":"EU","capital":"Sarajevo","currency":"BAM","languages":["bs","hr","sr"],"emoji":"🇧🇦","emojiU":"U+1F1E7 U+1F1E6"},"BB":{"name":"Barbados","native":"Barbados","phone":"1246","continent":"NA","capital":"Bridgetown","currency":"BBD","languages":["en"],"emoji":"🇧🇧","emojiU":"U+1F1E7 U+1F1E7"},"BD":{"name":"Bangladesh","native":"Bangladesh","phone":"880","continent":"AS","capital":"Dhaka","currency":"BDT","languages":["bn"],"emoji":"🇧🇩","emojiU":"U+1F1E7 U+1F1E9"},"BE":{"name":"Belgium","native":"België","phone":"32","continent":"EU","capital":"Brussels","currency":"EUR","languages":["nl","fr","de"],"emoji":"🇧🇪","emojiU":"U+1F1E7 U+1F1EA"},"BF":{"name":"Burkina Faso","native":"Burkina Faso","phone":"226","continent":"AF","capital":"Ouagadougou","currency":"XOF","languages":["fr","ff"],"emoji":"🇧🇫","emojiU":"U+1F1E7 U+1F1EB"},"BG":{"name":"Bulgaria","native":"България","phone":"359","continent":"EU","capital":"Sofia","currency":"BGN","languages":["bg"],"emoji":"🇧🇬","emojiU":"U+1F1E7 U+1F1EC"},"BH":{"name":"Bahrain","native":"‏البحرين","phone":"973","continent":"AS","capital":"Manama","currency":"BHD","languages":["ar"],"emoji":"🇧🇭","emojiU":"U+1F1E7 U+1F1ED"},"BI":{"name":"Burundi","native":"Burundi","phone":"257","continent":"AF","capital":"Bujumbura","currency":"BIF","languages":["fr","rn"],"emoji":"🇧🇮","emojiU":"U+1F1E7 U+1F1EE"},"BJ":{"name":"Benin","native":"Bénin","phone":"229","continent":"AF","capital":"Porto-Novo","currency":"XOF","languages":["fr"],"emoji":"🇧🇯","emojiU":"U+1F1E7 U+1F1EF"},"BL":{"name":"Saint Barthélemy","native":"Saint-Barthélemy","phone":"590","continent":"NA","capital":"Gustavia","currency":"EUR","languages":["fr"],"emoji":"🇧🇱","emojiU":"U+1F1E7 U+1F1F1"},"BM":{"name":"Bermuda","native":"Bermuda","phone":"1441","continent":"NA","capital":"Hamilton","currency":"BMD","languages":["en"],"emoji":"🇧🇲","emojiU":"U+1F1E7 U+1F1F2"},"BN":{"name":"Brunei","native":"Negara Brunei Darussalam","phone":"673","continent":"AS","capital":"Bandar Seri Begawan","currency":"BND","languages":["ms"],"emoji":"🇧🇳","emojiU":"U+1F1E7 U+1F1F3"},"BO":{"name":"Bolivia","native":"Bolivia","phone":"591","continent":"SA","capital":"Sucre","currency":"BOB,BOV","languages":["es","ay","qu"],"emoji":"🇧🇴","emojiU":"U+1F1E7 U+1F1F4"},"BQ":{"name":"Bonaire","native":"Bonaire","phone":"5997","continent":"NA","capital":"Kralendijk","currency":"USD","languages":["nl"],"emoji":"🇧🇶","emojiU":"U+1F1E7 U+1F1F6"},"BR":{"name":"Brazil","native":"Brasil","phone":"55","continent":"SA","capital":"Brasília","currency":"BRL","languages":["pt"],"emoji":"🇧🇷","emojiU":"U+1F1E7 U+1F1F7"},"BS":{"name":"Bahamas","native":"Bahamas","phone":"1242","continent":"NA","capital":"Nassau","currency":"BSD","languages":["en"],"emoji":"🇧🇸","emojiU":"U+1F1E7 U+1F1F8"},"BT":{"name":"Bhutan","native":"ʼbrug-yul","phone":"975","continent":"AS","capital":"Thimphu","currency":"BTN,INR","languages":["dz"],"emoji":"🇧🇹","emojiU":"U+1F1E7 U+1F1F9"},"BV":{"name":"Bouvet Island","native":"Bouvetøya","phone":"47","continent":"AN","capital":"","currency":"NOK","languages":["no","nb","nn"],"emoji":"🇧🇻","emojiU":"U+1F1E7 U+1F1FB"},"BW":{"name":"Botswana","native":"Botswana","phone":"267","continent":"AF","capital":"Gaborone","currency":"BWP","languages":["en","tn"],"emoji":"🇧🇼","emojiU":"U+1F1E7 U+1F1FC"},"BY":{"name":"Belarus","native":"Белару́сь","phone":"375","continent":"EU","capital":"Minsk","currency":"BYR","languages":["be","ru"],"emoji":"🇧🇾","emojiU":"U+1F1E7 U+1F1FE"},"BZ":{"name":"Belize","native":"Belize","phone":"501","continent":"NA","capital":"Belmopan","currency":"BZD","languages":["en","es"],"emoji":"🇧🇿","emojiU":"U+1F1E7 U+1F1FF"},"CA":{"name":"Canada","native":"Canada","phone":"1","continent":"NA","capital":"Ottawa","currency":"CAD","languages":["en","fr"],"emoji":"🇨🇦","emojiU":"U+1F1E8 U+1F1E6"},"CC":{"name":"Cocos [Keeling] Islands","native":"Cocos (Keeling) Islands","phone":"61","continent":"AS","capital":"West Island","currency":"AUD","languages":["en"],"emoji":"🇨🇨","emojiU":"U+1F1E8 U+1F1E8"},"CD":{"name":"Democratic Republic of the Congo","native":"République démocratique du Congo","phone":"243","continent":"AF","capital":"Kinshasa","currency":"CDF","languages":["fr","ln","kg","sw","lu"],"emoji":"🇨🇩","emojiU":"U+1F1E8 U+1F1E9"},"CF":{"name":"Central African Republic","native":"Ködörösêse tî Bêafrîka","phone":"236","continent":"AF","capital":"Bangui","currency":"XAF","languages":["fr","sg"],"emoji":"🇨🇫","emojiU":"U+1F1E8 U+1F1EB"},"CG":{"name":"Republic of the Congo","native":"République du Congo","phone":"242","continent":"AF","capital":"Brazzaville","currency":"XAF","languages":["fr","ln"],"emoji":"🇨🇬","emojiU":"U+1F1E8 U+1F1EC"},"CH":{"name":"Switzerland","native":"Schweiz","phone":"41","continent":"EU","capital":"Bern","currency":"CHE,CHF,CHW","languages":["de","fr","it"],"emoji":"🇨🇭","emojiU":"U+1F1E8 U+1F1ED"},"CI":{"name":"Ivory Coast","native":"Côte d\'Ivoire","phone":"225","continent":"AF","capital":"Yamoussoukro","currency":"XOF","languages":["fr"],"emoji":"🇨🇮","emojiU":"U+1F1E8 U+1F1EE"},"CK":{"name":"Cook Islands","native":"Cook Islands","phone":"682","continent":"OC","capital":"Avarua","currency":"NZD","languages":["en"],"emoji":"🇨🇰","emojiU":"U+1F1E8 U+1F1F0"},"CL":{"name":"Chile","native":"Chile","phone":"56","continent":"SA","capital":"Santiago","currency":"CLF,CLP","languages":["es"],"emoji":"🇨🇱","emojiU":"U+1F1E8 U+1F1F1"},"CM":{"name":"Cameroon","native":"Cameroon","phone":"237","continent":"AF","capital":"Yaoundé","currency":"XAF","languages":["en","fr"],"emoji":"🇨🇲","emojiU":"U+1F1E8 U+1F1F2"},"CN":{"name":"China","native":"中国","phone":"86","continent":"AS","capital":"Beijing","currency":"CNY","languages":["zh"],"emoji":"🇨🇳","emojiU":"U+1F1E8 U+1F1F3"},"CO":{"name":"Colombia","native":"Colombia","phone":"57","continent":"SA","capital":"Bogotá","currency":"COP","languages":["es"],"emoji":"🇨🇴","emojiU":"U+1F1E8 U+1F1F4"},"CR":{"name":"Costa Rica","native":"Costa Rica","phone":"506","continent":"NA","capital":"San José","currency":"CRC","languages":["es"],"emoji":"🇨🇷","emojiU":"U+1F1E8 U+1F1F7"},"CU":{"name":"Cuba","native":"Cuba","phone":"53","continent":"NA","capital":"Havana","currency":"CUC,CUP","languages":["es"],"emoji":"🇨🇺","emojiU":"U+1F1E8 U+1F1FA"},"CV":{"name":"Cape Verde","native":"Cabo Verde","phone":"238","continent":"AF","capital":"Praia","currency":"CVE","languages":["pt"],"emoji":"🇨🇻","emojiU":"U+1F1E8 U+1F1FB"},"CW":{"name":"Curacao","native":"Curaçao","phone":"5999","continent":"NA","capital":"Willemstad","currency":"ANG","languages":["nl","pa","en"],"emoji":"🇨🇼","emojiU":"U+1F1E8 U+1F1FC"},"CX":{"name":"Christmas Island","native":"Christmas Island","phone":"61","continent":"AS","capital":"Flying Fish Cove","currency":"AUD","languages":["en"],"emoji":"🇨🇽","emojiU":"U+1F1E8 U+1F1FD"},"CY":{"name":"Cyprus","native":"Κύπρος","phone":"357","continent":"EU","capital":"Nicosia","currency":"EUR","languages":["el","tr","hy"],"emoji":"🇨🇾","emojiU":"U+1F1E8 U+1F1FE"},"CZ":{"name":"Czech Republic","native":"Česká republika","phone":"420","continent":"EU","capital":"Prague","currency":"CZK","languages":["cs","sk"],"emoji":"🇨🇿","emojiU":"U+1F1E8 U+1F1FF"},"DE":{"name":"Germany","native":"Deutschland","phone":"49","continent":"EU","capital":"Berlin","currency":"EUR","languages":["de"],"emoji":"🇩🇪","emojiU":"U+1F1E9 U+1F1EA"},"DJ":{"name":"Djibouti","native":"Djibouti","phone":"253","continent":"AF","capital":"Djibouti","currency":"DJF","languages":["fr","ar"],"emoji":"🇩🇯","emojiU":"U+1F1E9 U+1F1EF"},"DK":{"name":"Denmark","native":"Danmark","phone":"45","continent":"EU","capital":"Copenhagen","currency":"DKK","languages":["da"],"emoji":"🇩🇰","emojiU":"U+1F1E9 U+1F1F0"},"DM":{"name":"Dominica","native":"Dominica","phone":"1767","continent":"NA","capital":"Roseau","currency":"XCD","languages":["en"],"emoji":"🇩🇲","emojiU":"U+1F1E9 U+1F1F2"},"DO":{"name":"Dominican Republic","native":"República Dominicana","phone":"1809,1829,1849","continent":"NA","capital":"Santo Domingo","currency":"DOP","languages":["es"],"emoji":"🇩🇴","emojiU":"U+1F1E9 U+1F1F4"},"DZ":{"name":"Algeria","native":"الجزائر","phone":"213","continent":"AF","capital":"Algiers","currency":"DZD","languages":["ar"],"emoji":"🇩🇿","emojiU":"U+1F1E9 U+1F1FF"},"EC":{"name":"Ecuador","native":"Ecuador","phone":"593","continent":"SA","capital":"Quito","currency":"USD","languages":["es"],"emoji":"🇪🇨","emojiU":"U+1F1EA U+1F1E8"},"EE":{"name":"Estonia","native":"Eesti","phone":"372","continent":"EU","capital":"Tallinn","currency":"EUR","languages":["et"],"emoji":"🇪🇪","emojiU":"U+1F1EA U+1F1EA"},"EG":{"name":"Egypt","native":"مصر‎","phone":"20","continent":"AF","capital":"Cairo","currency":"EGP","languages":["ar"],"emoji":"🇪🇬","emojiU":"U+1F1EA U+1F1EC"},"EH":{"name":"Western Sahara","native":"الصحراء الغربية","phone":"212","continent":"AF","capital":"El Aaiún","currency":"MAD,DZD,MRU","languages":["es"],"emoji":"🇪🇭","emojiU":"U+1F1EA U+1F1ED"},"ER":{"name":"Eritrea","native":"ኤርትራ","phone":"291","continent":"AF","capital":"Asmara","currency":"ERN","languages":["ti","ar","en"],"emoji":"🇪🇷","emojiU":"U+1F1EA U+1F1F7"},"ES":{"name":"Spain","native":"España","phone":"34","continent":"EU","capital":"Madrid","currency":"EUR","languages":["es","eu","ca","gl","oc"],"emoji":"🇪🇸","emojiU":"U+1F1EA U+1F1F8"},"ET":{"name":"Ethiopia","native":"ኢትዮጵያ","phone":"251","continent":"AF","capital":"Addis Ababa","currency":"ETB","languages":["am"],"emoji":"🇪🇹","emojiU":"U+1F1EA U+1F1F9"},"FI":{"name":"Finland","native":"Suomi","phone":"358","continent":"EU","capital":"Helsinki","currency":"EUR","languages":["fi","sv"],"emoji":"🇫🇮","emojiU":"U+1F1EB U+1F1EE"},"FJ":{"name":"Fiji","native":"Fiji","phone":"679","continent":"OC","capital":"Suva","currency":"FJD","languages":["en","fj","hi","ur"],"emoji":"🇫🇯","emojiU":"U+1F1EB U+1F1EF"},"FK":{"name":"Falkland Islands","native":"Falkland Islands","phone":"500","continent":"SA","capital":"Stanley","currency":"FKP","languages":["en"],"emoji":"🇫🇰","emojiU":"U+1F1EB U+1F1F0"},"FM":{"name":"Micronesia","native":"Micronesia","phone":"691","continent":"OC","capital":"Palikir","currency":"USD","languages":["en"],"emoji":"🇫🇲","emojiU":"U+1F1EB U+1F1F2"},"FO":{"name":"Faroe Islands","native":"Føroyar","phone":"298","continent":"EU","capital":"Tórshavn","currency":"DKK","languages":["fo"],"emoji":"🇫🇴","emojiU":"U+1F1EB U+1F1F4"},"FR":{"name":"France","native":"France","phone":"33","continent":"EU","capital":"Paris","currency":"EUR","languages":["fr"],"emoji":"🇫🇷","emojiU":"U+1F1EB U+1F1F7"},"GA":{"name":"Gabon","native":"Gabon","phone":"241","continent":"AF","capital":"Libreville","currency":"XAF","languages":["fr"],"emoji":"🇬🇦","emojiU":"U+1F1EC U+1F1E6"},"GB":{"name":"United Kingdom","native":"United Kingdom","phone":"44","continent":"EU","capital":"London","currency":"GBP","languages":["en"],"emoji":"🇬🇧","emojiU":"U+1F1EC U+1F1E7"},"GD":{"name":"Grenada","native":"Grenada","phone":"1473","continent":"NA","capital":"St. George\'s","currency":"XCD","languages":["en"],"emoji":"🇬🇩","emojiU":"U+1F1EC U+1F1E9"},"GE":{"name":"Georgia","native":"საქართველო","phone":"995","continent":"AS","capital":"Tbilisi","currency":"GEL","languages":["ka"],"emoji":"🇬🇪","emojiU":"U+1F1EC U+1F1EA"},"GF":{"name":"French Guiana","native":"Guyane française","phone":"594","continent":"SA","capital":"Cayenne","currency":"EUR","languages":["fr"],"emoji":"🇬🇫","emojiU":"U+1F1EC U+1F1EB"},"GG":{"name":"Guernsey","native":"Guernsey","phone":"44","continent":"EU","capital":"St. Peter Port","currency":"GBP","languages":["en","fr"],"emoji":"🇬🇬","emojiU":"U+1F1EC U+1F1EC"},"GH":{"name":"Ghana","native":"Ghana","phone":"233","continent":"AF","capital":"Accra","currency":"GHS","languages":["en"],"emoji":"🇬🇭","emojiU":"U+1F1EC U+1F1ED"},"GI":{"name":"Gibraltar","native":"Gibraltar","phone":"350","continent":"EU","capital":"Gibraltar","currency":"GIP","languages":["en"],"emoji":"🇬🇮","emojiU":"U+1F1EC U+1F1EE"},"GL":{"name":"Greenland","native":"Kalaallit Nunaat","phone":"299","continent":"NA","capital":"Nuuk","currency":"DKK","languages":["kl"],"emoji":"🇬🇱","emojiU":"U+1F1EC U+1F1F1"},"GM":{"name":"Gambia","native":"Gambia","phone":"220","continent":"AF","capital":"Banjul","currency":"GMD","languages":["en"],"emoji":"🇬🇲","emojiU":"U+1F1EC U+1F1F2"},"GN":{"name":"Guinea","native":"Guinée","phone":"224","continent":"AF","capital":"Conakry","currency":"GNF","languages":["fr","ff"],"emoji":"🇬🇳","emojiU":"U+1F1EC U+1F1F3"},"GP":{"name":"Guadeloupe","native":"Guadeloupe","phone":"590","continent":"NA","capital":"Basse-Terre","currency":"EUR","languages":["fr"],"emoji":"🇬🇵","emojiU":"U+1F1EC U+1F1F5"},"GQ":{"name":"Equatorial Guinea","native":"Guinea Ecuatorial","phone":"240","continent":"AF","capital":"Malabo","currency":"XAF","languages":["es","fr"],"emoji":"🇬🇶","emojiU":"U+1F1EC U+1F1F6"},"GR":{"name":"Greece","native":"Ελλάδα","phone":"30","continent":"EU","capital":"Athens","currency":"EUR","languages":["el"],"emoji":"🇬🇷","emojiU":"U+1F1EC U+1F1F7"},"GS":{"name":"South Georgia and the South Sandwich Islands","native":"South Georgia","phone":"500","continent":"AN","capital":"King Edward Point","currency":"GBP","languages":["en"],"emoji":"🇬🇸","emojiU":"U+1F1EC U+1F1F8"},"GT":{"name":"Guatemala","native":"Guatemala","phone":"502","continent":"NA","capital":"Guatemala City","currency":"GTQ","languages":["es"],"emoji":"🇬🇹","emojiU":"U+1F1EC U+1F1F9"},"GU":{"name":"Guam","native":"Guam","phone":"1671","continent":"OC","capital":"Hagåtña","currency":"USD","languages":["en","ch","es"],"emoji":"🇬🇺","emojiU":"U+1F1EC U+1F1FA"},"GW":{"name":"Guinea-Bissau","native":"Guiné-Bissau","phone":"245","continent":"AF","capital":"Bissau","currency":"XOF","languages":["pt"],"emoji":"🇬🇼","emojiU":"U+1F1EC U+1F1FC"},"GY":{"name":"Guyana","native":"Guyana","phone":"592","continent":"SA","capital":"Georgetown","currency":"GYD","languages":["en"],"emoji":"🇬🇾","emojiU":"U+1F1EC U+1F1FE"},"HK":{"name":"Hong Kong","native":"香港","phone":"852","continent":"AS","capital":"City of Victoria","currency":"HKD","languages":["zh","en"],"emoji":"🇭🇰","emojiU":"U+1F1ED U+1F1F0"},"HM":{"name":"Heard Island and McDonald Islands","native":"Heard Island and McDonald Islands","phone":"61","continent":"AN","capital":"","currency":"AUD","languages":["en"],"emoji":"🇭🇲","emojiU":"U+1F1ED U+1F1F2"},"HN":{"name":"Honduras","native":"Honduras","phone":"504","continent":"NA","capital":"Tegucigalpa","currency":"HNL","languages":["es"],"emoji":"🇭🇳","emojiU":"U+1F1ED U+1F1F3"},"HR":{"name":"Croatia","native":"Hrvatska","phone":"385","continent":"EU","capital":"Zagreb","currency":"HRK","languages":["hr"],"emoji":"🇭🇷","emojiU":"U+1F1ED U+1F1F7"},"HT":{"name":"Haiti","native":"Haïti","phone":"509","continent":"NA","capital":"Port-au-Prince","currency":"HTG,USD","languages":["fr","ht"],"emoji":"🇭🇹","emojiU":"U+1F1ED U+1F1F9"},"HU":{"name":"Hungary","native":"Magyarország","phone":"36","continent":"EU","capital":"Budapest","currency":"HUF","languages":["hu"],"emoji":"🇭🇺","emojiU":"U+1F1ED U+1F1FA"},"ID":{"name":"Indonesia","native":"Indonesia","phone":"62","continent":"AS","capital":"Jakarta","currency":"IDR","languages":["id"],"emoji":"🇮🇩","emojiU":"U+1F1EE U+1F1E9"},"IE":{"name":"Ireland","native":"Éire","phone":"353","continent":"EU","capital":"Dublin","currency":"EUR","languages":["ga","en"],"emoji":"🇮🇪","emojiU":"U+1F1EE U+1F1EA"},"IL":{"name":"Israel","native":"יִשְׂרָאֵל","phone":"972","continent":"AS","capital":"Jerusalem","currency":"ILS","languages":["he","ar"],"emoji":"🇮🇱","emojiU":"U+1F1EE U+1F1F1"},"IM":{"name":"Isle of Man","native":"Isle of Man","phone":"44","continent":"EU","capital":"Douglas","currency":"GBP","languages":["en","gv"],"emoji":"🇮🇲","emojiU":"U+1F1EE U+1F1F2"},"IN":{"name":"India","native":"भारत","phone":"91","continent":"AS","capital":"New Delhi","currency":"INR","languages":["hi","en"],"emoji":"🇮🇳","emojiU":"U+1F1EE U+1F1F3"},"IO":{"name":"British Indian Ocean Territory","native":"British Indian Ocean Territory","phone":"246","continent":"AS","capital":"Diego Garcia","currency":"USD","languages":["en"],"emoji":"🇮🇴","emojiU":"U+1F1EE U+1F1F4"},"IQ":{"name":"Iraq","native":"العراق","phone":"964","continent":"AS","capital":"Baghdad","currency":"IQD","languages":["ar","ku"],"emoji":"🇮🇶","emojiU":"U+1F1EE U+1F1F6"},"IR":{"name":"Iran","native":"ایران","phone":"98","continent":"AS","capital":"Tehran","currency":"IRR","languages":["fa"],"emoji":"🇮🇷","emojiU":"U+1F1EE U+1F1F7"},"IS":{"name":"Iceland","native":"Ísland","phone":"354","continent":"EU","capital":"Reykjavik","currency":"ISK","languages":["is"],"emoji":"🇮🇸","emojiU":"U+1F1EE U+1F1F8"},"IT":{"name":"Italy","native":"Italia","phone":"39","continent":"EU","capital":"Rome","currency":"EUR","languages":["it"],"emoji":"🇮🇹","emojiU":"U+1F1EE U+1F1F9"},"JE":{"name":"Jersey","native":"Jersey","phone":"44","continent":"EU","capital":"Saint Helier","currency":"GBP","languages":["en","fr"],"emoji":"🇯🇪","emojiU":"U+1F1EF U+1F1EA"},"JM":{"name":"Jamaica","native":"Jamaica","phone":"1876","continent":"NA","capital":"Kingston","currency":"JMD","languages":["en"],"emoji":"🇯🇲","emojiU":"U+1F1EF U+1F1F2"},"JO":{"name":"Jordan","native":"الأردن","phone":"962","continent":"AS","capital":"Amman","currency":"JOD","languages":["ar"],"emoji":"🇯🇴","emojiU":"U+1F1EF U+1F1F4"},"JP":{"name":"Japan","native":"日本","phone":"81","continent":"AS","capital":"Tokyo","currency":"JPY","languages":["ja"],"emoji":"🇯🇵","emojiU":"U+1F1EF U+1F1F5"},"KE":{"name":"Kenya","native":"Kenya","phone":"254","continent":"AF","capital":"Nairobi","currency":"KES","languages":["en","sw"],"emoji":"🇰🇪","emojiU":"U+1F1F0 U+1F1EA"},"KG":{"name":"Kyrgyzstan","native":"Кыргызстан","phone":"996","continent":"AS","capital":"Bishkek","currency":"KGS","languages":["ky","ru"],"emoji":"🇰🇬","emojiU":"U+1F1F0 U+1F1EC"},"KH":{"name":"Cambodia","native":"Kâmpŭchéa","phone":"855","continent":"AS","capital":"Phnom Penh","currency":"KHR","languages":["km"],"emoji":"🇰🇭","emojiU":"U+1F1F0 U+1F1ED"},"KI":{"name":"Kiribati","native":"Kiribati","phone":"686","continent":"OC","capital":"South Tarawa","currency":"AUD","languages":["en"],"emoji":"🇰🇮","emojiU":"U+1F1F0 U+1F1EE"},"KM":{"name":"Comoros","native":"Komori","phone":"269","continent":"AF","capital":"Moroni","currency":"KMF","languages":["ar","fr"],"emoji":"🇰🇲","emojiU":"U+1F1F0 U+1F1F2"},"KN":{"name":"Saint Kitts and Nevis","native":"Saint Kitts and Nevis","phone":"1869","continent":"NA","capital":"Basseterre","currency":"XCD","languages":["en"],"emoji":"🇰🇳","emojiU":"U+1F1F0 U+1F1F3"},"KP":{"name":"North Korea","native":"북한","phone":"850","continent":"AS","capital":"Pyongyang","currency":"KPW","languages":["ko"],"emoji":"🇰🇵","emojiU":"U+1F1F0 U+1F1F5"},"KR":{"name":"South Korea","native":"대한민국","phone":"82","continent":"AS","capital":"Seoul","currency":"KRW","languages":["ko"],"emoji":"🇰🇷","emojiU":"U+1F1F0 U+1F1F7"},"KW":{"name":"Kuwait","native":"الكويت","phone":"965","continent":"AS","capital":"Kuwait City","currency":"KWD","languages":["ar"],"emoji":"🇰🇼","emojiU":"U+1F1F0 U+1F1FC"},"KY":{"name":"Cayman Islands","native":"Cayman Islands","phone":"1345","continent":"NA","capital":"George Town","currency":"KYD","languages":["en"],"emoji":"🇰🇾","emojiU":"U+1F1F0 U+1F1FE"},"KZ":{"name":"Kazakhstan","native":"Қазақстан","phone":"76,77","continent":"AS","capital":"Astana","currency":"KZT","languages":["kk","ru"],"emoji":"🇰🇿","emojiU":"U+1F1F0 U+1F1FF"},"LA":{"name":"Laos","native":"ສປປລາວ","phone":"856","continent":"AS","capital":"Vientiane","currency":"LAK","languages":["lo"],"emoji":"🇱🇦","emojiU":"U+1F1F1 U+1F1E6"},"LB":{"name":"Lebanon","native":"لبنان","phone":"961","continent":"AS","capital":"Beirut","currency":"LBP","languages":["ar","fr"],"emoji":"🇱🇧","emojiU":"U+1F1F1 U+1F1E7"},"LC":{"name":"Saint Lucia","native":"Saint Lucia","phone":"1758","continent":"NA","capital":"Castries","currency":"XCD","languages":["en"],"emoji":"🇱🇨","emojiU":"U+1F1F1 U+1F1E8"},"LI":{"name":"Liechtenstein","native":"Liechtenstein","phone":"423","continent":"EU","capital":"Vaduz","currency":"CHF","languages":["de"],"emoji":"🇱🇮","emojiU":"U+1F1F1 U+1F1EE"},"LK":{"name":"Sri Lanka","native":"śrī laṃkāva","phone":"94","continent":"AS","capital":"Colombo","currency":"LKR","languages":["si","ta"],"emoji":"🇱🇰","emojiU":"U+1F1F1 U+1F1F0"},"LR":{"name":"Liberia","native":"Liberia","phone":"231","continent":"AF","capital":"Monrovia","currency":"LRD","languages":["en"],"emoji":"🇱🇷","emojiU":"U+1F1F1 U+1F1F7"},"LS":{"name":"Lesotho","native":"Lesotho","phone":"266","continent":"AF","capital":"Maseru","currency":"LSL,ZAR","languages":["en","st"],"emoji":"🇱🇸","emojiU":"U+1F1F1 U+1F1F8"},"LT":{"name":"Lithuania","native":"Lietuva","phone":"370","continent":"EU","capital":"Vilnius","currency":"EUR","languages":["lt"],"emoji":"🇱🇹","emojiU":"U+1F1F1 U+1F1F9"},"LU":{"name":"Luxembourg","native":"Luxembourg","phone":"352","continent":"EU","capital":"Luxembourg","currency":"EUR","languages":["fr","de","lb"],"emoji":"🇱🇺","emojiU":"U+1F1F1 U+1F1FA"},"LV":{"name":"Latvia","native":"Latvija","phone":"371","continent":"EU","capital":"Riga","currency":"EUR","languages":["lv"],"emoji":"🇱🇻","emojiU":"U+1F1F1 U+1F1FB"},"LY":{"name":"Libya","native":"‏ليبيا","phone":"218","continent":"AF","capital":"Tripoli","currency":"LYD","languages":["ar"],"emoji":"🇱🇾","emojiU":"U+1F1F1 U+1F1FE"},"MA":{"name":"Morocco","native":"المغرب","phone":"212","continent":"AF","capital":"Rabat","currency":"MAD","languages":["ar"],"emoji":"🇲🇦","emojiU":"U+1F1F2 U+1F1E6"},"MC":{"name":"Monaco","native":"Monaco","phone":"377","continent":"EU","capital":"Monaco","currency":"EUR","languages":["fr"],"emoji":"🇲🇨","emojiU":"U+1F1F2 U+1F1E8"},"MD":{"name":"Moldova","native":"Moldova","phone":"373","continent":"EU","capital":"Chișinău","currency":"MDL","languages":["ro"],"emoji":"🇲🇩","emojiU":"U+1F1F2 U+1F1E9"},"ME":{"name":"Montenegro","native":"Црна Гора","phone":"382","continent":"EU","capital":"Podgorica","currency":"EUR","languages":["sr","bs","sq","hr"],"emoji":"🇲🇪","emojiU":"U+1F1F2 U+1F1EA"},"MF":{"name":"Saint Martin","native":"Saint-Martin","phone":"590","continent":"NA","capital":"Marigot","currency":"EUR","languages":["en","fr","nl"],"emoji":"🇲🇫","emojiU":"U+1F1F2 U+1F1EB"},"MG":{"name":"Madagascar","native":"Madagasikara","phone":"261","continent":"AF","capital":"Antananarivo","currency":"MGA","languages":["fr","mg"],"emoji":"🇲🇬","emojiU":"U+1F1F2 U+1F1EC"},"MH":{"name":"Marshall Islands","native":"M̧ajeļ","phone":"692","continent":"OC","capital":"Majuro","currency":"USD","languages":["en","mh"],"emoji":"🇲🇭","emojiU":"U+1F1F2 U+1F1ED"},"MK":{"name":"North Macedonia","native":"Северна Македонија","phone":"389","continent":"EU","capital":"Skopje","currency":"MKD","languages":["mk"],"emoji":"🇲🇰","emojiU":"U+1F1F2 U+1F1F0"},"ML":{"name":"Mali","native":"Mali","phone":"223","continent":"AF","capital":"Bamako","currency":"XOF","languages":["fr"],"emoji":"🇲🇱","emojiU":"U+1F1F2 U+1F1F1"},"MM":{"name":"Myanmar [Burma]","native":"မြန်မာ","phone":"95","continent":"AS","capital":"Naypyidaw","currency":"MMK","languages":["my"],"emoji":"🇲🇲","emojiU":"U+1F1F2 U+1F1F2"},"MN":{"name":"Mongolia","native":"Монгол улс","phone":"976","continent":"AS","capital":"Ulan Bator","currency":"MNT","languages":["mn"],"emoji":"🇲🇳","emojiU":"U+1F1F2 U+1F1F3"},"MO":{"name":"Macao","native":"澳門","phone":"853","continent":"AS","capital":"","currency":"MOP","languages":["zh","pt"],"emoji":"🇲🇴","emojiU":"U+1F1F2 U+1F1F4"},"MP":{"name":"Northern Mariana Islands","native":"Northern Mariana Islands","phone":"1670","continent":"OC","capital":"Saipan","currency":"USD","languages":["en","ch"],"emoji":"🇲🇵","emojiU":"U+1F1F2 U+1F1F5"},"MQ":{"name":"Martinique","native":"Martinique","phone":"596","continent":"NA","capital":"Fort-de-France","currency":"EUR","languages":["fr"],"emoji":"🇲🇶","emojiU":"U+1F1F2 U+1F1F6"},"MR":{"name":"Mauritania","native":"موريتانيا","phone":"222","continent":"AF","capital":"Nouakchott","currency":"MRU","languages":["ar"],"emoji":"🇲🇷","emojiU":"U+1F1F2 U+1F1F7"},"MS":{"name":"Montserrat","native":"Montserrat","phone":"1664","continent":"NA","capital":"Plymouth","currency":"XCD","languages":["en"],"emoji":"🇲🇸","emojiU":"U+1F1F2 U+1F1F8"},"MT":{"name":"Malta","native":"Malta","phone":"356","continent":"EU","capital":"Valletta","currency":"EUR","languages":["mt","en"],"emoji":"🇲🇹","emojiU":"U+1F1F2 U+1F1F9"},"MU":{"name":"Mauritius","native":"Maurice","phone":"230","continent":"AF","capital":"Port Louis","currency":"MUR","languages":["en"],"emoji":"🇲🇺","emojiU":"U+1F1F2 U+1F1FA"},"MV":{"name":"Maldives","native":"Maldives","phone":"960","continent":"AS","capital":"Malé","currency":"MVR","languages":["dv"],"emoji":"🇲🇻","emojiU":"U+1F1F2 U+1F1FB"},"MW":{"name":"Malawi","native":"Malawi","phone":"265","continent":"AF","capital":"Lilongwe","currency":"MWK","languages":["en","ny"],"emoji":"🇲🇼","emojiU":"U+1F1F2 U+1F1FC"},"MX":{"name":"Mexico","native":"México","phone":"52","continent":"NA","capital":"Mexico City","currency":"MXN","languages":["es"],"emoji":"🇲🇽","emojiU":"U+1F1F2 U+1F1FD"},"MY":{"name":"Malaysia","native":"Malaysia","phone":"60","continent":"AS","capital":"Kuala Lumpur","currency":"MYR","languages":["ms"],"emoji":"🇲🇾","emojiU":"U+1F1F2 U+1F1FE"},"MZ":{"name":"Mozambique","native":"Moçambique","phone":"258","continent":"AF","capital":"Maputo","currency":"MZN","languages":["pt"],"emoji":"🇲🇿","emojiU":"U+1F1F2 U+1F1FF"},"NA":{"name":"Namibia","native":"Namibia","phone":"264","continent":"AF","capital":"Windhoek","currency":"NAD,ZAR","languages":["en","af"],"emoji":"🇳🇦","emojiU":"U+1F1F3 U+1F1E6"},"NC":{"name":"New Caledonia","native":"Nouvelle-Calédonie","phone":"687","continent":"OC","capital":"Nouméa","currency":"XPF","languages":["fr"],"emoji":"🇳🇨","emojiU":"U+1F1F3 U+1F1E8"},"NE":{"name":"Niger","native":"Niger","phone":"227","continent":"AF","capital":"Niamey","currency":"XOF","languages":["fr"],"emoji":"🇳🇪","emojiU":"U+1F1F3 U+1F1EA"},"NF":{"name":"Norfolk Island","native":"Norfolk Island","phone":"672","continent":"OC","capital":"Kingston","currency":"AUD","languages":["en"],"emoji":"🇳🇫","emojiU":"U+1F1F3 U+1F1EB"},"NG":{"name":"Nigeria","native":"Nigeria","phone":"234","continent":"AF","capital":"Abuja","currency":"NGN","languages":["en"],"emoji":"🇳🇬","emojiU":"U+1F1F3 U+1F1EC"},"NI":{"name":"Nicaragua","native":"Nicaragua","phone":"505","continent":"NA","capital":"Managua","currency":"NIO","languages":["es"],"emoji":"🇳🇮","emojiU":"U+1F1F3 U+1F1EE"},"NL":{"name":"Netherlands","native":"Nederland","phone":"31","continent":"EU","capital":"Amsterdam","currency":"EUR","languages":["nl"],"emoji":"🇳🇱","emojiU":"U+1F1F3 U+1F1F1"},"NO":{"name":"Norway","native":"Norge","phone":"47","continent":"EU","capital":"Oslo","currency":"NOK","languages":["no","nb","nn"],"emoji":"🇳🇴","emojiU":"U+1F1F3 U+1F1F4"},"NP":{"name":"Nepal","native":"नपल","phone":"977","continent":"AS","capital":"Kathmandu","currency":"NPR","languages":["ne"],"emoji":"🇳🇵","emojiU":"U+1F1F3 U+1F1F5"},"NR":{"name":"Nauru","native":"Nauru","phone":"674","continent":"OC","capital":"Yaren","currency":"AUD","languages":["en","na"],"emoji":"🇳🇷","emojiU":"U+1F1F3 U+1F1F7"},"NU":{"name":"Niue","native":"Niuē","phone":"683","continent":"OC","capital":"Alofi","currency":"NZD","languages":["en"],"emoji":"🇳🇺","emojiU":"U+1F1F3 U+1F1FA"},"NZ":{"name":"New Zealand","native":"New Zealand","phone":"64","continent":"OC","capital":"Wellington","currency":"NZD","languages":["en","mi"],"emoji":"🇳🇿","emojiU":"U+1F1F3 U+1F1FF"},"OM":{"name":"Oman","native":"عمان","phone":"968","continent":"AS","capital":"Muscat","currency":"OMR","languages":["ar"],"emoji":"🇴🇲","emojiU":"U+1F1F4 U+1F1F2"},"PA":{"name":"Panama","native":"Panamá","phone":"507","continent":"NA","capital":"Panama City","currency":"PAB,USD","languages":["es"],"emoji":"🇵🇦","emojiU":"U+1F1F5 U+1F1E6"},"PE":{"name":"Peru","native":"Perú","phone":"51","continent":"SA","capital":"Lima","currency":"PEN","languages":["es"],"emoji":"🇵🇪","emojiU":"U+1F1F5 U+1F1EA"},"PF":{"name":"French Polynesia","native":"Polynésie française","phone":"689","continent":"OC","capital":"Papeetē","currency":"XPF","languages":["fr"],"emoji":"🇵🇫","emojiU":"U+1F1F5 U+1F1EB"},"PG":{"name":"Papua New Guinea","native":"Papua Niugini","phone":"675","continent":"OC","capital":"Port Moresby","currency":"PGK","languages":["en"],"emoji":"🇵🇬","emojiU":"U+1F1F5 U+1F1EC"},"PH":{"name":"Philippines","native":"Pilipinas","phone":"63","continent":"AS","capital":"Manila","currency":"PHP","languages":["en"],"emoji":"🇵🇭","emojiU":"U+1F1F5 U+1F1ED"},"PK":{"name":"Pakistan","native":"Pakistan","phone":"92","continent":"AS","capital":"Islamabad","currency":"PKR","languages":["en","ur"],"emoji":"🇵🇰","emojiU":"U+1F1F5 U+1F1F0"},"PL":{"name":"Poland","native":"Polska","phone":"48","continent":"EU","capital":"Warsaw","currency":"PLN","languages":["pl"],"emoji":"🇵🇱","emojiU":"U+1F1F5 U+1F1F1"},"PM":{"name":"Saint Pierre and Miquelon","native":"Saint-Pierre-et-Miquelon","phone":"508","continent":"NA","capital":"Saint-Pierre","currency":"EUR","languages":["fr"],"emoji":"🇵🇲","emojiU":"U+1F1F5 U+1F1F2"},"PN":{"name":"Pitcairn Islands","native":"Pitcairn Islands","phone":"64","continent":"OC","capital":"Adamstown","currency":"NZD","languages":["en"],"emoji":"🇵🇳","emojiU":"U+1F1F5 U+1F1F3"},"PR":{"name":"Puerto Rico","native":"Puerto Rico","phone":"1787,1939","continent":"NA","capital":"San Juan","currency":"USD","languages":["es","en"],"emoji":"🇵🇷","emojiU":"U+1F1F5 U+1F1F7"},"PS":{"name":"Palestine","native":"فلسطين","phone":"970","continent":"AS","capital":"Ramallah","currency":"ILS","languages":["ar"],"emoji":"🇵🇸","emojiU":"U+1F1F5 U+1F1F8"},"PT":{"name":"Portugal","native":"Portugal","phone":"351","continent":"EU","capital":"Lisbon","currency":"EUR","languages":["pt"],"emoji":"🇵🇹","emojiU":"U+1F1F5 U+1F1F9"},"PW":{"name":"Palau","native":"Palau","phone":"680","continent":"OC","capital":"Ngerulmud","currency":"USD","languages":["en"],"emoji":"🇵🇼","emojiU":"U+1F1F5 U+1F1FC"},"PY":{"name":"Paraguay","native":"Paraguay","phone":"595","continent":"SA","capital":"Asunción","currency":"PYG","languages":["es","gn"],"emoji":"🇵🇾","emojiU":"U+1F1F5 U+1F1FE"},"QA":{"name":"Qatar","native":"قطر","phone":"974","continent":"AS","capital":"Doha","currency":"QAR","languages":["ar"],"emoji":"🇶🇦","emojiU":"U+1F1F6 U+1F1E6"},"RE":{"name":"Réunion","native":"La Réunion","phone":"262","continent":"AF","capital":"Saint-Denis","currency":"EUR","languages":["fr"],"emoji":"🇷🇪","emojiU":"U+1F1F7 U+1F1EA"},"RO":{"name":"Romania","native":"România","phone":"40","continent":"EU","capital":"Bucharest","currency":"RON","languages":["ro"],"emoji":"🇷🇴","emojiU":"U+1F1F7 U+1F1F4"},"RS":{"name":"Serbia","native":"Србија","phone":"381","continent":"EU","capital":"Belgrade","currency":"RSD","languages":["sr"],"emoji":"🇷🇸","emojiU":"U+1F1F7 U+1F1F8"},"RU":{"name":"Russia","native":"Россия","phone":"7","continent":"EU","capital":"Moscow","currency":"RUB","languages":["ru"],"emoji":"🇷🇺","emojiU":"U+1F1F7 U+1F1FA"},"RW":{"name":"Rwanda","native":"Rwanda","phone":"250","continent":"AF","capital":"Kigali","currency":"RWF","languages":["rw","en","fr"],"emoji":"🇷🇼","emojiU":"U+1F1F7 U+1F1FC"},"SA":{"name":"Saudi Arabia","native":"العربية السعودية","phone":"966","continent":"AS","capital":"Riyadh","currency":"SAR","languages":["ar"],"emoji":"🇸🇦","emojiU":"U+1F1F8 U+1F1E6"},"SB":{"name":"Solomon Islands","native":"Solomon Islands","phone":"677","continent":"OC","capital":"Honiara","currency":"SBD","languages":["en"],"emoji":"🇸🇧","emojiU":"U+1F1F8 U+1F1E7"},"SC":{"name":"Seychelles","native":"Seychelles","phone":"248","continent":"AF","capital":"Victoria","currency":"SCR","languages":["fr","en"],"emoji":"🇸🇨","emojiU":"U+1F1F8 U+1F1E8"},"SD":{"name":"Sudan","native":"السودان","phone":"249","continent":"AF","capital":"Khartoum","currency":"SDG","languages":["ar","en"],"emoji":"🇸🇩","emojiU":"U+1F1F8 U+1F1E9"},"SE":{"name":"Sweden","native":"Sverige","phone":"46","continent":"EU","capital":"Stockholm","currency":"SEK","languages":["sv"],"emoji":"🇸🇪","emojiU":"U+1F1F8 U+1F1EA"},"SG":{"name":"Singapore","native":"Singapore","phone":"65","continent":"AS","capital":"Singapore","currency":"SGD","languages":["en","ms","ta","zh"],"emoji":"🇸🇬","emojiU":"U+1F1F8 U+1F1EC"},"SH":{"name":"Saint Helena","native":"Saint Helena","phone":"290","continent":"AF","capital":"Jamestown","currency":"SHP","languages":["en"],"emoji":"🇸🇭","emojiU":"U+1F1F8 U+1F1ED"},"SI":{"name":"Slovenia","native":"Slovenija","phone":"386","continent":"EU","capital":"Ljubljana","currency":"EUR","languages":["sl"],"emoji":"🇸🇮","emojiU":"U+1F1F8 U+1F1EE"},"SJ":{"name":"Svalbard and Jan Mayen","native":"Svalbard og Jan Mayen","phone":"4779","continent":"EU","capital":"Longyearbyen","currency":"NOK","languages":["no"],"emoji":"🇸🇯","emojiU":"U+1F1F8 U+1F1EF"},"SK":{"name":"Slovakia","native":"Slovensko","phone":"421","continent":"EU","capital":"Bratislava","currency":"EUR","languages":["sk"],"emoji":"🇸🇰","emojiU":"U+1F1F8 U+1F1F0"},"SL":{"name":"Sierra Leone","native":"Sierra Leone","phone":"232","continent":"AF","capital":"Freetown","currency":"SLL","languages":["en"],"emoji":"🇸🇱","emojiU":"U+1F1F8 U+1F1F1"},"SM":{"name":"San Marino","native":"San Marino","phone":"378","continent":"EU","capital":"City of San Marino","currency":"EUR","languages":["it"],"emoji":"🇸🇲","emojiU":"U+1F1F8 U+1F1F2"},"SN":{"name":"Senegal","native":"Sénégal","phone":"221","continent":"AF","capital":"Dakar","currency":"XOF","languages":["fr"],"emoji":"🇸🇳","emojiU":"U+1F1F8 U+1F1F3"},"SO":{"name":"Somalia","native":"Soomaaliya","phone":"252","continent":"AF","capital":"Mogadishu","currency":"SOS","languages":["so","ar"],"emoji":"🇸🇴","emojiU":"U+1F1F8 U+1F1F4"},"SR":{"name":"Suriname","native":"Suriname","phone":"597","continent":"SA","capital":"Paramaribo","currency":"SRD","languages":["nl"],"emoji":"🇸🇷","emojiU":"U+1F1F8 U+1F1F7"},"SS":{"name":"South Sudan","native":"South Sudan","phone":"211","continent":"AF","capital":"Juba","currency":"SSP","languages":["en"],"emoji":"🇸🇸","emojiU":"U+1F1F8 U+1F1F8"},"ST":{"name":"São Tomé and Príncipe","native":"São Tomé e Príncipe","phone":"239","continent":"AF","capital":"São Tomé","currency":"STN","languages":["pt"],"emoji":"🇸🇹","emojiU":"U+1F1F8 U+1F1F9"},"SV":{"name":"El Salvador","native":"El Salvador","phone":"503","continent":"NA","capital":"San Salvador","currency":"SVC,USD","languages":["es"],"emoji":"🇸🇻","emojiU":"U+1F1F8 U+1F1FB"},"SX":{"name":"Sint Maarten","native":"Sint Maarten","phone":"1721","continent":"NA","capital":"Philipsburg","currency":"ANG","languages":["nl","en"],"emoji":"🇸🇽","emojiU":"U+1F1F8 U+1F1FD"},"SY":{"name":"Syria","native":"سوريا","phone":"963","continent":"AS","capital":"Damascus","currency":"SYP","languages":["ar"],"emoji":"🇸🇾","emojiU":"U+1F1F8 U+1F1FE"},"SZ":{"name":"Swaziland","native":"Swaziland","phone":"268","continent":"AF","capital":"Lobamba","currency":"SZL","languages":["en","ss"],"emoji":"🇸🇿","emojiU":"U+1F1F8 U+1F1FF"},"TC":{"name":"Turks and Caicos Islands","native":"Turks and Caicos Islands","phone":"1649","continent":"NA","capital":"Cockburn Town","currency":"USD","languages":["en"],"emoji":"🇹🇨","emojiU":"U+1F1F9 U+1F1E8"},"TD":{"name":"Chad","native":"Tchad","phone":"235","continent":"AF","capital":"N\'Djamena","currency":"XAF","languages":["fr","ar"],"emoji":"🇹🇩","emojiU":"U+1F1F9 U+1F1E9"},"TF":{"name":"French Southern Territories","native":"Territoire des Terres australes et antarctiques fr","phone":"262","continent":"AN","capital":"Port-aux-Français","currency":"EUR","languages":["fr"],"emoji":"🇹🇫","emojiU":"U+1F1F9 U+1F1EB"},"TG":{"name":"Togo","native":"Togo","phone":"228","continent":"AF","capital":"Lomé","currency":"XOF","languages":["fr"],"emoji":"🇹🇬","emojiU":"U+1F1F9 U+1F1EC"},"TH":{"name":"Thailand","native":"ประเทศไทย","phone":"66","continent":"AS","capital":"Bangkok","currency":"THB","languages":["th"],"emoji":"🇹🇭","emojiU":"U+1F1F9 U+1F1ED"},"TJ":{"name":"Tajikistan","native":"Тоҷикистон","phone":"992","continent":"AS","capital":"Dushanbe","currency":"TJS","languages":["tg","ru"],"emoji":"🇹🇯","emojiU":"U+1F1F9 U+1F1EF"},"TK":{"name":"Tokelau","native":"Tokelau","phone":"690","continent":"OC","capital":"Fakaofo","currency":"NZD","languages":["en"],"emoji":"🇹🇰","emojiU":"U+1F1F9 U+1F1F0"},"TL":{"name":"East Timor","native":"Timor-Leste","phone":"670","continent":"OC","capital":"Dili","currency":"USD","languages":["pt"],"emoji":"🇹🇱","emojiU":"U+1F1F9 U+1F1F1"},"TM":{"name":"Turkmenistan","native":"Türkmenistan","phone":"993","continent":"AS","capital":"Ashgabat","currency":"TMT","languages":["tk","ru"],"emoji":"🇹🇲","emojiU":"U+1F1F9 U+1F1F2"},"TN":{"name":"Tunisia","native":"تونس","phone":"216","continent":"AF","capital":"Tunis","currency":"TND","languages":["ar"],"emoji":"🇹🇳","emojiU":"U+1F1F9 U+1F1F3"},"TO":{"name":"Tonga","native":"Tonga","phone":"676","continent":"OC","capital":"Nuku\'alofa","currency":"TOP","languages":["en","to"],"emoji":"🇹🇴","emojiU":"U+1F1F9 U+1F1F4"},"TR":{"name":"Turkey","native":"Türkiye","phone":"90","continent":"AS","capital":"Ankara","currency":"TRY","languages":["tr"],"emoji":"🇹🇷","emojiU":"U+1F1F9 U+1F1F7"},"TT":{"name":"Trinidad and Tobago","native":"Trinidad and Tobago","phone":"1868","continent":"NA","capital":"Port of Spain","currency":"TTD","languages":["en"],"emoji":"🇹🇹","emojiU":"U+1F1F9 U+1F1F9"},"TV":{"name":"Tuvalu","native":"Tuvalu","phone":"688","continent":"OC","capital":"Funafuti","currency":"AUD","languages":["en"],"emoji":"🇹🇻","emojiU":"U+1F1F9 U+1F1FB"},"TW":{"name":"Taiwan","native":"臺灣","phone":"886","continent":"AS","capital":"Taipei","currency":"TWD","languages":["zh"],"emoji":"🇹🇼","emojiU":"U+1F1F9 U+1F1FC"},"TZ":{"name":"Tanzania","native":"Tanzania","phone":"255","continent":"AF","capital":"Dodoma","currency":"TZS","languages":["sw","en"],"emoji":"🇹🇿","emojiU":"U+1F1F9 U+1F1FF"},"UA":{"name":"Ukraine","native":"Україна","phone":"380","continent":"EU","capital":"Kyiv","currency":"UAH","languages":["uk"],"emoji":"🇺🇦","emojiU":"U+1F1FA U+1F1E6"},"UG":{"name":"Uganda","native":"Uganda","phone":"256","continent":"AF","capital":"Kampala","currency":"UGX","languages":["en","sw"],"emoji":"🇺🇬","emojiU":"U+1F1FA U+1F1EC"},"UM":{"name":"U.S. Minor Outlying Islands","native":"United States Minor Outlying Islands","phone":"1","continent":"OC","capital":"","currency":"USD","languages":["en"],"emoji":"🇺🇲","emojiU":"U+1F1FA U+1F1F2"},"US":{"name":"United States","native":"United States","phone":"1","continent":"NA","capital":"Washington D.C.","currency":"USD,USN,USS","languages":["en"],"emoji":"🇺🇸","emojiU":"U+1F1FA U+1F1F8"},"UY":{"name":"Uruguay","native":"Uruguay","phone":"598","continent":"SA","capital":"Montevideo","currency":"UYI,UYU","languages":["es"],"emoji":"🇺🇾","emojiU":"U+1F1FA U+1F1FE"},"UZ":{"name":"Uzbekistan","native":"O‘zbekiston","phone":"998","continent":"AS","capital":"Tashkent","currency":"UZS","languages":["uz","ru"],"emoji":"🇺🇿","emojiU":"U+1F1FA U+1F1FF"},"VA":{"name":"Vatican City","native":"Vaticano","phone":"39066,379","continent":"EU","capital":"Vatican City","currency":"EUR","languages":["it","la"],"emoji":"🇻🇦","emojiU":"U+1F1FB U+1F1E6"},"VC":{"name":"Saint Vincent and the Grenadines","native":"Saint Vincent and the Grenadines","phone":"1784","continent":"NA","capital":"Kingstown","currency":"XCD","languages":["en"],"emoji":"🇻🇨","emojiU":"U+1F1FB U+1F1E8"},"VE":{"name":"Venezuela","native":"Venezuela","phone":"58","continent":"SA","capital":"Caracas","currency":"VES","languages":["es"],"emoji":"🇻🇪","emojiU":"U+1F1FB U+1F1EA"},"VG":{"name":"British Virgin Islands","native":"British Virgin Islands","phone":"1284","continent":"NA","capital":"Road Town","currency":"USD","languages":["en"],"emoji":"🇻🇬","emojiU":"U+1F1FB U+1F1EC"},"VI":{"name":"U.S. Virgin Islands","native":"United States Virgin Islands","phone":"1340","continent":"NA","capital":"Charlotte Amalie","currency":"USD","languages":["en"],"emoji":"🇻🇮","emojiU":"U+1F1FB U+1F1EE"},"VN":{"name":"Vietnam","native":"Việt Nam","phone":"84","continent":"AS","capital":"Hanoi","currency":"VND","languages":["vi"],"emoji":"🇻🇳","emojiU":"U+1F1FB U+1F1F3"},"VU":{"name":"Vanuatu","native":"Vanuatu","phone":"678","continent":"OC","capital":"Port Vila","currency":"VUV","languages":["bi","en","fr"],"emoji":"🇻🇺","emojiU":"U+1F1FB U+1F1FA"},"WF":{"name":"Wallis and Futuna","native":"Wallis et Futuna","phone":"681","continent":"OC","capital":"Mata-Utu","currency":"XPF","languages":["fr"],"emoji":"🇼🇫","emojiU":"U+1F1FC U+1F1EB"},"WS":{"name":"Samoa","native":"Samoa","phone":"685","continent":"OC","capital":"Apia","currency":"WST","languages":["sm","en"],"emoji":"🇼🇸","emojiU":"U+1F1FC U+1F1F8"},"XK":{"name":"Kosovo","native":"Republika e Kosovës","phone":"377,381,383,386","continent":"EU","capital":"Pristina","currency":"EUR","languages":["sq","sr"],"emoji":"🇽🇰","emojiU":"U+1F1FD U+1F1F0"},"YE":{"name":"Yemen","native":"اليَمَن","phone":"967","continent":"AS","capital":"Sana\'a","currency":"YER","languages":["ar"],"emoji":"🇾🇪","emojiU":"U+1F1FE U+1F1EA"},"YT":{"name":"Mayotte","native":"Mayotte","phone":"262","continent":"AF","capital":"Mamoudzou","currency":"EUR","languages":["fr"],"emoji":"🇾🇹","emojiU":"U+1F1FE U+1F1F9"},"ZA":{"name":"South Africa","native":"South Africa","phone":"27","continent":"AF","capital":"Pretoria","currency":"ZAR","languages":["af","en","nr","st","ss","tn","ts","ve","xh","zu"],"emoji":"🇿🇦","emojiU":"U+1F1FF U+1F1E6"},"ZM":{"name":"Zambia","native":"Zambia","phone":"260","continent":"AF","capital":"Lusaka","currency":"ZMK","languages":["en"],"emoji":"🇿🇲","emojiU":"U+1F1FF U+1F1F2"},"ZW":{"name":"Zimbabwe","native":"Zimbabwe","phone":"263","continent":"AF","capital":"Harare","currency":"USD,ZAR,BWP,GBP,AUD,CNY,INR,JPY","languages":["en","sn","nd"],"emoji":"🇿🇼","emojiU":"U+1F1FF U+1F1FC"}}')},function(n){n.exports=JSON.parse('{"af":{"name":"Afrikaans","native":"Afrikaans"},"am":{"name":"Amharic","native":"አማርኛ"},"ar":{"name":"Arabic","native":"العربية","rtl":1},"ay":{"name":"Aymara","native":"Aymar"},"az":{"name":"Azerbaijani","native":"Azərbaycanca / آذربايجان"},"be":{"name":"Belarusian","native":"Беларуская"},"bg":{"name":"Bulgarian","native":"Български"},"bi":{"name":"Bislama","native":"Bislama"},"bn":{"name":"Bengali","native":"বাংলা"},"bs":{"name":"Bosnian","native":"Bosanski"},"ca":{"name":"Catalan","native":"Català"},"ch":{"name":"Chamorro","native":"Chamoru"},"cs":{"name":"Czech","native":"Česky"},"da":{"name":"Danish","native":"Dansk"},"de":{"name":"German","native":"Deutsch"},"dv":{"name":"Divehi","native":"ދިވެހިބަސް","rtl":1},"dz":{"name":"Dzongkha","native":"ཇོང་ཁ"},"el":{"name":"Greek","native":"Ελληνικά"},"en":{"name":"English","native":"English"},"es":{"name":"Spanish","native":"Español"},"et":{"name":"Estonian","native":"Eesti"},"eu":{"name":"Basque","native":"Euskara"},"fa":{"name":"Persian","native":"فارسی","rtl":1},"ff":{"name":"Peul","native":"Fulfulde"},"fi":{"name":"Finnish","native":"Suomi"},"fj":{"name":"Fijian","native":"Na Vosa Vakaviti"},"fo":{"name":"Faroese","native":"Føroyskt"},"fr":{"name":"French","native":"Français"},"ga":{"name":"Irish","native":"Gaeilge"},"gl":{"name":"Galician","native":"Galego"},"gn":{"name":"Guarani","native":"Avañe\'ẽ"},"gv":{"name":"Manx","native":"Gaelg"},"he":{"name":"Hebrew","native":"עברית","rtl":1},"hi":{"name":"Hindi","native":"हिन्दी"},"hr":{"name":"Croatian","native":"Hrvatski"},"ht":{"name":"Haitian","native":"Krèyol ayisyen"},"hu":{"name":"Hungarian","native":"Magyar"},"hy":{"name":"Armenian","native":"Հայերեն"},"id":{"name":"Indonesian","native":"Bahasa Indonesia"},"is":{"name":"Icelandic","native":"Íslenska"},"it":{"name":"Italian","native":"Italiano"},"ja":{"name":"Japanese","native":"日本語"},"ka":{"name":"Georgian","native":"ქართული"},"kg":{"name":"Kongo","native":"KiKongo"},"kk":{"name":"Kazakh","native":"Қазақша"},"kl":{"name":"Greenlandic","native":"Kalaallisut"},"km":{"name":"Cambodian","native":"ភាសាខ្មែរ"},"ko":{"name":"Korean","native":"한국어"},"ku":{"name":"Kurdish","native":"Kurdî / كوردی","rtl":1},"ky":{"name":"Kirghiz","native":"Kırgızca / Кыргызча"},"la":{"name":"Latin","native":"Latina"},"lb":{"name":"Luxembourgish","native":"Lëtzebuergesch"},"ln":{"name":"Lingala","native":"Lingála"},"lo":{"name":"Laotian","native":"ລາວ / Pha xa lao"},"lt":{"name":"Lithuanian","native":"Lietuvių"},"lu":{},"lv":{"name":"Latvian","native":"Latviešu"},"mg":{"name":"Malagasy","native":"Malagasy"},"mh":{"name":"Marshallese","native":"Kajin Majel / Ebon"},"mi":{"name":"Maori","native":"Māori"},"mk":{"name":"Macedonian","native":"Македонски"},"mn":{"name":"Mongolian","native":"Монгол"},"ms":{"name":"Malay","native":"Bahasa Melayu"},"mt":{"name":"Maltese","native":"bil-Malti"},"my":{"name":"Burmese","native":"မြန်မာစာ"},"na":{"name":"Nauruan","native":"Dorerin Naoero"},"nb":{},"nd":{"name":"North Ndebele","native":"Sindebele"},"ne":{"name":"Nepali","native":"नेपाली"},"nl":{"name":"Dutch","native":"Nederlands"},"nn":{"name":"Norwegian Nynorsk","native":"Norsk (nynorsk)"},"no":{"name":"Norwegian","native":"Norsk (bokmål / riksmål)"},"nr":{"name":"South Ndebele","native":"isiNdebele"},"ny":{"name":"Chichewa","native":"Chi-Chewa"},"oc":{"name":"Occitan","native":"Occitan"},"pa":{"name":"Panjabi / Punjabi","native":"ਪੰਜਾਬੀ / पंजाबी / پنجابي"},"pl":{"name":"Polish","native":"Polski"},"ps":{"name":"Pashto","native":"پښتو","rtl":1},"pt":{"name":"Portuguese","native":"Português"},"qu":{"name":"Quechua","native":"Runa Simi"},"rn":{"name":"Kirundi","native":"Kirundi"},"ro":{"name":"Romanian","native":"Română"},"ru":{"name":"Russian","native":"Русский"},"rw":{"name":"Rwandi","native":"Kinyarwandi"},"sg":{"name":"Sango","native":"Sängö"},"si":{"name":"Sinhalese","native":"සිංහල"},"sk":{"name":"Slovak","native":"Slovenčina"},"sl":{"name":"Slovenian","native":"Slovenščina"},"sm":{"name":"Samoan","native":"Gagana Samoa"},"sn":{"name":"Shona","native":"chiShona"},"so":{"name":"Somalia","native":"Soomaaliga"},"sq":{"name":"Albanian","native":"Shqip"},"sr":{"name":"Serbian","native":"Српски"},"ss":{"name":"Swati","native":"SiSwati"},"st":{"name":"Southern Sotho","native":"Sesotho"},"sv":{"name":"Swedish","native":"Svenska"},"sw":{"name":"Swahili","native":"Kiswahili"},"ta":{"name":"Tamil","native":"தமிழ்"},"tg":{"name":"Tajik","native":"Тоҷикӣ"},"th":{"name":"Thai","native":"ไทย / Phasa Thai"},"ti":{"name":"Tigrinya","native":"ትግርኛ"},"tk":{"name":"Turkmen","native":"Туркмен / تركمن"},"tn":{"name":"Tswana","native":"Setswana"},"to":{"name":"Tonga","native":"Lea Faka-Tonga"},"tr":{"name":"Turkish","native":"Türkçe"},"ts":{"name":"Tsonga","native":"Xitsonga"},"uk":{"name":"Ukrainian","native":"Українська"},"ur":{"name":"Urdu","native":"اردو","rtl":1},"uz":{"name":"Uzbek","native":"Ўзбек"},"ve":{"name":"Venda","native":"Tshivenḓa"},"vi":{"name":"Vietnamese","native":"Tiếng Việt"},"xh":{"name":"Xhosa","native":"isiXhosa"},"zh":{"name":"Chinese","native":"中文"},"zu":{"name":"Zulu","native":"isiZulu"}}')},function(n){n.exports=JSON.parse('{"aa":{"name":"Afar","native":"Afar"},"ab":{"name":"Abkhazian","native":"Аҧсуа"},"af":{"name":"Afrikaans","native":"Afrikaans"},"ak":{"name":"Akan","native":"Akana"},"am":{"name":"Amharic","native":"አማርኛ"},"an":{"name":"Aragonese","native":"Aragonés"},"ar":{"name":"Arabic","native":"العربية","rtl":1},"as":{"name":"Assamese","native":"অসমীয়া"},"av":{"name":"Avar","native":"Авар"},"ay":{"name":"Aymara","native":"Aymar"},"az":{"name":"Azerbaijani","native":"Azərbaycanca / آذربايجان"},"ba":{"name":"Bashkir","native":"Башҡорт"},"be":{"name":"Belarusian","native":"Беларуская"},"bg":{"name":"Bulgarian","native":"Български"},"bh":{"name":"Bihari","native":"भोजपुरी"},"bi":{"name":"Bislama","native":"Bislama"},"bm":{"name":"Bambara","native":"Bamanankan"},"bn":{"name":"Bengali","native":"বাংলা"},"bo":{"name":"Tibetan","native":"བོད་ཡིག / Bod skad"},"br":{"name":"Breton","native":"Brezhoneg"},"bs":{"name":"Bosnian","native":"Bosanski"},"ca":{"name":"Catalan","native":"Català"},"ce":{"name":"Chechen","native":"Нохчийн"},"ch":{"name":"Chamorro","native":"Chamoru"},"co":{"name":"Corsican","native":"Corsu"},"cr":{"name":"Cree","native":"Nehiyaw"},"cs":{"name":"Czech","native":"Česky"},"cu":{"name":"Old Church Slavonic / Old Bulgarian","native":"словѣньскъ / slověnĭskŭ"},"cv":{"name":"Chuvash","native":"Чăваш"},"cy":{"name":"Welsh","native":"Cymraeg"},"da":{"name":"Danish","native":"Dansk"},"de":{"name":"German","native":"Deutsch"},"dv":{"name":"Divehi","native":"ދިވެހިބަސް","rtl":1},"dz":{"name":"Dzongkha","native":"ཇོང་ཁ"},"ee":{"name":"Ewe","native":"Ɛʋɛ"},"el":{"name":"Greek","native":"Ελληνικά"},"en":{"name":"English","native":"English"},"eo":{"name":"Esperanto","native":"Esperanto"},"es":{"name":"Spanish","native":"Español"},"et":{"name":"Estonian","native":"Eesti"},"eu":{"name":"Basque","native":"Euskara"},"fa":{"name":"Persian","native":"فارسی","rtl":1},"ff":{"name":"Peul","native":"Fulfulde"},"fi":{"name":"Finnish","native":"Suomi"},"fj":{"name":"Fijian","native":"Na Vosa Vakaviti"},"fo":{"name":"Faroese","native":"Føroyskt"},"fr":{"name":"French","native":"Français"},"fy":{"name":"West Frisian","native":"Frysk"},"ga":{"name":"Irish","native":"Gaeilge"},"gd":{"name":"Scottish Gaelic","native":"Gàidhlig"},"gl":{"name":"Galician","native":"Galego"},"gn":{"name":"Guarani","native":"Avañe\'ẽ"},"gu":{"name":"Gujarati","native":"ગુજરાતી"},"gv":{"name":"Manx","native":"Gaelg"},"ha":{"name":"Hausa","native":"هَوُسَ","rtl":1},"he":{"name":"Hebrew","native":"עברית","rtl":1},"hi":{"name":"Hindi","native":"हिन्दी"},"ho":{"name":"Hiri Motu","native":"Hiri Motu"},"hr":{"name":"Croatian","native":"Hrvatski"},"ht":{"name":"Haitian","native":"Krèyol ayisyen"},"hu":{"name":"Hungarian","native":"Magyar"},"hy":{"name":"Armenian","native":"Հայերեն"},"hz":{"name":"Herero","native":"Otsiherero"},"ia":{"name":"Interlingua","native":"Interlingua"},"id":{"name":"Indonesian","native":"Bahasa Indonesia"},"ie":{"name":"Interlingue","native":"Interlingue"},"ig":{"name":"Igbo","native":"Igbo"},"ii":{"name":"Sichuan Yi","native":"ꆇꉙ / 四川彝语"},"ik":{"name":"Inupiak","native":"Iñupiak"},"io":{"name":"Ido","native":"Ido"},"is":{"name":"Icelandic","native":"Íslenska"},"it":{"name":"Italian","native":"Italiano"},"iu":{"name":"Inuktitut","native":"ᐃᓄᒃᑎᑐᑦ"},"ja":{"name":"Japanese","native":"日本語"},"jv":{"name":"Javanese","native":"Basa Jawa"},"ka":{"name":"Georgian","native":"ქართული"},"kg":{"name":"Kongo","native":"KiKongo"},"ki":{"name":"Kikuyu","native":"Gĩkũyũ"},"kj":{"name":"Kuanyama","native":"Kuanyama"},"kk":{"name":"Kazakh","native":"Қазақша"},"kl":{"name":"Greenlandic","native":"Kalaallisut"},"km":{"name":"Cambodian","native":"ភាសាខ្មែរ"},"kn":{"name":"Kannada","native":"ಕನ್ನಡ"},"ko":{"name":"Korean","native":"한국어"},"kr":{"name":"Kanuri","native":"Kanuri"},"ks":{"name":"Kashmiri","native":"कश्मीरी / كشميري","rtl":1},"ku":{"name":"Kurdish","native":"Kurdî / كوردی","rtl":1},"kv":{"name":"Komi","native":"Коми"},"kw":{"name":"Cornish","native":"Kernewek"},"ky":{"name":"Kirghiz","native":"Kırgızca / Кыргызча"},"la":{"name":"Latin","native":"Latina"},"lb":{"name":"Luxembourgish","native":"Lëtzebuergesch"},"lg":{"name":"Ganda","native":"Luganda"},"li":{"name":"Limburgian","native":"Limburgs"},"ln":{"name":"Lingala","native":"Lingála"},"lo":{"name":"Laotian","native":"ລາວ / Pha xa lao"},"lt":{"name":"Lithuanian","native":"Lietuvių"},"lv":{"name":"Latvian","native":"Latviešu"},"mg":{"name":"Malagasy","native":"Malagasy"},"mh":{"name":"Marshallese","native":"Kajin Majel / Ebon"},"mi":{"name":"Maori","native":"Māori"},"mk":{"name":"Macedonian","native":"Македонски"},"ml":{"name":"Malayalam","native":"മലയാളം"},"mn":{"name":"Mongolian","native":"Монгол"},"mo":{"name":"Moldovan","native":"Moldovenească"},"mr":{"name":"Marathi","native":"मराठी"},"ms":{"name":"Malay","native":"Bahasa Melayu"},"mt":{"name":"Maltese","native":"bil-Malti"},"my":{"name":"Burmese","native":"မြန်မာစာ"},"na":{"name":"Nauruan","native":"Dorerin Naoero"},"nd":{"name":"North Ndebele","native":"Sindebele"},"ne":{"name":"Nepali","native":"नेपाली"},"ng":{"name":"Ndonga","native":"Oshiwambo"},"nl":{"name":"Dutch","native":"Nederlands"},"nn":{"name":"Norwegian Nynorsk","native":"Norsk (nynorsk)"},"no":{"name":"Norwegian","native":"Norsk (bokmål / riksmål)"},"nr":{"name":"South Ndebele","native":"isiNdebele"},"nv":{"name":"Navajo","native":"Diné bizaad"},"ny":{"name":"Chichewa","native":"Chi-Chewa"},"oc":{"name":"Occitan","native":"Occitan"},"oj":{"name":"Ojibwa","native":"ᐊᓂᔑᓈᐯᒧᐎᓐ / Anishinaabemowin"},"om":{"name":"Oromo","native":"Oromoo"},"or":{"name":"Oriya","native":"ଓଡ଼ିଆ"},"os":{"name":"Ossetian / Ossetic","native":"Иронау"},"pa":{"name":"Panjabi / Punjabi","native":"ਪੰਜਾਬੀ / पंजाबी / پنجابي"},"pi":{"name":"Pali","native":"Pāli / पाऴि"},"pl":{"name":"Polish","native":"Polski"},"ps":{"name":"Pashto","native":"پښتو","rtl":1},"pt":{"name":"Portuguese","native":"Português"},"qu":{"name":"Quechua","native":"Runa Simi"},"rm":{"name":"Raeto Romance","native":"Rumantsch"},"rn":{"name":"Kirundi","native":"Kirundi"},"ro":{"name":"Romanian","native":"Română"},"ru":{"name":"Russian","native":"Русский"},"rw":{"name":"Rwandi","native":"Kinyarwandi"},"sa":{"name":"Sanskrit","native":"संस्कृतम्"},"sc":{"name":"Sardinian","native":"Sardu"},"sd":{"name":"Sindhi","native":"सिनधि"},"se":{"name":"Northern Sami","native":"Sámegiella"},"sg":{"name":"Sango","native":"Sängö"},"sh":{"name":"Serbo-Croatian","native":"Srpskohrvatski / Српскохрватски"},"si":{"name":"Sinhalese","native":"සිංහල"},"sk":{"name":"Slovak","native":"Slovenčina"},"sl":{"name":"Slovenian","native":"Slovenščina"},"sm":{"name":"Samoan","native":"Gagana Samoa"},"sn":{"name":"Shona","native":"chiShona"},"so":{"name":"Somalia","native":"Soomaaliga"},"sq":{"name":"Albanian","native":"Shqip"},"sr":{"name":"Serbian","native":"Српски"},"ss":{"name":"Swati","native":"SiSwati"},"st":{"name":"Southern Sotho","native":"Sesotho"},"su":{"name":"Sundanese","native":"Basa Sunda"},"sv":{"name":"Swedish","native":"Svenska"},"sw":{"name":"Swahili","native":"Kiswahili"},"ta":{"name":"Tamil","native":"தமிழ்"},"te":{"name":"Telugu","native":"తెలుగు"},"tg":{"name":"Tajik","native":"Тоҷикӣ"},"th":{"name":"Thai","native":"ไทย / Phasa Thai"},"ti":{"name":"Tigrinya","native":"ትግርኛ"},"tk":{"name":"Turkmen","native":"Туркмен / تركمن"},"tl":{"name":"Tagalog / Filipino","native":"Tagalog"},"tn":{"name":"Tswana","native":"Setswana"},"to":{"name":"Tonga","native":"Lea Faka-Tonga"},"tr":{"name":"Turkish","native":"Türkçe"},"ts":{"name":"Tsonga","native":"Xitsonga"},"tt":{"name":"Tatar","native":"Tatarça"},"tw":{"name":"Twi","native":"Twi"},"ty":{"name":"Tahitian","native":"Reo Mā`ohi"},"ug":{"name":"Uyghur","native":"Uyƣurqə / ئۇيغۇرچە"},"uk":{"name":"Ukrainian","native":"Українська"},"ur":{"name":"Urdu","native":"اردو","rtl":1},"uz":{"name":"Uzbek","native":"Ўзбек"},"ve":{"name":"Venda","native":"Tshivenḓa"},"vi":{"name":"Vietnamese","native":"Tiếng Việt"},"vo":{"name":"Volapük","native":"Volapük"},"wa":{"name":"Walloon","native":"Walon"},"wo":{"name":"Wolof","native":"Wollof"},"xh":{"name":"Xhosa","native":"isiXhosa"},"yi":{"name":"Yiddish","native":"ייִדיש","rtl":1},"yo":{"name":"Yoruba","native":"Yorùbá"},"za":{"name":"Zhuang","native":"Cuengh / Tôô / 壮语"},"zh":{"name":"Chinese","native":"中文"},"zu":{"name":"Zulu","native":"isiZulu"}}')},function(n,a,e){(function(n,i){var t;function o(n){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}
/*! https://mths.be/punycode v1.4.1 by @mathias */!function(r){var c="object"==o(a)&&a&&!a.nodeType&&a,m="object"==o(n)&&n&&!n.nodeType&&n,l="object"==(void 0===i?"undefined":o(i))&&i;l.global!==l&&l.window!==l&&l.self!==l||(r=l);var u,F,U=2147483647,s=36,g=1,v=26,p=38,h=700,j=72,y=128,E="-",A=/^xn--/,S=/[^\x20-\x7E]/,d=/[\x2E\u3002\uFF0E\uFF61]/g,C={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},f=s-g,b=Math.floor,k=String.fromCharCode;function N(n){throw new RangeError(C[n])}function B(n,a){for(var e=n.length,i=[];e--;)i[e]=a(n[e]);return i}function M(n,a){var e=n.split("@"),i="";return 1<e.length&&(i=e[0]+"@",n=e[1]),i+B((n=n.replace(d,".")).split("."),a).join(".")}function D(n){for(var a,e,i=[],t=0,o=n.length;t<o;)55296<=(a=n.charCodeAt(t++))&&a<=56319&&t<o?56320==(64512&(e=n.charCodeAt(t++)))?i.push(((1023&a)<<10)+(1023&e)+65536):(i.push(a),t--):i.push(a);return i}function P(n){return B(n,function(n){var a="";return 65535<n&&(a+=k((n-=65536)>>>10&1023|55296),n=56320|1023&n),a+k(n)}).join("")}function T(n,a){return n+22+75*(n<26)-((0!=a)<<5)}function R(n,a,e){var i=0;for(n=e?b(n/h):n>>1,n+=b(n/a);f*v>>1<n;i+=s)n=b(n/f);return b(i+(f+1)*n/(n+p))}function K(n){var a,e,i,t,o,r,c,m,l,u,F,p=[],h=n.length,A=0,S=y,d=j;for((e=n.lastIndexOf(E))<0&&(e=0),i=0;i<e;++i)128<=n.charCodeAt(i)&&N("not-basic"),p.push(n.charCodeAt(i));for(t=0<e?e+1:0;t<h;){for(o=A,r=1,c=s;h<=t&&N("invalid-input"),F=n.charCodeAt(t++),(s<=(m=F-48<10?F-22:F-65<26?F-65:F-97<26?F-97:s)||m>b((U-A)/r))&&N("overflow"),A+=m*r,!(m<(l=c<=d?g:d+v<=c?v:c-d));c+=s)r>b(U/(u=s-l))&&N("overflow"),r*=u;d=R(A-o,a=p.length+1,0==o),b(A/a)>U-S&&N("overflow"),S+=b(A/a),A%=a,p.splice(A++,0,S)}return P(p)}function G(n){var a,e,i,t,o,r,c,m,l,u,F,p,h,A,S,d=[];for(p=(n=D(n)).length,a=y,o=j,r=e=0;r<p;++r)(F=n[r])<128&&d.push(k(F));for(i=t=d.length,t&&d.push(E);i<p;){for(c=U,r=0;r<p;++r)a<=(F=n[r])&&F<c&&(c=F);for(c-a>b((U-e)/(h=i+1))&&N("overflow"),e+=(c-a)*h,a=c,r=0;r<p;++r)if((F=n[r])<a&&++e>U&&N("overflow"),F==a){for(m=e,l=s;!(m<(u=l<=o?g:o+v<=l?v:l-o));l+=s)S=m-u,A=s-u,d.push(k(T(u+S%A,0))),m=b(S/A);d.push(k(T(m,0))),o=R(e,h,i==t),e=0,++i}++e,++a}return d.join("")}if(u={version:"1.4.1",ucs2:{decode:D,encode:P},decode:K,encode:G,toASCII:function(n){return M(n,function(n){return S.test(n)?"xn--"+G(n):n})},toUnicode:function(n){return M(n,function(n){return A.test(n)?K(n.slice(4).toLowerCase()):n})}},"object"==o(e(0))&&e(0))void 0===(t=function(){return u}.call(a,e,a,n))||(n.exports=t);else if(c&&m)if(n.exports==c)m.exports=u;else for(F in u)u.hasOwnProperty(F)&&(c[F]=u[F]);else r.punycode=u}(this)}).call(this,e(7)(n),e(8))},function(n,a){n.exports=function(n){return n.webpackPolyfill||(n.deprecate=function(){},n.paths=[],n.children||(n.children=[]),Object.defineProperty(n,"loaded",{enumerable:!0,get:function(){return n.l}}),Object.defineProperty(n,"id",{enumerable:!0,get:function(){return n.i}}),n.webpackPolyfill=1),n}},function(n,a){function e(n){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}var i;i=function(){return this}();try{i=i||new Function("return this")()}catch(n){"object"===("undefined"==typeof window?"undefined":e(window))&&(i=window)}n.exports=i}],n.c=e,n.d=function(a,e,i){n.o(a,e)||Object.defineProperty(a,e,{enumerable:!0,get:i})},n.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},n.t=function(a,e){if(1&e&&(a=n(a)),8&e)return a;if(4&e&&"object"==typeof a&&a&&a.__esModule)return a;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:a}),2&e&&"string"!=typeof a)for(var t in a)n.d(i,t,function(n){return a[n]}.bind(null,t));return i},n.n=function(a){var e=a&&a.__esModule?function(){return a.default}:function(){return a};return n.d(e,"a",e),e},n.o=function(n,a){return Object.prototype.hasOwnProperty.call(n,a)},n.p="",n(n.s=1);function n(i){if(e[i])return e[i].exports;var t=e[i]={i:i,l:!1,exports:{}};return a[i].call(t.exports,t,t.exports,n),t.l=!0,t.exports}var a,e});

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}


/***/ }),

/***/ "./node_modules/jump.js/dist/jump.module.js":
/*!**************************************************!*\
  !*** ./node_modules/jump.js/dist/jump.module.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Robert Penner's easeInOutQuad

// find the rest of his easing functions here: http://robertpenner.com/easing/
// find them exported for ES6 consumption here: https://github.com/jaxgeller/ez.js

var easeInOutQuad = function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var jumper = function jumper() {
  // private variable cache
  // no variables are created during a jump, preventing memory leaks

  var element = void 0; // element to scroll to                   (node)

  var start = void 0; // where scroll starts                    (px)
  var stop = void 0; // where scroll stops                     (px)

  var offset = void 0; // adjustment from the stop position      (px)
  var easing = void 0; // easing function                        (function)
  var a11y = void 0; // accessibility support flag             (boolean)

  var distance = void 0; // distance of scroll                     (px)
  var duration = void 0; // scroll duration                        (ms)

  var timeStart = void 0; // time scroll started                    (ms)
  var timeElapsed = void 0; // time spent scrolling thus far          (ms)

  var next = void 0; // next scroll position                   (px)

  var callback = void 0; // to call when done scrolling            (function)

  // scroll position helper

  function location() {
    return window.scrollY || window.pageYOffset;
  }

  // element offset helper

  function top(element) {
    return element.getBoundingClientRect().top + start;
  }

  // rAF loop helper

  function loop(timeCurrent) {
    // store time scroll started, if not started already
    if (!timeStart) {
      timeStart = timeCurrent;
    }

    // determine time spent scrolling so far
    timeElapsed = timeCurrent - timeStart;

    // calculate next scroll position
    next = easing(timeElapsed, start, distance, duration);

    // scroll to it
    window.scrollTo(0, next);

    // check progress
    timeElapsed < duration ? window.requestAnimationFrame(loop) // continue scroll loop
    : done(); // scrolling is done
  }

  // scroll finished helper

  function done() {
    // account for rAF time rounding inaccuracies
    window.scrollTo(0, start + distance);

    // if scrolling to an element, and accessibility is enabled
    if (element && a11y) {
      // add tabindex indicating programmatic focus
      element.setAttribute('tabindex', '-1');

      // focus the element
      element.focus();
    }

    // if it exists, fire the callback
    if (typeof callback === 'function') {
      callback();
    }

    // reset time for next jump
    timeStart = false;
  }

  // API

  function jump(target) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // resolve options, or use defaults
    duration = options.duration || 1000;
    offset = options.offset || 0;
    callback = options.callback; // "undefined" is a suitable default, and won't be called
    easing = options.easing || easeInOutQuad;
    a11y = options.a11y || false;

    // cache starting position
    start = location();

    // resolve target
    switch (typeof target === 'undefined' ? 'undefined' : _typeof(target)) {
      // scroll from current position
      case 'number':
        element = undefined; // no element to scroll to
        a11y = false; // make sure accessibility is off
        stop = start + target;
        break;

      // scroll to element (node)
      // bounding rect is relative to the viewport
      case 'object':
        element = target;
        stop = top(element);
        break;

      // scroll to element (selector)
      // bounding rect is relative to the viewport
      case 'string':
        element = document.querySelector(target);
        stop = top(element);
        break;
    }

    // resolve scroll distance, accounting for offset
    distance = stop - start + offset;

    // resolve duration
    switch (_typeof(options.duration)) {
      // number in ms
      case 'number':
        duration = options.duration;
        break;

      // function passed the distance of the scroll
      case 'function':
        duration = options.duration(distance);
        break;
    }

    // start the loop
    window.requestAnimationFrame(loop);
  }

  // expose only the jump method
  return jump;
};

// export singleton

var singleton = jumper();

/* harmony default export */ __webpack_exports__["default"] = (singleton);


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var countries_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! countries-list */ "./node_modules/countries-list/dist/index.es5.min.js");
/* harmony import */ var countries_list__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(countries_list__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jump_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jump.js */ "./node_modules/jump.js/dist/jump.module.js");
/* harmony import */ var _makeElement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./makeElement.js */ "./resources/js/makeElement.js");




var selectCountry = document.querySelector('.country-list');
var fromCountry = document.getElementById('from-country');
var toCountry = document.getElementById('to-country');
var fromCity = document.getElementById('from-city');
var toCity = document.getElementById('to-city');
setCountryList(); ////shipment object

var shipment = {
  from: {
    country: "",
    city: "",
    state: "",
    zipcode: "",
    address: "",
    name: "",
    email: "",
    phone: ""
  },
  to: {
    country: "",
    city: "",
    state: "",
    zipcode: "",
    address: "",
    name: "",
    email: "",
    phone: ""
  },
  item: [],
  details: "",
  status: 0
};
var boxes = [];

function setCountryList() {
  var c = countries_list__WEBPACK_IMPORTED_MODULE_0___default.a.countries;

  for (var C in c) {
    var option = document.createElement('option');
    option.value = C;
    option.innerHTML = "".concat(c[C].name);
    selectCountry.appendChild(option);
  }
}

var blinker = document.querySelector('.blinker');
var blinkTriggers = document.getElementsByClassName("blink-trigger");
var shipSlogan = document.getElementById('ship-slogan');
Array.prototype.forEach.call(blinkTriggers, function (t) {
  t.addEventListener('click', function () {
    var bt = t.getAttribute('blinker-target');
    var target = document.getElementById(bt);
    var source = document.getElementById(t.getAttribute('blinker-from'));

    switch (bt) {
      case 'blinker-item-2':
        shipSlogan.classList.remove('hide');
        toItem2();
        break;

      case 'blinker-item-3':
        shipSlogan.classList.add('hide');
        changeView();
        break;

      case 'blinker-item-4':
        summaryBoxes();
        summaryCountries();
        changeView();
        Object(jump_js__WEBPACK_IMPORTED_MODULE_2__["default"])('#summary-2', {
          offset: -100
        });
        break;

      default:
        break;
    }

    function toItem2() {
      if (shipment.status == 2) {
        shipment.from.country = fromCountry.value;
        shipment.to.country = toCountry.value;
        shipment.from.city = fromCity.value;
        shipment.to.city = toCity.value;
        changeView();
      } else {
        if (toCity.value.length > 2 && fromCity.value.length > 2) {
          shipment.from.country = fromCountry.value;
          shipment.to.country = toCountry.value;
          shipment.from.city = fromCity.value;
          shipment.to.city = toCity.value;
          changeView();
        }
      }
    }

    function changeView() {
      source.classList.add('hide');
      source.classList.remove('show');
      setTimeout(function () {
        source.classList.add('throw-off');
        target.classList.remove('throw-off');
        target.classList.add('show');
        target.classList.remove('hide');
      }, 500);
    }
  });
});
document.getElementById('add-box').addEventListener('click', function (e) {
  e.preventDefault();
  addBox();
});
addBox();

function addBox() {
  var row = document.createElement('div');
  var col1 = document.createElement('div');
  var col2 = document.createElement('div');
  var col3 = document.createElement('div');
  var col4 = document.createElement('div');
  var col5 = document.createElement('div');
  var fg1 = document.createElement('div');
  var fg2 = document.createElement('div');
  var fg3 = document.createElement('div');
  var fg4 = document.createElement('div');
  var fg5 = document.createElement('div');
  var weight = document.createElement('input');
  var length = document.createElement('input');
  var width = document.createElement('input');
  var height = document.createElement('input');
  var s1 = document.createElement('select');
  var optT1 = document.createElement('option');
  var optT2 = document.createElement('option');
  var optT3 = document.createElement('option');
  optT1.selected = true;
  optT1.disabled = true;
  optT1.value = "";
  optT1.innerHTML = "Shipment type";
  optT2.value = "Box";
  optT2.innerHTML = "Box";
  optT3.value = "Document";
  optT3.innerHTML = "Document";
  s1.classList.add('form-control', 'form-control-sm', 'input-1', 'gray', 'd-inline-block');
  weight.setAttribute('type', 'text');
  weight.setAttribute('placeholder', 'weight');
  weight.classList.add('form-control', 'form-control-sm', 'input-1', 'gray');
  length.setAttribute('type', 'text');
  length.setAttribute('placeholder', 'length');
  length.classList.add('form-control', 'form-control-sm', 'input-1', 'gray');
  width.setAttribute('type', 'text');
  width.setAttribute('placeholder', 'width');
  width.classList.add('form-control', 'form-control-sm', 'input-1', 'gray');
  height.setAttribute('type', 'text');
  height.setAttribute('placeholder', 'height');
  height.classList.add('form-control', 'form-control-sm', 'input-1', 'gray');
  weight.addEventListener('input', function (e) {
    e.target.value = formatBox('weight', numbers(e.target.value));
  });
  length.addEventListener('input', function (e) {
    e.target.value = formatBox('dimension', numbers(e.target.value));
  });
  width.addEventListener('input', function (e) {
    e.target.value = formatBox('dimension', numbers(e.target.value));
  });
  height.addEventListener('input', function (e) {
    e.target.value = formatBox('dimension', numbers(e.target.value));
  });
  row.classList.add('row', 'mt-3');
  col1.classList.add('col-md-3');
  col2.classList.add('col-md-2');
  col3.classList.add('col-md-2');
  col4.classList.add('col-md-2');
  col5.classList.add('col-md-2');
  fg1.classList.add('form-group');
  fg2.classList.add('form-group');
  fg3.classList.add('form-group');
  fg4.classList.add('form-group');
  fg5.classList.add('form-group');
  appendChilds(s1, [optT1, optT2, optT3]);
  fg1.appendChild(s1);
  col1.appendChild(fg1);
  row.appendChild(col1);
  fg2.appendChild(weight);
  col2.appendChild(fg2);
  row.appendChild(col2);
  fg3.appendChild(length);
  col3.appendChild(fg3);
  row.appendChild(col3);
  fg4.appendChild(width);
  col4.appendChild(fg4);
  row.appendChild(col4);
  fg5.appendChild(height);
  col5.appendChild(fg5);
  row.appendChild(col5);
  document.getElementById('box-area').appendChild(row);
  var box = {
    s: s1,
    ww: weight,
    wd: width,
    ld: length,
    hd: height
  };
  boxes.push(box);
}

function summaryBoxes() {
  var summary1 = document.getElementById('summary-1');
  var x = summary1.children;

  if (x.length > 1) {
    do {
      summary1.removeChild(x[1]);
    } while (x.length > 1);
  }

  var total = 0;
  var usedUnit = "";
  boxes.forEach(function (box) {
    if (box.ww.value != "") {
      var flex = document.createElement('div');
      var flex1 = document.createElement('div');
      var flex2 = document.createElement('div');
      var flex3 = document.createElement('div');
      var flex4 = document.createElement('div');
      var flex5 = document.createElement('div');
      flex.classList.add('d-flex', 'justify-content-around', 'mb-4');
      flex1.classList.add('summary1-item');
      flex2.classList.add('summary1-item');
      flex3.classList.add('summary1-item');
      flex4.classList.add('summary1-item');
      flex5.classList.add('summary1-item');
      flex1.innerHTML = box.s.value;
      flex2.innerHTML = box.ww.value;
      flex3.innerHTML = box.wd.value;
      flex4.innerHTML = box.ld.value;
      flex5.innerHTML = box.hd.value;
      total = total + Number(numbers(box.ww.value));
      usedUnit = letters(box.ww.value);
      appendChilds(flex, [flex1, flex2, flex3, flex4, flex5]);
      summary1.appendChild(flex);
    }

    document.getElementById('total-weight').innerHTML = "".concat(total, " ").concat(usedUnit);
  });
}

addItems();

function addItems() {
  var itemArea = document.getElementById('item-area');
  var row = Object(_makeElement_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
    classes: "box-row"
  });
  var fg1 = Object(_makeElement_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
    classes: "form-group qty"
  });
  var fg2 = Object(_makeElement_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
    classes: "form-group item p-3"
  });
  var btnArea = Object(_makeElement_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
    classes: "button"
  });
  var ico = Object(_makeElement_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
    el: "i",
    classes: "fas fa-trash"
  });
  var qty = Object(_makeElement_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
    el: "input",
    classes: "input-1 box-inputs",
    attrs: ['placeholder="Qty"']
  });
  var itm = Object(_makeElement_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
    el: "input",
    classes: "input-1 box-inputs",
    attrs: ['placeholder="item"']
  });
  var btn = Object(_makeElement_js__WEBPACK_IMPORTED_MODULE_3__["default"])({
    el: "button",
    classes: "btn btn-outline-dark btn-sm",
    event: [{
      type: 'click',
      method: function method() {
        itemArea.removeChild(row);
      }
    }]
  });
  fg1.appendChild(qty);
  fg2.appendChild(itm);
  btn.appendChild(ico);
  btnArea.appendChild(btn);
  appendChilds(row, [fg1, fg2, btnArea]);
  itemArea.appendChild(row);
}

function appendChilds(p, C) {
  C.forEach(function (c) {
    p.appendChild(c);
  });
} /////front-end validation and saving data


fromCity.addEventListener('input', function (e) {
  var stat = shipment.status;
  var x = e.target.value;
  var s = letters(x);
  e.target.value = s;

  if (s.length > 2) {
    if (stat < 2) {
      shipment.status += 1;
    }
  } else {
    if (stat != 0) {
      shipment.status -= 1;
    }
  }
});
toCity.addEventListener('input', function (e) {
  var stat = shipment.status;
  var x = e.target.value;
  var s = letters(x);
  e.target.value = s;

  if (s.length > 2) {
    if (stat < 2) {
      shipment.status += 1;
    }
  } else {
    if (stat != 0) {
      shipment.status -= 1;
    }
  }
});

function numbers(s) {
  var x = s.replace(/[^0-9]/g, '');
  return x;
}

function letters(s) {
  var x = s.replace(/[^a-z\s]/i, '');
  return x;
}

function validEmail(s) {
  var validMail = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

  if (validMail.test(s.trim())) {
    return true;
  } else {
    return false;
  }
}

document.getElementById('box-units').addEventListener('change', function (e) {
  formatBoxes(e.target.value);
});

function formatBox(type, v) {
  var unit = document.getElementById('box-units').value;

  if (type == 'weight') {
    switch (unit) {
      case 'metric':
        return "".concat(v, " kg");
        break;

      case 'english':
        return "".concat(v, " lb");
        break;

      default:
        break;
    }
  } else if (type == 'dimension') {
    switch (unit) {
      case 'metric':
        return "".concat(v, " cm");
        break;

      case 'english':
        return "".concat(v, " in");
        break;

      default:
        break;
    }
  }
}

function formatBoxes(v) {
  var unit = {
    w: "kg",
    d: "cm"
  };

  if (v == 'english') {
    unit.w = "lb";
    unit.d = "in";
  }

  boxes.forEach(function (box) {
    box.ww.value = "".concat(numbers(box.ww.value), " ").concat(unit.w);
    box.wd.value = "".concat(numbers(box.wd.value), " ").concat(unit.d);
    box.ld.value = "".concat(numbers(box.ld.value), " ").concat(unit.d);
    box.hd.value = "".concat(numbers(box.hd.value), " ").concat(unit.d);
  });
}

function summaryCountries() {
  var cf = countries_list__WEBPACK_IMPORTED_MODULE_0___default.a.countries[shipment.from.country].name;
  var ct = countries_list__WEBPACK_IMPORTED_MODULE_0___default.a.countries[shipment.to.country].name;
  document.getElementById('summary-from-country').innerHTML = "From ".concat(cf);
  document.getElementById('summary-to-country').innerHTML = "To ".concat(ct);
  document.getElementById('summary-from-city').innerHTML = shipment.from.city;
  document.getElementById('summary-to-city').innerHTML = shipment.to.city;
}

document.getElementById('summary-2-next').addEventListener('click', function (e) {
  var z = document.getElementById('head1');
  var y = document.getElementById('summary-2');
  var x = e.target;

  if (x.dataset.state == 'next') {
    Array.prototype.forEach.call(document.getElementsByClassName('on-work'), function (w) {
      return w.disabled = true;
    });
    x.innerHTML = 'edit';
    x.classList.add('btn-outline-dark', 'btn-rounded');
    x.classList.remove('btn-blue', 'white');
    y.classList.add('summary-done', 'yellow');
    y.classList.remove('summary-working');
    z.classList.add('on-hide');
    x.dataset.state = 'edit';
    document.getElementById('summary-3').classList.add('show');
    Object(jump_js__WEBPACK_IMPORTED_MODULE_2__["default"])('#summary-3', {
      offset: -100
    });
  } else {
    Array.prototype.forEach.call(document.getElementsByClassName('on-work'), function (w) {
      return w.disabled = false;
    });
    x.innerHTML = 'next';
    x.classList.remove('btn-outline-dark', 'btn-rounded');
    x.classList.add('btn-blue');
    y.classList.remove('summary-done', 'yellow');
    y.classList.add('summary-working', 'white');
    z.classList.remove('on-hide');
    x.dataset.state = 'next';
  }
});
var addItemBtn = document.getElementById('add-item');
document.getElementById('summary-3-next').addEventListener('click', function (e) {
  var itemArea = document.getElementById('item-area');
  var z = document.getElementById('head2');
  var y = document.getElementById('summary-3');
  var x = e.target;

  if (x.dataset.state == 'next') {
    Array.prototype.forEach.call(document.getElementsByClassName('box-inputs'), function (w) {
      return w.disabled = true;
    });
    x.innerHTML = 'edit';
    x.classList.add('btn-outline-dark', 'btn-rounded');
    x.classList.remove('btn-blue', 'white');
    y.classList.add('summary-done', 'yellow');
    y.classList.remove('summary-working');
    z.classList.add('on-hide');
    x.dataset.state = 'edit';
    document.getElementById('summary-4').classList.add('show', 'summary-final');
    document.getElementById('summary-4').classList.remove('summary-working');
    Object(jump_js__WEBPACK_IMPORTED_MODULE_2__["default"])('#summary-4', {
      offset: -100
    });
    Array.prototype.forEach.call(itemArea.getElementsByClassName('btn'), function (b) {
      return b.disabled = true;
    });
    addItemBtn.disabled = true;
  } else {
    Array.prototype.forEach.call(document.getElementsByClassName('box-inputs'), function (w) {
      return w.disabled = false;
    });
    x.innerHTML = 'next';
    x.classList.remove('btn-outline-dark', 'btn-rounded');
    x.classList.add('btn-blue');
    y.classList.remove('summary-done', 'yellow');
    y.classList.add('summary-working', 'white');
    z.classList.remove('on-hide');
    x.dataset.state = 'next';
    document.getElementById('summary-4').classList.remove('summary-final');
    document.getElementById('summary-4').classList.add('summary-working');
    Array.prototype.forEach.call(itemArea.getElementsByClassName('btn'), function (b) {
      return b.disabled = false;
    });
    addItemBtn.disabled = false;
  }
});
addItemBtn.addEventListener('click', addItems);
document.getElementById('send').addEventListener('click', function () {
  var URL = document.getElementById('shipping').dataset.url;
  console.log(URL);
  axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(URL, {}).then(function (response) {
    console.log(response);
  })["catch"](function (error) {
    console.log(error);
  });
});

/***/ }),

/***/ "./resources/js/makeElement.js":
/*!*************************************!*\
  !*** ./resources/js/makeElement.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return makeElement; });
function makeElement(p) {
  var option = {
    el: "div",
    classes: "",
    attrs: "",
    value: "",
    event: ""
  };
  Object.assign(option, p);
  var e = document.createElement(option.el); //add class names
  //option.classes should be a string

  if (option.classes != "") {
    var classes = option.classes.split(" ");
    classes.forEach(function (c) {
      e.classList.add(c);
    });
  } //add attributes
  //option.attrs should be an array


  if (option.attrs != "") {
    var attributes = option.attrs;
    attributes.forEach(function (a) {
      var attr = a.split("=");
      e.setAttribute(attr[0], attr[1]);
    });
  } //add innerHTML
  //option.value should be a string


  if (option.value != "") {
    e.innerHTML = option.value;
  } //add event listeners
  //option.event should be an array


  if (option.event != "") {
    option.event.forEach(function (ev) {
      e.addEventListener(ev.type, ev.method);
    });
  }

  return e;
}

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/ireneo/Projects/swiftfoxit-easyshipping/resources/js/app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! /home/ireneo/Projects/swiftfoxit-easyshipping/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });