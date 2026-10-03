// El cierre mantiene el estado de cada partida privado; Game solo expone el arranque.
import {
  SOLARIS_SKILLS,
  SOLARIS_SKILL_LINES,
  SOLARIS_STARTER_SKILLS,
  VANITAS_SKILLS,
  VANITAS_SKILL_LINES,
  VANITAS_FORMS,
  VANITAS_STARTER_SKILLS,
  JEANNE_SKILLS,
  JEANNE_SKILL_LINES,
  JEANNE_STARTER_SKILLS,
  JEANNE_EVOLUTION_LEVELS,
  JEANNE_EVOLUTION_SUFFIXES,
  VAREK_SKILLS,
  VAREK_SKILL_LINES,
  VAREK_STARTER_SKILLS,
  SKILL_RARITIES,
} from './data/skills.js';
import {
  chooseWeightedItems,
  getEnemyCombatStats,
  getInitialRouteState,
  getParryMessage,
  getVarekStarterDamageMultiplier,
  passesStatusChance,
  SCROLL_REWARD_WEIGHT,
  tickStatusDuration,
} from './data/combat-rules.js';
import {
  MONSTER_CLASSES,
  MONSTER_LOOT_TABLE,
  MONSTER_SPRITES,
  MONSTER_SPRITE_BASE_URL,
  ZONES,
  getAffinityLabel,
  getAffinityMultiplier,
  getMonsterAffinities,
} from './data/monsters.js';

