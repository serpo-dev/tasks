const string = 'AAAAABBBBBBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCCAAAAAAAAAAAADDDDDFGGGGHGG';

function compressString(string) {
    let ans = [string[0]];
    let cnt = 0;
    for (const i in string) {
        if (string[i] === ans.at(-1)) {
            cnt++;
        } else {
            ans.push(cnt);
            ans.push(string[i]); 
            cnt = 1;
        };    
    };
    ans.push(cnt);
    return ans.join('');
};

console.log(compressString(string));
//  expected output: A5B18C18A12D5F1G4H1G2