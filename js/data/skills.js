// Catálogo de habilidades y técnicas iniciales. El motor solo consume estas configuraciones.
// Las habilidades son configuración: el motor consume sus datos sin depender de su presentación.
// Los campos opcionales describen efectos adicionales como aturdimiento, robo de vida o daño persistente.
export const ALL_SKILLS = [
  {
    id:'k01',
    minLevel:1,
    t:'fis',
    n:'Filo Guardián',
    dt:'Corte',
    p:9,
    a:98,
    c:0,
    rmp:1,
    sprite:'air/airstrike',
    d:'Corte rápido y seguro.\nRecupera 1 MP al golpear.'
  },
  {
    id:'k02',
    minLevel:1,
    t:'fis',
    n:'Maza Fractura',
    dt:'Contundente',
    p:10,
    a:86,
    c:2,
    st:1,
    sprite:'earth/stone_arrow',
    d:'Un golpe que puede aturdir al enemigo.'
  },
  {
    id:'k03',
    minLevel:1,
    t:'mag',
    n:'Dardo de Éter',
    dt:'Arcano',
    p:11,
    a:95,
    c:3,
    sprite:'conjuration/magic_dart',
    d:'Proyectil arcano preciso.'
  },
  {
    id:'k04',
    minLevel:1,
    t:'blood',
    n:'Marca Carmesí',
    dt:'Sangre',
    p:8,
    a:92,
    c:3,
    ls:1,
    sprite:'necromancy/agony',
    d:'Absorbe vida equivalente al daño causado.'
  },
  {
    id:'k05',
    minLevel:1,
    t:'mag',
    n:'Fuego Fatuo',
    dt:'Fuego',
    p:9,
    a:90,
    c:3,
    dot:2,
    sprite:'fire/foxfire',
    d:'Prende al objetivo y le causa daño persistente.'
  },
  {
    id:'k06',
    minLevel:1,
    t:'mag',
    n:'Aguja Gélida',
    dt:'Hielo',
    p:8,
    a:96,
    c:3,
    st:1,
    sprite:'ice/throw_frost',
    d:'Una aguja helada con posibilidad de aturdir.'
  },
  {
    id:'k07',
    minLevel:1,
    t:'mag',
    n:'Aguijón del Pantano',
    dt:'Veneno',
    p:7,
    a:88,
    c:2,
    dot:2,
    sprite:'alchemy/sting',
    d:'Envenena al objetivo durante dos turnos.'
  },
  {
    id:'k08',
    minLevel:1,
    t:'mix',
    n:'Pliegue Sombrío',
    dt:'Vacío',
    p:10,
    a:88,
    c:4,
    cbonus:6,
    sprite:'misc/warp_space',
    d:'Un corte espacial con probabilidad crítica adicional.'
  },
  {
    id:'k11',
    minLevel:11,
    t:'fis',
    n:'Danza de Cuchillas',
    dt:'Corte',
    p:17,
    a:95,
    c:4,
    cbonus:8,
    sprite:'enchantment/tukimas_dance',
    d:'Cadena de tajos con crítico mejorado.'
  },
  {
    id:'k12',
    minLevel:11,
    t:'fis',
    n:'Impacto Sísmico',
    dt:'Contundente',
    p:19,
    a:85,
    c:5,
    st:1,
    sprite:'earth/sandblast',
    d:'Un impacto pesado que puede aturdir.'
  },
  {
    id:'k13',
    minLevel:11,
    t:'sup',
    n:'Destello Solar',
    dt:'Sagrado',
    p:16,
    a:100,
    c:5,
    rmp:4,
    sprite:'misc/bolt_of_light',
    d:'Energía sagrada que devuelve 4 MP.'
  },
  {
    id:'k14',
    minLevel:11,
    t:'mag',
    n:'Rayo Encadenado',
    dt:'Arcano',
    p:20,
    a:92,
    c:6,
    sprite:'air/chain_lightning',
    d:'Descarga arcana de alta precisión.'
  },
  {
    id:'k15',
    minLevel:11,
    t:'mag',
    n:'Miasma Verde',
    dt:'Veneno',
    p:15,
    a:88,
    c:5,
    dot:5,
    sprite:'alchemy/venom_bolt',
    d:'Un miasma tóxico que persiste dos turnos.'
  },
  {
    id:'k16',
    minLevel:11,
    t:'mix',
    n:'Vórtice Rúnico',
    dt:'Rúnico',
    p:18,
    a:90,
    c:6,
    cbonus:8,
    sprite:'forgecraft/splinterfrost_shell',
    d:'Energía rúnica con crítico mejorado.'
  },
  {
    id:'k17',
    minLevel:11,
    t:'mag',
    n:'Cadena Glacial',
    dt:'Hielo',
    p:16,
    a:92,
    c:5,
    st:1,
    sprite:'ice/hailstorm',
    d:'Una ráfaga de hielo que puede aturdir.'
  },
  {
    id:'k18',
    minLevel:11,
    t:'mag',
    n:'Oleada Ígnea',
    dt:'Fuego',
    p:18,
    a:87,
    c:6,
    dot:5,
    sprite:'fire/flame_wave',
    d:'Una ola de fuego que quema durante dos turnos.'
  },
  {
    id:'k21',
    minLevel:25,
    t:'fis',
    n:'Tajo Fracturador',
    dt:'Corte',
    p:28,
    a:90,
    c:8,
    cbonus:12,
    sprite:'forgecraft/monarch_bomb',
    d:'Tajo profundo con crítico mejorado.'
  },
  {
    id:'k22',
    minLevel:25,
    t:'fis',
    n:'Quiebramundos',
    dt:'Contundente',
    p:30,
    a:78,
    c:9,
    st:1,
    sprite:'earth/lees_rapid_deconstruction',
    d:'Golpe devastador que puede aturdir.'
  },
  {
    id:'k23',
    minLevel:25,
    t:'mag',
    n:'Lluvia Estelar',
    dt:'Arcano',
    p:29,
    a:92,
    c:10,
    cbonus:10,
    sprite:'conjuration/orb_of_destruction',
    d:'Descarga astral con crítico adicional.'
  },
  {
    id:'k24',
    minLevel:25,
    t:'sup',
    n:'Corona Radiante',
    dt:'Sagrado',
    p:27,
    a:98,
    c:9,
    rmp:5,
    sprite:'enchantment/corona',
    d:'Luz sagrada que devuelve 5 MP.'
  },
  {
    id:'k25',
    minLevel:25,
    t:'blood',
    n:'Cosecha Nocturna',
    dt:'Sangre',
    p:24,
    a:90,
    c:8,
    ls:1,
    sprite:'necromancy/infestation',
    d:'Roba vida equivalente al daño causado.'
  },
  {
    id:'k26',
    minLevel:25,
    t:'mag',
    n:'Sol Devastador',
    dt:'Fuego',
    p:29,
    a:84,
    c:10,
    dot:8,
    sprite:'fire/starburst',
    d:'Explosión solar que quema durante dos turnos.'
  },
  {
    id:'k27',
    minLevel:25,
    t:'mag',
    n:'Lluvia de Agujas',
    dt:'Veneno',
    p:25,
    a:88,
    c:9,
    dot:8,
    sprite:'alchemy/poison_arrow',
    d:'Agujas tóxicas que envenenan durante dos turnos.'
  },
  {
    id:'k28',
    minLevel:25,
    t:'mix',
    n:'Espiral Rúnica',
    dt:'Rúnico',
    p:27,
    a:91,
    c:10,
    cbonus:12,
    sprite:'enchantment/violent_unravelling',
    d:'Una espiral de runas con crítico mejorado.'
  },
  {
    id:'k31',
    minLevel:45,
    t:'fis',
    n:'Danza del Ocaso',
    dt:'Corte',
    p:38,
    a:95,
    c:12,
    cbonus:15,
    sprite:'forgecraft/rending_blade',
    d:'Una secuencia de tajos con gran probabilidad crítica.'
  },
  {
    id:'k32',
    minLevel:45,
    t:'fis',
    n:'Colapso Tectónico',
    dt:'Contundente',
    p:42,
    a:75,
    c:14,
    st:1,
    sprite:'earth/shatter',
    d:'Un impacto colosal que puede aturdir.'
  },
  {
    id:'k33',
    minLevel:45,
    t:'mag',
    n:'Corazón de Nova',
    dt:'Arcano',
    p:45,
    a:84,
    c:16,
    cbonus:15,
    sprite:'misc/bolt_energy',
    d:'Energía concentrada con crítico adicional.'
  },
  {
    id:'k34',
    minLevel:45,
    t:'sup',
    n:'Voto Celestial',
    dt:'Sagrado',
    p:38,
    a:99,
    c:14,
    rmp:7,
    sprite:'forgecraft/platinum_paragon',
    d:'Poder sagrado que devuelve 7 MP.'
  },
  {
    id:'k35',
    minLevel:45,
    t:'blood',
    n:'Eclipse Carmesí',
    dt:'Sangre',
    p:35,
    a:88,
    c:12,
    ls:1,
    sprite:'necromancy/borgnjors_vile_clutch',
    d:'Roba vida equivalente al daño causado.'
  },
  {
    id:'k36',
    minLevel:45,
    t:'mag',
    n:'Lanza del Fénix',
    dt:'Fuego',
    p:39,
    a:86,
    c:15,
    dot:10,
    sprite:'fire/fireball',
    d:'Una llamarada que quema durante dos turnos.'
  },
  {
    id:'k37',
    minLevel:45,
    t:'mag',
    n:'Aliento de Hidra',
    dt:'Veneno',
    p:32,
    a:90,
    c:13,
    dot:10,
    sprite:'alchemy/noxious_bog',
    d:'Veneno concentrado que persiste dos turnos.'
  },
  {
    id:'k38',
    minLevel:45,
    t:'mix',
    n:'Asalto Manifold',
    dt:'Vacío',
    p:48,
    a:82,
    c:18,
    cbonus:20,
    sprite:'translocation/manifold_assault',
    d:'Ataque del Vacío con crítico adicional.'
  }
];

