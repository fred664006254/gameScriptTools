/**
 * 骰子升级成功动画效果
 * author qianjun
 */
class DiceLevelUpView extends PopupView{
    private _diceid:string = null;
    private _isinuse:boolean = false;
	public constructor() {
		super();
	}
	// 打开该面板时，需要传参数msg
	public initView():void{
        let view = this;
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;

        let param = view.param.data;
        let diceid = param.dice;
        this._isinuse = param.isinuse;
        this._diceid = diceid;
        let dicecfg = Config.DiceCfg.getCfgById(diceid);
        // let level = Api.DiceVoApi.getDiceLvById(diceid);
        // let ismaxlevel = level == dicecfg.maxGrade;
        // let havenum = Api.DiceVoApi.getDiceNumById(diceid);
        // let ishave = Api.DiceVoApi.isHaveDiceById(diceid);
        // let neednum = dicecfg.getNextLvCostNumByLv(level + 1);
        // let canlevelup = ishave && havenum >= neednum && !ismaxlevel;

        if(App.CommonUtil.check_dragon()){
            let pizhiarr = {
                1: "bai",
                2: "lan",
                3: "zi",
                4: "huang"
            }
            let xunhuan = App.DragonBonesUtil.getLoadDragonBones("box_effect_xunhuan",0,`box_effect_xunhuan_${pizhiarr[dicecfg.quality]}`);
            this.addChildToContainer(xunhuan);
            xunhuan.x = GameConfig.stageWidth / 2;
            xunhuan.y = GameConfig.stageHeigth / 2 - 120;
            // xunhuan.playDragonMovie(`box_effect_xunhuan_${"huang"}`, 0);
        }

        let group = new BaseDisplayObjectContainer();
        group.width = GameConfig.stageWidth;
        view.addChildToContainer(group);

        let diceCfg = Config.DiceCfg.getCfgById(diceid);

        let curlv = Api.DiceVoApi.getDiceLvById(diceid);

        let diceIcon = App.CommonUtil.getDiceIconById(diceid, 1, true);
        group.addChild(diceIcon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, diceIcon, group, [0,0]);

        let diceNameTxt = ComponentMgr.getTextField(diceCfg.name, TextFieldConst.SIZE_40);
        diceNameTxt.strokeColor = 0;
        diceNameTxt.stroke = 2;
        diceNameTxt.x = group.width/2 - diceNameTxt.width/2;
        diceNameTxt.y = diceIcon.y + diceIcon.height + 30;
        group.addChild(diceNameTxt);

        let diceLevelTxt = ComponentMgr.getTextField(LangMger.getlocal(`shopgetboxlv`, [curlv.toString()]), TextFieldConst.SIZE_36, ColorEnums.white);
        diceLevelTxt.stroke = 2;
        diceLevelTxt.textColor = GameConfig.getQualityColor(diceCfg.quality);
        group.addChild(diceLevelTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, diceLevelTxt, diceIcon, [0,0]);
        diceLevelTxt.y = diceNameTxt.y + diceNameTxt.height + 10;

        let btn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal("sysconfirm"), this.closeHandler, this);
        group.addChild(btn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, btn, group, [0,0]);
        btn.y = diceLevelTxt.y  + diceLevelTxt.height + 40;

        group.x = (GameConfig.stageWidth - group.width) / 2;
        group.y = (GameConfig.stageHeigth - group.height) / 2;


		// let needNum = diceCfg.getNextLvCostNumByLv(curlv + 1);

        // let arrow = BaseBitmap.create(`public_arrowblue`);

        // let progressbg = `dicelevelupprogress`;
        // if(ismaxlevel){
        //     progressbg = `dicelevelupprogress3`;
        //     arrow.visible = false;
        // }
        // else if(canlevelup){
        //     arrow.setRes(`public_arrowgreen`);
        //     progressbg = `dicelevelupprogress2`;
        // }
        // let progressbar = ComponentMgr.getProgressBar(progressbg, `dicelevelupprogress_bg`, 238);//dicelevelupprogress dicelevelupprogress_bg
        // progressbar.setTextSize(TextFieldConst.SIZE_36);
        // group.addChild(progressbar);
        // progressbar.setTextColor(ColorEnums.white);
        // // progressbar.changeRes(progressbg, `progress_bg_1`);

