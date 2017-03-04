'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdalInitializer = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaPal = require('aurelia-pal');

var _aureliaLogging = require('aurelia-logging');

var Logging = _interopRequireWildcard(_aureliaLogging);

var _adalAngular = require('adal-angular');

var Adal = _interopRequireWildcard(_adalAngular);

var _authContext = require('./auth-context');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdalInitializer = exports.AdalInitializer = (_dec = (0, _aureliaDependencyInjection.inject)(Adal, _authContext.AuthContext), _dec(_class = function () {
  function AdalInitializer(adal, authContext) {
    _classCallCheck(this, AdalInitializer);

    this.logger = Logging.getLogger('adal');

    this.adal = adal;
    this.authContext = authContext;
  }

  AdalInitializer.prototype.initialize = function initialize(config) {
    var _this = this;

    try {
      var existingHash = _aureliaPal.PLATFORM.location.hash;
      var pathDefault = _aureliaPal.PLATFORM.location.href;
      if (existingHash) {
        pathDefault = pathDefault.replace(existingHash, '');
      }

      var _config = {};

      _config.redirectUri = pathDefault;
      _config.postLogoutRedirectUri = pathDefault;

      Object.assign(_config, config);

      var adalContext = this.adal.inject(_config);
      this.logger.info('AdalContext created');
      this.logger.debug(adalContext);

      this.authContext.initialize(adalContext);

      window.AuthenticationContext = function () {
        return _this.authContext.adal;
      };

      this.logger.info('aurelia-adal configured');
    } catch (e) {
      this.logger.error('aurelia-adal configuration failed:');
      this.logger.error(e);
      console.log(e);
    }
  };

  return AdalInitializer;
}()) || _class);