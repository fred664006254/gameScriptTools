class AcCarnivalNightTaskScrollItem2 extends ScrollListItem
{
	private _itemData:Config.AcCfg.CarnivalNightTaskItemCfg2= null;
	private _aidAndCode:{"aid":string;"code":string} = null;
	private _countText:BaseTextField = null;
	private _reviceBtn:BaseButton = null;
	private _reviceBM:BaseBitmap = null;
	private _type:string = '';
	public constructor() 
	{
		super();
	}
	private get cfg()
	{
		return <Config.AcCfg.CarnivalNightCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
	}

	/**
	 * 初始化itemview
	 */
	public initItem(index:number,data:any,itemParam:any):void
	{
		this._itemData = data;
		this._aidAndCode = itemParam;
		this._type = "batHP";
		if(this._itemData.typeId.indexOf("batHP")>-1){
			this._type = "batHP";
		}else{
			this._type = "bigPrize";
		}

		// this.width = 608;
		// this.height = 185;
		
		let innerbg = BaseBitmap.create("public_listbg");
        innerbg.width = 612;
        innerbg.x = 0;
        innerbg.y = 0;
        this.addChild(innerbg); 

 		let namebg = BaseBitmap.create("acmoonlight_red-1");
        // namebg.width = 260
        // namebg.x = this.width/2 - namebg.width/2;
		namebg.x = 3;
        namebg.y = 5;


		let txt = ComponentManager.getTextField(this.getTitleStr(this._itemData.typeId),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        txt.x = 30;
        txt.y = namebg.y + namebg.height/2 - txt.height/2;
		
		namebg.width =txt.width < 139 ? 239 : txt.width + 100;
		this.addChild(namebg);
		this.addChild(txt);

		let rewardArr =  GameData.formatRewardItem(this._itemData.getReward);

        let itemicon = null;
        let baseWidth = 106;
        let baseHeight = 106;
        let spaceX = 5;
        let spaceY = 5;
		let scale = 0.8;
        let startX = 10;
        let startY = 50;
        let lastY = 0;



        for(let i = 0; i < rewardArr.length; i++)
        {

			// if(rewardArr[i].type == 23){
			// 	itemicon = GameData.getItemIcon(rewardArr[i],false,true);
			// } else {
			// 	itemicon = GameData.getItemIcon(rewardArr[i],true,true);
			// }
            itemicon = GameData.getItemIcon(rewardArr[i],true,true);
			itemicon.setScale(scale);
            itemicon.x = startX + (i % 4) * (baseWidth * scale + spaceX);
            itemicon.y = startY + Math.floor(i / 5) * (baseHeight + spaceY);
            this.addChild(itemicon);
            if(i == rewardArr.length-1){
                lastY = itemicon.y;
            }
        }
		let vo = <AcCarnivalNightVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		//let openType = this._itemData.openType;
		//任务进度
		let taskNum = vo.getAcTaskNum(this._itemData.typeId);
		let newTaskNum = this._itemData.value;
		this._countText = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasTaskViewValue",[taskNum+"",newTaskNum+""]),22);
		this._countText.x = 520 - this._countText.width/2 - 80;
		this._countText.y = 40-8;
		this.addChild(this._countText);

		this._reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.reviceBtnClick,this);
		this._reviceBtn.x =460 - 80;
		this._reviceBtn.y = this._countText.y + this._countText.height;
		this.addChild(this._reviceBtn);

		this._reviceBM = BaseBitmap.create("collectflag");
		this._reviceBM.x = 480- 80;
		this._reviceBM.y = this._countText.y + this._countText.height;
		this.addChild(this._reviceBM);

       	innerbg.height = 163;
		this.height = innerbg.height;

		this.refreshView();
	}
	/**
	 * 领取奖励Click
	 */
	private reviceBtnClick()
	{
		let vo = <AcCarnivalNightVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid,this._aidAndCode.code);
        if(!vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }

		let activityId = this._aidAndCode.aid + "-" + this._aidAndCode.code
		if(this._type == 'batHP'){
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETCARNIVALITEMA,{"activeId":activityId,"turnId":this._itemData.id});
		}else{
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETCARNIVALITEMU,{"activeId":activityId,"useId":this._itemData.id});

		}
	}
	/**
	 * 刷新UI
	 */
	private refreshView()
	{
		let vo = <AcCarnivalNightVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		let cfg = <Config.AcCfg.CarnivalNightCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		//任务进度
		let taskNum = vo.getAcTaskNum(this._itemData.typeId);
		let newTaskNum = this._itemData.value;
		// this._countText.text = LanguageManager.getlocal("acChristmasTaskViewValue",[taskNum+"",newTaskNum+""])

		this._reviceBtn.setVisible(true);
		if(taskNum >= newTaskNum)
		{
			this._reviceBtn.setEnable(true);
		}
		else
		{
			this._reviceBtn.setEnable(false);
		}
		
		if(vo.getAcTaskStatus(this._itemData.typeId))
		{
			this._reviceBtn.setVisible(false);
			this._reviceBM.setVisible(true);
		}
		else
		{
			this._reviceBM.setVisible(false);
		}
	}


	/**
	 * 获得
	 */
	private getTitleStr(typeId:string):string
	{
		let strTop:string = null;
		let valueStr = String(this._itemData.value);
		if(this._type == 'batHP'){
			strTop = LanguageManager.getlocal("acCarnivalNightTaskItemStr1",[valueStr]);
		}else{
			strTop = LanguageManager.getlocal("acCarnivalNightTaskItemStr2",[valueStr]);

		}
		return strTop;
	}
	
	public getSpaceY():number
	{
		return 5;
	}
	
	public dispose():void
	{
		this._itemData = null;
		this._aidAndCode = null;
		this._reviceBtn = null;
		this._reviceBM = null;
		this._countText = null;
		this._type = '';
		super.dispose();
	}
}