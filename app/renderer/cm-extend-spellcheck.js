/*
*   Abricotine - Markdown Editor
*   Copyright (c) 2015 Thomas Brouard
*   Licensed under GNU-GPLv3 <http://www.gnu.org/licenses/gpl.html>
*/

// Spellchecker for CodeMirror

function initSpellcheck (CodeMirror) {
    // Create overlay
    // Inspiration: https://github.com/NextStepWebs/codemirror-spell-checker/blob/master/src/js/spell-checker.js
    CodeMirror.defineMode("spellchecker", function (config, parserConfig) {
        var wordDelimiters = "!\"#$%&()*+,-./:;<=>?@[\\]^_`{|}~ \t",
            overlay = {
        		token: function(stream, state) {
        			var ch = stream.peek(),
                        word = "",
                        isMisspelledFunc = window.abrDoc.getSpellcheckFunc();
                    if (!isMisspelledFunc) {
                        return null;
                    }
        			if (wordDelimiters.includes(ch)) {
        				stream.next();
        				return null;
        			}
        			while ((ch = stream.peek()) != null && !wordDelimiters.includes(ch)) {
        				word += ch;
        				stream.next();
        			}
                    word = word.replace(/[’ʼ]/g, "'"); // Alternative apostrophes
        			if (isMisspelledFunc && isMisspelledFunc(word)) {
        				return "spell-error"; // CSS class: cm-spell-error
                    }
        			return null;
        		}
        	},
            mode = CodeMirror.getMode(config, {
                // FIXME: duplicate code
                name: "gfm",
                highlightFormatting: true,
                allowAtxHeaderWithoutSpace: true,
                tokenTypeOverrides: {
                    "list1": "list",
                    "list2": "list",
                    "list3": "list"
                }
            });
        return CodeMirror.overlayMode(mode, overlay, true);
    });
}

module.exports = initSpellcheck;
