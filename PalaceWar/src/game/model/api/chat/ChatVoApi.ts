/**
 * 聊天系统api
 * author dky
 * date 2017/9/26
 * @class ChallengeVoApi
 */

enum TransType {
    World = 1,
    Alliance,
    Pri,
    Cross,
	CrossAc
}

class ChatVoApi extends BaseVoApi
{
	private chatVo:ChatVo;
	private chatblockVo:ChatblockVo
	private _lastMessage:string = "";
	public _lastTime:number=0;
	private _chatID = 0;
	public _lastAllianceId:number=0;
	private _isRead : boolean = false;
	//私聊
	public prichatVoObj:any = {};
	public priOldObj:any[] = [];
	//跨服聊天
	public crossVoObj:any[] = [];
	public crossOldObj:any[] = [];
	//跨服活动聊天
	public accrossVoObj:any[] = [];
	public accrossOldObj:any[] = [];
	//赛季阵营聊天
	public accrossVoObjSeason:any[] = [];
	public accrossOldSeasonObj:any[] = [];
	public constructor() {
		super();
	}

	public formatData2(data:any):void
	{
		if(this.chatblockVo == null)
		{
			let className:string = this.getClassName();
			let voClassName:string = "ChatblockVo";
			let voClass:any = egret.getDefinitionByName(voClassName);
			
			this.chatblockVo = new voClass();
			// this.chatblockVo.initData(data);
			this[App.StringUtil.firstCharToLower(voClassName)] = this.chatblockVo;
		}
		this.chatblockVo.initData(data);
	}

	public getChatBlockVo() :ChatblockVo
    {
        return this.chatblockVo;
    }
	public getIsBlock(uid) :boolean
    {
        for (var index = 0; index < this.chatblockVo.info.length; index++) {
			var element = this.chatblockVo.info[index];
			if(element == uid)
			{
				return true;
			}
		}
		return false;
    }

    public getChatList() :any[]
    {
        return this.chatVo?this.chatVo.chatVoObj:[];
	}
	
	public getWorldList() :any[]
    {
        return this.chatVo?this.chatVo.worldVoObj:[];
	}

	//除去分享
	public getWorldList1() :any[]
    {	
		let array:any[] = [];
		if (this.chatVo && this.chatVo.worldVoObj)
		{
			for (let key in this.chatVo.worldVoObj)
			{
				let item:any = this.chatVo.worldVoObj[key];
				if (item.content && !item.content.stype)
				{
					array.push(item);
				}
			}
		}
		return array;
	}

	//分享
	public getWorldList2() :any[]
    {
        let array:any[] = [];
		if (this.chatVo && this.chatVo.worldVoObj)
		{
			for (let key in this.chatVo.worldVoObj)
			{
				let item:any = this.chatVo.worldVoObj[key];
				if (item.content && item.content.stype)
				{
					array.push(item);
				}
			}
		}
		return array;
	}
	
	public getAllianceList() :any[]
    {
        return this.chatVo?this.chatVo.allianceVoObj:[];
	}

	public getCrossList() :any[]
    {
		let arr = [];
		this.crossVoObj.sort((a,b)=>{
			return a.ts - b.ts;
		});
		for(let i in this.crossVoObj){
			let unit = this.crossVoObj[i];
			if(this.getIsBlock(unit.sender)){
				continue;
			}
			else{
				arr.push(unit);
			}
		}
		return arr;
	}

	public getacCrossList() :any[]
    {
		let arr = [];
		this.accrossVoObj.sort((a,b)=>{
			return a.ts - b.ts;
		});
		for(let i in this.accrossVoObj){
			let unit = this.accrossVoObj[i];
			if(this.getIsBlock(unit.sender)){
				continue;
			}
			else{
				arr.push(unit);
			}
		}
		return arr;
	}

