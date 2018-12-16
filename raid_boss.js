var RaidBoss = function (options) {
    var t = this,
        data = {
            "labels": [],
            "hps": [],
            "kps": []
        },
        element,
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
            "fillColor": "#FFFFFF"
        };

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
            "label": "Kills Per Second",
            "yAxisID": "KPS",
            "backgroundColor": settings.fillColor,
            "borderColor": settings.borderColor,
            "borderWidth": 2,
            "hoverBackgroundColor": settings.fillColor,
            "data": [],
        });
    };

    this.update = function () {
        var newData = settings.raidData.getData(settings.id, settings.interval, settings.segments),
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
    };

    this.construct(options);
};