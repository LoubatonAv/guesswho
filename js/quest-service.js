'use strict';

var gQuestsTree;
var gCurrQuest;

var gPrevQuest = null;

function createQuestsTree() {
  gQuestsTree = loadFromStorage('queststreeDB');

  if (!gQuestsTree) {
    gQuestsTree = createQuest('Male?');
    gQuestsTree.yes = createQuest('Gandhi');
    gQuestsTree.no = createQuest('Rita');
  }
  gCurrQuest = gQuestsTree;
  saveQuestsTree();
  gPrevQuest = null;
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  };
}

function isChildless(node) {
  return node.yes === null && node.no === null;
}

function moveToNextQuest(res) {
  // TODO: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest;
  gCurrQuest = gCurrQuest[res];
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  var newQuest = createQuest(newQuestTxt);
  newQuest.yes = createQuest(newGuessTxt);
  newQuest.no = gCurrQuest;
  gPrevQuest[lastRes] = newQuest;

  saveQuestsTree();
}

function getCurrQuest() {
  return gCurrQuest;
}

function saveQuestsTree() {
  saveToStorage('queststreeDB', gQuestsTree);
}
