// Datos de monstruos y reglas de afinidad, separados del motor para facilitar el balance.
// Datos visuales editables: rutas externas mantienen ligero el HTML y el emoji sirve como respaldo.
export const MONSTER_SPRITES = {
  "Goblin": "./sprites/monsters/goblin.png",
  "Lobo Huargo": "./sprites/monsters/lobo-huargo.png",
  "Araña Gigante": "./sprites/monsters/arana-gigante.png",
  "Jefe Goblin": "./sprites/monsters/crawl/orc_warrior.png",
  "Oso Lechuza": "./sprites/monsters/crawl/animals/black_bear.png",
  "Esqueleto": "./sprites/monsters/crawl/undead/skeletons/skeleton_humanoid_small.png",
  "Cubo Gelatinoso": "./sprites/monsters/crawl/amorphous/jelly.png",
  "Mímico": "./sprites/monsters/crawl/amorphous/ooze.png",
  "Rey Esqueleto": "./sprites/monsters/crawl/undead/skeletons/skeleton_humanoid_large.png",
  "Gárgola": "./sprites/monsters/crawl/nonliving/guardian_golem.png",
  "Orco": "./sprites/monsters/crawl/orc.png",
  "Troll": "./sprites/monsters/crawl/deep_troll.png",
  "Ciempiés": "./sprites/monsters/crawl/animals/giant_cockroach.png",
  "Señor Orco": "./sprites/monsters/crawl/orc_knight.png",
  "Minotauro": "./sprites/monsters/crawl/two_headed_ogre.png",
  "Hombre Lagarto": "./sprites/monsters/crawl/animals/giant_newt.png",
  "Bruja": "./sprites/monsters/crawl/necromancer.png",
  "Sapo Gigante": "./sprites/monsters/crawl/animals/giant_frog.png",
  "Hidra": "./sprites/monsters/crawl/dragons/hydra1.png",
  "Dragón Verde": "./sprites/monsters/crawl/dragons/swamp_dragon.png",
  "Ghoul": "./sprites/monsters/crawl/undead/ghoul.png",
  "Espectro": "./sprites/monsters/crawl/undead/silent_spectre.png",
  "Sombra": "./sprites/monsters/crawl/undead/shadow.png",
  "Vampiro": "./sprites/monsters/crawl/undead/vampire.png",
  "Nigromante": "./sprites/monsters/crawl/necromancer.png",
  "Drow": "./sprites/monsters/crawl/deep_elf_sorcerer.png",
  "Horror": "./sprites/monsters/crawl/abyss/lurking_horror.png",
  "Azotamentes": "./sprites/monsters/crawl/panlord/demon_head_brain.png",
  "Matriarca": "./sprites/monsters/crawl/deep_elf_death_mage.png",
  "Beholder": "./sprites/monsters/crawl/eyes/giant_eyeball.png",
  "Arpía": "./sprites/monsters/crawl/harpy.png",
  "Grifo": "./sprites/monsters/crawl/griffon.png",
  "Gólem Hielo": "./sprites/monsters/crawl/nonliving/air_elemental.png",
  "Gigante Escarcha": "./sprites/monsters/crawl/frost_giant.png",
  "Wyvern": "./sprites/monsters/crawl/dragons/wyvern.png",
  "Perro Infernal": "./sprites/monsters/crawl/animals/hell_hound.png",
  "Elemental Fuego": "./sprites/monsters/crawl/nonliving/fire_elemental.png",
  "Salamandra": "./sprites/monsters/crawl/salamander.png",
  "Gigante Fuego": "./sprites/monsters/crawl/fire_giant.png",
  "Dragón Rojo": "./sprites/monsters/crawl/dragons/golden_dragon.png",
  "Diablillo": "./sprites/monsters/crawl/demons/white_imp.png",
  "Súcubo": "./sprites/monsters/crawl/panlord/demon_body_succubus.png",
  "Demonio": "./sprites/monsters/crawl/demons/orange_demon.png",
  "Balor": "./sprites/monsters/crawl/demons/balrug.png",
  "Señor del Foso": "./sprites/monsters/crawl/demons/brimstone_fiend.png",
  "Caballero Muerte": "./sprites/monsters/crawl/death_knight.png",
  "Gólem Hierro": "./sprites/monsters/crawl/nonliving/iron_golem.png",
  "Dragón Zombi": "./sprites/monsters/crawl/undead/bone_dragon.png",
  "Lich": "./sprites/monsters/crawl/undead/lich.png",
  "Tarrasque": "./sprites/monsters/crawl/abyss/ancient_zyme.png"
};