// Ataques equipados inicialmente por el Caballero (máximo 4 activos en combate)
// Ataques iniciales: flojos, y mejoran solos en las rondas 10, 25 y 45
// Cuatro técnicas iniciales evolucionan por nivel; las aprendidas del grimorio son independientes.
export const STARTER_SKILL_LINES = [
[{n:'Tajo Torpe',p:7,a:95,c:0,rmp:1,d:'Un corte flojo, pero gratis.\nRecupera 1 MP al golpear.'},
 {n:'Corte Firme',p:12,a:97,c:0,rmp:2,d:'Corte más seguro.\nRecupera 2 MP al golpear.'},
 {n:'Corte del Ocaso',p:18,a:100,c:0,rmp:3,d:'Corte rápido y fiable.\nRecupera 3 MP al golpear.'},
 {n:'Filo del Ocaso',p:26,a:100,c:0,rmp:4,d:'Corte maestro.\nRecupera 4 MP al golpear.'}],
[{n:'Espadazo Flojo',p:15,a:70,c:6,d:'Golpe pesado pero poco preciso (70%).'},
 {n:'Espadazo',p:24,a:78,c:7,cbonus:5,d:'Golpe pesado (78%).\n+5% de Prob. de Crítico.'},
 {n:'Juicio',p:33,a:85,c:9,cbonus:12,d:'Golpe devastador (85%).\n+12% de Prob. de Crítico.'},
 {n:'Juicio Final',p:46,a:90,c:11,cbonus:20,d:'Golpe demoledor (90%).\n+20% de Prob. de Crítico.'}],
[{n:'Empujón',p:5,a:90,c:3,st:1,d:'Empujón torpe.\n40% de aturdir al enemigo.'},
 {n:'Golpe Escudo',p:9,a:95,c:4,st:1,d:'Impacto con el escudo.\n40% de aturdir al enemigo.'},
 {n:'Embestida',p:14,a:100,c:5,st:1,d:'Impacto pesado.\n40% de aturdir al enemigo.'},
 {n:'Golpe Titán',p:20,a:100,c:6,st:1,d:'Impacto brutal.\n40% de aturdir al enemigo.'}],
[{n:'Rasguño Oscuro',p:8,a:85,c:5,ls:1,d:'Magia de sangre débil (85%).\nCura el 100% del daño.'},
 {n:'Mordisco Sangriento',p:12,a:88,c:6,ls:1,d:'Magia de sangre (88%).\nCura el 100% del daño.'},
 {n:'Cosecha Oscura',p:18,a:90,c:8,ls:1,d:'Magia de sangre (90%).\nCura el 100% del daño.'},
 {n:'Cosecha Carmesí',p:26,a:95,c:9,ls:1,d:'Magia de sangre (95%).\nCura el 100% del daño.'}]
];
const STARTER_SPRITES = [
  ['enchantment/sure_blade','forgecraft/rending_blade','forgecraft/diamond_sawblades','forgecraft/kinetic_grapnel'],
  ['earth/boulder','earth/iron_shot','earth/shatter','earth/lehudibs_crystal_spear'],
  ['forgecraft/percussive_tempering','forgecraft/fortress_blast','earth/petrify','forgecraft/construct_spike_launcher'],
  ['necromancy/pain','necromancy/vampiric_draining','necromancy/bolt_of_draining','necromancy/sublimation_of_blood']
];
STARTER_SKILL_LINES.forEach((line, lineIndex) => {
  line.forEach((skill, tier) => {
    skill.sprite = STARTER_SPRITES[lineIndex][tier];
  });
});

const STARTER_DAMAGE_TYPES = ['Corte', 'Contundente', 'Contundente', 'Sangre'];
export const STARTER_SKILLS = STARTER_SKILL_LINES.map((line, lineIndex) => ({
  ...line[0],
  line: lineIndex,
  tier: 0,
  dt: STARTER_DAMAGE_TYPES[lineIndex],
}));

// Se conserva el catálogo original para recuperarlo o reutilizarlo en otra clase.
export const LEGACY_SKILLS = ALL_SKILLS;
export const LEGACY_STARTER_SKILL_LINES = STARTER_SKILL_LINES;
export const LEGACY_STARTER_SKILLS = STARTER_SKILLS;

export const SOLARIS_SKILL_LINES = [
  [
    { n: 'Corte de Guardia', t: 'fis', p: 7, a: 97, c: 0, rmp: 1, d: 'Un tajo corto que no deja huecos en la defensa.' },
    { n: 'Tajo de Vanguardia', t: 'fis', p: 12, a: 98, c: 0, rmp: 2, d: 'Un corte firme que mantiene el ritmo del combate.' },
    { n: 'Filo de la Frontera', t: 'fis', p: 18, a: 100, c: 0, rmp: 3, d: 'Un tajo limpio, rápido y difícil de esquivar.' },
    { n: 'Corte del Bastión', t: 'fis', p: 26, a: 100, c: 0, rmp: 4, d: 'La hoja cae con todo el peso de la armadura.' },
  ],
  [
    { n: 'Golpe de Escudo', t: 'fis', p: 8, a: 94, c: 3, st: 1, d: 'Un impacto frontal que puede dejar al rival aturdido.' },
    { n: 'Embate de Acero', t: 'fis', p: 13, a: 96, c: 4, st: 1, d: 'Avanza tras el escudo y rompe la guardia.' },
    { n: 'Muro en Marcha', t: 'fis', p: 20, a: 98, c: 6, st: 1, d: 'Un choque pesado que corta el turno del enemigo.' },
    { n: 'Asalto del Bastión', t: 'fis', p: 29, a: 100, c: 8, st: 1, d: 'Un empuje imparable, de escudo a espada.' },
  ],
  [
    { n: 'Estocada', t: 'fis', p: 11, a: 90, c: 3, d: 'Busca un hueco entre las placas.' },
    { n: 'Punta Certera', t: 'fis', p: 18, a: 93, c: 5, cbonus: 4, d: 'Una estocada precisa, difícil de leer.' },
    { n: 'Perforacotas', t: 'fis', p: 27, a: 96, c: 8, cbonus: 8, d: 'La punta atraviesa incluso una buena defensa.' },
    { n: 'Lanza del Juramento', t: 'fis', p: 39, a: 98, c: 12, cbonus: 12, d: 'Una embestida recta, sin dar espacio a responder.' },
  ],
  [
    { n: 'Martillo de Guerra', t: 'fis', p: 12, a: 88, c: 4, d: 'Un golpe lento que hace temblar la armadura.' },
    { n: 'Yunque Descendente', t: 'fis', p: 20, a: 90, c: 6, cbonus: 5, d: 'Deja caer el martillo desde lo alto.' },
    { n: 'Quebrantaplacas', t: 'fis', p: 31, a: 92, c: 10, cbonus: 10, d: 'Concentra todo el impacto en un solo punto.' },
    { n: 'Sentencia de Hierro', t: 'fis', p: 44, a: 94, c: 14, cbonus: 18, d: 'Un golpe definitivo, pesado como una puerta de hierro.' },
  ],
];

const SOLARIS_STARTER_DAMAGE_TYPES = ['Corte', 'Contundente', 'Corte', 'Contundente'];

export const SOLARIS_STARTER_SKILLS = SOLARIS_SKILL_LINES.map((line, lineIndex) => ({
  ...line[0],
  line: lineIndex,
  tier: 0,
  dt: SOLARIS_STARTER_DAMAGE_TYPES[lineIndex],
}));

export const SOLARIS_SKILLS = [
  {
    id: 'solaris-01', minLevel: 1, t: 'fis', n: 'Ráfaga de Acero', dt: 'Corte',
    p: 13, a: 94, c: 4, cbonus: 2, sprite: 'forgecraft/rending_blade',
    d: 'Dos tajos rápidos para abrir paso.',
  },
  {
    id: 'solaris-02', minLevel: 1, t: 'fis', n: 'Embestida con Escudo', dt: 'Contundente',
    p: 12, a: 91, c: 4, st: 1, sprite: 'forgecraft/fortress_blast',
    d: 'Golpea de frente; puede dejar al enemigo aturdido.',
  },
  {
    id: 'solaris-03', minLevel: 1, t: 'fis', n: 'Tajada Ascendente', dt: 'Corte',
    p: 15, a: 89, c: 5, cbonus: 5, sprite: 'forgecraft/diamond_sawblades',
    d: 'Un corte ascendente con opciones de crítico.',
  },
  {
    id: 'solaris-04', minLevel: 1, t: 'fis', n: 'Pisotón de Hierro', dt: 'Contundente',
    p: 9, a: 100, c: 3, st: 1, sprite: 'earth/shatter',
    d: 'Desestabiliza al rival con un golpe seco.',
  },
  {
    id: 'solaris-11', minLevel: 11, t: 'fis', n: 'Carga de Vanguardia', dt: 'Corte',
    p: 23, a: 89, c: 7, cbonus: 10, sprite: 'forgecraft/kinetic_grapnel',
    d: 'Una carrera corta que termina en un tajo potente.',
  },
  {
    id: 'solaris-12', minLevel: 11, t: 'fis', n: 'Martillo de Asedio', dt: 'Contundente',
    p: 26, a: 85, c: 7, st: 1, sprite: 'earth/iron_shot',
    d: 'Un impacto pesado que puede cortar la respuesta enemiga.',
  },
  {
    id: 'solaris-13', minLevel: 11, t: 'fis', n: 'Giro de Guardia', dt: 'Corte',
    p: 20, a: 97, c: 6, sprite: 'enchantment/tukimas_dance',
    d: 'Un giro controlado que alcanza incluso a rivales ágiles.',
  },
  {
    id: 'solaris-21', minLevel: 25, t: 'fis', n: 'Quiebracascos', dt: 'Contundente',
    p: 34, a: 87, c: 10, cbonus: 12, sprite: 'earth/lees_rapid_deconstruction',
    d: 'Busca el punto débil de la armadura rival.',
  },
  {
    id: 'solaris-22', minLevel: 25, t: 'fis', n: 'Rompelíneas', dt: 'Corte',
    p: 31, a: 95, c: 10, sprite: 'forgecraft/monarch_bomb',
    d: 'Un tajo amplio para abrir una línea entre los enemigos.',
  },
  {
    id: 'solaris-23', minLevel: 25, t: 'fis', n: 'Arremetida del Bastión', dt: 'Contundente',
    p: 38, a: 86, c: 12, st: 1, sprite: 'earth/shatter',
    d: 'Escudo y hombro se convierten en un solo impacto.',
  },
  {
    id: 'solaris-31', minLevel: 45, t: 'fis', n: 'Veredicto de Solaris', dt: 'Corte',
    p: 54, a: 90, c: 15, cbonus: 20, sprite: 'forgecraft/rending_blade',
    d: 'Un tajo preciso reservado para el momento decisivo.',
  },
  {
    id: 'solaris-32', minLevel: 45, t: 'fis', n: 'Último Bastión', dt: 'Contundente',
    p: 46, a: 96, c: 16, st: 1, sprite: 'forgecraft/construct_spike_launcher',
    d: 'Un golpe firme que deja poco margen de réplica.',
  },
  {
    id: 'solaris-33', minLevel: 45, t: 'fis', n: 'Filo del Alba', dt: 'Corte',
    p: 60, a: 84, c: 18, cbonus: 18, sprite: 'forgecraft/diamond_sawblades',
    d: 'La técnica más arriesgada de Solaris: lenta, pero devastadora.',
  },
  {
    id: 'solaris-crusader-praise', route: 'crusader', minLevel: 11,
    t: 'fis', n: '¡PRAISE THE SUN!', dt: 'Sagrado + Fuego', damageTypes: ['Sagrado', 'Fuego'],
    p: 0, a: 94, c: 20, directMultiplier: 4, meteor: true, sprite: 'fire/fire_storm',
    d: 'Un meteoro sagrado e ígneo cae sobre el enemigo e inflige un daño equivalente al 400% del ataque físico. Consume 20 MP.',
  },
  {
    id: 'solaris-warden-bastion', route: 'warden', minLevel: 11,
    t: 'sup', n: 'Bastión del Señor', dt: 'Sagrado', p: 0, a: 100, c: 10,
    invulnerable: 3, sprite: 'ice/condensation_shield',
    d: 'Te protege de todo daño durante 3 turnos. Consume 10 MP.',
  },
];

