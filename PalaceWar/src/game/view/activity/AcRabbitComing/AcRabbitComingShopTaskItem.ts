/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 活动 任务itemrender
 */
class AcRabbitComingShopTaskItem extends ScrollListItem
{
 
	private _data : Config.AcCfg.RabbitComingTaskItemCfg = null; 
	private _goBtn2:BaseButton = null;
	private _goBtn3:BaseButton =null; 
	private _needTxt:BaseTextField =null;
	private _collectflag:BaseBitmap =null; 

	public constructor() 
	{
		super();
	}
	private get cfg() : Config.AcCfg.RabbitComingCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcRabbitComingVo{
        return <AcRabbitComingVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
    private get aid() : string{
        return AcConst.AID_RABBITCOMING;
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
	protected initItem(index:number,data: Config.AcCfg.RabbitComingTaskItemCfg,itemparam:any)
    {	
        let view = this;
		view._code = itemparam;
		let code = view.getUiCode();
		view.width = 530;
		view.height = 180;
		this._data = data;
		
		let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg14");  
		wordsBg.width  = view.width;
		wordsBg.height = view.height; 
		this.addChild(wordsBg); 

		let bottom2:BaseBitmap = BaseBitmap.create("rabittaskrewardtitle");  
		// bottom2.width =170;
		bottom2.y = 5;
		this.addChild(bottom2);  

		let param = [];
		param.push(data.value);
		let taskstr = `taskDesc${data.questType == 1 ? 113 : data.questType}`;
		let taskTxt = ComponentManager.getTextField(LanguageManager.getlocal(taskstr, param), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		
		taskTxt.width=bottom2.width;
		taskTxt.x = bottom2.x+10;
		taskTxt.y = bottom2.y+13; 
		this.addChild(taskTxt); 

		let rewardBg = BaseBitmap.create("public_scrolllistbg");
		rewardBg.height = 100;
		this.addChild(rewardBg);

		let str = data.getReward;
		if(data.specialGift){
            str = `1050_1_${data.specialGift}|${str}`;
        }
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
				icon.setPosition(startX + i * (icon.width*icon.scaleX + 9), startY);
				this.addChild(icon); 
			}
		}
		rewardBg.width = iconList.length * (108 * 0.8) + (iconList.length - 1) * 9 + 11;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rewardBg, bottom2, [15,bottom2.height+6]);

		//领取
		this._goBtn3 =  ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"taskGoBtn",this.collectHandler,this);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, this._goBtn3, wordsBg, [10,15]);
		this.addChild(this._goBtn3); 

		//前往
		this._goBtn2 =  ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED,"taskGoBtn",this.collectHandler,this);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, this._goBtn2, wordsBg, [10,15]);
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
		let taskNum = vo.getTask(this._data.id);
		if(this.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
		if(taskNum >= this._data.value)
		{	
			this.vo.lastidx = this._data.id;
			this.vo.lastpos = this._needTxt.localToGlobal(this._needTxt.width, 20);
			NetManager.request(NetRequestConst.REQUEST_RABBIT_TASK,{
				activeId:this.acTivityId, 
				taskId:this._data.id
			});
		} 
		else
		{	
			if(!this.vo.isInActivity()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`time_error`));
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
			var taskNum = vo.getTask(this._data.id);
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
				if(vo.isGetTaskReward(this._data.id))
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
				if(this._data.questType==111)//this._data.questType==1
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
				if(!vo.isInActivity()){
					this._goBtn2.setGray(true);
				}
			} 
		}
		if(this._goBtn2){
			this._goBtn2.setText(`taskGoBtn`);
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