// Las afinidades de clase definen valores base; cada monstruo solo declara sus excepciones.
export const DAMAGE_TYPES = ['Corte','Contundente','Sagrado','Arcano','Rúnico','Sangre','Fuego','Hielo','Veneno','Vacío'];
export const CLASS_AFFINITIES = {
  Bestia:{Fuego:1.25,Veneno:.75},
  Humanoide:{},
  'No-muerto':{Sagrado:1.5,Sangre:.5},
  Constructo:{Veneno:.5,Sangre:.5,Contundente:1.25,Arcano:1.25},
  Elemental:{},
  Demonio:{Fuego:.5,Sangre:.5,Sagrado:1.5,Arcano:1.25},
  Dragón:{Corte:.75,Contundente:.75},
  Aberración:{Corte:.75,Contundente:.75,Arcano:1.25,Rúnico:1.25},
  Gigante:{Contundente:.75,Arcano:1.25,Rúnico:1.25,Sagrado:1.25},
  'No-muerto espectral':{Corte:.5,Contundente:.5,Arcano:1.25,Sagrado:1.5}
};
export const MONSTER_CLASSES = {};
function registerMonsterClass(names, monsterClass) {
  names.split('|').forEach(name => {
    MONSTER_CLASSES[name] = monsterClass;
  });
}

