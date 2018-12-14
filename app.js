$(document).ready(function () {
    var delay = 10,
        interval = 1,
        segments = 10,
        raidData = new RaidData(),
        bosses = [
            new RaidBoss({
                "id": "flauros",
                "image": "assets/raid2.png",
                "name": "2nd Seat - Flauros",
                "raidData": raidData,
                "interval": interval,
                "segments": segments
            })
        ];

    init();

    // end of script

    function init() {
        raidData.fetch(function () {
            bosses.map(function (boss) {
                boss.update();
                boss.toggle();
            });

            startFeed();
        });
    }

    function startFeed() {
        window.setInterval(function () {
            raidData.fetch(function () {
                bosses.map(function (boss) {
                    boss.update();
                });
            });
        }, delay * 1000);
    }

});