	public getacCrossSeasonList() :any[]
    {
		let arr = [];
		this.accrossVoObjSeason.sort((a,b)=>{
			return a.ts - b.ts;
		});
		for(let i in this.accrossVoObjSeason){
			let unit = this.accrossVoObjSeason[i];
			if(this.getIsBlock(unit.sender)){
				continue;
			}
			else{
				arr.push(unit);
			}
		}
		return arr;
	}
	
	
	/*---------------------获取数据接口------------------------------ */
	//object深度复制，规避js原有的引用传递
	public object_clone(source: Object): any {
		let data: Object = {};
		for (let key in source) {
			if (source[key] == null) {
				continue;
			}

			if (this.getType(source[key]) == 'object') {
				data[key] = this.object_clone(source[key]);
			}
			else if (this.getType(source[key]) == "array") {
				data[key] = this.arr_clone(source[key]);
			}
			else {
				data[key] = source[key];
			}
		}

		return data;
	}

	//arr深度复制,对所有复杂arr均有效，规避js原有的引用传递
	public arr_clone(source) {
		let destination: any = [];
		for (let key in source) {
			let p = parseInt(key);
			if (this.getType(source[p]) == "array") {
				destination[p] = [];
				arguments.callee(destination[p], source[p]);
			}
			else if (this.getType(source[p]) == "object") {
				destination[p] = {};
				destination[p] = this.object_clone(source[p]);
			}
			else {
				destination[p] = source[p];
			}
		}
		return destination;
	}

