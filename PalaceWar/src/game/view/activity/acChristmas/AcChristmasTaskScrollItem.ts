/**
  * 圣诞的任务item
  * author 张朝阳
  * date 2018/11/28
  * @class AcChristmasTaskScrollItem
  */
class AcChristmasTaskScrollItem extends ScrollListItem
{
	private _itemData:Config.AcCfg.ChristmasTaskItemCfg = null;
	private _aidAndCode:{"aid":string;"code":string} = null;
	private _reviceBtn:BaseButton = null;
	private _goBtn:BaseButton = null;
	private _reviceBM:BaseBitmap = null;
	public constructor() 
	{
		super();
	}
	/**
	 * 初始化itemview
	 */
	public initItem(index:number,data:any,itemParam:any):void
	{
		
		this._itemData = data;
		this._aidAndCode = itemParam;
		let vo = <AcChristmasVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		this.width = 608;
		this.height = 165;
        let itembg = BaseBitmap.create("public_9_bg14");
        itembg.width = this.width;
        itembg.height = this.height;
        this.addChild(itembg);

		let titleBg = BaseLoadBitmap.create("acmidautumnview_titlebg");
		titleBg.width = 600;
		titleBg.height = 35;
		titleBg.setPosition(itembg.x + itembg.width / 2 - titleBg.width / 2 ,itembg.y + 5);
		this.addChild(titleBg);

		let titleTF = ComponentManager.getTextField(this.getTitleStr(Number(this._itemData.questType)),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2,titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);

		let itemTopLine:BaseBitmap = BaseBitmap.create("public_line3");
		itemTopLine.width += titleTF.width;
		itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2,titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
		this.addChild(itemTopLine);

		let rewardArr =  GameData.formatRewardItem(this._itemData.getReward5+"|26_0_" + this._itemData.specialReward + "_" + this._aidAndCode.code);
		for(let i = 0;i < rewardArr.length;i++)
		{

			let rewardItem = GameData.getItemIcon(rewardArr[i],true);
			// rewardItem.setScale(0.95);
			rewardItem.setPosition(20 + (rewardItem.width + 8) * i,titleBg.y + titleBg.height + 5);
			this.addChild(rewardItem);
		}

		this._reviceBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"taskCollect",this.reviceBtnClick,this);
		this._reviceBtn.setPosition(itembg.x + itembg.width - this._reviceBtn.width - 15 ,itembg.y + itembg.height - this._reviceBtn.height - 20);
		this.addChild(this._reviceBtn);
		
		this._goBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"taskGoBtn",this.goBtnClick,this);
		this._goBtn.setPosition(this._reviceBtn.x + this._reviceBtn.width / 2 - this._goBtn.width / 2 ,this._reviceBtn.y + this._reviceBtn.height / 2 - this._goBtn.height / 2 );
		this.addChild(this._goBtn);

		this._reviceBM = BaseBitmap.create("collectflag");
		this._reviceBM.anchorOffsetX = this._reviceBM.width / 2;
		this._reviceBM.anchorOffsetY = this._reviceBM.height / 2;
		this._reviceBM.setScale(0.7);
		this._reviceBM.setPosition(this._reviceBtn.x + this._reviceBtn.width / 2,this._reviceBtn.y + this._reviceBtn.height / 2);
		this.addChild(this._reviceBM);
		let scheduleNum = vo.gettTaskNum(this._itemData.questType);
		let scheduleStr = LanguageManager.getlocal("AcMazeViewTaskPlan",[scheduleNum < data.value?"<font color=0xce1515>" + scheduleNum +"</font>":"<font color="+TextFieldConst.COLOR_WARN_GREEN2+">" + scheduleNum +"</font>",String(this._itemData.value)])
		
		let scheduleTF = ComponentManager.getTextField(scheduleStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		scheduleTF.setPosition(this._reviceBtn.x + this._reviceBtn.width / 2 - scheduleTF.width / 2,this.height / 2 - scheduleTF.height);
		this.addChild(scheduleTF);

		this.refreshView();
	}
	/**
	 * 领取奖励Click
	 */
	private reviceBtnClick()
	{
		let activityId = this._aidAndCode.aid + "-" + this._aidAndCode.code
		NetManager.request(NetRequestConst.REQUST_ACTIVITY_CHRISTMASTASKREWARD,{"activeId":activityId,"taskId":this._itemData.id});
	}
	/**
	 * 刷新UI
	 */
	private refreshView()
	{
		let vo = <AcChristmasVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		let openType = this._itemData.openType;
		//任务进度
		let taskNum = vo.gettTaskNum(this._itemData.questType);
		let newTaskNum = this._itemData.value;

		if(openType)
		{	
			
			if(taskNum >= newTaskNum)
			{
				this._goBtn.setVisible(false);
				this._reviceBtn.setVisible(true);
			}
			else
			{
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
		if(vo.getTaskStatus(String(this._itemData.id)))
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
		let vo = <AcChristmasVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		let deltaT = vo.et - GameData.serverTime - 86400 * 1;
        if(deltaT < 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
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
	}

	/**
	 * 获得
	 */
	private getTitleStr(type:number):string
	{
		let strTop:string = null;
		let valueStr = String(this._itemData.value);
		switch(Number(this._itemData.questType))
		{
			case 1:
			{
				strTop = LanguageManager.getlocal("acChristmasTaksTitleType1",[valueStr]);
				break;
			}
			case 5:
			{
				strTop = LanguageManager.getlocal("acChristmasTaksTitleType2",[valueStr]);
				if(this._aidAndCode.code != "1"&&this._aidAndCode.code != "2")
				{
					strTop = LanguageManager.getlocal("acChristmasTaksTitleType2_" + this._aidAndCode.code,[valueStr]);
				}
				break;
			}
			case 301:
			{	
				strTop = LanguageManager.getlocal("acChristmasTaksTitleType3",[valueStr]);
				break;
			}
			case 402:
			{
				strTop = LanguageManager.getlocal("acChristmasTaksTitleType4",[valueStr]);
				break;
			}
			case 303:
			{
				strTop = LanguageManager.getlocal("acChristmasTaksTitleType5",[valueStr]);
				break;
			}
			case 601:
			{
				strTop = LanguageManager.getlocal("acChristmasTaksTitleType6",[valueStr]);
				break;
			}
			case 104:
			{
				strTop = LanguageManager.getlocal("acChristmasTaksTitleType7",[valueStr]);
				break;
			}
		}
		return strTop;
	}
	 /**是否情人节 */
    private isValentines() {
        if (this._aidAndCode.code == "3" || this._aidAndCode.code == "4") {
            return "3";
        }
        return null;
    }
	public getSpaceY():number
	{
		return 5;
	}
	
	public dispose():void
	{
		this._itemData = null;
		this._goBtn = null;
		this._reviceBtn = null;
		this._reviceBM = null;
		super.dispose();
	}
}