var RaidData = function () {
    var t = this,
        apiKey = "AIzaSyCUBf747HBCMqntUWvjyjEf3q3GqhMW4vE",
        sheetUri = "https://sheets.googleapis.com/v4/spreadsheets/",
        sheetId = "1V8BhdZ0mT0IA0rX6xf_YNE31L3vo2W5moaM1MTNcuyQ",
        sheetRange = "Results!A:F",
        sheetEndpoint = sheetUri + sheetId + "/values/" + sheetRange + "?key=" + apiKey,
        rawData = [];

    this.construct = function () {

    };

    this.fetch = function (successfulCallback, failureCallback) {
        successfulCallback.call(null, []);
        return;
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

    this.getData = function (id, interval, count) {
        var data = {
                "labels": [],
                "hps": [],
                "kps": []
            },
            intervalDuration = interval * 60 * 1000,
            intervalEndSegment = Math.ceil(Date.now() / intervalDuration),
            startTime,
            endTime,
            matchingData;

        for (var i = 0; i < count; i++) {
            startTime = moment((intervalEndSegment - count + i) * intervalDuration);
            endTime = moment((intervalEndSegment - count + i + 1) * intervalDuration);

            data.labels.push(startTime);
            data.hps.push(Math.random() * 100);
            data.kps.push(Math.random() * 1000000);

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

    this.construct();
};