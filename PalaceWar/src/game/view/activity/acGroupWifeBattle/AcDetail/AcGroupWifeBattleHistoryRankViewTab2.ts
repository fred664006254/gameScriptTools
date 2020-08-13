//
class AcGroupWifeBattleHistoryRankViewTab2 extends CommonViewTab
{
	private _nodeContainer:BaseDisplayObjectContainer = null;
	//private _countDownText:BaseTextField = null;
	
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

		//帮会名
		let rotationTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank3"), 22);
		rotationTxt.x =yellowline.x+50;
		rotationTxt.y = yellowline.y+yellowline.height/2- rotationTxt.height/2;
		this.addChild(rotationTxt);  

		//区服
		let rotationTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"), 22);
		rotationTxt2.x =yellowline.x+222;
		rotationTxt2.y =rotationTxt.y;
		this.addChild(rotationTxt2);  

		//本轮参加人数
		let rotationTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank7"), 22);
		rotationTxt3.x = yellowline.x+333;
		rotationTxt3.y = rotationTxt.y;
		this.addChild(rotationTxt3);  

		//晋级人数
		let rotationTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank8"), 22);
		rotationTxt4.x = yellowline.x+510;
		rotationTxt4.y = rotationTxt.y;
		this.addChild(rotationTxt4);  

		let arr = baseview.getHistoryArankList();
		let total = 0;
		let alive = 0;
		let status = 0;
		for(let i in arr){
			if(Number(arr[i].id)==Api.playerVoApi.getPlayerAllianceId()){
				status = arr[i].status;
			}
			if(arr[i].status != 3){
				total += 1;
			}
			if(arr[i].status == 1){
				alive += 1;
			}
			arr[i].pos = [
				{width : rotationTxt.textWidth, x : rotationTxt.x}, 
				{width : rotationTxt2.textWidth, x : rotationTxt2.x},
				{width : rotationTxt3.textWidth, x : rotationTxt3.x}, 
				{width : rotationTxt4.textWidth, x : rotationTxt4.x}, 
			];
		}
		let tmpRect =  new egret.Rectangle(0,0,view.width,view.height-180);
		let scrollList = ComponentManager.getScrollList(AcGroupWifeBattleHistoryARankScrollItem,arr,tmpRect,this.param.data.code);
		scrollList.y = yellowline.y+yellowline.height; 
		view.addChild(scrollList);

		
		let txt3 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
		txt3.text = LanguageManager.getlocal(`acdemyarank`, [LanguageManager.getlocal(`battlestaut${status}`)]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, txt3, bottomBg);
		this.addChild(txt3);

		let tiptxt = ComponentManager.getTextField(LanguageManager.getlocal('acBattlearanktip', [total + ``, alive + ``]),20,TextFieldConst.COLOR_BLACK);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, scrollList, [0,scrollList.height+ 10]);
		this.addChild(tiptxt);
	}

	public dispose():void
	{
		this._nodeContainer = null;
		//this._countDownText = null;
		// TickManager.removeTick(this.tick,this);
		super.dispose();
	}

}