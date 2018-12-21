var RaidBoss = function (options) {
    var t = this,
        data = {
            "labels": [],
            "hps": [],
            "kps": []
        },
        element,
        estimateTimeOfDeath,
        hpsKey,
        kpsKey,
        settings = {
            "id": "",
            "image": "",
            "name": "",
            "chart": null,
            "raidData": null,
            "interval": 5,
            "segments": 20,
            "borderColor": "#000000",
            "fillColor": "#FFFFFF",
            "bossHp": 1,
            "bossTotal": 2000000,
            "inverseHp": true
        },
        timerRunning = false;

    this.construct = function (options) {
        settings = $.extend(settings, options);
        element = $('#template>.raid').clone();
        element.css("background-color", settings.fillColor);
        element.css("border-color", settings.borderColor);
        element.css("color", settings.borderColor);
        element.find(".icon").attr("src", settings.image);
        element.find(".title").text(settings.name);

        $('#raids').append(element);
    };

    this.insertHpsDataset = function () {
        hpsKey = settings.chart.data.datasets.length;
        settings.chart.data.datasets.push({
            "type": "line",
            "label": "HP Remaining",
            "yAxisID": "HP",
            "data": [],
            "backgroundColor": settings.fillColor,
            "borderColor": settings.borderColor,
            "borderWidth": 2,
            "fill": false,
            "pointHoverBackgroundColor": settings.fillColor,
            "lineTension": 0
        });
    };

    this.insertKpsDataset = function () {
        kpsKey = settings.chart.data.datasets.length;
        settings.chart.data.datasets.push({
            "type": "bar",
            "label": "Kills",
            "yAxisID": "KPS",
            "backgroundColor": settings.fillColor,
            "borderColor": settings.borderColor,
            "borderWidth": 2,
            "hoverBackgroundColor": settings.fillColor,
            "data": [],
        });
    };

    this.update = function () {
        var newData = settings.raidData.getData({
                "id": settings.id,
                "interval": settings.interval,
                "segments": settings.segments,
                "bossHp": settings.bossHp,
                "bossTotal": settings.bossTotal
            }),
            index;

        for (var x in newData.labels) {
            index = data.labels.map(function (time) {
                return time.unix();
            }).indexOf(newData.labels[x].unix());
            if (index === -1) {
                data.labels.push(newData.labels[x]);
                data.hps.push(newData.hps[x]);
                data.kps.push(newData.kps[x]);
            } else {
                data.hps[index] = newData.hps[x];
                data.kps[index] = newData.kps[x];
            }
        }

        settings.chart.data.labels = data.labels;
        settings.chart.data.datasets[hpsKey].data = data.hps;
        settings.chart.data.datasets[kpsKey].data = data.kps;

        var currentHpPercent = settings.raidData.getHpPercent(settings.id, moment());
        if (currentHpPercent === 0) {
            element.find(".status").text("DEFEATED");
        } else {
            element.find(".status").text(currentHpPercent  + " %");
        }


        var startTime = moment().subtract(30, "minutes"),
            endTime = moment(),
            currentHp = settings.raidData.getHp(settings.id, endTime, settings.bossTotal),
            kps = settings.raidData.getKps(settings.id, startTime, endTime, settings.bossHp, settings.bossTotal);

        if (currentHpPercent === 0 || kps === 0) {
            estimateTimeOfDeath = null;
        } else {
            var killRemaining = currentHp / settings.bossHp,
                secondsRemaining = killRemaining / kps;

            estimateTimeOfDeath = moment().add(secondsRemaining, "seconds");
        }

        if (!timerRunning) {
            window.setInterval(function () {
                if (estimateTimeOfDeath === null) {
                    element.find(".time_remaining").text("Remaining: Unknown");
                } else {
                    element.find(".time_remaining").text("Remaining: " + estimateTimeOfDeath.toNow(true));
                }
            });

            timerRunning = true;
        }
    };

    this.construct(options);
};