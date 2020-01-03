var fortunes = [
    "Conquer you fears or they will conquer you.",
    "Rivers needs springs.",
    "Do not fear what you donot know.",
    "Whenever possible, keep it simple."
]


//全局变量输出的用法，
// 再模块外，可以访问到函数getFortune,数组完全隐藏起来
exports.getFortune = function(){
    var attr = Math.floor(Math.random() * fortunes.length);
    var randomFortune = fortunes[attr];
    return randomFortune;
}