registerMonsterClass('Goblin|Jefe Goblin|Orco|Señor Orco|Hombre Lagarto|Bruja|Drow|Medusa|Ogro','Humanoide');
registerMonsterClass('Lobo Huargo|Araña Gigante|Oso Lechuza|Ciempiés|Sapo Gigante|Hidra|Arpía|Grifo|Perro Infernal|Jabalí|Serpiente|Murciélago|Rata Gigante|Gusano de Roca|Murciélago Vampiro|Escorpión|Cocodrilo|Sanguijuela|Cuervo Sombrío|Reina Araña|Araña Drow|Yeti|Lobo de Hielo|Ave de Fuego|Sabueso Infernal|Cuervo del Vacío','Bestia');
registerMonsterClass('Esqueleto|Rey Esqueleto|Ghoul|Vampiro|Nigromante|Caballero Muerte|Zombi|Momia|Banshee|Rey Espectral|Segador|Lich','No-muerto');
registerMonsterClass('Espectro|Sombra','No-muerto espectral');
registerMonsterClass('Gárgola|Gólem Hielo|Gólem Hierro|Gólem de Hueso|Ent Anciano|Gólem de Magma','Constructo');
registerMonsterClass('Elemental Fuego|Salamandra|Elemental de Hielo|Ifrit|Dragón de Hielo','Elemental');
registerMonsterClass('Diablillo|Súcubo|Demonio|Balor|Señor del Foso|Cerbero|Cambion|Larva Abisal|Pit Fiend|Serafín Caído','Demonio');
registerMonsterClass('Dragón Verde|Wyvern|Dragón Rojo|Dragón Zombi|Dragón Hueso','Dragón');
registerMonsterClass('Cubo Gelatinoso|Mímico|Horror|Azotamentes|Matriarca|Beholder|Hongo Errante|Devorador|Aboleth','Aberración');
registerMonsterClass('Troll|Minotauro|Gigante Escarcha|Gigante Fuego|Tarrasque|Rey Troll','Gigante');
export const MONSTER_ELEMENTS = {'Elemental Fuego':'Fuego','Salamandra':'Fuego','Elemental de Hielo':'Hielo','Gólem Hielo':'Hielo','Dragón de Hielo':'Hielo','Gólem de Magma':'Fuego','Ave de Fuego':'Fuego','Ifrit':'Fuego'};
export const MONSTER_AFFINITIES = {
  Goblin:{Contundente:1,Corte:1,Arcano:1,Fuego:1.25},
  'Lobo Huargo':{Corte:1,Contundente:1,Fuego:1.25,Hielo:.75},
  'Araña Gigante':{Corte:1.25,Fuego:1.25,Veneno:.5},
  'Jefe Goblin':{Contundente:1,Arcano:1.25,Fuego:1},
  'Oso Lechuza':{Contundente:.75,Corte:1,Fuego:1.25},
  Esqueleto:{Corte:.75,Contundente:1.25,Sagrado:1.5,Sangre:.5},
  'Cubo Gelatinoso':{Corte:.5,Contundente:.75,Fuego:1.25,Arcano:1},
  Mímico:{Corte:1,Contundente:1,Arcano:1.25,Fuego:1},
  'Rey Esqueleto':{Corte:.5,Contundente:1.25,Sagrado:1.5,Sangre:.5},
  Gárgola:{Corte:.5,Contundente:1.25,Arcano:1.25,Veneno:.5},
  Orco:{Corte:1,Contundente:.75,Arcano:1.25},
  Troll:{Corte:1,Contundente:.75,Fuego:1.25},
  Ciempiés:{Corte:1.25,Contundente:1,Veneno:.5,Fuego:1},
  'Hombre Lagarto':{Corte:1,Fuego:1.25,Hielo:.75},
  Bruja:{Corte:1,Contundente:1,Arcano:.75,Rúnico:1.25},
  'Sapo Gigante':{Corte:1,Veneno:.75,Hielo:1.25,Fuego:1},
  Hidra:{Corte:.75,Contundente:1,Fuego:1.25,Hielo:1},
  'Dragón Verde':{Veneno:.5,Fuego:1,Hielo:1.25,Sagrado:1},
  Ghoul:{Corte:.75,Contundente:1,Sagrado:1.5,Sangre:.5},
  Espectro:{Corte:.5,Contundente:.5,Arcano:1.25,Sagrado:1.5},
  Sombra:{Corte:.5,Contundente:.75,Arcano:1.25,Sagrado:1.5},
  Vampiro:{Sagrado:1.5,Sangre:.5,Arcano:1,Fuego:1.25},
  Nigromante:{Sagrado:1.5,Arcano:.75,Rúnico:1.25},
  Drow:{Corte:1,Arcano:.75,Fuego:1.25},
  Horror:{Corte:.75,Contundente:1,Arcano:1.25,Rúnico:1.25},
  Azotamentes:{Corte:1,Contundente:1,Arcano:.75,Rúnico:1.25},
  Matriarca:{Corte:.75,Arcano:.75,Fuego:1.25,Sagrado:1},
  Beholder:{Corte:1,Arcano:.5,Rúnico:1.25,Contundente:1},
  Arpía:{Corte:1,Hielo:1.25,Fuego:1},
  Grifo:{Corte:1,Contundente:1,Hielo:1.25},
  'Gólem Hielo':{Hielo:.5,Fuego:1.5,Contundente:1,Arcano:1},
  'Gigante Escarcha':{Hielo:.5,Fuego:1.5,Contundente:.75},
  Wyvern:{Hielo:.75,Fuego:1,Corte:.75,Rúnico:1.25},
  'Perro Infernal':{Fuego:.5,Hielo:1.25,Sagrado:1.25},
  'Elemental Fuego':{Fuego:.25,Hielo:1.5,Contundente:1,Arcano:1},
  Salamandra:{Fuego:.5,Hielo:1.5,Corte:1},
  'Gigante Fuego':{Fuego:.5,Hielo:1.5,Contundente:.75},
  'Dragón Rojo':{Fuego:.25,Hielo:1.5,Contundente:.75,Rúnico:1.25},
  Diablillo:{Fuego:.5,Sangre:.5,Sagrado:1.25,Hielo:1.25},
  Súcubo:{Sagrado:1.25,Arcano:1,Sangre:.5,Contundente:1},
  Demonio:{Fuego:.5,Sangre:.5,Sagrado:1.5,Rúnico:1.25},
  Balor:{Fuego:.25,Sagrado:1.5,Hielo:1.25,Rúnico:1.25},
  'Señor del Foso':{Fuego:.25,Sangre:.5,Sagrado:1.5,Hielo:1.25},
  'Caballero Muerte':{Corte:.75,Contundente:1,Sagrado:1.5,Sangre:.5},
  'Gólem Hierro':{Corte:.5,Contundente:1.25,Arcano:1.25,Fuego:1},
  'Dragón Zombi':{Sagrado:1.5,Sangre:.5,Fuego:1.25,Corte:.75},
  Lich:{Sagrado:1.5,Arcano:.75,Rúnico:1.5,Sangre:.5},
  Tarrasque:{Corte:.5,Contundente:.75,Arcano:1.25,Rúnico:1.25,Sagrado:1.25}
};
export function getMonsterAffinities(name,cls){
  const result={...(CLASS_AFFINITIES[cls]||{})},element=MONSTER_ELEMENTS[name];
  if(element==='Fuego')Object.assign(result,{Fuego:.25,Hielo:1.5});
  if(element==='Hielo')Object.assign(result,{Hielo:.25,Fuego:1.5});
  return Object.assign(result,MONSTER_AFFINITIES[name]||{});
}
export const getAffinityMultiplier = (monster, type) => monster.affinities[type] ?? 1;
export const getAffinityLabel = value => value > 1 ? 'Vulnerable' : value < 1 ? 'Resistente' : 'Daño normal';

