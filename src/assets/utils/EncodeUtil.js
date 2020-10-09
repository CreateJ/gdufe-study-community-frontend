// HTML转义，符号转换成代码
export function HTMLEncode(html) {
  var temp = document.createElement("div");
  temp.textContent != null
    ? (temp.textContent = html)
    : (temp.innerText = html);
  var output = temp.innerHTML;
  temp = null;
  return output;
}
// var tagText = "<p><b>123&456</b></p>";
// console.log(HTMLEncode(tagText));
// &lt;p&gt;&lt;b&gt;123&amp;456&lt;/b&gt;&lt;/p&gt;

// HTML反转义，代码转符号
export function HTMLDecode(text) {
  var temp = document.createElement("div");
  temp.innerHTML = text;
  var output = temp.innerText || temp.textContent;
  temp = null;
  return output;
}
// console.log(encodeText);
// &lt;p&gt;&lt;b&gt;123&amp;456&lt;/b&gt;&lt;/p&gt;
// console.log(HTMLDecode(encodeText)); 
//<p><b>123&456</b></p>