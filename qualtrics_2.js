Qualtrics.SurveyEngine.addOnload(function()
{
    // Retrieve Qualtrics object and save in qthis
    var qthis = this;

    // Hide buttons
    qthis.hideNextButton();



    var task_github = "https://sharonyu424.github.io/RT-experiment/"; // https://<your-github-username>.github.io/<your-experiment-name>

    // requiredResources must include all the JS files that demo-simple-rt-task-transformed.html uses.
    var requiredResources = [
        task_github + "jspsych-6.0/jspsych.js",
        task_github + "jspsych-6.0/plugins/jspsych-html-keyboard-response.js",
        task_github + "jspsych-6.0/plugins/jspsych-call-function.js",
        task_github + "jspsych-6.0/plugins/jspsych-fullscreen.js",
        task_github + "jspsych-6.0/plugins/jspsych-html-button-response.js",
        task_github + "jspsych-6.0/plugins/jspsych-survey-multi-select.js",
        task_github + "jspsych-6.0/plugins/jspsych-html-slider-response.js",
        task_github + "jspsych-6.0/plugins/jspsych-instructions.js",
        task_github + "jspsych-6.0/plugins/jspsych-categorize-html.js",
        task_github + "jspsych-6.0/plugins/jspsych-survey-text.js",
        task_github + "jspsych-6.0/plugins/jspsych-image-keyboard-response.js",
		task_github + "jspsych-6.0/css/jspsych.css",
        task_github + "experiment.js"
    ];



    function loadScript(idx) {
        console.log("Loading ", requiredResources[idx]);
        jQuery.getScript(requiredResources[idx], function () {
            if ((idx + 1) < requiredResources.length) {
                loadScript(idx + 1);
            } else {
                initExp();
            }
        });
    }

    if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
        loadScript(0);
    }

    jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
    jQuery("<div id = 'display_stage'></div>").appendTo('body');

    function initExp() {
        jsPsych.init({
            timeline: main_timeline,
            display_element: 'display_stage',
            on_finish: function() {
                jsPsych.data.get().localSave('csv', `Posner-cueing-task.csv`) // download from browser
                document.getElementById('jspsych-content').innerHTML += '实验结束，感谢您的参与！'
                jQuery('#display_stage').remove();
                jQuery('#display_stage_background').remove();
                qthis.clickNextButton();
            },
            show_progress_bar: true,
            default_iti: 500,

            })
    }
});


Qualtrics.SurveyEngine.addOnReady(function()
{
    /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function()
{
    /*Place your JavaScript here to run when the page is unloaded*/

});