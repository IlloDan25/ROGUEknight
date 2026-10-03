import {
  getEnemyCombatStats,
  getInitialRouteState,
  getParryMessage,
  getVarekStarterDamageMultiplier,
  passesStatusChance,
  tickStatusDuration,
} from '../js/data/combat-rules.js';

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