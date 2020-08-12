package.path = "/opt/tankserver/embedded/share/lua/5.2/?.lua;" .. package.path
package.cpath = "/opt/tankserver/embedded/lib/lua/5.2/?.so;" .. package.cpath

local lua_dir = '/data/autodeploy'
package.path = lua_dir.."/?.lua;"..package.cpath

json = require("cjson.safe")

function json2lua(file_name)
    print(file_name)
    local cfg_file = require(file_name)
    data = json.encode(cfg_file)
    local json_file_name = string.lower(file_name)..".json"

    print(json_file_name,"   updated")
    write_file(json_file_name, data)
end

function write_file(file_name,string)
    local f = io.open(file_name, 'w+')
    f:write(string)
    f:close()
end

local luacfgname = arg[1]
json2lua(luacfgname)
