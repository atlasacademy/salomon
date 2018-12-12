$(document).ready(function () {
    $('.raid').on('hide.bs.collapse', function () {
        $(this).closest(".raid").addClass("hide");
    }).on('show.bs.collapse', function () {
        $(this).closest(".raid").removeClass("hide");
    });

    var ctx = document.getElementById("raid2_chart").getContext('2d');
    var myChart = new Chart(ctx, {
        "type": "bar",
        "data": {
            "labels": ["11:30", "11:35", "11:40", "11:45", "11:50", "11:55", "now"],
            "datasets": [
                {
                    "type": "line",
                    "label": "HP",
                    "yAxisID": "HP",
                    "data": [100, 95, 76, 40, 34, 28, 15],
                    // "fill": false,
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
                    "data": [0, 500000, 1900000, 3600000, 1400000, 600000, 1300000],
                }

            ]
        },
        "options": {
            "maintainAspectRatio": false,
            scales: {
                yAxes: [
                    {
                        id: "HP",
                        type: 'linear',
                        position: "left"
                    },
                    {
                        id: "DPS",
                        type: 'linear',
                        position: "right",
                        gridLines: {
                            display: false
                        }
                    }
                ]
            }
        }
    });
});