        // if(ismaxlevel){
        //     progressbar.setPercentage(1);
        //     progressbar.setText(LangMger.getlocal(`dicemaxlevel`));
        // }	
        // else{
        //     progressbar.setPercentage(Math.min(1,havenum/neednum));
        //     progressbar.setText(ismaxlevel ? `${havenum}` : `${havenum}/${neednum}`);
        // }
        // group.addChild(arrow);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, arrow, diceNameTxt, [(diceNameTxt.width - progressbar.width - arrow.width/2)/2,diceNameTxt.height+25]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, progressbar, arrow, [arrow.width/2,0]);
        

        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, diceIcon, group, [0,progressbar.y+progressbar.height+90]);

        // let lvbg = BaseBitmap.create("dicelevelupbg");
        // group.addChild(lvbg);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, lvbg, diceIcon, [0,diceIcon.height+50]);

        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, diceLevelTxt, lvbg, [0,0]);

        //1 上升 2下降
        // let scale = 280/400;
        // let prevlevelBg = BaseBitmap.create(`public_level_${prevlevel}`);
        // view.addChild(prevlevelBg);
        // prevlevelBg.anchorOffsetX = prevlevelBg.width / 2;
        // prevlevelBg.anchorOffsetY = prevlevelBg.height / 2;
        // prevlevelBg.setScale(scale);
        // prevlevelBg.setPosition(GameConfig.stageWidth/2, GameConfig.stageHeigth/2);

        // let prevlevelBg2 = BaseBitmap.create(`public_level_${prevlevel}`);
        // view.addChild(prevlevelBg2);
        // prevlevelBg2.anchorOffsetX = prevlevelBg2.width / 2;
        // prevlevelBg2.anchorOffsetY = prevlevelBg2.height / 2;
        // prevlevelBg2.setScale(scale);
        // prevlevelBg2.setPosition(GameConfig.stageWidth/2, GameConfig.stageHeigth/2);
        // prevlevelBg2.alpha = 0;
        // prevlevelBg2.blendMode = egret.BlendMode.ADD;

        // let curlevelBg = BaseBitmap.create(`public_level_${Api.UserinfoVoApi.getLevel()}`);
        // view.addChild(curlevelBg);
        // curlevelBg.anchorOffsetX = curlevelBg.width / 2;
        // curlevelBg.anchorOffsetY = curlevelBg.height / 2;
        // curlevelBg.setScale(scale);
        // curlevelBg.alpha = 0;
        // curlevelBg.setScale(0.5 * scale);
        // // levelBg.setScale(4);
        // curlevelBg.setPosition(GameConfig.stageWidth/2, GameConfig.stageHeigth/2);
        // // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, curlevelBg, view);
        
        // let timeparam = 40;
        // egret.Tween.get(prevlevelBg2).wait(20 * timeparam).to({alpha : 1}, 27 * timeparam);

        // egret.Tween.get(prevlevelBg).to({scaleX : 0.95 * scale, scaleY : 0.95 * scale}, 20 * timeparam)
        // .to({scaleX : scale, scaleY : scale}, 5 * timeparam)
        // .call(()=>{
        //     let db = App.DragonBonesUtil.getLoadDragonBones(`royalpass_dj_${type}`, 1);
        //     db.blendMode = egret.BlendMode.ADD;
        //     view.addChild(db);
        //     db.setPosition(GameConfig.stageWidth/2, GameConfig.stageHeigth/2);
        // }, view)
        // .to({scaleX : 0.6 * scale, scaleY : 0.6 * scale}, 5 * timeparam)
        // .to({scaleX : 0.8 * scale, scaleY : 0.8 * scale}, 5 * timeparam)
        // .to({scaleX : 0.55 * scale, scaleY : 0.55 * scale}, 5 * timeparam)
        // .to({scaleX : 0.58 * scale, scaleY : 0.58 * scale}, 3 * timeparam)
        // .to({scaleX : 0.45 * scale, scaleY : 0.45 * scale}, 4 * timeparam).call(()=>{
        //     prevlevelBg.alpha = 0;
        //     egret.Tween.removeTweens(prevlevelBg);
        // },view);

        // egret.Tween.get(prevlevelBg2).to({scaleX : 0.95 * scale, scaleY : 0.95 * scale}, 20 * timeparam)
        // .to({scaleX : 1 * scale, scaleY : 1 * scale}, 5 * timeparam)
        // .to({scaleX : 0.6 * scale, scaleY : 0.6 * scale}, 5 * timeparam)
        // .to({scaleX : 0.8 * scale, scaleY : 0.8 * scale}, 5 * timeparam)
        // .to({scaleX : 0.55 * scale, scaleY : 0.55 * scale}, 5 * timeparam)
        // .to({scaleX : 0.58 * scale, scaleY : 0.58 * scale}, 3 * timeparam)
        // .to({scaleX : 0.45 * scale, scaleY : 0.45 * scale, alpha : 0}, 4 * timeparam).call(()=>{
        //     prevlevelBg2.alpha = 0;
        //     egret.Tween.removeTweens(prevlevelBg2);
        // },view);

        // egret.Tween.get(curlevelBg).wait(47 * timeparam).to({scaleX : 0.75 * scale, scaleY : 1.25 * scale, alpha : 1}, 3 * timeparam)
        // .to({scaleX : 1.4 * scale, scaleY : 1.2 * scale}, 4 * timeparam)
        // .to({scaleX : 1 * scale, scaleY : 1 * scale}, 11 * timeparam).call(()=>{
        //     egret.Tween.removeTweens(curlevelBg);
        // }, view);      
        
        // let scaleScore = 0.5;
        // let scoreLevelType = BaseBitmap.create(`leveluptitle${type}`);
        // view.addChild(scoreLevelType);
        // scoreLevelType.anchorOffsetX = scoreLevelType.width / 2;
        // scoreLevelType.anchorOffsetY = scoreLevelType.height / 2;
        // scoreLevelType.setScale(scaleScore);
        // scoreLevelType.scaleX = 0.5 * scaleScore;
        // scoreLevelType.alpha = 0;
        // scoreLevelType.setPosition(GameConfig.stageWidth/2, curlevelBg.y - 200);
        
        // egret.Tween.get(scoreLevelType).wait(49 * timeparam).to({scaleX : 1.5 * scaleScore, scaleY : 1 * scaleScore, alpha : 1}, 5 * timeparam)
        // .to({scaleX : 0.9 * scaleScore, scaleY : 1 * scaleScore}, 8 * timeparam)
        // .to({scaleX : 1.1 * scaleScore, scaleY : 1 * scaleScore}, 6 * timeparam)
        // .to({scaleX : 1 * scaleScore, scaleY : 1 * scaleScore}, 6 * timeparam)
        // .call(()=>{
        //     egret.Tween.removeTweens(scoreLevelType);
        // }, view);
        //let tipTxt = ComponentMgr.getTextField(LangMger.getlocal(``), );


        this.viewBg.visible = false;
    }

	protected resetBgSize():void{
        super.resetBgSize();
        //App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, group, view);
        this.viewBg.touchEnabled = true;
        this.viewBg.addTouchTap(this.closeHandler, this);
	}

	protected isTouchMaskClose():boolean{
		return false;
	}

	protected clickConHandler(data:any):void{
		let param=this.param;
		// if (!param.data.clickNotAutoHide) {
		// 	this.hide();
		// }
		if(param.data.callback){
			param.data.callback.apply(param.data.handler,[this]);
		}
	}
    
    protected getBgName():string{
		return "public_ab_scenebg";
	}
    
    protected getTitleBgName(){
        return null;
	}

    protected getTitleStr(){
        return null;
    }
    protected getShowHeight(){
        return GameConfig.stageHeigth;
    }
	
	protected getCloseBtnName():string{
		return null;//this.param.data.needClose === 1 ? 
	}


	public hide(){
        let param = this.param;
        if(param.data.callback){
			param.data.callback.apply(param.data.handler,[this]);
        }	
		super.hide()
	}

	protected getResourceList():string[]{	
		let array:string[] = [];
        array.concat(super.getResourceList());
        let param = this.param.data;
        let type = param.type;
		return array.concat([
            `dicelevelupview`,`progress24_bg`,`progress25`,`progress26`,`progress24`
		]);
	}

	public dispose():void{
        this._diceid = null;
        this._isinuse = false;
		super.dispose();
	}
}