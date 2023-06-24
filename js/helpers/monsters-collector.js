export const collectMonsters = () => {
    const monsters = [];
    $('#monstersList').childNodes.forEach((child) => {
        const amount = $(`#amount-${child.id}`).value;
        const cr = $(`#cr-${child.id}`).value;
        for (let i = 0; i < amount; i++) {
            monsters.push({ cr });
        }
    });
    return monsters;
};
