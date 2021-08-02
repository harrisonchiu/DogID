const styles = {
    start: "\x1b[",
    reset: "\x1b[0m",
    bold: "1",
    italic: "2",
    underline: "4",
    blink: "5",
    reverse: "7",
    hidden: "8",
    // Foreground (text) colors
    fg: {
        black: "30",
        red: "31",
        green: "32",
        yellow: "33",
        blue: "34",
        magenta: "35",
        cyan: "36",
        white: "37",
        crimson: "38"
    },
    // Background colors
    bg: {
        black: "40",
        red: "41",
        green: "42",
        yellow: "43",
        blue: "44",
        magenta: "45",
        cyan: "46",
        white: "47",
        crimson: "48"
    }
}

const Time = (): string => {
    const date = new Date()
    const currentTime = date.toLocaleTimeString('en-GB')
    const currentMilliseconds = ('000' + date.getMilliseconds()).slice(-3);

    return '[' + currentTime + ':' + currentMilliseconds + ']'
}

class Logger {
    static trace(logText: string) {
        const style = `${styles.start}${styles.bg.black};${styles.fg.white}m`
        console.log(`${style}${Time()}${styles.reset}` + ' ' + `${style}[TRACE]${styles.reset} ${logText}`)
    }

    static debug(logText: string) {
        const style = `${styles.start}${styles.bg.black};${styles.fg.white}m`
        console.log(`${style}${Time()}${styles.reset}` + ' ' + `${style}[DEBUG]${styles.reset} ${logText}`)
    }

    static info(logText: string) {
        const style = `${styles.start}${styles.bg.white};${styles.fg.black}m`
        console.log(`${style}${Time()}${styles.reset}` + ' ' + `${style}[INFO]${styles.reset} ${logText}`)
    }

    static warn(logText: string) {
        const style = `${styles.start}${styles.bg.yellow};${styles.fg.black}m`
        console.log(`${style}${Time()}${styles.reset}` + ' ' + `${style}[WARN]${styles.reset} ${logText}`)
    }

    static error(logText: string) {
        const style = `${styles.start}${styles.bg.red};${styles.fg.black}m`
        console.log(`${style}${Time()}${styles.reset}` + ' ' + `${style}[ERROR]${styles.reset} ${logText}`)
    }

    static fatal(logText: string) {
        const style = `${styles.start}${styles.bold};${styles.bg.red};${styles.fg.black}m`
        console.log(`${style}${Time()}${styles.reset}` + ' ' + `${style}[FATAL]${styles.reset} ${logText}`)
    }
    
    static success(logText: string) {
        const style = `${styles.start}${styles.bg.green};${styles.fg.black}m`
        console.log(`${style}${Time()}${styles.reset}` + ' ' + `${style}[SUCCESS]${styles.reset} ${logText}`)
    }
}


export { Logger }