export const JEANNE_SKILL_LINES = [
  [
    { n: '¡Me quedé sin maná!', t: 'fis', p: 8, a: 100, c: 0, st: 1, d: 'Jeanne golpea con el bastón como si fuese un bate; puede aturdir.' },
    { n: '¡Me quedé sin maná!', t: 'fis', p: 14, a: 100, c: 0, st: 1, d: 'Un batazo firme con el bastón que puede aturdir.' },
    { n: '¡Me quedé sin maná!', t: 'fis', p: 22, a: 100, c: 0, st: 1, d: 'Jeanne carga un golpe que puede dejar aturdido al rival.' },
    { n: '¡Me quedé sin maná!', t: 'fis', p: 32, a: 100, c: 0, st: 1, d: 'Un batazo impecable con fuerza suficiente para aturdir.' },
  ],
  [
    { n: 'Chispa de Éter', t: 'mag', p: 8, a: 97, c: 2, rmp: 1, d: 'Una chispa arcana precisa que devuelve un poco de maná.' },
    { n: 'Aguja de Éter', t: 'mag', p: 14, a: 98, c: 4, rmp: 2, d: 'Una aguja de energía que recupera maná al impactar.' },
    { n: 'Lanza de Éter', t: 'mag', p: 23, a: 98, c: 7, rmp: 3, d: 'Una lanza arcana que devuelve parte de su energía.' },
    { n: 'Columna de Éter', t: 'mag', p: 34, a: 99, c: 10, rmp: 4, d: 'Una descarga concentrada que alimenta el siguiente conjuro.' },
  ],
  [
    { n: 'Aguja Gélida', t: 'mag', p: 9, a: 94, c: 3, st: 1, d: 'Una aguja de hielo puede frenar al enemigo.' },
    { n: 'Prisma Invernal', t: 'mag', p: 15, a: 96, c: 5, st: 1, d: 'Fragmentos de hielo buscan una apertura para congelar.' },
    { n: 'Lluvia de Cristal', t: 'mag', p: 25, a: 96, c: 8, st: 1, d: 'Una lluvia de cristales helados cubre al rival.' },
    { n: 'Catedral de Hielo', t: 'mag', p: 38, a: 94, c: 12, st: 1, d: 'Una bóveda de hielo cae sobre el enemigo.' },
  ],
  [
    { n: 'Llama Errante', t: 'mag', p: 9, a: 92, c: 3, dot: 2, d: 'Una llama mágica deja ardiendo al objetivo.' },
    { n: 'Corona Ígnea', t: 'mag', p: 16, a: 92, c: 5, dot: 4, d: 'Un aro de fuego quema durante varios turnos.' },
    { n: 'Oleada Solar', t: 'mag', p: 27, a: 90, c: 8, dot: 6, d: 'Una oleada de fuego abrasa al enemigo.' },
    { n: 'Pira de las Estrellas', t: 'mag', p: 40, a: 88, c: 12, dot: 9, d: 'Una llamarada estelar persiste sobre el campo.' },
  ],
];

export const JEANNE_STARTER_SKILLS = JEANNE_SKILL_LINES.map((line, lineIndex) => ({
  ...line[0],
  line: lineIndex,
  tier: 0,
  dt: ['Contundente', 'Arcano', 'Hielo', 'Fuego'][lineIndex],
}));

