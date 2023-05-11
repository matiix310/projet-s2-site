
// FIRST PRESENTATION

const graphContainer1 = document.getElementById('graph-container1');

const gitgraph1 = GitgraphJS.createGitgraph(graphContainer1, {
    orientation: 'horizontal',
    // mode: 'compact'
});

const master1 = gitgraph1.branch('master')
    .commit('Initial commit')
    .commit('feat:create Canvas class');

const Terminal1 = master1.branch('Terminal')
    .commit('feat:create CommandSelector class')
    .commit('feat:create Tree class')
    .commit('feat:create Command class');

const Quest1 = master1.branch('Quest')
    .commit('feat:create QuestManager class');

const RpgGame1 = master1.branch('RpgGame')
    .commit('feat:create Inventory class')
    .commit('feat:create MapPreview class')
    .commit('feat:create MapTerrain class')
    .commit('feat:create Player class');


master1.merge(Terminal1)
    .merge(Quest1)
    .merge(RpgGame1, 'First presentation')
    .tag('First presentation');


// SECOND PRESENTATION

const graphContainer2 = document.getElementById('graph-container2');

const gitgraph2 = GitgraphJS.createGitgraph(graphContainer2, {
    orientation: 'horizontal',
    // mode: 'compact'
});

const master2 = gitgraph2.branch('master')
    .commit('First presentation');

const Terminal2 = master2.branch('Terminal')
    .commit('fix:CommandSelector class')
    .commit('fix:command display')
    
const RpgGame2 = master2.branch('RpgGame')
    .commit('feat:create NPC class')
    .commit('refactor:player skin and movement');

const Multiplayer2 = master2.branch('Multiplayer')
    .commit('feat:create Menu class')
    .commit('feat:client and server class')
    .commit('feat:create GhostDash minigame');

master2.merge(Terminal2)
    .merge(RpgGame2)
    .merge(Multiplayer2, 'Second presentation')
    .tag('Second presentation');


// FINAL PRESENTATION

const graphContainer3 = document.getElementById('graph-container3');

const gitgraph3 = GitgraphJS.createGitgraph(graphContainer3, {
    orientation: 'horizontal',
    // mode: 'compact'
});

const master3 = gitgraph3.branch('master')
    .commit('Second presentation');

const Terminal3 = master3.branch('Terminal')
    .commit('fix:Tree class')
    .commit('feat:add python, sudo and cat commands')
    
const RpgGame3 = master3.branch('RpgGame')
    .commit('fix:add/remove items from the Inventory class')
    .commit('feat:create Item class')
    .commit('feat:follow the story')
    .commit('feat:add IA movement to NPC')

const Multiplayer3 = master3.branch('Multiplayer')
    .commit('fix:add others visibility to GhostDash minigame')

master3.merge(Terminal3)
    .merge(RpgGame3)
    .merge(Multiplayer3, 'Final presentation')
    .tag('Final presentation');