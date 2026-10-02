import { Game } from './game.js';

const titleScreen = document.getElementById('title-screen');
const welcomePanel = document.getElementById('welcome-panel');
const difficultyPanel = document.getElementById('difficulty-panel');
const gameRoot = document.getElementById('c');
const difficultyOpenButton = document.getElementById('difficulty-open');
const difficultyBackButton = document.getElementById('difficulty-back');
const solarisButton = document.getElementById('select-solaris');
const vanitasButton = document.getElementById('select-vanitas');
const jeanneButton = document.getElementById('select-jeanne');
const returnMenuButton = document.getElementById('return-menu');
const gameMenuModal = document.getElementById('game-menu-modal');
const saveGameButton = document.getElementById('save-game-button');
const returnToTitleButton = document.getElementById('return-to-title');
const resumeGameButton = document.getElementById('resume-game');
const saveFeedback = document.getElementById('save-feedback');
const importSaveButton = document.getElementById('import-save-button');
const saveFileInput = document.getElementById('save-file-input');
const importSaveStatus = document.getElementById('import-save-status');

function startCharacter(characterId) {
	titleScreen.hidden = true;
	gameRoot.hidden = false;
	Game.start(characterId);
}

difficultyOpenButton.addEventListener('click', () => {
	titleScreen.dataset.view = 'difficulty';
	welcomePanel.hidden = true;
	difficultyPanel.hidden = false;
	difficultyBackButton.focus();
});

difficultyBackButton.addEventListener('click', () => {
	titleScreen.dataset.view = 'welcome';
	difficultyPanel.hidden = true;
	welcomePanel.hidden = false;
	difficultyOpenButton.focus();
});

solarisButton.addEventListener('click', () => startCharacter('solaris'));
vanitasButton.addEventListener('click', () => startCharacter('vanitas'));
jeanneButton.addEventListener('click', () => startCharacter('jeanne'));

function closeGameMenu() {
	gameMenuModal.hidden = true;
	returnMenuButton.focus();
}

returnMenuButton.addEventListener('click', () => {
	saveFeedback.textContent = '';
	gameMenuModal.hidden = false;
	resumeGameButton.focus();
});

resumeGameButton.addEventListener('click', closeGameMenu);

returnToTitleButton.addEventListener('click', () => {
	gameMenuModal.hidden = true;

	gameRoot.hidden = true;
	titleScreen.hidden = false;
	titleScreen.dataset.view = 'welcome';
	difficultyPanel.hidden = true;
	welcomePanel.hidden = false;
	difficultyOpenButton.focus();
});

saveGameButton.addEventListener('click', () => {
	try {
		const saveData = Game.getSaveData();
		const saveText = JSON.stringify(saveData, null, 2);
		const saveBlob = new Blob([saveText], { type: 'application/json' });
		const saveUrl = URL.createObjectURL(saveBlob);
		const downloadLink = document.createElement('a');
		downloadLink.href = saveUrl;
		downloadLink.download = `rogueknight-${saveData.state.currentCharacter}-ronda-${saveData.state.level}.sav`;
		document.body.append(downloadLink);
		downloadLink.click();
		downloadLink.remove();
		window.setTimeout(() => URL.revokeObjectURL(saveUrl), 1000);
		saveFeedback.textContent = 'Partida guardada. Importa este archivo desde el menú principal.';
	} catch (error) {
		saveFeedback.textContent = error.message;
	}
});

importSaveButton.addEventListener('click', () => saveFileInput.click());
saveFileInput.addEventListener('change', async () => {
	const saveFile = saveFileInput.files?.[0];
	saveFileInput.value = '';
	if (!saveFile) return;

	try {
		if (saveFile.size > 2_000_000) throw new Error('El archivo de partida supera el tamaño permitido.');
		const saveData = JSON.parse(await saveFile.text());
		Game.loadSaveData(saveData);
		titleScreen.hidden = true;
		gameRoot.hidden = false;
		gameMenuModal.hidden = true;
		importSaveStatus.textContent = '';
	} catch (error) {
		importSaveStatus.textContent = error.message || 'No se pudo importar la partida.';
	}
});

gameMenuModal.addEventListener('click', event => {
	if (event.target === event.currentTarget) closeGameMenu();
});

document.addEventListener('keydown', event => {
	if (event.key === 'Escape' && !gameMenuModal.hidden) closeGameMenu();
});
