const selectablediv = 'selectablediv';
const editablediv = 'editablediv';
const dragablediv = 'dragablediv';
const dropdiv = 'dropdiv';
const joindiv = 'joindiv';
const selectbox = 'selectbox';
const tickbox = 'tickbox';

const answers = JSON.parse(window.contenidojson);

const answerPage = document.getElementById('capa1').childNodes;

// setup
answerPage.forEach((element) => {
	if (element.className == 'blankdiv') element.remove();
});

// answer variable
const dragdrop = {};
const joinline = {};

answers.forEach((answer, index) => {
	const answerElement = answerPage[index];
	if (answerElement.className === selectablediv) {
		const isCorrect = answer[0].split('select:')[1];
		if (isCorrect === 'yes') {
			selectanswer(index);
		}
	} else if (answerElement.className === editablediv) {
		answerElement.innerHTML = answer[0];
	} else if (answerElement.className === dragablediv) {
		const answersplit = answer[0].split(':');
		const dropPosition = answersplit[1];

		// create null array
		if (!dragdrop[dropPosition]) dragdrop[dropPosition] = [];

		// insert element
		dragdrop[dropPosition] = [...dragdrop[dropPosition], answerElement];
	} else if (answerElement.className === dropdiv) {
		const answersplit = answer[0].split(':');
		const dropPosition = answersplit[1];

		const dragdropArray = dragdrop[dropPosition];
		const dragdropStyle = dragdropArray[0].style;

		// drop: 1 [dropPosition], dropdiv18 [answerElement]
		// drop: 2 [dropPosition], dropdiv19 [answerElement]

		dragdropStyle.top = answerElement.style.top;
		dragdropStyle.left = answerElement.style.left;

		// remove first index
		dragdropArray.shift();
	} else if (answerElement.className === joindiv) {
		const answersplit = answer[0].split(':');
		const joinIndex = answersplit[1];

		// create null array
		if (joinline[joinIndex]) {
			const oldValueLine = joinline[joinIndex];
			const parentLine = document.getElementById('elsvgdefinitivo');

			const [x1, y1, x2, y2] = [
				oldValueLine[0][2],
				oldValueLine[0][1],
				answer[2],
				answer[1],
			];

			const lineInnerHtml = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="darkblue" stroke-width="5" />`;

			parentLine.innerHTML += lineInnerHtml;

			// set to global to check the answer
			contenidorellenado[oldValueLine[1]][5] = lineInnerHtml;
			contenidorellenado[index][5] = lineInnerHtml;
		} else {
			joinline[joinIndex] = [answer, index];
		}
	} else if (answerElement.className === selectbox) {
		answerElement.value = '1';
	} else if (answerElement.className === tickbox) {
		const answersplit = answer[0].split(':');
		const correctAnswer = answersplit[1];

		if (correctAnswer === 'yes') {
			// Ui
			answerElement.innerHTML = '✓';
			// make answer correct
			clickedanswer[index] = 'yes';
		}
	}
});
