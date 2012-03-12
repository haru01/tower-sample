var Tower, filter, key, module, specialProperties, _fn, _fn2, _fn3, _fn4, _i, _j, _k, _l, _len, _len2, _len3, _len4, _len5, _m, _ref, _ref2, _ref3, _ref4, _ref5,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
  __slice = Array.prototype.slice,
  _this = this,
  __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

window.global || (window.global = window);

module = global.module || {};

global.Tower = Tower = {};

Tower.version = "0.3.0";

Tower.logger = console;

require('./support');

require('./application');

require('./client/application');

require('./store');

require('./client/store');

require('./model');

require('./view');

require('./client/view');

require('./controller');

require('./client/controller');

require('./http');

require('./middleware');

Tower.Controller = (function(_super) {

  __extends(Controller, _super);

  Controller.include(Tower.Support.Callbacks);

  Controller.extend(Tower.Support.EventEmitter);

  Controller.include(Tower.Support.EventEmitter);

  Controller.instance = function() {
    return this._instance || (this._instance = new this);
  };

  Controller.metadata = function() {
    return this._metadata || (this._metadata = {});
  };

  function Controller() {
    this.constructor._instance = this;
    this.headers = {};
    this.status = 200;
    this.request = null;
    this.response = null;
    this.params = {};
    this.query = {};
    this.resourceName = this.constructor.resourceName();
    this.resourceType = this.constructor.resourceType();
    this.collectionName = this.constructor.collectionName();
    this.formats = _.keys(this.constructor.mimes());
    if (this.constructor._belongsTo) {
      this.hasParent = true;
    } else {
      this.hasParent = false;
    }
  }

  return Controller;

})(Tower.Class);

require('./controller/callbacks');

require('./controller/helpers');

require('./controller/instrumentation');

require('./controller/params');

require('./controller/redirecting');

require('./controller/rendering');

require('./controller/resourceful');

require('./controller/responder');

require('./controller/responding');

Tower.Controller.include(Tower.Controller.Callbacks);

Tower.Controller.include(Tower.Controller.Helpers);

Tower.Controller.include(Tower.Controller.Instrumentation);

Tower.Controller.include(Tower.Controller.Params);

Tower.Controller.include(Tower.Controller.Redirecting);

Tower.Controller.include(Tower.Controller.Rendering);

Tower.Controller.include(Tower.Controller.Resourceful);

Tower.Controller.include(Tower.Controller.Responding);

Tower.HTTP = {};

require('./http/agent');

require('./http/cookies');

require('./http/param');

require('./http/route');

require('./http/request');

require('./http/response');

require('./http/url');

Tower.Model = (function(_super) {

  __extends(Model, _super);

  Model.configure = function(object) {
    this.config || (this.config = {});
    if (typeof object === "function") object = object.call(this);
    _.extend(this.config, object);
    return this;
  };

  Model.defaults = function(object) {
    var key, value;
    for (key in object) {
      value = object[key];
      this["default"](key, value);
    }
    return this._defaults;
  };

  Model["default"] = function(key, value) {
    this._defaults || (this._defaults = {});
    return this._defaults[key] = value;
  };

  function Model(attrs, options) {
    this.initialize(attrs, options);
  }

  Model.prototype.initialize = function(attrs, options) {
    var attributes, definition, definitions, key, name, value, _results;
    if (attrs == null) attrs = {};
    if (options == null) options = {};
    definitions = this.constructor.fields();
    attributes = {};
    for (name in definitions) {
      definition = definitions[name];
      if (!attrs.hasOwnProperty(name)) {
        attributes[name] = definition.defaultValue(this);
      }
    }
    this.attributes = attributes;
    this.changes = {};
    this.errors = {};
    this.readOnly = options.hasOwnProperty("readOnly") ? options.readOnly : false;
    this.persistent = options.hasOwnProperty("persistent") ? options.persisted : false;
    _results = [];
    for (key in attrs) {
      value = attrs[key];
      _results.push(this.attributes[key] = value);
    }
    return _results;
  };

  return Model;

})(Tower.Class);

require('./model/scope');

require('./model/criteria');

require('./model/dirty');

require('./model/conversion');

require('./model/inheritance');

require('./model/relation');

require('./model/relations');

require('./model/attribute');

require('./model/attributes');

require('./model/persistence');

require('./model/scopes');

require('./model/serialization');

require('./model/validator');

require('./model/validations');

require('./model/timestamp');

require('./model/locale/en');

Tower.Model.include(Tower.Support.Callbacks);

Tower.Model.include(Tower.Model.Conversion);

Tower.Model.include(Tower.Model.Dirty);

Tower.Model.include(Tower.Model.Criteria);

Tower.Model.include(Tower.Model.Scopes);

Tower.Model.include(Tower.Model.Persistence);

Tower.Model.include(Tower.Model.Inheritance);

Tower.Model.include(Tower.Model.Serialization);

Tower.Model.include(Tower.Model.Relations);

Tower.Model.include(Tower.Model.Validations);

Tower.Model.include(Tower.Model.Attributes);

Tower.Model.include(Tower.Model.Timestamp);

require('underscore.logger');

global._ = require('underscore');

_.mixin(require('underscore.string'));

Tower.version = JSON.parse(require("fs").readFileSync(require("path").normalize("" + __dirname + "/../../package.json"))).version;

Tower.logger = _console;

require('./support');

require('./application');

require('./server/application');

require('./store');

require('./server/store');

require('./model');

require('./view');

require('./controller');

require('./server/controller');

require('./http');

require('./middleware');

require('./server/middleware');

require('./server/command');

require('./server/generator');

Tower.Model.defaultStore = Tower.Store.MongoDB;

Tower.View.store(new Tower.Store.FileSystem(["app/views"]));

Tower.root = process.cwd();

Tower.publicPath = process.cwd() + "/public";

Tower.publicCacheDuration = 60 * 1000;

Tower.sessionSecret = "tower-session-secret";

Tower.cookieSecret = "tower-cookie-secret";

Tower.render = function(string, options) {
  if (options == null) options = {};
  return require("mint").render(options.type, string, options);
};

Tower.domain = "localhost";

Tower.date = function() {
  return require('moment').apply(null, arguments)._d;
};

Tower.run = function(argv) {
  return (new Tower.Command.Server(argv)).run();
};

Tower.Support = {};

require('./support/array');

require('./support/callbacks');

require('./support/class');

require('./support/eventEmitter');

require('./support/i18n');

require('./support/number');

require('./support/object');

require('./support/regexp');

require('./support/string');

require('./support/url');

require('./support/locale/en');

Tower.View = (function(_super) {

  __extends(View, _super);

  View.extend({
    cache: {},
    engine: "coffee",
    prettyPrint: false,
    loadPaths: ["app/views"],
    componentSuffix: "widget",
    hintClass: "hint",
    hintTag: "figure",
    labelClass: "label",
    requiredClass: "required",
    requiredAbbr: "*",
    requiredTitle: "Required",
    errorClass: "error",
    errorTag: "output",
    validClass: null,
    optionalClass: "optional",
    optionalAbbr: "",
    optionalTitle: "Optional",
    labelMethod: "humanize",
    labelAttribute: "toLabel",
    validationMaxLimit: 255,
    defaultTextFieldSize: null,
    defaultTextAreaWidth: 300,
    allFieldsRequiredByDefault: true,
    fieldListTag: "ol",
    fieldListClass: "fields",
    fieldTag: "li",
    separator: "-",
    breadcrumb: " - ",
    includeBlankForSelectByDefault: true,
    collectionLabelMethods: ["toLabel", "displayName", "fullName", "name", "title", "toString"],
    i18nLookupsByDefault: true,
    escapeHtmlEntitiesInHintsAndLabels: false,
    renameNestedAttributes: true,
    inlineValidations: true,
    autoIdForm: true,
    fieldsetClass: "fieldset",
    fieldClass: "field",
    validateClass: "validate",
    legendClass: "legend",
    formClass: "form",
    idEnabledOn: ["input", "field"],
    widgetsPath: "shared/widgets",
    navClass: "list-item",
    includeAria: true,
    activeClass: "active",
    navTag: "li",
    termsTag: "dl",
    termClass: "term",
    termKeyClass: "key",
    termValueClass: "value",
    hintIsPopup: false,
    listTag: "ul",
    pageHeaderId: "header",
    pageTitleId: "title",
    autoIdNav: false,
    pageSubtitleId: "subtitle",
    widgetClass: "widget",
    headerClass: "header",
    titleClass: "title",
    subtitleClass: "subtitle",
    contentClass: "content",
    defaultHeaderLevel: 3,
    termSeparator: ":",
    richInput: false,
    submitFieldsetClass: "submit-fieldset",
    addLabel: "+",
    removeLabel: "-",
    cycleFields: false,
    alwaysIncludeHintTag: false,
    alwaysIncludeErrorTag: true,
    requireIfValidatesPresence: true,
    localizeWithNamespace: false,
    localizeWithNestedModel: false,
    localizeWithInheritance: true,
    defaultComponentHeaderLevel: 3,
    helpers: [],
    metaTags: ["description", "keywords", "author", "copyright", "category", "robots"],
    store: function(store) {
      if (store) this._store = store;
      return this._store || (this._store = new Tower.Store.Memory({
        name: "view"
      }));
    },
    renderers: {}
  });

  function View(context) {
    if (context == null) context = {};
    this._context = context;
  }

  return View;

})(Tower.Class);

require('./view/helpers');

require('./view/rendering');

require('./view/component');

require('./view/table');

require('./view/form');

require('./view/helpers/assetHelper');

require('./view/helpers/componentHelper');

require('./view/helpers/elementHelper');

require('./view/helpers/headHelper');

require('./view/helpers/renderingHelper');

require('./view/helpers/stringHelper');

Tower.View.include(Tower.View.Rendering);

Tower.View.include(Tower.View.Helpers);

Tower.View.include(Tower.View.AssetHelper);

Tower.View.include(Tower.View.ComponentHelper);

Tower.View.include(Tower.View.HeadHelper);

Tower.View.include(Tower.View.RenderingHelper);

Tower.View.include(Tower.View.StringHelper);

Tower.View.helpers.push(Tower.View.AssetHelper);

Tower.View.helpers.push(Tower.View.ComponentHelper);

Tower.View.helpers.push(Tower.View.HeadHelper);

Tower.View.helpers.push(Tower.View.RenderingHelper);

Tower.View.helpers.push(Tower.View.StringHelper);

require('./controller/elements');

require('./controller/events');

require('./controller/handlers');

Tower.Controller.include(Tower.Controller.Elements);

Tower.Controller.include(Tower.Controller.Events);

Tower.Controller.include(Tower.Controller.Handlers);

$.fn.serializeParams = function(coerce) {
  return $.serializeParams($(this).serialize(), coerce);
};

$.serializeParams = function(params, coerce) {
  var array, coerce_types, cur, i, index, item, key, keys, keys_last, obj, param, val, _len;
  obj = {};
  coerce_types = {
    "true": !0,
    "false": !1,
    "null": null
  };
  array = params.replace(/\+/g, " ").split("&");
  for (index = 0, _len = array.length; index < _len; index++) {
    item = array[index];
    param = item.split("=");
    key = decodeURIComponent(param[0]);
    val = void 0;
    cur = obj;
    i = 0;
    keys = key.split("][");
    keys_last = keys.length - 1;
    if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
      keys[keys_last] = keys[keys_last].replace(/\]$/, "");
      keys = keys.shift().split("[").concat(keys);
      keys_last = keys.length - 1;
    } else {
      keys_last = 0;
    }
    if (param.length === 2) {
      val = decodeURIComponent(param[1]);
      if (coerce) {
        val = (val && !isNaN(val) ? +val : (val === "undefined" ? undefined : (coerce_types[val] !== undefined ? coerce_types[val] : val)));
      }
      if (keys_last) {
        while (i <= keys_last) {
          key = (keys[i] === "" ? cur.length : keys[i]);
          cur = cur[key] = (i < keys_last ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : []) : val);
          i++;
        }
      } else {
        if ($.isArray(obj[key])) {
          obj[key].push(val);
        } else if (obj[key] !== undefined) {
          obj[key] = [obj[key], val];
        } else {
          obj[key] = val;
        }
      }
    } else {
      if (key) obj[key] = (coerce ? undefined : "");
    }
  }
  return obj;
};

require('./view/formHelper');

require('./view/metaHelper');

require('./view/validationHelper');

Tower.Controller.Callbacks = {
  ClassMethods: {
    beforeAction: function() {
      return this.before.apply(this, ["action"].concat(__slice.call(arguments)));
    },
    afterAction: function() {
      return this.after.apply(this, ["action"].concat(__slice.call(arguments)));
    }
  }
};

Tower.Controller.Helpers = {
  ClassMethods: {
    helper: function(object) {
      this._helpers || (this._helpers = []);
      return this._helpers.push(object);
    },
    layout: function(layout) {
      return this._layout = layout;
    }
  },
  layout: function() {
    var layout;
    layout = this.constructor._layout;
    if (typeof layout === "function") {
      return layout.call(this);
    } else {
      return layout;
    }
  }
};

Tower.Controller.Instrumentation = {
  call: function(request, response, next) {
    this.request = request;
    this.response = response;
    this.params = this.request.params || {};
    this.cookies = this.request.cookies || {};
    this.query = this.request.query || {};
    this.session = this.request.session || {};
    this.format = this.params.format || "html";
    this.action = this.params.action;
    this.headers = {};
    this.callback = next;
    return this.process();
  },
  process: function() {
    var _this = this;
    this.processQuery();
    if (!Tower.env.match(/(test|production)/)) {
      console.log("  Processing by " + this.constructor.name + "#" + this.action + " as " + (this.format.toUpperCase()));
      console.log("  Parameters:");
      console.log(this.params);
    }
    return this.runCallbacks("action", {
      name: this.action
    }, function(callback) {
      return _this[_this.action].call(_this, callback);
    });
  },
  processQuery: function() {},
  clear: function() {
    this.request = null;
    this.response = null;
    return this.headers = null;
  }
};

Tower.Controller.Params = {
  ClassMethods: {
    params: function(options, callback) {
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      if (options) {
        this._paramsOptions = Tower.Support.Object.extend(this._paramsOptions || {}, options);
        callback.call(this);
      }
      return this._params || (this._params = {});
    },
    param: function(key, options) {
      if (options == null) options = {};
      this._params || (this._params = {});
      return this._params[key] = Tower.HTTP.Param.create(key, Tower.Support.Object.extend({}, this._paramsOptions || {}, options));
    }
  },
  criteria: function() {
    var criteria, name, params, parser, parsers;
    if (this._criteria) return this._criteria;
    this._criteria = criteria = new Tower.Model.Criteria;
    parsers = this.constructor.params();
    params = this.params;
    for (name in parsers) {
      parser = parsers[name];
      if (params.hasOwnProperty(name)) {
        criteria.where(parser.toCriteria(params[name]));
      }
    }
    return criteria;
  }
};

Tower.Controller.Redirecting = {
  redirectTo: function() {
    return this.redirect.apply(this, arguments);
  },
  redirect: function() {
    var args, options, url;
    try {
      args = Tower.Support.Array.args(arguments);
      console.log("redirect");
      console.log(this.resourceType);
      console.log(args);
      options = Tower.Support.Array.extractOptions(args);
      console.log(options);
      url = args.shift();
      if (!url && options.hasOwnProperty("action")) {
        url = (function() {
          switch (options.action) {
            case "index":
            case "new":
              return Tower.urlFor(this.resourceType, {
                action: options.action
              });
            case "edit":
            case "show":
              return Tower.urlFor(this.resource, {
                action: options.action
              });
          }
        }).call(this);
      }
      url || (url = "/");
      console.log(url);
      this.response.redirect(url);
    } catch (error) {
      console.log(error);
    }
    if (this.callback) return this.callback();
  }
};

Tower.Controller.Rendering = {
  ClassMethods: {
    addRenderer: function(key, block) {
      return this.renderers()[key] = block;
    },
    addRenderers: function(renderers) {
      var block, key;
      if (renderers == null) renderers = {};
      for (key in renderers) {
        block = renderers[key];
        this.addRenderer(key, block);
      }
      return this;
    },
    renderers: function() {
      return this._renderers || (this._renderers = {});
    }
  },
  render: function() {
    return this.renderToBody(this._normalizeRender.apply(this, arguments));
  },
  renderToBody: function(options) {
    this._processRenderOptions(options);
    return this._renderTemplate(options);
  },
  renderToString: function() {
    return this.renderToBody(this._normalizeRender.apply(this, arguments));
  },
  sendFile: function(path, options) {
    if (options == null) options = {};
  },
  sendData: function(data, options) {
    if (options == null) options = {};
  },
  _renderTemplate: function(options) {
    var callback, view, _base, _callback,
      _this = this;
    _callback = options.callback;
    callback = function(error, body) {
      if (error) {
        _this.status || (_this.status = 404);
        _this.body = error.stack;
      } else {
        _this.status || (_this.status = 200);
        _this.body = body;
      }
      if (_callback) _callback.apply(_this, arguments);
      if (_this.callback) return _this.callback();
    };
    if (this._handleRenderers(options, callback)) return;
    (_base = this.headers)["Content-Type"] || (_base["Content-Type"] = "text/html");
    view = new Tower.View(this);
    try {
      return view.render.call(view, options, callback);
    } catch (error) {
      return callback(error);
    }
  },
  _handleRenderers: function(options, callback) {
    var name, renderer, _ref;
    _ref = Tower.Controller.renderers();
    for (name in _ref) {
      renderer = _ref[name];
      if (options.hasOwnProperty(name)) {
        renderer.call(this, options[name], options, callback);
        return true;
      }
    }
    return false;
  },
  _processRenderOptions: function(options) {
    if (options == null) options = {};
    if (options.status) this.status = options.status;
    if (options.contentType) this.headers["Content-Type"] = options.contentType;
    if (options.location) this.headers["Location"] = this.urlFor(options.location);
    return this;
  },
  _normalizeRender: function() {
    return this._normalizeOptions(this._normalizeArgs.apply(this, arguments));
  },
  _normalizeArgs: function() {
    var action, args, callback, key, options;
    args = Tower.Support.Array.args(arguments);
    if (typeof args[0] === "string") action = args.shift();
    if (typeof args[0] === "object") options = args.shift();
    if (typeof args[0] === "function") callback = args.shift();
    options || (options = {});
    if (action) {
      key = !!action.match(/\//) ? "file" : "action";
      options[key] = action;
    }
    if (callback) options.callback = callback;
    return options;
  },
  _normalizeOptions: function(options) {
    if (options == null) options = {};
    if (options.partial === true) options.partial = this.action;
    options.prefixes || (options.prefixes = []);
    options.prefixes.push(this.collectionName);
    options.template || (options.template = options.file || (options.action || this.action));
    return options;
  }
};

Tower.Controller.Resourceful = {
  ClassMethods: {
    resource: function(options) {
      if (options.hasOwnProperty("name")) this._resourceName = options.name;
      if (options.hasOwnProperty("type")) this._resourceType = options.type;
      if (options.hasOwnProperty("collectionName")) {
        this._collectionName = options.collectionName;
      }
      return this;
    },
    resourceType: function() {
      return this._resourceType || (this._resourceType = Tower.Support.String.singularize(this.name.replace(/(Controller)$/, "")));
    },
    resourceName: function() {
      var parts;
      if (this._resourceName) return this._resourceName;
      parts = this.resourceType().split(".");
      return this._resourceName = Tower.Support.String.camelize(parts[parts.length - 1], true);
    },
    collectionName: function() {
      return this._collectionName || (this._collectionName = Tower.Support.String.camelize(this.name.replace(/(Controller)$/, ""), true));
    },
    belongsTo: function(key, options) {
      if (options == null) options = {};
      options.key = key;
      options.type || (options.type = Tower.Support.String.camelize(options.key));
      return this._belongsTo = options;
    },
    actions: function() {
      var action, actions, actionsToRemove, args, options, _i, _len;
      args = Tower.Support.Array.args(arguments);
      if (typeof args[args.length - 1] === "object") {
        options = args.pop();
      } else {
        options = {};
      }
      actions = ["index", "new", "create", "show", "edit", "update", "destroy"];
      actionsToRemove = _.difference(actions, args, options.except || []);
      for (_i = 0, _len = actionsToRemove.length; _i < _len; _i++) {
        action = actionsToRemove[_i];
        this[action] = null;
        delete this[action];
      }
      return this;
    }
  },
  index: function() {
    var _this = this;
    return this._index(function(format) {
      format.html(function() {
        return _this.render("index");
      });
      return format.json(function() {
        return _this.render({
          json: _this.collection,
          status: 200
        });
      });
    });
  },
  "new": function() {
    var _this = this;
    return this._new(function(format) {
      format.html(function() {
        return _this.render("new");
      });
      return format.json(function() {
        return _this.render({
          json: _this.resource,
          status: 200
        });
      });
    });
  },
  create: function(callback) {
    var _this = this;
    return this._create(function(format) {
      format.html(function() {
        return _this.redirectTo({
          action: "show"
        });
      });
      return format.json(function() {
        return _this.render({
          json: _this.resource,
          status: 200
        });
      });
    });
  },
  show: function() {
    var _this = this;
    return this._show(function(format) {
      format.html(function() {
        return _this.render("show");
      });
      return format.json(function() {
        return _this.render({
          json: _this.resource,
          status: 200
        });
      });
    });
  },
  edit: function() {
    var _this = this;
    return this._edit(function(format) {
      format.html(function() {
        return _this.render("edit");
      });
      return format.json(function() {
        return _this.render({
          json: _this.resource,
          status: 200
        });
      });
    });
  },
  update: function() {
    var _this = this;
    return this._update(function(format) {
      format.html(function() {
        return _this.redirectTo({
          action: "show"
        });
      });
      return format.json(function() {
        return _this.render({
          json: _this.resource,
          status: 200
        });
      });
    });
  },
  destroy: function() {
    var _this = this;
    return this._destroy(function(format) {
      format.html(function() {
        return _this.redirectTo({
          action: "index"
        });
      });
      return format.json(function() {
        return _this.render({
          json: _this.resource,
          status: 200
        });
      });
    });
  },
  _index: function(callback) {
    var _this = this;
    return this.findCollection(function(error, collection) {
      return _this.respondWith(collection, callback);
    });
  },
  _new: function(callback) {
    var _this = this;
    return this.buildResource(function(error, resource) {
      if (!resource) return _this.failure(error);
      return _this.respondWith(resource, callback);
    });
  },
  _create: function(callback) {
    var _this = this;
    return this.buildResource(function(error, resource) {
      if (!resource) return _this.failure(error, callback);
      return resource.save(function(error) {
        return _this.respondWithStatus(Tower.Support.Object.isBlank(resource.errors), callback);
      });
    });
  },
  _show: function(callback) {
    var _this = this;
    return this.findResource(function(error, resource) {
      return _this.respondWith(resource, callback);
    });
  },
  _edit: function(callback) {
    var _this = this;
    return this.findResource(function(error, resource) {
      return _this.respondWith(resource, callback);
    });
  },
  _update: function(callback) {
    var _this = this;
    return this.findResource(function(error, resource) {
      if (error) return _this.failure(error, callback);
      return resource.updateAttributes(_this.params[_this.resourceName], function(error) {
        return _this.respondWithStatus(!!!error && Tower.Support.Object.isBlank(resource.errors), callback);
      });
    });
  },
  _destroy: function(callback) {
    var _this = this;
    return this.findResource(function(error, resource) {
      if (error) return _this.failure(error, callback);
      return resource.destroy(function(error) {
        return _this.respondWithStatus(!!!error, callback);
      });
    });
  },
  respondWithScoped: function(callback) {
    var _this = this;
    return this.scoped(function(error, scope) {
      if (error) return _this.failure(error, callback);
      return _this.respondWith(scope.build(), callback);
    });
  },
  respondWithStatus: function(success, callback) {
    var failureResponder, options, successResponder;
    options = {
      records: this.resource || this.collection
    };
    if (callback && callback.length > 1) {
      successResponder = new Tower.Controller.Responder(this, options);
      failureResponder = new Tower.Controller.Responder(this, options);
      callback.call(this, successResponder, failureResponder);
      if (success) {
        return successResponder[format].call(this);
      } else {
        return failureResponder[format].call(this, error);
      }
    } else {
      return Tower.Controller.Responder.respond(this, options, callback);
    }
  },
  buildResource: function(callback) {
    var _this = this;
    return this.scoped(function(error, scope) {
      var resource;
      if (error) return callback.call(_this, error, null);
      _this[_this.resourceName] = _this.resource = resource = scope.build(_this.params[_this.resourceName]);
      if (callback) callback.call(_this, null, resource);
      return resource;
    });
  },
  findResource: function(callback) {
    var _this = this;
    return this.scoped(function(error, scope) {
      if (error) return callback.call(_this, error, null);
      return scope.find(_this.params.id, function(error, resource) {
        _this[_this.resourceName] = _this.resource = resource;
        return callback.call(_this, error, resource);
      });
    });
  },
  findCollection: function(callback) {
    var _this = this;
    return this.scoped(function(error, scope) {
      if (error) return callback.call(_this, error, null);
      return scope.all(function(error, collection) {
        _this[_this.collectionName] = _this.collection = collection;
        if (callback) return callback.call(_this, error, collection);
      });
    });
  },
  findParent: function(callback) {
    var association, param, parentClass,
      _this = this;
    association = this.constructor._belongsTo;
    if (association) {
      param = association.param || ("" + association.key + "Id");
      parentClass = Tower.constant(association.type);
      return parentClass.find(this.params[param], function(error, parent) {
        if (error && !callback) throw error;
        if (!error) _this.parent = _this[association.key] = parent;
        if (callback) return callback.call(_this, error, parent);
      });
    } else {
      if (callback) callback.call(this, null, false);
      return false;
    }
  },
  scoped: function(callback) {
    var callbackWithScope,
      _this = this;
    callbackWithScope = function(error, scope) {
      return callback.call(_this, error, scope.where(_this.criteria()));
    };
    if (this.hasParent) {
      return this.findParent(function(error, parent) {
        return callbackWithScope(error, parent[_this.collectionName]());
      });
    } else {
      return callbackWithScope(null, Tower.constant(this.resourceType));
    }
  },
  failure: function(resource, callback) {
    return callback();
  }
};

Tower.Controller.Responder = (function() {

  Responder.respond = function(controller, options, callback) {
    var responder;
    responder = new this(controller, options);
    return responder.respond(callback);
  };

  function Responder(controller, options) {
    var format, _i, _len, _ref;
    if (options == null) options = {};
    this.controller = controller;
    this.options = options;
    _ref = this.controller.formats;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      format = _ref[_i];
      this.accept(format);
    }
  }

  Responder.prototype.accept = function(format) {
    return this[format] = function(callback) {
      return this["_" + format] = callback;
    };
  };

  Responder.prototype.respond = function(callback) {
    var method;
    if (callback) callback.call(this.controller, this);
    method = this["_" + this.controller.format];
    if (method) {
      return method.call(this);
    } else {
      return this.toFormat();
    }
  };

  Responder.prototype._html = function() {
    return this.controller.render({
      action: this.controller.action
    });
  };

  Responder.prototype._json = function() {
    return this.controller.render({
      json: this.options.records
    });
  };

  Responder.prototype.toFormat = function() {
    try {
      if ((typeof get !== "undefined" && get !== null) || !(typeof hasErrors !== "undefined" && hasErrors !== null)) {
        return this.defaultRender();
      } else {
        return this.displayErrors();
      }
    } catch (error) {
      return this._apiBehavior(error);
    }
  };

  Responder.prototype._navigationBehavior = function(error) {
    if (typeof get !== "undefined" && get !== null) {
      throw error;
    } else if ((typeof hasErrors !== "undefined" && hasErrors !== null) && defaultAction) {
      return this.render({
        action: this.defaultAction
      });
    } else {
      return this.redirectTo(this.navigationLocation);
    }
  };

  Responder.prototype._apiBehavior = function(error) {
    if (typeof get !== "undefined" && get !== null) {
      return this.display(resource);
    } else if (typeof post !== "undefined" && post !== null) {
      return this.display(resource, {
        status: "created",
        location: this.apiLocation
      });
    } else {
      return this.head("noContent");
    }
  };

  Responder.prototype.isResourceful = function() {
    return this.resource.hasOwnProperty("to" + (this.format.toUpperCase()));
  };

  Responder.prototype.resourceLocation = function() {
    return this.options.location || this.resources;
  };

  Responder.prototype.defaultRender = function() {
    return this.defaultResponse.call(options);
  };

  Responder.prototype.display = function(resource, givenOptions) {
    if (givenOptions == null) givenOptions = {};
    return this.controller.render(_.extend(givenOptions, this.options, {
      format: this.resource
    }));
  };

  Responder.prototype.displayErrors = function() {
    return this.controller.render({
      format: this.resourceErrors,
      status: "unprocessableEntity"
    });
  };

  Responder.prototype.hasErrors = function() {
    var _base;
    return (typeof (_base = this.resource).respondTo === "function" ? _base.respondTo("errors") : void 0) && !(this.resource.errors.empty != null);
  };

  Responder.prototype.defaultAction = function() {
    return this.action || (this.action = ACTIONS_FOR_VERBS[request.requestMethodSymbol]);
  };

  Responder.prototype.resourceErrors = function() {
    if (this.hasOwnProperty("" + format + "ResourceErrors")) {
      return this["" + format + "RresourceErrors"];
    } else {
      return this.resource.errors;
    }
  };

  Responder.prototype.jsonResourceErrors = function() {
    return {
      errors: this.resource.errors
    };
  };

  return Responder;

})();

