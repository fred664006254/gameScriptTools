/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 活动 任务itemrender
 */
class AcDechuanshidaiTaskItem extends ScrollListItem
{
 
	private _data : any = null; 
	private _goBtn2:BaseButton = null;
	private _goBtn3:BaseButton =null; 
	private _needTxt:BaseTextField =null;
	private _collectflag:BaseBitmap =null; 

	private _curIdx:number=0;

	public constructor() 
	{
		super();
	}

	private get cfg() : Config.AcCfg.DechuanshidaiCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDechuanshidaiVo{
        return <AcDechuanshidaiVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_DECHUANSHIDAI;
    }

    private get code() : string{
        return this._code;
	}
	
	
	protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
	
	private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any)
    {	
        let view = this;
		view._code = itemparam;
		let code = view.getUiCode();
		view.width = 530;
		view.height = 180;
		this._data = data;
		this._curIdx = Number(data.sortId);
		
		let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg14");  
		wordsBg.width  = view.width;
		wordsBg.height = view.height; 
		this.addChild(wordsBg); 

		let bottom2:BaseBitmap = BaseBitmap.create("activity_charge_red");  
		// bottom2.width =170;
		bottom2.y = 5;
		this.addChild(bottom2);  

		let param = [];
		param.push(data.value);
		let taskstr = `taskDesc${data.questType}`;
		let taskTxt = ComponentManager.getTextField(LanguageManager.getlocal(taskstr, param), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		
		taskTxt.width=bottom2.width;
		taskTxt.x = bottom2.x+10;
		taskTxt.y = bottom2.y+10; 
		this.addChild(taskTxt); 

		let str = data.getReward;
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
		//领取
		this._goBtn3 =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"taskGoBtn",this.collectHandler,this);
		this._goBtn3.x = 345;
		this._goBtn3.y = 80;  
		this.addChild(this._goBtn3); 

		//前往
		this._goBtn2 =  ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"taskGoBtn",this.collectHandler,this);
		this._goBtn2.x = 345;
		this._goBtn2.y = 80;
		this._goBtn2.visible =false;
		this.addChild(this._goBtn2);

		//当前进度（0／1）
		let needTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_BROWN);
		needTxt.text =LanguageManager.getlocal("springcelebrationNeedStr",[1+"",data.value+""]);
		needTxt.width= this._goBtn3.width;
		needTxt.x = this._goBtn3.x;
		needTxt.y = this._goBtn3.y-30;
		needTxt.textAlign = "center";
		this._needTxt =needTxt;
		this.addChild(needTxt); 

		let collectflag = BaseBitmap.create("collectflag");
		collectflag.x = 355;
		collectflag.y = 50;
		collectflag.scaleX=0.7; 
		collectflag.scaleY=0.7;
		collectflag.visible =false;
		this.addChild(collectflag);  
		this._collectflag = collectflag;

		this.update();
	} 

	private collectHandler(evt:egret.TouchEvent):void
	{
		let vo = this.vo; 
		if(!vo)
		{
			return;
		}
		if(this._data.day > this.vo.getCurDays()){
			let time = App.DateUtil.getWeeTs(GameData.serverTime) + (this._data.day - this.vo.getCurDays()) * 3600 * 24 - GameData.serverTime;
			App.CommonUtil.showTip(LanguageManager.getlocal(`acDechuanshidaitip9-${this.getUiCode()}`, [App.DateUtil.getFormatBySecond(time)]));
			return;
		}
		// if(this._data.day > this.vo.getCurDays()){
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("acnewNoOpenDes"));
		// 	return;
		// }
		var taskNum = vo.getTask(this._data.questType, this._data.day);
		// if(vo.isStart==false)
		// {
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
		// 	return;
		// }   
		if(this.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
		if(taskNum >= this._data.value)
		{	
			this.vo.lastidx = this._data.index;
			this.vo.lastpos = this._needTxt.localToGlobal(this._needTxt.width, 20);
			this.vo.lastday = this._data.day;
			NetManager.request(NetRequestConst.REQUEST_DECHUAN_DAILYTASK,{
				activeId:this.acTivityId, 
				questType:this._data.questType,
				diffday : this._data.day
			});
		} 
		else
		{	
			if(this._data.day < this.vo.getCurDays() || !this.vo.isInActivity()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`acDechuanshidaitip11-${this.getUiCode()}`));
				return;
			}

			if(Number(this._data.questType)==1002)
			{
				let baseview = ViewController.getInstance().getView(`AcDechuanshidaiTaskView`);
				baseview.hide();
				//ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
				return; 
			}

			if(!this._data.openType)
			{
				return; 
			}

			let openType = this._data.openType;
			if(!openType || openType === ""){
				return; 
			}
			App.CommonUtil.goTaskView(openType);
		}   
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
			var taskNum = vo.getTask(this._data.questType, this._data.day);
			if(taskNum >= this._data.value)
			{
				this._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr",[taskNum+"",this._data.value+""]); 
			}
			else
			{
				this._needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr2",[taskNum+"",this._data.value+""]); 
			}
		}
		

		if(this._goBtn3)
		{
	
			if(taskNum >= this._data.value)
			{	
				if(vo.isGetTaskReward(this._data.questType, this._data.day))
				{
					this._goBtn3.visible = false;
					this._needTxt.visible = false;  
					this._collectflag.visible= true;
					this._goBtn2.visible=false;
				}
				else
				{	
					this._goBtn2.visible=false;
					this._goBtn3.visible =true;
					this._goBtn3.setText("realnamedes6");
					this._goBtn3.setGray(false);
					App.DisplayUtil.changeToNormal(this._goBtn3); 
				}
			}
			else
			{	
				if(this._data.questType==1)
				{	
					this._goBtn3.visible = true;
					this._goBtn3.setText("realnamedes6");
					this._goBtn3.setEnable(false);
				}
				else
				{
					// App.DisplayUtil.changeToNormal(this._goBtn2); 
					this._goBtn3.visible =false;
					this._goBtn2.visible=true; 
					// if(vo.isExchange()==true)
					// { 
					// 	App.DisplayUtil.changeToGray(this._goBtn2);
					// 	this._goBtn2.touchEnabled =false; 
					// }
				}
				this._goBtn3.setGray(!(this._data.day == this.vo.getCurDays()));
				if(!vo.isInActivity()){
					this._goBtn2.setGray(true);
				}
			} 
		}
		if(this._goBtn2){
			if(this._data.day > this.vo.getCurDays()){
				this._goBtn2.setText(`acbattlenobegun`);
			}
			else{
				this._goBtn2.setText(`taskGoBtn`);
			}

			this._goBtn2.setGray(!(this._data.day == this.vo.getCurDays()));
			if(!vo.isInActivity()){
				this._goBtn2.setGray(true);
			}
		}
		
	} 
   

	public getSpaceY():number
	{
		return 0;
	}
	
	public dispose():void
    {
		this._goBtn3 =null;
		this._collectflag=null;
		this._data =null; 
		this._goBtn2 = null;
		this._needTxt =null;
		//App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this); 		
		super.dispose();
	}
}