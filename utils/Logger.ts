/**
 * Logger utility for consistent logging across the framework
 * Provides different log levels and formatted output for debugging
 */
export class Logger {
    private static readonly COLORS = {
        RESET: '\x1b[0m',
        RED: '\x1b[31m',
        GREEN: '\x1b[32m',
        YELLOW: '\x1b[33m',
        BLUE: '\x1b[34m',
        MAGENTA: '\x1b[35m',
        CYAN: '\x1b[36m',
        GRAY: '\x1b[90m'
    };

    private static getTimestamp(): string {
        return new Date().toISOString();
    }

    private static formatMessage(level: string, pageName: string, message: string, color: string): string {
        const timestamp = this.getTimestamp();
        return `${color}[${timestamp}] [${level}] [${pageName}] ${message}${this.COLORS.RESET}`;
    }

    /**
     * Log informational messages (method entry, navigation, etc.)
     */
    static info(pageName: string, message: string): void {
        console.log(this.formatMessage('INFO', pageName, message, this.COLORS.BLUE));
    }

    /**
     * Log successful operations
     */
    static success(pageName: string, message: string): void {
        console.log(this.formatMessage('SUCCESS', pageName, message, this.COLORS.GREEN));
    }

    /**
     * Log warnings (non-critical issues)
     */
    static warn(pageName: string, message: string): void {
        console.warn(this.formatMessage('WARN', pageName, message, this.COLORS.YELLOW));
    }

    /**
     * Log errors with stack trace
     */
    static error(pageName: string, message: string, error?: any): void {
        console.error(this.formatMessage('ERROR', pageName, message, this.COLORS.RED));
        if (error) {
            console.error(`${this.COLORS.RED}Stack Trace:${this.COLORS.RESET}`, error);
        }
    }

    /**
     * Log debug information (detailed execution flow)
     */
    static debug(pageName: string, message: string): void {
        console.log(this.formatMessage('DEBUG', pageName, message, this.COLORS.GRAY));
    }

    /**
     * Log action being performed (click, fill, etc.)
     */
    static action(pageName: string, action: string, element: string): void {
        console.log(this.formatMessage('ACTION', pageName, `${action} on "${element}"`, this.COLORS.CYAN));
    }

    /**
     * Log navigation events
     */
    static navigation(pageName: string, url: string): void {
        console.log(this.formatMessage('NAVIGATION', pageName, `Navigating to: ${url}`, this.COLORS.MAGENTA));
    }

    /**
     * Log assertion/verification
     */
    static verify(pageName: string, message: string): void {
        console.log(this.formatMessage('VERIFY', pageName, message, this.COLORS.CYAN));
    }

    /**
     * Log method entry
     */
    static methodEntry(pageName: string, methodName: string, params?: any): void {
        const paramStr = params ? ` with params: ${JSON.stringify(params)}` : '';
        console.log(this.formatMessage('ENTRY', pageName, `Entering method: ${methodName}${paramStr}`, this.COLORS.GRAY));
    }

    /**
     * Log method exit
     */
    static methodExit(pageName: string, methodName: string, result?: any): void {
        const resultStr = result !== undefined ? ` returning: ${JSON.stringify(result)}` : '';
        console.log(this.formatMessage('EXIT', pageName, `Exiting method: ${methodName}${resultStr}`, this.COLORS.GRAY));
    }
}

// Made with Bob