Tower.Controller.Responding = {
  ClassMethods: {
    respondTo: function() {
      var args, except, mimes, name, only, options, _i, _len;
      mimes = this.mimes();
      args = Tower.Support.Array.args(arguments);
      if (typeof args[args.length - 1] === "object") {
        options = args.pop();
      } else {
        options = {};
      }
      if (options.only) only = Tower.Support.Object.toArray(options.only);
      if (options.except) except = Tower.Support.Object.toArray(options.except);
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        name = args[_i];
        mimes[name] = {};
        if (only) mimes[name].only = only;
        if (except) mimes[name].except = except;
      }
      return this;
    },
    mimes: function() {
      return this._mimes || (this._mimes = {
        json: {},
        html: {}
      });
    }
  },
  respondTo: function(block) {
    return Tower.Controller.Responder.respond(this, {}, block);
  },
  respondWith: function() {
    var args, callback, options;
    args = Tower.Support.Array.args(arguments);
    callback = null;
    if (typeof args[args.length - 1] === "function") callback = args.pop();
    if (typeof args[args.length - 1] === "object" && !(args[args.length - 1] instanceof Tower.Model)) {
      options = args.pop();
    } else {
      options = {};
    }
    options || (options = {});
    options.records = args[0];
    return Tower.Controller.Responder.respond(this, options, callback);
  },
  _mimesForAction: function() {
    var action, config, mime, mimes, result, success;
    action = this.action;
    result = [];
    mimes = this.constructor.mimes();
    for (mime in mimes) {
      config = mimes[mime];
      success = false;
      if (config.except) {
        success = !_.include(config.except, action);
      } else if (config.only) {
        success = _.include(config.only, action);
      } else {
        success = true;
      }
      if (success) result.push(mime);
    }
    return result;
  }
};

Tower.HTTP.Agent = (function() {

  function Agent(attributes) {
    if (attributes == null) attributes = {};
    _.extend(this, attributes);
  }

  Agent.prototype.toJSON = function() {
    return {
      family: this.family,
      major: this.major,
      minor: this.minor,
      patch: this.patch,
      version: this.version,
      os: this.os,
      name: this.name
    };
  };

  return Agent;

})();

Tower.HTTP.Cookies = (function() {

  Cookies.parse = function(string) {
    var eqlIndex, key, pair, pairs, result, value, _i, _len;
    if (string == null) string = document.cookie;
    result = {};
    pairs = string.split(/[;,] */);
    for (_i = 0, _len = pairs.length; _i < _len; _i++) {
      pair = pairs[_i];
      eqlIndex = pair.indexOf('=');
      key = pair.substring(0, eqlIndex).trim().toLowerCase();
      value = pair.substring(++eqlIndex, pair.length).trim();
      if ('"' === value[0]) value = value.slice(1, -1);
      if (result[key] === void 0) {
        value = value.replace(/\+/g, ' ');
        try {
          result[key] = decodeURIComponent(value);
        } catch (error) {
          if (error instanceof URIError) {
            result[key] = value;
          } else {
            throw err;
          }
        }
      }
    }
    return new this(result);
  };

  function Cookies(attributes) {
    var key, value;
    if (attributes == null) attributes = {};
    for (key in attributes) {
      value = attributes[key];
      this[key] = value;
    }
  }

  return Cookies;

})();

Tower.HTTP.Param = (function() {

  Param.perPage = 20;

  Param.sortDirection = "ASC";

  Param.sortKey = "sort";

  Param.limitKey = "limit";

  Param.pageKey = "page";

  Param.separator = "_";

  Param.create = function(key, options) {
    options.type || (options.type = "String");
    return new Tower.HTTP.Param[options.type](key, options);
  };

  function Param(key, options) {
    if (options == null) options = {};
    this.controller = options.controller;
    this.key = key;
    this.attribute = options.as || this.key;
    this.modelName = options.modelName;
    if (typeof modelName !== "undefined" && modelName !== null) {
      this.namespace = Tower.Support.String.pluralize(this.modelName);
    }
    this.exact = options.exact || false;
    this["default"] = options["default"];
  }

  Param.prototype.parse = function(value) {
    return value;
  };

  Param.prototype.render = function(value) {
    return value;
  };

  Param.prototype.toCriteria = function(value) {
    var attribute, conditions, criteria, node, nodes, operator, set, _i, _j, _len, _len2;
    nodes = this.parse(value);
    criteria = new Tower.Model.Criteria;
    for (_i = 0, _len = nodes.length; _i < _len; _i++) {
      set = nodes[_i];
      for (_j = 0, _len2 = set.length; _j < _len2; _j++) {
        node = set[_j];
        attribute = node.attribute;
        operator = node.operators[0];
        conditions = {};
        if (operator === "$eq") {
          conditions[attribute] = node.value;
        } else {
          conditions[attribute] = {};
          conditions[attribute][operator] = node.value;
        }
        criteria.where(conditions);
      }
    }
    return criteria;
  };

  Param.prototype.parseValue = function(value, operators) {
    return {
      namespace: this.namespace,
      key: this.key,
      operators: operators,
      value: value,
      attribute: this.attribute
    };
  };

  Param.prototype._clean = function(string) {
    return string.replace(/^-/, "").replace(/^\+-/, "").replace(/^'|'$/, "").replace("+", " ").replace(/^\^/, "").replace(/\$$/, "").replace(/^\s+|\s+$/, "");
  };

  return Param;

})();

require('./param/array');

require('./param/date');

require('./param/number');

require('./param/string');

Tower.HTTP.Request = (function() {

  function Request(data) {
    if (data == null) data = {};
    this.url = data.url;
    this.location = data.location;
    this.pathname = this.location.path;
    this.query = this.location.query;
    this.title = data.title;
    this.title || (this.title = typeof document !== "undefined" && document !== null ? document.title : void 0);
    this.body = data.body || {};
    this.headers = data.headers || {};
    this.method = data.method || "GET";
  }

  return Request;

})();

Tower.HTTP.Response = (function() {

  function Response(data) {
    if (data == null) data = {};
    this.url = data.url;
    this.location = data.location;
    this.pathname = this.location.path;
    this.query = this.location.query;
    this.title = data.title;
    this.title || (this.title = typeof document !== "undefined" && document !== null ? document.title : void 0);
    this.body = data.body || {};
    this.headers = data.headers || {};
    this.headerSent = false;
    this.statusCode = 200;
    this.body = "";
  }

  Response.prototype.writeHead = function(statusCode, headers) {
    this.statusCode = statusCode;
    return this.headers = headers;
  };

  Response.prototype.setHeader = function(key, value) {
    if (this.headerSent) throw new Error("Headers already sent");
    return this.headers[key] = value;
  };

  Response.prototype.write = function(body) {
    if (body == null) body = '';
    return this.body += body;
  };

  Response.prototype.end = function(body) {
    if (body == null) body = '';
    this.body += body;
    this.sent = true;
    return this.headerSent = true;
  };

  Response.prototype.redirect = function(path, options) {
    if (options == null) options = {};
    if (global.History) return global.History.push(options, null, path);
  };

  return Response;

})();

Tower.HTTP.Route = (function(_super) {

  __extends(Route, _super);

  Route.store = function() {
    return this._store || (this._store = []);
  };

  Route.create = function(route) {
    return this.store().push(route);
  };

  Route.all = function() {
    return this.store();
  };

  Route.clear = function() {
    return this._store = [];
  };

  Route.draw = function(callback) {
    return callback.apply(new Tower.HTTP.Route.DSL(this));
  };

  Route.findController = function(request, response, callback) {
    var controller, route, routes, _i, _len;
    routes = Tower.Route.all();
    for (_i = 0, _len = routes.length; _i < _len; _i++) {
      route = routes[_i];
      controller = route.toController(request);
      if (controller) break;
    }
    if (controller) {
      controller.call(request, response, function() {
        return callback(controller);
      });
    } else {
      callback(null);
    }
    return controller;
  };

  Route.prototype.toController = function(request) {
    var capture, controller, i, keys, match, method, params, _len, _name;
    match = this.match(request);
    if (!match) return null;
    method = request.method.toLowerCase();
    keys = this.keys;
    params = Tower.Support.Object.extend({}, this.defaults, request.query || {}, request.body || {});
    match = match.slice(1);
    for (i = 0, _len = match.length; i < _len; i++) {
      capture = match[i];
      params[_name = keys[i].name] || (params[_name] = capture ? decodeURIComponent(capture) : null);
    }
    controller = this.controller;
    if (controller) params.action = controller.action;
    request.params = params;
    if (controller) {
      controller = new (Tower.constant(Tower.namespaced(this.controller.className)));
    }
    return controller;
  };

  function Route(options) {
    options || (options = options);
    this.path = options.path;
    this.name = options.name;
    this.method = (options.method || "GET").toUpperCase();
    this.ip = options.ip;
    this.defaults = options.defaults || {};
    this.constraints = options.constraints;
    this.options = options;
    this.controller = options.controller;
    this.keys = [];
    this.pattern = this.extractPattern(this.path);
    this.id = this.path;
    if (this.controller) this.id += this.controller.name + this.controller.action;
  }

  Route.prototype.match = function(requestOrPath) {
    var match, path;
    if (typeof requestOrPath === "string") return this.pattern.exec(requestOrPath);
    path = requestOrPath.location.path;
    if (requestOrPath.method.toUpperCase() !== this.method) return null;
    match = this.pattern.exec(path);
    if (!match) return null;
    if (!this.matchConstraints(requestOrPath)) return null;
    return match;
  };

  Route.prototype.matchConstraints = function(request) {
    var constraints, key, value;
    constraints = this.constraints;
    switch (typeof constraints) {
      case "object":
        for (key in constraints) {
          value = constraints[key];
          switch (typeof value) {
            case "string":
            case "number":
              if (request[key] !== value) return false;
              break;
            case "function":
            case "object":
              if (!request.location[key].match(value)) return false;
          }
        }
        break;
      case "function":
        return constraints.call(request, request);
      default:
        return false;
    }
    return true;
  };

  Route.prototype.urlFor = function(options) {
    var key, result, value;
    if (options == null) options = {};
    result = this.path;
    for (key in options) {
      value = options[key];
      result = result.replace(new RegExp(":" + key + "\\??", "g"), value);
    }
    result = result.replace(new RegExp("\\.?:\\w+\\??", "g"), "");
    return result;
  };

  Route.prototype.extractPattern = function(path, caseSensitive, strict) {
    var self;
    if (path instanceof RegExp) return path;
    self = this;
    if (path === "/") return new RegExp('^' + path + '$');
    path = path.replace(/(\(?)(\/)?(\.)?([:\*])(\w+)(\))?(\?)?/g, function(_, open, slash, format, symbol, key, close, optional) {
      var result, splat;
      optional = (!!optional) || (open + close === "()");
      splat = symbol === "*";
      self.keys.push({
        name: key,
        optional: !!optional,
        splat: splat
      });
      slash || (slash = "");
      result = "";
      if (!optional || !splat) result += slash;
      result += "(?:";
      if (format != null) {
        result += splat ? "\\.([^.]+?)" : "\\.([^/.]+?)";
      } else {
        result += splat ? "/?(.+)" : "([^/\\.]+)";
      }
      result += ")";
      if (optional) result += "?";
      return result;
    });
    return new RegExp('^' + path + '$', !!caseSensitive ? '' : 'i');
  };

  return Route;

})(Tower.Class);

Tower.Route = Tower.HTTP.Route;

require('./route/dsl');

require('./route/urls');

require('./route/polymorphicUrls');

Tower.HTTP.Route.include(Tower.HTTP.Route.Urls);

Tower.HTTP.Route.include(Tower.HTTP.Route.PolymorphicUrls);

Tower.HTTP.Sync = {
  ajax: function() {},
  webSockets: function() {}
};

Tower.HTTP.Url = (function() {

  Url.key = ["source", "protocol", "host", "userInfo", "user", "password", "hostname", "port", "relative", "path", "directory", "file", "query", "fragment"];

  Url.aliases = {
    anchor: "fragment"
  };

  Url.parser = {
    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
  };

  Url.querystringParser = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g;

  Url.fragmentParser = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g;

  Url.typeParser = /(youtube|vimeo|eventbrite)/;

  Url.prototype.parse = function(string) {
    var attributes, domains, fragment, i, key, params, parsed, value;
    key = this.constructor.key;
    string = decodeURI(string);
    parsed = this.constructor.parser[(this.strictMode || false ? "strict" : "loose")].exec(string);
    attributes = {};
    this.params = params = {};
    this.fragment = fragment = {
      params: {}
    };
    i = 14;
    while (i--) {
      attributes[key[i]] = parsed[i] || "";
    }
    attributes["query"].replace(this.constructor.querystringParser, function($0, $1, $2) {
      if ($1) return params[$1] = $2;
    });
    attributes["fragment"].replace(this.constructor.fragmentParser, function($0, $1, $2) {
      if ($1) return fragment.params[$1] = $2;
    });
    this.segments = attributes.path.replace(/^\/+|\/+$/g, "").split("/");
    fragment.segments = attributes.fragment.replace(/^\/+|\/+$/g, "").split("/");
    for (key in attributes) {
      value = attributes[key];
      this[key] || (this[key] = value);
    }
    this.root = (attributes.host ? attributes.protocol + "://" + attributes.hostname + (attributes.port ? ":" + attributes.port : "") : "");
    domains = this.hostname.split(".");
    this.domain = domains.slice(domains.length - 1 - this.depth, (domains.length - 1) + 1 || 9e9).join(".");
    this.subdomains = domains.slice(0, (domains.length - 2 - this.depth) + 1 || 9e9);
    this.subdomain = this.subdomains.join(".");
    if (this.port != null) return this.port = parseInt(this.port);
  };

  function Url(url, depth, strictMode) {
    if (depth == null) depth = 1;
    this.strictMode = strictMode || false;
    this.depth = depth || 1;
    if (typeof window !== "undefined" && window !== null) {
      this.url = url || (url = window.location.toString());
    }
    this.parse(url);
  }

  return Url;

})();

Tower.Model.Attribute = (function() {

  function Attribute(owner, name, options) {
    var key;
    if (options == null) options = {};
    this.owner = owner;
    this.name = key = name;
    this.type = options.type || "String";
    if (typeof this.type !== "string") this.type = "Array";
    this._default = options["default"];
    this._encode = options.encode;
    this._decode = options.decode;
    if (Tower.accessors) {
      Object.defineProperty(this.owner.prototype, name, {
        enumerable: true,
        configurable: true,
        get: function() {
          return this.get(key);
        },
        set: function(value) {
          return this.set(key, value);
        }
      });
    }
  }

  Attribute.prototype.defaultValue = function(record) {
    var _default;
    _default = this._default;
    if (Tower.Support.Object.isArray(_default)) {
      return _default.concat();
    } else if (Tower.Support.Object.isHash(_default)) {
      return Tower.Support.Object.extend({}, _default);
    } else if (typeof _default === "function") {
      return _default.call(record);
    } else {
      return _default;
    }
  };

  Attribute.prototype.encode = function(value, binding) {
    return this.code(this._encode, value, binding);
  };

  Attribute.prototype.decode = function(value, binding) {
    return this.code(this._decode, value, binding);
  };

  Attribute.prototype.code = function(type, value, binding) {
    switch (type) {
      case "string":
        return binding[type].call(binding[type], value);
      case "function":
        return type.call(_encode, value);
      default:
        return value;
    }
  };

  return Attribute;

})();

Tower.Model.Attributes = {
  ClassMethods: {
    field: function(name, options) {
      return this.fields()[name] = new Tower.Model.Attribute(this, name, options);
    },
    fields: function() {
      return this._fields || (this._fields = {});
    }
  },
  get: function(name) {
    var field;
    if (!this.has(name)) {
      field = this.constructor.fields()[name];
      if (field) this.attributes[name] = field.defaultValue(this);
    }
    return this.attributes[name];
  },
  set: function(key, value) {
    var updates, _results;
    if (typeof key === "object") {
      updates = key;
    } else {
      updates = {};
      updates[key] = value;
    }
    _results = [];
    for (key in updates) {
      value = updates[key];
      _results.push(this._set(key, value));
    }
    return _results;
  },
  _set: function(key, value) {
    this._attributeChange(key, value);
    return this.attributes[key] = value;
  },
  assignAttributes: function(attributes) {
    var key, value;
    for (key in attributes) {
      value = attributes[key];
      delete this.changes[key];
      this.attributes[key] = value;
    }
    return this;
  },
  has: function(key) {
    return this.attributes.hasOwnProperty(key);
  }
};

Tower.Model.Conversion = {
  ClassMethods: {
    baseClass: function() {
      if (this.__super__ && this.__super__.constructor.baseClass && this.__super__.constructor !== Tower.Model) {
        return this.__super__.constructor.baseClass();
      } else {
        return this;
      }
    },
    toParam: function() {
      if (this === Tower.Model) return;
      return this.metadata().paramNamePlural;
    },
    toKey: function() {
      return this.metadata().paramName;
    },
    url: function(options) {
      var url;
      return this._url = (function() {
        switch (typeof options) {
          case "object":
            if (options.parent) {
              return url = "/" + (Tower.Support.String.parameterize(Tower.Support.String.pluralize(options.parent))) + "/:" + (Tower.Support.String.camelize(options.parent, true)) + "/" + (this.toParam());
            }
            break;
          default:
            return options;
        }
      }).call(this);
    },
    collectionName: function() {
      return Tower.Support.String.camelize(Tower.Support.String.pluralize(this.name), true);
    },
    resourceName: function() {
      return Tower.Support.String.camelize(this.name, true);
    },
    metadata: function() {
      var className, classNamePlural, controllerName, metadata, modelName, name, namePlural, namespace, paramName, paramNamePlural;
      className = this.name;
      metadata = this.metadata[className];
      if (metadata) return metadata;
      namespace = Tower.namespace();
      name = Tower.Support.String.camelize(className, true);
      namePlural = Tower.Support.String.pluralize(name);
      classNamePlural = Tower.Support.String.pluralize(className);
      paramName = Tower.Support.String.parameterize(name);
      paramNamePlural = Tower.Support.String.parameterize(namePlural);
      modelName = "" + namespace + "." + className;
      controllerName = "" + namespace + "." + classNamePlural + "Controller";
      return this.metadata[className] = {
        name: name,
        namePlural: namePlural,
        className: className,
        classNamePlural: classNamePlural,
        paramName: paramName,
        paramNamePlural: paramNamePlural,
        modelName: modelName,
        controllerName: controllerName
      };
    }
  },
  toLabel: function() {
    return this.className();
  },
  toPath: function() {
    var param, result;
    result = this.constructor.toParam();
    if (result === void 0) return "/";
    param = this.toParam();
    if (param) result += "/" + param;
    return result;
  },
  toParam: function() {
    var id;
    id = this.get("id");
    if (id != null) {
      return String(id);
    } else {
      return null;
    }
  },
  toKey: function() {
    return this.constructor.tokey();
  },
  toCacheKey: function() {},
  toModel: function() {
    return this;
  },
  metadata: function() {
    return this.constructor.metadata();
  }
};

