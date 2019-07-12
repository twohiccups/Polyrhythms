function gcd(x, y) {
    var temp;
    while (y) {
        temp = y;
        y = x % y;
        x = temp;
    }
    return x;
}


function lcm(x, y) {
    return x * y / gcd(x, y);
}