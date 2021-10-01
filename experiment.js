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
        document.body.style.fontFamily = 'Times New Roman'
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
var open_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: true,
    message: `
    <p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
    <b>
    测验将在一个「全屏页面」开始，为确保最佳效果，请你：<br/>
    （1）在电脑上进行测验，并使用主流浏览器打开本网页<br/>
    &emsp;&emsp;（Chrome、Edge、Firefox、Safari等，不要用IE）<br/>
    （2）关掉电脑上其他正在运行的程序或将其最小化<br/>
    （3）将手机调至静音，并尽可能减少环境噪音干扰<br/>
    （4）在测验过程中不要退出全屏<br/>
    </b>
    如果你同意参与，并且清楚理解了上述要求，请点击开始：
    </p>`,
    button_label: '点击这里全屏开始',
    delay_after: 100
}

var welcome = {
    type: 'html-keyboard-response',
    stimulus: `Welcome`,
    choices: [' '],
    post_trial_gap: 100
}


var close_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: false,
    delay_after: 0
}


/* Blocks: Posner Cueing Experiments */
var fixation = {
    type: 'html-keyboard-response',
    stimulus: `<div class="container"><div class="square"></div><div class="plus">+</div><div class="square"
  ></div></div>`,
    choices: jsPsych.NO_KEYS,
    prompt: '<p style="font-size:16pt; color:red;">F J</p>',
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
    prompt: '<p style="font-size:16pt; color:red;">F J</p>',
    trial_duration: 250,
}

var stimuli = {
    type: 'categorize-html',
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: ['f', 'j'],
    prompt: '<p style="font-size:16pt; color:red;">F J</p>',
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
    correct_text: `<p style="font-size:16pt; color:red;">Right！</p>`,
    incorrect_text: `<p style="font-size:16pt; color:red;">Wrong！</p>`,
    feedback_duration: 1000,
    on_load: function() {
        jsPsych.pluginAPI.setTimeout(function() {
            jsPsych.endExperiment('over 30s<br/>');
        }, 30000);
    },
    on_finish: function() {
        jsPsych.pluginAPI.clearAllTimeouts();
    }
    // show_feedback_on_timeout: false,
    // timeout_message: `Timeout！`,
    // trial_duration: 30000,
}


var test_procedure = {
    timeline: [fixation, cueing, fixation, stimuli],
    timeline_variables: test_variables,
    randomize_order: true,
    repetitions: 5,
}

/* Combine Timelines */


var main_timeline = [
    set_html_style,
    welcome,
    test_procedure,
]

