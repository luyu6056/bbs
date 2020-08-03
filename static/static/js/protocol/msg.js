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
}