// Las zonas describen encuentros; separarlas de las reglas evita mezclar progresión y combate.
export const ZONES = [
  {
    z: 'Bosque de los Inicios',
    m: [
      { n: 'Goblin', e: '👺' },
      { n: 'Lobo Huargo', e: '🐺' },
      { n: 'Araña Gigante', e: '🕷️' },
    ],
    b: [
      { n: 'Jefe Goblin', e: '👹' },
      { n: 'Oso Lechuza', e: '🐻' },
    ],
  },
  {
    z: 'Mazmorra Húmeda',
    m: [
      { n: 'Esqueleto', e: '💀' },
      { n: 'Cubo Gelatinoso', e: '🟩' },
      { n: 'Mímico', e: '📦' },
    ],
    b: [
      { n: 'Rey Esqueleto', e: '☠️' },
      { n: 'Gárgola', e: '🗿' },
    ],
  },
  {
    z: 'Cavernas Subterráneas',
    m: [
      { n: 'Orco', e: '🧌' },
      { n: 'Troll', e: '🧟' },
      { n: 'Ciempiés', e: '🐛' },
    ],
    b: [
      { n: 'Señor Orco', e: '👑' },
      { n: 'Minotauro', e: '🐂' },
    ],
  },
  {
    z: 'Pantano Sombrío',
    m: [
      { n: 'Hombre Lagarto', e: '🦎' },
      { n: 'Bruja', e: '🧙‍♀️' },
      { n: 'Sapo Gigante', e: '🐸' },
    ],
    b: [
      { n: 'Hidra', e: '🐍' },
      { n: 'Dragón Verde', e: '🐉' },
    ],
  },
  {
    z: 'Cripta Olvidada',
    m: [
      { n: 'Ghoul', e: '🧟‍♂️' },
      { n: 'Espectro', e: '👻' },
      { n: 'Sombra', e: '👥' },
    ],
    b: [
      { n: 'Vampiro', e: '🧛‍♂️️' },
      { n: 'Nigromante', e: '🧙‍♂️' },
    ],
  },
  {
    z: 'El Infrarrojo',
    m: [
      { n: 'Drow', e: '🧝' },
      { n: 'Horror', e: '🦑' },
      { n: 'Azotamentes', e: '🐙' },
    ],
    b: [
      { n: 'Matriarca', e: '👑' },
      { n: 'Beholder', e: '👁️' },
    ],
  },
  {
    z: 'Picos Helados',
    m: [
      { n: 'Arpía', e: '🦅' },
      { n: 'Grifo', e: '🦁' },
      { n: 'Gólem Hielo', e: '🧊' },
    ],
    b: [
      { n: 'Gigante Escarcha', e: '🏔️' },
      { n: 'Wyvern', e: '🐲' },
    ],
  },
  {
    z: 'Volcán Activo',
    m: [
      { n: 'Perro Infernal', e: '🐕' },
      { n: 'Elemental Fuego', e: '🔥' },
      { n: 'Salamandra', e: '🦎' },
    ],
    b: [
      { n: 'Gigante Fuego', e: '🌋' },
      { n: 'Dragón Rojo', e: '🔥' },
    ],
  },
  {
    z: 'Abismo Demoníaco',
    m: [
      { n: 'Diablillo', e: '👿' },
      { n: 'Súcubo', e: '💋' },
      { n: 'Demonio', e: '👺' },
    ],
    b: [
      { n: 'Balor', e: '🔥' },
      { n: 'Señor del Foso', e: '👹' },
    ],
  },
  {
    z: 'Trono del Vacío',
    m: [
      { n: 'Caballero Muerte', e: '🤺' },
      { n: 'Gólem Hierro', e: '🤖' },
      { n: 'Dragón Zombi', e: '🦴' },
    ],
    b: [
      { n: 'Lich', e: '💀' },
      { n: 'Tarrasque', e: '🦖' },
    ],
  },
];

