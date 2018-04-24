export const expandObject = (object, property) => {
    const newObject = Object.assign({}, object);
    return Object.assign(newObject, property);
}