/**
 * 联盟
 * author dky
 * date 2017/11/27
 * @class AllianceCreateView
 */
class AllianceCreateView extends CommonView
{

	private _child_wordbg:BaseBitmap;
	private _child_wordbgCor:BaseBitmap;
	private _childWordsText: BaseTextField;
	private _mainTaskHandKey:string = null;
	public constructor() 
	{
		super();
	}
	protected getRequestData():{requestType:string,requestData:any}
	{
		
		return {requestType:NetRequestConst.REQUEST_ALLIANCE_INITALLIANCE,requestData:{}};
	}
	public initView():void
	{
		Api.mainTaskVoApi.checkShowGuide();
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.checkData,this);

		let bottomBg = BaseBitmap.create("alliance_bg2");
		bottomBg.x = 0;
		bottomBg.y = -15;
		this.addChildToContainer(bottomBg);

		let npcPic = BaseLoadBitmap.create("servant_full_1031");
		npcPic.x = 0;
		npcPic.y = GameConfig.stageHeigth - this.container.y - 467;
		
		this.addChildToContainer(npcPic);

		this._child_wordbg = BaseBitmap.create("public_9_bg25");
		this._child_wordbg.x = 60;
		this._child_wordbg.y = npcPic.y - 100;
		this._child_wordbg.width = 320;
		this._child_wordbg.height = 78;
		if(PlatformManager.checkIsKRSp()){
			this._child_wordbg.height = 100;
		}
		this.addChildToContainer(this._child_wordbg);

		this._child_wordbgCor = BaseBitmap.create("public_9_bg25_tail");
		this._child_wordbgCor.x = 260;
		this._child_wordbgCor.y = this._child_wordbg.y + this._child_wordbg.height - 3;
		this.addChildToContainer(this._child_wordbgCor);

		let words = LanguageManager.getlocal("allianceCreateTip1");
		let myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
		if(myAllianceVo.nextt - GameData.serverTime > 0)
		{
			words = LanguageManager.getlocal("allianceMemberQuitNextT",[App.DateUtil.getFormatBySecond(myAllianceVo.nextt - GameData.serverTime,1)]);
		}

		this._childWordsText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		this._childWordsText.text = words;
		this._childWordsText.x = this._child_wordbg.x + 20;
		this._childWordsText.y = this._child_wordbg.y + 20;
		this._childWordsText.width = 280;
		this._childWordsText.height = 80;
		this.addChildToContainer(this._childWordsText);

		//按钮背景
		let btnBg:BaseBitmap = BaseBitmap.create("public_9_bg9");
		btnBg.width = 180;
		btnBg.height = 290;
		btnBg.x = 430;
		btnBg.y = npcPic.y + 120;
		this.addChildToContainer(btnBg);