export const MONSTER_SPRITE_BASE_URL = './sprites/monsters/crawl/';
const createMonster = (name, emoji, spritePath) => ({ n: name, e: emoji, u: spritePath });
export const ADDITIONAL_ENCOUNTERS = [
  [
    [
      createMonster('Jabalí', '🐗', 'animals/hog.png'),
      createMonster('Serpiente', '🐍', 'animals/adder.png'),
      createMonster('Murciélago', '🦇', 'animals/bat.png'),
    ],
    [createMonster('Ent Anciano', '🌳')],
  ],
  [
    [
      createMonster('Rata Gigante', '🐀', 'animals/rat.png'),
      createMonster('Zombi', '🧟'),
      createMonster('Gusano de Roca', '🪱'),
    ],
    [createMonster('Gólem de Hueso', '🦴')],
  ],
  [
    [
      createMonster('Murciélago Vampiro', '🦇'),
      createMonster('Escorpión', '🦂'),
      createMonster('Ogro', '👹'),
    ],
    [createMonster('Rey Troll', '🧌')],
  ],
  [
    [
      createMonster('Cocodrilo', '🐊'),
      createMonster('Sanguijuela', '🪱'),
      createMonster('Medusa', '🐍'),
    ],
    [createMonster('Reina Araña', '🕷️')],
  ],
  [
    [
      createMonster('Momia', '🧟'),
      createMonster('Banshee', '👻'),
      createMonster('Cuervo Sombrío', '🐦‍⬛'),
    ],
    [createMonster('Rey Espectral', '👑')],
  ],
  [
    [
      createMonster('Araña Drow', '🕷️'),
      createMonster('Hongo Errante', '🍄'),
      createMonster('Devorador', '👁️'),
    ],
    [createMonster('Aboleth', '🐙')],
  ],
  [
    [
      createMonster('Yeti', '🦍'),
      createMonster('Lobo de Hielo', '🐺'),
      createMonster('Elemental de Hielo', '❄️'),
    ],
    [createMonster('Dragón de Hielo', '🐲')],
  ],
  [
    [
      createMonster('Cerbero', '🐕'),
      createMonster('Ave de Fuego', '🦅'),
      createMonster('Gólem de Magma', '🌋'),
    ],
    [createMonster('Ifrit', '🔥')],
  ],
  [
    [
      createMonster('Sabueso Infernal', '🐕‍🦺'),
      createMonster('Cambion', '😈'),
      createMonster('Larva Abisal', '🪱'),
    ],
    [createMonster('Pit Fiend', '👹')],
  ],
  [
    [
      createMonster('Segador', '💀'),
      createMonster('Cuervo del Vacío', '🦇'),
      createMonster('Serafín Caído', '👼'),
    ],
    [createMonster('Dragón Hueso', '🐉')],
  ],
];