export const JEANNE_SKILLS = [
  {
    id: 'jeanne-01', minLevel: 1, t: 'mag', n: 'Luciérnaga Arcana', dt: 'Arcano',
    p: 11, a: 98, c: 3, rmp: 1, sprite: 'conjuration/magic_dart',
    d: 'Un punto de luz busca al rival y devuelve un poco de maná al impactar.',
  },
  {
    id: 'jeanne-02', minLevel: 1, t: 'mag', n: 'Destello de Aguja', dt: 'Arcano',
    p: 13, a: 96, c: 4, cbonus: 4, sprite: 'air/airstrike',
    d: 'Un destello concentrado que encuentra huecos en la guardia.',
  },
  {
    id: 'jeanne-03', minLevel: 1, t: 'mag', n: 'Chispa de Umbral', dt: 'Arcano',
    p: 10, a: 98, c: 3, st: 1, sprite: 'air/shock',
    d: 'Una descarga breve que puede entumecer al enemigo.',
  },
  {
    id: 'jeanne-04', minLevel: 1, t: 'mag', n: 'Brasa Traviesa', dt: 'Fuego',
    p: 10, a: 94, c: 3, dot: 2, sprite: 'fire/throw_flame',
    d: 'Una brasa salta de sus dedos y deja una quemadura leve.',
  },
  {
    id: 'jeanne-05', minLevel: 1, t: 'mag', n: 'Aguja de Escarcha', dt: 'Hielo',
    p: 10, a: 96, c: 3, st: 1, sprite: 'ice/throw_frost',
    d: 'Una punta de hielo corta el aire y puede frenar al objetivo.',
  },
  {
    id: 'jeanne-06', minLevel: 1, t: 'mag', n: 'Polvo de Cantera', dt: 'Rúnico',
    p: 12, a: 94, c: 3, sprite: 'earth/stone_arrow',
    d: 'Piedras pequeñas se reúnen en un proyectil de bordes afilados.',
  },
  {
    id: 'jeanne-07', minLevel: 1, t: 'mag', n: 'Sello de Alba', dt: 'Sagrado',
    p: 9, a: 100, c: 3, rmp: 1, sprite: 'enchantment/corona',
    d: 'Un sello luminoso estalla sobre el enemigo y deja energía residual.',
  },
  {
    id: 'jeanne-08', minLevel: 1, t: 'mag', n: 'Llama de Bolsillo', dt: 'Fuego',
    p: 12, a: 91, c: 3, dot: 3, sprite: 'fire/conjure_flame',
    d: 'Una llamarada corta prende la ropa y las escamas del rival.',
  },
  {
    id: 'jeanne-09', minLevel: 1, t: 'mag', n: 'Pulso de Retorno', dt: 'Arcano',
    p: 9, a: 100, c: 2, rmp: 2, sprite: 'air/static_discharge',
    d: 'Un pulso sencillo golpea y devuelve dos puntos de maná.',
  },
  {
    id: 'jeanne-10', minLevel: 1, t: 'mag', n: 'Escarcha Dormida', dt: 'Hielo',
    p: 11, a: 93, c: 3, st: 1, sprite: 'ice/freeze',
    d: 'El frío se aferra a los músculos y puede cortar el siguiente movimiento.',
  },
  {
    id: 'jeanne-11', minLevel: 1, t: 'mag', n: 'Aguijón de Menta', dt: 'Veneno',
    p: 9, a: 91, c: 2, dot: 2, sprite: 'poison/venom_bolt',
    d: 'Un dardo verde deja un veneno débil, pero persistente.',
  },
  {
    id: 'jeanne-12', minLevel: 1, t: 'mag', n: 'Piel de Mercurio', dt: 'Sagrado',
    p: 10, a: 96, c: 3, st: 1, sprite: 'transmutation/alter_self',
    d: 'Una capa brillante acompaña el golpe y entorpece al rival.',
  },
  {
    id: 'jeanne-13', minLevel: 1, t: 'mag', n: 'Vibración Serena', dt: 'Arcano',
    p: 8, a: 100, c: 2, rmp: 2, sprite: 'air/insulation',
    d: 'Una vibración limpia atraviesa al objetivo y alimenta el siguiente conjuro.',
  },
  {
    id: 'jeanne-14', minLevel: 1, t: 'mag', n: 'Órbita de Vidrio', dt: 'Arcano',
    p: 15, a: 89, c: 5, cbonus: 6, sprite: 'conjuration/iskenderuns_mystic_blast',
    d: 'Un orbe irregular describe una curva antes de golpear.',
  },
  {
    id: 'jeanne-15', minLevel: 1, t: 'mag', n: 'Grano de Granito', dt: 'Rúnico',
    p: 13, a: 92, c: 4, st: 1, sprite: 'earth/sandblast',
    d: 'Una ráfaga de grava castiga la guardia y puede desequilibrar.',
  },
  {
    id: 'jeanne-16', minLevel: 6, t: 'mag', n: 'Rizo de Tormenta', dt: 'Arcano',
    p: 16, a: 94, c: 5, cbonus: 5, sprite: 'air/chain_lightning',
    d: 'Un arco eléctrico serpentea hasta encontrar su objetivo.',
  },
  {
    id: 'jeanne-17', minLevel: 6, t: 'mag', n: 'Lengua de Carbón', dt: 'Fuego',
    p: 15, a: 95, c: 4, dot: 3, sprite: 'fire/flame_tongue',
    d: 'Una lengua de fuego alcanza al enemigo y le deja la piel ardiendo.',
  },
  {
    id: 'jeanne-18', minLevel: 6, t: 'mag', n: 'Nube de Carámbanos', dt: 'Hielo',
    p: 17, a: 92, c: 5, st: 1, sprite: 'ice/freezing_cloud',
    d: 'Una nube fría estalla en fragmentos y puede inmovilizar al rival.',
  },
  {
    id: 'jeanne-19', minLevel: 6, t: 'mag', n: 'Campana del Temor', dt: 'Sagrado',
    p: 14, a: 97, c: 4, st: 1, sprite: 'enchantment/cause_fear',
    d: 'Una nota grave golpea el ánimo y los sentidos del enemigo.',
  },
  {
    id: 'jeanne-20', minLevel: 6, t: 'mag', n: 'Dardo de Hierro', dt: 'Rúnico',
    p: 18, a: 88, c: 5, cbonus: 7, sprite: 'earth/iron_shot',
    d: 'Un proyectil de hierro gana velocidad hasta el último instante.',
  },
  {
    id: 'jeanne-21', minLevel: 6, t: 'mag', n: 'Lanza de Relámpago', dt: 'Arcano',
    p: 18, a: 94, c: 5, sprite: 'air/lightning_bolt',
    d: 'Una línea de luz azul atraviesa el campo sin perder fuerza.',
  },
  {
    id: 'jeanne-22', minLevel: 6, t: 'mag', n: 'Flecha de Horno', dt: 'Fuego',
    p: 17, a: 92, c: 5, dot: 4, sprite: 'fire/bolt_of_fire',
    d: 'Una flecha incandescente deja brasas prendidas en la herida.',
  },
  {
    id: 'jeanne-23', minLevel: 6, t: 'mag', n: 'Aguacero Blanco', dt: 'Hielo',
    p: 16, a: 96, c: 5, st: 1, sprite: 'ice/bolt_of_cold',
    d: 'El aire se enfría de golpe y una descarga helada cae sobre el rival.',
  },
  {
    id: 'jeanne-24', minLevel: 6, t: 'mag', n: 'Nudo de Confusión', dt: 'Arcano',
    p: 13, a: 98, c: 4, st: 1, sprite: 'enchantment/confuse',
    d: 'Un símbolo giratorio trastoca la orientación del enemigo.',
  },
  {
    id: 'jeanne-25', minLevel: 6, t: 'mag', n: 'Ignición Verde', dt: 'Fuego',
    p: 18, a: 90, c: 5, dot: 5, sprite: 'fire/ignite_poison',
    d: 'La llama aviva cualquier toxina y deja un ardor profundo.',
  },
  {
    id: 'jeanne-26', minLevel: 6, t: 'mag', n: 'Astilla de Falla', dt: 'Rúnico',
    p: 19, a: 87, c: 6, st: 1, sprite: 'earth/lees_rapid_deconstruction',
    d: 'Una cuña de piedra golpea con fuerza y puede romper el equilibrio.',
  },
  {
    id: 'jeanne-27', minLevel: 6, t: 'mag', n: 'Paso de Cometa', dt: 'Arcano',
    p: 15, a: 100, c: 5, rmp: 2, sprite: 'air/levitation',
    d: 'Un cometa roza al rival y deja una estela que restaura maná.',
  },
  {
    id: 'jeanne-28', minLevel: 6, t: 'mag', n: 'Esquirla de Espejo', dt: 'Hielo',
    p: 17, a: 95, c: 5, cbonus: 5, sprite: 'ice/condensation_shield',
    d: 'Una placa de hielo se quiebra en fragmentos afilados.',
  },
  {
    id: 'jeanne-29', minLevel: 6, t: 'mag', n: 'Borrasca de Ópalo', dt: 'Arcano',
    p: 20, a: 89, c: 6, cbonus: 8, sprite: 'conjuration/orb_of_destruction',
    d: 'Un núcleo brillante se abre paso con una trayectoria impredecible.',
  },
  {
    id: 'jeanne-30', minLevel: 6, t: 'mag', n: 'Rostro Cambiante', dt: 'Arcano',
    p: 15, a: 96, c: 5, st: 1, sprite: 'transmutation/polymorph_other',
    d: 'La forma del objetivo parpadea y lo deja vulnerable al impacto.',
  },
  {
    id: 'jeanne-31', minLevel: 11, t: 'mag', n: 'Cascada Astral', dt: 'Arcano',
    p: 23, a: 94, c: 7, cbonus: 8, sprite: 'conjuration/orb_of_destruction',
    d: 'Una descarga astral encadena varios impactos en un solo golpe.',
  },
  {
    id: 'jeanne-32', minLevel: 11, t: 'mag', n: 'Corona de Centellas', dt: 'Arcano',
    p: 22, a: 96, c: 7, st: 1, sprite: 'air/conjure_ball_lightning',
    d: 'Varias centellas orbitan al objetivo antes de cerrarse sobre él.',
  },
  {
    id: 'jeanne-33', minLevel: 11, t: 'mag', n: 'Magma de Bolsillo', dt: 'Fuego',
    p: 24, a: 87, c: 7, dot: 6, sprite: 'fire/bolt_of_magma',
    d: 'Una masa de roca fundida deja un rastro de calor persistente.',
  },
  {
    id: 'jeanne-34', minLevel: 11, t: 'mag', n: 'Velo de Escarcha', dt: 'Hielo',
    p: 21, a: 97, c: 7, st: 1, sprite: 'ice/ice_storm',
    d: 'Un remolino de nieve golpea desde todos los ángulos.',
  },
  {
    id: 'jeanne-35', minLevel: 11, t: 'mag', n: 'Aguja de Cuarzo', dt: 'Rúnico',
    p: 25, a: 91, c: 7, cbonus: 6, sprite: 'earth/lehudibs_crystal_spear',
    d: 'Una lanza cristalina atraviesa la guardia con una punta precisa.',
  },
  {
    id: 'jeanne-36', minLevel: 11, t: 'mag', n: 'Caricia Turbia', dt: 'Arcano',
    p: 20, a: 98, c: 6, st: 1, sprite: 'enchantment/confusing_touch',
    d: 'Un roce de magia altera el ritmo de reacción del enemigo.',
  },
  {
    id: 'jeanne-37', minLevel: 11, t: 'mag', n: 'Resina Ardiente', dt: 'Fuego',
    p: 22, a: 92, c: 7, dot: 7, sprite: 'fire/sticky_flame',
    d: 'La llama se pega al objetivo y no se apaga con facilidad.',
  },
  {
    id: 'jeanne-38', minLevel: 11, t: 'mag', n: 'Espiral de Vendaval', dt: 'Arcano',
    p: 19, a: 100, c: 6, rmp: 3, sprite: 'air/swiftness',
    d: 'Una corriente veloz corta el aire y devuelve energía a Jeanne.',
  },
  {
    id: 'jeanne-39', minLevel: 11, t: 'mag', n: 'Sueño de Nieve', dt: 'Hielo',
    p: 21, a: 94, c: 7, st: 1, sprite: 'ice/ensorcelled_hibernation',
    d: 'Un frío pesado ralentiza los pensamientos y puede aturdir.',
  },
  {
    id: 'jeanne-40', minLevel: 11, t: 'mag', n: 'Falla Ascendente', dt: 'Rúnico',
    p: 25, a: 89, c: 8, st: 1, sprite: 'earth/dig',
    d: 'La tierra se abre bajo los pies del enemigo y lo desequilibra.',
  },
  {
    id: 'jeanne-41', minLevel: 11, t: 'mag', n: 'Lluvia de Ceniza', dt: 'Fuego',
    p: 23, a: 94, c: 7, dot: 5, sprite: 'fire/evaporate',
    d: 'Una nube abrasadora cae sobre el rival y deja ceniza caliente.',
  },
  {
    id: 'jeanne-42', minLevel: 11, t: 'mag', n: 'Viento de Agujas', dt: 'Arcano',
    p: 22, a: 96, c: 7, cbonus: 7, sprite: 'air/repel_missiles',
    d: 'Una ráfaga compacta concentra su fuerza en un punto.',
  },
  {
    id: 'jeanne-43', minLevel: 11, t: 'mag', n: 'Invierno sin Fin', dt: 'Hielo',
    p: 26, a: 88, c: 8, dot: 5, sprite: 'ice/ozocubus_refrigeration',
    d: 'Un frío profundo se extiende por la herida durante varios turnos.',
  },
  {
    id: 'jeanne-44', minLevel: 11, t: 'mag', n: 'Martillo de Plata', dt: 'Sagrado',
    p: 28, a: 85, c: 8, cbonus: 10, sprite: 'earth/maxwells_silver_hammer',
    d: 'Un martillo de luz plateada cae con un peso imposible.',
  },
  {
    id: 'jeanne-45', minLevel: 11, t: 'mag', n: 'Marea de Símbolos', dt: 'Arcano',
    p: 22, a: 96, c: 7, st: 1, sprite: 'enchantment/confuse',
    d: 'Runas fugaces se cruzan ante los ojos del rival y pueden aturdirlo.',
  },
  {
    id: 'jeanne-46', minLevel: 16, t: 'mag', n: 'Silencio de Tormenta', dt: 'Arcano',
    p: 27, a: 96, c: 8, st: 1, sprite: 'air/silence',
    d: 'El sonido desaparece antes de que un trueno golpee al objetivo.',
  },
  {
    id: 'jeanne-47', minLevel: 16, t: 'mag', n: 'Sol de Medianoche', dt: 'Fuego',
    p: 30, a: 87, c: 9, dot: 8, sprite: 'fire/fire_storm',
    d: 'Una tormenta ardiente cubre al enemigo con llamas persistentes.',
  },
  {
    id: 'jeanne-48', minLevel: 16, t: 'mag', n: 'Manto de Agujas', dt: 'Hielo',
    p: 25, a: 97, c: 8, st: 1, sprite: 'ice/freezing_aura',
    d: 'Una corona de hielo se cierra y puede cortar el siguiente turno.',
  },
  {
    id: 'jeanne-49', minLevel: 16, t: 'mag', n: 'Falla del Mundo', dt: 'Rúnico',
    p: 31, a: 84, c: 9, st: 1, sprite: 'earth/shatter',
    d: 'Una onda sísmica fractura el suelo y sacude al enemigo.',
  },
  {
    id: 'jeanne-50', minLevel: 16, t: 'mag', n: 'Anillo de Brasas', dt: 'Fuego',
    p: 28, a: 95, c: 8, dot: 7, sprite: 'fire/ring_of_flames',
    d: 'Un aro de fuego estalla alrededor del objetivo y lo deja ardiendo.',
  },
  {
    id: 'jeanne-51', minLevel: 16, t: 'mag', n: 'Vórtice Refractor', dt: 'Arcano',
    p: 26, a: 98, c: 8, rmp: 3, sprite: 'air/deflect_missiles',
    d: 'El aire se pliega sobre sí mismo y devuelve parte de su energía.',
  },
  {
    id: 'jeanne-52', minLevel: 16, t: 'mag', n: 'Coraza Invernal', dt: 'Hielo',
    p: 27, a: 96, c: 8, st: 1, sprite: 'ice/ozocubus_armour',
    d: 'Un bloque de hielo cae sobre el rival y puede dejarlo aturdido.',
  },
  {
    id: 'jeanne-53', minLevel: 16, t: 'mag', n: 'Lanza de Estrato', dt: 'Rúnico',
    p: 32, a: 91, c: 9, cbonus: 8, sprite: 'earth/passwall',
    d: 'Una estaca de roca emerge desde abajo en el momento exacto.',
  },
  {
    id: 'jeanne-54', minLevel: 16, t: 'mag', n: 'Marca Incandescente', dt: 'Fuego',
    p: 29, a: 94, c: 9, dot: 8, sprite: 'fire/fire_brand',
    d: 'Una runa al rojo vivo se queda grabada en el objetivo.',
  },
  {
    id: 'jeanne-55', minLevel: 16, t: 'mag', n: 'Prisión de Ventisca', dt: 'Hielo',
    p: 28, a: 91, c: 9, st: 1, sprite: 'ice/metabolic_englaciation',
    d: 'Una ventisca envuelve al rival y puede inmovilizarlo.',
  },
  {
    id: 'jeanne-56', minLevel: 16, t: 'mag', n: 'Ídolo de Granito', dt: 'Rúnico',
    p: 34, a: 83, c: 10, cbonus: 12, sprite: 'earth/statue_form',
    d: 'Una figura pétrea se desploma sobre el enemigo con todo su peso.',
  },
  {
    id: 'jeanne-57', minLevel: 16, t: 'mag', n: 'Aliento de Dragón', dt: 'Fuego',
    p: 35, a: 88, c: 10, dot: 9, sprite: 'fire/dragon_form',
    d: 'Un aliento dracónico cubre al rival de llamas negras.',
  },
  {
    id: 'jeanne-58', minLevel: 16, t: 'mag', n: 'Bestia de Hielo', dt: 'Hielo',
    p: 32, a: 91, c: 9, st: 1, sprite: 'ice/ice_form',
    d: 'Una silueta helada embiste al objetivo y puede cortarle el turno.',
  },
  {
    id: 'jeanne-59', minLevel: 16, t: 'mag', n: 'Ciclón Vertical', dt: 'Arcano',
    p: 29, a: 96, c: 9, rmp: 4, sprite: 'air/flight',
    d: 'Una columna de viento golpea desde arriba y devuelve maná.',
  },
  {
    id: 'jeanne-60', minLevel: 16, t: 'mag', n: 'Furia de la Hechicera', dt: 'Sagrado',
    p: 36, a: 86, c: 10, cbonus: 14, sprite: 'enchantment/berserker_rage',
    d: 'Jeanne concentra todo su poder en una descarga de alto riesgo.',
  },
  {
    id: 'jeanne-61', minLevel: 6, t: 'sup', n: 'Barrera de Ópalo', dt: 'Sagrado',
    p: 0, a: 100, c: 8, barrier: 24, sprite: 'ice/condensation_shield',
    d: 'Levanta una barrera que absorbe parte del próximo golpe.',
  },
  {
    id: 'jeanne-62', minLevel: 11, t: 'sup', n: 'Remiendo Astral', dt: 'Sagrado',
    p: 0, a: 100, c: 12, heal: 22, sprite: 'enchantment/infusion',
    d: 'La luz cose sus heridas y le devuelve vida.',
  },
  {
    id: 'jeanne-63', minLevel: 16, t: 'sup', n: 'Compás de Cristal', dt: 'Arcano',
    p: 0, a: 100, c: 9, critNext: .3, sprite: 'enchantment/sure_blade',
    d: 'Afina su siguiente ataque y aumenta su probabilidad de crítico.',
  },
  {
    id: 'jeanne-tower-01', route: 'tower', minLevel: 11,
    t: 'mag', n: 'Ruina de la Torre', dt: 'Rúnico', p: 28, a: 90, c: 10,
    dot: 8, sprite: 'earth/shatter',
    d: 'Un terremoto quiebra el terreno y deja al enemigo bajo una lluvia de escombros.',
  },
  {
    id: 'jeanne-tower-02', route: 'tower', minLevel: 25,
    t: 'mag', n: 'Colapso de las Cadenas', dt: 'Vacío', p: 42, a: 88, c: 16,
    cbonus: 12, sprite: 'translocation/disjunction',
    d: 'Una explosión de magia maligna golpea con fuerza al objetivo.',
  },
  {
    id: 'jeanne-tower-03', route: 'tower', minLevel: 45,
    t: 'mag', n: 'Cataclismo Absoluto', dt: 'Fuego', p: 58, a: 82, c: 22,
    dot: 16, sprite: 'fire/fire_storm',
    d: 'La Torre se desploma en una erupción que abrasa y arrasa al enemigo.',
  },
  {
    id: 'jeanne-star-01', route: 'star', minLevel: 11,
    t: 'mag', n: 'Convergencia Elemental', dt: 'Fuego + Hielo', damageTypes: ['Fuego', 'Hielo'],
    p: 26, a: 94, c: 10, dot: 7, sprite: 'ice/ice_storm',
    d: 'Fuego y hielo convergen en una ráfaga que deja una quemadura elemental.',
  },
  {
    id: 'jeanne-star-02', route: 'star', minLevel: 25,
    t: 'sup', n: 'Bendición Estelar', dt: 'Sagrado', p: 0, a: 100, c: 14,
    heal: 24, sprite: 'enchantment/infusion',
    d: 'Una luz sagrada restaura la vida de Jeanne.',
  },
  {
    id: 'jeanne-star-03', route: 'star', minLevel: 25,
    t: 'mag', n: 'Órbita Cósmica', dt: 'Cósmico + Arcano', damageTypes: ['Cósmico', 'Arcano'],
    p: 39, a: 92, c: 16, cbonus: 10, sprite: 'conjuration/orb_of_destruction',
    d: 'Un astro de magia cósmica atraviesa el campo y golpea con energía arcana.',
  },
  {
    id: 'jeanne-star-04', route: 'star', minLevel: 45,
    t: 'mag', n: 'Aurora de la Esperanza', dt: 'Sagrado + Hielo', damageTypes: ['Sagrado', 'Hielo'],
    p: 52, a: 96, c: 20, healAfterHit: .2, sprite: 'enchantment/corona',
    d: 'Una aurora sagrada y helada daña al rival y cura un 20% de la vida máxima.',
  },
].map(skill => ({ ...skill, evolves: skill.minLevel <= 16 }));

