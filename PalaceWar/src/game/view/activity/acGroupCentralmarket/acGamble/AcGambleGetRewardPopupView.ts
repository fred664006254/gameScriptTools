/**
 * 赌坊领取奖励
 * author qianjun
 */
class AcGambleGetRewardPopupView extends PopupView
{
	// 滑动列表
	public constructor(){
		super();
    }
    private get cfg() : Config.AcCfg.GambleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcGambleVo{
        return <AcGambleVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

	public initView():void{		
		let view = this;
		let code = view.param.data.code;
		let contentBg = BaseBitmap.create("public_9_bg4");
		contentBg.width = 545;
		// contentBg.height = 440;
		contentBg.x = view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
		contentBg.y = 20;
		view.addChildToContainer(contentBg);

		let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGambleGetRewardTip1-${code}`), 24);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleTxt, contentBg, [0,20]);
		view.addChildToContainer(titleTxt);	

		let rewardInfo = view.vo.getRewardInfo();
		if(rewardInfo){
			let prevRound = rewardInfo.round;
			let gem = view.vo.getMyGem();
			let gemNumTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGambleGetRewardTip2-${code}`, [gem.toString()]), 22, TextFieldConst.COLOR_QUALITY_YELLOW);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, gemNumTxt, titleTxt, [0,titleTxt.textHeight + 15]);
			view.addChildToContainer(gemNumTxt);	

			let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGambleGetRewardTip3-${code}`), 22);
			view.addChildToContainer(tipTxt);
			
			if(prevRound == 3){
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, gemNumTxt, [0,gemNumTxt.textHeight + 15]);
			}
			else{
				let nextGem = view.vo.getThisRoundGem() * App.MathUtil.strip(view.cfg.gambPrize[prevRound + 1].stop.prize - 1);
				let tip2Txt = ComponentManager.getTextField(LanguageManager.getlocal(`acGambleGetRewardTip4-${code}`, [String(TextFieldConst.COLOR_QUALITY_YELLOW), nextGem.toString()]), 22);
				view.addChildToContainer(tip2Txt);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tip2Txt, gemNumTxt, [0,gemNumTxt.textHeight + 15]);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, tip2Txt, [0,tip2Txt.textHeight + 15]);
			}
			contentBg.height = tipTxt.y - contentBg.y + tipTxt.textHeight + 20;

			let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'confirmBtn', ()=>{
				//领取消息
				NetManager.request(NetRequestConst.REQUST_ACTIVITY_GAMBLEGETWINREWARD,{
					"activeId" : view.acTivityId, 
				});
			}, view);
			App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, confirmBtn, contentBg, [50,contentBg.height + 10]);
			view.addChildToContainer(confirmBtn);

			let cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, 'cancelBtn', ()=>{
				view.hide();
			}, view);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cancelBtn, contentBg, [50,contentBg.height + 10]);
			view.addChildToContainer(cancelBtn);
		}
		
	}

	protected getResourceList():string[]{
		return super.getResourceList().concat([

		]);
    }

	protected getTitleStr():string{
		return `itemUseConstPopupViewTitle`;
	}
	
	protected getShowHeight():number{
		return 380;
	}

	protected getShowWidth():number{
		return 590;
	}
	
    /**
	 * 获取活动配置
	 */
    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.param.data.code}`;
    }

	public dispose():void{
		super.dispose();
	}
}