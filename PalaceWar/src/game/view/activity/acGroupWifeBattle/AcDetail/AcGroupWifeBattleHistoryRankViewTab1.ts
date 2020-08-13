//
class AcGroupWifeBattleHistoryRankViewTab1 extends CommonViewTab
{
	private _nodeContainer:BaseDisplayObjectContainer = null;
	//private _countDownText:BaseTextField = null;
	private _rankindex = 0;
	private _list : ScrollList = null;
	private _pos :any = null;

	public constructor(param?) 
	{
		super();
		this.param = param;
		this.initView();
	}

	private get cfg() : Config.AcCfg.GroupWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }
    private get vo() : AcGroupWifeBattleVo{
        return <AcGroupWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }
    private get code() : string{
        return String(this.param.data.code);
    }

    private get aid() : string{
        return String(this.param.data.aid);
    }

    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
    }

	private get uiCode():string{
		let baseview : any = ViewController.getInstance().getView('AcGroupWifeBattleHistoryRankView');
		let code = baseview.getUiCode();
		return code;
	}

	protected getListType():number
	{
		return 1;
	}

	protected initView():void
	{
		let view = this;
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETRANK, this.rankCallBack, this);
		let baseview : any = ViewController.getInstance().getView('AcGroupWifeBattleHistoryRankView');
		view.height = baseview.tabHeight + 65;
		view.width = baseview.tabWidth;
		// 膜拜背景
		let bottomBg = BaseBitmap.create("arena_bottom");
		bottomBg.height = 65;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view);
		view.addChild(bottomBg);

		let yellowline = BaseBitmap.create("battlerank2");  
		yellowline.width = view.width;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, yellowline, view, [0,35]);
		view.addChild(yellowline); 

		//排名
		let rotationTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank1"), 22);
		rotationTxt.x =yellowline.x+28;
		rotationTxt.y = yellowline.y+yellowline.height/2- rotationTxt.height/2;
		this.addChild(rotationTxt);  

		//成员名称
		let rotationTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank2"), 22);
		rotationTxt2.x =yellowline.x+131;
		rotationTxt2.y =rotationTxt.y;
		this.addChild(rotationTxt2);  

		// 帮会名
		let rotationTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank3"), 22);
		rotationTxt3.x = yellowline.x+298;
		rotationTxt3.y = rotationTxt.y;
		this.addChild(rotationTxt3);  

		// 分数
		let rotationTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank4"), 22);
		rotationTxt4.x = yellowline.x+450;
		rotationTxt4.y = rotationTxt.y;
		this.addChild(rotationTxt4);  

		let rotationTxt5 = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank6"), 22);
		rotationTxt5.x = yellowline.x+546;
		rotationTxt5.y = rotationTxt.y;
		this.addChild(rotationTxt5);  

		let arr = baseview.getHistoryPrankList();
		let total = 0;
		let alive = 0;
		let rankV = 0;
		this._pos = [
			{width : rotationTxt.textWidth, x : rotationTxt.x}, 
			{width : rotationTxt2.textWidth, x : rotationTxt2.x},
			{width : rotationTxt3.textWidth, x : rotationTxt3.x}, 
			{width : rotationTxt4.textWidth, x : rotationTxt4.x}, 
			{width : rotationTxt5.textWidth, x : rotationTxt5.x}, 
		];

		for(let i in arr){
			if(Number(arr[i].uid) == Api.playerVoApi.getPlayerID()){
				rankV = Number(i) + 1;
			}
			if(arr[i].status != 3){
				total += 1;
			}
			if(arr[i].status == 1){
				alive += 1;
			}
			arr[i].pos = this._pos;
			arr[i].rankindex = this._rankindex;
		}
		let tmpRect =  new egret.Rectangle(0,0,view.width,view.height-180);
		let scrollList = ComponentManager.getScrollList(AcGroupWifeBattleHistoryPRankScrollItem,arr,tmpRect,this.param.data.code,arr.length);
		scrollList.y = yellowline.y+yellowline.height; 
		view.addChild(scrollList);

		scrollList.bindMoveCompleteCallback(()=>{
			let view = this;
			let index = this._rankindex;
			if(!scrollList.checkShowArrow()){
				index += 100;
			}
			else if(scrollList.scrollTop == 0){
				index = Math.max(0, index - 100)
			}
			if(this._rankindex != index){
				this.request(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETRANK, {activeId:this.param.data.aid+"-"+this.param.data.code, index : index,needround : this.param.data.round});
			}	
			
		}, this);
		this._list = scrollList;

		
		let txt3 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
		let rankstr = '';
		//榜单寻找
		if(rankV == 0){
			rankstr = LanguageManager.getlocal('atkracedes4');
		}
		else{
			rankstr = rankV.toString();
		}
		if(view.vo.getCurperiod() == 1){
			rankstr = LanguageManager.getlocal('acGroupWifeBattleNotStart-1');
		}
		else{
			if(!view.vo.getAttendQuality()){
				rankstr = LanguageManager.getlocal('crossImacyNoAccess');
			}
		}

		txt3.text = LanguageManager.getlocal(`acdemyprank`, [rankstr]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt3, bottomBg);
		this.addChild(txt3);

		let tiptxt = ComponentManager.getTextField(LanguageManager.getlocal('acBattlepranktip', [total + ``, alive + ``]),20,TextFieldConst.COLOR_BLACK);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, scrollList, [0,scrollList.height+ 10]);
		this.addChild(tiptxt);
	}

	private rankCallBack(event : egret.Event):void{
		if (event.data.ret) {
			let zidRank = event.data.data.data.rankArr;//个人排行
			if(zidRank && zidRank.length)
			{
				this._rankindex = event.data.data.data.index; 
				let arr = [];
				for(let i in zidRank){
					let unit = zidRank[i];
					let status = unit.alive ? (unit.rise ? 1 : 2) : (3);
					arr.push({
						myrank : Number(i) + 1,
						name : unit.name,
						alliname : unit.gname,
						value : unit.value,
						status : status,
						uid : unit.uid,
						pos : this._pos,
						rankindex : this._rankindex
					});
				}
				this._list.refreshData(arr, this.param.data.code);
				this._list.scrollTop = 0;
			}
			else{
				if(this._list.scrollTop >= this._list.getMaxScrollTop())
				{
					App.CommonUtil.showTip(LanguageManager.getlocal(`acGroupWifeBattleTip13-${this.uiCode}`));
				}
			}
		}
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GROUPWIFEBATTLE_GETRANK, this.rankCallBack, this);
		this._nodeContainer = null;
		this._rankindex = 0;
		this._list = null;
		this._pos = null;
		//this._countDownText = null;
		// TickManager.removeTick(this.tick,this);
		super.dispose();
	}

}