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

	protected getUiCode() : string{
        let code = ``;
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
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
			"acmidautumnview_titlebg","progress3_bg",`progress5`
		]);
    }//REQUST_ACTIVITY_BATTLEGROUNDDETAIL

	public initView():void
	{		
		// let tabName = ["acPunishRankRewardTab1"];
		let view = this;
		let alliinfo = view.vo.getAllInfoById(view.param.data.alliId);

		let topbg = BaseBitmap.create(`public_9_bg14`);
		topbg.width = 530;
		topbg.height = 100;
		topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2,10);
		view.addChildToContainer(topbg);

		let cheericon = BaseBitmap.create(`battlegroundcheericon-${view.getUiCode()}`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, cheericon, topbg, [15,0]);
		view.addChildToContainer(cheericon);

		let cheertxt = ComponentManager.getBitmapText(alliinfo.cheerlv, `crit_fnt`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cheertxt, cheericon, [0, 25]);
		view.addChildToContainer(cheertxt);
		if (PlatformManager.checkIsThSp()) {
			let tmp = <BaseTextField>cheertxt;
			tmp.size = 24;
			tmp.setColor(0x000000);
			tmp.setPosition(cheericon.x + cheericon.width / 2 - cheertxt.width / 2, cheericon.y + cheericon.height / 2 - cheertxt.height / 2 - 5);
		}

		let cfg = view.cfg.help[alliinfo.cheerlv - 1];
		let nexcfg = view.cfg.help[alliinfo.cheerlv];
		let num = cfg ? cfg.attAdd : 0;
		let add = (num * 100).toFixed(0);
		let cheertiptxt = ComponentManager.getTextField(LanguageManager.getlocal(`battlegroundcheertip16-${view.getUiCode()}`, [add]), 20, TextFieldConst.COLOR_BLACK);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cheertiptxt, cheericon, [cheericon.width + 12, 20]);
		view.addChildToContainer(cheertiptxt);

		let progress = ComponentManager.getProgressBar(`progress5`, `progress3_bg`, 395);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progress, cheertiptxt, [0, cheertiptxt.height + 10]);
		view.addChildToContainer(progress);
		if(nexcfg){
			let per = alliinfo.cheerexp / nexcfg.needHelp;
			progress.setPercentage(per);
			progress.setText(`${alliinfo.cheerexp}/${nexcfg.needHelp}`);
		}
		else{
			progress.setPercentage(1);
			progress.setText(LanguageManager.getlocal(`acBattlePassMaxLevel-1`));
		}
		

		let bg = BaseBitmap.create(`public_9_probiginnerbg`);
		bg.width = 530;
		bg.height = 565;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2,topbg.y + topbg.height + 60);
		view.addChildToContainer(bg);

		let mask = BaseBitmap.create(`public_9_bg37`);
		mask.width = bg.width;
		mask.height = 40;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, mask, bg);
		view.addChildToContainer(mask);

		let title1Text = ComponentManager.getTextField(LanguageManager.getlocal(`acBattleGroundAlliRank-${view.getUiCode()}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, title1Text, mask, [10, 0]);
		view.addChildToContainer(title1Text);

		let title2Text = ComponentManager.getTextField(LanguageManager.getlocal(`ranknickName`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, title2Text, mask);
		view.addChildToContainer(title2Text);

		let title3Text = ComponentManager.getTextField(LanguageManager.getlocal(`acPunish_score`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, title3Text, mask, [25, 0]);
		view.addChildToContainer(title3Text);
		
        let alliNameText = ComponentManager.getTextField(LanguageManager.getlocal(`acBattleGroundAlliName-${view.getUiCode()}`, [alliinfo.alliName]), 20, TextFieldConst.COLOR_BROWN);
        alliNameText.setPosition(view.viewBg.x + 25+GameData.popupviewOffsetX,topbg.y + topbg.height + 5);
		view.addChildToContainer(alliNameText);
		
		let serverText = ComponentManager.getTextField(LanguageManager.getlocal(`acBattleGroundAlliRankServer-${view.getUiCode()}`, [Api.mergeServerVoApi.getAfterMergeSeverName(null, true, alliinfo.server)]), 20, TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, serverText, alliNameText, [0, alliNameText.textHeight + 10]);
		view.addChildToContainer(serverText);

		let numText = ComponentManager.getTextField(LanguageManager.getlocal(`acBattleGroundAlliNum-${view.getUiCode()}`, [alliinfo.num.toString(), alliinfo.total.toString()]), 20, TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, numText, bg, [5, alliNameText.textHeight + 10]);
		view.addChildToContainer(numText);
		numText.y = serverText.y;
        
		let rect = egret.Rectangle.create();
        rect.setTo(0,0,530,bg.height - 40 - 10);
        
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
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, mask, [0,mask.height]);
		scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
		view.addChildToContainer(scrollList);
		view._list = scrollList;
		scrollList.bounces = false;
		//view.freshList();

		let challBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `atkraceChallengeViewTitle`, ()=>{
			if(!this.vo.getAttendQuality()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`acBattleRoundNoAttend-${this.getUiCode()}`));
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
		challBtn.visible = view.vo.getAttendQuality() && view.vo.getJoinIn() && !view.vo.isAlliOut(view.param.data.alliId);
		view._chalBtn = challBtn;

		if(Api.switchVoApi.checkOpenAtkracegChangegpoint()){
			let cdText = ComponentManager.getTextField(LanguageManager.getlocal(`acBattleGroundTip12-${view.getUiCode()}`), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
			App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, cdText, scrollList, [0, scrollList.height + 100]);
			view.addChildToContainer(cdText);
		}
	}

	private _end : boolean;
	private getRoundRewardCallback(evt : egret.Event):void{
        let view = this;
        let data = evt.data.data.data;
        if(!data){
            App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
            return;
		}
		// let idx = view.vo.selIdx;
		// let rewards = data.rewards;
		// if(rewards.indexOf(`20_302_1`) > -1){
        //     rewards = rewards.replace('20_302_1','27_302_1');
        // }
        // let item : any = view._list.getItemByIndex(idx);
		// let pos = item.localToGlobal(item._btn.x + 35, item._btn.y + 20);
		// let rewardList = GameData.formatRewardItem(rewards);
		// App.CommonUtil.playRewardFlyAction(rewardList,pos);
		// view._end = false;
		// view.freshList();
	}

	public tick():void{
		let view = this;
		if(view.vo.isActyEnd() && !view._end){
			view._end = true;
			view.freshList();
		}
		view._chalBtn.visible = view.vo.getAttendQuality() && view.vo.getJoinIn();
	}

	private freshList():void{
		let view = this;
		// let dataList =new Array<any>();
		// let cfg = this.cfg;
		// let curRound = view.vo.getCurRound();
		// for(let i in cfg.circleReward){
		// 	let cid = Number(i);
		// 	if(cid >= view.vo.getRoundMax() && curRound > 10){
		// 		for(let j = view.vo.getRoundMax(); j <= (view.vo.getCurRound() + 1); ++ j){
		// 			if(view.vo.getCurRoundGetState(j) < 3){
		// 				cid = j;
		// 				break;
		// 			}
		// 		}
		// 	}
		// 	dataList.push({
		// 		id : cid,
		// 		num :  cid,
		// 		getReward : cfg.circleReward[i].getReward,
		// 	});
		// }
		// dataList.sort((a,b)=>{
		// 	let flaga = view.vo.getCurRoundGetState(a.id);
		// 	let flagb = view.vo.getCurRoundGetState(b.id);
		// 	if(flaga == flagb){
		// 		return a.num - b.num;
		// 	}
		// 	else{
		// 		return flaga - flagb;
		// 	}
		// });
		// view._list.refreshData(dataList,view.code);
	}
	
	protected getShowHeight():number{
		return 880;
	}

	protected getShowWidth():number{
		return 560;
	}

	protected getTitleStr():string{
		return `acBattleGroundSelect-${this.getUiCode()}`;
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