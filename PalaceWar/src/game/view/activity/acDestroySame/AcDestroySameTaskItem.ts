/**
 * author : qianjun
 * date : 2018.4.14
 * desc : 活动 任务itemrender
 */
class AcDestroySameTaskItem extends ScrollListItem
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

	private get cfg() : Config.AcCfg.DestroySameCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDestroySameVo{
        return <AcDestroySameVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_DESTROYSAME;
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
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
			case 12:
            case 13:
                code = `4`;
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
		view.height = 170;
		this._data = data;
		this._curIdx = Number(data.taskId);
		
		let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg14");  
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

		let tasknum = this.cfg.task[this._data.id1 - 1].length;
		let taskTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`AcDestroySameTip6`, this.code, code), [this._data.id2, `${tasknum}`]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, taskTxt2, taskbg, [0,4]);
		this.addChild(taskTxt2); 

		let param = [];
		param.push(data.value);
		if(Number(data.questType) == 1028){
			let cfg = Config.SearchCfg.getPersonItemCfgByPersonId(data.value2);
			if(cfg && cfg.name){
				param.push(cfg.name);
			}
		}

		let taskstr = `taskDesc${data.questType}`;
		let taskTxt = ComponentManager.getTextField(LanguageManager.getlocal(taskstr, param), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		if(Number(data.questType) == 1101){
			let typecolor = data.parameter2;
			// if(Number(code) == 4){
			// 	let color = [];
			// 	switch(Number(view._code)){
			// 		case 4:
			// 		case 5:
			// 			color = [3,1,2];
			// 			break;
			// 		case 6:
			// 		case 7:
			// 			color = [2,4,3];
			// 			break;
			// 		case 8:
			// 		case 9:
			// 			color = [1,2,4];
			// 			break;
			// 		case 10:
			// 		case 11:
			// 			color = [4,3,1];
			// 			break;
			// 	}
			// 	typecolor = color[data.parameter2 - 1];
			// }
			param = [data.parameter1, LanguageManager.getlocal(App.CommonUtil.getCnByCode(`AcDestroysameicontype${typecolor}`, this.code, code)), data.value];
			taskTxt.text = LanguageManager.getlocal(taskstr, param)
		}
		
		taskTxt.width=bottom2.width;
		taskTxt.x = bottom2.x+10;
		taskTxt.y = bottom2.y+10; 
		this.addChild(taskTxt); 

		
		let str = data.getReward;
		if(data.specialReward){
			str = `1029_0_${data.specialReward}_${this.getUiCode()}|` + data.getReward;
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

		if(data.questType==111)
		{	
			needTxt.text = LanguageManager.getlocal("springcelebrationNeedStr",[1+"",data.value+""]); 
		}

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
		var taskNum = vo.getTask(this._data.id1,this._data.id2);
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
			this.vo.taskid = `${this._data.id1}_${this._data.id2}`;
    		this.vo.lastpos = this._needTxt.localToGlobal(this._needTxt.width, 20);
			NetManager.request(NetRequestConst.REQUEST_DESTROYSAME_TASK,{
				"activeId":this.acTivityId, 
				"pos":[this._data.id1,this._data.id2]
			});
		} 
		else
		{	
			if(Number(this._data.questType)==1101)
			{
				let baseview = ViewController.getInstance().getView(`AcDestroySamePopupView`);
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
			var taskNum = vo.getTask(this._data.id1,this._data.id2);
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
				if(vo.isGetTaskReward(this._data.id1,this._data.id2))
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
					App.DisplayUtil.changeToNormal(this._goBtn3); 
				}
			}
			else
			{	
				if(this._data.questType==111)
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
			} 
		}
		if(this._goBtn2){
			if(!vo.isInActivity()){
				this._goBtn2.setEnable(false);
			}
		}
		// if(Number(this._data.questType) == 111){
		// 	let cfg = Config.SearchCfg.getPersonItemCfgByPersonId(data.value2);
		// 	if(cfg && cfg.name){
		// 		param.push(cfg.name);
		// 	}
		// }
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