import {
  chooseWeightedItems,
  getEnemyCombatStats,
  getInitialRouteState,
  getParryMessage,
  getVarekStarterDamageMultiplier,
  passesStatusChance,
  SCROLL_REWARD_WEIGHT,
  tickStatusDuration,
} from '../js/data/combat-rules.js?test-suite=v3';
import {
  JEANNE_SKILLS,
  JEANNE_SKILL_LINES,
  JEANNE_STARTER_SKILLS,
  SKILL_RARITIES,
  SOLARIS_SKILLS,
  SOLARIS_SKILL_LINES,
  SOLARIS_STARTER_SKILLS,
  VANITAS_FORMS,
  VANITAS_SKILLS,
  VANITAS_SKILL_LINES,
  VANITAS_STARTER_SKILLS,
  VAREK_SKILLS,
  VAREK_SKILL_LINES,
  VAREK_STARTER_SKILLS,
} from '../js/data/skills.js?test-suite=v3';

const results = document.querySelector('#test-results');
const tests = [];

function test(name, run) {
  tests.push({ name, run });
}

function equal(actual, expected) {
  if (actual !== expected) throw new Error(`Expected ${expected}, received ${actual}`);
}

function near(actual, expected, tolerance = .001) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(`Expected ${expected} +/- ${tolerance}, received ${actual}`);
  }
}

test('early enemy stats keep their existing values', () => {
  equal(getEnemyCombatStats(1, false).mx, 10);
  equal(getEnemyCombatStats(10, false).mx, 23);
});

test('enemy health grows by decade, not every round', () => {
  equal(getEnemyCombatStats(20, false).mx, 185);
  equal(getEnemyCombatStats(100, false).mx, 2121);
});

test('bosses retain their health and attack multipliers', () => {
  const regular = getEnemyCombatStats(100, false);
  const boss = getEnemyCombatStats(100, true);
  near(boss.mx / regular.mx, 2.5, .001);
  near(boss.attack / regular.attack, 1.4);
});

test('Varek starter damage has a bounded high-level multiplier', () => {
  near(getVarekStarterDamageMultiplier(10), 1);
  near(getVarekStarterDamageMultiplier(100), 1.689478959, .000001);
});

test('new runs clear every character route', () => {
  const routes = getInitialRouteState();
  equal(routes.vanitasPath, null);
  equal(routes.vanitasPathRank, 0);
  equal(routes.varekPath, null);
  equal(routes.varekPathRank, 0);
  equal(routes.solarisPath, null);
  equal(routes.jeannePath, null);
});

test('each character has exactly 200 skills across its complete tree', () => {
  const vanitasFormSkills = Object.values(VANITAS_FORMS)
    .reduce((count, form) => count + form.skills.length, 0);
  equal(SOLARIS_SKILLS.length + SOLARIS_STARTER_SKILLS.length, 200);
  equal(JEANNE_SKILLS.length + JEANNE_STARTER_SKILLS.length, 200);
  equal(VANITAS_SKILLS.length + vanitasFormSkills + VANITAS_STARTER_SKILLS.length, 200);
  equal(VAREK_SKILLS.length + VAREK_STARTER_SKILLS.length, 200);
});

test('skill names stay unique within every character tree', () => {
  const vanitasSkills = [
    ...VANITAS_SKILLS,
    ...VANITAS_STARTER_SKILLS,
    ...Object.values(VANITAS_FORMS).flatMap(form => form.skills),
  ];
  const trees = [
    ['Solaris', [...SOLARIS_SKILLS, ...SOLARIS_STARTER_SKILLS]],
    ['Jeanne', [...JEANNE_SKILLS, ...JEANNE_STARTER_SKILLS]],
    ['Vanitas', vanitasSkills],
    ['Varek', [...VAREK_SKILLS, ...VAREK_STARTER_SKILLS]],
  ];
  for (const [character, skills] of trees) {
    if (new Set(skills.map(skill => skill.n)).size !== skills.length) {
      throw new Error(`${character} has duplicate skill names`);
    }
  }
});

