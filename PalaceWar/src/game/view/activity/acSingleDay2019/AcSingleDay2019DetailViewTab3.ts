/*
author : qinajun
*/
class AcSingleDay2019DetailViewTab3 extends CommonViewTab{

	private _list : ScrollList = null;
	private _timeTxt : BaseTextField = null;
	private _rankTxt : BaseTextField = null;

	public constructor(data){
		super();
		this.param = data;
		this.initView();
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
	
	private get cfg() : Config.AcCfg.SingleDay2019Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcSingleDay2019Vo{
        return <AcSingleDay2019Vo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
	}
	
	public refreshWhenSwitchBack():void{
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SDNEWGETRANK,{
            activeId:this.acTivityId,
        })
	}
	
	protected initView():void
	{	
		let view = this;
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_SDNEWGETRANK),this.update,this);
		let baseview : any = ViewController.getInstance().getView('AcSingleDay2019DetailView');
		view.height = baseview.tabHeight;
		view.width = baseview.tabWidth;
		let code = view.getUiCode();

		let topdescbg = BaseBitmap.create(`newsingledaytab3bg-${code}`);
		view.addChild(topdescbg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topdescbg, view, [0,5], true);

		let line = BaseBitmap.create(`newsingledaytab1line-${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, view, [0,-10]);
		view.addChild(line);

		 //body
		let userBody = BaseLoadBitmap.create("user_body_full_"+this.cfg.getTitle());
		userBody.width = 382;
		userBody.height = 618;
		userBody.mask = new egret.Rectangle(0,0,382,300);
		userBody.setPosition(topdescbg.x + 10 , topdescbg.y + 70);
		this.addChild(userBody);
		userBody.setScale(0.8);

		//userHead
		let head = Api.playerVoApi.getUserHeadContainer();
		head.setScale(0.8);
		head.setPosition(106,0);
		this.addChild(head);
		/**衣装预览 start */
		let skinTxtEffect = ComponentManager.getCustomMovieClip("acwealthcarpview_skineffect", 10, 70);
		let skinTxtEffectBM = BaseBitmap.create("acwealthcarpview_skineffect1");
		skinTxtEffect.setPosition(65,180);
		skinTxtEffect.blendMode = egret.BlendMode.ADD;
		this.addChild(skinTxtEffect);
		skinTxtEffect.playWithTime(-1);
		skinTxtEffect.addTouchTap(() => {
			let rewardId = view.cfg.getTitle();
			ViewController.getInstance().openView(ViewConst.POPUP.ACCOMMONTITLEREWARDPOPUPVIEW, {titleIds: [rewardId], bgType:3, topMsg:LanguageManager.getlocal(`acSingleDay2019Tip4-${code}`)});
		}, this);

		let skinTxt = BaseBitmap.create("acsearchproofview_common_skintxt");
		skinTxt.anchorOffsetX = skinTxt.width / 2;
		skinTxt.anchorOffsetY = skinTxt.height / 2;
		skinTxt.setPosition(165,257);
		this.addChild(skinTxt);
		egret.Tween.get(skinTxt, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 400).to({ scaleX: 1, scaleY: 1 }, 400);

		let skinTxteffect = BaseBitmap.create("acsearchproofview_common_skintxt");
		skinTxteffect.anchorOffsetX = skinTxteffect.width / 2;
		skinTxteffect.anchorOffsetY = skinTxteffect.height / 2;
		skinTxteffect.setPosition(skinTxt.x, skinTxt.y);
		this.addChild(skinTxteffect);
		skinTxteffect.blendMode = egret.BlendMode.ADD;
		skinTxteffect.alpha = 0;
		egret.Tween.get(skinTxteffect, { loop: true }).to({ alpha: 0.7, scaleX: 1.05, scaleY: 1.05 }, 400).to({ alpha: 0, scaleX: 1, scaleY: 1 }, 400);
		/**衣装预览 end */


        let activity_rank_rightBg = BaseBitmap.create("activity_rank_rightBg");
        activity_rank_rightBg.height = 250;
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, activity_rank_rightBg, topdescbg, [5,20]);
        view.addChild(activity_rank_rightBg);

        let activity_rank_rightBg2 = BaseBitmap.create("public_9_managebg");
        activity_rank_rightBg2.width = activity_rank_rightBg.width - 30;
        activity_rank_rightBg2.height = 170;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, activity_rank_rightBg2, activity_rank_rightBg, [0,15]);
        view.addChild(activity_rank_rightBg2);

        let acTimeTxt = ComponentManager.getTextField("",18,TextFieldConst.COLOR_BROWN);
        let stTxt = App.DateUtil.getFormatBySecond(view.vo.st,7);
        let etTxt = App.DateUtil.getFormatBySecond(view.vo.et - view.cfg.extraTime * 86400,7);
        let timeStr = App.DateUtil.getOpenLocalTime(view.vo.st,view.vo.et,true);
        acTimeTxt.multiline = true;
        acTimeTxt.lineSpacing = 3;
        acTimeTxt.width = activity_rank_rightBg2.width - 10;
        acTimeTxt.text = view.vo.getAcLocalTime(true);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, acTimeTxt, activity_rank_rightBg2, [10,5]);
        view.addChild(acTimeTxt);

        let deltaT = `<font color=${view.vo.isInActivity() ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED2}>${view.vo.acCountDown}</font>`;
        let acCDTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acBeautyVoteViewAcTime-1`, [deltaT]),18,TextFieldConst.COLOR_BROWN);
		view._timeTxt = acCDTxt;
		view.addChild(acCDTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, acCDTxt, acTimeTxt, [0,acTimeTxt.textHeight+5]);

        let rankDescTxt = ComponentManager.getTextField( LanguageManager.getlocal(`acSingleDay2019AcRankDesc-${code}`,[view.cfg.needGemCost.toString(),view.cfg.getMaxRank().toString()]),18,TextFieldConst.COLOR_BROWN);
        rankDescTxt.multiline = true;
        rankDescTxt.lineSpacing = 6;
        rankDescTxt.width = acTimeTxt.width;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rankDescTxt, acCDTxt, [0,acCDTxt.textHeight+5]);
        view.addChild(rankDescTxt);
		
		let rankV = view.vo.getMyPrank();
		let str = '';
		if(rankV == 0){
			str = LanguageManager.getlocal('atkracedes4');
		}
		else{
			str = rankV.toString();
		}
        let myRankTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acRank_myrank1`, [str]),20,TextFieldConst.COLOR_BROWN);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, myRankTxt, activity_rank_rightBg2, [0,5]);
        view.addChild(myRankTxt);
        view._rankTxt = myRankTxt;

        if(!Api.switchVoApi.checkOpenShenhe()){
             let rankListBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acRankBtnTxt",()=>{
				ViewController.getInstance().openView(ViewConst.POPUP.ACSINGLEDAY2019RANKPOPUPVIEW,{"aid":view.aid,"code":view.code});
			 },view);
            rankListBtn.x = activity_rank_rightBg2.x + activity_rank_rightBg2.width/2 - rankListBtn.width/2;
            rankListBtn.y = activity_rank_rightBg2.y + activity_rank_rightBg2.height + 5;
            this.addChild(rankListBtn);
        }

		let tablebg = BaseBitmap.create(`newsingledaytab2bg-${code}`);
		tablebg.height = view.height - topdescbg.height;
		view.addChild(tablebg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tablebg, topdescbg, [0,topdescbg.height+5]);

		let vo = this.vo;
		let objList = vo.getArr("gemRank");//
 		let tmpRect =  new egret.Rectangle(0,0,627,view.height - topdescbg.height - 30);
		let scrollList = ComponentManager.getScrollList(AcSingleDay2019RankItem,objList,tmpRect,view.code);
        view._list = scrollList;     
		view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, tablebg, [0,5]);
        view.addChild(scrollList); 
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
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_SDNEWGETRANK),this.update,this);
		super.dispose();
	}
}