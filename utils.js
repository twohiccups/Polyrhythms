function gcd(x, y) {
    var temp;
    while (y) {
        temp = y;
        y = x % y;
        x = temp;
    }
    return x;
}


function lcm_two(x, y) {
    return x * y / gcd(x, y);
}

function lcm_array(ar) {
    return ar.reduce(lcm_two)
}