// constants
const winston = require('winston');
const moment = require('moment');

// date formatter
dateFormat = () => {
	return moment().format('LLLL');
};

// making the class 'LoggerService'
class LoggerService {
	constructor() {
		this.log_data = null; // Setting the variable up
		this.route = Date.now(); // The route for our log file (creates a new file when you run)
		const logger = winston.createLogger({
			format: winston.format.combine(
			winston.format.colorize({ all: true }),
			winston.format.printf(info => {
				let message = `[${info.level}] - ${info.message}`;
					
				  message = info.obj
						?message + 
					    	  `data: ${JSON.stringify(info.obj)}`
						:message;
						 
				  message = this.log_data
				    	?message +
					          `log_data:${JSON.stringify(this.log_data)}`
					    :message;

				return message;
			 })
			),
			transports: [
				new winston.transports.Console(),
				new winston.transports.File({
					filename: `./logs/${this.route}.log`, // Output of the logs
                })
			]
			
			// Beyond this point you should be able to tell what im doing meexy baby
		});

		this.logger = logger;
	}

	setLogData(log_data) {
		this.log_data = log_data;
	}

	async info(message) {
		this.logger.log('info', message);
	}

	async info(message, obj) {
		this.logger.log('info', message, {
			obj,
		});
	}

	async debug(message) {
		this.logger.log('debug', message);
	}

	async debug(message, obj) {
		this.logger.log('debug', message, {
			obj,
		});
	}

	async error(message) {
		this.logger.log('error', message);
	}

	async error(message, obj) {
		this.logger.log('error', message, {
			obj,
		});
	}

	async warn(message) {
		this.logger.log('warn', message);
	}

	async warn(message, obj) {
		this.logger.log('warn', message, {
			obj,
		});
	}
}

module.exports = LoggerService;