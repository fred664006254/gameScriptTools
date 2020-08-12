/**
 * 购买骰子通用确认面板 金币和钻石
 * author qianjun
 * 参数 ：title,msg,callback,handler  needCancel
 * 
 */
class BuyDiceConfirmPopupView extends PopupView{
	
	public constructor() {
		super();
	}
	// 打开该面板时，需要传参数msg
	public initView():void{
		let view = this;
		let param = view.param.data;

		let rewardVo = GameData.formatRewardItem(param.id)[0];
		let dicecfg = Config.DiceCfg.getCfgById(rewardVo.id.toString());

		let bg:BaseBitmap = BaseBitmap.create("popupview_content1");
		bg.width = 110;
		bg.height = 110;
		bg.x = view.viewBg.x + 67;
		bg.y = 30;
		// view.addChildToContainer(bg);

		let itemGroup = GameData.getItemIcon(rewardVo);//, rewardVo.num);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, itemGroup, bg, [0, 0]);
		view.addChildToContainer(itemGroup);

		// let numTxt = ComponentMgr.getTextField(`x${rewardVo.num}`, TextFieldConst.SIZE_CONTENT_COMMON);
		// view.addChildToContainer(numTxt)
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, numTxt, itemGroup, [0,itemGroup.height*itemGroup.scaleY + 10]);

		let curlv = Api.DiceVoApi.getDiceLvById(rewardVo.id.toString());
		let needNum = dicecfg.getNextLvCostNumByLv(curlv + 1);
		let curNum = Api.DiceVoApi.getDiceNumById(rewardVo.id.toString());

		let ismaxlevel = curlv == dicecfg.maxGrade;

		// let progressGroup = new BaseDisplayObjectContainer();
		// progressGroup.width = 260//curNum >= needNum ? 223 : 192;// 
		// progressGroup.height = 45;
		// view.addChildToContainer(progressGroup);
		// let line = BaseBitmap.create(`public_line1`);
		// line.width = 506;
		// view.addChildToContainer(line);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, bg, [0,bg.height+50]);

		if(1){//Api.DiceVoApi.isHaveDiceById(rewardVo.id.toString()) || ismaxlevel
			//中间进度
			let progress = ComponentMgr.getProgressBar(`progress23`,`progress_bg_1`,140);
			progress.setTextSize(TextFieldConst.SIZE_18);
			view.addChildToContainer(progress);
			if(ismaxlevel){
				progress.setPercentage(1);
				progress.setText(LangMger.getlocal(`dicemaxlevel`));
			}	
			else{
				progress.setPercentage(curNum/needNum);
				progress.setText(`${curNum}/${needNum}`);
			}
			progress.setTextSize(TextFieldConst.SIZE_20);
			
			let levelbg = BaseBitmap.create(`public_levelbg`);
			view.addChildToContainer(levelbg);

			let levelTxt = ComponentMgr.getTextField(`${curlv}`, TextFieldConst.SIZE_TITLE_SMALL);
			view.addChildToContainer(levelTxt);
			
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progress, bg, [(itemGroup.width - progress.width) / 2, bg.height]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, levelbg, progress, [-levelbg.width/2,0]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, levelTxt, levelbg);

			if(!ismaxlevel && curNum>=needNum){
				let levelarrow = BaseBitmap.create(`public_arrowgreen`);
				levelarrow.setScale(0.7);
				view.addChildToContainer(levelarrow);

				App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progress, bg, [(itemGroup.width - progress.width) / 2,bg.height]);
				App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, levelbg, progress, [-levelbg.width/2,0]);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, levelTxt, levelbg);

				App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, levelarrow, progress, [progress.width-15,-2]);
			}

			// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, bg, [0,bg.height+110]);
		}

		let txtBg = BaseBitmap.create('bird_des_shop_bg');
		this.addChildToContainer(txtBg);
		txtBg.y = 0;
		txtBg.x = 203;

		let txt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_22, ColorEnums.white);
		this.addChildToContainer(txt);
		txt.stroke = 2;
		txt.strokeColor = 0x0C2C77;
		txt.width = 237;
		txt.wordWrap = true;
		txt.lineSpacing = 10;
		txt.text = `${dicecfg.qualityStr}\n${dicecfg.desc}`;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt, txtBg, [42,42]);

	}

	protected resetBgSize():void{
		super.resetBgSize();
		let view = this;
		let param = view.param.data;
		let conBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM,param.costnum,view.clickConHandler,view);
		if(param.costIcon){
			conBtn.addTextIcon(param.costIcon);
			conBtn.setColor(ColorEnums.white);
		}
		// App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, conBtn, view.viewBg, [0,0]);
		view.addChild(conBtn);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, conBtn, view.viewBg, [0,15]);
		
	}

	protected getBgExtraHeight():number
	{
		return 150;
	}

	protected isTouchMaskClose():boolean{
		return (this.param&&this.param.data&&this.param.data.touchMaskClose)?true:false;
	}

	protected clickConHandler(data:any):void{
		let param=this.param;
		if (!param.data.clickNotAutoHide) {
			this.hide();
		}
		if(param.data.callback){
			param.data.callback.apply(param.data.handler,[this]);
		}
	}

	protected clickCancelHandler(data:any):void{
		let param = this.param;
		if(param.data.cancelcallback){
			param.data.cancelcallback.apply(param.data.handler,[this]);
		}
		this.hide();
	}

	// protected getShowHeight(){
	// 	return 500;
	// }

    protected getTitleStr(){
        return this.param.data.title;
	}
	
	protected getCloseBtnName():string{
		return this.param.data.needClose === 1 ? super.getCloseBtnName():null;
	}

	protected closeHandler(){

		let param = this.param;
		if(param.data.closecallback){
			param.data.closecallback.apply(param.data.handler,[this]);
		}
		super.closeHandler();
	}

	public hide(){		
		super.hide()
	}

	protected getParent():egret.DisplayObjectContainer{
		if (this.param.data.inLayer) {
			return this.param.data.inLayer;
		} else {
			return super.getParent();
		}
	}

	protected getResourceList():string[]{	
		let array:string[] = [];
		array.concat(super.getResourceList())
		return array.concat([
            `progress_bg_1`,`progress23`
		]);
	}

	public dispose():void{
		super.dispose();
	}
}