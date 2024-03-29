﻿///<jscompress sourcefile="msg.js" />
function write_int64(a) {
    var b = 0,
    d = [],
    negative = false;
    if (null == a && (a = "0"), "string" != typeof a) {
        throw "传入一个非string参数"
    }
    if (a.length > 1 && a[0] == "-") negative = true,
    a = a.replace("-", "");
    for (b = 0; b < a.length; b++) {
        if (a.charCodeAt(b) < 48 || a.charCodeAt(b) > 57) {
            throw "传入一个非int64参数"
        }
    }

    if (a.length > 19) {
        throw "超出int64范围"
    }

    if (negative) a = s_add("18446744073709551616", "-" + a);
    d = [0, 0, 0, 0, 0, 0, 0, 0];
    if (20 == a.length) {
        var e = "";
        for (b = 138; b < 256; b++) {
            var c = get_int64_8(b);
            if (compareint(a, c)) {
                d[7] = b;
                e = c
            } else {
                break;
            }

        }
        a = s_minus(a, e);
    }

    if (19 == a.length) {
        for (t = check_int64_19(a), a = s_minus(a, t.m), b = 0; 8 > b; b++) {
            null != t.b[b] && (d[b] = t.b[b])
        }
    }
    if (18 == a.length) {
        for (t = check_int64_18(a), a = s_minus(a, t.m), b = 0; 8 > b; b++) {
            null != t.b[b] && (d[b] = t.b[b])
        }
    }
    if (17 == a.length) {
        for (t = check_int64_17(a), a = s_minus(a, t.m), b = 0; 8 > b; b++) {
            null != t.b[b] && (d[b] = t.b[b])
        }
        if (17 == a.length) {
            for (t = check_int64_17(a), a = s_minus(a, t.m), b = 0; 8 > b; b++) {
                null != t.b[b] && (d[b] = t.b[b])
            }
        }
    }
    if (16 == a.length) {
        for (t = check_int64_16(a), a = s_minus(a, t.m), b = 0; 8 > b; b++) {
            null != t.b[b] && (d[b] = t.b[b])
        }
    }
    if (15 == a.length) {
        for (t = check_int64_15(a), a = s_minus(a, t.m), b = 0; 7 > b; b++) {
            null != t.b[b] && (d[b] = t.b[b])
        }
        if (15 == a.length) {
            for (t = check_int64_15(a), a = s_minus(a, t.m), b = 0; 7 > b; b++) {
                null != t.b[b] && (d[b] = t.b[b])
            }
        }
    }

    if (14 == a.length) {
        for (t = check_int64_14(a), a = s_minus(a, t.m), b = 0; 6 > b; b++) {
            null != t.b[b] && (d[b] = t.b[b])
        }
    }
    if (13 == a.length) {
        for (t = check_int64_13(a), a = s_minus(a, t.m), b = 0; 6 > b; b++) {
            null != t.b[b] && (d[b] = t.b[b])
        }
        if (13 == a.length) {
            for (t = check_int64_13(a), a = s_minus(a, t.m), b = 0; 6 > b; b++) {
                null != t.b[b] && (d[b] = t.b[b])
            }
        }
    }
    if (12 == a.length) {
        for (t = check_int64_12(a), a = s_minus(a, t.m), b = 0; 5 > b; b++) {
            null != t.b[b] && (d[b] = t.b[b])
        }
    }
    if (11 == a.length) {
        for (t = check_int64_11(a), a = s_minus(a, t.m), b = 0; 5 > b; b++) {
            null != t.b[b] && (d[b] = t.b[b])
        }
    }
    if (10 == a.length) {
        for (t = check_int64_10(a), a = s_minus(a, t.m), b = 0; 5 > b; b++) {
            null != t.b[b] && (d[b] = t.b[b])
        }
    }
    return e = Number(a),
    e > 0 && (d[3] = 255 & e >> 24, d[2] = 255 & e >> 16, d[1] = 255 & e >> 8, d[0] = 255 & e),
    d
}

function check_int64_10(a) {
    var d = "",
    b = [],
    c = {};
    switch (a[0]) {
    case "1":
    case "2":
    case "3":
    case "4":
        d = get_int64_5(1),
        compareint(a, d) ? (c.m = d, b[4] = 1) : c.m = "0";
        break;
    case "5":
    case "6":
    case "7":
        c.m = get_int64_5(1),
        b[4] = 1;
        break;
    case "8":
    case "9":
        for (var e = 1; 4 > e && (d = get_int64_5(e), compareint(a, d)); e++) {
            c.m = d,
            b[4] = e
        }
    }
    return c.b = b,
    c
}

function check_int64_11(a) {
    var d = 0,
    e = "",
    b = [],
    c = {};
    switch (a[0]) {
    case "1":
        for (d = 2; 6 > d && (e = get_int64_5(d), compareint(a, e)); d++) {
            c.m = e,
            b[4] = d
        }
        break;
    case "2":
        for (d = 4; 8 > d && (e = get_int64_5(d), compareint(a, e)); d++) {
            c.m = e,
            b[4] = d
        }
        break;
    case "3":
        for (d = 6; 11 > d && (e = get_int64_5(d), compareint(a, e)); d++) {
            c.m = e,
            b[4] = d
        }
        break;
    case "4":
        for (d = 9; 13 > d && (e = get_int64_5(d), compareint(a, e)); d++) {
            c.m = e,
            b[4] = d
        }
        break;
    case "5":
        for (d = 11; 15 > d && (e = get_int64_5(d), compareint(a, e)); d++) {
            c.m = e,
            b[4] = d
        }
        break;
    case "6":
        for (d = 13; 18 > d && (e = get_int64_5(d), compareint(a, e)); d++) {
            c.m = e,
            b[4] = d
        }
        break;
    case "7":
        for (d = 16; 20 > d && (e = get_int64_5(d), compareint(a, e)); d++) {
            c.m = e,
            b[4] = d
        }
        break;
    case "8":
        for (d = 18; 22 > d && (e = get_int64_5(d), compareint(a, e)); d++) {
            c.m = e,
            b[4] = d
        }
        break;
    case "9":
        for (d = 20; 25 > d && (e = get_int64_5(d), compareint(a, e)); d++) {
            c.m = e,
            b[4] = d
        }
    }
    return c.b = b,
    c
}

function check_int64_12(a) {
    var d = 0,
    e = "",
    b = [],
    c = {};
    switch (a[0]) {
    case "1":
        for (d = 23; 48 > d && (e = get_int64_5(d), compareint(a, e)); d++) {
            c.m = e,
            b[4] = d
        }
        break;
    case "2":
        for (d = 46; 71 > d && (e = get_int64_5(d), compareint(a, e)); d++) {
            c.m = e,
            b[4] = d
        }
        break;
    case "3":
        for (d = 69; 95 > d && (e = get_int64_5(d), compareint(a, e)); d++) {
            c.m = e,
            b[4] = d
        }
        break;
    case "4":
        for (d = 93; 118 > d && (e = get_int64_5(d), compareint(a, e)); d++) {
            c.m = e,
            b[4] = d
        }
        break;
    case "5":
        for (d = 116; 141 > d && (e = get_int64_5(d), compareint(a, e)); d++) {
            c.m = e,
            b[4] = d
        }
        break;
    case "6":
        for (d = 139; 164 > d && (e = get_int64_5(d), compareint(a, e)); d++) {
            c.m = e,
            b[4] = d
        }
        break;
    case "7":
        for (d = 162; 188 > d && (e = get_int64_5(d), compareint(a, e)); d++) {
            c.m = e,
            b[4] = d
        }
        break;
    case "8":
        for (d = 186; 211 > d && (e = get_int64_5(d), compareint(a, e)); d++) {
            c.m = e,
            b[4] = d
        }
        break;
    case "9":
        for (d = 209; 234 > d && (e = get_int64_5(d), compareint(a, e)); d++) {
            c.m = e,
            b[4] = d
        }
    }
    return c.b = b,
    c
}

function check_int64_13(a) {
    var d = 0,
    e = "",
    b = [],
    c = {};
    switch (a[0]) {
    case "1":
        if (d = get_int64_6(1), compareint(a, d)) {
            c.m = d,
            b[5] = 1
        } else {
            for (e = 232; 256 > e && (d = get_int64_5(e), compareint(a, d)); e++) {
                c.m = d,
                b[4] = e
            }
        }
        break;
    case "2":
        for (e = 1; 3 > e && (d = get_int64_6(e), compareint(a, d)); e++) {
            c.m = d,
            b[5] = e
        }
        break;
    case "3":
        for (e = 2; 4 > e && (d = get_int64_6(e), compareint(a, d)); e++) {
            c.m = d,
            b[5] = e
        }
        break;
    case "4":
        for (e = 3; 5 > e && (d = get_int64_6(e), compareint(a, d)); e++) {
            c.m = d,
            b[5] = e
        }
        break;
    case "5":
        for (e = 4; 7 > e && (d = get_int64_6(e), compareint(a, d)); e++) {
            c.m = d,
            b[5] = e
        }
        break;
    case "6":
        for (e = 5; 8 > e && (d = get_int64_6(e), compareint(a, d)); e++) {
            c.m = d,
            b[5] = e
        }
        break;
    case "7":
        for (e = 6; 9 > e && (d = get_int64_6(e), compareint(a, d)); e++) {
            c.m = d,
            b[5] = e
        }
        break;
    case "8":
        for (e = 7; 10 > e && (d = get_int64_6(e), compareint(a, d)); e++) {
            c.m = d,
            b[5] = e
        }
        break;
    case "9":
        for (e = 8; 11 > e && (d = get_int64_6(e), compareint(a, d)); e++) {
            c.m = d,
            b[5] = e
        }
    }
    return c.b = b,
    c
}

function check_int64_14(a) {
    var d = 0,
    e = "",
    b = [],
    c = {};
    switch (a[0]) {
    case "1":
        for (d = 9; 20 > d && (e = get_int64_6(d), compareint(a, e)); d++) {
            c.m = e,
            b[5] = d
        }
        break;
    case "2":
        for (d = 18; 29 > d && (e = get_int64_6(d), compareint(a, e)); d++) {
            c.m = e,
            b[5] = d
        }
        break;
    case "3":
        for (d = 27; 38 > d && (e = get_int64_6(d), compareint(a, e)); d++) {
            c.m = e,
            b[5] = d
        }
        break;
    case "4":
        for (d = 36; 47 > d && (e = get_int64_6(d), compareint(a, e)); d++) {
            c.m = e,
            b[5] = d
        }
        break;
    case "5":
        for (d = 45; 56 > d && (e = get_int64_6(d), compareint(a, e)); d++) {
            c.m = e,
            b[5] = d
        }
        break;
    case "6":
        for (d = 54; 65 > d && (e = get_int64_6(d), compareint(a, e)); d++) {
            c.m = e,
            b[5] = d
        }
        break;
    case "7":
        for (d = 63; 74 > d && (e = get_int64_6(d), compareint(a, e)); d++) {
            c.m = e,
            b[5] = d
        }
        break;
    case "8":
        for (d = 72; 83 > d && (e = get_int64_6(d), compareint(a, e)); d++) {
            c.m = e,
            b[5] = d
        }
        break;
    case "9":
        for (d = 81; 92 > d && (e = get_int64_6(d), compareint(a, e)); d++) {
            c.m = e,
            b[5] = d
        }
    }
    return c.b = b,
    c
}

function check_int64_15(a) {
    var d = 0,
    e = "",
    b = [],
    c = {};
    switch (a[0]) {
    case "1":
        for (d = 90; 183 > d && (e = get_int64_6(d), compareint(a, e)); d++) {
            c.m = e,
            b[5] = d
        }
        break;
    case "2":
        for (d = 2; 3 > d; d++) {
            if (e = get_int64_7(d), compareint(a, e)) {
                c.m = e,
                b[6] = d
            } else {
                for (d = 181; 256 > d && (e = get_int64_6(d), compareint(a, e)); d++) {
                    c.m = e,
                    b[5] = d
                }
            }
        }
        break;
    case "3":
        c.m = get_int64_7(1),
        b[6] = 1;
        break;
    case "4":
        c.m = get_int64_7(1),
        b[6] = 1;
        break;
    case "5":
        for (d = 1; 4 > d && (e = get_int64_7(d), compareint(a, e)); d++) {
            c.m = e,
            b[6] = d
        }
        break;
    case "6":
        c.m = get_int64_7(2),
        b[6] = 2;
        break;
    case "7":
        c.m = get_int64_7(2),
        b[6] = 2;
        break;
    case "8":
        for (d = 2; 5 > d && (e = get_int64_7(d), compareint(a, e)); d++) {
            c.m = e,
            b[6] = d
        }
        break;
    case "9":
        c.m = get_int64_7(3),
        b[6] = 3
    }
    return c.b = b,
    c
}

function check_int64_16(a) {
    var d = 0,
    e = "",
    b = [],
    c = {};
    switch (a[0]) {
    case "1":
        for (d = 3; 9 > d && (e = get_int64_7(d), compareint(a, e)); d++) {
            c.m = e,
            b[6] = d
        }
        break;
    case "2":
        for (d = 7; 12 > d && (e = get_int64_7(d), compareint(a, e)); d++) {
            c.m = e,
            b[6] = d
        }
        break;
    case "3":
        for (d = 10; 16 > d && (e = get_int64_7(d), compareint(a, e)); d++) {
            c.m = e,
            b[6] = d
        }
        break;
    case "4":
        for (d = 14; 19 > d && (e = get_int64_7(d), compareint(a, e)); d++) {
            c.m = e,
            b[6] = d
        }
        break;
    case "5":
        for (d = 17; 23 > d && (e = get_int64_7(d), compareint(a, e)); d++) {
            c.m = e,
            b[6] = d
        }
        break;
    case "6":
        for (d = 21; 26 > d && (e = get_int64_7(d), compareint(a, e)); d++) {
            c.m = e,
            b[6] = d
        }
        break;
    case "7":
        for (d = 24; 30 > d && (e = get_int64_7(d), compareint(a, e)); d++) {
            c.m = e,
            b[6] = d
        }
        break;
    case "8":
        for (d = 28; 33 > d && (e = get_int64_7(d), compareint(a, e)); d++) {
            c.m = e,
            b[6] = d
        }
        break;
    case "9":
        for (d = 31; 37 > d && (e = get_int64_7(d), compareint(a, e)); d++) {
            c.m = e,
            b[6] = d
        }
    }
    return c.b = b,
    c
}

function check_int64_17(a) {
    var d = 0,
    e = "",
    b = [],
    c = {};
    switch (a[0]) {
    case "1":
        for (d = 35; 73 > d && (e = get_int64_7(d), compareint(a, e)); d++) {
            c.m = e,
            b[6] = d
        }
        break;
    case "2":
        for (d = 71; 108 > d && (e = get_int64_7(d), compareint(a, e)); d++) {
            c.m = e,
            b[6] = d
        }
        break;
    case "3":
        for (d = 106; 144 > d && (e = get_int64_7(d), compareint(a, e)); d++) {
            c.m = e,
            b[6] = d
        }
        break;
    case "4":
        for (d = 142; 179 > d && (e = get_int64_7(d), compareint(a, e)); d++) {
            c.m = e,
            b[6] = d
        }
        break;
    case "5":
        for (d = 177; 215 > d && (e = get_int64_7(d), compareint(a, e)); d++) {
            c.m = e,
            b[6] = d
        }
        break;
    case "6":
        for (d = 213; 250 > d && (e = get_int64_7(d), compareint(a, e)); d++) {
            c.m = e,
            b[6] = d
        }
        break;
    case "7":
        if (e = get_int64_8(1), compareint(a, e)) {
            c.m = e,
            b[7] = 1
        } else {
            for (d = 248; 256 > d && (e = get_int64_7(d), compareint(a, e)); d++) {
                c.m = e,
                b[6] = d
            }
        }
        break;
    case "8":
        c.m = get_int64_8(1),
        b[7] = 1;
        break;
    case "9":
        c.m = get_int64_8(1),
        b[7] = 1
    }
    return c.b = b,
    c
}

function check_int64_18(a) {
    var d = 0,
    e = "",
    b = [],
    c = {};
    switch (a[0]) {
    case "1":
        for (d = 1; 4 > d && (e = get_int64_8(d), compareint(a, e)); d++) {
            c.m = e,
            b[7] = d
        }
        break;
    case "2":
        for (d = 2; 6 > d && (e = get_int64_8(d), compareint(a, e)); d++) {
            c.m = e,
            b[7] = d
        }
        break;
    case "3":
        for (d = 4; 7 > d && (e = get_int64_8(d), compareint(a, e)); d++) {
            c.m = e,
            b[7] = d
        }
        break;
    case "4":
        for (d = 5; 8 > d && (e = get_int64_8(d), compareint(a, e)); d++) {
            c.m = e,
            b[7] = d
        }
        break;
    case "5":
        for (d = 6; 10 > d && (e = get_int64_8(d), compareint(a, e)); d++) {
            c.m = e,
            b[7] = d
        }
        break;
    case "6":
        for (d = 8; 11 > d && (e = get_int64_8(d), compareint(a, e)); d++) {
            c.m = e,
            b[7] = d
        }
        break;
    case "7":
        for (d = 9; 13 > d && (e = get_int64_8(d), compareint(a, e)); d++) {
            c.m = e,
            b[7] = d
        }
        break;
    case "8":
        for (d = 11; 13 > d && (e = get_int64_8(d), compareint(a, e)); d++) {
            c.m = e,
            b[7] = d
        }
        break;
    case "9":
        for (d = 12; 15 > d && (e = get_int64_8(d), compareint(a, e)); d++) {
            c.m = e,
            b[7] = d
        }
    }
    if (8 != b.length) {
        throw "获取18位数字值错误 " + a
    }
    return c.b = b,
    c
}

function check_int64_19(a) {
    var d = 0,
    e = "",
    b = [],
    c = {};
    switch (a[0]) {
    case "1":
        for (d = 13; 29 > d && (e = get_int64_8(d), compareint(a, e)); d++) {
            c.m = e,
            b[7] = d
        }
        break;
    case "2":
        for (d = 27; 43 > d && (e = get_int64_8(d), compareint(a, e)); d++) {
            c.m = e,
            b[7] = d
        }
        break;
    case "3":
        for (d = 41; 56 > d && (e = get_int64_8(d), compareint(a, e)); d++) {
            c.m = e,
            b[7] = d
        }
        break;
    case "4":
        for (d = 54; 71 > d && (e = get_int64_8(d), compareint(a, e)); d++) {
            c.m = e,
            b[7] = d
        }
        break;
    case "5":
        for (d = 69; 85 > d && (e = get_int64_8(d), compareint(a, e)); d++) {
            c.m = e,
            b[7] = d
        }
        break;
    case "6":
        for (d = 83; 99 > d && (e = get_int64_8(d), compareint(a, e)); d++) {
            c.m = e,
            b[7] = d
        }
        break;
    case "7":
        for (d = 97; 113 > d && (e = get_int64_8(d), compareint(a, e)); d++) {
            c.m = e,
            b[7] = d
        }
        break;
    case "8":
        for (d = 111; 126 > d && (e = get_int64_8(d), compareint(a, e)); d++) {
            c.m = e,
            b[7] = d
        }
    case "9":
        for (d = 124; 140 > d && (e = get_int64_8(d), compareint(a, e)); d++) {
            c.m = e,
            b[7] = d
        }
    }
    if (8 != b.length) {
        throw "获取19位数字值错误 " + a
    }
    return c.b = b,
    c
}

function compareint(a, b) {
    if (b.length == a.length) {
        for (var c = 0; c < a.length; c++) {
            if (Number(a[c]) != Number(b[c])) {
                return Number(a[c]) > Number(b[c])
            }
        }
        return ! 0
    }
    return a.length > b.length
}

function s_minus(a, b) {
    b = b[0] == "-" ? b.replace("-", "") : "-" + b;
    return s_add(a, b)
}

function get_int64_8(a) {
    var b = "";
    switch (a) {
    case 0:
        b = "0";
        break;
    case 1:
        b = "72057594037927936";
        break;
    case 2:
        b = "144115188075855872";
        break;
    case 3:
        b = "216172782113783808";
        break;
    case 4:
        b = "288230376151711744";
        break;
    case 5:
        b = "360287970189639680";
        break;
    case 6:
        b = "432345564227567616";
        break;
    case 7:
        b = "504403158265495552";
        break;
    case 8:
        b = "576460752303423488";
        break;
    case 9:
        b = "648518346341351424";
        break;
    case 10:
        b = "720575940379279360";
        break;
    case 11:
        b = "792633534417207296";
        break;
    case 12:
        b = "864691128455135232";
        break;
    case 13:
        b = "936748722493063168";
        break;
    case 14:
        b = "1008806316530991104";
        break;
    case 15:
        b = "1080863910568919040";
        break;
    case 16:
        b = "1152921504606846976";
        break;
    case 17:
        b = "1224979098644774912";
        break;
    case 18:
        b = "1297036692682702848";
        break;
    case 19:
        b = "1369094286720630784";
        break;
    case 20:
        b = "1441151880758558720";
        break;
    case 21:
        b = "1513209474796486656";
        break;
    case 22:
        b = "1585267068834414592";
        break;
    case 23:
        b = "1657324662872342528";
        break;
    case 24:
        b = "1729382256910270464";
        break;
    case 25:
        b = "1801439850948198400";
        break;
    case 26:
        b = "1873497444986126336";
        break;
    case 27:
        b = "1945555039024054272";
        break;
    case 28:
        b = "2017612633061982208";
        break;
    case 29:
        b = "2089670227099910144";
        break;
    case 30:
        b = "2161727821137838080";
        break;
    case 31:
        b = "2233785415175766016";
        break;
    case 32:
        b = "2305843009213693952";
        break;
    case 33:
        b = "2377900603251621888";
        break;
    case 34:
        b = "2449958197289549824";
        break;
    case 35:
        b = "2522015791327477760";
        break;
    case 36:
        b = "2594073385365405696";
        break;
    case 37:
        b = "2666130979403333632";
        break;
    case 38:
        b = "2738188573441261568";
        break;
    case 39:
        b = "2810246167479189504";
        break;
    case 40:
        b = "2882303761517117440";
        break;
    case 41:
        b = "2954361355555045376";
        break;
    case 42:
        b = "3026418949592973312";
        break;
    case 43:
        b = "3098476543630901248";
        break;
    case 44:
        b = "3170534137668829184";
        break;
    case 45:
        b = "3242591731706757120";
        break;
    case 46:
        b = "3314649325744685056";
        break;
    case 47:
        b = "3386706919782612992";
        break;
    case 48:
        b = "3458764513820540928";
        break;
    case 49:
        b = "3530822107858468864";
        break;
    case 50:
        b = "3602879701896396800";
        break;
    case 51:
        b = "3674937295934324736";
        break;
    case 52:
        b = "3746994889972252672";
        break;
    case 53:
        b = "3819052484010180608";
        break;
    case 54:
        b = "3891110078048108544";
        break;
    case 55:
        b = "3963167672086036480";
        break;
    case 56:
        b = "4035225266123964416";
        break;
    case 57:
        b = "4107282860161892352";
        break;
    case 58:
        b = "4179340454199820288";
        break;
    case 59:
        b = "4251398048237748224";
        break;
    case 60:
        b = "4323455642275676160";
        break;
    case 61:
        b = "4395513236313604096";
        break;
    case 62:
        b = "4467570830351532032";
        break;
    case 63:
        b = "4539628424389459968";
        break;
    case 64:
        b = "4611686018427387904";
        break;
    case 65:
        b = "4683743612465315840";
        break;
    case 66:
        b = "4755801206503243776";
        break;
    case 67:
        b = "4827858800541171712";
        break;
    case 68:
        b = "4899916394579099648";
        break;
    case 69:
        b = "4971973988617027584";
        break;
    case 70:
        b = "5044031582654955520";
        break;
    case 71:
        b = "5116089176692883456";
        break;
    case 72:
        b = "5188146770730811392";
        break;
    case 73:
        b = "5260204364768739328";
        break;
    case 74:
        b = "5332261958806667264";
        break;
    case 75:
        b = "5404319552844595200";
        break;
    case 76:
        b = "5476377146882523136";
        break;
    case 77:
        b = "5548434740920451072";
        break;
    case 78:
        b = "5620492334958379008";
        break;
    case 79:
        b = "5692549928996306944";
        break;
    case 80:
        b = "5764607523034234880";
        break;
    case 81:
        b = "5836665117072162816";
        break;
    case 82:
        b = "5908722711110090752";
        break;
    case 83:
        b = "5980780305148018688";
        break;
    case 84:
        b = "6052837899185946624";
        break;
    case 85:
        b = "6124895493223874560";
        break;
    case 86:
        b = "6196953087261802496";
        break;
    case 87:
        b = "6269010681299730432";
        break;
    case 88:
        b = "6341068275337658368";
        break;
    case 89:
        b = "6413125869375586304";
        break;
    case 90:
        b = "6485183463413514240";
        break;
    case 91:
        b = "6557241057451442176";
        break;
    case 92:
        b = "6629298651489370112";
        break;
    case 93:
        b = "6701356245527298048";
        break;
    case 94:
        b = "6773413839565225984";
        break;
    case 95:
        b = "6845471433603153920";
        break;
    case 96:
        b = "6917529027641081856";
        break;
    case 97:
        b = "6989586621679009792";
        break;
    case 98:
        b = "7061644215716937728";
        break;
    case 99:
        b = "7133701809754865664";
        break;
    case 100:
        b = "7205759403792793600";
        break;
    case 101:
        b = "7277816997830721536";
        break;
    case 102:
        b = "7349874591868649472";
        break;
    case 103:
        b = "7421932185906577408";
        break;
    case 104:
        b = "7493989779944505344";
        break;
    case 105:
        b = "7566047373982433280";
        break;
    case 106:
        b = "7638104968020361216";
        break;
    case 107:
        b = "7710162562058289152";
        break;
    case 108:
        b = "7782220156096217088";
        break;
    case 109:
        b = "7854277750134145024";
        break;
    case 110:
        b = "7926335344172072960";
        break;
    case 111:
        b = "7998392938210000896";
        break;
    case 112:
        b = "8070450532247928832";
        break;
    case 113:
        b = "8142508126285856768";
        break;
    case 114:
        b = "8214565720323784704";
        break;
    case 115:
        b = "8286623314361712640";
        break;
    case 116:
        b = "8358680908399640576";
        break;
    case 117:
        b = "8430738502437568512";
        break;
    case 118:
        b = "8502796096475496448";
        break;
    case 119:
        b = "8574853690513424384";
        break;
    case 120:
        b = "8646911284551352320";
        break;
    case 121:
        b = "8718968878589280256";
        break;
    case 122:
        b = "8791026472627208192";
        break;
    case 123:
        b = "8863084066665136128";
        break;
    case 124:
        b = "8935141660703064064";
        break;
    case 125:
        b = "9007199254740992000";
        break;
    case 126:
        b = "9079256848778919936";
        break;
    case 127:
        b = "9151314442816847872";
        break;
    case 128:
        b = "9223372036854775808";
        break;
    case 129:
        b = "9295429630892703744";
        break;
    case 130:
        b = "9367487224930631680";
        break;
    case 131:
        b = "9439544818968559616";
        break;
    case 132:
        b = "9511602413006487552";
        break;
    case 133:
        b = "9583660007044415488";
        break;
    case 134:
        b = "9655717601082343424";
        break;
    case 135:
        b = "9727775195120271360";
        break;
    case 136:
        b = "9799832789158199296";
        break;
    case 137:
        b = "9871890383196127232";
        break;
    case 138:
        b = "9943947977234055168";
        break;
    case 139:
        b = "10016005571271983104";
        break;
    case 140:
        b = "10088063165309911040";
        break;
    case 141:
        b = "10160120759347838976";
        break;
    case 142:
        b = "10232178353385766912";
        break;
    case 143:
        b = "10304235947423694848";
        break;
    case 144:
        b = "10376293541461622784";
        break;
    case 145:
        b = "10448351135499550720";
        break;
    case 146:
        b = "10520408729537478656";
        break;
    case 147:
        b = "10592466323575406592";
        break;
    case 148:
        b = "10664523917613334528";
        break;
    case 149:
        b = "10736581511651262464";
        break;
    case 150:
        b = "10808639105689190400";
        break;
    case 151:
        b = "10880696699727118336";
        break;
    case 152:
        b = "10952754293765046272";
        break;
    case 153:
        b = "11024811887802974208";
        break;
    case 154:
        b = "11096869481840902144";
        break;
    case 155:
        b = "11168927075878830080";
        break;
    case 156:
        b = "11240984669916758016";
        break;
    case 157:
        b = "11313042263954685952";
        break;
    case 158:
        b = "11385099857992613888";
        break;
    case 159:
        b = "11457157452030541824";
        break;
    case 160:
        b = "11529215046068469760";
        break;
    case 161:
        b = "11601272640106397696";
        break;
    case 162:
        b = "11673330234144325632";
        break;
    case 163:
        b = "11745387828182253568";
        break;
    case 164:
        b = "11817445422220181504";
        break;
    case 165:
        b = "11889503016258109440";
        break;
    case 166:
        b = "11961560610296037376";
        break;
    case 167:
        b = "12033618204333965312";
        break;
    case 168:
        b = "12105675798371893248";
        break;
    case 169:
        b = "12177733392409821184";
        break;
    case 170:
        b = "12249790986447749120";
        break;
    case 171:
        b = "12321848580485677056";
        break;
    case 172:
        b = "12393906174523604992";
        break;
    case 173:
        b = "12465963768561532928";
        break;
    case 174:
        b = "12538021362599460864";
        break;
    case 175:
        b = "12610078956637388800";
        break;
    case 176:
        b = "12682136550675316736";
        break;
    case 177:
        b = "12754194144713244672";
        break;
    case 178:
        b = "12826251738751172608";
        break;
    case 179:
        b = "12898309332789100544";
        break;
    case 180:
        b = "12970366926827028480";
        break;
    case 181:
        b = "13042424520864956416";
        break;
    case 182:
        b = "13114482114902884352";
        break;
    case 183:
        b = "13186539708940812288";
        break;
    case 184:
        b = "13258597302978740224";
        break;
    case 185:
        b = "13330654897016668160";
        break;
    case 186:
        b = "13402712491054596096";
        break;
    case 187:
        b = "13474770085092524032";
        break;
    case 188:
        b = "13546827679130451968";
        break;
    case 189:
        b = "13618885273168379904";
        break;
    case 190:
        b = "13690942867206307840";
        break;
    case 191:
        b = "13763000461244235776";
        break;
    case 192:
        b = "13835058055282163712";
        break;
    case 193:
        b = "13907115649320091648";
        break;
    case 194:
        b = "13979173243358019584";
        break;
    case 195:
        b = "14051230837395947520";
        break;
    case 196:
        b = "14123288431433875456";
        break;
    case 197:
        b = "14195346025471803392";
        break;
    case 198:
        b = "14267403619509731328";
        break;
    case 199:
        b = "14339461213547659264";
        break;
    case 200:
        b = "14411518807585587200";
        break;
    case 201:
        b = "14483576401623515136";
        break;
    case 202:
        b = "14555633995661443072";
        break;
    case 203:
        b = "14627691589699371008";
        break;
    case 204:
        b = "14699749183737298944";
        break;
    case 205:
        b = "14771806777775226880";
        break;
    case 206:
        b = "14843864371813154816";
        break;
    case 207:
        b = "14915921965851082752";
        break;
    case 208:
        b = "14987979559889010688";
        break;
    case 209:
        b = "15060037153926938624";
        break;
    case 210:
        b = "15132094747964866560";
        break;
    case 211:
        b = "15204152342002794496";
        break;
    case 212:
        b = "15276209936040722432";
        break;
    case 213:
        b = "15348267530078650368";
        break;
    case 214:
        b = "15420325124116578304";
        break;
    case 215:
        b = "15492382718154506240";
        break;
    case 216:
        b = "15564440312192434176";
        break;
    case 217:
        b = "15636497906230362112";
        break;
    case 218:
        b = "15708555500268290048";
        break;
    case 219:
        b = "15780613094306217984";
        break;
    case 220:
        b = "15852670688344145920";
        break;
    case 221:
        b = "15924728282382073856";
        break;
    case 222:
        b = "15996785876420001792";
        break;
    case 223:
        b = "16068843470457929728";
        break;
    case 224:
        b = "16140901064495857664";
        break;
    case 225:
        b = "16212958658533785600";
        break;
    case 226:
        b = "16285016252571713536";
        break;
    case 227:
        b = "16357073846609641472";
        break;
    case 228:
        b = "16429131440647569408";
        break;
    case 229:
        b = "16501189034685497344";
        break;
    case 230:
        b = "16573246628723425280";
        break;
    case 231:
        b = "16645304222761353216";
        break;
    case 232:
        b = "16717361816799281152";
        break;
    case 233:
        b = "16789419410837209088";
        break;
    case 234:
        b = "16861477004875137024";
        break;
    case 235:
        b = "16933534598913064960";
        break;
    case 236:
        b = "17005592192950992896";
        break;
    case 237:
        b = "17077649786988920832";
        break;
    case 238:
        b = "17149707381026848768";
        break;
    case 239:
        b = "17221764975064776704";
        break;
    case 240:
        b = "17293822569102704640";
        break;
    case 241:
        b = "17365880163140632576";
        break;
    case 242:
        b = "17437937757178560512";
        break;
    case 243:
        b = "17509995351216488448";
        break;
    case 244:
        b = "17582052945254416384";
        break;
    case 245:
        b = "17654110539292344320";
        break;
    case 246:
        b = "17726168133330272256";
        break;
    case 247:
        b = "17798225727368200192";
        break;
    case 248:
        b = "17870283321406128128";
        break;
    case 249:
        b = "17942340915444056064";
        break;
    case 250:
        b = "18014398509481984000";
        break;
    case 251:
        b = "18086456103519911936";
        break;
    case 252:
        b = "18158513697557839872";
        break;
    case 253:
        b = "18230571291595767808";
        break;
    case 254:
        b = "18302628885633695744";
        break;
    case 255:
        b = "18374686479671623680";
        break;
    default:
        throw "未定义int64第8为数值"
    }
    return b
}

function get_int64_7(a) {
    var b = "";
    switch (a) {
    case 0:
        b = "0"
        break;
    case 1:
        b = "281474976710656";
        break;
    case 2:
        b = "562949953421312";
        break;
    case 3:
        b = "844424930131968";
        break;
    case 4:
        b = "1125899906842624";
        break;
    case 5:
        b = "1407374883553280";
        break;
    case 6:
        b = "1688849860263936";
        break;
    case 7:
        b = "1970324836974592";
        break;
    case 8:
        b = "2251799813685248";
        break;
    case 9:
        b = "2533274790395904";
        break;
    case 10:
        b = "2814749767106560";
        break;
    case 11:
        b = "3096224743817216";
        break;
    case 12:
        b = "3377699720527872";
        break;
    case 13:
        b = "3659174697238528";
        break;
    case 14:
        b = "3940649673949184";
        break;
    case 15:
        b = "4222124650659840";
        break;
    case 16:
        b = "4503599627370496";
        break;
    case 17:
        b = "4785074604081152";
        break;
    case 18:
        b = "5066549580791808";
        break;
    case 19:
        b = "5348024557502464";
        break;
    case 20:
        b = "5629499534213120";
        break;
    case 21:
        b = "5910974510923776";
        break;
    case 22:
        b = "6192449487634432";
        break;
    case 23:
        b = "6473924464345088";
        break;
    case 24:
        b = "6755399441055744";
        break;
    case 25:
        b = "7036874417766400";
        break;
    case 26:
        b = "7318349394477056";
        break;
    case 27:
        b = "7599824371187712";
        break;
    case 28:
        b = "7881299347898368";
        break;
    case 29:
        b = "8162774324609024";
        break;
    case 30:
        b = "8444249301319680";
        break;
    case 31:
        b = "8725724278030336";
        break;
    case 32:
        b = "9007199254740992";
        break;
    case 33:
        b = "9288674231451648";
        break;
    case 34:
        b = "9570149208162304";
        break;
    case 35:
        b = "9851624184872960";
        break;
    case 36:
        b = "10133099161583616";
        break;
    case 37:
        b = "10414574138294272";
        break;
    case 38:
        b = "10696049115004928";
        break;
    case 39:
        b = "10977524091715584";
        break;
    case 40:
        b = "11258999068426240";
        break;
    case 41:
        b = "11540474045136896";
        break;
    case 42:
        b = "11821949021847552";
        break;
    case 43:
        b = "12103423998558208";
        break;
    case 44:
        b = "12384898975268864";
        break;
    case 45:
        b = "12666373951979520";
        break;
    case 46:
        b = "12947848928690176";
        break;
    case 47:
        b = "13229323905400832";
        break;
    case 48:
        b = "13510798882111488";
        break;
    case 49:
        b = "13792273858822144";
        break;
    case 50:
        b = "14073748835532800";
        break;
    case 51:
        b = "14355223812243456";
        break;
    case 52:
        b = "14636698788954112";
        break;
    case 53:
        b = "14918173765664768";
        break;
    case 54:
        b = "15199648742375424";
        break;
    case 55:
        b = "15481123719086080";
        break;
    case 56:
        b = "15762598695796736";
        break;
    case 57:
        b = "16044073672507392";
        break;
    case 58:
        b = "16325548649218048";
        break;
    case 59:
        b = "16607023625928704";
        break;
    case 60:
        b = "16888498602639360";
        break;
    case 61:
        b = "17169973579350016";
        break;
    case 62:
        b = "17451448556060672";
        break;
    case 63:
        b = "17732923532771328";
        break;
    case 64:
        b = "18014398509481984";
        break;
    case 65:
        b = "18295873486192640";
        break;
    case 66:
        b = "18577348462903296";
        break;
    case 67:
        b = "18858823439613952";
        break;
    case 68:
        b = "19140298416324608";
        break;
    case 69:
        b = "19421773393035264";
        break;
    case 70:
        b = "19703248369745920";
        break;
    case 71:
        b = "19984723346456576";
        break;
    case 72:
        b = "20266198323167232";
        break;
    case 73:
        b = "20547673299877888";
        break;
    case 74:
        b = "20829148276588544";
        break;
    case 75:
        b = "21110623253299200";
        break;
    case 76:
        b = "21392098230009856";
        break;
    case 77:
        b = "21673573206720512";
        break;
    case 78:
        b = "21955048183431168";
        break;
    case 79:
        b = "22236523160141824";
        break;
    case 80:
        b = "22517998136852480";
        break;
    case 81:
        b = "22799473113563136";
        break;
    case 82:
        b = "23080948090273792";
        break;
    case 83:
        b = "23362423066984448";
        break;
    case 84:
        b = "23643898043695104";
        break;
    case 85:
        b = "23925373020405760";
        break;
    case 86:
        b = "24206847997116416";
        break;
    case 87:
        b = "24488322973827072";
        break;
    case 88:
        b = "24769797950537728";
        break;
    case 89:
        b = "25051272927248384";
        break;
    case 90:
        b = "25332747903959040";
        break;
    case 91:
        b = "25614222880669696";
        break;
    case 92:
        b = "25895697857380352";
        break;
    case 93:
        b = "26177172834091008";
        break;
    case 94:
        b = "26458647810801664";
        break;
    case 95:
        b = "26740122787512320";
        break;
    case 96:
        b = "27021597764222976";
        break;
    case 97:
        b = "27303072740933632";
        break;
    case 98:
        b = "27584547717644288";
        break;
    case 99:
        b = "27866022694354944";
        break;
    case 100:
        b = "28147497671065600";
        break;
    case 101:
        b = "28428972647776256";
        break;
    case 102:
        b = "28710447624486912";
        break;
    case 103:
        b = "28991922601197568";
        break;
    case 104:
        b = "29273397577908224";
        break;
    case 105:
        b = "29554872554618880";
        break;
    case 106:
        b = "29836347531329536";
        break;
    case 107:
        b = "30117822508040192";
        break;
    case 108:
        b = "30399297484750848";
        break;
    case 109:
        b = "30680772461461504";
        break;
    case 110:
        b = "30962247438172160";
        break;
    case 111:
        b = "31243722414882816";
        break;
    case 112:
        b = "31525197391593472";
        break;
    case 113:
        b = "31806672368304128";
        break;
    case 114:
        b = "32088147345014784";
        break;
    case 115:
        b = "32369622321725440";
        break;
    case 116:
        b = "32651097298436096";
        break;
    case 117:
        b = "32932572275146752";
        break;
    case 118:
        b = "33214047251857408";
        break;
    case 119:
        b = "33495522228568064";
        break;
    case 120:
        b = "33776997205278720";
        break;
    case 121:
        b = "34058472181989376";
        break;
    case 122:
        b = "34339947158700032";
        break;
    case 123:
        b = "34621422135410688";
        break;
    case 124:
        b = "34902897112121344";
        break;
    case 125:
        b = "35184372088832000";
        break;
    case 126:
        b = "35465847065542656";
        break;
    case 127:
        b = "35747322042253312";
        break;
    case 128:
        b = "36028797018963968";
        break;
    case 129:
        b = "36310271995674624";
        break;
    case 130:
        b = "36591746972385280";
        break;
    case 131:
        b = "36873221949095936";
        break;
    case 132:
        b = "37154696925806592";
        break;
    case 133:
        b = "37436171902517248";
        break;
    case 134:
        b = "37717646879227904";
        break;
    case 135:
        b = "37999121855938560";
        break;
    case 136:
        b = "38280596832649216";
        break;
    case 137:
        b = "38562071809359872";
        break;
    case 138:
        b = "38843546786070528";
        break;
    case 139:
        b = "39125021762781184";
        break;
    case 140:
        b = "39406496739491840";
        break;
    case 141:
        b = "39687971716202496";
        break;
    case 142:
        b = "39969446692913152";
        break;
    case 143:
        b = "40250921669623808";
        break;
    case 144:
        b = "40532396646334464";
        break;
    case 145:
        b = "40813871623045120";
        break;
    case 146:
        b = "41095346599755776";
        break;
    case 147:
        b = "41376821576466432";
        break;
    case 148:
        b = "41658296553177088";
        break;
    case 149:
        b = "41939771529887744";
        break;
    case 150:
        b = "42221246506598400";
        break;
    case 151:
        b = "42502721483309056";
        break;
    case 152:
        b = "42784196460019712";
        break;
    case 153:
        b = "43065671436730368";
        break;
    case 154:
        b = "43347146413441024";
        break;
    case 155:
        b = "43628621390151680";
        break;
    case 156:
        b = "43910096366862336";
        break;
    case 157:
        b = "44191571343572992";
        break;
    case 158:
        b = "44473046320283648";
        break;
    case 159:
        b = "44754521296994304";
        break;
    case 160:
        b = "45035996273704960";
        break;
    case 161:
        b = "45317471250415616";
        break;
    case 162:
        b = "45598946227126272";
        break;
    case 163:
        b = "45880421203836928";
        break;
    case 164:
        b = "46161896180547584";
        break;
    case 165:
        b = "46443371157258240";
        break;
    case 166:
        b = "46724846133968896";
        break;
    case 167:
        b = "47006321110679552";
        break;
    case 168:
        b = "47287796087390208";
        break;
    case 169:
        b = "47569271064100864";
        break;
    case 170:
        b = "47850746040811520";
        break;
    case 171:
        b = "48132221017522176";
        break;
    case 172:
        b = "48413695994232832";
        break;
    case 173:
        b = "48695170970943488";
        break;
    case 174:
        b = "48976645947654144";
        break;
    case 175:
        b = "49258120924364800";
        break;
    case 176:
        b = "49539595901075456";
        break;
    case 177:
        b = "49821070877786112";
        break;
    case 178:
        b = "50102545854496768";
        break;
    case 179:
        b = "50384020831207424";
        break;
    case 180:
        b = "50665495807918080";
        break;
    case 181:
        b = "50946970784628736";
        break;
    case 182:
        b = "51228445761339392";
        break;
    case 183:
        b = "51509920738050048";
        break;
    case 184:
        b = "51791395714760704";
        break;
    case 185:
        b = "52072870691471360";
        break;
    case 186:
        b = "52354345668182016";
        break;
    case 187:
        b = "52635820644892672";
        break;
    case 188:
        b = "52917295621603328";
        break;
    case 189:
        b = "53198770598313984";
        break;
    case 190:
        b = "53480245575024640";
        break;
    case 191:
        b = "53761720551735296";
        break;
    case 192:
        b = "54043195528445952";
        break;
    case 193:
        b = "54324670505156608";
        break;
    case 194:
        b = "54606145481867264";
        break;
    case 195:
        b = "54887620458577920";
        break;
    case 196:
        b = "55169095435288576";
        break;
    case 197:
        b = "55450570411999232";
        break;
    case 198:
        b = "55732045388709888";
        break;
    case 199:
        b = "56013520365420544";
        break;
    case 200:
        b = "56294995342131200";
        break;
    case 201:
        b = "56576470318841856";
        break;
    case 202:
        b = "56857945295552512";
        break;
    case 203:
        b = "57139420272263168";
        break;
    case 204:
        b = "57420895248973824";
        break;
    case 205:
        b = "57702370225684480";
        break;
    case 206:
        b = "57983845202395136";
        break;
    case 207:
        b = "58265320179105792";
        break;
    case 208:
        b = "58546795155816448";
        break;
    case 209:
        b = "58828270132527104";
        break;
    case 210:
        b = "59109745109237760";
        break;
    case 211:
        b = "59391220085948416";
        break;
    case 212:
        b = "59672695062659072";
        break;
    case 213:
        b = "59954170039369728";
        break;
    case 214:
        b = "60235645016080384";
        break;
    case 215:
        b = "60517119992791040";
        break;
    case 216:
        b = "60798594969501696";
        break;
    case 217:
        b = "61080069946212352";
        break;
    case 218:
        b = "61361544922923008";
        break;
    case 219:
        b = "61643019899633664";
        break;
    case 220:
        b = "61924494876344320";
        break;
    case 221:
        b = "62205969853054976";
        break;
    case 222:
        b = "62487444829765632";
        break;
    case 223:
        b = "62768919806476288";
        break;
    case 224:
        b = "63050394783186944";
        break;
    case 225:
        b = "63331869759897600";
        break;
    case 226:
        b = "63613344736608256";
        break;
    case 227:
        b = "63894819713318912";
        break;
    case 228:
        b = "64176294690029568";
        break;
    case 229:
        b = "64457769666740224";
        break;
    case 230:
        b = "64739244643450880";
        break;
    case 231:
        b = "65020719620161536";
        break;
    case 232:
        b = "65302194596872192";
        break;
    case 233:
        b = "65583669573582848";
        break;
    case 234:
        b = "65865144550293504";
        break;
    case 235:
        b = "66146619527004160";
        break;
    case 236:
        b = "66428094503714816";
        break;
    case 237:
        b = "66709569480425472";
        break;
    case 238:
        b = "66991044457136128";
        break;
    case 239:
        b = "67272519433846784";
        break;
    case 240:
        b = "67553994410557440";
        break;
    case 241:
        b = "67835469387268096";
        break;
    case 242:
        b = "68116944363978752";
        break;
    case 243:
        b = "68398419340689408";
        break;
    case 244:
        b = "68679894317400064";
        break;
    case 245:
        b = "68961369294110720";
        break;
    case 246:
        b = "69242844270821376";
        break;
    case 247:
        b = "69524319247532032";
        break;
    case 248:
        b = "69805794224242688";
        break;
    case 249:
        b = "70087269200953344";
        break;
    case 250:
        b = "70368744177664000";
        break;
    case 251:
        b = "70650219154374656";
        break;
    case 252:
        b = "70931694131085312";
        break;
    case 253:
        b = "71213169107795968";
        break;
    case 254:
        b = "71494644084506624";
        break;
    case 255:
        b = "71776119061217280";
        break;
    default:
        throw "未定义int64第7为数值"
    }
    return b
}

function get_int64_6(a) {
    var b = "";
    switch (a) {
    case 0:
        b = "0";
        break;
    case 1:
        b = "1099511627776";
        break;
    case 2:
        b = "2199023255552";
        break;
    case 3:
        b = "3298534883328";
        break;
    case 4:
        b = "4398046511104";
        break;
    case 5:
        b = "5497558138880";
        break;
    case 6:
        b = "6597069766656";
        break;
    case 7:
        b = "7696581394432";
        break;
    case 8:
        b = "8796093022208";
        break;
    case 9:
        b = "9895604649984";
        break;
    case 10:
        b = "10995116277760";
        break;
    case 11:
        b = "12094627905536";
        break;
    case 12:
        b = "13194139533312";
        break;
    case 13:
        b = "14293651161088";
        break;
    case 14:
        b = "15393162788864";
        break;
    case 15:
        b = "16492674416640";
        break;
    case 16:
        b = "17592186044416";
        break;
    case 17:
        b = "18691697672192";
        break;
    case 18:
        b = "19791209299968";
        break;
    case 19:
        b = "20890720927744";
        break;
    case 20:
        b = "21990232555520";
        break;
    case 21:
        b = "23089744183296";
        break;
    case 22:
        b = "24189255811072";
        break;
    case 23:
        b = "25288767438848";
        break;
    case 24:
        b = "26388279066624";
        break;
    case 25:
        b = "27487790694400";
        break;
    case 26:
        b = "28587302322176";
        break;
    case 27:
        b = "29686813949952";
        break;
    case 28:
        b = "30786325577728";
        break;
    case 29:
        b = "31885837205504";
        break;
    case 30:
        b = "32985348833280";
        break;
    case 31:
        b = "34084860461056";
        break;
    case 32:
        b = "35184372088832";
        break;
    case 33:
        b = "36283883716608";
        break;
    case 34:
        b = "37383395344384";
        break;
    case 35:
        b = "38482906972160";
        break;
    case 36:
        b = "39582418599936";
        break;
    case 37:
        b = "40681930227712";
        break;
    case 38:
        b = "41781441855488";
        break;
    case 39:
        b = "42880953483264";
        break;
    case 40:
        b = "43980465111040";
        break;
    case 41:
        b = "45079976738816";
        break;
    case 42:
        b = "46179488366592";
        break;
    case 43:
        b = "47278999994368";
        break;
    case 44:
        b = "48378511622144";
        break;
    case 45:
        b = "49478023249920";
        break;
    case 46:
        b = "50577534877696";
        break;
    case 47:
        b = "51677046505472";
        break;
    case 48:
        b = "52776558133248";
        break;
    case 49:
        b = "53876069761024";
        break;
    case 50:
        b = "54975581388800";
        break;
    case 51:
        b = "56075093016576";
        break;
    case 52:
        b = "57174604644352";
        break;
    case 53:
        b = "58274116272128";
        break;
    case 54:
        b = "59373627899904";
        break;
    case 55:
        b = "60473139527680";
        break;
    case 56:
        b = "61572651155456";
        break;
    case 57:
        b = "62672162783232";
        break;
    case 58:
        b = "63771674411008";
        break;
    case 59:
        b = "64871186038784";
        break;
    case 60:
        b = "65970697666560";
        break;
    case 61:
        b = "67070209294336";
        break;
    case 62:
        b = "68169720922112";
        break;
    case 63:
        b = "69269232549888";
        break;
    case 64:
        b = "70368744177664";
        break;
    case 65:
        b = "71468255805440";
        break;
    case 66:
        b = "72567767433216";
        break;
    case 67:
        b = "73667279060992";
        break;
    case 68:
        b = "74766790688768";
        break;
    case 69:
        b = "75866302316544";
        break;
    case 70:
        b = "76965813944320";
        break;
    case 71:
        b = "78065325572096";
        break;
    case 72:
        b = "79164837199872";
        break;
    case 73:
        b = "80264348827648";
        break;
    case 74:
        b = "81363860455424";
        break;
    case 75:
        b = "82463372083200";
        break;
    case 76:
        b = "83562883710976";
        break;
    case 77:
        b = "84662395338752";
        break;
    case 78:
        b = "85761906966528";
        break;
    case 79:
        b = "86861418594304";
        break;
    case 80:
        b = "87960930222080";
        break;
    case 81:
        b = "89060441849856";
        break;
    case 82:
        b = "90159953477632";
        break;
    case 83:
        b = "91259465105408";
        break;
    case 84:
        b = "92358976733184";
        break;
    case 85:
        b = "93458488360960";
        break;
    case 86:
        b = "94557999988736";
        break;
    case 87:
        b = "95657511616512";
        break;
    case 88:
        b = "96757023244288";
        break;
    case 89:
        b = "97856534872064";
        break;
    case 90:
        b = "98956046499840";
        break;
    case 91:
        b = "100055558127616";
        break;
    case 92:
        b = "101155069755392";
        break;
    case 93:
        b = "102254581383168";
        break;
    case 94:
        b = "103354093010944";
        break;
    case 95:
        b = "104453604638720";
        break;
    case 96:
        b = "105553116266496";
        break;
    case 97:
        b = "106652627894272";
        break;
    case 98:
        b = "107752139522048";
        break;
    case 99:
        b = "108851651149824";
        break;
    case 100:
        b = "109951162777600";
        break;
    case 101:
        b = "111050674405376";
        break;
    case 102:
        b = "112150186033152";
        break;
    case 103:
        b = "113249697660928";
        break;
    case 104:
        b = "114349209288704";
        break;
    case 105:
        b = "115448720916480";
        break;
    case 106:
        b = "116548232544256";
        break;
    case 107:
        b = "117647744172032";
        break;
    case 108:
        b = "118747255799808";
        break;
    case 109:
        b = "119846767427584";
        break;
    case 110:
        b = "120946279055360";
        break;
    case 111:
        b = "122045790683136";
        break;
    case 112:
        b = "123145302310912";
        break;
    case 113:
        b = "124244813938688";
        break;
    case 114:
        b = "125344325566464";
        break;
    case 115:
        b = "126443837194240";
        break;
    case 116:
        b = "127543348822016";
        break;
    case 117:
        b = "128642860449792";
        break;
    case 118:
        b = "129742372077568";
        break;
    case 119:
        b = "130841883705344";
        break;
    case 120:
        b = "131941395333120";
        break;
    case 121:
        b = "133040906960896";
        break;
    case 122:
        b = "134140418588672";
        break;
    case 123:
        b = "135239930216448";
        break;
    case 124:
        b = "136339441844224";
        break;
    case 125:
        b = "137438953472000";
        break;
    case 126:
        b = "138538465099776";
        break;
    case 127:
        b = "139637976727552";
        break;
    case 128:
        b = "140737488355328";
        break;
    case 129:
        b = "141836999983104";
        break;
    case 130:
        b = "142936511610880";
        break;
    case 131:
        b = "144036023238656";
        break;
    case 132:
        b = "145135534866432";
        break;
    case 133:
        b = "146235046494208";
        break;
    case 134:
        b = "147334558121984";
        break;
    case 135:
        b = "148434069749760";
        break;
    case 136:
        b = "149533581377536";
        break;
    case 137:
        b = "150633093005312";
        break;
    case 138:
        b = "151732604633088";
        break;
    case 139:
        b = "152832116260864";
        break;
    case 140:
        b = "153931627888640";
        break;
    case 141:
        b = "155031139516416";
        break;
    case 142:
        b = "156130651144192";
        break;
    case 143:
        b = "157230162771968";
        break;
    case 144:
        b = "158329674399744";
        break;
    case 145:
        b = "159429186027520";
        break;
    case 146:
        b = "160528697655296";
        break;
    case 147:
        b = "161628209283072";
        break;
    case 148:
        b = "162727720910848";
        break;
    case 149:
        b = "163827232538624";
        break;
    case 150:
        b = "164926744166400";
        break;
    case 151:
        b = "166026255794176";
        break;
    case 152:
        b = "167125767421952";
        break;
    case 153:
        b = "168225279049728";
        break;
    case 154:
        b = "169324790677504";
        break;
    case 155:
        b = "170424302305280";
        break;
    case 156:
        b = "171523813933056";
        break;
    case 157:
        b = "172623325560832";
        break;
    case 158:
        b = "173722837188608";
        break;
    case 159:
        b = "174822348816384";
        break;
    case 160:
        b = "175921860444160";
        break;
    case 161:
        b = "177021372071936";
        break;
    case 162:
        b = "178120883699712";
        break;
    case 163:
        b = "179220395327488";
        break;
    case 164:
        b = "180319906955264";
        break;
    case 165:
        b = "181419418583040";
        break;
    case 166:
        b = "182518930210816";
        break;
    case 167:
        b = "183618441838592";
        break;
    case 168:
        b = "184717953466368";
        break;
    case 169:
        b = "185817465094144";
        break;
    case 170:
        b = "186916976721920";
        break;
    case 171:
        b = "188016488349696";
        break;
    case 172:
        b = "189115999977472";
        break;
    case 173:
        b = "190215511605248";
        break;
    case 174:
        b = "191315023233024";
        break;
    case 175:
        b = "192414534860800";
        break;
    case 176:
        b = "193514046488576";
        break;
    case 177:
        b = "194613558116352";
        break;
    case 178:
        b = "195713069744128";
        break;
    case 179:
        b = "196812581371904";
        break;
    case 180:
        b = "197912092999680";
        break;
    case 181:
        b = "199011604627456";
        break;
    case 182:
        b = "200111116255232";
        break;
    case 183:
        b = "201210627883008";
        break;
    case 184:
        b = "202310139510784";
        break;
    case 185:
        b = "203409651138560";
        break;
    case 186:
        b = "204509162766336";
        break;
    case 187:
        b = "205608674394112";
        break;
    case 188:
        b = "206708186021888";
        break;
    case 189:
        b = "207807697649664";
        break;
    case 190:
        b = "208907209277440";
        break;
    case 191:
        b = "210006720905216";
        break;
    case 192:
        b = "211106232532992";
        break;
    case 193:
        b = "212205744160768";
        break;
    case 194:
        b = "213305255788544";
        break;
    case 195:
        b = "214404767416320";
        break;
    case 196:
        b = "215504279044096";
        break;
    case 197:
        b = "216603790671872";
        break;
    case 198:
        b = "217703302299648";
        break;
    case 199:
        b = "218802813927424";
        break;
    case 200:
        b = "219902325555200";
        break;
    case 201:
        b = "221001837182976";
        break;
    case 202:
        b = "222101348810752";
        break;
    case 203:
        b = "223200860438528";
        break;
    case 204:
        b = "224300372066304";
        break;
    case 205:
        b = "225399883694080";
        break;
    case 206:
        b = "226499395321856";
        break;
    case 207:
        b = "227598906949632";
        break;
    case 208:
        b = "228698418577408";
        break;
    case 209:
        b = "229797930205184";
        break;
    case 210:
        b = "230897441832960";
        break;
    case 211:
        b = "231996953460736";
        break;
    case 212:
        b = "233096465088512";
        break;
    case 213:
        b = "234195976716288";
        break;
    case 214:
        b = "235295488344064";
        break;
    case 215:
        b = "236394999971840";
        break;
    case 216:
        b = "237494511599616";
        break;
    case 217:
        b = "238594023227392";
        break;
    case 218:
        b = "239693534855168";
        break;
    case 219:
        b = "240793046482944";
        break;
    case 220:
        b = "241892558110720";
        break;
    case 221:
        b = "242992069738496";
        break;
    case 222:
        b = "244091581366272";
        break;
    case 223:
        b = "245191092994048";
        break;
    case 224:
        b = "246290604621824";
        break;
    case 225:
        b = "247390116249600";
        break;
    case 226:
        b = "248489627877376";
        break;
    case 227:
        b = "249589139505152";
        break;
    case 228:
        b = "250688651132928";
        break;
    case 229:
        b = "251788162760704";
        break;
    case 230:
        b = "252887674388480";
        break;
    case 231:
        b = "253987186016256";
        break;
    case 232:
        b = "255086697644032";
        break;
    case 233:
        b = "256186209271808";
        break;
    case 234:
        b = "257285720899584";
        break;
    case 235:
        b = "258385232527360";
        break;
    case 236:
        b = "259484744155136";
        break;
    case 237:
        b = "260584255782912";
        break;
    case 238:
        b = "261683767410688";
        break;
    case 239:
        b = "262783279038464";
        break;
    case 240:
        b = "263882790666240";
        break;
    case 241:
        b = "264982302294016";
        break;
    case 242:
        b = "266081813921792";
        break;
    case 243:
        b = "267181325549568";
        break;
    case 244:
        b = "268280837177344";
        break;
    case 245:
        b = "269380348805120";
        break;
    case 246:
        b = "270479860432896";
        break;
    case 247:
        b = "271579372060672";
        break;
    case 248:
        b = "272678883688448";
        break;
    case 249:
        b = "273778395316224";
        break;
    case 250:
        b = "274877906944000";
        break;
    case 251:
        b = "275977418571776";
        break;
    case 252:
        b = "277076930199552";
        break;
    case 253:
        b = "278176441827328";
        break;
    case 254:
        b = "279275953455104";
        break;
    case 255:
        b = "280375465082880";
        break;
    default:
        throw "未定义int64第6为数值"
    }
    return b
}

function get_int64_4(a) {
    var b = "";
    switch (a) {
    case 0:
        b = "0";
        break;
    case 1:
        b = "16777216";
        break;
    case 2:
        b = "33554432";
        break;
    case 3:
        b = "50331648";
        break;
    case 4:
        b = "67108864";
        break;
    case 5:
        b = "83886080";
        break;
    case 6:
        b = "100663296";
        break;
    case 7:
        b = "117440512";
        break;
    case 8:
        b = "134217728";
        break;
    case 9:
        b = "150994944";
        break;
    case 10:
        b = "167772160";
        break;
    case 11:
        b = "184549376";
        break;
    case 12:
        b = "201326592";
        break;
    case 13:
        b = "218103808";
        break;
    case 14:
        b = "234881024";
        break;
    case 15:
        b = "251658240";
        break;
    case 16:
        b = "268435456";
        break;
    case 17:
        b = "285212672";
        break;
    case 18:
        b = "301989888";
        break;
    case 19:
        b = "318767104";
        break;
    case 20:
        b = "335544320";
        break;
    case 21:
        b = "352321536";
        break;
    case 22:
        b = "369098752";
        break;
    case 23:
        b = "385875968";
        break;
    case 24:
        b = "402653184";
        break;
    case 25:
        b = "419430400";
        break;
    case 26:
        b = "436207616";
        break;
    case 27:
        b = "452984832";
        break;
    case 28:
        b = "469762048";
        break;
    case 29:
        b = "486539264";
        break;
    case 30:
        b = "503316480";
        break;
    case 31:
        b = "520093696";
        break;
    case 32:
        b = "536870912";
        break;
    case 33:
        b = "553648128";
        break;
    case 34:
        b = "570425344";
        break;
    case 35:
        b = "587202560";
        break;
    case 36:
        b = "603979776";
        break;
    case 37:
        b = "620756992";
        break;
    case 38:
        b = "637534208";
        break;
    case 39:
        b = "654311424";
        break;
    case 40:
        b = "671088640";
        break;
    case 41:
        b = "687865856";
        break;
    case 42:
        b = "704643072";
        break;
    case 43:
        b = "721420288";
        break;
    case 44:
        b = "738197504";
        break;
    case 45:
        b = "754974720";
        break;
    case 46:
        b = "771751936";
        break;
    case 47:
        b = "788529152";
        break;
    case 48:
        b = "805306368";
        break;
    case 49:
        b = "822083584";
        break;
    case 50:
        b = "838860800";
        break;
    case 51:
        b = "855638016";
        break;
    case 52:
        b = "872415232";
        break;
    case 53:
        b = "889192448";
        break;
    case 54:
        b = "905969664";
        break;
    case 55:
        b = "922746880";
        break;
    case 56:
        b = "939524096";
        break;
    case 57:
        b = "956301312";
        break;
    case 58:
        b = "973078528";
        break;
    case 59:
        b = "989855744";
        break;
    case 60:
        b = "1006632960";
        break;
    case 61:
        b = "1023410176";
        break;
    case 62:
        b = "1040187392";
        break;
    case 63:
        b = "1056964608";
        break;
    case 64:
        b = "1073741824";
        break;
    case 65:
        b = "1090519040";
        break;
    case 66:
        b = "1107296256";
        break;
    case 67:
        b = "1124073472";
        break;
    case 68:
        b = "1140850688";
        break;
    case 69:
        b = "1157627904";
        break;
    case 70:
        b = "1174405120";
        break;
    case 71:
        b = "1191182336";
        break;
    case 72:
        b = "1207959552";
        break;
    case 73:
        b = "1224736768";
        break;
    case 74:
        b = "1241513984";
        break;
    case 75:
        b = "1258291200";
        break;
    case 76:
        b = "1275068416";
        break;
    case 77:
        b = "1291845632";
        break;
    case 78:
        b = "1308622848";
        break;
    case 79:
        b = "1325400064";
        break;
    case 80:
        b = "1342177280";
        break;
    case 81:
        b = "1358954496";
        break;
    case 82:
        b = "1375731712";
        break;
    case 83:
        b = "1392508928";
        break;
    case 84:
        b = "1409286144";
        break;
    case 85:
        b = "1426063360";
        break;
    case 86:
        b = "1442840576";
        break;
    case 87:
        b = "1459617792";
        break;
    case 88:
        b = "1476395008";
        break;
    case 89:
        b = "1493172224";
        break;
    case 90:
        b = "1509949440";
        break;
    case 91:
        b = "1526726656";
        break;
    case 92:
        b = "1543503872";
        break;
    case 93:
        b = "1560281088";
        break;
    case 94:
        b = "1577058304";
        break;
    case 95:
        b = "1593835520";
        break;
    case 96:
        b = "1610612736";
        break;
    case 97:
        b = "1627389952";
        break;
    case 98:
        b = "1644167168";
        break;
    case 99:
        b = "1660944384";
        break;
    case 100:
        b = "1677721600";
        break;
    case 101:
        b = "1694498816";
        break;
    case 102:
        b = "1711276032";
        break;
    case 103:
        b = "1728053248";
        break;
    case 104:
        b = "1744830464";
        break;
    case 105:
        b = "1761607680";
        break;
    case 106:
        b = "1778384896";
        break;
    case 107:
        b = "1795162112";
        break;
    case 108:
        b = "1811939328";
        break;
    case 109:
        b = "1828716544";
        break;
    case 110:
        b = "1845493760";
        break;
    case 111:
        b = "1862270976";
        break;
    case 112:
        b = "1879048192";
        break;
    case 113:
        b = "1895825408";
        break;
    case 114:
        b = "1912602624";
        break;
    case 115:
        b = "1929379840";
        break;
    case 116:
        b = "1946157056";
        break;
    case 117:
        b = "1962934272";
        break;
    case 118:
        b = "1979711488";
        break;
    case 119:
        b = "1996488704";
        break;
    case 120:
        b = "2013265920";
        break;
    case 121:
        b = "2030043136";
        break;
    case 122:
        b = "2046820352";
        break;
    case 123:
        b = "2063597568";
        break;
    case 124:
        b = "2080374784";
        break;
    case 125:
        b = "2097152000";
        break;
    case 126:
        b = "2113929216";
        break;
    case 127:
        b = "2130706432";
        break;
    case 128:
        b = "2147483648";
        break;
    case 129:
        b = "2164260864";
        break;
    case 130:
        b = "2181038080";
        break;
    case 131:
        b = "2197815296";
        break;
    case 132:
        b = "2214592512";
        break;
    case 133:
        b = "2231369728";
        break;
    case 134:
        b = "2248146944";
        break;
    case 135:
        b = "2264924160";
        break;
    case 136:
        b = "2281701376";
        break;
    case 137:
        b = "2298478592";
        break;
    case 138:
        b = "2315255808";
        break;
    case 139:
        b = "2332033024";
        break;
    case 140:
        b = "2348810240";
        break;
    case 141:
        b = "2365587456";
        break;
    case 142:
        b = "2382364672";
        break;
    case 143:
        b = "2399141888";
        break;
    case 144:
        b = "2415919104";
        break;
    case 145:
        b = "2432696320";
        break;
    case 146:
        b = "2449473536";
        break;
    case 147:
        b = "2466250752";
        break;
    case 148:
        b = "2483027968";
        break;
    case 149:
        b = "2499805184";
        break;
    case 150:
        b = "2516582400";
        break;
    case 151:
        b = "2533359616";
        break;
    case 152:
        b = "2550136832";
        break;
    case 153:
        b = "2566914048";
        break;
    case 154:
        b = "2583691264";
        break;
    case 155:
        b = "2600468480";
        break;
    case 156:
        b = "2617245696";
        break;
    case 157:
        b = "2634022912";
        break;
    case 158:
        b = "2650800128";
        break;
    case 159:
        b = "2667577344";
        break;
    case 160:
        b = "2684354560";
        break;
    case 161:
        b = "2701131776";
        break;
    case 162:
        b = "2717908992";
        break;
    case 163:
        b = "2734686208";
        break;
    case 164:
        b = "2751463424";
        break;
    case 165:
        b = "2768240640";
        break;
    case 166:
        b = "2785017856";
        break;
    case 167:
        b = "2801795072";
        break;
    case 168:
        b = "2818572288";
        break;
    case 169:
        b = "2835349504";
        break;
    case 170:
        b = "2852126720";
        break;
    case 171:
        b = "2868903936";
        break;
    case 172:
        b = "2885681152";
        break;
    case 173:
        b = "2902458368";
        break;
    case 174:
        b = "2919235584";
        break;
    case 175:
        b = "2936012800";
        break;
    case 176:
        b = "2952790016";
        break;
    case 177:
        b = "2969567232";
        break;
    case 178:
        b = "2986344448";
        break;
    case 179:
        b = "3003121664";
        break;
    case 180:
        b = "3019898880";
        break;
    case 181:
        b = "3036676096";
        break;
    case 182:
        b = "3053453312";
        break;
    case 183:
        b = "3070230528";
        break;
    case 184:
        b = "3087007744";
        break;
    case 185:
        b = "3103784960";
        break;
    case 186:
        b = "3120562176";
        break;
    case 187:
        b = "3137339392";
        break;
    case 188:
        b = "3154116608";
        break;
    case 189:
        b = "3170893824";
        break;
    case 190:
        b = "3187671040";
        break;
    case 191:
        b = "3204448256";
        break;
    case 192:
        b = "3221225472";
        break;
    case 193:
        b = "3238002688";
        break;
    case 194:
        b = "3254779904";
        break;
    case 195:
        b = "3271557120";
        break;
    case 196:
        b = "3288334336";
        break;
    case 197:
        b = "3305111552";
        break;
    case 198:
        b = "3321888768";
        break;
    case 199:
        b = "3338665984";
        break;
    case 200:
        b = "3355443200";
        break;
    case 201:
        b = "3372220416";
        break;
    case 202:
        b = "3388997632";
        break;
    case 203:
        b = "3405774848";
        break;
    case 204:
        b = "3422552064";
        break;
    case 205:
        b = "3439329280";
        break;
    case 206:
        b = "3456106496";
        break;
    case 207:
        b = "3472883712";
        break;
    case 208:
        b = "3489660928";
        break;
    case 209:
        b = "3506438144";
        break;
    case 210:
        b = "3523215360";
        break;
    case 211:
        b = "3539992576";
        break;
    case 212:
        b = "3556769792";
        break;
    case 213:
        b = "3573547008";
        break;
    case 214:
        b = "3590324224";
        break;
    case 215:
        b = "3607101440";
        break;
    case 216:
        b = "3623878656";
        break;
    case 217:
        b = "3640655872";
        break;
    case 218:
        b = "3657433088";
        break;
    case 219:
        b = "3674210304";
        break;
    case 220:
        b = "3690987520";
        break;
    case 221:
        b = "3707764736";
        break;
    case 222:
        b = "3724541952";
        break;
    case 223:
        b = "3741319168";
        break;
    case 224:
        b = "3758096384";
        break;
    case 225:
        b = "3774873600";
        break;
    case 226:
        b = "3791650816";
        break;
    case 227:
        b = "3808428032";
        break;
    case 228:
        b = "3825205248";
        break;
    case 229:
        b = "3841982464";
        break;
    case 230:
        b = "3858759680";
        break;
    case 231:
        b = "3875536896";
        break;
    case 232:
        b = "3892314112";
        break;
    case 233:
        b = "3909091328";
        break;
    case 234:
        b = "3925868544";
        break;
    case 235:
        b = "3942645760";
        break;
    case 236:
        b = "3959422976";
        break;
    case 237:
        b = "3976200192";
        break;
    case 238:
        b = "3992977408";
        break;
    case 239:
        b = "4009754624";
        break;
    case 240:
        b = "4026531840";
        break;
    case 241:
        b = "4043309056";
        break;
    case 242:
        b = "4060086272";
        break;
    case 243:
        b = "4076863488";
        break;
    case 244:
        b = "4093640704";
        break;
    case 245:
        b = "4110417920";
        break;
    case 246:
        b = "4127195136";
        break;
    case 247:
        b = "4143972352";
        break;
    case 248:
        b = "4160749568";
        break;
    case 249:
        b = "4177526784";
        break;
    case 250:
        b = "4194304000";
        break;
    case 251:
        b = "4211081216";
        break;
    case 252:
        b = "4227858432";
        break;
    case 253:
        b = "4244635648";
        break;
    case 254:
        b = "4261412864";
        break;
    case 255:
        b = "4278190080";
        break;
    default:
        throw "未定义int64第4为数值"
    }
    return b
}

function get_int64_5(a) {
    var b = "";
    switch (a) {
    case 0:
        b = "0"
        break;
    case 1:
        b = "4294967296";
        break;
    case 2:
        b = "8589934592";
        break;
    case 3:
        b = "12884901888";
        break;
    case 4:
        b = "17179869184";
        break;
    case 5:
        b = "21474836480";
        break;
    case 6:
        b = "25769803776";
        break;
    case 7:
        b = "30064771072";
        break;
    case 8:
        b = "34359738368";
        break;
    case 9:
        b = "38654705664";
        break;
    case 10:
        b = "42949672960";
        break;
    case 11:
        b = "47244640256";
        break;
    case 12:
        b = "51539607552";
        break;
    case 13:
        b = "55834574848";
        break;
    case 14:
        b = "60129542144";
        break;
    case 15:
        b = "64424509440";
        break;
    case 16:
        b = "68719476736";
        break;
    case 17:
        b = "73014444032";
        break;
    case 18:
        b = "77309411328";
        break;
    case 19:
        b = "81604378624";
        break;
    case 20:
        b = "85899345920";
        break;
    case 21:
        b = "90194313216";
        break;
    case 22:
        b = "94489280512";
        break;
    case 23:
        b = "98784247808";
        break;
    case 24:
        b = "103079215104";
        break;
    case 25:
        b = "107374182400";
        break;
    case 26:
        b = "111669149696";
        break;
    case 27:
        b = "115964116992";
        break;
    case 28:
        b = "120259084288";
        break;
    case 29:
        b = "124554051584";
        break;
    case 30:
        b = "128849018880";
        break;
    case 31:
        b = "133143986176";
        break;
    case 32:
        b = "137438953472";
        break;
    case 33:
        b = "141733920768";
        break;
    case 34:
        b = "146028888064";
        break;
    case 35:
        b = "150323855360";
        break;
    case 36:
        b = "154618822656";
        break;
    case 37:
        b = "158913789952";
        break;
    case 38:
        b = "163208757248";
        break;
    case 39:
        b = "167503724544";
        break;
    case 40:
        b = "171798691840";
        break;
    case 41:
        b = "176093659136";
        break;
    case 42:
        b = "180388626432";
        break;
    case 43:
        b = "184683593728";
        break;
    case 44:
        b = "188978561024";
        break;
    case 45:
        b = "193273528320";
        break;
    case 46:
        b = "197568495616";
        break;
    case 47:
        b = "201863462912";
        break;
    case 48:
        b = "206158430208";
        break;
    case 49:
        b = "210453397504";
        break;
    case 50:
        b = "214748364800";
        break;
    case 51:
        b = "219043332096";
        break;
    case 52:
        b = "223338299392";
        break;
    case 53:
        b = "227633266688";
        break;
    case 54:
        b = "231928233984";
        break;
    case 55:
        b = "236223201280";
        break;
    case 56:
        b = "240518168576";
        break;
    case 57:
        b = "244813135872";
        break;
    case 58:
        b = "249108103168";
        break;
    case 59:
        b = "253403070464";
        break;
    case 60:
        b = "257698037760";
        break;
    case 61:
        b = "261993005056";
        break;
    case 62:
        b = "266287972352";
        break;
    case 63:
        b = "270582939648";
        break;
    case 64:
        b = "274877906944";
        break;
    case 65:
        b = "279172874240";
        break;
    case 66:
        b = "283467841536";
        break;
    case 67:
        b = "287762808832";
        break;
    case 68:
        b = "292057776128";
        break;
    case 69:
        b = "296352743424";
        break;
    case 70:
        b = "300647710720";
        break;
    case 71:
        b = "304942678016";
        break;
    case 72:
        b = "309237645312";
        break;
    case 73:
        b = "313532612608";
        break;
    case 74:
        b = "317827579904";
        break;
    case 75:
        b = "322122547200";
        break;
    case 76:
        b = "326417514496";
        break;
    case 77:
        b = "330712481792";
        break;
    case 78:
        b = "335007449088";
        break;
    case 79:
        b = "339302416384";
        break;
    case 80:
        b = "343597383680";
        break;
    case 81:
        b = "347892350976";
        break;
    case 82:
        b = "352187318272";
        break;
    case 83:
        b = "356482285568";
        break;
    case 84:
        b = "360777252864";
        break;
    case 85:
        b = "365072220160";
        break;
    case 86:
        b = "369367187456";
        break;
    case 87:
        b = "373662154752";
        break;
    case 88:
        b = "377957122048";
        break;
    case 89:
        b = "382252089344";
        break;
    case 90:
        b = "386547056640";
        break;
    case 91:
        b = "390842023936";
        break;
    case 92:
        b = "395136991232";
        break;
    case 93:
        b = "399431958528";
        break;
    case 94:
        b = "403726925824";
        break;
    case 95:
        b = "408021893120";
        break;
    case 96:
        b = "412316860416";
        break;
    case 97:
        b = "416611827712";
        break;
    case 98:
        b = "420906795008";
        break;
    case 99:
        b = "425201762304";
        break;
    case 100:
        b = "429496729600";
        break;
    case 101:
        b = "433791696896";
        break;
    case 102:
        b = "438086664192";
        break;
    case 103:
        b = "442381631488";
        break;
    case 104:
        b = "446676598784";
        break;
    case 105:
        b = "450971566080";
        break;
    case 106:
        b = "455266533376";
        break;
    case 107:
        b = "459561500672";
        break;
    case 108:
        b = "463856467968";
        break;
    case 109:
        b = "468151435264";
        break;
    case 110:
        b = "472446402560";
        break;
    case 111:
        b = "476741369856";
        break;
    case 112:
        b = "481036337152";
        break;
    case 113:
        b = "485331304448";
        break;
    case 114:
        b = "489626271744";
        break;
    case 115:
        b = "493921239040";
        break;
    case 116:
        b = "498216206336";
        break;
    case 117:
        b = "502511173632";
        break;
    case 118:
        b = "506806140928";
        break;
    case 119:
        b = "511101108224";
        break;
    case 120:
        b = "515396075520";
        break;
    case 121:
        b = "519691042816";
        break;
    case 122:
        b = "523986010112";
        break;
    case 123:
        b = "528280977408";
        break;
    case 124:
        b = "532575944704";
        break;
    case 125:
        b = "536870912000";
        break;
    case 126:
        b = "541165879296";
        break;
    case 127:
        b = "545460846592";
        break;
    case 128:
        b = "549755813888";
        break;
    case 129:
        b = "554050781184";
        break;
    case 130:
        b = "558345748480";
        break;
    case 131:
        b = "562640715776";
        break;
    case 132:
        b = "566935683072";
        break;
    case 133:
        b = "571230650368";
        break;
    case 134:
        b = "575525617664";
        break;
    case 135:
        b = "579820584960";
        break;
    case 136:
        b = "584115552256";
        break;
    case 137:
        b = "588410519552";
        break;
    case 138:
        b = "592705486848";
        break;
    case 139:
        b = "597000454144";
        break;
    case 140:
        b = "601295421440";
        break;
    case 141:
        b = "605590388736";
        break;
    case 142:
        b = "609885356032";
        break;
    case 143:
        b = "614180323328";
        break;
    case 144:
        b = "618475290624";
        break;
    case 145:
        b = "622770257920";
        break;
    case 146:
        b = "627065225216";
        break;
    case 147:
        b = "631360192512";
        break;
    case 148:
        b = "635655159808";
        break;
    case 149:
        b = "639950127104";
        break;
    case 150:
        b = "644245094400";
        break;
    case 151:
        b = "648540061696";
        break;
    case 152:
        b = "652835028992";
        break;
    case 153:
        b = "657129996288";
        break;
    case 154:
        b = "661424963584";
        break;
    case 155:
        b = "665719930880";
        break;
    case 156:
        b = "670014898176";
        break;
    case 157:
        b = "674309865472";
        break;
    case 158:
        b = "678604832768";
        break;
    case 159:
        b = "682899800064";
        break;
    case 160:
        b = "687194767360";
        break;
    case 161:
        b = "691489734656";
        break;
    case 162:
        b = "695784701952";
        break;
    case 163:
        b = "700079669248";
        break;
    case 164:
        b = "704374636544";
        break;
    case 165:
        b = "708669603840";
        break;
    case 166:
        b = "712964571136";
        break;
    case 167:
        b = "717259538432";
        break;
    case 168:
        b = "721554505728";
        break;
    case 169:
        b = "725849473024";
        break;
    case 170:
        b = "730144440320";
        break;
    case 171:
        b = "734439407616";
        break;
    case 172:
        b = "738734374912";
        break;
    case 173:
        b = "743029342208";
        break;
    case 174:
        b = "747324309504";
        break;
    case 175:
        b = "751619276800";
        break;
    case 176:
        b = "755914244096";
        break;
    case 177:
        b = "760209211392";
        break;
    case 178:
        b = "764504178688";
        break;
    case 179:
        b = "768799145984";
        break;
    case 180:
        b = "773094113280";
        break;
    case 181:
        b = "777389080576";
        break;
    case 182:
        b = "781684047872";
        break;
    case 183:
        b = "785979015168";
        break;
    case 184:
        b = "790273982464";
        break;
    case 185:
        b = "794568949760";
        break;
    case 186:
        b = "798863917056";
        break;
    case 187:
        b = "803158884352";
        break;
    case 188:
        b = "807453851648";
        break;
    case 189:
        b = "811748818944";
        break;
    case 190:
        b = "816043786240";
        break;
    case 191:
        b = "820338753536";
        break;
    case 192:
        b = "824633720832";
        break;
    case 193:
        b = "828928688128";
        break;
    case 194:
        b = "833223655424";
        break;
    case 195:
        b = "837518622720";
        break;
    case 196:
        b = "841813590016";
        break;
    case 197:
        b = "846108557312";
        break;
    case 198:
        b = "850403524608";
        break;
    case 199:
        b = "854698491904";
        break;
    case 200:
        b = "858993459200";
        break;
    case 201:
        b = "863288426496";
        break;
    case 202:
        b = "867583393792";
        break;
    case 203:
        b = "871878361088";
        break;
    case 204:
        b = "876173328384";
        break;
    case 205:
        b = "880468295680";
        break;
    case 206:
        b = "884763262976";
        break;
    case 207:
        b = "889058230272";
        break;
    case 208:
        b = "893353197568";
        break;
    case 209:
        b = "897648164864";
        break;
    case 210:
        b = "901943132160";
        break;
    case 211:
        b = "906238099456";
        break;
    case 212:
        b = "910533066752";
        break;
    case 213:
        b = "914828034048";
        break;
    case 214:
        b = "919123001344";
        break;
    case 215:
        b = "923417968640";
        break;
    case 216:
        b = "927712935936";
        break;
    case 217:
        b = "932007903232";
        break;
    case 218:
        b = "936302870528";
        break;
    case 219:
        b = "940597837824";
        break;
    case 220:
        b = "944892805120";
        break;
    case 221:
        b = "949187772416";
        break;
    case 222:
        b = "953482739712";
        break;
    case 223:
        b = "957777707008";
        break;
    case 224:
        b = "962072674304";
        break;
    case 225:
        b = "966367641600";
        break;
    case 226:
        b = "970662608896";
        break;
    case 227:
        b = "974957576192";
        break;
    case 228:
        b = "979252543488";
        break;
    case 229:
        b = "983547510784";
        break;
    case 230:
        b = "987842478080";
        break;
    case 231:
        b = "992137445376";
        break;
    case 232:
        b = "996432412672";
        break;
    case 233:
        b = "1000727379968";
        break;
    case 234:
        b = "1005022347264";
        break;
    case 235:
        b = "1009317314560";
        break;
    case 236:
        b = "1013612281856";
        break;
    case 237:
        b = "1017907249152";
        break;
    case 238:
        b = "1022202216448";
        break;
    case 239:
        b = "1026497183744";
        break;
    case 240:
        b = "1030792151040";
        break;
    case 241:
        b = "1035087118336";
        break;
    case 242:
        b = "1039382085632";
        break;
    case 243:
        b = "1043677052928";
        break;
    case 244:
        b = "1047972020224";
        break;
    case 245:
        b = "1052266987520";
        break;
    case 246:
        b = "1056561954816";
        break;
    case 247:
        b = "1060856922112";
        break;
    case 248:
        b = "1065151889408";
        break;
    case 249:
        b = "1069446856704";
        break;
    case 250:
        b = "1073741824000";
        break;
    case 251:
        b = "1078036791296";
        break;
    case 252:
        b = "1082331758592";
        break;
    case 253:
        b = "1086626725888";
        break;
    case 254:
        b = "1090921693184";
        break;
    case 255:
        b = "1095216660480";
        break;
    default:
        throw "未定义int64第5为数值"
    }
    return b
}

function read_int64(a) {
    var d, b = 0,
    c = "";
    for (d = 0; d < a.length; d++) {
        if (3 > d && (b += a[d] << 8 * d, c = b.toString()), d > 2) {
            switch (d) {
            case 3:
                c = s_add(c, get_int64_4(a[d]));
                break;
            case 4:
                c = s_add(c, get_int64_5(a[d]));
                break;
            case 5:
                c = s_add(c, get_int64_6(a[d]));
                break;
            case 6:
                c = s_add(c, get_int64_7(a[d]));
                break;
            case 7:
                c = s_add(c, get_int64_8(a[d]))
            }
        }
    }
    if (compareint(c, "9223372036854775807")) c = s_add(c, "-18446744073709551616");
    return {
        o: c,
        b: a.slice(8, a.length)
    }
}

function s_add(a, b) {
    var a_negative = a[0] == "-",
    b_negative = b[0] == "-";
    if (a_negative) {
        a = a.replace("-", "")
    }
    if (b_negative) {
        b = b.replace("-", "")
    }
    var c, d, e, add = (a_negative && b_negative) || (!a_negative && !b_negative);
    if (a_negative && !b_negative) {
        c = a;
        a = b;
        b = c
    }
    if (b.length > a.length) {
        for (c = a.length; c < b.length; c++) {
            a = "0" + a
        }
    } else {
        for (c = b.length; c < a.length; c++) {
            b = "0" + b
        }
    }
    var _a = [],
    _b = [];
    for (c = b.length - 1; c >= 0; c--) {
        _a.push(Number(a[c]));
        _b.push(Number(b[c]))
    }
    for (c = 0; c < b.length; c++) {
        if (add) {
            _a[c] = _a[c] + _b[c]
        } else {
            _a[c] = _a[c] - _b[c];
            if (_a[c] < 0) {
                if (typeof _a[c + 1] != "undefined") {
                    _a[c + 1]--;
                    _a[c] += 10
                }
            }
        }
    }
    if (add) {
        for (c = 0; c < _a.length; c++) {
            if (_a[c] > 9) {
                _a[c] = _a[c] - 10;
                if (!_a[c + 1]) {
                    _a[c + 1] = 0
                }
                _a[c + 1]++
            }
        }
    } else {
        if (_a[_a.length - 1] < 0) {
            for (c = 0; c < _a.length; c++) {
                _a[c] = _a[c] * -1;
                if (_a[c] < 0) {
                    _a[c + 1]++;
                    _a[c] += 10
                }
            }
            _a.push("-")
        }
    }
    a_negative && b_negative ? _b = ["-"] : _b = [];
    for (c = _a.length - 1; c >= 0; c--) {
        _b.push(_a[c])
    }
    return _b.join("").replace(/^0+/, "").replace(/^-0+/, "-")
}

function write_int32(v) {
    if (v == null) {
        v = 0
    }
    if (isNaN(Number(v))) {
        throw "传入一个非number参数"
    }
    return [v & 255, (v >> 8) & 255, (v >> 16) & 255, (v >> 24) & 255]
}

function write_int16(v) {
    if (v == null) {
        v = 0
    }
    if (isNaN(Number(v))) {
        throw "传入一个非number参数"
    }
    return [v & 255, (v >> 8) & 255]
}

function write_int8(v) {
    if (v == null) {
        v = 0
    }
    if (isNaN(Number(v))) {
        throw "传入一个非number参数"
    }
    return [v & 255]
}

function write_string(s) {
    var a = [];
    if (s == null || s == undefined) {
        return write_int16(0)
    }
    if (typeof s != "string" && typeof s != "number") {
        throw "传入一个非string参数"
    }
    var v = textencode(s);
    a = write_int16(v.length);
    for (var i = 0; i < v.length; i++) {
        a.push(v[i])
    }
    return a
}

function read_int32(v) {
    var a = {
        o: v[0] + (v[1] << 8) + (v[2] << 16) + (v[3] << 24),
        b: v.slice(4, v.length)
    };
    if (a.o > 2147483647) {
        a.o -= 4294967296
    }
    return a
}

function read_int16(v) {
    var a = {
        o: v[0] + (v[1] << 8),
        b: v.slice(2, v.length)
    };
    if (a.o > 32767) {
        a.o -= 65536
    }
    return a
}

function read_int8(v) {
    var a = {
        o: v[0],
        b: v.slice(1, v.length)
    };
    if (a.o > 127) {
        a.o -= 256
    }
    return a
}

function read_string(v) {
    var b = read_int16(v);
    return {
        o: textdecode(new Uint8Array(b.b.slice(0, b.o))),
        b: b.b.slice(b.o, b.b.length)
    }
}
function write_byte(b) {
    if (b == undefined) {
        return [0, 0, 0, 0];
    }
    var a = write_int32(b.length);
    for (var i in b) {
        a.push(b[i]);
    }
    return a
}
function read_byte(b) {
    var b = read_int32(b);
    return {
        o: b.b.slice(0, b.o),
        b: b.b.slice(b.o, b.b.length)
    }
};
///<jscompress sourcefile="handle.js" />
function read_msg(b){
	var cmd = read_int32(b),r={};
	switch(cmd.o){
	case 142633269:
		r=read_MSG_admin_forum_three(cmd.b)
		break
	case 1555791377:
		r=read_MSG_WS2U_Admin_menu_forums_moderators(cmd.b)
		break
	case -149517524:
		r=read_MSG_WS2U_upload_image(cmd.b)
		break
	case -1619289269:
		r=read_MSG_U2WS_QQLoginUrl(cmd.b)
		break
	case 276821048:
		r=read_MSG_U2WS_ChangeBind(cmd.b)
		break
	case -1249765676:
		r=read_MSG_forum_cart_child(cmd.b)
		break
	case 831351040:
		r=read_MSG_SpacecpGroupPermission(cmd.b)
		break
	case 1831523310:
		r=read_MSG_WS2U_ResetPW(cmd.b)
		break
	case 1355902236:
		r=read_MSG_WS2U_BindAccount(cmd.b)
		break
	case 1078534639:
		r=read_MSG_WS2U_SpaceThread(cmd.b)
		break
	case -1378201131:
		r=read_MSG_U2WS_diy_save(cmd.b)
		break
	case 1673174523:
		r=read_MSG_WS2U_CheckRegister(cmd.b)
		break
	case 405274830:
		r=read_MSG_block_item_showstyle(cmd.b)
		break
	case 814047536:
		r=read_MSG_diy_frame(cmd.b)
		break
	case 98456939:
		r=read_MSG_U2WS_Admin_menu_setting_functions(cmd.b)
		break
	case 529232478:
		r=read_MSG_U2WS_Admin_edit_setting_functions_other(cmd.b)
		break
	case 548015641:
		r=read_MSG_WS2U_GetChangeBindUrl(cmd.b)
		break
	case -1590634053:
		r=read_MSG_U2WS_nextset(cmd.b)
		break
	case 2117521190:
		r=read_MSG_forum_album(cmd.b)
		break
	case 1160234390:
		r=read_MSG_U2WS_forum_refresh(cmd.b)
		break
	case 874163309:
		r=read_MSG_ThreadBind(cmd.b)
		break
	case -848292620:
		r=read_MSG_U2WS_Admin_edit_setting_functions_comment(cmd.b)
		break
	case 1078788684:
		r=read_MSG_setting_activityfield(cmd.b)
		break
	case 107399903:
		r=read_MSG_diy_block(cmd.b)
		break
	case 1199011583:
		r=read_MSG_U2WS_delete_attach(cmd.b)
		break
	case -34596055:
		r=read_MSG_WS2U_custommenu(cmd.b)
		break
	case 256949028:
		r=read_MSG_block_template_s(cmd.b)
		break
	case -1370806890:
		r=read_MSG_diy_title(cmd.b)
		break
	case -814838689:
		r=read_MSG_U2WS_Login_Gethash(cmd.b)
		break
	case -843349899:
		r=read_MSG_U2WS_logout(cmd.b)
		break
	case -1538758015:
		r=read_MSG_U2WS_Admin_edit_setting_functions_threadexp(cmd.b)
		break
	case 37433885:
		r=read_MSG_Admin_setting_functions_heatthread(cmd.b)
		break
	case 1392055914:
		r=read_MSG_U2WS_Admin_edit_setting_functions_activity(cmd.b)
		break
	case 711910816:
		r=read_MSG_forum_group(cmd.b)
		break
	case -371741980:
		r=read_MSG_U2WS_Admin_edit_setting_functions_mod(cmd.b)
		break
	case 1334552719:
		r=read_MSG_U2WS_LostPW(cmd.b)
		break
	case 340003950:
		r=read_MSG_C2S_Conn_Client(cmd.b)
		break
	case -480884745:
		r=read_MSG_forum_attach(cmd.b)
		break
	case -2109377824:
		r=read_MSG_userprofiles(cmd.b)
		break
	case 616977199:
		r=read_MSG_WS2U_forum(cmd.b)
		break
	case 1184955545:
		r=read_MSG_WS2U_PollThread_sucess(cmd.b)
		break
	case 1296010750:
		r=read_MSG_post_ratelog(cmd.b)
		break
	case -60812530:
		r=read_MSG_WS2U_Getlogin(cmd.b)
		break
	case -1451137317:
		r=read_MSG_diy_tab(cmd.b)
		break
	case 578970688:
		r=read_MSG_block_template(cmd.b)
		break
	case 664970303:
		r=read_MSG_U2WS_forum_carlist(cmd.b)
		break
	case -623998936:
		r=read_MSG_WS2U_QQLoginUrl(cmd.b)
		break
	case 1710690038:
		r=read_MSG_WS2U_Server_OK(cmd.b)
		break
	case -1667725759:
		r=read_MSG_Admin_setting_functions_mod(cmd.b)
		break
	case 1127661264:
		r=read_MSG_post_relateitem(cmd.b)
		break
	case 1503238307:
		r=read_MSG_U2WS_searchThread(cmd.b)
		break
	case 1027411378:
		r=read_MSG_U2WS_Edit_Profile(cmd.b)
		break
	case -2088438621:
		r=read_MSG_forum_post_medal(cmd.b)
		break
	case -1092979582:
		r=read_MSG_diy_column(cmd.b)
		break
	case -1867493945:
		r=read_MSG_forum_type(cmd.b)
		break
	case 885980426:
		r=read_MSG_U2WS_viewthreadmod(cmd.b)
		break
	case 689990192:
		r=read_MSG_GroupIdName(cmd.b)
		break
	case 157251877:
		r=read_MSG_WS2U_Gettoken(cmd.b)
		break
	case 1801302893:
		r=read_MSG_Admin_setting_access(cmd.b)
		break
	case -160848332:
		r=read_MSG_U2WS_Gettoken(cmd.b)
		break
	case -840121397:
		r=read_MSG_admin_forum_type(cmd.b)
		break
	case 1595670514:
		r=read_MSG_WS2U_Login_Gethash(cmd.b)
		break
	case -1627801678:
		r=read_MSG_diy_block_info(cmd.b)
		break
	case 1189303805:
		r=read_MSG_forum_modrecommend(cmd.b)
		break
	case 1149592144:
		r=read_MSG_U2WS_Forum_newthread_submit(cmd.b)
		break
	case -1106524571:
		r=read_MSG_U2WS_forum_viewthread(cmd.b)
		break
	case -1265560393:
		r=read_MSG_U2WS_tpl_success(cmd.b)
		break
	case 1959754928:
		r=read_MSG_admin_forums_group(cmd.b)
		break
	case -105825607:
		r=read_MSG_U2WS_QQLogin(cmd.b)
		break
	case -1405787337:
		r=read_MSG_U2WS_Admin_menu_forums_edit(cmd.b)
		break
	case 1031321379:
		r=read_MSG_U2WS_upload_image(cmd.b)
		break
	case 58375333:
		r=read_MSG_admin_forum_extra(cmd.b)
		break
	case 774094179:
		r=read_MSG_U2WS_forum_modcp(cmd.b)
		break
	case -1531212121:
		r=read_MSG_WS2U_viewthreadmod(cmd.b)
		break
	case -1380880793:
		r=read_MSG_searchThread(cmd.b)
		break
	case 1316147567:
		r=read_MSG_Admin_setting_functions_recommend(cmd.b)
		break
	case -1451728518:
		r=read_MSG_add_extcredits(cmd.b)
		break
	case -576901504:
		r=read_MSG_WS2U_threadfastpost(cmd.b)
		break
	case -47517347:
		r=read_MSG_admin_forum_threadsorts(cmd.b)
		break
	case 2087726285:
		r=read_MSG_threadmod(cmd.b)
		break
	case 73925374:
		r=read_MSG_WS2U_threadmod(cmd.b)
		break
	case 899199166:
		r=read_MSG_U2WS_ChangePasswd_Gethash(cmd.b)
		break
	case -1334594352:
		r=read_MSG_forum_idname(cmd.b)
		break
	case 1534176368:
		r=read_MSG_WS2U_Admin_menu_forums_index(cmd.b)
		break
	case 1506905850:
		r=read_MSG_WS2U_UserLogin(cmd.b)
		break
	case 1849790434:
		r=read_MSG_U2WS_GetRegister(cmd.b)
		break
	case -35410442:
		r=read_MSG_forum_lastpost(cmd.b)
		break
	case -1210591342:
		r=read_MSG_WS2U_forum_carlist(cmd.b)
		break
	case 2028325385:
		r=read_MSG_Admin_setting_functions_threadexp(cmd.b)
		break
	case -302662362:
		r=read_MSG_U2WS_GetThreadBind(cmd.b)
		break
	case 1448265555:
		r=read_MSG_block_item_field(cmd.b)
		break
	case 177318912:
		r=read_MSG_forum_extra(cmd.b)
		break
	case -1863283440:
		r=read_MSG_U2WS_forum(cmd.b)
		break
	case 693391684:
		r=read_MSG_Admin_setting_functions_activity(cmd.b)
		break
	case 2061189765:
		r=read_MSG_admin_forum(cmd.b)
		break
	case 56019999:
		r=read_MSG_U2WS_Getlogin(cmd.b)
		break
	case -467585541:
		r=read_MSG_S2C_Conn_Client(cmd.b)
		break
	case -1946743894:
		r=read_MSG_U2WS_Admin_edit_forums_index(cmd.b)
		break
	case -295518409:
		r=read_MSG_U2WS_Admin_Edit_forums_moderator(cmd.b)
		break
	case 1303724428:
		r=read_MSG_forum_thread_forum(cmd.b)
		break
	case 1061377392:
		r=read_MSG_WS2U_upload_tmp_image(cmd.b)
		break
	case 1779812911:
		r=read_MSG_U2WS_Admin_menu_setting_access(cmd.b)
		break
	case -981386295:
		r=read_MSG_U2WS_Admin_menu_forums_index(cmd.b)
		break
	case -540414860:
		r=read_MSG_admin_forum_edit_base(cmd.b)
		break
	case 1761115921:
		r=read_MSG_forum_index_cart(cmd.b)
		break
	case -368188665:
		r=read_MSG_U2WS_Admin_menu_setting_basic(cmd.b)
		break
	case -1418299074:
		r=read_MSG_block_style(cmd.b)
		break
	case 117099868:
		r=read_MSG_block_item(cmd.b)
		break
	case -2002834216:
		r=read_MSG_WS2U_space(cmd.b)
		break
	case -135332941:
		r=read_MSG_U2WS_settoken(cmd.b)
		break
	case 1265224859:
		r=read_MSG_Admin_setting_functions_curscript(cmd.b)
		break
	case 1959565559:
		r=read_MSG_block_item_showstyle_info(cmd.b)
		break
	case -2077234963:
		r=read_MSG_U2WS_BindAccount(cmd.b)
		break
	case 1185077681:
		r=read_MSG_WS2U_Common_Head(cmd.b)
		break
	case -446167730:
		r=read_MSG_U2WS_GetHead(cmd.b)
		break
	case 1189377635:
		r=read_MSG_forum_post(cmd.b)
		break
	case -839162471:
		r=read_MSG_WS2U_SpacecpGroup(cmd.b)
		break
	case -665524975:
		r=read_MSG_WS2U_Email_Verify(cmd.b)
		break
	case 830031817:
		r=read_MSG_WS2U_Admin_menu_setting_access(cmd.b)
		break
	case 621846417:
		r=read_MSG_WS2U_SpacecpForum(cmd.b)
		break
	case -866166167:
		r=read_MSG_WS2U_Getseccode(cmd.b)
		break
	case 106954267:
		r=read_MSG_WS2U_tpl_load_js(cmd.b)
		break
	case 699095719:
		r=read_MSG_U2WS_Admin_Edit_custommenu(cmd.b)
		break
	case -1580472055:
		r=read_MSG_WS2U_Admin_rebuild_leftmenu(cmd.b)
		break
	case -786656194:
		r=read_MSG_Admin_setting_functions_comment(cmd.b)
		break
	case -10820895:
		r=read_MSG_admin_forums_moderator(cmd.b)
		break
	case -1812486996:
		r=read_MSG_WS2U_searchThread(cmd.b)
		break
	case 691372614:
		r=read_MSG_Conn_Down(cmd.b)
		break
	case 1251023957:
		r=read_MSG_admin_forum_cart(cmd.b)
		break
	case -687733422:
		r=read_MSG_WS2U_delete_attach(cmd.b)
		break
	case 1475637593:
		r=read_MSG_U2WS_RecommendThread(cmd.b)
		break
	case 1617053915:
		r=read_MSG_block_template_order(cmd.b)
		break
	case 1017770727:
		r=read_MSG_U2WS_space(cmd.b)
		break
	case -111561876:
		r=read_MSG_WS2U_LostPW(cmd.b)
		break
	case -1141941364:
		r=read_MSG_postreview(cmd.b)
		break
	case 2105593483:
		r=read_MSG_WS2U_GetThreadBind(cmd.b)
		break
	case -380025767:
		r=read_MSG_poll_option(cmd.b)
		break
	case 386708394:
		r=read_MSG_diy_first(cmd.b)
		break
	case 1883458624:
		r=read_MSG_forum_imgattach(cmd.b)
		break
	case -1934823944:
		r=read_MSG_post_comment(cmd.b)
		break
	case -950215658:
		r=read_MSG_SpacePost(cmd.b)
		break
	case 35425425:
		r=read_MSG_U2WS_Admin_edit_setting_access(cmd.b)
		break
	case -1799904226:
		r=read_MSG_U2WS_SpaceThread(cmd.b)
		break
	case 607514828:
		r=read_MSG_WS2U_spacecp(cmd.b)
		break
	case 1479415992:
		r=read_MSG_WS2U_Admin_menu_setting_basic(cmd.b)
		break
	case 1760833800:
		r=read_MSG_SpaceThread(cmd.b)
		break
	case 755023070:
		r=read_MSG_forum(cmd.b)
		break
	case -866489977:
		r=read_MSG_U2WS_forum_recyclebin(cmd.b)
		break
	case 2090873870:
		r=read_MSG_WS2U_forum_newthread(cmd.b)
		break
	case -1073456288:
		r=read_MSG_WS2U_QQLogin(cmd.b)
		break
	case -713593028:
		r=read_MSG_U2WS_GetChangeBindUrl(cmd.b)
		break
	case 436275943:
		r=read_MSG_WS2U_CommonResult(cmd.b)
		break
	case -1161885165:
		r=read_MSG_WS2U_GetRegister(cmd.b)
		break
	case -796428201:
		r=read_MSG_WS2U_Forum_newthread_submit(cmd.b)
		break
	case 399348313:
		r=read_MSG_forum_cart(cmd.b)
		break
	case 305846558:
		r=read_MSG_U2WS_Email_Verify(cmd.b)
		break
	case -1181151646:
		r=read_MSG_WS2U_Ping(cmd.b)
		break
	case 1848054995:
		r=read_MSG_U2WS_threadmod(cmd.b)
		break
	case -548832986:
		r=read_MSG_WS2U_upload_avatar(cmd.b)
		break
	case 919505458:
		r=read_MSG_U2WS_Admin_AddCustommenu(cmd.b)
		break
	case -1523481925:
		r=read_MSG_usergroup(cmd.b)
		break
	case -1477628465:
		r=read_MSG_U2WS_Admin_delete_forum(cmd.b)
		break
	case 1006442797:
		r=read_MSG_U2WS_Admin_menu_forums_moderators(cmd.b)
		break
	case 866031831:
		r=read_MSG_U2WS_UserLogin(cmd.b)
		break
	case 1969915046:
		r=read_MSG_U2WS_threadfastpost(cmd.b)
		break
	case 1617924422:
		r=read_MSG_WS2U_tpl_success(cmd.b)
		break
	case -1981134582:
		r=read_MSG_U2WS_Getseccode(cmd.b)
		break
	case 735634866:
		r=read_MSG_U2WS_Admin_menu_index(cmd.b)
		break
	case -511404881:
		r=read_MSG_U2WS_Admin_edit_setting_functions_heatthread(cmd.b)
		break
	case 213874677:
		r=read_MSG_forum_thread(cmd.b)
		break
	case 1315240586:
		r=read_MSG_forum_savethread(cmd.b)
		break
	case -1221014720:
		r=read_MSG_C2S_Regedit(cmd.b)
		break
	case 1056482773:
		r=read_MSG_U2WS_Admin_edit_setting_basic(cmd.b)
		break
	case 104018229:
		r=read_MSG_forum_threadtype(cmd.b)
		break
	case -493836804:
		r=read_MSG_post_member_profile(cmd.b)
		break
	case 1348090898:
		r=read_MSG_WS2U_Admin_menu_misc_custommenu(cmd.b)
		break
	case -1575018876:
		r=read_MSG_admin_forum_modrecommen(cmd.b)
		break
	case -31251618:
		r=read_MSG_Admin_setting_functions_other(cmd.b)
		break
	case 1272358720:
		r=read_MSG_WS2U_forum_viewthread(cmd.b)
		break
	case 304149348:
		r=read_MSG_WS2U_ChangePasswd_Gethash(cmd.b)
		break
	case -1375386023:
		r=read_MSG_U2WS_forum_newthread(cmd.b)
		break
	case -895601579:
		r=read_MSG_U2WS_upload_tmp_image(cmd.b)
		break
	case 54726888:
		r=read_MSG_U2WS_ChangePasswd(cmd.b)
		break
	case -761168918:
		r=read_MSG_U2WS_tpl_load_js(cmd.b)
		break
	case -204476842:
		r=read_MSG_U2WS_CheckRegister(cmd.b)
		break
	case 2145302771:
		r=read_MSG_forum_threadrush(cmd.b)
		break
	case -303705781:
		r=read_MSG_Admin_setting_functions_guide(cmd.b)
		break
	case 1000231794:
		r=read_MSG_U2WS_forum_index(cmd.b)
		break
	case 1329334923:
		r=read_MSG_U2WS_upload_avatar(cmd.b)
		break
	case 292242050:
		r=read_MSG_Poll_info(cmd.b)
		break
	case -1505563183:
		r=read_MSG_admin_forum_edit_ext(cmd.b)
		break
	case -278866301:
		r=read_MSG_WS2U_forum_index(cmd.b)
		break
	case 239411683:
		r=read_MSG_post_ratelog_score(cmd.b)
		break
	case 426252242:
		r=read_MSG_U2WS_Admin_menu_misc_custommenu(cmd.b)
		break
	case 471008838:
		r=read_MSG_diy_attr(cmd.b)
		break
	case -1811127086:
		r=read_MSG_forum_replycredit(cmd.b)
		break
	case -1328936102:
		r=read_MSG_U2WS_PollThread(cmd.b)
		break
	case 206405707:
		r=read_MSG_U2WS_Admin_edit_setting_functions_guide(cmd.b)
		break
	case 494965013:
		r=read_MSG_U2WS_spacecp(cmd.b)
		break
	case 1419751991:
		r=read_MSG_U2WS_ResetPW(cmd.b)
		break
	case -1830850073:
		r=read_MSG_U2WS_Admin_edit_setting_functions_recommend(cmd.b)
		break
	case -871377362:
		r=read_MSG_U2WS_Admin_setting_setnav(cmd.b)
		break
	case 943159600:
		r=read_MSG_WS2U_Admin_menu_forums_edit(cmd.b)
		break
	case -704884081:
		r=read_MSG_U2WS_Checkseccode(cmd.b)
		break
	case 806931670:
		r=read_MSG_forum_post_rush(cmd.b)
		break
	case -1736066974:
		r=read_MSG_WS2U_nextset(cmd.b)
		break
	case 1439360859:
		r=read_MSG_WS2U_ChangeBind(cmd.b)
		break
	case 902427406:
		r=read_MSG_U2WS_Admin_rebuild_leftmenu(cmd.b)
		break
	case -1077254663:
		r=read_MSG_U2WS_GetPostWarnList(cmd.b)
		break
	case -2058288370:
		r=read_MSG_WS2U_RecommendThread(cmd.b)
		break
	case -276913250:
		r=read_MSG_U2WS_SpacecpForum(cmd.b)
		break
	case 1780863600:
		r=read_MSG_admin_forum_threadtypes(cmd.b)
		break
	case -961222056:
		r=read_MSG_U2WS_Register(cmd.b)
		break
	case 1935059451:
		r=read_MSG_WSU2_Register(cmd.b)
		break
	case -740027387:
		r=read_MSG_diy_info(cmd.b)
		break
	case 127228310:
		r=read_MSG_U2WS_SpacecpGroup(cmd.b)
		break
	case -2064054626:
		r=read_MSG_U2WS_Ping(cmd.b)
		break
	case 1654141527:
		r=read_MSG_WS2U_Admin_menu_setting_functions(cmd.b)
		break
	}
	return {cmd:cmd.o,msg:r.o}
};
///<jscompress sourcefile="basic.js" />
var CMD_MSG_U2WS_Ping = -2064054626,CMD_MSG_WS2U_Ping = -1181151646,CMD_MSG_U2WS_Gettoken = -160848332,CMD_MSG_WS2U_Gettoken = 157251877,CMD_MSG_WS2U_CommonResult = 436275943,CMD_MSG_U2WS_logout = -843349899,CMD_MSG_U2WS_settoken = -135332941,CMD_MSG_U2WS_Getseccode = -1981134582,CMD_MSG_WS2U_Getseccode = -866166167,CMD_MSG_WS2U_Common_Head = 1185077681,CMD_MSG_WS2U_Server_OK = 1710690038,CMD_MSG_U2WS_tpl_load_js = -761168918,CMD_MSG_WS2U_tpl_load_js = 106954267;
function WRITE_MSG_U2WS_Ping(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Ping));
	b=b.concat(write_MSG_U2WS_Ping(o));
	return b;
}
function write_MSG_U2WS_Ping(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Ping(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Ping(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Ping));
	b=b.concat(write_MSG_WS2U_Ping(o));
	return b;
}
function write_MSG_WS2U_Ping(o){
	var b=[];
	b=b.concat(write_int16(o.Result));
	return b
}
function read_MSG_WS2U_Ping(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Result=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Gettoken(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Gettoken));
	b=b.concat(write_MSG_U2WS_Gettoken(o));
	return b;
}
function write_MSG_U2WS_Gettoken(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Gettoken(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Gettoken(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Gettoken));
	b=b.concat(write_MSG_WS2U_Gettoken(o));
	return b;
}
function write_MSG_WS2U_Gettoken(o){
	var b=[];
	b=b.concat(write_byte(o.Token));
	if(o.Head){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_WS2U_Common_Head(o.Head));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_WS2U_Gettoken(b){
	var o={},r={};r.b=b;
	r=read_byte(r.b);o.Token=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_WS2U_Common_Head(r.b);
		o.Head=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_CommonResult(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_CommonResult));
	b=b.concat(write_MSG_WS2U_CommonResult(o));
	return b;
}
function write_MSG_WS2U_CommonResult(o){
	var b=[];
	b=b.concat(write_int16(o.Result));
	b=b.concat(write_string(o.Err_url));
	return b
}
function read_MSG_WS2U_CommonResult(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Result=r.o
	r=read_string(r.b);
	o.Err_url=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_logout(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_logout));
	b=b.concat(write_MSG_U2WS_logout(o));
	return b;
}
function write_MSG_U2WS_logout(o){
	var b=[];
	return b
}
function read_MSG_U2WS_logout(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_settoken(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_settoken));
	b=b.concat(write_MSG_U2WS_settoken(o));
	return b;
}
function write_MSG_U2WS_settoken(o){
	var b=[];
	b=b.concat(write_byte(o.Token));
	return b
}
function read_MSG_U2WS_settoken(b){
	var o={},r={};r.b=b;
	r=read_byte(r.b);o.Token=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Getseccode(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Getseccode));
	b=b.concat(write_MSG_U2WS_Getseccode(o));
	return b;
}
function write_MSG_U2WS_Getseccode(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Getseccode(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Getseccode(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Getseccode));
	b=b.concat(write_MSG_WS2U_Getseccode(o));
	return b;
}
function write_MSG_WS2U_Getseccode(o){
	var b=[];
	b=b.concat(write_byte(o.Img));
	return b
}
function read_MSG_WS2U_Getseccode(b){
	var o={},r={};r.b=b;
	r=read_byte(r.b);o.Img=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Common_Head(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Common_Head));
	b=b.concat(write_MSG_WS2U_Common_Head(o));
	return b;
}
function write_MSG_WS2U_Common_Head(o){
	var b=[];
	b=b.concat(write_string(o.Bbname));
	b=b.concat(write_string(o.Sitename));
	b=b.concat(write_string(o.Username));
	b=b.concat(write_string(o.Grouptitle));
	b=b.concat(write_string(o.Avatar));
	b=b.concat(write_int8(o.Portalcp));
	b=b.concat(write_int8(o.Admincp));
	b=b.concat(write_int16(o.Adminid));
	b=b.concat(write_int16(o.Groupid));
	b=b.concat(write_int8(o.Diy));
	b=b.concat(write_int32(o.Uid));
	b=b.concat(write_int8(o.Unread_num));
	b=b.concat(write_int8(o.Send_botton));
	b=b.concat(write_int32(o.Timestamp));
	return b
}
function read_MSG_WS2U_Common_Head(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Bbname=r.o
	r=read_string(r.b);
	o.Sitename=r.o
	r=read_string(r.b);
	o.Username=r.o
	r=read_string(r.b);
	o.Grouptitle=r.o
	r=read_string(r.b);
	o.Avatar=r.o
	r=read_int8(r.b);
	o.Portalcp=r.o
	r=read_int8(r.b);
	o.Admincp=r.o
	r=read_int16(r.b);
	o.Adminid=r.o
	r=read_int16(r.b);
	o.Groupid=r.o
	r=read_int8(r.b);
	o.Diy=r.o
	r=read_int32(r.b);
	o.Uid=r.o
	r=read_int8(r.b);
	o.Unread_num=r.o
	r=read_int8(r.b);
	o.Send_botton=r.o
	r=read_int32(r.b);
	o.Timestamp=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Server_OK(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Server_OK));
	b=b.concat(write_MSG_WS2U_Server_OK(o));
	return b;
}
function write_MSG_WS2U_Server_OK(o){
	var b=[];
	return b
}
function read_MSG_WS2U_Server_OK(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_tpl_load_js(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_tpl_load_js));
	b=b.concat(write_MSG_U2WS_tpl_load_js(o));
	return b;
}
function write_MSG_U2WS_tpl_load_js(o){
	var b=[];
	b=b.concat(write_string(o.Name));
	return b
}
function read_MSG_U2WS_tpl_load_js(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Name=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_tpl_load_js(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_tpl_load_js));
	b=b.concat(write_MSG_WS2U_tpl_load_js(o));
	return b;
}
function write_MSG_WS2U_tpl_load_js(o){
	var b=[];
	b=b.concat(write_string(o.Name));
	b=b.concat(write_string(o.Result));
	return b
}
function read_MSG_WS2U_tpl_load_js(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Name=r.o
	r=read_string(r.b);
	o.Result=r.o
	return {o:o,b:r.b}
}
;
///<jscompress sourcefile="U2WS.js" />
var CMD_MSG_U2WS_Login_Gethash = -814838689,CMD_MSG_WS2U_Login_Gethash = 1595670514,CMD_MSG_U2WS_UserLogin = 866031831,CMD_MSG_WS2U_UserLogin = 1506905850,CMD_MSG_U2WS_forum_index = 1000231794,CMD_MSG_WS2U_forum_index = -278866301,CMD_MSG_U2WS_GetHead = -446167730,CMD_MSG_diy_info = -740027387,CMD_MSG_diy_tab = -1451137317,CMD_MSG_diy_frame = 814047536,CMD_MSG_diy_attr = 471008838,CMD_MSG_diy_title = -1370806890,CMD_MSG_diy_first = 386708394,CMD_MSG_diy_column = -1092979582,CMD_MSG_diy_block = 107399903,CMD_MSG_U2WS_diy_save = -1378201131,CMD_MSG_U2WS_Checkseccode = -704884081,CMD_MSG_U2WS_GetRegister = 1849790434,CMD_MSG_WS2U_GetRegister = -1161885165,CMD_MSG_U2WS_Register = -961222056,CMD_MSG_WSU2_Register = 1935059451,CMD_MSG_U2WS_CheckRegister = -204476842,CMD_MSG_WS2U_CheckRegister = 1673174523,CMD_MSG_diy_block_info = -1627801678,CMD_MSG_block_style = -1418299074,CMD_MSG_block_template = 578970688,CMD_MSG_block_template_s = 256949028,CMD_MSG_block_template_order = 1617053915,CMD_MSG_block_item = 117099868,CMD_MSG_block_item_field = 1448265555,CMD_MSG_block_item_showstyle = 405274830,CMD_MSG_block_item_showstyle_info = 1959565559,CMD_MSG_forum_index_cart = 1761115921,CMD_MSG_forum_extra = 177318912,CMD_MSG_forum = 755023070,CMD_MSG_forum_idname = -1334594352,CMD_MSG_forum_lastpost = -35410442,CMD_MSG_U2WS_forum = -1863283440,CMD_MSG_WS2U_forum = 616977199,CMD_MSG_forum_modrecommend = 1189303805,CMD_MSG_U2WS_forum_modcp = 774094179,CMD_MSG_U2WS_forum_recyclebin = -866489977,CMD_MSG_forum_threadtype = 104018229,CMD_MSG_forum_type = -1867493945,CMD_MSG_forum_thread = 213874677,CMD_MSG_forum_threadrush = 2145302771,CMD_MSG_U2WS_forum_newthread = -1375386023,CMD_MSG_WS2U_forum_newthread = 2090873870,CMD_MSG_forum_savethread = 1315240586,CMD_MSG_forum_replycredit = -1811127086,CMD_MSG_forum_post_rush = 806931670,CMD_MSG_forum_group = 711910816,CMD_MSG_forum_attach = -480884745,CMD_MSG_forum_imgattach = 1883458624,CMD_MSG_forum_album = 2117521190,CMD_MSG_U2WS_Getlogin = 56019999,CMD_MSG_WS2U_Getlogin = -60812530,CMD_MSG_U2WS_Forum_newthread_submit = 1149592144,CMD_MSG_WS2U_Forum_newthread_submit = -796428201,CMD_MSG_add_extcredits = -1451728518,CMD_MSG_U2WS_forum_viewthread = -1106524571,CMD_MSG_WS2U_forum_viewthread = 1272358720,CMD_MSG_forum_thread_forum = 1303724428,CMD_MSG_forum_post = 1189377635,CMD_MSG_forum_post_medal = -2088438621,CMD_MSG_postreview = -1141941364,CMD_MSG_post_member_profile = -493836804,CMD_MSG_post_ratelog = 1296010750,CMD_MSG_post_ratelog_score = 239411683,CMD_MSG_post_relateitem = 1127661264,CMD_MSG_threadmod = 2087726285,CMD_MSG_post_comment = -1934823944,CMD_MSG_U2WS_threadfastpost = 1969915046,CMD_MSG_WS2U_threadfastpost = -576901504,CMD_MSG_U2WS_nextset = -1590634053,CMD_MSG_WS2U_nextset = -1736066974,CMD_MSG_U2WS_upload_image = 1031321379,CMD_MSG_WS2U_upload_image = -149517524,CMD_MSG_U2WS_upload_tmp_image = -895601579,CMD_MSG_WS2U_upload_tmp_image = 1061377392,CMD_MSG_U2WS_delete_attach = 1199011583,CMD_MSG_WS2U_delete_attach = -687733422,CMD_MSG_U2WS_threadmod = 1848054995,CMD_MSG_U2WS_viewthreadmod = 885980426,CMD_MSG_WS2U_viewthreadmod = -1531212121,CMD_MSG_U2WS_forum_refresh = 1160234390,CMD_MSG_U2WS_forum_carlist = 664970303,CMD_MSG_WS2U_forum_carlist = -1210591342,CMD_MSG_forum_cart = 399348313,CMD_MSG_forum_cart_child = -1249765676,CMD_MSG_U2WS_GetPostWarnList = -1077254663,CMD_MSG_U2WS_space = 1017770727,CMD_MSG_WS2U_space = -2002834216,CMD_MSG_userprofiles = -2109377824,CMD_MSG_usergroup = -1523481925,CMD_MSG_U2WS_SpaceThread = -1799904226,CMD_MSG_WS2U_SpaceThread = 1078534639,CMD_MSG_SpaceThread = 1760833800,CMD_MSG_SpacePost = -950215658,CMD_MSG_U2WS_searchThread = 1503238307,CMD_MSG_WS2U_searchThread = -1812486996,CMD_MSG_searchThread = -1380880793,CMD_MSG_WS2U_threadmod = 73925374,CMD_MSG_U2WS_spacecp = 494965013,CMD_MSG_WS2U_spacecp = 607514828,CMD_MSG_U2WS_tpl_success = -1265560393,CMD_MSG_WS2U_tpl_success = 1617924422,CMD_MSG_U2WS_upload_avatar = 1329334923,CMD_MSG_WS2U_upload_avatar = -548832986,CMD_MSG_U2WS_Edit_Profile = 1027411378,CMD_MSG_U2WS_RecommendThread = 1475637593,CMD_MSG_WS2U_RecommendThread = -2058288370,CMD_MSG_U2WS_SpacecpGroup = 127228310,CMD_MSG_GroupIdName = 689990192,CMD_MSG_WS2U_SpacecpGroup = -839162471,CMD_MSG_U2WS_SpacecpForum = -276913250,CMD_MSG_WS2U_SpacecpForum = 621846417,CMD_MSG_SpacecpGroupPermission = 831351040,CMD_MSG_U2WS_ChangePasswd_Gethash = 899199166,CMD_MSG_WS2U_ChangePasswd_Gethash = 304149348,CMD_MSG_U2WS_ChangePasswd = 54726888,CMD_MSG_U2WS_Email_Verify = 305846558,CMD_MSG_WS2U_Email_Verify = -665524975,CMD_MSG_U2WS_LostPW = 1334552719,CMD_MSG_WS2U_LostPW = -111561876,CMD_MSG_U2WS_ResetPW = 1419751991,CMD_MSG_WS2U_ResetPW = 1831523310,CMD_MSG_U2WS_QQLoginUrl = -1619289269,CMD_MSG_WS2U_QQLoginUrl = -623998936,CMD_MSG_U2WS_QQLogin = -105825607,CMD_MSG_WS2U_QQLogin = -1073456288,CMD_MSG_U2WS_BindAccount = -2077234963,CMD_MSG_WS2U_BindAccount = 1355902236,CMD_MSG_U2WS_GetThreadBind = -302662362,CMD_MSG_ThreadBind = 874163309,CMD_MSG_WS2U_GetThreadBind = 2105593483,CMD_MSG_U2WS_GetChangeBindUrl = -713593028,CMD_MSG_WS2U_GetChangeBindUrl = 548015641,CMD_MSG_U2WS_ChangeBind = 276821048,CMD_MSG_WS2U_ChangeBind = 1439360859,CMD_MSG_Poll_info = 292242050,CMD_MSG_poll_option = -380025767,CMD_MSG_U2WS_PollThread = -1328936102,CMD_MSG_WS2U_PollThread_sucess = 1184955545;
function WRITE_MSG_U2WS_Login_Gethash(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Login_Gethash));
	b=b.concat(write_MSG_U2WS_Login_Gethash(o));
	return b;
}
function write_MSG_U2WS_Login_Gethash(o){
	var b=[];
	b=b.concat(write_string(o.Name));
	return b
}
function read_MSG_U2WS_Login_Gethash(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Name=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Login_Gethash(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Login_Gethash));
	b=b.concat(write_MSG_WS2U_Login_Gethash(o));
	return b;
}
function write_MSG_WS2U_Login_Gethash(o){
	var b=[];
	b=b.concat(write_string(o.Hash));
	b=b.concat(write_string(o.Hash2));
	return b
}
function read_MSG_WS2U_Login_Gethash(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Hash=r.o
	r=read_string(r.b);
	o.Hash2=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_UserLogin(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_UserLogin));
	b=b.concat(write_MSG_U2WS_UserLogin(o));
	return b;
}
function write_MSG_U2WS_UserLogin(o){
	var b=[];
	b=b.concat(write_string(o.Username));
	b=b.concat(write_string(o.Passwd));
	b=b.concat(write_string(o.Seccode));
	b=b.concat(write_string(o.Type));
	b=b.concat(write_string(o.State));
	b=b.concat(write_string(o.Openid));
	b=b.concat(write_string(o.Access_token));
	return b
}
function read_MSG_U2WS_UserLogin(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Username=r.o
	r=read_string(r.b);
	o.Passwd=r.o
	r=read_string(r.b);
	o.Seccode=r.o
	r=read_string(r.b);
	o.Type=r.o
	r=read_string(r.b);
	o.State=r.o
	r=read_string(r.b);
	o.Openid=r.o
	r=read_string(r.b);
	o.Access_token=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_UserLogin(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_UserLogin));
	b=b.concat(write_MSG_WS2U_UserLogin(o));
	return b;
}
function write_MSG_WS2U_UserLogin(o){
	var b=[];
	b=b.concat(write_int16(o.Result));
	if(o.Head){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_WS2U_Common_Head(o.Head));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_byte(o.Token));
	return b
}
function read_MSG_WS2U_UserLogin(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Result=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_WS2U_Common_Head(r.b);
		o.Head=r.o
	}
	r=read_byte(r.b);o.Token=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_forum_index(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_forum_index));
	b=b.concat(write_MSG_U2WS_forum_index(o));
	return b;
}
function write_MSG_U2WS_forum_index(o){
	var b=[];
	b=b.concat(write_int32(o.Gid));
	return b
}
function read_MSG_U2WS_forum_index(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Gid=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_forum_index(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_forum_index));
	b=b.concat(write_MSG_WS2U_forum_index(o));
	return b;
}
function write_MSG_WS2U_forum_index(o){
	var b=[];
	b=b.concat(write_int64(o.Threads));
	b=b.concat(write_int64(o.Posts));
	b=b.concat(write_int32(o.Onlinenum));
	b=b.concat(write_int32(o.Usernum));
	b=b.concat(write_string(o.Lastname));
	if(o.Catlist){
		b=b.concat(write_int16(o.Catlist.length))
		for(var i=0;i<o.Catlist.length;i++){
			b=b.concat(write_MSG_forum_index_cart(o.Catlist[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Diy_list){
		b=b.concat(write_int16(o.Diy_list.length))
		for(var i=0;i<o.Diy_list.length;i++){
			b=b.concat(write_MSG_diy_info(o.Diy_list[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.History){
		b=b.concat(write_int16(o.History.length))
		for(var i=0;i<o.History.length;i++){
			b=b.concat(write_MSG_forum(o.History[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Recommend){
		b=b.concat(write_int16(o.Recommend.length))
		for(var i=0;i<o.Recommend.length;i++){
			b=b.concat(write_MSG_forum(o.Recommend[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_WS2U_forum_index(b){
	var o={},r={};r.b=b;
	r=read_int64(r.b);
	o.Threads=r.o
	r=read_int64(r.b);
	o.Posts=r.o
	r=read_int32(r.b);
	o.Onlinenum=r.o
	r=read_int32(r.b);
	o.Usernum=r.o
	r=read_string(r.b);
	o.Lastname=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Catlist=[]
	for(var i=0;i<l;i++){
		r=read_MSG_forum_index_cart(r.b)
		o.Catlist.push(r.o)
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Diy_list=[]
	for(var i=0;i<l;i++){
		r=read_MSG_diy_info(r.b)
		o.Diy_list.push(r.o)
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.History=[]
	for(var i=0;i<l;i++){
		r=read_MSG_forum(r.b)
		o.History.push(r.o)
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Recommend=[]
	for(var i=0;i<l;i++){
		r=read_MSG_forum(r.b)
		o.Recommend.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_GetHead(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_GetHead));
	b=b.concat(write_MSG_U2WS_GetHead(o));
	return b;
}
function write_MSG_U2WS_GetHead(o){
	var b=[];
	return b
}
function read_MSG_U2WS_GetHead(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_diy_info(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_diy_info));
	b=b.concat(write_MSG_diy_info(o));
	return b;
}
function write_MSG_diy_info(o){
	var b=[];
	b=b.concat(write_string(o.Id));
	if(o.Tab){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_diy_tab(o.Tab));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Frame){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_diy_frame(o.Frame));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_diy_info(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Id=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_diy_tab(r.b);
		o.Tab=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_diy_frame(r.b);
		o.Frame=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_diy_tab(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_diy_tab));
	b=b.concat(write_MSG_diy_tab(o));
	return b;
}
function write_MSG_diy_tab(o){
	var b=[];
	if(o.Attr){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_diy_attr(o.Attr));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Column){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_diy_column(o.Column));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_diy_tab(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_diy_attr(r.b);
		o.Attr=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_diy_column(r.b);
		o.Column=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_diy_frame(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_diy_frame));
	b=b.concat(write_MSG_diy_frame(o));
	return b;
}
function write_MSG_diy_frame(o){
	var b=[];
	if(o.Attr){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_diy_attr(o.Attr));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Column){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_diy_column(o.Column));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_diy_frame(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_diy_attr(r.b);
		o.Attr=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_diy_column(r.b);
		o.Column=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_diy_attr(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_diy_attr));
	b=b.concat(write_MSG_diy_attr(o));
	return b;
}
function write_MSG_diy_attr(o){
	var b=[];
	b=b.concat(write_string(o.Name));
	b=b.concat(write_string(o.Moveable));
	b=b.concat(write_string(o.ClassName));
	if(o.Titles){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_diy_title(o.Titles));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_diy_attr(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Name=r.o
	r=read_string(r.b);
	o.Moveable=r.o
	r=read_string(r.b);
	o.ClassName=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_diy_title(r.b);
		o.Titles=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_diy_title(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_diy_title));
	b=b.concat(write_MSG_diy_title(o));
	return b;
}
function write_MSG_diy_title(o){
	var b=[];
	b=b.concat(write_string(o.Style));
	if(o.ClassName){
		b=b.concat(write_int16(o.ClassName.length))
		for(var i=0;i<o.ClassName.length;i++){
			b=b.concat(write_string(o.ClassName[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.SwitchType){
		b=b.concat(write_int16(o.SwitchType.length))
		for(var i=0;i<o.SwitchType.length;i++){
			b=b.concat(write_string(o.SwitchType[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.First){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_diy_first(o.First));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_diy_title(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Style=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.ClassName=[]
	for(var i=0;i<l;i++){
		r=read_string(r.b)
		o.ClassName.push(r.o)
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.SwitchType=[]
	for(var i=0;i<l;i++){
		r=read_string(r.b)
		o.SwitchType.push(r.o)
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_diy_first(r.b);
		o.First=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_diy_first(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_diy_first));
	b=b.concat(write_MSG_diy_first(o));
	return b;
}
function write_MSG_diy_first(o){
	var b=[];
	b=b.concat(write_string(o.Text));
	b=b.concat(write_string(o.Href));
	b=b.concat(write_string(o.Color));
	b=b.concat(write_string(o.Float));
	b=b.concat(write_string(o.Margin));
	b=b.concat(write_string(o.Font_size));
	b=b.concat(write_string(o.ClassName));
	b=b.concat(write_string(o.Src));
	return b
}
function read_MSG_diy_first(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Text=r.o
	r=read_string(r.b);
	o.Href=r.o
	r=read_string(r.b);
	o.Color=r.o
	r=read_string(r.b);
	o.Float=r.o
	r=read_string(r.b);
	o.Margin=r.o
	r=read_string(r.b);
	o.Font_size=r.o
	r=read_string(r.b);
	o.ClassName=r.o
	r=read_string(r.b);
	o.Src=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_diy_column(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_diy_column));
	b=b.concat(write_MSG_diy_column(o));
	return b;
}
function write_MSG_diy_column(o){
	var b=[];
	if(o.Attr){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_diy_attr(o.Attr));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Block){
		b=b.concat(write_int16(o.Block.length))
		for(var i=0;i<o.Block.length;i++){
			b=b.concat(write_MSG_diy_block(o.Block[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_diy_column(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_diy_attr(r.b);
		o.Attr=r.o
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Block=[]
	for(var i=0;i<l;i++){
		r=read_MSG_diy_block(r.b)
		o.Block.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_diy_block(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_diy_block));
	b=b.concat(write_MSG_diy_block(o));
	return b;
}
function write_MSG_diy_block(o){
	var b=[];
	if(o.Attr){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_diy_attr(o.Attr));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Info){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_diy_block_info(o.Info));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_diy_block(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_diy_attr(r.b);
		o.Attr=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_diy_block_info(r.b);
		o.Info=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_diy_save(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_diy_save));
	b=b.concat(write_MSG_U2WS_diy_save(o));
	return b;
}
function write_MSG_U2WS_diy_save(o){
	var b=[];
	b=b.concat(write_string(o.List));
	b=b.concat(write_string(o.TemplateName));
	return b
}
function read_MSG_U2WS_diy_save(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.List=r.o
	r=read_string(r.b);
	o.TemplateName=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Checkseccode(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Checkseccode));
	b=b.concat(write_MSG_U2WS_Checkseccode(o));
	return b;
}
function write_MSG_U2WS_Checkseccode(o){
	var b=[];
	b=b.concat(write_string(o.Code));
	return b
}
function read_MSG_U2WS_Checkseccode(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Code=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_GetRegister(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_GetRegister));
	b=b.concat(write_MSG_U2WS_GetRegister(o));
	return b;
}
function write_MSG_U2WS_GetRegister(o){
	var b=[];
	return b
}
function read_MSG_U2WS_GetRegister(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_GetRegister(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_GetRegister));
	b=b.concat(write_MSG_WS2U_GetRegister(o));
	return b;
}
function write_MSG_WS2U_GetRegister(o){
	var b=[];
	return b
}
function read_MSG_WS2U_GetRegister(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Register(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Register));
	b=b.concat(write_MSG_U2WS_Register(o));
	return b;
}
function write_MSG_U2WS_Register(o){
	var b=[];
	b=b.concat(write_string(o.Username));
	b=b.concat(write_string(o.Passwd));
	b=b.concat(write_string(o.Email));
	b=b.concat(write_string(o.Seccode));
	b=b.concat(write_string(o.Type));
	b=b.concat(write_string(o.State));
	b=b.concat(write_string(o.Openid));
	b=b.concat(write_string(o.Access_token));
	return b
}
function read_MSG_U2WS_Register(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Username=r.o
	r=read_string(r.b);
	o.Passwd=r.o
	r=read_string(r.b);
	o.Email=r.o
	r=read_string(r.b);
	o.Seccode=r.o
	r=read_string(r.b);
	o.Type=r.o
	r=read_string(r.b);
	o.State=r.o
	r=read_string(r.b);
	o.Openid=r.o
	r=read_string(r.b);
	o.Access_token=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WSU2_Register(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WSU2_Register));
	b=b.concat(write_MSG_WSU2_Register(o));
	return b;
}
function write_MSG_WSU2_Register(o){
	var b=[];
	if(o.Head){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_WS2U_Common_Head(o.Head));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_WSU2_Register(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_WS2U_Common_Head(r.b);
		o.Head=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_CheckRegister(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_CheckRegister));
	b=b.concat(write_MSG_U2WS_CheckRegister(o));
	return b;
}
function write_MSG_U2WS_CheckRegister(o){
	var b=[];
	b=b.concat(write_int8(o.Type));
	b=b.concat(write_string(o.Name));
	return b
}
function read_MSG_U2WS_CheckRegister(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Type=r.o
	r=read_string(r.b);
	o.Name=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_CheckRegister(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_CheckRegister));
	b=b.concat(write_MSG_WS2U_CheckRegister(o));
	return b;
}
function write_MSG_WS2U_CheckRegister(o){
	var b=[];
	b=b.concat(write_int16(o.Result));
	return b
}
function read_MSG_WS2U_CheckRegister(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Result=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_diy_block_info(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_diy_block_info));
	b=b.concat(write_MSG_diy_block_info(o));
	return b;
}
function write_MSG_diy_block_info(o){
	var b=[];
	b=b.concat(write_string(o.Name));
	b=b.concat(write_string(o.Summary));
	b=b.concat(write_string(o.Blockclass));
	if(o.Style){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_block_style(o.Style));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_string(o.Title));
	b=b.concat(write_int32(o.Bid));
	if(o.Itemlist){
		b=b.concat(write_int16(o.Itemlist.length))
		for(var i=0;i<o.Itemlist.length;i++){
			b=b.concat(write_MSG_block_item(o.Itemlist[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_int8(o.Hidedisplay));
	return b
}
function read_MSG_diy_block_info(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Name=r.o
	r=read_string(r.b);
	o.Summary=r.o
	r=read_string(r.b);
	o.Blockclass=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_block_style(r.b);
		o.Style=r.o
	}
	r=read_string(r.b);
	o.Title=r.o
	r=read_int32(r.b);
	o.Bid=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Itemlist=[]
	for(var i=0;i<l;i++){
		r=read_MSG_block_item(r.b)
		o.Itemlist.push(r.o)
	}
	r=read_int8(r.b);
	o.Hidedisplay=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_block_style(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_block_style));
	b=b.concat(write_MSG_block_style(o));
	return b;
}
function write_MSG_block_style(o){
	var b=[];
	if(o.Template){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_block_template(o.Template));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_int8(o.Moreurl));
	if(o.Fields){
		b=b.concat(write_int16(o.Fields.length))
		for(var i=0;i<o.Fields.length;i++){
			b=b.concat(write_string(o.Fields[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_block_style(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_block_template(r.b);
		o.Template=r.o
	}
	r=read_int8(r.b);
	o.Moreurl=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Fields=[]
	for(var i=0;i<l;i++){
		r=read_string(r.b)
		o.Fields.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_block_template(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_block_template));
	b=b.concat(write_MSG_block_template(o));
	return b;
}
function write_MSG_block_template(o){
	var b=[];
	b=b.concat(write_string(o.Raw));
	b=b.concat(write_string(o.Footer));
	b=b.concat(write_string(o.Header));
	if(o.Indexplus){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_block_template_s(o.Indexplus));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Index){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_block_template_s(o.Index));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Orderplus){
		b=b.concat(write_int16(o.Orderplus.length))
		for(var i=0;i<o.Orderplus.length;i++){
			b=b.concat(write_MSG_block_template_s(o.Orderplus[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Order){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_block_template_s(o.Order));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Loopplus){
		b=b.concat(write_int16(o.Loopplus.length))
		for(var i=0;i<o.Loopplus.length;i++){
			b=b.concat(write_string(o.Loopplus[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_string(o.Loop));
	return b
}
function read_MSG_block_template(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Raw=r.o
	r=read_string(r.b);
	o.Footer=r.o
	r=read_string(r.b);
	o.Header=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_block_template_s(r.b);
		o.Indexplus=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_block_template_s(r.b);
		o.Index=r.o
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Orderplus=[]
	for(var i=0;i<l;i++){
		r=read_MSG_block_template_s(r.b)
		o.Orderplus.push(r.o)
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_block_template_s(r.b);
		o.Order=r.o
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Loopplus=[]
	for(var i=0;i<l;i++){
		r=read_string(r.b)
		o.Loopplus.push(r.o)
	}
	r=read_string(r.b);
	o.Loop=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_block_template_s(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_block_template_s));
	b=b.concat(write_MSG_block_template_s(o));
	return b;
}
function write_MSG_block_template_s(o){
	var b=[];
	b=b.concat(write_string(o.Key));
	if(o.Order){
		b=b.concat(write_int16(o.Order.length))
		for(var i=0;i<o.Order.length;i++){
			b=b.concat(write_MSG_block_template_order(o.Order[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_string(o.Odd));
	b=b.concat(write_string(o.Even));
	return b
}
function read_MSG_block_template_s(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Key=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Order=[]
	for(var i=0;i<l;i++){
		r=read_MSG_block_template_order(r.b)
		o.Order.push(r.o)
	}
	r=read_string(r.b);
	o.Odd=r.o
	r=read_string(r.b);
	o.Even=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_block_template_order(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_block_template_order));
	b=b.concat(write_MSG_block_template_order(o));
	return b;
}
function write_MSG_block_template_order(o){
	var b=[];
	b=b.concat(write_string(o.Key));
	b=b.concat(write_string(o.Value));
	return b
}
function read_MSG_block_template_order(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Key=r.o
	r=read_string(r.b);
	o.Value=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_block_item(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_block_item));
	b=b.concat(write_MSG_block_item(o));
	return b;
}
function write_MSG_block_item(o){
	var b=[];
	b=b.concat(write_int16(o.Position));
	b=b.concat(write_int32(o.Itemid));
	if(o.Fields){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_block_item_field(o.Fields));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Showstyle){
		b=b.concat(write_int16(o.Showstyle.length))
		for(var i=0;i<o.Showstyle.length;i++){
			b=b.concat(write_MSG_block_item_showstyle(o.Showstyle[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_int16(o.Picsize));
	b=b.concat(write_int8(o.Picflag));
	return b
}
function read_MSG_block_item(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Position=r.o
	r=read_int32(r.b);
	o.Itemid=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_block_item_field(r.b);
		o.Fields=r.o
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Showstyle=[]
	for(var i=0;i<l;i++){
		r=read_MSG_block_item_showstyle(r.b)
		o.Showstyle.push(r.o)
	}
	r=read_int16(r.b);
	o.Picsize=r.o
	r=read_int8(r.b);
	o.Picflag=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_block_item_field(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_block_item_field));
	b=b.concat(write_MSG_block_item_field(o));
	return b;
}
function write_MSG_block_item_field(o){
	var b=[];
	b=b.concat(write_string(o.Fulltitle));
	b=b.concat(write_string(o.Threads));
	b=b.concat(write_string(o.Author));
	b=b.concat(write_string(o.Authorid));
	b=b.concat(write_string(o.Avatar));
	b=b.concat(write_string(o.Avatar_middle));
	b=b.concat(write_string(o.Avatar_big));
	b=b.concat(write_string(o.Posts));
	b=b.concat(write_string(o.Todayposts));
	b=b.concat(write_string(o.Lastposter));
	b=b.concat(write_string(o.Lastpost));
	b=b.concat(write_string(o.Dateline));
	b=b.concat(write_string(o.Replies));
	b=b.concat(write_string(o.Forumurl));
	b=b.concat(write_string(o.Forumname));
	b=b.concat(write_string(o.Typename));
	b=b.concat(write_string(o.Typeicon));
	b=b.concat(write_string(o.Typeurl));
	b=b.concat(write_string(o.Sortname));
	b=b.concat(write_string(o.Sorturl));
	b=b.concat(write_string(o.Views));
	b=b.concat(write_string(o.Heats));
	b=b.concat(write_string(o.Recommends));
	b=b.concat(write_string(o.Hourviews));
	b=b.concat(write_string(o.Todayviews));
	b=b.concat(write_string(o.Weekviews));
	b=b.concat(write_string(o.Monthviews));
	return b
}
function read_MSG_block_item_field(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Fulltitle=r.o
	r=read_string(r.b);
	o.Threads=r.o
	r=read_string(r.b);
	o.Author=r.o
	r=read_string(r.b);
	o.Authorid=r.o
	r=read_string(r.b);
	o.Avatar=r.o
	r=read_string(r.b);
	o.Avatar_middle=r.o
	r=read_string(r.b);
	o.Avatar_big=r.o
	r=read_string(r.b);
	o.Posts=r.o
	r=read_string(r.b);
	o.Todayposts=r.o
	r=read_string(r.b);
	o.Lastposter=r.o
	r=read_string(r.b);
	o.Lastpost=r.o
	r=read_string(r.b);
	o.Dateline=r.o
	r=read_string(r.b);
	o.Replies=r.o
	r=read_string(r.b);
	o.Forumurl=r.o
	r=read_string(r.b);
	o.Forumname=r.o
	r=read_string(r.b);
	o.Typename=r.o
	r=read_string(r.b);
	o.Typeicon=r.o
	r=read_string(r.b);
	o.Typeurl=r.o
	r=read_string(r.b);
	o.Sortname=r.o
	r=read_string(r.b);
	o.Sorturl=r.o
	r=read_string(r.b);
	o.Views=r.o
	r=read_string(r.b);
	o.Heats=r.o
	r=read_string(r.b);
	o.Recommends=r.o
	r=read_string(r.b);
	o.Hourviews=r.o
	r=read_string(r.b);
	o.Todayviews=r.o
	r=read_string(r.b);
	o.Weekviews=r.o
	r=read_string(r.b);
	o.Monthviews=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_block_item_showstyle(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_block_item_showstyle));
	b=b.concat(write_MSG_block_item_showstyle(o));
	return b;
}
function write_MSG_block_item_showstyle(o){
	var b=[];
	b=b.concat(write_string(o.Key));
	if(o.Info){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_block_item_showstyle_info(o.Info));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_block_item_showstyle(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Key=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_block_item_showstyle_info(r.b);
		o.Info=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_block_item_showstyle_info(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_block_item_showstyle_info));
	b=b.concat(write_MSG_block_item_showstyle_info(o));
	return b;
}
function write_MSG_block_item_showstyle_info(o){
	var b=[];
	b=b.concat(write_int8(o.B));
	b=b.concat(write_int8(o.I));
	b=b.concat(write_int8(o.U));
	b=b.concat(write_string(o.C));
	return b
}
function read_MSG_block_item_showstyle_info(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.B=r.o
	r=read_int8(r.b);
	o.I=r.o
	r=read_int8(r.b);
	o.U=r.o
	r=read_string(r.b);
	o.C=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_index_cart(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_index_cart));
	b=b.concat(write_MSG_forum_index_cart(o));
	return b;
}
function write_MSG_forum_index_cart(o){
	var b=[];
	b=b.concat(write_string(o.Endrows));
	if(o.Extra){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_extra(o.Extra));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_int8(o.Forumcolumns));
	if(o.Forums){
		b=b.concat(write_int16(o.Forums.length))
		for(var i=0;i<o.Forums.length;i++){
			b=b.concat(write_MSG_forum(o.Forums[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_int32(o.Forumscount));
	b=b.concat(write_string(o.Moderators));
	b=b.concat(write_string(o.Name));
	return b
}
function read_MSG_forum_index_cart(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Endrows=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_extra(r.b);
		o.Extra=r.o
	}
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_int8(r.b);
	o.Forumcolumns=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Forums=[]
	for(var i=0;i<l;i++){
		r=read_MSG_forum(r.b)
		o.Forums.push(r.o)
	}
	r=read_int32(r.b);
	o.Forumscount=r.o
	r=read_string(r.b);
	o.Moderators=r.o
	r=read_string(r.b);
	o.Name=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_extra(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_extra));
	b=b.concat(write_MSG_forum_extra(o));
	return b;
}
function write_MSG_forum_extra(o){
	var b=[];
	b=b.concat(write_string(o.Namecolor));
	b=b.concat(write_int16(o.Iconwidth));
	return b
}
function read_MSG_forum_extra(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Namecolor=r.o
	r=read_int16(r.b);
	o.Iconwidth=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_forum(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum));
	b=b.concat(write_MSG_forum(o));
	return b;
}
function write_MSG_forum(o){
	var b=[];
	b=b.concat(write_int32(o.Fup));
	if(o.Extra){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_extra(o.Extra));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.Icon));
	if(o.Lastpost){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_lastpost(o.Lastpost));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_string(o.Moderators));
	b=b.concat(write_string(o.Name));
	b=b.concat(write_string(o.Description));
	b=b.concat(write_int32(o.Orderid));
	b=b.concat(write_int8(o.Permission));
	b=b.concat(write_int32(o.Posts));
	b=b.concat(write_int8(o.Subforums));
	b=b.concat(write_int32(o.Threads));
	b=b.concat(write_int32(o.Todayposts));
	b=b.concat(write_int8(o.Simple));
	if(o.Level_three){
		b=b.concat(write_int16(o.Level_three.length))
		for(var i=0;i<o.Level_three.length;i++){
			b=b.concat(write_MSG_forum_idname(o.Level_three[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_forum(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fup=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_extra(r.b);
		o.Extra=r.o
	}
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.Icon=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_lastpost(r.b);
		o.Lastpost=r.o
	}
	r=read_string(r.b);
	o.Moderators=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_string(r.b);
	o.Description=r.o
	r=read_int32(r.b);
	o.Orderid=r.o
	r=read_int8(r.b);
	o.Permission=r.o
	r=read_int32(r.b);
	o.Posts=r.o
	r=read_int8(r.b);
	o.Subforums=r.o
	r=read_int32(r.b);
	o.Threads=r.o
	r=read_int32(r.b);
	o.Todayposts=r.o
	r=read_int8(r.b);
	o.Simple=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Level_three=[]
	for(var i=0;i<l;i++){
		r=read_MSG_forum_idname(r.b)
		o.Level_three.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_idname(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_idname));
	b=b.concat(write_MSG_forum_idname(o));
	return b;
}
function write_MSG_forum_idname(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.Name));
	return b
}
function read_MSG_forum_idname(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.Name=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_lastpost(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_lastpost));
	b=b.concat(write_MSG_forum_lastpost(o));
	return b;
}
function write_MSG_forum_lastpost(o){
	var b=[];
	b=b.concat(write_int32(o.Tid));
	b=b.concat(write_string(o.Subject));
	b=b.concat(write_int32(o.Dateline));
	b=b.concat(write_string(o.Author));
	return b
}
function read_MSG_forum_lastpost(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Tid=r.o
	r=read_string(r.b);
	o.Subject=r.o
	r=read_int32(r.b);
	o.Dateline=r.o
	r=read_string(r.b);
	o.Author=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_forum(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_forum));
	b=b.concat(write_MSG_U2WS_forum(o));
	return b;
}
function write_MSG_U2WS_forum(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.Typeid));
	b=b.concat(write_int32(o.Dateline));
	b=b.concat(write_string(o.Orderby));
	b=b.concat(write_int16(o.Page));
	b=b.concat(write_string(o.Specialtype));
	b=b.concat(write_int8(o.Rewardtype));
	b=b.concat(write_string(o.Filter));
	return b
}
function read_MSG_U2WS_forum(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.Typeid=r.o
	r=read_int32(r.b);
	o.Dateline=r.o
	r=read_string(r.b);
	o.Orderby=r.o
	r=read_int16(r.b);
	o.Page=r.o
	r=read_string(r.b);
	o.Specialtype=r.o
	r=read_int8(r.b);
	o.Rewardtype=r.o
	r=read_string(r.b);
	o.Filter=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_forum(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_forum));
	b=b.concat(write_MSG_WS2U_forum(o));
	return b;
}
function write_MSG_WS2U_forum(o){
	var b=[];
	if(o.Parent){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_idname(o.Parent));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_int16(o.Allow));
	b=b.concat(write_int32(o.Group_status));
	b=b.concat(write_int8(o.Allowstickthread));
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.Name));
	if(o.Modrecommend){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_modrecommend(o.Modrecommend));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_int32(o.Todayposts));
	b=b.concat(write_int32(o.Threads));
	b=b.concat(write_int32(o.Favtimes));
	b=b.concat(write_int32(o.Threadmodcount));
	if(o.Threadtypes){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_threadtype(o.Threadtypes));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_string(o.Rules));
	if(o.Threadlist){
		b=b.concat(write_int16(o.Threadlist.length))
		for(var i=0;i<o.Threadlist.length;i++){
			b=b.concat(write_MSG_forum_thread(o.Threadlist[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Livethread){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_thread(o.Livethread));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_int8(o.Status));
	b=b.concat(write_string(o.Livemessage));
	b=b.concat(write_int32(o.Separatepos));
	b=b.concat(write_int32(o.Threadscount));
	b=b.concat(write_int16(o.Oldrank));
	b=b.concat(write_int16(o.Rank));
	b=b.concat(write_int32(o.Yesterdayposts));
	b=b.concat(write_string(o.Moderators));
	b=b.concat(write_int32(o.Lastpost));
	if(o.Forum_history){
		b=b.concat(write_int16(o.Forum_history.length))
		for(var i=0;i<o.Forum_history.length;i++){
			b=b.concat(write_MSG_forum_idname(o.Forum_history[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_WS2U_forum(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_idname(r.b);
		o.Parent=r.o
	}
	r=read_int16(r.b);
	o.Allow=r.o
	r=read_int32(r.b);
	o.Group_status=r.o
	r=read_int8(r.b);
	o.Allowstickthread=r.o
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_modrecommend(r.b);
		o.Modrecommend=r.o
	}
	r=read_int32(r.b);
	o.Todayposts=r.o
	r=read_int32(r.b);
	o.Threads=r.o
	r=read_int32(r.b);
	o.Favtimes=r.o
	r=read_int32(r.b);
	o.Threadmodcount=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_threadtype(r.b);
		o.Threadtypes=r.o
	}
	r=read_string(r.b);
	o.Rules=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Threadlist=[]
	for(var i=0;i<l;i++){
		r=read_MSG_forum_thread(r.b)
		o.Threadlist.push(r.o)
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_thread(r.b);
		o.Livethread=r.o
	}
	r=read_int8(r.b);
	o.Status=r.o
	r=read_string(r.b);
	o.Livemessage=r.o
	r=read_int32(r.b);
	o.Separatepos=r.o
	r=read_int32(r.b);
	o.Threadscount=r.o
	r=read_int16(r.b);
	o.Oldrank=r.o
	r=read_int16(r.b);
	o.Rank=r.o
	r=read_int32(r.b);
	o.Yesterdayposts=r.o
	r=read_string(r.b);
	o.Moderators=r.o
	r=read_int32(r.b);
	o.Lastpost=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Forum_history=[]
	for(var i=0;i<l;i++){
		r=read_MSG_forum_idname(r.b)
		o.Forum_history.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_modrecommend(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_modrecommend));
	b=b.concat(write_MSG_forum_modrecommend(o));
	return b;
}
function write_MSG_forum_modrecommend(o){
	var b=[];
	b=b.concat(write_int8(o.Sort));
	b=b.concat(write_int16(o.Imagewidth));
	b=b.concat(write_int16(o.Imageheight));
	b=b.concat(write_int16(o.Imagenum));
	return b
}
function read_MSG_forum_modrecommend(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Sort=r.o
	r=read_int16(r.b);
	o.Imagewidth=r.o
	r=read_int16(r.b);
	o.Imageheight=r.o
	r=read_int16(r.b);
	o.Imagenum=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_forum_modcp(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_forum_modcp));
	b=b.concat(write_MSG_U2WS_forum_modcp(o));
	return b;
}
function write_MSG_U2WS_forum_modcp(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	return b
}
function read_MSG_U2WS_forum_modcp(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_forum_recyclebin(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_forum_recyclebin));
	b=b.concat(write_MSG_U2WS_forum_recyclebin(o));
	return b;
}
function write_MSG_U2WS_forum_recyclebin(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	return b
}
function read_MSG_U2WS_forum_recyclebin(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_threadtype(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_threadtype));
	b=b.concat(write_MSG_forum_threadtype(o));
	return b;
}
function write_MSG_forum_threadtype(o){
	var b=[];
	if(o.Types){
		b=b.concat(write_int16(o.Types.length))
		for(var i=0;i<o.Types.length;i++){
			b=b.concat(write_MSG_forum_type(o.Types[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_int8(o.Status));
	b=b.concat(write_int8(o.Prefix));
	return b
}
function read_MSG_forum_threadtype(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);var l=r.o;if(l>0)o.Types=[]
	for(var i=0;i<l;i++){
		r=read_MSG_forum_type(r.b)
		o.Types.push(r.o)
	}
	r=read_int8(r.b);
	o.Status=r.o
	r=read_int8(r.b);
	o.Prefix=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_type(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_type));
	b=b.concat(write_MSG_forum_type(o));
	return b;
}
function write_MSG_forum_type(o){
	var b=[];
	b=b.concat(write_int16(o.Id));
	b=b.concat(write_string(o.Name));
	b=b.concat(write_string(o.Icon));
	b=b.concat(write_int32(o.Count));
	b=b.concat(write_int8(o.Ismoderator));
	return b
}
function read_MSG_forum_type(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Id=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_string(r.b);
	o.Icon=r.o
	r=read_int32(r.b);
	o.Count=r.o
	r=read_int8(r.b);
	o.Ismoderator=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_thread(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_thread));
	b=b.concat(write_MSG_forum_thread(o));
	return b;
}
function write_MSG_forum_thread(o){
	var b=[];
	b=b.concat(write_int8(o.Displayorder));
	b=b.concat(write_int32(o.Tid));
	b=b.concat(write_int32(o.Allreplies));
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_int8(o.Closed));
	b=b.concat(write_int8(o.Isgroup));
	b=b.concat(write_int16(o.Typeid));
	b=b.concat(write_int8(o.Icon));
	b=b.concat(write_int16(o.Status));
	if(o.Rushinfo){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_threadrush(o.Rushinfo));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_int16(o.Readperm));
	b=b.concat(write_int16(o.Price));
	b=b.concat(write_int8(o.Special));
	b=b.concat(write_int8(o.Attachment));
	b=b.concat(write_int8(o.Digest));
	b=b.concat(write_int32(o.Heats));
	b=b.concat(write_int16(o.Replycredit));
	b=b.concat(write_int32(o.Dateline));
	b=b.concat(write_int32(o.Lastpost));
	b=b.concat(write_string(o.Lastposter));
	b=b.concat(write_int32(o.Authorid));
	b=b.concat(write_string(o.Author));
	b=b.concat(write_string(o.Subject));
	b=b.concat(write_string(o.Folder));
	b=b.concat(write_int32(o.Views));
	b=b.concat(write_int32(o.Recommend_add));
	b=b.concat(write_int32(o.Recommend_sub));
	b=b.concat(write_int32(o.Recommends));
	b=b.concat(write_int32(o.Relay));
	b=b.concat(write_int32(o.Replies));
	if(o.Replycredit_rule){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_replycredit(o.Replycredit_rule));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_int8(o.Rewardfloor));
	b=b.concat(write_string(o.Groupname));
	b=b.concat(write_string(o.Forumname));
	b=b.concat(write_string(o.Groupcolor));
	b=b.concat(write_string(o.Verify));
	b=b.concat(write_int32(o.Groupviews));
	b=b.concat(write_int8(o.Highlight));
	b=b.concat(write_int8(o.Stamp));
	b=b.concat(write_string(o.Cutmessage));
	return b
}
function read_MSG_forum_thread(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Displayorder=r.o
	r=read_int32(r.b);
	o.Tid=r.o
	r=read_int32(r.b);
	o.Allreplies=r.o
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_int8(r.b);
	o.Closed=r.o
	r=read_int8(r.b);
	o.Isgroup=r.o
	r=read_int16(r.b);
	o.Typeid=r.o
	r=read_int8(r.b);
	o.Icon=r.o
	r=read_int16(r.b);
	o.Status=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_threadrush(r.b);
		o.Rushinfo=r.o
	}
	r=read_int16(r.b);
	o.Readperm=r.o
	r=read_int16(r.b);
	o.Price=r.o
	r=read_int8(r.b);
	o.Special=r.o
	r=read_int8(r.b);
	o.Attachment=r.o
	r=read_int8(r.b);
	o.Digest=r.o
	r=read_int32(r.b);
	o.Heats=r.o
	r=read_int16(r.b);
	o.Replycredit=r.o
	r=read_int32(r.b);
	o.Dateline=r.o
	r=read_int32(r.b);
	o.Lastpost=r.o
	r=read_string(r.b);
	o.Lastposter=r.o
	r=read_int32(r.b);
	o.Authorid=r.o
	r=read_string(r.b);
	o.Author=r.o
	r=read_string(r.b);
	o.Subject=r.o
	r=read_string(r.b);
	o.Folder=r.o
	r=read_int32(r.b);
	o.Views=r.o
	r=read_int32(r.b);
	o.Recommend_add=r.o
	r=read_int32(r.b);
	o.Recommend_sub=r.o
	r=read_int32(r.b);
	o.Recommends=r.o
	r=read_int32(r.b);
	o.Relay=r.o
	r=read_int32(r.b);
	o.Replies=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_replycredit(r.b);
		o.Replycredit_rule=r.o
	}
	r=read_int8(r.b);
	o.Rewardfloor=r.o
	r=read_string(r.b);
	o.Groupname=r.o
	r=read_string(r.b);
	o.Forumname=r.o
	r=read_string(r.b);
	o.Groupcolor=r.o
	r=read_string(r.b);
	o.Verify=r.o
	r=read_int32(r.b);
	o.Groupviews=r.o
	r=read_int8(r.b);
	o.Highlight=r.o
	r=read_int8(r.b);
	o.Stamp=r.o
	r=read_string(r.b);
	o.Cutmessage=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_threadrush(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_threadrush));
	b=b.concat(write_MSG_forum_threadrush(o));
	return b;
}
function write_MSG_forum_threadrush(o){
	var b=[];
	b=b.concat(write_int32(o.Tid));
	b=b.concat(write_int32(o.Starttimefrom));
	return b
}
function read_MSG_forum_threadrush(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Tid=r.o
	r=read_int32(r.b);
	o.Starttimefrom=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_forum_newthread(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_forum_newthread));
	b=b.concat(write_MSG_U2WS_forum_newthread(o));
	return b;
}
function write_MSG_U2WS_forum_newthread(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_int8(o.Special));
	b=b.concat(write_int8(o.Type));
	b=b.concat(write_int32(o.Tid));
	b=b.concat(write_int32(o.Position));
	return b
}
function read_MSG_U2WS_forum_newthread(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_int8(r.b);
	o.Special=r.o
	r=read_int8(r.b);
	o.Type=r.o
	r=read_int32(r.b);
	o.Tid=r.o
	r=read_int32(r.b);
	o.Position=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_forum_newthread(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_forum_newthread));
	b=b.concat(write_MSG_WS2U_forum_newthread(o));
	return b;
}
function write_MSG_WS2U_forum_newthread(o){
	var b=[];
	if(o.Parent){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_idname(o.Parent));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_string(o.Subject));
	b=b.concat(write_int32(o.Tid));
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.Name));
	if(o.Savethreads){
		b=b.concat(write_int16(o.Savethreads.length))
		for(var i=0;i<o.Savethreads.length;i++){
			b=b.concat(write_MSG_forum_savethread(o.Savethreads[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_int8(o.Ismoderator));
	b=b.concat(write_int32(o.Allow));
	b=b.concat(write_int32(o.Group_status));
	if(o.Threadtypes){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_threadtype(o.Threadtypes));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_int16(o.Typeid));
	b=b.concat(write_int8(o.Displayorder));
	b=b.concat(write_int8(o.Special));
	b=b.concat(write_int8(o.Stand));
	b=b.concat(write_string(o.Message));
	b=b.concat(write_string(o.Attachextensions));
	b=b.concat(write_int8(o.Allowat));
	b=b.concat(write_int8(o.Extcreditstype));
	b=b.concat(write_int32(o.Userextcredit));
	b=b.concat(write_int16(o.Status));
	b=b.concat(write_int16(o.Maxprice));
	b=b.concat(write_int16(o.Replycredit));
	if(o.Replycredit_rule){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_replycredit(o.Replycredit_rule));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_int16(o.Readperm));
	b=b.concat(write_int16(o.Price));
	b=b.concat(write_int32(o.Dateline));
	b=b.concat(write_string(o.Tag));
	if(o.Recent_use_tag){
		b=b.concat(write_int16(o.Recent_use_tag.length))
		for(var i=0;i<o.Recent_use_tag.length;i++){
			b=b.concat(write_string(o.Recent_use_tag[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Rush){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_post_rush(o.Rush));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_int8(o.Anonymous));
	b=b.concat(write_int8(o.Htmlon));
	b=b.concat(write_int32(o.Replies));
	if(o.Mygroups){
		b=b.concat(write_int16(o.Mygroups.length))
		for(var i=0;i<o.Mygroups.length;i++){
			b=b.concat(write_MSG_forum_group(o.Mygroups[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Attachs){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_attach(o.Attachs));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Imgattachs){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_attach(o.Imgattachs));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_int32(o.Maxattachsize));
	b=b.concat(write_int16(o.Allowuploadnum));
	b=b.concat(write_int32(o.Allowuploadsize));
	if(o.Albumlist){
		b=b.concat(write_int16(o.Albumlist.length))
		for(var i=0;i<o.Albumlist.length;i++){
			b=b.concat(write_MSG_forum_album(o.Albumlist[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Poll){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Poll_info(o.Poll));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_WS2U_forum_newthread(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_idname(r.b);
		o.Parent=r.o
	}
	r=read_string(r.b);
	o.Subject=r.o
	r=read_int32(r.b);
	o.Tid=r.o
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Savethreads=[]
	for(var i=0;i<l;i++){
		r=read_MSG_forum_savethread(r.b)
		o.Savethreads.push(r.o)
	}
	r=read_int8(r.b);
	o.Ismoderator=r.o
	r=read_int32(r.b);
	o.Allow=r.o
	r=read_int32(r.b);
	o.Group_status=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_threadtype(r.b);
		o.Threadtypes=r.o
	}
	r=read_int16(r.b);
	o.Typeid=r.o
	r=read_int8(r.b);
	o.Displayorder=r.o
	r=read_int8(r.b);
	o.Special=r.o
	r=read_int8(r.b);
	o.Stand=r.o
	r=read_string(r.b);
	o.Message=r.o
	r=read_string(r.b);
	o.Attachextensions=r.o
	r=read_int8(r.b);
	o.Allowat=r.o
	r=read_int8(r.b);
	o.Extcreditstype=r.o
	r=read_int32(r.b);
	o.Userextcredit=r.o
	r=read_int16(r.b);
	o.Status=r.o
	r=read_int16(r.b);
	o.Maxprice=r.o
	r=read_int16(r.b);
	o.Replycredit=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_replycredit(r.b);
		o.Replycredit_rule=r.o
	}
	r=read_int16(r.b);
	o.Readperm=r.o
	r=read_int16(r.b);
	o.Price=r.o
	r=read_int32(r.b);
	o.Dateline=r.o
	r=read_string(r.b);
	o.Tag=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Recent_use_tag=[]
	for(var i=0;i<l;i++){
		r=read_string(r.b)
		o.Recent_use_tag.push(r.o)
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_post_rush(r.b);
		o.Rush=r.o
	}
	r=read_int8(r.b);
	o.Anonymous=r.o
	r=read_int8(r.b);
	o.Htmlon=r.o
	r=read_int32(r.b);
	o.Replies=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Mygroups=[]
	for(var i=0;i<l;i++){
		r=read_MSG_forum_group(r.b)
		o.Mygroups.push(r.o)
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_attach(r.b);
		o.Attachs=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_attach(r.b);
		o.Imgattachs=r.o
	}
	r=read_int32(r.b);
	o.Maxattachsize=r.o
	r=read_int16(r.b);
	o.Allowuploadnum=r.o
	r=read_int32(r.b);
	o.Allowuploadsize=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Albumlist=[]
	for(var i=0;i<l;i++){
		r=read_MSG_forum_album(r.b)
		o.Albumlist.push(r.o)
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Poll_info(r.b);
		o.Poll=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_savethread(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_savethread));
	b=b.concat(write_MSG_forum_savethread(o));
	return b;
}
function write_MSG_forum_savethread(o){
	var b=[];
	b=b.concat(write_int32(o.Tid));
	b=b.concat(write_int32(o.Position));
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.Subject));
	b=b.concat(write_int32(o.Dateline));
	return b
}
function read_MSG_forum_savethread(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Tid=r.o
	r=read_int32(r.b);
	o.Position=r.o
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.Subject=r.o
	r=read_int32(r.b);
	o.Dateline=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_replycredit(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_replycredit));
	b=b.concat(write_MSG_forum_replycredit(o));
	return b;
}
function write_MSG_forum_replycredit(o){
	var b=[];
	b=b.concat(write_int32(o.Tid));
	b=b.concat(write_int32(o.Extcredits));
	b=b.concat(write_int8(o.Extcreditstype));
	b=b.concat(write_int16(o.Times));
	b=b.concat(write_int16(o.Membertimes));
	b=b.concat(write_int32(o.Random));
	return b
}
function read_MSG_forum_replycredit(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Tid=r.o
	r=read_int32(r.b);
	o.Extcredits=r.o
	r=read_int8(r.b);
	o.Extcreditstype=r.o
	r=read_int16(r.b);
	o.Times=r.o
	r=read_int16(r.b);
	o.Membertimes=r.o
	r=read_int32(r.b);
	o.Random=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_post_rush(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_post_rush));
	b=b.concat(write_MSG_forum_post_rush(o));
	return b;
}
function write_MSG_forum_post_rush(o){
	var b=[];
	b=b.concat(write_int32(o.Tid));
	b=b.concat(write_int32(o.Starttimefrom));
	b=b.concat(write_int32(o.Starttimeto));
	b=b.concat(write_string(o.Rewardfloor));
	b=b.concat(write_int16(o.Replylimit));
	b=b.concat(write_int32(o.Stopfloor));
	b=b.concat(write_int32(o.Creditlimit));
	return b
}
function read_MSG_forum_post_rush(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Tid=r.o
	r=read_int32(r.b);
	o.Starttimefrom=r.o
	r=read_int32(r.b);
	o.Starttimeto=r.o
	r=read_string(r.b);
	o.Rewardfloor=r.o
	r=read_int16(r.b);
	o.Replylimit=r.o
	r=read_int32(r.b);
	o.Stopfloor=r.o
	r=read_int32(r.b);
	o.Creditlimit=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_group(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_group));
	b=b.concat(write_MSG_forum_group(o));
	return b;
}
function write_MSG_forum_group(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.Name));
	return b
}
function read_MSG_forum_group(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.Name=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_attach(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_attach));
	b=b.concat(write_MSG_forum_attach(o));
	return b;
}
function write_MSG_forum_attach(o){
	var b=[];
	if(o.Unused){
		b=b.concat(write_int16(o.Unused.length))
		for(var i=0;i<o.Unused.length;i++){
			b=b.concat(write_MSG_forum_imgattach(o.Unused[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Used){
		b=b.concat(write_int16(o.Used.length))
		for(var i=0;i<o.Used.length;i++){
			b=b.concat(write_MSG_forum_imgattach(o.Used[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_forum_attach(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);var l=r.o;if(l>0)o.Unused=[]
	for(var i=0;i<l;i++){
		r=read_MSG_forum_imgattach(r.b)
		o.Unused.push(r.o)
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Used=[]
	for(var i=0;i<l;i++){
		r=read_MSG_forum_imgattach(r.b)
		o.Used.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_imgattach(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_imgattach));
	b=b.concat(write_MSG_forum_imgattach(o));
	return b;
}
function write_MSG_forum_imgattach(o){
	var b=[];
	b=b.concat(write_int64(o.Aid));
	b=b.concat(write_string(o.Filenametitle));
	b=b.concat(write_string(o.Src));
	b=b.concat(write_int32(o.Dateline));
	b=b.concat(write_string(o.Filename));
	return b
}
function read_MSG_forum_imgattach(b){
	var o={},r={};r.b=b;
	r=read_int64(r.b);
	o.Aid=r.o
	r=read_string(r.b);
	o.Filenametitle=r.o
	r=read_string(r.b);
	o.Src=r.o
	r=read_int32(r.b);
	o.Dateline=r.o
	r=read_string(r.b);
	o.Filename=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_album(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_album));
	b=b.concat(write_MSG_forum_album(o));
	return b;
}
function write_MSG_forum_album(o){
	var b=[];
	b=b.concat(write_int32(o.Albumid));
	b=b.concat(write_string(o.Albumname));
	return b
}
function read_MSG_forum_album(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Albumid=r.o
	r=read_string(r.b);
	o.Albumname=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Getlogin(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Getlogin));
	b=b.concat(write_MSG_U2WS_Getlogin(o));
	return b;
}
function write_MSG_U2WS_Getlogin(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Getlogin(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Getlogin(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Getlogin));
	b=b.concat(write_MSG_WS2U_Getlogin(o));
	return b;
}
function write_MSG_WS2U_Getlogin(o){
	var b=[];
	b=b.concat(write_int8(o.Islogin));
	b=b.concat(write_byte(o.Img));
	return b
}
function read_MSG_WS2U_Getlogin(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Islogin=r.o
	r=read_byte(r.b);o.Img=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Forum_newthread_submit(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Forum_newthread_submit));
	b=b.concat(write_MSG_U2WS_Forum_newthread_submit(o));
	return b;
}
function write_MSG_U2WS_Forum_newthread_submit(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_int32(o.Tid));
	b=b.concat(write_int32(o.Position));
	b=b.concat(write_int8(o.Type));
	b=b.concat(write_int16(o.Typeid));
	b=b.concat(write_int8(o.Special));
	b=b.concat(write_string(o.Subject));
	b=b.concat(write_string(o.Message));
	b=b.concat(write_string(o.Seccode));
	b=b.concat(write_int16(o.Other));
	b=b.concat(write_int16(o.Readperm));
	b=b.concat(write_string(o.Tags));
	if(o.Aids){
		b=b.concat(write_int16(o.Aids.length))
		for(var i=0;i<o.Aids.length;i++){
			b=b.concat(write_int64(o.Aids[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_byte(o.Specialext));
	return b
}
function read_MSG_U2WS_Forum_newthread_submit(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_int32(r.b);
	o.Tid=r.o
	r=read_int32(r.b);
	o.Position=r.o
	r=read_int8(r.b);
	o.Type=r.o
	r=read_int16(r.b);
	o.Typeid=r.o
	r=read_int8(r.b);
	o.Special=r.o
	r=read_string(r.b);
	o.Subject=r.o
	r=read_string(r.b);
	o.Message=r.o
	r=read_string(r.b);
	o.Seccode=r.o
	r=read_int16(r.b);
	o.Other=r.o
	r=read_int16(r.b);
	o.Readperm=r.o
	r=read_string(r.b);
	o.Tags=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Aids=[]
	for(var i=0;i<l;i++){
		r=read_int64(r.b)
		o.Aids.push(r.o)
	}
	r=read_byte(r.b);o.Specialext=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Forum_newthread_submit(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Forum_newthread_submit));
	b=b.concat(write_MSG_WS2U_Forum_newthread_submit(o));
	return b;
}
function write_MSG_WS2U_Forum_newthread_submit(o){
	var b=[];
	b=b.concat(write_int16(o.Result));
	b=b.concat(write_int32(o.Tid));
	if(o.Extcredits){
		b=b.concat(write_int16(o.Extcredits.length))
		for(var i=0;i<o.Extcredits.length;i++){
			b=b.concat(write_MSG_add_extcredits(o.Extcredits[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_WS2U_Forum_newthread_submit(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Result=r.o
	r=read_int32(r.b);
	o.Tid=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Extcredits=[]
	for(var i=0;i<l;i++){
		r=read_MSG_add_extcredits(r.b)
		o.Extcredits.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_add_extcredits(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_add_extcredits));
	b=b.concat(write_MSG_add_extcredits(o));
	return b;
}
function write_MSG_add_extcredits(o){
	var b=[];
	b=b.concat(write_int8(o.Id));
	b=b.concat(write_int32(o.Value));
	return b
}
function read_MSG_add_extcredits(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Id=r.o
	r=read_int32(r.b);
	o.Value=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_forum_viewthread(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_forum_viewthread));
	b=b.concat(write_MSG_U2WS_forum_viewthread(o));
	return b;
}
function write_MSG_U2WS_forum_viewthread(o){
	var b=[];
	b=b.concat(write_int32(o.Tid));
	b=b.concat(write_int16(o.Page));
	b=b.concat(write_int8(o.Ordertype));
	b=b.concat(write_int8(o.Stand));
	b=b.concat(write_int32(o.Authorid));
	b=b.concat(write_int32(o.Position));
	b=b.concat(write_int32(o.Fromuid));
	return b
}
function read_MSG_U2WS_forum_viewthread(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Tid=r.o
	r=read_int16(r.b);
	o.Page=r.o
	r=read_int8(r.b);
	o.Ordertype=r.o
	r=read_int8(r.b);
	o.Stand=r.o
	r=read_int32(r.b);
	o.Authorid=r.o
	r=read_int32(r.b);
	o.Position=r.o
	r=read_int32(r.b);
	o.Fromuid=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_forum_viewthread(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_forum_viewthread));
	b=b.concat(write_MSG_WS2U_forum_viewthread(o));
	return b;
}
function write_MSG_WS2U_forum_viewthread(o){
	var b=[];
	b=b.concat(write_string(o.Avatar));
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.Name));
	if(o.Parent){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_idname(o.Parent));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Forum){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_thread_forum(o.Forum));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_int32(o.Group_status));
	b=b.concat(write_int32(o.Admin_status));
	b=b.concat(write_int8(o.Allowstickthread));
	b=b.concat(write_int8(o.Modmenu));
	if(o.Medal_list){
		b=b.concat(write_int16(o.Medal_list.length))
		for(var i=0;i<o.Medal_list.length;i++){
			b=b.concat(write_MSG_forum_post_medal(o.Medal_list[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Thread){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_thread(o.Thread));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_int16(o.Page));
	if(o.Postlist){
		b=b.concat(write_int16(o.Postlist.length))
		for(var i=0;i<o.Postlist.length;i++){
			b=b.concat(write_MSG_forum_post(o.Postlist[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_int32(o.Credits));
	b=b.concat(write_int32(o.Posts));
	b=b.concat(write_int32(o.Digestposts));
	if(o.Blockedpids){
		b=b.concat(write_int16(o.Blockedpids.length))
		for(var i=0;i<o.Blockedpids.length;i++){
			b=b.concat(write_int32(o.Blockedpids[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_int8(o.Firststand));
	b=b.concat(write_int32(o.Maxattachsize));
	b=b.concat(write_int16(o.Allowuploadnum));
	b=b.concat(write_int32(o.Allowuploadsize));
	b=b.concat(write_int8(o.Allowrecommend));
	b=b.concat(write_int32(o.Edittimelimit));
	if(o.Recent_use_tag){
		b=b.concat(write_int16(o.Recent_use_tag.length))
		for(var i=0;i<o.Recent_use_tag.length;i++){
			b=b.concat(write_string(o.Recent_use_tag[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_string(o.Reason));
	if(o.Poll){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Poll_info(o.Poll));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Forum_history){
		b=b.concat(write_int16(o.Forum_history.length))
		for(var i=0;i<o.Forum_history.length;i++){
			b=b.concat(write_MSG_forum_idname(o.Forum_history[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_WS2U_forum_viewthread(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Avatar=r.o
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_idname(r.b);
		o.Parent=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_thread_forum(r.b);
		o.Forum=r.o
	}
	r=read_int32(r.b);
	o.Group_status=r.o
	r=read_int32(r.b);
	o.Admin_status=r.o
	r=read_int8(r.b);
	o.Allowstickthread=r.o
	r=read_int8(r.b);
	o.Modmenu=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Medal_list=[]
	for(var i=0;i<l;i++){
		r=read_MSG_forum_post_medal(r.b)
		o.Medal_list.push(r.o)
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_thread(r.b);
		o.Thread=r.o
	}
	r=read_int16(r.b);
	o.Page=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Postlist=[]
	for(var i=0;i<l;i++){
		r=read_MSG_forum_post(r.b)
		o.Postlist.push(r.o)
	}
	r=read_int32(r.b);
	o.Credits=r.o
	r=read_int32(r.b);
	o.Posts=r.o
	r=read_int32(r.b);
	o.Digestposts=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Blockedpids=[]
	for(var i=0;i<l;i++){
		r=read_int32(r.b)
		o.Blockedpids.push(r.o)
	}
	r=read_int8(r.b);
	o.Firststand=r.o
	r=read_int32(r.b);
	o.Maxattachsize=r.o
	r=read_int16(r.b);
	o.Allowuploadnum=r.o
	r=read_int32(r.b);
	o.Allowuploadsize=r.o
	r=read_int8(r.b);
	o.Allowrecommend=r.o
	r=read_int32(r.b);
	o.Edittimelimit=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Recent_use_tag=[]
	for(var i=0;i<l;i++){
		r=read_string(r.b)
		o.Recent_use_tag.push(r.o)
	}
	r=read_string(r.b);
	o.Reason=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Poll_info(r.b);
		o.Poll=r.o
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Forum_history=[]
	for(var i=0;i<l;i++){
		r=read_MSG_forum_idname(r.b)
		o.Forum_history.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_thread_forum(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_thread_forum));
	b=b.concat(write_MSG_forum_thread_forum(o));
	return b;
}
function write_MSG_forum_thread_forum(o){
	var b=[];
	b=b.concat(write_int8(o.Picstyle));
	if(o.Threadtypes){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_threadtype(o.Threadtypes));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_int8(o.Status));
	b=b.concat(write_int8(o.Ismoderator));
	b=b.concat(write_int8(o.Allowspecialonly));
	b=b.concat(write_int8(o.Alloweditpost));
	b=b.concat(write_int8(o.Disablecollect));
	return b
}
function read_MSG_forum_thread_forum(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Picstyle=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_threadtype(r.b);
		o.Threadtypes=r.o
	}
	r=read_int8(r.b);
	o.Status=r.o
	r=read_int8(r.b);
	o.Ismoderator=r.o
	r=read_int8(r.b);
	o.Allowspecialonly=r.o
	r=read_int8(r.b);
	o.Alloweditpost=r.o
	r=read_int8(r.b);
	o.Disablecollect=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_post(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_post));
	b=b.concat(write_MSG_forum_post(o));
	return b;
}
function write_MSG_forum_post(o){
	var b=[];
	b=b.concat(write_int32(o.StatusBool));
	b=b.concat(write_int16(o.Adminid));
	b=b.concat(write_string(o.Grouptitle));
	b=b.concat(write_string(o.Header));
	b=b.concat(write_string(o.Footer));
	b=b.concat(write_string(o.Groupcolor));
	b=b.concat(write_int32(o.Memberstatus));
	b=b.concat(write_int8(o.Invisible));
	b=b.concat(write_string(o.Author));
	b=b.concat(write_string(o.Avatar));
	b=b.concat(write_int32(o.Authorid));
	b=b.concat(write_int32(o.Dateline));
	b=b.concat(write_int32(o.Gender));
	b=b.concat(write_int16(o.Groupid));
	b=b.concat(write_int8(o.Imagelistcount));
	b=b.concat(write_string(o.Message));
	b=b.concat(write_int8(o.Mobiletype));
	b=b.concat(write_int32(o.Number));
	b=b.concat(write_int32(o.Position));
	if(o.Profile){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_post_member_profile(o.Profile));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Ratelog){
		b=b.concat(write_int16(o.Ratelog.length))
		for(var i=0;i<o.Ratelog.length;i++){
			b=b.concat(write_MSG_post_ratelog(o.Ratelog[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Ratelogextcredits){
		b=b.concat(write_int16(o.Ratelogextcredits.length))
		for(var i=0;i<o.Ratelogextcredits.length;i++){
			b=b.concat(write_MSG_post_ratelog_score(o.Ratelogextcredits[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Relateitem){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_post_relateitem(o.Relateitem));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_int32(o.Replycredit));
	b=b.concat(write_string(o.Signature));
	b=b.concat(write_int8(o.Stand));
	b=b.concat(write_string(o.Subject));
	if(o.Tags){
		b=b.concat(write_int16(o.Tags.length))
		for(var i=0;i<o.Tags.length;i++){
			b=b.concat(write_string(o.Tags[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_string(o.Useip));
	b=b.concat(write_string(o.Username));
	b=b.concat(write_int32(o.Voters));
	if(o.Lastmod){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_threadmod(o.Lastmod));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Comments){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_post_comment(o.Comments));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_int16(o.Totalcomment));
	b=b.concat(write_int16(o.Commentcount));
	b=b.concat(write_int16(o.Totalrate));
	b=b.concat(write_string(o.Location));
	if(o.Attachlist){
		b=b.concat(write_int16(o.Attachlist.length))
		for(var i=0;i<o.Attachlist.length;i++){
			b=b.concat(write_string(o.Attachlist[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Imagelist){
		b=b.concat(write_int16(o.Imagelist.length))
		for(var i=0;i<o.Imagelist.length;i++){
			b=b.concat(write_MSG_forum_imgattach(o.Imagelist[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_int32(o.Releatcollectionnum));
	b=b.concat(write_int32(o.Threadnum));
	b=b.concat(write_int32(o.Digestnum));
	b=b.concat(write_int32(o.Extcredits1));
	b=b.concat(write_int32(o.Extcredits2));
	b=b.concat(write_int32(o.Extcredits3));
	return b
}
function read_MSG_forum_post(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.StatusBool=r.o
	r=read_int16(r.b);
	o.Adminid=r.o
	r=read_string(r.b);
	o.Grouptitle=r.o
	r=read_string(r.b);
	o.Header=r.o
	r=read_string(r.b);
	o.Footer=r.o
	r=read_string(r.b);
	o.Groupcolor=r.o
	r=read_int32(r.b);
	o.Memberstatus=r.o
	r=read_int8(r.b);
	o.Invisible=r.o
	r=read_string(r.b);
	o.Author=r.o
	r=read_string(r.b);
	o.Avatar=r.o
	r=read_int32(r.b);
	o.Authorid=r.o
	r=read_int32(r.b);
	o.Dateline=r.o
	r=read_int32(r.b);
	o.Gender=r.o
	r=read_int16(r.b);
	o.Groupid=r.o
	r=read_int8(r.b);
	o.Imagelistcount=r.o
	r=read_string(r.b);
	o.Message=r.o
	r=read_int8(r.b);
	o.Mobiletype=r.o
	r=read_int32(r.b);
	o.Number=r.o
	r=read_int32(r.b);
	o.Position=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_post_member_profile(r.b);
		o.Profile=r.o
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Ratelog=[]
	for(var i=0;i<l;i++){
		r=read_MSG_post_ratelog(r.b)
		o.Ratelog.push(r.o)
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Ratelogextcredits=[]
	for(var i=0;i<l;i++){
		r=read_MSG_post_ratelog_score(r.b)
		o.Ratelogextcredits.push(r.o)
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_post_relateitem(r.b);
		o.Relateitem=r.o
	}
	r=read_int32(r.b);
	o.Replycredit=r.o
	r=read_string(r.b);
	o.Signature=r.o
	r=read_int8(r.b);
	o.Stand=r.o
	r=read_string(r.b);
	o.Subject=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Tags=[]
	for(var i=0;i<l;i++){
		r=read_string(r.b)
		o.Tags.push(r.o)
	}
	r=read_string(r.b);
	o.Useip=r.o
	r=read_string(r.b);
	o.Username=r.o
	r=read_int32(r.b);
	o.Voters=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_threadmod(r.b);
		o.Lastmod=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_post_comment(r.b);
		o.Comments=r.o
	}
	r=read_int16(r.b);
	o.Totalcomment=r.o
	r=read_int16(r.b);
	o.Commentcount=r.o
	r=read_int16(r.b);
	o.Totalrate=r.o
	r=read_string(r.b);
	o.Location=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Attachlist=[]
	for(var i=0;i<l;i++){
		r=read_string(r.b)
		o.Attachlist.push(r.o)
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Imagelist=[]
	for(var i=0;i<l;i++){
		r=read_MSG_forum_imgattach(r.b)
		o.Imagelist.push(r.o)
	}
	r=read_int32(r.b);
	o.Releatcollectionnum=r.o
	r=read_int32(r.b);
	o.Threadnum=r.o
	r=read_int32(r.b);
	o.Digestnum=r.o
	r=read_int32(r.b);
	o.Extcredits1=r.o
	r=read_int32(r.b);
	o.Extcredits2=r.o
	r=read_int32(r.b);
	o.Extcredits3=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_post_medal(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_post_medal));
	b=b.concat(write_MSG_forum_post_medal(o));
	return b;
}
function write_MSG_forum_post_medal(o){
	var b=[];
	b=b.concat(write_int16(o.Id));
	b=b.concat(write_string(o.Name));
	b=b.concat(write_string(o.Description));
	return b
}
function read_MSG_forum_post_medal(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Id=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_string(r.b);
	o.Description=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_postreview(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_postreview));
	b=b.concat(write_MSG_postreview(o));
	return b;
}
function write_MSG_postreview(o){
	var b=[];
	b=b.concat(write_int16(o.Support));
	b=b.concat(write_int16(o.Against));
	return b
}
function read_MSG_postreview(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Support=r.o
	r=read_int16(r.b);
	o.Against=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_post_member_profile(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_post_member_profile));
	b=b.concat(write_MSG_post_member_profile(o));
	return b;
}
function write_MSG_post_member_profile(o){
	var b=[];
	b=b.concat(write_string(o.Mobile));
	b=b.concat(write_string(o.Wx));
	b=b.concat(write_int64(o.Qq));
	b=b.concat(write_string(o.Site));
	return b
}
function read_MSG_post_member_profile(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Mobile=r.o
	r=read_string(r.b);
	o.Wx=r.o
	r=read_int64(r.b);
	o.Qq=r.o
	r=read_string(r.b);
	o.Site=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_post_ratelog(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_post_ratelog));
	b=b.concat(write_MSG_post_ratelog(o));
	return b;
}
function write_MSG_post_ratelog(o){
	var b=[];
	b=b.concat(write_string(o.Username));
	b=b.concat(write_string(o.Avatar));
	if(o.Score){
		b=b.concat(write_int16(o.Score.length))
		for(var i=0;i<o.Score.length;i++){
			b=b.concat(write_MSG_post_ratelog_score(o.Score[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_string(o.Reason));
	b=b.concat(write_int32(o.Uid));
	return b
}
function read_MSG_post_ratelog(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Username=r.o
	r=read_string(r.b);
	o.Avatar=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Score=[]
	for(var i=0;i<l;i++){
		r=read_MSG_post_ratelog_score(r.b)
		o.Score.push(r.o)
	}
	r=read_string(r.b);
	o.Reason=r.o
	r=read_int32(r.b);
	o.Uid=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_post_ratelog_score(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_post_ratelog_score));
	b=b.concat(write_MSG_post_ratelog_score(o));
	return b;
}
function write_MSG_post_ratelog_score(o){
	var b=[];
	b=b.concat(write_int8(o.Id));
	b=b.concat(write_int32(o.Score));
	return b
}
function read_MSG_post_ratelog_score(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Id=r.o
	r=read_int32(r.b);
	o.Score=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_post_relateitem(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_post_relateitem));
	b=b.concat(write_MSG_post_relateitem(o));
	return b;
}
function write_MSG_post_relateitem(o){
	var b=[];
	b=b.concat(write_int32(o.Tid));
	b=b.concat(write_string(o.Subject));
	return b
}
function read_MSG_post_relateitem(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Tid=r.o
	r=read_string(r.b);
	o.Subject=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_threadmod(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_threadmod));
	b=b.concat(write_MSG_threadmod(o));
	return b;
}
function write_MSG_threadmod(o){
	var b=[];
	b=b.concat(write_int32(o.Uid));
	b=b.concat(write_string(o.Modactiontype));
	b=b.concat(write_string(o.Modusername));
	b=b.concat(write_int32(o.Moddateline));
	b=b.concat(write_int32(o.Expiration));
	b=b.concat(write_string(o.Reason));
	b=b.concat(write_int8(o.Stamp));
	b=b.concat(write_int8(o.Status));
	return b
}
function read_MSG_threadmod(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Uid=r.o
	r=read_string(r.b);
	o.Modactiontype=r.o
	r=read_string(r.b);
	o.Modusername=r.o
	r=read_int32(r.b);
	o.Moddateline=r.o
	r=read_int32(r.b);
	o.Expiration=r.o
	r=read_string(r.b);
	o.Reason=r.o
	r=read_int8(r.b);
	o.Stamp=r.o
	r=read_int8(r.b);
	o.Status=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_post_comment(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_post_comment));
	b=b.concat(write_MSG_post_comment(o));
	return b;
}
function write_MSG_post_comment(o){
	var b=[];
	b=b.concat(write_int32(o.Authorid));
	b=b.concat(write_string(o.Avatar));
	b=b.concat(write_string(o.Author));
	b=b.concat(write_string(o.Comment));
	b=b.concat(write_string(o.Rpid));
	b=b.concat(write_string(o.Useip));
	b=b.concat(write_int32(o.Id));
	b=b.concat(write_int32(o.Dateline));
	return b
}
function read_MSG_post_comment(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Authorid=r.o
	r=read_string(r.b);
	o.Avatar=r.o
	r=read_string(r.b);
	o.Author=r.o
	r=read_string(r.b);
	o.Comment=r.o
	r=read_string(r.b);
	o.Rpid=r.o
	r=read_string(r.b);
	o.Useip=r.o
	r=read_int32(r.b);
	o.Id=r.o
	r=read_int32(r.b);
	o.Dateline=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_threadfastpost(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_threadfastpost));
	b=b.concat(write_MSG_U2WS_threadfastpost(o));
	return b;
}
function write_MSG_U2WS_threadfastpost(o){
	var b=[];
	b=b.concat(write_int32(o.Tid));
	b=b.concat(write_int32(o.Position));
	b=b.concat(write_string(o.Subject));
	b=b.concat(write_string(o.Message));
	b=b.concat(write_string(o.Seccode));
	b=b.concat(write_int8(o.Other));
	return b
}
function read_MSG_U2WS_threadfastpost(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Tid=r.o
	r=read_int32(r.b);
	o.Position=r.o
	r=read_string(r.b);
	o.Subject=r.o
	r=read_string(r.b);
	o.Message=r.o
	r=read_string(r.b);
	o.Seccode=r.o
	r=read_int8(r.b);
	o.Other=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_threadfastpost(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_threadfastpost));
	b=b.concat(write_MSG_WS2U_threadfastpost(o));
	return b;
}
function write_MSG_WS2U_threadfastpost(o){
	var b=[];
	b=b.concat(write_int16(o.Result));
	b=b.concat(write_int16(o.Page));
	if(o.Add_info){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_post(o.Add_info));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_WS2U_threadfastpost(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Result=r.o
	r=read_int16(r.b);
	o.Page=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_post(r.b);
		o.Add_info=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_nextset(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_nextset));
	b=b.concat(write_MSG_U2WS_nextset(o));
	return b;
}
function write_MSG_U2WS_nextset(o){
	var b=[];
	b=b.concat(write_int8(o.Next));
	b=b.concat(write_int32(o.Tid));
	return b
}
function read_MSG_U2WS_nextset(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Next=r.o
	r=read_int32(r.b);
	o.Tid=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_nextset(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_nextset));
	b=b.concat(write_MSG_WS2U_nextset(o));
	return b;
}
function write_MSG_WS2U_nextset(o){
	var b=[];
	b=b.concat(write_int32(o.Tid));
	return b
}
function read_MSG_WS2U_nextset(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Tid=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_upload_image(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_upload_image));
	b=b.concat(write_MSG_U2WS_upload_image(o));
	return b;
}
function write_MSG_U2WS_upload_image(o){
	var b=[];
	b=b.concat(write_string(o.Filename));
	b=b.concat(write_byte(o.Data));
	return b
}
function read_MSG_U2WS_upload_image(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Filename=r.o
	r=read_byte(r.b);o.Data=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_upload_image(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_upload_image));
	b=b.concat(write_MSG_WS2U_upload_image(o));
	return b;
}
function write_MSG_WS2U_upload_image(o){
	var b=[];
	b=b.concat(write_string(o.Img));
	b=b.concat(write_int64(o.Aid));
	b=b.concat(write_string(o.Title));
	return b
}
function read_MSG_WS2U_upload_image(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Img=r.o
	r=read_int64(r.b);
	o.Aid=r.o
	r=read_string(r.b);
	o.Title=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_upload_tmp_image(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_upload_tmp_image));
	b=b.concat(write_MSG_U2WS_upload_tmp_image(o));
	return b;
}
function write_MSG_U2WS_upload_tmp_image(o){
	var b=[];
	b=b.concat(write_string(o.Filename));
	b=b.concat(write_byte(o.Data));
	return b
}
function read_MSG_U2WS_upload_tmp_image(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Filename=r.o
	r=read_byte(r.b);o.Data=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_upload_tmp_image(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_upload_tmp_image));
	b=b.concat(write_MSG_WS2U_upload_tmp_image(o));
	return b;
}
function write_MSG_WS2U_upload_tmp_image(o){
	var b=[];
	b=b.concat(write_int64(o.Aid));
	return b
}
function read_MSG_WS2U_upload_tmp_image(b){
	var o={},r={};r.b=b;
	r=read_int64(r.b);
	o.Aid=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_delete_attach(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_delete_attach));
	b=b.concat(write_MSG_U2WS_delete_attach(o));
	return b;
}
function write_MSG_U2WS_delete_attach(o){
	var b=[];
	if(o.Ids){
		b=b.concat(write_int16(o.Ids.length))
		for(var i=0;i<o.Ids.length;i++){
			b=b.concat(write_int64(o.Ids[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_U2WS_delete_attach(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);var l=r.o;if(l>0)o.Ids=[]
	for(var i=0;i<l;i++){
		r=read_int64(r.b)
		o.Ids.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_delete_attach(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_delete_attach));
	b=b.concat(write_MSG_WS2U_delete_attach(o));
	return b;
}
function write_MSG_WS2U_delete_attach(o){
	var b=[];
	if(o.Ids){
		b=b.concat(write_int16(o.Ids.length))
		for(var i=0;i<o.Ids.length;i++){
			b=b.concat(write_int64(o.Ids[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_WS2U_delete_attach(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);var l=r.o;if(l>0)o.Ids=[]
	for(var i=0;i<l;i++){
		r=read_int64(r.b)
		o.Ids.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_threadmod(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_threadmod));
	b=b.concat(write_MSG_U2WS_threadmod(o));
	return b;
}
function write_MSG_U2WS_threadmod(o){
	var b=[];
	if(o.Tids){
		b=b.concat(write_int16(o.Tids.length))
		for(var i=0;i<o.Tids.length;i++){
			b=b.concat(write_int32(o.Tids[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_int32(o.Expiration));
	b=b.concat(write_int8(o.Action));
	b=b.concat(write_int8(o.Param));
	b=b.concat(write_int32(o.Param1));
	b=b.concat(write_string(o.Reason));
	b=b.concat(write_int8(o.Sendreasonpm));
	return b
}
function read_MSG_U2WS_threadmod(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);var l=r.o;if(l>0)o.Tids=[]
	for(var i=0;i<l;i++){
		r=read_int32(r.b)
		o.Tids.push(r.o)
	}
	r=read_int32(r.b);
	o.Expiration=r.o
	r=read_int8(r.b);
	o.Action=r.o
	r=read_int8(r.b);
	o.Param=r.o
	r=read_int32(r.b);
	o.Param1=r.o
	r=read_string(r.b);
	o.Reason=r.o
	r=read_int8(r.b);
	o.Sendreasonpm=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_viewthreadmod(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_viewthreadmod));
	b=b.concat(write_MSG_U2WS_viewthreadmod(o));
	return b;
}
function write_MSG_U2WS_viewthreadmod(o){
	var b=[];
	b=b.concat(write_int32(o.Tid));
	return b
}
function read_MSG_U2WS_viewthreadmod(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Tid=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_viewthreadmod(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_viewthreadmod));
	b=b.concat(write_MSG_WS2U_viewthreadmod(o));
	return b;
}
function write_MSG_WS2U_viewthreadmod(o){
	var b=[];
	b=b.concat(write_int32(o.Param));
	if(o.List){
		b=b.concat(write_int16(o.List.length))
		for(var i=0;i<o.List.length;i++){
			b=b.concat(write_MSG_threadmod(o.List[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_WS2U_viewthreadmod(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Param=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.List=[]
	for(var i=0;i<l;i++){
		r=read_MSG_threadmod(r.b)
		o.List.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_forum_refresh(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_forum_refresh));
	b=b.concat(write_MSG_U2WS_forum_refresh(o));
	return b;
}
function write_MSG_U2WS_forum_refresh(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_int32(o.Lastpost));
	return b
}
function read_MSG_U2WS_forum_refresh(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_int32(r.b);
	o.Lastpost=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_forum_carlist(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_forum_carlist));
	b=b.concat(write_MSG_U2WS_forum_carlist(o));
	return b;
}
function write_MSG_U2WS_forum_carlist(o){
	var b=[];
	return b
}
function read_MSG_U2WS_forum_carlist(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_forum_carlist(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_forum_carlist));
	b=b.concat(write_MSG_WS2U_forum_carlist(o));
	return b;
}
function write_MSG_WS2U_forum_carlist(o){
	var b=[];
	if(o.Catlist){
		b=b.concat(write_int16(o.Catlist.length))
		for(var i=0;i<o.Catlist.length;i++){
			b=b.concat(write_MSG_forum_cart(o.Catlist[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_WS2U_forum_carlist(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);var l=r.o;if(l>0)o.Catlist=[]
	for(var i=0;i<l;i++){
		r=read_MSG_forum_cart(r.b)
		o.Catlist.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_cart(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_cart));
	b=b.concat(write_MSG_forum_cart(o));
	return b;
}
function write_MSG_forum_cart(o){
	var b=[];
	b=b.concat(write_string(o.Name));
	b=b.concat(write_int32(o.Catid));
	if(o.Forums){
		b=b.concat(write_int16(o.Forums.length))
		for(var i=0;i<o.Forums.length;i++){
			b=b.concat(write_MSG_forum_cart_child(o.Forums[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_forum_cart(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Name=r.o
	r=read_int32(r.b);
	o.Catid=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Forums=[]
	for(var i=0;i<l;i++){
		r=read_MSG_forum_cart_child(r.b)
		o.Forums.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_forum_cart_child(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_forum_cart_child));
	b=b.concat(write_MSG_forum_cart_child(o));
	return b;
}
function write_MSG_forum_cart_child(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_int32(o.Fup));
	b=b.concat(write_string(o.Name));
	if(o.Threadtypes){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_threadtype(o.Threadtypes));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_forum_cart_child(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_int32(r.b);
	o.Fup=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_threadtype(r.b);
		o.Threadtypes=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_GetPostWarnList(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_GetPostWarnList));
	b=b.concat(write_MSG_U2WS_GetPostWarnList(o));
	return b;
}
function write_MSG_U2WS_GetPostWarnList(o){
	var b=[];
	b=b.concat(write_int32(o.Tid));
	b=b.concat(write_int32(o.Position));
	return b
}
function read_MSG_U2WS_GetPostWarnList(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Tid=r.o
	r=read_int32(r.b);
	o.Position=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_space(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_space));
	b=b.concat(write_MSG_U2WS_space(o));
	return b;
}
function write_MSG_U2WS_space(o){
	var b=[];
	b=b.concat(write_int32(o.Uid));
	b=b.concat(write_string(o.Name));
	return b
}
function read_MSG_U2WS_space(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Uid=r.o
	r=read_string(r.b);
	o.Name=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_space(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_space));
	b=b.concat(write_MSG_WS2U_space(o));
	return b;
}
function write_MSG_WS2U_space(o){
	var b=[];
	b=b.concat(write_int32(o.Status));
	b=b.concat(write_string(o.Username));
	b=b.concat(write_string(o.Avatar));
	b=b.concat(write_int32(o.Uid));
	b=b.concat(write_int32(o.Views));
	b=b.concat(write_string(o.Email));
	b=b.concat(write_string(o.Customstatus));
	b=b.concat(write_string(o.Sightml));
	b=b.concat(write_int32(o.Posts));
	b=b.concat(write_int32(o.Threads));
	if(o.Profiles){
		b=b.concat(write_int16(o.Profiles.length))
		for(var i=0;i<o.Profiles.length;i++){
			b=b.concat(write_MSG_userprofiles(o.Profiles[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Admingroup){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_usergroup(o.Admingroup));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Group){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_usergroup(o.Group));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_int32(o.Upgradecredit));
	b=b.concat(write_int32(o.Credits));
	b=b.concat(write_int32(o.Groupexpiry));
	b=b.concat(write_int32(o.Oltime));
	b=b.concat(write_int32(o.Regdate));
	b=b.concat(write_int32(o.Lastvisit));
	b=b.concat(write_string(o.Regip));
	b=b.concat(write_string(o.Lastip));
	b=b.concat(write_int32(o.Lastpost));
	b=b.concat(write_int32(o.Lastsendmail));
	b=b.concat(write_int32(o.Attachsize));
	return b
}
function read_MSG_WS2U_space(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Status=r.o
	r=read_string(r.b);
	o.Username=r.o
	r=read_string(r.b);
	o.Avatar=r.o
	r=read_int32(r.b);
	o.Uid=r.o
	r=read_int32(r.b);
	o.Views=r.o
	r=read_string(r.b);
	o.Email=r.o
	r=read_string(r.b);
	o.Customstatus=r.o
	r=read_string(r.b);
	o.Sightml=r.o
	r=read_int32(r.b);
	o.Posts=r.o
	r=read_int32(r.b);
	o.Threads=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Profiles=[]
	for(var i=0;i<l;i++){
		r=read_MSG_userprofiles(r.b)
		o.Profiles.push(r.o)
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_usergroup(r.b);
		o.Admingroup=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_usergroup(r.b);
		o.Group=r.o
	}
	r=read_int32(r.b);
	o.Upgradecredit=r.o
	r=read_int32(r.b);
	o.Credits=r.o
	r=read_int32(r.b);
	o.Groupexpiry=r.o
	r=read_int32(r.b);
	o.Oltime=r.o
	r=read_int32(r.b);
	o.Regdate=r.o
	r=read_int32(r.b);
	o.Lastvisit=r.o
	r=read_string(r.b);
	o.Regip=r.o
	r=read_string(r.b);
	o.Lastip=r.o
	r=read_int32(r.b);
	o.Lastpost=r.o
	r=read_int32(r.b);
	o.Lastsendmail=r.o
	r=read_int32(r.b);
	o.Attachsize=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_userprofiles(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_userprofiles));
	b=b.concat(write_MSG_userprofiles(o));
	return b;
}
function write_MSG_userprofiles(o){
	var b=[];
	b=b.concat(write_string(o.Title));
	b=b.concat(write_string(o.Value));
	return b
}
function read_MSG_userprofiles(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Title=r.o
	r=read_string(r.b);
	o.Value=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_usergroup(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_usergroup));
	b=b.concat(write_MSG_usergroup(o));
	return b;
}
function write_MSG_usergroup(o){
	var b=[];
	b=b.concat(write_int16(o.Id));
	b=b.concat(write_string(o.Color));
	b=b.concat(write_string(o.Grouptitle));
	b=b.concat(write_string(o.Icon));
	return b
}
function read_MSG_usergroup(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Id=r.o
	r=read_string(r.b);
	o.Color=r.o
	r=read_string(r.b);
	o.Grouptitle=r.o
	r=read_string(r.b);
	o.Icon=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_SpaceThread(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_SpaceThread));
	b=b.concat(write_MSG_U2WS_SpaceThread(o));
	return b;
}
function write_MSG_U2WS_SpaceThread(o){
	var b=[];
	b=b.concat(write_int32(o.Uid));
	b=b.concat(write_int8(o.Type));
	b=b.concat(write_int16(o.Page));
	return b
}
function read_MSG_U2WS_SpaceThread(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Uid=r.o
	r=read_int8(r.b);
	o.Type=r.o
	r=read_int16(r.b);
	o.Page=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_SpaceThread(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_SpaceThread));
	b=b.concat(write_MSG_WS2U_SpaceThread(o));
	return b;
}
function write_MSG_WS2U_SpaceThread(o){
	var b=[];
	b=b.concat(write_int32(o.Uid));
	if(o.Threadlist){
		b=b.concat(write_int16(o.Threadlist.length))
		for(var i=0;i<o.Threadlist.length;i++){
			b=b.concat(write_MSG_SpaceThread(o.Threadlist[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_int32(o.Threadcount));
	return b
}
function read_MSG_WS2U_SpaceThread(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Uid=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Threadlist=[]
	for(var i=0;i<l;i++){
		r=read_MSG_SpaceThread(r.b)
		o.Threadlist.push(r.o)
	}
	r=read_int32(r.b);
	o.Threadcount=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_SpaceThread(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_SpaceThread));
	b=b.concat(write_MSG_SpaceThread(o));
	return b;
}
function write_MSG_SpaceThread(o){
	var b=[];
	b=b.concat(write_int32(o.Tid));
	b=b.concat(write_string(o.Folder));
	b=b.concat(write_int8(o.Special));
	b=b.concat(write_int8(o.Displayorder));
	b=b.concat(write_string(o.Subject));
	b=b.concat(write_int8(o.Digest));
	b=b.concat(write_int8(o.Attachment));
	b=b.concat(write_int8(o.Multipage));
	b=b.concat(write_int8(o.Closed));
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.ForumName));
	b=b.concat(write_int32(o.Authorid));
	b=b.concat(write_string(o.Author));
	b=b.concat(write_int32(o.Dateline));
	b=b.concat(write_int32(o.Replies));
	b=b.concat(write_int32(o.Views));
	b=b.concat(write_string(o.Lastposter));
	b=b.concat(write_int32(o.Lastpost));
	if(o.Postlist){
		b=b.concat(write_int16(o.Postlist.length))
		for(var i=0;i<o.Postlist.length;i++){
			b=b.concat(write_MSG_SpacePost(o.Postlist[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_SpaceThread(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Tid=r.o
	r=read_string(r.b);
	o.Folder=r.o
	r=read_int8(r.b);
	o.Special=r.o
	r=read_int8(r.b);
	o.Displayorder=r.o
	r=read_string(r.b);
	o.Subject=r.o
	r=read_int8(r.b);
	o.Digest=r.o
	r=read_int8(r.b);
	o.Attachment=r.o
	r=read_int8(r.b);
	o.Multipage=r.o
	r=read_int8(r.b);
	o.Closed=r.o
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.ForumName=r.o
	r=read_int32(r.b);
	o.Authorid=r.o
	r=read_string(r.b);
	o.Author=r.o
	r=read_int32(r.b);
	o.Dateline=r.o
	r=read_int32(r.b);
	o.Replies=r.o
	r=read_int32(r.b);
	o.Views=r.o
	r=read_string(r.b);
	o.Lastposter=r.o
	r=read_int32(r.b);
	o.Lastpost=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Postlist=[]
	for(var i=0;i<l;i++){
		r=read_MSG_SpacePost(r.b)
		o.Postlist.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_SpacePost(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_SpacePost));
	b=b.concat(write_MSG_SpacePost(o));
	return b;
}
function write_MSG_SpacePost(o){
	var b=[];
	b=b.concat(write_int32(o.Position));
	b=b.concat(write_string(o.Message));
	return b
}
function read_MSG_SpacePost(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Position=r.o
	r=read_string(r.b);
	o.Message=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_searchThread(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_searchThread));
	b=b.concat(write_MSG_U2WS_searchThread(o));
	return b;
}
function write_MSG_U2WS_searchThread(o){
	var b=[];
	b=b.concat(write_string(o.Word));
	b=b.concat(write_int16(o.Page));
	return b
}
function read_MSG_U2WS_searchThread(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Word=r.o
	r=read_int16(r.b);
	o.Page=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_searchThread(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_searchThread));
	b=b.concat(write_MSG_WS2U_searchThread(o));
	return b;
}
function write_MSG_WS2U_searchThread(o){
	var b=[];
	if(o.Threadlist){
		b=b.concat(write_int16(o.Threadlist.length))
		for(var i=0;i<o.Threadlist.length;i++){
			b=b.concat(write_MSG_searchThread(o.Threadlist[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_int32(o.Threadcount));
	b=b.concat(write_int64(o.Time));
	return b
}
function read_MSG_WS2U_searchThread(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);var l=r.o;if(l>0)o.Threadlist=[]
	for(var i=0;i<l;i++){
		r=read_MSG_searchThread(r.b)
		o.Threadlist.push(r.o)
	}
	r=read_int32(r.b);
	o.Threadcount=r.o
	r=read_int64(r.b);
	o.Time=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_searchThread(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_searchThread));
	b=b.concat(write_MSG_searchThread(o));
	return b;
}
function write_MSG_searchThread(o){
	var b=[];
	b=b.concat(write_int32(o.Tid));
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.Subject));
	b=b.concat(write_int32(o.Replies));
	b=b.concat(write_int32(o.Views));
	b=b.concat(write_int32(o.Authorid));
	b=b.concat(write_string(o.Author));
	b=b.concat(write_string(o.Post));
	b=b.concat(write_string(o.ForumName));
	b=b.concat(write_string(o.Cutmessage));
	b=b.concat(write_int16(o.Totalpage));
	b=b.concat(write_int32(o.Dateline));
	return b
}
function read_MSG_searchThread(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Tid=r.o
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.Subject=r.o
	r=read_int32(r.b);
	o.Replies=r.o
	r=read_int32(r.b);
	o.Views=r.o
	r=read_int32(r.b);
	o.Authorid=r.o
	r=read_string(r.b);
	o.Author=r.o
	r=read_string(r.b);
	o.Post=r.o
	r=read_string(r.b);
	o.ForumName=r.o
	r=read_string(r.b);
	o.Cutmessage=r.o
	r=read_int16(r.b);
	o.Totalpage=r.o
	r=read_int32(r.b);
	o.Dateline=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_threadmod(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_threadmod));
	b=b.concat(write_MSG_WS2U_threadmod(o));
	return b;
}
function write_MSG_WS2U_threadmod(o){
	var b=[];
	b=b.concat(write_int16(o.Result));
	return b
}
function read_MSG_WS2U_threadmod(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Result=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_spacecp(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_spacecp));
	b=b.concat(write_MSG_U2WS_spacecp(o));
	return b;
}
function write_MSG_U2WS_spacecp(o){
	var b=[];
	b=b.concat(write_string(o.Token));
	return b
}
function read_MSG_U2WS_spacecp(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Token=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_spacecp(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_spacecp));
	b=b.concat(write_MSG_WS2U_spacecp(o));
	return b;
}
function write_MSG_WS2U_spacecp(o){
	var b=[];
	b=b.concat(write_int32(o.Uid));
	b=b.concat(write_string(o.Name));
	b=b.concat(write_int16(o.GroupId));
	b=b.concat(write_int8(o.Allow));
	b=b.concat(write_string(o.Customstatus));
	b=b.concat(write_string(o.Mobile));
	b=b.concat(write_int64(o.Qq));
	b=b.concat(write_string(o.Wx));
	b=b.concat(write_string(o.WebSite));
	b=b.concat(write_string(o.Sightml));
	b=b.concat(write_string(o.GroupTitle));
	if(o.SiteGroups){
		b=b.concat(write_int16(o.SiteGroups.length))
		for(var i=0;i<o.SiteGroups.length;i++){
			b=b.concat(write_MSG_GroupIdName(o.SiteGroups[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.CommonGroups){
		b=b.concat(write_int16(o.CommonGroups.length))
		for(var i=0;i<o.CommonGroups.length;i++){
			b=b.concat(write_MSG_GroupIdName(o.CommonGroups[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_string(o.Email));
	b=b.concat(write_string(o.EmailNew));
	return b
}
function read_MSG_WS2U_spacecp(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Uid=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_int16(r.b);
	o.GroupId=r.o
	r=read_int8(r.b);
	o.Allow=r.o
	r=read_string(r.b);
	o.Customstatus=r.o
	r=read_string(r.b);
	o.Mobile=r.o
	r=read_int64(r.b);
	o.Qq=r.o
	r=read_string(r.b);
	o.Wx=r.o
	r=read_string(r.b);
	o.WebSite=r.o
	r=read_string(r.b);
	o.Sightml=r.o
	r=read_string(r.b);
	o.GroupTitle=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.SiteGroups=[]
	for(var i=0;i<l;i++){
		r=read_MSG_GroupIdName(r.b)
		o.SiteGroups.push(r.o)
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.CommonGroups=[]
	for(var i=0;i<l;i++){
		r=read_MSG_GroupIdName(r.b)
		o.CommonGroups.push(r.o)
	}
	r=read_string(r.b);
	o.Email=r.o
	r=read_string(r.b);
	o.EmailNew=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_tpl_success(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_tpl_success));
	b=b.concat(write_MSG_U2WS_tpl_success(o));
	return b;
}
function write_MSG_U2WS_tpl_success(o){
	var b=[];
	return b
}
function read_MSG_U2WS_tpl_success(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_tpl_success(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_tpl_success));
	b=b.concat(write_MSG_WS2U_tpl_success(o));
	return b;
}
function write_MSG_WS2U_tpl_success(o){
	var b=[];
	return b
}
function read_MSG_WS2U_tpl_success(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_upload_avatar(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_upload_avatar));
	b=b.concat(write_MSG_U2WS_upload_avatar(o));
	return b;
}
function write_MSG_U2WS_upload_avatar(o){
	var b=[];
	b=b.concat(write_byte(o.Imgdata));
	return b
}
function read_MSG_U2WS_upload_avatar(b){
	var o={},r={};r.b=b;
	r=read_byte(r.b);o.Imgdata=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_upload_avatar(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_upload_avatar));
	b=b.concat(write_MSG_WS2U_upload_avatar(o));
	return b;
}
function write_MSG_WS2U_upload_avatar(o){
	var b=[];
	b=b.concat(write_int16(o.Result));
	b=b.concat(write_string(o.Avatar));
	return b
}
function read_MSG_WS2U_upload_avatar(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Result=r.o
	r=read_string(r.b);
	o.Avatar=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Edit_Profile(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Edit_Profile));
	b=b.concat(write_MSG_U2WS_Edit_Profile(o));
	return b;
}
function write_MSG_U2WS_Edit_Profile(o){
	var b=[];
	b=b.concat(write_int64(o.Qq));
	b=b.concat(write_string(o.Wx));
	b=b.concat(write_string(o.Mobile));
	b=b.concat(write_string(o.WebSite));
	b=b.concat(write_string(o.Sightml));
	b=b.concat(write_string(o.Customstatus));
	return b
}
function read_MSG_U2WS_Edit_Profile(b){
	var o={},r={};r.b=b;
	r=read_int64(r.b);
	o.Qq=r.o
	r=read_string(r.b);
	o.Wx=r.o
	r=read_string(r.b);
	o.Mobile=r.o
	r=read_string(r.b);
	o.WebSite=r.o
	r=read_string(r.b);
	o.Sightml=r.o
	r=read_string(r.b);
	o.Customstatus=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_RecommendThread(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_RecommendThread));
	b=b.concat(write_MSG_U2WS_RecommendThread(o));
	return b;
}
function write_MSG_U2WS_RecommendThread(o){
	var b=[];
	b=b.concat(write_int32(o.Tid));
	b=b.concat(write_int8(o.Status));
	return b
}
function read_MSG_U2WS_RecommendThread(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Tid=r.o
	r=read_int8(r.b);
	o.Status=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_RecommendThread(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_RecommendThread));
	b=b.concat(write_MSG_WS2U_RecommendThread(o));
	return b;
}
function write_MSG_WS2U_RecommendThread(o){
	var b=[];
	b=b.concat(write_int8(o.Status));
	b=b.concat(write_int16(o.Result));
	b=b.concat(write_int32(o.Recommend));
	b=b.concat(write_int32(o.Recommend_add));
	b=b.concat(write_int32(o.Recommend_sub));
	return b
}
function read_MSG_WS2U_RecommendThread(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Status=r.o
	r=read_int16(r.b);
	o.Result=r.o
	r=read_int32(r.b);
	o.Recommend=r.o
	r=read_int32(r.b);
	o.Recommend_add=r.o
	r=read_int32(r.b);
	o.Recommend_sub=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_SpacecpGroup(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_SpacecpGroup));
	b=b.concat(write_MSG_U2WS_SpacecpGroup(o));
	return b;
}
function write_MSG_U2WS_SpacecpGroup(o){
	var b=[];
	b=b.concat(write_int16(o.Groupid));
	return b
}
function read_MSG_U2WS_SpacecpGroup(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Groupid=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_GroupIdName(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_GroupIdName));
	b=b.concat(write_MSG_GroupIdName(o));
	return b;
}
function write_MSG_GroupIdName(o){
	var b=[];
	b=b.concat(write_string(o.Name));
	b=b.concat(write_int16(o.Id));
	return b
}
function read_MSG_GroupIdName(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Name=r.o
	r=read_int16(r.b);
	o.Id=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_SpacecpGroup(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_SpacecpGroup));
	b=b.concat(write_MSG_WS2U_SpacecpGroup(o));
	return b;
}
function write_MSG_WS2U_SpacecpGroup(o){
	var b=[];
	b=b.concat(write_int16(o.Groupid));
	b=b.concat(write_string(o.Grouptitle));
	b=b.concat(write_int8(o.Readaccess));
	b=b.concat(write_int16(o.Allow));
	b=b.concat(write_int16(o.Maxsigsize));
	b=b.concat(write_int8(o.Allowrecommend));
	b=b.concat(write_int32(o.Maxattachsize));
	b=b.concat(write_int32(o.Maxsizeperday));
	b=b.concat(write_int16(o.Maxattachnum));
	b=b.concat(write_string(o.Attachextensions));
	return b
}
function read_MSG_WS2U_SpacecpGroup(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Groupid=r.o
	r=read_string(r.b);
	o.Grouptitle=r.o
	r=read_int8(r.b);
	o.Readaccess=r.o
	r=read_int16(r.b);
	o.Allow=r.o
	r=read_int16(r.b);
	o.Maxsigsize=r.o
	r=read_int8(r.b);
	o.Allowrecommend=r.o
	r=read_int32(r.b);
	o.Maxattachsize=r.o
	r=read_int32(r.b);
	o.Maxsizeperday=r.o
	r=read_int16(r.b);
	o.Maxattachnum=r.o
	r=read_string(r.b);
	o.Attachextensions=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_SpacecpForum(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_SpacecpForum));
	b=b.concat(write_MSG_U2WS_SpacecpForum(o));
	return b;
}
function write_MSG_U2WS_SpacecpForum(o){
	var b=[];
	return b
}
function read_MSG_U2WS_SpacecpForum(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_SpacecpForum(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_SpacecpForum));
	b=b.concat(write_MSG_WS2U_SpacecpForum(o));
	return b;
}
function write_MSG_WS2U_SpacecpForum(o){
	var b=[];
	if(o.Catlist){
		b=b.concat(write_int16(o.Catlist.length))
		for(var i=0;i<o.Catlist.length;i++){
			b=b.concat(write_MSG_SpacecpGroupPermission(o.Catlist[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_WS2U_SpacecpForum(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);var l=r.o;if(l>0)o.Catlist=[]
	for(var i=0;i<l;i++){
		r=read_MSG_SpacecpGroupPermission(r.b)
		o.Catlist.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_SpacecpGroupPermission(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_SpacecpGroupPermission));
	b=b.concat(write_MSG_SpacecpGroupPermission(o));
	return b;
}
function write_MSG_SpacecpGroupPermission(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.Name));
	if(o.Child){
		b=b.concat(write_int16(o.Child.length))
		for(var i=0;i<o.Child.length;i++){
			b=b.concat(write_MSG_SpacecpGroupPermission(o.Child[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_int8(o.Allow));
	return b
}
function read_MSG_SpacecpGroupPermission(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Child=[]
	for(var i=0;i<l;i++){
		r=read_MSG_SpacecpGroupPermission(r.b)
		o.Child.push(r.o)
	}
	r=read_int8(r.b);
	o.Allow=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_ChangePasswd_Gethash(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_ChangePasswd_Gethash));
	b=b.concat(write_MSG_U2WS_ChangePasswd_Gethash(o));
	return b;
}
function write_MSG_U2WS_ChangePasswd_Gethash(o){
	var b=[];
	b=b.concat(write_string(o.Seccode));
	return b
}
function read_MSG_U2WS_ChangePasswd_Gethash(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Seccode=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_ChangePasswd_Gethash(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_ChangePasswd_Gethash));
	b=b.concat(write_MSG_WS2U_ChangePasswd_Gethash(o));
	return b;
}
function write_MSG_WS2U_ChangePasswd_Gethash(o){
	var b=[];
	b=b.concat(write_string(o.Hash));
	b=b.concat(write_string(o.Hash2));
	b=b.concat(write_string(o.Hash3));
	return b
}
function read_MSG_WS2U_ChangePasswd_Gethash(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Hash=r.o
	r=read_string(r.b);
	o.Hash2=r.o
	r=read_string(r.b);
	o.Hash3=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_ChangePasswd(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_ChangePasswd));
	b=b.concat(write_MSG_U2WS_ChangePasswd(o));
	return b;
}
function write_MSG_U2WS_ChangePasswd(o){
	var b=[];
	b=b.concat(write_string(o.Passwd));
	b=b.concat(write_byte(o.Newpwd));
	b=b.concat(write_string(o.Email));
	return b
}
function read_MSG_U2WS_ChangePasswd(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Passwd=r.o
	r=read_byte(r.b);o.Newpwd=r.o
	r=read_string(r.b);
	o.Email=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Email_Verify(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Email_Verify));
	b=b.concat(write_MSG_U2WS_Email_Verify(o));
	return b;
}
function write_MSG_U2WS_Email_Verify(o){
	var b=[];
	b=b.concat(write_int32(o.Uid));
	b=b.concat(write_string(o.Code));
	return b
}
function read_MSG_U2WS_Email_Verify(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Uid=r.o
	r=read_string(r.b);
	o.Code=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Email_Verify(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Email_Verify));
	b=b.concat(write_MSG_WS2U_Email_Verify(o));
	return b;
}
function write_MSG_WS2U_Email_Verify(o){
	var b=[];
	b=b.concat(write_int16(o.Result));
	return b
}
function read_MSG_WS2U_Email_Verify(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Result=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_LostPW(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_LostPW));
	b=b.concat(write_MSG_U2WS_LostPW(o));
	return b;
}
function write_MSG_U2WS_LostPW(o){
	var b=[];
	b=b.concat(write_string(o.Name));
	b=b.concat(write_string(o.Seccode));
	return b
}
function read_MSG_U2WS_LostPW(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Name=r.o
	r=read_string(r.b);
	o.Seccode=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_LostPW(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_LostPW));
	b=b.concat(write_MSG_WS2U_LostPW(o));
	return b;
}
function write_MSG_WS2U_LostPW(o){
	var b=[];
	b=b.concat(write_int16(o.Result));
	b=b.concat(write_string(o.Email));
	return b
}
function read_MSG_WS2U_LostPW(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Result=r.o
	r=read_string(r.b);
	o.Email=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_ResetPW(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_ResetPW));
	b=b.concat(write_MSG_U2WS_ResetPW(o));
	return b;
}
function write_MSG_U2WS_ResetPW(o){
	var b=[];
	b=b.concat(write_string(o.Name));
	b=b.concat(write_byte(o.Passwd));
	return b
}
function read_MSG_U2WS_ResetPW(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Name=r.o
	r=read_byte(r.b);o.Passwd=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_ResetPW(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_ResetPW));
	b=b.concat(write_MSG_WS2U_ResetPW(o));
	return b;
}
function write_MSG_WS2U_ResetPW(o){
	var b=[];
	return b
}
function read_MSG_WS2U_ResetPW(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_QQLoginUrl(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_QQLoginUrl));
	b=b.concat(write_MSG_U2WS_QQLoginUrl(o));
	return b;
}
function write_MSG_U2WS_QQLoginUrl(o){
	var b=[];
	return b
}
function read_MSG_U2WS_QQLoginUrl(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_QQLoginUrl(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_QQLoginUrl));
	b=b.concat(write_MSG_WS2U_QQLoginUrl(o));
	return b;
}
function write_MSG_WS2U_QQLoginUrl(o){
	var b=[];
	b=b.concat(write_string(o.Url));
	return b
}
function read_MSG_WS2U_QQLoginUrl(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Url=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_QQLogin(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_QQLogin));
	b=b.concat(write_MSG_U2WS_QQLogin(o));
	return b;
}
function write_MSG_U2WS_QQLogin(o){
	var b=[];
	b=b.concat(write_string(o.Openid));
	b=b.concat(write_string(o.State));
	return b
}
function read_MSG_U2WS_QQLogin(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Openid=r.o
	r=read_string(r.b);
	o.State=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_QQLogin(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_QQLogin));
	b=b.concat(write_MSG_WS2U_QQLogin(o));
	return b;
}
function write_MSG_WS2U_QQLogin(o){
	var b=[];
	b=b.concat(write_int16(o.Result));
	if(o.Head){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_WS2U_Common_Head(o.Head));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_string(o.Openid));
	return b
}
function read_MSG_WS2U_QQLogin(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Result=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_WS2U_Common_Head(r.b);
		o.Head=r.o
	}
	r=read_string(r.b);
	o.Openid=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_BindAccount(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_BindAccount));
	b=b.concat(write_MSG_U2WS_BindAccount(o));
	return b;
}
function write_MSG_U2WS_BindAccount(o){
	var b=[];
	b=b.concat(write_string(o.Type));
	b=b.concat(write_string(o.Openid));
	b=b.concat(write_string(o.Access_token));
	b=b.concat(write_string(o.State));
	return b
}
function read_MSG_U2WS_BindAccount(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Type=r.o
	r=read_string(r.b);
	o.Openid=r.o
	r=read_string(r.b);
	o.Access_token=r.o
	r=read_string(r.b);
	o.State=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_BindAccount(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_BindAccount));
	b=b.concat(write_MSG_WS2U_BindAccount(o));
	return b;
}
function write_MSG_WS2U_BindAccount(o){
	var b=[];
	b=b.concat(write_int16(o.Result));
	b=b.concat(write_string(o.Nickname));
	b=b.concat(write_string(o.Img));
	return b
}
function read_MSG_WS2U_BindAccount(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Result=r.o
	r=read_string(r.b);
	o.Nickname=r.o
	r=read_string(r.b);
	o.Img=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_GetThreadBind(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_GetThreadBind));
	b=b.concat(write_MSG_U2WS_GetThreadBind(o));
	return b;
}
function write_MSG_U2WS_GetThreadBind(o){
	var b=[];
	return b
}
function read_MSG_U2WS_GetThreadBind(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_ThreadBind(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_ThreadBind));
	b=b.concat(write_MSG_ThreadBind(o));
	return b;
}
function write_MSG_ThreadBind(o){
	var b=[];
	b=b.concat(write_string(o.Name));
	b=b.concat(write_string(o.Nickname));
	b=b.concat(write_string(o.Img));
	return b
}
function read_MSG_ThreadBind(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Name=r.o
	r=read_string(r.b);
	o.Nickname=r.o
	r=read_string(r.b);
	o.Img=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_GetThreadBind(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_GetThreadBind));
	b=b.concat(write_MSG_WS2U_GetThreadBind(o));
	return b;
}
function write_MSG_WS2U_GetThreadBind(o){
	var b=[];
	if(o.Thread){
		b=b.concat(write_int16(o.Thread.length))
		for(var i=0;i<o.Thread.length;i++){
			b=b.concat(write_MSG_ThreadBind(o.Thread[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_WS2U_GetThreadBind(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);var l=r.o;if(l>0)o.Thread=[]
	for(var i=0;i<l;i++){
		r=read_MSG_ThreadBind(r.b)
		o.Thread.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_GetChangeBindUrl(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_GetChangeBindUrl));
	b=b.concat(write_MSG_U2WS_GetChangeBindUrl(o));
	return b;
}
function write_MSG_U2WS_GetChangeBindUrl(o){
	var b=[];
	b=b.concat(write_string(o.Type));
	b=b.concat(write_string(o.Passwd));
	return b
}
function read_MSG_U2WS_GetChangeBindUrl(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Type=r.o
	r=read_string(r.b);
	o.Passwd=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_GetChangeBindUrl(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_GetChangeBindUrl));
	b=b.concat(write_MSG_WS2U_GetChangeBindUrl(o));
	return b;
}
function write_MSG_WS2U_GetChangeBindUrl(o){
	var b=[];
	b=b.concat(write_string(o.Type));
	b=b.concat(write_string(o.Url));
	return b
}
function read_MSG_WS2U_GetChangeBindUrl(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Type=r.o
	r=read_string(r.b);
	o.Url=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_ChangeBind(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_ChangeBind));
	b=b.concat(write_MSG_U2WS_ChangeBind(o));
	return b;
}
function write_MSG_U2WS_ChangeBind(o){
	var b=[];
	b=b.concat(write_string(o.Type));
	b=b.concat(write_string(o.State));
	b=b.concat(write_string(o.Openid));
	b=b.concat(write_string(o.Access_token));
	return b
}
function read_MSG_U2WS_ChangeBind(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Type=r.o
	r=read_string(r.b);
	o.State=r.o
	r=read_string(r.b);
	o.Openid=r.o
	r=read_string(r.b);
	o.Access_token=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_ChangeBind(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_ChangeBind));
	b=b.concat(write_MSG_WS2U_ChangeBind(o));
	return b;
}
function write_MSG_WS2U_ChangeBind(o){
	var b=[];
	b=b.concat(write_int16(o.Result));
	b=b.concat(write_string(o.Msg));
	return b
}
function read_MSG_WS2U_ChangeBind(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Result=r.o
	r=read_string(r.b);
	o.Msg=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_Poll_info(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Poll_info));
	b=b.concat(write_MSG_Poll_info(o));
	return b;
}
function write_MSG_Poll_info(o){
	var b=[];
	if(o.Polloption){
		b=b.concat(write_int16(o.Polloption.length))
		for(var i=0;i<o.Polloption.length;i++){
			b=b.concat(write_MSG_poll_option(o.Polloption[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_int8(o.Maxchoices));
	b=b.concat(write_int32(o.Expiration));
	b=b.concat(write_int8(o.Visible));
	b=b.concat(write_int8(o.Overt));
	b=b.concat(write_int32(o.Voterscount));
	b=b.concat(write_int8(o.Isimagepoll));
	b=b.concat(write_int8(o.AllreadyPoll));
	return b
}
function read_MSG_Poll_info(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);var l=r.o;if(l>0)o.Polloption=[]
	for(var i=0;i<l;i++){
		r=read_MSG_poll_option(r.b)
		o.Polloption.push(r.o)
	}
	r=read_int8(r.b);
	o.Maxchoices=r.o
	r=read_int32(r.b);
	o.Expiration=r.o
	r=read_int8(r.b);
	o.Visible=r.o
	r=read_int8(r.b);
	o.Overt=r.o
	r=read_int32(r.b);
	o.Voterscount=r.o
	r=read_int8(r.b);
	o.Isimagepoll=r.o
	r=read_int8(r.b);
	o.AllreadyPoll=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_poll_option(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_poll_option));
	b=b.concat(write_MSG_poll_option(o));
	return b;
}
function write_MSG_poll_option(o){
	var b=[];
	b=b.concat(write_int32(o.Id));
	b=b.concat(write_string(o.Name));
	b=b.concat(write_int8(o.Displayorder));
	b=b.concat(write_int64(o.Aid));
	if(o.Imginfo){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_forum_imgattach(o.Imginfo));
	}else{
		b=b.concat(write_int8(0))
	}
	b=b.concat(write_int32(o.Votes));
	return b
}
function read_MSG_poll_option(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Id=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_int8(r.b);
	o.Displayorder=r.o
	r=read_int64(r.b);
	o.Aid=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_forum_imgattach(r.b);
		o.Imginfo=r.o
	}
	r=read_int32(r.b);
	o.Votes=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_PollThread(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_PollThread));
	b=b.concat(write_MSG_U2WS_PollThread(o));
	return b;
}
function write_MSG_U2WS_PollThread(o){
	var b=[];
	b=b.concat(write_int32(o.Tid));
	if(o.Ids){
		b=b.concat(write_int16(o.Ids.length))
		for(var i=0;i<o.Ids.length;i++){
			b=b.concat(write_int32(o.Ids[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_U2WS_PollThread(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Tid=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Ids=[]
	for(var i=0;i<l;i++){
		r=read_int32(r.b)
		o.Ids.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_PollThread_sucess(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_PollThread_sucess));
	b=b.concat(write_MSG_WS2U_PollThread_sucess(o));
	return b;
}
function write_MSG_WS2U_PollThread_sucess(o){
	var b=[];
	return b
}
function read_MSG_WS2U_PollThread_sucess(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
;
///<jscompress sourcefile="U2ADMIN.js" />
var CMD_MSG_U2WS_Admin_menu_index = 735634866,CMD_MSG_U2WS_Admin_menu_misc_custommenu = 426252242,CMD_MSG_WS2U_Admin_menu_misc_custommenu = 1348090898,CMD_MSG_U2WS_Admin_rebuild_leftmenu = 902427406,CMD_MSG_WS2U_Admin_rebuild_leftmenu = -1580472055,CMD_MSG_WS2U_custommenu = -34596055,CMD_MSG_U2WS_Admin_AddCustommenu = 919505458,CMD_MSG_U2WS_Admin_Edit_custommenu = 699095719,CMD_MSG_U2WS_Admin_menu_setting_basic = -368188665,CMD_MSG_WS2U_Admin_menu_setting_basic = 1479415992,CMD_MSG_U2WS_Admin_edit_setting_basic = 1056482773,CMD_MSG_U2WS_Admin_menu_setting_access = 1779812911,CMD_MSG_WS2U_Admin_menu_setting_access = 830031817,CMD_MSG_Admin_setting_access = 1801302893,CMD_MSG_U2WS_Admin_edit_setting_access = 35425425,CMD_MSG_U2WS_Admin_menu_setting_functions = 98456939,CMD_MSG_WS2U_Admin_menu_setting_functions = 1654141527,CMD_MSG_U2WS_Admin_setting_setnav = -871377362,CMD_MSG_Admin_setting_functions_curscript = 1265224859,CMD_MSG_U2WS_Admin_edit_setting_functions_mod = -371741980,CMD_MSG_Admin_setting_functions_mod = -1667725759,CMD_MSG_U2WS_Admin_edit_setting_functions_heatthread = -511404881,CMD_MSG_Admin_setting_functions_heatthread = 37433885,CMD_MSG_U2WS_Admin_edit_setting_functions_recommend = -1830850073,CMD_MSG_Admin_setting_functions_recommend = 1316147567,CMD_MSG_U2WS_Admin_edit_setting_functions_comment = -848292620,CMD_MSG_Admin_setting_functions_comment = -786656194,CMD_MSG_U2WS_Admin_edit_setting_functions_guide = 206405707,CMD_MSG_Admin_setting_functions_guide = -303705781,CMD_MSG_U2WS_Admin_edit_setting_functions_activity = 1392055914,CMD_MSG_Admin_setting_functions_activity = 693391684,CMD_MSG_setting_activityfield = 1078788684,CMD_MSG_U2WS_Admin_edit_setting_functions_threadexp = -1538758015,CMD_MSG_Admin_setting_functions_threadexp = 2028325385,CMD_MSG_U2WS_Admin_edit_setting_functions_other = 529232478,CMD_MSG_Admin_setting_functions_other = -31251618,CMD_MSG_U2WS_Admin_menu_forums_index = -981386295,CMD_MSG_WS2U_Admin_menu_forums_index = 1534176368,CMD_MSG_admin_forum_cart = 1251023957,CMD_MSG_admin_forum = 2061189765,CMD_MSG_admin_forum_three = 142633269,CMD_MSG_U2WS_Admin_edit_forums_index = -1946743894,CMD_MSG_U2WS_Admin_delete_forum = -1477628465,CMD_MSG_U2WS_Admin_menu_forums_edit = -1405787337,CMD_MSG_WS2U_Admin_menu_forums_edit = 943159600,CMD_MSG_admin_forum_edit_base = -540414860,CMD_MSG_admin_forum_extra = 58375333,CMD_MSG_admin_forum_modrecommen = -1575018876,CMD_MSG_admin_forum_threadsorts = -47517347,CMD_MSG_admin_forum_threadtypes = 1780863600,CMD_MSG_admin_forum_type = -840121397,CMD_MSG_admin_forum_edit_ext = -1505563183,CMD_MSG_U2WS_Admin_menu_forums_moderators = 1006442797,CMD_MSG_WS2U_Admin_menu_forums_moderators = 1555791377,CMD_MSG_admin_forums_moderator = -10820895,CMD_MSG_admin_forums_group = 1959754928,CMD_MSG_U2WS_Admin_Edit_forums_moderator = -295518409;
function WRITE_MSG_U2WS_Admin_menu_index(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_menu_index));
	b=b.concat(write_MSG_U2WS_Admin_menu_index(o));
	return b;
}
function write_MSG_U2WS_Admin_menu_index(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Admin_menu_index(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_menu_misc_custommenu(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_menu_misc_custommenu));
	b=b.concat(write_MSG_U2WS_Admin_menu_misc_custommenu(o));
	return b;
}
function write_MSG_U2WS_Admin_menu_misc_custommenu(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Admin_menu_misc_custommenu(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Admin_menu_misc_custommenu(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Admin_menu_misc_custommenu));
	b=b.concat(write_MSG_WS2U_Admin_menu_misc_custommenu(o));
	return b;
}
function write_MSG_WS2U_Admin_menu_misc_custommenu(o){
	var b=[];
	if(o.Menus){
		b=b.concat(write_int16(o.Menus.length))
		for(var i=0;i<o.Menus.length;i++){
			b=b.concat(write_MSG_WS2U_custommenu(o.Menus[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_WS2U_Admin_menu_misc_custommenu(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);var l=r.o;if(l>0)o.Menus=[]
	for(var i=0;i<l;i++){
		r=read_MSG_WS2U_custommenu(r.b)
		o.Menus.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_rebuild_leftmenu(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_rebuild_leftmenu));
	b=b.concat(write_MSG_U2WS_Admin_rebuild_leftmenu(o));
	return b;
}
function write_MSG_U2WS_Admin_rebuild_leftmenu(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Admin_rebuild_leftmenu(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Admin_rebuild_leftmenu(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Admin_rebuild_leftmenu));
	b=b.concat(write_MSG_WS2U_Admin_rebuild_leftmenu(o));
	return b;
}
function write_MSG_WS2U_Admin_rebuild_leftmenu(o){
	var b=[];
	if(o.Menus){
		b=b.concat(write_int16(o.Menus.length))
		for(var i=0;i<o.Menus.length;i++){
			b=b.concat(write_MSG_WS2U_custommenu(o.Menus[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_WS2U_Admin_rebuild_leftmenu(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);var l=r.o;if(l>0)o.Menus=[]
	for(var i=0;i<l;i++){
		r=read_MSG_WS2U_custommenu(r.b)
		o.Menus.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_custommenu(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_custommenu));
	b=b.concat(write_MSG_WS2U_custommenu(o));
	return b;
}
function write_MSG_WS2U_custommenu(o){
	var b=[];
	b=b.concat(write_string(o.Title));
	b=b.concat(write_int8(o.Displayorder));
	b=b.concat(write_int16(o.Id));
	b=b.concat(write_string(o.Url));
	b=b.concat(write_string(o.Param));
	return b
}
function read_MSG_WS2U_custommenu(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Title=r.o
	r=read_int8(r.b);
	o.Displayorder=r.o
	r=read_int16(r.b);
	o.Id=r.o
	r=read_string(r.b);
	o.Url=r.o
	r=read_string(r.b);
	o.Param=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_AddCustommenu(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_AddCustommenu));
	b=b.concat(write_MSG_U2WS_Admin_AddCustommenu(o));
	return b;
}
function write_MSG_U2WS_Admin_AddCustommenu(o){
	var b=[];
	b=b.concat(write_string(o.Title));
	b=b.concat(write_string(o.Url));
	b=b.concat(write_string(o.Param));
	return b
}
function read_MSG_U2WS_Admin_AddCustommenu(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Title=r.o
	r=read_string(r.b);
	o.Url=r.o
	r=read_string(r.b);
	o.Param=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_Edit_custommenu(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_Edit_custommenu));
	b=b.concat(write_MSG_U2WS_Admin_Edit_custommenu(o));
	return b;
}
function write_MSG_U2WS_Admin_Edit_custommenu(o){
	var b=[];
	if(o.Deletes){
		b=b.concat(write_int16(o.Deletes.length))
		for(var i=0;i<o.Deletes.length;i++){
			b=b.concat(write_int32(o.Deletes[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Edit){
		b=b.concat(write_int16(o.Edit.length))
		for(var i=0;i<o.Edit.length;i++){
			b=b.concat(write_MSG_WS2U_custommenu(o.Edit[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_U2WS_Admin_Edit_custommenu(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);var l=r.o;if(l>0)o.Deletes=[]
	for(var i=0;i<l;i++){
		r=read_int32(r.b)
		o.Deletes.push(r.o)
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Edit=[]
	for(var i=0;i<l;i++){
		r=read_MSG_WS2U_custommenu(r.b)
		o.Edit.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_menu_setting_basic(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_menu_setting_basic));
	b=b.concat(write_MSG_U2WS_Admin_menu_setting_basic(o));
	return b;
}
function write_MSG_U2WS_Admin_menu_setting_basic(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Admin_menu_setting_basic(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Admin_menu_setting_basic(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Admin_menu_setting_basic));
	b=b.concat(write_MSG_WS2U_Admin_menu_setting_basic(o));
	return b;
}
function write_MSG_WS2U_Admin_menu_setting_basic(o){
	var b=[];
	b=b.concat(write_string(o.Setting_bbname));
	b=b.concat(write_string(o.Setting_sitename));
	b=b.concat(write_string(o.Setting_siteurl));
	b=b.concat(write_string(o.Setting_adminemail));
	b=b.concat(write_string(o.Setting_site_qq));
	b=b.concat(write_string(o.Setting_icp));
	b=b.concat(write_int8(o.Setting_boardlicensed));
	b=b.concat(write_string(o.Setting_statcode));
	return b
}
function read_MSG_WS2U_Admin_menu_setting_basic(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Setting_bbname=r.o
	r=read_string(r.b);
	o.Setting_sitename=r.o
	r=read_string(r.b);
	o.Setting_siteurl=r.o
	r=read_string(r.b);
	o.Setting_adminemail=r.o
	r=read_string(r.b);
	o.Setting_site_qq=r.o
	r=read_string(r.b);
	o.Setting_icp=r.o
	r=read_int8(r.b);
	o.Setting_boardlicensed=r.o
	r=read_string(r.b);
	o.Setting_statcode=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_setting_basic(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_setting_basic));
	b=b.concat(write_MSG_U2WS_Admin_edit_setting_basic(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_setting_basic(o){
	var b=[];
	b=b.concat(write_string(o.Setting_bbname));
	b=b.concat(write_string(o.Setting_sitename));
	b=b.concat(write_string(o.Setting_siteurl));
	b=b.concat(write_string(o.Setting_adminemail));
	b=b.concat(write_string(o.Setting_site_qq));
	b=b.concat(write_string(o.Setting_icp));
	b=b.concat(write_int8(o.Setting_boardlicensed));
	b=b.concat(write_string(o.Setting_statcode));
	return b
}
function read_MSG_U2WS_Admin_edit_setting_basic(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Setting_bbname=r.o
	r=read_string(r.b);
	o.Setting_sitename=r.o
	r=read_string(r.b);
	o.Setting_siteurl=r.o
	r=read_string(r.b);
	o.Setting_adminemail=r.o
	r=read_string(r.b);
	o.Setting_site_qq=r.o
	r=read_string(r.b);
	o.Setting_icp=r.o
	r=read_int8(r.b);
	o.Setting_boardlicensed=r.o
	r=read_string(r.b);
	o.Setting_statcode=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_menu_setting_access(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_menu_setting_access));
	b=b.concat(write_MSG_U2WS_Admin_menu_setting_access(o));
	return b;
}
function write_MSG_U2WS_Admin_menu_setting_access(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Admin_menu_setting_access(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Admin_menu_setting_access(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Admin_menu_setting_access));
	b=b.concat(write_MSG_WS2U_Admin_menu_setting_access(o));
	return b;
}
function write_MSG_WS2U_Admin_menu_setting_access(o){
	var b=[];
	if(o.Setting){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_access(o.Setting));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_WS2U_Admin_menu_setting_access(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_access(r.b);
		o.Setting=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_Admin_setting_access(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Admin_setting_access));
	b=b.concat(write_MSG_Admin_setting_access(o));
	return b;
}
function write_MSG_Admin_setting_access(o){
	var b=[];
	b=b.concat(write_int8(o.Regstatus));
	b=b.concat(write_string(o.Regclosemessage));
	b=b.concat(write_string(o.Regname));
	b=b.concat(write_string(o.Sendregisterurl));
	b=b.concat(write_string(o.Reglinkname));
	b=b.concat(write_string(o.Censoruser));
	b=b.concat(write_int8(o.Pwlength));
	b=b.concat(write_int16(o.Strongpw));
	b=b.concat(write_int8(o.Regverify));
	b=b.concat(write_string(o.Areaverifywhite));
	b=b.concat(write_string(o.Ipverifywhite));
	b=b.concat(write_int8(o.Regmaildomain));
	b=b.concat(write_string(o.Maildomainlist));
	b=b.concat(write_int32(o.Regctrl));
	b=b.concat(write_int32(o.Regfloodctrl));
	b=b.concat(write_int32(o.Ipregctrltime));
	b=b.concat(write_string(o.Ipregctrl));
	b=b.concat(write_int8(o.Welcomemsg));
	b=b.concat(write_string(o.Welcomemsgtitle));
	b=b.concat(write_string(o.Welcomemsgtxt));
	b=b.concat(write_int8(o.Bbrules));
	b=b.concat(write_int8(o.Bbrulesforce));
	b=b.concat(write_string(o.Bbrulestxt));
	b=b.concat(write_int32(o.Newbiespan));
	b=b.concat(write_string(o.Ipaccess));
	b=b.concat(write_string(o.Adminipaccess));
	b=b.concat(write_string(o.Domainwhitelist));
	b=b.concat(write_int8(o.Domainwhitelist_affectimg));
	return b
}
function read_MSG_Admin_setting_access(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Regstatus=r.o
	r=read_string(r.b);
	o.Regclosemessage=r.o
	r=read_string(r.b);
	o.Regname=r.o
	r=read_string(r.b);
	o.Sendregisterurl=r.o
	r=read_string(r.b);
	o.Reglinkname=r.o
	r=read_string(r.b);
	o.Censoruser=r.o
	r=read_int8(r.b);
	o.Pwlength=r.o
	r=read_int16(r.b);
	o.Strongpw=r.o
	r=read_int8(r.b);
	o.Regverify=r.o
	r=read_string(r.b);
	o.Areaverifywhite=r.o
	r=read_string(r.b);
	o.Ipverifywhite=r.o
	r=read_int8(r.b);
	o.Regmaildomain=r.o
	r=read_string(r.b);
	o.Maildomainlist=r.o
	r=read_int32(r.b);
	o.Regctrl=r.o
	r=read_int32(r.b);
	o.Regfloodctrl=r.o
	r=read_int32(r.b);
	o.Ipregctrltime=r.o
	r=read_string(r.b);
	o.Ipregctrl=r.o
	r=read_int8(r.b);
	o.Welcomemsg=r.o
	r=read_string(r.b);
	o.Welcomemsgtitle=r.o
	r=read_string(r.b);
	o.Welcomemsgtxt=r.o
	r=read_int8(r.b);
	o.Bbrules=r.o
	r=read_int8(r.b);
	o.Bbrulesforce=r.o
	r=read_string(r.b);
	o.Bbrulestxt=r.o
	r=read_int32(r.b);
	o.Newbiespan=r.o
	r=read_string(r.b);
	o.Ipaccess=r.o
	r=read_string(r.b);
	o.Adminipaccess=r.o
	r=read_string(r.b);
	o.Domainwhitelist=r.o
	r=read_int8(r.b);
	o.Domainwhitelist_affectimg=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_setting_access(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_setting_access));
	b=b.concat(write_MSG_U2WS_Admin_edit_setting_access(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_setting_access(o){
	var b=[];
	if(o.Setting){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_access(o.Setting));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_U2WS_Admin_edit_setting_access(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_access(r.b);
		o.Setting=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_menu_setting_functions(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_menu_setting_functions));
	b=b.concat(write_MSG_U2WS_Admin_menu_setting_functions(o));
	return b;
}
function write_MSG_U2WS_Admin_menu_setting_functions(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Admin_menu_setting_functions(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Admin_menu_setting_functions(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Admin_menu_setting_functions));
	b=b.concat(write_MSG_WS2U_Admin_menu_setting_functions(o));
	return b;
}
function write_MSG_WS2U_Admin_menu_setting_functions(o){
	var b=[];
	if(o.Setting_curscript){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_curscript(o.Setting_curscript));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Setting_mod){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_mod(o.Setting_mod));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Setting_heatthread){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_heatthread(o.Setting_heatthread));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Setting_recommend){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_recommend(o.Setting_recommend));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Setting_comment){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_comment(o.Setting_comment));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Setting_guide){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_guide(o.Setting_guide));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Setting_activity){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_activity(o.Setting_activity));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Setting_threadexp){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_threadexp(o.Setting_threadexp));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Setting_other){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_other(o.Setting_other));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_WS2U_Admin_menu_setting_functions(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_curscript(r.b);
		o.Setting_curscript=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_mod(r.b);
		o.Setting_mod=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_heatthread(r.b);
		o.Setting_heatthread=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_recommend(r.b);
		o.Setting_recommend=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_comment(r.b);
		o.Setting_comment=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_guide(r.b);
		o.Setting_guide=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_activity(r.b);
		o.Setting_activity=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_threadexp(r.b);
		o.Setting_threadexp=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_other(r.b);
		o.Setting_other=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_setting_setnav(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_setting_setnav));
	b=b.concat(write_MSG_U2WS_Admin_setting_setnav(o));
	return b;
}
function write_MSG_U2WS_Admin_setting_setnav(o){
	var b=[];
	b=b.concat(write_string(o.Name));
	b=b.concat(write_int8(o.Status));
	return b
}
function read_MSG_U2WS_Admin_setting_setnav(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Name=r.o
	r=read_int8(r.b);
	o.Status=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_Admin_setting_functions_curscript(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Admin_setting_functions_curscript));
	b=b.concat(write_MSG_Admin_setting_functions_curscript(o));
	return b;
}
function write_MSG_Admin_setting_functions_curscript(o){
	var b=[];
	b=b.concat(write_int8(o.Portalstatus));
	b=b.concat(write_int8(o.Groupstatus));
	b=b.concat(write_int8(o.Followstatus));
	b=b.concat(write_int8(o.Collectionstatus));
	b=b.concat(write_int8(o.Guidestatus));
	b=b.concat(write_int8(o.Feedstatus));
	b=b.concat(write_int8(o.Blogstatus));
	b=b.concat(write_int8(o.Albumstatus));
	b=b.concat(write_int8(o.Sharestatus));
	b=b.concat(write_int8(o.Doingstatus));
	b=b.concat(write_int8(o.Wallstatus));
	b=b.concat(write_int8(o.Rankliststatus));
	return b
}
function read_MSG_Admin_setting_functions_curscript(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Portalstatus=r.o
	r=read_int8(r.b);
	o.Groupstatus=r.o
	r=read_int8(r.b);
	o.Followstatus=r.o
	r=read_int8(r.b);
	o.Collectionstatus=r.o
	r=read_int8(r.b);
	o.Guidestatus=r.o
	r=read_int8(r.b);
	o.Feedstatus=r.o
	r=read_int8(r.b);
	o.Blogstatus=r.o
	r=read_int8(r.b);
	o.Albumstatus=r.o
	r=read_int8(r.b);
	o.Sharestatus=r.o
	r=read_int8(r.b);
	o.Doingstatus=r.o
	r=read_int8(r.b);
	o.Wallstatus=r.o
	r=read_int8(r.b);
	o.Rankliststatus=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_setting_functions_mod(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_setting_functions_mod));
	b=b.concat(write_MSG_U2WS_Admin_edit_setting_functions_mod(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_setting_functions_mod(o){
	var b=[];
	if(o.Setting_mod){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_mod(o.Setting_mod));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_U2WS_Admin_edit_setting_functions_mod(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_mod(r.b);
		o.Setting_mod=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_Admin_setting_functions_mod(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Admin_setting_functions_mod));
	b=b.concat(write_MSG_Admin_setting_functions_mod(o));
	return b;
}
function write_MSG_Admin_setting_functions_mod(o){
	var b=[];
	b=b.concat(write_int8(o.Updatestat));
	b=b.concat(write_int8(o.Modworkstatus));
	b=b.concat(write_int8(o.Maxmodworksmonths));
	b=b.concat(write_int16(o.Losslessdel));
	b=b.concat(write_string(o.Modreasons));
	b=b.concat(write_string(o.Userreasons));
	b=b.concat(write_int8(o.Bannedmessages));
	b=b.concat(write_int8(o.Warninglimit));
	b=b.concat(write_int16(o.Warningexpiration));
	b=b.concat(write_int16(o.Rewardexpiration));
	b=b.concat(write_int8(o.Moddetail));
	return b
}
function read_MSG_Admin_setting_functions_mod(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Updatestat=r.o
	r=read_int8(r.b);
	o.Modworkstatus=r.o
	r=read_int8(r.b);
	o.Maxmodworksmonths=r.o
	r=read_int16(r.b);
	o.Losslessdel=r.o
	r=read_string(r.b);
	o.Modreasons=r.o
	r=read_string(r.b);
	o.Userreasons=r.o
	r=read_int8(r.b);
	o.Bannedmessages=r.o
	r=read_int8(r.b);
	o.Warninglimit=r.o
	r=read_int16(r.b);
	o.Warningexpiration=r.o
	r=read_int16(r.b);
	o.Rewardexpiration=r.o
	r=read_int8(r.b);
	o.Moddetail=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_setting_functions_heatthread(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_setting_functions_heatthread));
	b=b.concat(write_MSG_U2WS_Admin_edit_setting_functions_heatthread(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_setting_functions_heatthread(o){
	var b=[];
	if(o.Setting_heatthread){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_heatthread(o.Setting_heatthread));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_U2WS_Admin_edit_setting_functions_heatthread(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_heatthread(r.b);
		o.Setting_heatthread=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_Admin_setting_functions_heatthread(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Admin_setting_functions_heatthread));
	b=b.concat(write_MSG_Admin_setting_functions_heatthread(o));
	return b;
}
function write_MSG_Admin_setting_functions_heatthread(o){
	var b=[];
	b=b.concat(write_int16(o.Heatthread_period));
	b=b.concat(write_string(o.Heatthread_iconlevels));
	return b
}
function read_MSG_Admin_setting_functions_heatthread(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Heatthread_period=r.o
	r=read_string(r.b);
	o.Heatthread_iconlevels=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_setting_functions_recommend(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_setting_functions_recommend));
	b=b.concat(write_MSG_U2WS_Admin_edit_setting_functions_recommend(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_setting_functions_recommend(o){
	var b=[];
	if(o.Setting_recommend){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_recommend(o.Setting_recommend));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_U2WS_Admin_edit_setting_functions_recommend(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_recommend(r.b);
		o.Setting_recommend=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_Admin_setting_functions_recommend(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Admin_setting_functions_recommend));
	b=b.concat(write_MSG_Admin_setting_functions_recommend(o));
	return b;
}
function write_MSG_Admin_setting_functions_recommend(o){
	var b=[];
	b=b.concat(write_int8(o.Recommendthread_status));
	b=b.concat(write_string(o.Recommendthread_addtext));
	b=b.concat(write_string(o.Recommendthread_subtracttext));
	b=b.concat(write_int8(o.Recommendthread_daycount));
	b=b.concat(write_int8(o.Recommendthread_ownthread));
	b=b.concat(write_string(o.Recommendthread_iconlevels));
	return b
}
function read_MSG_Admin_setting_functions_recommend(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Recommendthread_status=r.o
	r=read_string(r.b);
	o.Recommendthread_addtext=r.o
	r=read_string(r.b);
	o.Recommendthread_subtracttext=r.o
	r=read_int8(r.b);
	o.Recommendthread_daycount=r.o
	r=read_int8(r.b);
	o.Recommendthread_ownthread=r.o
	r=read_string(r.b);
	o.Recommendthread_iconlevels=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_setting_functions_comment(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_setting_functions_comment));
	b=b.concat(write_MSG_U2WS_Admin_edit_setting_functions_comment(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_setting_functions_comment(o){
	var b=[];
	if(o.Setting_comment){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_comment(o.Setting_comment));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_U2WS_Admin_edit_setting_functions_comment(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_comment(r.b);
		o.Setting_comment=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_Admin_setting_functions_comment(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Admin_setting_functions_comment));
	b=b.concat(write_MSG_Admin_setting_functions_comment(o));
	return b;
}
function write_MSG_Admin_setting_functions_comment(o){
	var b=[];
	b=b.concat(write_int8(o.Allowpostcomment));
	b=b.concat(write_int8(o.Commentpostself));
	b=b.concat(write_int8(o.Commentfirstpost));
	b=b.concat(write_int8(o.Commentnumber));
	b=b.concat(write_string(o.Commentitem_0));
	b=b.concat(write_string(o.Commentitem_1));
	b=b.concat(write_string(o.Commentitem_2));
	b=b.concat(write_string(o.Commentitem_3));
	b=b.concat(write_string(o.Commentitem_4));
	b=b.concat(write_string(o.Commentitem_5));
	return b
}
function read_MSG_Admin_setting_functions_comment(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Allowpostcomment=r.o
	r=read_int8(r.b);
	o.Commentpostself=r.o
	r=read_int8(r.b);
	o.Commentfirstpost=r.o
	r=read_int8(r.b);
	o.Commentnumber=r.o
	r=read_string(r.b);
	o.Commentitem_0=r.o
	r=read_string(r.b);
	o.Commentitem_1=r.o
	r=read_string(r.b);
	o.Commentitem_2=r.o
	r=read_string(r.b);
	o.Commentitem_3=r.o
	r=read_string(r.b);
	o.Commentitem_4=r.o
	r=read_string(r.b);
	o.Commentitem_5=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_setting_functions_guide(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_setting_functions_guide));
	b=b.concat(write_MSG_U2WS_Admin_edit_setting_functions_guide(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_setting_functions_guide(o){
	var b=[];
	if(o.Setting_guide){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_guide(o.Setting_guide));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_U2WS_Admin_edit_setting_functions_guide(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_guide(r.b);
		o.Setting_guide=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_Admin_setting_functions_guide(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Admin_setting_functions_guide));
	b=b.concat(write_MSG_Admin_setting_functions_guide(o));
	return b;
}
function write_MSG_Admin_setting_functions_guide(o){
	var b=[];
	b=b.concat(write_int16(o.Heatthread_guidelimit));
	b=b.concat(write_int32(o.Guide_hotdt));
	b=b.concat(write_int32(o.Guide_digestdt));
	return b
}
function read_MSG_Admin_setting_functions_guide(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Heatthread_guidelimit=r.o
	r=read_int32(r.b);
	o.Guide_hotdt=r.o
	r=read_int32(r.b);
	o.Guide_digestdt=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_setting_functions_activity(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_setting_functions_activity));
	b=b.concat(write_MSG_U2WS_Admin_edit_setting_functions_activity(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_setting_functions_activity(o){
	var b=[];
	if(o.Setting_activity){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_activity(o.Setting_activity));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_U2WS_Admin_edit_setting_functions_activity(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_activity(r.b);
		o.Setting_activity=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_Admin_setting_functions_activity(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Admin_setting_functions_activity));
	b=b.concat(write_MSG_Admin_setting_functions_activity(o));
	return b;
}
function write_MSG_Admin_setting_functions_activity(o){
	var b=[];
	b=b.concat(write_string(o.Activitytype));
	b=b.concat(write_int8(o.Activityextnum));
	b=b.concat(write_int8(o.Activitycredit));
	b=b.concat(write_int8(o.Activitypp));
	if(o.Activityfield){
		b=b.concat(write_int16(o.Activityfield.length))
		for(var i=0;i<o.Activityfield.length;i++){
			b=b.concat(write_MSG_setting_activityfield(o.Activityfield[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_Admin_setting_functions_activity(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Activitytype=r.o
	r=read_int8(r.b);
	o.Activityextnum=r.o
	r=read_int8(r.b);
	o.Activitycredit=r.o
	r=read_int8(r.b);
	o.Activitypp=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Activityfield=[]
	for(var i=0;i<l;i++){
		r=read_MSG_setting_activityfield(r.b)
		o.Activityfield.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_setting_activityfield(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_setting_activityfield));
	b=b.concat(write_MSG_setting_activityfield(o));
	return b;
}
function write_MSG_setting_activityfield(o){
	var b=[];
	b=b.concat(write_string(o.Fieldid));
	b=b.concat(write_string(o.Title));
	b=b.concat(write_int8(o.Checked));
	return b
}
function read_MSG_setting_activityfield(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Fieldid=r.o
	r=read_string(r.b);
	o.Title=r.o
	r=read_int8(r.b);
	o.Checked=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_setting_functions_threadexp(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_setting_functions_threadexp));
	b=b.concat(write_MSG_U2WS_Admin_edit_setting_functions_threadexp(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_setting_functions_threadexp(o){
	var b=[];
	if(o.Setting_threadexp){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_threadexp(o.Setting_threadexp));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_U2WS_Admin_edit_setting_functions_threadexp(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_threadexp(r.b);
		o.Setting_threadexp=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_Admin_setting_functions_threadexp(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Admin_setting_functions_threadexp));
	b=b.concat(write_MSG_Admin_setting_functions_threadexp(o));
	return b;
}
function write_MSG_Admin_setting_functions_threadexp(o){
	var b=[];
	b=b.concat(write_int8(o.Repliesrank));
	b=b.concat(write_int8(o.Threadblacklist));
	b=b.concat(write_int8(o.Threadhotreplies));
	b=b.concat(write_int16(o.Threadfilternum));
	b=b.concat(write_int8(o.Nofilteredpost));
	b=b.concat(write_int8(o.Hidefilteredpost));
	b=b.concat(write_int8(o.Filterednovote));
	return b
}
function read_MSG_Admin_setting_functions_threadexp(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Repliesrank=r.o
	r=read_int8(r.b);
	o.Threadblacklist=r.o
	r=read_int8(r.b);
	o.Threadhotreplies=r.o
	r=read_int16(r.b);
	o.Threadfilternum=r.o
	r=read_int8(r.b);
	o.Nofilteredpost=r.o
	r=read_int8(r.b);
	o.Hidefilteredpost=r.o
	r=read_int8(r.b);
	o.Filterednovote=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_setting_functions_other(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_setting_functions_other));
	b=b.concat(write_MSG_U2WS_Admin_edit_setting_functions_other(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_setting_functions_other(o){
	var b=[];
	if(o.Setting_other){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_Admin_setting_functions_other(o.Setting_other));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_U2WS_Admin_edit_setting_functions_other(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_Admin_setting_functions_other(r.b);
		o.Setting_other=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_Admin_setting_functions_other(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_Admin_setting_functions_other));
	b=b.concat(write_MSG_Admin_setting_functions_other(o));
	return b;
}
function write_MSG_Admin_setting_functions_other(o){
	var b=[];
	b=b.concat(write_int8(o.Uidlogin));
	b=b.concat(write_int8(o.Autoidselect));
	b=b.concat(write_int8(o.Oltimespan));
	b=b.concat(write_int8(o.Onlyacceptfriendpm));
	b=b.concat(write_string(o.Pmreportuser));
	b=b.concat(write_int8(o.At_anyone));
	b=b.concat(write_int8(o.Chatpmrefreshtime));
	b=b.concat(write_int16(o.Collectionteamworkernum));
	b=b.concat(write_int8(o.Closeforumorderby));
	b=b.concat(write_int8(o.Disableipnotice));
	b=b.concat(write_int8(o.Darkroom));
	b=b.concat(write_string(o.Globalsightml));
	return b
}
function read_MSG_Admin_setting_functions_other(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Uidlogin=r.o
	r=read_int8(r.b);
	o.Autoidselect=r.o
	r=read_int8(r.b);
	o.Oltimespan=r.o
	r=read_int8(r.b);
	o.Onlyacceptfriendpm=r.o
	r=read_string(r.b);
	o.Pmreportuser=r.o
	r=read_int8(r.b);
	o.At_anyone=r.o
	r=read_int8(r.b);
	o.Chatpmrefreshtime=r.o
	r=read_int16(r.b);
	o.Collectionteamworkernum=r.o
	r=read_int8(r.b);
	o.Closeforumorderby=r.o
	r=read_int8(r.b);
	o.Disableipnotice=r.o
	r=read_int8(r.b);
	o.Darkroom=r.o
	r=read_string(r.b);
	o.Globalsightml=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_menu_forums_index(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_menu_forums_index));
	b=b.concat(write_MSG_U2WS_Admin_menu_forums_index(o));
	return b;
}
function write_MSG_U2WS_Admin_menu_forums_index(o){
	var b=[];
	return b
}
function read_MSG_U2WS_Admin_menu_forums_index(b){
	var o={},r={};r.b=b;
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Admin_menu_forums_index(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Admin_menu_forums_index));
	b=b.concat(write_MSG_WS2U_Admin_menu_forums_index(o));
	return b;
}
function write_MSG_WS2U_Admin_menu_forums_index(o){
	var b=[];
	if(o.Catlist){
		b=b.concat(write_int16(o.Catlist.length))
		for(var i=0;i<o.Catlist.length;i++){
			b=b.concat(write_MSG_admin_forum_cart(o.Catlist[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_WS2U_Admin_menu_forums_index(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);var l=r.o;if(l>0)o.Catlist=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forum_cart(r.b)
		o.Catlist.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forum_cart(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forum_cart));
	b=b.concat(write_MSG_admin_forum_cart(o));
	return b;
}
function write_MSG_admin_forum_cart(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.Name));
	b=b.concat(write_string(o.Moderators));
	b=b.concat(write_int16(o.Displayorder));
	b=b.concat(write_int8(o.Status));
	if(o.Forums){
		b=b.concat(write_int16(o.Forums.length))
		for(var i=0;i<o.Forums.length;i++){
			b=b.concat(write_MSG_admin_forum(o.Forums[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_admin_forum_cart(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_string(r.b);
	o.Moderators=r.o
	r=read_int16(r.b);
	o.Displayorder=r.o
	r=read_int8(r.b);
	o.Status=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Forums=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forum(r.b)
		o.Forums.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forum(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forum));
	b=b.concat(write_MSG_admin_forum(o));
	return b;
}
function write_MSG_admin_forum(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.Moderators));
	b=b.concat(write_string(o.Name));
	b=b.concat(write_int16(o.Displayorder));
	b=b.concat(write_int8(o.Status));
	if(o.Level_three){
		b=b.concat(write_int16(o.Level_three.length))
		for(var i=0;i<o.Level_three.length;i++){
			b=b.concat(write_MSG_admin_forum_three(o.Level_three[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_admin_forum(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.Moderators=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_int16(r.b);
	o.Displayorder=r.o
	r=read_int8(r.b);
	o.Status=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Level_three=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forum_three(r.b)
		o.Level_three.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forum_three(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forum_three));
	b=b.concat(write_MSG_admin_forum_three(o));
	return b;
}
function write_MSG_admin_forum_three(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.Moderators));
	b=b.concat(write_string(o.Name));
	b=b.concat(write_int16(o.Displayorder));
	b=b.concat(write_int8(o.Status));
	return b
}
function read_MSG_admin_forum_three(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.Moderators=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_int16(r.b);
	o.Displayorder=r.o
	r=read_int8(r.b);
	o.Status=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_edit_forums_index(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_edit_forums_index));
	b=b.concat(write_MSG_U2WS_Admin_edit_forums_index(o));
	return b;
}
function write_MSG_U2WS_Admin_edit_forums_index(o){
	var b=[];
	if(o.Forums){
		b=b.concat(write_int16(o.Forums.length))
		for(var i=0;i<o.Forums.length;i++){
			b=b.concat(write_MSG_admin_forum_three(o.Forums[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.NewForums){
		b=b.concat(write_int16(o.NewForums.length))
		for(var i=0;i<o.NewForums.length;i++){
			b=b.concat(write_MSG_admin_forum_three(o.NewForums[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_U2WS_Admin_edit_forums_index(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);var l=r.o;if(l>0)o.Forums=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forum_three(r.b)
		o.Forums.push(r.o)
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.NewForums=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forum_three(r.b)
		o.NewForums.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_delete_forum(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_delete_forum));
	b=b.concat(write_MSG_U2WS_Admin_delete_forum(o));
	return b;
}
function write_MSG_U2WS_Admin_delete_forum(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	return b
}
function read_MSG_U2WS_Admin_delete_forum(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_menu_forums_edit(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_menu_forums_edit));
	b=b.concat(write_MSG_U2WS_Admin_menu_forums_edit(o));
	return b;
}
function write_MSG_U2WS_Admin_menu_forums_edit(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	return b
}
function read_MSG_U2WS_Admin_menu_forums_edit(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Admin_menu_forums_edit(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Admin_menu_forums_edit));
	b=b.concat(write_MSG_WS2U_Admin_menu_forums_edit(o));
	return b;
}
function write_MSG_WS2U_Admin_menu_forums_edit(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_int8(o.Type));
	if(o.Base){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_admin_forum_edit_base(o.Base));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Ext){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_admin_forum_edit_ext(o.Ext));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Modrecommendnew){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_admin_forum_modrecommen(o.Modrecommendnew));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Threadsortsnew){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_admin_forum_threadsorts(o.Threadsortsnew));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Threadtypesnew){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_admin_forum_threadtypes(o.Threadtypesnew));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_WS2U_Admin_menu_forums_edit(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_int8(r.b);
	o.Type=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_admin_forum_edit_base(r.b);
		o.Base=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_admin_forum_edit_ext(r.b);
		o.Ext=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_admin_forum_modrecommen(r.b);
		o.Modrecommendnew=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_admin_forum_threadsorts(r.b);
		o.Threadsortsnew=r.o
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_admin_forum_threadtypes(r.b);
		o.Threadtypesnew=r.o
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forum_edit_base(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forum_edit_base));
	b=b.concat(write_MSG_admin_forum_edit_base(o));
	return b;
}
function write_MSG_admin_forum_edit_base(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.Name));
	if(o.Extranew){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_admin_forum_extra(o.Extranew));
	}else{
		b=b.concat(write_int8(0))
	}
	if(o.Catlist){
		b=b.concat(write_int16(o.Catlist.length))
		for(var i=0;i<o.Catlist.length;i++){
			b=b.concat(write_MSG_admin_forum_cart(o.Catlist[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	b=b.concat(write_int32(o.Fup));
	b=b.concat(write_int8(o.Forumcolumns));
	b=b.concat(write_int8(o.Catforumcolumns));
	b=b.concat(write_string(o.Icon));
	b=b.concat(write_byte(o.File));
	b=b.concat(write_int8(o.Status));
	b=b.concat(write_int8(o.Shownav));
	b=b.concat(write_string(o.Description));
	b=b.concat(write_string(o.Rules));
	b=b.concat(write_int8(o.Recommend));
	return b
}
function read_MSG_admin_forum_edit_base(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_admin_forum_extra(r.b);
		o.Extranew=r.o
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Catlist=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forum_cart(r.b)
		o.Catlist.push(r.o)
	}
	r=read_int32(r.b);
	o.Fup=r.o
	r=read_int8(r.b);
	o.Forumcolumns=r.o
	r=read_int8(r.b);
	o.Catforumcolumns=r.o
	r=read_string(r.b);
	o.Icon=r.o
	r=read_byte(r.b);o.File=r.o
	r=read_int8(r.b);
	o.Status=r.o
	r=read_int8(r.b);
	o.Shownav=r.o
	r=read_string(r.b);
	o.Description=r.o
	r=read_string(r.b);
	o.Rules=r.o
	r=read_int8(r.b);
	o.Recommend=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forum_extra(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forum_extra));
	b=b.concat(write_MSG_admin_forum_extra(o));
	return b;
}
function write_MSG_admin_forum_extra(o){
	var b=[];
	b=b.concat(write_int16(o.Iconwidth));
	b=b.concat(write_string(o.Namecolor));
	return b
}
function read_MSG_admin_forum_extra(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Iconwidth=r.o
	r=read_string(r.b);
	o.Namecolor=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forum_modrecommen(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forum_modrecommen));
	b=b.concat(write_MSG_admin_forum_modrecommen(o));
	return b;
}
function write_MSG_admin_forum_modrecommen(o){
	var b=[];
	b=b.concat(write_string(o.Open));
	b=b.concat(write_string(o.Sort));
	b=b.concat(write_string(o.Orderby));
	b=b.concat(write_string(o.Num));
	b=b.concat(write_string(o.Imagenum));
	b=b.concat(write_string(o.Imagewidth));
	b=b.concat(write_string(o.Imageheight));
	b=b.concat(write_string(o.Maxlength));
	b=b.concat(write_string(o.Cachelife));
	b=b.concat(write_string(o.Dateline));
	return b
}
function read_MSG_admin_forum_modrecommen(b){
	var o={},r={};r.b=b;
	r=read_string(r.b);
	o.Open=r.o
	r=read_string(r.b);
	o.Sort=r.o
	r=read_string(r.b);
	o.Orderby=r.o
	r=read_string(r.b);
	o.Num=r.o
	r=read_string(r.b);
	o.Imagenum=r.o
	r=read_string(r.b);
	o.Imagewidth=r.o
	r=read_string(r.b);
	o.Imageheight=r.o
	r=read_string(r.b);
	o.Maxlength=r.o
	r=read_string(r.b);
	o.Cachelife=r.o
	r=read_string(r.b);
	o.Dateline=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forum_threadsorts(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forum_threadsorts));
	b=b.concat(write_MSG_admin_forum_threadsorts(o));
	return b;
}
function write_MSG_admin_forum_threadsorts(o){
	var b=[];
	b=b.concat(write_int8(o.Status));
	b=b.concat(write_string(o.Required));
	b=b.concat(write_string(o.Prefix));
	b=b.concat(write_string(o.Default));
	return b
}
function read_MSG_admin_forum_threadsorts(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Status=r.o
	r=read_string(r.b);
	o.Required=r.o
	r=read_string(r.b);
	o.Prefix=r.o
	r=read_string(r.b);
	o.Default=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forum_threadtypes(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forum_threadtypes));
	b=b.concat(write_MSG_admin_forum_threadtypes(o));
	return b;
}
function write_MSG_admin_forum_threadtypes(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_int8(o.Status));
	b=b.concat(write_int8(o.Required));
	b=b.concat(write_int8(o.Listable));
	b=b.concat(write_int8(o.Prefix));
	if(o.Types){
		b=b.concat(write_int16(o.Types.length))
		for(var i=0;i<o.Types.length;i++){
			b=b.concat(write_MSG_admin_forum_type(o.Types[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Add){
		b=b.concat(write_int16(o.Add.length))
		for(var i=0;i<o.Add.length;i++){
			b=b.concat(write_MSG_admin_forum_type(o.Add[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Deletes){
		b=b.concat(write_int16(o.Deletes.length))
		for(var i=0;i<o.Deletes.length;i++){
			b=b.concat(write_int16(o.Deletes[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_admin_forum_threadtypes(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_int8(r.b);
	o.Status=r.o
	r=read_int8(r.b);
	o.Required=r.o
	r=read_int8(r.b);
	o.Listable=r.o
	r=read_int8(r.b);
	o.Prefix=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Types=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forum_type(r.b)
		o.Types.push(r.o)
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Add=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forum_type(r.b)
		o.Add.push(r.o)
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Deletes=[]
	for(var i=0;i<l;i++){
		r=read_int16(r.b)
		o.Deletes.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forum_type(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forum_type));
	b=b.concat(write_MSG_admin_forum_type(o));
	return b;
}
function write_MSG_admin_forum_type(o){
	var b=[];
	b=b.concat(write_int16(o.Id));
	b=b.concat(write_int16(o.Displayorder));
	b=b.concat(write_string(o.Name));
	b=b.concat(write_string(o.Icon));
	b=b.concat(write_int8(o.Enable));
	b=b.concat(write_int8(o.Moderators));
	return b
}
function read_MSG_admin_forum_type(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Id=r.o
	r=read_int16(r.b);
	o.Displayorder=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_string(r.b);
	o.Icon=r.o
	r=read_int8(r.b);
	o.Enable=r.o
	r=read_int8(r.b);
	o.Moderators=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forum_edit_ext(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forum_edit_ext));
	b=b.concat(write_MSG_admin_forum_edit_ext(o));
	return b;
}
function write_MSG_admin_forum_edit_ext(o){
	var b=[];
	b=b.concat(write_int8(o.Forumcolumns));
	return b
}
function read_MSG_admin_forum_edit_ext(b){
	var o={},r={};r.b=b;
	r=read_int8(r.b);
	o.Forumcolumns=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_menu_forums_moderators(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_menu_forums_moderators));
	b=b.concat(write_MSG_U2WS_Admin_menu_forums_moderators(o));
	return b;
}
function write_MSG_U2WS_Admin_menu_forums_moderators(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	return b
}
function read_MSG_U2WS_Admin_menu_forums_moderators(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_WS2U_Admin_menu_forums_moderators(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_WS2U_Admin_menu_forums_moderators));
	b=b.concat(write_MSG_WS2U_Admin_menu_forums_moderators(o));
	return b;
}
function write_MSG_WS2U_Admin_menu_forums_moderators(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	b=b.concat(write_string(o.Name));
	if(o.Moderators){
		b=b.concat(write_int16(o.Moderators.length))
		for(var i=0;i<o.Moderators.length;i++){
			b=b.concat(write_MSG_admin_forums_moderator(o.Moderators[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Groups){
		b=b.concat(write_int16(o.Groups.length))
		for(var i=0;i<o.Groups.length;i++){
			b=b.concat(write_MSG_admin_forums_group(o.Groups[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	return b
}
function read_MSG_WS2U_Admin_menu_forums_moderators(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Moderators=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forums_moderator(r.b)
		o.Moderators.push(r.o)
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Groups=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forums_group(r.b)
		o.Groups.push(r.o)
	}
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forums_moderator(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forums_moderator));
	b=b.concat(write_MSG_admin_forums_moderator(o));
	return b;
}
function write_MSG_admin_forums_moderator(o){
	var b=[];
	b=b.concat(write_int32(o.Uid));
	b=b.concat(write_int16(o.Displayorder));
	b=b.concat(write_string(o.Name));
	b=b.concat(write_int16(o.Groupid));
	return b
}
function read_MSG_admin_forums_moderator(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Uid=r.o
	r=read_int16(r.b);
	o.Displayorder=r.o
	r=read_string(r.b);
	o.Name=r.o
	r=read_int16(r.b);
	o.Groupid=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_admin_forums_group(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_admin_forums_group));
	b=b.concat(write_MSG_admin_forums_group(o));
	return b;
}
function write_MSG_admin_forums_group(o){
	var b=[];
	b=b.concat(write_int16(o.Groupid));
	b=b.concat(write_string(o.Groupname));
	return b
}
function read_MSG_admin_forums_group(b){
	var o={},r={};r.b=b;
	r=read_int16(r.b);
	o.Groupid=r.o
	r=read_string(r.b);
	o.Groupname=r.o
	return {o:o,b:r.b}
}
function WRITE_MSG_U2WS_Admin_Edit_forums_moderator(o){
	var b=[];
	b=b.concat(write_int32(CMD_MSG_U2WS_Admin_Edit_forums_moderator));
	b=b.concat(write_MSG_U2WS_Admin_Edit_forums_moderator(o));
	return b;
}
function write_MSG_U2WS_Admin_Edit_forums_moderator(o){
	var b=[];
	b=b.concat(write_int32(o.Fid));
	if(o.Deletes){
		b=b.concat(write_int16(o.Deletes.length))
		for(var i=0;i<o.Deletes.length;i++){
			b=b.concat(write_int32(o.Deletes[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Edit){
		b=b.concat(write_int16(o.Edit.length))
		for(var i=0;i<o.Edit.length;i++){
			b=b.concat(write_MSG_admin_forums_moderator(o.Edit[i]));
		}
	}else{
		b=b.concat([0,0])
	}
	if(o.Add){
		b=b.concat(write_int8(1))
		b=b.concat(write_MSG_admin_forums_moderator(o.Add));
	}else{
		b=b.concat(write_int8(0))
	}
	return b
}
function read_MSG_U2WS_Admin_Edit_forums_moderator(b){
	var o={},r={};r.b=b;
	r=read_int32(r.b);
	o.Fid=r.o
	r=read_int16(r.b);var l=r.o;if(l>0)o.Deletes=[]
	for(var i=0;i<l;i++){
		r=read_int32(r.b)
		o.Deletes.push(r.o)
	}
	r=read_int16(r.b);var l=r.o;if(l>0)o.Edit=[]
	for(var i=0;i<l;i++){
		r=read_MSG_admin_forums_moderator(r.b)
		o.Edit.push(r.o)
	}
	r=read_int8(r.b);var l=r.o;
	if(l>0){
		r=read_MSG_admin_forums_moderator(r.b);
		o.Add=r.o
	}
	return {o:o,b:r.b}
}
;
///<jscompress sourcefile="common.js" />
/*
	[Discuz!] (C)2001-2099 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$Id: common.js 36359 2017-01-20 05:06:45Z nemohou $
*/

var token=[],uploadurl="https://ftp.jachun.com:440/upload",check_token=getcookie('check_token'),apilist=["http://192.168.1.136:80"],getapi=false,h5state={},tpl=false,js=false,td=false;
var err={
	"0":"操作失败",
	"-1":"数据库操作失败",
	"-2":"token错误",
	"-3":"无法解析的返回结果",
	"-4":"登录失败",
	"-5":"账号或者密码错误",
	"-6":"账号冻结停用",
	"-7":"您需要先登录才能继续本操作",
	"-8":"验证码错误",
	"-9":"参数错误，请刷新页面重试",
	"-10":"包含敏感词无法操作",
	"-11":"没有找到板块",
	"-12":"没有找到用户",
	"-13":"用户组错误",
	"-14":"您所在的用户组没有权限操作",
	"-15":"主题不存在",
	"-16":"回复不存在",
	"-17":"标题含有敏感词，请修改后再试",
	"-18":"请选择主题分类",
	"-19":"当前论坛，您没有发布投票权限",
	"-20":"当前论坛，您没有发布商品权限",
	"-21":"当前论坛，您没有发布悬赏权限",
	"-22":"当前论坛，您没有发布活动权限",
	"-23":"当前论坛，您没有发布辩论权限",
	"-24":"标题或者内容不能为空",
	"-25":"内容太长",
	"-26":"内容太短",
	"-27":"发帖间隔太短，请稍后再试",
	"-28":"超过每小时发帖限制，请稍后再试",
	"-29":"标签含有敏感词，请修改后再试",
	"-30":"新增标签失败",
	"-31":"新增主题数据失败",
	"-32":"更新管理数据失败",
	"-33":"更新积分数据失败",
	"-34":"更新个人空间信息失败",
	"-35":"新增回复数据失败",
	"-36":"新增沙发数据失败",
	"-37":"主题不允许的操作类型",
	"-38":"该楼层不存在",
	"-39":"每天可以上传的附件数量已达上限",
	"-40":"每天可以上传的附件文件大小已达上限",
	"-41":"不支持的图片格式",
	"-42":"当前帖子已关闭，不再接受新内容",
	"-43":"CDN刷新失败",
	"-44":"签名内容太长，请缩短重试",
	"-45":"已经对该贴操作支持反对",
	"-46":"点评功能未开启",
	"-47":"不能点评自己的帖子",
	"-48":"邮件发送太频繁,请稍后再试",
	"-49":"邮箱格式不合法",
	"-50":"该账号已经注册",
	"-51":"找不到用户组信息",
	"-52":"创建用户失败",
	"-53":"创建用户统计信息失败",
	"-54":"创建用户论坛信息失败",
	"-55":"邮箱验证失败，请重发邮件再试",
	"-56":"该邮箱已经被使用,请换一个再试",
	"-57":"邮件发送失败，请联系管理员",
	"-58":"该用户邮箱未激活，无法使用这个功能",
	"-59":"email验证码不正确或者已超时",
	"-60":"QQ登录失败，请重新登录",
	"-61":"该QQ已经绑定其他账号，请直接登录",
	"-62":"选项不能为空",
	"-63":"最多可选数量错误",
	"-64":"记票天数不能为负",
	"-65":"只能有2-10个选项",
	"-66":"服务器文件读写失败，请截图反馈给管理",
	"-67":"投票详情未找到",
	"-68":"投票选项未找到",
	"-69":"修改投票详情失败",
	"-70":"修改投票选项失败",
	"-71":"投票图片上传失败，请刷新页面重新上传",
	"-72":"您已经投过票了",
	"-73":"必须提交有一个有效选项",
	"-74":"更新帖子信息失败",
	"-75":"更新论坛数据失败",
	"-76":"密码长度太短",
	"-77":"帖子操作类型错误",
	"-78":"当前操作已超时，请刷新再试",
	"-79":"处理中请稍等，请勿重复提交数据",
},jpg_webp=new RegExp(/(Chrome|Android\s*[^123])/i).test(navigator.userAgent)?"1":"0",cache={todaytime:getdatetimestamp(),styleimgdir:'/template/zvis_6_ui/src',imgdir:IMGDIR,STATICURL:STATICURL,forum_colorarray:['', '#EE1B2E', '#EE5023', '#996600', '#3C9D40', '#2897C5', '#2B65B7', '#8F2A90', '#EC1282']},timestamp_offset=0,time_zone=new Date().getTimezoneOffset()/-60,oldtplname='',uid=0,websocket,websocket_func={},websocket_data=[],tpl_callback;
if(loadUserdata('token') && loadUserdata('token').length==16){
	for(var i=0;i<16;i++){
		token.push(loadUserdata('token').charCodeAt(i))
	}
}
saveUserdata("apiurl","http://127.0.0.1:80")
function $(id) {
	r=document.getElementById(id)
	if(r!=undefined){
		return r
	}
	if(typeof id =="function"){
		return jQuery(id);
	}

	if(typeof id =="object" ){
		if(id instanceof HTMLInputElement || id instanceof HTMLAnchorElement || id instanceof HTMLSelectElement){
			return jQuery(id);
		}
		return
	}
	if(typeof id !="string"){
		return
	}

	if(id.match(/input|textarea|javascript:|table|head/) || id.match(/\S+\[\S+="[^"]+"]/)){

	}else{

		if(id.match(/#|\./)){
		
		}else{

			return
		}
	}
	return jQuery(id)
}

function $C(classname, ele, tag) {
	var returns = [];
	ele = ele || document;
	tag = tag || '*';
	if(ele.getElementsByClassName) {
		var eles = ele.getElementsByClassName(classname);
		if(tag != '*') {
			for (var i = 0, L = eles.length; i < L; i++) {
				if (eles[i].tagName.toLowerCase() == tag.toLowerCase()) {
						returns.push(eles[i]);
				}
			}
		} else {
			returns = eles;
		}
	}else {
		eles = ele.getElementsByTagName(tag);
		var pattern = new RegExp("(^|\\s)"+classname+"(\\s|$)");
		for (i = 0, L = eles.length; i < L; i++) {
				if (pattern.test(eles[i].className)) {
						returns.push(eles[i]);
				}
		}
	}
	return returns;
}

function _attachEvent(obj, evt, func, eventobj) {
	eventobj = !eventobj ? obj : eventobj;
	if(obj.addEventListener) {
		obj.addEventListener(evt, func, false);
	} else if(eventobj.attachEvent) {
		obj.attachEvent('on' + evt, func);
	}
}

function _detachEvent(obj, evt, func, eventobj) {
	eventobj = !eventobj ? obj : eventobj;
	if(obj.removeEventListener) {
		obj.removeEventListener(evt, func, false);
	} else if(eventobj.detachEvent) {
		obj.detachEvent('on' + evt, func);
	}
}

function browserVersion(types) {
	var other = 1;
	for(i in types) {
		var v = types[i] ? types[i] : i;
		if(USERAGENT.indexOf(v) != -1) {
			var re = new RegExp(v + '(\\/|\\s|:)([\\d\\.]+)', 'ig');
			var matches = re.exec(USERAGENT);
			var ver = matches != null ? matches[2] : 0;
			other = ver !== 0 && v != 'mozilla' ? 0 : other;
		}else {
			var ver = 0;
		}
		eval('BROWSER.' + i + '= ver');
	}
	BROWSER.other = other;
}

function getEvent() {
	if(document.all) return window.event;
	func = getEvent.caller;
	while(func != null) {
		var arg0 = func.arguments[0];
		if (arg0) {
			if((arg0.constructor  == Event || arg0.constructor == MouseEvent) || (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
				return arg0;
			}
		}
		func=func.caller;
	}
	return null;
}

function isUndefined(variable) {
	return typeof variable == 'undefined' ? true : false;
}

function in_array(needle, haystack) {
	if(typeof needle == 'string' || typeof needle == 'number') {
		for(var i in haystack) {
			if(haystack[i] == needle) {
					return true;
			}
		}
	}
	return false;
}

function trim(str) {
	return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '');
}

function strlen(str) {
	return (BROWSER.ie && str.indexOf('\n') != -1) ? str.replace(/\r?\n/g, '_').length : str.length;
}

function mb_strlen(str) {
	var len = 0;
	for(var i = 0; i < str.length; i++) {
		len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (charset == 'utf-8' ? 3 : 2) : 1;
	}
	return len;
}

function mb_cutstr(str, maxlen, dot) {
	var len = 0;
	var ret = '';
	var dot = !dot ? '...' : dot;
	maxlen = maxlen - dot.length;
	for(var i = 0; i < str.length; i++) {
		len += str.charCodeAt(i) < 0 || str.charCodeAt(i) > 255 ? (charset == 'utf-8' ? 3 : 2) : 1;
		if(len > maxlen) {
			ret += dot;
			break;
		}
		ret += str.substr(i, 1);
	}
	return ret;
}

function preg_replace(search, replace, str, regswitch) {
	var regswitch = !regswitch ? 'ig' : regswitch;
	var len = search.length;
	for(var i = 0; i < len; i++) {
		re = new RegExp(search[i], regswitch);
		str = str.replace(re, typeof replace == 'string' ? replace : (replace[i] ? replace[i] : replace[0]));
	}
	return str;
}

function htmlspecialchars(str) {
	return preg_replace(['&', '<', '>', '"'], ['&amp;', '&lt;', '&gt;', '&quot;'], str);
}

function display(id) {
	var obj = $(id);
	if(obj.style.visibility) {
		obj.style.visibility = obj.style.visibility == 'visible' ? 'hidden' : 'visible';
	} else {
		obj.style.display = obj.style.display == '' ? 'none' : '';
	}
}

function checkall(form, prefix, checkall) {
	var checkall = checkall ? checkall : 'chkall';
	count = 0;
	for(var i = 0; i < form.elements.length; i++) {
		var e = form.elements[i];
		if(e.name && e.name != checkall && !e.disabled && (!prefix || (prefix && e.name.match(prefix)))) {
			e.checked = form.elements[checkall].checked;
			if(e.checked) {
				count++;
			}
		}
	}
	return count;
}

function setcookie(cookieName, cookieValue, seconds, path, domain, secure) {
	if(cookieValue == '' || seconds < 0) {
		cookieValue = '';
		seconds = -2592000;
	}
	if(seconds) {
		var expires = new Date();
		expires.setTime(expires.getTime() + seconds * 1000);
	}
	domain = !domain ? cookiedomain : domain;
	path = !path ? cookiepath : path;
	document.cookie = escape(cookieName) + '=' + escape(cookieValue)
		+ (expires ? '; expires=' + expires.toGMTString() : '')
		+ (path ? '; path=' + path : '/')
		+ (domain ? '; domain=' + domain : '')
		+ (secure ? '; secure' : '');
}

function getcookie(name, nounescape) {
	var cookie_start = document.cookie.indexOf(name);
	var cookie_end = document.cookie.indexOf(";", cookie_start);
	if(cookie_start == -1) {
		return '';
	} else {
		var v = document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length));
		return !nounescape ? unescape(v) : v;
	}
}



function getHost(url) {
	var host = "null";
	if(typeof url == "undefined"|| null == url) {
		url = window.location.href;
	}
	var regex = /^\w+\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if(typeof match != "undefined" && null != match) {
		host = match[1];
	}
	return host;
}

function hostconvert(url) {
	if(!url.match(/^https?:\/\//)) url = SITEURL + url;
	var url_host = getHost(url);
	var cur_host = getHost().toLowerCase();
	if(url_host && cur_host != url_host) {
		url = url.replace(url_host, cur_host);
	}
	return url;
}

function newfunction(func) {
	var args = [];
	for(var i=1; i<arguments.length; i++) args.push(arguments[i]);
	return function(event) {
		doane(event);
		window[func].apply(window, args);
		return false;
	}
}

function evalscript(s) {
	if(s.indexOf('<script') == -1) return s;
	var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
	var arr = [];
	while(arr = p.exec(s)) {
		var p1 = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;
		var arr1 = [];
		arr1 = p1.exec(arr[0]);
		if(arr1) {
			appendscript(arr1[1], '', arr1[2], arr1[3]);
		} else {
			p1 = /<script(.*?)>([^\x00]+?)<\/script>/i;
			arr1 = p1.exec(arr[0]);
			appendscript('', arr1[2], arr1[1].indexOf('reload=') != -1);
		}
	}
	return s;
}


function safescript(id, call, seconds, times, timeoutcall, endcall, index) {
	seconds = seconds || 1000;
	times = times || 0;
	var checked = true;
	try {
		if(typeof call == 'function') {
			call();
		} else {
			eval(call);
		}
	} catch(e) {
		checked = false;
	}
	if(!checked) {
		if(!safescripts[id] || !index) {
			safescripts[id] = safescripts[id] || [];
			safescripts[id].push({
				'times':0,
				'si':setInterval(function () {
					safescript(id, call, seconds, times, timeoutcall, endcall, safescripts[id].length);
				}, seconds)
			});
		} else {
			index = (index || 1) - 1;
			safescripts[id][index]['times']++;
			if(safescripts[id][index]['times'] >= times) {
				clearInterval(safescripts[id][index]['si']);
				if(typeof timeoutcall == 'function') {
					timeoutcall();
				} else {
					eval(timeoutcall);
				}
			}
		}
	} else {
		try {
			index = (index || 1) - 1;
			if(safescripts[id][index]['si']) {
				clearInterval(safescripts[id][index]['si']);
			}
			if(typeof endcall == 'function') {
				endcall();
			} else {
				eval(endcall);
			}
		} catch(e) {}
	}
}

function $F(func, args, script) {
	var run = function () {
		var argc = args.length, s = '';
		for(i = 0;i < argc;i++) {
			s += ',args[' + i + ']';
		}
		eval('var check = typeof ' + func + ' == \'function\'');
		if(check) {
			eval(func + '(' + s.substr(1) + ')');
		} else {
			setTimeout(function () {checkrun();}, 50);
		}
	};
	var checkrun = function () {
		if(JSLOADED[src]) {
			run();
		} else {
			setTimeout(function () {checkrun();}, 50);
		}
	};
	script = script || 'common_extra';
	src = JSPATH + script + '.js';
	if(!JSLOADED[src]) {
		appendscript(src);
	}
	return checkrun();
}

function appendscript(src, text, reload, charset) {
	var id = hash(src + text);
	if(!reload && in_array(id, evalscripts)) return;
	if(reload && $(id)) {
		$(id).parentNode.removeChild($(id));
	}

	evalscripts.push(id);
	var scriptNode = document.createElement("script");
	scriptNode.type = "text/javascript";
	scriptNode.id = id;
	scriptNode.charset = charset ? charset : (BROWSER.firefox ? document.characterSet : document.charset);
	try {
		if(src) {
			scriptNode.src = src;
			scriptNode.onloadDone = false;
			scriptNode.onload = function () {
				scriptNode.onloadDone = true;
				JSLOADED[src] = 1;
			};
			scriptNode.onreadystatechange = function () {
				if((scriptNode.readyState == 'loaded' || scriptNode.readyState == 'complete') && !scriptNode.onloadDone) {
					scriptNode.onloadDone = true;
					JSLOADED[src] = 1;
				}
			};
		} else if(text){
			scriptNode.text = text;
		}
		document.getElementsByTagName('head')[0].appendChild(scriptNode);
	} catch(e) {}
}

function hash(string, length) {
	var length = length ? length : 32;
	var start = 0;
	var i = 0;
	var result = '';
	filllen = length - string.length % length;
	for(i = 0; i < filllen; i++){
		string += "0";
	}
	while(start < string.length) {
		result = stringxor(result, string.substr(start, length));
		start += length;
	}
	return result;
}

function stringxor(s1, s2) {
	var s = '';
	var hash = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var max = Math.max(s1.length, s2.length);
	for(var i=0; i<max; i++) {
		var k = s1.charCodeAt(i) ^ s2.charCodeAt(i);
		s += hash.charAt(k % 52);
	}
	return s;
}







function showPreview(val, id) {
	var showObj = $(id);
	if(showObj) {
		showObj.innerHTML = val.replace(/\n/ig, "<bupdateseccoder />");
	}
}

function showloading(display, waiting) {
	var display = display ? display : 'block';
	var waiting = waiting ? waiting : '请稍候...';
	$('ajaxwaitid').innerHTML = waiting;
	$('ajaxwaitid').style.display = display;
}

function doane(event, preventDefault, stopPropagation) {
	var preventDefault = isUndefined(preventDefault) ? 1 : preventDefault;
	var stopPropagation = isUndefined(stopPropagation) ? 1 : stopPropagation;
	e = event ? event : window.event;
	if(!e) {
		e = getEvent();
	}
	if(!e) {
		return null;
	}
	if(preventDefault) {
		if(e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
	}
	if(stopPropagation) {
		if(e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	}
	return e;
}
function loadcss(cssname) {
	if(!CSSLOADED[cssname]) {
		var csspath = (typeof CSSPATH == 'undefined' ? 'data/cache/style_' : CSSPATH);
		if(!$('css_' + cssname)) {
			css = document.createElement('link');
			css.id = 'css_' + cssname,
			css.type = 'text/css';
			css.rel = 'stylesheet';
			css.href = csspath + STYLEID + '_' + cssname + '.css' ;
			var headNode = document.getElementsByTagName("head")[0];
			headNode.appendChild(css);
		} else {
			$('css_' + cssname).href = csspath + STYLEID + '_' + cssname ;
		}
		CSSLOADED[cssname] = 1;
	}
}
function showMenu(v) {
	var ctrlid = isUndefined(v['ctrlid']) ? v : v['ctrlid'];
	var showid = isUndefined(v['showid']) ? ctrlid : v['showid'];
	var menuid = isUndefined(v['menuid']) ? showid + '_menu' : v['menuid'];
	var ctrlObj = $(ctrlid);
	var menuObj = $(menuid);
	if(!menuObj) return;
	var mtype = isUndefined(v['mtype']) ? 'menu' : v['mtype'];
	var evt = isUndefined(v['evt']) ? 'mouseover' : v['evt'];
	var pos = isUndefined(v['pos']) ? '43' : v['pos'];
	var layer = isUndefined(v['layer']) ? 1 : v['layer'];
	var duration = isUndefined(v['duration']) ? 2 : v['duration'];
	var timeout = isUndefined(v['timeout']) ? 250 : v['timeout'];
	var maxh = isUndefined(v['maxh']) ? 600 : v['maxh'];
	var cache = isUndefined(v['cache']) ? 1 : v['cache'];
	var drag = isUndefined(v['drag']) ? '' : v['drag'];
	var dragobj = drag && $(drag) ? $(drag) : menuObj;
	var fade = isUndefined(v['fade']) ? 0 : v['fade'];
	var cover = isUndefined(v['cover']) ? 0 : v['cover'];
	var zindex = isUndefined(v['zindex']) ? JSMENU['zIndex']['menu'] : v['zindex'];
	var ctrlclass = isUndefined(v['ctrlclass']) ? '' : v['ctrlclass'];
	var winhandlekey = isUndefined(v['win']) ? '' : v['win'];
	if(winhandlekey && ctrlObj && !ctrlObj.getAttribute('fwin')) {
		ctrlObj.setAttribute('fwin', winhandlekey);
	}
	zindex = cover ? zindex + 500 : zindex;
	if(typeof JSMENU['active'][layer] == 'undefined') {
		JSMENU['active'][layer] = [];
	}

	for(i in EXTRAFUNC['showmenu']) {
		try {
			eval(EXTRAFUNC['showmenu'][i] + '()');
		} catch(e) {}
	}

	if(evt == 'click' && in_array(menuid, JSMENU['active'][layer]) && mtype != 'win') {
		hideMenu(menuid, mtype);
		return;
	}
	if(mtype == 'menu') {
		hideMenu(layer, mtype);
	}

	if(ctrlObj) {
		if(!ctrlObj.getAttribute('initialized')) {
			ctrlObj.setAttribute('initialized', true);
			ctrlObj.unselectable = true;

			ctrlObj.outfunc = typeof ctrlObj.onmouseout == 'function' ? ctrlObj.onmouseout : null;
			ctrlObj.onmouseout = function() {
				if(this.outfunc) this.outfunc();
				if(duration < 3 && !JSMENU['timer'][menuid]) {
					JSMENU['timer'][menuid] = setTimeout(function () {
						hideMenu(menuid, mtype);
					}, timeout);
				}
			};

			ctrlObj.overfunc = typeof ctrlObj.onmouseover == 'function' ? ctrlObj.onmouseover : null;
			ctrlObj.onmouseover = function(e) {
				doane(e);
				if(this.overfunc) this.overfunc();
				if(evt == 'click') {
					clearTimeout(JSMENU['timer'][menuid]);
					JSMENU['timer'][menuid] = null;
				} else {
					for(var i in JSMENU['timer']) {
						if(JSMENU['timer'][i]) {
							clearTimeout(JSMENU['timer'][i]);
							JSMENU['timer'][i] = null;
						}
					}
				}
			};
		}
	}

	if(!menuObj.getAttribute('initialized')) {
		menuObj.setAttribute('initialized', true);
		menuObj.ctrlkey = ctrlid;
		menuObj.mtype = mtype;
		menuObj.layer = layer;
		menuObj.cover = cover;
		if(ctrlObj && ctrlObj.getAttribute('fwin')) {menuObj.scrolly = true;}
		menuObj.style.position = 'absolute';
		menuObj.style.zIndex = zindex + layer;
		menuObj.onclick = function(e) {
			return doane(e, 0, 1);
		};
		if(duration < 3) {
			if(duration > 1) {
				menuObj.onmouseover = function() {
					clearTimeout(JSMENU['timer'][menuid]);
					JSMENU['timer'][menuid] = null;
				};
			}
			if(duration != 1) {
				menuObj.onmouseout = function() {
					JSMENU['timer'][menuid] = setTimeout(function () {
						hideMenu(menuid, mtype);
					}, timeout);
				};
			}
		}
		if(cover) {
			var coverObj = document.createElement('div');
			coverObj.id = menuid + '_cover';
			coverObj.style.position = 'absolute';
			coverObj.style.zIndex = menuObj.style.zIndex - 1;
			coverObj.style.left = coverObj.style.top = '0px';
			coverObj.style.width = '100%';
			coverObj.style.height = Math.max(document.documentElement.clientHeight, document.body.offsetHeight) + 'px';
			coverObj.style.backgroundColor = '#000';
			coverObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=50)';
			coverObj.style.opacity = 0.5;
			coverObj.onclick = function () {hideMenu();};
			$('append_parent').appendChild(coverObj);
			_attachEvent(window, 'load', function () {
				coverObj.style.height = Math.max(document.documentElement.clientHeight, document.body.offsetHeight) + 'px';
			}, document);
		}
	}
	if(drag) {
		dragobj.style.cursor = 'move';
		dragobj.onmousedown = function(event) {try{dragMenu(menuObj, event, 1);}catch(e){}};
	}

	if(cover) $(menuid + '_cover').style.display = '';
	if(fade) {
		var O = 0;
		var fadeIn = function(O) {
			if(O > 100) {
				clearTimeout(fadeInTimer);
				return;
			}
			menuObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + O + ')';
			menuObj.style.opacity = O / 100;
			O += 20;
			var fadeInTimer = setTimeout(function () {
				fadeIn(O);
			}, 40);
		};
		fadeIn(O);
		menuObj.fade = true;
	} else {
		menuObj.fade = false;
	}
	menuObj.style.display = '';
	if(ctrlObj && ctrlclass) {
		ctrlObj.className += ' ' + ctrlclass;
		menuObj.setAttribute('ctrlid', ctrlid);
		menuObj.setAttribute('ctrlclass', ctrlclass);
	}
	if(pos != '*') {
		setMenuPosition(showid, menuid, pos);
	}
	if(BROWSER.ie && BROWSER.ie < 7 && winhandlekey && $('fwin_' + winhandlekey)) {
		$(menuid).style.left = (parseInt($(menuid).style.left) - parseInt($('fwin_' + winhandlekey).style.left)) + 'px';
		$(menuid).style.top = (parseInt($(menuid).style.top) - parseInt($('fwin_' + winhandlekey).style.top)) + 'px';
	}
	if(maxh && menuObj.scrollHeight > maxh) {
		menuObj.style.height = maxh + 'px';
		if(BROWSER.opera) {
			menuObj.style.overflow = 'auto';
		} else {
			menuObj.style.overflowY = 'auto';
		}
	}

	if(!duration) {
		setTimeout('hideMenu(\'' + menuid + '\', \'' + mtype + '\')', timeout);
	}

	if(!in_array(menuid, JSMENU['active'][layer])) JSMENU['active'][layer].push(menuid);
	menuObj.cache = cache;
	if(layer > JSMENU['layer']) {
		JSMENU['layer'] = layer;
	}
	var hasshow = function(ele) {
		while(ele.parentNode && ((typeof(ele['currentStyle']) === 'undefined') ? window.getComputedStyle(ele,null) : ele['currentStyle'])['display'] !== 'none') {
			ele = ele.parentNode;
		}
		if(ele === document) {
			return true;
		} else {
			return false;
		}
	};
	if(!menuObj.getAttribute('disautofocus')) {
		try{
			var focused = false;
			var tags = ['input', 'select', 'textarea', 'button', 'a'];
			for(var i = 0; i < tags.length; i++) {
				var _all = menuObj.getElementsByTagName(tags[i]);
				if(_all.length) {
					for(j = 0; j < _all.length; j++) {
						if((!_all[j]['type'] || _all[j]['type'] != 'hidden') && hasshow(_all[j])) {
							_all[j].className += ' hidefocus';
							_all[j].focus();
							focused = true;
							var cobj = _all[j];
							_attachEvent(_all[j], 'blur', function (){cobj.className = trim(cobj.className.replace(' hidefocus', ''));});
							break;
						}
					}
				}
				if(focused) {
					break;
				}
			}
		} catch (e) {
		}
	}
}
var delayShowST = null;
function delayShow(ctrlObj, call, time) {
	if(typeof ctrlObj == 'object') {
		var ctrlid = ctrlObj.id;
		call = call || function () {showMenu(ctrlid);};
	}
	var time = isUndefined(time) ? 500 : time;
	delayShowST = setTimeout(function () {
		if(typeof call == 'function') {
			call();
		} else {
			eval(call);
		}
	}, time);
	if(!ctrlObj.delayinit) {
		_attachEvent(ctrlObj, 'mouseout', function() {clearTimeout(delayShowST);});
		ctrlObj.delayinit = 1;
	}
}

var dragMenuDisabled = false;
function dragMenu(menuObj, e, op) {
	e = e ? e : window.event;
	if(op == 1) {
		if(dragMenuDisabled || in_array(e.target ? e.target.tagName : e.srcElement.tagName, ['TEXTAREA', 'INPUT', 'BUTTON', 'SELECT'])) {
			return;
		}
		JSMENU['drag'] = [e.clientX, e.clientY];
		JSMENU['drag'][2] = parseInt(menuObj.style.left);
		JSMENU['drag'][3] = parseInt(menuObj.style.top);
		document.onmousemove = function(e) {try{dragMenu(menuObj, e, 2);}catch(err){}};
		document.onmouseup = function(e) {try{dragMenu(menuObj, e, 3);}catch(err){}};
		doane(e);
	}else if(op == 2 && JSMENU['drag'][0]) {
		var menudragnow = [e.clientX, e.clientY];
		menuObj.style.left = (JSMENU['drag'][2] + menudragnow[0] - JSMENU['drag'][0]) + 'px';
		menuObj.style.top = (JSMENU['drag'][3] + menudragnow[1] - JSMENU['drag'][1]) + 'px';
		menuObj.removeAttribute('top_');menuObj.removeAttribute('left_');
		doane(e);
	}else if(op == 3) {
		JSMENU['drag'] = [];
		document.onmousemove = null;
		document.onmouseup = null;
	}
}
function setMenuPosition(showid, menuid, pos) {
	var showObj = $(showid);
	var menuObj = menuid ? $(menuid) : $(showid + '_menu');
	if(isUndefined(pos) || !pos) pos = '43';
	var basePoint = parseInt(pos.substr(0, 1));
	var direction = parseInt(pos.substr(1, 1));
	var important = pos.indexOf('!') != -1 ? 1 : 0;
	var sxy = 0, sx = 0, sy = 0, sw = 0, sh = 0, ml = 0, mt = 0, mw = 0, mcw = 0, mh = 0, mch = 0, bpl = 0, bpt = 0;

	if(!menuObj || (basePoint > 0 && !showObj)) return;
	if(showObj) {
		sxy = fetchOffset(showObj);
		sx = sxy['left'];
		sy = sxy['top'];
		sw = showObj.offsetWidth;
		sh = showObj.offsetHeight;
	}
	mw = menuObj.offsetWidth;
	mcw = menuObj.clientWidth;
	mh = menuObj.offsetHeight;
	mch = menuObj.clientHeight;

	switch(basePoint) {
		case 1:
			bpl = sx;
			bpt = sy;
			break;
		case 2:
			bpl = sx + sw;
			bpt = sy;
			break;
		case 3:
			bpl = sx + sw;
			bpt = sy + sh;
			break;
		case 4:
			bpl = sx;
			bpt = sy + sh;
			break;
	}
	switch(direction) {
		case 0:
			menuObj.style.left = (document.body.clientWidth - menuObj.clientWidth) / 2 + 'px';
			mt = (document.documentElement.clientHeight - menuObj.clientHeight) / 2;
			break;
		case 1:
			ml = bpl - mw;
			mt = bpt - mh;
			break;
		case 2:
			ml = bpl;
			mt = bpt - mh;
			break;
		case 3:
			ml = bpl;
			mt = bpt;
			break;
		case 4:
			ml = bpl - mw;
			mt = bpt;
			break;
	}
	var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
	var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
	if(!important) {
		if(in_array(direction, [1, 4]) && ml < 0) {
			ml = bpl;
			if(in_array(basePoint, [1, 4])) ml += sw;
		} else if(ml + mw > scrollLeft + document.body.clientWidth && sx >= mw) {
			ml = bpl - mw;
			if(in_array(basePoint, [2, 3])) {
				ml -= sw;
			} else if(basePoint == 4) {
				ml += sw;
			}
		}
		if(in_array(direction, [1, 2]) && mt < 0) {
			mt = bpt;
			if(in_array(basePoint, [1, 2])) mt += sh;
		} else if(mt + mh > scrollTop + document.documentElement.clientHeight && sy >= mh) {
			mt = bpt - mh;
			if(in_array(basePoint, [3, 4])) mt -= sh;
		}
	}
	if(pos.substr(0, 3) == '210') {
		ml += 69 - sw / 2;
		mt -= 5;
		if(showObj.tagName == 'TEXTAREA') {
			ml -= sw / 2;
			mt += sh / 2;
		}
	}
	if(direction == 0 || menuObj.scrolly) {
		if(BROWSER.ie && BROWSER.ie < 7) {
			if(direction == 0) mt += scrollTop;
		} else {
			if(menuObj.scrolly) mt -= scrollTop;
			menuObj.style.position = 'fixed';
		}
	}
	if(ml) menuObj.style.left = ml + 'px';
	if(mt) menuObj.style.top = mt + 'px';
	if(direction == 0 && BROWSER.ie && !document.documentElement.clientHeight) {
		menuObj.style.position = 'absolute';
		menuObj.style.top = (document.body.clientHeight - menuObj.clientHeight) / 2 + 'px';
	}
	if(menuObj.style.clip && !BROWSER.opera) {
		menuObj.style.clip = 'rect(auto, auto, auto, auto)';
	}
}

function hideMenu(attr, mtype) {
	attr = isUndefined(attr) ? '' : attr;
	mtype = isUndefined(mtype) ? 'menu' : mtype;
	if(attr == '') {
		for(var i = 1; i <= JSMENU['layer']; i++) {
			hideMenu(i, mtype);
		}
		return;
	} else if(typeof attr == 'number') {
		for(var j in JSMENU['active'][attr]) {
			hideMenu(JSMENU['active'][attr][j], mtype);
		}
		return;
	}else if(typeof attr == 'string') {
		var menuObj = $(attr);
		if(!menuObj || (mtype && menuObj.mtype != mtype)) return;
		var ctrlObj = '', ctrlclass = '';
		if((ctrlObj = $(menuObj.getAttribute('ctrlid'))) && (ctrlclass = menuObj.getAttribute('ctrlclass'))) {
			var reg = new RegExp(' ' + ctrlclass);
			ctrlObj.className = ctrlObj.className.replace(reg, '');
		}
		clearTimeout(JSMENU['timer'][attr]);
		var hide = function() {
			if(menuObj.cache) {
				if(menuObj.style.visibility != 'hidden') {
					menuObj.style.display = 'none';
					if(menuObj.cover) $(attr + '_cover').style.display = 'none';
				}
			}else {
				menuObj.parentNode.removeChild(menuObj);
				if(menuObj.cover) $(attr + '_cover').parentNode.removeChild($(attr + '_cover'));
			}
			var tmp = [];
			for(var k in JSMENU['active'][menuObj.layer]) {
				if(attr != JSMENU['active'][menuObj.layer][k]) tmp.push(JSMENU['active'][menuObj.layer][k]);
			}
			JSMENU['active'][menuObj.layer] = tmp;
		};
		if(menuObj.fade) {
			var O = 100;
			var fadeOut = function(O) {
				if(O == 0) {
					clearTimeout(fadeOutTimer);
					hide();
					return;
				}
				menuObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + O + ')';
				menuObj.style.opacity = O / 100;
				O -= 20;
				var fadeOutTimer = setTimeout(function () {
					fadeOut(O);
				}, 40);
			};
			fadeOut(O);
		} else {
			hide();
		}
	}
}

function getCurrentStyle(obj, cssproperty, csspropertyNS) {
	if(obj.style[cssproperty]){
		return obj.style[cssproperty];
	}
	if (obj.currentStyle) {
		return obj.currentStyle[cssproperty];
	} else if (document.defaultView.getComputedStyle(obj, null)) {
		var currentStyle = document.defaultView.getComputedStyle(obj, null);
		var value = currentStyle.getPropertyValue(csspropertyNS);
		if(!value){
			value = currentStyle[cssproperty];
		}
		return value;
	} else if (window.getComputedStyle) {
		var currentStyle = window.getComputedStyle(obj, "");
		return currentStyle.getPropertyValue(csspropertyNS);
	}
}

function fetchOffset(obj, mode) {
	var left_offset = 0, top_offset = 0, mode = !mode ? 0 : mode;

	if(obj.getBoundingClientRect && !mode) {
		var rect = obj.getBoundingClientRect();
		var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
		var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
		if(document.documentElement.dir == 'rtl') {
			scrollLeft = scrollLeft + document.documentElement.clientWidth - document.documentElement.scrollWidth;
		}
		left_offset = rect.left + scrollLeft - document.documentElement.clientLeft;
		top_offset = rect.top + scrollTop - document.documentElement.clientTop;
	}
	if(left_offset <= 0 || top_offset <= 0) {
		left_offset = obj.offsetLeft;
		top_offset = obj.offsetTop;
		while((obj = obj.offsetParent) != null) {
			position = getCurrentStyle(obj, 'position', 'position');
			if(position == 'relative') {
				continue;
			}
			left_offset += obj.offsetLeft;
			top_offset += obj.offsetTop;
		}
	}
	return {'left' : left_offset, 'top' : top_offset};
}





var showDialogST = null;
function showDialog(msg, mode, t, func, cover, funccancel, leftmsg, confirmtxt, canceltxt, closetime, locationtime) {
	clearTimeout(showDialogST);
	cover = isUndefined(cover) ? (mode == 'info' ? 0 : 1) : cover;
	leftmsg = isUndefined(leftmsg) ? '' : leftmsg;
	mode = in_array(mode, ['confirm', 'notice', 'info', 'right']) ? mode : 'alert';
	var menuid = 'fwin_dialog';
	var menuObj = $(menuid);
	var showconfirm = 1;
	confirmtxtdefault = '确定';
	closetime = isUndefined(closetime) ? '' : closetime;
	closefunc = function () {
		if(typeof func == 'function') func();
		else eval(func);
		hideMenu(menuid, 'dialog');
	};
	if(closetime) {
		showPrompt(null, null, '<i>' + msg + '</i>', closetime * 1000, 'popuptext');
		return;
	}
	locationtime = isUndefined(locationtime) ? '' : locationtime;
	if(locationtime) {
		leftmsg = locationtime + ' 秒后页面跳转';
		showDialogST = setTimeout(closefunc, locationtime * 1000);
		showconfirm = 0;
	}
	confirmtxt = confirmtxt ? confirmtxt : confirmtxtdefault;
	canceltxt = canceltxt ? canceltxt : '取消';

	if(menuObj) hideMenu('fwin_dialog', 'dialog');
	menuObj = document.createElement('div');
	menuObj.style.display = 'none';
	menuObj.className = 'fwinmask';
	menuObj.id = menuid;
	$('append_parent').append(menuObj);
	var hidedom = '';
	if(!BROWSER.ie) {
		hidedom = '<style type="text/css">object{visibility:hidden;}</style>';
	}
	var s = hidedom + '<table cellpadding="0" cellspacing="0" class="fwin"><tr><td class="t_l"></td><td class="t_c"></td><td class="t_r"></td></tr><tr><td class="m_l">&nbsp;&nbsp;</td><td class="m_c"><h3 class="flb"><em>';
	s += t ? t : '提示信息';
	s += '</em><span><a href="javascript:;" id="fwin_dialog_close" class="flbc" onclick="hideMenu(\'' + menuid + '\', \'dialog\')" title="关闭">关闭</a></span></h3>';
	if(mode == 'info') {
		s += msg ? msg : '';
	} else {
		s += '<div class="c altw"><div class="' + (mode == 'alert' ? 'alert_error' : (mode == 'right' ? 'alert_right' : 'alert_info')) + '"><p>' + msg + '</p></div></div>';
		s += '<p class="o pns">' + (leftmsg ? '<span class="z xg1">' + leftmsg + '</span>' : '') + (showconfirm ? '<button id="fwin_dialog_submit" value="true" class="pn pns"><strong>'+confirmtxt+'</strong></button>' : '');
		s += mode == 'confirm' ? '<button id="fwin_dialog_cancel" value="true" class="pn" onclick="hideMenu(\'' + menuid + '\', \'dialog\')"><strong>'+canceltxt+'</strong></button>' : '';
		s += '</p>';
	}
	s += '</td><td class="m_r"></td></tr><tr><td class="b_l"></td><td class="b_c"></td><td class="b_r"></td></tr></table>';
	menuObj.innerHTML = s;
	if($('fwin_dialog_submit')) $('fwin_dialog_submit').onclick = function() {
		if(typeof func == 'function') func();
		else eval(func);
		hideMenu(menuid, 'dialog');
	};
	if($('fwin_dialog_cancel')) {
		$('fwin_dialog_cancel').onclick = function() {
			if(typeof funccancel == 'function') funccancel();
			else eval(funccancel);
			hideMenu(menuid, 'dialog');
		};
		$('fwin_dialog_close').onclick = $('fwin_dialog_cancel').onclick;
	}
	showMenu({'mtype':'dialog','menuid':menuid,'duration':3,'pos':'00','zindex':JSMENU['zIndex']['dialog'],'cache':0,'cover':cover});
	try {
		if($('fwin_dialog_submit')) $('fwin_dialog_submit').focus();
	} catch(e) {}
}

function showWindow(k, url, mode, cache, menuv) {

	mode = isUndefined(mode) ? 'get' : mode;
	cache = isUndefined(cache) ? 1 : cache;
	var menuid = 'fwin_' + k;
	var menuObj = $(menuid);
	var drag = null;
	var loadingst = null;
	var hidedom = '';

	if(disallowfloat && disallowfloat.indexOf(k) != -1) {
		if(BROWSER.ie) url += (url.indexOf('?') != -1 ?  '&' : '?') + 'referer=' + escape(location.href);
		location.href = url;
		doane();
		return;
	}

	var fetchContent = function() {
		if(mode == 'get') {
			menuObj.url = url;
			url += (url.search(/\?/) > 0 ? '&' : '?') + 'infloat=yes&handlekey=' + k;
			url += cache == -1 ? '&t='+(+ new Date()) : '';
			if(BROWSER.ie &&  url.indexOf('referer=') < 0) {
				url = url + '&referer=' + encodeURIComponent(location);
			}
			ajaxget(url, 'fwin_content_' + k, null, '', '', function() {initMenu();show();});
		} else if(mode == 'post') {
			menuObj.act = $(url).action;
			ajaxpost(url, 'fwin_content_' + k, '', '', '', function() {initMenu();show();});
		}
		if(parseInt(BROWSER.ie) != 6) {
			loadingst = setTimeout(function() {showDialog('', 'info', '<img src="' + IMGDIR + '/loading.gif"> 请稍候...')}, 500);
		}
	};
	var initMenu = function() {
		clearTimeout(loadingst);
		var objs = menuObj.getElementsByTagName('*');
		var fctrlidinit = false;
		for(var i = 0; i < objs.length; i++) {
			if(objs[i].id) {
				objs[i].setAttribute('fwin', k);
			}
			if(objs[i].className == 'flb' && !fctrlidinit) {
				if(!objs[i].id) objs[i].id = 'fctrl_' + k;
				drag = objs[i].id;
				fctrlidinit = true;
			}
		}
	};
	var show = function() {
		hideMenu('fwin_dialog', 'dialog');
		v = {'mtype':'win','menuid':menuid,'duration':3,'pos':'00','zindex':JSMENU['zIndex']['win'],'drag':typeof drag == null ? '' : drag,'cache':cache};
		for(k in menuv) {
			v[k] = menuv[k];
		}
		showMenu(v);
	};

	if(!menuObj) {
		menuObj = document.createElement('div');
		menuObj.id = menuid;
		menuObj.className = 'fwinmask';
		menuObj.style.display = 'none';
		$('append_parent').appendChild(menuObj);
		evt = ' style="cursor:move" onmousedown="dragMenu($(\'' + menuid + '\'), event, 1)" ondblclick="hideWindow(\'' + k + '\')"';
		if(!BROWSER.ie) {
			hidedom = '<style type="text/css">object{visibility:hidden;}</style>';
		}
		menuObj.innerHTML = hidedom + '<table cellpadding="0" cellspacing="0" class="fwin"><tr><td class="t_l"></td><td class="t_c"' + evt + '></td><td class="t_r"></td></tr><tr><td class="m_l"' + evt + ')">&nbsp;&nbsp;</td><td class="m_c" id="fwin_content_' + k + '">'
			+ '</td><td class="m_r"' + evt + '"></td></tr><tr><td class="b_l"></td><td class="b_c"' + evt + '></td><td class="b_r"></td></tr></table>';
		if(mode == 'html') {
			$('fwin_content_' + k).innerHTML = url;
			initMenu();
			show();
		} else {
			fetchContent();
		}
	} else if((mode == 'get' && (url != menuObj.url || cache != 1)) || (mode == 'post' && $(url).action != menuObj.act)) {
		fetchContent();
	} else {
		show();
	}
	doane();
}
function showWindowEx(k,data){
	var html='';
	if(uid){
		html = template("tpl_"+k, {
			data: data,
			cache:cache,
		});
	}else{
		if(data==undefined){
			data={};
		}
		if(k!='quick_login'){
			data.showWindowExdata=JSON.stringify(data)
			data.showWindowEx=k
			k='quick_login';
		}
		if(document.location.search!='?tpl=login'){
			saveUserdata('login_ref',document.location.search)
		}else{
			saveUserdata('login_ref',null)
		}
			
		
		html = template("tpl_quick_login", {
			data: data,
			cache:cache,
		});
	}
	var menuid = 'fwin_' + k;
	var menuObj = $(menuid);
	var drag = null;
	if(!menuObj) {
		menuObj = document.createElement('div');
		menuObj.id = menuid;
		menuObj.className = 'shade';
		menuObj.style.cssText = 'position:absolute;background:#00000070;z-index:300;width:100%;height:'+document.body.offsetHeight+"px;";
		$('append_parent').appendChild(menuObj);
	}else{
		menuObj.style.display=''
	}
	evt = ' style="cursor:move" onmousedown="dragMenu($(\'' + menuid + '\'), event, 1)" ondblclick="hideWindow(\'' + k + '\')"';
	if(!BROWSER.ie) {
		hidedom = '<style type="text/css">object{visibility:hidden;}</style>';
	}
	menuObj.innerHTML = hidedom + '<div id="'+menuid+'_child" class="fwinmask"><table cellpadding="0" cellspacing="0" class="fwin"><tr><td class="t_l"></td><td class="t_c"' + evt + '></td><td class="t_r"></td></tr><tr><td class="m_l"' + evt + ')">&nbsp;&nbsp;</td><td class="m_c" id="fwin_content_' + k + '">'
		+ '</td><td class="m_r"' + evt + '"></td></tr><tr><td class="b_l"></td><td class="b_c"' + evt + '></td><td class="b_r"></td></tr></table><div>';
	$('#fwin_content_' + k).html('<span><a href="javascript:;" class="flbc" onclick="hideWindow(\''+k+'\', 0, 1);" title="关闭">关闭</a></span>'+html);
	//initMenu();
	
	v = {'mtype':'win','menuid':menuid+"_child",'duration':3,'pos':'00','zindex':JSMENU['zIndex']['win'],'drag':typeof drag == null ? '' : drag,'cache':cache};
	showMenu(v);
	
}
function showError(msg) {
	var p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
	msg = msg.replace(p, '');
	if(msg !== '') {
		showDialog(msg, 'alert', '错误信息', null, true, null, '', '', '', 3);
	}
}

function hideWindow(k, all, clear) {
	all = isUndefined(all) ? 1 : all;
	clear = isUndefined(clear) ? 1 : clear;
	hideMenu('fwin_' + k, 'win');
	if(clear && $('fwin_' + k)) {
		$('append_parent').removeChild($('fwin_' + k));
	}
	if(all) {
		hideMenu();
	}
}




function simulateSelect(selectId, widthvalue) {
	var selectObj = $(selectId);
	if(!selectObj) return;
	if(BROWSER.other) {
		if(selectObj.getAttribute('change')) {
			selectObj.onchange = function () {eval(selectObj.getAttribute('change'));}
		}
		return;
	}
	var widthvalue = widthvalue ? widthvalue : 70;
	var defaultopt = selectObj.options[0] ? selectObj.options[0].innerHTML : '';
	var defaultv = '';
	var menuObj = document.createElement('div');
	var ul = document.createElement('ul');
	var handleKeyDown = function(e) {
		e = BROWSER.ie ? event : e;
		if(e.keyCode == 40 || e.keyCode == 38) doane(e);
	};
	var selectwidth = (selectObj.getAttribute('width', i) ? selectObj.getAttribute('width', i) : widthvalue) + 'px';
	var tabindex = selectObj.getAttribute('tabindex', i) ? selectObj.getAttribute('tabindex', i) : 1;

	for(var i = 0; i < selectObj.options.length; i++) {
		var li = document.createElement('li');
		li.innerHTML = selectObj.options[i].innerHTML;
		li.k_id = i;
		li.k_value = selectObj.options[i].value;
		if(selectObj.options[i].selected) {
			defaultopt = selectObj.options[i].innerHTML;
			defaultv = selectObj.options[i].value;
			li.className = 'current';
			selectObj.setAttribute('selecti', i);
		}
		li.onclick = function() {
			if($(selectId + '_ctrl').innerHTML != this.innerHTML) {
				var lis = menuObj.getElementsByTagName('li');
				lis[$(selectId).getAttribute('selecti')].className = '';
				this.className = 'current';
				$(selectId + '_ctrl').innerHTML = this.innerHTML;
				$(selectId).setAttribute('selecti', this.k_id);
				$(selectId).options.length = 0;
				$(selectId).options[0] = new Option('', this.k_value);
				eval(selectObj.getAttribute('change'));
			}
			hideMenu(menuObj.id);
			return false;
		};
		ul.appendChild(li);
	}

	selectObj.options.length = 0;
	selectObj.options[0]= new Option('', defaultv);
	selectObj.style.display = 'none';
	selectObj.outerHTML += '<a href="javascript:;" id="' + selectId + '_ctrl" style="width:' + selectwidth + '" tabindex="' + tabindex + '">' + defaultopt + '</a>';

	menuObj.id = selectId + '_ctrl_menu';
	menuObj.className = 'sltm';
	menuObj.style.display = 'none';
	menuObj.style.width = selectwidth;
	menuObj.appendChild(ul);
	$('append_parent').appendChild(menuObj);

	$(selectId + '_ctrl').onclick = function(e) {
		$(selectId + '_ctrl_menu').style.width = selectwidth;
		showMenu({'ctrlid':(selectId == 'loginfield' ? 'account' : selectId + '_ctrl'),'menuid':selectId + '_ctrl_menu','evt':'click','pos':'43'});
		doane(e);
	};
	$(selectId + '_ctrl').onfocus = menuObj.onfocus = function() {
		_attachEvent(document.body, 'keydown', handleKeyDown);
	};
	$(selectId + '_ctrl').onblur = menuObj.onblur = function() {
		_detachEvent(document.body, 'keydown', handleKeyDown);
	};
	$(selectId + '_ctrl').onkeyup = function(e) {
		e = e ? e : window.event;
		value = e.keyCode;
		if(value == 40 || value == 38) {
			if(menuObj.style.display == 'none') {
				$(selectId + '_ctrl').onclick();
			} else {
				lis = menuObj.getElementsByTagName('li');
				selecti = selectObj.getAttribute('selecti');
				lis[selecti].className = '';
				if(value == 40) {
					selecti = parseInt(selecti) + 1;
				} else if(value == 38) {
					selecti = parseInt(selecti) - 1;
				}
				if(selecti < 0) {
					selecti = lis.length - 1
				} else if(selecti > lis.length - 1) {
					selecti = 0;
				}
				lis[selecti].className = 'current';
				selectObj.setAttribute('selecti', selecti);
				lis[selecti].parentNode.scrollTop = lis[selecti].offsetTop;
			}
		} else if(value == 13) {
			var lis = menuObj.getElementsByTagName('li');
			lis[selectObj.getAttribute('selecti')].onclick();
		} else if(value == 27) {
			hideMenu(menuObj.id);
		}
	};
}


function thumbImg(obj, method) {
	if(!obj) {
		return;
	}
	obj.onload = null;
	file = obj.src;
	zw = obj.offsetWidth;
	zh = obj.offsetHeight;
	if(zw < 2) {
		if(!obj.id) {
			obj.id = 'img_' + Math.random();
		}
		setTimeout("thumbImg($('" + obj.id + "'), " + method + ")", 100);
		return;
	}
	zr = zw / zh;
	method = !method ? 0 : 1;
	if(method) {
		fixw = obj.getAttribute('_width');
		fixh = obj.getAttribute('_height');
		if(zw > fixw) {
			zw = fixw;
			zh = zw / zr;
		}
		if(zh > fixh) {
			zh = fixh;
			zw = zh * zr;
		}
	} else {
		fixw = typeof imagemaxwidth == 'undefined' ? '600' : imagemaxwidth;
		if(zw > fixw) {
			zw = fixw;
			zh = zw / zr;
			obj.style.cursor = 'pointer';
			if(!obj.onclick) {
				obj.onclick = function() {
					zoom(obj, obj.src);
				};
			}
		}
	}
	obj.width = zw;
	obj.height = zh;
}

var zoomstatus = 1;


function ctrlEnter(event, btnId, onlyEnter) {
	if(isUndefined(onlyEnter)) onlyEnter = 0;
	if((event.ctrlKey || onlyEnter) && event.keyCode == 13) {
		$(btnId).click();
		return false;
	}
	return true;
}

function parseurl(str, mode, parsecode) {
	if(isUndefined(parsecode)) parsecode = true;
	if(parsecode) str= str.replace(/\[code\]([\s\S]+?)\[\/code\]/ig, function($1, $2) {return codetag($2, -1);});
	str = str.replace(/([^>=\]"'\/]|^)((((https?|ftp):\/\/)|www\.)([\w\-]+\.)*[\w\-\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!]*)+\.(swf|flv))/ig, '$1[flash]$2[/flash]');
	str = str.replace(/([^>=\]"'\/]|^)((((https?|ftp):\/\/)|www\.)([\w\-]+\.)*[\w\-\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!]*)+\.(mp3|wma))/ig, '$1[audio]$2[/audio]');
	str = str.replace(/([^>=\]"'\/@]|^)((((https?|ftp|gopher|news|telnet|rtsp|mms|callto|bctp|ed2k|thunder|qqdl|synacast):\/\/))([\w\-]+\.)*[:\.@\-\w\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&;~`@':+!#]*)*)/ig, mode == 'html' ? '$1<a href="$2" target="_blank">$2</a>' : '$1[url]$2[/url]');
	str = str.replace(/([^\w>=\]"'\/@]|^)((www\.)([\w\-]+\.)*[:\.@\-\w\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&;~`@':+!#]*)*)/ig, mode == 'html' ? '$1<a href="$2" target="_blank">$2</a>' : '$1[url]$2[/url]');
	str = str.replace(/([^\w->=\]:"'\.\/]|^)(([\-\.\w]+@[\.\-\w]+(\.\w+)+))/ig, mode == 'html' ? '$1<a href="mailto:$2">$2</a>' : '$1[email]$2[/email]');
	if(parsecode) {
		for(var i = 0; i <= DISCUZCODE['num']; i++) {
			str = str.replace("[\tDISCUZ_CODE_" + i + "\t]", DISCUZCODE['html'][i]);
		}
	}
	return str;
}

function codetag(text, br) {
	var br = !br ? 1 : br;
	DISCUZCODE['num']++;
	if(br > 0 && typeof wysiwyg != 'undefined' && wysiwyg) text = text.replace(/<br[^\>]*>/ig, '\n');
	text = text.replace(/\$/ig, '$$');
	DISCUZCODE['html'][DISCUZCODE['num']] = '[code]' + text + '[/code]';
	return '[\tDISCUZ_CODE_' + DISCUZCODE['num'] + '\t]';
}

function saveUserdata(name, data) {
	try {
		if(window.localStorage){
			localStorage.setItem('Discuz_' + name, data);
		} else if(window.sessionStorage){
			sessionStorage.setItem('Discuz_' + name, data);
		}
	} catch(e) {
		if(BROWSER.ie){
			if(data.length < 54889) {
				with(document.documentElement) {
					setAttribute("value", data);
					save('Discuz_' + name);
				}
			}
		}
	}
}

function loadUserdata(name) {
	if(window.localStorage){
		return localStorage.getItem('Discuz_' + name);
	} else if(window.sessionStorage){
		return sessionStorage.getItem('Discuz_' + name);
	} else if(BROWSER.ie){
		with(document.documentElement) {
			load('Discuz_' + name);
			return getAttribute("value");
		}
	}
}



function openDiy(){
	if(DYNAMICURL) {
		window.location.href = SITEURL+DYNAMICURL + (DYNAMICURL.indexOf('?') < 0 ? '?' : '&') + ('diy=yes');
	} else {
		window.location.href = ((window.location.href + '').replace(/[\?\&]diy=yes/g, '').split('#')[0] + ( window.location.search && window.location.search.indexOf('?diy=yes') < 0 ? '&diy=yes' : '?diy=yes'));
	}
}

function hasClass(elem, className) {
	return elem.className && (" " + elem.className + " ").indexOf(" " + className + " ") != -1;
}

function runslideshow() {
	$F('_runslideshow', []);
}

function toggle_collapse(objname, noimg, complex, lang) {
	$F('_toggle_collapse', arguments);
}

function updatestring(str1, str2, clear) {
	str2 = '_' + str2 + '_';
	return clear ? str1.replace(str2, '') : (str1.indexOf(str2) == -1 ? str1 + str2 : str1);
}

function getClipboardData() {
	window.document.clipboardswf.SetVariable('str', CLIPBOARDSWFDATA);
}

function setCopy(text, msg) {
	var cp = document.createElement('textarea');
	cp.style.fontSize = '12pt';
	cp.style.border = '0';
	cp.style.padding = '0';
	cp.style.margin = '0';
	cp.style.position = 'absolute';
	cp.style.left = '-9999px';
	var yPosition = window.pageYOffset || document.documentElement.scrollTop;
	cp.style.top = yPosition + 'px';
	cp.setAttribute('readonly', '');
	cp.value = text;
	$('append_parent').appendChild(cp);
	cp.select();
	cp.setSelectionRange(0, cp.value.length);
	try {
		var success = document.execCommand('copy', false, null);
	} catch (e) {
		var success = false;
	}
	$('append_parent').removeChild(cp);

	if(success) {
		if(msg) {
			showPrompt(null, null, '<span>' + msg + '</span>', 1500);
		}
	} else if(BROWSER.ie) {
		var r = clipboardData.setData('Text', text);
		if(r) {
			if(msg) {
				showPrompt(null, null, '<span>' + msg + '</span>', 1500);
			}
		} else {
			showDialog('<div class="c"><div style="width: 200px; text-align: center;">复制失败，请选择“允许访问”</div></div>', 'alert');
		}
	} else {
		var msg = '<div class="c"><div style="width: 200px; text-align: center; text-decoration:underline;">点此复制到剪贴板</div>' +
		AC_FL_RunContent('id', 'clipboardswf', 'name', 'clipboardswf', 'devicefont', 'false', 'width', '200', 'height', '40', 'src', STATICURL + 'image/common/clipboard.swf', 'menu', 'false',  'allowScriptAccess', 'sameDomain', 'swLiveConnect', 'true', 'wmode', 'transparent', 'style' , 'margin-top:-20px') + '</div>';
		showDialog(msg, 'info');
		text = text.replace(/[\xA0]/g, ' ');
		CLIPBOARDSWFDATA = text;
	}
}




function initSearchmenu(searchform, cloudSearchUrl) {
	var defaultUrl = 'search.php?searchsubmit=yes';
	if(typeof cloudSearchUrl == "undefined" || cloudSearchUrl == null || cloudSearchUrl == '') {
		cloudSearchUrl = defaultUrl;
	}

	var searchtxt = $(searchform + '_txt');
	if(!searchtxt) {
		searchtxt = $(searchform);
	}
	var tclass = searchtxt.className;
	searchtxt.className = tclass + ' xg1';
	if (!!("placeholder" in document.createElement("input"))) {
		if(searchtxt.value == '请输入搜索内容') {
			searchtxt.value = '';
		}
		searchtxt.placeholder = '请输入搜索内容';
	} else {
		searchtxt.onfocus = function () {
			if(searchtxt.value == '请输入搜索内容') {
				searchtxt.value = '';
				searchtxt.className = tclass;
			}
		};
		searchtxt.onblur = function () {
			if(searchtxt.value == '' ) {
				searchtxt.value = '请输入搜索内容';
				searchtxt.className = tclass + ' xg1';
			}
		};
	}
	if(!$(searchform + '_type_menu')) return false;
	var o = $(searchform + '_type');
	var a = $(searchform + '_type_menu').getElementsByTagName('a');
	var formobj = searchtxt.form;
	for(var i=0; i<a.length; i++){
		if(a[i].className == 'curtype'){
			o.innerHTML = a[i].innerHTML;
			$(searchform + '_mod').value = a[i].rel;
			formobj.method = 'post';
			if((a[i].rel == 'forum' || a[i].rel == 'curforum') && defaultUrl != cloudSearchUrl) {
				formobj.action = cloudSearchUrl;
				formobj.method = 'get';
				if($('srchFId')) {
					$('srchFId').value = a[i].rel == 'forum' ? 0 : a[i].getAttribute('fid');
				}
			} else {
				formobj.action = defaultUrl;
			}
		}
		a[i].onclick = function(){
			o.innerHTML = this.innerHTML;
			$(searchform + '_mod').value = this.rel;
			formobj.method = 'post';
			if((this.rel == 'forum' || this.rel == 'curforum') && defaultUrl != cloudSearchUrl) {
				formobj.action = cloudSearchUrl;
				formobj.method = 'get';
				if($('srchFId')) {
					$('srchFId').value = this.rel == 'forum' ? 0 : this.getAttribute('fid');
				}
			} else {
				formobj.action = defaultUrl;
			}
		};
	}
}

function searchFocus(obj) {
	if(obj.value == '请输入搜索内容') {
		obj.value = '';
	}
	if($('cloudsearchquery') != null) {
		$('cloudsearchquery').value = obj.value;
	}
}




function checksec(id) {
	var secobj=$('#'+id);
	if(secobj && secobj.attr('src')=='') updateseccode(id);
}




function navShow(id) {
	var mnobj = $('snav_mn_' + id);
	if(!mnobj) {
		return;
	}
	var uls = $('mu').getElementsByTagName('ul');
	for(i = 0;i < uls.length;i++) {
		if(uls[i].className != 'cl current') {
			uls[i].style.display = 'none';
		}
	}
	if(mnobj.className != 'cl current') {
		showMenu({'ctrlid':'mn_' + id,'menuid':'snav_mn_' + id,'pos':'*'});
		mnobj.className = 'cl floatmu';
		mnobj.style.width = ($('nv').clientWidth) + 'px';
		mnobj.style.display = '';
	}
}

function strLenCalc(obj, checklen, maxlen) {
	var v = obj.value, charlen = 0, maxlen = !maxlen ? 200 : maxlen, curlen = maxlen, len = strlen(v);
	for(var i = 0; i < v.length; i++) {
		if(v.charCodeAt(i) < 0 || v.charCodeAt(i) > 255) {
			curlen -= charset == 'utf-8' ? 2 : 1;
		}
	}
	if(curlen >= len) {
		$(checklen).innerHTML = curlen - len;
	} else {
		obj.value = mb_cutstr(v, maxlen, 0);
	}
}

function pluginNotice() {
	if($('plugin_notice')) {
		ajaxget('misc.php?mod=patch&action=pluginnotice', 'plugin_notice', '');
	}
}

function ipNotice() {
	if($('ip_notice')) {
		ajaxget('misc.php?mod=patch&action=ipnotice&_r='+Math.random(), 'ip_notice', '');
	}
}

function noticeTitle() {
	NOTICETITLE = {'State':0, 'oldTitle':NOTICECURTITLE, flashNumber:0, sleep:15};
	if(!getcookie('noticeTitle')) {
		window.setInterval('noticeTitleFlash();', 500);
	} else {
		window.setTimeout('noticeTitleFlash();', 500);
	}
	setcookie('noticeTitle', 1, 600);
}

function noticeTitleFlash() {
	if(NOTICETITLE.flashNumber < 5 || NOTICETITLE.flashNumber > 4 && !NOTICETITLE['State']) {
		document.title = (NOTICETITLE['State'] ? '【　　　】' : '【新提醒】') + NOTICETITLE['oldTitle'];
		NOTICETITLE['State'] = !NOTICETITLE['State'];
	}
	NOTICETITLE.flashNumber = NOTICETITLE.flashNumber < NOTICETITLE.sleep ? ++NOTICETITLE.flashNumber : 0;
}

function relatedlinks(rlinkmsgid) {
	$F('_relatedlinks', arguments);
}

function con_handle_response(response) {
	return response;
}

function showTopLink() {
	var ft = $('ft');
	if(ft){
		var scrolltop = $('scrolltop');
		var viewPortHeight = parseInt(document.documentElement.clientHeight);
		var scrollHeight = parseInt(document.body.getBoundingClientRect().top);
		var basew = parseInt(ft.clientWidth);
		var sw = scrolltop.clientWidth;
		if (basew < 1000) {
			var left = parseInt(fetchOffset(ft)['left']);
			left = left < sw ? left * 2 - sw : left;
			scrolltop.style.left = ( basew + left ) + 'px';
		} else {
			scrolltop.style.left = 'auto';
			scrolltop.style.right = 0;
		}

		if (BROWSER.ie && BROWSER.ie < 7) {
			scrolltop.style.top = viewPortHeight - scrollHeight - 150 + 'px';
		}
		if (scrollHeight < -100) {
			scrolltop.style.visibility = 'visible';
		} else {
			scrolltop.style.visibility = 'hidden';
		}
	}
}

function showCreditmenu() {
	$F('_showCreditmenu', []);
}

function showUpgradeinfo() {
	$F('_showUpgradeinfo', []);
}

function addFavorite(url, title) {
	try {
		window.external.addFavorite(url, title);
	} catch (e){
		try {
			window.sidebar.addPanel(title, url, '');
			} catch (e) {
			showDialog("请按 Ctrl+D 键添加到收藏夹", 'notice');
		}
	}
}

function setHomepage(sURL) {
	if(BROWSER.ie){
		document.body.style.behavior = 'url(#default#homepage)';
		document.body.setHomePage(sURL);
	} else {
		showDialog("非 IE 浏览器请手动将本站设为首页", 'notice');
		doane();
	}
}

function setShortcut() {
	var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
	if(!loadUserdata('setshortcut') && !scrollTop) {
		$F('_setShortcut', []);
	}
}



function showfocus(ftype, autoshow) {
	var id = parseInt($('focuscur').innerHTML);
	if(ftype == 'prev') {
		id = (id-1) < 1 ? focusnum : (id-1);
		if(!autoshow) {
			window.clearInterval(focusautoshow);
		}
	} else if(ftype == 'next') {
		id = (id+1) > focusnum ? 1 : (id+1);
		if(!autoshow) {
			window.clearInterval(focusautoshow);
		}
	}
	$('focuscur').innerHTML = id;
	$('focus_con').innerHTML = $('focus_'+(id-1)).innerHTML;
}

function rateStarHover(target,level) {
	if(level ==  0) {
		$(target).style.width = '';
	} else {
		$(target).style.width = level * 16 + 'px';
	}
}
function rateStarSet(target,level,input) {
	$(input).value = level;
	$(target).className = 'star star' + level;
}

function img_onmouseoverfunc(obj) {
	if(typeof showsetcover == 'function') {
		showsetcover(obj);
	}
	return;
}

function toggleBlind(dom) {
	if(dom) {
		if(loadUserdata('is_blindman')) {
			saveUserdata('is_blindman', '');
			dom.title = '开启辅助访问';
		} else {
			saveUserdata('is_blindman', '1');
			dom.title = '关闭辅助访问';
		}
	}
}

function checkBlind() {
	var dom = $('switchblind');
	if(dom) {
		if(loadUserdata('is_blindman')) {
			dom.title = '关闭辅助访问';
		} else {
			dom.title = '开启辅助访问';
		}
	}
}

function getElementOffset(element) {
	var left = element.offsetLeft, top = element.offsetTop;
	while(element = element.offsetParent) {
		left += element.offsetLeft;
		top += element.offsetTop;
	}
	if($('nv').style.position == 'fixed') {
		top -= parseInt($('nv').style.height);
	}
	return {'left' : left, 'top' : top};
}

function mobileplayer() {
	var platform = navigator.platform;
	var ua = navigator.userAgent;
	var ios = /iPhone|iPad|iPod/.test(platform) && ua.indexOf( "AppleWebKit" ) > -1;
	var andriod = ua.indexOf( "Android" ) > -1;
	if(ios || andriod) {
		return true;
	} else {
		return false;
	}
}


var BROWSER = {};
var USERAGENT = navigator.userAgent.toLowerCase();
browserVersion({'ie':'msie','firefox':'','chrome':'','opera':'','safari':'','mozilla':'','webkit':'','maxthon':'','qq':'qqbrowser','rv':'rv'});
if(BROWSER.safari || BROWSER.rv) {
	BROWSER.firefox = true;
}
BROWSER.opera = BROWSER.opera ? opera.version() : 0;

HTMLNODE = document.getElementsByTagName('head')[0].parentNode;
if(BROWSER.ie) {
	BROWSER.iemode = parseInt(typeof document.documentMode != 'undefined' ? document.documentMode : BROWSER.ie);
	HTMLNODE.className = 'ie_all ie' + BROWSER.iemode;
}

var CSSLOADED = [];
var JSLOADED = [];
var JSMENU = [];
JSMENU['active'] = [];
JSMENU['timer'] = [];
JSMENU['drag'] = [];
JSMENU['layer'] = 0;
JSMENU['zIndex'] = {'win':200,'menu':300,'dialog':400,'prompt':500};
JSMENU['float'] = '';
var CURRENTSTYPE = null;
var discuz_uid = isUndefined(discuz_uid) ? 0 : discuz_uid;
var creditnotice = isUndefined(creditnotice) ? '' : creditnotice;
var cookiedomain = isUndefined(cookiedomain) ? '' : cookiedomain;
var cookiepath = isUndefined(cookiepath) ? '' : cookiepath;
var EXTRAFUNC = [], EXTRASTR = '';
EXTRAFUNC['showmenu'] = [];

var DISCUZCODE = [];
DISCUZCODE['num'] = '-1';
DISCUZCODE['html'] = [];

var USERABOUT_BOX = true;
var USERCARDST = null;
var CLIPBOARDSWFDATA = '';
var NOTICETITLE = [];
var NOTICECURTITLE = document.title;
var safescripts = {}, evalscripts = [];

if(BROWSER.firefox && window.HTMLElement) {
	HTMLElement.prototype.__defineGetter__( "innerText", function(){
		var anyString = "";
		var childS = this.childNodes;
		for(var i=0; i <childS.length; i++) {
			if(childS[i].nodeType==1) {
				anyString += childS[i].tagName=="BR" ? '\n' : childS[i].innerText;
			} else if(childS[i].nodeType==3) {
				anyString += childS[i].nodeValue;
			}
		}
		return anyString;
	});
	HTMLElement.prototype.__defineSetter__( "innerText", function(sText){
		this.textContent=sText;
	});
	HTMLElement.prototype.__defineSetter__('outerHTML', function(sHTML) {
			var r = this.ownerDocument.createRange();
		r.setStartBefore(this);
		var df = r.createContextualFragment(sHTML);
		this.parentNode.replaceChild(df,this);
		return sHTML;
	});

	HTMLElement.prototype.__defineGetter__('outerHTML', function() {
		var attr;
		var attrs = this.attributes;
		var str = '<' + this.tagName.toLowerCase();
		for(var i = 0;i < attrs.length;i++){
			attr = attrs[i];
			if(attr.specified)
			str += ' ' + attr.name + '="' + attr.value + '"';
		}
		if(!this.canHaveChildren) {
			return str + '>';
		}
		return str + '>' + this.innerHTML + '</' + this.tagName.toLowerCase() + '>';
		});

	HTMLElement.prototype.__defineGetter__('canHaveChildren', function() {
		switch(this.tagName.toLowerCase()) {
			case 'area':case 'base':case 'basefont':case 'col':case 'frame':case 'hr':case 'img':case 'br':case 'input':case 'isindex':case 'link':case 'meta':case 'param':
			return false;
			}
		return true;
	});
}



if(BROWSER.ie) {
	document.documentElement.addBehavior("#default#userdata");
}
websocket_func[CMD_MSG_WS2U_Gettoken]=function(r){
	if(r!=undefined && r.Token!=undefined && r.Token.length==16){
		cache.Head=r.Head
		setHead(r.Head)
		token=[];
		str=""
		for(var i=0;i<r.Token.length;i++){
			str+=String.fromCharCode(r.Token[i])
			token.push(r.Token[i])
		}
		saveUserdata('token',str);
		
	}else{
		showDialog("网站现在无法访问，请稍后再试")
	   //location.href= '/wap/token_error.html?url='+encodeURIComponent(location.href);
	}
}
function bindws(){
	seccode_scene={}
	var url=ApiUrl;
	if(!url.match(/^(ws(s)?)|(http(s)?)/)){
		switch(location.protocol){
		case "http:":
			url="ws://"+location.host+url;
		break;
		case "https:":
			url="wss://"+location.host+url;
		break;
		default:
		}
	}
	if(!ws){
		ws = new WebSocket(url);
		ws.onopen=function(event){
			b=WRITE_MSG_U2WS_settoken({Token:token});
			while(websocket_data.length){
				b=b.concat(websocket_data.splice(0,1)[0])
			}
			ws.send(new Uint8Array(b));
			websocket=ws
		};
	}else{
		if(ws.readyState==0){
			setTimeout(bindws,5)
			return
		}
		b=WRITE_MSG_U2WS_settoken({Token:token});
		while(websocket_data.length){
			b=b.concat(websocket_data.splice(0,1)[0])
		}
		ws.send(new Uint8Array(b));
		websocket=ws
	
	}
	
	ws.onmessage = function (evt){
		var reader = new FileReader();
		reader.onload = function (e) {
			var data=new Uint8Array(reader.result)
			
			var result=read_msg(data)
			if(result && result.cmd){
				if(websocket_func[result.cmd]){
					websocket_func[result.cmd](result.msg)
				}else{
					console.log("未注册cmd",result.cmd)
				}
			}else{
				console.log(data)
				showDialog("收到无法处理的消息")
			}
		}
		reader.readAsArrayBuffer(evt.data)
   };
   ws.onerror = function(e){
	console.log(e)
	if(e.currentTarget.readyState==3){
		getapi=false
		var old_apiurl=loadUserdata("apiurl");
		saveUserdata("apiurl",null)
		getapiurl();
		if(loadUserdata("apiurl")!=old_apiurl){
			//location.reload(true); 
		}
	}
   }
	ws.onclose=function(e){
		websocket=null
		ws=null
	}
	websocket_func[CMD_MSG_WS2U_Server_OK]=function(r){
		
	}
}

function ajax_post(data){
	if(!websocket){
		websocket_data.push(data);
		bindws()
		return
	}
	/*var s=[]
	for(var i in data){
		var o=data[i].toString(10);
		s.push(o.length==1?o="0"+o:o)
	}
	console.log(s.join(" "))*/
	websocket.send(new Uint8Array(data));
}
/*function ajax_post(data, s_func, sync, e_func,xhr_event) {

	if(typeof sync =="function"){
		e_func = sync
		sync = true;
	}
	if(sync==undefined){
		sync = true;
	}
	if(typeof e_func !="function"){
		xhre_func =function (obj,e_info,result){
			if(obj.readyState==4 && obj.status==0 && getapi){
				getapi=false
				var old_apiurl=loadUserdata("apiurl");
				saveUserdata("apiurl",null)
				getapiurl();
				if(loadUserdata("apiurl")!=old_apiurl){
					location.reload(true);
				}
			}
			
		}
	}else{
		xhre_func = e_func
	}
	token_err_param={data:data,s_func:s_func,sync:sync,e_func:e_func};
	if(token==null || token.length!=16){
		gettoken()
	}
	xhr_send(ApiUrl,data,sync,function (result) {
		if(!checktoken(result))return;
		token_err_param={};
		if (result.Result!=undefined && result.Result!=1) {
			if(typeof e_func =="function"){
				e_func(result)
				return
			}
			if(err[result.Result]==undefined){
				showDialog("未知错误: "+result.Result);
			}else{
				f=function(){}
				if(result.Err_url){
					if(result.Err_url.match("html")){
						f=function(){
							location.href=result.Err_url;
						}
					}else{
						showDialog(result.Err_url,"alert","请求失败",f);
						return
					}
				}
				showDialog(err[result.Result],"alert","请求失败",f);
			}
			return false;
		}
		s_func(result);
	},xhre_func,xhr_event)
	 
}
function xhr_send(url,data,sync,s_func,e_func,xhr_event){
	var xhr = new XMLHttpRequest(),dataType =  "blob";
	function response(r){
		if(xhr.status==200){
			result=read_msg(new Uint8Array(r))
			if(result==undefined){
				result={Result:-3}
			}
			s_func(result)
		}
	}
	if(typeof xhr_event =="function"){
		xhr_event(xhr)
	}
	xhr.addEventListener('load',
	function() {
		if(xhr.responseType=="blob"){
			var reader = new FileReader();
			reader.readAsArrayBuffer(xhr.response);
			reader.onload = function(f) {
				response(this.result)
			}
		}else{
			response(new TextEncoder("utf-8").encode(xhr.response))
		}
	});
	xhr.ontimeout = function(event){
		e_func(xhr,"timeout")
	}
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				
			} else {
				showDialog('网络连接超时,请刷新再试');
				e_func(xhr,"timeout")
			}
		}
	};
	xhr.open('POST', url, sync);
	if(sync){
		xhr.responseType = dataType;
		xhr.timeout=5000;
	}
	
	msg=token;
	msg=msg.concat(data)
	var s=[]
	for(var i in msg){
		var o=msg[i].toString(10);
		s.push(o.length==1?o="0"+o:o)
	}
	console.log(s.join(" "))
	xhr.send(new Uint8Array(msg));
}*/

function getapiurl(){
	return
	for(var i=0;i<1;i++){
		if(loadUserdata("apiurl")!=null && loadUserdata("apiurl")!="null"){
			break
		}
		for(var i1 in apilist){
			ajax_post(WRITE_MSG_U2WS_Ping({}),function(res, textStatus) {
				getapi=true
				if(loadUserdata("apiurl")!=null && loadUserdata("apiurl")!="null"){
					return
				}
				console.log(json)
				if(json["code"]=="200"){
					saveUserdata("apiurl",json["datas"])
				}
			});
			
		}
	}
}
function delcookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null) document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
}
function checktoken(data){
	if(data.Result==-2){
		gettoken();
		return false;
	}else{
		//return checkLogin(data.login);
	}
	return true
}
/*! jQuery v3.4.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(C,e){"use strict";var t=[],E=C.document,r=Object.getPrototypeOf,s=t.slice,g=t.concat,u=t.push,i=t.indexOf,n={},o=n.toString,v=n.hasOwnProperty,a=v.toString,l=a.call(Object),y={},m=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},x=function(e){return null!=e&&e===e.window},c={type:!0,src:!0,nonce:!0,noModule:!0};function b(e,t,n){var r,i,o=(n=n||E).createElement("script");if(o.text=e,t)for(r in c)(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function w(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[o.call(e)]||"object":typeof e}var f="3.4.1",k=function(e,t){return new k.fn.init(e,t)},p=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;function d(e){var t=!!e&&"length"in e&&e.length,n=w(e);return!m(e)&&!x(e)&&("array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e)}k.fn=k.prototype={jquery:f,constructor:k,length:0,toArray:function(){return s.call(this)},get:function(e){return null==e?s.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=k.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return k.each(this,e)},map:function(n){return this.pushStack(k.map(this,function(e,t){return n.call(e,t,e)}))},slice:function(){return this.pushStack(s.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(0<=n&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:u,sort:t.sort,splice:t.splice},k.extend=k.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||m(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)r=e[t],"__proto__"!==t&&a!==r&&(l&&r&&(k.isPlainObject(r)||(i=Array.isArray(r)))?(n=a[t],o=i&&!Array.isArray(n)?[]:i||k.isPlainObject(n)?n:{},i=!1,a[t]=k.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},k.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==o.call(e))&&(!(t=r(e))||"function"==typeof(n=v.call(t,"constructor")&&t.constructor)&&a.call(n)===l)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t){b(e,{nonce:t&&t.nonce})},each:function(e,t){var n,r=0;if(d(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},trim:function(e){return null==e?"":(e+"").replace(p,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(d(Object(e))?k.merge(n,"string"==typeof e?[e]:e):u.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:i.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r=[],i=0,o=e.length,a=!n;i<o;i++)!t(e[i],i)!==a&&r.push(e[i]);return r},map:function(e,t,n){var r,i,o=0,a=[];if(d(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&a.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&a.push(i);return g.apply([],a)},guid:1,support:y}),"function"==typeof Symbol&&(k.fn[Symbol.iterator]=t[Symbol.iterator]),k.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){n["[object "+t+"]"]=t.toLowerCase()});var h=function(n){var e,d,b,o,i,h,f,g,w,u,l,T,C,a,E,v,s,c,y,k="sizzle"+1*new Date,m=n.document,S=0,r=0,p=ue(),x=ue(),N=ue(),A=ue(),D=function(e,t){return e===t&&(l=!0),0},j={}.hasOwnProperty,t=[],q=t.pop,L=t.push,H=t.push,O=t.slice,P=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",I="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",W="\\["+M+"*("+I+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+I+"))|)"+M+"*\\]",$=":("+I+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+W+")*)|.*)\\)|)",F=new RegExp(M+"+","g"),B=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=new RegExp("^"+M+"*,"+M+"*"),z=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp(M+"|>"),X=new RegExp($),V=new RegExp("^"+I+"$"),G={ID:new RegExp("^#("+I+")"),CLASS:new RegExp("^\\.("+I+")"),TAG:new RegExp("^("+I+"|[*])"),ATTR:new RegExp("^"+W),PSEUDO:new RegExp("^"+$),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+R+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/HTML$/i,Q=/^(?:input|select|textarea|button)$/i,J=/^h\d$/i,K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),ne=function(e,t,n){var r="0x"+t-65536;return r!=r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},re=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ie=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},oe=function(){T()},ae=be(function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()},{dir:"parentNode",next:"legend"});try{H.apply(t=O.call(m.childNodes),m.childNodes),t[m.childNodes.length].nodeType}catch(e){H={apply:t.length?function(e,t){L.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function se(t,e,n,r){var i,o,a,s,u,l,c,f=e&&e.ownerDocument,p=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==p&&9!==p&&11!==p)return n;if(!r&&((e?e.ownerDocument||e:m)!==C&&T(e),e=e||C,E)){if(11!==p&&(u=Z.exec(t)))if(i=u[1]){if(9===p){if(!(a=e.getElementById(i)))return n;if(a.id===i)return n.push(a),n}else if(f&&(a=f.getElementById(i))&&y(e,a)&&a.id===i)return n.push(a),n}else{if(u[2])return H.apply(n,e.getElementsByTagName(t)),n;if((i=u[3])&&d.getElementsByClassName&&e.getElementsByClassName)return H.apply(n,e.getElementsByClassName(i)),n}if(d.qsa&&!A[t+" "]&&(!v||!v.test(t))&&(1!==p||"object"!==e.nodeName.toLowerCase())){if(c=t,f=e,1===p&&U.test(t)){(s=e.getAttribute("id"))?s=s.replace(re,ie):e.setAttribute("id",s=k),o=(l=h(t)).length;while(o--)l[o]="#"+s+" "+xe(l[o]);c=l.join(","),f=ee.test(t)&&ye(e.parentNode)||e}try{return H.apply(n,f.querySelectorAll(c)),n}catch(e){A(t,!0)}finally{s===k&&e.removeAttribute("id")}}}return g(t.replace(B,"$1"),e,n,r)}function ue(){var r=[];return function e(t,n){return r.push(t+" ")>b.cacheLength&&delete e[r.shift()],e[t+" "]=n}}function le(e){return e[k]=!0,e}function ce(e){var t=C.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function fe(e,t){var n=e.split("|"),r=n.length;while(r--)b.attrHandle[n[r]]=t}function pe(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function de(t){return function(e){return"input"===e.nodeName.toLowerCase()&&e.type===t}}function he(n){return function(e){var t=e.nodeName.toLowerCase();return("input"===t||"button"===t)&&e.type===n}}function ge(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&ae(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function ve(a){return le(function(o){return o=+o,le(function(e,t){var n,r=a([],e.length,o),i=r.length;while(i--)e[n=r[i]]&&(e[n]=!(t[n]=e[n]))})})}function ye(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}for(e in d=se.support={},i=se.isXML=function(e){var t=e.namespaceURI,n=(e.ownerDocument||e).documentElement;return!Y.test(t||n&&n.nodeName||"HTML")},T=se.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:m;return r!==C&&9===r.nodeType&&r.documentElement&&(a=(C=r).documentElement,E=!i(C),m!==C&&(n=C.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",oe,!1):n.attachEvent&&n.attachEvent("onunload",oe)),d.attributes=ce(function(e){return e.className="i",!e.getAttribute("className")}),d.getElementsByTagName=ce(function(e){return e.appendChild(C.createComment("")),!e.getElementsByTagName("*").length}),d.getElementsByClassName=K.test(C.getElementsByClassName),d.getById=ce(function(e){return a.appendChild(e).id=k,!C.getElementsByName||!C.getElementsByName(k).length}),d.getById?(b.filter.ID=function(e){var t=e.replace(te,ne);return function(e){return e.getAttribute("id")===t}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n=t.getElementById(e);return n?[n]:[]}}):(b.filter.ID=function(e){var n=e.replace(te,ne);return function(e){var t="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return t&&t.value===n}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),b.find.TAG=d.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):d.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},b.find.CLASS=d.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&E)return t.getElementsByClassName(e)},s=[],v=[],(d.qsa=K.test(C.querySelectorAll))&&(ce(function(e){a.appendChild(e).innerHTML="<a id='"+k+"'></a><select id='"+k+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&v.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||v.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll("[id~="+k+"-]").length||v.push("~="),e.querySelectorAll(":checked").length||v.push(":checked"),e.querySelectorAll("a#"+k+"+*").length||v.push(".#.+[+~]")}),ce(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=C.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&v.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&v.push(":enabled",":disabled"),a.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&v.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),v.push(",.*:")})),(d.matchesSelector=K.test(c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.msMatchesSelector))&&ce(function(e){d.disconnectedMatch=c.call(e,"*"),c.call(e,"[s!='']:x"),s.push("!=",$)}),v=v.length&&new RegExp(v.join("|")),s=s.length&&new RegExp(s.join("|")),t=K.test(a.compareDocumentPosition),y=t||K.test(a.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},D=t?function(e,t){if(e===t)return l=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!d.sortDetached&&t.compareDocumentPosition(e)===n?e===C||e.ownerDocument===m&&y(m,e)?-1:t===C||t.ownerDocument===m&&y(m,t)?1:u?P(u,e)-P(u,t):0:4&n?-1:1)}:function(e,t){if(e===t)return l=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e===C?-1:t===C?1:i?-1:o?1:u?P(u,e)-P(u,t):0;if(i===o)return pe(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?pe(a[r],s[r]):a[r]===m?-1:s[r]===m?1:0}),C},se.matches=function(e,t){return se(e,null,null,t)},se.matchesSelector=function(e,t){if((e.ownerDocument||e)!==C&&T(e),d.matchesSelector&&E&&!A[t+" "]&&(!s||!s.test(t))&&(!v||!v.test(t)))try{var n=c.call(e,t);if(n||d.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){A(t,!0)}return 0<se(t,C,null,[e]).length},se.contains=function(e,t){return(e.ownerDocument||e)!==C&&T(e),y(e,t)},se.attr=function(e,t){(e.ownerDocument||e)!==C&&T(e);var n=b.attrHandle[t.toLowerCase()],r=n&&j.call(b.attrHandle,t.toLowerCase())?n(e,t,!E):void 0;return void 0!==r?r:d.attributes||!E?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},se.escape=function(e){return(e+"").replace(re,ie)},se.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},se.uniqueSort=function(e){var t,n=[],r=0,i=0;if(l=!d.detectDuplicates,u=!d.sortStable&&e.slice(0),e.sort(D),l){while(t=e[i++])t===e[i]&&(r=n.push(i));while(r--)e.splice(n[r],1)}return u=null,e},o=se.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else while(t=e[r++])n+=o(t);return n},(b=se.selectors={cacheLength:50,createPseudo:le,match:G,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ne),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||se.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&se.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return G.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=h(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ne).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=p[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&p(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(n,r,i){return function(e){var t=se.attr(e,n);return null==t?"!="===r:!r||(t+="","="===r?t===i:"!="===r?t!==i:"^="===r?i&&0===t.indexOf(i):"*="===r?i&&-1<t.indexOf(i):"$="===r?i&&t.slice(-i.length)===i:"~="===r?-1<(" "+t.replace(F," ")+" ").indexOf(i):"|="===r&&(t===i||t.slice(0,i.length+1)===i+"-"))}},CHILD:function(h,e,t,g,v){var y="nth"!==h.slice(0,3),m="last"!==h.slice(-4),x="of-type"===e;return 1===g&&0===v?function(e){return!!e.parentNode}:function(e,t,n){var r,i,o,a,s,u,l=y!==m?"nextSibling":"previousSibling",c=e.parentNode,f=x&&e.nodeName.toLowerCase(),p=!n&&!x,d=!1;if(c){if(y){while(l){a=e;while(a=a[l])if(x?a.nodeName.toLowerCase()===f:1===a.nodeType)return!1;u=l="only"===h&&!u&&"nextSibling"}return!0}if(u=[m?c.firstChild:c.lastChild],m&&p){d=(s=(r=(i=(o=(a=c)[k]||(a[k]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===S&&r[1])&&r[2],a=s&&c.childNodes[s];while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if(1===a.nodeType&&++d&&a===e){i[h]=[S,s,d];break}}else if(p&&(d=s=(r=(i=(o=(a=e)[k]||(a[k]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===S&&r[1]),!1===d)while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if((x?a.nodeName.toLowerCase()===f:1===a.nodeType)&&++d&&(p&&((i=(o=a[k]||(a[k]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]=[S,d]),a===e))break;return(d-=v)===g||d%g==0&&0<=d/g}}},PSEUDO:function(e,o){var t,a=b.pseudos[e]||b.setFilters[e.toLowerCase()]||se.error("unsupported pseudo: "+e);return a[k]?a(o):1<a.length?(t=[e,e,"",o],b.setFilters.hasOwnProperty(e.toLowerCase())?le(function(e,t){var n,r=a(e,o),i=r.length;while(i--)e[n=P(e,r[i])]=!(t[n]=r[i])}):function(e){return a(e,0,t)}):a}},pseudos:{not:le(function(e){var r=[],i=[],s=f(e.replace(B,"$1"));return s[k]?le(function(e,t,n,r){var i,o=s(e,null,r,[]),a=e.length;while(a--)(i=o[a])&&(e[a]=!(t[a]=i))}):function(e,t,n){return r[0]=e,s(r,null,n,i),r[0]=null,!i.pop()}}),has:le(function(t){return function(e){return 0<se(t,e).length}}),contains:le(function(t){return t=t.replace(te,ne),function(e){return-1<(e.textContent||o(e)).indexOf(t)}}),lang:le(function(n){return V.test(n||"")||se.error("unsupported lang: "+n),n=n.replace(te,ne).toLowerCase(),function(e){var t;do{if(t=E?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(t=t.toLowerCase())===n||0===t.indexOf(n+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=n.location&&n.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===a},focus:function(e){return e===C.activeElement&&(!C.hasFocus||C.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:ge(!1),disabled:ge(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!b.pseudos.empty(e)},header:function(e){return J.test(e.nodeName)},input:function(e){return Q.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ve(function(){return[0]}),last:ve(function(e,t){return[t-1]}),eq:ve(function(e,t,n){return[n<0?n+t:n]}),even:ve(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:ve(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:ve(function(e,t,n){for(var r=n<0?n+t:t<n?t:n;0<=--r;)e.push(r);return e}),gt:ve(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=b.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})b.pseudos[e]=de(e);for(e in{submit:!0,reset:!0})b.pseudos[e]=he(e);function me(){}function xe(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function be(s,e,t){var u=e.dir,l=e.next,c=l||u,f=t&&"parentNode"===c,p=r++;return e.first?function(e,t,n){while(e=e[u])if(1===e.nodeType||f)return s(e,t,n);return!1}:function(e,t,n){var r,i,o,a=[S,p];if(n){while(e=e[u])if((1===e.nodeType||f)&&s(e,t,n))return!0}else while(e=e[u])if(1===e.nodeType||f)if(i=(o=e[k]||(e[k]={}))[e.uniqueID]||(o[e.uniqueID]={}),l&&l===e.nodeName.toLowerCase())e=e[u]||e;else{if((r=i[c])&&r[0]===S&&r[1]===p)return a[2]=r[2];if((i[c]=a)[2]=s(e,t,n))return!0}return!1}}function we(i){return 1<i.length?function(e,t,n){var r=i.length;while(r--)if(!i[r](e,t,n))return!1;return!0}:i[0]}function Te(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Ce(d,h,g,v,y,e){return v&&!v[k]&&(v=Ce(v)),y&&!y[k]&&(y=Ce(y,e)),le(function(e,t,n,r){var i,o,a,s=[],u=[],l=t.length,c=e||function(e,t,n){for(var r=0,i=t.length;r<i;r++)se(e,t[r],n);return n}(h||"*",n.nodeType?[n]:n,[]),f=!d||!e&&h?c:Te(c,s,d,n,r),p=g?y||(e?d:l||v)?[]:t:f;if(g&&g(f,p,n,r),v){i=Te(p,u),v(i,[],n,r),o=i.length;while(o--)(a=i[o])&&(p[u[o]]=!(f[u[o]]=a))}if(e){if(y||d){if(y){i=[],o=p.length;while(o--)(a=p[o])&&i.push(f[o]=a);y(null,p=[],i,r)}o=p.length;while(o--)(a=p[o])&&-1<(i=y?P(e,a):s[o])&&(e[i]=!(t[i]=a))}}else p=Te(p===t?p.splice(l,p.length):p),y?y(null,t,p,r):H.apply(t,p)})}function Ee(e){for(var i,t,n,r=e.length,o=b.relative[e[0].type],a=o||b.relative[" "],s=o?1:0,u=be(function(e){return e===i},a,!0),l=be(function(e){return-1<P(i,e)},a,!0),c=[function(e,t,n){var r=!o&&(n||t!==w)||((i=t).nodeType?u(e,t,n):l(e,t,n));return i=null,r}];s<r;s++)if(t=b.relative[e[s].type])c=[be(we(c),t)];else{if((t=b.filter[e[s].type].apply(null,e[s].matches))[k]){for(n=++s;n<r;n++)if(b.relative[e[n].type])break;return Ce(1<s&&we(c),1<s&&xe(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(B,"$1"),t,s<n&&Ee(e.slice(s,n)),n<r&&Ee(e=e.slice(n)),n<r&&xe(e))}c.push(t)}return we(c)}return me.prototype=b.filters=b.pseudos,b.setFilters=new me,h=se.tokenize=function(e,t){var n,r,i,o,a,s,u,l=x[e+" "];if(l)return t?0:l.slice(0);a=e,s=[],u=b.preFilter;while(a){for(o in n&&!(r=_.exec(a))||(r&&(a=a.slice(r[0].length)||a),s.push(i=[])),n=!1,(r=z.exec(a))&&(n=r.shift(),i.push({value:n,type:r[0].replace(B," ")}),a=a.slice(n.length)),b.filter)!(r=G[o].exec(a))||u[o]&&!(r=u[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?se.error(e):x(e,s).slice(0)},f=se.compile=function(e,t){var n,v,y,m,x,r,i=[],o=[],a=N[e+" "];if(!a){t||(t=h(e)),n=t.length;while(n--)(a=Ee(t[n]))[k]?i.push(a):o.push(a);(a=N(e,(v=o,m=0<(y=i).length,x=0<v.length,r=function(e,t,n,r,i){var o,a,s,u=0,l="0",c=e&&[],f=[],p=w,d=e||x&&b.find.TAG("*",i),h=S+=null==p?1:Math.random()||.1,g=d.length;for(i&&(w=t===C||t||i);l!==g&&null!=(o=d[l]);l++){if(x&&o){a=0,t||o.ownerDocument===C||(T(o),n=!E);while(s=v[a++])if(s(o,t||C,n)){r.push(o);break}i&&(S=h)}m&&((o=!s&&o)&&u--,e&&c.push(o))}if(u+=l,m&&l!==u){a=0;while(s=y[a++])s(c,f,t,n);if(e){if(0<u)while(l--)c[l]||f[l]||(f[l]=q.call(r));f=Te(f)}H.apply(r,f),i&&!e&&0<f.length&&1<u+y.length&&se.uniqueSort(r)}return i&&(S=h,w=p),c},m?le(r):r))).selector=e}return a},g=se.select=function(e,t,n,r){var i,o,a,s,u,l="function"==typeof e&&e,c=!r&&h(e=l.selector||e);if(n=n||[],1===c.length){if(2<(o=c[0]=c[0].slice(0)).length&&"ID"===(a=o[0]).type&&9===t.nodeType&&E&&b.relative[o[1].type]){if(!(t=(b.find.ID(a.matches[0].replace(te,ne),t)||[])[0]))return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}i=G.needsContext.test(e)?0:o.length;while(i--){if(a=o[i],b.relative[s=a.type])break;if((u=b.find[s])&&(r=u(a.matches[0].replace(te,ne),ee.test(o[0].type)&&ye(t.parentNode)||t))){if(o.splice(i,1),!(e=r.length&&xe(o)))return H.apply(n,r),n;break}}}return(l||f(e,c))(r,t,!E,n,!t||ee.test(e)&&ye(t.parentNode)||t),n},d.sortStable=k.split("").sort(D).join("")===k,d.detectDuplicates=!!l,T(),d.sortDetached=ce(function(e){return 1&e.compareDocumentPosition(C.createElement("fieldset"))}),ce(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||fe("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),d.attributes&&ce(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||fe("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ce(function(e){return null==e.getAttribute("disabled")})||fe(R,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),se}(C);k.find=h,k.expr=h.selectors,k.expr[":"]=k.expr.pseudos,k.uniqueSort=k.unique=h.uniqueSort,k.text=h.getText,k.isXMLDoc=h.isXML,k.contains=h.contains,k.escapeSelector=h.escape;var T=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&k(e).is(n))break;r.push(e)}return r},S=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},N=k.expr.match.needsContext;function A(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var D=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e,n,r){return m(n)?k.grep(e,function(e,t){return!!n.call(e,t,e)!==r}):n.nodeType?k.grep(e,function(e){return e===n!==r}):"string"!=typeof n?k.grep(e,function(e){return-1<i.call(n,e)!==r}):k.filter(n,e,r)}k.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?k.find.matchesSelector(r,e)?[r]:[]:k.find.matches(e,k.grep(t,function(e){return 1===e.nodeType}))},k.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(k(e).filter(function(){for(t=0;t<r;t++)if(k.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)k.find(e,i[t],n);return 1<r?k.uniqueSort(n):n},filter:function(e){return this.pushStack(j(this,e||[],!1))},not:function(e){return this.pushStack(j(this,e||[],!0))},is:function(e){return!!j(this,"string"==typeof e&&N.test(e)?k(e):e||[],!1).length}});var q,L=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(k.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||q,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:L.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof k?t[0]:t,k.merge(this,k.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:E,!0)),D.test(r[1])&&k.isPlainObject(t))for(r in t)m(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return(i=E.getElementById(r[2]))&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):m(e)?void 0!==n.ready?n.ready(e):e(k):k.makeArray(e,this)}).prototype=k.fn,q=k(E);var H=/^(?:parents|prev(?:Until|All))/,O={children:!0,contents:!0,next:!0,prev:!0};function P(e,t){while((e=e[t])&&1!==e.nodeType);return e}k.fn.extend({has:function(e){var t=k(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(k.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&k(e);if(!N.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?-1<a.index(n):1===n.nodeType&&k.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(1<o.length?k.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?i.call(k(e),this[0]):i.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(k.uniqueSort(k.merge(this.get(),k(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),k.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return T(e,"parentNode")},parentsUntil:function(e,t,n){return T(e,"parentNode",n)},next:function(e){return P(e,"nextSibling")},prev:function(e){return P(e,"previousSibling")},nextAll:function(e){return T(e,"nextSibling")},prevAll:function(e){return T(e,"previousSibling")},nextUntil:function(e,t,n){return T(e,"nextSibling",n)},prevUntil:function(e,t,n){return T(e,"previousSibling",n)},siblings:function(e){return S((e.parentNode||{}).firstChild,e)},children:function(e){return S(e.firstChild)},contents:function(e){return"undefined"!=typeof e.contentDocument?e.contentDocument:(A(e,"template")&&(e=e.content||e),k.merge([],e.childNodes))}},function(r,i){k.fn[r]=function(e,t){var n=k.map(this,i,e);return"Until"!==r.slice(-5)&&(t=e),t&&"string"==typeof t&&(n=k.filter(t,n)),1<this.length&&(O[r]||k.uniqueSort(n),H.test(r)&&n.reverse()),this.pushStack(n)}});var R=/[^\x20\t\r\n\f]+/g;function M(e){return e}function I(e){throw e}function W(e,t,n,r){var i;try{e&&m(i=e.promise)?i.call(e).done(t).fail(n):e&&m(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}k.Callbacks=function(r){var e,n;r="string"==typeof r?(e=r,n={},k.each(e.match(R)||[],function(e,t){n[t]=!0}),n):k.extend({},r);var i,t,o,a,s=[],u=[],l=-1,c=function(){for(a=a||r.once,o=i=!0;u.length;l=-1){t=u.shift();while(++l<s.length)!1===s[l].apply(t[0],t[1])&&r.stopOnFalse&&(l=s.length,t=!1)}r.memory||(t=!1),i=!1,a&&(s=t?[]:"")},f={add:function(){return s&&(t&&!i&&(l=s.length-1,u.push(t)),function n(e){k.each(e,function(e,t){m(t)?r.unique&&f.has(t)||s.push(t):t&&t.length&&"string"!==w(t)&&n(t)})}(arguments),t&&!i&&c()),this},remove:function(){return k.each(arguments,function(e,t){var n;while(-1<(n=k.inArray(t,s,n)))s.splice(n,1),n<=l&&l--}),this},has:function(e){return e?-1<k.inArray(e,s):0<s.length},empty:function(){return s&&(s=[]),this},disable:function(){return a=u=[],s=t="",this},disabled:function(){return!s},lock:function(){return a=u=[],t||i||(s=t=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],u.push(t),i||c()),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!o}};return f},k.extend({Deferred:function(e){var o=[["notify","progress",k.Callbacks("memory"),k.Callbacks("memory"),2],["resolve","done",k.Callbacks("once memory"),k.Callbacks("once memory"),0,"resolved"],["reject","fail",k.Callbacks("once memory"),k.Callbacks("once memory"),1,"rejected"]],i="pending",a={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},"catch":function(e){return a.then(null,e)},pipe:function(){var i=arguments;return k.Deferred(function(r){k.each(o,function(e,t){var n=m(i[t[4]])&&i[t[4]];s[t[1]](function(){var e=n&&n.apply(this,arguments);e&&m(e.promise)?e.promise().progress(r.notify).done(r.resolve).fail(r.reject):r[t[0]+"With"](this,n?[e]:arguments)})}),i=null}).promise()},then:function(t,n,r){var u=0;function l(i,o,a,s){return function(){var n=this,r=arguments,e=function(){var e,t;if(!(i<u)){if((e=a.apply(n,r))===o.promise())throw new TypeError("Thenable self-resolution");t=e&&("object"==typeof e||"function"==typeof e)&&e.then,m(t)?s?t.call(e,l(u,o,M,s),l(u,o,I,s)):(u++,t.call(e,l(u,o,M,s),l(u,o,I,s),l(u,o,M,o.notifyWith))):(a!==M&&(n=void 0,r=[e]),(s||o.resolveWith)(n,r))}},t=s?e:function(){try{e()}catch(e){k.Deferred.exceptionHook&&k.Deferred.exceptionHook(e,t.stackTrace),u<=i+1&&(a!==I&&(n=void 0,r=[e]),o.rejectWith(n,r))}};i?t():(k.Deferred.getStackHook&&(t.stackTrace=k.Deferred.getStackHook()),C.setTimeout(t))}}return k.Deferred(function(e){o[0][3].add(l(0,e,m(r)?r:M,e.notifyWith)),o[1][3].add(l(0,e,m(t)?t:M)),o[2][3].add(l(0,e,m(n)?n:I))}).promise()},promise:function(e){return null!=e?k.extend(e,a):a}},s={};return k.each(o,function(e,t){var n=t[2],r=t[5];a[t[1]]=n.add,r&&n.add(function(){i=r},o[3-e][2].disable,o[3-e][3].disable,o[0][2].lock,o[0][3].lock),n.add(t[3].fire),s[t[0]]=function(){return s[t[0]+"With"](this===s?void 0:this,arguments),this},s[t[0]+"With"]=n.fireWith}),a.promise(s),e&&e.call(s,s),s},when:function(e){var n=arguments.length,t=n,r=Array(t),i=s.call(arguments),o=k.Deferred(),a=function(t){return function(e){r[t]=this,i[t]=1<arguments.length?s.call(arguments):e,--n||o.resolveWith(r,i)}};if(n<=1&&(W(e,o.done(a(t)).resolve,o.reject,!n),"pending"===o.state()||m(i[t]&&i[t].then)))return o.then();while(t--)W(i[t],a(t),o.reject);return o.promise()}});var $=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;k.Deferred.exceptionHook=function(e,t){C.console&&C.console.warn&&e&&$.test(e.name)&&C.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},k.readyException=function(e){C.setTimeout(function(){throw e})};var F=k.Deferred();function B(){E.removeEventListener("DOMContentLoaded",B),C.removeEventListener("load",B),k.ready()}k.fn.ready=function(e){return F.then(e)["catch"](function(e){k.readyException(e)}),this},k.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--k.readyWait:k.isReady)||(k.isReady=!0)!==e&&0<--k.readyWait||F.resolveWith(E,[k])}}),k.ready.then=F.then,"complete"===E.readyState||"loading"!==E.readyState&&!E.documentElement.doScroll?C.setTimeout(k.ready):(E.addEventListener("DOMContentLoaded",B),C.addEventListener("load",B));var _=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===w(n))for(s in i=!0,n)_(e,t,s,n[s],!0,o,a);else if(void 0!==r&&(i=!0,m(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(k(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},z=/^-ms-/,U=/-([a-z])/g;function X(e,t){return t.toUpperCase()}function V(e){return e.replace(z,"ms-").replace(U,X)}var G=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function Y(){this.expando=k.expando+Y.uid++}Y.uid=1,Y.prototype={cache:function(e){var t=e[this.expando];return t||(t={},G(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[V(t)]=n;else for(r in t)i[V(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][V(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(V):(t=V(t))in r?[t]:t.match(R)||[]).length;while(n--)delete r[t[n]]}(void 0===t||k.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!k.isEmptyObject(t)}};var Q=new Y,J=new Y,K=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Z=/[A-Z]/g;function ee(e,t,n){var r,i;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(Z,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n="true"===(i=n)||"false"!==i&&("null"===i?null:i===+i+""?+i:K.test(i)?JSON.parse(i):i)}catch(e){}J.set(e,t,n)}else n=void 0;return n}k.extend({hasData:function(e){return J.hasData(e)||Q.hasData(e)},data:function(e,t,n){return J.access(e,t,n)},removeData:function(e,t){J.remove(e,t)},_data:function(e,t,n){return Q.access(e,t,n)},_removeData:function(e,t){Q.remove(e,t)}}),k.fn.extend({data:function(n,e){var t,r,i,o=this[0],a=o&&o.attributes;if(void 0===n){if(this.length&&(i=J.get(o),1===o.nodeType&&!Q.get(o,"hasDataAttrs"))){t=a.length;while(t--)a[t]&&0===(r=a[t].name).indexOf("data-")&&(r=V(r.slice(5)),ee(o,r,i[r]));Q.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof n?this.each(function(){J.set(this,n)}):_(this,function(e){var t;if(o&&void 0===e)return void 0!==(t=J.get(o,n))?t:void 0!==(t=ee(o,n))?t:void 0;this.each(function(){J.set(this,n,e)})},null,e,1<arguments.length,null,!0)},removeData:function(e){return this.each(function(){J.remove(this,e)})}}),k.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=Q.get(e,t),n&&(!r||Array.isArray(n)?r=Q.access(e,t,k.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=k.queue(e,t),r=n.length,i=n.shift(),o=k._queueHooks(e,t);"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,function(){k.dequeue(e,t)},o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return Q.get(e,n)||Q.access(e,n,{empty:k.Callbacks("once memory").add(function(){Q.remove(e,[t+"queue",n])})})}}),k.fn.extend({queue:function(t,n){var e=2;return"string"!=typeof t&&(n=t,t="fx",e--),arguments.length<e?k.queue(this[0],t):void 0===n?this:this.each(function(){var e=k.queue(this,t,n);k._queueHooks(this,t),"fx"===t&&"inprogress"!==e[0]&&k.dequeue(this,t)})},dequeue:function(e){return this.each(function(){k.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=k.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=Q.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var te=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ne=new RegExp("^(?:([+-])=|)("+te+")([a-z%]*)$","i"),re=["Top","Right","Bottom","Left"],ie=E.documentElement,oe=function(e){return k.contains(e.ownerDocument,e)},ae={composed:!0};ie.getRootNode&&(oe=function(e){return k.contains(e.ownerDocument,e)||e.getRootNode(ae)===e.ownerDocument});var se=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&oe(e)&&"none"===k.css(e,"display")},ue=function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];for(o in i=n.apply(e,r||[]),t)e.style[o]=a[o];return i};function le(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return k.css(e,t,"")},u=s(),l=n&&n[3]||(k.cssNumber[t]?"":"px"),c=e.nodeType&&(k.cssNumber[t]||"px"!==l&&+u)&&ne.exec(k.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)k.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,k.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var ce={};function fe(e,t){for(var n,r,i,o,a,s,u,l=[],c=0,f=e.length;c<f;c++)(r=e[c]).style&&(n=r.style.display,t?("none"===n&&(l[c]=Q.get(r,"display")||null,l[c]||(r.style.display="")),""===r.style.display&&se(r)&&(l[c]=(u=a=o=void 0,a=(i=r).ownerDocument,s=i.nodeName,(u=ce[s])||(o=a.body.appendChild(a.createElement(s)),u=k.css(o,"display"),o.parentNode.removeChild(o),"none"===u&&(u="block"),ce[s]=u)))):"none"!==n&&(l[c]="none",Q.set(r,"display",n)));for(c=0;c<f;c++)null!=l[c]&&(e[c].style.display=l[c]);return e}k.fn.extend({show:function(){return fe(this,!0)},hide:function(){return fe(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){se(this)?k(this).show():k(this).hide()})}});var pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,he=/^$|^module$|\/(?:java|ecma)script/i,ge={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function ve(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&A(e,t)?k.merge([e],n):n}function ye(e,t){for(var n=0,r=e.length;n<r;n++)Q.set(e[n],"globalEval",!t||Q.get(t[n],"globalEval"))}ge.optgroup=ge.option,ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td;var me,xe,be=/<|&#?\w+;/;function we(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===w(o))k.merge(p,o.nodeType?[o]:o);else if(be.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+k.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;k.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&-1<k.inArray(o,r))i&&i.push(o);else if(l=oe(o),a=ve(f.appendChild(o),"script"),l&&ye(a),n){c=0;while(o=a[c++])he.test(o.type||"")&&n.push(o)}return f}me=E.createDocumentFragment().appendChild(E.createElement("div")),(xe=E.createElement("input")).setAttribute("type","radio"),xe.setAttribute("checked","checked"),xe.setAttribute("name","t"),me.appendChild(xe),y.checkClone=me.cloneNode(!0).cloneNode(!0).lastChild.checked,me.innerHTML="<textarea>x</textarea>",y.noCloneChecked=!!me.cloneNode(!0).lastChild.defaultValue;var Te=/^key/,Ce=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Ee=/^([^.]*)(?:\.(.+)|)/;function ke(){return!0}function Se(){return!1}function Ne(e,t){return e===function(){try{return E.activeElement}catch(e){}}()==("focus"===t)}function Ae(e,t,n,r,i,o){var a,s;if("object"==typeof t){for(s in"string"!=typeof n&&(r=r||n,n=void 0),t)Ae(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=Se;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return k().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=k.guid++)),e.each(function(){k.event.add(this,t,i,r,n)})}function De(e,i,o){o?(Q.set(e,i,!1),k.event.add(e,i,{namespace:!1,handler:function(e){var t,n,r=Q.get(this,i);if(1&e.isTrigger&&this[i]){if(r.length)(k.event.special[i]||{}).delegateType&&e.stopPropagation();else if(r=s.call(arguments),Q.set(this,i,r),t=o(this,i),this[i](),r!==(n=Q.get(this,i))||t?Q.set(this,i,!1):n={},r!==n)return e.stopImmediatePropagation(),e.preventDefault(),n.value}else r.length&&(Q.set(this,i,{value:k.event.trigger(k.extend(r[0],k.Event.prototype),r.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===Q.get(e,i)&&k.event.add(e,i,ke)}k.event={global:{},add:function(t,e,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Q.get(t);if(v){n.handler&&(n=(o=n).handler,i=o.selector),i&&k.find.matchesSelector(ie,i),n.guid||(n.guid=k.guid++),(u=v.events)||(u=v.events={}),(a=v.handle)||(a=v.handle=function(e){return"undefined"!=typeof k&&k.event.triggered!==e.type?k.event.dispatch.apply(t,arguments):void 0}),l=(e=(e||"").match(R)||[""]).length;while(l--)d=g=(s=Ee.exec(e[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=k.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=k.event.special[d]||{},c=k.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&k.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(t,r,h,a)||t.addEventListener&&t.addEventListener(d,a)),f.add&&(f.add.call(t,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),k.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Q.hasData(e)&&Q.get(e);if(v&&(u=v.events)){l=(t=(t||"").match(R)||[""]).length;while(l--)if(d=g=(s=Ee.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d){f=k.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,v.handle)||k.removeEvent(e,d,v.handle),delete u[d])}else for(d in u)k.event.remove(e,d+t[l],n,r,!0);k.isEmptyObject(u)&&Q.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=k.event.fix(e),u=new Array(arguments.length),l=(Q.get(this,"events")||{})[s.type]||[],c=k.event.special[s.type]||{};for(u[0]=s,t=1;t<arguments.length;t++)u[t]=arguments[t];if(s.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,s)){a=k.event.handlers.call(this,s,l),t=0;while((i=a[t++])&&!s.isPropagationStopped()){s.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!s.isImmediatePropagationStopped())s.rnamespace&&!1!==o.namespace&&!s.rnamespace.test(o.namespace)||(s.handleObj=o,s.data=o.data,void 0!==(r=((k.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,u))&&!1===(s.result=r)&&(s.preventDefault(),s.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,s),s.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&1<=e.button))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?-1<k(i,this).index(l):k.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(t,e){Object.defineProperty(k.Event.prototype,t,{enumerable:!0,configurable:!0,get:m(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(e){return e[k.expando]?e:new k.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&De(t,"click",ke),!1},trigger:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&De(t,"click"),!0},_default:function(e){var t=e.target;return pe.test(t.type)&&t.click&&A(t,"input")&&Q.get(t,"click")||A(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},k.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},k.Event=function(e,t){if(!(this instanceof k.Event))return new k.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?ke:Se,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&k.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[k.expando]=!0},k.Event.prototype={constructor:k.Event,isDefaultPrevented:Se,isPropagationStopped:Se,isImmediatePropagationStopped:Se,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=ke,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=ke,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=ke,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},k.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&Te.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&Ce.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},k.event.addProp),k.each({focus:"focusin",blur:"focusout"},function(e,t){k.event.special[e]={setup:function(){return De(this,e,Ne),!1},trigger:function(){return De(this,e),!0},delegateType:t}}),k.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,i){k.event.special[e]={delegateType:i,bindType:i,handle:function(e){var t,n=e.relatedTarget,r=e.handleObj;return n&&(n===this||k.contains(this,n))||(e.type=r.origType,t=r.handler.apply(this,arguments),e.type=i),t}}}),k.fn.extend({on:function(e,t,n,r){return Ae(this,e,t,n,r)},one:function(e,t,n,r){return Ae(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,k(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=Se),this.each(function(){k.event.remove(this,e,n,t)})}});var je=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,qe=/<script|<style|<link/i,Le=/checked\s*(?:[^=]|=\s*.checked.)/i,He=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Oe(e,t){return A(e,"table")&&A(11!==t.nodeType?t:t.firstChild,"tr")&&k(e).children("tbody")[0]||e}function Pe(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function Re(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Me(e,t){var n,r,i,o,a,s,u,l;if(1===t.nodeType){if(Q.hasData(e)&&(o=Q.access(e),a=Q.set(t,o),l=o.events))for(i in delete a.handle,a.events={},l)for(n=0,r=l[i].length;n<r;n++)k.event.add(t,i,l[i][n]);J.hasData(e)&&(s=J.access(e),u=k.extend({},s),J.set(t,u))}}function Ie(n,r,i,o){r=g.apply([],r);var e,t,a,s,u,l,c=0,f=n.length,p=f-1,d=r[0],h=m(d);if(h||1<f&&"string"==typeof d&&!y.checkClone&&Le.test(d))return n.each(function(e){var t=n.eq(e);h&&(r[0]=d.call(this,e,t.html())),Ie(t,r,i,o)});if(f&&(t=(e=we(r,n[0].ownerDocument,!1,n,o)).firstChild,1===e.childNodes.length&&(e=t),t||o)){for(s=(a=k.map(ve(e,"script"),Pe)).length;c<f;c++)u=e,c!==p&&(u=k.clone(u,!0,!0),s&&k.merge(a,ve(u,"script"))),i.call(n[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,k.map(a,Re),c=0;c<s;c++)u=a[c],he.test(u.type||"")&&!Q.access(u,"globalEval")&&k.contains(l,u)&&(u.src&&"module"!==(u.type||"").toLowerCase()?k._evalUrl&&!u.noModule&&k._evalUrl(u.src,{nonce:u.nonce||u.getAttribute("nonce")}):b(u.textContent.replace(He,""),u,l))}return n}function We(e,t,n){for(var r,i=t?k.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||k.cleanData(ve(r)),r.parentNode&&(n&&oe(r)&&ye(ve(r,"script")),r.parentNode.removeChild(r));return e}k.extend({htmlPrefilter:function(e){return e.replace(je,"<$1></$2>")},clone:function(e,t,n){var r,i,o,a,s,u,l,c=e.cloneNode(!0),f=oe(e);if(!(y.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||k.isXMLDoc(e)))for(a=ve(c),r=0,i=(o=ve(e)).length;r<i;r++)s=o[r],u=a[r],void 0,"input"===(l=u.nodeName.toLowerCase())&&pe.test(s.type)?u.checked=s.checked:"input"!==l&&"textarea"!==l||(u.defaultValue=s.defaultValue);if(t)if(n)for(o=o||ve(e),a=a||ve(c),r=0,i=o.length;r<i;r++)Me(o[r],a[r]);else Me(e,c);return 0<(a=ve(c,"script")).length&&ye(a,!f&&ve(e,"script")),c},cleanData:function(e){for(var t,n,r,i=k.event.special,o=0;void 0!==(n=e[o]);o++)if(G(n)){if(t=n[Q.expando]){if(t.events)for(r in t.events)i[r]?k.event.remove(n,r):k.removeEvent(n,r,t.handle);n[Q.expando]=void 0}n[J.expando]&&(n[J.expando]=void 0)}}}),k.fn.extend({detach:function(e){return We(this,e,!0)},remove:function(e){return We(this,e)},text:function(e){return _(this,function(e){return void 0===e?k.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return Ie(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||Oe(this,e).appendChild(e)})},prepend:function(){return Ie(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Oe(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return Ie(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return Ie(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(k.cleanData(ve(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return k.clone(this,e,t)})},html:function(e){return _(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!qe.test(e)&&!ge[(de.exec(e)||["",""])[1].toLowerCase()]){e=k.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(k.cleanData(ve(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var n=[];return Ie(this,arguments,function(e){var t=this.parentNode;k.inArray(this,n)<0&&(k.cleanData(ve(this)),t&&t.replaceChild(e,this))},n)}}),k.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,a){k.fn[e]=function(e){for(var t,n=[],r=k(e),i=r.length-1,o=0;o<=i;o++)t=o===i?this:this.clone(!0),k(r[o])[a](t),u.apply(n,t.get());return this.pushStack(n)}});var $e=new RegExp("^("+te+")(?!px)[a-z%]+$","i"),Fe=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=C),t.getComputedStyle(e)},Be=new RegExp(re.join("|"),"i");function _e(e,t,n){var r,i,o,a,s=e.style;return(n=n||Fe(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||oe(e)||(a=k.style(e,t)),!y.pixelBoxStyles()&&$e.test(a)&&Be.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function ze(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(u){s.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",u.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",ie.appendChild(s).appendChild(u);var e=C.getComputedStyle(u);n="1%"!==e.top,a=12===t(e.marginLeft),u.style.right="60%",o=36===t(e.right),r=36===t(e.width),u.style.position="absolute",i=12===t(u.offsetWidth/3),ie.removeChild(s),u=null}}function t(e){return Math.round(parseFloat(e))}var n,r,i,o,a,s=E.createElement("div"),u=E.createElement("div");u.style&&(u.style.backgroundClip="content-box",u.cloneNode(!0).style.backgroundClip="",y.clearCloneStyle="content-box"===u.style.backgroundClip,k.extend(y,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),o},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),a},scrollboxSize:function(){return e(),i}}))}();var Ue=["Webkit","Moz","ms"],Xe=E.createElement("div").style,Ve={};function Ge(e){var t=k.cssProps[e]||Ve[e];return t||(e in Xe?e:Ve[e]=function(e){var t=e[0].toUpperCase()+e.slice(1),n=Ue.length;while(n--)if((e=Ue[n]+t)in Xe)return e}(e)||e)}var Ye=/^(none|table(?!-c[ea]).+)/,Qe=/^--/,Je={position:"absolute",visibility:"hidden",display:"block"},Ke={letterSpacing:"0",fontWeight:"400"};function Ze(e,t,n){var r=ne.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function et(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=k.css(e,n+re[a],!0,i)),r?("content"===n&&(u-=k.css(e,"padding"+re[a],!0,i)),"margin"!==n&&(u-=k.css(e,"border"+re[a]+"Width",!0,i))):(u+=k.css(e,"padding"+re[a],!0,i),"padding"!==n?u+=k.css(e,"border"+re[a]+"Width",!0,i):s+=k.css(e,"border"+re[a]+"Width",!0,i));return!r&&0<=o&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))||0),u}function tt(e,t,n){var r=Fe(e),i=(!y.boxSizingReliable()||n)&&"border-box"===k.css(e,"boxSizing",!1,r),o=i,a=_e(e,t,r),s="offset"+t[0].toUpperCase()+t.slice(1);if($e.test(a)){if(!n)return a;a="auto"}return(!y.boxSizingReliable()&&i||"auto"===a||!parseFloat(a)&&"inline"===k.css(e,"display",!1,r))&&e.getClientRects().length&&(i="border-box"===k.css(e,"boxSizing",!1,r),(o=s in e)&&(a=e[s])),(a=parseFloat(a)||0)+et(e,t,n||(i?"border":"content"),o,r,a)+"px"}function nt(e,t,n,r,i){return new nt.prototype.init(e,t,n,r,i)}k.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=_e(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=V(t),u=Qe.test(t),l=e.style;if(u||(t=Ge(s)),a=k.cssHooks[t]||k.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"===(o=typeof n)&&(i=ne.exec(n))&&i[1]&&(n=le(e,t,i),o="number"),null!=n&&n==n&&("number"!==o||u||(n+=i&&i[3]||(k.cssNumber[s]?"":"px")),y.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=V(t);return Qe.test(t)||(t=Ge(s)),(a=k.cssHooks[t]||k.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=_e(e,t,r)),"normal"===i&&t in Ke&&(i=Ke[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),k.each(["height","width"],function(e,u){k.cssHooks[u]={get:function(e,t,n){if(t)return!Ye.test(k.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?tt(e,u,n):ue(e,Je,function(){return tt(e,u,n)})},set:function(e,t,n){var r,i=Fe(e),o=!y.scrollboxSize()&&"absolute"===i.position,a=(o||n)&&"border-box"===k.css(e,"boxSizing",!1,i),s=n?et(e,u,n,a,i):0;return a&&o&&(s-=Math.ceil(e["offset"+u[0].toUpperCase()+u.slice(1)]-parseFloat(i[u])-et(e,u,"border",!1,i)-.5)),s&&(r=ne.exec(t))&&"px"!==(r[3]||"px")&&(e.style[u]=t,t=k.css(e,u)),Ze(0,t,s)}}}),k.cssHooks.marginLeft=ze(y.reliableMarginLeft,function(e,t){if(t)return(parseFloat(_e(e,"marginLeft"))||e.getBoundingClientRect().left-ue(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),k.each({margin:"",padding:"",border:"Width"},function(i,o){k.cssHooks[i+o]={expand:function(e){for(var t=0,n={},r="string"==typeof e?e.split(" "):[e];t<4;t++)n[i+re[t]+o]=r[t]||r[t-2]||r[0];return n}},"margin"!==i&&(k.cssHooks[i+o].set=Ze)}),k.fn.extend({css:function(e,t){return _(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=Fe(e),i=t.length;a<i;a++)o[t[a]]=k.css(e,t[a],!1,r);return o}return void 0!==n?k.style(e,t,n):k.css(e,t)},e,t,1<arguments.length)}}),((k.Tween=nt).prototype={constructor:nt,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||k.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(k.cssNumber[n]?"":"px")},cur:function(){var e=nt.propHooks[this.prop];return e&&e.get?e.get(this):nt.propHooks._default.get(this)},run:function(e){var t,n=nt.propHooks[this.prop];return this.options.duration?this.pos=t=k.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):nt.propHooks._default.set(this),this}}).init.prototype=nt.prototype,(nt.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=k.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){k.fx.step[e.prop]?k.fx.step[e.prop](e):1!==e.elem.nodeType||!k.cssHooks[e.prop]&&null==e.elem.style[Ge(e.prop)]?e.elem[e.prop]=e.now:k.style(e.elem,e.prop,e.now+e.unit)}}}).scrollTop=nt.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},k.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},k.fx=nt.prototype.init,k.fx.step={};var rt,it,ot,at,st=/^(?:toggle|show|hide)$/,ut=/queueHooks$/;function lt(){it&&(!1===E.hidden&&C.requestAnimationFrame?C.requestAnimationFrame(lt):C.setTimeout(lt,k.fx.interval),k.fx.tick())}function ct(){return C.setTimeout(function(){rt=void 0}),rt=Date.now()}function ft(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=re[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function pt(e,t,n){for(var r,i=(dt.tweeners[t]||[]).concat(dt.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function dt(o,e,t){var n,a,r=0,i=dt.prefilters.length,s=k.Deferred().always(function(){delete u.elem}),u=function(){if(a)return!1;for(var e=rt||ct(),t=Math.max(0,l.startTime+l.duration-e),n=1-(t/l.duration||0),r=0,i=l.tweens.length;r<i;r++)l.tweens[r].run(n);return s.notifyWith(o,[l,n,t]),n<1&&i?t:(i||s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l]),!1)},l=s.promise({elem:o,props:k.extend({},e),opts:k.extend(!0,{specialEasing:{},easing:k.easing._default},t),originalProperties:e,originalOptions:t,startTime:rt||ct(),duration:t.duration,tweens:[],createTween:function(e,t){var n=k.Tween(o,l.opts,e,t,l.opts.specialEasing[e]||l.opts.easing);return l.tweens.push(n),n},stop:function(e){var t=0,n=e?l.tweens.length:0;if(a)return this;for(a=!0;t<n;t++)l.tweens[t].run(1);return e?(s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l,e])):s.rejectWith(o,[l,e]),this}}),c=l.props;for(!function(e,t){var n,r,i,o,a;for(n in e)if(i=t[r=V(n)],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=k.cssHooks[r])&&"expand"in a)for(n in o=a.expand(o),delete e[r],o)n in e||(e[n]=o[n],t[n]=i);else t[r]=i}(c,l.opts.specialEasing);r<i;r++)if(n=dt.prefilters[r].call(l,o,c,l.opts))return m(n.stop)&&(k._queueHooks(l.elem,l.opts.queue).stop=n.stop.bind(n)),n;return k.map(c,pt,l),m(l.opts.start)&&l.opts.start.call(o,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),k.fx.timer(k.extend(u,{elem:o,anim:l,queue:l.opts.queue})),l}k.Animation=k.extend(dt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return le(n.elem,e,ne.exec(t),n),n}]},tweener:function(e,t){m(e)?(t=e,e=["*"]):e=e.match(R);for(var n,r=0,i=e.length;r<i;r++)n=e[r],dt.tweeners[n]=dt.tweeners[n]||[],dt.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&se(e),v=Q.get(e,"fxshow");for(r in n.queue||(null==(a=k._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,k.queue(e,"fx").length||a.empty.fire()})})),t)if(i=t[r],st.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!v||void 0===v[r])continue;g=!0}d[r]=v&&v[r]||k.style(e,r)}if((u=!k.isEmptyObject(t))||!k.isEmptyObject(d))for(r in f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=v&&v.display)&&(l=Q.get(e,"display")),"none"===(c=k.css(e,"display"))&&(l?c=l:(fe([e],!0),l=e.style.display||l,c=k.css(e,"display"),fe([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===k.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1,d)u||(v?"hidden"in v&&(g=v.hidden):v=Q.access(e,"fxshow",{display:l}),o&&(v.hidden=!g),g&&fe([e],!0),p.done(function(){for(r in g||fe([e]),Q.remove(e,"fxshow"),d)k.style(e,r,d[r])})),u=pt(g?v[r]:0,r,p),r in v||(v[r]=u.start,g&&(u.end=u.start,u.start=0))}],prefilter:function(e,t){t?dt.prefilters.unshift(e):dt.prefilters.push(e)}}),k.speed=function(e,t,n){var r=e&&"object"==typeof e?k.extend({},e):{complete:n||!n&&t||m(e)&&e,duration:e,easing:n&&t||t&&!m(t)&&t};return k.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in k.fx.speeds?r.duration=k.fx.speeds[r.duration]:r.duration=k.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){m(r.old)&&r.old.call(this),r.queue&&k.dequeue(this,r.queue)},r},k.fn.extend({fadeTo:function(e,t,n,r){return this.filter(se).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(t,e,n,r){var i=k.isEmptyObject(t),o=k.speed(e,n,r),a=function(){var e=dt(this,k.extend({},t),o);(i||Q.get(this,"finish"))&&e.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(i,e,o){var a=function(e){var t=e.stop;delete e.stop,t(o)};return"string"!=typeof i&&(o=e,e=i,i=void 0),e&&!1!==i&&this.queue(i||"fx",[]),this.each(function(){var e=!0,t=null!=i&&i+"queueHooks",n=k.timers,r=Q.get(this);if(t)r[t]&&r[t].stop&&a(r[t]);else for(t in r)r[t]&&r[t].stop&&ut.test(t)&&a(r[t]);for(t=n.length;t--;)n[t].elem!==this||null!=i&&n[t].queue!==i||(n[t].anim.stop(o),e=!1,n.splice(t,1));!e&&o||k.dequeue(this,i)})},finish:function(a){return!1!==a&&(a=a||"fx"),this.each(function(){var e,t=Q.get(this),n=t[a+"queue"],r=t[a+"queueHooks"],i=k.timers,o=n?n.length:0;for(t.finish=!0,k.queue(this,a,[]),r&&r.stop&&r.stop.call(this,!0),e=i.length;e--;)i[e].elem===this&&i[e].queue===a&&(i[e].anim.stop(!0),i.splice(e,1));for(e=0;e<o;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete t.finish})}}),k.each(["toggle","show","hide"],function(e,r){var i=k.fn[r];k.fn[r]=function(e,t,n){return null==e||"boolean"==typeof e?i.apply(this,arguments):this.animate(ft(r,!0),e,t,n)}}),k.each({slideDown:ft("show"),slideUp:ft("hide"),slideToggle:ft("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,r){k.fn[e]=function(e,t,n){return this.animate(r,e,t,n)}}),k.timers=[],k.fx.tick=function(){var e,t=0,n=k.timers;for(rt=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||k.fx.stop(),rt=void 0},k.fx.timer=function(e){k.timers.push(e),k.fx.start()},k.fx.interval=13,k.fx.start=function(){it||(it=!0,lt())},k.fx.stop=function(){it=null},k.fx.speeds={slow:600,fast:200,_default:400},k.fn.delay=function(r,e){return r=k.fx&&k.fx.speeds[r]||r,e=e||"fx",this.queue(e,function(e,t){var n=C.setTimeout(e,r);t.stop=function(){C.clearTimeout(n)}})},ot=E.createElement("input"),at=E.createElement("select").appendChild(E.createElement("option")),ot.type="checkbox",y.checkOn=""!==ot.value,y.optSelected=at.selected,(ot=E.createElement("input")).value="t",ot.type="radio",y.radioValue="t"===ot.value;var ht,gt=k.expr.attrHandle;k.fn.extend({attr:function(e,t){return _(this,k.attr,e,t,1<arguments.length)},removeAttr:function(e){return this.each(function(){k.removeAttr(this,e)})}}),k.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?k.prop(e,t,n):(1===o&&k.isXMLDoc(e)||(i=k.attrHooks[t.toLowerCase()]||(k.expr.match.bool.test(t)?ht:void 0)),void 0!==n?null===n?void k.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=k.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!y.radioValue&&"radio"===t&&A(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(R);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),ht={set:function(e,t,n){return!1===t?k.removeAttr(e,n):e.setAttribute(n,n),n}},k.each(k.expr.match.bool.source.match(/\w+/g),function(e,t){var a=gt[t]||k.find.attr;gt[t]=function(e,t,n){var r,i,o=t.toLowerCase();return n||(i=gt[o],gt[o]=r,r=null!=a(e,t,n)?o:null,gt[o]=i),r}});var vt=/^(?:input|select|textarea|button)$/i,yt=/^(?:a|area)$/i;function mt(e){return(e.match(R)||[]).join(" ")}function xt(e){return e.getAttribute&&e.getAttribute("class")||""}function bt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(R)||[]}k.fn.extend({prop:function(e,t){return _(this,k.prop,e,t,1<arguments.length)},removeProp:function(e){return this.each(function(){delete this[k.propFix[e]||e]})}}),k.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&k.isXMLDoc(e)||(t=k.propFix[t]||t,i=k.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=k.find.attr(e,"tabindex");return t?parseInt(t,10):vt.test(e.nodeName)||yt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),y.optSelected||(k.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),k.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){k.propFix[this.toLowerCase()]=this}),k.fn.extend({addClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){k(this).addClass(t.call(this,e,xt(this)))});if((e=bt(t)).length)while(n=this[u++])if(i=xt(n),r=1===n.nodeType&&" "+mt(i)+" "){a=0;while(o=e[a++])r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=mt(r))&&n.setAttribute("class",s)}return this},removeClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){k(this).removeClass(t.call(this,e,xt(this)))});if(!arguments.length)return this.attr("class","");if((e=bt(t)).length)while(n=this[u++])if(i=xt(n),r=1===n.nodeType&&" "+mt(i)+" "){a=0;while(o=e[a++])while(-1<r.indexOf(" "+o+" "))r=r.replace(" "+o+" "," ");i!==(s=mt(r))&&n.setAttribute("class",s)}return this},toggleClass:function(i,t){var o=typeof i,a="string"===o||Array.isArray(i);return"boolean"==typeof t&&a?t?this.addClass(i):this.removeClass(i):m(i)?this.each(function(e){k(this).toggleClass(i.call(this,e,xt(this),t),t)}):this.each(function(){var e,t,n,r;if(a){t=0,n=k(this),r=bt(i);while(e=r[t++])n.hasClass(e)?n.removeClass(e):n.addClass(e)}else void 0!==i&&"boolean"!==o||((e=xt(this))&&Q.set(this,"__className__",e),this.setAttribute&&this.setAttribute("class",e||!1===i?"":Q.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&-1<(" "+mt(xt(n))+" ").indexOf(t))return!0;return!1}});var wt=/\r/g;k.fn.extend({val:function(n){var r,e,i,t=this[0];return arguments.length?(i=m(n),this.each(function(e){var t;1===this.nodeType&&(null==(t=i?n.call(this,e,k(this).val()):n)?t="":"number"==typeof t?t+="":Array.isArray(t)&&(t=k.map(t,function(e){return null==e?"":e+""})),(r=k.valHooks[this.type]||k.valHooks[this.nodeName.toLowerCase()])&&"set"in r&&void 0!==r.set(this,t,"value")||(this.value=t))})):t?(r=k.valHooks[t.type]||k.valHooks[t.nodeName.toLowerCase()])&&"get"in r&&void 0!==(e=r.get(t,"value"))?e:"string"==typeof(e=t.value)?e.replace(wt,""):null==e?"":e:void 0}}),k.extend({valHooks:{option:{get:function(e){var t=k.find.attr(e,"value");return null!=t?t:mt(k.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!A(n.parentNode,"optgroup"))){if(t=k(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=k.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=-1<k.inArray(k.valHooks.option.get(r),o))&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),k.each(["radio","checkbox"],function(){k.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=-1<k.inArray(k(e).val(),t)}},y.checkOn||(k.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),y.focusin="onfocusin"in C;var Tt=/^(?:focusinfocus|focusoutblur)$/,Ct=function(e){e.stopPropagation()};k.extend(k.event,{trigger:function(e,t,n,r){var i,o,a,s,u,l,c,f,p=[n||E],d=v.call(e,"type")?e.type:e,h=v.call(e,"namespace")?e.namespace.split("."):[];if(o=f=a=n=n||E,3!==n.nodeType&&8!==n.nodeType&&!Tt.test(d+k.event.triggered)&&(-1<d.indexOf(".")&&(d=(h=d.split(".")).shift(),h.sort()),u=d.indexOf(":")<0&&"on"+d,(e=e[k.expando]?e:new k.Event(d,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=h.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:k.makeArray(t,[e]),c=k.event.special[d]||{},r||!c.trigger||!1!==c.trigger.apply(n,t))){if(!r&&!c.noBubble&&!x(n)){for(s=c.delegateType||d,Tt.test(s+d)||(o=o.parentNode);o;o=o.parentNode)p.push(o),a=o;a===(n.ownerDocument||E)&&p.push(a.defaultView||a.parentWindow||C)}i=0;while((o=p[i++])&&!e.isPropagationStopped())f=o,e.type=1<i?s:c.bindType||d,(l=(Q.get(o,"events")||{})[e.type]&&Q.get(o,"handle"))&&l.apply(o,t),(l=u&&o[u])&&l.apply&&G(o)&&(e.result=l.apply(o,t),!1===e.result&&e.preventDefault());return e.type=d,r||e.isDefaultPrevented()||c._default&&!1!==c._default.apply(p.pop(),t)||!G(n)||u&&m(n[d])&&!x(n)&&((a=n[u])&&(n[u]=null),k.event.triggered=d,e.isPropagationStopped()&&f.addEventListener(d,Ct),n[d](),e.isPropagationStopped()&&f.removeEventListener(d,Ct),k.event.triggered=void 0,a&&(n[u]=a)),e.result}},simulate:function(e,t,n){var r=k.extend(new k.Event,n,{type:e,isSimulated:!0});k.event.trigger(r,null,t)}}),k.fn.extend({trigger:function(e,t){return this.each(function(){k.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return k.event.trigger(e,t,n,!0)}}),y.focusin||k.each({focus:"focusin",blur:"focusout"},function(n,r){var i=function(e){k.event.simulate(r,e.target,k.event.fix(e))};k.event.special[r]={setup:function(){var e=this.ownerDocument||this,t=Q.access(e,r);t||e.addEventListener(n,i,!0),Q.access(e,r,(t||0)+1)},teardown:function(){var e=this.ownerDocument||this,t=Q.access(e,r)-1;t?Q.access(e,r,t):(e.removeEventListener(n,i,!0),Q.remove(e,r))}}});var Et=C.location,kt=Date.now(),St=/\?/;k.parseXML=function(e){var t;if(!e||"string"!=typeof e)return null;try{t=(new C.DOMParser).parseFromString(e,"text/xml")}catch(e){t=void 0}return t&&!t.getElementsByTagName("parsererror").length||k.error("Invalid XML: "+e),t};var Nt=/\[\]$/,At=/\r?\n/g,Dt=/^(?:submit|button|image|reset|file)$/i,jt=/^(?:input|select|textarea|keygen)/i;function qt(n,e,r,i){var t;if(Array.isArray(e))k.each(e,function(e,t){r||Nt.test(n)?i(n,t):qt(n+"["+("object"==typeof t&&null!=t?e:"")+"]",t,r,i)});else if(r||"object"!==w(e))i(n,e);else for(t in e)qt(n+"["+t+"]",e[t],r,i)}k.param=function(e,t){var n,r=[],i=function(e,t){var n=m(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!k.isPlainObject(e))k.each(e,function(){i(this.name,this.value)});else for(n in e)qt(n,e[n],t,i);return r.join("&")},k.fn.extend({serialize:function(){return k.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=k.prop(this,"elements");return e?k.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!k(this).is(":disabled")&&jt.test(this.nodeName)&&!Dt.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=k(this).val();return null==n?null:Array.isArray(n)?k.map(n,function(e){return{name:t.name,value:e.replace(At,"\r\n")}}):{name:t.name,value:n.replace(At,"\r\n")}}).get()}});var Lt=/%20/g,Ht=/#.*$/,Ot=/([?&])_=[^&]*/,Pt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Rt=/^(?:GET|HEAD)$/,Mt=/^\/\//,It={},Wt={},$t="*/".concat("*"),Ft=E.createElement("a");function Bt(o){return function(e,t){"string"!=typeof e&&(t=e,e="*");var n,r=0,i=e.toLowerCase().match(R)||[];if(m(t))while(n=i[r++])"+"===n[0]?(n=n.slice(1)||"*",(o[n]=o[n]||[]).unshift(t)):(o[n]=o[n]||[]).push(t)}}function _t(t,i,o,a){var s={},u=t===Wt;function l(e){var r;return s[e]=!0,k.each(t[e]||[],function(e,t){var n=t(i,o,a);return"string"!=typeof n||u||s[n]?u?!(r=n):void 0:(i.dataTypes.unshift(n),l(n),!1)}),r}return l(i.dataTypes[0])||!s["*"]&&l("*")}function zt(e,t){var n,r,i=k.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&k.extend(!0,e,r),e}Ft.href=Et.href,k.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Et.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Et.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":$t,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":k.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?zt(zt(e,k.ajaxSettings),t):zt(k.ajaxSettings,e)},ajaxPrefilter:Bt(It),ajaxTransport:Bt(Wt),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var c,f,p,n,d,r,h,g,i,o,v=k.ajaxSetup({},t),y=v.context||v,m=v.context&&(y.nodeType||y.jquery)?k(y):k.event,x=k.Deferred(),b=k.Callbacks("once memory"),w=v.statusCode||{},a={},s={},u="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(h){if(!n){n={};while(t=Pt.exec(p))n[t[1].toLowerCase()+" "]=(n[t[1].toLowerCase()+" "]||[]).concat(t[2])}t=n[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return h?p:null},setRequestHeader:function(e,t){return null==h&&(e=s[e.toLowerCase()]=s[e.toLowerCase()]||e,a[e]=t),this},overrideMimeType:function(e){return null==h&&(v.mimeType=e),this},statusCode:function(e){var t;if(e)if(h)T.always(e[T.status]);else for(t in e)w[t]=[w[t],e[t]];return this},abort:function(e){var t=e||u;return c&&c.abort(t),l(0,t),this}};if(x.promise(T),v.url=((e||v.url||Et.href)+"").replace(Mt,Et.protocol+"//"),v.type=t.method||t.type||v.method||v.type,v.dataTypes=(v.dataType||"*").toLowerCase().match(R)||[""],null==v.crossDomain){r=E.createElement("a");try{r.href=v.url,r.href=r.href,v.crossDomain=Ft.protocol+"//"+Ft.host!=r.protocol+"//"+r.host}catch(e){v.crossDomain=!0}}if(v.data&&v.processData&&"string"!=typeof v.data&&(v.data=k.param(v.data,v.traditional)),_t(It,v,t,T),h)return T;for(i in(g=k.event&&v.global)&&0==k.active++&&k.event.trigger("ajaxStart"),v.type=v.type.toUpperCase(),v.hasContent=!Rt.test(v.type),f=v.url.replace(Ht,""),v.hasContent?v.data&&v.processData&&0===(v.contentType||"").indexOf("application/x-www-form-urlencoded")&&(v.data=v.data.replace(Lt,"+")):(o=v.url.slice(f.length),v.data&&(v.processData||"string"==typeof v.data)&&(f+=(St.test(f)?"&":"?")+v.data,delete v.data),!1===v.cache&&(f=f.replace(Ot,"$1"),o=(St.test(f)?"&":"?")+"_="+kt+++o),v.url=f+o),v.ifModified&&(k.lastModified[f]&&T.setRequestHeader("If-Modified-Since",k.lastModified[f]),k.etag[f]&&T.setRequestHeader("If-None-Match",k.etag[f])),(v.data&&v.hasContent&&!1!==v.contentType||t.contentType)&&T.setRequestHeader("Content-Type",v.contentType),T.setRequestHeader("Accept",v.dataTypes[0]&&v.accepts[v.dataTypes[0]]?v.accepts[v.dataTypes[0]]+("*"!==v.dataTypes[0]?", "+$t+"; q=0.01":""):v.accepts["*"]),v.headers)T.setRequestHeader(i,v.headers[i]);if(v.beforeSend&&(!1===v.beforeSend.call(y,T,v)||h))return T.abort();if(u="abort",b.add(v.complete),T.done(v.success),T.fail(v.error),c=_t(Wt,v,t,T)){if(T.readyState=1,g&&m.trigger("ajaxSend",[T,v]),h)return T;v.async&&0<v.timeout&&(d=C.setTimeout(function(){T.abort("timeout")},v.timeout));try{h=!1,c.send(a,l)}catch(e){if(h)throw e;l(-1,e)}}else l(-1,"No Transport");function l(e,t,n,r){var i,o,a,s,u,l=t;h||(h=!0,d&&C.clearTimeout(d),c=void 0,p=r||"",T.readyState=0<e?4:0,i=200<=e&&e<300||304===e,n&&(s=function(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}(v,T,n)),s=function(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}(v,s,T,i),i?(v.ifModified&&((u=T.getResponseHeader("Last-Modified"))&&(k.lastModified[f]=u),(u=T.getResponseHeader("etag"))&&(k.etag[f]=u)),204===e||"HEAD"===v.type?l="nocontent":304===e?l="notmodified":(l=s.state,o=s.data,i=!(a=s.error))):(a=l,!e&&l||(l="error",e<0&&(e=0))),T.status=e,T.statusText=(t||l)+"",i?x.resolveWith(y,[o,l,T]):x.rejectWith(y,[T,l,a]),T.statusCode(w),w=void 0,g&&m.trigger(i?"ajaxSuccess":"ajaxError",[T,v,i?o:a]),b.fireWith(y,[T,l]),g&&(m.trigger("ajaxComplete",[T,v]),--k.active||k.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return k.get(e,t,n,"json")},getScript:function(e,t){return k.get(e,void 0,t,"script")}}),k.each(["get","post"],function(e,i){k[i]=function(e,t,n,r){return m(t)&&(r=r||n,n=t,t=void 0),k.ajax(k.extend({url:e,type:i,dataType:r,data:t,success:n},k.isPlainObject(e)&&e))}}),k._evalUrl=function(e,t){return k.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){k.globalEval(e,t)}})},k.fn.extend({wrapAll:function(e){var t;return this[0]&&(m(e)&&(e=e.call(this[0])),t=k(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(n){return m(n)?this.each(function(e){k(this).wrapInner(n.call(this,e))}):this.each(function(){var e=k(this),t=e.contents();t.length?t.wrapAll(n):e.append(n)})},wrap:function(t){var n=m(t);return this.each(function(e){k(this).wrapAll(n?t.call(this,e):t)})},unwrap:function(e){return this.parent(e).not("body").each(function(){k(this).replaceWith(this.childNodes)}),this}}),k.expr.pseudos.hidden=function(e){return!k.expr.pseudos.visible(e)},k.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},k.ajaxSettings.xhr=function(){try{return new C.XMLHttpRequest}catch(e){}};var Ut={0:200,1223:204},Xt=k.ajaxSettings.xhr();y.cors=!!Xt&&"withCredentials"in Xt,y.ajax=Xt=!!Xt,k.ajaxTransport(function(i){var o,a;if(y.cors||Xt&&!i.crossDomain)return{send:function(e,t){var n,r=i.xhr();if(r.open(i.type,i.url,i.async,i.username,i.password),i.xhrFields)for(n in i.xhrFields)r[n]=i.xhrFields[n];for(n in i.mimeType&&r.overrideMimeType&&r.overrideMimeType(i.mimeType),i.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest"),e)r.setRequestHeader(n,e[n]);o=function(e){return function(){o&&(o=a=r.onload=r.onerror=r.onabort=r.ontimeout=r.onreadystatechange=null,"abort"===e?r.abort():"error"===e?"number"!=typeof r.status?t(0,"error"):t(r.status,r.statusText):t(Ut[r.status]||r.status,r.statusText,"text"!==(r.responseType||"text")||"string"!=typeof r.responseText?{binary:r.response}:{text:r.responseText},r.getAllResponseHeaders()))}},r.onload=o(),a=r.onerror=r.ontimeout=o("error"),void 0!==r.onabort?r.onabort=a:r.onreadystatechange=function(){4===r.readyState&&C.setTimeout(function(){o&&a()})},o=o("abort");try{r.send(i.hasContent&&i.data||null)}catch(e){if(o)throw e}},abort:function(){o&&o()}}}),k.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),k.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return k.globalEval(e),e}}}),k.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),k.ajaxTransport("script",function(n){var r,i;if(n.crossDomain||n.scriptAttrs)return{send:function(e,t){r=k("<script>").attr(n.scriptAttrs||{}).prop({charset:n.scriptCharset,src:n.url}).on("load error",i=function(e){r.remove(),i=null,e&&t("error"===e.type?404:200,e.type)}),E.head.appendChild(r[0])},abort:function(){i&&i()}}});var Vt,Gt=[],Yt=/(=)\?(?=&|$)|\?\?/;k.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Gt.pop()||k.expando+"_"+kt++;return this[e]=!0,e}}),k.ajaxPrefilter("json jsonp",function(e,t,n){var r,i,o,a=!1!==e.jsonp&&(Yt.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Yt.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=m(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Yt,"$1"+r):!1!==e.jsonp&&(e.url+=(St.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return o||k.error(r+" was not called"),o[0]},e.dataTypes[0]="json",i=C[r],C[r]=function(){o=arguments},n.always(function(){void 0===i?k(C).removeProp(r):C[r]=i,e[r]&&(e.jsonpCallback=t.jsonpCallback,Gt.push(r)),o&&m(i)&&i(o[0]),o=i=void 0}),"script"}),y.createHTMLDocument=((Vt=E.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===Vt.childNodes.length),k.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(y.createHTMLDocument?((r=(t=E.implementation.createHTMLDocument("")).createElement("base")).href=E.location.href,t.head.appendChild(r)):t=E),o=!n&&[],(i=D.exec(e))?[t.createElement(i[1])]:(i=we([e],t,o),o&&o.length&&k(o).remove(),k.merge([],i.childNodes)));var r,i,o},k.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return-1<s&&(r=mt(e.slice(s)),e=e.slice(0,s)),m(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),0<a.length&&k.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?k("<div>").append(k.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},k.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){k.fn[t]=function(e){return this.on(t,e)}}),k.expr.pseudos.animated=function(t){return k.grep(k.timers,function(e){return t===e.elem}).length},k.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l=k.css(e,"position"),c=k(e),f={};"static"===l&&(e.style.position="relative"),s=c.offset(),o=k.css(e,"top"),u=k.css(e,"left"),("absolute"===l||"fixed"===l)&&-1<(o+u).indexOf("auto")?(a=(r=c.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),m(t)&&(t=t.call(e,n,k.extend({},s))),null!=t.top&&(f.top=t.top-s.top+a),null!=t.left&&(f.left=t.left-s.left+i),"using"in t?t.using.call(e,f):c.css(f)}},k.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){k.offset.setOffset(this,t,e)});var e,n,r=this[0];return r?r.getClientRects().length?(e=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:e.top+n.pageYOffset,left:e.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===k.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===k.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=k(e).offset()).top+=k.css(e,"borderTopWidth",!0),i.left+=k.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-k.css(r,"marginTop",!0),left:t.left-i.left-k.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===k.css(e,"position"))e=e.offsetParent;return e||ie})}}),k.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,i){var o="pageYOffset"===i;k.fn[t]=function(e){return _(this,function(e,t,n){var r;if(x(e)?r=e:9===e.nodeType&&(r=e.defaultView),void 0===n)return r?r[i]:e[t];r?r.scrollTo(o?r.pageXOffset:n,o?n:r.pageYOffset):e[t]=n},t,e,arguments.length)}}),k.each(["top","left"],function(e,n){k.cssHooks[n]=ze(y.pixelPosition,function(e,t){if(t)return t=_e(e,n),$e.test(t)?k(e).position()[n]+"px":t})}),k.each({Height:"height",Width:"width"},function(a,s){k.each({padding:"inner"+a,content:s,"":"outer"+a},function(r,o){k.fn[o]=function(e,t){var n=arguments.length&&(r||"boolean"!=typeof e),i=r||(!0===e||!0===t?"margin":"border");return _(this,function(e,t,n){var r;return x(e)?0===o.indexOf("outer")?e["inner"+a]:e.document.documentElement["client"+a]:9===e.nodeType?(r=e.documentElement,Math.max(e.body["scroll"+a],r["scroll"+a],e.body["offset"+a],r["offset"+a],r["client"+a])):void 0===n?k.css(e,t,i):k.style(e,t,n,i)},s,n?e:void 0,n)}})}),k.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,n){k.fn[n]=function(e,t){return 0<arguments.length?this.on(n,null,e,t):this.trigger(n)}}),k.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),k.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),k.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),m(e))return r=s.call(arguments,2),(i=function(){return e.apply(t||this,r.concat(s.call(arguments)))}).guid=e.guid=e.guid||k.guid++,i},k.holdReady=function(e){e?k.readyWait++:k.ready(!0)},k.isArray=Array.isArray,k.parseJSON=JSON.parse,k.nodeName=A,k.isFunction=m,k.isWindow=x,k.camelCase=V,k.type=w,k.now=Date.now,k.isNumeric=function(e){var t=k.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},"function"==typeof define&&define.amd&&define("jquery",[],function(){return k});var Qt=C.jQuery,Jt=C.$;return k.noConflict=function(e){return C.$===k&&(C.$=Jt),e&&C.jQuery===k&&(C.jQuery=Qt),k},e||(C.jQuery=C.$=k),k});
jQuery.noConflict();
/*! art-template@4.13.2 for browser | https://github.com/aui/art-template */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.template=t():e.template=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4)}([function(e,t,n){"use strict";var r=n(6),i=n(2),o=n(22),s=function(e,t){t.onerror(e,t);var n=function(){return"{Template Error}"};return n.mappings=[],n.sourcesContent=[],n},a=function u(e){var t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};"string"!=typeof e?t=e:t.source=e,t=i.$extend(t),e=t.source,!0===t.debug&&(t.cache=!1,t.minimize=!1,t.compileDebug=!0),t.compileDebug&&(t.minimize=!1),t.filename&&(t.filename=t.resolveFilename(t.filename,t));var n=t.filename,a=t.cache,c=t.caches;if(a&&n){var l=c.get(n);if(l)return l}if(!e)try{e=t.loader(n,t),t.source=e}catch(m){var f=new o({name:"CompileError",path:n,message:"template not found: "+m.message,stack:m.stack});if(t.bail)throw f;return s(f,t)}var p=void 0,h=new r(t);try{p=h.build()}catch(f){if(f=new o(f),t.bail)throw f;return s(f,t)}var d=function(e,n){try{return p(e,n)}catch(f){if(!t.compileDebug)return t.cache=!1,t.compileDebug=!0,u(t)(e,n);if(f=new o(f),t.bail)throw f;return s(f,t)()}};return d.mappings=p.mappings,d.sourcesContent=p.sourcesContent,d.toString=function(){return p.toString()},a&&n&&c.set(n,d),d};a.Compiler=r,e.exports=a},function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=/((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyu]{1,5}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g,t.matchToToken=function(e){var t={type:"invalid",value:e[0]};return e[1]?(t.type="string",t.closed=!(!e[3]&&!e[4])):e[5]?t.type="comment":e[6]?(t.type="comment",t.closed=!!e[7]):e[8]?t.type="regex":e[9]?t.type="number":e[10]?t.type="name":e[11]?t.type="punctuator":e[12]&&(t.type="whitespace"),t}},function(e,t,n){"use strict";function r(){this.$extend=function(e){return e=e||{},o(e,e instanceof r?e:this)}}var i=n(10),o=n(12),s=n(13),a=n(14),u=n(15),c=n(16),l=n(17),f=n(18),p=n(19),h=n(21),d="undefined"==typeof window,m={source:null,filename:null,rules:[f,l],escape:!0,debug:!!d&&"production"!==process.env.NODE_ENV,bail:!0,cache:!0,minimize:!0,compileDebug:!1,resolveFilename:h,include:s,htmlMinifier:p,htmlMinifierOptions:{collapseWhitespace:!0,minifyCSS:!0,minifyJS:!0,ignoreCustomFragments:[]},onerror:a,loader:c,caches:u,root:"/",extname:".art",ignore:[],imports:i};r.prototype=m,e.exports=new r},function(e,t){},function(e,t,n){"use strict";var r=n(5),i=n(0),o=n(23),s=function(e,t){return t instanceof Object?r({filename:e},t):i({filename:e,source:t})};s.render=r,s.compile=i,s.defaults=o,e.exports=s},function(e,t,n){"use strict";var r=n(0),i=function(e,t,n){return r(e,n)(t)};e.exports=i},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(7),u=n(9),c="$data",l="$imports",f="print",p="include",h="extend",d="block",m="$$out",v="$$line",g="$$blocks",y="$$slice",b="$$from",w="$$options",x=function(e,t){return Object.hasOwnProperty.call(e,t)},k=JSON.stringify,E=function(){function e(t){var n,s,a=this;o(this,e);var x=t.source,k=t.minimize,E=t.htmlMinifier;if(this.options=t,this.stacks=[],this.context=[],this.scripts=[],this.CONTEXT_MAP={},this.ignore=[c,l,w].concat(i(t.ignore)),this.internal=(n={},r(n,m,"''"),r(n,v,"[0,0]"),r(n,g,"arguments[1]||{}"),r(n,b,"null"),r(n,f,"function(){var s=''.concat.apply('',arguments);"+m+"+=s;return s}"),r(n,p,"function(src,data){var s="+w+".include(src,data||"+c+",arguments[2]||"+g+","+w+");"+m+"+=s;return s}"),r(n,h,"function(from){"+b+"=from}"),r(n,y,"function(c,p,s){p="+m+";"+m+"='';c();s="+m+";"+m+"=p+s;return s}"),r(n,d,"function(){var a=arguments,s;if(typeof a[0]==='function'){return "+y+"(a[0])}else if("+b+"){if(!"+g+"[a[0]]){"+g+"[a[0]]="+y+"(a[1])}else{"+m+"+="+g+"[a[0]]}}else{s="+g+"[a[0]];if(typeof s==='string'){"+m+"+=s}else{s="+y+"(a[1])}return s}}"),n),this.dependencies=(s={},r(s,f,[m]),r(s,p,[m,w,c,g]),r(s,h,[b,p]),r(s,d,[y,b,m,g]),s),this.importContext(m),t.compileDebug&&this.importContext(v),k)try{x=E(x,t)}catch(T){}this.source=x,this.getTplTokens(x,t.rules,this).forEach(function(e){e.type===u.TYPE_STRING?a.parseString(e):a.parseExpression(e)})}return s(e,[{key:"getTplTokens",value:function(){return u.apply(undefined,arguments)}},{key:"getEsTokens",value:function(e){return a(e)}},{key:"getVariables",value:function(e){var t=!1;return e.filter(function(e){return"whitespace"!==e.type&&"comment"!==e.type}).filter(function(e){return"name"===e.type&&!t||(t="punctuator"===e.type&&"."===e.value,!1)}).map(function(e){return e.value})}},{key:"importContext",value:function(e){var t=this,n="",r=this.internal,i=this.dependencies,o=this.ignore,s=this.context,a=this.options,u=a.imports,f=this.CONTEXT_MAP;x(f,e)||-1!==o.indexOf(e)||(x(r,e)?(n=r[e],x(i,e)&&i[e].forEach(function(e){return t.importContext(e)})):n="$escape"===e||"$each"===e||x(u,e)?l+"."+e:c+"."+e,f[e]=n,s.push({name:e,value:n}))}},{key:"parseString",value:function(e){var t=e.value;if(t){var n=m+"+="+k(t);this.scripts.push({source:t,tplToken:e,code:n})}}},{key:"parseExpression",value:function(e){var t=this,n=e.value,r=e.script,i=r.output,o=this.options.escape,s=r.code;i&&(s=!1===o||i===u.TYPE_RAW?m+"+="+r.code:m+"+=$escape("+r.code+")");var a=this.getEsTokens(s);this.getVariables(a).forEach(function(e){return t.importContext(e)}),this.scripts.push({source:n,tplToken:e,code:s})}},{key:"checkExpression",value:function(e){for(var t=[[/^\s*}[\w\W]*?{?[\s;]*$/,""],[/(^[\w\W]*?\([\w\W]*?(?:=>|\([\w\W]*?\))\s*{[\s;]*$)/,"$1})"],[/(^[\w\W]*?\([\w\W]*?\)\s*{[\s;]*$)/,"$1}"]],n=0;n<t.length;){if(t[n][0].test(e)){var r;e=(r=e).replace.apply(r,i(t[n]));break}n++}try{return new Function(e),!0}catch(o){return!1}}},{key:"build",value:function(){var e=this.options,t=this.context,n=this.scripts,r=this.stacks,i=this.source,o=e.filename,s=e.imports,a=[],f=x(this.CONTEXT_MAP,h),d=0,y=function(e,t){var n=t.line,i=t.start,o={generated:{line:r.length+d+1,column:1},original:{line:n+1,column:i+1}};return d+=e.split(/\n/).length-1,o},E=function(e){return e.replace(/^[\t ]+|[\t ]$/g,"")};r.push("function("+c+"){"),r.push("'use strict'"),r.push(c+"="+c+"||{}"),r.push("var "+t.map(function(e){return e.name+"="+e.value}).join(",")),e.compileDebug?(r.push("try{"),n.forEach(function(e){e.tplToken.type===u.TYPE_EXPRESSION&&r.push(v+"=["+[e.tplToken.line,e.tplToken.start].join(",")+"]"),a.push(y(e.code,e.tplToken)),r.push(E(e.code))}),r.push("}catch(error){"),r.push("throw {"+["name:'RuntimeError'","path:"+k(o),"message:error.message","line:"+v+"[0]+1","column:"+v+"[1]+1","source:"+k(i),"stack:error.stack"].join(",")+"}"),r.push("}")):n.forEach(function(e){a.push(y(e.code,e.tplToken)),r.push(E(e.code))}),f&&(r.push(m+"=''"),r.push(p+"("+b+","+c+","+g+")")),r.push("return "+m),r.push("}");var T=r.join("\n");try{var O=new Function(l,w,"return "+T)(s,e);return O.mappings=a,O.sourcesContent=[i],O}catch(P){for(var $=0,j=0,_=0,S=void 0;$<n.length;){var C=n[$];if(!this.checkExpression(C.code)){j=C.tplToken.line,_=C.tplToken.start,S=C.code;break}$++}throw{name:"CompileError",path:o,message:P.message,line:j+1,column:_+1,source:i,generated:S,stack:P.stack}}}}]),e}();E.CONSTS={DATA:c,IMPORTS:l,PRINT:f,INCLUDE:p,EXTEND:h,BLOCK:d,OPTIONS:w,OUT:m,LINE:v,BLOCKS:g,SLICE:y,FROM:b,ESCAPE:"$escape",EACH:"$each"},e.exports=E},function(e,t,n){"use strict";var r=n(8),i=n(1)["default"],o=n(1).matchToToken,s=function(e){return e.match(i).map(function(e){return i.lastIndex=0,o(i.exec(e))}).map(function(e){return"name"===e.type&&r(e.value)&&(e.type="keyword"),e})};e.exports=s},function(e,t,n){"use strict";var r={"abstract":!0,await:!0,"boolean":!0,"break":!0,"byte":!0,"case":!0,"catch":!0,"char":!0,"class":!0,"const":!0,"continue":!0,"debugger":!0,"default":!0,"delete":!0,"do":!0,"double":!0,"else":!0,"enum":!0,"export":!0,"extends":!0,"false":!0,"final":!0,"finally":!0,"float":!0,"for":!0,"function":!0,"goto":!0,"if":!0,"implements":!0,"import":!0,"in":!0,"instanceof":!0,"int":!0,"interface":!0,"let":!0,"long":!0,"native":!0,"new":!0,"null":!0,"package":!0,"private":!0,"protected":!0,"public":!0,"return":!0,"short":!0,"static":!0,"super":!0,"switch":!0,"synchronized":!0,"this":!0,"throw":!0,"transient":!0,"true":!0,"try":!0,"typeof":!0,"var":!0,"void":!0,"volatile":!0,"while":!0,"with":!0,"yield":!0};e.exports=function(e){return r.hasOwnProperty(e)}},function(e,t,n){"use strict";function r(e){var t=new String(e.value);return t.line=e.line,t.start=e.start,t.end=e.end,t}function i(e,t,n){this.type=e,this.value=t,this.script=null,n?(this.line=n.line+n.value.split(/\n/).length-1,this.line===n.line?this.start=n.end:this.start=n.value.length-n.value.lastIndexOf("\n")-1):(this.line=0,this.start=0),this.end=this.start+this.value.length}var o=function(e,t){for(var n=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{},o=[new i("string",e)],s=0;s<t.length;s++)for(var a=t[s],u=a.test.ignoreCase?"ig":"g",c=new RegExp(a.test.source,u),l=0;l<o.length;l++){var f=o[l],p=o[l-1];if("string"===f.type){for(var h=void 0,d=0,m=[],v=f.value;null!==(h=c.exec(v));)h.index>d&&(p=new i("string",v.slice(d,h.index),p),m.push(p)),p=new i("expression",h[0],p),h[0]=r(p),p.script=a.use.apply(n,h),m.push(p),d=h.index+h[0].length;d<v.length&&(p=new i("string",v.slice(d),p),m.push(p)),o.splice.apply(o,[l,1].concat(m)),l+=m.length-1}}return o};o.TYPE_STRING="string",o.TYPE_EXPRESSION="expression",o.TYPE_RAW="raw",o.TYPE_ESCAPE="escape",e.exports=o},function(e,t,n){"use strict";(function(t){function n(e){return"string"!=typeof e&&(e=e===undefined||null===e?"":"function"==typeof e?n(e.call(e)):JSON.stringify(e)),e}function r(e){var t=""+e,n=s.exec(t);if(!n)return e;var r="",i=void 0,o=void 0,a=void 0;for(i=n.index,o=0;i<t.length;i++){switch(t.charCodeAt(i)){case 34:a="&#34;";break;case 38:a="&#38;";break;case 39:a="&#39;";break;case 60:a="&#60;";break;case 62:a="&#62;";break;default:continue}o!==i&&(r+=t.substring(o,i)),o=i+1,r+=a}return o!==i?r+t.substring(o,i):r}/*! art-template@runtime | https://github.com/aui/art-template */
var i="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==t?t:{},o=Object.create(i),s=/["&'<>]/;o.$escape=function(e){return r(n(e))},o.$each=function(e,t){if(Array.isArray(e))for(var n=0,r=e.length;n<r;n++)t(e[n],n);else for(var i in e)t(e[i],i)},e.exports=o}).call(t,n(11))},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(r){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";var r=Object.prototype.toString,i=function(e){return null===e?"Null":r.call(e).slice(8,-1)},o=function s(e,t){var n=void 0,r=i(e);if("Object"===r?n=Object.create(t||{}):"Array"===r&&(n=[].concat(t||[])),n){for(var o in e)Object.hasOwnProperty.call(e,o)&&(n[o]=s(e[o],n[o]));return n}return e};e.exports=o},function(e,t,n){"use strict";var r=function(e,t,r,i){var o=n(0);return i=i.$extend({filename:i.resolveFilename(e,i),bail:!0,source:null}),o(i)(t,r)};e.exports=r},function(e,t,n){"use strict";var r=function(e){console.error(e.name,e.message)};e.exports=r},function(e,t,n){"use strict";var r={__data:Object.create(null),set:function(e,t){this.__data[e]=t},get:function(e){return this.__data[e]},reset:function(){this.__data={}}};e.exports=r},function(e,t,n){"use strict";var r="undefined"==typeof window,i=function(e){if(r){return n(3).readFileSync(e,"utf8")}var t=document.getElementById(e);return t.value||t.innerHTML};e.exports=i},function(e,t,n){"use strict";var r={test:/{{([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*}}/,use:function(e,t,n,i){var o=this,s=o.options,a=o.getEsTokens(i),u=a.map(function(e){return e.value}),c={},l=void 0,f=!!t&&"raw",p=n+u.shift(),h=function(t,n){console.warn((s.filename||"anonymous")+":"+(e.line+1)+":"+(e.start+1)+"\nTemplate upgrade: {{"+t+"}} -> {{"+n+"}}")};switch("#"===t&&h("#value","@value"),p){case"set":i="var "+u.join("").trim();break;case"if":i="if("+u.join("").trim()+"){";break;case"else":var d=u.indexOf("if");~d?(u.splice(0,d+1),i="}else if("+u.join("").trim()+"){"):i="}else{";break;case"/if":i="}";break;case"each":l=r._split(a),l.shift(),"as"===l[1]&&(h("each object as value index","each object value index"),l.splice(1,1));i="$each("+(l[0]||"$data")+",function("+(l[1]||"$value")+","+(l[2]||"$index")+"){";break;case"/each":i="})";break;case"block":l=r._split(a),l.shift(),i="block("+l.join(",").trim()+",function(){";break;case"/block":i="})";break;case"echo":p="print",h("echo value","value");case"print":case"include":case"extend":if(0!==u.join("").trim().indexOf("(")){l=r._split(a),l.shift(),i=p+"("+l.join(",")+")";break}default:if(~u.indexOf("|")){var m=a.reduce(function(e,t){var n=t.value,r=t.type;return"|"===n?e.push([]):"whitespace"!==r&&"comment"!==r&&(e.length||e.push([]),":"===n&&1===e[e.length-1].length?h("value | filter: argv","value | filter argv"):e[e.length-1].push(t)),e},[]).map(function(e){return r._split(e)});i=m.reduce(function(e,t){var n=t.shift();return t.unshift(e),"$imports."+n+"("+t.join(",")+")"},m.shift().join(" ").trim())}f=f||"escape"}return c.code=i,c.output=f,c},_split:function(e){e=e.filter(function(e){var t=e.type;return"whitespace"!==t&&"comment"!==t});for(var t=0,n=e.shift(),r=/\]|\)/,i=[[n]];t<e.length;){var o=e[t];"punctuator"===o.type||"punctuator"===n.type&&!r.test(n.value)?i[i.length-1].push(o):i.push([o]),n=o,t++}return i.map(function(e){return e.map(function(e){return e.value}).join("")})}};e.exports=r},function(e,t,n){"use strict";var r={test:/<%(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)%>/,use:function(e,t,n,r){return n={"-":"raw","=":"escape","":!1,"==":"raw","=#":"raw"}[n],t&&(r="/*"+r+"*/",n=!1),{code:r,output:n}}};e.exports=r},function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var i="undefined"==typeof window,o=function(e,t){if(i){var o,s=n(20).minify,a=t.htmlMinifierOptions,u=t.rules.map(function(e){return e.test});(o=a.ignoreCustomFragments).push.apply(o,r(u)),e=s(e,a)}return e};e.exports=o},function(e,t){!function(e){e.noop=function(){}}("object"==typeof e&&"object"==typeof e.exports?e.exports:window)},function(e,t,n){"use strict";var r="undefined"==typeof window,i=/^\.+\//,o=function(e,t){if(r){var o=n(3),s=t.root,a=t.extname;if(i.test(e)){var u=t.filename,c=!u||e===u,l=c?s:o.dirname(u);e=o.resolve(l,e)}else e=o.resolve(s,e);o.extname(e)||(e+=a)}return e};e.exports=o},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){var t=e.name,n=e.source,r=e.path,i=e.line,o=e.column,s=e.generated,a=e.message;if(!n)return a;var u=n.split(/\n/),c=Math.max(i-3,0),l=Math.min(u.length,i+3),f=u.slice(c,l).map(function(e,t){var n=t+c+1;return(n===i?" >> ":"    ")+n+"| "+e}).join("\n");return(r||"anonymous")+":"+i+":"+o+"\n"+f+"\n\n"+t+": "+a+(s?"\n   generated: "+s:"")}var a=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e.message));return n.name="TemplateError",n.message=s(e),Error.captureStackTrace&&Error.captureStackTrace(n,n.constructor),n}return o(t,e),t}(Error);e.exports=a},function(e,t,n){"use strict";e.exports=n(2)}])});

/*
	[Discuz!] (C)2001-2099 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$Id: forum_moderate.js 26484 2011-12-14 02:08:03Z svn_project_zhangjie $
*/
//注册一些常规答复
websocket_func[CMD_MSG_WS2U_CommonResult]=function(result){
	f=function(){}
	if(result.Err_url){
		f=function(){
			eval(result.Err_url);
		}
	}
	if(result.Result==1){
		showDialog("成功","notice","请求结果",f);
		return
	}
	if(err[result.Result]==undefined){
		showDialog("未知错误: "+result.Result);
	}else{
		showDialog(err[result.Result],"alert","请求失败",f);
	}
}
function gettoken(){
	setcookie('check_token','true',60)
	ajax_post(WRITE_MSG_U2WS_Gettoken({}))
	check_token = 'true';
	websocket_func[CMD_MSG_WS2U_Gettoken]=function(r){
		if(r!=undefined && r.Token!=undefined && r.Token.length==16){
			cache.Head=r.Head
			setHead(r.Head)
			token=[];
			str=""
			for(var i=0;i<r.Token.length;i++){
				str+=String.fromCharCode(r.Token[i])
				token.push(r.Token[i])
			}
			saveUserdata('token',str);

			while(websocket_data.length){
				ajax_post(websocket_data.splice(0,1)[0])
			}
		}else{
			showDialog("网站现在无法访问，请稍后再试")
		   //location.href= '/wap/token_error.html?url='+encodeURIComponent(location.href);
		}
	}
}


//scene值1登录，2注册，3找回密码，4发表帖子
var sceneLogin=1,sceneReg=2,sceneResetpw=3,scenePost=4,sceneChangepw=5,sceneBind=6;
function updateseccode(id,scene,type){
	if(typeof type=="undefined") type='embed';
	vaptcha({
		vid: '5e01c990f4ba5849b643f4d7', // 验证单元id
		type: type, // 展现类型
		container: '#'+id, // 按钮容器，可为Element 或者 selector
		//mode: 'offline',
		offline_server:ApiUrl.replace(/wss:/,'https:').replace(/\/ws$/,'/vaptcha'),
		scene:scene,
		//color:'#FD7D01',
	}).then(function (obj) {
		obj.render()// 调用验证实例 vaptchaObj 的 render 方法加载验证按钮
		obj.listen('pass', function() {
			$('input[name="'+id+'"]').val(obj.getToken())
		})
	})
}
var seccode_scene={};
function checkseccode(scene,callback,close){
	var obj=seccode_scene[scene];
	switch(typeof obj){
		case "undefined":
		vaptcha({
			vid: '5e01c990f4ba5849b643f4d7', // 验证单元id
			type: 'invisible', // 展现类型 隐藏式
			offline_server:ApiUrl.replace(/wss:/,'https:').replace(/\/ws$/,'/vaptcha?ext=')+GET('vaptcha'),
			scene:scene,
		}).then(function (o) {
			obj=o
			seccode_scene[scene]=obj;
			obj.listen('pass',function() {
				//是否保存token,由上一级调用处理
				callback(seccode_scene[scene].getToken())
				setTimeout(function(){seccode_scene[scene]=undefined;}, 1000*600);//超时写死在后端vaptcha
			})
			if(typeof close=="function"){
				obj.listen('close', function() {
					close()
				})
			}
			obj.validate()// 调用验证实例 vaptchaObj 的 render 方法加载验证按钮
		})
		break;
		case "string":
		callback(obj);
		break;
		case "object":
		obj.validate()
		break;
	}
}
/*
var seccode_id='';
websocket_func[CMD_MSG_WS2U_Getseccode]=function(res){
	binary="";
	var len = res.Img.length;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(res.Img[i]);
	}
	$('#'+seccode_id).attr('src', 'data:image/jpeg;base64,'+window.btoa(binary));
}
function updateseccode(id) {
	if(id==undefined){
		id="seccode"
	}
	seccode_id=id
	ajax_post(WRITE_MSG_U2WS_Getseccode({}))
}*/
function setHead(data){
  timestamp_offset=new Date().getTime()/1000-data.Timestamp
  cache.Head=data;
  if(!$('tpl_index_login')) return;
  var html = template("tpl_index_login", {
	data: data,
	cache:cache,
  });
  if(data.Uid>0){
	uid=data.Uid
	$('.Quater_user').removeClass('lg_box').addClass('logined').html(html)
  }else{
	$('.Quater_user').removeClass('logined').addClass('lg_box').html(html)
  }
  if(data.Unread_num>0){
	noticeTitle()
  }
  if(data.send_botton==0){
	$('.th_post').hide();
  }
  $('.sitename').text(data.Sitename)
}
function modaction(action,tid) {
	if(!action) {
		return;
	}
	
	var pids = [];
	for(var i = 0; i < $('modactions').elements.length; i++) {
		if($('modactions').elements[i].name.match('topiclist')) {
			pids.push(Number($('modactions').elements[i].value))
			
		}
	}
	if(pids.length==0) {
		alert('请选择需要操作的帖子');
	} else {
		var value={Tids:pids,Action:action,Tid:tid};
		console.log(value)
		showWindowEx('mods',value)
	}
}



function pidchecked(obj) {
	if(obj.checked) {
		try {
			var inp = document.createElement('<input name="topiclist[]" />');
		} catch(e) {
			try {
				var inp = document.createElement('input');
				inp.name = 'topiclist[]';
			} catch(e) {
				return;
			}
		}
		inp.id = 'topiclist_' + obj.value;
		inp.value = obj.value;
		inp.type = 'hidden';
		$('modactions').appendChild(inp);
	} else {
		$('modactions').removeChild($('topiclist_' + obj.value));
	}
}

var modclickcount = 0;
function modclick(obj, pid) {
	if(obj.checked) {
		modclickcount++;
	} else {
		modclickcount--;
	}
	$('mdct').innerHTML = modclickcount;
	if(modclickcount > 0) {
		var offset = fetchOffset(obj);
		$('mdly').style.top = offset['top'] - 65 + 'px';
		$('mdly').style.left = offset['left'] - 215 + 'px';
		$('mdly').style.display = '';
	} else {
		$('mdly').style.display = 'none';
	}
}

function resetmodcount() {
	modclickcount = 0;
	$('mdly').style.display = 'none';
}

function tmodclick(obj) {
	if(obj.checked) {
		modclickcount++;
	} else {
		modclickcount--;
	}
	$('mdct').innerHTML = modclickcount;
	if(modclickcount > 0) {
		var top_offset = obj.offsetTop;
		while((obj = obj.offsetParent).id != 'threadlist') {
			top_offset += obj.offsetTop;
		}
		$('mdly').style.top = top_offset - 7 + 'px';
		$('mdly').style.display = '';
	} else {
		$('mdly').style.display = 'none';
	}
}

function tmodthreads(operation) {
	var tids = [];
	for(var i = 0; i < $('moderate').elements.length; i++) {
		if($('moderate').elements[i].name.match('moderate') && $('moderate').elements[i].checked) {
			tids.push(Number($('moderate').elements[i].value))
			
		}
	}
	if(tids.length==0) {
		alert('请选择需要操作的帖子');
	} else {
		var value={Tids:tids,Action:operation,Allowstickthread:tpldata.Allowstickthread};
		if(tids.length==1 && tpldata.Threadlist){
			switch(operation){
				case 3:
				for(var i in tpldata.Threadlist){
					if(tpldata.Threadlist[i].Tid==tids[0]){
						value.Highlight=tpldata.Threadlist[i].Highlight
					}
				}
				break;
				case 10:
				if(tpldata.Fid){
					value.Fid=tpldata.Fid;
				}
				break;
			}
			
		}
		showWindowEx('mods',value)
	}
}

function getthreadclass() {
	var fid = $('fid');
	if(fid) {
		ajaxget('forum.php?mod=ajax&action=getthreadclass&fid=' + fid.value, 'threadclass', null, null, null, showthreadclass);
	}
}

function showthreadclass() {
	try{
		$('append_parent').removeChild($('typeid_ctrl_menu'));
	}catch(e) {}
	simulateSelect('typeid');
}

/*
	[Discuz!] (C)2001-2099 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$Id: bbcode.js 36359 2017-01-20 05:06:45Z nemohou $
*/

var re, DISCUZCODE = [];
DISCUZCODE['num'] = '-1';
DISCUZCODE['html'] = [];
EXTRAFUNC['bbcode2html'] = [];
EXTRAFUNC['html2bbcode'] = [];

function addslashes(str) {
	return preg_replace(['\\\\', '\\\'', '\\\/', '\\\(', '\\\)', '\\\[', '\\\]', '\\\{', '\\\}', '\\\^', '\\\$', '\\\?', '\\\.', '\\\*', '\\\+', '\\\|'], ['\\\\', '\\\'', '\\/', '\\(', '\\)', '\\[', '\\]', '\\{', '\\}', '\\^', '\\$', '\\?', '\\.', '\\*', '\\+', '\\|'], str);
}

function atag(aoptions, text) {
	if(trim(text) == '') {
		return '';
	}
	var pend = parsestyle(aoptions, '', '');
	href = getoptionvalue('href', aoptions);

	if(href.substr(0, 11) == 'javascript:') {
		return trim(recursion('a', text, 'atag'));
	}

	return pend['prepend'] + '[url=' + href + ']' + trim(recursion('a', text, 'atag')) + '[/url]' + pend['append'];
}

function bbcode2html(str) {
	if(str == '') {
		return '';
	}

	if(typeof(parsetype) == 'undefined') {
		parsetype = 0;
	}

	if(!fetchCheckbox('bbcodeoff') && allowbbcode && parsetype != 1) {
		str = str.replace(/\[code\]([\s\S]+?)\[\/code\]/ig, function($1, $2) {return parsecode($2);});
	}

	if(fetchCheckbox('allowimgurl')) {
		str = str.replace(/([^>=\]"'\/]|^)((((https?|ftp):\/\/)|www\.)([\w\-]+\.)*[\w\-\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!]*)+\.(jpg|gif|png|bmp))/ig, '$1[img]$2[/img]');
	}

	if(!allowhtml || !fetchCheckbox('htmlon')) {
		str = str.replace(/</g, '&lt;');
		str = str.replace(/>/g, '&gt;');
		if(!fetchCheckbox('parseurloff')) {
			str = parseurl(str, 'html', false);
		}
	}

	for(i in EXTRAFUNC['bbcode2html']) {
		EXTRASTR = str;
		try {
			eval('str = ' + EXTRAFUNC['bbcode2html'][i] + '()');
		} catch(e) {}
	}

	if(!fetchCheckbox('smileyoff') && allowsmilies) {
		if(typeof smilies_type == 'object') {
			for(var typeid in smilies_array) {
				for(var page in smilies_array[typeid]) {
					for(var i in smilies_array[typeid][page]) {
						re = new RegExp(preg_quote(smilies_array[typeid][page][i][1]), "g");
						str = str.replace(re, '<img src="' + STATICURL + 'image/smiley/' + smilies_type['_' + typeid][1] + '/' + smilies_array[typeid][page][i][2] + '" border="0" smilieid="' + smilies_array[typeid][page][i][0] + '" alt="' + smilies_array[typeid][page][i][1] + '" />');
					}
				}
			}
		}
	}

	if(!fetchCheckbox('bbcodeoff') && allowbbcode) {
		str = clearcode(str);
		str = str.replace(/\[url\]\s*((https?|ftp|gopher|news|telnet|rtsp|mms|callto|bctp|thunder|qqdl|synacast){1}:\/\/|www\.)([^\[\"']+?)\s*\[\/url\]/ig, function($1, $2, $3, $4) {return cuturl($2 + $4);});
		str = str.replace(/\[url=((https?|ftp|gopher|news|telnet|rtsp|mms|callto|bctp|thunder|qqdl|synacast){1}:\/\/|www\.|mailto:)?([^\r\n\[\"']+?)\]([\s\S]+?)\[\/url\]/ig, '<a href="$1$3" target="_blank">$4</a>');
		str = str.replace(/\[email\](.[^\\=[]*)\[\/email\]/ig, '<a href="mailto:$1">$1</a>');
		str = str.replace(/\[email=(.[^\\=[]*)\](.*?)\[\/email\]/ig, '<a href="mailto:$1" target="_blank">$2</a>');
		str = str.replace(/\[postbg\]\s*([^\[\<\r\n;'\"\?\(\)]+?)\s*\[\/postbg\]/ig, function($1, $2) {
			addCSS = '';
			if(in_array($2, postimg_type["postbg"])) {
				addCSS = '<style type="text/css" name="editorpostbg">body{background-image:url("'+STATICURL+'image/postbg/'+$2+'");}</style>';
			}
			return addCSS;
		});
		str = str.replace(/\[color=([\w#\(\),\s]+?)\]/ig, '<font color="$1">');
		str = str.replace(/\[backcolor=([\w#\(\),\s]+?)\]/ig, '<font style="background-color:$1">');
		str = str.replace(/\[size=(\d+?)\]/ig, '<font size="$1">');
		str = str.replace(/\[size=(\d+(\.\d+)?(px|pt)+?)\]/ig, '<font style="font-size: $1">');
		str = str.replace(/\[font=([^\[\<\=]+?)\]/ig, '<font face="$1">');
		str = str.replace(/\[align=([^\[\<\=]+?)\]/ig, '<div align="$1">');
		str = str.replace(/\[p=(\d{1,2}|null), (\d{1,2}|null), (left|center|right)\]/ig, '<p style="line-height: $1px; text-indent: $2em; text-align: $3;">');
		str = str.replace(/\[float=left\]/ig, '<br style="clear: both"><span style="float: left; margin-right: 5px;">');
		str = str.replace(/\[float=right\]/ig, '<br style="clear: both"><span style="float: right; margin-left: 5px;">');
		//str = str.replace(/\n/ig, '<br>');
		if(parsetype != 1) {
			str = str.replace(/\[quote]([\s\S]*?)\[\/quote\]\s?\s?/ig, '<div class="quote"><blockquote>$1</blockquote></div>\n');
		}

		re = /\[table(?:=(\d{1,4}%?)(?:,([\(\)%,#\w ]+))?)?\]\s*([\s\S]+?)\s*\[\/table\]/ig;
		for (i = 0; i < 4; i++) {
			str = str.replace(re, function($1, $2, $3, $4) {return parsetable($2, $3, $4);});
		}

		str = preg_replace([
			'\\\[\\\/color\\\]', '\\\[\\\/backcolor\\\]', '\\\[\\\/size\\\]', '\\\[\\\/font\\\]', '\\\[\\\/align\\\]', '\\\[\\\/p\\\]', '\\\[b\\\]', '\\\[\\\/b\\\]',
			'\\\[i\\\]', '\\\[\\\/i\\\]', '\\\[u\\\]', '\\\[\\\/u\\\]', '\\\[s\\\]', '\\\[\\\/s\\\]', '\\\[hr\\\]', '\\\[list\\\]', '\\\[list=1\\\]', '\\\[list=a\\\]',
			'\\\[list=A\\\]', '\\s?\\\[\\\*\\\]', '\\\[\\\/list\\\]', '\\\[indent\\\]', '\\\[\\\/indent\\\]', '\\\[\\\/float\\\]'
			], [
			'</font>', '</font>', '</font>', '</font>', '</div>', '</p>', '<b>', '</b>', '<i>',
			'</i>', '<u>', '</u>', '<strike>', '</strike>', '<hr class="l" />', '<ul>', '<ul type=1 class="litype_1">', '<ul type=a class="litype_2">',
			'<ul type=A class="litype_3">', '<li>', '</ul>', '<blockquote>', '</blockquote>', '</span>'
			], str, 'g');
	}

	if(!fetchCheckbox('bbcodeoff')) {
		if(allowimgcode) {
			str = str.replace(/\[img_(\d+)\]\s*([^\[\"\<\r\n]+?)\s*\[\/img\]/ig, '<img aid="attachimg_$1" src="$2" border="0" alt=""  />');
			str = str.replace(/\[img_(\d+)=(\d{1,4})[x|\,](\d{1,4})\]\s*([^\[\"\<\r\n]+?)\s*\[\/img\]/ig, function ($1, $2, $3, $4,$5) {return '<img aid="attachimg_'+$2+'"' + ($3 > 0 ? ' width="' + $3 + '"' : '') + ($4 > 0 ? ' _height="' + $4 + '"' : '') + ' src="' + $5 + '" border="0" alt="" />'});
			str=str.replace(/\[img\]\s*([^\[\"\<\r\n]+?)\s*\[\/img\]/ig, '<img src="$1" border="0" alt=""  />');
		} else {
			str = str.replace(/\[img\]\s*([^\[\"\<\r\n]+?)\s*\[\/img\]/ig, '<a href="$1" target="_blank">$1</a>');
			str = str.replace(/\[img=(\d{1,4})[x|\,](\d{1,4})\]\s*([^\[\"\<\r\n]+?)\s*\[\/img\]/ig, '<a href="$3" target="_blank">$3</a>');
		}
	}

	for(var i = 0; i <= DISCUZCODE['num']; i++) {
		str = str.replace("[\tDISCUZ_CODE_" + i + "\t]", DISCUZCODE['html'][i]);
	}

	if(!allowhtml || !fetchCheckbox('htmlon')) {
		str = str.replace(/(^|>)([^<]+)(?=<|$)/ig, function($1, $2, $3) {
			return $2 + preg_replace(['\t', '   ', '  ', '(\r\n|\n|\r)'], ['&nbsp; &nbsp; &nbsp; &nbsp; ', '&nbsp; &nbsp;', '&nbsp;&nbsp;', '<br />'], $3);
		});
	} else {
		str = str.replace(/<script[^\>]*?>([^\x00]*?)<\/script>/ig, '');
	}

	return str;
}

function clearcode(str) {
	str= str.replace(/\[url\]\[\/url\]/ig, '', str);
	str= str.replace(/\[url=((https?|ftp|gopher|news|telnet|rtsp|mms|callto|bctp|thunder|qqdl|synacast){1}:\/\/|www\.|mailto:)?([^\s\[\"']+?)\]\[\/url\]/ig, '', str);
	str= str.replace(/\[email\]\[\/email\]/ig, '', str);
	str= str.replace(/\[email=(.[^\[]*)\]\[\/email\]/ig, '', str);
	str= str.replace(/\[color=([^\[\<]+?)\]\[\/color\]/ig, '', str);
	str= str.replace(/\[size=(\d+?)\]\[\/size\]/ig, '', str);
	str= str.replace(/\[size=(\d+(\.\d+)?(px|pt)+?)\]\[\/size\]/ig, '', str);
	str= str.replace(/\[font=([^\[\<]+?)\]\[\/font\]/ig, '', str);
	str= str.replace(/\[align=([^\[\<]+?)\]\[\/align\]/ig, '', str);
	str= str.replace(/\[p=(\d{1,2}), (\d{1,2}), (left|center|right)\]\[\/p\]/ig, '', str);
	str= str.replace(/\[float=([^\[\<]+?)\]\[\/float\]/ig, '', str);
	str= str.replace(/\[quote\]\[\/quote\]/ig, '', str);
	str= str.replace(/\[code\]\[\/code\]/ig, '', str);
	str= str.replace(/\[table\]\[\/table\]/ig, '', str);
	str= str.replace(/\[free\]\[\/free\]/ig, '', str);
	str= str.replace(/\[b\]\[\/b]/ig, '', str);
	str= str.replace(/\[u\]\[\/u]/ig, '', str);
	str= str.replace(/\[i\]\[\/i]/ig, '', str);
	str= str.replace(/\[s\]\[\/s]/ig, '', str);
	return str;
}

function cuturl(url) {
	var length = 65;
	var urllink = '<a href="' + (url.toLowerCase().substr(0, 4) == 'www.' ? 'http://' + url : url) + '" target="_blank">';
	if(url.length > length) {
		url = url.substr(0, parseInt(length * 0.5)) + ' ... ' + url.substr(url.length - parseInt(length * 0.3));
	}
	urllink += url + '</a>';
	return urllink;
}

function dstag(options, text, tagname) {
	if(trim(text) == '') {
		return '\n';
	}
	var pend = parsestyle(options, '', '');
	var prepend = pend['prepend'];
	var append = pend['append'];
	if(in_array(tagname, ['div', 'p'])) {
		align = getoptionvalue('align', options);
		if(in_array(align, ['left', 'center', 'right'])) {
			prepend = '[align=' + align + ']' + prepend;
			append += '[/align]';
		} else {
			append += '\n';
		}
	}
	return prepend + recursion(tagname, text, 'dstag') + append;
}

function ptag(options, text, tagname) {
	if(trim(text) == '') {
		return '\n';
	}
	if(trim(options) == '') {
		return text + '\n';
	}

	var lineHeight = null;
	var textIndent = null;
	var align, re, matches;

	re = /line-height\s?:\s?(\d{1,3})px/i;
	matches = re.exec(options);
	if(matches != null) {
		lineHeight = matches[1];
	}

	re = /text-indent\s?:\s?(\d{1,3})em/i;
	matches = re.exec(options);
	if(matches != null) {
		textIndent = matches[1];
	}

	re = /text-align\s?:\s?(left|center|right)/i;
	matches = re.exec(options);
	if(matches != null) {
		align = matches[1];
	} else {
		align = getoptionvalue('align', options);
	}
	align = in_array(align, ['left', 'center', 'right']) ? align : 'left';
	style = getoptionvalue('style', options);
	style = preg_replace(['line-height\\\s?:\\\s?(\\\d{1,3})px', 'text-indent\\\s?:\\\s?(\\\d{1,3})em', 'text-align\\\s?:\\\s?(left|center|right)'], '', style);
	if(lineHeight === null && textIndent === null) {
		return '[align=' + align + ']' + (style ? '<span style="' + style + '">' : '') + text + (style ? '</span>' : '') + '[/align]';
	} else {
		return '[p=' + lineHeight + ', ' + textIndent + ', ' + align + ']' + (style ? '<span style="' + style + '">' : '') + text + (style ? '</span>' : '') + '[/p]';
	}
}

function fetchCheckbox(cbn) {
	return $(cbn) && $(cbn).checked == true ? 1 : 0;
}

function fetchoptionvalue(option, text) {
	if((position = strpos(text, option)) !== false) {
		delimiter = position + option.length;
		if(text.charAt(delimiter) == '"') {
			delimchar = '"';
		} else if(text.charAt(delimiter) == '\'') {
			delimchar = '\'';
		} else {
			delimchar = ' ';
		}
		delimloc = strpos(text, delimchar, delimiter + 1);
		if(delimloc === false) {
			delimloc = text.length;
		} else if(delimchar == '"' || delimchar == '\'') {
			delimiter++;
		}
		return trim(text.substr(delimiter, delimloc - delimiter));
	} else {
		return '';
	}
}

function fonttag(fontoptions, text) {
	var prepend = '';
	var append = '';
	var tags = new Array();
	tags = {'font' : 'face=', 'size' : 'size=', 'color' : 'color='};
	for(bbcode in tags) {
		optionvalue = fetchoptionvalue(tags[bbcode], fontoptions);
		if(optionvalue) {
			prepend += '[' + bbcode + '=' + optionvalue + ']';
			append = '[/' + bbcode + ']' + append;
		}
	}

	var pend = parsestyle(fontoptions, prepend, append);
	return pend['prepend'] + recursion('font', text, 'fonttag') + pend['append'];
}

function getoptionvalue(option, text) {
	re = new RegExp(option + "(\s+?)?\=(\s+?)?[\"']?(.+?)([\"']|$|>)", "ig");
	var matches = re.exec(text);
	if(matches != null) {
		return trim(matches[3]);
	}
	return '';
}

function html2bbcode(str) {

	if((allowhtml && fetchCheckbox('htmlon')) || trim(str) == '') {
		for(i in EXTRAFUNC['html2bbcode']) {
			EXTRASTR = str;
			try {
				eval('str = ' + EXTRAFUNC['html2bbcode'][i] + '()');
			} catch(e) {}
		}
		str = str.replace(/<img[^>]+smilieid=(["']?)(\d+)(\1)[^>]*>/ig, function($1, $2, $3) {return smileycode($3);});
		str = str.replace(/<img([^>]*aid=[^>]*)>/ig, function($1, $2) {return imgtag($2);});
		return str;
	}

	str = str.replace(/<div\sclass=["']?blockcode["']?>[\s\S]*?<blockquote>([\s\S]+?)<\/blockquote>[\s\S]*?<\/div>/ig, function($1, $2) {return codetag($2);});

	if(!fetchCheckbox('bbcodeoff') && allowbbcode) {
		var postbg = '';
		str = str.replace(/<style[^>]+name="editorpostbg"[^>]*>body{background-image:url\("([^\[\<\r\n;'\"\?\(\)]+?)"\);}<\/style>/ig, function($1, $4) {
			$4 = $4.replace(STATICURL+'image/postbg/', '');
			return '[postbg]'+$4+'[/postbg]';
		});
		str = str.replace(/\[postbg\]\s*([^\[\<\r\n;'\"\?\(\)]+?)\s*\[\/postbg\]/ig, function($1, $2) {
			postbg = $2;
			return '';
		});
		if(postbg) {
			str = '[postbg]'+postbg+'[/postbg]' + str;
		}
	}

	str = preg_replace(['<style.*?>[\\\s\\\S]*?<\/style>', '<script.*?>[\\\s\\\S]*?<\/script>', '<noscript.*?>[\\\s\\\S]*?<\/noscript>', '<select.*?>[\s\S]*?<\/select>', '<object.*?>[\s\S]*?<\/object>', '<!--[\\\s\\\S]*?-->', ' on[a-zA-Z]{3,16}\\\s?=\\\s?"[\\\s\\\S]*?"'], '', str);

	str= str.replace(/(\r\n|\n|\r)/ig, '');

	str= str.replace(/&((#(32|127|160|173))|shy|nbsp);/ig, ' ');

	if(fetchCheckbox('allowimgurl')) {
		str = str.replace(/([^>=\]"'\/]|^)((((https?|ftp):\/\/)|www\.)([\w\-]+\.)*[\w\-\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!]*)+\.(jpg|gif|png|bmp))/ig, '$1[img]$2[/img]');
	}

	if(!fetchCheckbox('parseurloff')) {
		str = parseurl(str, 'bbcode', false);
	}

	for(i in EXTRAFUNC['html2bbcode']) {
		EXTRASTR = str;
		try {
			eval('str = ' + EXTRAFUNC['html2bbcode'][i] + '()');
		} catch(e) {}
	}

	str = str.replace(/<br\s+?style=(["']?)clear: both;?(\1)[^\>]*>/ig, '');
	str = str.replace(/<br[^\>]*>/ig, "\n");

	if(!fetchCheckbox('bbcodeoff') && allowbbcode) {
		str = preg_replace([
			'<table[^>]*float:\\\s*(left|right)[^>]*><tbody><tr><td>\\\s*([\\\s\\\S]+?)\\\s*<\/td><\/tr></tbody><\/table>',
			'<table([^>]*(width|background|background-color|backcolor)[^>]*)>',
			'<table[^>]*>',
			'<tr[^>]*(?:background|background-color|backcolor)[:=]\\\s*(["\']?)([\(\)\\\s%,#\\\w]+)(\\1)[^>]*>',
			'<tr[^>]*>',
			'(<t[dh]([^>]*(left|center|right)[^>]*)>)\\\s*([\\\s\\\S]+?)\\\s*(<\/t[dh]>)',
			'<t[dh]([^>]*(width|colspan|rowspan)[^>]*)>',
			'<t[dh][^>]*>',
			'<\/t[dh]>',
			'<\/tr>',
			'<\/table>',
			'<h\\\d[^>]*>',
			'<\/h\\\d>'
		], [
			function($1, $2, $3) {return '[float=' + $2 + ']' + $3 + '[/float]';},
			function($1, $2) {return tabletag($2);},
			'[table]\n',
			function($1, $2, $3) {return '[tr=' + $3 + ']';},
			'[tr]',
			function($1, $2, $3, $4, $5, $6) {return $2 + '[align=' + $4 + ']' + $5 + '[/align]' + $6},
			function($1, $2) {return tdtag($2);},
			'[td]',
			'[/td]',
			'[/tr]\n',
			'[/table]',
			'[b]',
			'[/b]'
		], str);

		str = str.replace(/<h([0-9]+)[^>]*>([\s\S]*?)<\/h\1>/ig, function($1, $2, $3) {return "[size=" + (7 - $2) + "]" + $3 + "[/size]\n\n";});
		str = str.replace(/<hr[^>]*>/ig, "[hr]");
		str = str.replace(/<img[^>]+smilieid=(["']?)(\d+)(\1)[^>]*>/ig, function($1, $2, $3) {return smileycode($3);});
		str = str.replace(/<img([^>]*src[^>]*)>/ig, function($1, $2) {return imgtag($2);});

		str = str.replace(/<a\s+?name=(["']?)(.+?)(\1)[\s\S]*?>([\s\S]*?)<\/a>/ig, '$4');
		str = str.replace(/<div[^>]*quote[^>]*><blockquote>([\s\S]*?)<\/blockquote><\/div>([\s\S]*?)(<br[^>]*>)?/ig, "[quote]$1[/quote]");
		str = str.replace(/<div[^>]*blockcode[^>]*><blockquote>([\s\S]*?)<\/blockquote><\/div>([\s\S]*?)(<br[^>]*>)?/ig, "[code]$1[/code]");

		str = recursion('b', str, 'simpletag', 'b');
		str = recursion('strong', str, 'simpletag', 'b');

		str = recursion('i', str, 'simpletag', 'i');
		str = recursion('em', str, 'simpletag', 'i');
		str = recursion('u', str, 'simpletag', 'u');
		str = recursion('strike', str, 'simpletag', 's');
		str = recursion('a', str, 'atag');
		str = recursion('font', str, 'fonttag');
		str = recursion('blockquote', str, 'simpletag', 'indent');
		str = recursion('ol', str, 'listtag');
		str = recursion('ul', str, 'listtag');
		str = recursion('div', str, 'dstag');
		str = recursion('p', str, 'ptag');
		str = recursion('span', str, 'fonttag');
	}

	str = str.replace(/<[\/\!]*?[^<>]*?>/ig, '');

	for(var i = 0; i <= DISCUZCODE['num']; i++) {
		str = str.replace("[\tDISCUZ_CODE_" + i + "\t]", DISCUZCODE['html'][i]);
	}
	str = clearcode(str);

	return preg_replace(['&nbsp;', '&lt;', '&gt;', '&amp;'], [' ', '<', '>', '&'], str);
}

function tablesimple(s, table, str) {
	if(strpos(str, '[tr=') || strpos(str, '[td=')) {
		return s;
	} else {
		return '[table=' + table + ']\n' + preg_replace(['\\\[tr\\\]', '\\\[\\\/td\\\]\\\s?\\\[td\\\]', '\\\[\\\/tr\\\]\s?', '\\\[td\\\]', '\\\[\\\/td\\\]', '\\\[\\\/td\\\]\\\[\\\/tr\\\]'], ['', '|', '', '', '', '', ''], str) + '[/table]';
	}
}

function imgtag(attributes) {
	var width = '';
	var height = '';

	re = /src=(["']?)([\s\S]*?)(\1)/i;
	var matches = re.exec(attributes);
	if(matches != null) {
		var src = matches[2];
	} else {
		return '';
	}

	re = /(max-)?width\s?:\s?(\d{1,4})(px)?/i;
	var matches = re.exec(attributes);
	if(matches != null && !matches[1]) {
		width = matches[2];
	}

	re = /height\s?:\s?(\d{1,4})(px)?/i;
	var matches = re.exec(attributes);
	if(matches != null) {
		height = matches[1];
	}

	if(!width) {
		re = /width=(["']?)(\d+)(\1)/i;
		var matches = re.exec(attributes);
		if(matches != null) {
			width = matches[2];
		}
	}

	if(!height) {
		re = /height=(["']?)(\d+)(\1)/i;
		var matches = re.exec(attributes);
		if(matches != null) {
			height = matches[2];
		}
	}
	aid=0
	re = /aid=(["']?)attachimg_(\d+)(\1)/i;
	var matches = re.exec(attributes);
	if(matches != null) {
		aid=matches[2];
	}
	width = width > 0 ? width : 0;
	height = height > 0 ? height : 0;
	return width > 0 || height > 0 ?
		'[img_'+aid+'=' + width + ',' + height + ']' + src + '[/img]' :
		'[img_'+aid+']' + src + '[/img]';
}

function listtag(listoptions, text, tagname) {
	text = text.replace(/<li>(([\s\S](?!<\/li))*?)(?=<\/?ol|<\/?ul|<li|\[list|\[\/list)/ig, '<li>$1</li>') + (BROWSER.opera ? '</li>' : '');
	text = recursion('li', text, 'litag');
	var opentag = '[list]';
	var listtype = fetchoptionvalue('type=', listoptions);
	listtype = listtype != '' ? listtype : (tagname == 'ol' ? '1' : '');
	if(in_array(listtype, ['1', 'a', 'A'])) {
		opentag = '[list=' + listtype + ']';
	}
	return text ? opentag + '\n' + recursion(tagname, text, 'listtag') + '[/list]' : '';
}

function litag(listoptions, text) {
	return '[*]' + text.replace(/(\s+)$/g, '') + '\n';
}

function parsecode(text) {
	DISCUZCODE['num']++;
	DISCUZCODE['html'][DISCUZCODE['num']] = '<div class="blockcode"><blockquote>' + htmlspecialchars(text) + '</blockquote></div>';
	return "[\tDISCUZ_CODE_" + DISCUZCODE['num'] + "\t]";
}

function parsestyle(tagoptions, prepend, append) {
	var searchlist = [
		['align', true, 'text-align:\\s*(left|center|right);?', 1],
		['float', true, 'float:\\s*(left|right);?', 1],
		['color', true, '(^|[;\\s])color:\\s*([^;]+);?', 2],
		['backcolor', true, '(^|[;\\s])background-color:\\s*([^;]+);?', 2],
		['font', true, 'font-family:\\s*([^;]+);?', 1],
		['size', true, 'font-size:\\s*(\\d+(\\.\\d+)?(px|pt|in|cm|mm|pc|em|ex|%|));?', 1],
		['size', true, 'font-size:\\s*(x\\-small|small|medium|large|x\\-large|xx\\-large|\\-webkit\\-xxx\\-large);?', 1, 'size'],
		['b', false, 'font-weight:\\s*(bold);?'],
		['i', false, 'font-style:\\s*(italic);?'],
		['u', false, 'text-decoration:\\s*(underline);?'],
		['s', false, 'text-decoration:\\s*(line-through);?']
	];
	var sizealias = {'x-small':1,'small':2,'medium':3,'large':4,'x-large':5,'xx-large':6,'-webkit-xxx-large':7};
	var style = getoptionvalue('style', tagoptions);
	re = /^(?:\s|)color:\s*rgb\((\d+),\s*(\d+),\s*(\d+)\)(;?)/i;
	style = style.replace(re, function($1, $2, $3, $4, $5) {return("color:#" + parseInt($2).toString(16) + parseInt($3).toString(16) + parseInt($4).toString(16) + $5);});
	var len = searchlist.length;
	for(var i = 0; i < len; i++) {
		searchlist[i][4] = !searchlist[i][4] ? '' : searchlist[i][4];
		re = new RegExp(searchlist[i][2], "ig");
		match = re.exec(style);
		if(match != null) {
			opnvalue = match[searchlist[i][3]];
			if(searchlist[i][4] == 'size') {
				opnvalue = sizealias[opnvalue];
			}
			prepend += '[' + searchlist[i][0] + (searchlist[i][1] == true ? '=' + opnvalue + ']' : ']');
			append = '[/' + searchlist[i][0] + ']' + append;
		}
	}
	return {'prepend' : prepend, 'append' : append};
}

function parsetable(width, bgcolor, str) {

	if(isUndefined(width)) {
		var width = '';
	} else {
		try {
			width = width.substr(width.length - 1, width.length) == '%' ? (width.substr(0, width.length - 1) <= 98 ? width : '98%') : (width <= 560 ? width : '98%');
		} catch(e) { width = ''; }
	}
	if(isUndefined(str)) {
		return;
	}
	if(strpos(str, '[/tr]') === false && strpos(str, '[/td]')){
		str='[tr]'+str+'[/tr]';
	}
	if(strpos(str, '[/tr]') === false && strpos(str, '[/td]') === false) {

		var rows = str.split('\n');
		var s = '';
		for(i = 0;i < rows.length;i++) {
			s += '<tr><td>' + preg_replace(['\r', '\\\\\\\|', '\\\|', '\\\\n'], ['', '&#124;', '</td><td>', '\n'], rows[i]) + '</td></tr>';
		}
		str = s;
		simple = ' simpletable';
	} else {
		simple = '';
		str = str.replace(/\[tr(?:=([\(\)\s%,#\w]+))?\]\s*\[td(?:=(\d{1,4}%?))?\]/ig, function($1, $2, $3) {
			return '<tr' + ($2 ? ' style="background-color: ' + $2 + '"' : '') + '><td' + ($3 ? ' width="' + $3 + '"' : '') + '>';
		});
		str = str.replace(/\[tr(?:=([\(\)\s%,#\w]+))?\]\s*\[td(?:=(\d{1,2}),(\d{1,2})(?:,(\d{1,4}%?))?)?\]/ig, function($1, $2, $3, $4, $5) {
			return '<tr' + ($2 ? ' style="background-color: ' + $2 + '"' : '') + '><td' + ($3 ? ' colspan="' + $3 + '"' : '') + ($4 ? ' rowspan="' + $4 + '"' : '') + ($5 ? ' width="' + $5 + '"' : '') + '>';
		});
		str = str.replace(/\[\/td\]\s*\[td(?:=(\d{1,4}%?))?\]/ig, function($1, $2) {
			return '</td><td' + ($2 ? ' width="' + $2 + '"' : '') + '>';
		});
		str = str.replace(/\[\/td\]\s*\[td(?:=(\d{1,2}),(\d{1,2})(?:,(\d{1,4}%?))?)?\]/ig, function($1, $2, $3, $4) {
			return '</td><td' + ($2 ? ' colspan="' + $2 + '"' : '') + ($3 ? ' rowspan="' + $3 + '"' : '') + ($4 ? ' width="' + $4 + '"' : '') + '>';
		});
		str = str.replace(/\[\/td\]\s*\[\/tr\]\s*/ig, '</td></tr>');
		str = str.replace(/<td> <\/td>/ig, '<td>&nbsp;</td>');
	}
	return '<table ' + (width == '' ? '' : 'width="' + width + '" ') + 'class="t_table"' + (isUndefined(bgcolor) ? '' : ' style="background-color: ' + bgcolor + '"') + simple +'>' + str + '</table>';
}

function preg_quote(str) {
	return (str+'').replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!<>\|\:])/g, "\\$1");
}

function recursion(tagname, text, dofunction, extraargs) {
	if(extraargs == null) {
		extraargs = '';
	}
	tagname = tagname.toLowerCase();

	var open_tag = '<' + tagname;
	var open_tag_len = open_tag.length;
	var close_tag = '</' + tagname + '>';
	var close_tag_len = close_tag.length;
	var beginsearchpos = 0;

	do {
		var textlower = text.toLowerCase();
		var tagbegin = textlower.indexOf(open_tag, beginsearchpos);
		if(tagbegin == -1) {
			break;
		}

		var strlen = text.length;

		var inquote = '';
		var found = false;
		var tagnameend = false;
		var optionend = 0;
		var t_char = '';

		for(optionend = tagbegin; optionend <= strlen; optionend++) {
			t_char = text.charAt(optionend);
			if((t_char == '"' || t_char == "'") && inquote == '') {
				inquote = t_char;
			} else if((t_char == '"' || t_char == "'") && inquote == t_char) {
				inquote = '';
			} else if(t_char == '>' && !inquote) {
				found = true;
				break;
			} else if((t_char == '=' || t_char == ' ') && !tagnameend) {
				tagnameend = optionend;
			}
		}

		if(!found) {
			break;
		}
		if(!tagnameend) {
			tagnameend = optionend;
		}

		var offset = optionend - (tagbegin + open_tag_len);
		var tagoptions = text.substr(tagbegin + open_tag_len, offset);
		var acttagname = textlower.substr(tagbegin * 1 + 1, tagnameend - tagbegin - 1);

		if(acttagname != tagname) {
			beginsearchpos = optionend;
			continue;
		}

		var tagend = textlower.indexOf(close_tag, optionend);
		if(tagend == -1) {
			break;
		}

		var nestedopenpos = textlower.indexOf(open_tag, optionend);
		while(nestedopenpos != -1 && tagend != -1) {
			if(nestedopenpos > tagend) {
				break;
			}
			tagend = textlower.indexOf(close_tag, tagend + close_tag_len);
			nestedopenpos = textlower.indexOf(open_tag, nestedopenpos + open_tag_len);
		}

		if(tagend == -1) {
			beginsearchpos = optionend;
			continue;
		}

		var localbegin = optionend + 1;
		var localtext = eval(dofunction)(tagoptions, text.substr(localbegin, tagend - localbegin), tagname, extraargs);

		text = text.substring(0, tagbegin) + localtext + text.substring(tagend + close_tag_len);

		beginsearchpos = tagbegin + localtext.length;

	} while(tagbegin != -1);

	return text;
}

function simpletag(options, text, tagname, parseto) {
	if(trim(text) == '') {
		return '';
	}
	text = recursion(tagname, text, 'simpletag', parseto);
	return '[' + parseto + ']' + text + '[/' + parseto + ']';
}

function smileycode(smileyid) {
	if(typeof smilies_type != 'object') return;
	for(var typeid in smilies_array) {
		for(var page in smilies_array[typeid]) {
			for(var i in smilies_array[typeid][page]) {
				if(smilies_array[typeid][page][i][0] == smileyid) {
					return smilies_array[typeid][page][i][1];
					break;
				}
			}
		}
	}
}

function strpos(haystack, needle, _offset) {
	if(isUndefined(_offset)) {
		_offset = 0;
	}

	var _index = haystack.toLowerCase().indexOf(needle.toLowerCase(), _offset);

	return _index == -1 ? false : _index;
}

function tabletag(attributes) {
	var width = '';
	re = /width=(["']?)(\d{1,4}%?)(\1)/i;
	var matches = re.exec(attributes);

	if(matches != null) {
		width = matches[2].substr(matches[2].length - 1, matches[2].length) == '%' ?
			(matches[2].substr(0, matches[2].length - 1) <= 98 ? matches[2] : '98%') :
			(matches[2] <= 560 ? matches[2] : '98%');
	} else {
		re = /width\s?:\s?(\d{1,4})([px|%])/i;
		var matches = re.exec(attributes);
		if(matches != null) {
			width = matches[2] == '%' ? (matches[1] <= 98 ? matches[1] + '%' : '98%') : (matches[1] <= 560 ? matches[1] : '98%');
		}
	}

	var bgcolor = '';
	re = /(?:background|background-color|bgcolor)[:=]\s*(["']?)((rgb\(\d{1,3}%?,\s*\d{1,3}%?,\s*\d{1,3}%?\))|(#[0-9a-fA-F]{3,6})|([a-zA-Z]{1,20}))(\1)/i;
	var matches = re.exec(attributes);
	if(matches != null) {
		bgcolor = matches[2];
		width = width ? width : '98%';
	}

	return bgcolor ? '[table=' + width + ',' + bgcolor + ']\n' : (width ? '[table=' + width + ']\n' : '[table]\n');
}

function tdtag(attributes) {

	var colspan = 1;
	var rowspan = 1;
	var width = '';

	re = /colspan=(["']?)(\d{1,2})(\1)/i;
	var matches = re.exec(attributes);
	if(matches != null) {
		colspan = matches[2];
	}

	re = /rowspan=(["']?)(\d{1,2})(\1)/i;
	var matches = re.exec(attributes);
	if(matches != null) {
		rowspan = matches[2];
	}

	re = /width=(["']?)(\d{1,4}%?)(\1)/i;
	var matches = re.exec(attributes);
	if(matches != null) {
		width = matches[2];
	}

	return in_array(width, ['', '0', '100%']) ?
		(colspan == 1 && rowspan == 1 ? '[td]' : '[td=' + colspan + ',' + rowspan + ']') :
		(colspan == 1 && rowspan == 1 ? '[td=' + width + ']' : '[td=' + colspan + ',' + rowspan + ',' + width + ']');
}

if(typeof jsloaded == 'function') {
	jsloaded('bbcode');
}
var HtmlUtil = {
	htmlEncode:function (html){
		var temp = document.createElement ("div");
		(temp.textContent != undefined ) ? (temp.textContent = html) : (temp.innerText = html);
		var output = temp.innerHTML;
		temp = null;
		return output;
	},
	htmlDecode:function (text){
		var temp = document.createElement("div");
		temp.innerHTML = text;
		var output = temp.innerText || temp.textContent;
		temp = null;
		return output;
	}
};
function getdatetimestamp() {
	return Math.floor((new Date()).getTime() / 86400000) * 86400+time_zone*3600
}
function timestamp() {
	return Math.floor((new Date()).getTime() / 1000);
}
function tpl_click(href){
	var tplname=href.match(/\?tpl=([^&]+)/);
	if(tplname.length!=2){
		return
	}
	var v=href.split('&'),obj={}
	for(var i=1;i<v.length;i++){
		s=v[i].split('=')
		if(s.length==2){
			obj[s[0]]=s[1]
		}
	}
	tpl_load(tplname[1],eval('WRITE_MSG_U2WS_'+tplname[1]),obj)
}
function tpl_susess(result) {
	if(typeof tpl_callback=="undefined"){
		url = document.location.origin+ document.location.pathname+'?tpl=' + tplname
		for(var i in tpl_indata){
			if(tpl_indata[i] || tpl_indata[i]===0) url+="&"+i+"="+encodeURIComponent(tpl_indata[i])
		}
		oldtplname=GET('tpl')
		if(url!=document.location.href){
			//saveUserdata('login_ref',document.location.search)
			h5state.url=url;
			history.pushState(h5state, null, document.location.href);
		}
	}
	if(!h5state.url) h5state.url=document.location.href;
	h5state.tn = tplname;  
	h5state.td = result;
	td=true
	if(js && tpl && td) maintpl(h5state.td, h5state.tn,true);
}
websocket_func[CMD_MSG_WS2U_tpl_load_js]=function(res){
	h5state.j = '<script type="text/javascript">'+res.Result+'</script>';
	js=true;
	if(js && tpl && td) maintpl(h5state.td, res.Name,true);
}

var tpl_indata;
function tpl_load(name,fn,data,callback) {
	tpl_callback=callback
	tplname=name;
	if(load_start==0){
		load_start=new Date().getTime()/1000;
	}
	tpl_indata=data
	tpl=true,js=false,td=false
	$('#fwin_dialog').hide();
	var b=[];
	if(fn){
		b=fn(data);
	}else{
		b=WRITE_MSG_U2WS_tpl_success({});
	}
	if(!$('tpl_'+tplname)){
		tpl=false
		getTemplateByname(tplname)
	}
	b=b.concat(WRITE_MSG_U2WS_tpl_load_js({Name:tplname}))
	ajax_post(b)
}

function maintpl(data, u,replace) {
	//var load_end=new Date().getTime()/1000;
	//$('.time_info').html('msg ok '+(load_end-load_start).toFixed(3)+"(s)")
	$('.shade').hide();
	tpldata = data;
	if(replace){
		history.replaceState(h5state, document.title, h5state.url);
	}
	var html = '';
	html = template("tpl_"+u, {
		data: data,
		cache:cache,
	});
	//var load_end=new Date().getTime()/1000;
	//$('.time_info').append('<br>tpl ok '+(load_end-load_start).toFixed(3)+"(s)")
	document.getElementById("tpl_content").innerHTML=html
	//var load_end=new Date().getTime()/1000;
	//$('.time_info').append('<br>html ok '+(load_end-load_start).toFixed(3)+"(s)")
	$('#tpl_content').append(h5state.j);
	window.scrollTo(0, 0);
	tpl=false;
	js=false;
	var load_end=new Date().getTime()/1000;
	$('.time_info').html('GMT'+(time_zone>=0?"+":"-")+time_zone+","+date("Y-m-d H:i",load_end-timestamp_offset+(time_zone-8)*3600)+"，Processed in "+(load_end-load_start).toFixed(3)+"(s)")
	load_start=0;
	if(typeof editorisfull != "undefined" && editorisfull===0){
		editorisfull=1
	}
	if(getdatetimestamp()>$('#tpl_html').attr('timestamp')){
		$('#tpl_html').html('');
		cache.todaytime=getdatetimestamp()
	}
	if(tpl_callback) tpl_callback(data);
	$('.svg-search').unbind().click(function(event) {
		window.open('/search.html?Word='+$('input[name="search"]').val())
	});
	$('input[name="search"]').keypress(function (e) {
		if(e.which == 13){
		   window.open('/search.html?Word='+$('input[name="search"]').val())
		}
	});
}
function getTemplateByname(tplname){
	jQuery.ajax({
		type: "get",
		url:   location.origin+location.pathname.replace(/\/[^\./]+.html/,"") + '/template/'+tplname+'_tpl.html?t=' + getdatetimestamp(),
		success: function (result) {
			result = result.replace('id="tpl_main"', 'id="tpl_' + tplname + '"');
			$('#tpl_html').append(result);
			tpl = true; 
			if(js && tpl && td) maintpl(h5state.td, tplname,true);
		}
	});
}
window.addEventListener('popstate',function(event){ 
	if(event && event.state){
		load_start=new Date().getTime()/1000;
		h5state=event.state;
		tpl = true;
		js =true;
		if(!$('tpl_'+h5state.tn)){
			tpl=false
			getTemplateByname(h5state.tn)
		}else{
			maintpl(h5state.td, h5state.tn,false);
		}
		
	}else{ 
		load_start=new Date().getTime()/1000;
		h5state=history.state;
		if(h5state){
			tpl = true;
			js =true;
			maintpl(h5state.td, h5state.tn,false);
		}
	} 
}); 


template.defaults.imports.console = function(v){console.log(v)};
function GET(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURIComponent(r[2]);
	return '';
}
template.defaults.imports.in_array = function(v,a){return in_array(v,a)};
template.defaults.imports.get_avatar=function(avatar,size){
	return get_avatar(avatar,size)
}
function get_avatar(avatar,size){
	return '<img src="'+webp('/static/avatar/user/'+avatar,size)+'" onerror="this.src=\'/static/image/common/noavatar.gif\'">'
}
template.defaults.imports.webp=function(f,size){
	return webp(f,size)
}
function webp(f,size) {

	if(f.indexOf('default_')>0){
		return f;
	}
	if (typeof size != "number"){
		size = 640
	}

	if (jpg_webp == '1') {
		f = f.replace('x-oss-process=style/jpg', 'x-oss-process=style/webp');
		f = f.replace(/\?x-oss-process=image\/resize,.+\/format,jpg/, '');
		if (!new RegExp(/x-oss-process=/).test(f) && !new RegExp(/webp$/).test(f)) {
			f += '?x-oss-process=style/webp-'+size
		}else{
			f=f.replace(/\?x-oss-process=style\/webp-\d+/,"?x-oss-process=style/webp-"+size)
		}
		return f;
	} else {
		f = f.replace('x-oss-process=style/webp', 'x-oss-process=style/jpg');
		f = f.replace(/\?x-oss-process=image\/resize,.+\/format,jpg/, '');
		if (!new RegExp(/x-oss-process=/).test(f) && new RegExp(/webp$/).test(f)) {
			f += '?x-oss-process=style/jpg-'+size
		}
		return f;
	}
}
function textencode(str){
	if(typeof TextEncoder == "undefined"){
		var back = [];
		var byteSize = 0;
		for (var i = 0; i < str.length; i++) {
			var code = str.charCodeAt(i);
			if (0x00 <= code && code <= 0x7f) {
				byteSize += 1;
				back.push(code);
			} else if (0x80 <= code && code <= 0x7ff) {
				byteSize += 2;
				back.push((192 | (31 & (code >> 6))));
				back.push((128 | (63 & code)))
			} else if ((0x800 <= code && code <= 0xd7ff) 
				|| (0xe000 <= code && code <= 0xffff)) {
				byteSize += 3;
				back.push((224 | (15 & (code >> 12))));
				back.push((128 | (63 & (code >> 6))));
				back.push((128 | (63 & code)))
			}
		}
		for (i = 0; i < back.length; i++) {
		  back[i] &= 0xff;
		}
		return back
	}else{
		return new TextEncoder().encode(str);
	}
}
function textdecode(arr){
	if(typeof TextDecoder == "undefined"){
		var str=""
		for (var i = 0; i < arr.length; i++) {
			str += String.fromCharCode(arr[i]);
		}
		return decodeURIComponent(escape(str));
	}else{
		return new TextDecoder().decode(arr);
	}
}
function logout(){
	ajax_post(WRITE_MSG_U2WS_logout({}))
}
function qqlogin(){
	ajax_post(WRITE_MSG_U2WS_QQLoginUrl({}))
}
websocket_func[CMD_MSG_WS2U_QQLoginUrl]=function(res){
	location.href=res.Url;
}
function opendiy(){
	
	$('#tpl_content').append('<script src="/static/js/common_diy.js?t=" type="text/javascript"></script><script src="/static/js/portal_diy.js?t=" type="text/javascript"></script>')
	$('#controlpanel').show();
	$("head").append('<link rel="stylesheet" type="text/css" id="diy_common" href="/data/cache/style_2_css_diy.css">')
	$("head").append('<style type="text/css">/* DIY MODE CSS STYLE */.hide { display: none; }.frame,.tab,.block { position: relative; zoom:1; min-height: 20px; }.edit { position: absolute; top: 0; right: 0; z-index: 199; padding: 0 5px; background: red; line-height: 26px; color: #FFF; cursor: pointer; }.block .edit { background: #369; }.edit-menu { position: absolute; z-index: 300; border-style: solid; border-width: 0 1px 1px 1px; border-color: #DDD #999 #999 #CCC; background: #FFF; }.mitem { padding: 4px 4px 4px 14px; width: 36px; border-top: 1px solid #DDD; cursor: pointer; }.mitem:hover { background: #F2F2F2; color: #06C; }.subtitle { margin: 0 4px; }.frame-tab .title .move-span { float: left; margin: 0 3px 0 0; padding: 0; width: 100px; border-bottom: none; cursor: pointer; }#samplepanel { background: #FFF; }.block-name { display: block; visibility: hidden; background: #000; color: #FFF; position: absolute; top: 5px; left: 5px; padding: 2px; opacity: 0.85; filter: alpha(opacity=85); z-index: 1; }</style>')
	tpl=true,js=true;
	maintpl(h5state.td, h5state.tn);
	spaceDiy.init()
}
template.defaults.imports.date= function (value,time) {
	return date(value,time);
};
function date(value,time){
	if(!time || time<=0){
		return '';
	}
	newDate = new Date();
	newDate.setTime(time * 1000);
	return newDate.format(value);
}
Date.prototype.format = function(format) {
	   var date = {
			  "m+": this.getMonth() + 1,
			  "d+": this.getDate(),
			  "h+": this.getHours(),
			  "H+": this.getHours(),
			  "i+": this.getMinutes(),
			  "s+": this.getSeconds(),
			  "q+": Math.floor((this.getMonth() + 3) / 3),
			  "S+": this.getMilliseconds(),
			  "Y+" : this.getFullYear()
	   };
	   for (var k in date) {
			  if (new RegExp("(" + k + ")").test(format)) {
					 format = format.replace(RegExp.$1, RegExp.$1.length == 1
							? ((new RegExp(/^\d$/)).test(date[k])?'0'+date[k]:date[k]) : ("00" + date[k]).substr(("" + date[k]).length));
			  }
	   }
	   return format;
}
template.defaults.imports.moddisplay=function(moderators, type, inherit) {
	var modlist='';
	if(moderators!='') {
		var comma = '';
		for(var i in moderators.split("\t")) {
			modlist += comma+'<a href="home.php?mod=space&username='+decodeURIComponent(moderator)+'" class="notabs" c="1">'+(inherit ? '<strong>'+moderator+'</strong>' : moderator)+'</a>';
			comma = ', ';
		}
	} 
	return modlist;
}
template.defaults.imports.categorycollapse=function(fid){
	return getcookie('collapse').indexOf('_category_'+fid+'_');
}
template.defaults.imports.isNewFolder=function(fid,lastpost){
	if(lastpost>0){
		var lastvisit=timestamp()-3600
		var s=new RegExp("D_"+fid+"_(\\d+)").exec(getcookie('forum_lastvisit'));
		if(s && s[1]>lastvisit){
			lastvisit=s[1]
		}
		return lastpost>lastvisit;
	}
	return false;
}
template.defaults.imports.cutstr=function(str,b,e){
	return a.substr(b,e)
}
template.defaults.imports.showimg=function(b){
	return showimg(b)
}
function showimg(b){
	binary="";
	var len = b.length;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(b[i]);
	}
	return 'data:image/jpeg;base64,'+window.btoa(binary);
}
template.defaults.imports.GET=function(b){
	re=GET(b)
	if(re==parseInt(re)){
		return parseInt(re)
	}
	return GET(b)
}
template.defaults.imports.getcookie=function(key){
	return getcookie(key);
}
template.defaults.imports.getstatus=function(status, position) {
	return (status>>(position-1)&1)==1;
}
template.defaults.imports.getheatlevel=function(heats){
	var level=false;
	for(var i in cache.heatthread_iconlevels){
		if(heats>=cache.heatthread_iconlevels[i]){
			level=Number(i)+1
		}
	}
	return level
}
template.defaults.imports.thread_isclosed=function(thread){
	if(tpldata.Status!=3 && (thread.Closed>0 || (tpldata.Autoclose>0 && thread.Fid == tpldata.Fid && cache.Head.Timestamp - thread.Dateline > tpldata.Autoclose))) {
		if(thread.Isgroup != 1) {
			return true;
		}
	} else if(tpldata.Status == 3 && thread.Closed == 1) {
		return true;
	}
	return false;
}
template.defaults.imports.cutstr=function(str,b){
	if(str.length<b){
		return str
	}
	return str.substr(0,b)+"..."
}
template.defaults.imports.size_kb2mb=function(k){
	if(k==0) return "无限制";
	k=k/1024
	if(k<1024){
		return k+"KB";
	}
	return Math.floor(k / 10.24) / 100+"MB";
}
template.defaults.imports.thread_time=function(time){
	return thread_time(time);
}
function thread_time(time){
	var offset=Date.parse(new Date())/1000-time-timestamp_offset;
	if(offset<60){
		return parseInt(offset)+" 秒前"
	}
	if(offset<3600){
		return parseInt(offset/60)+" 分钟前"
	}
	if(offset<86400){
		return parseInt(offset/3600)+" 小时前"
	}
	if(offset<86400*2){
		return "昨天"+date("h:i",time)
	}
	if(offset<86400*3){
		return "前天"+date("h:i",time)
	}
	return date("Y-m-d h:i",time)
}
template.defaults.imports.getRecommendlevel=function(recommends){
	if(cache.recommendthread.status!=1){
		return false
	}
	for(var i in cache.recommendthread.iconlevels){
		if(recommends>=cache.recommendthread.iconlevels[i]){
			return i+1
		}
	}
	return false
}
template.defaults.imports.getModaction=function(lastmod){
	if(modactioncode[lastmod.Modactiontype]!="") {
		return  modactioncode[lastmod.Modactiontype]+(lastmod.Modactiontype != 'SPA' || !cache.stamps[lastmod.Stamp]? '' : ' '+cache.stamps[lastmod.Stamp]['text']);
	} else if(lastmod.Modactiontype.substr(0, 1) == 'L' && /L(\d\d)/.test(lastmod.Modactiontype)) {
		var id=lastmod.Modactiontype.match(/L(\d\d)/)[1];
		return modactioncode['SLA']+' '+(cache.stamps[id]?cache.stamps[id]['text']:'');
	}
	return '';
}
template.defaults.imports.viewthread_profile_node=function(post){
	//console.log(post)

}
template.defaults.imports.getreplybg=function(replybg) {
	var style = '';
	if(cache.allowreplybg) {
		if(replybg) {		
			bgurl = cache.attachurl+'common/'+replybg;
			
		} else if(cache.globalreplybg) {
			bgurl = cache.attachurl+'common/'+cache.globalreplybg;
		}
		if(bgurl) {
			style = ' style="background-image: url('+bgurl+');"';
		}
	}
	return style;
}
template.defaults.imports.viewThreadtype=function(name){
	name=name.replace(/\[color=([^\]]+)]([^[]+)\[\/color]/g,'<font color="$1">$2</font>');
	return name;
}

var allowhtml=true;
var allowbbcode=true;
var allowsmilies=true;
var allowimgcode=true;
template.defaults.imports.discuzcode=function(message,smileyoff,bbcodeoff){
	allowsmilies=smileyoff!=1;
	allowbbcode=bbcodeoff!=1;
	return bbcode2html(message);
}
template.defaults.imports.html2bbcode=function(message,smileyoff,bbcodeoff){
	allowsmilies=smileyoff!=1;
	allowbbcode=bbcodeoff!=1;
	return html2bbcode(message);
}
template.defaults.imports.encodeFastPostmsg=function(text){
	text=text.replace(/<div\sclass=["']?quote["']?>[\s\S]*?<blockquote>([\s\S]+?)<\/blockquote>[\s\S]*?<\/div>/ig,'')
	return encodeURIComponent(text)
}
template.defaults.imports.encodeURIComponent=function(text){
	return encodeURIComponent(text)
}
template.defaults.imports.decodeFastPostmsg=function(text){
	return decodeURIComponent(text)
}
template.defaults.imports.htmlDecode=function(text){
	return HtmlUtil.htmlDecode(decodeURIComponent(text))
}
template.defaults.imports.preg_replace=function(search, replace, str, regswitch){
	return preg_replace(search, replace, str, regswitch)
}
template.defaults.imports.ceil=function(value){
	return Math.ceil(value)
}
template.defaults.imports.floor=function(value){
	return Math.floor(value)
}
template.defaults.imports.JSON_stringify=function(value){
	return value?JSON.stringify(value):'{}';
}

template.defaults.imports.gethighlight=function(value){
	var s0=value%10,str=' style="'
	str += s0>>0&1 ? 'font-weight: bold;' : '';
	str += s0>>1&1 ? 'font-style: italic;' : '';
	str += s0>>2&1 ? 'text-decoration: underline;' : '';
	str += parseInt(value/10) ? 'color: '+cache.forum_colorarray[parseInt(value/10)] : '';
	return str+'"';
}
template.defaults.imports.parseInt=function(value){
	return parseInt(value)
}
template.defaults.imports.loadUserdata=loadUserdata;
template.defaults.imports.checkback=function(){
	return history.length>1
}
template.defaults.imports.getSearchSubject=function(subject,word){
	var re=new RegExp(word,'i')
	var find=re.exec(subject)
	if(find){
		subject = subject.replace(find,'<strong><font color="#ff0000">'+find+'</font></strong>');
		find=re.exec(subject)
	}
	return subject
}
template.defaults.imports.now=function(){
	return new Date().getTime()/1000-timestamp_offset
}
//按秒时间戳取差
template.defaults.imports.getTimeDiff=function(t1,t2){
	var sub=t1-t2;
	var day=Math.floor(sub/86400);
	var hoursub=sub%86400;
	var hour=Math.floor(hoursub/86400);
	var min=hoursub%60;
	var str="";
	if(day) str+=day+"天";
	if(hour) str+=hour+"小时";
	return str+min+"分钟";
}
var pollcolors = ['E92725', 'F27B21', 'F2A61F', '5AAF4A', '42C4F5', '0099CC', '3365AE', '2A3591', '592D8E', 'DB3191'];
template.defaults.imports.pollshowimgVote=function(poll,key){
    var votes=poll.Polloption[key].Votes
    var percent=Math.floor(votes*100/poll.Voterscount);
    if(isNaN(percent)) percent=0;
    var w=(percent>0)?percent:1;
    return '<div class="imgf imgf2"><span class="jdt" style="width: '+w+'%; background-color:#'+pollcolors[key]+'">&nbsp;</span><p class="imgfc"><span class="z">'+votes+'票</span><span class="y">'+percent+'% </span></p></div>';
}
template.defaults.imports.pollshowVote=function(poll,key){
	var votes=poll.Polloption[key].Votes
    var percent=Math.floor(votes*100/poll.Voterscount);
    if(isNaN(percent)) percent=0;
     var w=(percent>0)?percent:1;
    return '<td><div class="pbg"><div class="pbr" style="width: '+w+'%; background-color:#'+pollcolors[key]+'"></div></div></td><td>'+percent+'% <em style="color:#'+pollcolors[key]+'">('+votes+')</em></td>';
}
template.defaults.imports.getTrueFalseImg=function(value){
	return value?'<svg t="1575368458846" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1411" width="20" height="20" style="vertical-align: -5px;"><path d="M758.616 315.112a29.36 29.36 0 0 0-45.736-9.488L437.416 544.816a2.896 2.896 0 0 1-3.968-0.168L335.264 443.44a29.376 29.376 0 0 0-47 6.624l-28.224 52.808a29.304 29.304 0 0 0 3.072 32.32l147.512 182.344a29.272 29.272 0 0 0 22.84 10.904h0.032a29.28 29.28 0 0 0 22.848-10.968l298.648-371.256a29.096 29.096 0 0 0 3.624-31.104z" fill="#AECD42" p-id="1412"></path><path d="M433.496 740.44h-0.08a41.064 41.064 0 0 1-32.136-15.384l-147.496-182.32a41.2 41.2 0 0 1-4.328-45.528l28.224-52.8c2.04-3.816 4.624-7.248 7.688-10.208a41.136 41.136 0 0 1 28.8-11.672c11.296 0 21.84 4.464 29.704 12.568l92.176 95.016 268.96-233.552a40.88 40.88 0 0 1 9.248-6.072 40.992 40.992 0 0 1 17.848-4.072 41.6 41.6 0 0 1 37.328 23.512 41.2 41.2 0 0 1-5.152 43.872L465.696 724.992a41.04 41.04 0 0 1-32.2 15.448z m-119.328-293.92a17.296 17.296 0 0 0-15.328 9.2l-28.224 52.808a17.248 17.248 0 0 0 1.808 19.088l147.528 182.368a17.2 17.2 0 0 0 13.464 6.456v12l0.032-12a17.2 17.2 0 0 0 13.528-6.472l298.664-371.28c4.24-5.192 5.08-12.368 2.176-18.336-4.032-8.416-14.728-12.272-23.192-8.216a16.928 16.928 0 0 0-3.856 2.536l-275.488 239.2c-5.864 5.024-15.136 4.552-20.408-0.832L326.656 451.8a17.24 17.24 0 0 0-12.488-5.28z" fill="#809626" p-id="1413"></path></svg>':'<svg t="1575368479315" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1530" width="20" height="20" style="vertical-align: -5px;"><path d="M638.296 461L751.304 348a39.36 39.36 0 0 0 0-55.664L708.16 249.2a39.36 39.36 0 0 0-55.656 0L539.504 362.192 426.488 249.184a39.36 39.36 0 0 0-55.664 0.008l-43.136 43.128a39.352 39.352 0 0 0 0 55.664l113.008 113.008-113.008 113.016a39.352 39.352 0 0 0 0 55.664l43.136 43.152a39.384 39.384 0 0 0 55.664 0l113.008-113.016 113 113.016a39.392 39.392 0 0 0 55.672 0l43.144-43.152a39.376 39.376 0 0 0 0-55.672L638.296 461z" fill="#E22D2D" p-id="1531"></path><path d="M680.336 692.336a47.12 47.12 0 0 1-33.496-13.856L539.504 571.12l-107.36 107.36c-8.944 8.936-20.832 13.856-33.488 13.856s-24.544-4.92-33.488-13.856l-43.144-43.152a47.04 47.04 0 0 1-13.872-33.496c0-12.648 4.928-24.544 13.872-33.488l107.352-107.36-107.344-107.344a47.04 47.04 0 0 1-13.872-33.488c0-12.656 4.928-24.544 13.872-33.496l43.136-43.128a47.024 47.024 0 0 1 33.496-13.872c12.648 0 24.536 4.928 33.48 13.864l107.36 107.36 107.344-107.336c8.936-8.944 20.832-13.864 33.488-13.864s24.544 4.92 33.488 13.864l43.152 43.136a47.416 47.416 0 0 1 0 66.976L649.608 461l107.36 107.344a47.408 47.408 0 0 1 0 66.984l-43.144 43.152a47.088 47.088 0 0 1-33.488 13.856z m-140.832-143.84L658.16 667.168c11.84 11.832 32.512 11.832 44.36 0l43.144-43.152a31.416 31.416 0 0 0 0-44.36L626.984 461l118.664-118.656a31.408 31.408 0 0 0 0-44.352l-43.152-43.136c-11.832-11.84-32.512-11.84-44.344 0L539.504 373.504 420.832 254.84c-11.848-11.848-32.504-11.848-44.352 0.008l-43.136 43.128a31.144 31.144 0 0 0-9.184 22.176c0 8.376 3.264 16.248 9.184 22.168l118.664 118.664-118.664 118.68a31.12 31.12 0 0 0-9.184 22.168c0 8.384 3.264 16.256 9.184 22.176l43.136 43.152c11.84 11.832 32.504 11.832 44.352 0l118.672-118.664z" fill="#AF3737" p-id="1532"></path></svg>';
}
var modactioncode={
	"EDT": "编辑",
	"DEL": "删除",
	"DLP": "删除回复",
	"DCM": "删除点评",
	"PRN": "批量删帖",
	"UDL": "反删除",
	"DIG": "加入精华",
	"UDG": "解除精华",
	"EDI": "限时精华",
	"UED": "解除限时精华",
	"CLS": "关闭",
	"OPN": "打开",
	"ECL": "限时关闭",
	"UEC": "解除限时关闭",
	"EOP": "限时打开",
	"UEO": "解除限时打开",
	"STK": "置顶",
	"UST": "解除置顶",
	"EST": "限时置顶",
	"UES": "解除限时置顶",
	"SPL": "分割",
	"MRG": "合并",
	"HLT": "设置高亮",
	"UHL": "解除高亮",
	"EHL": "限时高亮",
	"UEH": "解除限时高亮",
	"BMP": "提升",
	"DWN": "下沉",
	"MOV": "移动",
	"MIR": "镜像",
	"CPY": "复制",
	"TYP": "分类",
	"TAG": "修改标签",
	"RFD": "强制退款",
	"MOD": "审核通过",
	"ABL": "加入文集",
	"RBL": "移除文集",
	"PTS": "推送主题",
	"RFS": "解除推送",
	"RMR": "取消悬赏",
	"BNP": "屏蔽帖子",
	"UBN": "解除屏蔽",
	"REC": "推荐",
	"URE": "解除推荐",
	"WRN": "警告",
	"UWN": "解除警告",
	"SPA": "添加图章",
	"SPD": "撤销图章",
	"SLA": "添加图标",
	"SLD": "撤销图标",
	"REG": "群组推荐",
	"PTA": "生成文章",
	"MAG": "道具",
	"REB": "推送",
	"LIV": "直播",
	"LIC": "取消直播",}
//cache_out
cache.stamps={"1": {url:"001.gif",text:"精华",type:"stamp",icon:"0"}, 
"2": {url:"002.gif",text:"热帖",type:"stamp",icon:"0"}, 
"3": {url:"003.gif",text:"美图",type:"stamp",icon:"0"}, 
"4": {url:"004.gif",text:"优秀",type:"stamp",icon:"0"}, 
"5": {url:"005.gif",text:"置顶",type:"stamp",icon:"0"}, 
"6": {url:"006.gif",text:"推荐",type:"stamp",icon:"0"}, 
"7": {url:"007.gif",text:"原创",type:"stamp",icon:"0"}, 
"8": {url:"008.gif",text:"版主推荐",type:"stamp",icon:"0"}, 
"9": {url:"009.gif",text:"爆料",type:"stamp",icon:"0"}, 
"10": {url:"001.small.gif",text:"精华",type:"stamplist",icon:"1"}, 
"11": {url:"002.small.gif",text:"热帖",type:"stamplist",icon:"1"}, 
"12": {url:"003.small.gif",text:"美图",type:"stamplist",icon:"1"}, 
"13": {url:"004.small.gif",text:"优秀",type:"stamplist",icon:"1"}, 
"14": {url:"005.small.gif",text:"置顶",type:"stamplist",icon:"1"}, 
"15": {url:"006.small.gif",text:"推荐",type:"stamplist",icon:"1"}, 
"16": {url:"007.small.gif",text:"原创",type:"stamplist",icon:"1"}, 
"17": {url:"008.small.gif",text:"版主推荐",type:"stamplist",icon:"1"}, 
"18": {url:"009.small.gif",text:"爆料",type:"stamplist",icon:"1"}, 
"19": {url:"010.small.gif",text:"编辑采用",type:"stamplist",icon:"1"}, 
"20": {url:"010.gif",text:"编辑采用",type:"stamp",icon:"0"}, 
"21": {url:"011.small.gif",text:"新人帖",type:"stamplist",icon:"1"}};
cache.extcredits={"1":{"img":"","title":"威望","unit":"","ratio":0,"showinthread":null,"allowexchangein":null,"allowexchangeout":null},"2":{"img":"","title":"金钱","unit":"","ratio":0,"showinthread":null,"allowexchangein":null,"allowexchangeout":null},3:{"img":"","title":"贡献","unit":"","ratio":0,"showinthread":null,"allowexchangein":null,"allowexchangeout":null}}
cache.creditstransextra={"1":"2","2":"2","3":"2","4":"2","5":"2","6":"2","7":"2","8":"2","9":"2","10":"2"}
cache.heatthread_iconlevels=[50,100,200];
cache.threadsticky=['全局置顶','分类置顶','本版置顶'];
cache.sitemessage={"time":3000,"register":[],"login":[],"newthread":["欢迎查看"],"reply":["回复1","回复2"]}
cache.editoroptions=7;
cache.minpostsize=10;
cache.maxpostsize=10000;
cache.secqaa={minposts:1,status:2};
cache.magicstatus=0;
cache.groupreadaccess=[{"groupid":"7","readaccess":"1","grouptitle":"游客"},{"groupid":"10","readaccess":"10","grouptitle":"新手上路"},{"groupid":"11","readaccess":"20","grouptitle":"注册会员"},{"groupid":"12","readaccess":"30","grouptitle":"中级会员"},{"groupid":"13","readaccess":"50","grouptitle":"高级会员"},{"groupid":"14","readaccess":"70","grouptitle":"金牌会员"},{"groupid":"15","readaccess":"90","grouptitle":"论坛元老"},{"groupid":"16","readaccess":"100","grouptitle":"实习版主"},{"groupid":"19","readaccess":"100","grouptitle":"审核员"},{"groupid":"3","readaccess":"100","grouptitle":"版主"},{"groupid":"2","readaccess":"150","grouptitle":"超级版主"},{"groupid":"17","readaccess":"150","grouptitle":"网站编辑"},{"groupid":"18","readaccess":"200","grouptitle":"信息监察员"},{"groupid":"1","readaccess":"200","grouptitle":"管理员"}];
cache.privacy={"view":{"index":0,"friend":0,"wall":0,"home":0,"doing":0,"blog":0,"album":0,"share":0},"feed":{"doing":1,"blog":1,"upload":1,"poll":1,"newthread":1},"profile":{"field1":"0"}}
cache.editperdel=1;
cache.smcols=8;
cache.maxincperthread=0;
cache.allowattachurl=0;
cache.creditstax=0.2;
cache.forumpicstyle={thumbheight:0,thumbwidth:0};
cache.recommendthread={status:1,iconlevels:[50,100,200],addtext:"支持",subtracttext:"反对",daycount:0,ownthread:0};

cache.bannedmessages=12;
cache.close_leftinfo_userctrl=0;
cache.visitedforums=10;
cache.fastsmilies=1;

cache.authoronleft=1;
cache.showsettings=7;
cache.threadguestlite=0;
cache.custominfo={postno:{"0":"#","1":"楼主","2":"沙发","3":"板凳","4":"地板"}}
cache.groupicon={"1":"online_admin.gif","2":"online_supermod.gif","3":"online_moderator.gif","0":"online_member.gif"}
cache.mobile={mobilecomefrom:""}
cache.guestviewthumb={flag:0,width:100,height:100}
cache.guesttipsinthread={flag:0}
cache.reglinkname='立即注册'
cache.imagelistthumb=0
cache.allowfastreply=0
cache.fastpost=1
cache.commentnumber=5
cache.ratelogon=1
cache.maxsigrows=100
cache.globalsightml=""
cache.postappend=0
cache.repliesrank=1
cache.filterednovote=1
cache.rewardexpiration=30
cache.lazyload=0
cache.allowreplybg=0
cache.postperpage=10
cache.leftsidewidth=0
cache.forumseparator=1;
cache.forumdisplaythreadpreview=1;
cache.topicperpage=20;
cache.modreasons=["广告/SPAM","恶意灌水","违规内容","文不对题","重复发帖","--------","我很赞同","精品文章","原创内容"];
cache.sendmailinterval=5;
cache.maxpolloptions=20;
;
///<jscompress sourcefile="jquery.superslide.js" />
/*!
 * SuperSlide v2.1.3
 * 轻松解决网站大部分特效展示问题
 * 详尽信息请看官网：http://www.SuperSlide2.com/
 *
 * Copyright 2011-至今, 大话主席
 *
 * 请尊重原创，保留头部版权
 * 在保留版权的前提下可应用于个人或商业用途

 * v2.1.3：处理Jquery已经弃用的API，兼容最新版本的Jquery，目前是jquery3.3.1，日后如果发现插件不兼容新版本的jquery，请联系我 305491515@qq.com

 */
!function(a){a.fn.slide=function(b){return a.fn.slide.defaults={type:"slide",effect:"fade",autoPlay:!1,delayTime:500,interTime:2500,triggerTime:150,defaultIndex:0,titCell:".hd li",mainCell:".bd",targetCell:null,trigger:"mouseover",scroll:1,vis:1,titOnClassName:"on",autoPage:!1,prevCell:".prev",nextCell:".next",pageStateCell:".pageState",opp:!1,pnLoop:!0,easing:"swing",startFun:null,endFun:null,switchLoad:null,playStateCell:".playState",mouseOverStop:!0,defaultPlay:!0,returnDefault:!1},this.each(function(){var t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,ab,bb,cb,db,eb,fb,gb,hb,ib,jb,kb,lb,mb,nb,c=a.extend({},a.fn.slide.defaults,b),d=a(this),e=c.effect,f=a(c.prevCell,d),g=a(c.nextCell,d),h=a(c.pageStateCell,d),i=a(c.playStateCell,d),j=a(c.titCell,d),k=j.length,l=a(c.mainCell,d),m=l.children().length,n=c.switchLoad,o=a(c.targetCell,d),p=parseInt(c.defaultIndex),q=parseInt(c.delayTime),r=parseInt(c.interTime);if(parseInt(c.triggerTime),t=parseInt(c.scroll),u="false"==c.autoPlay||0==c.autoPlay?!1:!0,v="false"==c.opp||0==c.opp?!1:!0,w="false"==c.autoPage||0==c.autoPage?!1:!0,x="false"==c.pnLoop||0==c.pnLoop?!1:!0,y="false"==c.mouseOverStop||0==c.mouseOverStop?!1:!0,z="false"==c.defaultPlay||0==c.defaultPlay?!1:!0,A="false"==c.returnDefault||0==c.returnDefault?!1:!0,B=isNaN(c.vis)?1:parseInt(c.vis),C=!-[1]&&!window.XMLHttpRequest,D=0,E=0,F=0,G=0,H=c.easing,I=null,J=null,K=null,L=c.titOnClassName,M=j.index(d.find("."+L)),N=p=-1==M?p:M,O=p,P=p,Q=m>=B?0!=m%t?m%t:t:0,S="leftMarquee"==e||"topMarquee"==e?!0:!1,T=function(){a.isFunction(c.startFun)&&c.startFun(p,k,d,a(c.titCell,d),l,o,f,g)},U=function(){a.isFunction(c.endFun)&&c.endFun(p,k,d,a(c.titCell,d),l,o,f,g)},V=function(){j.removeClass(L),z&&j.eq(O).addClass(L)},"menu"==c.type)return z&&j.removeClass(L).eq(p).addClass(L),j.hover(function(){R=a(this).find(c.targetCell);var b=j.index(a(this));J=setTimeout(function(){switch(p=b,j.removeClass(L).eq(p).addClass(L),T(),e){case"fade":R.stop(!0,!0).animate({opacity:"show"},q,H,U);break;case"slideDown":R.stop(!0,!0).animate({height:"show"},q,H,U)}},c.triggerTime)},function(){switch(clearTimeout(J),e){case"fade":R.animate({opacity:"hide"},q,H);break;case"slideDown":R.animate({height:"hide"},q,H)}}),A&&d.hover(function(){clearTimeout(K)},function(){K=setTimeout(V,q)}),void 0;if(0==k&&(k=m),S&&(k=2),w){if(m>=B?"leftLoop"==e||"topLoop"==e?k=0!=m%t?(0^m/t)+1:m/t:(W=m-B,k=1+parseInt(0!=W%t?W/t+1:W/t),0>=k&&(k=1)):k=1,j.html(""),X="",1==c.autoPage||"true"==c.autoPage)for(Y=0;k>Y;Y++)X+="<li>"+(Y+1)+"</li>";else for(Y=0;k>Y;Y++)X+=c.autoPage.replace("$",Y+1);j.html(X),j=j.children()}if(m>=B)switch(l.children().each(function(){a(this).width()>F&&(F=a(this).width(),E=a(this).outerWidth(!0)),a(this).height()>G&&(G=a(this).height(),D=a(this).outerHeight(!0))}),Z=l.children(),$=function(){var a;for(a=0;B>a;a++)Z.eq(a).clone().addClass("clone").appendTo(l);for(a=0;Q>a;a++)Z.eq(m-a-1).clone().addClass("clone").prependTo(l)},e){case"fold":l.css({position:"relative",width:E,height:D}).children().css({position:"absolute",width:F,left:0,top:0,display:"none"});break;case"top":l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:'+B*D+'px"></div>').css({top:-(p*t)*D,position:"relative",padding:"0",margin:"0"}).children().css({height:G});break;case"left":l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:'+B*E+'px"></div>').css({width:m*E,left:-(p*t)*E,position:"relative",overflow:"hidden",padding:"0",margin:"0"}).children().css({"float":"left",width:F});break;case"leftLoop":case"leftMarquee":$(),l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:'+B*E+'px"></div>').css({width:(m+B+Q)*E,position:"relative",overflow:"hidden",padding:"0",margin:"0",left:-(Q+p*t)*E}).children().css({"float":"left",width:F});break;case"topLoop":case"topMarquee":$(),l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:'+B*D+'px"></div>').css({height:(m+B+Q)*D,position:"relative",padding:"0",margin:"0",top:-(Q+p*t)*D}).children().css({height:G})}_=function(a){var b=a*t;return a==k?b=m:-1==a&&0!=m%t&&(b=-m%t),b},ab=function(b){var d,f,g,h,c=function(c){for(var d=c;B+c>d;d++)b.eq(d).find("img["+n+"]").each(function(){var c,d,b=a(this);if(b.attr("src",b.attr(n)).removeAttr(n),l.find(".clone")[0])for(c=l.children(),d=0;d<c.length;d++)c.eq(d).find("img["+n+"]").each(function(){a(this).attr(n)==b.attr("src")&&a(this).attr("src",a(this).attr(n)).removeAttr(n)})})};switch(e){case"fade":case"fold":case"top":case"left":case"slideDown":c(p*t);break;case"leftLoop":case"topLoop":c(Q+_(P));break;case"leftMarquee":case"topMarquee":d="leftMarquee"==e?l.css("left").replace("px",""):l.css("top").replace("px",""),f="leftMarquee"==e?E:D,g=Q,0!=d%f&&(h=Math.abs(0^d/f),g=1==p?Q+h:Q+h-1),c(g)}},bb=function(a){var b,c,d;if(!z||N!=p||a||S){if(S?p>=1?p=1:0>=p&&(p=0):(P=p,p>=k?p=0:0>p&&(p=k-1)),T(),null!=n&&ab(l.children()),o[0]&&(R=o.eq(p),null!=n&&ab(o),"slideDown"==e?(o.not(R).stop(!0,!0).slideUp(q),R.slideDown(q,H,function(){l[0]||U()})):(o.not(R).stop(!0,!0).hide(),R.animate({opacity:"show"},q,function(){l[0]||U()}))),m>=B)switch(e){case"fade":l.children().stop(!0,!0).eq(p).animate({opacity:"show"},q,H,function(){U()}).siblings().hide();break;case"fold":l.children().stop(!0,!0).eq(p).animate({opacity:"show"},q,H,function(){U()}).siblings().animate({opacity:"hide"},q,H);break;case"top":l.stop(!0,!1).animate({top:-p*t*D},q,H,function(){U()});break;case"left":l.stop(!0,!1).animate({left:-p*t*E},q,H,function(){U()});break;case"leftLoop":b=P,l.stop(!0,!0).animate({left:-(_(P)+Q)*E},q,H,function(){-1>=b?l.css("left",-(Q+(k-1)*t)*E):b>=k&&l.css("left",-Q*E),U()});break;case"topLoop":b=P,l.stop(!0,!0).animate({top:-(_(P)+Q)*D},q,H,function(){-1>=b?l.css("top",-(Q+(k-1)*t)*D):b>=k&&l.css("top",-Q*D),U()});break;case"leftMarquee":c=l.css("left").replace("px",""),0==p?l.animate({left:++c},0,function(){l.css("left").replace("px","")>=0&&l.css("left",-m*E)}):l.animate({left:--c},0,function(){l.css("left").replace("px","")<=-(m+Q)*E&&l.css("left",-Q*E)});break;case"topMarquee":d=l.css("top").replace("px",""),0==p?l.animate({top:++d},0,function(){l.css("top").replace("px","")>=0&&l.css("top",-m*D)}):l.animate({top:--d},0,function(){l.css("top").replace("px","")<=-(m+Q)*D&&l.css("top",-Q*D)})}j.removeClass(L).eq(p).addClass(L),N=p,x||(g.removeClass("nextStop"),f.removeClass("prevStop"),0==p&&f.addClass("prevStop"),p==k-1&&g.addClass("nextStop")),h.html("<span>"+(p+1)+"</span>/"+k)}},z&&bb(!0),A&&d.hover(function(){clearTimeout(K)},function(){K=setTimeout(function(){p=O,z?bb():"slideDown"==e?R.slideUp(q,V):R.animate({opacity:"hide"},q,V),N=p},300)}),cb=function(a){I=setInterval(function(){v?p--:p++,bb()},a?a:r)},db=function(a){I=setInterval(bb,a?a:r)},eb=function(){y||!u||i.hasClass("pauseState")||(clearInterval(I),cb())},fb=function(){(x||p!=k-1)&&(p++,bb(),S||eb())},gb=function(){(x||0!=p)&&(p--,bb(),S||eb())},hb=function(){clearInterval(I),S?db():cb(),i.removeClass("pauseState")},ib=function(){clearInterval(I),i.addClass("pauseState")},u?S?(v?p--:p++,db(),y&&l.hover(ib,hb)):(cb(),y&&d.hover(ib,hb)):(S&&(v?p--:p++),i.addClass("pauseState")),i.click(function(){i.hasClass("pauseState")?hb():ib()}),"mouseover"==c.trigger?j.hover(function(){var a=j.index(this);J=setTimeout(function(){p=a,bb(),eb()},c.triggerTime)},function(){clearTimeout(J)}):j.click(function(){p=j.index(this),bb(),eb()}),S?(g.mousedown(fb),f.mousedown(gb),x&&(kb=function(){jb=setTimeout(function(){clearInterval(I),db(0^r/10)},150)},lb=function(){clearTimeout(jb),clearInterval(I),db()},g.mousedown(kb),g.mouseup(lb),f.mousedown(kb),f.mouseup(lb)),"mouseover"==c.trigger&&(g.hover(fb,function(){}),f.hover(gb,function(){}))):(g.click(fb),f.click(gb)),"auto"!=c.vis||1!=t||"left"!=e&&"leftLoop"!=e||(nb=function(){C&&(l.width("auto"),l.children().width("auto")),l.parent().width("auto"),E=l.parent().width(),C&&l.parent().width(E),l.children().width(E),"left"==e?(l.width(E*m),l.stop(!0,!1).animate({left:-p*E},0)):(l.width(E*(m+2)),l.stop(!0,!1).animate({left:-(p+1)*E},0)),C||E==l.parent().width()||nb()},a(window).resize(function(){clearTimeout(mb),mb=setTimeout(nb,100)}),nb())})}}(jQuery),jQuery.easing["jswing"]=jQuery.easing["swing"],jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b+c:d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b+c:-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b*b+c:d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return 0==b?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){return 0==b?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){return(b/=e/2)<1?-d/2*(Math.sqrt(1-b*b)-1)+c:d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;return 0==b?c:1==(b/=e)?c+d:(g||(g=.3*e),h<Math.abs(d)?(h=d,f=g/4):f=g/(2*Math.PI)*Math.asin(d/h),-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c)},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;return 0==b?c:1==(b/=e)?c+d:(g||(g=.3*e),h<Math.abs(d)?(h=d,f=g/4):f=g/(2*Math.PI)*Math.asin(d/h),h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c)},easeInOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;return 0==b?c:2==(b/=e/2)?c+d:(g||(g=e*.3*1.5),h<Math.abs(d)?(h=d,f=g/4):f=g/(2*Math.PI)*Math.asin(d/h),1>b?-.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c:.5*h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+d+c)},easeInBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),(b/=e/2)<1?d/2*b*b*(((f*=1.525)+1)*b-f)+c:d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){return(b/=e)<1/2.75?d*7.5625*b*b+c:2/2.75>b?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:2.5/2.75>b?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(a,b,c,d,e){return e/2>b?.5*jQuery.easing.easeInBounce(a,2*b,0,d,e)+c:.5*jQuery.easing.easeOutBounce(a,2*b-e,0,d,e)+.5*d+c}});;
///<jscompress sourcefile="jquery.gScrollingCarousel.js" />
(function(jQuery) {
    jQuery.fn.extend({
        gScrollingCarousel: function(options) {

            var defaults = {
                scrolling: true,
                amount: false
            };

            options = jQuery.extend(defaults, options);

            var supportsTouch = false;

            if ('ontouchstart' in window){
                supportsTouch = true;
                } else if(window.navigator.msPointerEnabled) {
                supportsTouch = true;
                } else if ('ontouchstart' in document.documentElement) {
                supportsTouch = true;
            }

            if (!supportsTouch){
                var x,left,down,newX,oldX,maxScrollLeft,am,amX,amL,leftElem,rightElem,currx,items,element,elements;
                element = jQuery(this);
                if(options.amount == false) {
                    amount = element.children(":first").outerWidth(true);
                }else{
                    amount = options.amount;
                }
                leftElem = jQuery('<span />').addClass('jc-left').html('');
                rightElem = jQuery('<span />').addClass('jc-right').html('');
                element.parent().append(leftElem).append(rightElem);

                maxScrollLeft = element.get(0).scrollWidth - element.get(0).clientWidth;
                left = element.scrollLeft();
                if(maxScrollLeft == left) {
                    rightElem.hide();
                } else {
                    rightElem.show();
                }
                if(left == 0) {
                    leftElem.hide();
                } else {
                    leftElem.show();
                }

                if(options.scrolling){
                    element.bind("DOMMouseScroll mousewheel", function (event) {    
                            var oEvent = event.originalEvent, 
                            direction = oEvent.detail ? oEvent.detail * -amount : oEvent.wheelDelta, 
                            position = element.scrollLeft();
                        position += direction > 0 ? -amount : amount;

                        jQuery(this).scrollLeft(position);
                        event.preventDefault();
                        maxScrollLeft = element.get(0).scrollWidth - element.get(0).clientWidth;
                        left = element.scrollLeft();
                        if(maxScrollLeft == left) {
                            rightElem.fadeOut(200);
                        } else {
                            rightElem.fadeIn(200);
                        }
                        if(left == 0) {
                            leftElem.fadeOut(200);
                        } else {
                            leftElem.fadeIn(200);
                        }

                    });
                }
                element.bind("mousedown", function(e){
                    e.preventDefault();
                    down = true;
                    x = e.pageX;
                    left = jQuery(this).scrollLeft();
                }).bind("mousemove", function(e){
                    if(down){
                        if(e.pageX != x){
                            element.addClass("nonclick");
                            newX = e.pageX;
                            oldX = element.scrollLeft();
                            element.scrollLeft(left-newX+x);  
                            maxScrollLeft = element.get(0).scrollWidth - element.get(0).clientWidth;
                            if(maxScrollLeft == oldX) {
                                rightElem.fadeOut(200);
                            } else {
                                rightElem.fadeIn(200);
                            }
                            if(oldX == 0) {
                                leftElem.fadeOut(200);
                            } else {
                                leftElem.fadeIn(200);
                            }
                        }
                    } else {
                        element.removeClass("nonclick");
                    }
                });
                rightElem.bind("click", function(e){
                  leftElem.fadeIn(200);
                  items = jQuery(this).siblings(".items");
                  currx = items.scrollLeft();
                  amX = parseInt(jQuery(this).parent().width() / amount); // cantidad de elementos x viewport
                  am = (amX * amount) - amount;
                  maxScrollLeft = items.get(0).scrollWidth - items.get(0).clientWidth;
                  if(currx+am >= maxScrollLeft) jQuery(this).fadeOut(200);
                  items.animate( { scrollLeft: '+='+am }, 200);
                });
                leftElem.bind("click", function(e){
                  rightElem.fadeIn(200);
                  items = jQuery(this).siblings(".items");
                  currx = items.scrollLeft();
                  amX = parseInt(jQuery(this).parent().width() / amount); // cantidad de elementos x viewport
                  am = (amX * amount) - amount;
                  if(currx-am <= 0) jQuery(this).fadeOut(200);
                  items.animate( { scrollLeft: '-='+am }, 200);
                });
                jQuery(window).on('resize', function(){
                    element.each( function(){
                        elements = jQuery(this);
                        maxScrollLeft = elements.get(0).scrollWidth - elements.get(0).clientWidth;
                        left = elements.scrollLeft();
                        if(maxScrollLeft == left) {
                            rightElem.fadeOut(200);
                        } else {
                            rightElem.fadeIn(200);
                        }
                        if(left == 0) {
                            leftElem.fadeOut(200);
                        } else {
                            leftElem.fadeIn(200);
                        }
                    });
                });
                jQuery(document).on("mouseup mousedown click", ".nonclick a", function(e){  //prevent clicking while moving
                  e.preventDefault();
                });
                jQuery(document).on("mouseup", function(e){ //globally remove nonclicks onmouseup
                    setTimeout(function(){
                        element.removeClass("nonclick");
                        down=false;
                    },1);
                });
            }
        }
    });
})(jQuery);
;
///<jscompress sourcefile="common_smilies_var.js" />
var smthumb = '20';var smilies_type = new Array();smilies_type['_1'] = ['默认', 'default'];smilies_type['_2'] = ['酷猴', 'coolmonkey'];smilies_type['_3'] = ['呆呆男', 'grapeman'];var smilies_array = new Array();var smilies_fast = new Array();smilies_array[1] = new Array();smilies_array[1][1] = [['1', ':)','smile.gif','20','20','20'],['2', ':(','sad.gif','20','20','20'],['3', ':D','biggrin.gif','20','20','20'],['4', ':\'(','cry.gif','20','20','20'],['5', ':@','huffy.gif','20','20','20'],['6', ':o','shocked.gif','20','20','20'],['7', ':P','tongue.gif','20','20','20'],['8', ':$','shy.gif','20','20','20'],['9', ';P','titter.gif','20','20','20'],['10', ':L','sweat.gif','20','20','20'],['11', ':Q','mad.gif','20','20','20'],['12', ':lol','lol.gif','20','20','20'],['13', ':loveliness:','loveliness.gif','20','20','20'],['14', ':funk:','funk.gif','20','20','20'],['15', ':curse:','curse.gif','20','20','20'],['16', ':dizzy:','dizzy.gif','20','20','20'],['17', ':shutup:','shutup.gif','20','20','20'],['18', ':sleepy:','sleepy.gif','20','20','20'],['19', ':hug:','hug.gif','20','20','20'],['20', ':victory:','victory.gif','20','20','20'],['21', ':time:','time.gif','20','20','20'],['22', ':kiss:','kiss.gif','20','20','20'],['23', ':handshake','handshake.gif','20','20','20'],['24', ':call:','call.gif','20','20','20']];smilies_array[2] = new Array();smilies_array[2][1] = [['25', '{:2_25:}','01.gif','20','20','48'],['26', '{:2_26:}','02.gif','20','20','48'],['27', '{:2_27:}','03.gif','20','20','48'],['28', '{:2_28:}','04.gif','20','20','48'],['29', '{:2_29:}','05.gif','20','20','48'],['30', '{:2_30:}','06.gif','20','20','48'],['31', '{:2_31:}','07.gif','20','20','48'],['32', '{:2_32:}','08.gif','20','20','48'],['33', '{:2_33:}','09.gif','20','20','48'],['34', '{:2_34:}','10.gif','20','20','48'],['35', '{:2_35:}','11.gif','20','20','48'],['36', '{:2_36:}','12.gif','20','20','48'],['37', '{:2_37:}','13.gif','20','20','48'],['38', '{:2_38:}','14.gif','20','20','48'],['39', '{:2_39:}','15.gif','20','20','48'],['40', '{:2_40:}','16.gif','20','20','48']];smilies_array[3] = new Array();smilies_array[3][1] = [['41', '{:3_41:}','01.gif','20','20','48'],['42', '{:3_42:}','02.gif','20','20','48'],['43', '{:3_43:}','03.gif','20','20','48'],['44', '{:3_44:}','04.gif','20','20','48'],['45', '{:3_45:}','05.gif','20','20','48'],['46', '{:3_46:}','06.gif','20','20','48'],['47', '{:3_47:}','07.gif','20','20','48'],['48', '{:3_48:}','08.gif','20','20','48'],['49', '{:3_49:}','09.gif','20','20','48'],['50', '{:3_50:}','10.gif','20','20','48'],['51', '{:3_51:}','11.gif','20','20','48'],['52', '{:3_52:}','12.gif','20','20','48'],['53', '{:3_53:}','13.gif','20','20','48'],['54', '{:3_54:}','14.gif','20','20','48'],['55', '{:3_55:}','15.gif','20','20','48'],['56', '{:3_56:}','16.gif','20','20','48'],['57', '{:3_57:}','17.gif','20','20','48'],['58', '{:3_58:}','18.gif','20','20','48'],['59', '{:3_59:}','19.gif','20','20','48'],['60', '{:3_60:}','20.gif','20','20','48'],['61', '{:3_61:}','21.gif','20','20','48'],['62', '{:3_62:}','22.gif','20','20','48'],['63', '{:3_63:}','23.gif','20','20','48'],['64', '{:3_64:}','24.gif','20','20','48']];var smilies_fast=[['1','1','0'],['1','1','1'],['1','1','2'],['1','1','3'],['1','1','4'],['1','1','5'],['1','1','6'],['1','1','7'],['1','1','8'],['1','1','9'],['1','1','10'],['1','1','11'],['1','1','12'],['1','1','13'],['1','1','14'],['1','1','15']];;
///<jscompress sourcefile="font.js" />
!function(o){var l,h='<svg><symbol id="icon-dayin" viewBox="0 0 1024 1024"><path d="M698.76 897H325.24a5.24 5.24 0 0 1-5.24-5.24V774.24a5.24 5.24 0 0 1 5.24-5.24h373.52a5.24 5.24 0 0 1 5.24 5.24v117.52a5.24 5.24 0 0 1-5.24 5.24zM256 736v194a31 31 0 0 0 31 31h450a31 31 0 0 0 31-31V736a31 31 0 0 0-31-31H287a31 31 0 0 0-31 31zM698.75 513h-373.5a5.25 5.25 0 0 1-5.25-5.25v-373.5a5.25 5.25 0 0 1 5.25-5.25h373.5a5.25 5.25 0 0 1 5.25 5.25v373.5a5.25 5.25 0 0 1-5.25 5.25zM256 93v456a28 28 0 0 0 28 28h456a28 28 0 0 0 28-28V93a28 28 0 0 0-28-28H284a28 28 0 0 0-28 28zM224 769h-87.43a8.57 8.57 0 0 1-8.57-8.57V457.57a8.57 8.57 0 0 1 8.57-8.57H224v-64H90.16A26.16 26.16 0 0 0 64 411.16v395.68A26.16 26.16 0 0 0 90.16 833H224zM800 385v64h88.56a7.44 7.44 0 0 1 7.44 7.44v305.12a7.44 7.44 0 0 1-7.44 7.44H800v64h134.31A25.69 25.69 0 0 0 960 807.31V410.69A25.69 25.69 0 0 0 934.31 385z" fill="#666666" ></path><path d="M384 225l256 0 0 64-256 0 0-64Z" fill="#666666" ></path><path d="M384 353l256 0 0 64-256 0 0-64Z" fill="#666666" ></path></symbol><symbol id="icon-dazhaohu" viewBox="0 0 1024 1024"><path d="M296.96 280.064h438.784v438.784H296.96z" fill="#FFFFFF" ></path><path d="M829.44 198.656l-2.048-2.048c-80.896-80.896-192-130.56-315.392-130.56s-235.008 49.664-315.392 130.56c-80.896 80.896-130.56 192.512-130.56 315.392 0 123.392 50.176 235.008 130.56 315.904 80.896 80.384 192.512 130.56 315.392 130.56h332.8c18.944 0 34.304-15.36 34.304-34.304v-158.208c24.576-35.328 43.52-74.24 57.344-115.2 14.336-43.52 22.016-90.112 22.016-138.24 0-122.88-49.664-233.472-129.024-313.856z m-264.704 464.896c0 1.536-0.512 2.56-1.024 3.584-0.512 1.024-2.048 2.048-3.584 2.56-1.536 0.512-4.096 1.024-6.656 1.536-3.072 0.512-6.144 0.512-10.24 0.512-4.608 0-8.192 0-10.752-0.512s-5.12-1.024-6.656-1.536c-1.536-0.512-3.072-1.536-3.584-2.56-0.512-1.024-1.024-2.048-1.024-3.584v-145.92h-149.504v145.92c0 1.536-0.512 2.56-1.024 3.584-0.512 1.024-2.048 2.048-3.584 2.56-1.536 0.512-4.096 1.024-6.656 1.536-3.072 0.512-6.144 0.512-10.752 0.512-4.096 0-7.68 0-10.24-0.512-3.072-0.512-5.12-1.024-6.656-1.536-1.536-0.512-3.072-1.536-3.584-2.56-0.512-1.024-1.024-2.048-1.024-3.584V348.16c0-1.536 0.512-2.56 1.024-3.584 0.512-1.024 2.048-2.048 3.584-2.56 1.536-0.512 4.096-1.024 6.656-1.536 3.072-0.512 6.144-0.512 10.24-0.512s7.68 0 10.752 0.512c2.56 0.512 5.12 1.024 6.656 1.536 1.536 0.512 3.072 1.536 3.584 2.56 0.512 1.024 1.024 2.048 1.024 3.584v131.584h149.504V348.16c0-1.536 0.512-2.56 1.024-3.584 0.512-1.024 2.048-2.048 3.584-2.56 1.536-0.512 4.096-1.024 6.656-1.536 2.56-0.512 6.144-0.512 10.752-0.512 4.096 0 7.68 0 10.24 0.512s5.12 1.024 6.656 1.536c1.536 0.512 3.072 1.536 3.584 2.56 0.512 1.024 1.024 2.048 1.024 3.584v315.392z m131.072 0c0 1.536-0.512 2.56-1.024 3.584-0.512 1.024-1.536 2.048-3.584 2.56-1.536 0.512-4.096 1.024-6.656 1.536-3.072 0.512-6.144 0.512-10.752 0.512-4.096 0-7.68 0-10.24-0.512-3.072-0.512-5.12-1.024-7.168-1.536-1.536-0.512-3.072-1.536-3.584-2.56-0.512-1.024-1.024-2.048-1.024-3.584V348.16c0-1.536 0.512-2.56 1.024-3.584s2.048-2.048 3.584-2.56c2.048-0.512 4.096-1.024 6.656-1.536 2.56-0.512 6.144-0.512 9.728-0.512 4.096 0 7.68 0 10.752 0.512 2.56 0.512 5.12 1.024 6.656 1.536 1.536 0.512 3.072 1.536 3.584 2.56 0.512 1.024 1.024 2.048 1.024 3.584v315.392z" fill="#FC657A" ></path></symbol><symbol id="icon-shangyin" viewBox="0 0 1024 1024"><path d="M527.753846 673.476923V669.538462v3.938461zM622.276923 429.292308H393.846154v35.446154h228.430769z" fill="#ED4748" ></path><path d="M976.738462 311.138462C953.107692 248.123077 913.723077 196.923077 866.461538 149.661538c-47.261538-47.261538-102.4-82.707692-161.476923-110.276923-63.015385-23.630769-126.030769-39.384615-196.923077-39.384615-66.953846 0-133.907692 11.815385-196.923076 39.384615S196.923077 102.4 149.661538 149.661538C106.338462 196.923077 66.953846 252.061538 39.384615 315.076923c-27.569231 63.015385-39.384615 126.030769-39.384615 196.923077 0 66.953846 11.815385 133.907692 39.384615 196.923077 23.630769 63.015385 63.015385 114.215385 110.276923 161.476923C196.923077 917.661538 252.061538 957.046154 315.076923 980.676923c63.015385 23.630769 129.969231 39.384615 196.923077 39.384615 66.953846 0 133.907692-11.815385 196.923077-39.384615 63.015385-23.630769 114.215385-63.015385 161.476923-110.276923 47.261538-47.261538 82.707692-102.4 110.276923-161.476923 23.630769-63.015385 39.384615-129.969231 39.384615-196.923077 3.938462-70.892308-15.753846-137.846154-43.323076-200.861538zM748.307692 807.384615c-3.938462 3.938462-7.876923 3.938462-11.815384 3.938462-7.876923 0-11.815385 0-19.692308-3.938462-27.569231-15.753846-55.138462-31.507692-86.646154-47.261538-31.507692-11.815385-63.015385-27.569231-98.461538-43.323077-3.938462-3.938462-19.692308-11.815385-19.692308-23.630769v-3.938462c-3.938462 11.815385-7.876923 19.692308-11.815385 23.630769-19.692308 31.507692-55.138462 59.076923-110.276923 74.83077-51.2 15.753846-90.584615 23.630769-114.215384 23.630769-19.692308 0-27.569231-11.815385-27.569231-23.630769 0-3.938462 3.938462-23.630769 27.569231-27.569231 55.138462-7.876923 98.461538-19.692308 126.030769-27.569231 23.630769-11.815385 47.261538-23.630769 59.076923-39.384615 11.815385-19.692308 19.692308-47.261538 19.692308-82.707693 0-11.815385 3.938462-19.692308 15.753846-23.630769H358.4c-3.938462 0-3.938462 0-3.938462 7.876923v110.276923c0 15.753846-11.815385 23.630769-27.56923 23.63077-15.753846 0-23.630769-11.815385-23.63077-23.63077v-118.153846c0-19.692308 3.938462-31.507692 15.753847-43.323077 11.815385-7.876923 23.630769-11.815385 43.323077-11.815384H669.538462c19.692308 0 35.446154 3.938462 43.323076 11.815384 7.876923 11.815385 11.815385 23.630769 11.815385 43.323077v114.215385c0 15.753846-11.815385 23.630769-27.569231 23.630769-15.753846 0-23.630769-11.815385-23.630769-23.630769v-114.215385h-145.723077c11.815385 3.938462 15.753846 11.815385 15.753846 23.630769 0 23.630769-3.938462 43.323077-7.876923 63.015385 3.938462-3.938462 7.876923-7.876923 15.753846-7.876923 3.938462 0 7.876923 3.938462 31.507693 11.815385l63.015384 27.56923c11.815385 3.938462 23.630769 11.815385 39.384616 19.692308 11.815385 3.938462 23.630769 11.815385 35.446154 19.692308 11.815385 7.876923 19.692308 11.815385 27.56923 15.753846 3.938462 3.938462 11.815385 3.938462 11.815385 7.876923 7.876923 7.876923 11.815385 15.753846 11.815385 19.692308-3.938462 7.876923-11.815385 15.753846-23.63077 19.692307zM338.707692 456.861538v-27.56923c0-7.876923 0-19.692308 3.938462-23.63077 3.938462-7.876923 3.938462-11.815385 11.815384-19.692307 3.938462-3.938462 11.815385-7.876923 19.692308-11.815385h248.123077c19.692308 0 31.507692 3.938462 39.384615 15.753846 7.876923 11.815385 11.815385 23.630769 11.815385 39.384616v31.507692c0 19.692308-3.938462 31.507692-11.815385 39.384615-7.876923 7.876923-19.692308 11.815385-39.384615 11.815385H393.846154c-7.876923 0-15.753846-3.938462-19.692308-3.938462-7.876923-3.938462-15.753846-3.938462-19.692308-11.815384-3.938462-3.938462-7.876923-11.815385-11.815384-19.692308-3.938462-3.938462-3.938462-11.815385-3.938462-19.692308z m429.292308-43.323076c-3.938462 11.815385-7.876923 39.384615-31.507692 39.384615-11.815385 0-19.692308-3.938462-23.63077-11.815385-3.938462-3.938462-11.815385-15.753846-3.938461-31.507692 7.876923-19.692308 11.815385-35.446154 11.815385-47.261538 0-19.692308-3.938462-19.692308-7.876924-19.692308H307.2c-3.938462 0-3.938462 3.938462-3.938462 3.938461v66.953847c0 11.815385-7.876923 23.630769-27.56923 23.630769s-27.569231-3.938462-27.569231-19.692308V350.523077c0-19.692308 3.938462-31.507692 15.753846-39.384615 11.815385-11.815385 23.630769-15.753846 43.323077-15.753847h35.446154c-3.938462-7.876923-11.815385-15.753846-15.753846-19.692307-11.815385-15.753846-7.876923-27.569231-7.876923-35.446154 3.938462-11.815385 11.815385-15.753846 23.630769-15.753846 3.938462 0 11.815385 3.938462 15.753846 7.876923 3.938462 3.938462 3.938462 7.876923 7.876923 11.815384 3.938462 3.938462 7.876923 11.815385 11.815385 19.692308 7.876923 11.815385 15.753846 23.630769 19.692307 31.507692h78.769231V232.369231c0-11.815385 7.876923-23.630769 27.569231-23.630769 19.692308 0 27.569231 15.753846 27.569231 23.630769v63.015384h86.646154c7.876923-3.938462 11.815385-11.815385 19.692307-19.692307 3.938462-11.815385 11.815385-19.692308 19.692308-31.507693 3.938462-7.876923 7.876923-11.815385 11.815385-15.753846 3.938462-3.938462 11.815385-3.938462 19.692307 0 3.938462 3.938462 7.876923 3.938462 11.815385 11.815385 3.938462 3.938462 7.876923 7.876923 7.876923 15.753846s-3.938462 19.692308-19.692308 43.323077h19.692308c19.692308 0 39.384615 7.876923 47.261538 19.692308 11.815385 11.815385 19.692308 27.569231 19.692308 51.2 0 7.876923-3.938462 23.630769-7.876923 43.323077z" fill="#ED4748" ></path></symbol><symbol id="icon-zan" viewBox="0 0 1024 1024"><path d="M580.060467 37.546667c-64.259413 0-107.1104 55.046827-107.1104 121.306453 0 3.7376-0.293547 7.304533 0 10.881707-3.355307 123.904-102.35904 223.511893-220.16 237.175466L251.906014 986.20416l582.8096-0.03072h0.361813c21.52448 0 33.682773-5.573973 53.285547-18.394453a120.067413 120.067413 0 0 0 42.02496-48.196267c2.54976-3.81952 91.067733-396.92288 93.3376-420.2496a125.085013 125.085013 0 0 0-17.42848-73.472c-21.661013-35.938987-53.13536-50.46272-91.204267-52.04992-1.97632-0.303787-230.352213-1.252693-230.352213-1.252693 15.117653-44.622507 19.295573-97.805653 19.295573-147.797334a446.57664 446.57664 0 0 0-10.1376-94.347946l-0.566613 0.058026C681.415987 77.25056 635.264307 37.546667 580.060467 37.546667zM169.013214 409.081173h-124.0064A45.421227 45.421227 0 0 0 0.002014 454.92224v485.686613A45.421227 45.421227 0 0 0 45.006814 986.453333h124.0064A45.417813 45.417813 0 0 0 214.018014 940.608853V454.929067a45.421227 45.421227 0 0 0-45.001387-45.847894z" fill="#FF5F5F" ></path><path d="M582.999347 103.939413c24.17664 0 45.056 17.790293 50.742614 43.257174l3.433813 14.677333a381.5424 381.5424 0 0 1 5.76512 65.809067c0 54.091093-5.225813 95.778133-15.9744 127.443626l-28.11904 82.827947 88.521387 0.365227c85.435733 0.341333 215.381333 0.96256 227.894613 1.191253 22.381227 0.945493 31.194453 8.485547 38.823253 21.111467a62.078293 62.078293 0 0 1 8.707414 34.932053c-5.802667 35.54304-77.482667 354.471253-89.50784 402.510507a56.108373 56.108373 0 0 1-17.408 18.56512c-12.05248 7.867733-12.84096 7.867733-18.312534 7.867733l-518.5536 0.03072 0.72704-464.213333c125.341013-38.690133 216.528213-153.146027 220.142934-285.873494l0.095573-3.474773-0.19456-2.29376 0.027307-1.365333 0.09216-5.4272c0-27.910827 13.503147-57.944747 43.10016-57.944747M153.076361 474.763947v450.000213h-85.981867V474.763947h85.981867" fill="#FFABAB" ></path></symbol><symbol id="icon-huatibianlun" viewBox="0 0 1024 1024"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#f9c8be" ></path><path d="M490.126222 329.045333l-105.443555 300.515556a148.707556 148.707556 0 0 0-8.675556 35.043555h-1.251555a170.069333 170.069333 0 0 0-7.68-34.56L263.623111 329.045333H208.554667L347.022222 713.955556h55.068445L543.288889 329.045333h-53.162667z m89.315556 369.379556a128.568889 128.568889 0 0 0 44.288 15.786667 264.96 264.96 0 0 0 53.219555 6.343111 168.732444 168.732444 0 0 0 101.973334-27.107556 90.823111 90.823111 0 0 0 36.721777-77.795555 92.700444 92.700444 0 0 0-22.613333-60.984889 236.970667 236.970667 0 0 0-79.075555-54.044445 307.968 307.968 0 0 1-66.730667-40.021333 50.176 50.176 0 0 1-15.388445-38.030222 46.791111 46.791111 0 0 1 22.215112-41.130667 101.745778 101.745778 0 0 1 57.429333-14.791111 150.499556 150.499556 0 0 1 87.808 24.120889V336.497778a191.459556 191.459556 0 0 0-84.110222-13.909334 160.170667 160.170667 0 0 0-96.995556 28.103112A89.315556 89.315556 0 0 0 579.669333 426.666667a92.387556 92.387556 0 0 0 18.346667 56.547555 219.022222 219.022222 0 0 0 76.117333 53.646222 625.464889 625.464889 0 0 1 56.888889 30.577778 83.086222 83.086222 0 0 1 23.808 22.755556 51.029333 51.029333 0 0 1 8.675556 29.098666q0 57.685333-80.839111 57.685334a175.644444 175.644444 0 0 1-56.064-9.927111 137.301333 137.301333 0 0 1-47.132445-25.344v56.689777z" fill="#ec3814" ></path></symbol><symbol id="icon-tuijian" viewBox="0 0 1024 1024"><path d="M896 838.4H288L51.2 928l115.2-204.8V172.8c6.4-19.2 12.8-32 25.6-44.8 12.8-12.8 25.6-19.2 38.4-19.2H896c12.8 0 32 6.4 38.4 19.2 12.8 12.8 19.2 25.6 19.2 38.4v608c0 12.8-6.4 32-19.2 38.4-12.8 19.2-25.6 25.6-38.4 25.6" fill="#ED5555" ></path><path d="M480 364.8c6.4-19.2 12.8-32 19.2-44.8l44.8 6.4-19.2 38.4h294.4v38.4h-320c-19.2 32-38.4 64-64 89.6v256h-38.4V537.6c-25.6 25.6-51.2 44.8-83.2 64l-25.6-32c70.4-44.8 128-102.4 166.4-166.4H307.2v-38.4h172.8z m-44.8-128V192h44.8v44.8H640V192h44.8v44.8h140.8v38.4h-140.8V320H640v-38.4H480V320h-44.8v-38.4H300.8v-44.8h134.4z m294.4 256H531.2v-38.4h262.4v32c-25.6 19.2-57.6 44.8-96 70.4V576H832v38.4h-134.4V704c0 32-19.2 51.2-51.2 51.2H576l-12.8-44.8h64c12.8 0 25.6-6.4 25.6-19.2V620.8H486.4V576h166.4v-38.4c19.2-12.8 44.8-25.6 76.8-44.8z" fill="#FFFFFF" ></path></symbol><symbol id="icon-yuyin" viewBox="0 0 1024 1024"><path d="M511.616778 720.839794c117.744831-0.255481 213.119102-95.629752 213.374583-213.374583V215.482302c0-117.840636-95.517979-213.374583-213.374583-213.374583-117.840636 0-213.374583 95.533947-213.374582 213.374583v291.982909c0.255481 117.728863 95.64572 213.119102 213.374582 213.374583z" fill="#33d317" ></path><path d="M826.034118 473.789615a33.675596 33.675596 0 0 0-33.643661 33.659629c0 155.045065-125.696679 280.757711-280.757711 280.757711-155.045065 0-280.757711-125.696679-280.757711-280.757711a33.675596 33.675596 0 1 0-67.36716 0c0.303384 179.060284 136.235272 328.788149 314.449275 346.336504v102.847092h-145.991455a33.691564 33.691564 0 1 0 0 67.383128h359.366037a33.691564 33.691564 0 1 0 0-67.383128h-145.991454V853.785748c178.214003-17.548355 314.129924-167.27622 314.417339-346.336504a33.707532 33.707532 0 0 0-33.723499-33.659629z" fill="#33d317" ></path></symbol><symbol id="icon-xGroup" viewBox="0 0 1024 1024"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#fae7cd" ></path><path d="M712.533333 442.666667h-44.8v-99.2C667.733333 259.2 597.333333 192 509.866667 192c-87.466667 0-158.933333 67.2-158.933334 151.466667v99.2h-44.8C283.733333 442.666667 266.666667 458.666667 266.666667 480v272c0 20.266667 17.066667 37.333333 39.466666 37.333333h407.466667c21.333333 0 39.466667-17.066667 39.466667-37.333333V480c-1.066667-21.333333-18.133333-37.333333-40.533334-37.333333z m-181.333333 180.266666V682.666667c0 2.133333-2.133333 5.333333-5.333333 5.333333h-34.133334c-3.2 0-5.333333-2.133333-5.333333-5.333333v-59.733334c-16-7.466667-26.666667-23.466667-26.666667-41.6 0-25.6 21.333333-46.933333 49.066667-46.933333 26.666667 0 49.066667 21.333333 49.066667 46.933333 0 18.133333-10.666667 34.133333-26.666667 41.6z m75.733333-180.266666H411.733333v-97.066667c0-51.2 43.733333-92.8 98.133334-92.8s98.133333 41.6 98.133333 92.8l-1.066667 97.066667z" fill="#ff9903" ></path></symbol><symbol id="icon-zhibo" viewBox="0 0 1024 1024"><path d="M0 307.2v409.6h870.4L632.302933 307.2H0z" fill="#B6064D" ></path><path d="M957.44 405.521067l-16.605867 65.518933-16.64-65.536-66.56-16.384 66.56-16.384 16.64-65.536 16.64 65.536L1024 389.12zM0 716.8V307.2h870.4L632.302933 716.8H0z m864.5632-276.48l12.475733 49.152 49.92 12.288-49.92 12.288-12.475733 49.152-12.475733-49.152L802.133333 501.76l49.92-12.288z" fill="#E52270" ></path><path d="M147.2512 417.2288v22.784H240.64c-1.024 5.632-2.304 11.264-3.584 17.066667h-59.392v148.224H142.3872v22.272h228.693333v-22.186667h-36.693333v-148.224h-72.192c1.024-5.632 2.304-11.264 3.584-17.066667h100.096v-22.869333h-96.512c0.768-6.144 1.536-12.288 2.304-18.944l-24.832-3.413333c-0.768 7.424-1.536 14.848-2.56 22.186666H147.2512z m54.613333 188.16v-17.152h108.544v17.152h-108.544z m0-36.608v-17.066667h108.544v17.066667h-108.544z m0-36.352v-16.896h108.544v16.9472h-108.544z m0-36.096v-17.664h108.544v17.664h-108.544z m337.152 45.312v20.736h-32.426666v-20.736h32.426666z m0 39.68v19.712h-32.426666v-19.712h32.426666z m20.48 19.712v-19.712h32v19.712h-32.085333z m31.914667 20.189867v11.264h22.186667v-105.813334c3.072 1.536 6.144 3.413333 9.728 5.12l10.581333-19.797333a179.6608 179.6608 0 0 1-54.016-30.72h46.08v-20.992h-29.013333a240.4352 240.4352 0 0 0 13.056-24.32l-20.736-7.168a248.1664 248.1664 0 0 1-13.568 31.488h-15.530667v-34.304a425.984 425.984 0 0 0 62.976-10.24l-11.264-19.2a622.199467 622.199467 0 0 1-136.533333 12.8l6.912 19.968c19.712 0 38.144-0.512 55.552-1.536v32.426667h-15.872a183.210667 183.210667 0 0 0-10.752-26.112l-19.968 7.68a157.013333 157.013333 0 0 1 10.24 18.432h-26.112V481.28h43.264a137.403733 137.403733 0 0 1-50.688 31.232v-13.1072c-6.144 3.584-12.288 6.912-18.773334 9.984v-43.264h19.712v-23.04h-19.541333v-46.336h-24.064v46.336H397.653333v23.04h27.648v53.76a241.988267 241.988267 0 0 1-32.768 9.984l6.144 24.064a691.882667 691.882667 0 0 0 26.624-9.984V599.04a8.072533 8.072533 0 0 1-8.96 9.216 116.718933 116.718933 0 0 1-18.432-1.536l5.376 23.296h21.504a21.896533 21.896533 0 0 0 24.576-24.832v-72.192c6.144-3.072 12.544-6.144 18.773334-9.728v-6.144l9.984 16.128c2.048-1.024 4.096-2.304 6.144-3.413333v102.656h22.186666v-11.264h84.992z m14.336-99.328h-108.8a131.413333 131.413333 0 0 0 39.936-40.704h1.024v33.28h22.272V481.28h1.024a170.581333 170.581333 0 0 0 44.544 40.6528z m-46.336 40.448v-20.701867h32v20.736h-32z" fill="#FFFFFF" ></path></symbol><symbol id="icon-qiang" viewBox="0 0 1024 1024"><path d="M512 0C229.2224 0 0 229.2224 0 512c0 282.752 229.2224 512 512 512 282.752 0 512-229.248 512-512V0H512z" fill="#E6182D" ></path><path d="M437.9648 545.4848l-75.5712 22.7584v170.8288c0 26.3936-6.7584 38.0672-22.7328 45.44-15.36 7.3728-40.5504 8.6016-82.944 8.6016-1.8432-11.6736-8.6016-30.6944-14.7456-43.008 29.4912 1.2288 55.9104 0.6144 63.2832 0.6144 8.6016 0 12.288-3.072 12.288-11.6736v-157.3376c-28.2624 8.6016-54.6816 15.9744-78.0288 22.7584l-14.1312-45.4656c25.8048-6.144 57.7536-14.7456 92.16-23.9872v-131.4816H232.7296v-44.2368h84.7872v-122.88h44.8512v122.9056h68.8128v44.2368h-68.8128v119.1936l69.4272-19.6608 6.1696 42.3936z m197.248-301.0816c-3.0464 7.3728-6.7584 14.1568-9.856 21.5296 39.3472 71.2704 110.0032 146.8416 173.312 183.0912a162.1504 162.1504 0 0 0-33.2032 37.4784c-57.1392-38.7072-118.5536-108.7488-161.6128-180.6592-42.3936 73.7536-99.5328 138.24-159.744 183.7312-4.9152-9.8304-17.8176-31.3344-27.0336-41.1648 71.8848-49.7408 137.6256-130.2528 175.7184-217.4976l42.4192 13.4912z m54.6816 495.872c30.6944 0 35.6608-13.5168 39.296-87.8848 10.4448 7.3728 28.9024 14.7456 41.8048 17.8176-6.144 88.4736-20.8896 112.4608-78.0544 112.4608h-121.6512c-62.0544 0-81.1008-13.5168-81.1008-70.6816V450.2528h221.824s0 12.288-0.5888 17.8176c-3.712 106.2656-7.3984 147.456-20.3008 162.2016-9.1904 11.0848-19.6608 14.7456-36.8384 16.5888-14.1568 0.5888-44.2624 0.5888-74.3424-1.2288a94.3616 94.3616 0 0 0-12.288-39.3472c28.9024 3.072 56.5504 3.072 66.3552 3.072 9.856 0 15.4112-0.5888 19.0464-5.5296 8.0128-8.6016 11.6992-36.864 14.1568-111.2064H535.04v219.9808c0 23.3472 6.144 27.648 39.9616 27.648h114.8928z" fill="#FFFFFF" ></path></symbol><symbol id="icon-faxinxi" viewBox="0 0 1024 1024"><path d="M512 0C229.376 0 0 229.376 0 512s229.376 512 512 512 512-229.376 512-512S794.624 0 512 0z" fill="#FCB000" ></path><path d="M511.488 301.056c-108.544 0-196.096 84.48-195.072 189.44 0 51.712 20.992 97.792 55.808 132.608v100.352l87.552-49.152c15.872 4.096 33.28 6.656 51.712 6.656 108.544 0 196.096-83.456 196.096-189.44s-87.552-190.464-196.096-190.464z" fill="#FFFFFF" ></path><path d="M406.528 521.216c-19.968 0-34.304-15.872-34.304-34.304s15.872-34.304 34.304-34.304c19.968 0 34.304 15.872 34.304 34.304 0.512 19.456-15.872 34.304-34.304 34.304zM511.488 521.216c-19.968 0-34.304-15.872-34.304-34.304s15.872-34.304 34.304-34.304c19.968 0 34.304 15.872 34.304 34.304 0 19.456-14.336 34.304-34.304 34.304zM615.936 521.216c-19.968 0-34.304-15.872-34.304-34.304s15.872-34.304 34.304-34.304c19.968 0 34.304 15.872 34.304 34.304 0 19.456-14.336 34.304-34.304 34.304z" fill="#FCB000" ></path></symbol><symbol id="icon-dingyue" viewBox="0 0 1024 1024"><path d="M0 0h128.438857C64.950857 10.971429 16.237714 58.660571 0 120.246857V0zM904.192 0H1024v128.877714c-9.801143-63.926857-58.953143-111.616-119.808-128.877714zM295.350857 252.781714c115.419429-10.678857 231.716571-0.292571 347.574857-4.827428 45.348571 0 110.592-6.729143 128.146286 47.542857 10.386286 71.826286 1.609143 144.676571 4.242286 216.941714-2.194286 68.315429 4.827429 137.216-2.779429 205.385143-1.316571 24.722286-22.089143 45.202286-44.470857 53.101714-71.387429 10.386286-143.798857 1.755429-215.625143 4.388572-68.461714-2.194286-137.216 4.534857-205.531428-2.779429-33.792-2.048-59.392-35.84-57.197715-68.900571-3.218286-117.467429 0.731429-235.081143-1.755428-352.694857-1.901714-37.741714 4.681143-85.869714 47.396571-98.157715m24.576 66.413715c0.585143 22.235429 0.877714 44.470857 0.877714 66.706285 64.219429 7.606857 130.194286 20.48 182.710858 60.708572 84.699429 57.197714 130.048 157.110857 135.899428 257.170285 22.235429-0.731429 44.617143-0.146286 66.998857 1.609143-5.997714-69.485714-19.602286-139.849143-58.368-199.094857-67.584-114.541714-196.754286-182.857143-328.118857-187.099428m-1.170286 135.899428c2.340571 24.137143 2.486857 48.274286 0.585143 72.557714 95.378286 6.290286 171.300571 82.505143 178.614857 177.444572 23.990857-1.316571 48.128-1.462857 72.118858 0-8.192-60.269714-24.868571-122.002286-68.900572-166.619429-45.933714-53.394286-114.980571-74.605714-182.418286-83.382857m10.386286 167.058286c-36.717714 15.36-38.473143 72.996571-2.925714 90.697143 31.012571 18.724571 74.605714-3.949714 76.946286-40.082286 4.973714-38.619429-40.228571-68.754286-74.020572-50.614857zM0 900.681143C13.458286 962.267429 61.001143 1009.371429 122.148571 1024H0v-123.318857zM901.266286 1024c60.854857-14.043429 107.666286-60.708571 122.733714-121.270857V1024h-122.733714z" fill="#FFFFFF" ></path><path d="M128.438857 0h775.753143c60.854857 17.261714 110.006857 64.950857 119.808 128.877714v773.851429c-15.067429 60.562286-61.878857 107.227429-122.733714 121.270857H122.148571C61.001143 1009.371429 13.458286 962.267429 0 900.681143V120.246857C16.237714 58.660571 64.950857 10.971429 128.438857 0m166.912 252.781714c-42.715429 12.288-49.298286 60.416-47.396571 98.157715 2.486857 117.613714-1.462857 235.227429 1.755428 352.694857-2.194286 33.060571 23.405714 66.852571 57.197715 68.900571 68.315429 7.314286 137.069714 0.585143 205.531428 2.779429 71.826286-2.633143 144.237714 5.997714 215.625143-4.388572 22.381714-7.899429 43.154286-28.379429 44.470857-53.101714 7.606857-68.169143 0.585143-137.069714 2.779429-205.385143-2.633143-72.265143 6.144-145.115429-4.242286-216.941714-17.554286-54.272-82.797714-47.542857-128.146286-47.542857-115.858286 4.534857-232.155429-5.851429-347.574857 4.827428z" fill="#72CEFC" ></path><path d="M319.926857 319.195429c131.364571 4.242286 260.534857 72.557714 328.118857 187.099428 38.765714 59.245714 52.370286 129.609143 58.368 199.094857-22.381714-1.755429-44.763429-2.340571-66.998857-1.609143-5.851429-100.059429-51.2-199.972571-135.899428-257.170285-52.516571-40.228571-118.491429-53.101714-182.710858-60.708572 0-22.235429-0.292571-44.470857-0.877714-66.706285z" fill="#72CEFC" ></path><path d="M318.756571 455.094857c67.437714 8.777143 136.484571 29.988571 182.418286 83.382857 44.032 44.617143 60.708571 106.349714 68.900572 166.619429-23.990857-1.462857-48.128-1.316571-72.118858 0-7.314286-94.939429-83.236571-171.154286-178.614857-177.444572 1.901714-24.283429 1.755429-48.420571-0.585143-72.557714zM329.142857 622.153143c33.792-18.139429 78.994286 11.995429 74.020572 50.614857-2.340571 36.132571-45.933714 58.806857-76.946286 40.082286-35.547429-17.700571-33.792-75.337143 2.925714-90.697143z" fill="#72CEFC" ></path></symbol><symbol id="icon-huoHOT" viewBox="0 0 1024 1024"><path d="M213.899566 306.195189c24.31445 42.663193 31.007053 93.369554 37.519008 145.426478C354.457132 320.806225 449.529945 187.728374 439.435125 6.813035c75.038015 32.185571 131.017596 84.55648 177.0572 148.716865 45.450344 63.343165 74.564888 134.44562 97.021237 213.664361 47.8848-54.362345 38.349131-111.843031 24.056381-170.0076l5.466773-5.256016c12.202387 14.236835 24.271439 28.594103 36.632969 42.693302 70.371258 80.255321 124.509943 169.534473 150.329798 274.069834 32.697409 132.350955 2.365637 249.105909-88.23397 350.759495-97.816952 109.76127-220.877404 163.835437-366.961959 162.523584-96.380365-0.864533-181.169107-37.071687-255.854428-97.55028-43.742784-35.424343-84.11346-73.881004-109.39137-125.163719-37.166313-75.399313-33.368389-153.00512-5.97861-229.527035 16.099237-44.968615 39.742707-87.180186 58.216183-131.374593 18.628318-44.547101 35.067347-90.018951 52.104237-134.166044z" fill="#FF0000" ></path><path d="M376.552185 629.788565H280.356769v-91.231878H232.256911v226.116216h48.099858v-93.279229h96.195416v93.279229h48.099858v-226.116216H376.552185zM552.215808 534.763065c-33.914637 0-61.196886 11.118495-81.842448 33.355486-20.649863 22.241292-30.972644 51.067658-30.972644 86.4877 0 33.48022 10.103422 60.848493 30.318868 82.113422 20.211145 21.260628 46.499827 31.893092 78.853143 31.893092 33.136127 0 59.932346-10.972256 80.384356-32.912467 20.456311-21.948813 30.684466-50.530013 30.684466-85.760804 0-33.768397-9.841051-61.403342-29.514551-82.909136-19.682102-21.510095-45.652499-32.267293-77.91119-32.267293z m41.248113 172.033446c-10.490526 13.376604-25.170381 20.069207-44.013758 20.069207-18.464874 0-32.994189-6.980781-43.583641-20.946643-10.589453-13.961561-15.88848-31.944706-15.88848-53.936531 0-22.284303 5.415159-40.435193 16.254078-54.448368 10.834619-14.013175 25.677918-21.019763 44.529897-21.019763 18.555199 0 32.938274 6.838842 43.140622 20.507925 10.202349 13.677685 15.307824 32.288799 15.307824 55.833342-0.004301 22.581083-5.251715 40.555626-15.746542 53.940831zM652.807008 538.556687v39.411518h64.280817v186.704698h48.246097v-186.704698h64.422756v-39.411518z" fill="#FFFFFF" ></path></symbol><symbol id="icon-zhuye" viewBox="0 0 1024 1024"><path d="M873.947 1021.301H148.955c-80.917 0-147.104-66.187-147.104-147.105V149.204C1.85 68.286 68.038 2.1 148.955 2.1h725.09c80.821 0 147.009 66.187 147.009 147.104v725.089c0 80.821-66.188 147.008-147.107 147.008z m0 0" fill="#ff9903" ></path><path d="M533.576 208.191c-11.856-11.475-31.259-11.476-43.116-0.001L203.559 485.82C191.701 497.294 182 520.182 182 536.682v269.99c0 16.5 13.5 30 30 30h164.67c16.5 0 29.889-13.5 29.752-29.999l-1.375-166.514c-0.136-16.499 13.252-29.999 29.752-29.999h150.677c16.5 0 30 13.5 30 30v166.512c0 16.5 13.5 30 30 30H812c16.5 0 30-13.5 30-30v-269.99c0-16.5-9.701-39.389-21.558-50.863L533.576 208.191z" fill="#ffffff" ></path></symbol><symbol id="icon-tiezi" viewBox="0 0 1024 1024"><path d="M568.832 401.408h141.312l-165.888-159.744v135.168c0 13.312 11.264 24.576 24.576 24.576" fill="#FFB700" ></path><path d="M675.84 560.128c0 13.824-11.264 25.088-24.576 25.088H360.448c-13.312 0-24.576-11.264-24.576-25.088 0-13.312 11.264-24.576 24.576-24.576h290.816c13.312 0 24.576 11.264 24.576 24.576m-24.576 165.376H360.448c-13.312 0-24.576-11.264-24.576-24.576 0-13.824 11.264-25.088 24.576-25.088h290.816c13.312 0 24.576 11.264 24.576 25.088 0 13.312-11.264 24.576-24.576 24.576M360.448 380.928h44.544c13.312 0 24.576 11.264 24.576 24.576 0 13.824-11.264 25.088-24.576 25.088h-44.544c-13.312 0-24.576-11.264-24.576-25.088 0-13.312 11.264-24.576 24.576-24.576m134.144-4.096V208.384H301.568c-13.824 0-24.576 11.264-24.576 24.576v558.08c0 13.824 10.752 24.576 24.576 24.576h420.864c13.312 0 24.576-10.752 24.576-24.576V450.56H568.832c-40.96 0-74.24-33.28-74.24-73.728" fill="#FFB700" ></path><path d="M796.16 791.04c0 40.96-32.768 74.24-73.728 74.24H301.568c-40.96 0-74.24-33.28-74.24-74.24v-558.08c0-40.448 33.28-73.728 74.24-73.728h207.872c2.048 0 3.584 0 5.632 0.512 7.68-1.536 15.872 0.512 21.504 6.144l252.416 242.176c0 0.512 0.512 1.024 1.024 1.536 1.024 1.024 1.536 2.048 2.56 3.584 0.512 0.512 1.024 1.536 1.024 2.048 1.024 1.536 1.536 3.072 2.048 4.608v1.024c0.512 2.048 0.512 3.584 0.512 5.12v365.056zM921.6 0H102.4C46.08 0 0 46.08 0 102.4v819.2C0 977.92 46.08 1024 102.4 1024h819.2c56.32 0 102.4-46.08 102.4-102.4V102.4C1024 46.08 977.92 0 921.6 0z" fill="#FFB700" ></path></symbol><symbol id="icon-shoucang" viewBox="0 0 1024 1024"><path d="M81.92 35.84h860.16v947.2l-408.576-129.16224L81.92 983.04V35.84z" fill="#FFCC2C" ></path><path d="M506.53184 219.1104l60.0832 170.19392 180.25472 4.608-143.11936 109.7984 51.31776 173.056-148.53632-102.34368-148.54144 102.33344 51.31776-173.056-143.11424-109.78816 180.25472-4.608z" fill="#FFFFFF" ></path></symbol><symbol id="icon-jingxuan" viewBox="0 0 1024 1024"><path d="M498.103953 916.495981c19.480003 0 38.728688-5.407198 55.66772-15.618054L816.41824 742.778739C851.634892 721.592621 873.527879 681.766054 873.527879 638.861905V322.652962c0-42.904149-21.892987-82.711928-57.109639-103.902744L553.772847 60.62285c-16.939031-10.196766-36.187716-15.57226-55.667719-15.572261-19.475306 0-38.725166 5.375495-55.665371 15.572261L179.794363 218.750218c-35.230742 21.172027-57.095548 60.985678-57.095548 103.902744V638.861905c0 42.890059 21.864806 82.730716 57.109639 103.916834l262.645393 158.100362a108.026539 108.026539 0 0 0 55.650106 15.61688m0 45.032976c-27.240301 0-54.495866-7.357547-78.895773-22.043285L156.562786 781.37122c-48.835041-29.386741-78.914561-83.748748-78.91456-142.523405V322.652962c0-58.79227 30.07952-113.122573 78.91456-142.509315l262.645394-158.100362c24.401082-14.686912 51.655473-22.043285 78.895773-22.043285 27.239127 0 54.499389 7.356372 78.899297 22.043285l262.646567 158.100362c48.819776 29.400832 78.895774 83.717045 78.895774 142.509315V638.861905c0 58.778179-30.075997 113.122573-78.895774 142.509315l-262.645393 158.114452a152.95736 152.95736 0 0 1-78.900471 22.043285z m0 0" fill="#FD8B8B" ></path><path d="M712.592995 448.930114v-38.923605h-90.808048v-21.612353h64.874633V352.83816h-64.874633v-20.663598h81.676283v-38.941219h-81.676283V261.039086H552.090216v32.194257h-79.272692v38.941219h79.272692V352.83816h-65.819865v35.555996h65.819865v21.612353h-88.418548v38.923605h248.921327z m-249.402749-165.292346h-36.520015a1088.699677 1088.699677 0 0 1-14.401582 111.004314h37.46877a799.482104 799.482104 0 0 0 8.664433-54.780023 795.729356 795.729356 0 0 0 4.788394-56.224291z m234.505654 362.791866V508.503228c0-11.205405-3.514385-20.81507-10.57251-28.818428-6.710562-7.687497-15.545254-11.530659-26.428928-11.530659H513.16661c-4.471359 0-8.815905 0.945232-12.9761 2.880317a37.99129 37.99129 0 0 0-11.033972 7.673407c-6.742265 6.742265-10.092262 14.430937-10.092262 23.081279v184.528115h65.833956v-69.181604h85.537057v19.686662c0 5.137132-2.416507 7.701588-7.196681 7.701588h-34.11525l13.920159 40.367874h56.22429c11.529485 0 20.826812-3.547263 27.867325-10.572511 7.046383-7.702762 10.560768-16.985999 10.560768-27.889634zM333.445676 394.642082a2031.235925 2031.235925 0 0 1-9.100062-111.004314H289.233467c0 18.906993 0.738573 37.469944 2.179318 55.728778a946.702315 946.702315 0 0 0 6.008389 55.275536h36.024502z m119.172059 61.016207v-42.288867h-48.532096V261.039086h-60.067453v152.343252h-56.6881v42.290041h56.6881v231.139219h60.067453v-231.153309h48.532096z m14.897095 183.579361a1299.663766 1299.663766 0 0 1-10.089914-78.32746 2123.017386 2123.017386 0 0 1-6.260842-80.267241h-34.102334a2869.941056 2869.941056 0 0 0 4.788393 80.71696 1269.55489 1269.55489 0 0 0 8.181836 77.877741h37.482861zM334.885247 480.642949H298.861919a2096.502742 2096.502742 0 0 1-6.262017 80.267241 1066.149137 1066.149137 0 0 1-10.585426 78.32746h40.377267a2675.95827 2675.95827 0 0 0 7.44796-78.822973 2497.756752 2497.756752 0 0 0 5.045544-79.771728z m295.550042 47.096048h-85.537057v-12.480588c0-5.449469 2.885013-8.184185 8.650343-8.184184H622.248756a9.028435 9.028435 0 0 1 5.770027 1.923342c1.605133 1.275183 2.416507 3.210267 2.416506 5.765329v12.976101z m0 56.224291h-85.537057v-22.107866h85.537057v22.107866z m0 0" fill="#FD8B8B" ></path></symbol><symbol id="icon-gonggao" viewBox="0 0 1024 1024"><path d="M42.666667 0h938.666666a42.666667 42.666667 0 0 1 42.666667 42.666667v938.666666a42.666667 42.666667 0 0 1-42.666667 42.666667H42.666667a42.666667 42.666667 0 0 1-42.666667-42.666667V42.666667a42.666667 42.666667 0 0 1 42.666667-42.666667z" fill="#d81e06" ></path><path d="M382.122667 362.666667l144.341333-147.584A5.546667 5.546667 0 0 1 530.602667 213.333333c1.578667 0 3.072 0.597333 4.181333 1.749334L679.082667 362.666667H810.666667a42.666667 42.666667 0 0 1 42.666666 42.666666v341.333334a42.666667 42.666667 0 0 1-42.666666 42.666666H213.333333a42.666667 42.666667 0 0 1-42.666666-42.666666v-341.333334a42.666667 42.666667 0 0 1 42.666666-42.666666h168.789334z m41.045333 0h214.826667l-107.434667-109.824L423.168 362.666667zM298.666667 469.333333a21.333333 21.333333 0 0 0 0 42.666667h256a21.333333 21.333333 0 0 0 0-42.666667H298.666667z m0 85.333334a21.333333 21.333333 0 0 0 0 42.666666h170.666666a21.333333 21.333333 0 0 0 0-42.666666H298.666667z m0 85.333333a21.333333 21.333333 0 0 0 0 42.666667h426.666666a21.333333 21.333333 0 0 0 0-42.666667H298.666667z m341.333333-170.666667a21.333333 21.333333 0 0 0-21.333333 21.333334v85.333333a21.333333 21.333333 0 0 0 21.333333 21.333333h85.333333a21.333333 21.333333 0 0 0 21.333334-21.333333v-85.333333a21.333333 21.333333 0 0 0-21.333334-21.333334h-85.333333z" fill="#ffffff" ></path></symbol><symbol id="icon-shoucang1" viewBox="0 0 1024 1024"><path d="M292.717096 936.426654c-16.663262 0-33.204894-6.689631-46.462526-16.663262-23.231263-19.947262-36.488894-53.152156-33.204893-83.073049l36.488894-195.945361-139.509205-132.819575c-23.231263-23.231263-26.515263-59.841786-23.231263-86.35705 9.973631-36.488894 36.488894-59.841786 66.409787-63.125787l192.661362-36.488894 86.357049-185.97173c19.947262-29.920893 46.462525-46.462525 79.667419-46.462526 33.204894 0 59.841786 16.663262 76.383418 46.462526l86.35705 185.97173L867.295549 355.15857c29.920893 6.689631 56.436156 29.920893 66.409788 59.841786 9.973631 29.920893 3.284 59.841786-16.663262 86.35705L774.248869 640.744982l33.204894 195.945361c3.284 33.204894-6.689631 63.125787-33.204894 83.073049-16.663262 9.973631-29.920893 16.663262-49.868155 16.663262-16.663262 0-33.204894-6.689631-36.488894-9.973631l-175.9981-93.04668-179.40373 89.64105c-13.257632 9.973631-26.515263 13.379261-39.772894 13.379261z" fill="#ef8a45" ></path><path d="M511.89372 139.265946c-13.257632 0-23.231263 6.689631-29.920893 19.947262l-99.614681 205.918993-219.176625 43.178525c-19.947262 3.284-23.231263 16.663262-26.515263 26.515263 0 9.973631 0 29.920893 9.973631 39.894524l159.334838 152.766837-43.178525 215.892624c-3.284 13.257632 3.284 26.515263 13.257632 36.488894 9.973631 6.689631 23.231263 6.689631 33.204894 0l199.229362-103.020311 199.229362 103.020311c3.284 3.284 9.973631 3.284 16.663262 3.284001s13.257632 0 19.947262-6.689631c9.973631-6.689631 13.257632-23.231263 13.257631-36.488894l-39.894524-222.582255 159.456468-156.050837c6.689631-9.973631 9.973631-23.231263 6.68963-39.894524-3.284-13.257632-16.663262-23.231263-26.515263-26.515263L638.145294 355.15857l-99.614681-205.918993c-3.40563-3.284-13.379261-9.973631-26.636893-9.973631z" fill="#ef8a45" ></path></symbol><symbol id="icon-diantidingdian" viewBox="0 0 1024 1024"><path d="M146.304 182.848a182.848 182.848 0 1 0 365.696 0 182.848 182.848 0 0 0-365.696 0z" fill="#012647" ></path><path d="M804.544 73.152L678.016 292.48h253.12L804.48 73.152z m126.592 365.696h-253.12l126.528 219.456 126.592-219.456z m-448.384 512V731.52h102.4V438.848h-512v292.608h102.4v219.392H0V1024h1024v-73.152H482.752z" fill="#012647" ></path></symbol><symbol id="icon-shouji" viewBox="0 0 1024 1024"><path d="M698.88 0H325.12c-46.08 0-84.48 38.4-84.48 84.48v852.48c0 46.08 38.4 84.48 84.48 84.48h376.32c46.08 0 84.48-38.4 84.48-84.48V84.48C785.92 38.4 747.52 0 698.88 0zM460.8 69.12h102.4c10.24 0 17.92 7.68 17.92 17.92 0 7.68-7.68 15.36-17.92 15.36H460.8c-10.24 0-17.92-7.68-17.92-17.92 0-7.68 7.68-15.36 17.92-15.36z m51.2 921.6c-28.16 0-51.2-23.04-51.2-51.2s23.04-51.2 51.2-51.2 51.2 23.04 51.2 51.2-23.04 51.2-51.2 51.2z m238.08-138.24H273.92V171.52h478.72v680.96h-2.56z" fill="#13227A" ></path><path d="M325.12 289.28c5.12 5.12 10.24 5.12 15.36 0l56.32-56.32c5.12-5.12 5.12-10.24 0-15.36l-7.68-7.68c-5.12-5.12-12.8-5.12-17.92 0l-56.32 56.32c-5.12 5.12-5.12 10.24 0 15.36l10.24 7.68z m-12.8 71.68l7.68 7.68c5.12 5.12 10.24 5.12 15.36 0L460.8 245.76c5.12-5.12 5.12-10.24 0-15.36l-7.68-7.68c-5.12-5.12-10.24-5.12-15.36 0L314.88 345.6c-5.12 2.56-5.12 10.24-2.56 15.36z" fill="#13227A" ></path></symbol><symbol id="icon-tupian" viewBox="0 0 1024 1024"><path d="M0 0m113.664 0l796.672 0q113.664 0 113.664 113.664l0 796.672q0 113.664-113.664 113.664l-796.672 0q-113.664 0-113.664-113.664l0-796.672q0-113.664 113.664-113.664Z" fill="#488AFD" ></path><path d="M688.384 320.768l-54.272 256a218.88 218.88 0 0 0-5.632 41.216h-1.28a266.752 266.752 0 0 0-6.144-39.68l-63.488-256h-84.992l-69.632 253.184a209.408 209.408 0 0 0-7.424 43.52h-1.792a271.872 271.872 0 0 0-5.12-42.24l-55.808-256H245.248l100.096 375.552h92.16l65.536-244.992a260.352 260.352 0 0 0 6.656-41.728 184.32 184.32 0 0 0 6.144 41.472l63.744 244.992h89.088l99.84-375.552z" fill="#FFFFFF" ></path><path d="M0 0m113.664 0l796.672 0q113.664 0 113.664 113.664l0 796.672q0 113.664-113.664 113.664l-796.672 0q-113.664 0-113.664-113.664l0-796.672q0-113.664 113.664-113.664Z" fill="#FD6767" ></path><path d="M732.416 555.264a541.696 541.696 0 0 0-102.4 11.52 495.872 495.872 0 0 1-102.4-131.328c27.648-91.648 29.184-153.6 7.936-183.552A54.016 54.016 0 0 0 493.568 230.4a51.2 51.2 0 0 0-51.2 25.6c-29.44 49.152 13.056 145.92 32.768 185.344a1171.456 1171.456 0 0 1-86.528 203.264C233.728 712.704 230.4 753.664 230.4 768a47.872 47.872 0 0 0 27.904 44.288A40.192 40.192 0 0 0 281.6 819.2c40.96 0 88.32-45.824 139.008-136.192a1194.496 1194.496 0 0 1 194.56-62.208 210.176 210.176 0 0 0 121.088 49.152c27.904 0 81.664 0 81.664-55.808 2.816-21.248-8.704-57.344-85.504-58.88z m-448 214.784l-4.864 1.536a128 128 0 0 1 58.88-47.36 107.008 107.008 0 0 1-54.016 45.824zM486.4 281.6a11.008 11.008 0 0 1 6.656-1.536h4.864a138.496 138.496 0 0 1-1.536 85.248A135.168 135.168 0 0 1 486.4 281.6z m85.248 318.208a963.328 963.328 0 0 0-111.36 32.768v-3.328l-3.328 1.536c18.176-35.84 34.56-73.728 49.152-111.36l1.536 1.536 1.792-3.072a517.12 517.12 0 0 0 65.28 80.128h-4.864z m166.656 21.248a135.168 135.168 0 0 1-49.152-13.056 185.344 185.344 0 0 1 42.752-3.328c32.512 0 39.168 8.192 39.168 13.056a72.96 72.96 0 0 1-33.792 3.072z" fill="#FFFFFF" ></path><path d="M0 0m113.664 0l796.672 0q113.664 0 113.664 113.664l0 796.672q0 113.664-113.664 113.664l-796.672 0q-113.664 0-113.664-113.664l0-796.672q0-113.664 113.664-113.664Z" fill="#ff9903" ></path><path d="M389.376 428.032a98.816 98.816 0 1 0-100.352-98.56 99.584 99.584 0 0 0 100.352 98.56zM844.8 363.776c-33.024-70.144-89.088-8.448-99.84 4.864l-224 251.136-124.928-91.648a31.232 31.232 0 0 0-41.984 4.608L212.224 742.4a30.208 30.208 0 0 0 3.328 43.008 31.488 31.488 0 0 0 19.968 8.192H844.8v-242.432-187.392z" fill="#FFFFFF" ></path></symbol><symbol id="icon-shuju" viewBox="0 0 1024 1024"><path d="M-84.52323555-150.80359506h1193.0464711c36.45419773 0 66.2803595 29.82616178 66.28035951 66.28035951v1193.0464711c0 36.45419773-29.82616178 66.2803595-66.28035951 66.28035951H-84.52323555c-36.45419773 0-66.2803595-29.82616178-66.28035951-66.28035951V-84.52323555C-150.80359506-120.97743328-120.97743328-150.80359506-84.52323555-150.80359506z" fill="#3377FF" ></path><path d="M263.44865185 449.86216297h31.06891852c18.64135111 0 31.06891852 12.42756741 31.06891852 31.06891851v310.68918519c0 18.64135111-12.42756741 31.06891852-31.06891852 31.06891851h-31.06891852c-18.64135111 0-31.06891852-12.42756741-31.06891852-31.06891851V480.93108148c0-18.64135111 12.42756741-31.06891852 31.06891852-31.06891851z m155.3445926-248.55134815h31.06891852c18.64135111 0 31.06891852 12.42756741 31.06891851 31.06891851v559.24053334c0 18.64135111-12.42756741 31.06891852-31.06891851 31.06891851h-31.06891852c-18.64135111 0-31.06891852-12.42756741-31.06891853-31.06891851V232.37973333c0-18.64135111 12.42756741-31.06891852 31.06891853-31.06891851z m155.34459258 155.34459259h31.06891852c18.64135111 0 31.06891852 12.42756741 31.06891853 31.06891851v403.89594075c0 18.64135111-12.42756741 31.06891852-31.06891853 31.06891851h-31.06891852c-18.64135111 0-31.06891852-12.42756741-31.06891851-31.06891851V387.72432592c0-18.64135111 12.42756741-31.06891852 31.06891851-31.06891851z m155.3445926 186.41351111h31.06891852c18.64135111 0 31.06891852 12.42756741 31.06891852 31.06891851v217.48242964c0 18.64135111-12.42756741 31.06891852-31.06891852 31.06891851h-31.06891852c-18.64135111 0-31.06891852-12.42756741-31.06891852-31.06891851v-217.48242964c0-18.64135111 12.42756741-31.06891852 31.06891852-31.06891851z" fill="#FFFFFF" ></path></symbol><symbol id="icon-bianji" viewBox="0 0 1024 1024"><path d="M512-739.48315114m-496.484848 0a496.484848 496.484848 0 1 0 992.969696 0 496.484848 496.484848 0 1 0-992.969696 0Z" fill="#ECE8FF" ></path><path d="M927.91037235 272.69157023l-234.55516912-229.89331499a32.45014966 32.45014966 0 0 0-21.61819796-8.68384209 30.34774549 30.34774549 0 0 0-21.4810845 9.1408864l-436.34025479 446.98938906a30.75908583 30.75908583 0 0 0-8.18109525 15.67662179l-58.86731371 314.21800014a30.39345097 30.39345097 0 0 0 36.56355002 35.28382501l277.88297302-61.97521596a30.34774549 30.34774549 0 0 0 15.31098544-8.59243411l451.92546861-469.29315273a30.48485893 30.48485893 0 0 0-0.68556722-42.82505705zM462.18216471 736.95723694a30.43915495 30.43915495 0 0 1-42.96217047 1.27972351l-173.08270148-162.84490753a30.43915495 30.43915495 0 0 1 41.72815095-44.33330346l173.03699602 162.89061152c12.24878866 11.51751745 12.79724242 30.75908583 1.27972498 42.96217051z" fill="#5F37C8" ></path></symbol><symbol id="icon-xiangji" viewBox="0 0 1170 1024"><path d="M1076.662857 254.537143a137.435429 137.435429 0 0 0-101.449143-41.618286h-124.781714l-28.598857-75.410286a111.323429 111.323429 0 0 0-39.058286-46.811428c-18.212571-13.019429-38.985143-20.772571-57.197714-20.772572H439.515429c-20.845714 0-38.985143 7.753143-57.197715 20.772572a111.323429 111.323429 0 0 0-39.058285 46.811428l-31.158858 75.410286H184.612571c-38.985143 0-72.777143 13.019429-101.376 41.618286a137.435429 137.435429 0 0 0-41.691428 101.449143v501.906285c0 38.985143 13.092571 72.777143 41.691428 101.449143 28.525714 28.525714 62.390857 41.545143 101.376 41.545143h790.674286c38.985143 0 72.777143-12.946286 101.376-41.545143 28.598857-28.672 41.618286-62.464 41.618286-101.449143V355.986286c0-39.058286-13.019429-72.850286-41.618286-101.449143z m-496.713143 579.949714a237.494857 237.494857 0 0 1-236.690285-236.690286A237.494857 237.494857 0 0 1 580.022857 361.179429a237.494857 237.494857 0 0 1 236.617143 236.617142A237.494857 237.494857 0 0 1 580.022857 834.56z" fill="#b870fa" ></path><path d="M579.949714 441.782857C491.52 441.782857 421.302857 512 421.302857 600.429714s70.217143 158.646857 158.646857 158.646857 158.646857-70.217143 158.646857-158.72c0-88.356571-70.217143-158.573714-158.72-158.573714z" fill="#b870fa" ></path></symbol><symbol id="icon-shangdian" viewBox="0 0 1024 1024"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#95f3e9" ></path><path d="M810.783562 465.709589c0 40.679452-33.665753 74.345205-74.345206 74.345206s-74.345205-33.665753-74.345205-74.345206c0 40.679452-33.665753 74.345205-74.345206 74.345206s-74.345205-33.665753-74.345205-74.345206c0 40.679452-33.665753 74.345205-74.345206 74.345206S364.712329 506.389041 364.712329 465.709589c0 40.679452-33.665753 74.345205-74.345206 74.345206s-74.345205-33.665753-74.345205-74.345206l53.304109-140.273973h492.361644l49.095891 140.273973z m-93.983562-169.731507H307.2c-15.430137 0-28.054795-12.624658-28.054795-28.054794s12.624658-26.652055 28.054795-26.652055h409.6c15.430137 0 28.054795 12.624658 28.054795 28.054794s-12.624658 26.652055-28.054795 26.652055zM297.380822 568.109589c2.805479 0 5.610959 0 8.416438-1.40274h1.40274c1.40274 0 2.805479 0 4.208219-1.402739 5.610959-1.40274 9.819178-2.805479 15.430137-4.20822v138.871233h373.128767V561.09589c5.610959 1.40274 9.819178 2.805479 15.430137 4.20822 1.40274 0 2.805479 0 4.208219 1.402739h1.40274c2.805479 0 5.610959 1.40274 8.416439 1.40274h9.819178c7.013699 0 12.624658 0 19.638356-1.40274v187.967124c0 15.430137-12.624658 28.054795-28.054795 28.054794H297.380822c-15.430137 0-28.054795-12.624658-28.054795-28.054794V566.706849c5.610959 1.40274 12.624658 1.40274 19.638357 1.40274h8.416438z m0 0" fill="#077d7e" ></path></symbol><symbol id="icon-gonggao1" viewBox="0 0 1024 1024"><path d="M512.56888889 511.20355555m-500.62222222 0a500.62222222 500.62222222 0 1 0 1001.24444444 0 500.62222222 500.62222222 0 1 0-1001.24444444 0Z" fill="#3DA8F5" ></path><path d="M752.86755555 676.52266667c-2.16177778-44.94222222-24.00711111-86.47111111-59.61955555-113.09511112V438.49955555c0-72.13511111-51.76888889-132.77866667-120.14933333-147.11466666v-2.84444444c0-32.88177778-27.07911111-59.84711111-60.07466667-59.84711112-32.99555555 0-60.07466667 26.96533333-60.07466667 59.84711112v2.84444444C384.56888889 305.72088889 332.8 366.36444445 332.8 438.49955555v124.81422223c-35.61244445 26.73777778-57.57155555 68.26666667-59.61955555 113.09511111h59.61955555v0.45511111h360.448v-0.45511111h59.61955555v0.11377778z m-252.58666666 108.43022222h14.90488889c39.13955555 0 71.68-29.46844445 76.34488889-67.12888889h-157.01333334c4.77866667 37.66044445 37.20533333 67.12888889 76.34488889 67.12888889h-10.58133333z m0 0" fill="#FFFFFF" ></path></symbol><symbol id="icon-zu" viewBox="0 0 1024 1024"><path d="M512.036571 950.857143c-70.546286 0-365.714286-276.589714-365.714285-548.571429a365.714286 365.714286 0 0 1 731.428571 0c0 271.981714-295.168 548.571429-365.714286 548.571429z" fill="#3785EA" ></path><path d="M512.036571 1024c-77.604571 0-402.285714-309.796571-402.285714-614.4a402.285714 402.285714 0 1 1 804.571429 0c0 304.603429-324.681143 614.4-402.285715 614.4z m0-950.857143a329.142857 329.142857 0 0 0-329.142857 329.142857c0 229.778286 243.382857 512 329.142857 512 81.225143 0 329.142857-279.954286 329.142858-512a329.142857 329.142857 0 0 0-329.142858-329.142857z m0 438.857143a109.714286 109.714286 0 1 1 109.714286-109.714286 109.714286 109.714286 0 0 1-109.714286 109.714286z" fill="#ffffff" ></path></symbol><symbol id="icon-gou" viewBox="0 0 1024 1024"><path d="M0 0m64.32 0l895.36 0q64.32 0 64.32 64.32l0 895.36q0 64.32-64.32 64.32l-895.36 0q-64.32 0-64.32-64.32l0-895.36q0-64.32 64.32-64.32Z" fill="#D9E9FB" ></path><path d="M186.048 549.088l59.52-65.664 265.728 241.024-59.552 65.632z" fill="#3F90EA" ></path><path d="M844.992 223.84l65.664 59.52L493.76 743.008l-65.664-59.552z" fill="#3F90EA" ></path></symbol><symbol id="icon-lianjie" viewBox="0 0 1024 1024"><path d="M0.002816 0h1024v1024H0.002816z" fill="#1296db" ></path><path d="M510.466816 594.0992L412.162816 689.4336a80.9728 80.9728 0 0 1-54.1696 21.1968 76.7232 76.7232 0 0 1-54.1696-21.1968 76.032 76.032 0 0 1-21.8624-52.48 72.3712 72.3712 0 0 1 21.8624-52.5568l116.5568-112.9984a79.2832 79.2832 0 0 1 108.288 0l0.5376 0.512a25.4464 25.4464 0 0 0 35.2768-0.512c4.4544-4.864 7.04-11.136 7.2704-17.664a24.32 24.32 0 0 0-7.2704-17.6384A125.2864 125.2864 0 0 0 474.550016 399.616a129.1008 129.1008 0 0 0-89.984 36.48L268.034816 549.12A117.9136 117.9136 0 0 0 230.402816 636.3136a121.6768 121.6768 0 0 0 37.632 87.2448 125.4656 125.4656 0 0 0 89.9584 36.4544 130.2016 130.2016 0 0 0 89.984-35.84l98.304-95.36a24.0128 24.0128 0 0 0 0-34.7136 25.856 25.856 0 0 0-35.7888 0" fill="#FFFFFF" ></path><path d="M756.482816 249.8304A125.44 125.44 0 0 0 666.498816 213.3504a129.1008 129.1008 0 0 0-89.9328 36.48L478.210816 345.1648a24.1408 24.1408 0 0 0-0.3072 34.8672c9.856 9.728 25.984 9.856 35.968 0.3072l98.304-95.3856A81.152 81.152 0 0 1 666.370816 263.7568c20.224-0.256 39.7312 7.424 54.1696 21.1968 13.8496 14.208 21.6832 32.9728 21.8624 52.48 0.256 19.712-7.6544 38.6048-21.8624 52.5568l-116.5824 113.024a79.2832 79.2832 0 0 1-108.3136 0 25.9328 25.9328 0 0 0-35.8144 0 24.064 24.064 0 0 0 0 34.7392 125.5424 125.5424 0 0 0 89.984 36.4544l0.128-0.4352a129.2544 129.2544 0 0 0 89.984-36.5056L756.482816 424.2688a120.96 120.96 0 0 0 0-174.4384" fill="#FFFFFF" ></path></symbol><symbol id="icon-huodong" viewBox="0 0 1024 1024"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#c5f9a9" ></path><path d="M818.432 476.416L696.896 581.76a41.472 41.472 0 0 0-12.8 40.32l38.976 160.256c8.704 34.88-27.904 62.592-56.96 43.328l-133.76-88.512a35.904 35.904 0 0 0-40.704 0L357.888 825.6c-29.056 19.264-65.664-8.448-56.96-43.328l38.976-160.192a40.192 40.192 0 0 0-12.8-40.32L205.568 476.352c-26.176-22.912-12.16-68.096 22.08-70.464l158.208-10.88a38.4 38.4 0 0 0 32.512-24.64l58.176-153.6a37.312 37.312 0 0 1 70.4 0l58.688 153.6a36.48 36.48 0 0 0 32.512 24.64l158.208 10.88c34.304 3.008 48.256 47.552 22.08 70.4z" fill="#168f0d" ></path></symbol><symbol id="icon-Administratorinformation" viewBox="0 0 1024 1024"><path d="M512.2 951.9c-242.7 0-440-197.4-440-440s197.4-440 440-440 440 197.4 440 440-197.4 440-440 440z m0 0" fill="#FFAA30" ></path><path d="M512.2 79.5c238.6 0 432.4 193.3 432.4 432.4 0 239.1-193.3 432.4-432.4 432.4-238.6 0-432.4-193.3-432.4-432.4 0-239.1 193.8-432.4 432.4-432.4m0-15.3c-246.7 0-447.7 200.9-447.7 447.7s200.9 447.7 447.7 447.7 447.7-200.9 447.7-447.7-201-447.7-447.7-447.7z m0 0" fill="#FFCA85" ></path><path d="M542.2 571.4c-4.1-0.5-7.6 1-10.7 3.6-2 2-4.1 4.1-6.6 7.1-4.1 4.6-8.1 9.7-12.2 10.7-4.1-1-8.1-6.1-12.7-11.2-2-2.5-4.6-5.1-6.6-7.1-3.1-2.5-6.6-4.1-10.7-3.6-89.5 6.6-158.7 36.6-186.2 80.9-3.1 5.6-58.5 105.3-52.9 198.4 73.8 58.5 167.4 93.6 268.6 93.6 101.7 0 194.8-35.1 268.6-93.6 5.6-95.1-52.4-197.4-53.4-198.9-26.5-43.3-95.7-73.3-185.2-79.9z m-3.6 264.5c0 1.5-0.5 3.6-1.5 4.6l-15.8 29c-2 3.6-5.6 5.6-9.7 5.6s-7.6-2-9.7-5.6l-15.8-29c-1-1.5-1-3.1-1.5-4.6L479 627.8c0-3.6 1.5-7.1 4.6-9.2l20.9-15.3c3.6-2.5 8.6-2.5 12.7 0l21.4 15.3c3.1 2 4.6 5.6 4.6 9.2l-4.6 208.1z m-29-282.3c83.4 0 151.6-68.2 151.6-151.6 0-83.4-68.2-151.6-151.6-151.6-83.4 0-151.6 68.2-151.6 151.6 0 83.4 68.2 151.6 151.6 151.6z m0 0" fill="#FFFFFF" ></path></symbol><symbol id="icon-jiahaoyou_huaban" viewBox="0 0 1024 1024"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#5C46FF" ></path><path d="M512 400m-112 0a112 112 0 1 0 224 0 112 112 0 1 0-224 0Z" fill="#FFFFFF" ></path><path d="M512 768c57.6 0 112-9.6 160-22.4 44.8-12.8 64-70.4 35.2-108.8-44.8-57.6-115.2-92.8-192-92.8s-147.2 35.2-192 92.8c-35.2 38.4-16 96 28.8 108.8 48 12.8 102.4 22.4 160 22.4zM828.8 444.8h-35.2v-35.2c0-12.8-9.6-22.4-22.4-22.4s-22.4 9.6-22.4 22.4v35.2h-35.2c-12.8 0-22.4 9.6-22.4 22.4s9.6 22.4 22.4 22.4h35.2v35.2c0 12.8 9.6 22.4 22.4 22.4s22.4-9.6 22.4-22.4v-35.2h35.2c12.8 0 22.4-9.6 22.4-22.4s-12.8-22.4-22.4-22.4z" fill="#FFFFFF" ></path></symbol><symbol id="icon-toupiao" viewBox="0 0 1024 1024"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#2482F0" opacity=".12" ></path><path d="M228.31502 343.454981h68.45252a33.588087 33.588087 0 0 1 33.588087 33.588087v422.638895h-135.628694v-422.638895a33.588087 33.588087 0 0 1 33.588087-33.588087z" fill="#2586F0" ></path><path d="M394.777577 454.430019h68.452521a33.588087 33.588087 0 0 1 33.588087 33.588087v311.663857h-135.628694v-311.663857a33.588087 33.588087 0 0 1 33.588086-33.588087z" fill="#2586F0" ></path><path d="M561.240135 213.989701h68.452521a33.588087 33.588087 0 0 1 33.588087 33.588086v552.104176h-135.628695v-552.104176a33.588087 33.588087 0 0 1 33.588087-33.588086z" fill="#2586F0" ></path><path d="M727.702693 571.568472h68.452521a33.588087 33.588087 0 0 1 33.588086 33.588087v194.525404h-135.628694v-194.525404a33.588087 33.588087 0 0 1 33.588087-33.588087z" fill="#2586F0" ></path></symbol><symbol id="icon-fangwenfenxi" viewBox="0 0 1024 1024"><path d="M512 972.8a460.8 460.8 0 1 1 0-921.6 460.8 460.8 0 0 1 0 921.6z m0-256c109.568 0 229.0176-68.2496 358.4-204.8-129.3824-136.5504-248.832-204.8-358.4-204.8-109.568 0-229.0176 68.2496-358.4 204.8 129.3824 136.5504 248.832 204.8 358.4 204.8z" fill="#1296db" ></path><path d="M512 512m-102.4 0a102.4 102.4 0 1 0 204.8 0 102.4 102.4 0 1 0-204.8 0Z" fill="#1296db" ></path></symbol><symbol id="icon-tuisong" viewBox="0 0 1024 1024"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#36ab60" ></path><path d="M765.4016 253.7088c6.464 4.6464 9.0496 10.8928 7.872 18.6496l-74.7392 448.3328a18.432 18.432 0 0 1-25.3824 14.0032L540.9536 680.704l-70.6432 86.08c-3.3792 4.4288-8.704 6.9504-14.272 6.7328a15.9488 15.9488 0 0 1-6.464-1.1648 18.1504 18.1504 0 0 1-8.8576-6.8608 18.2656 18.2656 0 0 1-3.392-10.6496v-101.8368l252.16-309.12-311.9616 269.9776-115.2768-47.2832c-7.2064-2.7136-11.1104-8.064-11.6864-16.064a17.3056 17.3056 0 0 1 9.3568-17.2288l485.6576-280.192c2.8032-1.7152 6.0288-2.6112 9.3184-2.6112 3.8912-0.0128 7.3984 1.0752 10.5088 3.2256z m0 0" fill="#FFFFFF" ></path></symbol><symbol id="icon-bian-copy" viewBox="0 0 1024 1024"><path d="M443.93953299 986.453333c64.259413 0 107.1104-55.046827 107.11040001-121.306453 0-3.73760001 0.293547-7.304533 0-10.881707 3.355307-123.904 102.35904-223.51189301 220.16-237.175466L772.093986 37.79584l-582.8096 0.03072-0.361813 0c-21.52448 0-33.682773 5.573973-53.285547 18.394453a120.067413 120.067413 0 0 0-42.02496 48.196267c-2.54976 3.81952-91.067733 396.92288-93.3376 420.2496a125.085013 125.085013 0 0 0 17.42848 73.472c21.661013 35.938987 53.13536 50.46272 91.204267 52.04992 1.97632 0.303787 230.352213 1.252693 230.352213 1.252693-15.117653 44.622507-19.295573 97.805653-19.295573 147.797334a446.57664 446.57664 0 0 0 10.1376 94.347946l0.566613-0.058026C342.584013 946.74944 388.735693 986.453333 443.93953299 986.453333zM854.986786 614.918827l124.0064 0A45.421227 45.421227 0 0 0 1023.997986 569.07776001l0-485.68661301A45.421227 45.421227 0 0 0 978.993186 37.546667l-124.0064 0A45.417813 45.417813 0 0 0 809.981986 83.391147L809.981986 569.070933a45.421227 45.421227 0 0 0 45.001387 45.847894z" fill="#1296db" ></path><path d="M441.000653 920.060587c-24.17664 0-45.056-17.790293-50.742614-43.257174l-3.433813-14.677333a381.5424 381.5424 0 0 1-5.76512-65.809067c0-54.091093 5.225813-95.77813299 15.9744-127.443626l28.11904-82.827947-88.521387-0.365227c-85.435733-0.341333-215.381333-0.96256-227.894613-1.191253-22.381227-0.945493-31.194453-8.485547-38.823253-21.111467a62.078293 62.078293 0 0 1-8.707414-34.932053c5.802667-35.54304 77.482667-354.471253 89.50784-402.510507a56.108373 56.108373 0 0 1 17.408-18.56512c12.05248-7.867733 12.84096-7.867733 18.312534-7.867733l518.5536-0.03072-0.72704001 464.213333c-125.341013 38.690133-216.528213 153.146027-220.14293399 285.873494l-0.095573 3.47477299 0.19456 2.29376001-0.027307 1.365333-0.09216 5.4272c0 27.910827-13.503147 57.944747-43.10016 57.944747M870.923639 549.23605301l0-450.00021301 85.981867 0L956.905506 549.236053l-85.981867 1e-8" fill="#96ebfc" ></path></symbol><symbol id="icon-tiezi-copy" viewBox="0 0 1024 1024"><path d="M568.832 401.408h141.312l-165.888-159.744v135.168c0 13.312 11.264 24.576 24.576 24.576" fill="#bfbfbf" ></path><path d="M675.84 560.128c0 13.824-11.264 25.088-24.576 25.088H360.448c-13.312 0-24.576-11.264-24.576-25.088 0-13.312 11.264-24.576 24.576-24.576h290.816c13.312 0 24.576 11.264 24.576 24.576m-24.576 165.376H360.448c-13.312 0-24.576-11.264-24.576-24.576 0-13.824 11.264-25.088 24.576-25.088h290.816c13.312 0 24.576 11.264 24.576 25.088 0 13.312-11.264 24.576-24.576 24.576M360.448 380.928h44.544c13.312 0 24.576 11.264 24.576 24.576 0 13.824-11.264 25.088-24.576 25.088h-44.544c-13.312 0-24.576-11.264-24.576-25.088 0-13.312 11.264-24.576 24.576-24.576m134.144-4.096V208.384H301.568c-13.824 0-24.576 11.264-24.576 24.576v558.08c0 13.824 10.752 24.576 24.576 24.576h420.864c13.312 0 24.576-10.752 24.576-24.576V450.56H568.832c-40.96 0-74.24-33.28-74.24-73.728" fill="#bfbfbf" ></path><path d="M796.16 791.04c0 40.96-32.768 74.24-73.728 74.24H301.568c-40.96 0-74.24-33.28-74.24-74.24v-558.08c0-40.448 33.28-73.728 74.24-73.728h207.872c2.048 0 3.584 0 5.632 0.512 7.68-1.536 15.872 0.512 21.504 6.144l252.416 242.176c0 0.512 0.512 1.024 1.024 1.536 1.024 1.024 1.536 2.048 2.56 3.584 0.512 0.512 1.024 1.536 1.024 2.048 1.024 1.536 1.536 3.072 2.048 4.608v1.024c0.512 2.048 0.512 3.584 0.512 5.12v365.056zM921.6 0H102.4C46.08 0 0 46.08 0 102.4v819.2C0 977.92 46.08 1024 102.4 1024h819.2c56.32 0 102.4-46.08 102.4-102.4V102.4C1024 46.08 977.92 0 921.6 0z" fill="#bfbfbf" ></path></symbol></svg>',a=(l=document.getElementsByTagName("script"))[l.length-1].getAttribute("data-injectcss");if(a&&!o.__iconfont__svg__cssinject__){o.__iconfont__svg__cssinject__=!0;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(l){console&&console.log(l)}}!function(l){if(document.addEventListener)if(~["complete","loaded","interactive"].indexOf(document.readyState))setTimeout(l,0);else{var a=function(){document.removeEventListener("DOMContentLoaded",a,!1),l()};document.addEventListener("DOMContentLoaded",a,!1)}else document.attachEvent&&(c=l,i=o.document,t=!1,(v=function(){try{i.documentElement.doScroll("left")}catch(l){return void setTimeout(v,50)}h()})(),i.onreadystatechange=function(){"complete"==i.readyState&&(i.onreadystatechange=null,h())});function h(){t||(t=!0,c())}var c,i,t,v}(function(){var l,a;(l=document.createElement("div")).innerHTML=h,h=null,(a=l.getElementsByTagName("svg")[0])&&(a.setAttribute("aria-hidden","true"),a.style.position="absolute",a.style.width=0,a.style.height=0,a.style.overflow="hidden",function(l,a){a.firstChild?function(l,a){a.parentNode.insertBefore(l,a)}(l,a.firstChild):a.appendChild(l)}(a,document.body))})}(window);;
///<jscompress sourcefile="forum.js" />
/*
	[Discuz!] (C)2001-2099 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$Id: forum.js 33824 2013-08-19 08:26:11Z nemohou $
*/

function saveData(ignoreempty) {
	var ignoreempty = isUndefined(ignoreempty) ? 0 : ignoreempty;
	var obj = $('postform') && (($('fwin_newthread') && $('fwin_newthread').style.display == '') || ($('fwin_reply') && $('fwin_reply').style.display == '')) ? $('postform') : ($('fastpostform') ? $('fastpostform') : $('postform'));
	if(!obj) return;
	if(typeof isfirstpost != 'undefined') {
		if(typeof wysiwyg != 'undefined' && wysiwyg == 1) {
			var messageisnull = trim(html2bbcode(editdoc.body.innerHTML)) === '';
		} else {
			var messageisnull = $('postform').message.value === '';
		}
		if(isfirstpost && (messageisnull && $('postform').subject.value === '')) {
			return;
		}
		if(!isfirstpost && messageisnull) {
			return;
		}
	}
	var data = subject = message = '';
	for(var i = 0; i < obj.elements.length; i++) {
		var el = obj.elements[i];
		if(el.name != '' && (el.tagName == 'SELECT' || el.tagName == 'TEXTAREA' || el.tagName == 'INPUT' && (el.type == 'text' || el.type == 'checkbox' || el.type == 'radio' || el.type == 'hidden' || el.type == 'select')) && el.name.substr(0, 6) != 'attach') {
			var elvalue = el.value;
			if(el.name == 'subject') {
				subject = trim(elvalue);
			} else if(el.name == 'message') {
				if(typeof wysiwyg != 'undefined' && wysiwyg == 1) {
					elvalue = html2bbcode(editdoc.body.innerHTML);
				}
				message = trim(elvalue);
			}
			if((el.type == 'checkbox' || el.type == 'radio') && !el.checked) {
				continue;
			} else if(el.tagName == 'SELECT') {
				elvalue = el.value;
			} else if(el.type == 'hidden') {
				if(el.id) {
					eval('var check = typeof ' + el.id + '_upload == \'function\'');
					if(check) {
						elvalue = elvalue;
						if($(el.id + '_url')) {
							elvalue += String.fromCharCode(1) + $(el.id + '_url').value;
						}
					} else {
						continue;
					}
				} else {
					continue;
				}
			}
			if(trim(elvalue)) {
				data += el.name + String.fromCharCode(9) + el.tagName + String.fromCharCode(9) + el.type + String.fromCharCode(9) + elvalue + String.fromCharCode(9, 9);
			}
		}
	}

	if(!subject && !message && !ignoreempty) {
		return;
	}

	saveUserdata('forum_'+discuz_uid, data);
}

function fastUload() {
	appendscript(JSPATH + 'forum_post.js' );
	safescript('forum_post_js', function () { uploadWindow(function (aid, url) {updatefastpostattach(aid, url)}, 'file') }, 100, 50);
}

function switchAdvanceMode(url) {
	var obj = $('postform') && (($('fwin_newthread') && $('fwin_newthread').style.display == '') || ($('fwin_reply') && $('fwin_reply').style.display == '')) ? $('postform') : $('fastpostform');
	if(obj && obj.message.value != '') {
		saveData();
		url += (url.indexOf('?') != -1 ? '&' : '?') + 'cedit=yes';
	}
	location.href = url;
	return false;
}

function sidebar_collapse(lang) {
	if(lang[0]) {
		toggle_collapse('sidebar', null, null, lang);
		$('wrap').className = $('wrap').className == 'wrap with_side s_clear' ? 'wrap s_clear' : 'wrap with_side s_clear';
	} else {
		var collapsed = getcookie('collapse');
		collapsed = updatestring(collapsed, 'sidebar', 1);
		setcookie('collapse', collapsed, (collapsed ? 2592000 : -2592000));
		location.reload();
	}
}

function keyPageScroll(e, prev, next, url, page) {
	if(loadUserdata('is_blindman')) {
		return true;
	}
	e = e ? e : window.event;
	var tagname = BROWSER.ie ? e.srcElement.tagName : e.target.tagName;
	if(tagname == 'INPUT' || tagname == 'TEXTAREA') return;
	actualCode = e.keyCode ? e.keyCode : e.charCode;
	if(next && actualCode == 39) {
		window.location = url + '&page=' + (page + 1);
	}
	if(prev && actualCode == 37) {
		window.location = url + '&page=' + (page - 1);
	}
}

function announcement() {
	var ann = new Object();
	ann.anndelay = 3000;ann.annst = 0;ann.annstop = 0;ann.annrowcount = 0;ann.anncount = 0;ann.annlis = $('anc').getElementsByTagName("li");ann.annrows = new Array();
	ann.announcementScroll = function () {
		if(this.annstop) {this.annst = setTimeout(function () {ann.announcementScroll();}, this.anndelay);return;}
		if(!this.annst) {
			var lasttop = -1;
			for(i = 0;i < this.annlis.length;i++) {
				if(lasttop != this.annlis[i].offsetTop) {
					if(lasttop == -1) lasttop = 0;
					this.annrows[this.annrowcount] = this.annlis[i].offsetTop - lasttop;this.annrowcount++;
				}
				lasttop = this.annlis[i].offsetTop;
			}
			if(this.annrows.length == 1) {
				$('an').onmouseover = $('an').onmouseout = null;
			} else {
				this.annrows[this.annrowcount] = this.annrows[1];
				$('ancl').innerHTML += $('ancl').innerHTML;
				this.annst = setTimeout(function () {ann.announcementScroll();}, this.anndelay);
				$('an').onmouseover = function () {ann.annstop = 1;};
				$('an').onmouseout = function () {ann.annstop = 0;};
			}
			this.annrowcount = 1;
			return;
		}
		if(this.annrowcount >= this.annrows.length) {
			$('anc').scrollTop = 0;
			this.annrowcount = 1;
			this.annst = setTimeout(function () {ann.announcementScroll();}, this.anndelay);
		} else {
			this.anncount = 0;
			this.announcementScrollnext(this.annrows[this.annrowcount]);
		}
	};
	ann.announcementScrollnext = function (time) {
		$('anc').scrollTop++;
		this.anncount++;
		if(this.anncount != time) {
			this.annst = setTimeout(function () {ann.announcementScrollnext(time);}, 10);
		} else {
			this.annrowcount++;
			this.annst = setTimeout(function () {ann.announcementScroll();}, this.anndelay);
		}
	};
	ann.announcementScroll();
}

function removeindexheats() {
	return confirm('您确认要把此主题从热点主题中移除么？');
}

function showTypes(id, mod) {
	var o = $(id);
	if(!o) return false;
	var s = o.className;
	mod = isUndefined(mod) ? 1 : mod;
	var baseh = o.getElementsByTagName('li')[0].offsetHeight * 2;
	var tmph = o.offsetHeight;
	var lang = ['展开', '收起'];
	var cls = ['unfold', 'fold'];
	if(tmph > baseh) {
		var octrl = document.createElement('li');
		octrl.className = cls[mod];
		octrl.innerHTML = lang[mod];

		o.insertBefore(octrl, o.firstChild);
		o.className = s + ' cttp';
		mod && (o.style.height = 'auto');

		octrl.onclick = function () {
			if(this.className == cls[0]) {
				o.style.height = 'auto';
				this.className = cls[1];
				this.innerHTML = lang[1];
			} else {
				o.style.height = '';
				this.className = cls[0];
				this.innerHTML = lang[0];
			}
		}
	}
}

var postpt = 0;
function fastpostvalidate(theform, noajaxpost) {
	if(postpt) {
		return false;
	}
	postpt = 1;
	setTimeout(function() {postpt = 0}, 2000);
	noajaxpost = !noajaxpost ? 0 : noajaxpost;
	s = '';
	if(typeof fastpostvalidateextra == 'function') {
		var v = fastpostvalidateextra();
		if(!v) {
			return false;
		}
	}
	if(theform.message.value == '' || theform.subject.value == '') {
		s = '抱歉，您尚未输入标题或内容';
		theform.message.focus();
	} else if(mb_strlen(theform.subject.value) > 80) {
		s = '您的标题超过 80 个字符的限制';
		theform.subject.focus();
	}
	if(!disablepostctrl && ((postminchars != 0 && mb_strlen(theform.message.value) < postminchars) || (postmaxchars != 0 && mb_strlen(theform.message.value) > postmaxchars))) {
		s = '您的帖子长度不符合要求。\n\n当前长度: ' + mb_strlen(theform.message.value) + ' ' + '字节\n系统限制: ' + postminchars + ' 到 ' + postmaxchars + ' 字节';
	}
	if(s) {
		showError(s);
		doane();
		$('fastpostsubmit').disabled = false;
		return false;
	}
	$('fastpostsubmit').disabled = true;
	theform.message.value = theform.message.value.replace(/([^>=\]"'\/]|^)((((https?|ftp):\/\/)|www\.)([\w\-]+\.)*[\w\-\u4e00-\u9fa5]+\.([\.a-zA-Z0-9]+|\u4E2D\u56FD|\u7F51\u7EDC|\u516C\u53F8)((\?|\/|:)+[\w\.\/=\?%\-&~`@':+!]*)+\.(jpg|gif|png|bmp))/ig, '$1[img]$2[/img]');
	theform.message.value = parseurl(theform.message.value);
	if(!noajaxpost) {
		//ajaxpost('fastpostform', 'fastpostreturn', 'fastpostreturn', 'onerror', $('fastpostsubmit'));
		fastpostsubmit()
		return false;
	} else {
		return true;
	}
}

function checkpostrule(showid, extra) {
	var x = new Ajax();
	x.get('forum.php?mod=ajax&action=checkpostrule&inajax=yes&' + extra, function(s) {
		ajaxinnerhtml($(showid), s);evalscript(s);
	});
}

function updatefastpostattach(aid, url) {
	ajaxget('forum.php?mod=ajax&action=attachlist&posttime=' + $('posttime').value + (!fid ? '' : '&fid=' + fid), 'attachlist');
	$('attach_tblheader').style.display = '';
}

function succeedhandle_fastnewpost(locationhref, message, param) {
	location.href = locationhref;
}

function errorhandle_fastnewpost() {
	$('fastpostsubmit').disabled = false;
}

function atarget(obj) {
	obj.target = getcookie('atarget') > 0 ? '_blank' : '';
}

function setatarget(v) {
	$('atarget').className = 'y atarget_' + v;
	$('atarget').onclick = function() {setatarget(v == 1 ? -1 : 1);};
	setcookie('atarget', v, 2592000);
}

function loadData(quiet, formobj) {

	var evalevent = function (obj) {
		var script = obj.parentNode.innerHTML;
		var re = /onclick="(.+?)["|>]/ig;
		var matches = re.exec(script);
		if(matches != null) {
			matches[1] = matches[1].replace(/this\./ig, 'obj.');
			eval(matches[1]);
		}
	};

	var data = '';
	data = loadUserdata('forum_'+discuz_uid);
	var formobj = !formobj ? $('postform') : formobj;

	if(in_array((data = trim(data)), ['', 'null', 'false', null, false])) {
		if(!quiet) {
			showDialog('没有可以恢复的数据！', 'info');
		}
		return;
	}

	if(!quiet && !confirm('此操作将覆盖当前帖子内容，确定要恢复数据吗？')) {
		return;
	}

	var data = data.split(/\x09\x09/);
	for(var i = 0; i < formobj.elements.length; i++) {
		var el = formobj.elements[i];
		if(el.name != '' &&  el.name.search('seccode')==-1 && (el.tagName == 'SELECT' || el.tagName == 'TEXTAREA' || el.tagName == 'INPUT' && (el.type == 'text' || el.type == 'checkbox' || el.type == 'radio' || el.type == 'hidden'))) {
			for(var j = 0; j < data.length; j++) {
				var ele = data[j].split(/\x09/);
				if(ele[0] == el.name) {
					elvalue = !isUndefined(ele[3]) ? ele[3] : '';
					if(ele[1] == 'INPUT') {
						if(ele[2] == 'text') {
							el.value = elvalue;
						} else if((ele[2] == 'checkbox' || ele[2] == 'radio') && ele[3] == el.value) {
							el.checked = true;
							evalevent(el);
						} else if(ele[2] == 'hidden') {
							eval('var check = typeof ' + el.id + '_upload == \'function\'');
							if(check) {
								var v = elvalue.split(/\x01/);
								el.value = v[0];
								if(el.value) {
									if($(el.id + '_url') && v[1]) {
										$(el.id + '_url').value = v[1];
									}
									eval(el.id + '_upload(\'' + v[0] + '\', \'' + v[1] + '\')');
									if($('unused' + v[0])) {
										var attachtype = $('unused' + v[0]).parentNode.parentNode.parentNode.parentNode.id.substr(11);
										$('unused' + v[0]).parentNode.parentNode.outerHTML = '';
										$('unusednum_' + attachtype).innerHTML = parseInt($('unusednum_' + attachtype).innerHTML) - 1;
										if($('unusednum_' + attachtype).innerHTML == 0 && $('attachnotice_' + attachtype)) {
											$('attachnotice_' + attachtype).style.display = 'none';
										}
									}
								}
							}

						}
					} else if(ele[1] == 'TEXTAREA') {
						if(ele[0] == 'message') {
							if(!wysiwyg) {
								textobj.value = elvalue;
							} else {
								editdoc.body.innerHTML = bbcode2html(elvalue);
							}
						} else {
							el.value = elvalue;
						}
					} else if(ele[1] == 'SELECT') {
						if($(el.id + '_ctrl_menu')) {
							var lis = $(el.id + '_ctrl_menu').getElementsByTagName('li');
							for(var k = 0; k < lis.length; k++) {
								if(ele[3] == lis[k].k_value) {
									lis[k].onclick();
									break;
								}
							}
						} else {
							for(var k = 0; k < el.options.length; k++) {
								if(ele[3] == el.options[k].value) {
									el.options[k].selected = true;
									break;
								}
							}
						}
					}
					break;
				}
			}
		}
	}
	if($('rstnotice')) {
		$('rstnotice').style.display = 'none';
	}
	extraCheckall();
}

var checkForumcount = 0, checkForumtimeout = 30000, checkForumnew_handle;
function checkForumnew(fid, lasttime) {
	var timeout = checkForumtimeout;
	var x = new Ajax();
	x.get('forum.php?mod=ajax&action=forumchecknew&fid=' + fid + '&time=' + lasttime + '&inajax=yes', function(s){
		if(s > 0) {
			var table = $('separatorline').parentNode;
			if(!isUndefined(checkForumnew_handle)) {
				clearTimeout(checkForumnew_handle);
			}
			removetbodyrow(table, 'forumnewshow');
			var colspan = table.getElementsByTagName('tbody')[0].rows[0].children.length;
			var checknew = {'tid':'', 'thread':{'common':{'className':'', 'val':'<a href="javascript:void(0);" onclick="ajaxget(\'forum.php?mod=ajax&action=forumchecknew&fid=' + fid+ '&time='+lasttime+'&uncheck=1&inajax=yes\', \'forumnew\');">有新回复的主题，点击查看', 'colspan': colspan }}};
			addtbodyrow(table, ['tbody'], ['forumnewshow'], 'separatorline', checknew);
		} else {
			if(checkForumcount < 50) {
				if(checkForumcount > 0) {
					var multiple =  Math.ceil(50 / checkForumcount);
					if(multiple < 5) {
						timeout = checkForumtimeout * (5 - multiple + 1);
					}
				}
				checkForumnew_handle = setTimeout(function () {checkForumnew(fid, lasttime);}, timeout);
			}
		}
		checkForumcount++;
	});

}
function checkForumnew_btn(fid) {
	if(isUndefined(fid) || isUndefined(tpldata.Lastpost)) return;
	load_start=new Date().getTime()/1000;
	ajax_post(WRITE_MSG_U2WS_forum_refresh({Lastpost:tpldata.Lastpost,Fid:fid}),function(data){
		if(data.Result){
			showDialog('暂无新回复主题', 'notice', null, null, 0, null, null, null, null, 3);
			return
		}
		tpldata=data
		var html = '';
	    html = template("tpl_"+state.tn, {
	        data: data,
	        cache:cache,
	    });
	    $('#tpl_content').html(html);
	    $('#tpl_content').append(state.j);
	    load_start=0;
    });
}

function display_blocked_thread() {
	var table = $('threadlisttableid');
	if(!table) {
		return;
	}
	var tbodys = table.getElementsByTagName('tbody');
	for(i = 0;i < tbodys.length;i++) {
		var tbody = tbodys[i];
		if(tbody.style.display == 'none') {
			table.appendChild(tbody);
			tbody.style.display = '';
		}
	}
	$('hiddenthread').style.display = 'none';
}

function addtbodyrow(table, insertID, changename, separatorid, jsonval) {
	if(isUndefined(table) || isUndefined(insertID[0])) {
		return;
	}

	var insertobj = document.createElement(insertID[0]);
	var thread = jsonval.thread;
	var tid = !isUndefined(jsonval.tid) ? jsonval.tid : '' ;

	if(!isUndefined(changename[1])) {
		removetbodyrow(table, changename[1] + tid);
	}

	insertobj.id = changename[0] + tid;
	if(!isUndefined(insertID[1])) {
		insertobj.className = insertID[1];
	}
	if($(separatorid)) {
		table.insertBefore(insertobj, $(separatorid).nextSibling);
	} else {
		table.insertBefore(insertobj, table.firstChild);
	}
	var newTH = insertobj.insertRow(-1);
	for(var value in thread) {
		if(value != 0) {
			var cell = newTH.insertCell(-1);
			if(isUndefined(thread[value]['val'])) {
				cell.innerHTML = thread[value];
			} else {
				cell.innerHTML = thread[value]['val'];
			}
			if(!isUndefined(thread[value]['className'])) {
				cell.className = thread[value]['className'];
			}
			if(!isUndefined(thread[value]['colspan'])) {
				cell.colSpan = thread[value]['colspan'];
			}
		}
	}

	if(!isUndefined(insertID[2])) {
		_attachEvent(insertobj, insertID[2], function() {insertobj.className = '';});
	}
}
function removetbodyrow(from, objid) {
	if(!isUndefined(from) && $(objid)) {
		from.removeChild($(objid));
	}
}

function leftside(id) {
	$(id).className = $(id).className == 'a' ? '' : 'a';
	if(id == 'lf_fav') {
		setcookie('leftsidefav', $(id).className == 'a' ? 0 : 1, 2592000);
	}
}
var DTimers = new Array();
var DItemIDs = new Array();
var DTimers_exists = false;
function settimer(timer, itemid) {
	if(timer && itemid) {
		DTimers.push(timer);
		DItemIDs.push(itemid);
	}
	if(!DTimers_exists) {
		setTimeout("showtime()", 1000);
		DTimers_exists = true;
	}
}
function showtime() {
	for(i=0; i<=DTimers.length; i++) {
		if(DItemIDs[i]) {
			if(DTimers[i] == 0) {
				$(DItemIDs[i]).innerHTML = '已结束';
				DItemIDs[i] = '';
				continue;
			}
			var timestr = '';
			var timer_day = Math.floor(DTimers[i] / 86400);
			var timer_hour = Math.floor((DTimers[i] % 86400) / 3600);
			var timer_minute = Math.floor(((DTimers[i] % 86400) % 3600) / 60);
			var timer_second = (((DTimers[i] % 86400) % 3600) % 60);
			if(timer_day > 0) {
				timestr += timer_day + '天';
			}
			if(timer_hour > 0) {
				timestr += timer_hour + '小时'
			}
			if(timer_minute > 0) {
				timestr += timer_minute + '分'
			}
			if(timer_second > 0) {
				timestr += timer_second + '秒'
			}
			DTimers[i] = DTimers[i] - 1;
			$(DItemIDs[i]).innerHTML = timestr;
		}
	}
	setTimeout("showtime()", 1000);
}
function fixed_top_nv(eleid, disbind) {
	this.nv = eleid && $(eleid) || $('nv');
	this.openflag = this.nv && BROWSER.ie != 6;
	this.nvdata = {};
	this.init = function (disattachevent) {
		if(this.openflag) {
			if(!disattachevent) {
				var obj = this;
				_attachEvent(window, 'resize', function(){obj.reset();obj.init(1);obj.run();});
				var switchwidth = $('switchwidth');
				if(switchwidth) {
					_attachEvent(switchwidth, 'click', function(){obj.reset();obj.openflag=false;});
				}
			}

			var next = this.nv;
			try {
				while((next = next.nextSibling).nodeType != 1 || next.style.display === 'none') {}
				this.nvdata.next = next;
				this.nvdata.height = parseInt(this.nv.offsetHeight, 10);
				this.nvdata.width = parseInt(this.nv.offsetWidth, 10);
				this.nvdata.left = this.nv.getBoundingClientRect().left - document.documentElement.clientLeft;
				this.nvdata.position = this.nv.style.position;
				this.nvdata.opacity = this.nv.style.opacity;
			} catch (e) {
				this.nvdata.next = null;
			}
		}
	};

	this.run = function () {
		var fixedheight = 0;
		if(this.openflag && this.nvdata.next){
			var nvnexttop = document.body.scrollTop || document.documentElement.scrollTop;
			var dofixed = nvnexttop !== 0 && document.documentElement.clientHeight >= 15 && this.nvdata.next.getBoundingClientRect().top - this.nvdata.height < 0;
			if(dofixed) {
				if(this.nv.style.position != 'fixed') {
					this.nv.style.borderLeftWidth = '0';
					this.nv.style.borderRightWidth = '0';
					this.nv.style.height = this.nvdata.height + 'px';
					this.nv.style.width = this.nvdata.width + 'px';
					this.nv.style.top = '0';
					this.nv.style.left = this.nvdata.left + 'px';
					this.nv.style.position = 'fixed';
					this.nv.style.zIndex = '199';
					this.nv.style.opacity = 0.85;
				}
			} else {
				if(this.nv.style.position != this.nvdata.position) {
					this.reset();
				}
			}
			if(this.nv.style.position == 'fixed') {
				fixedheight = this.nvdata.height;
			}
		}
		return fixedheight;
	};
	this.reset = function () {
		if(this.nv) {
			this.nv.style.position = this.nvdata.position;
			this.nv.style.borderLeftWidth = '';
			this.nv.style.borderRightWidth = '';
			this.nv.style.height = '';
			this.nv.style.width = '';
			this.nv.style.opacity = this.nvdata.opacity;
		}
	};
	if(!disbind && this.openflag) {
		this.init();
		_attachEvent(window, 'scroll', this.run);
	}
}
var previewTbody = null, previewTid = null, previewDiv = null;


function hideStickThread(tid) {
	var pre = 'stickthread_';
	var tids = (new Function("return ("+(loadUserdata('sticktids') || '[]')+")"))();
	var format = function (data) {
		var str = '{';
		for (var i in data) {
			if(data[i] instanceof Array) {
				str += i + ':' + '[';
				for (var j = data[i].length - 1; j >= 0; j--) {
					str += data[i][j] + ',';
				};
				str = str.substr(0, str.length -1);
				str += '],';
			}
		}
		str = str.substr(0, str.length -1);
		str += '}';
		return str;
	};
	if(!tid) {
		if(tids.length > 0) {
			for (var i = tids.length - 1; i >= 0; i--) {
				var ele = $(pre+tids[i]);
				if(ele) {
					ele.parentNode.removeChild(ele);
				}
			};
		}
	} else {
		var eletbody = $(pre+tid);
		if(eletbody) {
			eletbody.parentNode.removeChild(eletbody);
			tids.push(tid);
			saveUserdata('sticktids', '['+tids.join(',')+']');
		}
	}
	var clearstickthread = $('clearstickthread');
	if(clearstickthread) {
		if(tids.length > 0) {
			$('clearstickthread').style.display = '';
		} else {
			$('clearstickthread').style.display = 'none';
		}
	}
	var separatorline = $('separatorline');
	if(separatorline) {
		try {
			if(typeof separatorline.previousElementSibling === 'undefined') {
				var findele = separatorline.previousSibling;
				while(findele && findele.nodeType != 1){
					findele = findele.previousSibling;
				}
				if(findele === null) {
					separatorline.parentNode.removeChild(separatorline);
				}
			} else {
				if(separatorline.previousElementSibling === null) {
					separatorline.parentNode.removeChild(separatorline);
				}
			}
		} catch(e) {
		}
	}
}
function viewhot() {
	var obj = $('hottime');
	window.location.href = "forum.php?mod=forumdisplay&filter=hot&fid="+obj.getAttribute('fid')+"&time="+obj.value;
}
function clearStickThread () {
	saveUserdata('sticktids', '[]');
	location.reload();
}
;
///<jscompress sourcefile="aes.js" />
var CryptoJS=CryptoJS||function(z,n){var f;"undefined"!==typeof window&&window.crypto&&(f=window.crypto);!f&&"undefined"!==typeof window&&window.msCrypto&&(f=window.msCrypto);!f&&"undefined"!==typeof global&&global.crypto&&(f=global.crypto);if(!f&&"function"===typeof require)try{f=require("crypto")}catch(a){}var g=function(){if(f){if("function"===typeof f.getRandomValues)try{return f.getRandomValues(new Uint32Array(1))[0]}catch(a){}if("function"===typeof f.randomBytes)try{return f.randomBytes(4).readInt32LE()}catch(a){}}throw Error("Native crypto module could not be used to get secure random number.");},q=Object.create||function(){function a(){}return function(b){a.prototype=b;b=new a;a.prototype=null;return b}}(),t={},x=t.lib={},B=x.Base=function(){return{extend:function(a){var b=q(this);a&&b.mixIn(a);b.hasOwnProperty("init")&&this.init!==b.init||(b.init=function(){b.$super.init.apply(this,arguments)});b.init.prototype=b;b.$super=this;return b},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}}}(),y=x.WordArray=B.extend({init:function(a,b){a=this.words=a||[];this.sigBytes=b!=n?b:4*a.length},toString:function(a){return(a||r).stringify(this)},concat:function(a){var b=this.words,p=a.words,e=this.sigBytes;a=a.sigBytes;this.clamp();if(e%4)for(var c=0;c<a;c++)b[e+c>>>2]|=(p[c>>>2]>>>24-c%4*8&255)<<24-(e+c)%4*8;else for(c=0;c<a;c+=4)b[e+c>>>2]=p[c>>>2];this.sigBytes+=a;return this},clamp:function(){var a=this.words,b=this.sigBytes;a[b>>>2]&=4294967295<<32-b%4*8;a.length=z.ceil(b/4)},clone:function(){var a=B.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var b=[],p=0;p<a;p+=4)b.push(g());return new y.init(b,a)}}),d=t.enc={},r=d.Hex={stringify:function(a){var b=a.words;a=a.sigBytes;for(var p=[],e=0;e<a;e++){var c=b[e>>>2]>>>24-e%4*8&255;p.push((c>>>4).toString(16));p.push((c&15).toString(16))}return p.join("")},parse:function(a){for(var b=a.length,p=[],e=0;e<b;e+=2)p[e>>>3]|=parseInt(a.substr(e,2),16)<<24-e%8*4;return new y.init(p,b/2)}},u=d.Latin1={stringify:function(a){var b=a.words;a=a.sigBytes;for(var p=[],e=0;e<a;e++)p.push(String.fromCharCode(b[e>>>2]>>>24-e%4*8&255));return p.join("")},parse:function(a){for(var b=a.length,p=[],e=0;e<b;e++)p[e>>>2]|=(a.charCodeAt(e)&255)<<24-e%4*8;return new y.init(p,b)}},v=d.Utf8={stringify:function(a){try{return decodeURIComponent(escape(u.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return u.parse(unescape(encodeURIComponent(a)))}},w=x.BufferedBlockAlgorithm=B.extend({reset:function(){this._data=new y.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=v.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var b,p=this._data,e=p.words,c=p.sigBytes,d=this.blockSize,r=c/(4*d),r=a?z.ceil(r):z.max((r|0)-this._minBufferSize,0);a=r*d;c=z.min(4*a,c);if(a){for(b=0;b<a;b+=d)this._doProcessBlock(e,b);b=e.splice(0,a);p.sigBytes-=c}return new y.init(b,c)},clone:function(){var a=B.clone.call(this);a._data=this._data.clone();return a},_minBufferSize:0});x.Hasher=w.extend({cfg:B.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){w.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,p){return(new a.init(p)).finalize(b)}},_createHmacHelper:function(a){return function(b,p){return(new c.HMAC.init(a,p)).finalize(b)}}});var c=t.algo={};return t}(Math);CryptoJS.lib.Cipher||function(z){var n=CryptoJS,f=n.lib,g=f.Base,q=f.WordArray,t=f.BufferedBlockAlgorithm,x=n.enc.Base64,B=n.algo.EvpKDF,y=f.Cipher=t.extend({cfg:g.extend(),createEncryptor:function(a,b){return this.create(this._ENC_XFORM_MODE,a,b)},createDecryptor:function(a,b){return this.create(this._DEC_XFORM_MODE,a,b)},init:function(a,b,p){this.cfg=this.cfg.extend(p);this._xformMode=a;this._key=b;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(a){this._append(a);return this._process()},finalize:function(a){a&&this._append(a);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(){return function(a){return{encrypt:function(b,p,e){return("string"==typeof p?c:w).encrypt(a,b,p,e)},decrypt:function(b,p,e){return("string"==typeof p?c:w).decrypt(a,b,p,e)}}}}()});f.StreamCipher=y.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var d=n.mode={},r=f.BlockCipherMode=g.extend({createEncryptor:function(a,b){return this.Encryptor.create(a,b)},createDecryptor:function(a,b){return this.Decryptor.create(a,b)},init:function(a,b){this._cipher=a;this._iv=b}}),d=d.CBC=function(){function a(a,b,c){var p;(p=this._iv)?this._iv=z:p=this._prevBlock;for(var e=0;e<c;e++)a[b+e]^=p[e]}var b=r.extend();b.Encryptor=b.extend({processBlock:function(b,e){var p=this._cipher,c=p.blockSize;a.call(this,b,e,c);p.encryptBlock(b,e);this._prevBlock=b.slice(e,e+c)}});b.Decryptor=b.extend({processBlock:function(b,c){var p=this._cipher,e=p.blockSize,d=b.slice(c,c+e);p.decryptBlock(b,c);a.call(this,b,c,e);this._prevBlock=d}});return b}(),u=(n.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,e=c<<24|c<<16|c<<8|c,d=[],r=0;r<c;r+=4)d.push(e);c=q.create(d,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};f.BlockCipher=y.extend({cfg:y.cfg.extend({mode:d,padding:u}),reset:function(){var a;y.reset.call(this);a=this.cfg;var b=a.iv,c=a.mode;this._xformMode==this._ENC_XFORM_MODE?a=c.createEncryptor:(a=c.createDecryptor,this._minBufferSize=1);this._mode&&this._mode.__creator==a?this._mode.init(this,b&&b.words):(this._mode=a.call(c,this,b&&b.words),this._mode.__creator=a)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a,b=this.cfg.padding;this._xformMode==this._ENC_XFORM_MODE?(b.pad(this._data,this.blockSize),a=this._process(!0)):(a=this._process(!0),b.unpad(a));return a},blockSize:4});var v=f.CipherParams=g.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),d=(n.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?q.create([1398893684,1701076831]).concat(a).concat(b):b).toString(x)},parse:function(a){var b;a=x.parse(a);var c=a.words;1398893684==c[0]&&1701076831==c[1]&&(b=q.create(c.slice(2,4)),c.splice(0,4),a.sigBytes-=16);return v.create({ciphertext:a,salt:b})}},w=f.SerializableCipher=g.extend({cfg:g.extend({format:d}),encrypt:function(a,b,c,e){e=this.cfg.extend(e);var p=a.createEncryptor(c,e);b=p.finalize(b);p=p.cfg;return v.create({ciphertext:b,key:c,iv:p.iv,algorithm:a,mode:p.mode,padding:p.padding,blockSize:a.blockSize,formatter:e.format})},decrypt:function(a,b,c,e){e=this.cfg.extend(e);b=this._parse(b,e.format);return a.createDecryptor(c,e).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),n=(n.kdf={}).OpenSSL={execute:function(a,b,c,e){e||(e=q.random(8));a=B.create({keySize:b+c}).compute(a,e);c=q.create(a.words.slice(b),4*c);a.sigBytes=4*b;return v.create({key:a,iv:c,salt:e})}},c=f.PasswordBasedCipher=w.extend({cfg:w.cfg.extend({kdf:n}),encrypt:function(a,b,c,e){e=this.cfg.extend(e);c=e.kdf.execute(c,a.keySize,a.ivSize);e.iv=c.iv;a=w.encrypt.call(this,a,b,c.key,e);a.mixIn(c);return a},decrypt:function(a,b,c,e){e=this.cfg.extend(e);b=this._parse(b,e.format);c=e.kdf.execute(c,a.keySize,a.ivSize,b.salt);e.iv=c.iv;return w.decrypt.call(this,a,b,c.key,e)}})}();(function(){var z=CryptoJS,n=z.lib.BlockCipher,f=z.algo,g=[],q=[],t=[],x=[],B=[],y=[],d=[],r=[],u=[],v=[];(function(){for(var c=[],a=0;256>a;a++)c[a]=128>a?a<<1:a<<1^283;for(var b=0,p=0,a=0;256>a;a++){var e=p^p<<1^p<<2^p<<3^p<<4,e=e>>>8^e&255^99;g[b]=e;q[e]=b;var f=c[b],w=c[f],n=c[w],A=257*c[e]^16843008*e;t[b]=A<<24|A>>>8;x[b]=A<<16|A>>>16;B[b]=A<<8|A>>>24;y[b]=A;A=16843009*n^65537*w^257*f^16843008*b;d[e]=A<<24|A>>>8;r[e]=A<<16|A>>>16;u[e]=A<<8|A>>>24;v[e]=A;b?(b=f^c[c[c[n^f]]],p^=c[c[p]]):b=p=1}})();var w=[0,1,2,4,8,16,32,64,128,27,54],f=f.AES=n.extend({_doReset:function(){var c;if(!this._nRounds||this._keyPriorReset!==this._key){c=this._keyPriorReset=this._key;for(var a=c.words,b=c.sigBytes/4,p=4*((this._nRounds=b+6)+1),e=this._keySchedule=[],f=0;f<p;f++)f<b?e[f]=a[f]:(c=e[f-1],f%b?6<b&&4==f%b&&(c=g[c>>>24]<<24|g[c>>>16&255]<<16|g[c>>>8&255]<<8|g[c&255]):(c=c<<8|c>>>24,c=g[c>>>24]<<24|g[c>>>16&255]<<16|g[c>>>8&255]<<8|g[c&255],c^=w[f/b|0]<<24),e[f]=e[f-b]^c);a=this._invKeySchedule=[];for(b=0;b<p;b++)f=p-b,c=b%4?e[f]:e[f-4],a[b]=4>b||4>=f?c:d[g[c>>>24]]^r[g[c>>>16&255]]^u[g[c>>>8&255]]^v[g[c&255]]}},encryptBlock:function(c,a){this._doCryptBlock(c,a,this._keySchedule,t,x,B,y,g)},decryptBlock:function(c,a){var b=c[a+1];c[a+1]=c[a+3];c[a+3]=b;this._doCryptBlock(c,a,this._invKeySchedule,d,r,u,v,q);b=c[a+1];c[a+1]=c[a+3];c[a+3]=b},_doCryptBlock:function(c,a,b,d,e,f,r,g){for(var p=this._nRounds,u=c[a]^b[0],v=c[a+1]^b[1],w=c[a+2]^b[2],n=c[a+3]^b[3],q=4,t=1;t<p;t++)var h=d[u>>>24]^e[v>>>16&255]^f[w>>>8&255]^r[n&255]^b[q++],k=d[v>>>24]^e[w>>>16&255]^f[n>>>8&255]^r[u&255]^b[q++],l=d[w>>>24]^e[n>>>16&255]^f[u>>>8&255]^r[v&255]^b[q++],n=d[n>>>24]^e[u>>>16&255]^f[v>>>8&255]^r[w&255]^b[q++],u=h,v=k,w=l;h=(g[u>>>24]<<24|g[v>>>16&255]<<16|g[w>>>8&255]<<8|g[n&255])^b[q++];k=(g[v>>>24]<<24|g[w>>>16&255]<<16|g[n>>>8&255]<<8|g[u&255])^b[q++];l=(g[w>>>24]<<24|g[n>>>16&255]<<16|g[u>>>8&255]<<8|g[v&255])^b[q++];n=(g[n>>>24]<<24|g[u>>>16&255]<<16|g[v>>>8&255]<<8|g[w&255])^b[q++];c[a]=h;c[a+1]=k;c[a+2]=l;c[a+3]=n},keySize:8});z.AES=n._createHelper(f)})();CryptoJS.pad.NoPadding={pad:function(){},unpad:function(){}};CryptoJS.mode.CFB=function(){function z(f,g,n,t){var q;(q=this._iv)?(q=q.slice(0),this._iv=void 0):q=this._prevBlock;t.encryptBlock(q,0);for(t=0;t<n;t++)f[g+t]^=q[t]}var n=CryptoJS.lib.BlockCipherMode.extend();n.Encryptor=n.extend({processBlock:function(f,g){var n=this._cipher,t=n.blockSize;z.call(this,f,g,t,n);this._prevBlock=f.slice(g,g+t)}});n.Decryptor=n.extend({processBlock:function(f,g){var n=this._cipher,t=n.blockSize,x=f.slice(g,g+t);z.call(this,f,g,t,n);this._prevBlock=x}});return n}();(function(z){function n(d,f,g,n,c,a,b){d=d+(f&g|~f&n)+c+b;return(d<<a|d>>>32-a)+f}function f(d,f,g,n,c,a,b){d=d+(f&n|g&~n)+c+b;return(d<<a|d>>>32-a)+f}function g(d,f,g,n,c,a,b){d=d+(f^g^n)+c+b;return(d<<a|d>>>32-a)+f}function q(d,f,g,n,c,a,b){d=d+(g^(f|~n))+c+b;return(d<<a|d>>>32-a)+f}var t=CryptoJS,x=t.lib,B=x.WordArray,y=x.Hasher,x=t.algo,d=[];(function(){for(var f=0;64>f;f++)d[f]=4294967296*z.abs(z.sin(f+1))|0})();x=x.MD5=y.extend({_doReset:function(){this._hash=new B.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(r,u){for(var v=0;16>v;v++){var w=u+v,c=r[w];r[w]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360}var v=this._hash.words,w=r[u+0],c=r[u+1],a=r[u+2],b=r[u+3],p=r[u+4],e=r[u+5],t=r[u+6],x=r[u+7],y=r[u+8],A=r[u+9],z=r[u+10],B=r[u+11],C=r[u+12],D=r[u+13],E=r[u+14],F=r[u+15],h=v[0],k=v[1],l=v[2],m=v[3],h=n(h,k,l,m,w,7,d[0]),m=n(m,h,k,l,c,12,d[1]),l=n(l,m,h,k,a,17,d[2]),k=n(k,l,m,h,b,22,d[3]),h=n(h,k,l,m,p,7,d[4]),m=n(m,h,k,l,e,12,d[5]),l=n(l,m,h,k,t,17,d[6]),k=n(k,l,m,h,x,22,d[7]),h=n(h,k,l,m,y,7,d[8]),m=n(m,h,k,l,A,12,d[9]),l=n(l,m,h,k,z,17,d[10]),k=n(k,l,m,h,B,22,d[11]),h=n(h,k,l,m,C,7,d[12]),m=n(m,h,k,l,D,12,d[13]),l=n(l,m,h,k,E,17,d[14]),k=n(k,l,m,h,F,22,d[15]),h=f(h,k,l,m,c,5,d[16]),m=f(m,h,k,l,t,9,d[17]),l=f(l,m,h,k,B,14,d[18]),k=f(k,l,m,h,w,20,d[19]),h=f(h,k,l,m,e,5,d[20]),m=f(m,h,k,l,z,9,d[21]),l=f(l,m,h,k,F,14,d[22]),k=f(k,l,m,h,p,20,d[23]),h=f(h,k,l,m,A,5,d[24]),m=f(m,h,k,l,E,9,d[25]),l=f(l,m,h,k,b,14,d[26]),k=f(k,l,m,h,y,20,d[27]),h=f(h,k,l,m,D,5,d[28]),m=f(m,h,k,l,a,9,d[29]),l=f(l,m,h,k,x,14,d[30]),k=f(k,l,m,h,C,20,d[31]),h=g(h,k,l,m,e,4,d[32]),m=g(m,h,k,l,y,11,d[33]),l=g(l,m,h,k,B,16,d[34]),k=g(k,l,m,h,E,23,d[35]),h=g(h,k,l,m,c,4,d[36]),m=g(m,h,k,l,p,11,d[37]),l=g(l,m,h,k,x,16,d[38]),k=g(k,l,m,h,z,23,d[39]),h=g(h,k,l,m,D,4,d[40]),m=g(m,h,k,l,w,11,d[41]),l=g(l,m,h,k,b,16,d[42]),k=g(k,l,m,h,t,23,d[43]),h=g(h,k,l,m,A,4,d[44]),m=g(m,h,k,l,C,11,d[45]),l=g(l,m,h,k,F,16,d[46]),k=g(k,l,m,h,a,23,d[47]),h=q(h,k,l,m,w,6,d[48]),m=q(m,h,k,l,x,10,d[49]),l=q(l,m,h,k,E,15,d[50]),k=q(k,l,m,h,e,21,d[51]),h=q(h,k,l,m,C,6,d[52]),m=q(m,h,k,l,b,10,d[53]),l=q(l,m,h,k,z,15,d[54]),k=q(k,l,m,h,c,21,d[55]),h=q(h,k,l,m,y,6,d[56]),m=q(m,h,k,l,F,10,d[57]),l=q(l,m,h,k,t,15,d[58]),k=q(k,l,m,h,D,21,d[59]),h=q(h,k,l,m,p,6,d[60]),m=q(m,h,k,l,B,10,d[61]),l=q(l,m,h,k,a,15,d[62]),k=q(k,l,m,h,A,21,d[63]);v[0]=v[0]+h|0;v[1]=v[1]+k|0;v[2]=v[2]+l|0;v[3]=v[3]+m|0},_doFinalize:function(){var d=this._data,f=d.words,g=8*this._nDataBytes,n=8*d.sigBytes;f[n>>>5]|=128<<24-n%32;var c=z.floor(g/4294967296);f[(n+64>>>9<<4)+15]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;f[(n+64>>>9<<4)+14]=(g<<8|g>>>24)&16711935|(g<<24|g>>>8)&4278255360;d.sigBytes=4*(f.length+1);this._process();d=this._hash;f=d.words;for(g=0;4>g;g++)n=f[g],f[g]=(n<<8|n>>>24)&16711935|(n<<24|n>>>8)&4278255360;return d},clone:function(){var d=y.clone.call(this);d._hash=this._hash.clone();return d}});t.MD5=y._createHelper(x);t.HmacMD5=y._createHmacHelper(x)})(Math);(function(Math){var C=CryptoJS;var C_lib=C.lib;var WordArray=C_lib.WordArray;var Hasher=C_lib.Hasher;var C_algo=C.algo;var H=[];var K=[];(function(){function isPrime(n){var sqrtN=Math.sqrt(n);for(var factor=2;factor<=sqrtN;factor++){if(!(n%factor)){return false}}return true}function getFractionalBits(n){return((n-(n|0))*4294967296)|0}var n=2;var nPrime=0;while(nPrime<64){if(isPrime(n)){if(nPrime<8){H[nPrime]=getFractionalBits(Math.pow(n,1/2))}K[nPrime]=getFractionalBits(Math.pow(n,1/3));nPrime++}n++}}());var W=[];var SHA256=C_algo.SHA256=Hasher.extend({_doReset:function(){this._hash=new WordArray.init(H.slice(0))},_doProcessBlock:function(M,offset){var H=this._hash.words;var a=H[0];var b=H[1];var c=H[2];var d=H[3];var e=H[4];var f=H[5];var g=H[6];var h=H[7];for(var i=0;i<64;i++){if(i<16){W[i]=M[offset+i]|0}else{var gamma0x=W[i-15];var gamma0=((gamma0x<<25)|(gamma0x>>>7))^((gamma0x<<14)|(gamma0x>>>18))^(gamma0x>>>3);var gamma1x=W[i-2];var gamma1=((gamma1x<<15)|(gamma1x>>>17))^((gamma1x<<13)|(gamma1x>>>19))^(gamma1x>>>10);W[i]=gamma0+W[i-7]+gamma1+W[i-16]}var ch=(e&f)^(~e&g);var maj=(a&b)^(a&c)^(b&c);var sigma0=((a<<30)|(a>>>2))^((a<<19)|(a>>>13))^((a<<10)|(a>>>22));var sigma1=((e<<26)|(e>>>6))^((e<<21)|(e>>>11))^((e<<7)|(e>>>25));var t1=h+sigma1+ch+K[i]+W[i];var t2=sigma0+maj;h=g;g=f;f=e;e=(d+t1)|0;d=c;c=b;b=a;a=(t1+t2)|0}H[0]=(H[0]+a)|0;H[1]=(H[1]+b)|0;H[2]=(H[2]+c)|0;H[3]=(H[3]+d)|0;H[4]=(H[4]+e)|0;H[5]=(H[5]+f)|0;H[6]=(H[6]+g)|0;H[7]=(H[7]+h)|0},_doFinalize:function(){var data=this._data;var dataWords=data.words;var nBitsTotal=this._nDataBytes*8;var nBitsLeft=data.sigBytes*8;dataWords[nBitsLeft>>>5]|=128<<(24-nBitsLeft%32);dataWords[(((nBitsLeft+64)>>>9)<<4)+14]=Math.floor(nBitsTotal/4294967296);dataWords[(((nBitsLeft+64)>>>9)<<4)+15]=nBitsTotal;data.sigBytes=dataWords.length*4;this._process();return this._hash},clone:function(){var clone=Hasher.clone.call(this);clone._hash=this._hash.clone();return clone}});C.SHA256=Hasher._createHelper(SHA256);C.HmacSHA256=Hasher._createHmacHelper(SHA256)}(Math));
function aes_encrypt(word,key,iv){
	key=32>key.length?CryptoJS.MD5(key).toString():key.substr(0,32);
	key=CryptoJS.enc.Utf8.parse(key);
	iv=16>iv.length?CryptoJS.MD5(iv).toString().substr(0,16):iv.substr(0,16);
	iv=CryptoJS.enc.Utf8.parse(iv);
	word=CryptoJS.enc.Utf8.parse(word);
	var wordArray=CryptoJS.AES.encrypt(word,key,{iv:iv,mode:CryptoJS.mode.CFB,padding:CryptoJS.pad.NoPadding}).ciphertext;
	var words = wordArray.words;
    var sigBytes = wordArray.sigBytes;
    var r=[];
	for (var i = 0; i < sigBytes; i++) {
        r.push((words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff);
    }
    return r;
};
///<jscompress sourcefile="smilies.js" />
/*
	[Discuz!] (C)2001-2099 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$Id: smilies.js 29684 2012-04-25 04:00:58Z zhangguosheng $
*/

function smilies_show(id, smcols, seditorkey) {
	if(seditorkey && !$(seditorkey + 'sml_menu')) {
		var div = document.createElement("div");
		div.id = seditorkey + 'sml_menu';
		div.style.display = 'none';
		div.className = 'sllt';
		$('append_parent').appendChild(div);
		var div = document.createElement("div");
		div.id = id;
		div.style.overflow = 'hidden';
		$(seditorkey + 'sml_menu').appendChild(div);
	}
	if(typeof smilies_type == 'undefined') {
		var scriptNode = document.createElement("script");
		scriptNode.type = "text/javascript";
		scriptNode.charset = charset ? charset : (BROWSER.firefox ? document.characterSet : document.charset);
		scriptNode.src = '/data/cache/common_smilies_var.js';
		$('append_parent').appendChild(scriptNode);
		if(BROWSER.ie) {
			scriptNode.onreadystatechange = function() {
				smilies_onload(id, smcols, seditorkey);
			};
		} else {
			scriptNode.onload = function() {
				smilies_onload(id, smcols, seditorkey);
			};
		}
	} else {
		smilies_onload(id, smcols, seditorkey);
	}
}

function smilies_onload(id, smcols, seditorkey) {
	seditorkey = !seditorkey ? '' : seditorkey;
	smile = getcookie('smile').split('D');
	if(typeof smilies_type == 'object') {
		if(smile[0] && smilies_array[smile[0]]) {
			CURRENTSTYPE = smile[0];
		} else {
			for(i in smilies_array) {
				CURRENTSTYPE = i;break;
			}
		}
		smiliestype = '<div id="'+id+'_tb" class="tb tb_s cl"><ul>';
		for(i in smilies_type) {
			key = i.substring(1);
			if(smilies_type[i][0]) {
				smiliestype += '<li ' + (CURRENTSTYPE == key ? 'class="current"' : '') + ' id="'+seditorkey+'stype_'+key+'" onclick="smilies_switch(\'' + id + '\', \'' + smcols + '\', '+key+', 1, \'' + seditorkey + '\');if(CURRENTSTYPE) {$(\''+seditorkey+'stype_\'+CURRENTSTYPE).className=\'\';}this.className=\'current\';CURRENTSTYPE='+key+';doane(event);"><a href="javascript:;" hidefocus="true">'+smilies_type[i][0]+'</a></li>';
			}
		}
		smiliestype += '</ul></div>';
		$(id).innerHTML = smiliestype + '<div id="' + id + '_data"></div><div class="sllt_p" id="' + id + '_page"></div>';
		smilies_switch(id, smcols, CURRENTSTYPE, smile[1], seditorkey);
		smilies_fastdata = '';
		if(seditorkey == 'fastpost' && $('fastsmilies') && smilies_fast) {
			var j = 0;
			for(i = 0;i < smilies_fast.length; i++) {
				if(j == 0) {
					smilies_fastdata += '<tr>';
				}
				j = ++j > 3 ? 0 : j;
				s = smilies_array[smilies_fast[i][0]][smilies_fast[i][1]][smilies_fast[i][2]];
				smilieimg = STATICURL + 'image/smiley/' + smilies_type['_' + smilies_fast[i][0]][1] + '/' + s[2];
				img[k] = new Image();
				img[k].src = smilieimg;
				smilies_fastdata += s ? '<td onmouseover="smilies_preview(\'' + seditorkey + '\', \'fastsmiliesdiv\', this, ' + s[5] + ')" onmouseout="$(\'smilies_preview\').style.display = \'none\'" onclick="' + (typeof wysiwyg != 'undefined' ? 'insertSmiley(' + s[0] + ')': 'seditor_insertunit(\'' + seditorkey + '\', \'' + s[1].replace(/'/, '\\\'') + '\')') +
					'" id="' + seditorkey + 'smilie_' + s[0] + '_td"><img id="smilie_' + s[0] + '" width="' + s[3] +'" height="' + s[4] +'" src="' + smilieimg + '" alt="' + s[1] + '" />' : '<td>';
			}
			$('fastsmilies').innerHTML = '<table cellspacing="0" cellpadding="0"><tr>' + smilies_fastdata + '</tr></table>';
		}
	}
}

function smilies_switch(id, smcols, type, page, seditorkey) {
	page = page ? page : 1;
	if(!smilies_array[type] || !smilies_array[type][page]) return;
	setcookie('smile', type + 'D' + page, 31536000);
	smiliesdata = '<table id="' + id + '_table" cellpadding="0" cellspacing="0"><tr>';
	j = k = 0;
	img = [];
	for(var i = 0; i < smilies_array[type][page].length; i++) {
		if(j >= smcols) {
			smiliesdata += '<tr>';
			j = 0;
		}
		s = smilies_array[type][page][i];
		smilieimg = STATICURL + 'image/smiley/' + smilies_type['_' + type][1] + '/' + s[2];
		img[k] = new Image();
		img[k].src = smilieimg;
		smiliesdata += s && s[0] ? '<td onmouseover="smilies_preview(\'' + seditorkey + '\', \'' + id + '\', this, ' + s[5] + ')" onclick="' + (typeof wysiwyg != 'undefined' ? 'insertSmiley(' + s[0] + ')': 'seditor_insertunit(\'' + seditorkey + '\', \'' + s[1].replace(/'/, '\\\'') + '\')') +
			'" id="' + seditorkey + 'smilie_' + s[0] + '_td"><img id="smilie_' + s[0] + '" width="' + s[3] +'" height="' + s[4] +'" src="' + smilieimg + '" alt="' + s[1] + '" />' : '<td>';
		j++;k++;
	}
	smiliesdata += '</table>';
	smiliespage = '';
	if(smilies_array[type].length > 2) {
		prevpage = ((prevpage = parseInt(page) - 1) < 1) ? smilies_array[type].length - 1 : prevpage;
		nextpage = ((nextpage = parseInt(page) + 1) == smilies_array[type].length) ? 1 : nextpage;
		smiliespage = '<div class="z"><a href="javascript:;" onclick="smilies_switch(\'' + id + '\', \'' + smcols + '\', ' + type + ', ' + prevpage + ', \'' + seditorkey + '\');doane(event);">上页</a>' +
			'<a href="javascript:;" onclick="smilies_switch(\'' + id + '\', \'' + smcols + '\', ' + type + ', ' + nextpage + ', \'' + seditorkey + '\');doane(event);">下页</a></div>' +
			page + '/' + (smilies_array[type].length - 1);
	}
	$(id + '_data').innerHTML = smiliesdata;
	$(id + '_page').innerHTML = smiliespage;
	$(id + '_tb').style.width = smcols*(16+parseInt(s[3])) + 'px';
}

function smilies_preview(seditorkey, id, obj, w) {
	var menu = $('smilies_preview');
	if(!menu) {
		menu = document.createElement('div');
		menu.id = 'smilies_preview';
		menu.className = 'sl_pv';
		menu.style.display = 'none';
		$('append_parent').appendChild(menu);
	}
	menu.innerHTML = '<img width="' + w + '" src="' + obj.childNodes[0].src + '" />';
	mpos = fetchOffset($(id + '_data'));
	spos = fetchOffset(obj);
	pos = spos['left'] >= mpos['left'] + $(id + '_data').offsetWidth / 2 ? '13' : '24';
	showMenu({'ctrlid':obj.id,'showid':id + '_data','menuid':menu.id,'pos':pos,'layer':3});
};
///<jscompress sourcefile="forum_viewthread.js" />
/*
	[Discuz!] (C)2001-2099 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$Id: forum_viewthread.js 35221 2015-02-27 08:24:39Z nemohou $
*/

var replyreload = '', attachimgST = new Array(), zoomgroup = new Array(), zoomgroupinit = new Array(),choicenum=0;

function attachimggroup(pid) {
	if(!zoomgroupinit[pid]) {
		for(i = 0;i < aimgcount[pid].length;i++) {
			zoomgroup['aimg_' + aimgcount[pid][i]] = pid;
		}
		zoomgroupinit[pid] = true;
	}
}

function attachimgshow(pid, onlyinpost) {
	onlyinpost = !onlyinpost ? false : onlyinpost;
	aimgs = aimgcount[pid];
	aimgcomplete = 0;
	loadingcount = 0;
	for(i = 0;i < aimgs.length;i++) {
		obj = $('aimg_' + aimgs[i]);
		if(!obj) {
			aimgcomplete++;
			continue;
		}
		if(onlyinpost && obj.getAttribute('inpost') || !onlyinpost) {
			if(!obj.status) {
				obj.status = 1;
				if(obj.getAttribute('file')) obj.src = obj.getAttribute('file');
				loadingcount++;
			} else if(obj.status == 1) {
				if(obj.complete) {
					obj.status = 2;
				} else {
					loadingcount++;
				}
			} else if(obj.status == 2) {
				aimgcomplete++;
				if(obj.getAttribute('thumbImg')) {
					thumbImg(obj);
				}
			}
			if(loadingcount >= 10) {
				break;
			}
		}
	}
	if(aimgcomplete < aimgs.length) {
		setTimeout(function () {
			attachimgshow(pid, onlyinpost);
		}, 100);
	}
}

function attachimglstshow(pid, islazy, fid, showexif) {
	var aimgs = aimgcount[pid];
	var s = '';
	if(fid) {
		s = ' onmouseover="showMenu({\'ctrlid\':this.id, \'pos\': \'12!\'});"';
	}
	if(typeof aimgcount == 'object' && $('imagelistthumb_' + pid)) {
		for(pid in aimgcount) {
			var imagelist = '';
			for(i = 0;i < aimgcount[pid].length;i++) {
				if(!$('aimg_' + aimgcount[pid][i]) || $('aimg_' + aimgcount[pid][i]).getAttribute('inpost') || parseInt(aimgcount[pid][i]) != aimgcount[pid][i]) {
					continue;
				}
				if(fid) {
					imagelist += '<div id="pattimg_' + aimgcount[pid][i] + '_menu" class="tip tip_4" style="display: none;"><div class="tip_horn"></div><div class="tip_c"><a href="forum.php?mod=ajax&action=setthreadcover&aid=' + aimgcount[pid][i] + '&fid=' + fid + '" class="xi2" onclick="showWindow(\'setcover' + aimgcount[pid][i] + '\', this.href)">设为封面</a></div></div>';
				}
				imagelist += '<div class="pattimg">' +
					'<a id="pattimg_' + aimgcount[pid][i] + '" class="pattimg_zoom" href="javascript:;"' + s + ' onclick="zoom($(\'aimg_' + aimgcount[pid][i] + '\'), attachimggetsrc(\'aimg_' + aimgcount[pid][i] + '\'), 0, 0, ' + (parseInt(showexif) ? 1 : 0) + ')" title="点击放大">点击放大</a>' +
					'<img ' + (islazy ? 'file' : 'src') + '="forum.php?mod=image&aid=' + aimgcount[pid][i] + '&size=100x100&key=' + imagelistkey + '&atid=' + tid + '" width="100" height="100" /></div>';
			}
			if($('imagelistthumb_' + pid)) {
				$('imagelistthumb_' + pid).innerHTML = imagelist;
			}
		}
	}
}

function attachimggetsrc(img) {
	return $(img).getAttribute('zoomfile') ? $(img).getAttribute('zoomfile') : $(img).getAttribute('file');
}

function attachimglst(pid, op, islazy) {
	if(!op) {
		$('imagelist_' + pid).style.display = 'none';
		$('imagelistthumb_' + pid).style.display = '';
	} else {
		$('imagelistthumb_' + pid).style.display = 'none';
		$('imagelist_' + pid).style.display = '';
		if(islazy) {
			o = new lazyload();
			o.showImage();
		} else {
			attachimgshow(pid);
		}
	}
	doane();
}

function attachimginfo(obj, infoobj, show, event) {
	objinfo = fetchOffset(obj);
	if(show) {
		$(infoobj).style.left = objinfo['left'] + 'px';
		$(infoobj).style.top = obj.offsetHeight < 40 ? (objinfo['top'] + obj.offsetHeight) + 'px' : objinfo['top'] + 'px';
		$(infoobj).style.display = '';
	} else {
		if(BROWSER.ie) {
			$(infoobj).style.display = 'none';
			return;
		} else {
			var mousex = document.body.scrollLeft + event.clientX;
			var mousey = document.documentElement.scrollTop + event.clientY;
			if(mousex < objinfo['left'] || mousex > objinfo['left'] + objinfo['width'] || mousey < objinfo['top'] || mousey > objinfo['top'] + objinfo['height']) {
				$(infoobj).style.display = 'none';
			}
		}
	}
}

function signature(obj) {
	if(obj.style.maxHeightIE != '') {
		var height = (obj.scrollHeight > parseInt(obj.style.maxHeightIE)) ? obj.style.maxHeightIE : obj.scrollHeight + 'px';
		if(obj.innerHTML.indexOf('<IMG ') == -1) {
			obj.style.maxHeightIE = '';
		}
		return height;
	}
}

function tagshow(event) {
	var obj = BROWSER.ie ? event.srcElement : event.target;
	ajaxmenu(obj, 0, 1, 2);
}

function parsetag(pid) {
	if(!$('postmessage_'+pid) || $('postmessage_'+pid).innerHTML.match(/<script[^\>]*?>/i)) {
		return;
	}
	var havetag = false;
	var tagfindarray = new Array();
	var str = $('postmessage_'+pid).innerHTML.replace(/(^|>)([^<]+)(?=<|$)/ig, function($1, $2, $3, $4) {
		for(i in tagarray) {
			if(tagarray[i] && $3.indexOf(tagarray[i]) != -1) {
				havetag = true;
				$3 = $3.replace(tagarray[i], '<h_ ' + i + '>');
				tmp = $3.replace(/&[a-z]*?<h_ \d+>[a-z]*?;/ig, '');
				if(tmp != $3) {
					$3 = tmp;
				} else {
					tagfindarray[i] = tagarray[i];
					tagarray[i] = '';
				}
			}
		}
		return $2 + $3;
		});
		if(havetag) {
		$('postmessage_'+pid).innerHTML = str.replace(/<h_ (\d+)>/ig, function($1, $2) {
			return '<span href=\"forum.php?mod=tag&name=' + tagencarray[$2] + '\" onclick=\"tagshow(event)\" class=\"t_tag\">' + tagfindarray[$2] + '</span>';
	    	});
	}
}

function setanswer(pid, from){
	if(confirm('您确认要把该回复选为“最佳答案”吗？')){
		if(BROWSER.ie) {
			doane(event);
		}
		$('modactions').action='forum.php?mod=misc&action=bestanswer&tid=' + tid + '&pid=' + pid + '&from=' + from + '&bestanswersubmit=yes';
		$('modactions').submit();
	}
}

var authort;
function showauthor(ctrlObj, menuid) {
	authort = setTimeout(function () {
		showMenu({'menuid':menuid});
		if($(menuid + '_ma').innerHTML == '') $(menuid + '_ma').innerHTML = ctrlObj.innerHTML;
	}, 500);
	if(!ctrlObj.onmouseout) {
		ctrlObj.onmouseout = function() {
			clearTimeout(authort);
		}
	}
}

function fastpostappendreply() {
	if($('fastpostrefresh') != null) {
		setcookie('fastpostrefresh', $('fastpostrefresh').checked ? 1 : 0, 2592000);
		if($('fastpostrefresh').checked) {
			location.href = 'forum.php?mod=redirect&tid='+tid+'&goto=lastpost&random=' + Math.random() + '#lastpost';
			return;
		}
	}
	newpos = fetchOffset($('post_new'));
	document.documentElement.scrollTop = newpos['top'];
	$('post_new').style.display = '';
	$('post_new').id = '';
	div = document.createElement('div');
	div.id = 'post_new';
	div.style.display = 'none';
	div.className = '';
	$('postlistreply').appendChild(div);
	$('fastpostsubmit').disabled = false;
	if($('fastpostmessage')) {
		$('fastpostmessage').value = '';
	} else {
		editdoc.body.innerHTML = BROWSER.firefox ? '<br />' : '';
	}
	if($('fastpostform').seccodehash){
		updateseccode($('fastpostform').seccodehash.value);
		$('fastpostform').seccodeverify.value = '';
	}
	if($('fastpostform').secqaahash){
		updatesecqaa($('fastpostform').secqaahash.value);
		$('fastpostform').secanswer.value = '';
	}
	showCreditPrompt();
}

function succeedhandle_fastpost(locationhref, message, param) {
	var pid = param['pid'];
	var tid = param['tid'];
	var from = param['from'];
	if(pid) {
		ajaxget('forum.php?mod=viewthread&tid=' + tid + '&viewpid=' + pid + '&from=' + from, 'post_new', 'ajaxwaitid', '', null, 'fastpostappendreply()');
		if(replyreload) {
			var reloadpids = replyreload.split(',');
			for(var i = 1;i < reloadpids.length;i++) {
				ajaxget('forum.php?mod=viewthread&tid=' + tid + '&viewpid=' + reloadpids[i] + '&from=' + from, 'post_' + reloadpids[i], 'ajaxwaitid');
			}
		}
		$('fastpostreturn').className = '';
	} else {
		if(!message) {
			message = '本版回帖需要审核，您的帖子将在通过审核后显示';
		}
		$('post_new').style.display = $('fastpostmessage').value = $('fastpostreturn').className = '';
		$('fastpostreturn').innerHTML = message;
	}
	if(param['sechash']) {
		updatesecqaa(param['sechash']);
		updateseccode(param['sechash']);
	}
	if($('attach_tblheader')) {
		$('attach_tblheader').style.display = 'none';
	}
	if($('attachlist')) {
		$('attachlist').innerHTML = '';
	}
}

function errorhandle_fastpost() {
	$('fastpostsubmit').disabled = false;
}

function succeedhandle_comment(locationhref, message, param) {
	ajaxget('forum.php?mod=misc&action=commentmore&tid=' + param['tid'] + '&pid=' + param['pid'], 'comment_' + param['pid']);
	hideWindow('comment');
	showCreditPrompt();
}

function succeedhandle_postappend(locationhref, message, param) {
	ajaxget('forum.php?mod=viewthread&tid=' + param['tid'] + '&viewpid=' + param['pid'], 'post_' + param['pid'], 'ajaxwaitid');
	hideWindow('postappend');
}

function recommendupdate(n) {
	if(getcookie('recommend')) {
		var objv = n > 0 ? $('recommendv_add') : $('recommendv_subtract');
		objv.style.display = '';
		objv.innerHTML = parseInt(objv.innerHTML) + 1;
		setTimeout(function () {
			$('recommentc').innerHTML = parseInt($('recommentc').innerHTML) + n;
			$('recommentv').style.display = 'none';
		}, 1000);
		setcookie('recommend', '');
	}
}

function postreviewupdate(pid, n) {
	var objv = n > 0 ? $('review_support_'+pid) : $('review_against_'+pid);
	objv.innerHTML = parseInt(objv.innerHTML ? objv.innerHTML : 0) + 1;
}

function favoriteupdate() {
	var obj = $('favoritenumber');
	obj.style.display = '';
	obj.innerHTML = parseInt(obj.innerHTML) + 1;
}

function switchrecommendv() {
	display('recommendv');
	display('recommendav');
}

function appendreply() {
	newpos = fetchOffset($('post_new'));
	document.documentElement.scrollTop = newpos['top'];
	$('post_new').style.display = '';
	$('post_new').id = '';
	div = document.createElement('div');
	div.id = 'post_new';
	div.style.display = 'none';
	div.className = '';
	$('postlistreply').appendChild(div);
	if($('postform')) {
		$('postform').replysubmit.disabled = false;
	}
	showCreditPrompt();
}

function poll_checkbox(obj) {
	if(obj.checked) {
		choicenum++;
		for (var i = 0; i < $('poll').elements.length; i++) {
			var e = $('poll').elements[i];
			if(choicenum == tpldata.Poll.Maxchoices) {
				if(e.name.match('pollanswers') && !e.checked) {
					e.disabled = true;
				}
			}
		}
	} else {
		choicenum--;
		for (var i = 0; i < $('poll').elements.length; i++) {
			var e = $('poll').elements[i];
			if(e.name.match('pollanswers') && e.disabled) {
				e.disabled = false;
			}
		}
	}
	$('pollsubmit').disabled = choicenum <= tpldata.Poll.Maxchoices && choicenum > 0 ? false : true;
}

function itemdisable(i) {
	if($('itemt_' + i).className == 'z') {
		$('itemt_' + i).className = 'z xg1';
		$('itemc_' + i).value = '';
		itemset(i);
	} else {
		$('itemt_' + i).className = 'z';
		$('itemc_' + i).value = $('itemc_' + i).value > 0 ? $('itemc_' + i).value : 0;
	}
}
function itemop(i, v) {
	var h = v > 0 ? '-' + (v * 16) + 'px' : '0';
	$('item_' + i).style.backgroundPosition = '10px ' + h;
}
function itemclk(i, v) {
	$('itemc_' + i).value = v;
	$('itemt_' + i).className = 'z';
}
function itemset(i) {
	var v = $('itemc_' + i).value;
	var h = v > 0 ? '-' + (v * 16) + 'px' : '0';
	$('item_' + i).style.backgroundPosition = '10px ' + h;
}

function checkmgcmn(id) {
	if($('mgc_' + id) && !$('mgc_' + id + '_menu').getElementsByTagName('li').length) {
		$('mgc_' + id).innerHTML = '';
		$('mgc_' + id).style.display = 'none';
	}
}

function toggleRatelogCollapse(tarId, ctrlObj) {
	if($(tarId).className == 'rate') {
		$(tarId).className = 'rate rate_collapse';
		setcookie('ratecollapse', 1, 2592000);
		ctrlObj.innerHTML = '展开';
	} else {
		$(tarId).className = 'rate';
		setcookie('ratecollapse', 0, -2592000);
		ctrlObj.innerHTML = '收起';
	}
}

function copyThreadUrl(obj, bbname) {
	bbname = bbname || SITEURL;
	setCopy($('thread_subject').innerHTML.replace(/&amp;/g, '&') + '\n' + obj.href + '\n' + '(出处: '+bbname+')' + '\n', '帖子地址已经复制到剪贴板');
	return false;
}

function replyNotice() {
	var newurl = 'forum.php?mod=misc&action=replynotice&tid=' + tid + '&op=';
	var replynotice = $('replynotice');
	var status = replynotice.getAttribute("status");
	if(status == 1) {
		replynotice.href = newurl + 'receive';
		replynotice.innerHTML = '接收回复通知';
		replynotice.setAttribute("status", 0);
	} else {
		replynotice.href = newurl + 'ignore';
		replynotice.innerHTML = '取消回复通知';
		replynotice.setAttribute("status", 1);
	}
}

var connect_share_loaded = 0;
function connect_share(connect_share_url, connect_uin) {
	if(parseInt(discuz_uid) <= 0) {
		return true;
	} else {
		if(connect_uin) {
			setTimeout(function () {
				if(!connect_share_loaded) {
					showDialog('分享服务连接失败，请稍后再试。', 'notice');
					$('append_parent').removeChild($('connect_load_js'));
				}
			}, 5000);
			connect_load(connect_share_url);
		} else {
			showDialog($('connect_share_unbind').innerHTML, 'info', '请先绑定QQ账号');
		}
		return false;
	}
}

function connect_load(src) {
	var e = document.createElement('script');
	e.type = "text/javascript";
	e.id = 'connect_load_js';
	e.src = src + '&_r=' + Math.random();
	e.async = true;
	$('append_parent').appendChild(e);
}

function connect_show_dialog(title, html, type) {
	var type = type ? type : 'info';
	showDialog(html, type, title, null, 0);
}

function connect_get_thread() {
	connect_thread_info.subject = $('connect_thread_title').value;
	if ($('postmessage_' + connect_thread_info.post_id)) {
		connect_thread_info.html_content = preg_replace(["'"], ['%27'], encodeURIComponent(preg_replace(['本帖最后由 .*? 于 .*? 编辑','&nbsp;','<em onclick="copycode\\(\\$\\(\'code0\'\\)\\);">复制代码</em>'], ['',' ', ''], $('postmessage_' + connect_thread_info.post_id).innerHTML)));
	}
	return connect_thread_info;
}

function lazyload(className) {
	var obj = this;
	lazyload.className = className;
	this.getOffset = function (el, isLeft) {
		var  retValue  = 0 ;
		while  (el != null ) {
			retValue  +=  el["offset" + (isLeft ? "Left" : "Top" )];
			el = el.offsetParent;
		}
		return  retValue;
	};
	this.initImages = function (ele) {
		lazyload.imgs = [];
		var eles = lazyload.className ? $C(lazyload.className, ele) : [document.body];
		for (var i = 0; i < eles.length; i++) {
			var imgs = eles[i].getElementsByTagName('IMG');
			for(var j = 0; j < imgs.length; j++) {
				if(imgs[j].getAttribute('file') && !imgs[j].getAttribute('lazyloaded')) {
					if(this.getOffset(imgs[j]) > document.documentElement.clientHeight) {
						lazyload.imgs.push(imgs[j]);
					} else {
						imgs[j].onload = function(){thumbImg(this);};
						imgs[j].setAttribute('src', imgs[j].getAttribute('file'));
						imgs[j].setAttribute('lazyloaded', 'true');
					}
				}
			}
		}
	};
	this.showImage = function() {
		this.initImages();
		if(!lazyload.imgs.length) return false;
		var imgs = [];
		var scrollTop = Math.max(document.documentElement.scrollTop , document.body.scrollTop);
		for (var i=0; i<lazyload.imgs.length; i++) {
			var img = lazyload.imgs[i];
			var offsetTop = this.getOffset(img);
			if (!img.getAttribute('lazyloaded') && offsetTop > document.documentElement.clientHeight && (offsetTop  - scrollTop < document.documentElement.clientHeight)) {
				var dom = document.createElement('div');
				var width = img.getAttribute('width') ? img.getAttribute('width') : 100;
				var height = img.getAttribute('height') ? img.getAttribute('height') : 100;
				dom.innerHTML = '<div style="width: '+width+'px; height: '+height+'px;background: url('+IMGDIR + '/loading.gif) no-repeat center center;"></div>';
				img.parentNode.insertBefore(dom.childNodes[0], img);
				img.onload = function () {
					if(!this.getAttribute('_load')) {
						this.setAttribute('_load', 1);
						this.style.width = this.style.height = '';
						this.parentNode.removeChild(this.previousSibling);
						if(this.getAttribute('lazyloadthumb')) {
							thumbImg(this);
						}
					}
				};
				img.style.width = img.style.height = '1px';
				img.setAttribute('src', img.getAttribute('file') ? img.getAttribute('file') : img.getAttribute('src'));
				img.setAttribute('lazyloaded', true);
			} else {
				imgs.push(img);
			}
		}
		lazyload.imgs = imgs;
		return true;
	};
	this.showImage();
	_attachEvent(window, 'scroll', function(){obj.showImage();});
}
function update_collection(){
	var obj = $('collectionnumber');
	sum = 1;
	obj.style.display = '';
	obj.innerText = parseInt(obj.innerText)+sum;
}
function display_blocked_post() {
	var movehiddendiv = (!$('hiddenposts').innerHTML) ? true : false;
	for (var i = 0; i < blockedPIDs.length; i++) {
		if(movehiddendiv) {
			$('hiddenposts').appendChild($("post_"+blockedPIDs[i]));
		}
		display("post_"+blockedPIDs[i]);
	}
	var postlistreply = $('postlistreply').innerHTML;
	$('hiddenpoststip').parentNode.removeChild($('postlistreply'));
	$('hiddenpoststip').parentNode.removeChild($('hiddenpoststip'));
	$('hiddenposts').innerHTML+='<div id="postlistreply" class="pl">'+postlistreply+'</div>';
}

function show_threadpage(pid, current, maxpage, ispreview) {
	if(!$('threadpage') || typeof tid == 'undefined') {
		return;
	};
	var clickvalue = function (page) {
		return 'ajaxget(\'forum.php?mod=viewthread&tid=' + tid + '&viewpid=' + pid + '&cp=' + page + (ispreview ? '&from=preview' : '') + '\', \'post_' + pid + '\', \'ajaxwaitid\');';
	};
	var pstart = current - 1;
	pstart = pstart < 1 ? 1 : pstart;
	var pend = current + 1;
	pend = pend > maxpage ? maxpage : pend;
	var s = '<div class="cm pgs mtm mbm cl"><div class="pg">';
	if(pstart > 1) {
		s += '<a href="javascript:;" onclick="' + clickvalue(1) + '">1 ...</a>';
	}
	for(i = pstart;i <= pend;i++) {
		s += i == current ? '<strong>' + i + '</strong>' : '<a href="javascript:;" onclick="' + clickvalue(i)+ '">' + i + '</a>';
	}
	if(pend < maxpage) {
		s += '<a href="javascript:;" onclick="' + clickvalue(maxpage)+ '">... ' + maxpage + '</a>';
	}
	if(current < maxpage) {
		s += '<a href="javascript:;" onclick="' + clickvalue(current + 1) + '" class="nxt">下一页</a>';
	}
	s += '<a href="javascript:;" onclick="' + clickvalue('all') + '">查看所有</a>';
	s += '</div></div>';
	$('threadpage').innerHTML = s;
}

var show_threadindex_data = '';
function show_threadindex(pid, ispreview) {
	if(!show_threadindex_data) {
		var s = '<div class="tindex"><h3>目录</h3><ul>';
		for(i in $('threadindex').childNodes) {
			o = $('threadindex').childNodes[i];
			if(o.tagName == 'A') {
				var sub = o.getAttribute('sub').length * 2;
				o.href = "javascript:;";
				if(o.getAttribute('page')) {
					s += '<li style="margin-left:' + sub + 'em" onclick="ajaxget(\'forum.php?mod=viewthread&threadindex=yes&tid=' + tid + '&viewpid=' + pid + '&cp=' + o.getAttribute('page') + (ispreview ? '&from=preview' : '') + '\', \'post_' + pid + '\', \'ajaxwaitid\')">' + o.innerHTML + '</li>';
				} else if(o.getAttribute('tid') && o.getAttribute('pid')) {
					s += '<li style="margin-left:' + sub + 'em" onclick="ajaxget(\'forum.php?mod=viewthread&threadindex=yes&tid=' + o.getAttribute('tid') + '&viewpid=' + o.getAttribute('pid') + (ispreview ? '&from=preview' : '') + '\', \'post_' + pid + '\', \'ajaxwaitid\')">' + o.innerHTML + '</li>';
				}
			}
		}
		s += '</ul></div>';
		$('threadindex').innerHTML = s;
		show_threadindex_data = s;
	} else {
		$('threadindex').innerHTML = show_threadindex_data;
	}
}
function ctrlLeftInfo(sli_staticnum) {
	var sli = $('scrollleftinfo');
	var postlist_bottom = parseInt($('postlist').getBoundingClientRect().bottom);
	var sli_bottom = parseInt(sli.getBoundingClientRect().bottom);
	if(postlist_bottom < sli_staticnum && postlist_bottom != sli_bottom) {
		sli.style.top = (postlist_bottom - sli.offsetHeight - 5)+'px';
	} else{
		sli.style.top = 'auto';
	}
}

function fixed_avatar(pids, fixednv) {
	var fixedtopnv = fixednv ? new fixed_top_nv('nv', true) : false;
	if(fixednv) {
		fixedtopnv.init();
	}
	function fixedavatar(e) {
		var avatartop = fixednv ? fixedtopnv.run() : 0;
		for(var i = 0; i < pids.length; i++) {
			var pid = pids[i];
			var posttable = $('pid'+pid);
			var postavatar = $('favatar'+pid);
			if(!$('favatar'+pid)) {
				return;
			}
			var nextpost = $('_postposition'+pid);
			if(!postavatar || !nextpost || posttable.offsetHeight - 100 < postavatar.offsetHeight) {
				if(postavatar.style.position == 'fixed') {
					postavatar.style.position = '';
				}
				continue;
			}
			var avatarstyle = postavatar.style;
			posttabletop = parseInt(posttable.getBoundingClientRect().top);
			nextposttop = parseInt(nextpost.getBoundingClientRect().top);
			if(nextposttop > 0 && nextposttop <= postavatar.offsetHeight) {
				if(BROWSER.firefox) {
					if(avatarstyle.position != 'fixed') {
						avatarstyle.position = 'fixed';
					}
					avatarstyle.top = -(postavatar.offsetHeight - nextposttop)+'px';
				} else {
					postavatar.parentNode.style.position = 'relative';
					avatarstyle.top = '';
					avatarstyle.bottom = '0px';
					avatarstyle.position = 'absolute';
				}
			} else if(posttabletop < 0 && nextposttop > 0) {
					if(postavatar.parentNode.style.position != '') {
						postavatar.parentNode.style.position = '';
					}
					if(avatarstyle.position != 'fixed' || parseInt(avatarstyle.top) != avatartop) {
						avatarstyle.bottom = '';
						avatarstyle.top = avatartop + 'px';
						avatarstyle.position = 'fixed';
					}
			} else if(avatarstyle.position != '') {
				avatarstyle.position = '';
			}
		}
	}
	if(!(BROWSER.ie && BROWSER.ie < 7)) {
		_attachEvent(window, 'load', function(){_attachEvent(window, 'scroll', fixedavatar);});
	}
}

function submitpostpw(pid, tid) {
	var obj = $('postpw_' + pid);
	appendscript(JSPATH + 'md5.js?' + VERHASH);
	safescript('md5_js', function () {
		setcookie('postpw_' + pid, hex_md5(obj.value));
		if(!tid) {
			location.href = location.href;
		} else {
			location.href = 'forum.php?mod=viewthread&tid='+tid;
		}
	}, 100, 50);
}

function threadbegindisplay(type, w, h, s) {

	$('begincloseid').onclick = function() {
		$('threadbeginid').style.display = 'none';
	};
	var imgobj = $('threadbeginid');
	imgobj.style.left = (document.body.clientWidth - w)/2 + 'px';
	imgobj.style.top = (document.body.clientHeight - h)/2 + 'px';
	if(type == 1) {
		autozoom(w, h, s);
	} else if(type == 2) {
		autofade(w, h, s);
	} else {
		setTimeout(function() {
			$('threadbeginid').style.display = 'none';
		}, s);
	}
}

function autofade(w, h, s) {
	this.imgobj = $('threadbeginid');
	this.opacity = 0;
	this.fadein = function() {
		if(BROWSER.ie) {
			this.imgobj.filters.alpha.opacity = this.opacity;
		} else {
			this.imgobj.style.opacity = this.opacity/100;
		}
		if(this.opacity >= 100) {
			setTimeout(this.fadeout, s);
			return;
		}
		this.opacity++;
		setTimeout(this.fadein, 50);
	};
	this.fadeout = function() {
		if(BROWSER.ie) {
			this.imgobj.filters.alpha.opacity = this.opacity;
		} else {
			this.imgobj.style.opacity = this.opacity/100;
		}
		if(this.opacity <= 0) {
			this.imgobj.style.display = 'none';
			return;
		}
		this.opacity--;
		setTimeout(this.fadeout, 50);
	};
	this.fadein();
}

function autozoom(w, h, s) {
	this.height = 0;
	this.imgobj = $('threadbeginid');
	this.imgobj.style.overflow = 'hidden';
	this.imgobj.style.display = '';
	this.autozoomin = function() {
		this.height += 5;
		if(this.height >= h) {
			this.imgobj.style.height = h + 'px';
			setTimeout(this.autozoomout, s);
			return;
		}
		this.imgobj.style.height = this.height + 'px';
		setTimeout(this.autozoomin, 50);
	};
	this.autozoomout = function() {
		this.height -= 5;
		if(this.height <= 0) {
			this.imgobj.style.height = 0 + 'px';
			this.imgobj.style.display = 'none';
			return;
		}
		this.imgobj.style.height = this.height + 'px';
		setTimeout(this.autozoomout, 50);
	};
	this.autozoomin();
}

function readmode(title, pid) {

	var imagelist = '';
	if(aimgcount[pid]) {
		for(var i = 0; i < aimgcount[pid].length;i++) {
			var aimgObj = $('aimg_'+aimgcount[pid][i]);
			if(aimgObj.parentElement.className!="mbn") {
				var src = aimgObj.getAttribute('file');
				imagelist += '<div class="mbn"><img src="' + src + '" width="600" /></div>';
			}
		}
	}
	msg = $('postmessage_'+pid).innerHTML+imagelist;
	msg = '<div style="width:800px;max-height:500px; overflow-y:auto; padding: 10px;" class="pcb">'+msg+'</div>';
	showDialog(msg, 'info', title, null, 1);
	var coverObj = $('fwin_dialog_cover');
	coverObj.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=90)';
	coverObj.style.opacity = 0.9;
}

function changecontentdivid(tid) {
	if($('postlistreply')) {
		objtid = $('postlistreply').getAttribute('tid');
		if(objtid == tid) {
			return;
		}
		$('postlistreply').id = 'postlistreply_'+objtid;
		postnewdiv = $('postlistreply_'+objtid).childNodes;
		postnewdiv[postnewdiv.length-1].id = 'post_new_'+objtid;
	}
	$('postlistreply_'+tid).id = 'postlistreply';
	postnewdiv = $('postlistreply').childNodes;
	postnewdiv[postnewdiv.length-1].id = 'post_new';
}

function showmobilebbs(obj) {
	var content = '<h3 class="flb" style="cursor:move;"><em>下载掌上论坛</em><span><a href="javascript:;" class="flbc" onclick="hideWindow(\'mobilebbs\')" title="{lang close}">{lang close}</a></span></h3><div class="c"><h4>Andriod版本，扫描二维码可以直接下载到手机</h4><p class="mtm mbm vm"><span class="code_bg"><img src="'+ STATICURL +'image/common/zslt_andriod.png" alt="" /></span><img src="'+ STATICURL +'image/common/andriod.png" alt="适用于装有安卓系统的三星/HTC/小米等手机" /></p><h4>iPhone版本，扫描二维码可以直接下载到手机</h4><p class="mtm mbm vm"><span class="code_bg"><img src="'+ STATICURL +'image/common/zslt_ios.png" alt="" /></span><img src="'+ STATICURL +'image/common/ios.png" alt="适用于苹果手机" /></p></div>';
	showWindow('mobilebbs', content, 'html');
}

function succeedhandle_vfastpost(url, message, param) {
	$('vmessage').value = '';
	succeedhandle_fastpost(url, message, param);
	showCreditPrompt();
}

function vmessage() {
	var vf_tips = '#在这里快速回复#';
	$('vmessage').value = vf_tips;
	$('vmessage').style.color = '#CDCDCD';
	$('vmessage').onclick = function() {
		if($('vmessage').value==vf_tips) {
			$('vmessage').value='';
			$('vmessage').style.color="#000";
		}
	};
	$('vmessage').onblur = function() {
		if(!$('vmessage').value) {
			$('vmessage').value=vf_tips;
			$('vmessage').style.color="#CDCDCD";
		}
	};
	$('vreplysubmit').onclick = function() {
		if($('vmessage').value == vf_tips) {
			return false;
		}
	};
	$('vreplysubmit').onmouseover = function() {
		if($('vmessage').value != vf_tips) {
			ajaxget('forum.php?mod=ajax&action=checkpostrule&ac=reply', 'vfastpostseccheck');
			$('vreplysubmit').onmouseover = null;
		}
	};
};
///<jscompress sourcefile="common_extra.js" />
/*
	[Discuz!] (C)2001-2099 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$Id: common_extra.js 35187 2015-01-19 04:22:13Z nemohou $
*/

function _relatedlinks(rlinkmsgid) {
	if(!$(rlinkmsgid) || $(rlinkmsgid).innerHTML.match(/<script[^\>]*?>/i)) {
		return;
	}
	var alink = new Array(), ignore = new Array();
	var i = 0;
	var msg = $(rlinkmsgid).innerHTML;
	msg = msg.replace(/(<ignore_js_op\>[\s|\S]*?<\/ignore_js_op\>)/ig, function($1) {
		ignore[i] = $1;
		i++;
		return '#ignore_js_op '+(i - 1)+'#';
	});
	var alink_i = 0;
	msg = msg.replace(/(<a.*?<\/a\>)/ig, function($1) {
		alink[alink_i] = $1;
		alink_i++;
		return '#alink '+(alink_i - 1)+'#';
	});
	var relatedid = new Array();
	msg = msg.replace(/(^|>)([^<]+)(?=<|$)/ig, function($1, $2, $3) {
		for(var j = 0; j < relatedlink.length; j++) {
			if(relatedlink[j] && !relatedid[j]) {
				if(relatedlink[j]['surl'] != '') {
					var ra = '<a href="'+relatedlink[j]['surl']+'" target="_blank" class="relatedlink">'+relatedlink[j]['sname']+'</a>';
						alink[alink_i] = ra;
						ra = '#alink '+alink_i+'#';
						alink_i++;
				} else {
					var ra = '<strong><font color="#FF0000">'+relatedlink[j]['sname']+'</font></strong>';
				}
				var $rtmp = $3;
				$3 = $3.replace(relatedlink[j]['sname'], ra);
				if($3 != $rtmp) {
					relatedid[j] = 1;
				}
			}
		}
		return $2 + $3;
    	});

	for(var k in alink) {
		msg = msg.replace('#alink '+k+'#', alink[k]);
	}

	for(var l in ignore) {
		msg = msg.replace('#ignore_js_op '+l+'#', ignore[l]);
	}
	$(rlinkmsgid).innerHTML = msg;
}

var seccheck_tpl = new Array();

function _updatesecqaa(idhash, tpl) {
	if($('secqaa_' + idhash)) {
		if(tpl) {
			seccheck_tpl[idhash] = tpl;
		}
		var id = 'seqaajs_' + idhash;
		var src = 'misc.php?mod=secqaa&action=update&idhash=' + idhash + '&' + Math.random();
		if($(id)) {
			document.getElementsByTagName('head')[0].appendChild($(id));
		}
		var scriptNode = document.createElement("script");
		scriptNode.type = "text/javascript";
		scriptNode.id = id;
		scriptNode.src = src;
		document.getElementsByTagName('head')[0].appendChild(scriptNode);
	}
}

function _updateseccode(idhash, tpl, modid) {
	if(!$('seccode_' + idhash)) {
		return;
	}
	if(tpl) {
		seccheck_tpl[idhash] = tpl;
	}
	var id = 'seccodejs_' + idhash;
	var src = 'misc.php?mod=seccode&action=update&idhash=' + idhash + '&' + Math.random() + '&modid=' + modid;
	if($(id)) {
		document.getElementsByTagName('head')[0].appendChild($(id));
	}
	var scriptNode = document.createElement("script");
	scriptNode.type = "text/javascript";
	scriptNode.id = id;
	scriptNode.src = src;
	document.getElementsByTagName('head')[0].appendChild(scriptNode);
}

function _checksec(type, idhash, showmsg, recall, modid) {
	var showmsg = !showmsg ? 0 : showmsg;
	var secverify = $('sec' + type + 'verify_' + idhash).value;
	if(!secverify) {
		return;
	}
	var modid = !modid ? '' : modid;
	var x = new Ajax('XML', 'checksec' + type + 'verify_' + idhash);
	x.loading = '';
	$('checksec' + type + 'verify_' + idhash).innerHTML = '<img src="'+ IMGDIR + '/loading.gif" width="16" height="16" class="vm" />';
	x.get('misc.php?mod=sec' + type + '&action=check&inajax=1&modid=' + modid + '&idhash=' + idhash + '&secverify=' + (BROWSER.ie && document.charset == 'utf-8' ? encodeURIComponent(secverify) : secverify), function(s){
		var obj = $('checksec' + type + 'verify_' + idhash);
		obj.style.display = '';
		if(s.substr(0, 7) == 'succeed') {
			obj.innerHTML = '<img src="'+ IMGDIR + '/check_right.gif" width="16" height="16" class="vm" />';
			if(showmsg) {
				recall(1);
			}
		} else {
			obj.innerHTML = '<img src="'+ IMGDIR + '/check_error.gif" width="16" height="16" class="vm" />';
			if(showmsg) {
				if(type == 'code') {
					showError('验证码错误，请重新填写');
				} else if(type == 'qaa') {
					showError('验证问答错误，请重新填写');
				}
				recall(0);
			}
		}
	});
}

function _setDoodle(fid, oid, url, tid, from) {
	if(tid == null) {
		hideWindow(fid);
	} else {
		$(tid).style.display = '';
		$(fid).style.display = 'none';
	}
	var doodleText = '[img]'+url+'[/img]';
	if($(oid) != null) {
		if(from == "editor") {
			insertImage(url);
		} else if(from == "fastpost") {
			seditor_insertunit('fastpost', doodleText);
		} else if(from == "forumeditor") {
			if(wysiwyg) {
				insertText('<img src="' + url + '" border="0" alt="" />', false);
			} else {
				insertText(doodleText, strlen(doodleText), 0);
			}
		} else {
			insertContent(oid, doodleText);
		}
	}
}

function _showdistrict(container, elems, totallevel, changelevel, containertype) {
	var getdid = function(elem) {
		var op = elem.options[elem.selectedIndex];
		return op['did'] || op.getAttribute('did') || '0';
	};
	var pid = changelevel >= 1 && elems[0] && $(elems[0]) ? getdid($(elems[0])) : 0;
	var cid = changelevel >= 2 && elems[1] && $(elems[1]) ? getdid($(elems[1])) : 0;
	var did = changelevel >= 3 && elems[2] && $(elems[2]) ? getdid($(elems[2])) : 0;
	var coid = changelevel >= 4 && elems[3] && $(elems[3]) ? getdid($(elems[3])) : 0;
	var url = "home.php?mod=misc&ac=ajax&op=district&container="+container+"&containertype="+containertype
		+"&province="+elems[0]+"&city="+elems[1]+"&district="+elems[2]+"&community="+elems[3]
		+"&pid="+pid + "&cid="+cid+"&did="+did+"&coid="+coid+'&level='+totallevel+'&handlekey='+container+'&inajax=1'+(!changelevel ? '&showdefault=1' : '');
	ajaxget(url, container, '');
}

function _copycode(obj) {
	if(!obj) return false;
	if(window.getSelection) {
		var sel = window.getSelection();
		if (sel.setBaseAndExtent) {
			sel.setBaseAndExtent(obj, 0, obj, 1);
		} else {
			var rng = document.createRange();
			rng.selectNodeContents(obj);
			sel.addRange(rng);
		}
	} else {
		var rng = document.body.createTextRange();
		rng.moveToElementText(obj);
		rng.select();
	}
	setCopy(BROWSER.ie ? obj.innerText.replace(/\r\n\r\n/g, '\r\n') : obj.textContent, '代码已复制到剪贴板');
}

function _showselect(obj, inpid, t, rettype) {
	var showselect_row = function (inpid, s, v, notime, rettype) {
		if(v >= 0) {
			if(!rettype) {
				var notime = !notime ? 0 : 1;
				var t = today.getTime();
				t += 86400000 * v;
				var d = new Date();
				d.setTime(t);
				var month = d.getMonth() + 1;
				month = month < 10 ? '0' + month : month;
				var day = d.getDate();
				day = day < 10 ? '0' + day : day;
				var hour = d.getHours();
				hour = hour < 10 ? '0' + hour : hour;
				var minute = d.getMinutes();
				minute = minute < 10 ? '0' + minute : minute;
				return '<a href="javascript:;" onclick="$(\'' + inpid + '\').value = \'' + d.getFullYear() + '-' + month + '-' + day + (!notime ? ' ' + hour + ':' + minute: '') + '\'">' + s + '</a>';
			} else {
				return '<a href="javascript:;" onclick="$(\'' + inpid + '\').value = \'' + v + '\'">' + s + '</a>';
			}
		} else if(v == -1) {
			return '<a href="javascript:;" onclick="$(\'' + inpid + '\').focus()">' + s + '</a>';
		} else if(v == -2) {
			return '<a href="javascript:;" onclick="$(\'' + inpid + '\').onclick()">' + s + '</a>';
		}
	};

	if(!obj.id) {
		var t = !t ? 0 : t;
		var rettype = !rettype ? 0 : rettype;
		obj.id = 'calendarexp_' + Math.random();
		div = document.createElement('div');
		div.id = obj.id + '_menu';
		div.style.display = 'none';
		div.className = 'p_pop';
		$('append_parent').appendChild(div);
		s = '';
		if(!t) {
			s += showselect_row(inpid, '一天', 1, 0, rettype);
			s += showselect_row(inpid, '一周', 7, 0, rettype);
			s += showselect_row(inpid, '一个月', 30, 0, rettype);
			s += showselect_row(inpid, '三个月', 90, 0, rettype);
			s += showselect_row(inpid, '自定义', -2);
		} else {
			if($(t)) {
				var lis = $(t).getElementsByTagName('LI');
				for(i = 0;i < lis.length;i++) {
					s += '<a href="javascript:;" onclick="$(\'' + inpid + '\').value = this.innerHTML;$(\''+obj.id+'_menu\').style.display=\'none\'">' + lis[i].innerHTML + '</a>';
				}
				s += showselect_row(inpid, '自定义', -1);
			} else {
				s += '<a href="javascript:;" onclick="$(\'' + inpid + '\').value = \'0\'">永久</a>';
				s += showselect_row(inpid, '7 天', 7, 1, rettype);
				s += showselect_row(inpid, '14 天', 14, 1, rettype);
				s += showselect_row(inpid, '一个月', 30, 1, rettype);
				s += showselect_row(inpid, '三个月', 90, 1, rettype);
				s += showselect_row(inpid, '半年', 182, 1, rettype);
				s += showselect_row(inpid, '一年', 365, 1, rettype);
				s += showselect_row(inpid, '自定义', -1);
			}
		}
		$(div.id).innerHTML = s;
	}
	showMenu({'ctrlid':obj.id,'evt':'click'});
	if(BROWSER.ie && BROWSER.ie < 7) {
		doane(event);
	}
}

function _zoom(obj, zimg, nocover, pn, showexif) {
	console.log(obj)
	console.log(zimg)
	zimg = !zimg ? obj.src : zimg;

	showexif = !parseInt(showexif) ? 0 : showexif;
	if(!zoomstatus) {
		window.open(zimg, '', '');
		return;
	}
	if(!obj.id) obj.id = 'img_' + Math.random();
	var faid = !obj.getAttribute('aid') ? 0 : obj.getAttribute('aid');
	var menuid = 'imgzoom';
	var menu = $(menuid);
	var zoomid = menuid + '_zoom';
	var imgtitle = !nocover && obj.title ? '<div class="imgzoom_title">' + htmlspecialchars(obj.title) + '</div>' +
		(showexif ? '<div id="' + zoomid + '_exif" class="imgzoom_exif" onmouseover="this.className=\'imgzoom_exif imgzoom_exif_hover\'" onmouseout="this.className=\'imgzoom_exif\'"></div>' : '')
		: '';
	var cover = !nocover ? 1 : 0;
	var pn = !pn ? 0 : 1;
	var maxh = (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight) - 70;
	var loadCheck = function (obj) {
		if(obj.complete) {
			var imgw = loading.width;
			var imgh = loading.height;
			var r = imgw / imgh;
			var w = document.body.clientWidth * 0.95;
			w = imgw > w ? w : imgw;
			var h = w / r;
			if(w < 100 & h < 100) {
				$(menuid + '_waiting').style.display = 'none';
				hideMenu();
				return;
			}
			if(h > maxh) {
				h = maxh;
				w = h * r;
			}
			if($(menuid)) {
				$(menuid).removeAttribute('top_');$(menuid).removeAttribute('left_');
				clearTimeout($(menuid).getAttribute('timer'));
			}
			showimage(zimg, w, h, imgw, imgh);
			if(showexif && faid) {
				var x = new Ajax();
				x.get('forum.php?mod=ajax&action=exif&aid=' + faid + '&inajax=1', function(s, x) {
					if(s) {
						$(zoomid + '_exif').style.display = '';
						$(zoomid + '_exif').innerHTML = s;
					} else {
						$(zoomid + '_exif').style.display = 'none';
					}
				});
			}
		} else {
			setTimeout(function () { loadCheck(loading); }, 100);
		}
	};
	var showloading = function (zimg, pn) {
		if(!pn) {
			if(!$(menuid + '_waiting')) {
				waiting = document.createElement('img');
				waiting.id = menuid + '_waiting';
				waiting.src = IMGDIR + '/imageloading.gif';
				waiting.style.opacity = '0.8';
				waiting.style.filter = 'alpha(opacity=80)';
				waiting.style.position = 'absolute';
				waiting.style.zIndex = '100000';
				$('append_parent').appendChild(waiting);
			}
		}
		$(menuid + '_waiting').style.display = '';
		$(menuid + '_waiting').style.left = (document.body.clientWidth - 42) / 2 + 'px';
		$(menuid + '_waiting').style.top = ((document.documentElement.clientHeight - 42) / 2 + Math.max(document.documentElement.scrollTop, document.body.scrollTop)) + 'px';
		loading = new Image();
		setTimeout(function () { loadCheck(loading); }, 100);
		if(!pn) {
			$(menuid + '_zoomlayer').style.display = 'none';
		}
		loading.src = zimg;
	};
	var adjustpn = function(h) {
		h = h < 90 ? 90 : h;
		if($('zimg_prev')) {
			$('zimg_prev').style.height= parseInt(h) + 'px';
		}
		if($('zimg_next')) {
			$('zimg_next').style.height= parseInt(h) + 'px';
		}
	};
	var showimage = function (zimg, w, h, imgw, imgh) {
		$(menuid + '_waiting').style.display = 'none';
		$(menuid + '_zoomlayer').style.display = '';
		$(menuid + '_img').style.width = 'auto';
		$(menuid + '_img').style.height = 'auto';
		$(menuid).style.width = (w < 300 ? 320 : w + 20) + 'px';
		mheight = h + 63;
		menu.style.height = mheight + 'px';
		$(menuid + '_zoomlayer').style.height = (mheight < 120 ? 120 : mheight) + 'px';
		$(menuid + '_img').innerHTML = '<img id="' + zoomid + '" w="' + imgw + '" h="' + imgh + '">' + imgtitle;
		$(zoomid).src = zimg;
		$(zoomid).width = w;
		$(zoomid).height = h;
		if($(menuid + '_imglink')) {
			$(menuid + '_imglink').href = zimg;
		}
		setMenuPosition('', menuid, '00');
		adjustpn(h);
	};
	var adjustTimer = 0;
	var adjustTimerCount = 0;
	var wheelDelta = 0;
	var clientX = 0;
	var clientY = 0;
	var adjust = function(e, a) {
		if(BROWSER.ie && BROWSER.ie<7) {
		} else {
			if(adjustTimerCount) {
				adjustTimer = (function(){
					return setTimeout(function () {
						adjustTimerCount++;
						adjust(e);
					}, 20);
					})();
					$(menuid).setAttribute('timer', adjustTimer);
				if(adjustTimerCount > 17) {
					clearTimeout(adjustTimer);
					adjustTimerCount = 0;
					doane();
				}
			} else if(!a) {
				adjustTimerCount = 1;
				if(adjustTimer) {
					clearTimeout(adjustTimer);
					adjust(e, a);
				} else {
					adjust(e, a);
				}
				doane();
			}
		}
		var ele = $(zoomid);
		if(!ele) {
			return;
		}
		var imgw = ele.getAttribute('w');
		var imgh = ele.getAttribute('h');

		if(!a) {
			e = e || window.event;
			try {
				if(e.altKey || e.shiftKey || e.ctrlKey) return;
			} catch (e) {
				e = {'wheelDelta':wheelDelta, 'clientX':clientX, 'clientY':clientY};
			}
			var step = 0;
			if(e.wheelDelta <= 0 || e.detail > 0) {
				if(ele.width - 1 <= 200 || ele.height - 1 <= 200) {
					clearTimeout(adjustTimer);
					adjustTimerCount = 0;
					doane(e);return;
				}
				step = parseInt(imgw/ele.width)-4;
			} else {
				if(ele.width + 1 >= imgw*40) {
					clearTimeout(adjustTimer);
					adjustTimerCount = 0;
					doane(e);return;
				}
				step = 4-parseInt(imgw/ele.width) || 2;
			}
			if(BROWSER.ie && BROWSER.ie<7) { step *= 5;}
			wheelDelta = e.wheelDelta;
			clientX = e.clientX;
			clientY = e.clientY;
			var ratio = 0;
			if(imgw > imgh) {
				ratio = step/ele.height;
				ele.height += step;
				ele.width = imgw*(ele.height/imgh);
			} else if(imgw < imgh) {
				ratio = step/ele.width;
				ele.width += step;
				ele.height = imgh*(ele.width/imgw);
			}
			if(BROWSER.ie && BROWSER.ie<7) {
				setMenuPosition('', menuid, '00');
			} else {
				var menutop = parseFloat(menu.getAttribute('top_') || menu.style.top);
				var menuleft = parseFloat(menu.getAttribute('left_') || menu.style.left);
				var imgY = clientY - menutop - 39;
				var imgX = clientX - menuleft - 10;
				var newTop = (menutop - imgY*ratio) + 'px';
				var newLeft = (menuleft - imgX*ratio) + 'px';
				menu.style.top = newTop;
				menu.style.left = newLeft;
				menu.setAttribute('top_', newTop);
				menu.setAttribute('left_', newLeft);
			}
		} else {
			ele.width = imgw;
			ele.height = imgh;
		}
		menu.style.width = (parseInt(ele.width < 300 ? 300 : parseInt(ele.width)) + 20) + 'px';
		var mheight = (parseInt(ele.height) + 50);
		menu.style.height = mheight + 'px';
		$(menuid + '_zoomlayer').style.height = (mheight < 120 ? 120 : mheight) + 'px';
		adjustpn(ele.height);
		doane(e);
	};
	if(!menu && !pn) {
		menu = document.createElement('div');
		menu.id = menuid;
		if(cover) {
			menu.innerHTML = '<div class="zoominner" id="' + menuid + '_zoomlayer" style="display:none"><p><span class="y"><a id="' + menuid + '_imglink" class="imglink" target="_blank" title="在新窗口打开">在新窗口打开</a><a id="' + menuid + '_adjust" href="javascipt:;" class="imgadjust" title="实际大小">实际大小</a>' +
				'<a href="javascript:;" onclick="hideMenu()" class="imgclose" title="关闭">关闭</a></span>鼠标滚轮缩放图片</p>' +
				'<div class="zimg_p" id="' + menuid + '_picpage"></div><div class="hm" id="' + menuid + '_img"></div></div>';
		} else {
			menu.innerHTML = '<div class="popupmenu_popup" id="' + menuid + '_zoomlayer" style="width:auto"><span class="right y"><a href="javascript:;" onclick="hideMenu()" class="flbc" style="width:20px;margin:0 0 2px 0">关闭</a></span>鼠标滚轮缩放图片<div class="zimg_p" id="' + menuid + '_picpage"></div><div class="hm" id="' + menuid + '_img"></div></div>';
		}
		if(BROWSER.ie || BROWSER.chrome){
			menu.onmousewheel = adjust;
		} else {
			menu.addEventListener('DOMMouseScroll', adjust, false);
		}
		$('append_parent').appendChild(menu);
		if($(menuid + '_adjust')) {
			$(menuid + '_adjust').onclick = function(e) {adjust(e, 1)};
		}
	}
	showloading(zimg, pn);
	picpage = '';
	$(menuid + '_picpage').innerHTML = '';
	if(typeof zoomgroup == 'object' && zoomgroup[obj.id] && typeof aimgcount == 'object' && aimgcount[zoomgroup[obj.id]]) {
		authorimgs = aimgcount[zoomgroup[obj.id]];
		var aid = obj.id.substr(5), authorlength = authorimgs.length, authorcurrent = '';
		if(authorlength > 1) {
			for(i = 0; i < authorlength;i++) {
				if(aid == authorimgs[i]) {
					authorcurrent = i;
				}
			}
			if(authorcurrent !== '') {
				paid = authorcurrent > 0 ? authorimgs[authorcurrent - 1] : authorimgs[authorlength - 1];
				picpage += ' <div id="zimg_prev" onmouseover="dragMenuDisabled=true;this.style.backgroundPosition=\'0 50px\'" onmouseout="dragMenuDisabled=false;this.style.backgroundPosition=\'0 -100px\';" onclick="_zoom_page(\'' + paid + '\', ' + (showexif ? 1 : 0) + ')" class="zimg_prev"><strong>上一张</strong></div> ';
				paid = authorcurrent < authorlength - 1 ? authorimgs[authorcurrent + 1] : authorimgs[0];
				picpage += ' <div id="zimg_next" onmouseover="dragMenuDisabled=true;this.style.backgroundPosition=\'100% 50px\'" onmouseout="dragMenuDisabled=false;this.style.backgroundPosition=\'100% -100px\';" onclick="_zoom_page(\'' + paid + '\', ' + (showexif ? 1 : 0) + ')" class="zimg_next"><strong>下一张</strong></div> ';
			}
			if(picpage) {
				$(menuid + '_picpage').innerHTML = picpage;
			}
		}
	}
	showMenu({'ctrlid':obj.id,'menuid':menuid,'duration':3,'pos':'00','cover':cover,'drag':menuid,'maxh':''});
}

function _zoom_page(paid, showexif) {
	var imagesrc = $('aimg_' + paid).getAttribute('zoomfile') ? $('aimg_' + paid).getAttribute('zoomfile') : $('aimg_' + paid).getAttribute('file');
	zoom($('aimg_' + paid), imagesrc, 0, 1, showexif ? 1 : 0);
}

function _switchTab(prefix, current, total, activeclass) {
	activeclass = !activeclass ? 'a' : activeclass;
	for(var i = 1; i <= total;i++) {
		var classname = ' '+$(prefix + '_' + i).className+' ';
		$(prefix + '_' + i).className = classname.replace(' '+activeclass+' ','').substr(1);
		$(prefix + '_c_' + i).style.display = 'none';
	}
	$(prefix + '_' + current).className = $(prefix + '_' + current).className + ' '+activeclass;
	$(prefix + '_c_' + current).style.display = '';
}

function _initTab(frameId, type) {
	if ($('#controlpanel').css('display')!='none' || $(frameId).className.indexOf('tab') < 0) return false;
	type = type || 'click';
	var tabs = $(frameId+'_title').childNodes;
	var arrTab = [];
	for(var i in tabs) {
		if (tabs[i]['nodeType'] == 1 && tabs[i]['className'].indexOf('move-span') > -1) {
			arrTab.push(tabs[i]);
		}
	}
	var counter = 0;
	var tab = document.createElement('ul');
	tab.className = 'tb cl';
	var len = arrTab.length;
	for(var i = 0;i < len; i++) {
		var tabId = arrTab[i].id;
		if (hasClass(arrTab[i],'frame') || hasClass(arrTab[i],'tab')) {
			var arrColumn = [];
			for (var j in arrTab[i].childNodes) {
				if (typeof arrTab[i].childNodes[j] == 'object' && !hasClass(arrTab[i].childNodes[j],'title')) arrColumn.push(arrTab[i].childNodes[j]);
			}
			var frameContent = document.createElement('div');
			frameContent.id = tabId+'_content';
			frameContent.className = hasClass(arrTab[i],'frame') ? 'content cl '+arrTab[i].className.substr(arrTab[i].className.lastIndexOf(' ')+1) : 'content cl';
			var colLen = arrColumn.length;
			for (var k = 0; k < colLen; k++) {
				frameContent.appendChild(arrColumn[k]);
			}
		} else {
			var frameContent = $(tabId+'_content');
			frameContent = frameContent || document.createElement('div');
		}
		frameContent.style.display = counter ? 'none' : '';
		$(frameId+'_content').appendChild(frameContent);

		var li = document.createElement('li');
		li.id = tabId;
		li.className = counter ? '' : 'a';
		var reg = new RegExp('style=\"(.*?)\"', 'gi');
		var matchs = '', style = '', imgs = '';
		while((matchs = reg.exec(arrTab[i].innerHTML))) {
			if(matchs[1].substr(matchs[1].length,1) != ';') {
				matchs[1] += ';';
			}
			style += matchs[1];
		}
		style = style ? ' style="'+style+'"' : '';
		reg = new RegExp('(<img.*?>)', 'gi');
		while((matchs = reg.exec(arrTab[i].innerHTML))) {
			imgs += matchs[1];
		}
		li.innerHTML = arrTab[i]['innerText'] ? arrTab[i]['innerText'] : arrTab[i]['textContent'];
		var a = arrTab[i].getElementsByTagName('a');
		var href = a && a[0] ? a[0].href : 'javascript:;';
		var onclick = type == 'click' ? ' onclick="return false;"' : '';
		li.innerHTML = '<a href="' + href + '"' + onclick + ' onfocus="this.blur();" ' + style + '>' + imgs + li.innerHTML + '</a>';
		_attachEvent(li, type, switchTabUl);
		tab.appendChild(li);
		$(frameId+'_title').removeChild(arrTab[i]);
		counter++;
	}
	$(frameId+'_title').appendChild(tab);
}

function switchTabUl (e) {
	e = e || window.event;
	var aim = e.target || e.srcElement;
	var tabId = aim.id;
	var parent = aim.parentNode;
	while(parent['nodeName'] != 'UL' && parent['nodeName'] != 'BODY') {
		tabId = parent.id;
		parent = parent.parentNode;
	}
	if(parent['nodeName'] == 'BODY') return false;
	var tabs = parent.childNodes;
	var len2 = tabs.length;
	for(var j = 0; j < len2; j++) {
		tabs[j].className = (tabs[j].id == tabId) ? 'a' : '';
		var content = $(tabs[j].id+'_content');
		if (content) content.style.display = tabs[j].id == tabId ? '' : 'none';
	}
}

function slideshow(el) {
	var obj = this;
	if(!el.id) el.id = Math.random();
	if(typeof slideshow.entities == 'undefined') {
		slideshow.entities = {};
	}
	this.id = el.id;
	if(slideshow.entities[this.id]) return false;
	slideshow.entities[this.id] = this;

	this.slideshows = [];
	this.slidebar = [];
	this.slideother = [];
	this.slidebarup = '';
	this.slidebardown = '';
	this.slidenum = 0;
	this.slidestep = 0;

	this.container = el;
	this.imgs = [];
	this.imgLoad = [];
	this.imgLoaded = 0;
	this.imgWidth = 0;
	this.imgHeight = 0;

	this.getMEvent = function(ele, value) {
		value = !value ? 'mouseover' : value;
		var mevent = !ele ? '' : ele.getAttribute('mevent');
		mevent = (mevent == 'click' || mevent == 'mouseover') ? mevent : value;
		return mevent;
	};
	this.slideshows = $C('slideshow', el);
	this.slideshows = this.slideshows.length>0 ? this.slideshows[0].childNodes : null;
	this.slidebar = $C('slidebar', el);
	this.slidebar = this.slidebar.length>0 ? this.slidebar[0] : null;
	this.barmevent = this.getMEvent(this.slidebar);
	this.slideother = $C('slideother', el);
	this.slidebarup = $C('slidebarup', el);
	this.slidebarup = this.slidebarup.length>0 ? this.slidebarup[0] : null;
	this.barupmevent = this.getMEvent(this.slidebarup, 'click');
	this.slidebardown = $C('slidebardown', el);
	this.slidebardown = this.slidebardown.length>0 ? this.slidebardown[0] : null;
	this.bardownmevent = this.getMEvent(this.slidebardown, 'click');
	this.slidenum = parseInt(this.container.getAttribute('slidenum'));
	this.slidestep = parseInt(this.container.getAttribute('slidestep'));
	this.timestep = parseInt(this.container.getAttribute('timestep'));
	this.timestep = !this.timestep ? 2500 : this.timestep;

	this.index = this.length = 0;
	this.slideshows = !this.slideshows ? filterTextNode(el.childNodes) : filterTextNode(this.slideshows);

	this.length = this.slideshows.length;

	for(i=0; i<this.length; i++) {
		this.slideshows[i].style.display = "none";
		_attachEvent(this.slideshows[i], 'mouseover', function(){obj.stop();});
		_attachEvent(this.slideshows[i], 'mouseout', function(){obj.goon();});
	}

	for(i=0, L=this.slideother.length; i<L; i++) {
		for(var j=0;j<this.slideother[i].childNodes.length;j++) {
			if(this.slideother[i].childNodes[j].nodeType == 1) {
				this.slideother[i].childNodes[j].style.display = "none";
			}
		}
	}

	if(!this.slidebar) {
		if(!this.slidenum && !this.slidestep) {
			this.container.parentNode.style.position = 'relative';
			this.slidebar = document.createElement('div');
			this.slidebar.className = 'slidebar';
			this.slidebar.style.position = 'absolute';
			this.slidebar.style.top = '5px';
			this.slidebar.style.left = '4px';
			this.slidebar.style.display = 'none';
			var html = '<ul>';
			for(var i=0; i<this.length; i++) {
				html += '<li on'+this.barmevent+'="slideshow.entities[' + this.id + '].xactive(' + i + '); return false;">' + (i + 1).toString() + '</li>';
			}
			html += '</ul>';
			this.slidebar.innerHTML = html;
			this.container.parentNode.appendChild(this.slidebar);
			this.controls = this.slidebar.getElementsByTagName('li');
		}
	} else {
		this.controls = filterTextNode(this.slidebar.childNodes);
		for(i=0; i<this.controls.length; i++) {
			if(this.slidebarup == this.controls[i] || this.slidebardown == this.controls[i]) continue;
			_attachEvent(this.controls[i], this.barmevent, function(){slidexactive()});
			_attachEvent(this.controls[i], 'mouseout', function(){obj.goon();});
		}
	}
	if(this.slidebarup) {
		_attachEvent(this.slidebarup, this.barupmevent, function(){slidexactive('up')});
	}
	if(this.slidebardown) {
		_attachEvent(this.slidebardown, this.bardownmevent, function(){slidexactive('down')});
	}
	this.activeByStep = function(index) {
		var showindex = 0,i = 0;
		if(index == 'down') {
			showindex = this.index + 1;
			if(showindex > this.length) {
				this.runRoll();
			} else {
				for (i = 0; i < this.slidestep; i++) {
					if(showindex >= this.length) showindex = 0;
					this.index = this.index - this.slidenum + 1;
					if(this.index < 0) this.index = this.length + this.index;
					this.active(showindex);
					showindex++;
				}
			}
		} else if (index == 'up') {
			var tempindex = this.index;
			showindex = this.index - this.slidenum;
			if(showindex < 0) return false;
			for (i = 0; i < this.slidestep; i++) {
				if(showindex < 0) showindex = this.length - Math.abs(showindex);
				this.active(showindex);
				this.index = tempindex = tempindex - 1;
				if(this.index <0) this.index = this.length - 1;
				showindex--;
			}
		}
		return false;
	};
	this.active = function(index) {
		this.slideshows[this.index].style.display = "none";
		this.slideshows[index].style.display = "block";
		if(this.controls && this.controls.length > 0) {
			this.controls[this.index].className = '';
			this.controls[index].className = 'on';
		}
		for(var i=0,L=this.slideother.length; i<L; i++) {
			this.slideother[i].childNodes[this.index].style.display = "none";
			this.slideother[i].childNodes[index].style.display = "block";
		}
		this.index = index;
	};
	this.xactive = function(index) {
		if(!this.slidenum && !this.slidestep) {
			this.stop();
			if(index == 'down') index = this.index == this.length-1 ? 0 : this.index+1;
			if(index == 'up') index = this.index == 0 ? this.length-1 : this.index-1;
			this.active(index);
		} else {
			this.activeByStep(index);
		}
	};
	this.goon = function() {
		this.stop();
		var curobj = this;
		this.timer = setTimeout(function () {
			curobj.run();
		}, this.timestep);
	};
	this.stop = function() {
		clearTimeout(this.timer);
	};
	this.run = function() {
		var index = this.index + 1 < this.length ? this.index + 1 : 0;
		if(!this.slidenum && !this.slidestep) {
			this.active(index);
		} else {
			this.activeByStep('down');
		}
		var ss = this;
		this.timer = setTimeout(function(){
			ss.run();
		}, this.timestep);
	};

	this.runRoll = function() {
		for(var i = 0; i < this.slidenum; i++) {
			if(this.slideshows[i] && typeof this.slideshows[i].style != 'undefined') this.slideshows[i].style.display = 'block';
			for(var j=0,L=this.slideother.length; j<L; j++) {
				this.slideother[j].childNodes[i].style.display = 'block';
			}
		}
		this.index = this.slidenum - 1;
	};
	var imgs = this.slideshows.length ? this.slideshows[0].parentNode.getElementsByTagName('img') : [];
	for(i=0, L=imgs.length; i<L; i++) {
		this.imgs.push(imgs[i]);
		this.imgLoad.push(new Image());
		this.imgLoad[i].onerror = function (){obj.imgLoaded ++;};
		this.imgLoad[i].src = this.imgs[i].src;
	}

	this.getSize = function () {
		if(this.imgs.length == 0) return false;
		var img = this.imgs[0];
		this.imgWidth = img.width ? parseInt(img.width) : 0;
		this.imgHeight = img.height ? parseInt(img.height) : 0;
		var ele = img.parentNode;
		while ((!this.imgWidth || !this.imgHeight) && !hasClass(ele,'slideshow') && ele != document.body) {
			this.imgWidth = ele.style.width ? parseInt(ele.style.width) : 0;
			this.imgHeight = ele.style.height ? parseInt(ele.style.height) : 0;
			ele = ele.parentNode;
		}
		return true;
	};

	this.getSize();

	this.checkLoad = function () {
		var obj = this;
		this.container.style.display = 'block';
		for(i = 0;i < this.imgs.length;i++) {
			if(this.imgLoad[i].complete && !this.imgLoad[i].status) {
				this.imgLoaded++;
				this.imgLoad[i].status = 1;
			}
		}
		var percentEle = $(this.id+'_percent');
		if(this.imgLoaded < this.imgs.length) {
			if (!percentEle) {
				var dom = document.createElement('div');
				dom.id = this.id+"_percent";
				dom.style.width = this.imgWidth ? this.imgWidth+'px' : '150px';
				dom.style.height = this.imgHeight ? this.imgHeight+'px' : '150px';
				dom.style.lineHeight = this.imgHeight ? this.imgHeight+'px' : '150px';
				dom.style.backgroundColor = '#ccc';
				dom.style.textAlign = 'center';
				dom.style.top = '0';
				dom.style.left = '0';
				dom.style.marginLeft = 'auto';
				dom.style.marginRight = 'auto';
				this.slideshows[0].parentNode.appendChild(dom);
				percentEle = dom;
			}
			el.parentNode.style.position = 'relative';
			percentEle.innerHTML = (parseInt(this.imgLoaded / this.imgs.length * 100)) + '%';
			setTimeout(function () {obj.checkLoad();}, 100);
		} else {
			if (percentEle) percentEle.parentNode.removeChild(percentEle);
			if(this.slidebar) this.slidebar.style.display = '';
			this.index = this.length - 1 < 0 ? 0 : this.length - 1;
			if(this.slideshows.length > 0) {
				if(!this.slidenum || !this.slidestep) {
					this.run();
				} else {
					this.runRoll();
				}
			}
		}
	};
	this.checkLoad();
}

function slidexactive(step) {
	var e = getEvent();
	var aim = e.target || e.srcElement;
	var parent = aim.parentNode;
	var xactivei = null, slideboxid = null,currentslideele = null;
	currentslideele = hasClass(aim, 'slidebarup') || hasClass(aim, 'slidebardown') || hasClass(parent, 'slidebar') ? aim : null;
	while(parent && parent != document.body) {
		if(!currentslideele && hasClass(parent, 'slidebar')) {
			currentslideele = parent;
		}
		if(!currentslideele && (hasClass(parent, 'slidebarup') || hasClass(parent, 'slidebardown'))) {
			currentslideele = parent;
		}
		if(hasClass(parent, 'slidebox')) {
			slideboxid = parent.id;
			break;
		}
		parent = parent.parentNode;
	}
	var slidebar = $C('slidebar', parent);
	var children = slidebar.length == 0 ? [] : filterTextNode(slidebar[0].childNodes);
	if(currentslideele && (hasClass(currentslideele, 'slidebarup') || hasClass(currentslideele, 'slidebardown'))) {
		xactivei = step;
	} else {
		for(var j=0,i=0,L=children.length;i<L;i++){
			if(currentslideele && children[i] == currentslideele) {
				xactivei = j;
				break;
			}
			if(!hasClass(children[i], 'slidebarup') && !hasClass(children[i], 'slidebardown')) j++;
		}
	}
	if(slideboxid != null && xactivei != null) slideshow.entities[slideboxid].xactive(xactivei);
}

function filterTextNode(list) {
	var newlist = [];
	for(var i=0; i<list.length; i++) {
		if (list[i].nodeType == 1) {
			newlist.push(list[i]);
		}
	}
	return newlist;
}

function _runslideshow() {
	var slideshows = $C('slidebox');
	for(var i=0,L=slideshows.length; i<L; i++) {
		new slideshow(slideshows[i]);
	}
}
function _showTip(ctrlobj) {
	if(!ctrlobj.id) {
		ctrlobj.id = 'tip_' + Math.random();
	}
	menuid = ctrlobj.id + '_menu';
	if(!$(menuid)) {
		var div = document.createElement('div');
		div.id = ctrlobj.id + '_menu';
		div.className = 'tip tip_4';
		div.style.display = 'none';
		div.innerHTML = '<div class="tip_horn"></div><div class="tip_c">' + ctrlobj.getAttribute('tip') + '</div>';
		$('append_parent').appendChild(div);
	}
	$(ctrlobj.id).onmouseout = function () { hideMenu('', 'prompt'); };
	showMenu({'mtype':'prompt','ctrlid':ctrlobj.id,'pos':'12!','duration':2,'zindex':JSMENU['zIndex']['prompt']});
}

function showPrompt(ctrlid, evt, msg, timeout, classname) {
	var menuid = ctrlid ? ctrlid + '_pmenu' : 'ntcwin';
	var duration = timeout ? 0 : 3;
	if($(menuid)) {
		$(menuid).parentNode.removeChild($(menuid));
	}
	var div = document.createElement('div');
	div.id = menuid;
	div.className = !classname ? (ctrlid ? 'tip tip_js' : 'ntcwin') : classname;
	div.style.display = 'none';
	$('append_parent').appendChild(div);
	if(ctrlid) {
		msg = '<div id="' + ctrlid + '_prompt"><div class="tip_horn"></div><div class="tip_c">' + msg + '</div>';
	} else {
		msg = '<table cellspacing="0" cellpadding="0" class="popupcredit"><tr><td class="pc_l">&nbsp;</td><td class="pc_c"><div class="pc_inner">' + msg +
			'</td><td class="pc_r">&nbsp;</td></tr></table>';
	}
	div.innerHTML = msg;
	if(ctrlid) {
		if(!timeout) {
			evt = 'click';
		}
		if($(ctrlid)) {
			if($(ctrlid).evt !== false) {
				var prompting = function() {
					showMenu({'mtype':'prompt','ctrlid':ctrlid,'evt':evt,'menuid':menuid,'pos':'210'});
				};
				if(evt == 'click') {
					$(ctrlid).onclick = prompting;
				} else {
					$(ctrlid).onmouseover = prompting;
				}
			}
			showMenu({'mtype':'prompt','ctrlid':ctrlid,'evt':evt,'menuid':menuid,'pos':'210','duration':duration,'timeout':timeout,'zindex':JSMENU['zIndex']['prompt']});
			$(ctrlid).unselectable = false;
		}
	} else {
		showMenu({'mtype':'prompt','pos':'00','menuid':menuid,'duration':duration,'timeout':timeout,'zindex':JSMENU['zIndex']['prompt']});
		$(menuid).style.top = (parseInt($(menuid).style.top) - 100) + 'px';
	}
}
function _showCreditPrompt() {
	var notice = getcookie('creditnotice').split('D');
	var basev = getcookie('creditbase').split('D');
	var creditrule = decodeURI(getcookie('creditrule', 1)).replace(String.fromCharCode(9), ' ');
	if(!discuz_uid || notice.length < 2 || notice[9] != discuz_uid) {
		setcookie('creditnotice', '');
		setcookie('creditrule', '');
		return;
	}
	var creditnames = creditnotice.split(',');
	var creditinfo = [];
	var e;
	for(var i = 0; i < creditnames.length; i++) {
		e = creditnames[i].split('|');
		creditinfo[e[0]] = [e[1], e[2]];
	}
	creditShow(creditinfo, notice, basev, 0, 1, creditrule);
}

function creditShow(creditinfo, notice, basev, bk, first, creditrule) {
	var s = '', check = 0;
	for(i = 1; i <= 8; i++) {
		v = parseInt(Math.abs(parseInt(notice[i])) / 5) + 1;
		if(notice[i] !== '0' && creditinfo[i]) {
			s += '<span>' + creditinfo[i][0] + (notice[i] != 0 ? (notice[i] > 0 ? '<em>+' : '<em class="desc">') + notice[i] + '</em>' : '') + creditinfo[i][1] + '</span>';
		}
		if(notice[i] > 0) {
			notice[i] = parseInt(notice[i]) - v;
			basev[i] = parseInt(basev[i]) + v;
		} else if(notice[i] < 0) {
			notice[i] = parseInt(notice[i]) + v;
			basev[i] = parseInt(basev[i]) - v;
		}
		if($('hcredit_' + i)) {
			$('hcredit_' + i).innerHTML = basev[i];
		}
	}
	for(i = 1; i <= 8; i++) {
		if(notice[i] != 0) {
			check = 1;
		}
	}
	if(!s || first) {
		setcookie('creditnotice', '');
		setcookie('creditbase', '');
		setcookie('creditrule', '');
		if(!s) {
			return;
		}
	}
	if(!$('creditpromptdiv')) {
		showPrompt(null, null, '<div id="creditpromptdiv">' + (creditrule ? '<i>' + creditrule + '</i> ' : '') + s + '</div>', 0);
	} else {
		$('creditpromptdiv').innerHTML = s;
	}
	setTimeout(function () {hideMenu(1, 'prompt');$('append_parent').removeChild($('ntcwin'));}, 1500);
}

function _showColorBox(ctrlid, layer, k, bgcolor) {
	var tag1 = !bgcolor ? 'color' : 'backcolor', tag2 = !bgcolor ? 'forecolor' : 'backcolor';
	if(!$(ctrlid + '_menu')) {
		var menu = document.createElement('div');
		menu.id = ctrlid + '_menu';
		menu.className = 'p_pop colorbox';
		menu.unselectable = true;
		menu.style.display = 'none';
		var coloroptions = ['Black', 'Sienna', 'DarkOliveGreen', 'DarkGreen', 'DarkSlateBlue', 'Navy', 'Indigo', 'DarkSlateGray', 'DarkRed', 'DarkOrange', 'Olive', 'Green', 'Teal', 'Blue', 'SlateGray', 'DimGray', 'Red', 'SandyBrown', 'YellowGreen', 'SeaGreen', 'MediumTurquoise', 'RoyalBlue', 'Purple', 'Gray', 'Magenta', 'Orange', 'Yellow', 'Lime', 'Cyan', 'DeepSkyBlue', 'DarkOrchid', 'Silver', 'Pink', 'Wheat', 'LemonChiffon', 'PaleGreen', 'PaleTurquoise', 'LightBlue', 'Plum', 'White'];
		var colortexts = ['黑色', '赭色', '暗橄榄绿色', '暗绿色', '暗灰蓝色', '海军色', '靛青色', '墨绿色', '暗红色', '暗桔黄色', '橄榄色', '绿色', '水鸭色', '蓝色', '灰石色', '暗灰色', '红色', '沙褐色', '黄绿色', '海绿色', '间绿宝石', '皇家蓝', '紫色', '灰色', '红紫色', '橙色', '黄色', '酸橙色', '青色', '深天蓝色', '暗紫色', '银色', '粉色', '浅黄色', '柠檬绸色', '苍绿色', '苍宝石绿', '亮蓝色', '洋李色', '白色'];
		var str = '';
		for(var i = 0; i < 40; i++) {
			str += '<input type="button" style="background-color: ' + coloroptions[i] + '"' + (typeof setEditorTip == 'function' ? ' onmouseover="setEditorTip(\'' + colortexts[i] + '\')" onmouseout="setEditorTip(\'\')"' : '') + ' onclick="'
			+ (typeof wysiwyg == 'undefined' ? 'seditor_insertunit(\'' + k + '\', \'[' + tag1 + '=' + coloroptions[i] + ']\', \'[/' + tag1 + ']\')' : (ctrlid == editorid + '_tbl_param_4' ? '$(\'' + ctrlid + '\').value=\'' + coloroptions[i] + '\';hideMenu(2)' : 'discuzcode(\'' + tag2 + '\', \'' + coloroptions[i] + '\')'))
			+ '" title="' + colortexts[i] + '" />' + (i < 39 && (i + 1) % 8 == 0 ? '<br />' : '');
		}
		menu.innerHTML = str;
		$('append_parent').appendChild(menu);
	}
	showMenu({'ctrlid':ctrlid,'evt':'click','layer':layer});
}

function _toggle_collapse(objname, noimg, complex, lang) {
	var obj = $(objname);
	if(obj) {
		obj.style.display = obj.style.display == '' ? 'none' : '';
		var collapsed = getcookie('collapse');
		collapsed = updatestring(collapsed, objname, !obj.style.display);
		setcookie('collapse', collapsed, (collapsed ? 2592000 : -2592000));
	}
	if(!noimg) {
		var img = $(objname + '_img');
		if(img.tagName != 'IMG') {
			if(img.className.indexOf('_yes') == -1) {
				img.className = img.className.replace(/_no/, '_yes');
				if(lang) {
					img.innerHTML = lang[0];
				}
			} else {
				img.className = img.className.replace(/_yes/, '_no');
				if(lang) {
					img.innerHTML = lang[1];
				}
			}
		} else {
			img.src = img.src.indexOf('_yes.gif') == -1 ? img.src.replace(/_no\.gif/, '_yes\.gif') : img.src.replace(/_yes\.gif/, '_no\.gif');
		}
		img.blur();
	}
	if(complex) {
		var objc = $(objname + '_c');
		if(objc) {
			objc.className = objc.className == 'umh' ? 'umh umn' : 'umh';
		}
	}

}

function _extstyle(css) {
	if(!$('css_extstyle')) {
		loadcss('extstyle');
	}
	$('css_extstyle').href = css ? css + '/style.css' : STATICURL + 'image/common/extstyle_none.css';
	currentextstyle = css;
	setcookie('extstyle', css, 86400 * 30);
	if($('css_widthauto') && !$('css_widthauto').disabled) {
		CSSLOADED['widthauto'] = 0;
		loadcss('widthauto');
	}
}

function _widthauto(obj) {
	var strs = ['切换到宽版', '切换到窄版'];
	if($('css_widthauto')) {
		CSSLOADED['widthauto'] = 1;
	}
	if(!CSSLOADED['widthauto'] || $('css_widthauto').disabled) {
		if(!CSSLOADED['widthauto']) {
			loadcss('widthauto');
		} else {
			$('css_widthauto').disabled = false;
		}
		HTMLNODE.className += ' widthauto';
		setcookie('widthauto', 1, 86400 * 30);
		obj.innerHTML = strs[1];
		obj.title = strs[1];
	} else {
		$('css_widthauto').disabled = true;
		HTMLNODE.className = HTMLNODE.className.replace(' widthauto', '');
		setcookie('widthauto', -1, 86400 * 30);
		obj.innerHTML = strs[0];
		obj.title = strs[0];
	}
	hideMenu();
}

function _showCreditmenu() {
	if(!$('extcreditmenu_menu')) {
		menu = document.createElement('div');
		menu.id = 'extcreditmenu_menu';
		menu.style.display = 'none';
		menu.className = 'p_pop';
		menu.innerHTML = '<div class="p_opt"><img src="'+ IMGDIR + '/loading.gif" width="16" height="16" class="vm" /> 请稍候...</div>';
		$('append_parent').appendChild(menu);
		ajaxget($('extcreditmenu').href, 'extcreditmenu_menu', 'ajaxwaitid');
	}
	showMenu({'ctrlid':'extcreditmenu','ctrlclass':'a','duration':2});
}

function _showUpgradeinfo() {
	if(!$('g_upmine_menu')) {
		menu = document.createElement('div');
		menu.id = 'g_upmine_menu';
		menu.style.display = 'none';
		menu.className = 'p_pop';
		menu.innerHTML = '<div class="p_opt"><img src="'+ IMGDIR + '/loading.gif" width="16" height="16" class="vm" /> 请稍候...</div>';
		$('append_parent').appendChild(menu);
		ajaxget('home.php?mod=spacecp&ac=usergroup&showextgroups=1', 'g_upmine_menu', 'ajaxwaitid');
	}
	showMenu({'ctrlid':'g_upmine','ctrlclass':'a','duration':2});
}

function _showForummenu(fid) {
	if($('fjump_menu') && !$('fjump_menu').innerHTML) {
		ajaxget('forum.php?mod=ajax&action=forumjump&jfid=' + fid, 'fjump_menu', 'ajaxwaitid');
	}
}

function _showUserApp(fid) {
	var menu = $('mn_userapp_menu');
	if(menu && !menu.innerHTML) {
		ajaxget('misc.php?mod=manyou&action=menu', 'mn_userapp_menu', 'ajaxwaitid');
	}
}

function _imageRotate(imgid, direct) {
	var image = $(imgid);
	if(!image.getAttribute('deg')) {
		var deg = 0;
		image.setAttribute('ow', image.width);
		image.setAttribute('oh', image.height);
		if(BROWSER.ie) {
			image.setAttribute('om', parseInt(image.currentStyle.marginBottom));
		}
	} else {
		var deg = parseInt(image.getAttribute('deg'));
	}
	var ow = image.getAttribute('ow');
	var oh = image.getAttribute('oh');
	deg = direct == 1 ? deg - 90 : deg + 90;
	if(deg > 270) {
		deg = 0;
	} else if(deg < 0) {
		deg = 270;
	}
	image.setAttribute('deg', deg);
	if(BROWSER.ie) {
		if(!isNaN(image.getAttribute('om'))) {
			image.style.marginBottom = (image.getAttribute('om') + (BROWSER.ie < 8 ? 0 : (deg == 90 || deg == 270 ? Math.abs(ow - oh) : 0))) + 'px';
		}
		image.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (deg / 90) + ')';
	} else {
	        switch(deg) {
			case 90:var cow = oh, coh = ow, cx = 0, cy = -oh;break;
			case 180:var cow = ow, coh = oh, cx = -ow, cy = -oh;break;
			case 270:var cow = oh, coh = ow, cx = -ow, cy = 0;break;
	        }
		var canvas = $(image.getAttribute('canvasid'));
		if(!canvas) {
			var i = document.createElement("canvas");
			i.id = 'canva_' + Math.random();
			image.setAttribute('canvasid', i.id);
			image.parentNode.insertBefore(i, image);
			canvas = $(i.id);
		}
		if(deg) {
			var canvasContext = canvas.getContext('2d');
			canvas.setAttribute('width', cow);
			canvas.setAttribute('height', coh);
			canvasContext.rotate(deg * Math.PI / 180);
			canvasContext.drawImage(image, cx, cy, ow, oh);
			image.style.display = 'none';
			canvas.style.display = '';
		} else {
			image.style.display = '';
			canvas.style.display = 'none';
		}
	}
}

function _createPalette(colorid, id, func) {
	var iframe = "<iframe name=\"c"+colorid+"_frame\" src=\"\" frameborder=\"0\" width=\"210\" height=\"148\" scrolling=\"no\"></iframe>";
	if (!$("c"+colorid+"_menu")) {
		var dom = document.createElement('span');
		dom.id = "c"+colorid+"_menu";
		dom.style.display = 'none';
		dom.innerHTML = iframe;
		$('append_parent').appendChild(dom);
	}
	func = !func ? '' : '|' + func;
	var url = /(?:https?:)?\/\//.test(STATICURL) ? STATICURL : SITEURL+STATICURL;
	window.frames["c"+colorid+"_frame"].location.href = url+"image/admincp/getcolor.htm?c"+colorid+"|"+id+func;
	showMenu({'ctrlid':'c'+colorid});
	var iframeid = "c"+colorid+"_menu";
	_attachEvent(window, 'scroll', function(){hideMenu(iframeid);});
}

function _setShortcut() {
	$('shortcuttip').onclick = function() {
		var msg = '1、点击"' + '<a href="javascript:;" class="xi2 xw1" ';
		msg += 'onclick="this.href = \'forum.php?mod=misc&action=shortcut\';this.click();saveUserdata(\'setshortcut\', 1);"';
		msg += '>下载桌面快捷</a>' + '"，下载完成后，可移动文件到系统桌面<br />';
		msg += '2、点击"' + '<a href="forum.php?mod=misc&action=shortcut&type=ico" class="xi2 xw1">';
		msg += '下载ICO图标</a>' + '"，下载完成后，右击桌面快捷文件->属性->更改图标，选择已下载的ICO图标即可';
		showDialog(msg, 'notice', '添加桌面快捷');
	};

	$('shortcutcloseid').onclick = function() {
		$('shortcut').style.display = 'none';
		saveUserdata('setshortcut', 2);
	};

	this.height = 0;
	this.shortcut = $('shortcut');
	this.shortcut.style.overflow = 'hidden';
	this.shortcut.style.display = 'block';
	this.autozoomin = function() {
		var maxheight = 30;
		this.height += 5;
		if(this.height >= maxheight) {
			this.shortcut.style.height = maxheight + 'px';
			return;
		}
		this.shortcut.style.height = this.height + 'px';
		setTimeout(this.autozoomin, 50);
	};
	this.autozoomin();
};
///<jscompress sourcefile="v3.js" />
!function(){"use strict";function e(e){return e===undefined||null===e}function t(e){return e!==undefined&&null!==e}function n(e){return null!==e&&"object"===(void 0===e?"undefined":p(e))}function r(e){return"object"===(void 0===e?"undefined":p(e))&&e instanceof HTMLElement}function o(e){var t=e&&e.toString().match(/^\s*function (\w+)/);return t?t[1]:""}function i(){return new RegExp("MSIE (\\d+\\.\\d+);").test(navigator.userAgent),parseFloat(RegExp.$1)||Infinity}function a(e,t){for(var n in t)e[n]=t[n];return e}function c(e){var t=Object.create(null);return function(n){return t[n]||(t[n]=e(n))}}function u(e){return h.call(e).slice(8,-1)}function s(e){var t="";throw t=-1===e.toString().indexOf("VAPTCHA error")?"VAPTCHA error:"+e:e,new Error(t)}function Promise(e){var t=this;this.state="pending",this.value=undefined,this.reason=undefined,this.onResolveAsyncCallbacks=[],this.onRejectAsyncCallbacks=[];var n=function(e){"pending"===t.state&&(t.state="fulfilled",t.value=e,t.onResolveAsyncCallbacks.map(function(e){return e()}))},r=function(e){"pending"===t.state&&(t.state="rejected",t.reason=e,t.onRejectAsyncCallbacks.map(function(t){return t(e)}))};try{e(n,r)}catch(o){r(o)}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function f(){var e=navigator.language||navigator.userLanguage;return"zh-CN"===e?"zh-CN":"zh-TW"===e?"zh-TW":e.includes("en",-1)?"en":e.includes("ja",-1)?"jp":"zh-CN"}window.HTMLElement=window.HTMLElement||Element,Array.prototype.map||(Array.prototype.map=function(e,t){var n,r,o;if(null==this)throw new TypeError(" this is null or not defined");var i=Object(this),a=i.length>>>0;if("[object Function]"!=Object.prototype.toString.call(e))throw new TypeError(e+" is not a function");for(t&&(n=t),r=new Array(a),o=0;o<a;){var c,u;o in i&&(c=i[o],u=e.call(n,c,o,i),r[o]=u),o++}return r}),Array.prototype.includes||(Array.prototype.includes=function(e,t){if(null==this)throw new TypeError('"this" is null or not defined');var n=Object(this),r=n.length>>>0;if(0===r)return!1;for(var o=0|t,i=Math.max(o>=0?o:r-Math.abs(o),0);i<r;){if(n[i]===e)return!0;i++}return!1}),Array.prototype.findIndex||(Array.prototype.findIndex=function(e){if(null==this)throw new TypeError('"this" is null or not defined');var t=Object(this),n=t.length>>>0;if("function"!=typeof e)throw new TypeError("predicate must be a function");for(var r=arguments[1],o=0;o<n;){if(e.call(r,t[o],o,t))return o;o++}return-1}),Object.create||(Object.create=function(e){var t=function(){};return t.prototype=e,new t});var d={vid:null,scene:0,container:null,type:"float",style:"dark",lang:"auto",ai:!0,https:!0,guide:!0,aiAnimation:!1,protocol:"https://",css_version:"2.2.5",cdn_servers:["statics.vaptcha.com"],api_server:"api.vaptcha.com/v3",canvas_path:"/canvas.min.js",offline_server:""},p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h=Object.prototype.toString,v=(c(function(e){for(var t={},n=e&&-1!==e.indexOf("?")&&e.split("?")[1]||window.location.search.substring(1),r=n.split("&"),o=0;o<r.length;o++){var i=r[o].split("=");t[decodeURIComponent(i[0])]=decodeURIComponent(i[1])}return t}),c(function(e){return e.charAt(0).toUpperCase()+e.slice(1)})),m=function(t){this.data=t,this.valiudateFuns=[],this.ruleFuns={required:function(t,n){return e(t)||0===t.length?n:null}}};m.prototype={constructor:m,addValidateRules:function(e){a(this.ruleFuns,e)},add:function(e,t,n){var r=this,o=t.split(":"),i=o.shift(),a=this.ruleFuns[i];o.unshift(this.data[e]),o.push(n),a&&this.valiudateFuns.push(function(){return a.apply(r,o)})},validate:function(){for(var e,t=0;e=this.valiudateFuns[t++];){var n=e();if(n)return s(n),!1}return!0}};var y={AccessDenied:"0101",RefreshAgain:"0102",Success:"0103",Fail:"0104",RefreshTooFast:"0105",RefreshTanto:"0106",DrawTanto:"0107",Attack:"0108",jsonpTimeOut:"0703",challengeExpire:"1002"};Promise.prototype.then=function(e){var t=this;if("fulfilled"===this.state){var r=e(this.value);if(n(r)&&"Promise"===o(r.constructor))return r}return"pending"===this.state?new Promise(function(r){t.onResolveAsyncCallbacks.push(function(){var i=e(t.value);if(n(i)&&"Promise"===o(i.constructor))return i.then(r);r(i)})}):this},Promise.prototype["catch"]=function(e){return"rejected"===this.state&&e(this.reason),"pending"===this.state&&this.onRejectAsyncCallbacks.push(e),this},Promise.resolve=function(e){return new Promise(function(t){t(e)})},Promise.reject=function(e){return new Promise(function(t,n){n(e)})};var g=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),w=function(){function e(){l(this,e)}return g(e,[{key:"GenerateFP",value:function(){var e=document.createElement("canvas"),t=e.getContext("2d"),n="http://www.vaptcha.com/";t.textBaseline="top",t.font="14px 'Arial'",t.textBaseline="tencent",t.fillStyle="#f60",t.fillRect(125,1,62,20),t.fillStyle="#069",t.fillText(n,2,15),t.fillStyle="rgba(102, 204, 0, 0.7)",t.fillText(n,4,17);var r=e.toDataURL(),o=r.replace("data:image/png;base64,","");return this.bin2hex(atob(o).slice(-16,-12))}},{key:"bin2hex",value:function(e){for(var t="",n=0;n<e.length;n++){var r=e.charCodeAt(n);t+=this.byte2Hex(r>>8&255),t+=this.byte2Hex(255&r)}return t}},{key:"byte2Hex",value:function(e){return e<16?"0"+e.toString():e.toString()}}]),e}(),b=new w,C=function(){var e=d.protocol,t=d.api_server,n=function(e){var t="";for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t+="&"+n+"="+encodeURIComponent(e[n]));return t},r=function(r,o){var i=n(o),a=r.indexOf("http://")>-1||r.indexOf("https://")>-1;return r.indexOf("?")<0&&(i="?"+i.slice(1)),a?""+r+i:""+e+t+r+i},o=function(e){var t=document.getElementsByTagName("head")[0],n=document.createElement("script");return n.charset="UTF-8",n.src=e,t.appendChild(n),{remove:function(){t.removeChild(n)}}},i=function(e,t,n){return t=t||{},n=n||!1,new Promise(function(i){if(n){var c=setTimeout(function(){clearTimeout(c),u.remove(),i()},5e3);window["static"]=function(){clearTimeout(c),i.apply(this,arguments),u.remove()};var u=o(e)}else{var s="VaptchaJsonp"+(new Date).valueOf();window[s]&&(s+="1"),a(t,{callback:s,device:b.GenerateFP()}),e=r(e,t);var l=o(e),f=setTimeout(function(){clearTimeout(f),window[s]=null,l.remove(),i({code:"0703",msg:"Time out,Refresh Again!"})},1e4);window[s]=function(){clearTimeout(f),i.apply(this,arguments),l.remove(),window[s]=null}}})};return i.setConfig=function(n){e=n.protocol||e,t=n.api_server||t},i}(),T={getConfig:function(e){return C("/config",{id:e.vid,type:e.type,scene:e.scene||0})},refresh:function(e){return C("/refresh",e)},click:function(e){return C("/click",e)},get:function(e){return C("/get",e)},verify:function(e){return C("/verify",e)},userbehavior:function(e){return C("/userbehavior",e)},staticConfig:function(e){return C(e.protocol+"channel.vaptcha.net/config/"+e.id,{},!0)},lang:function(e){return C("http://localhost:8080/api/v1/lang",{},!1)}},j={en:{"0201":"id empty","0202":"id error","0208":"scene error","0209":"request used up","0906":"params error","0702":"domain does not match","0105":"refresh too fast,please wait"},"zh-CN":{"0702":"验证单元与域名不匹配","0105":"刷新过快,请稍后再试。"}},A=function(){function o(){var e=navigator.language||navigator.userLanguage;return"zh-CN"===e?"zh-CN":"zh-TW"===e?"zh-TW":e.includes("en",-1)?"en":e.includes("ja",-1)?"jp":"zh-CN"}var c=!1,l=function(e){var t=new m(e);return t.add("offline_server","required","please configure offline_server"),t.validate(),a(e,{js_path:"vaptcha-sdk-downtime.2.0.3.js",api_server:window.location.host,protocol:window.location.protocol+"//",mode:"offline"}),C.setConfig(e),C(e.offline_server,{offline_action:"get",vid:e.vid}).then(function(t){return t.code!==y.Success?(s(j[t.msg]||t.msg),Promise.reject(t.code)):(a(e,t),Promise.resolve())})},f=function(e){return T.staticConfig({protocol:e.protocol,id:"offline"==e.mode?"offline":e.vid}).then(function(e){return Promise.resolve(e)})},d=function(e){return f(e).then(function(t){return t.state?Promise.reject("5001: VAPTCHA cell error"):t.offline_state?""==e.offline_server?Promise.reject("5002: offline_server not configured"):(a(e,{mode:"offline",offline_key:t.offline_key}),l(e)):""==t.api?Promise.reject("5003: error about channel"):(a(e,{api_server:t.api,offline_key:t.offline_key}),C.setConfig(e),T.getConfig(e))}).then(function(t){if(!t)return Promise.resolve();if(t.code!==y.Success){var n=j[e.lang]||j["zh-CN"];return"0702"===t.msg?alert("VAPTCHA error: "+n[t.msg]):"0105"===t.code&&alert("VAPTCHA error: "+n[t.code]),s(n[t.msg]||t.msg),Promise.reject(t.code)}return a(e,t.data),Promise.resolve()})},p=function(e,t){return""+e.protocol+e.cdn_servers[0]+"/"+t},h=function(t){var n=document.getElementsByTagName("head")[0],r=document.getElementById("vaptcha_style");return new Promise(function(o){e(r)?(r=document.createElement("link"),a(r,{rel:"stylesheet",type:"text/css",href:t,id:"vaptcha_style",onload:o}),n&&n.appendChild(r)):o()})},g=function A(e){var n=document.getElementsByTagName("head")[0],r=document.querySelector("script[src='"+e+"']");return new Promise(function(o){if(t(r))return void(r.loaded?o():setTimeout(function(){return A(e).then(o)}));r=document.createElement("script");var i=function(){r.readyState&&"loaded"!==r.readyState&&"complete"!==r.readyState||(o(),r.loaded=!0,r.onload=null,r.onreadystatechange=null)};a(r,{async:!0,charset:"utf-8",src:e,onerror:function(){return s("load sdk timeout")},onload:i,onreadystatechange:i}),n.appendChild(r)})},w=function _(e){var t=e.sdkName,n=e.config,r=p(n,"js/"+n.js_path);return g(r).then(function(){var e="downtime"==t?"DownTime":v(t),r=window["_"+e+"Vaptcha"],o=new r(n);return o.vaptcha.resetCaptcha=function(e,t){a(n,t),_({sdkName:e,config:n}).then(function(e){o.destroy(),o.options=e.options,o.vaptcha=e.vaptcha,e.render(),"character"===n.mode&&["click","float","popup"].includes(n.type)&&e.vaptcha.dtClickCb({target:e.vaptcha.btnDiv})})},Promise.resolve(o)})},b=function(e){if("auto"===e.lang||""===e.lang){var t=o();e.lang=t||"zh-CN"}c=!0,e.https=!0,e.protocol="https://",C.setConfig(e),!["embed","popup","invisible"].includes(e.type)&&(e.type="popup"),i()<9&&g(p(e,e.canvas_path));var a=new m(e);if(a.addValidateRules({elementOrSelector:function(t,o){if("String"===u(e.container)&&(e.container=document.querySelector(e.container)),n(e.container)&&r(e.container[0])&&(e.container=e.container[0]),!r(e.container))return o}}),a.add("vid","required","please configure vid"),"invisible"!==e.type&&a.add("container","elementOrSelector","5004: please configure container with element or selector"),a.validate())return d(e).then(function(){var t=e.https?"css/theme_https."+e.css_version+".css":"css/theme."+e.css_version+".css",n=p(e,t);return h(n)}).then(function(){var t="offline"==e.mode?"downTime":e.mode,n=t||e.type;return c=!1,w({sdkName:n,config:e})})};return function S(e){return new Promise(function(t){c?setTimeout(function(){S(e).then(t)},1e3):b(e).then(t)})["catch"](function(e){return c=!1,s(e),Promise.reject(e)})}}(),_=function(){var e=function(e){var n=e.getAttribute("data-config"),r={};if(t(n))try{r=JSON.parse(n)}catch(o){s("dom config format error")}return r},n=function(e){var n=e.getAttribute("data-vid");return t(n)?{vid:n}:{}},r=function(e,n){var r=Object.create(d);r.container=e,a(r,n),t(r.vid)&&A(r).then(function(e){e.renderTokenInput(),e.render()})};return function(){for(var t=document.querySelectorAll("[data-vid]"),o=document.querySelectorAll("[data-config]"),i=0;i<o.length;i++){var a=e(o[i]);r(o[i],a)}for(var c=0;c<t.length;c++)if(!Array.prototype.includes.call(o,t[c])){var u=n(t[c]);r(t[c],u)}}}();window.onload=_,window.vaptcha=function(e){var t=Object.create(d);return a(t,e),("auto"===t.lang||""===t.lang)&&(t.lang=f()||"zh-CN"),A(t)}}();;