	public getType(o) {
		let _t;
		return ((_t = typeof (o)) == "object" ? o == null && "null" || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
	}
	
	public getTabChatList() :any[]
    {
		let arr = [];
		let obj =this.prichatVoObj;
		for(let i in obj){
			if(this.getIsBlock(i)){
				continue;
			}
			let unit : any = obj[i];
			let key_arr = Object.keys(unit.content);
			if(unit && key_arr.length){
				key_arr.sort((a,b)=>{
					return Number(a) - Number(b)
				});
				arr.push({
					content : {
						title : unit.title,
						headBg : unit.headBg,
						pic : unit.pic,
						message : unit.content[key_arr[key_arr.length - 1]].message,
						hideVip : unit.hideVip,
						vip : unit.vip
					},
					sender : i,
					sendername : unit.name,
					updated_at : unit.updated_at
				});
			}
			else{
				arr.push({});
			}
			
		}
		arr.sort((a,b)=>{
			return b.updated_at - a.updated_at;
		});
		return arr;
	}

	public getCrossChatList() :any[]
    {
		return this.crossVoObj;
	}
	/*
	* uid 作为唯一标识属性 {
		'10002147' : {
			chattext : {//消息记录
				1 : {message : '', sender : ''},
				2 : {},
			},
			info : 1002147的玩家相关信息
		}
	}
	*/
	public setCrossChatList(data : any) : void{
		//crosschat
		for(let unit of data.crosschat){
			let oneVo:any = {
				content : {
					headBg : unit.headBg,
					message : unit.content,
					pic : unit.pic, 
					title : unit.title,
					vip : unit.vip,
					hideVip : unit.hideVip
				},
				sender : unit.uid,
				sendername : unit.name,
				ts : unit.ts,
				chattype : 'cross',
				zoneid : unit.zid,
				seq : unit.seq,
				transType : TransType.Cross
			};
			for (let key in this.crossOldObj)
			{
				let oneOld:any = this.crossOldObj[key];
				if (oneOld.sender == oneVo.sender && oneOld.ts == oneVo.ts && oneOld.content.trans)
				{
					oneVo.content.trans = oneOld.content.trans;
					break;
				}
			}

			this.crossVoObj.push(oneVo);
		}
		this.crossVoObj.sort((a,b)=>{
			return a.ts - b.ts;
		});
		this._isRead = false;
	}

	public setAccrossChatList(data):void{
		for(let unit of data.crosschat){
			let oneVo:any = {
				content : {
					headBg : unit.headBg,
					message : unit.content,
					pic : unit.pic, 
					title : unit.title,
					vip : unit.vip,
					hideVip : unit.hideVip
				},
				sender : unit.uid,
				sendername : unit.name,
				ts : unit.ts,
				chattype : 'cross',
				zoneid : unit.zid,
				seq : unit.seq,
				transType : TransType.CrossAc,
				kingdom : unit.kingdom,
				lastroundRank : unit.lastroundRank
			};
			
			for (let key in this.accrossOldObj)
			{
				let oneOld:any = this.accrossOldObj[key];
				if (oneOld.sender == oneVo.sender && oneOld.ts == oneVo.ts && oneOld.content.trans)
				{
					oneVo.content.trans = oneOld.content.trans;
					break;
				}
			}
			this.accrossVoObj.push(oneVo);

		}
		this.accrossVoObj.sort((a,b)=>{
			return a.ts - b.ts;
		});
		this._isRead = false;
	}

	public setAccrossChatSeasonList(data):void{
		for(let unit of data.crosschat){
			let oneVo:any = {
				content : {
					headBg : unit.headBg,
					message : unit.content,
					pic : unit.pic, 
					title : unit.title,
					vip : unit.vip,
					hideVip : unit.hideVip
				},
				sender : unit.uid,
				sendername : unit.name,
				ts : unit.ts,
				chattype : 'cross',
				zoneid : unit.zid,
				seq : unit.seq,
				transType : TransType.CrossAc,
				kingdom : unit.kingdom,
				lastroundRank : unit.lastroundRank
			};
			
			for (let key in this.accrossOldSeasonObj)
			{
				let oneOld:any = this.accrossOldSeasonObj[key];
				if (oneOld.sender == oneVo.sender && oneOld.ts == oneVo.ts && oneOld.content.trans)
				{
					oneVo.content.trans = oneOld.content.trans;
					break;
				}
			}
			this.accrossVoObjSeason.push(oneVo);

		}
		this.accrossVoObjSeason.sort((a,b)=>{
			return a.ts - b.ts;
		});
		this._isRead = false;
	}


	public getPriChatList(uid) :any[]
    {
		let arr = [];
		if(this.getIsBlock(uid)){
			return arr;
		}
		let obj = this.prichatVoObj;
		if(obj && obj[uid]){
			let chatobj = obj[uid];
			let key_arr = Object.keys(chatobj.content);
			key_arr.sort((a,b)=>{
				return Number(a) - Number(b)
			});
			for(let j in key_arr){
				let sortid = key_arr[j];
				let unit = chatobj.content[sortid];
				let isself = unit.sender == Api.playerVoApi.getPlayerID();
				arr.push({
					content : {
						title : isself ? Api.playerVoApi.getTitleInfo() : chatobj.title,
						headBg : isself ? Api.playerVoApi.getPlayerPtitle() : chatobj.headBg,
						pic : isself ? Api.playerVoApi.getPlayePicId() : chatobj.pic,
						vip :isself ? Api.playerVoApi.getPlayerVipLevel() : chatobj.vip,
						message : unit.message,
						ket : chatobj.ket,
						ts : unit.ts,
						trans : unit.trans,
						hideVip : chatobj.hideVip
					},
					sender : unit.sender,
					sendername : unit.sendername,
					transType : TransType.Pri
				});
			}
		}
		return arr;
	}
	/*
	* uid 作为唯一标识属性 {
		'10002147' : {
			chattext : {//消息记录
				1 : {message : '', sender : ''},
				2 : {},
			},
			info : 1002147的玩家相关信息
		}
	}
	*/
	public setPriChatList(data : any) : void{
		for(let i in data){
			// if(this.getIsBlock(i)){
			// 	continue;
			// }
			let unit = data[i];
			let temp = this.prichatVoObj[i];
			if(!temp){
				this.prichatVoObj[i] = {
					content : {},
				};
				// this.chatVo.prichatVoObj[i].info = unit.
			}
			//填写用户信息
			for(let j in unit){
				if(j != 'content'){
					this.prichatVoObj[i][j] = unit[j];
				}
			}
			//填写聊天历史
			for(let k in unit.content){
				let text = unit.content[k];
				if(!this.prichatVoObj[i].content[k]){
					this.prichatVoObj[i].content[k] = text;
				}
			}
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_PRICHAT_FRESHVIEW);
	}

	private arr2obj(arr: Array<any>, key: string): any {
		let obj: any = {};
		if (arr) {
			let ln = arr.length;

			if (ln) {
				for (let i = 0; i < ln; i++) {
					let cd: any = arr[i];
					obj[cd[key]] = cd;
				}
			}
		}
		return obj;
    }

	public setPriTrans(trans:string,info:any):void
	{	
		
		for (let key in this.prichatVoObj[info.sender].content)
		{
			let oneVo:any = this.prichatVoObj[info.sender].content[key];
			if (oneVo.sender == info.sender && oneVo.ts == info.content.ts )
			{
				oneVo.trans = trans;
				break;
			}
		}
	}

	public clearPriChatList():void{
		this.priOldObj = this.prichatVoObj;
		for(let i in this.prichatVoObj){
			this.prichatVoObj[i] = null;
			delete this.prichatVoObj[i];
		}
		this.prichatVoObj = {};
	}

	public clearCrossChatList():void{
		this.crossOldObj = this.crossVoObj;
		this.crossVoObj = [];
	}

	public clearAcCrossChatList():void{
		this.accrossOldObj = this.accrossVoObj;
		this.accrossVoObj = [];
	}

	public clearAcCrossChatSeasonList():void{
		this.accrossOldSeasonObj = this.accrossVoObjSeason;
		this.accrossVoObjSeason = [];
	}


	public judgeIsHaveNewMsg(uid, time):boolean{
		let count = 0;
		let obj = this.prichatVoObj[uid];
		if(obj){
			let unit = obj.content;
			for(let i in unit){
				let element = unit[i];
				if(!this.getIsBlock(uid) && element.ts >= time && element.isread == 0 && element.sender != Api.playerVoApi.getPlayerID()){
					++ count;
				}
			}
		}
		return count > 0;
	}

	public isNewMsg():boolean{
		let obj = this.getpublicRedhot();
		return Object.keys(obj).length > 0;
	}

	private getpublicRedhot():any{
		let unread = {};
		for(let i in this.prichatVoObj){
			if(this.getIsBlock(i)){
				continue;
			}
			let count = 0;
			let unit = this.prichatVoObj[i].content;
			for(let j in unit){
				if(unit[j].sender != Api.playerVoApi.getPlayerID() && unit[j].isread == 0){
					++ count;
				}
			}
			if(count){
				unread[i] = count;
			}
		}
		return unread;
	}

	public setMsgRead(uid):void{
		let data = this.prichatVoObj[uid];
		if(data && data.content){
			for(let i in data.content){
				data.content[i].isread = 1;
			}
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_PRICHAT_FRESHVIEW);
		}
	}

