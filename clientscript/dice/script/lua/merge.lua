-- package.path = "/opt/tankserver/embedded/share/lua/5.2/?.lua;" .. package.path
-- package.cpath = "/usr/local/lib/lua/?.so;" .. package.cpath
-- json = require "cjson";

function lua2bigJson(language,pathinfo)
    local originpath = pathinfo[1]
    local targetname = pathinfo[2]

    local big_json = get_dir_files(language,originpath)
    local data = json.encode(big_json)
    write_file(targetname, data)

    print(targetname,"   updated")
end

function get_dir_files(language, dir_path)
    local cmd = "cd "..dir_path.."&& ls"
    local s = io.popen(cmd)
    local fileLists = s:read("*all")
    local big_json = {}
    local start_pos = 0

    while true do
        local nouse,end_pos,file_name = string.find(fileLists, "([^\n\r]+.lua)", start_pos)
        if not end_pos then
            break
        end

        local tmp_file_name = string.sub(file_name, 0, -5)
        if is_need_modify(language, "", tmp_file_name) then
            local big_json_key = string.lower(tmp_file_name)

            local configCfg = require('configCfg') --读取该语言内部配置
            if configCfg[tmp_file_name] and configCfg[tmp_file_name][language] then
                tmp_file_name = language.."."..tmp_file_name
            end

            local cfg_file = require(tmp_file_name)
            big_json[big_json_key] = cfg_file
        end

        start_pos = end_pos + 1
    end

    return big_json
end

function write_file(file_name,string)
    local f = io.open(file_name, 'w+')
    f:write(string)
    f:close()
end

function get_file(file_name)
    local f = io.open(file_name, 'r')
    local string = f:read("*all")
    f:close()
    return string
end

function get_md5_mark()
    local md5_marks = get_file(cfg_md5_mark_path)
    return json.decode(md5_marks)
end

function is_need_modify(language,file_path, file_name)
    if filter_cfg(file_name) then return false end

    return true
end

function md5(file_path)
    local cmd = "md5sum "..file_path
    local s = io.popen(cmd)
    return s:read("*all")
end

function filter_cfg(file_name)
    local no_write_cfg = {
        baseCfg=1,
        configCfg=1,
        config=1,
        debugCfg=1,
        interfaceCfg=1,
        modelCfg=1,
        responseCfg=1,
        formulaCfg=1,
        initCfg=1,
        gameCfg=1,
        giftby3kCfg=1,
        giftbyFkylcCfg=1,
        giftbyWbCfg=1,
        giftbyzjCfg=1,
        newUserGuidMails=1,
        rechargeCfg=1,
        orderCfg=1,
        responsecfg=1,
        platMappingCfg=1,
        errorCodeCfg=1,
        extraRechargeCfg=1,
        childNameCfg=1,
        lampInfoCfg=1,
    }
    if no_write_cfg[file_name] then return true end
    return false
end

local lua_dir = '/Users/develop/h5/宫廷H5/config'
local target_json_dir = '/Users/develop/h5/宫廷H5/client/trunk/Dice/resource/config/json/'
local cfg_md5_mark_path = '/data/autodeploy/tool/cfg_md5_mark'
-- package.path = lua_dir.."/?.lua;"..package.cpath

local mergePath = {
    ['cn'] = {lua_dir, target_json_dir.."gameconfig_cn.json"},
    ['tw'] = {lua_dir, target_json_dir.."gameconfig_tw.json"},
    ['kr'] = {lua_dir, target_json_dir.."gameconfig_kr.json"},
    ['sf'] = {lua_dir, target_json_dir.."gameconfig_sf.json"},
}

for language,v in pairs(mergePath) do
    lua2bigJson(language, v)
end