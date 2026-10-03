export function getEnemyCombatStats(level, isBoss) {
  const growthTier = Math.max(0, Math.floor(level / 10) - 1);
  const healthGrowth = Math.pow(1.12, growthTier);
  const attackGrowth = Math.pow(1.05, growthTier);
  const baseHealth = level <= 10 ? 8 + 1.5 * level : (15 + 7.5 * level) * healthGrowth;
  const baseAttack = level <= 10 ? .5 + .15 * level : (4 + .8 * level) * attackGrowth;

  return {
    mx: Math.round(baseHealth * (isBoss ? 2.5 : 1)),
    attack: baseAttack * (isBoss ? 1.4 : 1),
  };
}

export function getVarekStarterDamageMultiplier(level) {
  const skillTier = Math.min(10, Math.floor(level / 10));
  return Math.pow(1.06, Math.max(0, skillTier - 1));
}

export function getInitialRouteState() {
  return {
    vanitasPath: null,
    vanitasPathRank: 0,
    varekPath: null,
    varekPathRank: 0,
    solarisPath: null,
    jeannePath: null,
  };
}

export function tickStatusDuration(status) {
  if (status.id === 'frenzy' || status.turns === undefined) return false;
  if (status.deferFirstTick) {
    status.deferFirstTick = false;
    return false;
  }

  status.turns--;
  return status.turns <= 0;
}

export function passesStatusChance(chance, roll) {
  return roll < chance;
}

export function getParryMessage(outcome, damageResult, damageMessage, reflectedDamage = 0) {
  if (outcome === 'good') {
    return `Parry exitoso: ${damageMessage} Devuelves ${reflectedDamage} de daño.`;
  }

  const prefix = damageResult.damage === 0 ? '¡Daño bloqueado!' : '¡Golpe recibido!';
  return `${prefix} ${damageMessage}`;
}