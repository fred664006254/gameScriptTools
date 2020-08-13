/**
 * 赌坊下注弹窗
 * author qianjun
 */
class AcGambleGemPopupView extends PopupView
{
	
	private _gemNumBitMapTxt : BaseBitmapText | BaseTextField = null;
	private _dragProgressBar : DragProgressBar = null;
	private _curNum : number = 1;
	private _numBg : BaseBitmap = null;
	private _numTxt : BaseTextField = null;
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
		contentBg.height = 440;
		contentBg.x = view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
		contentBg.y = 20;
		view.addChildToContainer(contentBg);

		let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal(`crossServerServantRule`), 24, TextFieldConst.COLOR_BLACK);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, titleTxt, contentBg, [15,20]);
		view.addChildToContainer(titleTxt);
		
		let descBg = BaseBitmap.create("public_9_probiginnerbg");
		descBg.width = 530;
		descBg.height = 230;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, contentBg, [0,55]);
		view.addChildToContainer(descBg);

		let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGambleRoundGemTip-${view.param.data.code}`, [view.cfg.gambDeposit[0].toString(), view.cfg.gambDeposit[view.cfg.gambDeposit.length - 1].toString()]), 20);
		descTxt.lineSpacing = 15;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descTxt, descBg, [15,20]);
		view.addChildToContainer(descTxt);

		//当前轮数
		for(let i = 1; i < 4; ++ i){
			//文本说明
			let color = '';
			switch(i){
				case 1:
					color = String(0xffffff);
					break;
				case 2:
					color = String(TextFieldConst.COLOR_WARN_GREEN);
					break;
				case 3:
					color = String(TextFieldConst.COLOR_QUALITY_ORANGE);
					break;
			}
			let rounddescTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGambleRoundRoundDesc-${view.param.data.code}`, [i.toString(), color, (App.MathUtil.strip(view.cfg.gambPrize[i].stop.prize - 1)).toFixed(1), String(App.MathUtil.strip(view.cfg.gambPrize[i].wrong.prize * 100))]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rounddescTxt, descTxt, [0, descTxt.textHeight + 15 + (i - 1) * (32)]);
			view.addChildToContainer(rounddescTxt);
		}
		
		let myGemImg = BaseBitmap.create(`gamblemygem1_${code}`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myGemImg, descBg, [5,descBg.height + 20]);
        view.addChildToContainer(myGemImg);

		let param = view.cfg.gambDeposit[1] - view.cfg.gambDeposit[0];
		let minNum = view.cfg.gambDeposit[0] / param;
		let maxNum = view.cfg.gambDeposit[view.cfg.gambDeposit.length - 1] / param;

        let gemNumBitMap = ComponentManager.getBitmapText(String(view.cfg.gambDeposit[0]),"socre_fnt");
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, gemNumBitMap, myGemImg, [myGemImg.width + 10,0]);
        view._gemNumBitMapTxt = gemNumBitMap;
		view.addChildToContainer(gemNumBitMap);

		let dragProgressBar = ComponentManager.getDragProgressBar("progress2","progress2_bg", maxNum, view.dragCallback, view, null, 1, 285);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dragProgressBar, myGemImg, [55,myGemImg.height+25]);
		dragProgressBar.setDragPercent(1, maxNum, minNum);
		view.addChildToContainer(dragProgressBar);
		view._dragProgressBar = dragProgressBar;

		let numBg = BaseBitmap.create("public_9_bg5");
		view.addChildToContainer(numBg);
		view._numBg = numBg;

		let numStr = `${view.cfg.gambDeposit[0]}/<font color=0xffffff>${maxNum * param}</font>`;
		let selectedNumTF = ComponentManager.getTextField(numStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW);
		view.addChildToContainer(selectedNumTF);
		view._numTxt = selectedNumTF;

		numBg.width = selectedNumTF.textWidth + 30;
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, numBg, dragProgressBar, [350,-5]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, selectedNumTF, numBg);	

		let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'confirmBtn', ()=>{
			if(!view.vo.isInActy()){
				App.CommonUtil.showTip(LanguageManager.getlocal(`date_error`));
				return;
			}
			//押注消息
			let gem = Api.playerVoApi.getPlayerGem();
			let param = view.cfg.gambDeposit[1] - view.cfg.gambDeposit[0];
			let num = view._curNum * param;
			if(gem < num){
				App.CommonUtil.showTip(LanguageManager.getlocal(`acGambleNoGemTip-${view.param.data.code}`));
			}
			else{
				view.vo._prevTime = view.vo.getCurTime();
				view.vo._prevRound = view.vo.getCurRound();
				NetManager.request(NetRequestConst.REQUST_ACTIVITY_GAMBLEREWARD,{
					"activeId" : view.acTivityId, 
					"gemNum" : num,
					"bet" : view.param.data.type
				});
				//App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ANNIVERS_REFRESH);
			}
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, confirmBtn, contentBg, [0,contentBg.height + 10]);
		view.addChildToContainer(confirmBtn);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acGambleRoundTip3-${view.param.data.code}`), 20);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, confirmBtn, [15, confirmBtn.height + 30]);
        view.addChildToContainer(tipTxt);

		
	}

	private dragCallback(curNum:number):void{
		let view = this;
		view._curNum = curNum;
		let param = view.cfg.gambDeposit[1] - view.cfg.gambDeposit[0];
		let maxNum = view.cfg.gambDeposit[view.cfg.gambDeposit.length - 1] / param;
		if(curNum == 0){
			curNum = 1;
		}
		view._dragProgressBar.setDragPercent(curNum,maxNum,1);
		view._gemNumBitMapTxt.text = (curNum * param).toString();
		let numStr = `${curNum * param}/<font color=0xffffff>${maxNum * param}</font>`;
		view._numTxt.text = numStr;
		view._numBg.width = view._numTxt.textWidth + 30;
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._numBg, view._dragProgressBar, [350,-5]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._numTxt, view._numBg);
	}

	protected getResourceList():string[]{
		return super.getResourceList().concat([
            'progress2','progress2_bg'
		]);
    }

	protected getTitleStr():string{
		return `itemUseConstPopupViewTitle`;
	}
	
	protected getShowHeight():number{
		return 598;
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
	
	protected closeHandler():void
	{
		if(this.param.data.callback){
			this.param.data.callback.apply(this.param.data.obj);
		}
		super.hide();
	}



	public dispose():void{
		let view = this;
		view._gemNumBitMapTxt = null;
		view._dragProgressBar = null;
		view._curNum  = 1;
		view._numBg = null;
		view._numTxt = null;
		super.dispose();
	}
}