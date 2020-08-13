--合并成大配置到前端

package.path = "/Users/lua_extension/?.lua;" .. package.path
package.cpath = "/Users/lua_extension/?.so;" .. package.cpath
json = require("json")

function lua2bigJson(language,pathinfo)
    local originpath = pathinfo[1]
    local targetname = pathinfo[2]
    local newspecialtarget = pathinfo[3]

    merge_old_files(language,originpath,targetname)
    print(targetname,"   updated")

    merge_new_special(language, newspecialtarget)
    print(newspecialtarget,"   updated")
end

function merge_old_files(language,originpath,targetname)
    local big_json = get_dir_files(language,originpath)
    local data = json.encode(big_json)
    write_file(targetname, data)
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

        local isNewCfgFile = find_file_by2(file_name)
        if not isNewCfgFile then
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

function find_file_by2(file_name)
    local nouse,end_pos,_ = string.find(file_name, "([a-zA-Z]_2)")
    if not end_pos then return false end
    return true
end

function filter_new_cfg(file_name)
    local newConfigCfg = require('newConfigCfg')
    if newConfigCfg[file_name] then return true end
    return false
end

function merge_new_special(language,targetname)
    local newConfigCfg = require('newConfigCfg')
    local newFiles = {}
    for fileName,newInfo in pairs(newConfigCfg) do
        if newInfo[language] then
            newFiles[fileName] = 1
        end
    end

    local newSpecialData = {}
    local configCfg = require('configCfg')
    for fileName,_ in pairs(newFiles) do
        local newFileName = fileName.."_2"

        local fileData
        if configCfg[fileName] and configCfg[fileName][language] then
            fileData = require(language.."."..newFileName)
        else
            fileData = require(newFileName)
        end
        local fileNameLower = string.lower(fileName)
        newSpecialData[fileNameLower]=fileData
    end

    local data = json.encode(newSpecialData)
    write_file(targetname, data)
end

local lua_dir = '../../../config'
local target_json_dir = './resource/config/json/'
package.path = lua_dir.."/?.lua;"..package.cpath

local mergePath = {
    ['cn'] = {lua_dir, target_json_dir.."gameconfig_cn.json", target_json_dir.."gameconfig_cn_new.json"},
    ['tw'] = {lua_dir, target_json_dir.."gameconfig_tw.json", target_json_dir.."gameconfig_tw_new.json"},
    ['kr'] = {lua_dir, target_json_dir.."gameconfig_kr.json", target_json_dir.."gameconfig_kr_new.json"},
    ['jp'] = {lua_dir, target_json_dir.."gameconfig_jp.json", target_json_dir.."gameconfig_jp_new.json"},
    ['cn_wx'] = {lua_dir, target_json_dir.."gameconfig_wx.json", target_json_dir.."gameconfig_wx_new.json"},
    ['vi'] = {lua_dir, target_json_dir.."gameconfig_vi.json", target_json_dir.."gameconfig_vi_new.json"},
    ['cn_wb'] = {lua_dir, target_json_dir.."gameconfig_wanba.json", target_json_dir.."gameconfig_wanba_new.json"},
    ['cn_wxapp'] = {lua_dir, target_json_dir.."gameconfig_wxapp.json", target_json_dir.."gameconfig_wxapp_new.json"},
    ['krnew'] = {lua_dir, target_json_dir.."gameconfig_krnew.json", target_json_dir.."gameconfig_krnew_new.json"},
    ['cn_jxh5'] = {lua_dir, target_json_dir.."gameconfig_jxh5.json", target_json_dir.."gameconfig_jxh5_new.json"},
    -- ['en'] = {lua_dir, target_json_dir.."gameconfig_en.json", target_json_dir.."gameconfig_en_new.json"},
    -- ['kr37'] = {lua_dir, target_json_dir.."gameconfig_kr37.json", target_json_dir.."gameconfig_kr37_new.json"},
    -- ['cn_xl'] = {lua_dir, target_json_dir.."gameconfig_xl.json", target_json_dir.."gameconfig_xl_new.json"},
}

for language,v in pairs(mergePath) do
    lua2bigJson(language, v)
end

