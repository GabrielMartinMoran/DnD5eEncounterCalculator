const collect = (listId) => {
    const creatures = [];
    $(listId).childNodes.forEach((child) => {
        const amount = $(`#amount-${child.id}`).value;
        const type = Boolean($(`#level-${child.id}`)) ? 'character' : 'monster';
        for (let i = 0; i < amount; i++) {
            if (type === 'character') {
                const level = $(`#level-${child.id}`).value;
                creatures.push({
                    type: 'character',
                    level: parseInt(level),
                });
            } else {
                const cr = $(`#cr-${child.id}`).value;
                creatures.push({
                    type: 'monster',
                    cr,
                });
            }
        }
    });
    return creatures;
};

export const collectAllies = () => {
    return collect('#alliesList');
};

export const collectEnemies = () => {
    return collect('#enemiesList');
};
