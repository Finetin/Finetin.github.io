// 获取浏览器唯一标识符
function cans() {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var txt = 'http://security.tencent.com/';
  ctx.textBaseline = 'top';
  ctx.font = '14px \'Arial\'';
  ctx.textBaseline = 'tencent';
  ctx.fillStyle = '#f60';
  ctx.fillRect(125, 1, 62, 20);
  ctx.fillStyle = '#069';
  ctx.fillText(txt, 2, 15);
  ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
  ctx.fillText(txt, 4, 17);

  var b64 = canvas.toDataURL().replace('data:image/png;base64,', '');
  var bin = atob(b64);
  var crc = bin2hex(bin.slice(-16, -12));
  // var crc = bin.slice(-16,-12);
//   alert(crc);
    return crc;

}

function bin2hex(str) {
  var result = '';
  for (i = 0; i < str.length; i++) {
    result += int16_to_hex(str.charCodeAt(i));
  }
  return result;
}

function int16_to_hex(i) {
  var result = i.toString(16);
  var j = 0;
  while (j + result.length < 4) {
    result = '0' + result;
    j++;
  }
  return result;
}

// 检验邮箱是否合法
function char_test(chr)
//字符检测函数
{
  var i;
  var smallch = 'abcdefghijklmnopqrstuvwxyz';
  var bigch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (i = 0; i < 26; i++)
    if (chr == smallch.charAt(i) || chr == bigch.charAt(i)) return (1);
  return (0);
}

function spchar_test(chr)
//数字和特殊字符检测函数
{
  var i;
  var spch = '_-.0123456789';
  for (i = 0; i < 13; i++)
    if (chr == spch.charAt(i)) return (1);
  return (0);
}

function email_test(str) {
  var i, flag = 0;
  var at_symbol = 0;
  //“@”检测的位置
  var dot_symbol = 0;
  //“.”检测的位置
  // if (char_test(str.charAt(0)) == 0) return (1);
  //首字符必须用字母

  for (i = 1; i < str.length; i++)
    if (str.charAt(i) == '@') {
      at_symbol = i;
      break;
    }
  //检测“@”的位置

  if (at_symbol == str.length - 1 || at_symbol == 0) return (2);
  //没有邮件服务器域名

  if (at_symbol < 3) return (3);
  //帐号少于三个字符

  if (at_symbol > 19) return (4);
  //帐号多于十九个字符

  for (i = 1; i < at_symbol; i++)
    if (char_test(str.charAt(i)) == 0 && spchar_test(str.charAt(i)) == 0)
      return (5);
  for (i = at_symbol + 1; i < str.length; i++)
    if (char_test(str.charAt(i)) == 0 && spchar_test(str.charAt(i)) == 0)
      return (5);
  //不能用其它的特殊字符

  for (i = at_symbol + 1; i < str.length; i++)
    if (str.charAt(i) == '.') dot_symbol = i;
  for (i = at_symbol + 1; i < str.length; i++)
    if (dot_symbol == 0 || dot_symbol == str.length - 1)
      //简单的检测有没有“.”，以确定服务器名是否合法
      return (6);

  return (0);
  //邮件名合法
}