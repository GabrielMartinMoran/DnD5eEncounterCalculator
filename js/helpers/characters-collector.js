export const collectCharacters = () => {
    const characters = [];
    $('#charactersList').childNodes.forEach((child) => {
        const amount = $(`#amount-${child.id}`).value;
        const level = $(`#level-${child.id}`).value;
        for (let i = 0; i < amount; i++) {
            characters.push({
                level: parseInt(level),
            });
        }
    });
    return characters;
};