export const JEANNE_EVOLUTION_LEVELS = [25, 40, 55, 70, 85, 95];

export const JEANNE_EVOLUTION_SUFFIXES = {
  Arcano: ['Convergente', 'Resonante', 'Transversal', 'Estelar', 'Primordial', 'Soberano'],
  Fuego: ['Incandescente', 'Forjado', 'Solar', 'Supernova', 'Eterno', 'Apoteósico'],
  Hielo: ['Templado', 'Glacial', 'Perpetuo', 'Prismático', 'Absoluto', 'Primordial'],
  Rúnico: ['Grabado', 'Vinculante', 'Ancestral', 'Perfecto', 'Infinito', 'Primordial'],
  Veneno: ['Concentrado', 'Viral', 'Alquímico', 'Nocivo', 'Abisal', 'Terminal'],
  Sagrado: ['Bendecido', 'Radiante', 'Seráfico', 'Celestial', 'Divino', 'Soberano'],
};

export const VANITAS_SKILL_LINES = [
  [
    { n: 'Bachi Ligera', t: 'fis', p: 7, a: 97, c: 0, rmp: 1, d: 'Un golpe veloz con la parte trasera de la bachi. Recupera 1 de maná al golpear.' },
    { n: 'Ritmo de Combate', t: 'fis', p: 12, a: 99, c: 0, rmp: 2, d: 'Dos golpes cortos antes de que el rival marque el compás.' },
    { n: 'Compás Quebrado', t: 'fis', p: 19, a: 100, c: 0, rmp: 3, d: 'Una secuencia rápida que no deja respirar al enemigo.' },
    { n: 'Coda del Errante', t: 'fis', p: 28, a: 100, c: 0, rmp: 4, d: 'El último golpe de una melodía que Vanitas conoce de memoria.' },
  ],
  [
    { n: 'Nota al Margen', t: 'book', book: true, p: 10, a: 96, c: 3, d: 'Una línea del Libro se enciende y golpea al rival.' },
    { n: 'Tinta Invertida', t: 'book', book: true, p: 16, a: 96, c: 4, cbonus: 4, d: 'El Libro altera el sentido de un símbolo enemigo.' },
    { n: 'Pentagrama Roto', t: 'book', book: true, p: 25, a: 94, c: 7, cbonus: 8, d: 'Cinco trazos del Libro caen como cuchillas.' },
    { n: 'Última Estrofa', t: 'book', book: true, p: 38, a: 92, c: 11, cbonus: 12, d: 'Vanitas lee en voz alta una página que nunca debió abrir.' },
  ],
  [
    { n: 'Cuerda Rasgada', t: 'fis', p: 8, a: 94, c: 2, bleed: 2, d: 'La cuerda corta y deja una herida abierta.' },
    { n: 'Arpegio Sangrante', t: 'fis', p: 14, a: 94, c: 4, bleed: 3, d: 'Un arpegio áspero que abre varios cortes.' },
    { n: 'Lluvia de Cuerdas', t: 'fis', p: 22, a: 92, c: 7, bleed: 5, d: 'La bachi recorre al rival y deja heridas profundas.' },
    { n: 'Réquiem Carmesí', t: 'fis', p: 33, a: 90, c: 10, bleed: 8, d: 'Un cierre violento que mantiene la herida abierta.' },
  ],
  [
    { n: 'Borrón de Código', t: 'book', book: true, p: 5, a: 100, c: 5, rewrite: true, d: 'El Libro reescribe a un enemigo menor para que luche a tu lado.' },
    { n: 'Margen Habitado', t: 'book', book: true, p: 8, a: 100, c: 7, rewrite: true, d: 'Un enemigo menor reescrito lucha a tu lado.' },
    { n: 'Títere de Tinta', t: 'book', book: true, p: 12, a: 100, c: 10, rewrite: true, d: 'La tinta toma el control de un enemigo menor.' },
    { n: 'Autor de los Muertos', t: 'book', book: true, p: 18, a: 100, c: 14, rewrite: true, d: 'Un enemigo menor obedece al Libro.' },
  ],
];

