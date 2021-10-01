Qualtrics.SurveyEngine.addOnload(function() {
    /*Place your JavaScript here to run when the page loads*/
    // Retrieve Qualtrics object and save in qthis
    var qthis = this;

    // Hide buttons
    qthis.hideNextButton();

    var task_cdn = "https://cdn.jsdelivr.net/npm/jspsych@6.0.0/";
    var task_github = "https://sharonyu424.github.io/RT-experiment/";

    // requiredResources must include all the JS files that demo-simple-rt-task-transformed.html uses.
    var requiredResources = [
        task_cdn + "jspsych.js",
        task_cdn + "plugins/jspsych-html-keyboard-response.js",
        task_cdn + "plugins/jspsych-call-function.js",
        task_cdn + "plugins/jspsych-fullscreen.js",
        task_cdn + "plugins/jspsych-categorize-html.js",
        task_github + "experiment.js",
    ];

    function loadScript(idx) {
        console.log("Loading ", requiredResources[idx]);
        jQuery.getScript(requiredResources[idx], function() {
            if ((idx + 1) < requiredResources.length) {
                loadScript(idx + 1);
            } else {
                initExp();
            }
        });
    }

    function initExp() {
        jsPsych.init({
            timeline: main_timeline,
            on_finish: function(data) {
                // 存入文件
                // jsPsych.data.get().localSave('csv', `Posner-cueing-task.csv`) // download from browser
                // 汇总统计数据
                var df = jsPsych.data.get().filter({ task: 'response' });
                var max_time = df.select('rt').max();
                var min_time = df.select('rt').min();
                var average = df.select('rt').mean();
                var acc = Math.round(df.filter({ correct: true }).count() / df.count() * 100);
                document.getElementById('jspsych-content').innerHTML += `实验结束，感谢您的参与！`;

                // save to qualtrics embedded data
                Qualtrics.SurveyEngine.setEmbeddedData("accuracy", acc);
                Qualtrics.SurveyEngine.setEmbeddedData("min_time", min_time);
                Qualtrics.SurveyEngine.setEmbeddedData("max_time", max_time);
                Qualtrics.SurveyEngine.setEmbeddedData("average_time", average);

                /* Change 6: Adding the clean up and continue functions.*/
                // clear the stage
                jQuery('#display_stage').remove();
                jQuery('#display_stage_background').remove();

                // simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
                qthis.clickNextButton();
            },
            display_element: 'display_stage',
            show_progress_bar: true,
            default_iti: 500,
        })
    }

    if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
        loadScript(0);
    }

    // jQuery is loaded in Qualtrics by default
    jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
    jQuery("<div id = 'display_stage'></div>").appendTo('body');


});

Qualtrics.SurveyEngine.addOnReady(function() {
    /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function() {
    /*Place your JavaScript here to run when the page is unloaded*/

});