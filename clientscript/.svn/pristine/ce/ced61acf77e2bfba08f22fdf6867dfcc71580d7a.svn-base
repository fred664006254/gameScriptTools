package.path = "/opt/tankserver/embedded/share/lua/5.2/?.lua;" .. package.path
package.cpath = "/opt/tankserver/embedded/lib/lua/5.2/?.so;" .. package.cpath
json = require("cjson.safe")

local md5_mark= {}
local is_need_publish

function json2lua(file_name)
	print(file_name)
	local cfg_file = require(file_name)
	data = json.encode(cfg_file)
	json_file_name = target_json_dir..string.lower(file_name)..".json"

	print(json_file_name,"   updated")
	write_file(json_file_name, data)
end

function get_dir_files(dir_path)
	local cmd = "cd "..dir_path.."&& ls"
	local s = io.popen(cmd)
	local fileLists = s:read("*all")	

	while true do
		local nouse,end_pos,file_name = string.find(fileLists, "([^\n\r]+.lua)", start_pos)
     	if not end_pos then 
            break
        end

		if is_need_modify(dir_path.."/"..file_name, file_name) then --如果md5不匹配
			local tmp_file_name = string.sub(file_name, 0, -5)
			is_need_publish = 1
			json2lua(tmp_file_name)
		end

		md5_mark[file_name] = md5(dir_path.."/"..file_name)
		start_pos = end_pos + 1
	end

	write_file(cfg_md5_mark_path, json.encode(md5_mark))
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

function is_need_modify(file_path, file_name)
	if filter_cfg(file_name) then return false end

	local new_data = md5(file_path)
	local ret = get_md5_mark()
	if not ret then return true end
	if not ret[file_name] then return true end
	if new_data~=ret[file_name] then return true end
	return false
end

function md5(file_path)
	local cmd = "md5sum "..file_path
	local s = io.popen(cmd)
	return s:read("*all")	
end

function filter_cfg(file_name)
	local tmp_file_name = string.sub(file_name, 0, -5)
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
	}
	if no_write_cfg[tmp_file_name] then return true end
	return false
end

function publish_json_to_client()
	if is_need_publish then
		local cmd = "cd "..target_json_dir.."&& svn cleanup"
		io.popen(cmd)

		local cmd = "cd "..target_json_dir.."&& svn unlock *"
		io.popen(cmd)

		local cmd = "cd "..target_json_dir.."&& svn add *"
		io.popen(cmd)

		local cmd = "cd "..target_json_dir.."&& svn commit -m '自动更新配置文件'"
		io.popen(cmd)

		local cmd = "cd "..target_json_dir.."&& svn lock *"
		io.popen(cmd)
	end
end

lua_dir = '/data/autodeploy/gt_config'
target_json_dir = '/data/autodeploy/gt_client/cfg/'
cfg_md5_mark_path = '/data/autodeploy/tool/cfg_md5_mark.json'
package.path = lua_dir.."/?.lua;"..package.cpath

get_dir_files(lua_dir)
--publish_json_to_client()