	public getUnreadMsgNum(uid?:any):number{
		let unread = this.getpublicRedhot();
		let count = 0;
		if(uid){
			count = unread[uid] || 0;
		}
		else{
			for(let i in unread){
				count += unread[i];
			}
		}
		return count;
	}

	public setLastMessage(message:string)
    {
        this._lastMessage = message;
    }

	public refreshLastMessage()
    {
		if(Api.playerVoApi.getPlayerAllianceId() == 0 && this.chatVo && this.chatVo.worldVoObj.length > 0){
			let data = this.chatVo.worldVoObj[this.chatVo.worldVoObj.length - 1];
			let titleStr = LanguageManager.getlocal("chatWorldTitle");
			let messageStr = data.content.message;
			if (Api.chatVoApi.isShieldEmoji())
			{
				messageStr = Api.chatVoApi.checkShieldEmoji(messageStr);
				if (messageStr == "")
				{
					messageStr = LanguageManager.getlocal("chatEmojiShield")
				}
			}


			let chatMesaage =titleStr + "<font color="+ TextFieldConst.COLOR_LIGHT_YELLOW +  ">" + data.sendername + "</font>"+ ":" + messageStr;
			this._lastMessage = chatMesaage;
		}

    }
	public getLastMessage() :string
    {
        return this._lastMessage;
	}
	
	public getChatSign() :string
    {	
		this._chatID ++;
        return this._chatID.toString() + GameData.serverTime + Api.playerVoApi.getPlayerID().toString();
    }

	public clearChat()
    {
		if(this.chatVo){
			this.chatVo.worldVoObj = [];
			this.chatVo.chatVoObj = [];
			this.chatVo.allianceVoObj = [];
		}
	
	}
	
	public getLabaNum():number{
		//1651
		return Api.itemVoApi.getItemNumInfoVoById(1651);
	}

	public getLastCrossMessage():any{
		let obj = this.crossVoObj;
		obj.sort((a,b)=>{
			return b.ts - a.ts;
		});
		for(let i in obj){
			if(this.getIsBlock(obj[i].sender)){
				continue;
			}
			else{
				return obj[i];
			}
		}
		return null;
	}

