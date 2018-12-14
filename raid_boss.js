var RaidBoss = function (options) {
    var t = this,
        chart,
        collapse,
        data = {
            "labels": [],
            "hps": [],
            "dps": []
        },
        element,
        settings = {
            "id": "",
            "image": "",
            "name": "",
            "raidData": null,
            "interval": 5,
            "segments": 20
        };

    this.construct = function (options) {
        settings = $.extend(settings, options);
        element = $('#template>.raid').clone();
        element.find(".icon").attr("src", settings.image);
        element.find(".title").text(settings.name);

        collapse = element.find(".collapse").collapse({
            "toggle": false
        });

        element.find(".icon, .title, .caret").click(t.toggle);

        $('#raids').append(element);

        chart = new Chart(element.find(".canvas").get(0).getContext("2d"), {
            "type": "bar",
            "data": {
                "labels": [],
                "datasets": [
                    {
                        "type": "line",
                        "label": "HP",
                        "yAxisID": "HP",
                        "data": [],
                        "backgroundColor": "#f5c6cb55",
                        "borderColor": "#721c24",
                        "borderWidth": 2,
                        "pointHoverBackgroundColor": "#f5c6cb99",
                        "lineTension": 0
                    },
                    {
                        "type": "bar",
                        "label": "DPS",
                        "yAxisID": "DPS",
                        "backgroundColor": "#cce5ffff",
                        "borderColor": "#0c5460",
                        "borderWidth": 2,
                        "hoverBackgroundColor": "#b8daff55",
                        "data": [],
                    }

                ]
            },
            "options": {
                "maintainAspectRatio": false,
                "scales": {
                    "xAxes": [{
                        "type": "realtime",
                        "realtime": {
                            duration: (60*1000) * settings.interval * settings.segments
                        }
                    }],
                    "yAxes": [
                        {
                            "id": "HP",
                            "type": 'linear',
                            "position": "left"
                        },
                        {
                            "id": "DPS",
                            "type": 'linear',
                            "position": "right",
                            "gridLines": {
                                "display": false
                            }
                        }
                    ]
                }
            }
        });
    };

    this.toggle = function () {
        if (element.hasClass("show")) {
            element.removeClass("show");
            collapse.collapse("hide");
        } else {
            element.addClass("show");
            collapse.collapse("show");
        }
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
                data.dps.push(newData.dps[x]);
            } else {
                data.hps[index] = newData.hps[x];
                data.dps[index] = newData.dps[x];
            }
        }

        chart.data.labels = data.labels;
        chart.data.datasets[0].data = data.hps;
        chart.data.datasets[1].data = data.dps;

        chart.update();
    };

    this.construct(options);
};