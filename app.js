$(document).ready(function () {
    var delay = 300,
        interval = getUrlParameter("interval") ? getUrlParameter("interval") : 60,
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
                "name": "II - Flauros (Lancer)",
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
                "name": "III - Forneus (Caster)",
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
                "name": "IV - Barbatos (Assassin)",
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
                "name": "V - Halphas (Berserker)",
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
                "id": "amon_ra",
                "image": "assets/raid6.png",
                "name": "VI - Amon Ra (Rider)",
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
                "name": "VII - Sabnock (Archer)",
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
                "name": "X - Andromalius (Saber)",
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

    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

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