const fs_1 = require("fs");
const file = fs_1.readFileSync("data.txt", "utf8");

const data = file.split('\r\n');

const schedule = [];
const ans = [];

for (let i = 1; i < Number(data[0]); i++) {
    const prep = data[i].split(' ');

    const type = prep.splice(0, 1)[0];
    const day = Number(prep.splice(0, 1)[0]);

    switch (type) {
        case 'APPOINT':
            const time = prep.splice(0, 1)[0];
            const time_h = Number(time.split(':')[0]);
            const time_min = Number(time.split(':')[1]);
            const time_start = time_h * 60 + time_min;
            const dur = Number(prep.splice(0, 1)[0]);
            const time_end = time_start + dur;

            const cnt = prep.splice(0, 1)[0];
            const names = [...prep];

            if (schedule.length === 0) {
                schedule.push({
                    day,
                    start: time_start,
                    end: time_end,
                    cnt,
                    names,
                });
                ans.push('OK');
                break;
            }
            let isNewDay = true;
            for (const j in schedule) {
                const isDay = schedule[j].day === day;
                if (isDay) {
                    const isStart = time_start < schedule[j].start || time_start >= schedule[j].end;
                    const isEnd = time_end <= schedule[j].start || time_end > schedule[j].end;
                    console.log(isStart, isEnd)
                    if (isStart && isEnd) {
                        schedule.push({
                            day,
                            start: time_start,
                            end: time_end,
                            cnt,
                            names,
                        });
                        ans.push('OK');
                        isNewDay = false;
                        break;
                    } else {
                        ans.push('FAIL');
                        isNewDay = false;
                        break;
                    };
                };
            };
            if (isNewDay) {
                schedule.push({
                    day,
                    start: time_start,
                    end: time_end,
                    cnt,
                    names,
                });
            };
            break;

        case 'PRINT':
            const name = prep[0];
            const noOrderedAppoints = [];
            for (const k in schedule) {
                let isName = false;
                for (const m in schedule[k].names) {
                    if (schedule[k].names[m] === name) {
                        isName = true;
                        break;
                    };
                };
                if (isName && schedule[k].day === day) {
                    noOrderedAppoints.push(schedule[k]);
                };
            };
            if (noOrderedAppoints) {
                const ordered = noOrderedAppoints.sort((a, b) => a.start - b.start);
                ordered.forEach((obj) => {
                    let start_min = obj.start % 60;
                    if (start_min === 0) {
                        start_min = '00'
                    };
                    const start_h = Math.floor(obj.start / 60);
                    const start = start_h + ':' + start_min;
                    const dur = obj.end - obj.start;
                    const names = returnNames(obj.names);
                    function returnNames(array) {
                        const names = [];
                        for (const i in array) {
                            names.push(array[i]);
                        };
                        const result = names.join(' ');
                        return result;
                    };
                    ans.push(start + ' ' + dur + ' ' + names);
                });
            };
            break;
    };
};

ans.forEach((child) => console.log(child));