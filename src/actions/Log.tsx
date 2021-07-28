const Time = (): string => {
    const date = new Date()
    const currentTime = date.toLocaleTimeString('en-GB')
    const currentMilliseconds = ('000' + date.getMilliseconds()).slice(-3);

    return '[' + currentTime + ':' + currentMilliseconds + '] '
}

export { Time }