ADDITIONAL_ENCOUNTERS.forEach(([monsters, bosses], zoneIndex) => {
  ZONES[zoneIndex].m.push(...monsters);
  ZONES[zoneIndex].b.push(...bosses);
});

// Sprites locales de tiles-master; los encuentros sin sprite conservan su emoji.
export const ADDITIONAL_MONSTER_SPRITES = {
  'Jabalí': 'animals/black_bear.png',
  'Serpiente': 'animals/adder.png',
  'Murciélago': 'animals/bat.png',
  'Ent Anciano': 'fungi_plants/plant_crypt.png',
  'Rata Gigante': 'animals/giant_cockroach.png',
  'Zombi': 'undead/zombies/zombie_ugly_thing.png',
  'Gusano de Roca': 'animals/elephant_slug.png',
  'Gólem de Hueso': 'nonliving/flesh_golem.png',
  'Murciélago Vampiro': 'animals/vampire_mosquito.png',
  'Escorpión': 'animals/scorpion.png',
  'Ogro': 'ogre.png',
  'Rey Troll': 'deep_troll.png',
  'Cocodrilo': 'animals/alligator_snapping_turtle.png',
  'Sanguijuela': 'animals/giant_leech.png',
  'Medusa': 'panlord/demon_head_medusa.png',
  'Reina Araña': 'animals/orb_spider.png',
  'Momia': 'undead/drowned_soul.png',
  'Banshee': 'undead/silent_spectre.png',
  'Cuervo Sombrío': 'animals/bat.png',
  'Rey Espectral': 'undead/shadow_wraith.png',
  'Araña Drow': 'animals/jumping_spider.png',
  'Hongo Errante': 'fungi_plants/wandering_mushroom.png',
  'Devorador': 'panlord/demon_head_eyeball.png',
  'Aboleth': 'abyss/lurking_horror.png',
  'Yeti': 'animals/ice_beast.png',
  'Lobo de Hielo': 'animals/wolf.png',
  'Elemental de Hielo': 'nonliving/air_elemental.png',
  'Dragón de Hielo': 'dragons/ice_dragon.png',
  'Cerbero': 'animals/hell_hound.png',
  'Ave de Fuego': 'animals/fire_bat.png',
  'Gólem de Magma': 'nonliving/fire_elemental.png',
  'Ifrit': 'nonliving/fire_elemental.png',
  'Sabueso Infernal': 'animals/hell_hound.png',
  'Cambion': 'demons/orange_demon.png',
  'Larva Abisal': 'demons/demonic_crawler.png',
  'Pit Fiend': 'demons/brimstone_fiend.png',
  'Segador': 'demons/reaper.png',
  'Cuervo del Vacío': 'animals/bat.png',
  'Serafín Caído': 'holy/seraph.png',
  'Dragón Hueso': 'undead/bone_dragon.png',
};
ZONES.forEach(z=>[...z.m,...z.b].forEach(m=>{if(!m.u&&ADDITIONAL_MONSTER_SPRITES[m.n])m.u=ADDITIONAL_MONSTER_SPRITES[m.n]}));

// Cada familia deja objetos acordes a su naturaleza; el motor sortea entre estos botines.
export const MONSTER_LOOT_TABLE = {
  Bestia: ['pot', 'trap'],
  Humanoide: ['smoke', 'bladeOil'],
  'No-muerto': ['eter', 'bookInk'],
  Constructo: ['bladeOil', 'trap'],
  Elemental: ['eter', 'bookInk'],
  Demonio: ['smoke', 'bookInk'],
  Dragón: ['pot', 'bladeOil'],
  Aberración: ['smoke', 'bookInk', 'trap'],
  Gigante: ['pot', 'bladeOil'],
  'No-muerto espectral': ['eter', 'smoke'],
};