const VANITAS_DAMAGE_TYPES = ['Corte', 'Arcano', 'Corte', 'Vacío'];

export const VANITAS_STARTER_SKILLS = VANITAS_SKILL_LINES.map((line, lineIndex) => ({
  ...line[0],
  line: lineIndex,
  tier: 0,
  dt: VANITAS_DAMAGE_TYPES[lineIndex],
}));

export const VANITAS_FORMS = {
  shadow: {
    name: 'Sombra',
    sprite: './sprites/forms/shadow_form.png',
    duration: 4,
    skills: [
      {
        id: 'shadow-form-01', t: 'fis', n: 'Garra Umbría', dt: 'Corte',
        p: 20, a: 96, c: 0, sprite: 'enchantment/darkness',
        d: 'Un zarpazo rápido que atraviesa la oscuridad.',
      },
      {
        id: 'shadow-form-02', t: 'mag', n: 'Filo del Vacío', dt: 'Vacío',
        p: 24, a: 91, c: 3, sprite: 'translocation/dispersal',
        d: 'Una hoja sombría se abre paso entre las defensas.',
      },
      {
        id: 'shadow-form-03', t: 'blood', n: 'Drenaje Umbrío', dt: 'Sangre',
        p: 19, a: 95, c: 4, ls: 1, sprite: 'necromancy/vampiric_draining',
        d: 'La sombra absorbe parte de la vida que arranca.',
      },
      {
        id: 'shadow-form-04', t: 'mag', n: 'Manto de Penumbra', dt: 'Vacío',
        p: 15, a: 100, c: 3, smoke: 1, sprite: 'enchantment/invisibility',
        d: 'La penumbra oculta a Vanitas durante el próximo ataque.',
      },
    ],
  },
  ice: {
    name: 'Bestia de hielo',
    sprite: './sprites/forms/ice_form.png',
    duration: 4,
    skills: [
      {
        id: 'ice-form-01', t: 'mag', n: 'Aliento Glacial', dt: 'Hielo',
        p: 32, a: 92, c: 5, st: 1, sprite: 'ice/freezing_cloud',
        d: 'Una ráfaga helada que puede congelar al rival.',
      },
      {
        id: 'ice-form-02', t: 'fis', n: 'Garra de Escarcha', dt: 'Corte',
        p: 36, a: 90, c: 5, sprite: 'ice/throw_icicle',
        d: 'Un zarpazo pesado cubierto de hielo.',
      },
      {
        id: 'ice-form-03', t: 'mag', n: 'Lluvia de Carámbanos', dt: 'Hielo',
        p: 29, a: 96, c: 6, st: 1, sprite: 'ice/ice_storm',
        d: 'Una lluvia de hielo que puede interrumpir al enemigo.',
      },
      {
        id: 'ice-form-04', t: 'fis', n: 'Avalancha', dt: 'Contundente',
        p: 43, a: 82, c: 7, sprite: 'earth/shatter',
        d: 'Un golpe de masa helada cae sobre el rival.',
      },
    ],
  },
  dragon: {
    name: 'Dragón negro',
    sprite: './sprites/forms/dragon_form_black.png',
    duration: 4,
    skills: [
      {
        id: 'dragon-form-01', t: 'mag', n: 'Aliento Negro', dt: 'Fuego',
        p: 72, a: 92, c: 7, dot: 12, sprite: 'transmutation/dragon_form',
        d: 'Una llamarada oscura abrasa al rival durante varios turnos.',
      },
      {
        id: 'dragon-form-02', t: 'fis', n: 'Garra Dracónica', dt: 'Corte',
        p: 68, a: 96, c: 6, bleed: 8, sprite: 'enchantment/spectral_weapon',
        d: 'Un zarpazo brutal deja una herida profunda.',
      },
      {
        id: 'dragon-form-03', t: 'mag', n: 'Tormenta Abisal', dt: 'Vacío',
        p: 82, a: 84, c: 9, cbonus: 15, sprite: 'translocation/disjunction',
        d: 'Una descarga abisal devastadora, aunque difícil de controlar.',
      },
      {
        id: 'dragon-form-04', t: 'blood', n: 'Devorar Esencia', dt: 'Sangre',
        p: 59, a: 95, c: 8, ls: 1, sprite: 'necromancy/vampiric_draining',
        d: 'El dragón recupera vida al devorar la esencia del rival.',
      },
    ],
  },
};

export const VANITAS_SKILLS = [
  {
    id: 'vanitas-01', minLevel: 1, t: 'fis', n: 'Sangrado de Cuerda', dt: 'Corte',
    p: 11, a: 94, c: 3, bleed: 3, sprite: 'forgecraft/rending_blade',
    d: 'Un corte rápido de la bachi que deja sangrando al rival.',
  },
  {
    id: 'vanitas-02', minLevel: 1, t: 'book', n: 'Veneno entre Líneas', dt: 'Veneno',
    p: 8, a: 96, c: 4, book: true, poison: 3, sprite: 'alchemy/venom_bolt',
    d: 'El Libro escribe una toxina que actúa durante varios turnos.',
  },
  {
    id: 'vanitas-03', minLevel: 1, t: 'fis', n: 'Bomba de Humo', dt: 'Vacío',
    p: 4, a: 100, c: 3, smoke: 1, sprite: 'misc/warp_space',
    d: 'Una nube oscura reduce el daño del próximo ataque recibido.',
  },
  {
    id: 'vanitas-04', minLevel: 1, t: 'book', n: 'Código de Reescritura', dt: 'Vacío',
    p: 6, a: 100, c: 6, book: true, rewrite: true, sprite: 'translocation/manifold_assault',
    d: 'El Libro convierte a un enemigo menor en aliado hasta que caiga.',
  },
  {
    id: 'vanitas-11', minLevel: 11, t: 'book', n: 'Tinta Corrosiva', dt: 'Veneno',
    p: 17, a: 92, c: 6, book: true, poison: 5, sprite: 'alchemy/noxious_bog',
    d: 'Una mancha del Libro quema y envenena al mismo tiempo.',
  },
  {
    id: 'vanitas-12', minLevel: 11, t: 'fis', n: 'Trampa de Cuerda', dt: 'Corte',
    p: 12, a: 95, c: 4, bleed: 4, st: 1, sprite: 'forgecraft/kinetic_grapnel',
    d: 'Una cuerda oculta frena al rival y le abre una herida.',
  },
  {
    id: 'vanitas-13', minLevel: 11, t: 'book', n: 'Nota Parasitaria', dt: 'Sangre',
    p: 19, a: 91, c: 7, book: true, ls: 1, sprite: 'necromancy/vampiric_draining',
    d: 'Una nota del Libro absorbe parte de la vida que arranca.',
  },
  {
    id: 'vanitas-21', minLevel: 25, t: 'book', n: 'Partitura Invasora', dt: 'Vacío',
    p: 24, a: 95, c: 9, book: true, rewrite: true, sprite: 'misc/warp_space',
    d: 'Reescribe a un enemigo menor para que luche a tu lado hasta que caiga.',
  },
  {
    id: 'vanitas-22', minLevel: 25, t: 'fis', n: 'Acorde de Navajas', dt: 'Corte',
    p: 30, a: 91, c: 9, bleed: 6, cbonus: 8, sprite: 'enchantment/tukimas_dance',
    d: 'Un acorde veloz que deja cortes difíciles de cerrar.',
  },
  {
    id: 'vanitas-23', minLevel: 25, t: 'book', n: 'Margen Carmesí', dt: 'Sangre',
    p: 29, a: 90, c: 10, book: true, ls: 1, sprite: 'necromancy/infestation',
    d: 'El Libro bebe de la herida y devuelve parte de esa vida.',
  },
  {
    id: 'vanitas-31', minLevel: 45, t: 'book', n: 'Código del Usurpador', dt: 'Vacío',
    p: 36, a: 100, c: 14, book: true, rewrite: true, sprite: 'translocation/manifold_assault',
    d: 'Somete a un enemigo menor y lo hace luchar a tu lado hasta que caiga.',
  },
  {
    id: 'vanitas-32', minLevel: 45, t: 'book', n: 'Epitafio del Libro', dt: 'Arcano',
    p: 48, a: 90, c: 16, book: true, cbonus: 14, sprite: 'conjuration/orb_of_destruction',
    d: 'Un golpe crítico final absorbe vida del enemigo derrotado.',
  },
  {
    id: 'vanitas-form-shadow', minLevel: 11, t: 'book', n: 'Melodía Sombría', dt: 'Vacío',
    p: 0, a: 100, c: 7, book: true, form: 'shadow', sprite: 'enchantment/darkness',
    d: 'Adopta la forma de Sombra durante cuatro turnos.',
  },
  {
    id: 'vanitas-form-ice', minLevel: 25, t: 'book', n: 'Melodía Helada', dt: 'Hielo',
    p: 0, a: 100, c: 9, book: true, form: 'ice', sprite: 'ice/ice_form',
    d: 'Se transforma en Bestia de hielo durante cuatro turnos.',
  },
  {
    id: 'vanitas-form-dragon', minLevel: 45, t: 'book', n: 'Melodía de Dragón', dt: 'Fuego',
    p: 0, a: 100, c: 12, book: true, form: 'dragon', scrollWeight: 0.12,
    sprite: 'transmutation/dragon_form',
    d: 'Se transforma en Dragón negro durante cuatro turnos.',
  },
];

