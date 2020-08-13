/*
author : qianjun
desc : 帮会争顶 帮派详情信息
*/
class AcBattleGroundAlliInfoView extends PopupView{
	private _list : ScrollList = null;
	private _chalBtn : BaseButton = null;
	public constructor(){
		super();
	}
	
	private get cfg() : Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		let alliinfo = view.vo.getAllInfoById(view.param.data.alliId);
		return {requestType:NetRequestConst.REQUST_ACTIVITY_BATTLEGROUNDDETAIL,requestData:{
			activeId : view.vo.aidAndCode,
			allianceId : alliinfo.mid
		}};
    }
	
	private _data : any[] = [];
	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let view = this;
		view._data = [];
        if(data.data.data && data.data.data.allianceList){
			view._data = data.data.data.allianceList;
			view._data.sort((a,b)=>{
				return a.myrank - b.myrank;
			});
        }
		//view.api.setBossNumInfo(data.data.data);
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"acmidautumnview_titlebg","progress3_bg","progress3","rank_biao"
		]);
    }//REQUST_ACTIVITY_BATTLEGROUNDDETAIL

	public initView():void
	{		
		let view = this;
		let alliinfo = view.vo.getAllInfoById(view.param.data.alliId);

		let bg = BaseBitmap.create(`public_tc_bg01`);
		bg.width = 540;
		bg.height = 565;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2,70);
		view.addChildToContainer(bg);

		let tcbg2= BaseBitmap.create("public_tc_bg03");
        tcbg2.width = bg.width-20;
        tcbg2.height = bg.height - 20;
        tcbg2.x = bg.x+10;
        tcbg2.y = bg.y+10;;
        this.addChildToContainer(tcbg2);
    
        let mask= BaseBitmap.create("rank_biao");
        mask.width = 480; 
        mask.x = bg.x+20;
        mask.y = tcbg2.y + 10;
        this.addChildToContainer(mask);

		let title1Text = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundAlliRank")), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, title1Text, mask, [30, 0]);
		view.addChildToContainer(title1Text);

		let title2Text = ComponentManager.getTextField(LanguageManager.getlocal(`ranknickName`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, title2Text, mask);
		view.addChildToContainer(title2Text);

		let title3Text = ComponentManager.getTextField(LanguageManager.getlocal(`acPunish_score`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, title3Text, mask, [40, 0]);
		view.addChildToContainer(title3Text);
		
        let alliNameText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundAlliName"), [alliinfo.alliName]), 20, TextFieldConst.COLOR_BROWN);
        alliNameText.setPosition(view.viewBg.x + 50,10);
		view.addChildToContainer(alliNameText);
		
		let serverText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundAlliRankServer"), [Api.mergeServerVoApi.getAfterMergeSeverName(null, true, alliinfo.server)]), 20, TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, serverText, alliNameText, [0, alliNameText.textHeight + 10]);
		view.addChildToContainer(serverText);

		let numText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundAlliNum"), [alliinfo.num.toString(), alliinfo.total.toString()]), 20, TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, numText, bg, [15, alliNameText.textHeight + 30]);
		view.addChildToContainer(numText);
		numText.y = serverText.y;
        
		let rect = egret.Rectangle.create();
        rect.setTo(0,0,520,bg.height - 40 - 25);
        
        let arr = [];
        for(let i in view._data){
			let unit = view._data[i];
            arr.push({
                name : unit.name,
                rank : unit.myrank,
				score : unit.value,
				alliId : view.param.data.alliId,
				uid : unit.uid,
				alive : unit.alive
            });
        }

		let scrollList = ComponentManager.getScrollList(AcBattleGroundAlliInfoItem,arr,rect,view.code);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, tcbg2, [0, 10 +mask.height]);
		scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"),TextFieldConst.COLOR_BROWN);
		view.addChildToContainer(scrollList);
		view._list = scrollList;
		scrollList.bounces = false;
		//view.freshList();

		let challBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `atkraceChallengeViewTitle`, ()=>{
			if(!this.vo.getAttendQuality()){
				App.CommonUtil.showTip(LanguageManager.getlocal(this.getDefaultCn("acBattleRoundNoAttend")));
				return;
			}
			if(view.vo.isActyEnd()){
                App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
                return;
			}
			if(view.vo.getCurperiod() == 3){
                App.CommonUtil.showTip(LanguageManager.getlocal(`crossIntimacyCDTime4`));
                return;
			}
			if(view.vo.getAttendQuality() && view.vo.getJoinIn()){
				//打开挑战弹窗
				ViewController.getInstance().openView(ViewConst.POPUP.ACBATTLEGROUNDSELECTVIEW,{
					code : view.code,
					aid : view.aid,
					alliId : view.param.data.alliId,
					mem : view._data
				});
			}
			else{
				App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
			}
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, challBtn, bg, [0, bg.height+10]);
		view.addChildToContainer(challBtn);
		challBtn.visible = alliinfo.num > 0 && view.vo.getAttendQuality() && view.vo.getJoinIn() && !view.vo.isAlliOut(view.param.data.alliId);
		view._chalBtn = challBtn;

		// if(Api.switchVoApi.checkOpenAtkracegChangegpoint()){
		// 	let cdText = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundTip12")), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		// 	App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, cdText, scrollList, [0, scrollList.height + 100]);
		// 	view.addChildToContainer(cdText);
		// }
	}

	private _end : boolean;
	private getRoundRewardCallback(evt : egret.Event):void{
        let view = this;
        let data = evt.data.data.data;
        if(!data){
            App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
            return;
		}
	}

	public tick():void{
		let view = this;
		if(view.vo.isActyEnd() && !view._end){
			view._end = true;
			view.freshList();
		}
		let alliinfo = view.vo.getAllInfoById(view.param.data.alliId);
		view._chalBtn.visible = alliinfo.num > 0 && view.vo.getAttendQuality() && view.vo.getJoinIn();
	}

	private freshList():void{
		let view = this;
	}
	
	protected getShowHeight():number{
		return 800;
	}

	protected getShowWidth():number{
		return 560;
	}

	protected getTitleStr():string{
		return this.getDefaultCn("acBattleGroundSelect");
	}
    private getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this.code)){
            return cnName + "-" + this.code;
        } else {
            return cnName + "-" + defaultCode;
        }
    }
	public dispose():void{
		let view = this;
		view._end = false;
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASURECIRCLERERWARD),view.getRoundRewardCallback,view);
		view._list = null;
		view._chalBtn = null;
		super.dispose();
	}
}