// El módulo mantiene privado el estado mutable de cada partida.
export const Game = (() => {
  'use strict';

  function getElementById(elementId) {
    return document.getElementById(elementId);
  }

  function waitForDelay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  const SKILL_SPRITE_BASE_URL = './sprites/skills/';
  const SKILL_SPRITE_ALIASES = {
    'alchemy/sting': 'poison/sting',
    'alchemy/venom_bolt': 'poison/venom_bolt',
    'alchemy/noxious_bog': 'poison/poisonous_cloud',
    'alchemy/poison_arrow': 'poison/poison_arrow',
    'fire/foxfire': 'fire/throw_flame',
    'fire/flame_wave': 'fire/fire_storm',
    'fire/starburst': 'fire/fireball',
    'misc/warp_space': 'translocation/disjunction',
    'misc/bolt_of_light': 'conjuration/searing_ray',
    'misc/bolt_energy': 'air/lightning_bolt',
    'forgecraft/splinterfrost_shell': 'ice/throw_icicle',
    'forgecraft/monarch_bomb': 'conjuration/fulminant_prism',
    'forgecraft/rending_blade': 'enchantment/sure_blade',
    'forgecraft/fortress_blast': 'earth/shatter',
    'forgecraft/diamond_sawblades': 'enchantment/tukimas_dance',
    'forgecraft/kinetic_grapnel': 'conjuration/force_lance',
    'forgecraft/construct_spike_launcher': 'conjuration/force_lance',
    'forgecraft/platinum_paragon': 'enchantment/infusion',
    'enchantment/corona': 'enchantment/infusion',
    'enchantment/violent_unravelling': 'enchantment/discord',
    'necromancy/infestation': 'necromancy/haunt',
    'necromancy/borgnjors_vile_clutch': 'necromancy/excruciating_wounds',
    'ice/hailstorm': 'ice/ice_storm',
    'translocation/manifold_assault': 'translocation/dispersal',
  };
  const STARTER_SKILL_SPRITES = {
    solaris: ['enchantment/sure_blade', 'earth/shatter', 'conjuration/force_lance', 'earth/iron_shot'],
    vanitas: ['enchantment/tukimas_dance', 'translocation/dispersal', 'poison/poison_arrow', 'necromancy/pain'],
    jeanne: ['earth/stone_arrow', 'conjuration/magic_dart', 'ice/throw_frost', 'fire/throw_flame'],
  };
  const COMBAT_EFFECT_BASE_URL = './sprites/effects/';
  const createCombatEffectFrames = (prefix, frameCount) =>
    Array.from({ length: frameCount }, (_, frameIndex) => `${prefix}${frameIndex}`);
  const COMBAT_EFFECT_FRAMES = {
    Contundente: createCombatEffectFrames('stone_arrow', 8),
    Sagrado: createCombatEffectFrames('orb_glow', 2),
    Arcano: createCombatEffectFrames('zap', 4),
    Rúnico: createCombatEffectFrames('searing_ray', 6),
    Sangre: createCombatEffectFrames('drain', 3),
    Fuego: createCombatEffectFrames('flame', 3),
    Hielo: createCombatEffectFrames('icicle', 8),
    Veneno: createCombatEffectFrames('poison_arrow', 8),
    Vacío: createCombatEffectFrames('disjunct', 4),
  };
  const EFFECT_TIER_COLORS = ['#dfe8f5', '#7fd0ff', '#ffd84a', '#ff7a3a'];

  function createEffectMarkup(skill) {
    const tier = skill.tier ?? Math.min(3, Math.floor(skill.p / 28));
    const color = EFFECT_TIER_COLORS[tier];
    const effectType = skill.line !== undefined
      ? ['slash', 'heavy', 'bash', 'blood'][skill.line]
      : { fis: 'slash', mag: 'mag', mix: 'rune', sup: 'sup', blood: 'blood', book: 'mag' }[skill.t] || 'slash';
    const createStrokeMarkup = (pathData, strokeWidth) => `
      <path class="dr" pathLength="1" d="${pathData}" stroke="${color}"
        stroke-width="${strokeWidth}" fill="none" stroke-linecap="round"/>
    `;
    const createStarMarkup = opacity => `
      <polygon points="50,5 60,38 95,50 60,62 50,95 40,62 5,50 40,38"
        fill="${color}" opacity="${opacity}"/>
    `;
    let svgContents = '';

    if (effectType === 'slash') {
      const slashCount = tier >= 3 ? 3 : tier >= 1 ? 2 : 1;
      for (let slashIndex = 0; slashIndex < slashCount; slashIndex++) {
        const pathData = `M${20 + slashIndex * 14} 10 Q${52 + slashIndex * 14} 45 88 ${90 - slashIndex * 14}`;
        svgContents += createStrokeMarkup(pathData, 6 - slashIndex);
      }
    } else if (effectType === 'heavy') {
      svgContents = createStarMarkup(0.55)
        + createStrokeMarkup('M14 14 L86 86', 9)
        + createStrokeMarkup('M86 14 L14 86', 9);
      if (tier >= 2) svgContents += '<circle cx="50" cy="50" r="12" fill="#fff"/>';
    } else if (effectType === 'bash') {
      svgContents = `
        <circle cx="50" cy="50" r="40" fill="none" stroke="${color}" stroke-width="6"/>
        <circle cx="50" cy="50" r="24" fill="none" stroke="${color}" stroke-width="6"/>
        ${createStarMarkup(0.7)}
      `;
    } else if (effectType === 'blood') {
      const bloodColor = ['#a01028', '#c81838', '#e82048', '#ff3060'][tier];
      const extraDrop = tier >= 2 ? `<circle cx="78" cy="24" r="6" fill="${bloodColor}"/>` : '';
      svgContents = `
        <path d="M50 8 C76 40 80 62 50 88 C20 62 24 40 50 8Z" fill="${bloodColor}"/>
        <circle cx="22" cy="70" r="7" fill="${bloodColor}"/>
        <circle cx="80" cy="74" r="6" fill="${bloodColor}"/>
        ${extraDrop}
        <path d="M42 44 Q46 62 50 70" stroke="#fff" stroke-width="4" fill="none" opacity=".5"/>
      `;
    } else if (effectType === 'mag') {
      svgContents = `
        <circle cx="50" cy="50" r="22" fill="#b060ff"/>
        <circle cx="50" cy="50" r="12" fill="#fff"/>
      `;
      for (let rayIndex = 0; rayIndex < 8; rayIndex++) {
        const angle = rayIndex * Math.PI / 4;
        const startX = 50 + 30 * Math.cos(angle);
        const startY = 50 + 30 * Math.sin(angle);
        const endX = 50 + 46 * Math.cos(angle);
        const endY = 50 + 46 * Math.sin(angle);
        svgContents += `
          <line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}"
            stroke="#d9a8ff" stroke-width="5" stroke-linecap="round"/>
        `;
      }
    } else if (effectType === 'rune') {
      svgContents = `
        <circle cx="50" cy="50" r="42" fill="none" stroke="${color}" stroke-width="5"/>
        <polygon points="50,14 82,32 82,68 50,86 18,68 18,32"
          fill="none" stroke="${color}" stroke-width="5"/>
        <polygon points="50,30 70,64 30,64" fill="${color}" opacity=".7"/>
      `;
    } else {
      svgContents = `
        <circle cx="50" cy="50" r="40" fill="none" stroke="#5fe08a" stroke-width="6"/>
        <circle cx="50" cy="50" r="24" fill="none" stroke="#5fe08a" stroke-width="6"/>
        <path d="M50 32 V68 M32 50 H68" stroke="#fff" stroke-width="9" stroke-linecap="round"/>
      `;
    }

    let effectColor = color;
    if (effectType === 'mag') effectColor = '#b060ff';
    if (effectType === 'sup') effectColor = '#5fe08a';

    return {
      k: effectType,
      svg: `<svg viewBox="0 0 100 100" style="color:${effectColor}">${svgContents}</svg>`,
    };
  }

  function playCombatEffect(skill) {
    const { k: effectType, svg } = createEffectMarkup(skill);
    const effectElement = getElementById(effectType === 'sup' ? 'fk' : 'fx');
    effectElement.classList.toggle('meteor-impact', Boolean(skill.meteor));
    const frames = skill.meteor
      ? COMBAT_EFFECT_FRAMES.Fuego
      : skill.book ? COMBAT_EFFECT_FRAMES.Arcano : COMBAT_EFFECT_FRAMES[skill.dt];

    if (frames) {
      const frameRun = Number(effectElement.dataset.frameRun || 0) + 1;
      effectElement.dataset.frameRun = String(frameRun);
      const frameImage = document.createElement('img');
      frameImage.className = `combat-effect-sprite${skill.meteor ? ' meteor-impact-sprite' : ''}`;
      frameImage.alt = '';
      effectElement.replaceChildren(frameImage);

      let frameIndex = 0;
      const showNextFrame = () => {
        if (effectElement.dataset.frameRun !== String(frameRun)) return;

        frameImage.src = `${COMBAT_EFFECT_BASE_URL}${frames[frameIndex]}.png`;
        frameIndex++;
        if (frameIndex < frames.length) setTimeout(showNextFrame, 70);
      };
      showNextFrame();
    } else {
      effectElement.innerHTML = svg;
    }

    playAnimation(effectElement, 'fxon');
  }

  function createSkillIconMarkup(skill) {
    const fallbackMarkup = createEffectMarkup(skill).svg;
    const sprite = skill.sprite
      ? SKILL_SPRITE_ALIASES[skill.sprite] || skill.sprite
      : skill.line !== undefined ? STARTER_SKILL_SPRITES[currentCharacter][skill.line] : '';
    if (!sprite) return fallbackMarkup;

    return `<img class="skill-sprite" src="${SKILL_SPRITE_BASE_URL}${sprite}.png" alt="" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><span hidden>${fallbackMarkup}</span>`;
  }

  let currentCharacter = 'solaris';
  let saveAvailable = false;
  let inventorySkillSlot = 0;
  let inventoryLoadoutChanged = false;
  function getCharacterName() {
    return currentCharacter === 'vanitas' ? 'Vanitas'
      : currentCharacter === 'jeanne' ? 'Jeanne'
        : currentCharacter === 'varek' ? 'Varek' : 'Solaris';
  }

  function getSkillTier() {
    if (currentCharacter === 'varek') return Math.min(10, Math.floor(level / 10));
    if (level >= 45) return 3;
    if (level >= 25) return 2;
    if (level >= 10) return 1;
    return 0;
  }

  function getStarterSkillLines() {
    if (currentCharacter === 'vanitas') return VANITAS_SKILL_LINES;
    if (currentCharacter === 'jeanne') return JEANNE_SKILL_LINES;
    if (currentCharacter === 'varek') return VAREK_SKILL_LINES;
    return SOLARIS_SKILL_LINES;
  }

  function getStarterSkillDefinitions() {
    if (currentCharacter === 'vanitas') return VANITAS_STARTER_SKILLS;
    if (currentCharacter === 'jeanne') return JEANNE_STARTER_SKILLS;
    if (currentCharacter === 'varek') return VAREK_STARTER_SKILLS;
    return SOLARIS_STARTER_SKILLS;
  }

  function getCurrentBaseSkills() {
    const tier = getSkillTier();
    const starterSkills = getStarterSkillDefinitions();
    return getStarterSkillLines().map((line, lineIndex) => {
      const currentTier = Math.min(tier, line.length - 1);
      return {
        ...line[currentTier],
        line: lineIndex,
        tier: currentTier,
        dt: starterSkills[lineIndex].dt,
      };
    });
  }

  function getCharacterSkills() {
    if (currentCharacter === 'vanitas') return VANITAS_SKILLS;
    if (currentCharacter === 'jeanne') return JEANNE_SKILLS;
    if (currentCharacter === 'varek') return VAREK_SKILLS.filter(skill => !skill.route || skill.route === varekPath);
    if (currentCharacter === 'solaris') return SOLARIS_SKILLS.filter(skill => !skill.route || skill.route === solarisPath);
    return SOLARIS_SKILLS;
  }
  const createStarterSkills = () => {
    const starterSkills = currentCharacter === 'vanitas'
      ? VANITAS_STARTER_SKILLS
      : currentCharacter === 'jeanne' ? JEANNE_STARTER_SKILLS
        : currentCharacter === 'varek' ? VAREK_STARTER_SKILLS : SOLARIS_STARTER_SKILLS;
    return starterSkills.map(skill => ({ ...skill }));
  };
  let activeSkills = createStarterSkills();

  function upgradeEquippedSkills() {
    const skillTier = getSkillTier();
    const upgrades = [];
    const skillLines = getStarterSkillLines();

    activeSkills = activeSkills.map(skill => {
      if (skill.line === undefined || skill.tier >= skillTier) return skill;

      const upgradedSkill = {
        ...skillLines[skill.line][skillTier],
        line: skill.line,
        tier: skillTier,
        dt: skill.dt,
      };
      upgrades.push(`${skill.n} → ${upgradedSkill.n}`);
      return upgradedSkill;
    });

    return upgrades;
  }

  function evolveJeanneSkills() {
    if (currentCharacter !== 'jeanne') return [];

    const targetStage = JEANNE_EVOLUTION_LEVELS.filter(evolutionLevel => level >= evolutionLevel).length;
    if (!targetStage) return [];

    const upgrades = [];
    const knownSkills = new Set([...unlockedSkills, ...activeSkills]);
    for (const skill of knownSkills) {
      if (!skill.evolves || (skill.evolutionStage || 0) >= targetStage) continue;

      const baseSkill = JEANNE_SKILLS.find(knownSkill => knownSkill.id === skill.id);
      const suffix = JEANNE_EVOLUTION_SUFFIXES[baseSkill?.dt]?.[targetStage - 1];
      if (!baseSkill || !suffix) continue;

      const previousName = skill.n;
      skill.n = `${baseSkill.n}: ${suffix}`;
      skill.p = Math.round(baseSkill.p * (1 + targetStage * .55));
      skill.c = baseSkill.c + targetStage;
      skill.a = Math.min(100, baseSkill.a + Math.floor(targetStage / 2));
      skill.cbonus = Math.min(30, (baseSkill.cbonus || 0) + targetStage * 2);
      if (baseSkill.dot) skill.dot = Math.round(baseSkill.dot * (1 + targetStage * .4));
      if (baseSkill.rmp) skill.rmp = Math.min(8, baseSkill.rmp + Math.floor(targetStage / 2));
      if (baseSkill.st) skill.stChance = Math.min(.7, .4 + targetStage * .05);
      if (baseSkill.barrier) skill.barrier = Math.round(baseSkill.barrier * (1 + targetStage * .35));
      if (baseSkill.heal) skill.heal = Math.round(baseSkill.heal * (1 + targetStage * .35));
      if (baseSkill.critNext) skill.critNext = Math.min(.65, baseSkill.critNext + targetStage * .04);
      skill.evolutionStage = targetStage;
      skill.d = `${baseSkill.d}\nEvolución ${targetStage}/6: alcanza su forma ${suffix.toLowerCase()}.`;
      upgrades.push(`${previousName} → ${skill.n}`);
    }

    return upgrades;
  }

  function transformVanitas(formId) {
    const form = VANITAS_FORMS[formId];
    if (currentCharacter !== 'vanitas' || !form) return null;

    if (!activeTransformation) {
      skillsBeforeTransformation = activeSkills.map(skill => ({ ...skill }));
    }

    activeTransformation = formId;
    transformationTurns = form.duration;
    activeSkills = form.skills.map(skill => ({ ...skill }));

    const playerImage = getElementById('kimg');
    playerImage.src = form.sprite;
    playerImage.alt = `Vanitas, ${form.name}`;
    return form;
  }

  function restoreVanitasForm() {
    if (!activeTransformation) return null;

    const form = VANITAS_FORMS[activeTransformation];
    activeTransformation = null;
    transformationTurns = 0;
    activeSkills = skillsBeforeTransformation || createStarterSkills();
    skillsBeforeTransformation = null;

    const playerImage = getElementById('kimg');
    playerImage.src = './sprites/bard.png';
    playerImage.alt = 'Vanitas, bardo';
    return form;
  }

  function advanceVanitasForm() {
    if (!activeTransformation) return null;

    transformationTurns--;
    return transformationTurns <= 0 ? restoreVanitasForm() : null;
  }

  const ZONE_BACKGROUND_FILTERS = [
    'brightness(0.85) saturate(1.1)', 'sepia(0.5) hue-rotate(15deg) brightness(0.7) saturate(0.8)', 
    'grayscale(0.6) contrast(1.2) brightness(0.6)', 'sepia(0.8) hue-rotate(-30deg) saturate(2) brightness(0.6)', 
    'grayscale(0.8) brightness(0.5) contrast(1.3) hue-rotate(180deg)', 'grayscale(1) brightness(0.4) sepia(0.3) hue-rotate(220deg)', 
    'hue-rotate(200deg) brightness(0.4) contrast(1.5) saturate(0.5)', 'hue-rotate(-50deg) saturate(2.5) brightness(0.5) contrast(1.2)', 
    'hue-rotate(280deg) saturate(1.5) brightness(0.5) contrast(1.4)', 'hue-rotate(250deg) saturate(2) brightness(0.3) contrast(1.8)'
  ];

  // Las recompensas aplican sus cambios al estado al terminar un combate.
  const REWARDS = [
    { name: 'Poción', description: 'Cura 35% de vida.', apply: () => bag.pot++ },
    { name: 'Superpoción', description: 'Cura 70% de vida.', apply: () => bag.sup++ },
    { name: 'Éter', description: 'Recupera 10 MP.', apply: () => bag.eter++ },
    {
      name: 'Pergamino Mágico',
      description: 'Contiene una habilidad aleatoria de tu personaje.',
      weight: SCROLL_REWARD_WEIGHT,
      apply: () => bag.scrolls++,
    },
    { name: 'Espada afilada', description: '+5 de ataque.', apply: () => bonuses.attack += 5 },
    { name: 'Armadura', description: '+6 de defensa.', apply: () => bonuses.def += 6 },
    {
      name: 'Corazón de acero',
      description: '+25 de vida máx.',
      apply: () => {
        bonuses.hp += 25;
        hp += 25;
      },
    },
    { name: 'Pluma de fénix', description: 'Revives una vez al caer.', apply: () => bag.fen++ },
    {
      name: 'Bomba de humo',
      description: 'Una salida limpia cuando la cosa se tuerce.',
      character: 'vanitas',
      apply: () => bag.smoke++,
    },
    {
      name: 'Trampa de cuerda',
      description: 'Deja sangrando al siguiente rival.',
      character: 'vanitas',
      apply: () => bag.trap++,
    },
    { name: 'Aceite de afilar', description: 'Mejora el arma desde la mochila.', apply: () => bag.bladeOil++ },
    {
      name: 'Tinta viva',
      description: 'Refuerza el Libro desde la mochila.',
      character: 'vanitas',
      apply: () => bag.bookInk++,
    },
    {
      name: 'Carta sangrienta',
      description: 'Aumenta un 3% la probabilidad de crítico de Varek.',
      character: 'varek',
      apply: () => bag.bloodLetter++,
    },
  ];

  const INVENTORY_ITEMS = [
    { id: 'pot', name: 'Poción', description: 'Recupera un 35% de la vida máxima.', category: 'consumable' },
    { id: 'sup', name: 'Superpoción', description: 'Recupera un 70% de la vida máxima.', category: 'consumable' },
    { id: 'eter', name: 'Éter', description: 'Recupera 10 puntos de maná.', category: 'consumable' },
    {
      id: 'smoke',
      name: 'Bomba de humo',
      description: 'Reduce el daño recibido durante el próximo turno.',
      category: 'consumable',
      character: 'vanitas',
    },
    {
      id: 'trap',
      name: 'Trampa de cuerda',
      description: 'Inflige sangrado al enemigo actual.',
      category: 'consumable',
      character: 'vanitas',
    },
    { id: 'bladeOil', name: 'Aceite de afilar', description: 'Aumenta el ataque base en 5.', category: 'upgrade' },
    {
      id: 'bookInk',
      name: 'Tinta viva',
      description: 'Aumenta un 10% el daño del Libro de Vanitas.',
      category: 'upgrade',
      character: 'vanitas',
    },
    {
      id: 'bloodLetter',
      name: 'Carta sangrienta',
      description: 'Aumenta un 3% la probabilidad de crítico de Varek.',
      category: 'upgrade',
      character: 'varek',
    },
    { id: 'scrolls', name: 'Pergamino', description: 'Aprende una habilidad de tu personaje.', category: 'consumable' },
    { id: 'fen', name: 'Pluma de fénix', description: 'Te devuelve una vez al combate si caes.', category: 'passive' },
  ];

  const isAvailableToCurrentCharacter = item =>
    !item.character || item.character === currentCharacter;
  const canReceiveInventoryItem = itemId => INVENTORY_ITEMS.some(item =>
    item.id === itemId && isAvailableToCurrentCharacter(item),
  );

  let level, hp, mp, bag, bonuses, enemy, stun;
  let playerStatuses = [];
  let companion = null;
  let activeTransformation = null;
  let skillsBeforeTransformation = null;
  let transformationTurns = 0;
  let corruption = 0;
  let nextCorruptionGain = 5;
  let frenzyTurns = 0;
  let vanitasPath = null;
  let vanitasPathRank = 0;
  let varekPath = null;
  let varekPathRank = 0;
  let solarisPath = null;
  let jeannePath = null;
  let best = 0;
  let parryHandler = null;
  let animationFrame;
  let parryAnimationToken = 0;
  let unlockedSkills = [];
  let lastParrySector = -1;
  try {
    best = Number(localStorage.getItem('kr')) || 0;
  } catch {}

  const saveBestScore = () => {
    try {
      localStorage.setItem('kr', best);
    } catch {}
  };

  const SAVE_DATA_FORMAT = 'rogueknight-save';
  const SAVE_DATA_VERSION = 4;
  const SAVE_BAG_KEYS = ['pot', 'sup', 'eter', 'fen', 'scrolls', 'smoke', 'trap', 'bladeOil', 'bookInk', 'bloodLetter'];
  const SAVE_BONUS_KEYS = ['hp', 'attack', 'def', 'vamp', 'crit', 'mp', 'bookPower'];
  const SAVE_PLAYER_STATUS_IDS = ['frenzy', 'smoke', 'barrier', 'witch-barrier', 'invulnerable', 'crit-next', 'roulette-attack', 'gambler-luck'];
  const SAVE_ENEMY_STATUS_IDS = ['poison', 'bleed', 'stun', 'sleep'];

  function requireSaveRecord(value, label) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      throw new Error(`${label} no es válido.`);
    }
    return value;
  }

  function requireSaveNumber(value, label, minimum, maximum, integer = false) {
    if (!Number.isFinite(value) || value < minimum || value > maximum || (integer && !Number.isInteger(value))) {
      throw new Error(`${label} no es válido.`);
    }
    return value;
  }

  function getSaveSkillSources(characterId) {
    if (characterId === 'vanitas') {
      return {
        lines: VANITAS_SKILL_LINES,
        starters: VANITAS_STARTER_SKILLS,
        skills: [...VANITAS_SKILLS, ...Object.values(VANITAS_FORMS).flatMap(form => form.skills)],
      };
    }
    if (characterId === 'jeanne') {
      return { lines: JEANNE_SKILL_LINES, starters: JEANNE_STARTER_SKILLS, skills: JEANNE_SKILLS };
    }
    if (characterId === 'varek') {
      return { lines: VAREK_SKILL_LINES, starters: VAREK_STARTER_SKILLS, skills: [...VAREK_STARTER_SKILLS, ...VAREK_SKILLS] };
    }
    return { lines: SOLARIS_SKILL_LINES, starters: SOLARIS_STARTER_SKILLS, skills: SOLARIS_SKILLS };
  }

  function restoreSaveSkill(savedSkill, characterId) {
    requireSaveRecord(savedSkill, 'Una habilidad guardada');
    const { lines, starters, skills } = getSaveSkillSources(characterId);

    if (Number.isInteger(savedSkill.line)) {
      const lineIndex = requireSaveNumber(savedSkill.line, 'Línea de habilidad', 0, 3, true);
      const tier = requireSaveNumber(savedSkill.tier, 'Nivel de habilidad', 0, characterId === 'varek' ? 10 : 3, true);
      const skill = lines[lineIndex]?.[tier];
      if (!skill) throw new Error('Una habilidad inicial no existe.');
      return { ...skill, line: lineIndex, tier, dt: starters[lineIndex].dt };
    }

    if (typeof savedSkill.id !== 'string') throw new Error('Una habilidad guardada no tiene identificador.');
    const skill = skills.find(candidate => candidate.id === savedSkill.id);
    if (!skill) throw new Error('El archivo contiene una habilidad que no pertenece a este personaje.');
    return { ...skill, ...(skill.evolves ? { evolutionStage: 0 } : {}) };
  }

  function restoreSaveSkillList(savedSkills, characterId, expectedLength) {
    if (!Array.isArray(savedSkills) || savedSkills.length !== expectedLength) {
      throw new Error('La lista de habilidades guardada no es válida.');
    }
    return savedSkills.map(skill => restoreSaveSkill(skill, characterId));
  }

  function restoreSaveStatuses(savedStatuses, allowedIds, label) {
    if (!Array.isArray(savedStatuses) || savedStatuses.length > 16) {
      throw new Error(`${label} no son válidos.`);
    }

    const seenIds = new Set();
    return savedStatuses.map(savedStatus => {
      requireSaveRecord(savedStatus, label);
      if (!allowedIds.includes(savedStatus.id) || seenIds.has(savedStatus.id)) {
        throw new Error(`${label} incluyen un estado no válido.`);
      }
      if (typeof savedStatus.label !== 'string' || savedStatus.label.length > 80) {
        throw new Error(`${label} incluyen una etiqueta no válida.`);
      }
      seenIds.add(savedStatus.id);

      const status = { id: savedStatus.id, label: savedStatus.label };
      for (const key of ['turns', 'damage', 'shield', 'maxShield', 'bonus']) {
        if (savedStatus[key] !== undefined) {
          status[key] = requireSaveNumber(savedStatus[key], 'Valor de estado', 0, 1_000_000_000_000);
        }
      }
      if (savedStatus.reduction !== undefined) {
        status.reduction = requireSaveNumber(savedStatus.reduction, 'Reducción de daño', 0, 100);
      }
      if (savedStatus.success !== undefined) {
        if (typeof savedStatus.success !== 'boolean') throw new Error('El resultado de suerte guardado no es válido.');
        status.success = savedStatus.success;
      }
      if (savedStatus.deferFirstTick !== undefined) {
        if (typeof savedStatus.deferFirstTick !== 'boolean') throw new Error('La duración guardada no es válida.');
        status.deferFirstTick = savedStatus.deferFirstTick;
      }
      return status;
    });
  }

  function getSaveData() {
    if (!saveAvailable || !level || !enemy) {
      throw new Error('Espera a que el combate esté listo antes de guardar.');
    }

    return {
      format: SAVE_DATA_FORMAT,
      version: SAVE_DATA_VERSION,
      savedAt: new Date().toISOString(),
      state: JSON.parse(JSON.stringify({
        currentCharacter,
        level,
        hp,
        mp,
        bag,
        bonuses,
        enemy,
        stun,
        playerStatuses,
        companion,
        activeTransformation,
        skillsBeforeTransformation,
        transformationTurns,
        corruption,
        nextCorruptionGain,
        frenzyTurns,
        vanitasPath,
        vanitasPathRank,
        varekPath,
        varekPathRank,
        solarisPath,
        jeannePath,
        best,
        unlockedSkills,
        activeSkills,
        lastParrySector,
      })),
    };
  }

  function loadSaveData(saveData) {
    requireSaveRecord(saveData, 'El archivo');
    if (saveData.format !== SAVE_DATA_FORMAT || ![1, 2, 3, SAVE_DATA_VERSION].includes(saveData.version)) {
      throw new Error('El archivo no es una partida compatible de RogueKnight.');
    }

    const savedState = requireSaveRecord(saveData.state, 'La partida');
    const characterId = savedState.currentCharacter;
    if (!['solaris', 'vanitas', 'jeanne', 'varek'].includes(characterId)) {
      throw new Error('El personaje guardado no existe.');
    }

    const savedLevel = requireSaveNumber(savedState.level, 'Ronda', 1, 100, true);
    const savedBonuses = requireSaveRecord(savedState.bonuses, 'Las mejoras');
    const restoredBonuses = Object.fromEntries(SAVE_BONUS_KEYS.map(key => [
      key,
      requireSaveNumber(savedBonuses[key], 'Una mejora', 0, 100000),
    ]));
    if (saveData.version === 1 && characterId === 'solaris') {
      restoredBonuses.hp = Math.max(0, restoredBonuses.hp - 20);
      restoredBonuses.def = Math.max(0, restoredBonuses.def - 10);
    }
    const maximumHealth = CHARACTER_BASE_STATS[characterId].hp + 4 * (savedLevel - 1) + restoredBonuses.hp;
    const maximumMana = CHARACTER_BASE_STATS[characterId].mp + restoredBonuses.mp;
    const restoredHealth = requireSaveNumber(savedState.hp, 'PV', 1, maximumHealth);
    const restoredMana = requireSaveNumber(savedState.mp, 'MP', 0, maximumMana);

    const savedBag = requireSaveRecord(savedState.bag, 'La mochila');
    const restoredBag = Object.fromEntries(SAVE_BAG_KEYS.map(key => [
      key,
      requireSaveNumber(savedBag[key] ?? (key === 'bloodLetter' ? 0 : undefined), 'Un objeto de la mochila', 0, 100000, true),
    ]));

    const savedEnemy = requireSaveRecord(savedState.enemy, 'El enemigo');
    const monster = Object.values(ZONES)
      .flatMap(zone => [...zone.m, ...zone.b])
      .find(candidate => candidate.n === savedEnemy.n);
    if (!monster || typeof savedEnemy.b !== 'boolean') throw new Error('El enemigo guardado no existe.');
    const monsterClass = MONSTER_CLASSES[monster.n] || 'Bestia';
    const savedMaximumEnemyHealth = requireSaveNumber(savedEnemy.mx, 'PV máximos del enemigo', 1, 1_000_000_000_000);
    const savedEnemyHealth = requireSaveNumber(savedEnemy.hp, 'PV del enemigo', 1, savedMaximumEnemyHealth);
    const savedEnemyAttack = requireSaveNumber(savedEnemy.attack, 'Ataque del enemigo', .1, 1_000_000_000_000);
    const currentEnemyStats = getEnemyCombatStats(savedLevel, savedEnemy.b);
    const maximumEnemyHealth = saveData.version < SAVE_DATA_VERSION
      ? currentEnemyStats.mx
      : savedMaximumEnemyHealth;
    const restoredEnemyHealth = saveData.version < SAVE_DATA_VERSION
      ? Math.max(1, Math.round(savedEnemyHealth / savedMaximumEnemyHealth * maximumEnemyHealth))
      : savedEnemyHealth;
    const restoredEnemyAttack = saveData.version < SAVE_DATA_VERSION
      ? currentEnemyStats.attack
      : savedEnemyAttack;
    const restoredEnemy = {
      n: monster.n,
      e: monster.e,
      u: monster.u,
      b: savedEnemy.b,
      cl: monsterClass,
      affinities: getMonsterAffinities(monster.n, monsterClass),
      mx: maximumEnemyHealth,
      hp: restoredEnemyHealth,
      attack: restoredEnemyAttack,
      statuses: restoreSaveStatuses(savedEnemy.statuses, SAVE_ENEMY_STATUS_IDS, 'Los estados del enemigo'),
    };

    const restoredStun = requireSaveNumber(savedState.stun, 'Aturdimiento', 0, 1, true);
    const restoredPlayerStatuses = restoreSaveStatuses(
      savedState.playerStatuses,
      SAVE_PLAYER_STATUS_IDS,
      'Los estados del jugador',
    );
    const restoredCompanion = savedState.companion === null
      ? null
      : (() => {
        const savedCompanion = requireSaveRecord(savedState.companion, 'El aliado');
        const companionMonster = Object.values(ZONES)
          .flatMap(zone => [...zone.m, ...zone.b])
          .find(candidate => candidate.n === savedCompanion.name);
        if (!companionMonster || characterId !== 'vanitas') throw new Error('El aliado guardado no es válido.');
        const maximumCompanionHealth = requireSaveNumber(savedCompanion.mx, 'PV máximos del aliado', 1, 1_000_000_000_000);
        return {
          name: companionMonster.n,
          sprite: MONSTER_SPRITES[companionMonster.n] || '',
          hp: requireSaveNumber(savedCompanion.hp, 'PV del aliado', 1, maximumCompanionHealth),
          mx: maximumCompanionHealth,
          damage: requireSaveNumber(savedCompanion.damage, 'Daño del aliado', 1, 100000),
        };
      })();

    const restoredTransformation = savedState.activeTransformation;
    if (restoredTransformation !== null
      && (characterId !== 'vanitas' || !Object.hasOwn(VANITAS_FORMS, restoredTransformation))) {
      throw new Error('La transformación guardada no existe.');
    }
    const restoredTransformationTurns = requireSaveNumber(
      savedState.transformationTurns,
      'Turnos de transformación',
      0,
      100,
      true,
    );
    if ((restoredTransformation === null) !== (restoredTransformationTurns === 0)) {
      throw new Error('La duración de la transformación no es válida.');
    }

    const restoredActiveSkills = restoreSaveSkillList(savedState.activeSkills, characterId, 4);
    const restoredUnlockedSkills = restoreSaveSkillList(
      savedState.unlockedSkills,
      characterId,
      savedState.unlockedSkills?.length,
    );
    if (restoredUnlockedSkills.length > 100) throw new Error('La partida contiene demasiadas habilidades.');

    let restoredSkillsBeforeTransformation = null;
    if (restoredTransformation !== null) {
      restoredSkillsBeforeTransformation = restoreSaveSkillList(savedState.skillsBeforeTransformation, characterId, 4);
      const formSkillIds = new Set(VANITAS_FORMS[restoredTransformation].skills.map(skill => skill.id));
      if (restoredActiveSkills.some(skill => !formSkillIds.has(skill.id))) {
        throw new Error('Las habilidades de la transformación no son válidas.');
      }
    } else if (savedState.skillsBeforeTransformation !== null) {
      throw new Error('La partida contiene una forma anterior inesperada.');
    }

    const restoredCorruption = requireSaveNumber(savedState.corruption, 'Corrupción', 0, 100);
    const restoredFrenzyTurns = requireSaveNumber(savedState.frenzyTurns, 'Turnos de frenesí', 0, 3, true);
    const restoredNextCorruptionGain = requireSaveNumber(savedState.nextCorruptionGain, 'Próxima corrupción', 1, 100000);
    const restoredVanitasPath = savedState.vanitasPath;
    if (restoredVanitasPath !== null && !['blessing', 'curse'].includes(restoredVanitasPath)) {
      throw new Error('La ruta del Libro no es válida.');
    }
    const restoredVanitasPathRank = requireSaveNumber(savedState.vanitasPathRank, 'Rango de ruta', 0, 4, true);
    if (characterId !== 'vanitas'
      && (restoredCorruption || restoredFrenzyTurns || restoredVanitasPath || restoredVanitasPathRank)) {
      throw new Error('El archivo contiene estados exclusivos de Vanitas en otro personaje.');
    }
    const restoredVarekPath = savedState.varekPath ?? null;
    if (restoredVarekPath !== null && !['ludopata', 'baskerville'].includes(restoredVarekPath)) {
      throw new Error('La ruta de Varek no es válida.');
    }
    const restoredVarekPathRank = requireSaveNumber(savedState.varekPathRank ?? 0, 'Rango de ruta de Varek', 0, 4, true);
    if (characterId !== 'varek' && (restoredVarekPath || restoredVarekPathRank)) {
      throw new Error('El archivo contiene estados exclusivos de Varek en otro personaje.');
    }
    const restoredSolarisPath = savedState.solarisPath ?? null;
    if (restoredSolarisPath !== null && !['crusader', 'warden'].includes(restoredSolarisPath)) {
      throw new Error('La ruta del Caballero no es válida.');
    }
    const restoredJeannePath = savedState.jeannePath ?? null;
    if (restoredJeannePath !== null && !['tower', 'star'].includes(restoredJeannePath)) {
      throw new Error('La ruta de la Bruja no es válida.');
    }
    if ((characterId !== 'solaris' && restoredSolarisPath)
      || (characterId !== 'jeanne' && restoredJeannePath)) {
      throw new Error('La partida contiene una ruta de otro personaje.');
    }
    if ((restoredVarekPath === null) !== (restoredVarekPathRank === 0)
      || (characterId === 'varek' && [...restoredActiveSkills, ...restoredUnlockedSkills]
        .some(skill => skill.route && skill.route !== restoredVarekPath))) {
      throw new Error('Las habilidades guardadas no coinciden con la ruta de Varek.');
    }
    if ((characterId === 'solaris' && [...restoredActiveSkills, ...restoredUnlockedSkills]
      .some(skill => skill.route && skill.route !== restoredSolarisPath))
      || (characterId === 'jeanne' && [...restoredActiveSkills, ...restoredUnlockedSkills]
        .some(skill => skill.route && skill.route !== restoredJeannePath))) {
      throw new Error('Las habilidades guardadas no coinciden con la ruta del personaje.');
    }

    currentCharacter = characterId;
    level = savedLevel;
    hp = restoredHealth;
    mp = restoredMana;
    bag = restoredBag;
    bonuses = restoredBonuses;
    enemy = restoredEnemy;
    stun = restoredStun;
    playerStatuses = restoredPlayerStatuses;
    companion = restoredCompanion;
    activeTransformation = restoredTransformation;
    skillsBeforeTransformation = restoredSkillsBeforeTransformation;
    transformationTurns = restoredTransformationTurns;
    corruption = restoredCorruption;
    frenzyTurns = restoredFrenzyTurns;
    nextCorruptionGain = restoredNextCorruptionGain;
    vanitasPath = restoredVanitasPath;
    vanitasPathRank = restoredVanitasPathRank;
    varekPath = restoredVarekPath;
    varekPathRank = restoredVarekPathRank;
    solarisPath = restoredSolarisPath;
    jeannePath = restoredJeannePath;
    best = Math.max(requireSaveNumber(savedState.best, 'Mejor ronda', 0, 100, true), best);
    unlockedSkills = restoredUnlockedSkills;
    activeSkills = restoredActiveSkills;
    lastParrySector = requireSaveNumber(savedState.lastParrySector, 'Última posición de parry', -1, 3, true);
    parryHandler = null;
    cancelAnimationFrame(animationFrame);

    const playerImage = getElementById('kimg');
    const activeForm = activeTransformation ? VANITAS_FORMS[activeTransformation] : null;
    playerImage.src = activeForm?.sprite || (currentCharacter === 'vanitas'
      ? './sprites/bard.png'
      : currentCharacter === 'jeanne' ? './sprites/witch.png'
        : currentCharacter === 'varek' ? './sprites/gambler.png' : './sprites/knight.png');
    playerImage.alt = activeForm
      ? `Vanitas, ${activeForm.name}`
      : currentCharacter === 'vanitas' ? 'Vanitas, bardo'
        : currentCharacter === 'jeanne' ? 'Jeanne, bruja'
          : currentCharacter === 'varek' ? 'Varek, Gambler' : 'Solaris, caballero';
    getElementById('kw').classList.toggle('vanitas-player', currentCharacter === 'vanitas');
    getElementById('kw').classList.toggle('witch-player', currentCharacter === 'jeanne');
    getElementById('kw').classList.toggle('gambler-player', currentCharacter === 'varek');
    getElementById('kw').classList.remove('faint');
    getElementById('en').classList.remove('faint');

    if (currentCharacter === 'jeanne') evolveJeanneSkills();
    renderEnemy();
    updateZone();
    renderInterface();
    saveBestScore();
    lockCombatControls();
    showCombatActions();
    return currentCharacter;
  }

  const CHARACTER_BASE_STATS = {
    solaris: { hp: 80, mp: 20, physicalAttack: 30, magicAttack: 5, defense: 25, crit: 3 },
    jeanne: { hp: 30, mp: 70, physicalAttack: 5, magicAttack: 30, defense: 5, crit: 8 },
    vanitas: { hp: 60, mp: 36, physicalAttack: 15, magicAttack: 15, defense: 8, crit: 16 },
    varek: { hp: 75, mp: 25, physicalAttack: 22, magicAttack: 8, defense: 20, crit: 10 },
  };

  function getCharacterBaseStats() {
    return CHARACTER_BASE_STATS[currentCharacter];
  }

  function getMaxHealth() {
    return getCharacterBaseStats().hp + 4 * (level - 1) + bonuses.hp;
  }

  function getMaxMana() {
    return getCharacterBaseStats().mp + bonuses.mp;
  }

  function getPhysicalAttack() {
    const temporaryAttack = findStatusEffect(playerStatuses, 'roulette-attack')?.bonus || 0;
    const routeAttack = currentCharacter === 'varek' && varekPath === 'baskerville' ? varekPathRank * 2 : 0;
    const attack = getCharacterBaseStats().physicalAttack + 0.7 * (level - 1) + bonuses.attack + temporaryAttack + routeAttack;
    return Math.round(currentCharacter === 'solaris' && solarisPath === 'crusader' ? attack * 1.1 : attack);
  }

  function getMagicAttack() {
    const attack = getCharacterBaseStats().magicAttack + 0.7 * (level - 1);
    return Math.round(currentCharacter === 'jeanne' && jeannePath === 'tower' ? attack * 1.1 : attack);
  }

  function getSkillAttackPower(skill) {
    return skill.t === 'fis' ? getPhysicalAttack() : getMagicAttack();
  }

  function getSkillProgressionMultiplier(skill) {
    if (currentCharacter !== 'varek' || !skill.starter) return 1;
    return getVarekStarterDamageMultiplier(level);
  }

  function getDefense() {
    const defense = getCharacterBaseStats().defense + bonuses.def;
    return Math.round(currentCharacter === 'solaris' && solarisPath === 'warden' ? defense * 1.1 : defense);
  }

  function getCriticalChancePercent() {
    return getCharacterBaseStats().crit + bonuses.crit;
  }

  function getJeanneManaRegen() {
    return 3 + Math.floor(level / 10);
  }

  function getBookDamageMultiplier() {
    return 1.35 + (bonuses.bookPower || 0) / 100;
  }

  function getStatusDamageMultiplier() {
    if (currentCharacter === 'vanitas') return 1.5;
    if (currentCharacter === 'jeanne' && jeannePath === 'star') return 1.1;
    return currentCharacter === 'varek' && varekPath === 'baskerville' ? 1 + varekPathRank * .1 : 1;
  }

  function getSkillDamageTypes(skill) {
    const damageTypes = skill.damageTypes || String(skill.dt).split(' + ');
    if (currentCharacter === 'solaris' && solarisPath === 'crusader' && skill.t !== 'sup') {
      return [...new Set([...damageTypes, 'Sagrado'])];
    }
    return damageTypes;
  }

  function getSkillAffinityMultiplier(skill) {
    const damageTypes = getSkillDamageTypes(skill);
    return damageTypes.reduce((total, type) => total + getAffinityMultiplier(enemy, type), 0) / damageTypes.length;
  }

  function getZoneIndex() {
    return Math.min(9, Math.floor((level - 1) / 10));
  }

  function setCombatMessage(message) {
    getElementById('log').textContent = message;
  }

  function playAnimation(element, className) {
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
  }

  function showActionDetails(description, damage) {
    const descriptionOutput = getElementById('dsc');
    const content = document.createElement('span');
    content.className = 'description-cascade-content';
    content.textContent = description;
    descriptionOutput.replaceChildren(content);
    descriptionOutput.classList.remove('description-cascade');
    requestAnimationFrame(() => {
      if (descriptionOutput.firstElementChild !== content) return;
      const overflow = descriptionOutput.scrollHeight > descriptionOutput.clientHeight + 1;
      descriptionOutput.classList.toggle('description-cascade', overflow);
      if (overflow) {
        const distance = descriptionOutput.scrollHeight - descriptionOutput.clientHeight;
        content.style.setProperty('--cascade-distance', `${distance}px`);
        content.style.setProperty('--cascade-duration', `${Math.max(6, distance / 12)}s`);
      }
    });
    getElementById('dmg').textContent = damage;
  }

  function addStatusEffect(effects, effect) {
    const currentEffect = effects.find(existing => existing.id === effect.id);
    if (currentEffect) {
      currentEffect.turns = Math.max(currentEffect.turns, effect.turns);
      currentEffect.damage = Math.max(currentEffect.damage || 0, effect.damage || 0);
      return currentEffect;
    }

    effects.push({ ...effect });
    return effect;
  }

  function findStatusEffect(effects, effectId) {
    return effects.find(effect => effect.id === effectId);
  }

  function removeStatusEffect(effects, effectId) {
    const index = effects.findIndex(effect => effect.id === effectId);
    if (index !== -1) effects.splice(index, 1);
  }

  const STATUS_ICON_FILES = {
    poison: 'status_poison.png',
    bleed: 'status_bleed.png',
    stun: 'status_stun.png',
    frenzy: 'status_frenzy.png',
    corruption: 'status_corruption.png',
    transformation: 'status_transformation.png',
    smoke: 'status_smoke.png',
    barrier: 'status_barrier.png',
    'crit-next': 'status_crit-next.png',
  };

  function renderStatusIndicators(containerId, effects) {
    const container = getElementById(containerId);
    container.replaceChildren(...effects.map(effect => {
      const chip = document.createElement('span');
      chip.className = `effect-chip effect-chip--${effect.id}`;
      const label = document.createElement('span');
      label.textContent = effect.turns ? `${effect.label} ${effect.turns}t` : effect.label;
      chip.append(label);

      const iconFile = effect.id === 'poison' && effect.label === 'Fuego'
        ? 'status_fire.png'
        : effect.id === 'poison' && effect.label === 'Hielo'
          ? 'status_ice.png'
          : STATUS_ICON_FILES[effect.id];
      if (iconFile) {
        const icon = document.createElement('img');
        icon.className = 'effect-chip-icon';
        icon.src = `./sprites/effects/${iconFile}`;
        icon.alt = '';
        icon.setAttribute('aria-hidden', 'true');
        chip.append(icon);
      }
      return chip;
    }));
    container.hidden = effects.length === 0;
  }

  function renderCombatStatuses() {
    const enemyStatuses = [...(enemy?.statuses || [])];
    if (stun && !findStatusEffect(enemyStatuses, 'stun')) {
      enemyStatuses.push({ id: 'stun', label: 'Aturdido', turns: 1 });
    }
    const playerEffects = [...playerStatuses];
    if (corruption > 0 && currentCharacter === 'vanitas') {
      playerEffects.push({ id: 'corruption', label: `Corrupción ${corruption}%` });
    }
    if (activeTransformation && currentCharacter === 'vanitas') {
      playerEffects.push({
        id: 'transformation',
        label: VANITAS_FORMS[activeTransformation].name,
      });
    }
    renderStatusIndicators('status-player', playerEffects);
    getElementById('status-player').setAttribute('aria-label', `Estados de ${getCharacterName()}`);
    renderStatusIndicators('status-enemy', enemyStatuses);
    renderCorruptionMeter();
    renderCompanion();
  }

  function renderCorruptionMeter() {
    const meter = getElementById('vanitas-meter');
    const isVanitas = currentCharacter === 'vanitas';
    meter.hidden = !isVanitas;
    if (!isVanitas) return;

    const value = Math.round(corruption);
    getElementById('corruption-value').textContent = `${value}%`;
    const fill = getElementById('corruption-fill');
    fill.style.width = `${value}%`;
    fill.parentElement.setAttribute('aria-valuenow', value);
    fill.parentElement.setAttribute('aria-valuetext', `${value}%`);
    meter.classList.toggle('is-frenzied', frenzyTurns > 0);
  }

  async function useBookPage() {
    if (currentCharacter !== 'vanitas' || frenzyTurns > 0) return;

    corruption = Math.min(100, corruption + nextCorruptionGain);
    nextCorruptionGain *= 2;
    if (corruption >= 100) {
      frenzyTurns = 3;
      addStatusEffect(playerStatuses, { id: 'frenzy', label: 'Frenesí', turns: frenzyTurns });
      await typeMessage('El Libro se abre por completo. Vanitas entra en frenesí.');
    }
    renderInterface();
  }

  const ZONE_BACKGROUNDS=[null,
  'radial-gradient(ellipse getAttackPower 50% 56%,rgba(90,150,130,.35),transparent 55%),linear-gradient(#0d1618,#1c2e2e 55%,#2b3b37 55%,#141e1c)',
  'radial-gradient(ellipse getAttackPower 20% 30%,rgba(255,170,80,.25),transparent 30%),radial-gradient(ellipse getAttackPower 80% 40%,rgba(255,170,80,.18),transparent 30%),linear-gradient(#1a120d,#3a2718 56%,#4a3420 56%,#1d130c)',
  'radial-gradient(ellipse getAttackPower 50% 55%,rgba(160,200,80,.3),transparent 50%),linear-gradient(#12200f,#28401f 54%,#33472a 54%,#101a0d)',
  'radial-gradient(circle getAttackPower 75% 25%,rgba(230,230,255,.85) 0 3%,transparent 3.5%),linear-gradient(#141222,#2c2440 56%,#3a3350 56%,#15121f)',
  'radial-gradient(ellipse getAttackPower 30% 60%,rgba(120,255,200,.3),transparent 25%),radial-gradient(ellipse getAttackPower 75% 55%,rgba(200,90,255,.3),transparent 28%),linear-gradient(#0c0818,#1d1236 56%,#241947 56%,#0b0716)',
  'radial-gradient(circle getAttackPower 30% 20%,rgba(255,255,255,.9) 0 2%,transparent 2.5%),linear-gradient(#86b6e0,#cfe6f7 56%,#eef6fc 56%,#a9c6dc)',
  'radial-gradient(ellipse getAttackPower 50% 58%,rgba(255,140,30,.6),transparent 55%),linear-gradient(#2a0d06,#7a2a0c 56%,#3b1207 56%,#1c0803)',
  'radial-gradient(ellipse getAttackPower 50% 60%,rgba(220,20,40,.45),transparent 55%),linear-gradient(#150208,#3c0714 56%,#4a0a1a 56%,#12020a)',
  'radial-gradient(circle getAttackPower 20% 20%,#fff 0 .4%,transparent .6%),radial-gradient(circle getAttackPower 70% 30%,#fff 0 .4%,transparent .6%),radial-gradient(circle getAttackPower 45% 12%,#fff 0 .3%,transparent .5%),radial-gradient(ellipse getAttackPower 50% 56%,rgba(120,80,255,.4),transparent 50%),linear-gradient(#05040f,#120a30 56%,#1a1040 56%,#06040f)'];
  function updateZone() {
    const zoneIndex = getZoneIndex();
    const zoneBackground = getElementById('bgc');
    const forestBackground = getElementById('bg');

    forestBackground.style.display = zoneIndex ? 'none' : '';
    zoneBackground.style.display = zoneIndex ? 'block' : 'none';
    zoneBackground.style.background = zoneIndex ? ZONE_BACKGROUNDS[zoneIndex] : '';
    forestBackground.style.filter = ZONE_BACKGROUND_FILTERS[0];
  }
  function updateBar(id, fraction, color) {
    const fill = getElementById(id);
    const percentage = Math.round(Math.max(0, Math.min(1, fraction)) * 100);
    fill.style.width = percentage + '%';
    fill.parentElement.setAttribute('aria-valuenow', percentage);
    fill.parentElement.setAttribute('aria-valuetext', percentage + '%');
    if (color) fill.style.background = fraction > .5 ? 'var(--ok)' : fraction > .2 ? 'var(--mid)' : 'var(--bad)';
  }

  function renderInterface() {
    getElementById('rn').textContent = `Ronda ${level}/100`;
    getElementById('zn').textContent = ZONES[getZoneIndex()].z;
    getElementById('enm').textContent = `${enemy.n} · ${enemy.cl}`;
    getElementById('enl').textContent = `Nv${level}`;
    updateBar('ebar', enemy.hp / enemy.mx, 1);
    getElementById('pl').textContent = `${getCharacterName()} · Nv ${level}`;
    updateBar('pbar', hp / getMaxHealth(), 1);
    getElementById('php').textContent = `${Math.max(0, hp)}/${getMaxHealth()}`;
    const witchBarrier = findStatusEffect(playerStatuses, 'witch-barrier');
    const witchBarrierMeter = getElementById('witch-barrier-meter');
    witchBarrierMeter.hidden = !witchBarrier;
    if (witchBarrier) {
      getElementById('witch-barrier-value').textContent = `${witchBarrier.shield}/${witchBarrier.maxShield} PV`;
      updateBar('witch-barrier-fill', witchBarrier.shield / witchBarrier.maxShield);
    }
    updateBar('mpb', mp / getMaxMana());
    getElementById('mpt').textContent = `${mp}/${getMaxMana()}`;
    renderCombatStatuses();
    renderCompanion();
  }
  function createJeanneBarrier() {
    if (currentCharacter !== 'jeanne' || level % 10 !== 0) return 0;

    const shield = Math.round((getMaxHealth() + getDefense()) * 3);
    removeStatusEffect(playerStatuses, 'witch-barrier');
    addStatusEffect(playerStatuses, {
      id: 'witch-barrier',
      label: `Barrera mágica ${shield} PV`,
      shield,
      maxShield: shield,
    });
    return shield;
  }

  async function typeMessage(message, milliseconds = 700) {
    const messageOutput = getElementById('log');
    messageOutput.textContent = '';
    for (const character of message) {
      messageOutput.textContent += character;
      await waitForDelay(12);
    }
    await waitForDelay(milliseconds);
  }

  function applySkillRarity(element, skill) {
    if (skill.rarity && Object.hasOwn(SKILL_RARITIES, skill.rarity)) {
      element.classList.add(`skill-rarity-${skill.rarity}`);
    }
  }

  function renderActionMenu(items, menuVariant = '') {
    const grid = getElementById('grid');
    grid.classList.toggle('grimoire-menu', menuVariant === 'grimoire');
    grid.replaceChildren(...items.map(({ t: label, s: subtitle, d: isDisabled, k: isBack, f: action, h: onHover, rarity }) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.innerHTML = `${label}${subtitle ? `<small>${subtitle}</small>` : ''}`;
      button.disabled = Boolean(isDisabled);
      if (isBack) button.className = 'back';
      if (rarity && Object.hasOwn(SKILL_RARITIES, rarity)) button.classList.add(`skill-rarity-${rarity}`);
      button.onclick = action;
      if (onHover) button.onmouseenter = button.onfocus = onHover;
      return button;
    }));
  }
  const lockCombatControls = () => {
    saveAvailable = false;
    getElementById('grid').replaceChildren();
    getElementById('bagb').disabled = true;
    getElementById('return-menu').disabled = true;
  };

  function spawnEnemy() {
    const zoneIndex = getZoneIndex();
    const isBoss = level % 10 === 0;
    const zone = ZONES[zoneIndex];
    const encounterPool = isBoss ? zone.b : zone.m;
    const monster = encounterPool[Math.floor(Math.random() * encounterPool.length)];
    const { n: monsterName, e: monsterEmoji } = monster;

    const combatStats = getEnemyCombatStats(level, isBoss);
    const monsterClass = MONSTER_CLASSES[monsterName] || 'Bestia';

    enemy = {
      n: monsterName,
      e: monsterEmoji,
      u: monster.u,
      b: isBoss,
      cl: monsterClass,
      affinities: getMonsterAffinities(monsterName, monsterClass),
      mx: combatStats.mx,
      attack: combatStats.attack,
      statuses: [],
    };
    enemy.hp = enemy.mx;
    stun = 0;
    renderEnemy();
  }

  function renderEnemy() {
    const { n: monsterName, e: monsterEmoji, b: isBoss } = enemy;
    const enemyImage = getElementById('eimg');
    const imageSource = MONSTER_SPRITES[monsterName] || (enemy.u ? MONSTER_SPRITE_BASE_URL + enemy.u : '');
    const enemyEmoji = getElementById('eemo');
    enemyEmoji.textContent = '';
    enemyImage.style.display = '';
    enemyImage.onerror = () => {
      enemyImage.style.display = 'none';
      enemyEmoji.textContent = monsterEmoji;
      console.warn('Sprite no encontrado:', monsterName, imageSource);
    };
    if (imageSource) enemyImage.src = imageSource;
    else enemyImage.onerror();

    const enemyElement = getElementById('en');
    enemyElement.classList.toggle('boss', isBoss);
    enemyElement.classList.remove('is-possessed');
    getElementById('pfe').style.background = isBoss
      ? 'radial-gradient(rgba(255,0,0,0.4) 20%,transparent 70%)'
      : 'radial-gradient(rgba(0,0,0,0.7) 20%,transparent 70%)';
    enemyElement.classList.remove('faint');
  }

  function renderCompanion() {
    const companionElement = getElementById('ally');
    document.querySelector('.scene').classList.toggle('has-companion', Boolean(companion));
    companionElement.hidden = !companion;
    if (!companion) return;

    const companionImage = getElementById('allyimg');
    companionImage.style.display = companion.sprite ? '' : 'none';
    companionImage.src = companion.sprite || '';
    companionImage.alt = companion.name;
    companionImage.onerror = () => {
      companionImage.style.display = 'none';
    };
    getElementById('ally-name').textContent = companion.name;
    getElementById('ally-turns').textContent = 'Reescrito';
    getElementById('ally-health-text').textContent = `${Math.max(0, companion.hp)}/${companion.mx} PV`;
    updateBar('ally-hpbar', companion.hp / companion.mx, 1);
  }

  function rewriteCurrentEnemy() {
    if (currentCharacter !== 'vanitas' || enemy.b || companion) return false;

    const enemyImage = getElementById('eimg');
    companion = {
      name: enemy.n,
      sprite: enemyImage.currentSrc || enemyImage.src,
      hp: enemy.hp,
      mx: enemy.mx,
      damage: Math.max(1, Math.round(getPhysicalAttack() * (0.4 + (vanitasPath === 'curse' ? vanitasPathRank * .05 : 0)))),
    };
    spawnEnemy();
    renderInterface();
    return true;
  }

  function applyIncomingDamage(damage, routeToCompanion = true) {
    if (findStatusEffect(playerStatuses, 'invulnerable')) {
      return { recipient: 'invulnerable', damage: 0, absorbed: 0 };
    }
    if (routeToCompanion && companion) {
      const companionName = companion.name;
      companion.hp -= damage;
      const defeated = companion.hp <= 0;
      if (defeated) companion = null;
      return { recipient: 'companion', companionName, damage, defeated };
    }

    let remainingDamage = damage;
    let absorbed = 0;
    let witchBarrierAbsorbed = 0;
    const witchBarrier = findStatusEffect(playerStatuses, 'witch-barrier');
    if (witchBarrier) {
      witchBarrierAbsorbed = Math.min(remainingDamage, witchBarrier.shield);
      witchBarrier.shield -= witchBarrierAbsorbed;
      remainingDamage -= witchBarrierAbsorbed;
      absorbed += witchBarrierAbsorbed;
      witchBarrier.label = `Barrera mágica ${witchBarrier.shield} PV`;
      if (witchBarrier.shield <= 0) removeStatusEffect(playerStatuses, 'witch-barrier');
    }

    const barrier = findStatusEffect(playerStatuses, 'barrier');
    const reduction = barrier?.reduction || 0;
    remainingDamage = Math.round(remainingDamage * (1 - reduction / 100));
    const barrierAbsorbed = barrier ? Math.min(remainingDamage, barrier.shield) : 0;
    remainingDamage -= barrierAbsorbed;
    absorbed += barrierAbsorbed;

    if (barrier) {
      barrier.reduction = 0;
      barrier.shield -= barrierAbsorbed;
      barrier.label = `Barrera ${barrier.shield} PV`;
      if (barrier.shield <= 0) removeStatusEffect(playerStatuses, 'barrier');
    }
    if (remainingDamage > 0) hp -= remainingDamage;

    return {
      recipient: remainingDamage ? 'player' : absorbed ? 'barrier' : 'player',
      damage: remainingDamage,
      absorbed: barrierAbsorbed,
      totalAbsorbed: absorbed,
      witchBarrierAbsorbed,
      barrierBroken: Boolean(barrier && barrier.shield <= 0),
      witchBarrierBroken: Boolean(witchBarrier && witchBarrier.shield <= 0),
    };
  }

  function getIncomingDamageMessage(result) {
    if (result.recipient === 'invulnerable') return `${getCharacterName()} no recibe daño gracias al Bastión del Señor.`;
    const witchBarrierMessage = result.witchBarrierAbsorbed
      ? `La barrera mágica absorbe ${result.witchBarrierAbsorbed} de daño${result.witchBarrierBroken ? ' y se rompe' : ''}. `
      : '';
    const barrierMessage = result.absorbed
      ? `La barrera absorbe ${result.absorbed} de daño${result.barrierBroken ? ' y se rompe' : ''}. `
      : '';
    if (result.recipient === 'barrier') return `${witchBarrierMessage}${barrierMessage}${getCharacterName()} no recibe daño.`;
    if (result.recipient === 'player') return `${witchBarrierMessage}${barrierMessage}${getCharacterName()} recibe ${result.damage} de daño.`;
    return result.defeated
      ? `${result.companionName} recibe ${result.damage} de daño y cae. La reescritura termina.`
      : `${result.companionName} recibe ${result.damage} de daño.`;
  }

  async function companionAttack() {
    if (!companion) return;

    const companionDamage = Math.max(1, Math.round(companion.damage * (frenzyTurns ? 2 : 1)));
    enemy.hp -= companionDamage;
    playAnimation(getElementById('en'), 'hit');
    renderInterface();
    await typeMessage(`${companion.name} te cubre y causa ${companionDamage} de daño.`);

  }

  async function tickDamageStatuses(statuses, targetLabel, applyDamage) {
    for (const effect of [...statuses]) {
      if (effect.damage && effect.turns > 0) {
        const damageResult = applyDamage(effect.damage, effect);
        const damageDealt = typeof damageResult === 'number' ? damageResult : damageResult.damage;
        renderInterface();
        const damageMessage = typeof damageResult === 'number'
          ? `${targetLabel} sufre ${effect.damage} de ${effect.label.toLowerCase()}.`
          : `${targetLabel} sufre ${effect.label.toLowerCase()}. ${getIncomingDamageMessage(damageResult)}`;
        await typeMessage(damageMessage);
        if (currentCharacter === 'varek' && targetLabel === enemy.n && effect.id === 'bleed' && damageDealt > 0) {
          const restoredHealth = Math.min(damageDealt, getMaxHealth() - hp);
          hp += restoredHealth;
          mp = Math.min(getMaxMana(), mp + 1);
          renderInterface();
          await typeMessage(`Alimentación Vampírica: Varek recupera ${restoredHealth} PV y 1 MP.`);
        }
      }

      if (effect.turns !== undefined && effect.id !== 'frenzy') {
        if (tickStatusDuration(effect)) removeStatusEffect(statuses, effect.id);
      }
    }
  }

  function showCombatActions() {
    setCombatMessage('');
    showActionDetails('Elige un ataque.', '—');
    getElementById('bagb').disabled = false;

    const skillActions = activeSkills.map(skill => {
      const manaCost = skill.allManaCost ? mp : skill.book && frenzyTurns > 0 ? 0 : skill.c;
      const rewriteBlocked = skill.rewrite && (companion || enemy.b);
      const isSupportSkill = Boolean(
        skill.baraja || skill.barrier || skill.heal || skill.critNext || skill.luckNext
        || skill.allManaCost || skill.fullHeal || skill.healPercent || skill.cleanse || skill.sleep || skill.invulnerable,
      );
      return {
        t: `<span class="ic">${createSkillIconMarkup(skill)}</span>${skill.n}`,
        s: rewriteBlocked ? `${skill.dt} · ${companion ? 'Aliado activo' : 'Jefe inmune'}` : `${skill.dt} · MP ${manaCost}`,
        rarity: skill.rarity,
        d: mp < manaCost || (skill.allManaCost && mp === 0) || rewriteBlocked,
        f: () => castSkill(skill),
        h: () => {
          if (isSupportSkill) {
            showActionDetails(skill.d, '—');
            return;
          }
          const multiplier = getSkillAffinityMultiplier(skill);
          const skillAttackPower = getSkillAttackPower(skill);
          const baseDamage = skill.directMultiplier ? skill.directMultiplier * getPhysicalAttack() : skill.p * skillAttackPower / 10;
          const progressionMultiplier = getSkillProgressionMultiplier(skill);
          const minimumDamage = Math.max(1, Math.round(baseDamage * progressionMultiplier * .85 * multiplier));
          const maximumDamage = Math.max(1, Math.round(baseDamage * progressionMultiplier * 1.15 * multiplier));
          const damageTypes = getSkillDamageTypes(skill).join(' + ');
          const description = `${skill.d}\nTipo: ${damageTypes} · ${getAffinityLabel(multiplier)} (x${multiplier.toFixed(2)})`;
          showActionDetails(description, `${minimumDamage}–${maximumDamage}`);
        },
      };
    });

    renderActionMenu(skillActions);
    saveAvailable = true;
    getElementById('return-menu').disabled = false;
  }

  getElementById('bagb').onclick = openInventoryModal;

  function openInventoryModal() {
    renderInventory();
    const modal = getElementById('inventory-modal');
    modal.hidden = false;
    getElementById('c').classList.add('inventory-open');
    getElementById('inventory-close').focus();
  }

  function closeInventoryModal() {
    getElementById('inventory-modal').hidden = true;
    getElementById('c').classList.remove('inventory-open');
    if (inventoryLoadoutChanged) {
      inventoryLoadoutChanged = false;
      showCombatActions();
    }
    getElementById('bagb').focus();
  }

  function renderInventory() {
    const activePath = vanitasPath === 'blessing'
      ? `Bendición · rango ${vanitasPathRank}`
      : vanitasPath === 'curse'
        ? `Maldición · rango ${vanitasPathRank}`
        : currentCharacter === 'vanitas' ? 'Elige una ruta en la ronda 11'
          : currentCharacter === 'varek'
            ? varekPath === 'ludopata' ? `Ruta del Ludópata · rango ${varekPathRank}`
              : varekPath === 'baskerville' ? `Ruta del Baskerville · rango ${varekPathRank}`
                : 'Elige una ruta en la ronda 11'
                : currentCharacter === 'solaris'
                  ? solarisPath === 'crusader' ? 'Ruta del Cruzado'
                    : solarisPath === 'warden' ? 'Ruta del Custodio'
                      : 'Elige una ruta en la ronda 11'
                  : currentCharacter === 'jeanne'
                    ? jeannePath === 'tower' ? 'Ruta de la Torre'
                      : jeannePath === 'star' ? 'Ruta de la Estrella'
                        : 'Elige una ruta en la ronda 11'
                    : 'Sin ruta elegida';

    const portrait = document.createElement('img');
    portrait.className = 'inventory-portrait-image';
    portrait.src = currentCharacter === 'vanitas'
      ? './sprites/bardicon.jpeg'
      : currentCharacter === 'jeanne' ? './sprites/witchicon.jpeg'
        : currentCharacter === 'varek' ? './sprites/gamblericon.jpeg' : './sprites/knighticon.jpeg';
    portrait.alt = `${getCharacterName()}, retrato de inventario`;
    getElementById('inventory-portrait').replaceChildren(portrait);
    getElementById('inventory-character').textContent = getCharacterName();
    getElementById('inventory-hp').textContent = `${Math.max(0, hp)}/${getMaxHealth()}`;
    getElementById('inventory-mp').textContent = `${mp}/${getMaxMana()}`;
    getElementById('inventory-physical-attack').textContent = String(getPhysicalAttack());
    getElementById('inventory-magic-attack').textContent = String(getMagicAttack());
    getElementById('inventory-defense').textContent = String(getDefense());
    getElementById('inventory-crit').textContent = `${Math.round(getCriticalChancePercent())}%`;
    getElementById('inventory-extra-label').textContent = currentCharacter === 'solaris'
      ? 'Nº de parries'
      : currentCharacter === 'jeanne' ? 'Regen. de maná'
        : currentCharacter === 'varek' ? 'Daño de sangrado' : 'Libro de Vanitas';
    getElementById('inventory-extra').textContent = currentCharacter === 'vanitas'
      ? `+${bonuses.bookPower}%`
      : currentCharacter === 'jeanne' ? `+${getJeanneManaRegen()} MP/t`
        : currentCharacter === 'varek' ? `${varekPath === 'baskerville' ? varekPathRank * 10 : 0}%`
          : String(1 + Math.floor(level / 5));
    getElementById('inventory-path').textContent = activePath;

    const availableItems = INVENTORY_ITEMS.filter(isAvailableToCurrentCharacter);
    const itemCards = Array.from({ length: 12 }, (_, slotIndex) => {
      const item = availableItems[slotIndex];
      if (!item) {
        const emptySlot = document.createElement('div');
        emptySlot.className = 'inventory-item inventory-item--empty';
        emptySlot.setAttribute('aria-hidden', 'true');
        return emptySlot;
      }

      const count = bag[item.id] || 0;
      const card = document.createElement('article');
      card.className = 'inventory-item';
      card.title = item.description;
      card.setAttribute('aria-label', `${item.name} ×${count}: ${item.description}`);

      const heading = document.createElement('strong');
      heading.textContent = `${item.name} ×${count}`;
      const useButton = document.createElement('button');
      useButton.type = 'button';
      useButton.textContent = item.category === 'passive'
        ? 'Activa al caer'
        : item.category === 'upgrade' ? 'Aplicar mejora' : 'Usar';
      useButton.setAttribute('aria-label', `${useButton.textContent}: ${item.name}`);
      useButton.disabled = count <= 0
        || item.category === 'passive'
        || (item.id === 'bookInk' && currentCharacter !== 'vanitas');
      useButton.addEventListener('click', () => useInventoryItem(item.id));

      card.append(heading, useButton);
      return card;
    });

    getElementById('inventory-items').replaceChildren(...itemCards);
    renderInventoryGrimoire();
  }

  function renderInventoryGrimoire() {
    inventorySkillSlot = Math.max(0, Math.min(activeSkills.length - 1, inventorySkillSlot));
    const equippedSkills = document.getElementById('inventory-equipped');
    equippedSkills.replaceChildren(...activeSkills.map((skill, slotIndex) => {
      const slotButton = document.createElement('button');
      slotButton.type = 'button';
      slotButton.className = `equipped-skill${slotIndex === inventorySkillSlot ? ' is-selected' : ''}`;
      applySkillRarity(slotButton, skill);
      slotButton.setAttribute('aria-pressed', String(slotIndex === inventorySkillSlot));
      slotButton.innerHTML = `<span class="equipped-skill-slot">${slotIndex + 1}</span><span class="ic">${createSkillIconMarkup(skill)}</span><span class="equipped-skill-name"></span><small>MP ${skill.c}</small>`;
      slotButton.querySelector('.equipped-skill-name').textContent = skill.n;
      slotButton.addEventListener('click', () => {
        inventorySkillSlot = slotIndex;
        renderInventoryGrimoire();
      });
      return slotButton;
    }));

    const skillList = document.getElementById('inventory-skills');
    const status = document.getElementById('inventory-grimoire-status');
    const grimoireSkills = [...getCurrentBaseSkills(), ...unlockedSkills];
    if (!grimoireSkills.length) {
      const emptyMessage = document.createElement('p');
      emptyMessage.className = 'grimoire-empty';
      emptyMessage.textContent = 'Las habilidades aprendidas aparecerán aquí.';
      skillList.replaceChildren(emptyMessage);
      return;
    }

    skillList.replaceChildren(...grimoireSkills.map(skill => {
      const skillButton = document.createElement('button');
      skillButton.type = 'button';
      skillButton.className = 'grimoire-skill';
      applySkillRarity(skillButton, skill);
      skillButton.title = skill.d;
      skillButton.innerHTML = `<span class="ic">${createSkillIconMarkup(skill)}</span><span class="grimoire-skill-name"></span><small>MP ${skill.c}</small>`;
      skillButton.querySelector('.grimoire-skill-name').textContent = skill.n;
      skillButton.addEventListener('click', () => {
        activeSkills[inventorySkillSlot] = { ...skill };
        inventoryLoadoutChanged = true;
        status.textContent = `${skill.n} equipado en espacio ${inventorySkillSlot + 1}.`;
        renderInventoryGrimoire();
      });
      return skillButton;
    }));
  }

  async function useInventoryItem(itemId) {
    if (!bag[itemId] || !canReceiveInventoryItem(itemId)) return;
    if (itemId === 'scrolls') {
      closeInventoryModal();
      await openScroll();
      return;
    }

    bag[itemId]--;
    let itemMessage = '';

    if (itemId === 'pot' || itemId === 'sup') {
      const baseHealing = itemId === 'pot' ? .35 : .7;
      const blessingBonus = currentCharacter === 'vanitas' && vanitasPath === 'blessing'
        ? vanitasPathRank * .1
        : 0;
      const healed = Math.min(
        getMaxHealth() - hp,
        Math.round(getMaxHealth() * Math.min(1, baseHealing + blessingBonus)),
      );
      hp += healed;
      itemMessage = `Recuperas ${healed} puntos de vida.`;
    } else if (itemId === 'eter') {
      const restoredMana = Math.min(10, getMaxMana() - mp);
      mp += restoredMana;
      itemMessage = `Recuperas ${restoredMana} puntos de maná.`;
    } else if (itemId === 'smoke') {
      addStatusEffect(playerStatuses, {
        id: 'smoke',
        label: 'Humo',
        turns: 1 + (vanitasPath === 'blessing' ? vanitasPathRank : 0),
      });
      itemMessage = 'El humo oculta tus movimientos durante el próximo turno.';
    } else if (itemId === 'trap') {
      addStatusEffect(enemy.statuses, {
        id: 'bleed',
        label: 'Sangrado',
        turns: 2 + (vanitasPath === 'blessing' ? vanitasPathRank : 0),
        damage: 3 + (vanitasPath === 'blessing' ? vanitasPathRank : 0),
      });
      itemMessage = `${enemy.n} queda atrapado y empieza a sangrar.`;
    } else if (itemId === 'bladeOil') {
      bonuses.attack += 3;
      itemMessage = 'Tu ataque aumenta en 3.';
    } else if (itemId === 'bookInk') {
      bonuses.bookPower += 10;
      itemMessage = 'El Libro de Vanitas inflige un 10% más de daño.';
    } else if (itemId === 'bloodLetter') {
      bonuses.crit += 3;
      itemMessage = 'Varek aumenta un 3% su probabilidad de crítico.';
    }

    closeInventoryModal();
    renderInterface();
    await typeMessage(itemMessage);
  }

  getElementById('inventory-close').addEventListener('click', closeInventoryModal);
  getElementById('inventory-modal').addEventListener('click', event => {
    if (event.target === event.currentTarget) closeInventoryModal();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !getElementById('inventory-modal').hidden) closeInventoryModal();
  });

  function scrollSkillPool() {
    const skillBand = level >= 45 ? 45 : level >= 25 ? 25 : level >= 16 ? 16 : level >= 11 ? 11 : level >= 6 ? 6 : 1;
    const learnedSkillIds = new Set(unlockedSkills.map(skill => skill.id));
    const characterSkills = getCharacterSkills();
    const currentBandSkills = characterSkills.filter(skill =>
      skill.minLevel === skillBand && !learnedSkillIds.has(skill.id),
    );

    return currentBandSkills.length
      ? currentBandSkills
      : characterSkills.filter(skill => skill.minLevel <= level && !learnedSkillIds.has(skill.id));
  }

  function chooseScrollSkill(skillPool) {
    const totalWeight = skillPool.reduce((total, skill) => total + (skill.scrollWeight ?? 1), 0);
    let selection = Math.random() * totalWeight;

    for (const skill of skillPool) {
      selection -= skill.scrollWeight ?? 1;
      if (selection < 0) return skill;
    }

    return skillPool[skillPool.length - 1];
  }

  async function openScroll() {
    lockCombatControls();
    const skillPool = scrollSkillPool();
    if (!skillPool.length) {
      await typeMessage('Ya has aprendido todas las habilidades disponibles.');
      showCombatActions();
      return;
    }

    bag.scrolls--;
    const newSkill = { ...chooseScrollSkill(skillPool), evolutionStage: 0 };
    unlockedSkills.push(newSkill);
    evolveJeanneSkills();
    renderInterface();
    await typeMessage(`¡Has descifrado un pergamino!\n¡Aprendiste: ${newSkill.n}!`);
    showCombatActions();
  }

  async function useItem(itemKey) {
    lockCombatControls();

    if (itemKey === 'eter') {
      bag.eter--;
      mp = Math.min(getMaxMana(), mp + 10);
      renderInterface();
      await typeMessage('El Caballero recuperó MP.');
    } else {
      bag[itemKey]--;
      const healingRate = itemKey === 'pot' ? .35 : .7;
      const restoredHealth = Math.min(
        getMaxHealth() - hp,
        Math.round(getMaxHealth() * healingRate),
      );
      hp += restoredHealth;
      renderInterface();
      await typeMessage(`El Caballero recuperó ${restoredHealth} de vida.`);
    }

    await enemyTurn();
  }

  async function useBloodDeck(skill) {
    const suit = 1 + Math.floor(Math.random() * 4);
    const value = 1 + Math.floor(Math.random() * 13);
    const cards = ['', 'Picas', 'Corazones', 'Diamantes', 'Tréboles'];
    const face = value === 1 ? 'As' : value === 11 ? 'J' : value === 12 ? 'Q' : value === 13 ? 'K' : String(value);
    const cardMultiplier = (1 + (skill.cardBonus || 0)) * getSkillProgressionMultiplier(skill);
    let resultMessage = `La carta ${face} de ${cards[suit]} `;

    if (suit === 1) {
      const damageExtra = Math.round(value * 7 * cardMultiplier);
      const routeRank = varekPath === 'ludopata' ? varekPathRank : 0;
      const criticalChance = Math.min(1, getCriticalChancePercent() / 100 + (skill.cardCritBonus || 0) / 100 + routeRank * .05);
      const isCritical = Math.random() < criticalChance;
      const damage = Math.round(damageExtra * (isCritical ? 1.8 + (skill.cardCritDamage || 0) + routeRank * .15 : 1));
      enemy.hp = Math.max(0, enemy.hp - damage);
      const healing = Math.floor(damage / 2);
      hp = Math.min(getMaxHealth(), hp + healing);
      playAnimation(getElementById('en'), 'hit');
      resultMessage += `inflige ${damage} de daño${isCritical ? ' crítico' : ''} y Varek recupera ${healing} PV.`;
    } else if (suit === 2) {
      const healing = Math.round((value * 2 + (level >= 25 ? level : 0)) * (1 + (skill.cardHealBonus || 0)));
      const restoredHealth = Math.min(healing, getMaxHealth() - hp);
      hp += restoredHealth;
      resultMessage += `restaura ${restoredHealth} PV.`;
    } else if (suit === 3) {
      const reduction = Math.min(100, value * 5 + (skill.cardShieldBonus || 0));
      const barrier = findStatusEffect(playerStatuses, 'barrier') || addStatusEffect(playerStatuses, {
        id: 'barrier', label: '', shield: 0,
      });
      barrier.reduction = reduction;
      barrier.label = `Escudo ${reduction}%`;
      resultMessage += `prepara un escudo que reduce el próximo golpe un ${reduction}%.`;
    } else {
      const bonus = Math.floor(value / 2) + (skill.cardAttackBonus || 0);
      const existingBonus = findStatusEffect(playerStatuses, 'roulette-attack');
      if (existingBonus) removeStatusEffect(playerStatuses, 'roulette-attack');
      addStatusEffect(playerStatuses, {
        id: 'roulette-attack', label: `Ataque +${bonus}`, bonus, turns: 2, deferFirstTick: true,
      });
      resultMessage += `aumenta el ataque físico de Varek en ${bonus} durante sus próximos 2 turnos.`;
    }

    renderInterface();
    await typeMessage(resultMessage);
    if (enemy.hp <= 0) await win();
    else await enemyTurn();
  }

  async function castSkill(skill) {
    lockCombatControls();
    if (skill.book) await useBookPage();
    const manaCost = skill.allManaCost ? mp : skill.book && frenzyTurns > 0 ? 0 : skill.c;
    mp -= manaCost;
    renderInterface();
    const playerName = getCharacterName();
    await typeMessage(`¡${playerName} usó ${skill.n}!`, 250);
    playAnimation(getElementById('kw'), 'lunge');
    playCombatEffect(skill);
    await waitForDelay(380);

    if (skill.form) {
      const form = transformVanitas(skill.form);
      if (!form) {
        await typeMessage('Vanitas no puede adoptar esa forma.');
      } else {
        renderInterface();
        await typeMessage(`¡Vanitas adopta la forma de ${form.name}!`);
      }
      await enemyTurn();
      return;
    }

    if (skill.baraja) {
      await useBloodDeck(skill);
      return;
    }

    if (skill.sleep) {
      const attackMissed = Math.random() * 100 > skill.a;
      const sleepTriggered = !attackMissed && passesStatusChance(skill.sleepChance ?? 1, Math.random());
      if (attackMissed) {
        await typeMessage('¡Pero falló!');
      } else if (sleepTriggered) {
        addStatusEffect(enemy.statuses, { id: 'sleep', label: 'Dormido', turns: skill.sleep });
        renderInterface();
        await typeMessage(`${enemy.n} cae dormido durante ${skill.sleep} turnos.`);
      } else {
        await typeMessage(`${enemy.n} resiste el sueño.`);
      }
      await enemyTurn();
      return;
    }

    if (skill.barrier || skill.heal || skill.critNext || skill.luckNext || skill.invulnerable
      || skill.fullHeal || skill.healPercent || skill.cleanse) {
      const effects = [];
      if (skill.barrier) {
        const currentBarrier = findStatusEffect(playerStatuses, 'barrier');
        const barrier = currentBarrier || addStatusEffect(playerStatuses, {
          id: 'barrier',
          label: '',
          shield: 0,
        });
        barrier.shield += skill.barrier;
        barrier.label = `Barrera ${barrier.shield} PV`;
        effects.push(`crea una barrera de ${skill.barrier} PV`);
      }
      if (skill.invulnerable) {
        addStatusEffect(playerStatuses, {
          id: 'invulnerable',
          label: 'Bastión del Señor',
          turns: skill.invulnerable,
        });
        effects.push(`queda protegido de todo daño durante ${skill.invulnerable} turnos`);
      }
      if (skill.heal) {
        const restoredHealth = Math.min(skill.heal, getMaxHealth() - hp);
        hp += restoredHealth;
        effects.push(`recupera ${restoredHealth} PV`);
      }
      if (skill.fullHeal || skill.healPercent) {
        const healing = skill.fullHeal ? getMaxHealth() - hp : Math.round(getMaxHealth() * skill.healPercent);
        const restoredHealth = Math.min(healing, getMaxHealth() - hp);
        hp += restoredHealth;
        effects.push(`recupera ${restoredHealth} PV`);
      }
      if (skill.cleanse) {
        const removedEffects = playerStatuses.length;
        playerStatuses = [];
        effects.push(`elimina ${removedEffects} estados alterados`);
      }
      if (skill.critNext) {
        removeStatusEffect(playerStatuses, 'crit-next');
        addStatusEffect(playerStatuses, {
          id: 'crit-next',
          label: `Crítico +${Math.round(skill.critNext * 100)}%`,
          bonus: skill.critNext,
        });
        effects.push(`prepara un ${Math.round(skill.critNext * 100)}% más de crítico para el siguiente ataque`);
      }
      if (skill.luckNext) {
        const success = Math.random() < .5;
        addStatusEffect(playerStatuses, {
          id: 'gambler-luck',
          label: success ? 'Suerte' : 'Mala suerte',
          success,
        });
        effects.push(success ? 'asegura un crítico en el próximo ataque' : 'arriesga el próximo ataque a fallar');
      }
      renderInterface();
      await typeMessage(`${playerName} ${effects.join(' y ')}.`);
      await enemyTurn();
      return;
    }

    const nextAttackCritBonus = findStatusEffect(playerStatuses, 'crit-next')?.bonus || 0;
    const gamblerLuck = findStatusEffect(playerStatuses, 'gambler-luck');

    const attackMissed = gamblerLuck ? !gamblerLuck.success : Math.random() * 100 > skill.a;
    if (attackMissed) {
      await typeMessage('¡Pero falló!');
    } else {
      const criticalChance = Math.min(
        1,
        getCriticalChancePercent() / 100 + (skill.cbonus || 0) / 100 + (frenzyTurns > 0 ? .5 : 0) + nextAttackCritBonus,
      );
      const isCritical = gamblerLuck ? gamblerLuck.success : Math.random() < criticalChance;
      const affinity = getSkillAffinityMultiplier(skill);
      const classDamageMultiplier = frenzyTurns ? 2 : 1;
      const bookDamageMultiplier = skill.book ? getBookDamageMultiplier() : 1;
      const skillAttackPower = getSkillAttackPower(skill);
      const characterDamageMultiplier = skillAttackPower / 10;
      const progressionMultiplier = getSkillProgressionMultiplier(skill);
      const baseDamage = skill.directMultiplier
        ? skill.directMultiplier * getPhysicalAttack()
        : skill.p * skillAttackPower / 10;
      const damage = Math.max(
        1,
        Math.round(baseDamage * progressionMultiplier * (.85 + Math.random() * .3) * (isCritical ? 1.8 : 1) * affinity * classDamageMultiplier * bookDamageMultiplier),
      );

      enemy.hp -= damage;
      playAnimation(getElementById('en'), 'hit');
      renderInterface();
      const criticalPrefix = isCritical ? '¡Golpe crítico! ' : '';
      const damageTypes = getSkillDamageTypes(skill).join(' + ');
      await typeMessage(`${criticalPrefix}${enemy.n} recibió ${damage} de daño (${damageTypes} x${affinity.toFixed(2)} · ${getAffinityLabel(affinity)}).`);

      if (skill.healAfterHit) {
        const healing = Math.min(Math.round(getMaxHealth() * skill.healAfterHit), getMaxHealth() - hp);
        hp += healing;
        if (healing) {
          renderInterface();
          await typeMessage(`${playerName} recupera ${healing} PV con la luz de la Estrella.`);
        }
      }

      if (skill.rmp) {
        const restoredMana = Math.min(skill.rmp, getMaxMana() - mp);
        if (restoredMana > 0) {
          mp += restoredMana;
          renderInterface();
          await typeMessage(`${playerName} recuperó ${restoredMana} de maná.`);
        }
      }

      const absorbsCriticalKill = currentCharacter === 'vanitas'
        && vanitasPath === 'curse'
        && skill.book
        && isCritical
        && enemy.hp <= 0;
      const absorbedLife = absorbsCriticalKill ? Math.round(enemy.mx * 0.25) : 0;
      const healing = Math.round((skill.ls ? damage : 0) + damage * bonuses.vamp / 100 + absorbedLife);
      if (healing && hp < getMaxHealth()) {
        hp = Math.min(getMaxHealth(), hp + healing);
        renderInterface();
        await typeMessage(`${playerName} recuperó ${healing} de vida${absorbsCriticalKill ? ' al absorber el último aliento.' : '.'}`);
      }

      if (skill.st && enemy.hp > 0 && Math.random() < (skill.stChance ?? .4)) {
        addStatusEffect(enemy.statuses, { id: 'stun', label: 'Aturdido', turns: 1 });
        stun = 1;
        renderInterface();
        await typeMessage(`¡${enemy.n} quedó aturdido!`);
      }
      if (skill.dot && enemy.hp > 0) {
        addStatusEffect(enemy.statuses, {
          id: 'poison',
          label: skill.dt,
          turns: 2,
          damage: Math.max(1, Math.round(skill.dot * characterDamageMultiplier * getStatusDamageMultiplier())),
        });
        renderInterface();
        await typeMessage(`¡${enemy.n} queda afectado por ${skill.dt}!`);
      }
      if (skill.poison && enemy.hp > 0) {
        const poisonDamage = Math.round(
          (skill.poison + (vanitasPath === 'blessing' ? vanitasPathRank : 0))
          * getStatusDamageMultiplier(),
        );
        addStatusEffect(enemy.statuses, {
          id: 'poison',
          label: 'Veneno',
          turns: 3 + (vanitasPath === 'blessing' ? vanitasPathRank : 0),
          damage: poisonDamage,
        });
        renderInterface();
        await typeMessage(currentCharacter === 'vanitas'
          ? `El Libro deja veneno en la herida de ${enemy.n}.`
          : `${playerName} envenena a ${enemy.n}.`);
      }
      if (skill.bleed && enemy.hp > 0 && (!skill.bleedChance || Math.random() < skill.bleedChance)) {
        const bleedDamage = Math.round(
          (skill.bleed + (vanitasPath === 'blessing' ? vanitasPathRank : 0))
          * getStatusDamageMultiplier()
          * getSkillProgressionMultiplier(skill),
        );
        addStatusEffect(enemy.statuses, {
          id: 'bleed',
          label: 'Sangrado',
          turns: 3 + (vanitasPath === 'blessing' ? vanitasPathRank : 0),
          damage: bleedDamage,
        });
        renderInterface();
        await typeMessage(`${enemy.n} empieza a sangrar.`);
      }
      if (skill.smoke) {
        addStatusEffect(playerStatuses, {
          id: 'smoke',
          label: 'Humo',
          turns: 1 + (vanitasPath === 'blessing' ? vanitasPathRank : 0),
        });
        renderInterface();
        await typeMessage('El humo tapa la silueta de Vanitas.');
      }
      if (skill.rewrite && enemy.hp > 0) {
        const rewritten = rewriteCurrentEnemy();
        await typeMessage(rewritten
          ? `${companion.name} sale de la página y se vuelve contra el nuevo enemigo.`
          : 'El Libro no consigue reescribir a un jefe ni mantener otro aliado.');
      }
    }

    if (nextAttackCritBonus) {
      removeStatusEffect(playerStatuses, 'crit-next');
      renderInterface();
    }
    if (gamblerLuck) {
      removeStatusEffect(playerStatuses, 'gambler-luck');
      renderInterface();
    }

    const expiredForm = advanceVanitasForm();
    if (expiredForm) {
      renderInterface();
      await typeMessage(`${expiredForm.name} vuelve a su forma normal.`);
    }

    if (enemy.hp > 0) await enemyTurn();
    else {
      restoreJeanneMana();
      renderInterface();
      await win();
    }
  }

  const parryButton = document.createElement('button');
  parryButton.type = 'button';
  parryButton.id = 'tg';
  parryButton.setAttribute('aria-label', 'Activar parry cuando el aro coincida');
  parryButton.tabIndex = -1;
  getElementById('tg').replaceWith(parryButton);

  getElementById('tg').addEventListener('pointerdown', event => {
    if (!parryHandler || (event.pointerType === 'mouse' && event.button !== 0)) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (bounds.left + bounds.width / 2);
    const dy = event.clientY - (bounds.top + bounds.height / 2);
    if (dx * dx + dy * dy > (Math.min(bounds.width, bounds.height) / 2) ** 2) return;
    event.preventDefault();
    parryHandler();
  });

  getElementById('tg').addEventListener('click', event => {
    if (!parryHandler || event.detail !== 0) return;
    event.preventDefault();
    parryHandler();
  });

  function parryHit(parryWindowMs) {
    return new Promise(resolve => {
      const target = getElementById('tg');
      const ring = getElementById('rg');
      const scene = target.closest('.scene');
      if (target.parentElement !== scene) scene.append(target, ring);

      const availableSectors = [0, 1, 2, 3].filter(sector => sector !== lastParrySector);
      const sector = availableSectors.length > 0 
        ? availableSectors[Math.floor(Math.random() * availableSectors.length)] 
        : Math.floor(Math.random() * 4);
      lastParrySector = sector;

      const x = (sector % 2 ? .56 : .12) + Math.random() * .32;
      const y = (sector >= 2 ? .54 : .2) + Math.random() * (sector >= 2 ? .18 : .25);
      target.style.left = ring.style.left = x * 100 + '%';
      target.style.top = ring.style.top = y * 100 + '%';
      target.className = 'on';
      target.tabIndex = 0;
      target.focus({ preventScroll: true });
      ring.style.opacity = 1;

      const startedAt = performance.now();
      let isComplete = false;
      let timeoutId = null;

      const finish = outcome => {
        if (isComplete) return;
        isComplete = true;
        parryHandler = null;
        if (timeoutId) clearTimeout(timeoutId);
        cancelAnimationFrame(animationFrame);
        target.tabIndex = -1;
        ring.style.opacity = 0;
        target.className = 'on ' + outcome;
        const animationToken = ++parryAnimationToken;
        setTimeout(() => {
          if (parryAnimationToken === animationToken) target.className = '';
        }, 400);
        resolve(outcome);
      };

      parryHandler = () => {
        const timingError = Math.abs(performance.now() - startedAt - parryWindowMs);
        finish(timingError <= 80 ? 'perfect' : timingError <= 200 ? 'good' : 'miss');
      };

      timeoutId = setTimeout(() => playAnimation(getElementById('en'), 'elunge'), Math.max(0, parryWindowMs - 150));

      const animateRing = () => {
        if (isComplete) return;
        const elapsed = performance.now() - startedAt;
        if (elapsed > parryWindowMs + 240) return finish('miss');
        const scale = Math.max(0, 3.2 - 2.2 * elapsed / parryWindowMs);
        ring.style.transform = 'translate(-50%,-50%) scale(' + scale + ')';
        animationFrame = requestAnimationFrame(animateRing);
      };
      animationFrame = requestAnimationFrame(animateRing);
    });
  }

  const parriesRequired = (currentLevel, isBoss) => {
    const base = 1 + Math.floor(currentLevel / 5);
    return isBoss ? base * 2 : base;
  };

  function calculateIncomingDamage(attackCount) {
    const baseDamage = Math.max(
      1,
      Math.round(enemy.attack * (.85 + Math.random() * .3) * (1 + .2 * (attackCount - 1)) / attackCount * 100 / (100 + getDefense() * 2)),
    );
    const smokeReduction = findStatusEffect(playerStatuses, 'smoke')
      ? Math.max(.1, .3 - (vanitasPath === 'blessing' ? vanitasPathRank * .05 : 0))
      : 1;
    return Math.max(1, Math.round(baseDamage * smokeReduction * (frenzyTurns > 0 ? 2 : 1)));
  }

  async function enemyTurn() {
    const restoredJeanneMana = restoreJeanneMana();
    if (restoredJeanneMana > 0) {
      renderInterface();
      await typeMessage(`Jeanne recupera ${restoredJeanneMana} MP.`);
    }

    if (companion) await companionAttack();
    if (enemy.hp <= 0) return win();

    const enemyIsStunned = stun || findStatusEffect(enemy.statuses, 'stun');
    if (enemyIsStunned) {
      stun = 0;
      removeStatusEffect(enemy.statuses, 'stun');
      await typeMessage(`${enemy.n} está aturdido y no puede actuar.`);
    } else if (findStatusEffect(enemy.statuses, 'sleep')) {
      await typeMessage(`${enemy.n} está dormido y no puede actuar.`);
    } else if (currentCharacter === 'vanitas' || currentCharacter === 'jeanne' || currentCharacter === 'varek') {
      await typeMessage(`${enemy.n} se lanza contra ${getCharacterName()}.`);
      const incomingDamage = calculateIncomingDamage(1);
      const damageResult = applyIncomingDamage(incomingDamage);
      playAnimation(getElementById('kw'), 'shake');
      setCombatMessage(`${frenzyTurns ? 'Frenesí: ' : ''}${getIncomingDamageMessage(damageResult)}`);
      renderInterface();
      if (damageResult.recipient === 'companion') {
        await typeMessage(getIncomingDamageMessage(damageResult));
      }
      await waitForDelay(220);
      if (hp <= 0) {
        if (bag.fen > 0) {
          bag.fen--;
          hp = Math.ceil(getMaxHealth() / 2);
          await typeMessage(`La pluma de fénix devuelve a ${getCharacterName()} a la pelea.`);
        } else {
          return lose();
        }
      }
    } else {
      const requiredParries = parriesRequired(level, enemy.b);
      const parryWindowMs = Math.max(560, 900 - level * 3);
      lastParrySector = -1;
      await typeMessage('¡' + enemy.n + ' se prepara!\nPulsa, toca o usa Intro/Espacio para hacer parry.', 200);

      for (let parryIndex = 0; parryIndex < requiredParries; parryIndex++) {
        parryHandler = null; // Descarta entradas atrasadas del parry anterior.
        const prompt = 'PARRY ' + (parryIndex + 1) + '/' + requiredParries;
        renderActionMenu([{ t: prompt, s: 'Activa el botón circular cuando se cierre el aro', k: 1, f: () => {} }]);
        await waitForDelay(250);

        const outcome = await parryHit(parryWindowMs);
        const incomingDamage = calculateIncomingDamage(requiredParries);
        let companionDamageMessage = null;

        if (outcome === 'perfect') {
          const reflectedDamage = Math.round(incomingDamage * .1);
          enemy.hp -= reflectedDamage;
          mp = Math.min(getMaxMana(), mp + 1);
          playAnimation(getElementById('en'), 'hit');
          setCombatMessage('¡PARRY PERFECTO!\nDevuelves ' + reflectedDamage + ' de daño');
        } else if (outcome === 'good') {
          const reflectedDamage = Math.round(incomingDamage * .05);
          enemy.hp -= reflectedDamage;
          const damageResult = applyIncomingDamage(Math.ceil(incomingDamage / 2));
          if (damageResult.recipient === 'companion') {
            companionDamageMessage = getIncomingDamageMessage(damageResult);
          }
          playAnimation(getElementById('kw'), 'shake');
          setCombatMessage(getParryMessage(
            'good',
            damageResult,
            getIncomingDamageMessage(damageResult),
            reflectedDamage,
          ));
        } else {
          const damageResult = applyIncomingDamage(incomingDamage);
          if (damageResult.recipient === 'companion') {
            companionDamageMessage = getIncomingDamageMessage(damageResult);
          }
          playAnimation(getElementById('kw'), 'shake');
          setCombatMessage(getParryMessage('miss', damageResult, getIncomingDamageMessage(damageResult)));
        }

        renderInterface();
        if (companionDamageMessage) await typeMessage(companionDamageMessage);
        await waitForDelay(220);
        if (enemy.hp <= 0) return win();
        if (hp <= 0) {
          if (bag.fen > 0) {
            bag.fen--;
            hp = Math.ceil(getMaxHealth() / 2);
            renderInterface();
            await typeMessage('¡La pluma de fénix te devolvió a la vida!');
            break;
          }
          return lose();
        }
      }
      renderInterface();
    }

    await tickDamageStatuses(enemy.statuses, enemy.n, damage => {
      const damageDealt = Math.max(0, Math.min(enemy.hp, damage));
      enemy.hp -= damage;
      return damageDealt;
    });
    if (enemy.hp <= 0) return win();

    await tickDamageStatuses(playerStatuses, getCharacterName(), damage => {
      return applyIncomingDamage(damage, false);
    });
    if (hp <= 0) {
      if (bag.fen > 0) {
        bag.fen--;
        hp = Math.ceil(getMaxHealth() / 2);
        await typeMessage(`La pluma de fénix devuelve a ${getCharacterName()} a la pelea.`);
      } else {
        return lose();
      }
    }

    if (frenzyTurns > 0) {
      const restoredMana = Math.min(5, getMaxMana() - mp);
      mp += restoredMana;
      frenzyTurns--;
      const frenzyStatus = findStatusEffect(playerStatuses, 'frenzy');
      if (frenzyStatus) frenzyStatus.turns = frenzyTurns;
      if (frenzyTurns === 0) {
        removeStatusEffect(playerStatuses, 'frenzy');
        corruption = 0;
        nextCorruptionGain = 5;
        await typeMessage('El frenesí se apaga. Vanitas vuelve a dominar el Libro.');
      } else if (restoredMana > 0) {
        await typeMessage(`El frenesí restaura ${restoredMana} MP.`);
      }
    }

    renderInterface();
    showCombatActions();
  }

  function restoreJeanneMana() {
    if (currentCharacter !== 'jeanne') return 0;

    const restoredMana = Math.min(getJeanneManaRegen(), getMaxMana() - mp);
    mp += restoredMana;
    return restoredMana;
  }

  function grantMonsterLoot(isBoss) {
    if (!isBoss && Math.random() > .6) return null;

    const familyLoot = MONSTER_LOOT_TABLE[enemy.cl] || ['pot'];
    const lootPool = familyLoot.filter(canReceiveInventoryItem);
    const availableLoot = lootPool.length ? lootPool : ['pot'];
    const itemId = availableLoot[Math.floor(Math.random() * availableLoot.length)];
    const item = INVENTORY_ITEMS.find(inventoryItem => inventoryItem.id === itemId);
    if (!item) return null;

    bag[itemId] = (bag[itemId] || 0) + 1;
    return item;
  }

  async function win() {
    lockCombatControls();
    getElementById('en').classList.add('faint');
    await typeMessage(`¡${enemy.n} fue derrotado!`);

    if (level >= 100) {
      best = 100;
      saveBestScore();
      await typeMessage('¡Has derrotado al Tarrasque!\n¡Superaste las 100 rondas!', 0);
      return renderActionMenu([{ t: 'Nueva partida', f: () => start(currentCharacter), k: 1 }]);
    }

    const isBoss = enemy.b;
    const lootDrop = grantMonsterLoot(isBoss);
    if (isBoss) {
      hp = getMaxHealth();
      mp = getMaxMana();
      renderInterface();
    }

    const recoveryMessage = isBoss
      ? 'Descansas junto al fuego y recuperas toda la vida y el maná.'
      : 'Te preparas para seguir avanzando.';
    await typeMessage(recoveryMessage, 400);
    if (lootDrop) await typeMessage(`${lootDrop.name}: ${lootDrop.description}`);

    setCombatMessage('¡Elige una recompensa!');
    const rewards = chooseWeightedItems(REWARDS.filter(isAvailableToCurrentCharacter), 3);
    await new Promise(resolve => {
      renderActionMenu(rewards.map(({ name, description, apply }) => ({
        t: name,
        s: description,
        f: () => {
          apply();
          resolve();
        },
      })));
    });

    lockCombatControls();
    const previousZoneIndex = getZoneIndex();
    const previousMaxHealth = getMaxHealth();
    level++;
    hp = Math.min(getMaxHealth(), hp + getMaxHealth() - previousMaxHealth);
    if (isBoss) hp = getMaxHealth();
    best = Math.max(best, level);
    saveBestScore();
    spawnEnemy();
    const witchBarrier = createJeanneBarrier();

    if (getZoneIndex() !== previousZoneIndex) {
      updateZone();
      playAnimation(getElementById('bgc'), 'fade');
      playAnimation(getElementById('bg'), 'fade');
      renderInterface();
      await typeMessage(`Desciendes más profundo...\n${ZONES[getZoneIndex()].z}`, 900);
    }

    const skillUpgrades = [...upgradeEquippedSkills(), ...evolveJeanneSkills()];
    if (skillUpgrades.length) {
      renderInterface();
      await typeMessage(`¡Tus técnicas mejoran!\n${skillUpgrades.join('\n')}`, 1200);
    }

    renderInterface();
    const encounterMessage = enemy.b
      ? `¡Ronda ${level}! Un jefe bloquea el paso: ${enemy.n}.`
      : `¡Ronda ${level}! Aparece ${enemy.n}.`;
    await typeMessage(encounterMessage);
    if (witchBarrier) await typeMessage(`Jeanne alza una barrera mágica de ${witchBarrier} PV.`);
    await offerVanitasPathUpgrade();
    showCombatActions();
  }

  async function lose() {
    lockCombatControls();
    playAnimation(getElementById('kw'), 'shake');
    getElementById('kw').classList.add('faint');
    await typeMessage(`${getCharacterName()} ha caído...`);
    await typeMessage(`Llegaste a la ronda ${level}. Mejor: ${best}.`, 0);
    renderActionMenu([{ t: 'Nueva partida', f: () => start(currentCharacter), k: 1 }]);
  }

  async function offerVanitasPathUpgrade() {
    if (currentCharacter === 'solaris' && [11, 21, 31, 41].includes(level)) {
      setCombatMessage('Elige el juramento que guiará al Caballero.');
      await new Promise(resolve => {
        const choosePath = (path, title) => {
          solarisPath = path;
          unlockedSkills = unlockedSkills.filter(skill => !skill.route || skill.route === path);
          activeSkills = activeSkills.map(skill =>
            skill.route && skill.route !== path ? { ...SOLARIS_STARTER_SKILLS[0] } : skill,
          );
          const routeSkill = SOLARIS_SKILLS.find(skill => skill.route === path);
          if (routeSkill && !unlockedSkills.some(skill => skill.id === routeSkill.id)) {
            unlockedSkills.push(routeSkill);
          }
          resolve(title);
        };

        renderActionMenu([
          {
            t: 'Ruta del Cruzado',
            s: '+10% Atq. Físico. Tus habilidades ofensivas también infligen daño Sagrado. Desbloquea ¡PRAISE THE SUN! (400% Atq. Físico, Sagrado + Fuego, consume 20 MP).',
            f: () => choosePath('crusader', 'Solaris jura combatir bajo la luz sagrada.'),
          },
          {
            t: 'Ruta del Custodio',
            s: '+10% Defensa. Desbloquea Bastión del Señor: inmunidad a todo daño durante 3 turnos, consume 10 MP.',
            f: () => choosePath('warden', 'Solaris jura protegerse tras el Bastión del Señor.'),
          },
        ]);
      }).then(message => typeMessage(message, 500));

      renderInterface();
      return;
    }
    if (currentCharacter === 'jeanne' && [11, 21, 31, 41].includes(level)) {
      setCombatMessage('Elige qué destino seguirá la magia de Jeanne.');
      await new Promise(resolve => {
        const choosePath = (path, title) => {
          jeannePath = path;
          unlockedSkills = unlockedSkills.filter(skill => !skill.route || skill.route === path);
          activeSkills = activeSkills.map(skill =>
            skill.route && skill.route !== path ? { ...JEANNE_STARTER_SKILLS[0] } : skill,
          );
          resolve(title);
        };

        renderActionMenu([
          {
            t: 'Ruta de la Torre',
            s: 'Caos, terremotos y destrucción de defensas. +10% Atq. Mágico. Desbloquea hechizos malignos y cataclísmicos.',
            f: () => choosePath('tower', 'Jeanne abraza el poder destructivo de la Torre.'),
          },
          {
            t: 'Ruta de la Estrella',
            s: 'Sanación, escudos, bendiciones y magia de luz. +10% al daño de estados elementales. Desbloquea hechizos combinados, Sagrados y Cósmicos.',
            f: () => choosePath('star', 'Jeanne sigue la luz de la Estrella.'),
          },
        ]);
      }).then(message => typeMessage(message, 500));

      renderInterface();
      return;
    }
    if (currentCharacter === 'varek' && [11, 21, 31, 41].includes(level)) {
      setCombatMessage('Elige qué instinto guiará la próxima apuesta.');
      await new Promise(resolve => {
        const choosePath = (path, title) => {
          if (varekPath === path) varekPathRank = Math.min(4, varekPathRank + 1);
          else {
            varekPath = path;
            varekPathRank = 1;
            unlockedSkills = unlockedSkills.filter(skill => !skill.route || skill.route === path);
            activeSkills = activeSkills.map(skill =>
              skill.route && skill.route !== path ? { ...VAREK_STARTER_SKILLS[0] } : skill,
            );
          }
          resolve(title);
        };

        renderActionMenu([
          {
            t: 'Ruta del Ludópata',
            s: '+5% crítico y +0,15 daño crítico de Baraja Sangrienta por rango. Juicio de la Milicia y Aliento del Viajero.',
            f: () => choosePath('ludopata', 'La suerte vuelve a sonreírle a Varek.'),
          },
          {
            t: 'Ruta del Baskerville',
            s: '+2 Atq. Físico y +10% daño de sangrado por rango. Malicious Spear Qliphoth y Breath of Doom.',
            f: () => choosePath('baskerville', 'La sangre de Baskerville despierta en Varek.'),
          },
        ]);
      }).then(message => typeMessage(message, 500));

      renderInterface();
      return;
    }
    if (currentCharacter !== 'vanitas' || ![11, 21, 31, 41].includes(level)) return;

    setCombatMessage('Elige qué hacer con el poder del Libro.');
    await new Promise(resolve => {
      const choosePath = (path, title) => {
        if (vanitasPath === path) vanitasPathRank++;
        else {
          vanitasPath = path;
          vanitasPathRank = 1;
        }

        bonuses.bookPower = vanitasPath === 'curse' ? vanitasPathRank * 10 : 0;
        resolve(title);
      };

      renderActionMenu([
        {
          t: 'Ruta de la Bendición · Doctor Musical',
          s: 'Pociones más fuertes, humo duradero y trampas que dejan más sangrado.',
          f: () => choosePath('blessing', 'La Bendición afina tus herramientas.'),
        },
        {
          t: 'Ruta de la Maldición · Poseído Musical',
          s: 'El Libro gana poder, los aliados reescritos golpean más fuerte y los críticos absorben vida.',
          f: () => choosePath('curse', 'La Maldición deja que el Libro escriba contigo.'),
        },
      ]);
    }).then(message => typeMessage(message, 500));

    renderInterface();
  }

  function start(characterId = 'solaris') {
    if (!['solaris', 'vanitas', 'jeanne', 'varek'].includes(characterId)) return;

    currentCharacter = characterId;
    level = 1;
    bonuses = {
      hp: 0,
      attack: 0,
      def: 0,
      vamp: 0,
      crit: 0,
      mp: 0,
      bookPower: 0,
    };
    hp = getMaxHealth();
    mp = getMaxMana();
    bag = {
      pot: 2,
      sup: 0,
      eter: 1,
      fen: 0,
      scrolls: 1,
      smoke: currentCharacter === 'vanitas' ? 1 : 0,
      trap: 0,
      bladeOil: 0,
      bookInk: 0,
      bloodLetter: 0,
    };
    unlockedSkills = [];
    corruption = 0;
    nextCorruptionGain = 5;
    frenzyTurns = 0;
    ({
      vanitasPath,
      vanitasPathRank,
      varekPath,
      varekPathRank,
      solarisPath,
      jeannePath,
    } = getInitialRouteState());
    playerStatuses = [];
    companion = null;
    activeTransformation = null;
    skillsBeforeTransformation = null;
    transformationTurns = 0;
    activeSkills = createStarterSkills();

    const playerImage = getElementById('kimg');
    playerImage.src = currentCharacter === 'vanitas'
      ? './sprites/bard.png'
      : currentCharacter === 'jeanne' ? './sprites/witch.png'
        : currentCharacter === 'varek' ? './sprites/gambler.png' : './sprites/knight.png';
    playerImage.alt = currentCharacter === 'vanitas'
      ? 'Vanitas, bardo'
      : currentCharacter === 'jeanne' ? 'Jeanne, bruja'
        : currentCharacter === 'varek' ? 'Varek, Gambler' : 'Solaris, caballero';
    getElementById('kw').classList.toggle('vanitas-player', currentCharacter === 'vanitas');
    getElementById('kw').classList.toggle('witch-player', currentCharacter === 'jeanne');
    getElementById('kw').classList.toggle('gambler-player', currentCharacter === 'varek');

    getElementById('kw').classList.remove('faint');
    spawnEnemy();
    updateZone();
    renderInterface();
    lockCombatControls();
    typeMessage(`¡Comienza la aventura! ${enemy.n} bloquea el camino.`).then(showCombatActions);
  }

    return { start, getSaveData, loadSaveData };
})();