export const VAREK_STARTER_SKILLS = [
  {
    id: 'varek-starter-deck', starter: true, t: 'sup', n: 'Baraja Sangrienta', dt: 'Sangre',
    p: 0, a: 100, c: 0, baraja: true, sprite: 'necromancy/vampiric_draining',
    d: 'Roba una carta y activa su efecto. No consume MP.',
  },
  {
    id: 'varek-starter-cut', starter: true, t: 'fis', n: 'Corte Sangriento', dt: 'Corte',
    p: 11, a: 95, c: 1, cbonus: 10, bleed: 4, bleedChance: .5, sprite: 'enchantment/spectral_weapon',
    d: 'Un tajo con +10% de crítico y probabilidad de causar sangrado.',
  },
  {
    id: 'varek-starter-dart', starter: true, t: 'mag', n: 'Dardo de Sangre', dt: 'Arcano',
    p: 13, a: 94, c: 5, bleed: 5, bleedChance: .65, sprite: 'necromancy/agony',
    d: 'Un proyectil arcano que puede abrir una herida sangrante.',
  },
  {
    id: 'varek-starter-rift', starter: true, t: 'sup', n: 'Grieta Oscura', dt: 'Vacío',
    p: 0, a: 100, c: 6, sleep: 3, sleepChance: .4, sprite: 'translocation/dispersal',
    d: 'Tiene un 40% de probabilidad de dormir al enemigo durante 3 turnos.',
  },
].map((skill, line) => ({ ...skill, line, tier: 0 }));

