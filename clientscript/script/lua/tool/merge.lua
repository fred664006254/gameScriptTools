package.path = "/opt/tankserver/embedded/share/lua/5.2/?.lua;" .. package.path
package.cpath = "/opt/tankserver/embedded/lib/lua/5.2/?.so;" .. package.cpath
json = require("cjson.safe")

local lua_dir = '/Users/publish/h5/gt_h5/config'
local target_json_dir = '/Users/publish/h5/gt_h5/client/trunk/PalaceWar/resource/config/json/'
local cfg_md5_mark_path = '/Users/publish/h5/gt_h5/clientscript/script/lua/tool/cfg_md5_mark'

if arg[1]=="tag" then
    lua_dir="/Users/publish/h5/gt_h5/client/trunk/config"
    target_json_dir="/Users/publish/h5/gt_h5/client/trunk/config/json/"
elseif arg[1] and arg[2] then
    lua_dir=arg[1]
    target_json_dir=arg[2]
end
print("config:",lua_dir)
print("topath:",target_json_dir)
function excute_cmd(cmd)
    local t = io.popen(cmd)
    local ret = t:read("*all")
    return ret
end

local svnv = excute_cmd("svnversion -c "..lua_dir.." |sed 's/^.*://' |sed 's/[A-Z]*$//'");
svnv=tonumber(svnv);

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
    if language== "cn" and svnv then
        big_json.v=svnv;
    end
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
    print(file_name)
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
        vipGiftCfg=1,
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


package.path = lua_dir.."/?.lua;"..package.cpath

local mergePath = {
    ['cn'] = {lua_dir, target_json_dir.."gameconfig_cn.json", target_json_dir.."gameconfig_cn_new.json"},
    ['tw'] = {lua_dir, target_json_dir.."gameconfig_tw.json", target_json_dir.."gameconfig_tw_new.json"},
    ['kr'] = {lua_dir, target_json_dir.."gameconfig_kr.json", target_json_dir.."gameconfig_kr_new.json"},
    ['en'] = {lua_dir, target_json_dir.."gameconfig_en.json", target_json_dir.."gameconfig_en_new.json"},
    ['cn_xl'] = {lua_dir, target_json_dir.."gameconfig_xl.json", target_json_dir.."gameconfig_xl_new.json"},
    ['cn_xy'] = {lua_dir, target_json_dir.."gameconfig_xy.json", target_json_dir.."gameconfig_xy_new.json"},
    ['th'] = {lua_dir, target_json_dir.."gameconfig_th.json", target_json_dir.."gameconfig_th_new.json"},
    ['cn_mm'] = {lua_dir, target_json_dir.."gameconfig_mm.json", target_json_dir.."gameconfig_mm_new.json"},  
    ['ru'] = {lua_dir, target_json_dir.."gameconfig_ru.json", target_json_dir.."gameconfig_ru_new.json"}, 
    -- ['cn_zhijin'] = {lua_dir, target_json_dir.."gameconfig_zjly.json", target_json_dir.."gameconfig_zjly_new.json"},
-- ['cn_wx'] = {lua_dir, target_json_dir.."gameconfig_wx.json", target_json_dir.."gameconfig_wx_new.json"},
}

local jsonStr = get_file(target_json_dir.."gameconfig_cn.json")
local jsonData = json.decode(jsonStr)
local isSameVersion=false;
if jsonData.v then
    if svnv==jsonData.v then
        isSameVersion=true;
        print('config已经是最新的，无需生成')
    else
        print("有新的配置，旧版本:",jsonData.v,"新版本号:",svnv);
    end
else
    print("json没有版本，需要生成新的配置，新的版本号",svnv);
end

if isSameVersion==false then
    for language,v in pairs(mergePath) do
        lua2bigJson(language, v)
    end
end
