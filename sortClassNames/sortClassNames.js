const classNames = ['header', 'menu', 'menu-item', 'menu-item', 'menu-item', 'footer', 'menu', 'link', 'link', 'link', 'link'];

const classNamesCount = {};
const uniqClassNames = [];

for (const i in classNames) {
    const existing = classNamesCount[classNames[i]];
    if (existing) {
        classNamesCount[classNames[i]] += 1;
    } else {
        classNamesCount[classNames[i]] = 1;
        uniqClassNames.push(classNames[i]);
    };
};

const result = uniqClassNames.sort((a, b) => classNamesCount[b] - classNamesCount[a]);

//  or without declaring uniqClassNames:
//  const result = Object.keys(classNamesCount).sort((a, b) => classNamesCount[b] - classNamesCount[a]);

console.log(result);