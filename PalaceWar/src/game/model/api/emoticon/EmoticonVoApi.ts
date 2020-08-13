/**
 * 表情包Api
 * author yangchengguo
 * date 2019.8.12
 * @class EmoticonVoApi
 */
class EmoticonVoApi extends BaseVoApi{

    public emoticonVo:EmoticonVo = null;
    public emoticonData1:Config.EmoticonCfgItem[] = [];

    public constructor() {
		super();
    }

    public formatData(data:any):void{
        if(this.emoticonVo == null)
		{
			this.emoticonVo = new EmoticonVo();
		}
		this.emoticonVo.initData(data);
        super.formatData(data);
    }

    //表情分组
    public getEmotiocnGroupId(){
        let typeArr = this.cfg.emoticonTypeArr;
        //判断表情包系列开关
        let groupList:number[] = [];
        for (let i=0; i < typeArr.length; i++){
            if (Api.switchVoApi.checkEmoticonGroupOpen(typeArr[i])){
                groupList.push(typeArr[i]);
            }
        }
        let recentId = this.getRecentEmoticonId();
        App.LogUtil.log("getEmotiocnGroupId:"+recentId + " recentId.length:"+recentId.length);
        if (recentId && recentId.length > 0 && groupList[0] != 0){
            App.LogUtil.log("recentid **:"+recentId);
            groupList.unshift(0);
        }
        groupList.sort((a, b) => { return a - b});
        return groupList;
    }

    //是否已获得表情
    public isGetEmoticon(id:string):boolean{
        let data = this.emoticonVo.emoticonId;
        for (let key in data){
            if (data[key] == id){
                return true;
            }
        }
        return false;
    }

    //表情数据排序
    public sortEmoticonData(data:any[], groupId:number):Config.EmoticonCfgItem[]{
        for (let i=0; i < data.length; i++){
            if (data[i].unlock == 1){ //已解锁
                data[i].sortId = Number(data[i].id) - data.length + 1;
                data[i].status = 1;
            }
            else if (data[i].unlock == 2){ //活动解锁
                if (this.emoticonVo.emoticonId && this.isGetEmoticon(data[i].id)){
                    data[i].sortId = Number(data[i].id) - data.length + 1;
                    data[i].status = 1;
                }
                else{
                    data[i].sortId = Number(data[i].id) + data.length + 1;
                    data[i].status = 0;
                }
            }
            else if (data[i].unlock == 3){ //官职解锁
                let level = Api.playerVoApi.getPlayerLevel();
                if (level >= data[i].need){
                    data[i].sortId = Number(data[i].id) - data.length + 1;
                    data[i].status = 1;
                }
                else{
                    data[i].sortId = Number(data[i].id) + data.length + 1;
                    data[i].status = 0;
                }
            }
            else if (data[i].unlock == 4){ //vip解锁
                let level = Api.playerVoApi.getPlayerVipLevel();
                if (level >= data[i].need){
                    data[i].sortId = Number(data[i].id) - data.length + 1;
                    data[i].status = 1;
                }
                else{
                    data[i].sortId = Number(data[i].id) + data.length + 1;
                    data[i].status = 0;
                }
            }
        }
        if (groupId != 0){
            data.sort((a, b)=>{ return a.sortId - b.sortId});
        }
        return data;
    }

    //判断表情是否已解锁
    public isEmoticonUnlock(id:string):boolean{
        let emoticonList = this.cfg.emoticonList;
        let data = emoticonList[id];
        if (data){
            if (data.unlock == 1){ //已解锁
                return true;
            }
            else if (data.unlock == 2){ //活动解锁
                if (this.emoticonVo.emoticonId && this.isGetEmoticon(data.id)){
                   return true;
                }
                else{
                    return false;
                }
            }
            else if (data.unlock == 3){ //官职解锁
                let level = Api.playerVoApi.getPlayerLevel();
                if (level >= data.need){
                    return true;
                }
                else{
                    return false;
                }
            }
            else if (data.unlock == 4){ //vip解锁
                let level = Api.playerVoApi.getPlayerVipLevel();
                if (level >= data.need){
                    return true;
                }
                else{
                    return false;
                }
            }
        }
        return false;
    }