test('every skill has a hidden color rarity and rarity-scaled scroll weight', () => {
  const skills = [
    ...SOLARIS_SKILLS,
    ...JEANNE_SKILLS,
    ...VANITAS_SKILLS,
    ...VAREK_SKILLS,
    ...SOLARIS_STARTER_SKILLS,
    ...SOLARIS_SKILL_LINES.flat(),
    ...JEANNE_STARTER_SKILLS,
    ...JEANNE_SKILL_LINES.flat(),
    ...VANITAS_STARTER_SKILLS,
    ...VANITAS_SKILL_LINES.flat(),
    ...VAREK_STARTER_SKILLS,
    ...VAREK_SKILL_LINES.flat(),
    ...Object.values(VANITAS_FORMS).flatMap(form => form.skills),
  ];
  const rarityNames = Object.keys(SKILL_RARITIES);
  for (const skill of skills) {
    if (!rarityNames.includes(skill.rarity)) throw new Error(`${skill.id || skill.n} has no valid rarity`);
    if (!Number.isFinite(skill.scrollWeight) || skill.scrollWeight <= 0 || skill.scrollWeight > 1) {
      throw new Error(`${skill.id || skill.n} has an invalid scroll weight`);
    }
  }
  equal(SKILL_RARITIES.common.color, '#858b94');
  equal(SKILL_RARITIES.uncommon.color, '#388f55');
  equal(SKILL_RARITIES.rare.color, '#347dc1');
  equal(SKILL_RARITIES.epic.color, '#8751bd');
  equal(SKILL_RARITIES.legendary.color, '#c59a2e');
  equal(SKILL_RARITIES.mythic.color, '#bd434b');
});

test('weighted scroll acquisition favors common skills and allows rare ones', () => {
  const pool = [{ name: 'common', weight: 1 }, { name: 'scroll', weight: SCROLL_REWARD_WEIGHT }];
  equal(chooseWeightedItems(pool, 1, () => .5)[0].name, 'common');
  equal(chooseWeightedItems(pool, 1, () => .999)[0].name, 'scroll');
  equal(SCROLL_REWARD_WEIGHT < 1, true);
  equal(SKILL_RARITIES.common.scrollWeight > SKILL_RARITIES.mythic.scrollWeight, true);
});

test('Varek takes about two to three hits across late-game milestones', () => {
  for (const level of [11, 20, 50, 100]) {
    const tier = Math.min(10, Math.floor(level / 10));
    const physicalAttack = Math.round(22 + .7 * (level - 1));
    const damage = (11 + tier * 5) * physicalAttack / 10 * getVarekStarterDamageMultiplier(level);
    const hitsToDefeat = getEnemyCombatStats(level, false).mx / damage;
    if (hitsToDefeat < 1.5 || hitsToDefeat > 3) {
      throw new Error(`Level ${level} requires ${hitsToDefeat.toFixed(2)} hits`);
    }
  }
});

test('enemy attack stays threatening at level 100', () => {
  const incomingAt11 = getEnemyCombatStats(11, false).attack * 100 / 140;
  const incomingAt100 = getEnemyCombatStats(100, false).attack * 100 / 140;
  if (incomingAt100 < 80) throw new Error(`Level 100 expected a meaningful hit, received ${incomingAt100.toFixed(1)}`);
  if (incomingAt100 <= incomingAt11) throw new Error('Enemy threat did not increase with level');
});

test('deferred buffs last for exactly two later actions', () => {
  const buff = { id: 'roulette-attack', turns: 2, deferFirstTick: true };
  equal(tickStatusDuration(buff), false);
  equal(buff.turns, 2);
  equal(tickStatusDuration(buff), false);
  equal(buff.turns, 1);
  equal(tickStatusDuration(buff), true);
  equal(buff.turns, 0);
});

test('ordinary timed statuses decrement and expire normally', () => {
  const sleep = { id: 'sleep', turns: 1 };
  equal(tickStatusDuration(sleep), true);
  equal(sleep.turns, 0);
});

test('frenzy duration remains controlled by its dedicated timer', () => {
  const frenzy = { id: 'frenzy', turns: 3 };
  equal(tickStatusDuration(frenzy), false);
  equal(frenzy.turns, 3);
});

test('Grieta Oscura proc chance has a deterministic 40% boundary', () => {
  equal(passesStatusChance(.4, .39), true);
  equal(passesStatusChance(.4, .4), false);
});

test('a blocked parry message never claims damage was received', () => {
  const message = getParryMessage('miss', { damage: 0 }, 'Solaris no recibe daño gracias al Bastión del Señor.');
  equal(message.startsWith('¡Daño bloqueado!'), true);
  equal(message.includes('recibe 0 de daño'), false);
});

let failures = 0;
const lines = tests.map(({ name, run }) => {
  try {
    run();
    return `PASS ${name}`;
  } catch (error) {
    failures++;
    return `FAIL ${name}: ${error.message}`;
  }
});

results.dataset.status = failures ? 'fail' : 'pass';
results.textContent = `${tests.length - failures}/${tests.length} tests passed\n\n${lines.join('\n')}`;
document.title = failures ? 'Combat rules tests failed' : 'Combat rules tests passed';