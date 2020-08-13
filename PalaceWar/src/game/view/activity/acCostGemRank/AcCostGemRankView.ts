/*
author : qinajun
*/
class AcCostGemRankView extends AcCommonView{

	private _list : ScrollList = null;
	private _timeTxt : BaseTextField = null;
	private _rankTxt : BaseTextField = null;

	public constructor(){
		super();
	}

	private get cfg() : Config.AcCfg.CostGemRankCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcCostGemRankVo{
        return <AcCostGemRankVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
    
    protected getUicode():string{
        let code = '';
        switch(Number(this.code)){
            default:
                code = this.code;
                break;
        }
        return code;
	}

	protected getContainerY():number{
		return 88;
	}

	protected isHideTitleBgShadow():boolean{
		return true;
	}
	
	protected getResourceList():string[]{
		let code = this.getUiCode();
		let arr = [`costgemnranktopbg-${this.getUiCode()}`,`newsingledaytab1line-1`,`acwealthcarpview_skineffect1`,`acsearchproofview_common_skintxt`,
			`activity_rank_rightBg`,`newsingledaytab2bg-1`,`newsingledaytab2bottombg-1`,`acmidautumnview_titlebg`,`costgemnranktitle-${this.getUiCode()}`, `costgemnranktopdesbg-${this.getUiCode()}`, `acgiftreturnview_common_skintxt`, `costgemrank_rewarditembg-`+this.getUiCode(), "costgemrank__taskItemtitlebg-"+this.getUiCode(),
		];
		return super.getResourceList().concat(arr);
	}

	protected getRuleInfo():string{
		return App.CommonUtil.getCnByCode(`AcCostGemRankRuleInfo`, this.getUicode());
	}

	protected getTitleStr():string{
		return null;
	}

	protected getTitleBgName():string{
		return `costgemnranktitle-${this.getUiCode()}`
	}

	
    protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_COSTGEMRANK_GETLIST,requestData:{activeId:`${this.aid}-${this.code}`}};
	}
	protected receiveData(data:{ret:boolean,data:any}):void{
		if(data.ret){
			if(data.data.data){ 
				this.vo.setRankInfo(data.data.data);
			} 
		}
	}
	
	protected initView():void
	{	
		let view = this;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_COSTGEMRANK_GETLIST),this.update,this);
	
		view.height = GameConfig.stageHeigth;
		view.width = GameConfig.stageWidth;
		let code = view.getUiCode();

		let topdescbg = BaseBitmap.create(`costgemnranktopbg-${code}`);
		view.addChildToContainer(topdescbg);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topdescbg, view, [0,5], true);

		// let line = BaseBitmap.create(`newsingledaytab1line-${code}`);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, view, [0,-10]);
		// view.addChildToContainer(line);

		 //body
		// let userBody = BaseLoadBitmap.create("user_body_full_"+this.cfg.getTitle());
		// userBody.width = 382;
		// userBody.height = 618;
		// userBody.mask = new egret.Rectangle(0,0,382,300);
		// userBody.setPosition(topdescbg.x + 10 , topdescbg.y + 70);
		// this.addChildToContainer(userBody);
		// userBody.setScale(0.8);

		//userHead
		//
		// let res = `user_head390${Api.playerVoApi.getUserSex(Api.playerVoApi.getPlayePicId()) == 1 ? 5 : 6}`;
		// let myHead = BaseLoadBitmap.create(res,rect1);
		// myHead.setPosition(78,0);
		//Number(`390${Api.playerVoApi.getUserSex(Api.playerVoApi.getPlayePicId()) == 1 ? 5 : 6}`)
		if (view.getUiCode() == "1"){
			let head = Api.playerVoApi.getUserHeadContainer();
			head.setScale(0.8);
			head.setPosition(114,-10);
			this.addChildToContainer(head);
		}
		else if (view.getUiCode() == "2"){
			let rewardId = view.vo.getSpecialShow();
			let title = App.CommonUtil.getHeadPic(rewardId);
			title.setPosition(121, topdescbg.y + 121);
			view.addChildToContainer(title);
			let headEffect = ComponentManager.getCustomMovieClip("head_"+rewardId+"_effect", 10, 100);
			headEffect.width = 130;
			headEffect.height = 120;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, headEffect, title, [0, 0]);
			// headEffect.x = title.x + 15;
			// headEffect.y = title.y + 16; 
			view.addChildToContainer(headEffect);
			headEffect.playWithTime(0);
		}
		/**衣装预览 start */
		let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
		skinTxtEffect.setPosition(65,180);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChildToContainer(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);
		skinTxtEffect.addTouchTap(() => {
			if (view.getUiCode() == "1"){
				let rewardId = view.cfg.getTitle();
				ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONTITLEREWARDPOPUPVIEW, {titleIds: [rewardId], bgType:3, topMsg:LanguageManager.getlocal(`acCostGemRankTip1-${code}`)});
			}
			else if (view.getUiCode() == "2"){
				let rewardId = view.vo.getSpecialShow();
				ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONTITLEPOPUPVIEW, {titleId: rewardId, topMsg:LanguageManager.getlocal(`AcCostGemRankTitleTopMsg-${code}`)});
			}
			
		}, this);

		let skinTxtName = "acsearchproofview_common_skintxt";
		if (this.getUiCode() == "2"){
			skinTxtName = "acgiftreturnview_common_skintxt";
		}
		let skinTxt = BaseBitmap.create(skinTxtName);
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		skinTxt.setPosition(165,257);
		this.addChildToContainer(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

		let skinTxteffect = BaseBitmap.create(skinTxtName);
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
		skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
		this.addChildToContainer(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
		egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
		/**衣装预览 end */

		let isHasRightBg = ResourceManager.hasRes("costgemnranktopdesbg-"+this.getUiCode());
		let rightBgImg = "activity_rank_rightBg";
		if (isHasRightBg){
			rightBgImg = "costgemnranktopdesbg-"+this.getUiCode();
		}
		let activity_rank_rightBg = BaseBitmap.create(rightBgImg);
		if (isHasRightBg){
			App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, activity_rank_rightBg, topdescbg, [5,0]);
		}
		else{
			activity_rank_rightBg.height = 250;
			App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, activity_rank_rightBg, topdescbg, [5,20]);
		}
        view.addChildToContainer(activity_rank_rightBg);

        let activity_rank_rightBg2 = BaseBitmap.create("public_9_managebg");
        activity_rank_rightBg2.width = activity_rank_rightBg.width - 30;
        activity_rank_rightBg2.height = 170;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, activity_rank_rightBg2, activity_rank_rightBg, [0,15]);
		view.addChildToContainer(activity_rank_rightBg2);
		if (isHasRightBg){
			activity_rank_rightBg2.visible = false;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, activity_rank_rightBg2, activity_rank_rightBg, [-2, 24]);
		}

		let textColor = TextFieldConst.COLOR_BROWN;
		if (view.getUiCode() == "2"){
			textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		}
        let acTimeTxt = ComponentManager.getTextField("",18,textColor);
        let stTxt = App.DateUtil.getFormatBySecond(view.vo.st,7);
        let etTxt = App.DateUtil.getFormatBySecond(view.vo.et - view.cfg.extraTime * 86400,7);
        let timeStr = App.DateUtil.getOpenLocalTime(view.vo.st,view.vo.et,true);
        acTimeTxt.multiline = true;
        acTimeTxt.lineSpacing = 3;
        acTimeTxt.width = activity_rank_rightBg2.width - 10;
        acTimeTxt.text = view.vo.getAcLocalTime(true);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, acTimeTxt, activity_rank_rightBg2, [10,5]);
        view.addChildToContainer(acTimeTxt);

        let deltaT = `<font color=${view.vo.isInActivity() ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED2}>${view.vo.acCountDown}</font>`;
        let acCDTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acBeautyVoteViewAcTime-1`, [deltaT]),18,textColor);
		view._timeTxt = acCDTxt;
		view.addChildToContainer(acCDTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, acCDTxt, acTimeTxt, [0,acTimeTxt.textHeight+5]);

        let rankDescTxt = ComponentManager.getTextField( LanguageManager.getlocal(`acCostGemRankTip2-${code}`,[view.cfg.needGemCost.toString(),view.cfg.getMaxRank().toString()]),18,textColor);
        rankDescTxt.multiline = true;
        rankDescTxt.lineSpacing = 6;
        rankDescTxt.width = acTimeTxt.width;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rankDescTxt, acCDTxt, [0,acCDTxt.textHeight+5]);
        view.addChildToContainer(rankDescTxt);
		
		let rankV = view.vo.getMyPrank();
		let str = '';
		if(rankV == 0){
			str = LanguageManager.getlocal('atkracedes4');
		}
		else{
			str = rankV.toString();
		}
		let myRankColor = TextFieldConst.COLOR_BROWN;
		if (view.getUiCode() == "2"){
			myRankColor = TextFieldConst.COLOR_WHITE;
		}
        let myRankTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acRank_myrank1`, [str]),20,myRankColor);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, myRankTxt, activity_rank_rightBg2, [0,5]);
        view.addChildToContainer(myRankTxt);
		view._rankTxt = myRankTxt;
		if (view.getUiCode() == "2"){
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, myRankTxt, activity_rank_rightBg2, [0, -18]);
		}

        if(!Api.switchVoApi.checkOpenShenhe()){
			let rankListBtnImg = ButtonConst.BTN_SMALL_YELLOW;
			if (view.getUiCode() == "2"){
				rankListBtnImg = ButtonConst.BTN2_SMALL_YELLOW;
			}
             let rankListBtn = ComponentManager.getButton(rankListBtnImg,"acRankBtnTxt",()=>{
				ViewController.getInstance().openView(ViewConst.POPUP.ACSINGLEDAY2019RANKPOPUPVIEW,{"aid":view.aid,"code":view.code});
			 },view);
            rankListBtn.x = activity_rank_rightBg2.x + activity_rank_rightBg2.width/2 - rankListBtn.width/2;
			rankListBtn.y = activity_rank_rightBg2.y + activity_rank_rightBg2.height + 5;
			if (view.getUiCode() == "2"){
				rankListBtn.x = activity_rank_rightBg.x + activity_rank_rightBg.width/2 - rankListBtn.width/2;
				rankListBtn.y = activity_rank_rightBg.y + activity_rank_rightBg.height - rankListBtn.height - 10;
			}
            this.addChildToContainer(rankListBtn);
        }

		let tablebg = BaseBitmap.create(`newsingledaytab2bg-1`);
		tablebg.height = view.height - topdescbg.height;
		view.addChildToContainer(tablebg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tablebg, topdescbg, [0,topdescbg.height+5]);

		let vo = this.vo;
		let objList = vo.getArr("gemRank");//
 		let tmpRect =  new egret.Rectangle(0,0,627,view.height - view.titleBg.height - topdescbg.height - 10);
		let scrollList = ComponentManager.getScrollList(AcCostGemRankItem,objList,tmpRect,view.code);
        view._list = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, tablebg, [0,5]);
        view.addChildToContainer(scrollList); 
		scrollList.bounces = false;

		TickManager.addTick(this.tick, this);
	}

	private update():void{
		let view = this;
		if(!view.vo){
			return;
		}
		let rankV = view.vo.getMyPrank();
		let str = '';
		if(rankV == 0){
			str = LanguageManager.getlocal('atkracedes4');
		}
		else{
			str = rankV.toString();
		}
		view._rankTxt.text = LanguageManager.getlocal(`acRank_myrank1`, [str]);

	}

	private tick():void{
		let view = this;
		let deltaT = `<font color=${view.vo.isInActivity() ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED2}>${view.vo.acCountDown}</font>`;
		view._timeTxt.text = LanguageManager.getlocal(`acBeautyVoteViewAcTime-1`, [deltaT]);
	}

	public dispose():void{	
		let view = this;
		TickManager.removeTick(this.tick, this);
		view._list = null;
		view._timeTxt = null;
		view._rankTxt = null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_COSTGEMRANK_GETLIST),this.update,this);
		super.dispose();
	}
}