    //获取排序后的数据
    public getSortEmoticonDataByGroup(group:number):any[]{
        if (group != 0){
            let dataList:any[] = [];
            let emoticonList = this.cfg.emoticonList;
            for (let key in emoticonList){
                let data = emoticonList[key];
                if ( data.group == group){
                    dataList.push(data);
                }
            }
            return this.sortEmoticonData(dataList, group);
        }
        else{
            let emoticonData = this.getRecentEmoticonData();
            return this.sortEmoticonData(emoticonData, group);
        }
    }

    //最近使用
    public setRecentEmoticon(id:string){
        let key = "emoticon"+ Api.playerVoApi.getPlayerID();
        let value = LocalStorageManager.get(key);
        if (value){
            let idArr = this.getRecentEmoticonId();
            for (let i = 0; i < idArr.length; i++){
                if (idArr[i] == id){
                    idArr.splice(i, 1);
                    break;
                }
            }
            if (idArr.length >= 10){
                idArr.shift();
            }
            idArr.push(id);
            let idStr = "";
            for (let i = 0; i< idArr.length; i++){
                idStr = idStr + idArr[i] + "-";
            }
            let str = idStr.substring(0, idStr.length - 1);
            LocalStorageManager.set(key, String(str));
        }
        else{
            LocalStorageManager.set(key, String(id));
        }
    }

    //最近使用id
    public getRecentEmoticonId():string[]{
        let key = "emoticon"+ Api.playerVoApi.getPlayerID();
        let emoticonId = LocalStorageManager.get(key);
        let idArr:string[] = [];
        App.LogUtil.log("getRecentEmoticonId:"+emoticonId);
        if (emoticonId && emoticonId != ""){
            idArr = emoticonId.split("-");
        }
        return idArr;
    }

    //最近使用数据
    public getRecentEmoticonData():any[]{
        let idArr = this.getRecentEmoticonId();
        let dataList:any[] = [];
        let emoticonList = this.cfg.emoticonList;
        for (let i= idArr.length - 1; i >= 0; i--){
            for (let key in emoticonList){
                let data = emoticonList[key];
                if (data.id == idArr[i]){
                    dataList.push(data);
                }
            }
        }
        return dataList;
    }

    //聊天主页面字符转化
    public chatStrChangeLocal(msg:string):string{
        if (msg == ""){
            return "";
        }
        let strArr = msg.split("-");
        let searchIndex = msg.search(GameData.emoticonMsgStr);
        if (strArr.length > 1 && searchIndex >= 0){
            let str = msg.substring(searchIndex, searchIndex+GameData.emoticonMsgStr.length + 5);
            let desStr = LanguageManager.getlocal("emoticonChatShowMsg");
            let s = msg.replace(str, desStr);
            return s;
        }
        return msg;
    }

    //聊天转表情
    public chatStrChangeToEmoticon(msg:string):string{
        let strArr = msg.split("-");
		if (strArr.length == 2){
            let searchIndex = strArr[0].search(GameData.emoticonMsgStr);
            if (searchIndex == 0 ){
                return strArr[1];
            }
        }
        return null;
    }

    //聊天未解锁提示
    public getEmoticonUnlockMsg(id:string):string{
        let data = this.cfg.getEmoticonCfgById(id);
        let str = "";
        if (data.unlock == 2){
            //活动解锁
            str = LanguageManager.getlocal("emoticonUnlockActicity");
        }
        else if (data.unlock == 3){
            //官职解锁
            let officalStr = LanguageManager.getlocal("officialTitle"+data.need);
            str = LanguageManager.getlocal("emoticonUnlockOffical", [officalStr]);
        }
        else if (data.unlock == 4){
            //vip解锁
            str = LanguageManager.getlocal("emoticonUnlockVip", [String(data.need)]);
        }
        return str;
    }

    public get vo():EmoticonVo{
        return this.emoticonVo;
    }

    public get cfg(){
        return Config.EmoticonCfg;
    }
    
    public dispose():void{

        super.dispose();
    }

}