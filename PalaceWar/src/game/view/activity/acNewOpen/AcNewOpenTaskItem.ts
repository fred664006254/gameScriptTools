class AcNewOpenTaskItem extends ScrollListItem
{
    private _data : any = null; 
	private _goBtn3:BaseButton =null; 
	private _needTxt:BaseTextField =null;
	private _collectflag:BaseBitmap =null; 

	private _curIdx:number=0;

	public constructor() 
	{
		super();
	}

    private get cfg() : Config.AcCfg.NewOpenCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcNewOpenVo{
        return <AcNewOpenVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_NEWOPEN;
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
            case 3:
            case 4:
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

		this._data = data;
		this._curIdx = Number(data.taskId);
		
		let wordsBg:BaseBitmap = BaseBitmap.create("public_scrollitembg");  
		wordsBg.height = 170; 
        wordsBg.x = GameConfig.stageWidth/2-wordsBg.width/2;
		this.addChild(wordsBg); 

		let bottom2:BaseBitmap = BaseBitmap.create("shopview_itemtitle");  
        bottom2.x = wordsBg.x;
		bottom2.y = 8;
		this.addChild(bottom2);  

		let taskbg = BaseBitmap.create("destroysametaskbg"); 
		taskbg.x = wordsBg.x+ wordsBg.width - taskbg.width;
		taskbg.y = 2;
		this.addChild(taskbg);  

		let tasknum = Object.keys(this.cfg.task[this._data.id1]).length;
		let taskTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`AcDestroySameTip6`, this.code, code), [this._data.id2, `${tasknum}`]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, taskTxt2, taskbg, [0,4]);
		this.addChild(taskTxt2); 

		let param:string[] = [];
        if (data.questType == 1)
        {
            param.push(LanguageManager.getlocal("officialTitle"+data.value));
        }
        else
        {
            param.push(String(data.value));
        }
		param.push(String(data.peopleNum));

		let taskstr = `acNewOpenTaskType${data.questType}`;
		let taskTxt = ComponentManager.getTextField(LanguageManager.getlocal(taskstr, param), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		taskTxt.x = bottom2.x+10;
		taskTxt.y = bottom2.y+bottom2.height/2-taskTxt.height/2; 
		this.addChild(taskTxt); 
        bottom2.width = taskTxt.width+55;
		
		let str = data.getReward;
		let iconList: BaseDisplayObjectContainer[] = GameData.getRewardItemIcons(str,true);
		if (iconList&&iconList.length>0) {
			//额外赠送ICON
			let startX: number = 20+wordsBg.x;
			let startY: number = 54;
			let l: number = iconList.length;
			let _icon :BaseDisplayObjectContainer;
			for (let i: number = 0; i < l; i++) {
				let icon: BaseDisplayObjectContainer = iconList[i]; 
				icon.setScale(0.9);
				icon.setPosition(startX + i * (icon.width*icon.scaleX + 12), startY);
				this.addChild(icon); 
			}
		}
		//领取
		this._goBtn3 =  ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"taskCollect",this.collectHandler,this);
		this._goBtn3.x = 447+wordsBg.x;
		this._goBtn3.y = 90;  
		this.addChild(this._goBtn3); 


		//当前进度（0／1）
		let needTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		needTxt.width= this._goBtn3.width;
		needTxt.x = this._goBtn3.x;
		needTxt.y = this._goBtn3.y-25;
		needTxt.textAlign = "center";
		this._needTxt =needTxt;
		this.addChild(needTxt); 

		let collectflag = BaseBitmap.create("collectflag");
		collectflag.x = 475;
		collectflag.y = 55;
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
		let taskNum = vo.getTask(this._data.id1, Number(this._data.id2)-1 );

		if(this.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
		if(taskNum >= this._data.peopleNum)
		{	
			this.vo.taskid = `${this._data.id1}_${this._data.id2}`;
    		this.vo.lastpos = this._needTxt.localToGlobal(this._needTxt.width-70, 20);
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_NEWOPENTASKREWARDS,{
				activeId:this.acTivityId, 
				rkey:this._data.id1+1,
				rNum:this._data.id2
			});
		} 
		else
		{	
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
		let taskNum = vo.getTask(this._data.id1,Number(this._data.id2)-1);
		if(this._needTxt)
		{	
			
			if(taskNum >= this._data.peopleNum)
			{
				this._needTxt.text = LanguageManager.getlocal("acNewOpenNeedStr",[taskNum+"",this._data.peopleNum+""]); 
			}
			else
			{
				this._needTxt.text = LanguageManager.getlocal("acNewOpenNeedStr2",[taskNum+"",this._data.peopleNum+""]); 
			}
		}
		
		if(this._goBtn3)
		{
			if(taskNum >= this._data.peopleNum)
			{	
				if(vo.isGetTaskReward(this._data.id1,Number(this._data.id2)-1))
				{
					this._goBtn3.visible = false;
					this._needTxt.visible = false;  
					this._collectflag.visible= true;
				}
				else
				{	
					this._goBtn3.visible =true;
					this._goBtn3.setText("realnamedes6");
					App.DisplayUtil.changeToNormal(this._goBtn3); 
				}
			}
			else
			{	
				this._goBtn3.setEnable(false);
			} 
		}
		
	} 
   

	public getSpaceY():number
	{
		return 8;
	}
	
	public dispose():void
    {
		this._goBtn3 =null;
		this._collectflag=null;
		this._data =null; 
		this._needTxt =null;
		super.dispose();
	}
}