Tower.Model.Criteria = (function() {

  function Criteria(args) {
    var key, value;
    if (args == null) args = {};
    for (key in args) {
      value = args[key];
      this[key] = value;
    }
    this._where || (this._where = []);
    this._order || (this._order = []);
  }

  Criteria.prototype.where = function(conditions) {
    if (conditions instanceof Tower.Model.Criteria) {
      return this.merge(conditions);
    } else {
      return this._where.push(conditions);
    }
  };

  Criteria.prototype.order = function(attribute, direction) {
    if (direction == null) direction = "asc";
    this._order || (this._order = []);
    return this._order.push([attribute, direction]);
  };

  Criteria.prototype.asc = function() {
    var attribute, attributes, _i, _len, _results;
    attributes = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    _results = [];
    for (_i = 0, _len = attributes.length; _i < _len; _i++) {
      attribute = attributes[_i];
      _results.push(this.order(attribute));
    }
    return _results;
  };

  Criteria.prototype.desc = function() {
    var attribute, attributes, _i, _len, _results;
    attributes = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    _results = [];
    for (_i = 0, _len = attributes.length; _i < _len; _i++) {
      attribute = attributes[_i];
      _results.push(this.order(attribute, "desc"));
    }
    return _results;
  };

  Criteria.prototype.allIn = function(attributes) {
    return this._whereOperator("$all", attributes);
  };

  Criteria.prototype.anyIn = function(attributes) {
    return this._whereOperator("$any", attributes);
  };

  Criteria.prototype.notIn = function(attributes) {
    return this._whereOperator("$nin", attributes);
  };

  Criteria.prototype.offset = function(number) {
    return this._offset = number;
  };

  Criteria.prototype.limit = function(number) {
    this._limit = number;
    return this.mergeOptions({
      limit: number
    });
  };

  Criteria.prototype.select = function() {
    return this._fields = Tower.Support.Array.args(arguments);
  };

  Criteria.prototype.includes = function() {
    return this._includes = Tower.Support.Array.args(arguments);
  };

  Criteria.prototype.page = function(number) {
    return this.offset(number);
  };

  Criteria.prototype.paginate = function(options) {
    var limit, page;
    limit = options.perPage || options.limit;
    page = options.page || 1;
    this.limit(limit);
    return this.offset((page - 1) * limit);
  };

  Criteria.prototype.clone = function() {
    return new this.constructor(this.attributes());
  };

  Criteria.prototype.merge = function(criteria) {
    var attributes;
    attributes = criteria.attributes();
    if (attributes._where.length > 0) {
      this._where = this._where.concat(attributes._where);
    }
    if (attributes._order.length > 0) {
      this._order = this._order.concat(attributes._order);
    }
    if (attributes._offset != null) this._offset = attributes._offset;
    if (attributes._limit != null) this._limit = attributes._limit;
    if (attributes._fields) this._fields = attributes._fields;
    if (attributes._offset != null) this._offset = attributes._offset;
    return this;
  };

  Criteria.prototype.options = function() {
    var options;
    options = {};
    if (this._offset != null) options.offset = this._offset;
    if (this._limit != null) options.limit = this._limit;
    if (this._fields) options.fields = this._fields;
    if (this._order.length > 0) options.sort = this._order;
    return options;
  };

  Criteria.prototype.conditions = function() {
    var conditions, result, _i, _len, _ref;
    result = {};
    _ref = this._where;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      conditions = _ref[_i];
      Tower.Support.Object.deepMergeWithArrays(result, conditions);
    }
    return result;
  };

  Criteria.prototype.attributes = function(to) {
    if (to == null) to = {};
    to._where = this._where.concat();
    to._order = this._order.concat();
    if (this._offset != null) to._offset = this._offset;
    if (this._limit != null) to._limit = this._limit;
    if (this._fields) to._fields = this._fields;
    if (this._includes) to._includes = this._includes;
    return to;
  };

  Criteria.prototype.toQuery = function() {
    return {
      conditions: this.conditions(),
      options: this.options()
    };
  };

  Criteria.prototype.toUpdate = function() {
    return this.toQuery();
  };

  Criteria.prototype.toCreate = function() {
    var attributes, conditions, key, options, value, _i, _key, _len, _ref, _value;
    attributes = {};
    options = {};
    _ref = this._where;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      conditions = _ref[_i];
      for (key in conditions) {
        value = conditions[key];
        if (Tower.Store.isKeyword(key)) {
          for (_key in value) {
            _value = value[_key];
            attributes[_key] = _value;
          }
        } else if (Tower.Support.Object.isHash(value) && Tower.Store.hasKeyword(value)) {
          for (_key in value) {
            _value = value[_key];
            attributes[key] = _value;
          }
        } else {
          attributes[key] = value;
        }
      }
    }
    for (key in attributes) {
      value = attributes[key];
      if (value === void 0) delete attributes[key];
    }
    return {
      attributes: attributes,
      options: options
    };
  };

  Criteria.prototype.mergeOptions = function(options) {
    return options;
  };

  Criteria.prototype._whereOperator = function(operator, attributes) {
    var key, query, value;
    query = {};
    for (key in attributes) {
      value = attributes[key];
      query[key] = {};
      query[key][operator] = value;
    }
    return this.where(query);
  };

  return Criteria;

})();

Tower.Model.Dirty = {
  isDirty: function() {
    return Tower.Support.Object.isPresent(this.changes);
  },
  attributeChanged: function(name) {
    var change;
    change = this.changes[name];
    if (!change) return false;
    return change[0] !== change[1];
  },
  attributeChange: function(name) {
    var change;
    change = this.changes[name];
    if (!change) return;
    return change[1];
  },
  attributeWas: function(name) {
    var change;
    change = this.changes[name];
    if (!change) return;
    return change[0];
  },
  resetAttribute: function(name) {
    var array;
    array = this.changes[name];
    if (array) this.set(name, array[0]);
    return this;
  },
  toUpdates: function() {
    var array, attributes, key, result, _ref;
    result = {};
    attributes = this.attributes;
    _ref = this.changes;
    for (key in _ref) {
      array = _ref[key];
      result[key] = attributes[key];
    }
    result.updatedAt || (result.updatedAt = new Date);
    return result;
  },
  _attributeChange: function(attribute, value) {
    var array, beforeValue, _base;
    array = (_base = this.changes)[attribute] || (_base[attribute] = []);
    beforeValue = array[0] || (array[0] = this.attributes[attribute]);
    array[1] = value;
    if (array[0] === array[1]) array = null;
    if (array) {
      this.changes[attribute] = array;
    } else {
      delete this.changes[attribute];
    }
    return beforeValue;
  }
};

Tower.Model.Hierarchical = {
  ClassMethods: {
    hierarchical: function() {
      this.field("lft", {
        type: "Integer"
      });
      this.field("rgt", {
        type: "Integer"
      });
      return this.field("parentId", {
        type: "Integer"
      });
    },
    root: function(callback) {
      return this.roots.first(callback);
    },
    roots: function() {
      return this.where({
        parentColumnName: null
      }).order(this.quotedLeftColumnName());
    },
    leaves: function() {
      return this.where("" + (this.quotedRightColumnName()) + " - " + (this.quotedLeftColumnName()) + " = 1").order(this.quotedLeftColumnName());
    }
  },
  isRoot: function() {
    return !!!this.get("parentId");
  },
  root: function(callback) {
    return this.selfAndAncestors.where({
      parentColumnName: null
    }).first(callback);
  },
  selfAndAncestors: function() {
    return this.nestedSetScope().where(["" + self["class"].quotedTableName + "." + quotedLeftColumnName + " <= ? AND " + self["class"].quotedTableName + "." + quotedRightColumnName + " >= ?", left, right]);
  },
  ancestors: function() {
    return this.withoutSelf(this.selfAndAncestors);
  },
  selfAndSiblings: function() {
    return this.nestedSetScope().where({
      parentColumnName: parentId
    });
  },
  siblings: function() {
    return this.withoutSelf(this.selfAndSiblings());
  },
  leaves: function() {
    return this.descendants().where("" + self["class"].quotedTableName + "." + quotedRightColumnName + " - " + self["class"].quotedTableName + "." + quotedLeftColumnName + " = 1");
  },
  level: function(callback) {
    if (get('parentId') === null) {
      return 0;
    } else {
      return ancestors().count(callback);
    }
  },
  selfAndDescendants: function() {
    return this.nestedSetScope().where(["" + self["class"].quotedTableName + "." + quotedLeftColumnName + " >= ? AND " + self["class"].quotedTableName + "." + quotedRightColumnName + " <= ?", left, right]);
  },
  descendants: function() {
    return this.withoutSelf(this.selfAndDescendants());
  },
  isDescendantOf: function(other) {
    return other.left < self.left && self.left < other.right && (typeof sameScope === "function" ? sameScope(other) : void 0);
  },
  moveLeft: function() {
    return this.moveToLeftOf(this.leftSibling());
  },
  moveRight: function() {
    return this.moveToRightOf(this.rightSibling());
  },
  moveToLeftOf: function(node) {
    return this.moveTo(node, "left");
  },
  moveToRightOf: function(node) {
    return this.moveTo(node, "right");
  },
  moveToChildOf: function(node) {
    return this.moveTo(node, "child");
  },
  moveToRoot: function() {
    return this.moveTo(null, "root");
  },
  moveTo: function(target, position) {
    return this.runCallbacks("move", function() {});
  },
  isOrIsDescendantOf: function(other) {
    return other.left <= self.left && self.left < other.right && (typeof sameScope === "function" ? sameScope(other) : void 0);
  },
  isAncestorOf: function(other) {
    return self.left < other.left && other.left < self.right && (typeof sameScope === "function" ? sameScope(other) : void 0);
  },
  isOrIsAncestorOf: function(other) {
    return self.left <= other.left && other.left < self.right && (typeof sameScope === "function" ? sameScope(other) : void 0);
  },
  sameScope: function(other) {
    return Array(actsAsNestedSetOptions.scope).all(function(attr) {
      return self.send(attr) === other.send(attr);
    });
  },
  leftSibling: function() {
    return siblings.where(["" + self["class"].quotedTableName + "." + quotedLeftColumnName + " < ?", left]).order("" + self["class"].quotedTableName + "." + quotedLeftColumnName + " DESC").last;
  },
  rightSibling: function() {
    return siblings.where(["" + self["class"].quotedTableName + "." + quotedLeftColumnName + " > ?", left]).first;
  }
};

Tower.Model.Inheritance = {
  _computeType: function() {}
};

Tower.Model.Persistence = {
  ClassMethods: {
    defaultStore: Tower.client ? Tower.Store.Memory : Tower.Store.MongoDB,
    store: function(value) {
      if (!value && this._store) return this._store;
      if (typeof value === "function") {
        this._store = new value({
          name: this.collectionName(),
          type: Tower.namespaced(this.name)
        });
      } else if (typeof value === "object") {
        this._store || (this._store = new this.defaultStore({
          name: this.collectionName(),
          type: Tower.namespaced(this.name)
        }));
        Tower.Support.Object.extend(this._store, value);
      } else if (value) {
        this._store = value;
      }
      this._store || (this._store = new this.defaultStore({
        name: this.collectionName(),
        type: Tower.namespaced(this.name)
      }));
      return this._store;
    },
    load: function(records) {
      return this.store().load(records);
    }
  },
  InstanceMethods: {
    save: function(options, callback) {
      var _this = this;
      if (this.readOnly) throw new Error("Record is read only");
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      options || (options = {});
      if (options.validate !== false) {
        this.validate(function(error) {
          if (error) {
            if (callback) return callback.call(_this, null, false);
          } else {
            return _this._save(callback);
          }
        });
      } else {
        this._save(callback);
      }
      return this;
    },
    updateAttributes: function(attributes, callback) {
      this.set(attributes);
      return this._update(attributes, callback);
    },
    destroy: function(callback) {
      if (this.isNew()) {
        if (callback) callback.call(this, null);
      } else {
        this._destroy(callback);
      }
      return this;
    },
    "delete": function(callback) {
      return this.destroy(callback);
    },
    isPersisted: function() {
      return !!this.persistent;
    },
    isNew: function() {
      return !!!this.isPersisted();
    },
    reload: function() {},
    store: function() {
      return this.constructor.store();
    },
    _save: function(callback) {
      var _this = this;
      return this.runCallbacks("save", function(block) {
        var complete;
        complete = _this._callback(block, callback);
        if (_this.isNew()) {
          return _this._create(complete);
        } else {
          return _this._update(_this.toUpdates(), complete);
        }
      });
    },
    _create: function(callback) {
      var _this = this;
      this.runCallbacks("create", function(block) {
        var complete;
        complete = _this._callback(block, callback);
        return _this.constructor.create(_this, {
          instantiate: false
        }, function(error) {
          if (error && !callback) throw error;
          if (!error) {
            _this.changes = {};
            _this.persistent = true;
          }
          return complete.call(_this, error);
        });
      });
      return this;
    },
    _update: function(updates, callback) {
      var _this = this;
      this.runCallbacks("update", function(block) {
        var complete;
        complete = _this._callback(block, callback);
        return _this.constructor.update(_this.get("id"), updates, {
          instantiate: false
        }, function(error) {
          if (error && !callback) throw error;
          if (!error) {
            _this.changes = {};
            _this.persistent = true;
          }
          return complete.call(_this, error);
        });
      });
      return this;
    },
    _destroy: function(callback) {
      var _this = this;
      this.runCallbacks("destroy", function(block) {
        var complete;
        complete = _this._callback(block, callback);
        return _this.constructor.destroy(_this, {
          instantiate: false
        }, function(error) {
          if (error && !callback) throw error;
          if (!error) {
            _this.persistent = false;
            _this.changes = {};
            delete _this.attributes.id;
          }
          return complete.call(_this, error);
        });
      });
      return this;
    }
  }
};

Tower.Model.Queue = {
  ClassMethods: {
    enqueue: function() {}
  }
};

Tower.Model.Relation = (function(_super) {

  __extends(Relation, _super);

  function Relation(owner, name, options, callback) {
    var key, value;
    if (options == null) options = {};
    for (key in options) {
      value = options[key];
      this[key] = value;
    }
    this.owner = owner;
    this.name = name;
    this.type = Tower.namespaced(options.type || Tower.Support.String.camelize(Tower.Support.String.singularize(name)));
    this.ownerType = Tower.namespaced(owner.name);
    this.dependent || (this.dependent = false);
    this.counterCache || (this.counterCache = false);
    if (!this.hasOwnProperty("cache")) this.cache = false;
    if (!this.hasOwnProperty("readOnly")) this.readOnly = false;
    if (!this.hasOwnProperty("validate")) this.validate = false;
    if (!this.hasOwnProperty("autoSave")) this.autoSave = false;
    if (!this.hasOwnProperty("touch")) this.touch = false;
    this.inverseOf || (this.inverseOf = void 0);
    this.polymorphic = options.hasOwnProperty("as") || !!options.polymorphic;
    if (!this.hasOwnProperty("default")) this["default"] = false;
    this.singularName = Tower.Support.String.camelize(owner.name, true);
    this.pluralName = Tower.Support.String.pluralize(owner.name);
    this.singularTargetName = Tower.Support.String.singularize(name);
    this.pluralTargetName = Tower.Support.String.pluralize(name);
    this.targetType = this.type;
    if (!this.foreignKey) {
      if (this.as) {
        this.foreignKey = "" + this.as + "Id";
      } else {
        this.foreignKey = "" + this.singularName + "Id";
      }
    }
    if (this.polymorphic) {
      this.foreignType || (this.foreignType = "" + this.as + "Type");
    }
    if (this.cache) {
      if (typeof this.cache === "string") {
        this.cacheKey = this.cache;
        this.cache = true;
      } else {
        this.cacheKey = this.singularTargetName + "Ids";
      }
      this.owner.field(this.cacheKey, {
        type: "Array",
        "default": []
      });
    }
    if (this.counterCache) {
      if (typeof this.counterCache === "string") {
        this.counterCacheKey = this.counterCache;
        this.counterCache = true;
      } else {
        this.counterCacheKey = "" + this.singularTargetName + "Count";
      }
      this.owner.field(this.counterCacheKey, {
        type: "Integer",
        "default": 0
      });
    }
    this.owner.prototype[name] = function() {
      return this.relation(name);
    };
  }

  Relation.prototype.scoped = function(record) {
    return new this.constructor.Scope({
      model: this.klass(),
      owner: record,
      relation: this
    });
  };

  Relation.prototype.targetKlass = function() {
    return Tower.constant(this.targetType);
  };

  Relation.prototype.klass = function() {
    return Tower.constant(this.type);
  };

  Relation.prototype.inverse = function() {
    var name, relation, relations;
    if (this._inverse) return this._inverse;
    relations = this.targetKlass().relations();
    for (name in relations) {
      relation = relations[name];
      if (relation.inverseOf === this.name) return relation;
      if (relation.targetType === this.ownerType) return relation;
    }
    return null;
  };

  Relation.Scope = (function(_super2) {

    __extends(Scope, _super2);

    Scope.prototype.isConstructable = function() {
      return !!!this.relation.polymorphic;
    };

    function Scope(options) {
      if (options == null) options = {};
      Scope.__super__.constructor.call(this, options);
      this.owner = options.owner;
      this.relation = options.relation;
    }

    Scope.prototype.clone = function() {
      return new this.constructor({
        model: this.model,
        criteria: this.criteria.clone(),
        owner: this.owner,
        relation: this.relation
      });
    };

    Scope.prototype.setInverseInstance = function(record) {
      var inverse;
      if (record && this.invertibleFor(record)) {
        inverse = record.relation(this.inverseReflectionFor(record).name);
        return inverse.target = owner;
      }
    };

    Scope.prototype.invertibleFor = function(record) {
      return true;
    };

    Scope.prototype.inverse = function(record) {};

    return Scope;

  })(Tower.Model.Scope);

  return Relation;

})(Tower.Class);

require('./relation/belongsTo');

require('./relation/hasMany');

require('./relation/hasOne');

Tower.Model.Relations = {
  ClassMethods: {
    hasOne: function(name, options) {
      if (options == null) options = {};
      return this.relations()[name] = new Tower.Model.Relation.HasOne(this, name, options);
    },
    hasMany: function(name, options) {
      if (options == null) options = {};
      return this.relations()[name] = new Tower.Model.Relation.HasMany(this, name, options);
    },
    belongsTo: function(name, options) {
      return this.relations()[name] = new Tower.Model.Relation.BelongsTo(this, name, options);
    },
    relations: function() {
      return this._relations || (this._relations = {});
    },
    relation: function(name) {
      var relation;
      relation = this.relations()[name];
      if (!relation) {
        throw new Error("Relation '" + name + "' does not exist on '" + this.name + "'");
      }
      return relation;
    }
  },
  relation: function(name) {
    return this.constructor.relation(name).scoped(this);
  },
  buildRelation: function(name, attributes, callback) {
    return this.relation(name).build(attributes, callback);
  },
  createRelation: function(name, attributes, callback) {
    return this.relation(name).create(attributes, callback);
  },
  destroyRelations: function() {}
};

Tower.Model.Scope = (function(_super) {

  __extends(Scope, _super);

  function Scope(options) {
    if (options == null) options = {};
    this.model = options.model;
    this.criteria = options.criteria || new Tower.Model.Criteria;
    this.store = this.model.store();
  }

  Scope.prototype.toQuery = function(sortDirection) {
    return this.toCriteria(sortDirection).toQuery();
  };

  Scope.prototype.toCriteria = function(sortDirection) {
    var criteria, sort;
    criteria = this.criteria.clone();
    if (sortDirection || !criteria._order.length > 0) {
      sort = this.model.defaultSort();
      if (sort) criteria[sortDirection || sort.direction](sort.name);
    }
    return criteria;
  };

  Scope.prototype.toCreate = function() {
    return this.toQuery();
  };

  Scope.prototype.toUpdate = function() {
    return this.toQuery();
  };

  Scope.prototype.toDestroy = function() {};

  Scope.prototype.merge = function(scope) {
    return this.criteria.merge(scope.criteria);
  };

  Scope.prototype.clone = function() {
    return new this.constructor({
      model: this.model,
      criteria: this.criteria.clone()
    });
  };

  Scope.prototype._extractArgs = function(args, opts) {
    var callback, criteria, data, ids, last, options;
    if (opts == null) opts = {};
    args = Tower.Support.Array.args(args);
    callback = Tower.Support.Array.extractBlock(args);
    last = args[args.length - 1];
    if (opts.data && (Tower.Support.Object.isHash(last) || Tower.Support.Object.isArray(last))) {
      data = args.pop();
    }
    if (Tower.Support.Object.isHash(args[args.length - 1])) {
      if (data) {
        options = data;
        data = args.pop();
      } else {
        if (Tower.Support.Object.isBaseObject(args[args.length - 1])) {
          options = args.pop();
        }
      }
    }
    if (!opts.data) data = {};
    data || (data = {});
    criteria = this.criteria.clone();
    options || (options = {});
    if (!options.hasOwnProperty("instantiate")) options.instantiate = true;
    if (opts.ids && args.length > 0) ids = _.flatten(args);
    if (ids && ids.length > 0) {
      ids = _.map(ids, function(idOrRecord) {
        if (idOrRecord instanceof Tower.Model) {
          return idOrRecord.get("id");
        } else {
          return idOrRecord;
        }
      });
      criteria.where({
        id: {
          $in: ids
        }
      });
    }
    return {
      criteria: criteria,
      data: data,
      callback: callback,
      options: options
    };
  };

  return Scope;

})(Tower.Class);

require('./scope/finders');

require('./scope/persistence');

require('./scope/queries');

Tower.Model.Scope.include(Tower.Model.Scope.Finders);

Tower.Model.Scope.include(Tower.Model.Scope.Persistence);

Tower.Model.Scope.include(Tower.Model.Scope.Queries);

_ref = Tower.Model.Scope.queryMethods;
_fn = function(key) {
  return Tower.Model.Scope.prototype[key] = function() {
    var clone, _ref2;
    clone = this.clone();
    (_ref2 = clone.criteria)[key].apply(_ref2, arguments);
    return clone;
  };
};
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  key = _ref[_i];
  _fn(key);
}

Tower.Model.Scopes = {
  ClassMethods: {
    scope: function(name, scope) {
      return this[name] = scope instanceof Tower.Model.Scope ? scope : this.where(scope);
    },
    scoped: function() {
      var scope;
      scope = new Tower.Model.Scope({
        model: this
      });
      if (this.baseClass().name !== this.name) {
        scope.where({
          type: this.name
        });
      }
      return scope;
    },
    defaultSort: function(object) {
      if (object) this._defaultSort = object;
      return this._defaultSort || (this._defaultSort = {
        name: "createdAt",
        direction: "desc"
      });
    }
  }
};

_ref2 = Tower.Model.Scope.queryMethods;
_fn2 = function(key) {
  return Tower.Model.Scopes.ClassMethods[key] = function() {
    var _ref3;
    return (_ref3 = this.scoped())[key].apply(_ref3, arguments);
  };
};
for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
  key = _ref2[_j];
  _fn2(key);
}

_ref3 = Tower.Model.Scope.finderMethods;
_fn3 = function(key) {
  return Tower.Model.Scopes.ClassMethods[key] = function() {
    var _ref4;
    return (_ref4 = this.scoped())[key].apply(_ref4, arguments);
  };
};
for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
  key = _ref3[_k];
  _fn3(key);
}

_ref4 = Tower.Model.Scope.persistenceMethods;
_fn4 = function(key) {
  return Tower.Model.Scopes.ClassMethods[key] = function() {
    var _ref5;
    return (_ref5 = this.scoped())[key].apply(_ref5, arguments);
  };
};
for (_l = 0, _len4 = _ref4.length; _l < _len4; _l++) {
  key = _ref4[_l];
  _fn4(key);
}

