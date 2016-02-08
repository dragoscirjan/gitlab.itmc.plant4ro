export class CustomLogAppender {
    constructor(){

    }

    /**
     * [debug description]
     * @method debug
     * @param  {[type]} logger  [description]
     * @param  {[type]} message [description]
     * @param  {[type]} ...rest [description]
     * @return {[type]}         [description]
     */
    debug(logger, message, ...rest){
        console.debug(`DEBUG [${logger.id}] ${message}`, ...rest);
    }

    /**
     * [info description]
     * @method info
     * @param  {[type]} logger  [description]
     * @param  {[type]} message [description]
     * @param  {[type]} ...rest [description]
     * @return {[type]}         [description]
     */
    info(logger, message, ...rest){
        console.info(`INFO [${logger.id}] ${message}`, ...rest);
    }

    /**
     * [warn description]
     * @method warn
     * @param  {[type]} logger  [description]
     * @param  {[type]} message [description]
     * @param  {[type]} ...rest [description]
     * @return {[type]}         [description]
     */
    warn(logger, message, ...rest){
        console.warn(`WARN [${logger.id}] ${message}`, ...rest);
    }

    /**
     * [error description]
     * @method error
     * @param  {[type]} logger  [description]
     * @param  {[type]} message [description]
     * @param  {[type]} ...rest [description]
     * @return {[type]}         [description]
     */
    error(logger, message, ...rest){
        console.error(`ERROR [${logger.id}] ${message}`, ...rest);
    }
}
