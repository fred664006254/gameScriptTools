class AcMergeActiveRechargeScrollItem extends ScrollListItem
{
	private _itemData:{needGem:number,getReward:string, day:number, rechargeId:number};
	private _aidAndCode:{"aid":string;"code":string} = null;
	private _descText:BaseTextField = null;
	private _reviceBtn:BaseButton = null;
	private _rechargeBtn:BaseButton = null;
	private _reviceBM:BaseBitmap = null;
		    //进度条
    private _progress:ProgressBar;
	public constructor() 
	{
		super();
	}
	private get cfg()
	{
		return <Config.AcCfg.MergeActiveCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
	}

    private get vo() : AcMergeActiveVo{
        return <AcMergeActiveVo>Api.acVoApi.getActivityVoByAidAndCode(AcMergeActiveView.AID, AcMergeActiveView.CODE);
    }
    private get acTivityId() : string{
        return `${AcMergeActiveView.AID}-${AcMergeActiveView.CODE}`;
    }
	/**
	 * 初始化itemview
	 */
	public initItem(index:number,data:any,itemParam:any):void
	{
		this._itemData = data;
		this._aidAndCode = itemParam;
		// this.width = 608;
		// this.height = 185;
		
		let innerbg = BaseBitmap.create("public_listbg");
        innerbg.width = 612;
        innerbg.x = 0;
        innerbg.y = 0;
        this.addChild(innerbg); 

 		let namebg = BaseBitmap.create("acchristmasview_1_red");
        // namebg.width = 260
        // namebg.x = this.width/2 - namebg.width/2;
		namebg.x = 3;
        namebg.y = 5;


		let txt = ComponentManager.getTextField(LanguageManager.getlocal("acMergeActiveRechargeTitle", [String(this._itemData.needGem)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        txt.x = 30;
        txt.y = namebg.y + namebg.height/2 - txt.height/2;
		
		namebg.width =txt.width < 139 ? 239 : txt.width + 100;
		this.addChild(namebg);
		this.addChild(txt);

		if(this._itemData.getReward.indexOf(`21_0001`) == -1){
			this._itemData.getReward = this._itemData.getReward;
		}


		let rewardArr =  GameData.formatRewardItem(this._itemData.getReward);

        let itemicon = null;
        let baseWidth = 106;
        let baseHeight = 106;
        let spaceX = 10;
        let spaceY = 10;
		let scale = 0.85;
        let startX = 20;
        let startY = 55;
        let lastY = 0;


        for(let i = 0; i < rewardArr.length; i++)
        {
			itemicon = GameData.getItemIcon(rewardArr[i],true,false);
			itemicon.setScale(scale);
            itemicon.x = startX + (i % 4) * (baseWidth * scale + spaceX);
            itemicon.y = startY + Math.floor(i / 5) * (baseHeight + spaceY);
            this.addChild(itemicon);
            if(i == rewardArr.length-1){
                lastY = itemicon.y;
            }
        }
		let needGem = this._itemData.needGem;
		let rechargedGem = 0;
		if (this.vo.cinfo && this.vo.cinfo[this._itemData.day] && this.vo.cinfo[this._itemData.day].v) {
			rechargedGem = this.vo.cinfo[this._itemData.day].v;
		}
		//按钮上面的文字描述
		this._descText = ComponentManager.getTextField(LanguageManager.getlocal("acMergeActiveRechargeDesc",[String(Math.max(0, needGem - rechargedGem))]),18,TextFieldConst.COLOR_BROWN);
		this._descText.x = 511 - this._descText.width/2;
		this._descText.textAlign = egret.HorizontalAlign.CENTER;
		this._descText.y = 60 - this._descText.height/2;
		this.addChild(this._descText);
		//进度条
        this._progress = ComponentManager.getProgressBar("progress_type1_yellow2","progress_type3_bg",568);
        this._progress.x = 20; 
        this._progress.y = startY + Math.floor((rewardArr.length -1) / 5) * (106 * 0.77 + 6) + 106 * 0.77 + 20;
		this._progress.setPercentage( rechargedGem/ needGem);
		this._progress.setText(LanguageManager.getlocal("acMergeActiveRechargeProess",[String(Math.min(rechargedGem, needGem)),String(needGem)]));
		this.addChild(this._progress);

		this._reviceBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"taskCollect",this.reviceBtnClick,this);
		this._reviceBtn.x = 511 - this._reviceBtn.width/2;
		this._reviceBtn.y = 100 - this._reviceBtn.height/2;
		this.addChild(this._reviceBtn);

		this._rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"acIcebreakingGiftWinRecharge",this.goBtnClick,this);
		this._rechargeBtn.x = 511 - this._rechargeBtn.width/2;
		this._rechargeBtn.y = 116 - this._rechargeBtn.height/2;
		this.addChild(this._rechargeBtn);

		this._reviceBM = BaseBitmap.create("collectflag");
		this._reviceBM.x = 511 - this._reviceBM.width/2;
		this._reviceBM.y = 100 - this._reviceBM.height/2;
		this.addChild(this._reviceBM);

       	innerbg.height = this._progress.y + this._progress.height + 20;
		this.height = innerbg.height + 5;

		this.refreshView();
	}
	/**
	 * 领取奖励Click
	 */
	private reviceBtnClick()
	{		
        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }

		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETMERGEACTIVEITEMC, {activeId:this.acTivityId, thedays:this._itemData.day, rechargeId:this._itemData.rechargeId});
	}
	/**
	 * 刷新UI
	 */
	private refreshView()
	{
		
		//任务进度
		let taskNum = 0;
		if (this.vo.cinfo && this.vo.cinfo[this._itemData.day] && this.vo.cinfo[this._itemData.day].v) {
			taskNum = this.vo.cinfo[this._itemData.day].v;
		}
		
		let newTaskNum = this._itemData.needGem;
		
		this._progress.setPercentage(taskNum / newTaskNum);
		this._progress.setText(LanguageManager.getlocal("acMergeActiveRechargeProess",[String(Math.min(taskNum, newTaskNum)),String(newTaskNum)]));
		this._descText.text = LanguageManager.getlocal("acMergeActiveRechargeDesc",[String(Math.max(0, newTaskNum - taskNum))]);

		if (this.vo.cinfo && this.vo.cinfo[this._itemData.day] && this.vo.cinfo[this._itemData.day].flags[this._itemData.rechargeId]) {
			this._rechargeBtn.setVisible(false);
			this._reviceBtn.setVisible(false);
			this._descText.setVisible(false);
			this._reviceBM.setVisible(true);
		} else if(taskNum >= newTaskNum)
		{
			this._rechargeBtn.setVisible(false);
			this._reviceBtn.setVisible(true);
			this._descText.setVisible(false);
			this._reviceBM.setVisible(false);
		}
		else
		{
			this._rechargeBtn.setVisible(true);
			this._reviceBtn.setVisible(false);
			this._descText.setVisible(true);
			this._reviceBM.setVisible(false);
		}
		

	}
	/**
	 * 前往的Click
	 */
	private goBtnClick()
	{

        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
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
		this._rechargeBtn = null;
		this._reviceBM = null;
		this._descText = null;
		this._progress = null;
		super.dispose();
	}
}