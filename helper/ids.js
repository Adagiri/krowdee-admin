export function makeid(length) {
  var result = [];
  var characters =
    "ABCD383EF90182GHI090JKLMN01234OPQRSTUVWXYZa6789bc384def8394ghijklmnopqrstuvwxyz0145";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}
