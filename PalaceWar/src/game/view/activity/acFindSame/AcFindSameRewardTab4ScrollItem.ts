
/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 活动 任务itemrender
 */
class AcFindSameRewardTab4ScrollItem extends ScrollListItem
{
	private _data : any = null; 
	private _needTxt:BaseTextField =null;

	public constructor() 
	{
		super();
	}

	private get cfg() : Config.AcCfg.FindSameCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.code.aid, this.code.code);
    }

    private get vo() : AcFindSameVo{
        return <AcFindSameVo>Api.acVoApi.getActivityVoByAidAndCode(this.code.aid, this.code.code);
    }


    private get aid() : string{
        return "findSame";
    }

    private get code() : any{
        return this._code;
	}
	
	private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any)
    {	
        let view = this;
		view._code = itemparam;
		let code = this.code.code;
		view.width = 530;
		view.height = 170;
		this._data = data;
		
		let wordsBg:BaseBitmap = BaseBitmap.create("public_popupscrollitembg");  
		wordsBg.width  = view.width;
		wordsBg.height = 170; 
		this.addChild(wordsBg); 

		let bottom2:BaseBitmap = BaseBitmap.create("activity_charge_red");  
		// bottom2.width =170;
		bottom2.y = 5;
		this.addChild(bottom2);  

		let taskbg = BaseBitmap.create("destroysametaskbg"); 
		taskbg.x = wordsBg.width - taskbg.width - 3;
		taskbg.y = 2;
		this.addChild(taskbg);  

		let param = [];
		param.push(data.value);
		if(Number(data.questType) == 1028){
			let cfg = Config.SearchCfg.getPersonItemCfgByPersonId(data.value2);
			if(cfg && cfg.name){
				param.push(cfg.name);
			}
		}

        let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("findsamequestType"+data.questType, [String(data.value)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt.x = bottom2.x+10;
        titleTxt.y = bottom2.y+13; 
        this.addChild(titleTxt);          

        let currNum = this.vo.getTaskNumByType(data.fid,data.sid);
        let needStrKey = "findsame_taskprocess1";
        if (currNum >= data.value){
            needStrKey = "findsame_taskprocess2";
        }
        let needText = ComponentManager.getTextField(LanguageManager.getlocal(needStrKey, [""+data.sid, ""+this.vo.getFNum(data.fid)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, needText, taskbg, [0,taskbg.height/2-needText.height/2+5]);
        this.addChild(needText);   

        let needStrKey2 = "findsame_taskpro1";
        if (currNum >= data.value){
            needStrKey2 = "findsame_taskpro2";
        }        
        let needText2 = ComponentManager.getTextField(LanguageManager.getlocal(needStrKey2, [""+currNum, ""+data.value]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, needText2, taskbg, [0,taskbg.height/2-needText.height/2+50]);
        this.addChild(needText2);           

        if (currNum >= data.value){
            if (this.vo.isGetTaskById(data.fid,data.sid)){ 
                //已领取
                let collectflag = BaseBitmap.create("collectflag");
                collectflag.setScale(0.7);
                collectflag.setPosition(this.width - collectflag.width * 0.7 - 5, this.height - collectflag.height * 0.7);
                this.addChild(collectflag); 
                needText2.visible = false; 
            }
            else{
                //可领取 未领取
                let reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", () => {
					if ((!this.vo.isStart)) {
						App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
						return;
					}
					NetManager.request(NetRequestConst.REQUEST_FINDSAME_GETTASK, { activeId: this.vo.aidAndCode, pos: [data.fid,data.sid] });
				}, this);
				reviceBtn.setPosition(this.width - reviceBtn.width - 15, this.height - reviceBtn.height - 25);
                this.addChild(reviceBtn);
            }
        }
        else{
            //未完成
            if (data.questType == 1004){
                let reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", () => {
				}, this);
				reviceBtn.setPosition(this.width - reviceBtn.width - 15, this.height - reviceBtn.height - 25);
                this.addChild(reviceBtn);
                reviceBtn.setGray(true);
                reviceBtn.setEnable(false);
            }
            else{
                let goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "taskGoBtn", this.taskGoBtnHandler, this);
                goBtn.setPosition(this.width - goBtn.width - 15, this.height - goBtn.height - 25);
                this.addChild(goBtn);
                if ((!this.vo.isStart) || (this.vo.checkIsInEndShowTime())) {
                    goBtn.setGray(true);
                }
                if(this._data.openType)
                {
                    goBtn.setGray(false);
                    goBtn.setEnable(true);
                    goBtn.setText("taskGoBtn");
                }else
                {
                    goBtn.setGray(true);
                    goBtn.setEnable(false);
                    goBtn.setText("taskCollect");
                }
            }
        }            

		
		let rewards = data.getReward;
		if (data.specialTime) {
			rewards = "1056_0_" + data.specialTime + "_" + code + "|" + data.getReward;
		}
		let str = rewards;

		let iconList: BaseDisplayObjectContainer[] = GameData.getRewardItemIcons(str,true);
		if (iconList&&iconList.length>0) {
			//额外赠送ICON
			let startX: number = 20;
			let startY: number = 65;
			let l: number = iconList.length;
			var _icon :BaseDisplayObjectContainer;
			for (let i: number = 0; i < l; i++) {
				let icon: BaseDisplayObjectContainer = iconList[i]; 
				icon.setScale(0.8);
				icon.setPosition(startX + i * (icon.width*icon.scaleX + 12), startY);
				this.addChild(icon); 
			}
		}

		// this.update();
	} 


	public update():void
	{	
		let vo = this.vo; 
		if(!vo)
		{
			return;
		}
		if(this._needTxt)
		{
			var taskNum = this.vo.getTaskNumByType(this._data.fid,this._data.sid);
			if(taskNum >= this._data.value)
			{
				this._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr",[taskNum+"",this._data.value+""]); 
			}
			else
			{
				this._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr2",[taskNum+"",this._data.value+""]); 
			}
		}
	} 
   

	public getSpaceY():number
	{
		return 5;
	}
    public taskGoBtnHandler():void{
        let vo = <AcFindSameVo>Api.acVoApi.getActivityVoByAidAndCode(this.code.aid, this.code.code);
        if (vo.checkIsInEndShowTime() || (!vo.isStart)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if(!this._data.openType){
            return;
        }
        let openType = this._data.openType;
        if(openType == "")
        {
            PlayerBottomUI.getInstance().show();
        } 
        else
        {
            let viewName = App.StringUtil.firstCharToUper(openType);
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
            if (egret.getDefinitionByName(viewName + "View"))
            {
                ViewController.getInstance().openView(viewName+ "View"); 
                
            }else if (egret.getDefinitionByName(viewName + "PopupView")) //可以跳转
            {
                ViewController.getInstance().openView(viewName + "PopupView");
            }
            else
            {
                if(openType=="recharge")
                {
                    ViewController.getInstance().openView(viewName+"Vip"+ "View");
                }
            } 
        } 
    }	
	public dispose():void
    {
		this._data =null; 
		this._needTxt =null;
		super.dispose();
	}
}