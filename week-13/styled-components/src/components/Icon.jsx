const icons = {
    lemon: '🍋',
    rocket: '🚀',
    dog: '🐶',
}

export const Icon = (props) => {
    if (!props.name) {
        return null
    }

    if (!(props.name in icons)) {
        console.warn(`Icon with name "${props.name}" does not exist.`)
        return null
    }

    return <span className={`icon ${props.className}`}>{icons[props.name]}</span>
}