/**
 * @file del command script
 * @description delete extensions / apps by del command
 * @author  tomasy
 * @mail solopea@gmail.com
 */

import $ from 'jquery'
import util from '../common/util'
import mathexp from 'math-expression-evaluator'

var name = 'calculate';
var version = 1;
var key = 'calc';
var icon = chrome.extension.getURL('img/calc.png');
var title = chrome.i18n.getMessage(name + '_title');
var subtitle = chrome.i18n.getMessage(name + '_subtitle');
var commands = [{
    key,
    title,
    subtitle,
    icon,
    editable: false
}];

function onInput(key) {
    var data = [];
    if (this.term.startsWith('calc ') && key) {
        this.render(key);
        return;
    }
    try {
        let result = mathexp.eval(this.str);
        data = [
            {
                key: title,
                icon: icon,
                title: result,
                desc: subtitle

            }
        ];
    }
    catch (e) {}

    return data;
}

function onEnter(id, elem) {
    let text = $(elem).find('.ec-item-title').text();

    util.copyToClipboard(text);
}

export default {
    version,
    name: 'Calculator',
    icon,
    title,
    commands,
    onInput: onInput,
    onEnter: onEnter
};