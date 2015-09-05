var app;
(function (app) {
    'use strict';
    angular
        .module('app', [
        ''
    ]);
})(app || (app = {}));
var app;
(function (app) {
    var core;
    (function (core) {
        'use strict';
        angular
            .module('app.core', [
            'blocks.exception', 'blocks.logger', 'blocks.router'
        ]);
    })(core = app.core || (app.core = {}));
})(app || (app = {}));
var blocks;
(function (blocks) {
    var exception;
    (function (exception_1) {
        'use strict';
        var ExceptionHandlerProvider = (function () {
            function ExceptionHandlerProvider() {
                var _this = this;
                this.config = {
                    appErrorPrefix: undefined
                };
                this.$get = function () { return { config: _this.config }; };
            }
            ExceptionHandlerProvider.prototype.configure = function (appErrorPrefix) {
                this.config.appErrorPrefix = appErrorPrefix;
            };
            ExceptionHandlerProvider.$inject = [];
            return ExceptionHandlerProvider;
        })();
        extendExceptionHandler.$inject = ['$delegate', 'exceptionHandler', 'logger'];
        function extendExceptionHandler($delegate, exceptionHandler, logger) {
            return function (exception, cause) {
                var appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
                var errorData = { exception: exception, cause: cause };
                exception.message = appErrorPrefix + exception.message;
                logger.error(exception.message, errorData);
                $delegate(exception, cause);
            };
        }
        function config($provider) {
            $provider.decorator('$exceptionHandler', extendExceptionHandler);
        }
        angular
            .module('blocks.exception')
            .provider('exceptionHandler', ExceptionHandlerProvider)
            .config(config);
    })(exception = blocks.exception || (blocks.exception = {}));
})(blocks || (blocks = {}));
var blocks;
(function (blocks) {
    var exception;
    (function (exception) {
        'use strict';
        angular
            .module('blocks.exception', [
            'blocks.logger'
        ]);
    })(exception = blocks.exception || (blocks.exception = {}));
})(blocks || (blocks = {}));
var blocks;
(function (blocks) {
    var exception;
    (function (exception) {
        'use strict';
        var Exception = (function () {
            function Exception(logger) {
                var _this = this;
                this.logger = logger;
                this.catcher = function (message) { return function (reason) { return _this.logger.error(message, reason); }; };
            }
            Exception.$inject = ['logger'];
            return Exception;
        })();
        exception.Exception = Exception;
        angular
            .module('blocks.exception')
            .service('exception', Exception);
    })(exception = blocks.exception || (blocks.exception = {}));
})(blocks || (blocks = {}));
var blocks;
(function (blocks) {
    var logger;
    (function (logger) {
        'use strict';
        angular
            .module('blocks.logger', []);
    })(logger = blocks.logger || (blocks.logger = {}));
})(blocks || (blocks = {}));
var blocks;
(function (blocks) {
    var logger;
    (function (logger) {
        'use strict';
        var Logger = (function () {
            function Logger($log, toastr) {
                this.$log = $log;
                this.toastr = toastr;
            }
            Logger.prototype.info = function (message, data, title) {
                this.toastr.info(message, title);
                this.$log.info('Info' + message, '\nSummary:', title, '\nDetailsL\:', data);
            };
            Logger.prototype.error = function (message, data, title) {
                this.toastr.error(message, title);
                this.$log.error('Error' + message, '\nSummary:', title, '\nDetailsL\:', data);
            };
            Logger.prototype.success = function (message, data, title) {
                this.toastr.success(message, title);
                this.$log.info('Success' + message, '\nSummary:', title, '\nDetailsL\:', data);
            };
            Logger.prototype.warning = function (message, data, title) {
                this.toastr.warning(message, title);
                this.$log.warn('Warning' + message, '\nSummary:', title, '\nDetailsL\:', data);
            };
            Logger.prototype.log = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                this.$log.log(args);
            };
            Logger.$inject = ['$log', 'toastr'];
            return Logger;
        })();
        logger.Logger = Logger;
        angular
            .module('blocks.logger')
            .service('logger', Logger);
    })(logger = blocks.logger || (blocks.logger = {}));
})(blocks || (blocks = {}));

//# sourceMappingURL=maps/app.js.map