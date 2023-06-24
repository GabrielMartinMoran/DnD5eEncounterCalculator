export const HTMLElement = (content, id) => {
    const element = document.createElement('span');
    if (id) element.id = id;
    element.innerHTML = content;
    return element;
};

export const onRender = (func) => requestAnimationFrame(() => func());
