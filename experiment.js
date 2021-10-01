/**
 * Author:
 * Cuterwrite
 */


/* Blocks: HTML DOM Settings */

var set_html_style = {
    type: 'call-function',
    func: function() {
        document.body.style.backgroundColor = 'rgb(250, 250, 250)' // background color
        document.body.style.color = 'black' // font color
        document.body.style.fontSize = '20pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'bold' // 'normal', 'bold'
        document.body.style.lineHeight = '1.6em' // line space
        document.body.style.cursor = 'default' // 'default', 'none', 'wait', ...
        document.body.onselectstart = function() { return false } // 禁止选中文字 <body oncontextmenu="return false">
        document.body.oncontextmenu = function() { return false } // 禁用鼠标右键 <body onselectstart="return false">
        document.onkeydown = function() {
            // 屏蔽键盘按键 (https://www.bejson.com/othertools/keycodes/)
            if ((event.keyCode in { 27: 'Esc', 116: 'F5', 123: 'F12' }) ||
                (event.ctrlKey && event.keyCode in { 85: 'U' })
            ) { return false }
        }
    },
}

/* Blocks: Basics */

var welcome = {
    type: 'html-keyboard-response',
    stimulus: `欢迎参与实验，请按空格键开始`,
    choices: [' '],
    post_trial_gap: 100
}


/* Blocks: Posner Cueing Experiments */
var fixation = {
    type: 'html-keyboard-response',
    stimulus: `<div class="container"><div class="square"></div><div class="plus">+</div><div class="square"
  ></div></div>`,
    choices: jsPsych.NO_KEYS,
    prompt: '<p style="font-size:16pt; color:red;">F键对应左边的方框，J键对应右边的方框</p>',
    data: {
        task: 'fixation',
    },
    trial_duration: 0,
};

var test_variables = [
    // valid cueing和invalid cueing的比例为4：1
    // valid cueing
    { cue: `<div class="container"><div class="square-bold"></div><div class="plus">+
    </div><div class="square"></div></div>`, stimulus: `<div class="container"><div class="square">★</div><div class="plus">+
    </div><div class="square"></div></div>`, correct_response: 'f' },
    // invalid cueing
    { cue: `<div class="container"><div class="square-bold"></div><div class="plus">+
    </div><div class="square"></div></div>`, stimulus: `<div class="container"><div class="square"></div><div class="plus">+
    </div><div class="square">★</div></div>`, correct_response: 'j' },
    // invalid cueing
    { cue: `<div class="container"><div class="square"></div><div class="plus">+
    </div><div class="square-bold"></div></div>`, stimulus: `<div class="container"><div class="square">★</div><div class="plus">+
    </div><div class="square"></div></div>`, correct_response: 'f' },
    // valid cueing
    { cue: `<div class="container"><div class="square"></div><div class="plus">+
    </div><div class="square-bold"></div></div>`, stimulus: `<div class="container"><div class="square"></div><div class="plus">+
    </div><div class="square">★</div></div>`, correct_response: 'j' },
    // valid cueing
    { cue: `<div class="container"><div class="square-bold"></div><div class="plus">+
    </div><div class="square"></div></div>`, stimulus: `<div class="container"><div class="square">★</div><div class="plus">+
    </div><div class="square"></div></div>`, correct_response: 'f' },
    // valid cueing
    { cue: `<div class="container"><div class="square-bold"></div><div class="plus">+
    </div><div class="square"></div></div>`, stimulus: `<div class="container"><div class="square">★</div><div class="plus">+
    </div><div class="square"></div></div>`, correct_response: 'f' },
    // valid cueing
    { cue: `<div class="container"><div class="square-bold"></div><div class="plus">+
    </div><div class="square"></div></div>`, stimulus: `<div class="container"><div class="square">★</div><div class="plus">+
    </div><div class="square"></div></div>`, correct_response: 'f' },
    // valid cueing
    { cue: `<div class="container"><div class="square"></div><div class="plus">+
    </div><div class="square-bold"></div></div>`, stimulus: `<div class="container"><div class="square"></div><div class="plus">+
    </div><div class="square">★</div></div>`, correct_response: 'j' },
    // valid cueing
    { cue: `<div class="container"><div class="square"></div><div class="plus">+
    </div><div class="square-bold"></div></div>`, stimulus: `<div class="container"><div class="square"></div><div class="plus">+
    </div><div class="square">★</div></div>`, correct_response: 'j' },
    // valid cueing
    { cue: `<div class="container"><div class="square"></div><div class="plus">+
    </div><div class="square-bold"></div></div>`, stimulus: `<div class="container"><div class="square"></div><div class="plus">+
    </div><div class="square">★</div></div>`, correct_response: 'j' },

]

var cueing = {
    type: 'html-keyboard-response',
    stimulus: jsPsych.timelineVariable('cue'),
    choices: jsPsych.NO_KEYS,
    data: {
        task: 'cue',
    },
    prompt: '<p style="font-size:16pt; color:red;">F键对应左边的方框，J键对应右边的方框</p>',
    trial_duration: 250,
}

var stimuli = {
    type: 'categorize-html',
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['f', 'j'],
    prompt: '<p style="font-size:16pt; color:red;">F键对应左边的方框，J键对应右边的方框</p>',
    data: {
        task: 'response',
        correct_response: jsPsych.timelineVariable('correct_response'),
    },
    key_answer: function() {
        var correct_letter = jsPsych.timelineVariable('correct_response', true);
        if (correct_letter == 'j') {
            return 74;
        }
        return 70;
    },
    correct_text: `<p style="font-size:16pt; color:red;">回答正确！</p>`,
    incorrect_text: `<p style="font-size:16pt; color:red;">回答错误！</p>`,
    feedback_duration: 1000,
    on_load: function() {
        jsPsych.pluginAPI.setTimeout(function() {
            jsPsych.endExperiment('用户未反应超过三十秒<br/>');
        }, 30000);
    },
    on_finish: function() {
        jsPsych.pluginAPI.clearAllTimeouts();
    }
    // show_feedback_on_timeout: false,
    // timeout_message: `超时！`,
    // trial_duration: 30000,
}


var test_procedure = {
    timeline: [fixation, cueing, fixation, stimuli],
    timeline_variables: test_variables,
    randomize_order: true,
    repetitions: 1,
}

/* Combine Timelines */


var main_timeline = [
    set_html_style,
    welcome,
    test_procedure,
]

