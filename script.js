let cnt = 15;
let newCub;
let lst = document.querySelector('.field');
let st = new Set();
let len = cnt * cnt;
for (let i = 1; i <= cnt * cnt; i++) {
    st.add(i);
    newCub = document.createElement('div');
    newCub.classList.add('cub');
    lst.appendChild(newCub);
}

let left1 = document.querySelector('.left');
let right1 = document.querySelector('.right');
let top1 = document.querySelector('.top');
let bottom1 = document.querySelector('.bottom');
for (let i = 0; i < 6; i++) {
    newCub = document.createElement('div');
    newCub.classList.add('cub-l');
    left1.appendChild(newCub);
    newCub = document.createElement('div');
    newCub.classList.add('cub-r');
    right1.appendChild(newCub);
    newCub = document.createElement('div');
    newCub.classList.add('cub-t');
    top1.appendChild(newCub);
    newCub = document.createElement('div');
    newCub.classList.add('cub-b');
    bottom1.appendChild(newCub);
}

document.querySelector('.cub-l:nth-child(1)').classList.add('white');
document.querySelector('.cub-l:nth-child(5)').classList.add('white');
document.querySelector('.cub-r:nth-child(2)').classList.add('white');
document.querySelector('.cub-r:nth-child(6)').classList.add('white');
document.querySelector('.cub-t:nth-child(1)').classList.add('white');
document.querySelector('.cub-t:nth-child(3)').classList.add('white');
document.querySelector('.cub-b:nth-child(4)').classList.add('white');
document.querySelector('.cub-b:nth-child(6)').classList.add('white');

let xy = function(x, y) {
    return (y - 1) * cnt + x;
};

let xy_add = function(x, y) {
    let t = (y - 1) * cnt + x;
    let s = '.cub:nth-child(' + t + ')';
    document.querySelector(s).classList.add('snake');
};

let xy_remove = function(x, y) {
    let t = (y - 1) * cnt + x;
    let s = '.cub:nth-child(' + t + ')';
    document.querySelector(s).classList.remove('snake');
};

let sxy_add = function(t) {
    let s = '.cub:nth-child(' + t + ')';
    document.querySelector(s).classList.add('apple');
};

let spawn = function() {
    let stop = Math.floor(Math.random() * len);
    let ans;
    for (let i of st) {
        if (stop == 0) {
            ans = i;
            break;
        }
        stop--;
    }
    sxy_add(ans);
};
let x = y = 1;
let sp = [[x, y]];
let nx = 1, ny = 0;
st.delete(xy(x, y));
len--;
xy_add(x, y);
spawn();
let nn = 1, per = 1;
let left = document.querySelector('.left');
left.onclick = function() {
    if (per && !nn) {
        nx = -1;
        ny = 0;
        per = 0;
        nn = 1;
    }
};
let right = document.querySelector('.right');
right.onclick = function() {
    if (per && !nn) {
        nx = 1;
        ny = 0;
        per = 0;
        nn = 1;
    }
};
let topp = document.querySelector('.top');
topp.onclick = function() {
    if (per && nn) {
        nx = 0;
        ny = -1;
        per = 0;
        nn = 0;
    }
};
let bottom = document.querySelector('.bottom');
bottom.onclick = function() {
    if (per && nn) {
        nx = 0;
        ny = 1;
        per = 0;
        nn = 0;
    }
};
let mx = 1;
let tek = 1;
let f = true;
//let cooldown = false;
window.onload = function() {
    document.addEventListener('keydown', func);
    setInterval(ff, 1000 / 60);
};
function func(evt) {
    /*if (cooldown) {
        return false;
    }*/
    if (evt.keyCode == 37) {
        if (per && !nn) {
            nx = -1;
            ny = 0;
            per = 0;
            nn = 1;
        }
    }
    if (evt.keyCode == 38) {
        if (per && nn) {
            nx = 0;
            ny = -1;
            per = 0;
            nn = 0;
        }
    }
    if (evt.keyCode == 39) {
        if (per && !nn) {
            nx = 1;
            ny = 0;
            per = 0;
            nn = 1;
        }
    }
    if (evt.keyCode == 40) {
        if (per && nn) {
            nx = 0;
            ny = 1;
            per = 0;
            nn = 0;
        }
    }
    //cooldown = true;
    //setTimeout(function() {cooldown = false;}, 100);
}
function ff() {
    if (f) {
        loop();
    }
};
function loop() {
    f = false;
    x += nx;
    y += ny;
    per = 1;
    if (x > cnt) {
        x = 1;
    }
    if (y > cnt) {
        y = 1;
    }
    if (x < 1) {
        x = cnt;
    }
    if (y < 1) {
        y = cnt;
    }
    let t = xy(x, y);
    st.delete(t);
    len--;
    let s = '.cub:nth-child(' + t + ')';
    if (document.querySelector(s).classList.contains('apple')) {
        document.querySelector(s).classList.remove('apple');
        spawn();
        tek++;
        if (tek > mx) {
            mx = tek;
            s = 'макс:' + mx;
            document.querySelector('.text').textContent = s;
        }
    }
    else {
        xy_remove(sp[0][0], sp[0][1]);
        st.add(xy(sp[0][0], sp[0][1]));
        sp.shift();
        len++;
        while (document.querySelector(s).classList.contains('snake')) {
            tek--;
            xy_remove(sp[0][0], sp[0][1]);
            st.add(xy(sp[0][0], sp[0][1]));
            sp.shift();
            len++;
        }
    }
    sp.push([x, y]);
    xy_add(x, y);
    setTimeout(function() {f = true;}, 1000 / (3 + sp.length * 0.3));
};
