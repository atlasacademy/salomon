$(document).ready(function () {
    var delay = 300,
        interval = 15,
        segments = 10,
        chart = new Chart($('#chart').get(0).getContext("2d"), {
            "type": "bar",
            "data": {
                "labels": [],
                "datasets": []
            },
            "options": {
                "legend": {
                    "display": false
                },
                "maintainAspectRatio": false,
                "scales": {
                    "xAxes": [{
                        "type": "realtime",
                        "realtime": {
                            "duration": (60 * 1000) * interval * segments
                        }
                    }],
                    "yAxes": [
                        {
                            "id": "HP",
                            "type": 'linear',
                            "position": "left",
                            "ticks": {
                                "min": 0,
                                "max": 100
                            }
                        },
                        {
                            "id": "KPS",
                            "type": 'linear',
                            "position": "right",
                            "gridLines": {
                                "display": false
                            },
                            "ticks": {
                                "min": 0
                            }
                        }
                    ]
                }
            }
        }),
        raidData = new RaidData(),
        bosses = [
            new RaidBoss({
                "id": "flauros",
                "image": "assets/raid2.png",
                "name": "2nd Seat - Flauros",
                "chart": chart,
                "raidData": raidData,
                "interval": interval,
                "segments": segments,
                "borderColor": "#856404",
                "fillColor": "#fff3cd",
                "bossHp": 1,
                "bossTotal": 2000000
            }),
            new RaidBoss({
                "id": "forneus",
                "image": "assets/raid3.png",
                "name": "3rd Seat - Forneus",
                "chart": chart,
                "raidData": raidData,
                "interval": interval,
                "segments": segments,
                "borderColor": "#0c5460",
                "fillColor": "#d1ecf1",
                "bossHp": 1,
                "bossTotal": 2000000
            }),
            new RaidBoss({
                "id": "barbatos",
                "image": "assets/raid4.png",
                "name": "4th Seat - Barbatos",
                "chart": chart,
                "raidData": raidData,
                "interval": interval,
                "segments": segments,
                "borderColor": "#6c757d",
                "fillColor": "#d6d8d9",
                "bossHp": 1,
                "bossTotal": 2000000
            }),
            new RaidBoss({
                "id": "halphas",
                "image": "assets/raid5.png",
                "name": "5th Seat - Halphas",
                "chart": chart,
                "raidData": raidData,
                "interval": interval,
                "segments": segments,
                "borderColor": "#322348",
                "fillColor": "#cbbde2",
                "bossHp": 1,
                "bossTotal": 2000000
            }),
            new RaidBoss({
                "id": "amon",
                "image": "assets/raid6.png",
                "name": "6th Seat - Amon Ra",
                "chart": chart,
                "raidData": raidData,
                "interval": interval,
                "segments": segments,
                "borderColor": "#721c24",
                "fillColor": "#f8d7da",
                "bossHp": 1,
                "bossTotal": 2000000
            }),
            new RaidBoss({
                "id": "sabnock",
                "image": "assets/raid7.png",
                "name": "7th Seat - Sabnock",
                "chart": chart,
                "raidData": raidData,
                "interval": interval,
                "segments": segments,
                "borderColor": "#000000",
                "fillColor": "#6c757d",
                "bossHp": 1,
                "bossTotal": 2000000
            }),
            new RaidBoss({
                "id": "andromalius",
                "image": "assets/raid10.png",
                "name": "10th Seat - Andromalius",
                "chart": chart,
                "raidData": raidData,
                "interval": interval,
                "segments": segments,
                "borderColor": "#343a40",
                "fillColor": "#ffc107",
                "bossHp": 1,
                "bossTotal": 6000000
            })
        ];

    init();

    // end of script

    function init() {
        bosses.map(function (boss) {
            boss.insertHpsDataset();
        });
        bosses.map(function (boss) {
            boss.insertKpsDataset();
        });
        chart.update();

        update();
        window.setInterval(update, delay * 1000);
    }

    function update() {
        raidData.fetch(function () {
            bosses.map(function (boss) {
                boss.update();
            });

            chart.update();
        });
    }

});