	public getLastAcCrossMessage():any{
		let obj = this.accrossVoObj;
		obj.sort((a,b)=>{
			return b.ts - a.ts;
		});
		for(let i in obj){
			if(this.getIsBlock(obj[i].sender)){
				continue;
			}
			else{
				return obj[i];
			}
		}
		return null;
	}

	public getLastAcCrossMessageSeason():any{
		let obj = this.accrossVoObjSeason;
		obj.sort((a,b)=>{
			return b.ts - a.ts;
		});
		for(let i in obj){
			if(this.getIsBlock(obj[i].sender)){
				continue;
			}
			else{
				return obj[i];
			}
		}
		return null;
	}

	public getIsReadCross():boolean{
		return this._isRead;
	}

	public setIsReadCross(flag):void{
		this._isRead = flag;
	}

	public checkMianUIRedDot():boolean
	{	
		if (Api.chatVoApi.isNewMsg())
		{
			return true;
		}
		// for (let i:number = 0;i<3;i++)
		// {
		// 	let lastTime:number = Api.chatVoApi.getLastTime(i);
		// 	if (lastTime == -1)
		// 	{
		// 		continue;
		// 	}
		// 	else
		// 	{	
		// 		let localtime:number = 0;
		// 		let t:string = LocalStorageManager.get(LocalStorageConst.LOCAL_CHAT_LASTTIME+Api.playerVoApi.getPlayerID()+"_chat"+i);
		// 		if(!t || t == "")
		// 		{
		// 			// continue;
		// 		}
		// 		else
		// 		{	
		// 			localtime = Number(t);
		// 		}
		// 		if (lastTime > localtime)
		// 		{
		// 			return true;
		// 		}
		// 	}
		// }
		return false;
	}

	public getLastTime(type:number):number
	{
		let time:number = -1;

		let chatVo:any = null;
		if (type ==0)
		{
			let tempAarry:any[] =  Api.chatVoApi.getWorldList1();
			if (tempAarry.length>0)
			{
				chatVo = tempAarry[tempAarry.length-1];
			}
		}
		else if (type ==1)
		{
			let tempAarry:any[] =  Api.chatVoApi.getWorldList2();
			if (tempAarry.length>0)
			{
				chatVo = tempAarry[tempAarry.length-1];
			}
		}
		else
		{
			let tempAarry:any[] =  Api.chatVoApi.getAllianceList();
			if (tempAarry.length>0)
			{
				chatVo = tempAarry[tempAarry.length-1];
			}
		}
		if (chatVo)
		{	
			time = chatVo.ts || chatVo.content.ts;
		}

		return time;
	}

	/**
	 * 检测对话是否需要触发告警统计
	 * @param chatStr 对话内容
	 */
	public checkShieldAndReportChat(chatStr:string):void
	{
		Config.ShieldCfg.checkShieldReport(chatStr);
	}

	public isShieldEmoji():boolean
	{	
		// return true;
		if (App.DeviceUtil.isRuntime2() && App.DeviceUtil.isIOS())
		{
			return true;
		}
		return false;
	}

	public checkShieldEmoji(name:string):string
	{	
		if (this.isShieldEmoji())
		{	
			//name = name.replace(/[\u2190-\u21FF]|[\u2600-\u26FF]|[\u2700-\u27BF]|[\u3000-\u303F]|[\u1F300-\u1F64F]|[\u1F680-\u1F6FF]/g, "");
			//name = name.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");

			let regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
			name = name.replace(regStr, "");
		}
		return name;
	}

	public checkHasEmoji(name:string):boolean
	{	
		let oldName = name;
		name = this.checkShieldEmoji(name);

		return oldName != name;
	}

	public dispose():void
	{
		this.chatVo = null;
		this._lastMessage = "";
		this._lastTime = null;
		this.chatblockVo = null;
		this.prichatVoObj = null;
		this.crossVoObj = [];
		this.crossOldObj = [];
		this.priOldObj = []
		this.accrossVoObj = [];
		this.accrossOldObj = [];
		this.accrossVoObjSeason = [];
		this.accrossOldSeasonObj = [];
		super.dispose();
	}
}