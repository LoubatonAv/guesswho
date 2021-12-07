'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);
$('.restart-game').click(onRestartGame);

function init() {
  console.log('Started...');
  createQuestsTree();
}

function onStartGuessing() {
  // TODO: hide the game-start section
  $('.game-start').hide();
  renderQuest();
  // TODO: show the quest section
  $('.quest').show();
  renderQuest();
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
  $('.quest h2').text(gCurrQuest.txt);
}

function onUserResponse(ev) {
  var res = ev.data.ans;

  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      $('.answer').show();
      $('.quest ').hide();
      // TODO: improve UX
    } else {
      $('.quest').hide();
      $('.new-quest').show();
      // TODO: hide and show new-quest section
    }
  } else {
    // TODO: update the lastRes global var
    gLastRes = res;
    moveToNextQuest(gLastRes);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  addGuess(newQuest, newGuess, gLastRes);
  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.answer').hide();
  $('.game-start').show();
  gCurrQuest = gQuestsTree;
  gLastRes = null;
}
