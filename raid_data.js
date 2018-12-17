var RaidData = function () {
    var t = this,
        apiKey = "AIzaSyCUBf747HBCMqntUWvjyjEf3q3GqhMW4vE",
        sheetDateFormat = "MM/DD/YYYY HH:mm:ss",
        sheetUri = "https://sheets.googleapis.com/v4/spreadsheets/",
        sheetId = "1V8BhdZ0mT0IA0rX6xf_YNE31L3vo2W5moaM1MTNcuyQ",
        sheetRange = "Results!A:F",
        sheetEndpoint = sheetUri + sheetId + "/values/" + sheetRange + "?key=" + apiKey,
        rawData = [];

    this.construct = function () {

    };

    this.fetch = function (successfulCallback, failureCallback) {
        $.ajax({
            "url": sheetEndpoint,
            "dataType": "json",
            "error": function (jqXHR, textStatus, errorThrown) {
                failureCallback(errorThrown);
            },
            "success": function (result) {
                rawData = result.values.slice(1);

                if (successfulCallback !== undefined)
                    successfulCallback.call(null, result.values);
            }
        });
    };

    this.getData = function (options) {
        options = $.extend({
            "id": "",
            "interval": 60,
            "segments": 10,
            "bossHp": 1,
            "bossTotal": 2000000
        }, options);

        var data = {
                "labels": [],
                "hps": [],
                "kps": []
            },
            intervalDuration = options.interval * 60 * 1000,
            intervalEndSegment = Math.ceil(Date.now() / intervalDuration),
            startTime,
            endTime;

        for (var i = 0; i < options.segments; i++) {
            startTime = moment((intervalEndSegment - options.segments + i) * intervalDuration);
            endTime = moment((intervalEndSegment - options.segments + i + 1) * intervalDuration);

            data.labels.push(startTime);
            data.hps.push(t.getHpPercent(options.id, endTime));
            data.kps.push(t.getKps(options.id, startTime, endTime, options.bossHp, options.bossTotal));

            // matchingData = rawData.filter(function (data) {
            //     var timeCaptured = moment(data[4]);
            //
            //     return data.length === 6
            //         && data[0] === id
            //         && timeCaptured.isSameOrAfter(startTime)
            //         && timeCaptured.isBefore(endTime);
            // });
            //
            //
        }

        return data;
    };

    this.getHp = function (id, time, bossTotal) {
        var latestData = rawData.filter(function (data) {
                var timeCaptured = moment(data[4], sheetDateFormat);

                return data.length === 6
                    && data[0] === id
                    && timeCaptured.isBefore(time);
            }).pop();

        return latestData === undefined ? bossTotal : latestData[3];
    };

    this.getHpPercent = function (id, time) {
        var latestData = rawData.filter(function (data) {
                var timeCaptured = moment(data[4], sheetDateFormat);

                return data.length === 6
                    && data[0] === id
                    && timeCaptured.isBefore(time);
            }).pop(),
            percent = latestData === undefined ? 100 : latestData[2];

        return Math.round(percent * 100) / 100;
    };

    this.getKps = function (id, startTime, endTime, bossHp, bossTotal) {
        var startingHp = t.getHp(id, startTime, bossTotal),
            endingHp = t.getHp(id, endTime, bossTotal),
            hpDifference = Math.abs(startingHp - endingHp),
            duration = endTime.unix() - startTime.unix(),
            kps = hpDifference / bossHp / duration;

        return Math.round(kps * 100) / 100;
    };

    this.construct();
};