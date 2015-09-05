namespace app.core {
	'use strict';

	var config = {
		appErrorPrefix: '[Error]',
		appTitle: 'Hello World'
	};

	angular
		.module('app.core')
		.config(configure)
		.config(configToastr)
		.value('config', config);

	configToastr.$inject = ['toastr'];
	function configToastr(toastr: Toastr) {
		toastr.options.timeOut = 4000;
		toastr.options.positionClass = 'toast-bottom-right';
	}

	configure.$inject = ['$logProvider', 'exceptionHandlerProvider'];
	function configure($logProvider: ng.ILogProvider, exceptionHandlerProvider: blocks.exception.ExceptionHandlerProvider) {
		if ($logProvider.debugEnabled) {
			//Enable debug level messages
			$logProvider.debugEnabled(true)
		}

		exceptionHandlerProvider.configure(config.appErrorPrefix);
	}
}