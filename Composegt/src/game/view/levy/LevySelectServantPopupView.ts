/**
 * 选择门客弹板
 * @class LevySelectServantPopupView
 */
class LevySelectServantPopupView extends PopupView
{
	// 道具id	
	private _itemId:number = 0;
	private _scrollList:ScrollList = null;
	private _callback:Function = null;
	private _handler:any = null;
	private _selectedServantId:string = "";
	private _index:number;
	private _pos:string = "";
	private _launch:{type:number,need:number} = null;
	private _chosenFlag:BaseBitmap[] = [];
    
	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SELECTED_SERVANT,this.clickItemHandler,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.refreshList,this);
		this._itemId = 0;
		this._scrollList = null;
		this._callback =null;
		this._handler =null;
		this._selectedServantId = "";	
		this._index = 0;
		this._pos = "";	
		this._chosenFlag = [];	
		this._launch = null;	
		super.dispose();
	}
	public constructor() 
	{
		super();
	}

	/**
	 * 需要传的参数{callback：回调函数，handler:回调函数所属对下，type：面板类型（1，2，3），itemId：使用道具时传}
	 */
	protected initView():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.refreshList,this);
		this._callback = this.param.data.callback;
		this._handler = this.param.data.handler;
		let pos:string = this.param.data.data.pos;
		this._pos = pos;
		this._launch = Api.levyVoApi.getLaunchConditionByPos(pos);


        let woodbg =BaseBitmap.create("popupview_bg3");
        woodbg.x = GameConfig.stageWidth/2 - woodbg.width/2-5;
        woodbg.y = 16;
        woodbg.height = this.getShowHeight() - 113;
        this.container.addChildAt(woodbg,0);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_SELECTED_SERVANT,this.clickItemHandler,this);
		
		//顶部条件
		let redBg = this.container.getChildByName("newRedBg");
		if(redBg){
			let titletip = ComponentManager.getTextField(this.getTitleTipStr(), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        	titletip.x = redBg.x + redBg.width/2 - titletip.width/2;
			titletip.y = this.y + 30;
			this.addChildToContainer(titletip);
		}
		


		let servantInfoVoList = Api.levyVoApi.getSortServantListBySpId(this._launch.type,this._launch.type,this._pos);
		console.log(servantInfoVoList);
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,530,this.getShowHeight()-248);
		let list : ScrollList = null;
		list = ComponentManager.getScrollList(LevySelectServantItem,servantInfoVoList,rect,{pos:pos,launch:this._launch});
		list.setPosition((GameConfig.stageWidth-list.width)/2 - 5,70);
		this.addChildToContainer(list);
		this._scrollList = list;
		this._scrollList.setEmptyTip(LanguageManager.getlocal("levy_selectservant_emptytip"),TextFieldConst.COLOR_LIGHT_YELLOW);

		this.initBottom();
	}

	private refreshList(){
		let param = this._launch.type;
		for (let i = 0; i < this._chosenFlag.length; i++) {
			const chosenFlag = this._chosenFlag[i];
			 if(chosenFlag.visible == true){
			 	param = i+1
			 }

		}
		let serList = Api.levyVoApi.getSortServantListBySpId(param,this._launch.type,this._pos);
		this._scrollList.refreshData(serList,{pos:this._pos,launch:this._launch});
	}

	//底部按钮列表
	private initBottom(){
		let bottomBg = BaseBitmap.create("public_9v_bg14");
		bottomBg.width = this.getShowWidth() - 40;
		bottomBg.height = 70;
		bottomBg.setPosition(GameConfig.stageWidth/2 - bottomBg.width/2,630)
		this.addChildToContainer(bottomBg);

		let line = BaseBitmap.create("commonview_border3");
		line.width = bottomBg.width;
		line.setPosition(GameConfig.stageWidth/2 - line.width/2,bottomBg.y - line.height+10);
		this.addChildToContainer(line);

		for (let i = 1; i <= 5; i++) {
			let spImg = BaseBitmap.create("servant_speciality"+((i == 5?6:i)));
			spImg.setScale(0.8)
			spImg.setPosition(bottomBg.x + i*55+(i-1)*spImg.width*0.8,bottomBg.y + 13);
			this.addChildToContainer(spImg);
			spImg.addTouchTap(this.bottomClickHander,this,[i]);
			let chosenFlag = BaseBitmap.create("levy_selected");
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,chosenFlag,spImg);
			this.addChildToContainer(chosenFlag);
			chosenFlag.visible = false;
			if(i == this._launch.type){
				chosenFlag.visible = true;
			}
			this._chosenFlag.push(chosenFlag);
		}


	}

	private bottomClickHander(event,param){
		for (let i = 0; i < this._chosenFlag.length; i++) {
			const chosenFlag = this._chosenFlag[i];
			if(i == param-1){
				chosenFlag.visible = true;
			}else{
				chosenFlag.visible = false;
			}
		}
		let serList = Api.levyVoApi.getSortServantListBySpId(param,this._launch.type,this._pos);
		this._scrollList.refreshData(serList,{pos:this._pos,launch:this._launch});
		

	}

	private getTitleTipStr():string{
		const launch:string = Config.LevyCfg.LevyItemList[Number(this._pos.split("_")[0])].launch[Number(this._pos.split("_")[1])-1];
        const type = Number(launch.split("_")[0]);
		const need = Number(launch.split("_")[1]);
		let str = '';
		if(type >= 5){
			str = LanguageManager.getlocal("levy_selectservant_condtip_onlylevel",[need+''])

		}else{
			str = LanguageManager.getlocal("levy_selectservant_condtip",[LanguageManager.getlocal("servantInfo_speciality"+type),need+''])
		}

		return str;
	}
	
	/**点击具体门客按钮事件 */
	private clickItemHandler(event:egret.Event):void
	{
		let data = event.data;
		this._selectedServantId = String(data.servantId)||"";
		this._callback.apply(this._handler,[{
            servantId : this._selectedServantId, 
            isSelf:data.isSelf
		}]);
		this.hide();
	}

	protected isHaveTitle():boolean{
		return true;
	}
	
	protected getShowWidth():number{
		return 585;
	}

	protected getShowHeight():number{
		return 798;
    }
    
    
    protected getTitleStr():string{
        return `servantSelectedPopupViewTitle`;
    }

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "popupview_bg3","commonview_border3","levy_selected"
        ]);
	}


}