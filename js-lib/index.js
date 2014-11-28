#!/usr/bin/env node

var fs = require('fs'),
    sys = require('sys'),
    path = require('path'),
    color = require('./color'),
    showdown = require('./showdown'),
    np = require('./parse'),
    _ = require('underscore'),
    argv = process.argv.slice(2, process.argv.length);

var index = _.template(fs.readFileSync(__dirname + '/templates/index.html', 'utf-8')),
    doc = _.template(fs.readFileSync(__dirname + '/templates/doc.html', 'utf-8')),
    stylesheet = _.template(fs.readFileSync(__dirname + '/templates/style.css', 'utf-8'));

try {
    var p = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

    if (!p.author) {
        console.log('You should specify an author in your package.json!');
    }

    p.author = np.parsePerson(p.author);

    if (!p.contributors) p.contributors = [];
    if (!p.dependencies) p.dependencies = {};
    p.contributors = p.contributors.map(np.parsePerson);

} catch(e) {
    console.log(e);
    console.error('ERROR: Trouble reading package.json');
    process.exit(1);
}

try {
    var readme = showdown.encode(fs.readFileSync('README.md', 'utf-8'));
} catch(e) {
    var readme = '';
    console.error('README.md not found');
}

/*
try {
    var docPages = fs.readdirSync('doc').map(function(f) {
        return f.replace('.md', '.html');
    });

    fs.readdirSync('doc').map(function(f) {
        var docHtml = showdown.encode(fs.readFileSync('doc/' + f, 'utf-8'));
        fs.writeFileSync('_site/doc/' + f.replace('.md', '.html'), doc({
            name: package.name,
            version: package.version,
            author: package.author.name ? package.author.name : package.author,
            authorUrl: package.author.url,
            year: (new Date()).getFullYear(),
            description: package.description,
            title: package.name +
                (package.description ? ' - ' + package.description : ''),
            doc: docHtml
        }), 'utf-8');
    });
} catch(e) {
    console.log('doc/ not found');
}
*/

var indexHtml = index({
    name: p.name,
    version: p.version,
    author: p.author,
    licenses: p.licenses,
    contributors: p.contributors,
    preferGlobal: p.preferGlobal,
    dependencies: p.dependencies,
    year: (new Date()).getFullYear(),
    description: p.description,
    title: p.name +
        (p.description ? ' - ' + p.description : ''),
    readme: readme
});

try { fs.mkdirSync('_site', 511); } catch(e) {}
try { fs.mkdirSync('_site/doc', 511); } catch(e) {}

fs.writeFileSync('_site/index.html', indexHtml, 'utf-8');
fs.writeFileSync('_site/style.css', stylesheet({
    baseColor: color.wordColor(p.name),
    lightColor: color.wordColor(p.name, 20, 90)
}), 'utf-8');