const VAREK_TIER_SUFFIXES = ['', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

export const VAREK_SKILL_LINES = VAREK_STARTER_SKILLS.map((starter, line) =>
  Array.from({ length: 11 }, (_, tier) => {
    const suffix = VAREK_TIER_SUFFIXES[tier];
    const name = suffix ? `${starter.n} ${suffix}` : starter.n;
    if (line === 0) {
      return {
        ...starter,
        n: name,
        tier,
        cardBonus: tier * .75,
        cardCritBonus: tier * 1.5,
        cardCritDamage: tier * .08,
        cardHealBonus: tier * .08,
        cardShieldBonus: tier * 4,
        cardAttackBonus: Math.floor(tier * 1.5),
        d: tier ? `La baraja mejora en la ronda ${tier * 10}: sus cuatro palos ganan poder.` : starter.d,
      };
    }
    if (line === 1) {
      return {
        ...starter,
        n: name,
        tier,
        p: 11 + tier * 5,
        a: Math.min(100, 95 + tier * .5),
        cbonus: 10 + tier * 2,
        bleed: 4 + tier * 3,
        bleedChance: Math.min(.85, .5 + tier * .035),
        d: `Corte físico mejorado al rango ${tier}. Su crítico y sangrado aumentan con cada decena.`,
      };
    }
    if (line === 2) {
      return {
        ...starter,
        n: name,
        tier,
        p: 13 + tier * 5,
        a: Math.min(100, 94 + tier * .6),
        c: 5 + Math.floor(tier / 2),
        bleed: 5 + tier * 3,
        bleedChance: Math.min(.9, .65 + tier * .025),
        d: `Proyectil arcano mejorado al rango ${tier}, con más daño y probabilidad de sangrado.`,
      };
    }
    return {
      ...starter,
      n: name,
      tier,
      c: 6 + Math.floor(tier / 2),
      sleep: 3 + Math.floor(tier / 3),
      d: `Tiene un 40% de probabilidad de dormir al enemigo durante ${3 + Math.floor(tier / 3)} turnos. Mejora cada 10 niveles.`,
    };
  }),
);

const VAREK_SHARED_SKILL_NAMES = [
  ['Juego de Sangre', 'bleed'], ['Sifón Carmesí', 'drain'], ['As de Ceniza', 'critical'],
  ['Dado Roto', 'stun'], ['Carta Marcada', 'poison'], ['Pacto Hemático', 'heal'],
  ['Espejo de Diamante', 'barrier'], ['Critical Gambler', 'luck'],
  ['Mordida en Vena', 'bleed'], ['Velo Nocturno', 'sleep'],
  ['Apuesta a Ciegas', 'critical'], ['Cosecha Escarlata', 'bleed'], ['Sangre Prestada', 'drain'],
  ['Corte de la Reina', 'bleed'], ['Veneno en la Manga', 'poison'], ['Latido Robado', 'heal'],
  ['Parada de Ónix', 'barrier'], ['Ruleta de Hueso', 'stun'], ['Niebla del Salón', 'sleep'],
  ['Joker Agrietado', 'luck'],
  ['Filigrana Letal', 'critical'], ['Rosario de Heridas', 'bleed'], ['Beso del Nocturno', 'drain'],
  ['Aguja de Eclipse', 'arcane-bleed'], ['Loto Tóxico', 'poison'], ['Sutura Vampírica', 'heal'],
  ['Bastión de Rubí', 'barrier'], ['Sello del Silencio', 'stun'], ['Sueño de Medianoche', 'sleep'],
  ['Moneda de la Parca', 'luck'],
  ['Danza de Navajas', 'bleed'], ['Boca del Abismo', 'drain'], ['Crupier Implacable', 'critical'],
  ['Lanza de Hematita', 'arcane-bleed'], ['Sangre Corrupta', 'poison'], ['Pulsación Oscura', 'heal'],
  ['Muralla de Espejos', 'barrier'], ['Golpe de la Banca', 'stun'], ['Somnolencia Profana', 'sleep'],
  ['Fortuna Escarlata', 'luck'],
  ['Círculo de Dagas', 'bleed'], ['Trago de Inmortalidad', 'drain'], ['Última Apuesta', 'critical'],
  ['Estocada Astral', 'arcane-bleed'], ['Rencor Destilado', 'poison'], ['Banquete Carmesí', 'heal'],
  ['Prisma Sanguíneo', 'barrier'], ['Mazo del Verdugo', 'stun'], ['Réquiem Somnoliento', 'sleep'],
  ['Destino Barajado', 'luck'],
  ['Cosecha de Baskerville', 'bleed'], ['Corazón Expropiado', 'drain'], ['Rey de Picas', 'critical'],
  ['Lluvia de Agujas Negras', 'arcane-bleed'], ['Sangre de la Cripta', 'poison'],
  ['Bendición del Vampiro', 'heal'], ['Último Refugio', 'barrier'], ['Noche sin Despertar', 'sleep'],
];

const VAREK_SKILL_BANDS = [1, 6, 11, 16, 25, 45];
const VAREK_SKILL_EFFECTS = {
  bleed: { t: 'fis', dt: 'Corte', bleed: band => 3 + band * 2, sprite: 'enchantment/spectral_weapon', d: 'Causa daño físico y puede dejar sangrando al objetivo.' },
  drain: { t: 'blood', dt: 'Sangre', ls: 1, sprite: 'necromancy/vampiric_draining', d: 'Drena vida según el daño infligido.' },
  critical: { t: 'fis', dt: 'Corte', cbonus: band => 12 + band * 2, sprite: 'enchantment/tukimas_dance', d: 'Un ataque físico con probabilidad crítica adicional.' },
  stun: { t: 'mag', dt: 'Sagrado', st: 1, stChance: .45, sprite: 'conjuration/searing_ray', d: 'Una descarga que puede aturdir al enemigo.' },
  poison: { t: 'mag', dt: 'Veneno', poison: band => 3 + band * 2, sprite: 'poison/venom_bolt', d: 'Envenena al enemigo durante varios turnos.' },
  heal: { t: 'sup', dt: 'Sangre', heal: band => 12 + band * 7, sprite: 'necromancy/vampiric_draining', d: 'Recupera vida.' },
  barrier: { t: 'sup', dt: 'Vacío', barrier: band => 14 + band * 8, sprite: 'enchantment/condensation_shield', d: 'Crea una barrera que absorbe el próximo daño.' },
  luck: { t: 'sup', dt: 'Sangre', luckNext: true, sprite: 'translocation/dispersal', d: 'El próximo ataque será crítico o fallará, según la suerte.' },
  sleep: { t: 'mag', dt: 'Vacío', sleep: 2, sprite: 'enchantment/darkness', d: 'Duerme al enemigo durante 2 turnos.' },
  'arcane-bleed': { t: 'mag', dt: 'Arcano', bleed: band => 3 + band * 2, bleedChance: .65, sprite: 'necromancy/agony', d: 'Un proyectil arcano con probabilidad de causar sangrado.' },
};

export const VAREK_SHARED_SKILLS = VAREK_SHARED_SKILL_NAMES.map(([name, effectName], index) => {
  const band = Math.floor(index / 10);
  const effect = VAREK_SKILL_EFFECTS[effectName];
  const skill = {
    id: `varek-${String(index + 1).padStart(2, '0')}`,
    minLevel: VAREK_SKILL_BANDS[band],
    t: effect.t,
    n: name,
    dt: effect.dt,
    p: effect.t === 'sup' ? 0 : 10 + band * 5 + (index % 5) * 2,
    a: effect.t === 'sup' ? 100 : 91 + (index % 4) * 2,
    c: effect.luckNext ? 6 + band * 2 : 3 + band * 2,
    sprite: effect.sprite,
    d: effect.d,
  };
  for (const [key, value] of Object.entries(effect)) {
    if (['t', 'dt', 'sprite', 'd'].includes(key)) continue;
    skill[key] = typeof value === 'function' ? value(band) : value;
  }
  if (effect.bleed && !skill.bleedChance) skill.bleedChance = .65;
  return skill;
});

export const VAREK_ROUTE_SKILLS = [
  {
    id: 'varek-ludopata-judgment', route: 'ludopata', minLevel: 11,
    t: 'mag', n: 'Juicio de la Milicia', dt: 'Sagrado', p: 28, a: 94, c: 10,
    st: 1, stChance: .55, sprite: 'conjuration/searing_ray',
    d: 'Daño sagrado con probabilidad de aturdir.',
  },
  {
    id: 'varek-ludopata-breath', route: 'ludopata', minLevel: 25,
    t: 'sup', n: 'Aliento del Viajero', dt: 'Sangre', p: 0, a: 100, c: 0,
    allManaCost: true, fullHeal: true, sprite: 'necromancy/vampiric_draining',
    d: 'Recupera toda la vida a cambio de todo el MP actual.',
  },
  {
    id: 'varek-baskerville-spear', route: 'baskerville', minLevel: 11,
    t: 'fis', n: 'Malicious Spear Qliphoth', dt: 'Vacío', p: 20, a: 88, c: 12,
    directMultiplier: 2, bleed: 12, bleedChance: .6, sprite: 'translocation/dispersal',
    d: 'Invoca una lanza abisal que inflige 200% del ataque físico y puede causar sangrado.',
  },
  {
    id: 'varek-baskerville-breath', route: 'baskerville', minLevel: 25,
    t: 'sup', n: 'Breath of Doom', dt: 'Vacío', p: 0, a: 100, c: 20,
    healPercent: .3, cleanse: true, sprite: 'translocation/dispersal',
    d: 'Regenera 30% de los PV máximos y elimina todos los estados alterados. Cuesta mucho MP.',
  },
];

export const VAREK_SKILLS = [...VAREK_SHARED_SKILLS, ...VAREK_ROUTE_SKILLS];

export const SKILL_RARITIES = Object.freeze({
  common: { color: '#858b94', scrollWeight: 1 },
  uncommon: { color: '#388f55', scrollWeight: .65 },
  rare: { color: '#347dc1', scrollWeight: .35 },
  epic: { color: '#8751bd', scrollWeight: .16 },
  legendary: { color: '#c59a2e', scrollWeight: .06 },
  mythic: { color: '#bd434b', scrollWeight: .02 },
});

const GENERATED_SKILL_LEVELS = [1, 6, 11, 16, 25, 45];
const GENERATED_SKILL_NAMES = {
  solaris: {
    forms: ['Filo', 'Bastión', 'Voto', 'Embestida', 'Cruzada', 'Égida', 'Veredicto', 'Lanza', 'Sello', 'Maza', 'Juramento', 'Guardia', 'Asalto', 'Columna', 'Estocada', 'Fortaleza', 'Ruptura', 'Carga', 'Corte', 'Estandarte'],
    epithets: ['del Alba', 'de Hierro', 'Solar', 'del León', 'Sagrado', 'Inquebrantable', 'del Ocaso', 'Radiante', 'del Reino', 'Celestial'],
    types: ['Corte', 'Contundente', 'Sagrado', 'Fuego', 'Rúnico', 'Vacío'],
    sprites: ['forgecraft/rending_blade', 'earth/shatter', 'enchantment/corona', 'fire/fire_storm'],
  },
  jeanne: {
    forms: ['Conjuro', 'Oráculo', 'Cántico', 'Prisma', 'Aurora', 'Vórtice', 'Ráfaga', 'Estallido', 'Luz', 'Marea', 'Nexo', 'Lluvia', 'Espiral', 'Bendición', 'Cometa', 'Esfera', 'Fulgor', 'Reflejo', 'Corona', 'Runa'],
    epithets: ['Estelar', 'del Firmamento', 'de Cristal', 'Cósmico', 'de la Aurora', 'Elemental', 'Sagrado', 'Astral', 'de la Esperanza', 'Radiante'],
    types: ['Arcano', 'Fuego', 'Hielo', 'Sagrado', 'Rúnico', 'Veneno'],
    sprites: ['conjuration/orb_of_destruction', 'fire/fire_storm', 'ice/ice_storm', 'enchantment/corona'],
  },
  vanitas: {
    forms: ['Partitura', 'Acorde', 'Elegía', 'Coda', 'Ritual', 'Réquiem', 'Sombra', 'Tinta', 'Lamento', 'Sonata', 'Verso', 'Margen', 'Melodía', 'Epitafio', 'Pentagrama', 'Borrón', 'Arpegio', 'Compás', 'Cántico', 'Estrofa'],
    epithets: ['Carmesí', 'del Vacío', 'Olvidado', 'Maldito', 'de Medianoche', 'Errante', 'Invertido', 'de los Caídos', 'Sombrío', 'Final'],
    types: ['Arcano', 'Corte', 'Veneno', 'Vacío', 'Sangre', 'Fuego'],
    sprites: ['translocation/dispersal', 'necromancy/vampiric_draining', 'poison/venom_bolt', 'conjuration/orb_of_destruction'],
  },
  varek: {
    forms: ['Apuesta', 'Jugada', 'Carta', 'Ruleta', 'Truco', 'Mano', 'Reparto', 'Corte', 'Finta', 'Asalto', 'Pacto', 'Robo', 'Giro', 'Lance', 'Sangría', 'Envite', 'Farol', 'Duelo', 'Sifón', 'Comodín'],
    epithets: ['Carmesí', 'del Crupier', 'de Picas', 'Maldito', 'de la Cripta', 'Sangriento', 'del Nocturno', 'de Baskerville', 'Letal', 'Final'],
    types: ['Corte', 'Arcano', 'Sangre', 'Sagrado', 'Veneno', 'Vacío'],
    sprites: ['enchantment/spectral_weapon', 'necromancy/vampiric_draining', 'poison/venom_bolt', 'translocation/dispersal'],
  },
};

function createGeneratedSkills(character, count) {
  const naming = GENERATED_SKILL_NAMES[character];
  const generated = [];

  for (let index = 0; index < count; index++) {
    const levelBand = Math.min(
      GENERATED_SKILL_LEVELS.length - 1,
      Math.floor(index * GENERATED_SKILL_LEVELS.length / count),
    );
    const generatedIndex = index + 1;
    const supportKind = index % 19;
    const isHeal = supportKind === 0;
    const isBarrier = supportKind === 1;
    const isSupport = isHeal || isBarrier;
    const type = naming.types[index % naming.types.length];
    const form = naming.forms[index % naming.forms.length];
    const epithet = naming.epithets[Math.floor(index / naming.forms.length) % naming.epithets.length];
    const skill = {
      id: `${character}-generated-${String(generatedIndex).padStart(3, '0')}`,
      minLevel: GENERATED_SKILL_LEVELS[levelBand],
      t: isSupport ? 'sup' : character === 'vanitas' && index % 3 === 0 ? 'book' : index % 3 === 0 ? 'fis' : 'mag',
      n: `${form} ${epithet}`,
      dt: type,
      p: isSupport ? 0 : 13 + levelBand * 6 + index % 6 * 2,
      a: 88 + index % 13,
      c: 2 + levelBand * 2 + index % 3,
      sprite: naming.sprites[index % naming.sprites.length],
      d: '',
    };

    if (isSupport) {
      if (isHeal) {
        skill.heal = 12 + levelBand * 5;
        skill.d = `Restaura ${skill.heal} PV con una técnica de ${epithet.toLowerCase()}.`;
      } else {
        skill.barrier = 15 + levelBand * 6;
        skill.d = `Crea una barrera de ${skill.barrier} PV con una técnica ${epithet.toLowerCase()}.`;
      }
    } else if (index % 7 === 0) {
      skill.st = 1;
      skill.stChance = .35;
      skill.d = `Un golpe ${epithet.toLowerCase()} que puede aturdir al enemigo.`;
    } else if (index % 7 === 1) {
      skill.dot = 3 + levelBand * 2;
      skill.d = `Inflige daño de ${type} persistente con una técnica ${epithet.toLowerCase()}.`;
    } else if (index % 7 === 2) {
      skill.cbonus = 5 + levelBand;
      skill.d = `Un ataque preciso ${epithet.toLowerCase()} con crítico adicional.`;
    } else {
      skill.d = `Inflige daño de ${type} con una técnica ${epithet.toLowerCase()}.`;
    }

    if (skill.t === 'book') skill.book = true;
    if (character === 'varek' && skill.dt === 'Sangre') skill.ls = 1;
    generated.push(skill);
  }

  return generated;
}

function fillSkillCatalog(skills, character, otherSkillCount, reservedSkills = []) {
  const missingSkillCount = Math.max(0, 200 - skills.length - otherSkillCount);
  const existingNames = new Set([...skills, ...reservedSkills].map(skill => skill.n));
  const generatedSkills = createGeneratedSkills(character, missingSkillCount);

  generatedSkills.forEach((skill, index) => {
    if (existingNames.has(skill.n)) skill.n = `${skill.n} ${index + 1}`;
    while (existingNames.has(skill.n)) skill.n += ' II';
    existingNames.add(skill.n);
  });

  skills.push(...generatedSkills);
}

const RARITY_THRESHOLDS = [
  ['common', 500],
  ['uncommon', 750],
  ['rare', 900],
  ['epic', 970],
  ['legendary', 995],
];

function applySkillRarity(skill, index, seed) {
  const roll = (index * 419 + seed * 137 + 23) % 1000;
  const rarity = RARITY_THRESHOLDS.find(([, threshold]) => roll < threshold)?.[0] || 'mythic';
  skill.rarity ||= rarity;
  skill.scrollWeight ??= SKILL_RARITIES[skill.rarity].scrollWeight;
}

function decorateSkillCatalog(skills, seed) {
  skills.forEach((skill, index) => applySkillRarity(skill, index, seed));
}

function decorateSkillLines(lines, seed) {
  lines.forEach((line, lineIndex) => line.forEach(skill => applySkillRarity(skill, lineIndex, seed)));
}

const VANITAS_FORM_SKILL_COUNT = Object.values(VANITAS_FORMS)
  .reduce((count, form) => count + form.skills.length, 0);

fillSkillCatalog(SOLARIS_SKILLS, 'solaris', SOLARIS_STARTER_SKILLS.length, SOLARIS_STARTER_SKILLS);
fillSkillCatalog(JEANNE_SKILLS, 'jeanne', JEANNE_STARTER_SKILLS.length, JEANNE_STARTER_SKILLS);
fillSkillCatalog(VANITAS_SKILLS, 'vanitas', VANITAS_STARTER_SKILLS.length + VANITAS_FORM_SKILL_COUNT, [
  ...VANITAS_STARTER_SKILLS,
  ...Object.values(VANITAS_FORMS).flatMap(form => form.skills),
]);
fillSkillCatalog(VAREK_SKILLS, 'varek', VAREK_STARTER_SKILLS.length, VAREK_STARTER_SKILLS);

decorateSkillCatalog(SOLARIS_SKILLS, 1);
decorateSkillCatalog(JEANNE_SKILLS, 2);
decorateSkillCatalog(VANITAS_SKILLS, 3);
decorateSkillCatalog(VAREK_SKILLS, 4);
decorateSkillCatalog(SOLARIS_STARTER_SKILLS, 5);
decorateSkillCatalog(JEANNE_STARTER_SKILLS, 6);
decorateSkillCatalog(VANITAS_STARTER_SKILLS, 7);
decorateSkillCatalog(VAREK_STARTER_SKILLS, 8);
decorateSkillLines(SOLARIS_SKILL_LINES, 5);
decorateSkillLines(JEANNE_SKILL_LINES, 6);
decorateSkillLines(VANITAS_SKILL_LINES, 7);
decorateSkillLines(VAREK_SKILL_LINES, 8);
Object.values(VANITAS_FORMS).forEach((form, index) => decorateSkillCatalog(form.skills, 9 + index));
