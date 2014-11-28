// It's like npm, but with semicolons!
module.exports.parsePerson = function(person) {
  if (typeof person !== "string") return person;
  var name = person.match(/^([^\(<]+)/),
      url = person.match(/\(([^\)]+)\)/),
      email = person.match(/<([^>]+)>/),
      obj = {};
  if (name && name[0].trim()) obj.name = name[0].trim();
  if (email) obj.email = email[1];
  if (url) obj.url = url[1];
  return obj;
};
