class AcLanternTaskScrollItem extends ScrollListItem
{
	private _itemData:Config.AcCfg.LanternTaskItemCfg= null;
	private _aidAndCode:{"aid":string;"code":string,"day":number} = null;
	private _countText:BaseTextField = null;
	private _reviceBtn:BaseButton = null;
	private _goBtn:BaseButton = null;
	private _reviceBM:BaseBitmap = null;
	public constructor() 
	{
		super();
	}
	private get cfg()
	{
		return <Config.AcCfg.LanternCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
	}
	private get vo() : AcLanternVo{
       return <AcLanternVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
    }

	/**
	 * 初始化itemview
	 */
	public initItem(index:number,data:any,itemParam:any):void
	{
		
		this.name = "index->"+index+",data->"+data.day;
		this._itemData = data;
		this._aidAndCode = itemParam;
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


		let txt = ComponentManager.getTextField(this.getTitleStr(Number(this._itemData.questType)),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        txt.x = 30;
        txt.y = namebg.y + namebg.height/2 - txt.height/2;
		
		namebg.width =txt.width < 139 ? 239 : txt.width + 100;
		this.addChild(namebg);
		this.addChild(txt);

		//牡丹饼添加到物品栏
		// if(this._itemData.getReward.indexOf(`23_0001`) == -1 && this._itemData.sakura &&this._itemData.sakura >0){
		// 	this._itemData.getReward = "23_0001_"+this._itemData.sakura+"|" + this._itemData.getReward;
		// }
		let reward = null
		if(this._itemData.lantern && this._itemData.lantern > 0){
			reward = "27_0001_"+this._itemData.lantern+"|"+this._itemData.reward;
		} else {
			reward = this._itemData.reward;
		}

		// let reward = 
		let rewardArr =  GameData.formatRewardItem(reward);

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

			if(rewardArr[i].type == 27){
				itemicon = GameData.getItemIcon(rewardArr[i],false,true);
			} else {
				itemicon = GameData.getItemIcon(rewardArr[i],true,true);
			}
            // itemicon = GameData.getItemIcon(rewardArr[i],true,true);
			itemicon.setScale(scale);
            itemicon.x = startX + (i % 4) * (baseWidth * scale + spaceX);
            itemicon.y = startY + Math.floor(i / 5) * (baseHeight + spaceY);
            this.addChild(itemicon);
            if(i == rewardArr.length-1){
                lastY = itemicon.y;
            }
        }
		let vo = <AcLanternVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		let openType = this._itemData.openType;
		//任务进度
		let taskNum = vo.gettTaskNum(this._itemData.questType,this._itemData.day);
		let newTaskNum = this._itemData.value;
		this._countText = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasTaskViewValue",[taskNum+"",newTaskNum+""]),22);
		this._countText.x = 520 - this._countText.width/2 - 80;
		this._countText.y = 40-8;
		this.addChild(this._countText);

		this._reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskCollect",this.reviceBtnClick,this);
		this._reviceBtn.x =460 - 80;
		this._reviceBtn.y = this._countText.y + this._countText.height;
		this.addChild(this._reviceBtn);

		this._goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"taskGoBtn",this.goBtnClick,this);
		this._goBtn.x = 460- 80;
		this._goBtn.y = this._countText.y + this._countText.height;
		this.addChild(this._goBtn);

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
		let vo = <AcLanternVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid,this._aidAndCode.code);
        if(!vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }

		let activityId = this._aidAndCode.aid + "-" + this._aidAndCode.code

		// console.log("this._aidAndCode--->",this._aidAndCode.day);


		NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETLANTERNITEMT,{"activeId":activityId,"diffday":this._aidAndCode.day,"taskId":this._itemData.id});
	}
	/**
	 * 刷新UI
	 */
	private refreshView()
	{
		let vo = <AcLanternVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		let cfg = <Config.AcCfg.LanternCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		let openType = this._itemData.openType;
		//任务进度
		let taskNum = vo.gettTaskNum(this._itemData.questType,this._itemData.day);
		
		let newTaskNum = this._itemData.value;
		// this._countText.text = LanguageManager.getlocal("acChristmasTaskViewValue",[taskNum+"",newTaskNum+""])
		if(this._aidAndCode.day == this.vo.getCurDay()){

		} else {
			this._reviceBtn.setText("acReignTitleTaskBtnSu");
		}
		if(openType)
		{	
			
			if(taskNum >= newTaskNum)
			{
				this._goBtn.setVisible(false);
				this._reviceBtn.setVisible(true);
		
			}
			else
			{
				if(this._aidAndCode.day == this.vo.getCurDay()){
					this._goBtn.setEnable(true);
					
			    } else {
					this._goBtn.setEnable(false);
					
				}
				this._goBtn.setVisible(true);
				this._reviceBtn.setVisible(false);
			}
		}
		else
		{

			this._goBtn.setVisible(false);
			this._reviceBtn.setVisible(true);
			if(taskNum >= newTaskNum)
			{
				this._reviceBtn.setEnable(true);
			}
			else
			{
				this._reviceBtn.setEnable(false);
			}
		}
		if(vo.getTaskStatus(this._itemData.id,this._itemData.day))
		{
			this._goBtn.setVisible(false);
			this._reviceBtn.setVisible(false);
			this._reviceBM.setVisible(true);
		}
		else
		{
			this._reviceBM.setVisible(false);
		}
	}
	/**
	 * 前往的Click
	 */
	private goBtnClick()
	{
		let vo = <AcLanternVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid,this._aidAndCode.code);
        if(!vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
		let openType = this._itemData.openType;
		if(Api[openType+"VoApi"]&&Api[openType+"VoApi"].isShowNpc)
		{
            let isShowNpc:boolean=Api[openType+"VoApi"].isShowNpc();
            if(!isShowNpc)
            {
                let lockedStr:string=Api[openType+"VoApi"].getLockedString?Api[openType+"VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType +"Tip");
                App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen") );
                return;
           }
		}
		if(openType == "wife")
		{
			ViewController.getInstance().openView(ViewConst.COMMON.WIFEVIEW_TAB1);
		}
		else if(openType == "child")
		{
			ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW);
		}
		else if(openType == "search")
		{
			ViewController.getInstance().openView(ViewConst.COMMON.SEARCHVIEW);
		}
		else if(openType == "atkrace")
		{
			ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEVIEW);
		}
		else if(openType == "affair")
		{
			ViewController.getInstance().openView(ViewConst.COMMON.AFFAIRVIEW);
		}
		else if(openType == "recharge")
		{
			ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		}
		else if(openType == "manage")
		{
			ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
		}
	}

	/**
	 * 获得
	 */
	private getTitleStr(type:number):string
	{
		let strTop:string = null;
		let valueStr = String(this._itemData.value);
        
        strTop = LanguageManager.getlocal("acLanternTaskTitlequestType"+this._itemData.questType,[valueStr]);


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
		this._goBtn = null;
		this._reviceBM = null;
		this._countText = null;
		super.dispose();
	}
}