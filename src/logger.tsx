
class Logger {
    public log(msg: string) {
        if (window && window.console && window.console.log) {
            console.log(msg);
        }
    }
}

const logger = new Logger();

export default logger;