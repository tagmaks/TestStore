namespace blocks.exception {
	'use strict';

	interface IExceptionHandlerConfig {
		appErrorPrefix: string
	}

	export class ExceptionHandlerProvider {
		static $inject: Array<string> = [];

		constructor() { }

		config: IExceptionHandlerConfig = {
			appErrorPrefix: undefined
		}
		
		//Set the error prefix.
		configure(appErrorPrefix: any) {
			this.config.appErrorPrefix = appErrorPrefix;
		}
		
		//Configure kind of service - involed when instance needs to be created.
		$get: () => { config: IExceptionHandlerConfig } = () => { return { config: this.config }; }
	}

	extendExceptionHandler.$inject = ['$delegate', 'exceptionHandler', 'logger']
	/**
	 * Extend the $exceptionHandler to also display a toast.
	 * @param {Object} $delegate the original service instance
	 * @param {Object} exceptionHandler
	 * @param {Object} logger
	 * @return {Function} the decoreted $exceptionHandler service
	 */
	function extendExceptionHandler($delegate: ng.IExceptionHandlerService, exceptionHandler: any, logger: blocks.logger.Logger) {
		return function(exception: any, cause: any) {
			var appErrorPrefix = exceptionHandler.config.appErrorPrefix || '';
			var errorData = { exception: exception, cause: cause }
			exception.message = appErrorPrefix + exception.message;
			/**
             * Could add the error to a service's collection,
             * add errors to $rootScope, log errors to remote web server,
             * or log locally. Or throw hard. It is entirely up to you.
             * throw exception;
             *
             * @example
             *     throw { message: 'error message we added' };
             */
            logger.error(exception.message, errorData);
			//Invoke the original service instance
			$delegate(exception, cause);
		}
	}

	function config($provider: ng.auto.IProvideService): void {
		$provider.decorator('$exceptionHandler', extendExceptionHandler)
	}

	angular
		.module('blocks.exception')
		.provider('exceptionHandler', ExceptionHandlerProvider)
		.config(config);

}