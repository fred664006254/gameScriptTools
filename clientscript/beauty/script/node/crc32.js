var shell = require('child_process');

var arguments = process.argv.splice(2);

function crc32(filepath)
{
    var result = shell.execSync("crc32 "+filepath);
    var crc32Value = result.toString().replace(/[\s ]+/g, '');
    console.log(crc32Value);
    return crc32Value;
}

module.exports={
    crc32:crc32,
};
if(arguments.length>0)
{
    crc32(arguments[0]);
}