Tower.Model.Serialization = {
  ClassMethods: {
    fromJSON: function(data) {
      var i, record, records, _len5;
      records = JSON.parse(data);
      if (!(records instanceof Array)) records = [records];
      for (i = 0, _len5 = records.length; i < _len5; i++) {
        record = records[i];
        records[i] = new this(record);
      }
      return records;
    },
    toJSON: function(records, options) {
      var record, result, _len5, _m;
      if (options == null) options = {};
      result = [];
      for (_m = 0, _len5 = records.length; _m < _len5; _m++) {
        record = records[_m];
        result.push(record.toJSON());
      }
      return result;
    }
  },
  toJSON: function(options) {
    return this._serializableHash(options);
  },
  clone: function() {
    return new this.constructor(Tower.Support.Object.clone(this.attributes));
  },
  _serializableHash: function(options) {
    var attributeNames, except, i, include, includes, methodNames, methods, name, only, opts, record, records, result, tmp, _len5, _len6, _len7, _len8, _m, _n, _o;
    if (options == null) options = {};
    result = {};
    attributeNames = Tower.Support.Object.keys(this.attributes);
    if (only = options.only) {
      attributeNames = _.union(Tower.Support.Object.toArray(only), attributeNames);
    } else if (except = options.except) {
      attributeNames = _.difference(Tower.Support.Object.toArray(except), attributeNames);
    }
    for (_m = 0, _len5 = attributeNames.length; _m < _len5; _m++) {
      name = attributeNames[_m];
      result[name] = this._readAttributeForSerialization(name);
    }
    if (methods = options.methods) {
      methodNames = Tower.Support.Object.toArray(methods);
      for (_n = 0, _len6 = methods.length; _n < _len6; _n++) {
        name = methods[_n];
        result[name] = this[name]();
      }
    }
    if (includes = options.include) {
      includes = Tower.Support.Object.toArray(includes);
      for (_o = 0, _len7 = includes.length; _o < _len7; _o++) {
        include = includes[_o];
        if (!Tower.Support.Object.isHash(include)) {
          tmp = {};
          tmp[include] = {};
          include = tmp;
          tmp = void 0;
        }
        for (name in include) {
          opts = include[name];
          records = this[name]().all();
          for (i = 0, _len8 = records.length; i < _len8; i++) {
            record = records[i];
            records[i] = record._serializableHash(opts);
          }
          result[name] = records;
        }
      }
    }
    return result;
  },
  _readAttributeForSerialization: function(name, type) {
    if (type == null) type = "json";
    return this.attributes[name];
  }
};

Tower.Model.Sync = {
  sync: function() {
    var syncAction,
      _this = this;
    syncAction = this.syncAction;
    return this.runCallbacks("sync", function() {
      return _this.runCallbacks("" + syncAction + "Sync", function() {
        return _this.store["" + syncAction + "Sync"](_this);
      });
    });
  },
  updateSyncAction: function(action) {
    return this.syncAction = (function() {
      switch (action) {
        case "delete":
          return "delete";
        case "update":
          switch (this.syncAction) {
            case "create":
              return "create";
            default:
              return "update";
          }
          break;
        default:
          switch (this.syncAction) {
            case "update":
              return "delete";
            default:
              return action;
          }
      }
    }).call(this);
  }
};

Tower.Model.Timestamp = {
  ClassMethods: {
    timestamps: function() {
      this.include(Tower.Model.Timestamp.CreatedAt);
      this.include(Tower.Model.Timestamp.UpdatedAt);
      this.field("createdAt", {
        type: "Date"
      });
      this.field("updatedAt", {
        type: "Date"
      });
      this.before("create", "setCreatedAt");
      return this.before("save", "setUpdatedAt");
    }
  },
  CreatedAt: {
    ClassMethods: {},
    setCreatedAt: function() {
      return this.set("createdAt", new Date);
    }
  },
  UpdatedAt: {
    ClassMethods: {},
    setUpdatedAt: function() {
      return this.set("updatedAt", new Date);
    }
  }
};

Tower.Model.Validations = {
  ClassMethods: {
    validates: function() {
      var attributes, key, options, validators, value, _results;
      attributes = Tower.Support.Array.args(arguments);
      options = attributes.pop();
      validators = this.validators();
      _results = [];
      for (key in options) {
        value = options[key];
        _results.push(validators.push(Tower.Model.Validator.create(key, value, attributes)));
      }
      return _results;
    },
    validators: function() {
      return this._validators || (this._validators = []);
    }
  },
  validate: function(callback) {
    var success,
      _this = this;
    success = false;
    this.runCallbacks("validate", function(block) {
      var complete, errors, iterator, validators;
      complete = _this._callback(block, callback);
      validators = _this.constructor.validators();
      errors = _this.errors = {};
      iterator = function(validator, next) {
        return validator.validateEach(_this, errors, next);
      };
      Tower.async(validators, iterator, function(error) {
        if (!(error || Tower.Support.Object.isPresent(errors))) success = true;
        return complete.call(_this, !success);
      });
      return success;
    });
    return success;
  }
};

Tower.Model.Validator = (function() {

  Validator.create = function(name, value, attributes) {
    switch (name) {
      case "presence":
        return new this.Presence(name, value, attributes);
      case "count":
      case "length":
      case "min":
      case "max":
        return new this.Length(name, value, attributes);
      case "format":
        return new this.Format(name, value, attributes);
    }
  };

  function Validator(name, value, attributes) {
    this.name = name;
    this.value = value;
    this.attributes = attributes;
  }

  Validator.prototype.validateEach = function(record, errors, callback) {
    var iterator,
      _this = this;
    iterator = function(attribute, next) {
      return _this.validate(record, attribute, errors, function(error) {
        return next();
      });
    };
    return Tower.async(this.attributes, iterator, function(error) {
      if (callback) return callback.call(_this, error);
    });
  };

  Validator.prototype.success = function(callback) {
    if (callback) callback.call(this);
    return true;
  };

  Validator.prototype.failure = function(record, attribute, errors, message, callback) {
    errors[attribute] || (errors[attribute] = []);
    errors[attribute].push(message);
    if (callback) callback.call(this, message);
    return false;
  };

  return Validator;

})();

require('./validator/format');

require('./validator/length');

require('./validator/presence');

require('./validator/uniqueness');

require('./controller/caching');

require('./controller/events');

require('./controller/http');

require('./controller/sockets');

Tower.Controller.include(Tower.Controller.Caching);

Tower.Controller.include(Tower.Controller.Events);

Tower.Controller.include(Tower.Controller.HTTP);

Tower.Controller.include(Tower.Controller.Sockets);

require('./controller/renderers');

Tower.Mailer = (function(_super) {

  __extends(Mailer, _super);

  function Mailer() {
    Mailer.__super__.constructor.apply(this, arguments);
  }

  return Mailer;

})(Tower.Class);

require('./mailer/configuration');

require('./mailer/rendering');

Tower.Mailer.include(Tower.Mailer.Configuration);

Tower.Mailer.include(Tower.Mailer.Rendering);

Tower.Support.Array = {
  extractOptions: function(args) {
    if (typeof args[args.length - 1] === "object") {
      return args.pop();
    } else {
      return {};
    }
  },
  extractBlock: function(args) {
    if (typeof args[args.length - 1] === "function") {
      return args.pop();
    } else {
      return null;
    }
  },
  args: function(args, index, withCallback, withOptions) {
    if (index == null) index = 0;
    if (withCallback == null) withCallback = false;
    if (withOptions == null) withOptions = false;
    args = Array.prototype.slice.call(args, index, args.length);
    if (withCallback && !(args.length >= 2 && typeof args[args.length - 1] === "function")) {
      throw new Error("You must pass a callback to the render method");
    }
    return args;
  },
  sortBy: function(objects) {
    var arrayComparator, callbacks, sortings, valueComparator;
    sortings = this.args(arguments, 1);
    callbacks = sortings[sortings.length - 1] instanceof Array ? {} : sortings.pop();
    valueComparator = function(x, y) {
      if (x > y) {
        return 1;
      } else {
        if (x < y) {
          return -1;
        } else {
          return 0;
        }
      }
    };
    arrayComparator = function(a, b) {
      var x, y;
      x = [];
      y = [];
      sortings.forEach(function(sorting) {
        var aValue, attribute, bValue, direction;
        attribute = sorting[0];
        direction = sorting[1];
        aValue = a[attribute];
        bValue = b[attribute];
        if (typeof callbacks[attribute] !== "undefined") {
          aValue = callbacks[attribute](aValue);
          bValue = callbacks[attribute](bValue);
        }
        x.push(direction * valueComparator(aValue, bValue));
        return y.push(direction * valueComparator(bValue, aValue));
      });
      if (x < y) {
        return -1;
      } else {
        return 1;
      }
    };
    sortings = sortings.map(function(sorting) {
      if (!(sorting instanceof Array)) sorting = [sorting, "asc"];
      if (sorting[1] === "desc") {
        sorting[1] = -1;
      } else {
        sorting[1] = 1;
      }
      return sorting;
    });
    return objects.sort(function(a, b) {
      return arrayComparator(a, b);
    });
  }
};