		//创建按钮
		let createBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"allianceCreateCreateBtn",this.createHander,this);
		createBtn.x = btnBg.x + btnBg.width/2 - createBtn.width/2;
		createBtn.y = btnBg.y + 19 ;
		createBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(createBtn);

		//随机按钮
		let randomBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"allianceCreateRandomBtn",this.randomJoinHander,this);
		randomBtn.x = createBtn.x;
		randomBtn.y = createBtn.y + createBtn.height + 10 ;
		randomBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(randomBtn);


		//查询按钮
		let searchBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"allianceCreateSearchBtn",this.findHander,this);
		searchBtn.x = createBtn.x;
		searchBtn.y = randomBtn.y + randomBtn.height + 10 ;
		searchBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(searchBtn);

		//排行按钮
		let rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"allianceCreateRankBtn",this.rankHander,this);
		rankBtn.x = createBtn.x;
		rankBtn.y = searchBtn.y + searchBtn.height + 10 ;
		rankBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(rankBtn);

		let taskId = Api.mainTaskVoApi.getCurMainTaskId();
		let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
		if (taskId && taskCfg){
			if (taskCfg.questType == 604 || taskCfg.questType == 701 || taskCfg.questType == 702 || taskCfg.questType == 703){
				this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(
					this.container,
					randomBtn.x + randomBtn.width/2 - 10,
					randomBtn.y+ 10,
					[randomBtn],
					taskCfg.questType,
					true,
					function(){
						return true;
					},
					this,
				)
			}
		}
	}

	public tick()
	{
		let words = LanguageManager.getlocal("allianceCreateTip1");
		let myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
		if(myAllianceVo.nextt - GameData.serverTime > 0)
		{
			words = LanguageManager.getlocal("allianceMemberQuitNextT",[App.DateUtil.getFormatBySecond(myAllianceVo.nextt - GameData.serverTime,1)]);
		}
		this._childWordsText.text = words;
	}

	private checkData()
	{
		if(Api.playerVoApi.getPlayerAllianceId() >0&& NetManager.curReceiveCmd != NetRequestConst.REQUEST_ALLIANCE_JOINRANDALLIANCE){
			this.hide();
		}	
	}

	private createHander()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCECREATEPOPUPVIEW,{callback:this.creatCallback,handler:this});
	}
	private randomJoinHander()
	{
		let myAllianceVo = Api.allianceVoApi.getMyAllianceVo();
		if(myAllianceVo.nextt - GameData.serverTime > 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceJoinTip"));
			return;
		}
		if(Api.allianceVoApi.isShowConfirmWhenJoin() ){
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				title:"itemUseConstPopupViewTitle",
				msg:LanguageManager.getlocal("allianceJoinLimitTip1"),
				callback:function(){
					this.request(NetRequestConst.REQUEST_ALLIANCE_JOINRANDALLIANCE,{});
				},
				handler:this,
				needCancel:true
			});
		}else{
			this.request(NetRequestConst.REQUEST_ALLIANCE_JOINRANDALLIANCE,{});
		}
	}
	private findHander()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCEFINDPOPUPVIEW,{callback:this.creatCallback,handler:this});
	}
	private rankHander()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ALLIANCERANKPOPUPVIEW,{callback:this.creatCallback,handler:this});
	}


	private creatCallback()
	{
		Api.chatVoApi.clearChat();
		NetManager.chatServerLogin(null,null);
		this.hide();
		let taskId = Api.mainTaskVoApi.getCurMainTaskId();
		let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
		if(taskCfg && taskCfg.openType == 'alliance'){
			Api.mainTaskVoApi.isGoExcuting = true;
		}
		ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCEVIEW,{type:1});
	}


	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		if(!data.ret ){
			return;
		}
		if (data.data.data.allianceFlag == 4 ) {
				App.CommonUtil.showTip(LanguageManager.getlocal("allianceErrorMsg4"));
				return;
			}
		if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_JOINRANDALLIANCE) {
			this.hide()
			
			if(Api.playerVoApi.getPlayerAllianceId()>0){
				Api.chatVoApi.clearChat();
				NetManager.chatServerLogin(null,null);
				let taskId = Api.mainTaskVoApi.getCurMainTaskId();
				let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
				if(taskCfg && taskCfg.openType == 'alliance'){
					Api.mainTaskVoApi.isGoExcuting = true;
				}
				ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCEVIEW,{type:2});
			}
			
		}
	}
	
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
					"alliance_bg2",
					]);
	}

	protected getRuleInfo(): string {
		if (Api.switchVoApi.checkOpenRankActive()) {
			return "allianceRuleInfo_new";
		}
		else {
			return "allianceRuleInfo";
		}
	}

	protected getExtraRuleInfo():string
    {   
		
        let params:string[] = [];

		let zoneStr:number = App.DateUtil.formatSvrHourByLocalTimeZone(24).hour; 
		params.push(String(zoneStr));

		if (Api.switchVoApi.checkOpenRankActive()) {
			params.push(LanguageManager.getlocal("allianceRuleInfoPart1"));
		}
		else {
			params.push("");
		}
        
        return LanguageManager.getlocal("allianceRuleInfoSpell",params);
    }



	public dispose():void
	{
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.checkData,this);
		this._child_wordbg = null;
		this._child_wordbgCor = null;
		this._childWordsText = null;
		Api.mainTaskVoApi.hideGuide();
		super.dispose();
	}
}