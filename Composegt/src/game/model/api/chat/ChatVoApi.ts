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
	//跨服聊天
	public crossVoObj:any[] = [];
	//跨服活动聊天
	public accrossVoObj:any[] = [];
	
	public _lastMsgst:number=0;//最新一条消息的时间戳
	public _lastAlliMsgst:number=0;//最新一条帮会消息的时间戳
	private _isNewAlliMsg:boolean = false;//是否有新消息
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
						titleLv: unit.titleLv,
						tlv: unit.tlv
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
			let contentData = {
					headBg : unit.headBg,
					message : unit.content,
					pic : unit.pic, 
					title : unit.title,
					vip : unit.vip,
					titleLv: unit.titleLv,
					tlv: unit.tlv,
				}
			if(unit.stype)
			{
				contentData['stype'] = unit.stype
			}if(unit.sinfo)
			{
				contentData['sinfo'] = unit.sinfo
			}
			this.crossVoObj.push({
				content : contentData,
				sender : unit.uid,
				sendername : unit.name,
				ts : unit.ts,
				chattype : 'cross',
				zoneid : unit.zid,
				seq : unit.seq
			});
		}
		this.crossVoObj.sort((a,b)=>{
			return a.ts - b.ts;
		});
		this._isRead = false;
	}

	public setAccrossChatList(data):void{
		for(let unit of data.crosschat){
			this.accrossVoObj.push({
				content : {
					headBg : unit.headBg,
					message : unit.content,
					pic : unit.pic, 
					title : unit.title,
					vip : unit.vip,
				},
				sender : unit.uid,
				sendername : unit.name,
				ts : unit.ts,
				chattype : 'cross',
				zoneid : unit.zid,
				seq : unit.seq
			});
		}
		this.accrossVoObj.sort((a,b)=>{
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
			let tlv = "1";
			let ttitleid = Api.playerVoApi.getTitleid();
			let titleInfo2:TitleInfoVo = Api.itemVoApi.getTitleInfoVoById(Number(ttitleid));
			if(titleInfo2){
				let itemCfg = titleInfo2.itemCfg ;
				if( itemCfg && itemCfg.emperorLvUpNeed && itemCfg.emperorLvUpNeed.length > 0 ){
					tlv = ""+titleInfo2.lv;
				}
			}
			for(let j in key_arr){
				let sortid = key_arr[j];
				let unit = chatobj.content[sortid];
				let isself = unit.sender == Api.playerVoApi.getPlayerID();
				let titleInfo:TitleInfoVo = Api.itemVoApi.getTitleInfoVoById(Number(Api.playerVoApi.getVipHeadID()));
				arr.push({
					content : {
						title : isself ? Api.playerVoApi.getTitleid() : chatobj.title,
						headBg : isself ? Api.playerVoApi.getVipHeadBg() : chatobj.headBg,
						pic : isself ? Api.playerVoApi.getPlayePicId() : chatobj.pic,
						vip :isself ? Api.playerVoApi.getPlayerVipLevel() : chatobj.vip,
						titleLv: isself ? (titleInfo ? titleInfo.lv : 0) : chatobj.titleLv,
						message : unit.message,
						ket : chatobj.ket,
						ts : unit.ts,
						tlv : isself ? tlv : chatobj.tlv,  
					},
					sender : unit.sender,
					sendername : unit.sendername,
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

    public getChatList() :any[]
    {
        return this.chatVo?this.chatVo.chatVoObj:[];
    }
	public getWorldList() :any[]
    {
		if(Api.otherInfoVoApi.getShareblock()==1)
		{
			return this.chatVo?this.chatVo.worldVoObj2:[]
		}
        return this.chatVo?this.chatVo.worldVoObj:[];
    }
	
	public getBlockWorldList() :any[]
    {
		
		return this.chatVo?this.chatVo.worldVoObj2:[]

    }

	 public getAllianceList() :any[]
    {
		if(Api.otherInfoVoApi.getAllianceShareblock()==1)
		{
			return this.chatVo?this.chatVo.allianceVoObj2:[]
		}
        return this.chatVo?this.chatVo.allianceVoObj:[];
    }
    	public clearPriChatList():void{
		for(let i in this.prichatVoObj){
			this.prichatVoObj[i] = null;
			delete this.prichatVoObj[i];
		}
		this.prichatVoObj = {};
	}

	public clearCrossChatList():void{
		this.crossVoObj = [];
	}

	public clearAcCrossChatList():void{
		this.accrossVoObj = [];
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
			let chatMesaage =titleStr + "<font color="+ TextFieldConst.COLOR_LIGHT_YELLOW +  ">" + data.sendername + "</font>"+ ":" + data.content.message;
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
	
	public getLabaNum():Number{
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
	public getIsReadCross():boolean{
		return this._isRead;
	}

	public setIsReadCross(flag):void{
		this._isRead = flag;
	}
	//最新的世界聊天时间戳
	public set lastPublicMsgst(st:number){
		this._lastMsgst = st
	}
	public get lastPublicMsgst(){
		 return this._lastMsgst;
	}

	//最新的帮会聊天时间戳
	public set lastAlliMsgst(st:number){
		this._lastAlliMsgst = st
	}
	public get lastAlliMsgst(){
		 return this._lastAlliMsgst;
	}

	//最新的帮会聊天时间戳
	public set isNewAlliMsg(st:boolean){
		this._isNewAlliMsg = st
	}
	public get isNewAlliMsg(){
		 return this._isNewAlliMsg;
	}
	/**
	 * 检测对话是否需要触发告警统计
	 * @param chatStr 对话内容
	 */
	public checkShieldAndReportChat(chatStr:string,channel):void
	{
		// Config.ShieldCfg.checkShieldReport(chatStr);
		StatisticsHelper.reportShieldChat(chatStr,channel);
	}

	public isShowRedForAllianeChat()
	{
		return Api.playerVoApi.firstCMDst() <= this.lastAlliMsgst && this.isNewAlliMsg;
	}
	public dispose():void
	{
		this.chatVo = null;
		this._lastMessage = "";
		this._lastTime = null;
		this.chatblockVo = null;
		this.prichatVoObj = null;
		this.crossVoObj = [];
		this._lastMsgst=0;//最新一条消息的时间戳
		this._lastAlliMsgst=0;//最新一条帮会消息的时间戳
		super.dispose();
	}
}