Tower.Support.Callbacks = {
  ClassMethods: {
    before: function() {
      return this.appendCallback.apply(this, ["before"].concat(__slice.call(arguments)));
    },
    after: function() {
      return this.appendCallback.apply(this, ["after"].concat(__slice.call(arguments)));
    },
    callback: function() {
      var args;
      args = Tower.Support.Array.args(arguments);
      if (!args[0].match(/^(?:before|around|after)$/)) {
        args = ["after"].concat(args);
      }
      return this.appendCallback.apply(this, args);
    },
    removeCallback: function(action, phase, run) {
      return this;
    },
    appendCallback: function(phase) {
      var args, callback, callbacks, filter, method, options, _len5, _m;
      args = Tower.Support.Array.args(arguments, 1);
      if (typeof args[args.length - 1] !== "object") method = args.pop();
      if (typeof args[args.length - 1] === "object") options = args.pop();
      method || (method = args.pop());
      options || (options = {});
      callbacks = this.callbacks();
      for (_m = 0, _len5 = args.length; _m < _len5; _m++) {
        filter = args[_m];
        callback = callbacks[filter] || (callbacks[filter] = new Tower.Support.Callbacks.Chain);
        callback.push(phase, method, options);
      }
      return this;
    },
    prependCallback: function(action, phase, run, options) {
      if (options == null) options = {};
      return this;
    },
    callbacks: function() {
      return this._callbacks || (this._callbacks = {});
    }
  },
  runCallbacks: function(kind, options, block, complete) {
    var chain;
    if (typeof options === "function") {
      complete = block;
      block = options;
      options = {};
    }
    options || (options = {});
    chain = this.constructor.callbacks()[kind];
    if (chain) {
      return chain.run(this, options, block, complete);
    } else {
      block.call(this);
      if (complete) return complete.call(this);
    }
  },
  _callback: function() {
    var callbacks,
      _this = this;
    callbacks = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return function(error) {
      var callback, _len5, _m, _results;
      _results = [];
      for (_m = 0, _len5 = callbacks.length; _m < _len5; _m++) {
        callback = callbacks[_m];
        if (callback) {
          _results.push(callback.call(_this, error));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
  }
};

Tower.Support.Callbacks.Chain = (function() {

  function Chain(options) {
    var key, value;
    if (options == null) options = {};
    for (key in options) {
      value = options[key];
      this[key] = value;
    }
    this.before || (this.before = []);
    this.after || (this.after = []);
  }

  Chain.prototype.run = function(binding, options, block, complete) {
    var runner,
      _this = this;
    runner = function(callback, next) {
      return callback.run(binding, options, next);
    };
    return Tower.async(this.before, runner, function(error) {
      if (!error) {
        if (block) {
          switch (block.length) {
            case 0:
              block.call(binding);
              return Tower.async(_this.after, runner, function(error) {
                if (complete) complete.call(binding);
                return binding;
              });
            default:
              return block.call(binding, function(error) {
                if (!error) {
                  return Tower.async(_this.after, runner, function(error) {
                    if (complete) complete.call(binding);
                    return binding;
                  });
                }
              });
          }
        } else {
          return Tower.async(_this.after, runner, function(error) {
            if (complete) complete.call(binding);
            return binding;
          });
        }
      }
    });
  };

  Chain.prototype.push = function(phase, method, filters, options) {
    return this[phase].push(new Tower.Support.Callback(method, filters, options));
  };

  return Chain;

})();

Tower.Support.Callback = (function() {

  function Callback(method, conditions) {
    if (conditions == null) conditions = {};
    this.method = method;
    this.conditions = conditions;
    if (conditions.hasOwnProperty("only")) {
      conditions.only = Tower.Support.Object.toArray(conditions.only);
    }
    if (conditions.hasOwnProperty("except")) {
      conditions.except = Tower.Support.Object.toArray(conditions.except);
    }
  }

  Callback.prototype.run = function(binding, options, next) {
    var conditions, method, result;
    conditions = this.conditions;
    if (options && options.hasOwnProperty("name")) {
      if (conditions.hasOwnProperty("only")) {
        if (_.indexOf(conditions.only, options.name) === -1) return next();
      } else if (conditions.hasOwnProperty("except")) {
        if (_.indexOf(conditions.except, options.name) !== -1) return next();
      }
    }
    method = this.method;
    if (typeof method === "string") method = binding[method];
    switch (method.length) {
      case 0:
        result = method.call(binding);
        return next(!result ? new Error("Callback did not pass") : null);
      default:
        return method.call(binding, next);
    }
  };

  return Callback;

})();

specialProperties = ['included', 'extended', 'prototype', 'ClassMethods', 'InstanceMethods'];

Tower.Class = (function() {

  Class.global = function(value) {
    if (value !== void 0) this._global = value;
    if (this._global === void 0) this._global = true;
    if (value === true) {
      global[this.name] = this;
    } else if (value === false) {
      delete global[this.name];
    }
    return this._global;
  };

  Class.alias = function(to, from) {
    return Tower.Support.Object.alias(this.prototype, to, from);
  };

  Class.accessor = function(key, callback) {
    Tower.Support.Object.accessor(this.prototype, key, callback);
    return this;
  };

  Class.getter = function(key, callback) {
    Tower.Support.Object.getter(this.prototype, key, callback);
    return this;
  };

  Class.setter = function(key) {
    Tower.Support.Object.setter(this.prototype, key);
    return this;
  };

  Class.classAlias = function(to, from) {
    Tower.Support.Object.alias(this, to, from);
    return this;
  };

  Class.classAccessor = function(key, callback) {
    Tower.Support.Object.accessor(this, key, callback);
    return this;
  };

  Class.classGetter = function(key, callback) {
    Tower.Support.Object.getter(this, key, callback);
    return this;
  };

  Class.classSetter = function(key) {
    Tower.Support.Object.setter(this, key);
    return this;
  };

  Class.classEval = function(block) {
    return block.call(this);
  };

  Class.delegate = function(key, options) {
    if (options == null) options = {};
    Tower.Support.Object.delegate(this.prototype, key, options);
    return this;
  };

  Class.mixin = function(self, object) {
    var key, value;
    for (key in object) {
      value = object[key];
      if (__indexOf.call(specialProperties, key) < 0) self[key] = value;
    }
    return object;
  };

  Class.extend = function(object) {
    var extended;
    this.mixin(this, object);
    extended = object.extended;
    if (extended) extended.apply(object);
    return object;
  };

  Class.self = function(object) {
    return this.extend(object);
  };

  Class.include = function(object) {
    var included;
    if (object.hasOwnProperty("ClassMethods")) this.extend(object.ClassMethods);
    if (object.hasOwnProperty("InstanceMethods")) {
      this.include(object.InstanceMethods);
    }
    this.mixin(this.prototype, object);
    included = object.included;
    if (included) included.apply(object);
    return object;
  };

  Class.className = function() {
    return Tower.Support.Object.functionName(this);
  };

  Class.prototype.className = function() {
    return this.constructor.className();
  };

  function Class() {
    this.initialize();
  }

  Class.prototype.initialize = function() {};

  return Class;

})();

Tower.Support.EventEmitter = {
  isEventEmitter: true,
  events: function() {
    return this._events || (this._events = {});
  },
  hasEventListener: function(key) {
    return Tower.Support.Object.isPresent(this.events(), key);
  },
  event: function(key) {
    var _base;
    return (_base = this.events())[key] || (_base[key] = new Tower.Event(this, key));
  },
  on: function() {
    var args, eventMap, eventType, handler, options, _results;
    args = Tower.Support.Array.args(arguments);
    if (typeof args[args.length - 1] === "object") {
      options = args.pop();
      if (args.length === 0) {
        eventMap = options;
        options = {};
      }
    } else {
      options = {};
    }
    if (typeof args[args.length - 1] === "object") {
      eventMap = args.pop();
    } else {
      eventMap = {};
      eventMap[args.shift()] = args.shift();
    }
    _results = [];
    for (eventType in eventMap) {
      handler = eventMap[eventType];
      _results.push(this.addEventHandler(eventType, handler, options));
    }
    return _results;
  },
  addEventHandler: function(type, handler, options) {
    return this.event(type).addHandler(handler);
  },
  mutation: function(wrappedFunction) {
    return function() {
      var result;
      result = wrappedFunction.apply(this, arguments);
      this.event('change').fire(this, this);
      return result;
    };
  },
  prevent: function(key) {
    this.event(key).prevent();
    return this;
  },
  allow: function(key) {
    this.event(key).allow();
    return this;
  },
  isPrevented: function(key) {
    return this.event(key).isPrevented();
  },
  fire: function(key) {
    var event;
    event = this.event(key);
    return event.fire.call(event, Tower.Support.Array.args(arguments, 1));
  },
  allowAndFire: function(key) {
    return this.event(key).allowAndFire(Tower.Support.Array.args(arguments, 1));
  }
};

Tower.Support.I18n = {
  PATTERN: /(?:%%|%\{(\w+)\}|%<(\w+)>(.*?\d*\.?\d*[bBdiouxXeEfgGcps]))/g,
  defaultLanguage: "en",
  load: function(pathOrObject, language) {
    var store;
    if (language == null) language = this.defaultLanguage;
    store = this.store();
    language = store[language] || (store[language] = {});
    Tower.Support.Object.deepMerge(language, typeof pathOrObject === "string" ? require(pathOrObject) : pathOrObject);
    return this;
  },
  translate: function(key, options) {
    if (options == null) options = {};
    if (options.hasOwnProperty("tense")) key += "." + options.tense;
    if (options.hasOwnProperty("count")) {
      switch (options.count) {
        case 0:
          key += ".none";
          break;
        case 1:
          key += ".one";
          break;
        default:
          key += ".other";
      }
    }
    return this.interpolate(this.lookup(key, options.language), options);
  },
  localize: function() {
    return this.translate.apply(this, arguments);
  },
  lookup: function(key, language) {
    var part, parts, result, _len5, _m;
    if (language == null) language = this.defaultLanguage;
    parts = key.split(".");
    result = this.store()[language];
    try {
      for (_m = 0, _len5 = parts.length; _m < _len5; _m++) {
        part = parts[_m];
        result = result[part];
      }
    } catch (error) {
      result = null;
    }
    if (result == null) {
      throw new Error("Translation doesn't exist for '" + key + "'");
    }
    return result;
  },
  store: function() {
    return this._store || (this._store = {});
  },
  interpolate: function(string, locals) {
    if (locals == null) locals = {};
    return string.replace(this.PATTERN, function(match, $1, $2, $3) {
      var value;
      if (match === '%%') {
        return '%';
      } else {
        key = $1 || $2;
        if (locals.hasOwnProperty(key)) {
          value = locals[key];
        } else {
          throw new Error("Missing interpolation argument " + key);
        }
        if (typeof value === 'function') value = value.call(locals);
        if ($3) {
          return sprintf("%" + $3, value);
        } else {
          return value;
        }
      }
    });
  }
};

Tower.Support.I18n.t = Tower.Support.I18n.translate;

Tower.Support.Number = {
  isInt: function(n) {
    return n === +n && n === (n | 0);
  },
  isFloat: function(n) {
    return n === +n && n !== (n | 0);
  }
};

specialProperties = ['included', 'extended', 'prototype', 'ClassMethods', 'InstanceMethods'];

Tower.Support.Object = {
  extend: function(object) {
    var args, key, node, value, _len5, _m;
    args = Tower.Support.Array.args(arguments, 1);
    for (_m = 0, _len5 = args.length; _m < _len5; _m++) {
      node = args[_m];
      for (key in node) {
        value = node[key];
        if (__indexOf.call(specialProperties, key) < 0) object[key] = value;
      }
    }
    return object;
  },
  cloneHash: function(options) {
    var key, result, value;
    result = {};
    for (key in options) {
      value = options[key];
      if (this.isArray(value)) {
        result[key] = this.cloneArray(value);
      } else if (this.isHash(value)) {
        result[key] = this.cloneHash(value);
      } else {
        result[key] = value;
      }
    }
    return result;
  },
  cloneArray: function(value) {
    var i, item, result, _len5;
    result = value.concat();
    for (i = 0, _len5 = result.length; i < _len5; i++) {
      item = result[i];
      if (this.isArray(item)) {
        result[i] = this.cloneArray(item);
      } else if (this.isHash(item)) {
        result[i] = this.cloneHash(item);
      }
    }
    return result;
  },
  deepMerge: function(object) {
    var args, key, node, value, _len5, _m;
    args = Tower.Support.Array.args(arguments, 1);
    for (_m = 0, _len5 = args.length; _m < _len5; _m++) {
      node = args[_m];
      for (key in node) {
        value = node[key];
        if (__indexOf.call(specialProperties, key) < 0) {
          if (object[key] && typeof value === 'object') {
            object[key] = Tower.Support.Object.deepMerge(object[key], value);
          } else {
            object[key] = value;
          }
        }
      }
    }
    return object;
  },
  deepMergeWithArrays: function(object) {
    var args, key, node, oldValue, value, _len5, _m;
    args = Tower.Support.Array.args(arguments, 1);
    for (_m = 0, _len5 = args.length; _m < _len5; _m++) {
      node = args[_m];
      for (key in node) {
        value = node[key];
        if (!(__indexOf.call(specialProperties, key) < 0)) continue;
        oldValue = object[key];
        if (oldValue) {
          if (this.isArray(oldValue)) {
            object[key] = oldValue.concat(value);
          } else if (typeof oldValue === "object" && typeof value === "object") {
            object[key] = Tower.Support.Object.deepMergeWithArrays(object[key], value);
          } else {
            object[key] = value;
          }
        } else {
          object[key] = value;
        }
      }
    }
    return object;
  },
  defineProperty: function(object, key, options) {
    if (options == null) options = {};
    return Object.defineProperty(object, key, options);
  },
  functionName: function(fn) {
    var _ref5;
    if (fn.__name__) return fn.__name__;
    if (fn.name) return fn.name;
    return (_ref5 = fn.toString().match(/\W*function\s+([\w\$]+)\(/)) != null ? _ref5[1] : void 0;
  },
  alias: function(object, to, from) {
    return object[to] = object[from];
  },
  accessor: function(object, key, callback) {
    object._accessors || (object._accessors = []);
    object._accessors.push(key);
    this.getter(key, object, callback);
    this.setter(key, object);
    return this;
  },
  setter: function(object, key) {
    if (!object.hasOwnProperty("_setAttribute")) {
      this.defineProperty(object, "_setAttribute", {
        enumerable: false,
        configurable: true,
        value: function(key, value) {
          return this["_" + key] = value;
        }
      });
    }
    object._setters || (object._setters = []);
    object._setters.push(key);
    this.defineProperty(object, key, {
      enumerable: true,
      configurable: true,
      set: function(value) {
        return this["_setAttribute"](key, value);
      }
    });
    return this;
  },
  getter: function(object, key, callback) {
    if (!object.hasOwnProperty("_getAttribute")) {
      this.defineProperty(object, "_getAttribute", {
        enumerable: false,
        configurable: true,
        value: function(key) {
          return this["_" + key];
        }
      });
    }
    object._getters || (object._getters = []);
    object._getters.push(key);
    this.defineProperty(object, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        return this["_getAttribute"](key) || (callback ? this["_" + key] = callback.apply(this) : void 0);
      }
    });
    return this;
  },
  variables: function(object) {},
  accessors: function(object) {},
  methods: function(object) {
    var key, result, value;
    result = [];
    for (key in object) {
      value = object[key];
      if (this.isFunction(value)) result.push(key);
    }
    return result;
  },
  delegate: function() {
    var isFunction, key, keys, object, options, to, _len5, _m, _n;
    object = arguments[0], keys = 3 <= arguments.length ? __slice.call(arguments, 1, _m = arguments.length - 1) : (_m = 1, []), options = arguments[_m++];
    if (options == null) options = {};
    to = options.to;
    isFunction = this.isFunction(object);
    for (_n = 0, _len5 = keys.length; _n < _len5; _n++) {
      key = keys[_n];
      if (isFunction) {
        object[key] = function() {
          var _ref5;
          return (_ref5 = this[to]())[key].apply(_ref5, arguments);
        };
      } else {
        this.defineProperty(object, key, {
          enumerable: true,
          configurable: true,
          get: function() {
            return this[to]()[key];
          }
        });
      }
    }
    return object;
  },
  isFunction: function(object) {
    return !!(object && object.constructor && object.call && object.apply);
  },
  toArray: function(object) {
    if (this.isArray(object)) {
      return object;
    } else {
      return [object];
    }
  },
  keys: function(object) {
    return Object.keys(object);
  },
  isA: function(object, isa) {},
  isRegExp: function(object) {
    return !!(object && object.test && object.exec && (object.ignoreCase || object.ignoreCase === false));
  },
  isHash: function(object) {
    return this.isObject(object) && !(this.isFunction(object) || this.isArray(object) || _.isDate(object) || _.isRegExp(object));
  },
  isBaseObject: function(object) {
    return object && object.constructor && object.constructor.name === "Object";
  },
  isArray: Array.isArray || function(object) {
    return toString.call(object) === '[object Array]';
  },
  kind: function(object) {
    var type;
    type = typeof object;
    switch (type) {
      case "object":
        if (_.isArray(object)) return "array";
        if (_.isArguments(object)) return "arguments";
        if (_.isBoolean(object)) return "boolean";
        if (_.isDate(object)) return "date";
        if (_.isRegExp(object)) return "regex";
        if (_.isNaN(object)) return "NaN";
        if (_.isNull(object)) return "null";
        if (_.isUndefined(object)) return "undefined";
        return "object";
      case "number":
        if (object === +object && object === (object | 0)) return "integer";
        if (object === +object && object !== (object | 0)) return "float";
        return "number";
      case "function":
        if (_.isRegExp(object)) return "regex";
        return "function";
      default:
        return type;
    }
  },
  isObject: function(object) {
    return object === Object(object);
  },
  isPresent: function(object) {
    return !this.isBlank(object);
  },
  isBlank: function(object) {
    var key, value;
    if (typeof object === "string") return object === "";
    for (key in object) {
      value = object[key];
      return false;
    }
    return true;
  },
  has: function(object, key) {
    return object.hasOwnProperty(key);
  }
};

Tower.Support.RegExp = {
  regexpEscape: function(string) {
    return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
};

Tower.Support.String = {
  camelize_rx: /(?:^|_|\-)(.)/g,
  capitalize_rx: /(^|\s)([a-z])/g,
  underscore_rx1: /([A-Z]+)([A-Z][a-z])/g,
  underscore_rx2: /([a-z\d])([A-Z])/g,
  parameterize: function(string) {
    return Tower.Support.String.underscore(string).replace("_", "-");
  },
  constantize: function(string, scope) {
    if (scope == null) scope = global;
    return scope[this.camelize(string)];
  },
  camelize: function(string, firstLetterLower) {
    string = string.replace(this.camelize_rx, function(str, p1) {
      return p1.toUpperCase();
    });
    if (firstLetterLower) {
      return string.substr(0, 1).toLowerCase() + string.substr(1);
    } else {
      return string;
    }
  },
  underscore: function(string) {
    return string.replace(this.underscore_rx1, '$1_$2').replace(this.underscore_rx2, '$1_$2').replace('-', '_').toLowerCase();
  },
  singularize: function(string) {
    var len;
    len = string.length;
    if (string.substr(len - 3) === 'ies') {
      return string.substr(0, len - 3) + 'y';
    } else if (string.substr(len - 1) === 's') {
      return string.substr(0, len - 1);
    } else {
      return string;
    }
  },
  pluralize: function(count, string) {
    var lastLetter, len;
    if (string) {
      if (count === 1) return string;
    } else {
      string = count;
    }
    len = string.length;
    lastLetter = string.substr(len - 1);
    if (lastLetter === 'y') {
      return "" + (string.substr(0, len - 1)) + "ies";
    } else if (lastLetter === 's') {
      return string;
    } else {
      return "" + string + "s";
    }
  },
  capitalize: function(string) {
    return string.replace(this.capitalize_rx, function(m, p1, p2) {
      return p1 + p2.toUpperCase();
    });
  },
  trim: function(string) {
    if (string) {
      return string.trim();
    } else {
      return "";
    }
  },
  interpolate: function(stringOrObject, keys) {
    var key, string, value;
    if (typeof stringOrObject === 'object') {
      string = stringOrObject[keys.count];
      if (!string) string = stringOrObject['other'];
    } else {
      string = stringOrObject;
    }
    for (key in keys) {
      value = keys[key];
      string = string.replace(new RegExp("%\\{" + key + "\\}", "g"), value);
    }
    return string;
  }
};

Tower.Support.String.toQueryValue = function(value, negate) {
  var item, items, result, _len5, _m;
  if (negate == null) negate = "";
  if (Tower.Support.Object.isArray(value)) {
    items = [];
    for (_m = 0, _len5 = value.length; _m < _len5; _m++) {
      item = value[_m];
      result = negate;
      result += item;
      items.push(result);
    }
    result = items.join(",");
  } else {
    result = negate;
    result += value.toString();
  }
  result = result.replace(" ", "+").replace(/[#%\"\|<>]/g, function(_) {
    return encodeURIComponent(_);
  });
  return result;
};

Tower.Support.String.toQuery = function(object, schema) {
  var data, key, negate, param, range, result, set, type, value;
  if (schema == null) schema = {};
  result = [];
  for (key in object) {
    value = object[key];
    param = "" + key + "=";
    type = schema[key] || "string";
    negate = type === "string" ? "-" : "^";
    if (Tower.Support.Object.isHash(value)) {
      data = {};
      if (value.hasOwnProperty(">=")) data.min = value[">="];
      if (value.hasOwnProperty(">")) data.min = value[">"];
      if (value.hasOwnProperty("<=")) data.max = value["<="];
      if (value.hasOwnProperty("<")) data.max = value["<"];
      if (value.hasOwnProperty("=~")) data.match = value["=~"];
      if (value.hasOwnProperty("!~")) data.notMatch = value["!~"];
      if (value.hasOwnProperty("==")) data.eq = value["=="];
      if (value.hasOwnProperty("!=")) data.neq = value["!="];
      data.range = data.hasOwnProperty("min") || data.hasOwnProperty("max");
      set = [];
      if (data.range && !(data.hasOwnProperty("eq") || data.hasOwnProperty("match"))) {
        range = "";
        if (data.hasOwnProperty("min")) {
          range += Tower.Support.String.toQueryValue(data.min);
        } else {
          range += "n";
        }
        range += "..";
        if (data.hasOwnProperty("max")) {
          range += Tower.Support.String.toQueryValue(data.max);
        } else {
          range += "n";
        }
        set.push(range);
      }
      if (data.hasOwnProperty("eq")) {
        set.push(Tower.Support.String.toQueryValue(data.eq));
      }
      if (data.hasOwnProperty("match")) {
        set.push(Tower.Support.String.toQueryValue(data.match));
      }
      if (data.hasOwnProperty("neq")) {
        set.push(Tower.Support.String.toQueryValue(data.neq, negate));
      }
      if (data.hasOwnProperty("notMatch")) {
        set.push(Tower.Support.String.toQueryValue(data.notMatch, negate));
      }
      param += set.join(",");
    } else {
      param += Tower.Support.String.toQueryValue(value);
    }
    result.push(param);
  }
  return result.sort().join("&");
};

Tower.Support.String.extractDomain = function(host, tldLength) {
  var parts;
  if (tldLength == null) tldLength = 1;
  if (!this.namedHost(host)) return null;
  parts = host.split('.');
  return parts.slice(0, (parts.length - 1 - 1 + tldLength) + 1 || 9e9).join(".");
};

Tower.Support.String.extractSubdomains = function(host, tldLength) {
  var parts;
  if (tldLength == null) tldLength = 1;
  if (!this.namedHost(host)) return [];
  parts = host.split('.');
  return parts.slice(0, -(tldLength + 2) + 1 || 9e9);
};

Tower.Support.String.extractSubdomain = function(host, tldLength) {
  if (tldLength == null) tldLength = 1;
  return this.extractSubdomains(host, tldLength).join('.');
};

Tower.Support.String.namedHost = function(host) {
  return !!!(host === null || /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.exec(host));
};

Tower.Support.String.rewriteAuthentication = function(options) {
  if (options.user && options.password) {
    return "" + (encodeURI(options.user)) + ":" + (encodeURI(options.password)) + "@";
  } else {
    return "";
  }
};

Tower.Support.String.hostOrSubdomainAndDomain = function(options) {
  var host, subdomain, tldLength;
  if (options.subdomain === null && options.domain === null) return options.host;
  tldLength = options.tldLength || 1;
  host = "";
  if (options.subdomain !== false) {
    subdomain = options.subdomain || this.extractSubdomain(options.host, tldLength);
    if (subdomain) host += "" + subdomain + ".";
  }
  host += options.domain || this.extractDomain(options.host, tldLength);
  return host;
};

Tower.Support.String.urlFor = function(options) {
  var params, path, port, result, schema;
  if (!(options.host || options.onlyPath)) {
    throw new Error('Missing host to link to! Please provide the :host parameter, set defaultUrlOptions[:host], or set :onlyPath to true');
  }
  result = "";
  params = options.params || {};
  path = (options.path || "").replace(/\/+/, "/");
  schema = options.schema || {};
  delete options.path;
  delete options.schema;
  if (!options.onlyPath) {
    port = options.port;
    delete options.port;
    if (options.protocol !== false) {
      result += options.protocol || "http";
      if (!result.match(Tower.Support.RegExp.regexpEscape(":|//"))) result += ":";
    }
    if (!result.match("//")) result += "//";
    result += this.rewriteAuthentication(options);
    result += this.hostOrSubdomainAndDomain(options);
    if (port) result += ":" + port;
  }
  if (options.trailingSlash) {
    result += path.replace(/\/$/, "/");
  } else {
    result += path;
  }
  if (!Tower.Support.Object.isBlank(params)) {
    result += "?" + (Tower.Support.String.toQuery(params, schema));
  }
  if (options.anchor) {
    result += "#" + (Tower.Support.String.toQuery(options.anchor));
  }
  return result;
};

Tower.urlFor = function() {
  var args, item, last, options, result, route, _len5, _m;
  args = Tower.Support.Array.args(arguments);
  if (!args[0]) return null;
  if (args[0] instanceof Tower.Model || (typeof args[0]).match(/(string|function)/)) {
    last = args[args.length - 1];
    if (last instanceof Tower.Model || (typeof last).match(/(string|function)/)) {
      options = {};
    } else {
      options = args.pop();
    }
  }
  options || (options = args.pop());
  result = "";
  if (options.controller && options.action) {
    route = Tower.Route.find({
      name: Tower.Support.String.camelize(options.controller).replace(/(Controller)?$/, "Controller"),
      action: options.action
    });
    if (route) {
      result = "/" + Tower.Support.String.parameterize(options.controller);
    }
  } else {
    for (_m = 0, _len5 = args.length; _m < _len5; _m++) {
      item = args[_m];
      result += "/";
      if (typeof item === "string") {
        result += item;
      } else if (item instanceof Tower.Model) {
        result += item.toPath();
      } else if (typeof item === "function") {
        result += item.toParam();
      }
    }
  }
  result += (function() {
    switch (options.action) {
      case "new":
        return "/new";
      case "edit":
        return "/edit";
      default:
        return "";
    }
  })();
  if (!options.hasOwnProperty("onlyPath")) options.onlyPath = true;
  options.path = result;
  return Tower.Support.String.urlFor(options);
};

Tower.Support.String.parameterize = function(string) {
  return Tower.Support.String.underscore(string).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '');
};

Tower.Support.Url = {};

Tower.View.Component = (function() {

  Component.render = function() {
    var args, block, options, template;
    args = Tower.Support.Array.args(arguments);
    template = args.shift();
    block = Tower.Support.Array.extractBlock(args);
    if (!(args[args.length - 1] instanceof Tower.Model || typeof args[args.length - 1] !== "object")) {
      options = args.pop();
    }
    options || (options = {});
    options.template = template;
    return (new this(args, options)).render(block);
  };

  function Component(args, options) {
    var key, value;
    for (key in options) {
      value = options[key];
      this[key] = value;
    }
  }

  Component.prototype.tag = function() {
    var args, key;
    key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return this.template.tag(key, args);
  };

  Component.prototype.addClass = function(string, args) {
    var arg, result, _len5, _m;
    result = string ? string.split(/\s+/g) : [];
    for (_m = 0, _len5 = args.length; _m < _len5; _m++) {
      arg = args[_m];
      if (!arg) continue;
      if (!(result.indexOf(arg) > -1)) result.push(arg);
    }
    return result.join(" ");
  };

  return Component;

})();

Tower.View.Form = (function(_super) {

  __extends(Form, _super);

  function Form(args, options) {
    var klass;
    Form.__super__.constructor.apply(this, arguments);
    this.model = args.shift() || new Tower.Model;
    if (typeof this.model === "string") {
      klass = Tower.constant(Tower.Support.String.camelize(this.model));
      this.model = klass ? new klass : null;
    }
    this.attributes = this._extractAttributes(options);
  }

  Form.prototype.render = function(callback) {
    var _this = this;
    return this.tag("form", this.attributes, function() {
      var builder;
      _this.tag("input", {
        type: "hidden",
        name: "_method",
        value: _this.attributes["data-method"]
      });
      if (callback) {
        builder = new Tower.View.Form.Builder([], {
          template: _this.template,
          tabindex: 1,
          accessKeys: {},
          model: _this.model
        });
        return builder.render(callback);
      }
    });
  };

  Form.prototype._extractAttributes = function(options) {
    var attributes, method;
    if (options == null) options = {};
    attributes = options.html || {};
    attributes.action = options.url || Tower.urlFor(this.model);
    if (options.hasOwnProperty("class")) attributes["class"] = options["class"];
    if (options.hasOwnProperty("id")) attributes.id = options.id;
    attributes.id || (attributes.id = Tower.Support.String.parameterize("" + this.model.constructor.name + "-form"));
    if (options.multipart || attributes.multipart === true) {
      attributes.enctype = "multipart/form-data";
    }
    attributes.role = "form";
    attributes.novalidate = "true";
    if (options.hasOwnProperty("validate")) {
      attributes["data-validate"] = options.validate.toString();
    }
    method = attributes.method || options.method;
    if (!method || method === "") {
      if (this.model && this.model.get("id")) {
        method = "put";
      } else {
        method = "post";
      }
    }
    attributes["data-method"] = method;
    attributes.method = method === "get" ? "get" : "post";
    return attributes;
  };

  return Form;

})(Tower.View.Component);

require('./form/builder');

require('./form/field');

require('./form/fieldset');

Tower.View.Helpers = {
  titleTag: function(title) {
    return "<title>" + title + "</title>";
  },
  metaTag: function(name, content) {
    return "<meta name=\"" + name + "\" content=\"" + content + "\"/>";
  },
  tag: function(name, options) {},
  linkTag: function(title, path, options) {},
  imageTag: function(path, options) {},
  csrfMetaTag: function() {
    return this.metaTag("csrf-token", this.request.session._csrf);
  },
  contentTypeTag: function(type) {
    if (type == null) type = "UTF-8";
    return "<meta charset=\"" + type + "\" />";
  },
  javascriptTag: function(path) {
    return "<script type=\"text/javascript\" src=\"" + path + "\" ></script>";
  },
  stylesheetTag: function(path) {
    return "<link href=\"" + path + "\" media=\"screen\" rel=\"stylesheet\" type=\"text/css\"/>";
  },
  mobileTags: function() {
    return "<meta content='yes' name='apple-mobile-web-app-capable'>\n<meta content='yes' name='apple-touch-fullscreen'>\n<meta content='initial-scale = 1.0, maximum-scale = 1.0, user-scalable = no, width = device-width' name='viewport'>";
  }
};

Tower.View.Rendering = {
  render: function(options, callback) {
    var _this = this;
    options.type || (options.type = this.constructor.engine);
    if (!options.hasOwnProperty("layout") && this._context.layout) {
      options.layout = this._context.layout();
    }
    options.locals = this._renderingContext(options);
    return this._renderBody(options, function(error, body) {
      if (error) return callback(error, body);
      return _this._renderLayout(body, options, callback);
    });
  },
  partial: function(path, options, callback) {
    var prefixes, template;
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    options || (options = {});
    prefixes = options.prefixes;
    if (this._context) prefixes || (prefixes = [this._context.collectionName]);
    template = this._readTemplate(path, prefixes, options.type || Tower.View.engine);
    return this._renderString(template, options, callback);
  },
  _renderBody: function(options, callback) {
    if (options.text) {
      return callback(null, options.text);
    } else if (options.json) {
      return callback(null, typeof options.json === "string" ? options.json : JSON.stringify(options.json));
    } else {
      if (!options.inline) {
        options.template = this._readTemplate(options.template, options.prefixes, options.type);
      }
      return this._renderString(options.template, options, callback);
    }
  },
  _renderLayout: function(body, options, callback) {
    var layout;
    if (options.layout) {
      layout = this._readTemplate("layouts/" + options.layout, [], options.type);
      options.locals.body = body;
      return this._renderString(layout, options, callback);
    } else {
      return callback(null, body);
    }
  },
  _renderString: function(string, options, callback) {
    var coffeekup, e, engine, hardcode, helper, locals, mint, result, _len5, _m, _ref5;
    if (options == null) options = {};
    if (!!options.type.match(/coffee/)) {
      e = null;
      result = null;
      coffeekup = Tower.client ? global.CoffeeKup : require("coffeekup");
      try {
        locals = options.locals;
        locals.renderWithEngine = this.renderWithEngine;
        locals._readTemplate = this._readTemplate;
        locals.cache = Tower.env !== "development";
        locals.format = true;
        hardcode = {};
        _ref5 = Tower.View.helpers;
        for (_m = 0, _len5 = _ref5.length; _m < _len5; _m++) {
          helper = _ref5[_m];
          hardcode = _.extend(hardcode, helper);
        }
        hardcode = _.extend(hardcode, {
          tags: coffeekup.tags
        });
        locals.hardcode = hardcode;
        locals._ = _;
        result = coffeekup.render(string, locals);
      } catch (error) {
        e = error;
      }
      return callback(e, result);
    } else if (options.type) {
      mint = require("mint");
      engine = require("mint").engine(options.type);
      return mint[engine](string, options.locals, callback);
    } else {
      mint = require("mint");
      engine = require("mint");
      options.locals.string = string;
      return engine.render(options.locals, callback);
    }
  },
  _renderingContext: function(options) {
    var key, locals, value;
    locals = this;
    _ref = this._context;
    for (key in _ref) {
      value = _ref[key];
      if (!key.match(/^(constructor|head)/)) locals[key] = value;
    }
    locals = Tower.Support.Object.extend(locals, options.locals);
    if (this.constructor.prettyPrint) locals.pretty = true;
    return locals;
  },
  _readTemplate: function(template, prefixes, ext) {
    var result, _base, _name;
    if (typeof template !== "string") return template;
    result = (_base = this.constructor.cache)[_name = "app/views/" + template] || (_base[_name] = this.constructor.store().find({
      path: template,
      ext: ext,
      prefixes: prefixes
    }));
    if (!result) throw new Error("Template '" + template + "' was not found.");
    return result;
  },
  renderWithEngine: function(template, engine) {
    var mint;
    if (Tower.client) {
      return "(" + template + ").call(this);";
    } else {
      mint = require("mint");
      return mint[mint.engine(engine || "coffee")](template, {}, function(error, result) {
        if (error) return console.log(error);
      });
    }
  }
};

Tower.View.Table = (function(_super) {

  __extends(Table, _super);

  function Table(args, options) {
    var aria, data, recordOrKey;
    Table.__super__.constructor.apply(this, arguments);
    recordOrKey = args.shift();
    this.key = this.recordKey(recordOrKey);
    this.rowIndex = 0;
    this.cellIndex = 0;
    this.scope = "table";
    this.headers = [];
    options.summary || (options.summary = "Table for " + (_.titleize(this.key)));
    options.role = "grid";
    options["class"] = this.addClass(options["class"] || "", ["table"]);
    data = options.data || (options.data = {});
    if (options.hasOwnProperty("total")) data.total = options.total;
    if (options.hasOwnProperty("page")) data.page = options.page;
    if (options.hasOwnProperty("count")) data.count = options.count;
    aria = options.aria || {};
    delete options.aria;
    if (!(aria.hasOwnProperty("aria-multiselectable") || options.multiselect === true)) {
      aria["aria-multiselectable"] = false;
    }
    options.id || (options.id = "" + recordOrKey + "-table");
    this.options = {
      summary: options.summary,
      role: options.role,
      data: options.data,
      "class": options["class"]
    };
  }

  Table.prototype.render = function(block) {
    var _this = this;
    return this.tag("table", this.options, function() {
      if (block) block(_this);
      return null;
    });
  };

  Table.prototype.tableQueryRowClass = function() {
    return ["search-row", queryParams.except("page", "sort").blank != null ? null : "search-results"].compact.join(" ");
  };

  Table.prototype.linkToSort = function(title, attribute, options) {
    var sortParam;
    if (options == null) options = {};
    sortParam = sortValue(attribute, oppositeSortDirection(attribute));
    return linkTo(title, withParams(request.path, {
      sort: sortParam
    }), options);
  };

  Table.prototype.nextPagePath = function(collection) {
    return withParams(request.path, {
      page: collection.nextPage
    });
  };

  Table.prototype.prevPagePath = function(collection) {
    return withParams(request.path, {
      page: collection.prevPage
    });
  };

  Table.prototype.firstPagePath = function(collection) {
    return withParams(request.path, {
      page: 1
    });
  };

  Table.prototype.lastPagePath = function(collection) {
    return withParams(request.path, {
      page: collection.lastPage
    });
  };

  Table.prototype.currentPageNum = function() {
    var page;
    page = params.page ? params.page : 1;
    if (page < 1) page = 1;
    return page;
  };

  Table.prototype.caption = function() {};

  Table.prototype.head = function(attributes, block) {
    if (attributes == null) attributes = {};
    this.hideHeader = attributes.visible === false;
    delete attributes.visible;
    return this._section("head", attributes, block);
  };

  Table.prototype.body = function(attributes, block) {
    if (attributes == null) attributes = {};
    return this._section("body", attributes, block);
  };

  Table.prototype.foot = function(attributes, block) {
    if (attributes == null) attributes = {};
    return this._section("foot", attributes, block);
  };

  Table.prototype._section = function(scope, attributes, block) {
    this.rowIndex = 0;
    this.scope = scope;
    this.tag("t" + scope, attributes, block);
    this.rowIndex = 0;
    return this.scope = "table";
  };

  Table.prototype.row = function() {
    var args, attributes, block, _m;
    args = 2 <= arguments.length ? __slice.call(arguments, 0, _m = arguments.length - 1) : (_m = 0, []), block = arguments[_m++];
    attributes = Tower.Support.Array.extractOptions(args);
    attributes.scope = "row";
    if (this.scope === "body") attributes.role = "row";
    this.rowIndex += 1;
    this.cellIndex = 0;
    this.tag("tr", attributes, block);
    return this.cellIndex = 0;
  };

  Table.prototype.column = function() {
    var args, attributes, block, value, _base, _m;
    args = 2 <= arguments.length ? __slice.call(arguments, 0, _m = arguments.length - 1) : (_m = 0, []), block = arguments[_m++];
    attributes = Tower.Support.Array.extractOptions(args);
    value = args.shift();
    if (typeof (_base = Tower.View.idEnabledOn).include === "function" ? _base.include("table") : void 0) {
      attributes.id || (attributes.id = this.idFor("header", key, value, this.rowIndex, this.cellIndex));
    }
    if (attributes.hasOwnProperty("width")) {
      attributes.width = this.pixelate(attributes.width);
    }
    if (attributes.hasOwnProperty("height")) {
      attributes.height = this.pixelate(attributes.height);
    }
    this.headers.push(attributes.id);
    tag("col", attributes);
    return this.cellIndex += 1;
  };

  Table.prototype.header = function() {
    var args, attributes, block, direction, label, sort, value, _base,
      _this = this;
    args = Tower.Support.Array.args(arguments);
    block = Tower.Support.Array.extractBlock(args);
    attributes = Tower.Support.Array.extractOptions(args);
    value = args.shift();
    attributes.abbr || (attributes.abbr = value);
    attributes.role = "columnheader";
    if (typeof (_base = Tower.View.idEnabledOn).include === "function" ? _base.include("table") : void 0) {
      attributes.id || (attributes.id = this.idFor("header", key, value, this.rowIndex, this.cellIndex));
    }
    attributes.scope = "col";
    if (attributes.hasOwnProperty("for")) {
      attributes.abbr || (attributes.abbr = attributes["for"]);
    }
    attributes.abbr || (attributes.abbr = value);
    delete attributes["for"];
    if (attributes.hasOwnProperty("width")) {
      attributes.width = this.pixelate(attributes.width);
    }
    if (attributes.hasOwnProperty("height")) {
      attributes.height = this.pixelate(attributes.height);
    }
    sort = attributes.sort === true;
    delete attributes.sort;
    if (sort) {
      attributes["class"] = this.addClass(attributes["class"] || "", [attributes.sortClass || "sortable"]);
      attributes.direction || (attributes.direction = "asc");
    }
    delete attributes.sortClass;
    label = attributes.label || _.titleize(value.toString());
    delete attributes.label;
    direction = attributes.direction;
    delete attributes.direction;
    if (direction) {
      attributes["aria-sort"] = direction;
      attributes["class"] = [attributes["class"], direction].join(" ");
      attributes["aria-selected"] = true;
    } else {
      attributes["aria-sort"] = "none";
      attributes["aria-selected"] = false;
    }
    this.headers.push(attributes.id);
    if (block) {
      this.tag("th", attributes, block);
    } else {
      if (sort) {
        this.tag("th", attributes, function() {
          return _this.linkToSort(label, value);
        });
      } else {
        this.tag("th", attributes, function() {
          return _this.tag("span", label);
        });
      }
    }
    return this.cellIndex += 1;
  };

  Table.prototype.linkToSort = function(label, value) {
    var direction,
      _this = this;
    direction = "+";
    return this.tag("a", {
      href: "?sort=" + direction
    }, function() {
      return _this.tag("span", label);
    });
  };

  Table.prototype.cell = function() {
    var args, attributes, block, value, _base, _m;
    args = 2 <= arguments.length ? __slice.call(arguments, 0, _m = arguments.length - 1) : (_m = 0, []), block = arguments[_m++];
    attributes = Tower.Support.Array.extractOptions(args);
    value = args.shift();
    attributes.role = "gridcell";
    if (typeof (_base = Tower.View.idEnabledOn).include === "function" ? _base.include("table") : void 0) {
      attributes.id || (attributes.id = this.idFor("cell", key, value, this.rowIndex, this.cellIndex));
    }
    attributes.headers = this.headers[this.cellIndex];
    if (attributes.hasOwnProperty("width")) {
      attributes.width = this.pixelate(attributes.width);
    }
    if (attributes.hasOwnProperty("height")) {
      attributes.height = this.pixelate(attributes.height);
    }
    if (block) {
      this.tag("td", attributes, block);
    } else {
      this.tag("td", value, attributes);
    }
    return this.cellIndex += 1;
  };

  Table.prototype.recordKey = function(recordOrKey) {
    if (typeof recordOrKey === "string") {
      return recordOrKey;
    } else {
      return recordOrKey.constructor.name;
    }
  };

  Table.prototype.idFor = function(type, key, value, row_index, column_index) {
    if (row_index == null) row_index = this.row_index;
    if (column_index == null) column_index = this.column_index;
    [key, type, row_index, column_index].compact.map(function(node) {
      return node.replace(/[\s_]/, "-");
    });
    return end.join("-");
  };

  Table.prototype.pixelate = function(value) {
    if (typeof value === "string") {
      return value;
    } else {
      return "" + value + "px";
    }
  };

  return Table;

})(Tower.View.Component);

Tower.Controller.Elements = {
  ClassMethods: {
    extractElements: function(target, options) {
      var key, method, result, selector, selectors;
      if (options == null) options = {};
      result = {};
      for (method in options) {
        selectors = options[method];
        for (key in selectors) {
          selector = selectors[key];
          result[key] = target[method](selector);
        }
      }
      return result;
    },
    processElements: function(target, options) {
      if (options == null) options = {};
      return this.elements = this.extractElements(target, options);
    },
    clickHandler: function(name, handler, options) {
      var _this = this;
      return $(this.dispatcher).on(name, function(event) {});
    },
    submitHandler: function(name, handler, options) {
      var _this = this;
      return $(this.dispatcher).on(name, function(event) {
        var action, elements, form, method, params, target;
        try {
          target = $(event.target);
          form = target.closest("form");
          action = form.attr("action");
          method = (form.attr("data-method") || form.attr("method")).toUpperCase();
          params = form.serializeParams();
          params.method = method;
          params.action = action;
          elements = _.extend({
            target: target,
            form: form
          }, {});
          _this._dispatch(handler, {
            elements: elements,
            params: params
          });
        } catch (error) {
          console.log(error);
        }
        return false;
      });
    },
    invalidForm: function() {
      var attribute, element, errors, field, _ref5, _results;
      element = $("#" + this.resourceName + "-" + this.elementName);
      _ref5 = this.resource.errors;
      _results = [];
      for (attribute in _ref5) {
        errors = _ref5[attribute];
        field = $("#" + this.resourceName + "-" + attribute + "-field");
        if (field.length) {
          field.css("background", "yellow");
          _results.push($("input", field).after("<output class='error'>" + (errors.join("\n")) + "</output>"));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  }
};

Tower.Controller.Events = {
  ClassMethods: {
    DOM_EVENTS: ["click", "dblclick", "blur", "error", "focus", "focusIn", "focusOut", "hover", "keydown", "keypress", "keyup", "load", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup", "mousewheel", "ready", "resize", "scroll", "select", "submit", "tap", "taphold", "swipe", "swipeleft", "swiperight"],
    dispatcher: global,
    addEventHandler: function(name, handler, options) {
      if (options.type === "socket" || !name.match(this.DOM_EVENT_PATTERN)) {
        return this.addSocketEventHandler(name, handler, options);
      } else {
        return this.addDomEventHandler(name, handler, options);
      }
    },
    socketNamespace: function() {
      return Tower.Support.String.pluralize(Tower.Support.String.camelize(this.name.replace(/(Controller)$/, ""), false));
    },
    addSocketEventHandler: function(name, handler, options) {
      var _this = this;
      this.io || (this.io = Tower.Application.instance().io.connect(this.socketNamespace()));
      return this.io.on(name, function(data) {
        return _this._dispatch(void 0, handler, data);
      });
    },
    addDomEventHandler: function(name, handler, options) {
      var eventType, method, parts, selector,
        _this = this;
      parts = name.split(/\ +/);
      name = parts.shift();
      selector = parts.join(" ");
      if (selector && selector !== "") options.target = selector;
      options.target || (options.target = "body");
      eventType = name.split(/[\.:]/)[0];
      method = this["" + eventType + "Handler"];
      if (method) {
        method.call(this, name, handler, options);
      } else {
        $(this.dispatcher).on(name, options.target, function(event) {
          return _this._dispatch(handler, options);
        });
      }
      return this;
    },
    _dispatch: function(handler, options) {
      var controller;
      if (options == null) options = {};
      controller = this.instance();
      controller.elements || (controller.elements = {});
      controller.params || (controller.params = {});
      if (options.params) _.extend(controller.params, options.params);
      if (options.elements) _.extend(controller.elements, options.elements);
      if (typeof handler === "string") {
        return controller[handler].call(controller, event);
      } else {
        return handler.call(controller, event);
      }
    }
  }
};

Tower.Controller.Events.ClassMethods.DOM_EVENT_PATTERN = new RegExp("^(" + (Tower.Controller.Events.ClassMethods.DOM_EVENTS.join("|")) + ")");

Tower.Controller.Handlers = {
  ClassMethods: {
    submitHandler: function(name, handler, options) {
      var _this = this;
      return $(this.dispatcher).on(name, function(event) {
        var action, elements, form, method, params, target;
        target = $(event.target);
        form = target.closest("form");
        action = form.attr("action");
        method = (form.attr("data-method") || form.attr("method")).toUpperCase();
        params = form.serializeParams();
        params.method = method;
        params.action = action;
        elements = _.extend({
          target: target,
          form: form
        }, {});
        return _this._dispatch(handler, {
          elements: elements,
          params: params
        });
      });
    }
  }
};

$.fn.serializeParams = function(coerce) {
  return $.serializeParams($(this).serialize(), coerce);
};

$.serializeParams = function(params, coerce) {
  var array, coerce_types, cur, i, index, item, keys, keys_last, obj, param, val, _len5;
  obj = {};
  coerce_types = {
    "true": !0,
    "false": !1,
    "null": null
  };
  array = params.replace(/\+/g, " ").split("&");
  for (index = 0, _len5 = array.length; index < _len5; index++) {
    item = array[index];
    param = item.split("=");
    key = decodeURIComponent(param[0]);
    val = void 0;
    cur = obj;
    i = 0;
    keys = key.split("][");
    keys_last = keys.length - 1;
    if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
      keys[keys_last] = keys[keys_last].replace(/\]$/, "");
      keys = keys.shift().split("[").concat(keys);
      keys_last = keys.length - 1;
    } else {
      keys_last = 0;
    }
    if (param.length === 2) {
      val = decodeURIComponent(param[1]);
      if (coerce) {
        val = (val && !isNaN(val) ? +val : (val === "undefined" ? undefined : (coerce_types[val] !== undefined ? coerce_types[val] : val)));
      }
      if (keys_last) {
        while (i <= keys_last) {
          key = (keys[i] === "" ? cur.length : keys[i]);
          cur = cur[key] = (i < keys_last ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : []) : val);
          i++;
        }
      } else {
        if ($.isArray(obj[key])) {
          obj[key].push(val);
        } else if (obj[key] !== undefined) {
          obj[key] = [obj[key], val];
        } else {
          obj[key] = val;
        }
      }
    } else {
      if (key) obj[key] = (coerce ? undefined : "");
    }
  }
  return obj;
};

Tower.View.MetaHelper = {
  title: function(string) {
    return document.title = string;
  }
};

Tower.View.ValidationHelper = {
  success: function() {
    return this.redirectTo("/");
  },
  failure: function(error) {
    if (error) {
      return this.flashError(error);
    } else {
      return this.invalidate();
    }
  },
  invalidate: function() {
    var attribute, element, errors, field, _ref5, _results;
    element = $("#" + this.resourceName + "-" + this.elementName);
    _ref5 = this.resource.errors;
    _results = [];
    for (attribute in _ref5) {
      errors = _ref5[attribute];
      field = $("#" + this.resourceName + "-" + attribute + "-field");
      if (field.length) {
        field.css("background", "yellow");
        _results.push($("input", field).after("<output class='error'>" + (errors.join("\n")) + "</output>"));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  }
};

Tower.HTTP.Param.Array = (function(_super) {

  __extends(Array, _super);

  function Array() {
    Array.__super__.constructor.apply(this, arguments);
  }

  Array.prototype.parse = function(value) {
    var array, isRange, negation, string, values, _len5, _m,
      _this = this;
    values = [];
    array = value.toString().split(/[,\|]/);
    for (_m = 0, _len5 = array.length; _m < _len5; _m++) {
      string = array[_m];
      isRange = false;
      negation = !!string.match(/^\^/);
      string = string.replace(/^\^/, "");
      string.replace(/([^\.]+)?(\.{2})([^\.]+)?/, function(_, startsOn, operator, endsOn) {
        var range;
        isRange = true;
        range = [];
        if (!!(startsOn && startsOn.match(/^\d/))) {
          range.push(_this.parseValue(startsOn, ["$gte"]));
        }
        if (!!(endsOn && endsOn.match(/^\d/))) {
          range.push(_this.parseValue(endsOn, ["$lte"]));
        }
        return values.push(range);
      });
      if (!isRange) values.push([this.parseValue(string, ["$eq"])]);
    }
    return values;
  };

  return Array;

})(Tower.HTTP.Param);

Tower.HTTP.Param.Date = (function(_super) {

  __extends(Date, _super);

  function Date() {
    Date.__super__.constructor.apply(this, arguments);
  }

  Date.prototype.parse = function(value) {
    var array, isRange, string, values, _len5, _m,
      _this = this;
    values = [];
    array = value.toString().split(/[\s,\+]/);
    for (_m = 0, _len5 = array.length; _m < _len5; _m++) {
      string = array[_m];
      isRange = false;
      string.replace(/([^\.]+)?(\.\.)([^\.]+)?/, function(_, startsOn, operator, endsOn) {
        var range;
        isRange = true;
        range = [];
        if (!!(startsOn && startsOn.match(/^\d/))) {
          range.push(_this.parseValue(startsOn, ["$gte"]));
        }
        if (!!(endsOn && endsOn.match(/^\d/))) {
          range.push(_this.parseValue(endsOn, ["$lte"]));
        }
        return values.push(range);
      });
      if (!isRange) values.push([this.parseValue(string, ["$eq"])]);
    }
    return values;
  };

  Date.prototype.parseValue = function(value, operators) {
    return Date.__super__.parseValue.call(this, Tower.date(value), operators);
  };

  return Date;

})(Tower.HTTP.Param);

Tower.HTTP.Param.Number = (function(_super) {

  __extends(Number, _super);

  function Number() {
    Number.__super__.constructor.apply(this, arguments);
  }

  Number.prototype.parse = function(value) {
    var array, isRange, negation, string, values, _len5, _m,
      _this = this;
    values = [];
    array = value.toString().split(/[,\|]/);
    for (_m = 0, _len5 = array.length; _m < _len5; _m++) {
      string = array[_m];
      isRange = false;
      negation = !!string.match(/^\^/);
      string = string.replace(/^\^/, "");
      string.replace(/([^\.]+)?(\.{2})([^\.]+)?/, function(_, startsOn, operator, endsOn) {
        var range;
        isRange = true;
        range = [];
        if (!!(startsOn && startsOn.match(/^\d/))) {
          range.push(_this.parseValue(startsOn, ["$gte"]));
        }
        if (!!(endsOn && endsOn.match(/^\d/))) {
          range.push(_this.parseValue(endsOn, ["$lte"]));
        }
        return values.push(range);
      });
      if (!isRange) values.push([this.parseValue(string, ["$eq"])]);
    }
    return values;
  };

  Number.prototype.parseValue = function(value, operators) {
    return Number.__super__.parseValue.call(this, parseFloat(value), operators);
  };

  return Number;

})(Tower.HTTP.Param);

Tower.HTTP.Param.String = (function(_super) {

  __extends(String, _super);

  function String() {
    String.__super__.constructor.apply(this, arguments);
  }

  String.prototype.parse = function(value) {
    var arrays, i, node, values, _len5,
      _this = this;
    arrays = value.split(/(?:[\s|\+]OR[\s|\+]|\||,)/);
    for (i = 0, _len5 = arrays.length; i < _len5; i++) {
      node = arrays[i];
      values = [];
      node.replace(/([\+\-\^]?[\w@_\s\d\.\$]+|-?\'[\w@-_\s\d\+\.\$]+\')/g, function(_, token) {
        var exact, negation, operators;
        negation = false;
        exact = false;
        token = token.replace(/^(\+?-+)/, function(_, $1) {
          negation = $1 && $1.length > 0;
          return "";
        });
        token = token.replace(/^\'(.+)\'$/, function(_, $1) {
          exact = $1 && $1.length > 0;
          return $1;
        });
        if (negation) {
          operators = [exact ? "$neq" : "$notMatch"];
        } else {
          operators = [exact ? "$eq" : "$match"];
        }
        if (!!token.match(/^\+?\-?\^/)) operators.push("^");
        if (!!token.match(/\$$/)) operators.push("$");
        values.push(_this.parseValue(_this._clean(token), operators));
        return _;
      });
      arrays[i] = values;
    }
    return arrays;
  };

  return String;

})(Tower.HTTP.Param);

Tower.HTTP.Route.DSL = (function() {

  function DSL() {
    this._scope = {};
  }

  DSL.prototype.match = function() {
    this.scope || (this.scope = {});
    return Tower.HTTP.Route.create(new Tower.HTTP.Route(this._extractOptions.apply(this, arguments)));
  };

  DSL.prototype.get = function() {
    return this.matchMethod("get", Tower.Support.Array.args(arguments));
  };

  DSL.prototype.post = function() {
    return this.matchMethod("post", Tower.Support.Array.args(arguments));
  };

  DSL.prototype.put = function() {
    return this.matchMethod("put", Tower.Support.Array.args(arguments));
  };

  DSL.prototype["delete"] = function() {
    return this.matchMethod("delete", Tower.Support.Array.args(arguments));
  };

  DSL.prototype.matchMethod = function(method, args) {
    var name, options, path;
    if (typeof args[args.length - 1] === "object") {
      options = args.pop();
    } else {
      options = {};
    }
    name = args.shift();
    options.method = method;
    options.action = name;
    options.name = name;
    if (this._scope.name) {
      options.name = this._scope.name + Tower.Support.String.camelize(options.name);
    }
    path = "/" + name;
    if (this._scope.path) path = this._scope.path + path;
    this.match(path, options);
    return this;
  };

  DSL.prototype.scope = function(options, block) {
    var originalScope;
    if (options == null) options = {};
    originalScope = this._scope || (this._scope = {});
    this._scope = Tower.Support.Object.extend({}, originalScope, options);
    block.call(this);
    this._scope = originalScope;
    return this;
  };

  DSL.prototype.controller = function(controller, options, block) {
    options.controller = controller;
    return this.scope(options, block);
  };

  DSL.prototype.namespace = function(path, options, block) {
    if (typeof options === 'function') {
      block = options;
      options = {};
    } else {
      options = {};
    }
    options = Tower.Support.Object.extend({
      name: path,
      path: path,
      as: path,
      module: path,
      shallowPath: path,
      shallowPrefix: path
    }, options);
    if (options.name && this._scope.name) {
      options.name = this._scope.name + Tower.Support.String.camelize(options.name);
    }
    return this.scope(options, block);
  };

  DSL.prototype.constraints = function(options, block) {
    return this.scope({
      constraints: options
    }, block);
  };

  DSL.prototype.defaults = function(options, block) {
    return this.scope({
      defaults: options
    }, block);
  };

  DSL.prototype.resource = function(name, options) {
    if (options == null) options = {};
    options.controller = name;
    this.match("" + name + "/new", Tower.Support.Object.extend({
      action: "new"
    }, options));
    this.match("" + name, Tower.Support.Object.extend({
      action: "create",
      method: "POST"
    }, options));
    this.match("" + name + "/", Tower.Support.Object.extend({
      action: "show"
    }, options));
    this.match("" + name + "/edit", Tower.Support.Object.extend({
      action: "edit"
    }, options));
    this.match("" + name, Tower.Support.Object.extend({
      action: "update",
      method: "PUT"
    }, options));
    return this.match("" + name, Tower.Support.Object.extend({
      action: "destroy",
      method: "DELETE"
    }, options));
  };

  DSL.prototype.resources = function(name, options, callback) {
    var many, one, path;
    if (typeof options === 'function') {
      callback = options;
      options = {};
    } else {
      options = {};
    }
    options.controller || (options.controller = name);
    path = "/" + name;
    if (this._scope.path) path = this._scope.path + path;
    if (this._scope.name) {
      many = this._scope.name + Tower.Support.String.camelize(name);
    } else {
      many = name;
    }
    one = Tower.Support.String.singularize(many);
    this.match("" + path, Tower.Support.Object.extend({
      name: "" + many,
      action: "index"
    }, options));
    this.match("" + path + "/new", Tower.Support.Object.extend({
      name: "new" + (Tower.Support.String.camelize(one)),
      action: "new"
    }, options));
    this.match("" + path, Tower.Support.Object.extend({
      action: "create",
      method: "POST"
    }, options));
    this.match("" + path + "/:id", Tower.Support.Object.extend({
      name: "" + one,
      action: "show"
    }, options));
    this.match("" + path + "/:id/edit", Tower.Support.Object.extend({
      name: "edit" + (Tower.Support.String.camelize(one)),
      action: "edit"
    }, options));
    this.match("" + path + "/:id", Tower.Support.Object.extend({
      action: "update",
      method: "PUT"
    }, options));
    this.match("" + path + "/:id", Tower.Support.Object.extend({
      action: "destroy",
      method: "DELETE"
    }, options));
    if (callback) {
      this.scope(Tower.Support.Object.extend({
        path: "" + path + "/:" + (Tower.Support.String.singularize(name)) + "Id",
        name: one
      }, options), callback);
    }
    return this;
  };

  DSL.prototype.collection = function() {};

  DSL.prototype.member = function() {};

  DSL.prototype.root = function(options) {
    return this.match('/', Tower.Support.Object.extend({
      as: "root"
    }, options));
  };

  DSL.prototype._extractOptions = function() {
    var anchor, args, constraints, controller, defaults, format, method, name, options, path;
    args = Tower.Support.Array.args(arguments);
    path = "/" + args.shift().replace(/^\/|\/$/, "");
    if (typeof args[args.length - 1] === "object") {
      options = args.pop();
    } else {
      options = {};
    }
    if (args.length > 0) options.to || (options.to = args.shift());
    options.path = path;
    format = this._extractFormat(options);
    options.path = this._extractPath(options);
    method = this._extractRequestMethod(options);
    constraints = this._extractConstraints(options);
    defaults = this._extractDefaults(options);
    controller = this._extractController(options);
    anchor = this._extractAnchor(options);
    name = this._extractName(options);
    options = Tower.Support.Object.extend(options, {
      method: method,
      constraints: constraints,
      defaults: defaults,
      name: name,
      format: format,
      controller: controller,
      anchor: anchor,
      ip: options.ip
    });
    return options;
  };

  DSL.prototype._extractFormat = function(options) {};

  DSL.prototype._extractName = function(options) {
    return options.as || options.name;
  };

  DSL.prototype._extractConstraints = function(options) {
    return Tower.Support.Object.extend(this._scope.constraints || {}, options.constraints || {});
  };

  DSL.prototype._extractDefaults = function(options) {
    return options.defaults || {};
  };

  DSL.prototype._extractPath = function(options) {
    return "" + options.path + ".:format?";
  };

  DSL.prototype._extractRequestMethod = function(options) {
    return (options.method || options.via || "GET").toUpperCase();
  };

  DSL.prototype._extractAnchor = function(options) {
    return options.anchor;
  };

  DSL.prototype._extractController = function(options) {
    var action, controller, to;
    if (options == null) options = {};
    to = options.to;
    if (to) {
      to = to.split('#');
      if (to.length === 1) {
        action = to[0];
      } else {
        controller = to[0];
        action = to[1];
      }
    }
    controller || (controller = options.controller || this._scope.controller);
    action || (action = options.action);
    if (!controller) {
      throw new Error("No controller was specified for the route " + options.path);
    }
    controller = controller.toLowerCase().replace(/(?:[cC]ontroller)?$/, "Controller");
    return {
      name: controller,
      action: action,
      className: Tower.Support.String.camelize("" + controller)
    };
  };

  return DSL;

})();

Tower.HTTP.Route.PolymorphicUrls = {
  ClassMethods: {
    polymorphicUrl: function() {}
  }
};

Tower.HTTP.Route.Urls = {
  ClassMethods: {
    urlFor: function(options) {
      var action, anchor, controller, host, port;
      switch (typeof options) {
        case "string":
          return options;
        default:
          return controller = options.controller, action = options.action, host = options.host, port = options.port, anchor = options.anchor, options;
      }
    }
  }
};

Tower.Support.I18n.load({
  model: {
    errors: {
      presence: "%{attribute} can't be blank",
      minimum: "%{attribute} must be a minimum of %{value}",
      maximum: "%{attribute} must be a maximum of %{value}",
      length: "%{attribute} must be equal to %{value}",
      format: "%{attribute} must be match the format %{value}",
      inclusion: "%{attribute} is not included in the list",
      exclusion: "%{attribute} is reserved",
      invalid: "%{attribute} is invalid",
      confirmation: "%{attribute} doesn't match confirmation",
      accepted: "%{attribute} must be accepted",
      empty: "%{attribute} can't be empty",
      blank: "%{attribute} can't be blank",
      tooLong: "%{attribute} is too long (maximum is %{count} characters)",
      tooShort: "%{attribute} is too short (minimum is %{count} characters)",
      wrongLength: "%{attribute} is the wrong length (should be %{count} characters)",
      taken: "%{attribute} has already been taken",
      notANumber: "%{attribute} is not a number",
      greaterThan: "%{attribute} must be greater than %{count}",
      greaterThanOrEqualTo: "%{attribute} must be greater than or equal to %{count}",
      equalTo: "%{attribute} must be equal to %{count}",
      lessThan: "%{attribute} must be less than %{count}",
      lessThanOrEqualTo: "%{attribute} must be less than or equal to %{count}",
      odd: "%{attribute} must be odd",
      even: "%{attribute} must be even",
      recordInvalid: "Validation failed: %{errors}"
    },
    fullMessages: {
      format: "%{message}"
    }
  }
});

Tower.Model.Relation.BelongsTo = (function(_super) {

  __extends(BelongsTo, _super);

  function BelongsTo(owner, name, options) {
    var self;
    if (options == null) options = {};
    BelongsTo.__super__.constructor.call(this, owner, name, options);
    this.foreignKey = "" + name + "Id";
    owner.field(this.foreignKey, {
      type: "Id"
    });
    if (this.polymorphic) {
      this.foreignType = "" + name + "Type";
      owner.field(this.foreignType, {
        type: "String"
      });
    }
    owner.prototype[name] = function(callback) {
      return this.relation(name).first(callback);
    };
    self = this;
    owner.prototype["build" + (Tower.Support.String.camelize(name))] = function(attributes, callback) {
      return this.buildRelation(name, attributes, callback);
    };
    owner.prototype["create" + (Tower.Support.String.camelize(name))] = function(attributes, callback) {
      return this.createRelation(name, attributes, callback);
    };
  }

  BelongsTo.Scope = (function(_super2) {

    __extends(Scope, _super2);

    function Scope() {
      Scope.__super__.constructor.apply(this, arguments);
    }

    return Scope;

  })(BelongsTo.Scope);

  return BelongsTo;

})(Tower.Model.Relation);

Tower.Model.Relation.HasMany = (function(_super) {

  __extends(HasMany, _super);

  function HasMany() {
    HasMany.__super__.constructor.apply(this, arguments);
  }

  HasMany.Scope = (function(_super2) {

    __extends(Scope, _super2);

    function Scope() {
      Scope.__super__.constructor.apply(this, arguments);
    }

    Scope.prototype.create = function() {
      var array, attributes, callback, criteria, data, defaults, id, instantiate, inverseRelation, options, relation, _name, _ref5, _ref6,
        _this = this;
      if (!this.owner.isPersisted()) {
        throw new Error("You cannot call create unless the parent is saved");
      }
      relation = this.relation;
      inverseRelation = relation.inverse();
      _ref5 = this._extractArgs(arguments, {
        data: true
      }), criteria = _ref5.criteria, data = _ref5.data, options = _ref5.options, callback = _ref5.callback;
      id = this.owner.get("id");
      if (inverseRelation && inverseRelation.cache) {
        array = data[inverseRelation.cacheKey] || [];
        if (array.indexOf(id) === -1) array.push(id);
        data[inverseRelation.cacheKey] = array;
      } else if (relation.foreignKey) {
        if (id !== void 0) data[relation.foreignKey] = id;
        if (this.relation.foreignType) {
          data[_name = relation.foreignType] || (data[_name] = this.owner.constructor.name);
        }
      }
      criteria.where(data);
      criteria.mergeOptions(options);
      if (inverseRelation && inverseRelation.counterCacheKey) {
        defaults = {};
        defaults[inverseRelation.counterCacheKey] = 1;
        criteria.where(defaults);
      }
      instantiate = options.instantiate !== false;
      _ref6 = criteria.toCreate(), attributes = _ref6.attributes, options = _ref6.options;
      options.instantiate = true;
      return this._create(criteria, attributes, options, function(error, record) {
        var inc, push, updates;
        if (!error) {
          if (relation && (relation.cache || relation.counterCache)) {
            if (relation.cache) {
              push = {};
              push[relation.cacheKey] = record.get("id");
            }
            if (relation.counterCacheKey) {
              inc = {};
              inc[relation.counterCacheKey] = 1;
            }
            updates = {};
            if (push) updates["$push"] = push;
            if (inc) updates["$inc"] = inc;
            return _this.owner.updateAttributes(updates, callback);
          } else {
            if (callback) return callback.call(_this, error, record);
          }
        } else {
          if (callback) return callback.call(_this, error, record);
        }
      });
    };

    Scope.prototype.update = function() {};

    Scope.prototype.destroy = function() {};

    Scope.prototype.concat = function() {};

    Scope.prototype._serializeAttributes = function(attributes) {
      var name, relation, target, value, _ref5;
      if (attributes == null) attributes = {};
      target = Tower.constant(this.relation.targetClassName);
      _ref5 = target.relations();
      for (name in _ref5) {
        relation = _ref5[name];
        if (attributes.hasOwnProperty(name)) {
          value = attributes[name];
          delete attributes[name];
          if (relation instanceof Tower.Model.Relation.BelongsTo) {
            attributes[relation.foreignKey] = value.id;
            if (relation.polymorphic) {
              attributes[relation.foreignType] = value.type;
            }
          }
        }
      }
      return attributes;
    };

    Scope.prototype.toCriteria = function() {
      var criteria, defaults, relation;
      criteria = Scope.__super__.toCriteria.apply(this, arguments);
      relation = this.relation;
      if (relation.cache) {
        defaults = {};
        defaults[relation.foreignKey + "s"] = {
          $in: [this.owner.get("id")]
        };
        criteria.where(defaults);
      }
      return criteria;
    };

    return Scope;

  })(HasMany.Scope);

  return HasMany;

})(Tower.Model.Relation);

Tower.Model.Relation.HasOne = (function(_super) {

  __extends(HasOne, _super);

  function HasOne() {
    HasOne.__super__.constructor.apply(this, arguments);
  }

  return HasOne;

})(Tower.Model.Relation);

Tower.Model.Scope.Finders = {
  ClassMethods: {
    finderMethods: ["find", "all", "first", "last", "count", "exists"]
  },
  find: function() {
    var callback, conditions, criteria, options, _ref5, _ref6;
    _ref5 = this._extractArgs(arguments, {
      ids: true
    }), criteria = _ref5.criteria, options = _ref5.options, callback = _ref5.callback;
    _ref6 = criteria.toQuery(), conditions = _ref6.conditions, options = _ref6.options;
    return this._find(conditions, options, callback);
  },
  first: function(callback) {
    var conditions, options, _ref5;
    _ref5 = this.toQuery("asc"), conditions = _ref5.conditions, options = _ref5.options;
    return this.store.findOne(conditions, options, callback);
  },
  last: function(callback) {
    var conditions, options, _ref5;
    _ref5 = this.toQuery("desc"), conditions = _ref5.conditions, options = _ref5.options;
    return this.store.findOne(conditions, options, callback);
  },
  all: function(callback) {
    var conditions, options, _ref5;
    _ref5 = this.toQuery(), conditions = _ref5.conditions, options = _ref5.options;
    return this.store.find(conditions, options, callback);
  },
  count: function(callback) {
    var conditions, options, _ref5;
    _ref5 = this.toQuery(), conditions = _ref5.conditions, options = _ref5.options;
    return this.store.count(conditions, options, callback);
  },
  exists: function(callback) {
    var conditions, options, _ref5;
    _ref5 = this.toQuery(), conditions = _ref5.conditions, options = _ref5.options;
    return this.store.exists(conditions, options, callback);
  },
  batch: function() {},
  fetch: function() {},
  _find: function(conditions, options, callback) {
    if (conditions.id && conditions.id.hasOwnProperty("$in") && conditions.id.$in.length === 1) {
      return this.store.findOne(conditions, options, callback);
    } else if (conditions.id && !conditions.id.hasOwnProperty("$in")) {
      conditions.id = {
        $in: Tower.Support.Object.toArray(conditions.id)
      };
      return this.store.findOne(conditions, options, callback);
    } else {
      return this.store.find(conditions, options, callback);
    }
  }
};

Tower.Model.Scope.Modifiers = {
  ClassMethods: {
    atomicModifiers: {
      "$set": "$set",
      "$unset": "$unset",
      "$push": "$push",
      "$pushAll": "$pushAll",
      "$pull": "$pull",
      "$pullAll": "$pullAll",
      "$inc": "$inc",
      "$pop": "$pop"
    }
  },
  push: function(record, updates, all) {
    var attributes, changes, key, oldValue, schema, value;
    attributes = record.attributes;
    schema = record.constructor.schema();
    changes = record.changes;
    for (key in updates) {
      value = updates[key];
      oldValue = attributes[key];
      attributes[key] || (attributes[key] = []);
      if (all && _.isArray(value)) {
        attributes[key] = attributes[key].concat(value);
      } else {
        attributes[key].push(value);
      }
      this.changeAttribute(changes, key, oldValue, attributes[key]);
    }
    return changes;
  },
  changeAttribute: function(changes, key, oldValue, newValue) {
    if (!changes[key]) {
      changes[key] = [oldValue, newValue];
    } else {
      changes[key][1] = newValue;
    }
    if (changes[key][0] === changes[key][1]) delete changes[key];
    return changes;
  },
  pushAll: function(record, updates) {
    return this.push(record, updates, true);
  },
  pull: function(record, updates, all) {
    var attributeValue, attributes, changes, item, key, oldValue, schema, value, _len5, _m;
    attributes = record.attributes;
    schema = record.constructor.schema();
    changes = record.changes;
    for (key in updates) {
      value = updates[key];
      attributeValue = attributes[key];
      oldValue = void 0;
      if (attributeValue && _.isArray(attributeValue)) {
        oldValue = attributeValue.concat();
        if (all && _.isArray(value)) {
          for (_m = 0, _len5 = value.length; _m < _len5; _m++) {
            item = value[_m];
            attributeValue.splice(_attributeValue.indexOf(item), 1);
          }
        } else {
          attributeValue.splice(_attributeValue.indexOf(value), 1);
        }
      }
      this.changeAttribute(changes, key, oldValue, attributeValue);
    }
    return changes;
  },
  pullAll: function(record, updates) {
    return this.pull(record, updates, true);
  },
  inc: function(record, updates) {
    var attributes, changes, key, oldValue, schema, value;
    attributes = record.attributes;
    schema = record.constructor.schema();
    changes = record.changes;
    for (key in updates) {
      value = updates[key];
      oldValue = attributes[key];
      attributes[key] || (attributes[key] = 0);
      attributes[key] += value;
      this.changeAttribute(changes, key, oldValue, attributes[key]);
    }
    return attributes;
  },
  set: function(record, updates) {
    var attributes, changes, field, key, oldValue, schema, value;
    attributes = record.attributes;
    schema = record.constructor.schema();
    changes = record.changes;
    for (key in updates) {
      value = updates[key];
      field = schema[key];
      oldValue = attributes[key];
      if (field && field.type === "Array" && !Tower.Support.Object.isArray(value)) {
        attributes[key] || (attributes[key] = []);
        attributes[key].push(value);
      } else {
        attributes[key] = value;
      }
      this.changeAttribute(changes, key, oldValue, attributes[key]);
    }
    return changes;
  },
  unset: function(record, updates) {
    var attributes, changes, key, oldValue, value;
    attributes = record.attributes;
    changes = record.changes;
    for (key in updates) {
      value = updates[key];
      oldValue = attributes[key];
      attributes[key] = void 0;
      this.changeAttribute(changes, key, oldValue, attributes[key]);
    }
    return changes;
  },
  update: function(record, updates) {
    var key, set, value;
    set = null;
    for (key in updates) {
      value = updates[key];
      if (this.isAtomicModifier(key)) {
        this["" + (key.replace("$", ""))](record, value);
      } else {
        set || (set = {});
        set[key] = value;
      }
    }
    if (set) this.set(record, set);
    return record;
  },
  assignAttributes: function(attributes) {
    var key, value;
    for (key in attributes) {
      value = attributes[key];
      delete this.changes[key];
      this.attributes[key] = value;
    }
    return this;
  },
  resetAttributes: function(keys) {
    var key, _len5, _m;
    for (_m = 0, _len5 = keys.length; _m < _len5; _m++) {
      key = keys[_m];
      this.resetAttributes(key);
    }
    return this;
  },
  resetAttribute: function(key) {
    var array;
    array = this.changes[key];
    if (array) {
      delete this.changes[key];
      this.attributes[key] = array[0];
    }
    return this;
  },
  toUpdates: function(record) {
    var changes, field, key, pop, push, result, schema, value;
    result = {};
    changes = record.changes;
    schema = record.constructor.schema();
    for (key in changes) {
      value = changes[key];
      field = field[key];
      if (field) {
        if (field.type === "Array") {
          pop = _.difference(value[0], value[1]);
          if (pop.length > 0) {
            result.$pop || (result.$pop = {});
            result.$pop[key] = pop;
          }
          push = _.difference(value[1], value[0]);
          if (push.length > 0) {
            result.$push || (result.$push = {});
            result.$push[key] = push;
          }
        } else if (field.type === "Integer") {
          result.$inc || (result.$inc = {});
          result.$inc[key] = (value[1] || 0) - (value[0] || 0);
        }
      } else {
        result[key];
      }
    }
    return result;
  }
};

Tower.Model.Scope.Persistence = {
  ClassMethods: {
    persistenceMethods: ["create", "update", "destroy"]
  },
  build: function(attributes, options) {
    var conditions, _ref5;
    _ref5 = this.toCreate(), conditions = _ref5.conditions, options = _ref5.options;
    return this._build(attributes, conditions, options);
  },
  create: function() {
    var callback, criteria, data, options, _ref5;
    _ref5 = this._extractArgs(arguments, {
      data: true
    }), criteria = _ref5.criteria, data = _ref5.data, options = _ref5.options, callback = _ref5.callback;
    criteria.mergeOptions(options);
    return this._create(criteria, data, options, callback);
  },
  update: function() {
    var callback, criteria, data, options, _ref5;
    _ref5 = this._extractArgs(arguments, {
      ids: true,
      data: true
    }), criteria = _ref5.criteria, data = _ref5.data, options = _ref5.options, callback = _ref5.callback;
    criteria.mergeOptions(options);
    return this._update(criteria, data, options, callback);
  },
  destroy: function() {
    var callback, criteria, options, _ref5;
    _ref5 = this._extractArgs(arguments, {
      ids: true
    }), criteria = _ref5.criteria, options = _ref5.options, callback = _ref5.callback;
    criteria.mergeOptions(options);
    return this._destroy(criteria, options, callback);
  },
  sync: function() {},
  transaction: function() {},
  _build: function(attributes, conditions, options) {
    var object, result, _len5, _m;
    if (Tower.Support.Object.isArray(attributes)) {
      result = [];
      for (_m = 0, _len5 = attributes.length; _m < _len5; _m++) {
        object = attributes[_m];
        result.push(this.store.serializeModel(Tower.Support.Object.extend({}, conditions, object)));
      }
      return result;
    } else {
      return this.store.serializeModel(Tower.Support.Object.extend({}, conditions, attributes));
    }
  },
  _create: function(criteria, data, opts, callback) {
    var isArray, iterator, records,
      _this = this;
    if (opts.instantiate) {
      isArray = Tower.Support.Object.isArray(data);
      records = Tower.Support.Object.toArray(this.build(data));
      iterator = function(record, next) {
        if (record) {
          return record.save(next);
        } else {
          return next();
        }
      };
      return Tower.async(records, iterator, function(error) {
        if (!callback) {
          if (error) throw error;
        } else {
          if (error) return callback(error);
          if (isArray) {
            return callback(error, records);
          } else {
            return callback(error, records[0]);
          }
        }
      });
    } else {
      return this.store.create(data, opts, callback);
    }
  },
  _update: function(criteria, data, opts, callback) {
    var conditions, iterator, options, _ref5;
    _ref5 = criteria.toQuery(), conditions = _ref5.conditions, options = _ref5.options;
    if (opts.instantiate) {
      iterator = function(record, next) {
        return record.updateAttributes(data, next);
      };
      return this._each(conditions, options, iterator, callback);
    } else {
      return this.store.update(data, conditions, options, callback);
    }
  },
  _destroy: function(criteria, opts, callback) {
    var conditions, iterator, options, _ref5;
    _ref5 = criteria.toQuery(), conditions = _ref5.conditions, options = _ref5.options;
    if (opts.instantiate) {
      iterator = function(record, next) {
        return record.destroy(next);
      };
      return this._each(conditions, options, iterator, callback);
    } else {
      return this.store.destroy(conditions, options, callback);
    }
  },
  _each: function(conditions, options, iterator, callback) {
    var _this = this;
    return this.store.find(conditions, options, function(error, records) {
      if (error) {
        return callback.call(_this, error, records);
      } else {
        return Tower.async(records, iterator, function(error) {
          if (!callback) {
            if (error) throw error;
          } else {
            if (callback) return callback.call(_this, error, records);
          }
        });
      }
    });
  }
};

Tower.Model.Scope.Queries = {
  ClassMethods: {
    queryMethods: ["where", "order", "asc", "desc", "limit", "offset", "select", "joins", "includes", "excludes", "paginate", "within", "allIn", "allOf", "alsoIn", "anyIn", "anyOf", "near", "notIn"],
    queryOperators: {
      ">=": "$gte",
      "$gte": "$gte",
      ">": "$gt",
      "$gt": "$gt",
      "<=": "$lte",
      "$lte": "$lte",
      "<": "$lt",
      "$lt": "$lt",
      "$in": "$in",
      "$nin": "$nin",
      "$any": "$any",
      "$all": "$all",
      "=~": "$regex",
      "$m": "$regex",
      "$regex": "$regex",
      "$match": "$match",
      "$notMatch": "$notMatch",
      "!~": "$nm",
      "$nm": "$nm",
      "=": "$eq",
      "$eq": "$eq",
      "!=": "$neq",
      "$neq": "$neq",
      "$null": "$null",
      "$notNull": "$notNull"
    }
  }
};

Tower.Model.Validator.Format = (function() {

  function Format(value, attributes) {
    Format.__super__.constructor.call(this, value, attributes);
    this.value = typeof value === 'string' ? new RegExp(value) : value;
  }

  Format.prototype.validate = function(record, attribute, errors, callback) {
    var value;
    value = record.get(attribute);
    if (!this.value.exec(value)) {
      return this.failure(record, attribute, errors, Tower.t("model.errors.format", {
        attribute: attribute,
        value: this.value.toString()
      }), callback);
    } else {
      return this.success(callback);
    }
  };

  return Format;

})();

Tower.Model.Validator.Length = (function(_super) {

  __extends(Length, _super);

  function Length(name, value, attributes) {
    Length.__super__.constructor.apply(this, arguments);
    this.validate = (function() {
      switch (name) {
        case "min":
          return this.validateMinimum;
        case "max":
          return this.validateMaximum;
        default:
          return this.validateLength;
      }
    }).call(this);
  }

  Length.prototype.validateMinimum = function(record, attribute, errors, callback) {
    var value;
    value = record.get(attribute);
    if (!(typeof value === 'number' && value >= this.value)) {
      return this.failure(record, attribute, errors, Tower.t("model.errors.minimum", {
        attribute: attribute,
        value: this.value
      }), callback);
    }
    return this.success(callback);
  };

  Length.prototype.validateMaximum = function(record, attribute, errors, callback) {
    var value;
    value = record.get(attribute);
    if (!(typeof value === 'number' && value <= this.value)) {
      return this.failure(record, attribute, errors, Tower.t("model.errors.maximum", {
        attribute: attribute,
        value: this.value
      }), callback);
    }
    return this.success(callback);
  };

  Length.prototype.validateLength = function(record, attribute, errors, callback) {
    var value;
    value = record.get(attribute);
    if (!(typeof value === 'number' && value === this.value)) {
      return this.failure(record, attribute, errors, Tower.t("model.errors.length", {
        attribute: attribute,
        value: this.value
      }), callback);
    }
    return this.success(callback);
  };

  return Length;

})(Tower.Model.Validator);

Tower.Model.Validator.Presence = (function(_super) {

  __extends(Presence, _super);

  function Presence() {
    Presence.__super__.constructor.apply(this, arguments);
  }

  Presence.prototype.validate = function(record, attribute, errors, callback) {
    if (!Tower.Support.Object.isPresent(record.get(attribute))) {
      return this.failure(record, attribute, errors, Tower.t("model.errors.presence", {
        attribute: attribute
      }), callback);
    }
    return this.success(callback);
  };

  return Presence;

})(Tower.Model.Validator);

Tower.Model.Validator.Uniqueness = (function(_super) {

  __extends(Uniqueness, _super);

  function Uniqueness() {
    Uniqueness.__super__.constructor.apply(this, arguments);
  }

  Uniqueness.prototype.validate = function(record, attribute, errors, callback) {
    var conditions, value,
      _this = this;
    value = record.get(attribute);
    conditions = {};
    conditions[attribute] = value;
    return record.constructor.where(conditions).exists(function(error, result) {
      if (result) {
        return _this.failure(record, attribute, errors, Tower.t("model.errors.uniqueness", {
          attribute: attribute,
          value: value
        }), callback);
      } else {
        return _this.success(callback);
      }
    });
  };

  return Uniqueness;

})(Tower.Model.Validator);

Tower.Controller.Caching = {
  freshWhen: function() {},
  stale: function() {},
  expiresIn: function() {}
};

Tower.Controller.Events = {
  ClassMethods: {
    addEventHandler: function(name, handler, options) {
      return this._addSocketEventHandler(name, handler, options);
    },
    socketNamespace: function() {
      return Tower.Support.String.pluralize(Tower.Support.String.camelize(this.name.replace(/(Controller)$/, ""), false));
    },
    addSocketEventHandler: function(name, handler, options) {
      var _this = this;
      if (!this.io) {
        this._socketHandlers = {};
        this.io = Tower.Application.instance().socket.of(this.socketNamespace()).on("connection", function(socket) {
          var eventType, handler, _ref5, _results;
          _ref5 = _this._socketHandlers;
          _results = [];
          for (eventType in _ref5) {
            handler = _ref5[eventType];
            _results.push((function(eventType, handler) {
              var _this = this;
              if (eventType !== 'connection' && eventType !== 'disconnect') {
                return socket.on(eventType, function(data) {
                  return _this._dispatch(void 0, handler, data);
                });
              }
            })(eventType, handler));
          }
          return _results;
        });
      }
      return this._socketHandlers[name] = handler;
    },
    _dispatch: function(event, handler, locals) {
      var controller, key, value;
      if (locals == null) locals = {};
      controller = new this;
      for (key in locals) {
        value = locals[key];
        controller.params[key] = value;
      }
      if (typeof handler === "string") {
        return controller[handler].call(controller, event);
      } else {
        return handler.call(controller, event);
      }
    }
  }
};

Tower.Controller.HTTP = {
  head: function(status, options) {
    var location;
    if (options == null) options = {};
    if (typeof status === "object") {
      options = status;
      status = null;
    }
    status || (status = options.status || "ok");
    location = options.location;
    delete options.status;
    delete options.location;
    this.status = status;
    if (location) this.location = Tower.urlFor(location);
    if (formats) this.headers["Content-Type"] = Mime[formats.first];
    return this.body = " ";
  }
};

Tower.Controller.addRenderers({
  json: function(json, options, callback) {
    var _base;
    if (typeof json !== "string") json = JSON.stringify(json);
    if (options.callback) json = "" + options.callback + "(" + json + ")";
    (_base = this.headers)["Content-Type"] || (_base["Content-Type"] = require("mime").lookup("json"));
    if (callback) callback(null, json);
    return json;
  }
});

Tower.Controller.Sockets = {
  broadcast: function() {},
  emit: function() {},
  connect: function() {}
};

Tower.Mailer.Configuration = {
  ClassMethods: {
    lib: function() {
      return require('mailer');
    }
  }
};

Tower.Mailer.Rendering = {
  ClassMethods: {
    mail: function(options, callback) {
      if (options == null) options = {};
      this.host = options.host;
      this.port = options.port;
      this.domain = options.domain;
      this.to = options.to;
      this.from = options.from;
      this.subject = options.subject;
      this.locals = options.locals || {};
      return this.template = options.template;
    }
  },
  deliver: function() {
    var email, self;
    email = this.constructor.lib();
    self = this;
    return Shift.render({
      path: this.template
    }, this.locals, function(error, body) {
      var options;
      options = {
        host: self.host,
        port: self.port,
        domain: self.domain,
        to: self.to,
        from: self.from,
        subject: self.subject,
        body: body,
        authentication: self.login,
        username: self.username,
        password: self.password
      };
      return email.send(options, function(error, result) {
        if (error) console.log(error);
        return console.log(result);
      });
    });
  }
};

Tower.Support.I18n.load({
  date: {
    formats: {
      "default": "%Y-%m-%d",
      short: "%b %d",
      long: "%B %d, %Y"
    },
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    abbrDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    monthNames: [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    abbrMonthNames: [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    order: ["year", "month", "day"]
  }
});

({
  time: {
    formats: {
      "default": "%a, %d %b %Y %H:%M:%S %z",
      short: "%d %b %H:%M",
      long: "%B %d, %Y %H:%M"
    },
    am: "am",
    pm: "pm"
  },
  support: {
    array: {
      wordsConnector: ", ",
      twoWordsConnector: " and ",
      lastWordConnector: ", and "
    }
  }
});

Tower.View.Form.Builder = (function(_super) {

  __extends(Builder, _super);

  function Builder(args, options) {
    if (options == null) options = {};
    this.template = options.template;
    this.model = options.model;
    this.attribute = options.attribute;
    this.parentIndex = options.parentIndex;
    this.index = options.index;
    this.tabindex = options.tabindex;
    this.accessKeys = options.accessKeys;
  }

  Builder.prototype.defaultOptions = function(options) {
    if (options == null) options = {};
    options.model || (options.model = this.model);
    options.index || (options.index = this.index);
    options.attribute || (options.attribute = this.attribute);
    options.template || (options.template = this.template);
    return options;
  };

  Builder.prototype.fieldset = function() {
    var args, block, options;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    block = args.pop();
    options = this.defaultOptions(Tower.Support.Array.extractOptions(args));
    options.label || (options.label = args.shift());
    return new Tower.View.Form.Fieldset([], options).render(block);
  };

  Builder.prototype.fields = function() {
    var args, attribute, block, options,
      _this = this;
    args = Tower.Support.Array.args(arguments);
    block = Tower.Support.Array.extractBlock(args);
    options = Tower.Support.Array.extractOptions(args);
    options.as = "fields";
    options.label || (options.label = false);
    attribute = args.shift() || this.attribute;
    return this.field(attribute, options, function(_field) {
      return _this.fieldset(block);
    });
  };

  Builder.prototype.fieldsFor = function() {
    var attrName, attribute, index, keys, macro, options, subObject, subParent;
    options = args.extractOptions;
    attribute = args.shift;
    macro = model.macroFor(attribute);
    attrName = nil;
    if (options.as === "object") {
      attrName = attribute.toS;
    } else {
      attrName = Tower.View.renameNestedAttributes ? "" + attribute + "_attributes" : attribute.toS;
    }
    subParent = model.object;
    subObject = args.shift;
    index = options["delete"]("index");
    if (!((index.present != null) && typeof index === "string")) {
      if ((subObject.blank != null) && (index.present != null)) {
        subObject = subParent.send(attribute)[index];
      } else if ((index.blank != null) && (subObject.present != null) && macro === "hasMany") {
        index = subParent.send(attribute).index(subObject);
      }
    }
    subObject || (subObject = model["default"](attribute) || model.toS.camelize.constantize["new"]);
    keys = [model.keys, attrName];
    options.merge({
      template: template,
      model: model,
      parentIndex: index,
      accessKeys: accessKeys,
      tabindex: tabindex
    });
    return new Tower.View.Form.Builder(options).render(block);
  };

  Builder.prototype.field = function() {
    var args, attributeName, block, defaults, last, options;
    args = Tower.Support.Array.args(arguments);
    last = args[args.length - 1];
    if (last === null || last === void 0) args.pop();
    block = Tower.Support.Array.extractBlock(args);
    options = Tower.Support.Array.extractOptions(args);
    attributeName = args.shift() || "attribute.name";
    defaults = {
      template: this.template,
      model: this.model,
      attribute: attributeName,
      parentIndex: this.parentIndex,
      index: this.index,
      fieldHTML: options.fieldHTML || {},
      inputHTML: options.inputHTML || {},
      labelHTML: options.labelHTML || {},
      errorHTML: options.errorHTML || {},
      hintHtml: options.hintHtml || {}
    };
    return new Tower.View.Form.Field([], _.extend(defaults, options)).render(block);
  };

  Builder.prototype.button = function() {
    var args, block, options;
    args = Tower.Support.Array.args(arguments);
    block = Tower.Support.Array.extractBlock(args);
    options = Tower.Support.Array.extractOptions(args);
    options.as || (options.as = "submit");
    options.value = args.shift() || "Submit";
    if (options.as === "submit") options["class"] = Tower.View.submitFieldsetClass;
    return this.field(options.value, options, block);
  };

  Builder.prototype.submit = Builder.prototype.button;

  Builder.prototype.partial = function(path, options) {
    if (options == null) options = {};
    return this.template.render({
      partial: path,
      locals: options.merge({
        fields: self
      })
    });
  };

  Builder.prototype.tag = function() {
    var args, key;
    key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return this.template.tag(key, args);
  };

  Builder.prototype.render = function(block) {
    return block(this);
  };

  return Builder;

})(Tower.View.Component);

Tower.View.Form.Field = (function(_super) {

  __extends(Field, _super);

  Field.prototype.addClass = function(string, args) {
    var arg, result, _len5, _m;
    result = string ? string.split(/\s+/g) : [];
    for (_m = 0, _len5 = args.length; _m < _len5; _m++) {
      arg = args[_m];
      if (!arg) continue;
      if (!(result.indexOf(arg) > -1)) result.push(arg);
    }
    return result.join(" ");
  };

  Field.prototype.toId = function(options) {
    var result;
    if (options == null) options = {};
    result = Tower.Support.String.parameterize(this.model.constructor.name);
    if (options.parentIndex) result += "-" + options.parentIndex;
    result += "-" + (Tower.Support.String.parameterize(this.attribute));
    result += "-" + (options.type || "field");
    if (this.index != null) result += "-" + this.index;
    return result;
  };

  Field.prototype.toParam = function(options) {
    var result;
    if (options == null) options = {};
    result = Tower.Support.String.parameterize(this.model.constructor.name);
    if (options.parentIndex) result += "[" + options.parentIndex + "]";
    result += "[" + this.attribute + "]";
    if (this.index != null) result += "[" + this.index + "]";
    return result;
  };

  function Field(args, options) {
    var classes, field, inputType, pattern, value, _base, _base2, _base3, _base4, _base5;
    this.labelValue = options.label;
    delete options.label;
    Field.__super__.constructor.call(this, args, options);
    this.required || (this.required = false);
    field = this.model.constructor.fields()[this.attribute];
    options.as || (options.as = field ? Tower.Support.String.camelize(field.type, true) : "string");
    this.inputType = inputType = options.as;
    this.required = !!(field && field.required === true);
    classes = [Tower.View.fieldClass, inputType];
    if (!(["submit", "fieldset"].indexOf(inputType) > -1)) {
      classes.push(field.required ? Tower.View.requiredClass : Tower.View.optionalClass);
      classes.push(field.errors ? Tower.View.errorClass : Tower.View.validClass);
      if (options.validate !== false && field.validations) {
        classes.push(Tower.View.validateClass);
      }
    }
    this.fieldHTML["class"] = this.addClass(this.fieldHTML["class"], classes);
    if (!this.fieldHTML.id && Tower.View.idEnabledOn.indexOf("field") > -1) {
      this.fieldHTML.id = this.toId({
        type: "field",
        index: this.index,
        parentIndex: this.parentIndex
      });
    }
    this.inputHTML.id = this.toId({
      type: "input",
      index: this.index,
      parentIndex: this.parentIndex
    });
    if (!(["hidden", "submit"].indexOf(inputType) > -1)) {
      (_base = this.labelHTML)["for"] || (_base["for"] = this.inputHTML.id);
      this.labelHTML["class"] = this.addClass(this.labelHTML["class"], [Tower.View.labelClass]);
      if (this.labelValue !== false) {
        this.labelValue || (this.labelValue = Tower.Support.String.camelize(this.attribute.toString()));
      }
      if (options.hint !== false) {
        this.errorHTML["class"] = this.addClass(this.errorHTML["class"], [Tower.View.errorClass]);
        if (Tower.View.includeAria && Tower.View.hintIsPopup) {
          (_base2 = this.errorHTML).role || (_base2.role = "tooltip");
        }
      }
    }
    this.attributes = this.fieldHTML;
    if (inputType !== "submit") {
      (_base3 = this.inputHTML).name || (_base3.name = this.toParam());
    }
    this.value = options.value;
    this.dynamic = options.dynamic === true;
    this.richInput = options.hasOwnProperty("rich_input") ? !!options.rich_input : Tower.View.richInput;
    this.validate = options.validate !== false;
    classes = [inputType, Tower.Support.String.parameterize(this.attribute), this.inputHTML["class"]];
    if (!(["submit", "fieldset"].indexOf(inputType) > -1)) {
      classes.push(field.required ? Tower.View.requiredClass : Tower.View.optionalClass);
      classes.push(field.errors ? Tower.View.errorClass : Tower.View.validClass);
      classes.push("input");
      if (options.validate !== false && field.validations) {
        classes.push(Tower.View.validateClass);
      }
    }
    this.inputHTML["class"] = this.addClass(this.inputHTML["class"], classes);
    if (options.placeholder) this.inputHTML.placeholder = options.placeholder;
    if (this.inputHTML.value == null) {
      if (options.hasOwnProperty("value")) this.inputHTML.value = options.value;
      if (this.inputHTML.value == null) {
        value = this.model.get(this.attribute);
        if (value) this.inputHTML.value = value;
      }
    }
    if (options.hasOwnProperty("max")) {
      (_base4 = this.inputHTML).maxlength || (_base4.maxlength = options.max);
    }
    pattern = options.match;
    if (_.isRegExp(pattern)) pattern = pattern.toString();
    if (pattern != null) this.inputHTML["data-match"] = pattern;
    this.inputHTML["aria-required"] = this.required.toString();
    if (this.required === true) this.inputHTML.required = "true";
    if (this.disabled) this.inputHTML.disabled = "true";
    if (this.autofocus === true) this.inputHTML.autofocus = "true";
    if (this.dynamic) this.inputHTML["data-dynamic"] = "true";
    if (this.inputHTML.placeholder) {
      (_base5 = this.inputHTML).title || (_base5.title = this.inputHTML.placeholder);
    }
    this.autocomplete = this.inputHTML.autocomplete === true;
    if (this.autocomplete && Tower.View.includeAria) {
      this.inputHTML["aria-autocomplete"] = (function() {
        switch (this.autocomplete) {
          case "inline":
          case "list":
          case "both":
            return this.autocomplete;
          default:
            return "both";
        }
      }).call(this);
    }
  }

  Field.prototype.input = function() {
    var args, options;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    options = _.extend(this.inputHTML, Tower.Support.Array.extractOptions(args));
    key = args.shift() || this.attribute;
    return this["" + this.inputType + "Input"](key, options);
  };

  Field.prototype.checkboxInput = function(key, options) {
    return this.tag("input", _.extend({
      type: "checkbox"
    }, options));
  };

  Field.prototype.stringInput = function(key, options) {
    return this.tag("input", _.extend({
      type: "text"
    }, options));
  };

  Field.prototype.submitInput = function(key, options) {
    return this.tag("input", _.extend({
      type: "submit"
    }, options));
  };

  Field.prototype.fileInput = function(key, options) {
    return this.tag("input", _.extend({
      type: "file"
    }, options));
  };

  Field.prototype.textInput = function(key, options) {
    return this.tag("textarea", options);
  };

  Field.prototype.password_input = function(key, options) {
    return this.tag("input", _.extend({
      type: "password"
    }, options));
  };

  Field.prototype.emailInput = function(key, options) {
    return this.tag("input", _.extend({
      type: "email"
    }, options));
  };

  Field.prototype.urlInput = function(key, options) {
    return this.tag("input", _.extend({
      type: "url"
    }, options));
  };

  Field.prototype.numberInput = function(key, options) {
    return this.tag("input", _.extend({
      type: "string",
      "data-type": "numeric"
    }, options));
  };

  Field.prototype.searchInput = function(key, options) {
    return this.tag("input", _.extend({
      type: "search",
      "data-type": "search"
    }, options));
  };

  Field.prototype.phoneInput = function(key, options) {
    return this.tag("input", _.extend({
      type: "tel",
      "data-type": "phone"
    }, options));
  };

  Field.prototype.label = function() {
    var _this = this;
    if (!this.labelValue) return;
    return this.tag("label", this.labelHTML, function() {
      _this.tag("span", _this.labelValue);
      if (_this.required) {
        return _this.tag("abbr", {
          title: Tower.View.requiredTitle,
          "class": Tower.View.requiredClass
        }, function() {
          return Tower.View.requiredAbbr;
        });
      } else {
        return _this.tag("abbr", {
          title: Tower.View.optionalTitle,
          "class": Tower.View.optionalClass
        }, function() {
          return Tower.View.optionalAbbr;
        });
      }
    });
  };

  Field.prototype.render = function(block) {
    var _this = this;
    return this.tag(Tower.View.fieldTag, this.attributes, function() {
      if (block) {
        return block.call(_this);
      } else {
        _this.label();
        return _this.input();
      }
    });
  };

  Field.prototype.extractElements = function(options) {
    var elements, _base;
    if (options == null) options = {};
    elements = [];
    if (typeof (_base = ["hidden", "submit"]).include === "function" ? _base.include(inputType) : void 0) {
      elements.push("inputs");
    } else {
      if ((this.label.present != null) && (this.label.value != null)) {
        elements.push("label");
      }
      elements = elements.concat(["inputs", "hints", "errors"]);
    }
    return elements;
  };

  return Field;

})(Tower.View.Component);

Tower.View.Form.Fieldset = (function(_super) {

  __extends(Fieldset, _super);

  function Fieldset(args, options) {
    var attributes;
    Fieldset.__super__.constructor.apply(this, arguments);
    this.attributes = attributes = {};
    delete attributes.index;
    delete attributes.parentIndex;
    delete attributes.label;
    this.builder = new Tower.View.Form.Builder([], {
      template: this.template,
      model: this.model,
      attribute: this.attribute,
      index: this.index,
      parentIndex: this.parentIndex
    });
  }

  Fieldset.prototype.render = function(block) {
    var _this = this;
    return this.tag("fieldset", this.attributes, function() {
      if (_this.label) {
        _this.tag("legend", {
          "class": Tower.View.legendClass
        }, function() {
          return _this.tag("span", _this.label);
        });
      }
      return _this.tag(Tower.View.fieldListTag, {
        "class": Tower.View.fieldListClass
      }, function() {
        return _this.builder.render(block);
      });
    });
  };

  return Fieldset;

})(Tower.View.Component);

Tower.View.ComponentHelper = {
  formFor: function() {
    var _ref5;
    return (_ref5 = Tower.View.Form).render.apply(_ref5, [__ck].concat(__slice.call(arguments)));
  },
  tableFor: function() {
    var _ref5;
    return (_ref5 = Tower.View.Table).render.apply(_ref5, [__ck].concat(__slice.call(arguments)));
  },
  widget: function() {},
  linkTo: function(title, path, options) {
    if (options == null) options = {};
    return a(_.extend(options, {
      href: path,
      title: title
    }), title.toString());
  }
};

Tower.View.ElementHelper = {
  title: function(value) {
    return document.title = value;
  },
  addClass: function() {
    var classes, part, parts, string, _len5, _m;
    string = arguments[0], parts = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    classes = string.split(/\ +/);
    for (_m = 0, _len5 = parts.length; _m < _len5; _m++) {
      part = parts[_m];
      if (classes.indexOf(part) > -1) classes.push(part);
    }
    return classes.join(" ");
  },
  elementId: function() {
    return "#" + (this.elementKey.apply(this, arguments));
  },
  elementClass: function() {
    return "." + (this.elementKey.apply(this, arguments));
  },
  elementKey: function() {
    return Tower.Support.String.parameterize(this.elementNameComponents.apply(this, arguments).join("-"));
  },
  elementName: function() {
    var i, item, result, _len5;
    result = this.elementNameComponents.apply(this, arguments);
    i = 1;
    for (i = 0, _len5 = result.length; i < _len5; i++) {
      item = result[i];
      result[i] = "[" + item + "]";
    }
    return Tower.Support.String.parameterize(result.join(""));
  },
  elementNameComponents: function() {
    var args, item, result, _len5, _m;
    args = Tower.Support.Array.args(arguments);
    result = [];
    for (_m = 0, _len5 = args.length; _m < _len5; _m++) {
      item = args[_m];
      switch (typeof item) {
        case "function":
          result.push(item.constructor.name);
          break;
        case "string":
          result.push(item);
          break;
        default:
          result.push(item.toString());
      }
    }
    return result;
  }
};

_ref5 = ["stylus", "less", "markdown"];
for (_m = 0, _len5 = _ref5.length; _m < _len5; _m++) {
  filter = _ref5[_m];
  this[filter] = function(text) {
    return Tower.View.render(text, {
      filter: filter
    });
  };
}

Tower.View.HeadHelper = {
  metaTag: function(name, content) {
    return meta({
      name: name,
      content: content
    });
  },
  snapshotLinkTag: function(href) {
    return linkTag({
      rel: "imageSrc",
      href: href
    });
  },
  html4ContentTypeTag: function(charset, type) {
    if (charset == null) charset = "UTF-8";
    if (type == null) type = "text/html";
    return httpMetaTag("Content-Type", "" + type + "; charset=" + charset);
  },
  chromeFrameTag: function() {
    html4ContentTypeTag();
    return meta({
      "http-equiv": "X-UA-Compatible",
      content: "IE=Edge,chrome=1"
    });
  },
  html5ContentTypeTag: function(charset) {
    if (charset == null) charset = "UTF-8";
    return meta({
      charset: charset
    });
  },
  contentTypeTag: function(charset) {
    return html5ContentTypeTag(charset);
  },
  csrfMetaTag: function() {
    return metaTag("csrf-token", this.request.session._csrf);
  },
  searchLinkTag: function(href, title) {
    return linkTag({
      rel: "search",
      type: "application/opensearchdescription+xml",
      href: href,
      title: title
    });
  },
  faviconLinkTag: function(favicon) {
    if (favicon == null) favicon = "/favicon.ico";
    return linkTag({
      rel: "shortcut icon",
      href: favicon,
      type: "image/x-icon"
    });
  },
  linkTag: function(options) {
    if (options == null) options = {};
    return link(options);
  },
  ieApplicationMetaTags: function(title, options) {
    var result;
    if (options == null) options = {};
    result = [];
    result.push(metaTag("application-name", title));
    if (options.hasOwnProperty("tooltip")) {
      result.push(metaTag("msapplication-tooltip", options.tooltip));
    }
    if (options.hasOwnProperty("url")) {
      result.push(metaTag("msapplication-starturl", options.url));
    }
    if (options.hasOwnProperty("width") && options.hasOwnProperty("height")) {
      result.push(metaTag("msapplication-window", "width=" + options.width + ";height=" + options.height));
      if (options.hasOwnProperty("color")) {
        result.push(metaTag("msapplication-navbutton-color", options.color));
      }
    }
    return result.join("\n");
  },
  ieTaskMetaTag: function(name, path, icon) {
    var content;
    if (icon == null) icon = null;
    content = [];
    content.push("name=" + name);
    content.push("uri=" + path);
    if (icon) content.push("icon-uri=" + icon);
    return this.metaTag("msapplication-task", content.join(";"));
  },
  appleMetaTags: function(options) {
    var result;
    if (options == null) options = {};
    result = [];
    result.push(appleViewportMetaTag(options));
    if (options.hasOwnProperty("fullScreen")) {
      result.push(appleFullScreenMetaTag(options.fullScreen));
    }
    if (options.hasOwnProperty("mobile")) {
      result.push(appleMobileCompatibleMetaTag(options.mobile));
    }
    return result.join();
  },
  appleViewportMetaTag: function(options) {
    var viewport;
    if (options == null) options = {};
    viewport = [];
    if (options.hasOwnProperty("width")) viewport.push("width=" + options.width);
    if (options.hasOwnProperty("height")) {
      viewport.push("height=" + options.height);
    }
    viewport.push("initial-scale=" + (options.scale || 1.0));
    if (options.hasOwnProperty("min")) {
      viewport.push("minimum-scale=" + options.min);
    }
    if (options.hasOwnProperty("max")) {
      viewport.push("maximum-scale=" + options.max);
    }
    if (options.hasOwnProperty("scalable")) {
      viewport.push("user-scalable=" + (boolean(options.scalable)));
    }
    return metaTag("viewport", viewport.join(", "));
  },
  appleFullScreenMetaTag: function(value) {
    return metaTag("apple-touch-fullscreen", boolean(value));
  },
  appleMobileCompatibleMetaTag: function(value) {
    return metaTag("apple-mobile-web-app-capable", boolean(value));
  },
  appleTouchIconLinkTag: function(path, options) {
    var rel;
    if (options == null) options = {};
    rel = ["apple-touch-icon"];
    if (options.hasOwnProperty("size")) {
      rel.push("" + options.size + "x" + options.size);
    }
    if (options.precomposed) rel.push("precomposed");
    return linkTag({
      rel: rel.join("-"),
      href: path
    });
  },
  appleTouchIconLinkTags: function() {
    var options, path, result, size, sizes, _len6, _n;
    path = arguments[0], sizes = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (typeof sizes[sizes.length - 1] === "object") {
      options = sizes.pop();
    } else {
      options = {};
    }
    result = [];
    for (_n = 0, _len6 = sizes.length; _n < _len6; _n++) {
      size = sizes[_n];
      result.push(appleTouchIconLinkTag(path, _.extend({
        size: size
      }, options)));
    }
    return result.join();
  },
  openGraphMetaTags: function(options) {
    if (options == null) options = {};
    if (options.title) openGraphMetaTag("og:title", options.title);
    if (options.type) openGraphMetaTag("og:type", options.type);
    if (options.image) openGraphMetaTag("og:image", options.image);
    if (options.site) openGraphMetaTag("og:siteName", options.site);
    if (options.description) {
      openGraphMetaTag("og:description", options.description);
    }
    if (options.email) openGraphMetaTag("og:email", options.email);
    if (options.phone) openGraphMetaTag("og:phoneNumber", options.phone);
    if (options.fax) openGraphMetaTag("og:faxNumber", options.fax);
    if (options.lat) openGraphMetaTag("og:latitude", options.lat);
    if (options.lng) openGraphMetaTag("og:longitude", options.lng);
    if (options.street) openGraphMetaTag("og:street-address", options.street);
    if (options.city) openGraphMetaTag("og:locality", options.city);
    if (options.state) openGraphMetaTag("og:region", options.state);
    if (options.zip) openGraphMetaTag("og:postal-code", options.zip);
    if (options.country) openGraphMetaTag("og:country-name", options.country);
    return null;
  },
  openGraphMetaTag: function(property, content) {
    return meta({
      property: property,
      content: content
    });
  }
};

Tower.View.RenderingHelper = {
  partial: function(path, options, callback) {
    var item, locals, name, prefixes, template, tmpl, _len6, _n, _ref6;
    try {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      options || (options = {});
      options.locals || (options.locals = {});
      locals = options.locals;
      path = path.split("/");
      path[path.length - 1] = "_" + path[path.length - 1];
      path = path.join("/");
      prefixes = options.prefixes;
      if (this._context) prefixes || (prefixes = [this._context.collectionName]);
      template = this._readTemplate(path, prefixes, options.type || Tower.View.engine);
      template = this.renderWithEngine(String(template));
      if (options.collection) {
        name = options.as || Tower.Support.String.camelize(options.collection[0].constructor.name, true);
        tmpl = eval("(function(data) { with(data) { this." + name + " = " + name + "; " + (String(template)) + " } })");
        _ref6 = options.collection;
        for (_n = 0, _len6 = _ref6.length; _n < _len6; _n++) {
          item = _ref6[_n];
          locals[name] = item;
          tmpl.call(this, locals);
          delete this[name];
        }
      } else {
        tmpl = "(function(data) { with(data) { " + (String(template)) + " } })";
        eval(tmpl).call(this, locals);
      }
    } catch (error) {
      console.log(error.stack || error);
    }
    return null;
  },
  page: function() {
    var args, browserTitle, options;
    args = Tower.Support.Array.args(arguments);
    options = Tower.Support.Array.extractOptions(args);
    browserTitle = args.shift() || options.title;
    return this.contentFor("title", function() {
      return title(browserTitle);
    });
  },
  urlFor: function() {
    return Tower.urlFor.apply(Tower, arguments);
  },
  yields: function(key) {
    var ending, value;
    value = this[key];
    if (typeof value === "function") {
      eval("(" + (String(value)) + ")()");
    } else {
      ending = value.match(/\n$/) ? "\n" : "";
      text(value.replace(/\n$/, "").replace(/^(?!\s+$)/mg, __ck.repeat('  ', __ck.tabs)) + ending);
    }
    return null;
  },
  hasContentFor: function(key) {
    return !!(this.hasOwnProperty(key) && this[key] && this[key] !== "");
  },
  has: function(key) {
    return !!(this.hasOwnProperty(key) && this[key] && this[key] !== "");
  },
  contentFor: function(key, block) {
    this[key] = block;
    return null;
  }
};

Tower.View.StringHelper = {
  HTML_ESCAPE: {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  },
  preserve: function(text) {
    return text.replace(/\n/g, '&#x000A;').replace(/\r/g, '');
  },
  htmlEscape: function(text) {
    var _this = this;
    return text.replace(/[\"><&]/g, function(_) {
      return _this.HTML_ESCAPE[_];
    });
  },
  t: function(string) {
    return Tower.Support.I18n.translate(string);
  },
  l: function(object) {
    return Tower.Support.I18n.localize(string);
  },
  boolean: function(boolean) {
    if (boolean) {
      return "yes";
    } else {
      return "no";
    }
  }
};
